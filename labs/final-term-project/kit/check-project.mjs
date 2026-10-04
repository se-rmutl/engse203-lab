#!/usr/bin/env node
/**
 * ENGSE203 Final Term Project — Checker
 *
 * วางไฟล์นี้ไว้ที่ root ของ repo ทีม (ข้าง ๆ api/ และ frontend/) แล้วกรอก project.config.json ก่อน
 *
 *   node --disable-warning=ExperimentalWarning check-project.mjs                   ตรวจทั้งหมด
 *   node --disable-warning=ExperimentalWarning check-project.mjs --role fe         เฉพาะส่วน Front-end (+ ส่วนทีม)
 *   node --disable-warning=ExperimentalWarning check-project.mjs --role be+devops   คน Back-end + DevOps ของทีมคู่
 *   node --disable-warning=ExperimentalWarning check-project.mjs --role be         เฉพาะส่วน Back-end
 *   node --disable-warning=ExperimentalWarning check-project.mjs --role devops     เฉพาะส่วน DevOps (กลุ่ม 3 คนรวมส่วนเพิ่ม)
 *   node --disable-warning=ExperimentalWarning check-project.mjs --online          ตรวจ URL ที่ deploy ด้วย
 *   node --disable-warning=ExperimentalWarning check-project.mjs --skip-build      ไม่ build frontend (เร็วขึ้น)
 *   node --disable-warning=ExperimentalWarning check-project.mjs --json out.json   บันทึกผลเป็น JSON
 *
 * สิ่งที่ checker ทำ
 *   · เปิด API ของทีมจริง (api/src/server.js) ด้วยฐานข้อมูลชั่วคราว แล้วยิงทุก endpoint ตาม README ข้อ R2
 *     — ใช้ resource · รหัส · ข้อมูลตัวอย่าง จาก project.config.json (ไม่ผูกกับชื่อไฟล์หรือชื่อฟิลด์ของ Campus Service)
 *   · รัน test ของทีม (Vitest) ทั้ง api และ frontend · ลองเรียกชั้น service ของ frontend เพื่อดูว่าแนบ token จริง
 *   · ตรวจเอกสาร · git · ค่าลับ · production
 *   ⚠ ไม่แตะฐานข้อมูลจริงของทีม (ใช้ DB_FILE ชั่วคราว) และไม่ใช้ Turso (ลบตัวแปร TURSO_* ก่อนรันเสมอ)
 *   ⚠ ต้อง npm install ใน api/ และ frontend/ ก่อน
 *
 * project.config.json — วันที่ใน api.validSample / api.ruleSamples เขียนแบบสัมพัทธ์ได้ เช่น "{{today+7}}"
 * (checker แทนเป็นวันที่จริงตามเวลาประเทศไทยตอนตรวจ) — ข้อมูลตัวอย่างจะไม่ "หมดอายุ" เมื่อผู้สอนตรวจทีหลัง
 */
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdtempSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { createServer } from 'node:net';
import { createHash, randomBytes } from 'node:crypto';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CHECKER_VERSION = '2026-10-05';
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const API = path.join(ROOT, 'api');
const FE = path.join(ROOT, 'frontend');
const argv = process.argv.slice(2);
const flag = (f) => argv.includes(f);
const opt = (f) => { const i = argv.indexOf(f); return i >= 0 ? argv[i + 1] : undefined; };
const ONLINE = flag('--online');
const SKIP_BUILD = flag('--skip-build');
const ROLE = opt('--role');
const JSON_OUT = opt('--json');

const TMP = mkdtempSync(path.join(tmpdir(), 'engse203-final-'));
const children = new Set();
const scratch = new Set();   // ไฟล์ชั่วคราวที่ checker วางไว้ใน frontend/ — ลบทิ้งเสมอ
const cleanup = () => {
  for (const c of children) { try { c.kill('SIGKILL'); } catch {} }
  for (const d of scratch) { try { rmSync(d, { recursive: true, force: true }); } catch {} }
  try { rmSync(TMP, { recursive: true, force: true }); } catch {}
};
process.on('exit', cleanup);
process.on('SIGINT', () => { cleanup(); process.exit(130); });

// ── เครื่องมือเล็ก ๆ ──────────────────────────────────────────────
const results = [];
const rec = (group, id, name, ok, detail = '', extra = {}) => {
  const r = { group, id, name, ok: !!ok && !extra.skipped, detail: String(detail ?? ''), ...(extra.skipped ? { skipped: true } : {}) };
  results.push(r);
  return r;
};
const skip = (group, id, name, detail) => rec(group, id, name, false, detail, { skipped: true });
const read = (rel) => { try { return readFileSync(path.join(ROOT, rel), 'utf8'); } catch { return ''; } };
// ตัดคอมเมนต์ JS (ไม่ตัด // ที่อยู่ใน URL เช่น http://)
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/[^\n]*/gm, '$1');
// ตัดคอมเมนต์ YAML — บรรทัดที่ถูก comment ไว้ (เช่น "# - run: npm run build") ต้องไม่นับ
const stripYaml = (s) => s.split('\n').map((l) => l.replace(/(^|\s)#.*$/, '$1')).join('\n');
const listFiles = (dir, test) => {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { recursive: true })
    .map(String)
    .filter((f) => !f.split(/[\\/]/).some((p) => p === 'node_modules' || p === 'dist' || p.startsWith('.engse203-probe')))
    .filter((f) => { try { return statSync(path.join(dir, f)).isFile(); } catch { return false; } })
    .filter(test)
    .map((f) => path.join(dir, f));
};
const readAll = (files) => files.map((f) => { try { return readFileSync(f, 'utf8'); } catch { return ''; } }).join('\n');
const relp = (f) => path.relative(ROOT, f).replace(/\\/g, '/');
const git = (...a) => spawnSync('git', ['-C', ROOT, ...a], { encoding: 'utf8' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const freePort = () => new Promise((resolve, reject) => {
  const s = createServer();
  s.unref();
  s.on('error', reject);
  s.listen(0, '127.0.0.1', () => { const { port } = s.address(); s.close(() => resolve(port)); });
});
const fileHash = (f) => { try { return createHash('md5').update(readFileSync(f)).digest('hex'); } catch { return null; } };

/** ช่อง <…> ที่ยังไม่ได้กรอกในเอกสาร markdown — ไม่นับ code · คอมเมนต์ HTML · แท็ก HTML · ลิงก์ <https://…> */
const HTML_TAGS = new Set(('a abbr b blockquote br center code dd del details div dl dt em figcaption figure h1 h2 h3 h4 h5 h6 hr i iframe img ins kbd li mark ol p picture pre s small source span strong sub summary sup table tbody td th thead tr u ul video').split(' '));
function placeholders(md) {
  const text = String(md)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '')
    .replace(/`[^`\n]*`/g, '');
  const found = [];
  for (const m of text.matchAll(/<([^<>\n]{1,80})>/g)) {
    const inner = m[1].trim();
    const tag = inner.replace(/^\//, '').split(/[\s/]/)[0].toLowerCase();
    if (HTML_TAGS.has(tag) && /^\/?[a-z][a-z0-9]*(\s[^<>]*)?\/?$/i.test(inner)) continue;
    if (/^(https?:\/\/|mailto:)[^\s…]+$/i.test(inner)) continue;
    found.push(m[0]);
  }
  return found;
}
const showPh = (ph) => ph.slice(0, 3).join(' ') + (ph.length > 3 ? ` … (${ph.length} ช่อง)` : '');

/** วันที่วันนี้ตามเวลาประเทศไทย ± n วัน (YYYY-MM-DD) */
function thaiDate(offsetDays = 0) {
  const [y, m, d] = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Bangkok' }).split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + offsetDays)).toISOString().slice(0, 10);
}
/** แทน "{{today}}" · "{{today+7}}" · "{{today-1}}" ในข้อมูลตัวอย่างด้วยวันที่จริง */
function expandDates(v) {
  if (typeof v === 'string') {
    return v.replace(/\{\{\s*today\s*(?:([+-])\s*(\d+))?\s*\}\}/gi, (_, sign, n) => thaiDate((sign === '-' ? -1 : 1) * Number(n ?? 0)));
  }
  if (Array.isArray(v)) return v.map(expandDates);
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, expandDates(x)]));
  return v;
}

// ── อ่าน project.config.json ──────────────────────────────────────
let cfg = null, cfgErr = '';
try { cfg = JSON.parse(read('project.config.json') || 'null'); } catch (e) { cfgErr = `JSON ไม่ถูกต้อง: ${e.message}`; }
if (!cfg && !cfgErr) cfgErr = 'ไม่พบ project.config.json — คัดลอกจาก project.config.example.json แล้วกรอกค่าของทีม';

const members = Array.isArray(cfg?.members) ? cfg.members : [];
const TRIO = members.length === 3;
const ROLES_OK = TRIO ? ['fe', 'be', 'devops'] : ['fe', 'be+devops'];
const apiCfg = cfg?.api ?? {};
const resource = typeof apiCfg.resource === 'string' ? apiCfg.resource.replace(/\/+$/, '') : '';
const resourceName = resource.split('/').filter(Boolean).pop() ?? '';
const ID_FIELD = typeof apiCfg.idField === 'string' && apiCfg.idField ? apiCfg.idField : 'id';
const STAFF_ROLE = typeof apiCfg.staffRole === 'string' && apiCfg.staffRole ? apiCfg.staffRole : 'staff';
const SF = apiCfg.statusField ?? 'status';
const validSample = expandDates(apiCfg.validSample ?? {});
const invalidSample = expandDates(apiCfg.invalidSample ?? {});
const ruleSamples = Array.isArray(apiCfg.ruleSamples) ? expandDates(apiCfg.ruleSamples) : [];
const statusUpdate = expandDates(apiCfg.statusUpdate);
const existingId = apiCfg.existingId;

const groupsFor = (role) => ({
  fe: ['TEAM', 'FE'],
  be: ['TEAM', 'BE'],
  devops: ['TEAM', 'DEVOPS', 'TRIO'],
  'be+devops': ['TEAM', 'BE', 'DEVOPS'],
}[role] ?? null);
const RUN = new Set(ROLE ? (groupsFor(ROLE) ?? []) : ['TEAM', 'FE', 'BE', 'DEVOPS', 'TRIO']);
if (ROLE && !groupsFor(ROLE)) { console.log(`\n[!] --role ต้องเป็น fe · be · devops · be+devops (ได้ "${ROLE}")\n`); process.exit(2); }
if (!TRIO) RUN.delete('TRIO');

// ── รัน Vitest ของโปรเจกต์ ─────────────────────────────────────────
function vitestBin(dir) {
  try {
    const req = createRequire(path.join(dir, 'package.json'));
    return path.join(path.dirname(req.resolve('vitest/package.json')), 'vitest.mjs');
  } catch { return null; }
}
function runVitest(dir) {
  const rel = path.relative(ROOT, dir);
  const bin = vitestBin(dir);
  if (!bin) return { ok: false, detail: `ยังไม่ได้ npm install ใน ${rel}/ (หรือไม่ได้ใช้ Vitest)` };
  const out = path.join(TMP, `${rel.replace(/\W/g, '_')}.json`);
  const env = { ...process.env };
  delete env.DB_FILE; delete env.TURSO_DATABASE_URL; delete env.TURSO_AUTH_TOKEN;
  spawnSync(process.execPath, [bin, 'run', '--reporter=json', `--outputFile=${out}`],
    { cwd: dir, env, encoding: 'utf8', timeout: 180000 });
  try {
    const j = JSON.parse(readFileSync(out, 'utf8'));
    const files = (j.testResults ?? []).map((t) => {
      const ar = t.assertionResults ?? [];
      return {
        name: path.relative(dir, t.name).replace(/\\/g, '/'),
        tests: ar.filter((a) => a.status === 'passed' || a.status === 'failed').length,   // ไม่นับ skip / todo
        skipped: ar.filter((a) => a.status !== 'passed' && a.status !== 'failed').length,
        failed: ar.filter((a) => a.status === 'failed').length,
        broken: t.status === 'failed' && !ar.length,
      };
    });
    const sum = (k) => files.reduce((n, f) => n + f[k], 0);
    return { ok: true, total: sum('tests'), skipped: sum('skipped'), failed: sum('failed'), broken: files.filter((f) => f.broken).length, files };
  } catch { return { ok: false, detail: `รัน vitest ใน ${rel}/ ไม่สำเร็จ — ลอง npm test ดู error` }; }
}
const countIn = (run, prefix) => run.ok ? run.files.filter((f) => f.name.startsWith(prefix)).reduce((n, f) => n + f.tests, 0) : 0;

// ── เปิด API ของทีม ───────────────────────────────────────────────
function startServer({ env: extra = {}, dbFile }) {
  return new Promise(async (resolve) => {
    const port = await freePort();
    const env = { ...process.env, PORT: String(port), DB_FILE: dbFile, CORS_ORIGIN: 'http://localhost:5173', ...extra };
    delete env.TURSO_DATABASE_URL; delete env.TURSO_AUTH_TOKEN;
    for (const [k, v] of Object.entries(extra)) if (v === undefined) delete env[k];
    const child = spawn(process.execPath, ['--disable-warning=ExperimentalWarning', 'src/server.js'], { cwd: API, env });
    children.add(child);
    let log = '';
    let exited = null;
    child.stdout.on('data', (d) => { log += d; });
    child.stderr.on('data', (d) => { log += d; });
    child.on('exit', (code) => { exited = code ?? -1; children.delete(child); });
    child.on('error', (e) => { log += `\n${e.message}`; exited = -1; children.delete(child); });   // เช่น ไม่มีโฟลเดอร์ api/
    resolve({
      port, child,
      base: `http://127.0.0.1:${port}`,
      log: () => log,
      exited: () => exited,
      stop: () => { try { child.kill('SIGKILL'); } catch {} },
    });
  });
}
async function waitHealthy(srv, ms = 20000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (srv.exited() !== null) return false;
    try { const r = await fetch(`${srv.base}/api/health`, { signal: AbortSignal.timeout(3000) }); if (r.status < 500 || r.status === 503) return true; } catch {}
    await sleep(300);
  }
  return false;
}
async function call(base, method, url, { body, token, raw, headers = {}, timeout = 15000 } = {}) {
  const h = { ...headers };
  if (token) h.Authorization = `Bearer ${token}`;
  let payload;
  if (raw !== undefined) { payload = raw; h['Content-Type'] = 'application/json'; }
  else if (body !== undefined) { payload = JSON.stringify(body); h['Content-Type'] = 'application/json'; }
  try {
    const r = await fetch(base + url, { method, headers: h, body: payload, signal: AbortSignal.timeout(timeout) });
    const text = await r.text();
    let json = null; try { json = text ? JSON.parse(text) : null; } catch {}
    return { status: r.status, json, text, headers: r.headers };
  } catch (e) {
    const why = e?.name === 'TimeoutError' ? `ไม่ตอบภายใน ${Math.round(timeout / 1000)} วินาที` : `ติดต่อไม่ได้ (${e?.cause?.code ?? e?.cause?.errors?.[0]?.code ?? e?.cause?.message ?? e?.message ?? e})`;
    return { status: 0, json: null, text: '', error: why };
  }
}
const listOf = (j) => {
  if (Array.isArray(j)) return j;
  if (j && typeof j === 'object') {
    for (const k of ['data', 'items', 'results']) if (Array.isArray(j[k])) return j[k];
    const arrays = Object.values(j).filter(Array.isArray);
    if (arrays.length === 1) return arrays[0];   // เช่น { loans: [...] }
  }
  return null;
};
const objOf = (j) => {
  if (!j || typeof j !== 'object' || Array.isArray(j)) return null;
  if (j[ID_FIELD] !== undefined) return j;
  for (const v of Object.values(j)) if (v && typeof v === 'object' && !Array.isArray(v) && v[ID_FIELD] !== undefined) return v;   // { data: {...} } หรือ { loan: {...} }
  return j;
};
const errorsOf = (j) => {
  const e = j?.errors ?? j?.details ?? j?.error ?? j?.message;
  return Array.isArray(e) ? e.length > 0 : !!(e && String(e).length);
};
const msgOf = (j) => JSON.stringify(j?.error ?? j?.message ?? j);
const decode = (t) => { try { return JSON.parse(Buffer.from(String(t).split('.')[1], 'base64url').toString('utf8')); } catch { return null; } };
/** รหัสที่ "ไม่มีอยู่จริง" แต่รูปแบบเหมือนรหัสของทีม: LN-001 → LN-999 · 1 → 999999 */
function missingIdLike(id) {
  const s = String(id ?? '');
  if (/^\d+$/.test(s)) return '999999';
  const m = s.match(/^(.*?)(\d+)$/);
  const guess = m ? `${m[1]}${'9'.repeat(Math.max(m[2].length, 3))}` : '';
  return guess && guess !== s ? guess : 'no-such-id-999999';
}

// ── ตาราง · foreign key จากฐานข้อมูลจริง (หรือจาก .sql ถ้าเปิดไม่ได้) ─────────
async function inspectDb(file) {
  if (!existsSync(file)) return null;
  try {
    const { DatabaseSync } = await import('node:sqlite');
    const db = new DatabaseSync(file, { readOnly: true });
    const q = (name) => `"${name.replace(/"/g, '""')}"`;
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all().map((r) => r.name);
    const fks = [];
    const columns = {};
    for (const t of tables) {
      for (const fk of db.prepare(`PRAGMA foreign_key_list(${q(t)})`).all()) fks.push({ from: t, to: fk.table });
      columns[t] = db.prepare(`PRAGMA table_info(${q(t)})`).all().map((c) => c.name);
    }
    db.close();
    return tables.length ? { source: 'จากฐานข้อมูลที่ API สร้าง', tables, fks, columns } : null;
  } catch { return null; }
}
function inspectSql() {
  const files = existsSync(path.join(API, 'data/schema.sql'))
    ? [path.join(API, 'data/schema.sql')]
    : listFiles(API, (f) => f.endsWith('.sql'));
  const sql = strip(readAll(files).replace(/--[^\n]*/g, ''));
  const tables = [], fks = [];
  for (const m of sql.matchAll(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?["`[]?(\w+)["`\]]?\s*\(([\s\S]*?)\)\s*;/gi)) {
    const t = m[1];
    if (!tables.includes(t)) tables.push(t);
    for (const r of m[2].matchAll(/REFERENCES\s+["`[]?(\w+)/gi)) fks.push({ from: t, to: r[1] });
  }
  return { source: files.length ? `จาก ${files.map(relp).join(', ')}` : 'ไม่พบไฟล์ .sql', tables, fks };
}

// ══════════════════════════════════════════════════════════════════
// TEAM · ส่วนของทีม
// ══════════════════════════════════════════════════════════════════
if (RUN.has('TEAM')) {
  const problems = [];
  if (!cfg) problems.push(cfgErr);
  else {
    if (![1, 2].includes(cfg.section)) problems.push('section ต้องเป็น 1 หรือ 2');
    if (!/^(T(0[1-9]|1[0-8])|CUSTOM)$/i.test(String(cfg.topic ?? ''))) problems.push('topic ต้องเป็น T01–T18 หรือ CUSTOM');
    if (members.length < 2 || members.length > 3) problems.push('members ต้องมี 2 หรือ 3 คน');
    const roles = members.map((m) => m?.role);
    if (roles.slice().sort().join() !== ROLES_OK.slice().sort().join()) problems.push(`บทบาทต้องเป็น ${ROLES_OK.join(' · ')} คนละหนึ่ง`);
    if (members.some((m) => !m?.name || !m?.studentId || !m?.github)) problems.push('สมาชิกทุกคนต้องมี name · studentId · github');
    if (!/^\/api\/[a-z0-9-]+$/.test(resource)) problems.push('api.resource ต้องเป็นรูปแบบ /api/<ชื่อ> เช่น /api/loans');
    if (resourceName === 'requests') problems.push('api.resource ยังเป็น /api/requests ของ Campus Service');
    if (existingId === undefined || existingId === null || existingId === '') problems.push('ต้องมี api.existingId (รหัสของรายการใน seed เช่น LN-001)');
    if (!apiCfg.validSample || typeof apiCfg.validSample !== 'object') problems.push('ต้องมี api.validSample');
    if (!apiCfg.statusUpdate || typeof apiCfg.statusUpdate !== 'object') problems.push('ต้องมี api.statusUpdate');
    if (apiCfg.ruleSamples !== undefined && (!Array.isArray(apiCfg.ruleSamples) || apiCfg.ruleSamples.some((s) => !s || typeof s.body !== 'object'))) {
      problems.push('api.ruleSamples ต้องเป็น array ของ { "rule": "…", "body": { … } }');
    }
    if (!cfg.devStaff?.email || !cfg.devStaff?.password) problems.push('ต้องมี devStaff.email และ devStaff.password');
  }
  rec('TEAM', 'T1', 'project.config.json กรอกครบและถูกรูปแบบ', problems.length === 0, problems.join(' · '));

  const contract = read('TEAM_CONTRACT.md');
  const named = members.filter((m) => m?.name && contract.includes(m.name)).length;
  const phC = placeholders(contract);
  rec('TEAM', 'T2', 'TEAM_CONTRACT.md กรอกแล้ว (มีชื่อสมาชิกทุกคน · ไม่มีช่อง <…> ค้าง)',
    contract && members.length && named === members.length && phC.length === 0,
    !contract ? 'ไม่พบไฟล์' : `พบชื่อ ${named}/${members.length} คน${phC.length ? ` · ยังมีช่องค้าง: ${showPh(phC)}` : ''}`);

  const readme = read('README.md');
  const need = [['ติดตั้ง', /ติดตั้ง|install/i], ['วิธีรัน', /วิธีรัน|run/i], ['test', /test|ทดสอบ/i], ['deploy', /deploy/i],
    ['บัญชีทดสอบ', /บัญชีทดสอบ|test account/i], ['การใช้ AI', /การใช้ AI|AI disclosure/i]];
  const miss = need.filter(([, re]) => !re.test(readme)).map(([n]) => n);
  const hasUrl = cfg?.deployUrl && readme.includes(String(cfg.deployUrl).replace(/\/+$/, ''));
  if (!hasUrl) miss.push('URL ที่ deploy (ตรงกับ deployUrl)');
  const noName = members.filter((m) => m?.name && !readme.includes(m.name)).map((m) => m.name);
  if (noName.length) miss.push(`ชื่อสมาชิก (${noName.join(', ')})`);
  if (/Campus Service/i.test(readme.split('\n').slice(0, 5).join('\n'))) miss.push('หัวเรื่องยังเป็น Campus Service');
  const phR = placeholders(readme);
  if (phR.length) miss.push(`ช่องของแม่แบบที่ยังไม่กรอก: ${showPh(phR)}`);
  rec('TEAM', 'T3', 'README.md ครบตามแม่แบบ', readme && miss.length === 0, readme ? (miss.length ? `ขาด: ${miss.join(' · ')}` : '') : 'ไม่พบไฟล์');

  const contractApi = read('API_CONTRACT.md');
  rec('TEAM', 'T4', 'API_CONTRACT.md อธิบาย resource ของหัวข้อ', resource && contractApi.includes(resource) && !/\/api\/requests\b/.test(contractApi),
    !contractApi ? 'ไม่พบไฟล์' : (/\/api\/requests\b/.test(contractApi) ? 'ยังมี /api/requests ของเดิม' : `ไม่พบ ${resource || '(resource)'}`));

  const isRepo = git('rev-parse', '--is-inside-work-tree').stdout.trim() === 'true';
  if (!isRepo) {
    rec('TEAM', 'T5', `git: ผู้ commit ≥ ${members.length || 2} คน · PR ที่ merge ≥ ${Math.max(2, members.length) * 2}`, false, 'โฟลเดอร์นี้ไม่ใช่ git repository');
    rec('TEAM', 'T6', 'มี tag v1.0.0', false, 'โฟลเดอร์นี้ไม่ใช่ git repository');
  } else {
    const authors = new Set(git('log', '--format=%ae').stdout.split('\n').map((s) => s.trim().toLowerCase()).filter(Boolean));
    const subjects = git('log', '--format=%s').stdout.split('\n');
    const prs = new Set();
    for (const s of subjects) {
      const m = s.match(/Merge pull request #(\d+)/) ?? s.match(/\(#(\d+)\)\s*$/);
      if (m) prs.add(m[1]);
    }
    const needPr = Math.max(2, members.length) * 2;
    rec('TEAM', 'T5', `git: ผู้ commit ≥ ${members.length || 2} คน · PR ที่ merge ≥ ${needPr}`,
      authors.size >= (members.length || 2) && prs.size >= needPr, `ผู้ commit ${authors.size} คน · PR ${prs.size}`);
    const tags = git('tag', '-l', 'v*').stdout.split('\n').filter(Boolean);
    rec('TEAM', 'T6', 'มี tag v1.0.0', tags.includes('v1.0.0'), `tag ที่มี: ${tags.join(' ') || '—'}`);
  }
}

// ══════════════════════════════════════════════════════════════════
// BE · Back-end
// ══════════════════════════════════════════════════════════════════
if (RUN.has('BE')) {
  const b1 = rec('BE', 'B1', 'ตารางของหัวข้อ ≥ 2 (ไม่นับ users) · เชื่อมกันด้วย FOREIGN KEY · ไม่มีตาราง requests เดิม', false, '');
  const SECRET = randomBytes(24).toString('hex');
  let jwt = null;
  try { jwt = createRequire(path.join(API, 'package.json'))('jsonwebtoken'); } catch {}
  const sign = (payload, secret) => { try { return jwt.sign(payload, secret, { expiresIn: '5m' }); } catch { return 'x.y.z'; } };

  const dbFile = path.join(TMP, 'dev.db');
  if (existsSync(path.join(API, 'scripts/setup-db.mjs'))) {
    spawnSync(process.execPath, ['--disable-warning=ExperimentalWarning', 'scripts/setup-db.mjs', '--force'],
      { cwd: API, env: { ...process.env, DB_FILE: dbFile, TURSO_DATABASE_URL: '', TURSO_AUTH_TOKEN: '' }, encoding: 'utf8' });
  }
  const names = {
    health: 'GET /api/health → 200 · ต่อฐานข้อมูลได้ · ใช้ DB_FILE ที่ checker กำหนด',
    list: `GET ${resource || '/api/<resource>'} → 200 รายการ ≥ 5`,
    filter: 'กรองด้วย ?status= ได้เฉพาะสถานะนั้น',
    one: 'GET /:id → 200 · ไม่มี → 404',
    post: 'POST ข้อมูลถูก → 201 · ข้อมูลว่าง/ผิดกฎ → 400 พร้อม error',
    big: 'body ใหญ่เกิน 10kb → 413',
    noauth: 'PUT · DELETE ไม่มี token / token ปลอม → 401',
    forbidden: 'PUT · DELETE ด้วย token ที่ไม่ใช่เจ้าหน้าที่ → 403',
    login: `login: ถูก → token (role ${STAFF_ROLE} · มี exp · ไม่มีรหัสผ่าน) · ผิดกับอีเมลไม่มี → 401 ข้อความเดียวกัน`,
    staff: 'เจ้าหน้าที่: PUT → 200 (บันทึกจริง) · DELETE → 204 · GET ซ้ำ → 404',
  };
  const srv = existsSync(path.join(API, 'src/server.js'))
    ? await startServer({ dbFile, env: { NODE_ENV: 'development', JWT_SECRET: SECRET } })
    : null;
  const up = srv && await waitHealthy(srv);

  // B1 — ดูจากฐานข้อมูลที่ API สร้างจริง (ไม่ผูกกับชื่อไฟล์ schema) · เปิดไม่ได้ค่อยอ่าน .sql
  const schema = (up && await inspectDb(dbFile)) || inspectSql();
  {
    const own = schema.tables.filter((t) => !/^users$/i.test(t));
    const link = schema.fks.find((k) => k.from !== k.to && own.includes(k.from) && own.some((t) => t.toLowerCase() === String(k.to).toLowerCase()));
    const why = [];
    if (own.length < 2) why.push(`ตารางของหัวข้อมี ${own.length} ตาราง (ต้อง ≥ 2 ไม่นับ users)`);
    if (!link) why.push('ไม่มี FOREIGN KEY เชื่อมตารางของหัวข้อกับตารางที่เกี่ยวข้อง (FK ไป users อย่างเดียวไม่นับ)');
    if (schema.tables.some((t) => /^requests$/i.test(t))) why.push('ยังมีตาราง requests ของ Campus Service');
    b1.ok = why.length === 0;
    b1.detail = `ตาราง: ${schema.tables.join(', ') || '—'} · FK: ${schema.fks.map((k) => `${k.from}→${k.to}`).join(', ') || '—'} (${schema.source})${why.length ? ` · ${why.join(' · ')}` : ''}`;
  }

  if (!up || !resource) {
    const why = !srv ? 'ไม่พบ api/src/server.js' : !resource ? 'ยังไม่ได้กรอก api.resource' : `เปิด API ไม่ได้ — ${srv.log().split('\n').filter(Boolean).slice(-3).join(' | ') || 'ไม่ตอบภายใน 20 วินาที'}`;
    for (const [k, n] of Object.entries(names)) rec('BE', `B2.${k}`, n, false, why);
  } else {
    const B = srv.base;
    const out = {};
    let r = await call(B, 'GET', '/api/health');
    const dbOk = r.json?.database?.connected ?? r.json?.db?.connected ?? (r.json?.status === 'ok');
    out.health = [r.status === 200 && dbOk, `ได้ ${r.status}${r.status === 200 && !dbOk ? ' · ไม่บอกว่าต่อฐานข้อมูลได้ (database.connected)' : ''}`];

    r = await call(B, 'GET', resource);
    const list = listOf(r.json);
    out.list = [r.status === 200 && list && list.length >= 5, `ได้ ${r.status} · ${list ? list.length + ' รายการ' : 'ไม่ใช่ array'}`];

    const want = apiCfg.statusFilter ?? (list?.find((x) => x?.[SF])?.[SF]);
    r = await call(B, 'GET', `${resource}?status=${encodeURIComponent(want ?? '')}`);
    const fl = listOf(r.json);
    out.filter = [want && r.status === 200 && fl && fl.length >= 1 && fl.every((x) => x?.[SF] === want) && (!list || fl.length < list.length),
      `?status=${want} → ${r.status} · ${fl ? fl.length : '-'} รายการ${fl && list && fl.length === list.length ? ' (เท่ากับทั้งหมด — ยังไม่ได้กรอง)' : ''}`];

    const itemUrl = (id) => `${resource}/${encodeURIComponent(id ?? '')}`;
    const missing = missingIdLike(existingId);
    const r1 = await call(B, 'GET', itemUrl(existingId));
    const r2 = await call(B, 'GET', itemUrl(missing));
    out.one = [r1.status === 200 && r2.status === 404, `${existingId} → ${r1.status} (ต้อง 200) · ${missing} → ${r2.status} (ต้อง 404)`];

    // login เจ้าหน้าที่ไว้ก่อน (ผลตรวจอยู่ในข้อ B2.login) — ใช้ลบรายการที่ ruleSamples สร้างขึ้นโดยไม่ตั้งใจ
    const staff = cfg?.devStaff ?? {};
    const lg = await call(B, 'POST', '/api/auth/login', { body: { email: staff.email, password: staff.password } });
    const lw = await call(B, 'POST', '/api/auth/login', { body: { email: staff.email, password: `${staff.password}-wrong` } });
    const lu = await call(B, 'POST', '/api/auth/login', { body: { email: `nobody-${Date.now()}@example.com`, password: staff.password } });
    const token = lg.json?.token ?? lg.json?.accessToken;

    // POST — ดูด้วยว่า API เขียนลงไฟล์ DB_FILE ของ checker จริง (ไม่ใช่ฐานข้อมูลจริงของทีม)
    const before = [fileHash(dbFile), fileHash(`${dbFile}-wal`)].join();
    const rp = await call(B, 'POST', resource, { body: validSample });
    const re = await call(B, 'POST', resource, { body: invalidSample });
    const created = objOf(rp.json);
    const createdId = created?.[ID_FIELD];
    const ruleRes = [];
    for (const s of ruleSamples) {
      const x = await call(B, 'POST', resource, { body: s.body });
      ruleRes.push({ rule: s.rule ?? JSON.stringify(s.body).slice(0, 40), status: x.status, ok: x.status === 400 && errorsOf(x.json) });
      // ผิดกฎแต่ถูกสร้าง → ลบทิ้งทันที ไม่ให้กระทบกฎข้อถัดไป (เช่น จำนวนที่ว่างลดลง)
      const made = x.status === 201 ? objOf(x.json)?.[ID_FIELD] : undefined;
      if (made !== undefined && token) await call(B, 'DELETE', itemUrl(made), { token });
    }
    const badRules = ruleRes.filter((x) => !x.ok);
    const postDetail = [`ข้อมูลถูก → ${rp.status}${rp.status !== 201 ? ` (ต้อง 201)${rp.json ? ' ' + JSON.stringify(rp.json).slice(0, 160) : ''}` : ''}${rp.status === 201 && createdId === undefined ? ` · คำตอบไม่มีฟิลด์ ${ID_FIELD}` : ''}`,
      `ข้อมูลว่าง → ${re.status}${re.status !== 400 ? ' (ต้อง 400 พร้อมรายการ error — มี validation หรือยัง?)' : (errorsOf(re.json) ? '' : ' แต่ไม่มีข้อความ error')}`,
      ...(ruleSamples.length ? [`กฎเฉพาะ ${ruleRes.length - badRules.length}/${ruleRes.length}${badRules.length ? ` · ผิดกฎแต่ได้ ${badRules.map((x) => `${x.status} (${x.rule})`).join(', ')}` : ''}`] : [])];
    out.post = [rp.status === 201 && createdId !== undefined && re.status === 400 && errorsOf(re.json) && badRules.length === 0, postDetail.join(' · ')];
    const after = [fileHash(dbFile), fileHash(`${dbFile}-wal`)].join();
    if (out.health[0] && rp.status === 201 && before === after) {
      out.health = [false, 'API ไม่ได้บันทึกลงไฟล์ DB_FILE ที่ checker ส่งให้ — config ต้องอ่านไฟล์ฐานข้อมูลจาก process.env.DB_FILE (ไม่งั้น checker จะไปแก้ฐานข้อมูลจริงของทีม)'];
    }

    r = await call(B, 'POST', resource, { raw: JSON.stringify({ ...validSample, padding: 'x'.repeat(11 * 1024) }) });
    out.big = [r.status === 413 && r.json, `ได้ ${r.status}${r.status === 413 && !r.json ? ' แต่ไม่ใช่ JSON' : ''}`];

    // ไม่มี token / token ปลอม / token ที่ไม่ใช่เจ้าหน้าที่ — ทั้ง PUT และ DELETE
    // DELETE ยิงไปที่รายการอื่นใน seed (ไม่ใช่ existingId) — ถ้าไม่ได้ป้องกันไว้จะถูกลบจริง (ในฐานข้อมูลชั่วคราว)
    const putUrl = itemUrl(existingId);
    const victim = (list ?? []).map((x) => x?.[ID_FIELD]).filter((id) => id !== undefined && String(id) !== String(existingId) && String(id) !== String(createdId)).pop();
    const forged = sign({ sub: '1', name: 'x', role: STAFF_ROLE }, 'not-the-real-secret');
    const notStaff = sign({ sub: '999', name: 'checker', role: 'requester' }, SECRET);
    const p0 = await call(B, 'PUT', putUrl, { body: statusUpdate });
    const p1 = await call(B, 'PUT', putUrl, { body: statusUpdate, token: forged });
    const d0 = victim !== undefined ? await call(B, 'DELETE', itemUrl(victim)) : null;
    const d1 = victim !== undefined ? await call(B, 'DELETE', itemUrl(victim), { token: forged }) : null;
    const p2 = await call(B, 'PUT', putUrl, { body: statusUpdate, token: notStaff });
    const d2 = victim !== undefined ? await call(B, 'DELETE', itemUrl(victim), { token: notStaff }) : null;
    const still = victim !== undefined ? await call(B, 'GET', itemUrl(victim)) : null;
    const want401 = [['PUT ไม่มี token', p0], ['PUT token ปลอม', p1], ['DELETE ไม่มี token', d0], ['DELETE token ปลอม', d1]].filter(([, x]) => x);
    const bad401 = want401.filter(([, x]) => x.status !== 401);
    out.noauth = [bad401.length === 0 && victim !== undefined,
      victim === undefined ? 'หารายการอื่นใน seed สำหรับทดสอบ DELETE ไม่ได้ (ต้องมี ≥ 2 รายการ)'
        : bad401.length ? `${bad401.map(([n, x]) => `${n} → ${x.status}`).join(' · ')} (ต้อง 401 — route ยังไม่มี authenticate หรือไม่ได้ตรวจลายเซ็น token)` : ''];
    const want403 = [['PUT', p2], ['DELETE', d2]].filter(([, x]) => x);
    const bad403 = want403.filter(([, x]) => x.status !== 403);
    const hint403 = bad403.length && bad403.every(([, x]) => x.status === 401)
      ? 'ต้อง 403 — ได้ 401 แปลว่า API ไม่ยอมรับ token ที่เซ็นด้วย JWT_SECRET จาก env (secret เขียนตรงในโค้ด?)'
      : 'ต้อง 403 — ขาด requireRole?';
    out.forbidden = [jwt && bad403.length === 0 && victim !== undefined && still?.status === 200,
      !jwt ? 'ไม่พบ jsonwebtoken ใน api/' : victim === undefined ? 'หารายการอื่นใน seed สำหรับทดสอบ DELETE ไม่ได้'
        : [bad403.length ? `${bad403.map(([n, x]) => `${n} → ${x.status}`).join(' · ')} (${hint403})` : '',
          still?.status !== 200 ? `รายการ ${victim} ถูกลบโดยคนที่ไม่ใช่เจ้าหน้าที่` : ''].filter(Boolean).join(' · ')];

    const pl = decode(token);
    const sameMsg = msgOf(lw.json) === msgOf(lu.json);
    const okLogin = lg.status === 200 && String(token ?? '').split('.').length === 3 && pl?.role === STAFF_ROLE && pl?.exp
      && !JSON.stringify(pl).includes(String(staff.password)) && !('password' in (pl ?? {}))
      && lw.status === 401 && lu.status === 401 && sameMsg;
    out.login = [okLogin, `ถูก ${lg.status}${lg.status === 200 && pl?.role !== STAFF_ROLE ? ` (role ใน token = ${pl?.role ?? '—'})` : ''}${lg.status === 200 && pl && !pl.exp ? ' (token ไม่มี exp)' : ''} · รหัสผิด ${lw.status} · อีเมลไม่มี ${lu.status}${lw.status === 401 && lu.status === 401 && !sameMsg ? ' · ข้อความต่างกัน' : ''}`];

    const ps = await call(B, 'PUT', putUrl, { body: statusUpdate, token });
    const newStatus = statusUpdate?.[SF];
    const psBody = objOf(ps.json);
    const reread = objOf((await call(B, 'GET', putUrl)).json);
    const saved = newStatus === undefined || reread?.[SF] === newStatus;
    const statusOk = ps.status === 200 && (newStatus === undefined || !psBody || psBody[SF] === undefined || psBody[SF] === newStatus) && saved;
    let dOk = false, dDetail = 'ไม่มีรายการที่สร้างจาก POST ให้ลบ';
    if (createdId !== undefined) {
      const d = await call(B, 'DELETE', itemUrl(createdId), { token });
      const g = await call(B, 'GET', itemUrl(createdId));
      dOk = [200, 204].includes(d.status) && g.status === 404;
      dDetail = `DELETE ${d.status} · GET ซ้ำ ${g.status}`;
    }
    out.staff = [okLogin && statusOk && dOk, okLogin
      ? `PUT ${ps.status}${ps.status !== 200 && ps.json ? ' ' + JSON.stringify(ps.json).slice(0, 120) : ''}${ps.status === 200 && !saved ? ` · GET ซ้ำได้ ${SF} = ${reread?.[SF]} (ไม่ได้บันทึก)` : ''} · ${dDetail}`
      : 'ต้อง login เจ้าหน้าที่ให้ผ่านก่อน (ข้อ B2.login)'];
    srv.stop();
    for (const [k, n] of Object.entries(names)) rec('BE', `B2.${k}`, n, out[k][0], out[k][1]);
  }

  const apiRun = runVitest(API);
  const unit = countIn(apiRun, 'tests/unit');
  const integ = countIn(apiRun, 'tests/integration');
  const allPass = apiRun.ok && apiRun.failed === 0 && apiRun.broken === 0;
  rec('BE', 'B3', 'api: unit ≥ 10 · integration ≥ 12 · ผ่านทั้งหมด',
    allPass && unit >= 10 && integ >= 12,
    apiRun.ok ? `unit ${unit} · integration ${integ} · ไม่ผ่าน ${apiRun.failed}${apiRun.broken ? ` · ไฟล์ที่โหลดไม่ขึ้น ${apiRun.broken}` : ''}${apiRun.skipped ? ` · ข้าม/todo ${apiRun.skipped} (ไม่นับ)` : ''}` : apiRun.detail);
  const testSrc = readAll(listFiles(path.join(API, 'tests'), (f) => /\.test\.[cm]?[jt]s$/.test(f)));
  rec('BE', 'B4', 'integration test มีกรณี 401 และ 403 ของ resource ใหม่',
    /401/.test(testSrc) && /403/.test(testSrc) && resourceName && testSrc.includes(resourceName),
    !resourceName ? 'ยังไม่ได้กรอก api.resource' : [!/401/.test(testSrc) ? 'ไม่พบ 401' : '', !/403/.test(testSrc) ? 'ไม่พบ 403' : '', !testSrc.includes(resourceName) ? `ไม่พบ "${resourceName}" ใน api/tests` : ''].filter(Boolean).join(' · '));

  // DEBUG_LOG — นับทีละ bug · bug ที่ซ้ำกับ LAB 12 (Campus Service) = เจอร่องรอยเฉพาะของ LAB นั้น ≥ 2 อย่างใน bug เดียวกัน
  // (ชื่อทั่วไปอย่าง nextId หรือการพูดถึง requests/REQ- ครั้งเดียว เช่น bug ตอนแปลงโค้ดมาเป็นหัวข้อใหม่ ไม่นับว่าคัดลอก)
  const dlog = read('DEBUG_LOG.md');
  const sections = dlog.split(/^(?=#{2,3}\s)/m).filter((s) => /^#{2,3}\s/.test(s));
  const LAB12 = [/MIN_DETAILS/, /requestSummary|summarizeRequests/, /COUNT\(\*\)\s*\+\s*1/, /['"]in progress['"]/, /REQ-\d{3}/,
    /กำลังดำเนินการ 0/, /รายละเอียด\s*10 ตัวอักษร/, /updated\.id/, /request(Controller|Validator|Service)\b/, /\/api\/requests\b/];
  const filled = sections.filter((s) => /\*\*สาเหตุ[^*]*\*\*[ \t]*\S[^\n]{5,}/.test(s));
  const copied = filled.filter((s) => LAB12.filter((re) => re.test(s)).length >= 2);
  const real = filled.length - copied.length;
  rec('BE', 'B5', 'DEBUG_LOG.md: bug จริงของโปรเจกต์ ≥ 2 (มีสาเหตุ · ไม่ใช่ bug ของ LAB 12)', real >= 2 && copied.length === 0,
    !dlog ? 'ไม่พบไฟล์' : `กรอกสาเหตุ ${filled.length} bug${copied.length ? ` · ${copied.length} bug ซ้ำกับ LAB 12 (Campus Service) เช่น "${copied[0].split('\n')[0].replace(/^#+\s*/, '').trim()}"` : ''}${real < 2 ? ` · bug จริงของโปรเจกต์ ${real} (ต้อง ≥ 2)` : ''}`);
}

// ══════════════════════════════════════════════════════════════════
// FE · Front-end
// ══════════════════════════════════════════════════════════════════
/**
 * ลองเรียกทุกฟังก์ชันที่ export จากไฟล์ .js ใน frontend/src (ชั้น service) ด้วย fetch ปลอม
 * login ก่อนด้วยฟังก์ชัน login ของทีมเอง แล้วดูว่า PUT/DELETE ไปที่ resource แนบ Authorization: Bearer จริงไหม
 * (ไม่ผูกกับชื่อไฟล์หรือวิธีเก็บ token — localStorage · sessionStorage · ตัวแปรใน memory ใช้ได้หมด)
 */
const PROBE_SRC = String.raw`
import { writeFileSync } from 'node:fs';
const E = process.env;
const FILES = JSON.parse(E.ENGSE203_PROBE_FILES);
const RES = E.ENGSE203_RESOURCE, ID = E.ENGSE203_ID, STATUS = E.ENGSE203_STATUS, ROLE = E.ENGSE203_ROLE, SF = E.ENGSE203_STATUS_FIELD;
const enc = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
const now = Math.floor(Date.now() / 1000);
const TOKEN = enc({ alg: 'HS256', typ: 'JWT' }) + '.' + enc({ sub: '1', name: 'checker', role: ROLE, iat: now, exp: now + 3600 }) + '.Y2hlY2tlcg';
const mem = () => { const m = new Map(); return { getItem: (k) => (m.has(String(k)) ? m.get(String(k)) : null), setItem: (k, v) => { m.set(String(k), String(v)); }, removeItem: (k) => { m.delete(String(k)); }, clear: () => m.clear(), key: (i) => [...m.keys()][i] ?? null, get length() { return m.size; } }; };
const pathOf = (u) => { try { return new URL(String(u), 'http://localhost').pathname; } catch { return String(u); } };
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
let calls = [];
function setup() {
  calls = [];
  const et = new EventTarget();
  Object.assign(globalThis, {
    window: globalThis, addEventListener: et.addEventListener.bind(et), removeEventListener: et.removeEventListener.bind(et), dispatchEvent: et.dispatchEvent.bind(et),
    localStorage: mem(), sessionStorage: mem(),
    location: { hash: '#/', href: 'http://localhost/#/', pathname: '/', search: '', origin: 'http://localhost', assign() {}, replace() {}, reload() {} },
  });
  globalThis.fetch = async (input, init = {}) => {
    const url = typeof input === 'string' || input instanceof URL ? String(input) : input.url;
    const method = String(init.method ?? input?.method ?? 'GET').toUpperCase();
    let auth = null; try { auth = new Headers(init.headers ?? input?.headers ?? {}).get('authorization'); } catch {}
    const p = pathOf(url);
    calls.push({ url: p, method, auth });
    if (/\/auth\/login\/?$/.test(p)) return json(200, { token: TOKEN, accessToken: TOKEN, user: { id: 1, name: 'checker', role: ROLE } });
    if (method === 'DELETE') return new Response(null, { status: 204 });
    if (method === 'GET' && p.replace(/\/+$/, '') === RES) return json(200, []);
    return json(method === 'POST' ? 201 : 200, { id: ID, [SF]: STATUS });
  };
}
const settle = (p) => Promise.race([Promise.resolve(p), new Promise((r) => setTimeout(r, 3000))]).catch(() => {});
const errors = [];
async function loadAll() {
  const mods = [];
  for (const f of FILES) { try { mods.push([f, await import(f)]); } catch (e) { errors.push(f.split(/[\\/]/).pop() + ': ' + String(e?.message ?? e).slice(0, 120)); } }
  return mods;
}
const isLogin = (n) => /log_?in|sign_?in/i.test(n) && !/log_?out|sign_?out/i.test(n);
const isTarget = (n, v) => typeof v === 'function' && !/^[A-Z]/.test(n) && !/^use[A-Z]/.test(n) && !isLogin(n) && !/log_?out|sign_?out|clear|remove.*token|set.*token/i.test(n);
test('engse203 frontend probe', async () => {
  const report = { token: TOKEN, results: [], errors, targets: 0 };
  vi.resetModules(); setup();
  const targets = (await loadAll()).flatMap(([f, m]) => Object.entries(m).filter(([n, v]) => isTarget(n, v)).map(([n]) => [f, n]));
  report.targets = targets.length;
  for (const [file, name] of targets) {
    vi.resetModules(); setup();
    const mods = await loadAll();
    for (const [, m] of mods) for (const [n, fn] of Object.entries(m)) if (typeof fn === 'function' && isLogin(n)) { try { await settle(fn('checker@example.com', 'checker-pass')); } catch {} }
    const loginSeen = calls.some((c) => /\/auth\/login\/?$/.test(c.url));
    const before = calls.length;
    const fn = mods.find(([f]) => f === file)?.[1]?.[name];
    try { await settle(fn(ID, STATUS)); } catch {}
    try { await settle(fn(ID, { [SF]: STATUS })); } catch {}
    for (const c of calls.slice(before)) report.results.push({ ...c, fn: file.split(/[\\/]/).pop() + ' → ' + name, loginSeen });
  }
  writeFileSync(E.ENGSE203_PROBE_OUT, JSON.stringify(report));
}, 120000);
`;
function probeFrontendAuth() {
  const bin = vitestBin(FE);
  if (!bin || !resource) return { ran: false };
  const files = listFiles(path.join(FE, 'src'), (f) => /\.(m?js|ts)$/.test(f) && !/\.(test|spec)\./.test(f) && !/^main\.[jt]s$/.test(path.basename(f)));
  if (!files.length) return { ran: false };
  const dirName = `.engse203-probe-${process.pid}`;
  const dir = path.join(FE, dirName);
  scratch.add(dir);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'probe.test.mjs'), PROBE_SRC);
  const cfgFile = path.join(TMP, 'probe.vitest.config.mjs');
  writeFileSync(cfgFile, `export default { test: { include: [${JSON.stringify(`${dirName}/probe.test.mjs`)}], environment: 'node', globals: true, testTimeout: 120000, watch: false } };\n`);
  const out = path.join(TMP, 'fe-probe.json');
  spawnSync(process.execPath, [bin, 'run', '--config', cfgFile, '--root', FE], {
    cwd: FE, encoding: 'utf8', timeout: 180000,
    env: { ...process.env, ENGSE203_PROBE_OUT: out, ENGSE203_PROBE_FILES: JSON.stringify(files.map((f) => f.replace(/\\/g, '/'))), ENGSE203_RESOURCE: resource,
      ENGSE203_ID: String(existingId ?? '1'), ENGSE203_STATUS: String(statusUpdate?.[SF] ?? ''), ENGSE203_STATUS_FIELD: SF, ENGSE203_ROLE: STAFF_ROLE },
  });
  rmSync(dir, { recursive: true, force: true });
  scratch.delete(dir);
  try { return { ran: true, ...JSON.parse(readFileSync(out, 'utf8')) }; } catch { return { ran: false }; }
}

if (RUN.has('FE')) {
  const src = path.join(FE, 'src');
  const jsFiles = listFiles(src, (f) => /\.(m?jsx?|tsx?)$/.test(f) && !/\.(test|spec)\./.test(f));
  const codeOf = new Map(jsFiles.map((f) => [f, strip(readAll([f]))]));
  const code = [...codeOf.values()].join('\n');

  // F1 — หน้า login ดูจากพฤติกรรม: มีช่องรหัสผ่าน และโค้ดเรียก /auth/login (ชื่อไฟล์อะไรก็ได้)
  const pwPages = jsFiles.filter((f) => /\.(jsx|tsx)$/.test(f) && /type\s*=\s*\{?\s*["'`]password["'`]/.test(codeOf.get(f)));
  const callsLogin = /auth\/login/.test(code);
  rec('FE', 'F1', 'มีหน้า login (ช่องรหัสผ่าน + เรียก /api/auth/login)', pwPages.length > 0 && callsLogin,
    pwPages.length && callsLogin ? pwPages.map(relp).join(', ')
      : [!pwPages.length ? 'ไม่พบหน้า .jsx ที่มี <input type="password">' : '', !callsLogin ? 'ไม่พบการเรียก /api/auth/login ใน frontend/src' : ''].filter(Boolean).join(' · '));

  // F2 — แนบ token ที่ชั้น service ที่เดียว · ไม่มีไฟล์ไหนเรียก fetch เองสำหรับ PUT/DELETE โดยไม่แนบ · และลองเรียกจริง
  const fetchFiles = jsFiles.filter((f) => /\bfetch\s*\(|\baxios\b/.test(codeOf.get(f)));
  const authFiles = jsFiles.filter((f) => /Authorization/.test(codeOf.get(f)) && /Bearer/.test(codeOf.get(f)));
  const bypass = fetchFiles.filter((f) => !authFiles.includes(f) && /method\s*:\s*['"`](PUT|DELETE|PATCH)['"`]/i.test(codeOf.get(f)));
  const probe = probeFrontendAuth();
  const mutating = probe.ran ? (probe.results ?? []).filter((c) => ['PUT', 'DELETE', 'PATCH'].includes(c.method) && c.url.startsWith(`${resource}/`) && c.loginSeen) : [];
  const noBearer = mutating.filter((c) => c.auth !== `Bearer ${probe.token}`);
  const f2why = [];
  if (!authFiles.length) f2why.push('ไม่พบ "Authorization: Bearer" ใน frontend/src');
  if (bypass.length) f2why.push(`${bypass.map(relp).join(', ')} เรียก fetch เองสำหรับ PUT/DELETE โดยไม่แนบ token (ให้เรียกผ่าน apiClient)`);
  if (noBearer.length) f2why.push(`ลอง login แล้วเรียก ${noBearer[0].fn}() → ${noBearer[0].method} ${noBearer[0].url} ไม่มี Authorization: Bearer${noBearer.length > 1 ? ` (และอีก ${noBearer.length - 1} คำขอ)` : ''} — apiClient ต้องอ่าน token เองแล้วแนบไปกับ fetch ทุกครั้ง`);
  rec('FE', 'F2', 'แนบ Authorization: Bearer ในชั้น service (ไม่กระจายในหน้า) · PUT/DELETE ส่ง token จริง', f2why.length === 0,
    f2why.length ? f2why.join(' · ') : (mutating.length ? `ลองเรียก PUT/DELETE ${mutating.length} ครั้ง แนบ token ครบ` : 'ตรวจจากโค้ด (ลองเรียกชั้น service ไม่ได้)'));
  rec('FE', 'F3', 'จัดการ 401 (ล้าง token / พาไป login)', /\b401\b/.test(code), /\b401\b/.test(code) ? '' : 'ไม่พบการจัดการ status 401 ใน frontend/src');
  rec('FE', 'F4', 'ไม่ใช้ dangerouslySetInnerHTML', !/dangerouslySetInnerHTML/.test(code));
  rec('FE', 'F5', `เรียก resource ของหัวข้อ (${resource || '/api/<resource>'})`,
    resourceName && new RegExp(`['"\`/]${resourceName}\\b`).test(code) && resourceName !== 'requests',
    resourceName ? `ค้นหา "/${resourceName}" ใน frontend/src` : 'ยังไม่ได้กรอก api.resource');
  const feRun = runVitest(FE);
  rec('FE', 'F6', 'frontend test ≥ 3 ข้อ ผ่านทั้งหมด', feRun.ok && feRun.total >= 3 && feRun.failed === 0 && feRun.broken === 0,
    feRun.ok ? `${feRun.total} ข้อ · ไม่ผ่าน ${feRun.failed}${feRun.broken ? ` · ไฟล์ที่โหลดไม่ขึ้น ${feRun.broken}` : ''}${feRun.skipped ? ` · ข้าม/todo ${feRun.skipped} (ไม่นับ)` : ''}` : feRun.detail);
  if (SKIP_BUILD) skip('FE', 'F7', 'npm run build ผ่าน', 'ข้าม (--skip-build)');
  else {
    const b = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build', '--prefix', FE],
      { cwd: ROOT, encoding: 'utf8', timeout: 180000, shell: process.platform === 'win32', env: { ...process.env, NODE_ENV: 'production' } });
    const lines = `${b.stderr ?? ''}\n${b.stdout ?? ''}`.replace(/\x1b\[[0-9;]*m/g, '').split('\n').map((l) => l.trim()).filter(Boolean);
    const main = lines.find((l) => /Could not resolve|UNRESOLVED_IMPORT|SyntaxError|Unexpected|Expected|is not exported|Failed to resolve|Transform failed|error TS\d+/i.test(l))
      ?? lines.find((l) => /error/i.test(l) && !/^error during build:?$/i.test(l) && !/errors: \[/.test(l))
      ?? lines.slice(-2).join(' | ');
    const where = lines.find((l) => /src\/[^\s:]+:\d+(:\d+)?/.test(l) && l !== main);
    rec('FE', 'F7', 'npm run build ผ่าน', b.status === 0, b.status === 0 ? '' : `${main}${where ? ` · ${where.replace(/^[│╭─\s[]+|[\]\s]+$/g, '')}` : ''}`.slice(0, 300));
  }
}

// ══════════════════════════════════════════════════════════════════
// DEVOPS
// ══════════════════════════════════════════════════════════════════
let wfText = '';
if (RUN.has('DEVOPS') || RUN.has('TRIO')) {
  wfText = stripYaml(readAll(listFiles(path.join(ROOT, '.github/workflows'), (f) => /\.ya?ml$/.test(f))));
}
async function online(urlPath, tries = 3) {
  const url = String(cfg?.deployUrl ?? '').replace(/\/+$/, '');
  let r = { status: 0, error: 'ยังไม่ได้กรอก deployUrl' };
  if (!url) return { url, r };
  for (let i = 0; i < tries; i++) {
    r = await call(url, 'GET', urlPath, { timeout: 60000 });
    if (r.status === 200) break;
    if (i < tries - 1) await sleep(20000);   // Render free tier อาจกำลังตื่น (cold start)
  }
  return { url, r };
}
if (RUN.has('DEVOPS')) {
  const missWf = [!/npm (run )?test\b/.test(wfText) ? 'npm test' : '', !/\bpush\b/.test(wfText) ? 'push' : '', !/\bpull_request\b/.test(wfText) ? 'pull_request' : ''].filter(Boolean);
  rec('DEVOPS', 'D1', 'CI: workflow รัน npm test เมื่อ push และ pull_request', missWf.length === 0,
    !wfText.trim() ? 'ไม่พบไฟล์ใน .github/workflows/' : (missWf.length ? `ไม่พบ (นอกคอมเมนต์): ${missWf.join(' · ')}` : ''));

  const ryRaw = read('render.yaml');
  const ry = stripYaml(ryRaw);
  const block = (key) => { const m = ry.match(new RegExp(`key:\\s*["']?${key}["']?[^\\n]*\\n?([\\s\\S]*?)(?=-\\s*key:|\\n\\S|$)`)); return m ? m[0] : ''; };
  const d2 = [];
  if (!/generateValue:\s*true/.test(block('JWT_SECRET'))) d2.push('JWT_SECRET ต้องเป็น generateValue: true');
  if (/rootDir:\s*labs\//.test(ry)) d2.push('ยังมี rootDir: labs/… ของ Student Repository');
  if (!/healthCheckPath:\s*\/api\/health\b/.test(ry)) d2.push('ไม่มี healthCheckPath: /api/health');
  const leaked = ['JWT_SECRET', 'STAFF_PASSWORD', 'TURSO_AUTH_TOKEN'].filter((k) => /\bvalue:\s*\S/.test(block(k)));
  if (leaked.length) d2.push(`มีค่าลับเขียนใน render.yaml: ${leaked.join(', ')} (ใช้ generateValue หรือ sync: false)`);
  rec('DEVOPS', 'D2', 'render.yaml: JWT_SECRET แบบ generateValue · ไม่มี rootDir ที่ชี้ labs/ · ไม่มีค่าลับในไฟล์',
    ryRaw && d2.length === 0, !ryRaw ? 'ไม่พบไฟล์' : d2.join(' · '));

  const ex = read('api/.env.example');
  const filledEx = ex.split('\n').filter((l) => /^(JWT_SECRET|TURSO_AUTH_TOKEN|TURSO_DATABASE_URL|STAFF_PASSWORD)\s*=\s*\S/.test(l));
  const isRepo = git('rev-parse', '--is-inside-work-tree').stdout.trim() === 'true';
  // .env ต้องถูก ignore จริง (รูปแบบไหนก็ได้ ไฟล์ .gitignore ไหนก็ได้) — ถามจาก git เอง
  const ignored = (p) => spawnSync('git', ['-C', ROOT, 'check-ignore', '-q', '--no-index', p]).status === 0;
  const envIgnored = isRepo ? (ignored('api/.env') && ignored('.env')) : /^\.env\s*$/m.test(read('.gitignore'));
  const isEnvFile = (f) => /(^|\/)\.env(\.[\w-]+)*$/.test(f) && !/\.(example|sample|template)$/.test(f);
  const viteOnly = (f) => f.startsWith('frontend/') && read(f).split('\n').every((l) => !l.trim() || /^\s*#/.test(l) || /^\s*VITE_\w+\s*=/.test(l));
  const tracked = isRepo ? git('ls-files').stdout.split('\n').filter((f) => isEnvFile(f) && !viteOnly(f)) : [];
  const history = isRepo ? [...new Set(git('log', '--all', '--diff-filter=A', '--name-only', '--format=').stdout.split('\n').filter((f) => isEnvFile(f) && !tracked.includes(f) && !f.startsWith('frontend/')))] : [];
  const historyOk = history.length === 0 || /\.env/.test(read('DEBUG_LOG.md'));
  rec('DEVOPS', 'D3', '.env.example มี JWT_SECRET= ค่าว่าง · .gitignore มี .env · ไม่มี .env ใน git',
    /^JWT_SECRET=\s*$/m.test(ex) && filledEx.length === 0 && envIgnored && tracked.length === 0 && historyOk,
    [!/^JWT_SECRET=\s*$/m.test(ex) ? (ex ? 'ไม่มีบรรทัด JWT_SECRET= ค่าว่าง ใน api/.env.example' : 'ไม่พบ api/.env.example') : '',
      !envIgnored ? '.gitignore ไม่ได้ ignore ไฟล์ .env (ลอง git check-ignore -v api/.env)' : '',
      filledEx.length ? `มีค่าจริงใน .env.example: ${filledEx.map((l) => l.split('=')[0]).join(', ')}` : '',
      tracked.length ? `ไฟล์ใน git: ${tracked.join(', ')}` : '',
      history.length ? `เคย commit ${history.join(', ')} ไว้ในประวัติ${historyOk ? '' : ' — เปลี่ยน secret ทันทีแล้วบันทึกใน DEBUG_LOG.md'}` : ''].filter(Boolean).join(' · '));

  const hasServer = existsSync(path.join(API, 'src/server.js'));
  // production ไม่มี JWT_SECRET → ต้องไม่ยอม start
  const p1 = await startServer({ dbFile: path.join(TMP, 'prod1.db'), env: { NODE_ENV: 'production', JWT_SECRET: undefined } });
  const end = Date.now() + 10000;
  while (p1.exited() === null && Date.now() < end) await sleep(200);
  const refused = hasServer && p1.exited() !== null && p1.exited() !== 0 && /JWT_SECRET/.test(p1.log());
  p1.stop();
  const hard = listFiles(path.join(API, 'src'), (f) => /\.[cm]?[jt]s$/.test(f)).flatMap((f) => strip(readAll([f])).split('\n')
    .filter((l) => /jwt\.(sign|verify)\s*\([^,]+,\s*['"`][^'"`]+['"`]/.test(l) || /(jwt_?secret|secret)\s*[:=]\s*['"`][^'"`]{4,}['"`]/i.test(l))
    .map(() => relp(f)));
  rec('DEVOPS', 'D4', 'production ไม่ตั้ง JWT_SECRET → ระบบไม่ยอม start (fail fast)', refused,
    !hasServer ? 'ไม่พบ api/src/server.js' : p1.exited() === null ? `ระบบ start ได้ทั้งที่ไม่มี JWT_SECRET — ยังใช้ secret ค่า default/ที่เขียนในโค้ด${hard.length ? ` (ดู ${[...new Set(hard)].join(', ')})` : ''}`
      : (refused ? '' : `หยุดแต่ไม่บอกว่าขาด JWT_SECRET (exit ${p1.exited()}): ${p1.log().split('\n').filter(Boolean).slice(-1)[0] ?? ''}`.slice(0, 220)));

  // production + secret → error ต้องไม่ส่ง stack · รหัสเจ้าหน้าที่มาจาก STAFF_EMAIL/STAFF_PASSWORD
  const prodPass = `Prod-${randomBytes(9).toString('base64url')}`;
  const devStaff = cfg?.devStaff ?? {};
  const p2 = await startServer({ dbFile: path.join(TMP, 'prod2.db'), env: {
    NODE_ENV: 'production', JWT_SECRET: randomBytes(16).toString('hex'),
    STAFF_EMAIL: devStaff.email ?? '', STAFF_PASSWORD: prodPass } });
  let noStack = false, d5 = '', staffOk = false, d8 = '';
  if (await waitHealthy(p2) && resource) {
    const r = await call(p2.base, 'POST', resource, { raw: '{"broken": ' });
    noStack = r.status === 400 && !/"stack"/.test(r.text) && !/\.(m?js):\d+/.test(r.text);
    d5 = `ได้ ${r.status}${r.status !== 400 ? ' (ต้อง 400)' : ''}${/"stack"|\.(m?js):\d+/.test(r.text) ? ' · มี stack/ชื่อไฟล์ในคำตอบ' : ''}`;
    const seedLogin = await call(p2.base, 'POST', '/api/auth/login', { body: { email: devStaff.email, password: devStaff.password } });
    const envLogin = await call(p2.base, 'POST', '/api/auth/login', { body: { email: devStaff.email, password: prodPass } });
    staffOk = seedLogin.status === 401 && envLogin.status === 200;
    d8 = `รหัสใน seed → ${seedLogin.status} (ต้อง 401) · รหัสจาก STAFF_PASSWORD → ${envLogin.status} (ต้อง 200)${!staffOk ? ' — ดู ROLES.md ข้อ D3' : ''}`;
  } else d5 = d8 = !hasServer ? 'ไม่พบ api/src/server.js' : resource ? `เปิด production ไม่ได้ — ${p2.log().split('\n').filter(Boolean).slice(-2).join(' | ') || 'ไม่ตอบภายใน 20 วินาที'}`.slice(0, 220) : 'ยังไม่ได้กรอก api.resource';
  p2.stop();
  rec('DEVOPS', 'D5', 'production: error ไม่ส่ง stack trace ให้ผู้ใช้', noStack, d5);
  rec('DEVOPS', 'D8', 'production: รหัสเจ้าหน้าที่มาจาก STAFF_EMAIL/STAFF_PASSWORD (รหัสใน seed ใช้ไม่ได้)', staffOk, d8);

  const rc = read('RELEASE_CHECKLIST.md');
  const open = (rc.match(/^\s*[-*] \[ \]/gm) ?? []).length;
  const done = (rc.match(/^\s*[-*] \[[xX]\]/gm) ?? []).length;
  rec('DEVOPS', 'D6', 'RELEASE_CHECKLIST.md ติ๊กครบทุกข้อ', rc && done >= 8 && open === 0, rc ? `ติ๊ก ${done} · ค้าง ${open}` : 'ไม่พบไฟล์');

  if (ONLINE) {
    const { url, r } = await online('/api/health');
    let home = null;
    if (r.status === 200) home = await call(url, 'GET', '/', { timeout: 60000 });
    const web = home && home.status === 200 && /text\/html/i.test(home.headers?.get('content-type') ?? '');
    rec('DEVOPS', 'D7', `URL ที่ deploy: ${url || '—'}/api/health → 200 · หน้าเว็บเปิดจาก URL เดียวกัน`, r.status === 200 && web,
      r.status !== 200 ? `/api/health ${r.status ? `ได้ ${r.status}` : r.error}` : (web ? '' : `หน้าแรก / ${home?.status ? `ได้ ${home.status}` : home?.error} — production ต้องเสิร์ฟ frontend/dist จาก API`));
  } else skip('DEVOPS', 'D7', 'URL ที่ deploy ตอบ /api/health (ใช้ --online)', 'ข้าม — รันซ้ำด้วย --online');
}

// ══════════════════════════════════════════════════════════════════
// TRIO · DevOps ของกลุ่ม 3 คน
// ══════════════════════════════════════════════════════════════════
if (RUN.has('TRIO')) {
  const x1 = [!/npm (run )?test\b/.test(wfText) ? 'npm test' : '', !/npm run build\b/.test(wfText) ? 'npm run build' : ''].filter(Boolean);
  rec('TRIO', 'X1', 'CI รันทั้ง test และ build', x1.length === 0, x1.length ? `ไม่พบ (นอกคอมเมนต์): ${x1.join(' · ')}` : '');
  const dep = read('DEPLOY.md');
  const phD = placeholders(dep);
  const x2 = [!/turso/i.test(dep) ? 'Turso' : '', !/rollback|ย้อน/i.test(dep) ? 'rollback' : '', !/JWT_SECRET/.test(dep) ? 'JWT_SECRET' : '',
    phD.length ? `ช่องของแม่แบบที่ยังไม่กรอก: ${showPh(phD)}` : ''].filter(Boolean);
  rec('TRIO', 'X2', 'DEPLOY.md มีขั้นตอน deploy · Turso · rollback (กรอกครบ)', dep && x2.length === 0, dep ? x2.join(' · ') : 'ไม่พบไฟล์');
  rec('TRIO', 'X3', 'README มีป้าย CI (badge)', /actions\/workflows\/[^)\s]+\/badge\.svg/.test(read('README.md')));
  if (ONLINE) {
    const { r } = await online('/api/health', 1);
    const drv = r.json?.database?.driver ?? r.json?.driver;
    rec('TRIO', 'X4', 'deploy ใช้ Turso (health บอก driver: turso)', r.status === 200 && drv === 'turso', r.status === 200 ? `driver: ${drv ?? '—'}` : `/api/health ${r.status ? `ได้ ${r.status}` : r.error}`);
  } else skip('TRIO', 'X4', 'deploy ใช้ Turso (ใช้ --online)', 'ข้าม — รันซ้ำด้วย --online');
}

// ══════════════════════════════════════════════════════════════════
// รายงาน
// ══════════════════════════════════════════════════════════════════
const TITLES = { TEAM: '👥 ส่วนของทีม', BE: '⚙️  Back-end', FE: '🎨 Front-end', DEVOPS: '🚀 DevOps', TRIO: '🚀 DevOps เพิ่ม (กลุ่ม 3 คน)' };
console.log('');
console.log(`ENGSE203 Final Term Project — ${cfg?.team ?? '(ยังไม่มีชื่อทีม)'} · Sec ${cfg?.section ?? '?'} · ${cfg?.topic ?? '?'}${TRIO ? ' · กลุ่ม 3 คน' : ''}`);
console.log(`ตรวจเมื่อ ${new Date().toLocaleString('th-TH')}${ROLE ? ` · เฉพาะบทบาท ${ROLE}` : ''}`);
for (const g of Object.keys(TITLES)) {
  const rs = results.filter((r) => r.group === g);
  if (!rs.length) continue;
  const counted = rs.filter((r) => !r.skipped);
  const skipped = rs.length - counted.length;
  console.log(`\n${TITLES[g]}  (${counted.filter((r) => r.ok).length}/${counted.length}${skipped ? ` · ข้าม ${skipped}` : ''})`);
  for (const r of rs) {
    const mark = r.skipped ? '–' : (r.ok ? '✓' : '✗');
    const tail = (!r.ok && r.detail) ? `\n                ↳ ${r.detail}` : (r.ok && r.detail && /unit|frontend|ติ๊ก|tag|ข้อ ·|แนบ token/.test(r.detail) ? `  (${r.detail})` : '');
    console.log(`  ${mark} ${r.id.padEnd(11)} ${r.name}${tail}`);
  }
}
const counted = results.filter((r) => !r.skipped);
const pass = counted.filter((r) => r.ok).length;
const skippedN = results.length - counted.length;
console.log(`\nรวม ผ่าน ${pass}/${counted.length} รายการ${skippedN ? ` · ข้าม ${skippedN}` : ''}`);
if (!ONLINE && (RUN.has('DEVOPS') || RUN.has('TRIO'))) console.log('  (ข้อที่ต้องใช้อินเทอร์เน็ตข้ามไว้ — รันซ้ำด้วย --online หลัง deploy)');
console.log('\nหมายเหตุ: checker ตรวจว่า "มีและทำงาน" — การออกแบบและความเข้าใจตรวจจาก rubric และการสัมภาษณ์');
console.log('');
if (JSON_OUT) writeFileSync(path.resolve(JSON_OUT), JSON.stringify({ checker: CHECKER_VERSION, team: cfg?.team, section: cfg?.section, topic: cfg?.topic, checkedAt: new Date().toISOString(), passed: pass, total: counted.length, skipped: skippedN, results }, null, 2));
process.exitCode = pass === counted.length ? 0 : 1;
