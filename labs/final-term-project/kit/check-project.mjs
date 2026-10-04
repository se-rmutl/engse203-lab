#!/usr/bin/env node
/**
 * ENGSE203 Final Term Project — Checker
 *
 * วางไฟล์นี้ไว้ที่ root ของ repo ทีม (ข้าง ๆ api/ และ frontend/) แล้วกรอก project.config.json ก่อน
 *
 *   node --disable-warning=ExperimentalWarning check-project.mjs                ตรวจทั้งหมด
 *   node --disable-warning=ExperimentalWarning check-project.mjs --role fe      เฉพาะส่วน Front-end (+ ส่วนทีม)
 *   node --disable-warning=ExperimentalWarning check-project.mjs --role be      เฉพาะส่วน Back-end
 *   node --disable-warning=ExperimentalWarning check-project.mjs --role devops  เฉพาะส่วน DevOps
 *   node --disable-warning=ExperimentalWarning check-project.mjs --online       ตรวจ URL ที่ deploy ด้วย
 *   node --disable-warning=ExperimentalWarning check-project.mjs --skip-build   ไม่ build frontend (เร็วขึ้น)
 *   node --disable-warning=ExperimentalWarning check-project.mjs --json out.json   บันทึกผลเป็น JSON
 *
 * สิ่งที่ checker ทำ
 *   · เปิด API ของทีมจริง (api/src/server.js) ด้วยฐานข้อมูลชั่วคราว แล้วยิงทุก endpoint ตาม README ข้อ R2
 *   · รัน test ของทีม (Vitest) ทั้ง api และ frontend
 *   · ตรวจเอกสาร · git · ค่าลับ · production
 *   ⚠ ไม่แตะฐานข้อมูลจริงของทีม และไม่ใช้ Turso (ลบตัวแปร TURSO_* ก่อนรันเสมอ)
 *   ⚠ ต้อง npm install ใน api/ และ frontend/ ก่อน
 */
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { createServer } from 'node:net';
import { randomBytes } from 'node:crypto';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
const cleanup = () => {
  for (const c of children) { try { c.kill('SIGKILL'); } catch {} }
  try { rmSync(TMP, { recursive: true, force: true }); } catch {}
};
process.on('exit', cleanup);
process.on('SIGINT', () => { cleanup(); process.exit(130); });

// ── เครื่องมือเล็ก ๆ ──────────────────────────────────────────────
const results = [];
const rec = (group, id, name, ok, detail = '') => results.push({ group, id, name, ok: !!ok, detail: String(detail ?? '') });
const read = (rel) => { try { return readFileSync(path.join(ROOT, rel), 'utf8'); } catch { return ''; } };
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
const listFiles = (dir, test) => {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { recursive: true })
    .map(String)
    .filter((f) => !f.split(/[\\/]/).includes('node_modules') && !f.split(/[\\/]/).includes('dist'))
    .filter((f) => { try { return statSync(path.join(dir, f)).isFile(); } catch { return false; } })
    .filter(test)
    .map((f) => path.join(dir, f));
};
const readAll = (files) => files.map((f) => { try { return readFileSync(f, 'utf8'); } catch { return ''; } }).join('\n');
const git = (...a) => spawnSync('git', ['-C', ROOT, ...a], { encoding: 'utf8' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const freePort = () => new Promise((resolve, reject) => {
  const s = createServer();
  s.unref();
  s.on('error', reject);
  s.listen(0, '127.0.0.1', () => { const { port } = s.address(); s.close(() => resolve(port)); });
});

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
function runVitest(dir) {
  const rel = path.relative(ROOT, dir);
  let bin;
  try {
    const req = createRequire(path.join(dir, 'package.json'));
    bin = path.join(path.dirname(req.resolve('vitest/package.json')), 'vitest.mjs');
  } catch { return { ok: false, detail: `ยังไม่ได้ npm install ใน ${rel}/ (หรือไม่ได้ใช้ Vitest)` }; }
  const out = path.join(TMP, `${rel.replace(/\W/g, '_')}.json`);
  const env = { ...process.env };
  delete env.DB_FILE; delete env.TURSO_DATABASE_URL; delete env.TURSO_AUTH_TOKEN;
  spawnSync(process.execPath, [bin, 'run', '--reporter=json', `--outputFile=${out}`],
    { cwd: dir, env, encoding: 'utf8', timeout: 180000 });
  try {
    const j = JSON.parse(readFileSync(out, 'utf8'));
    const files = (j.testResults ?? []).map((t) => ({
      name: path.relative(dir, t.name).replace(/\\/g, '/'),
      tests: t.assertionResults?.length ?? 0,
      failed: (t.assertionResults ?? []).filter((a) => a.status === 'failed').length,
      broken: t.status === 'failed' && !(t.assertionResults ?? []).length,
    }));
    return { ok: true, total: j.numTotalTests ?? 0, failed: j.numFailedTests ?? 0, broken: files.filter((f) => f.broken).length, files };
  } catch { return { ok: false, detail: `รัน vitest ใน ${rel}/ ไม่สำเร็จ — ลอง npm test ดู error` }; }
}
const countIn = (run, prefix) => run.ok ? run.files.filter((f) => f.name.startsWith(prefix)).reduce((n, f) => n + f.tests, 0) : 0;
const failIn = (run, prefix) => run.ok ? run.files.filter((f) => f.name.startsWith(prefix)).reduce((n, f) => n + f.failed + (f.broken ? 1 : 0), 0) : 0;

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
    try { const r = await fetch(`${srv.base}/api/health`); if (r.status < 500 || r.status === 503) return true; } catch {}
    await sleep(300);
  }
  return false;
}
async function call(base, method, url, { body, token, raw, headers = {} } = {}) {
  const h = { ...headers };
  if (token) h.Authorization = `Bearer ${token}`;
  let payload;
  if (raw !== undefined) { payload = raw; h['Content-Type'] = 'application/json'; }
  else if (body !== undefined) { payload = JSON.stringify(body); h['Content-Type'] = 'application/json'; }
  try {
    const r = await fetch(base + url, { method, headers: h, body: payload });
    const text = await r.text();
    let json = null; try { json = text ? JSON.parse(text) : null; } catch {}
    return { status: r.status, json, text, headers: r.headers };
  } catch (e) { return { status: 0, json: null, text: '', error: e.message }; }
}
const listOf = (j) => Array.isArray(j) ? j : (Array.isArray(j?.data) ? j.data : (Array.isArray(j?.items) ? j.items : null));
const objOf = (j) => (j && typeof j === 'object' && !Array.isArray(j)) ? (j.data && typeof j.data === 'object' && !Array.isArray(j.data) ? j.data : j) : null;
const decode = (t) => { try { return JSON.parse(Buffer.from(String(t).split('.')[1], 'base64url').toString('utf8')); } catch { return null; } };

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
    if (!apiCfg.existingId) problems.push('ต้องมี api.existingId');
    if (!apiCfg.validSample || typeof apiCfg.validSample !== 'object') problems.push('ต้องมี api.validSample');
    if (!apiCfg.statusUpdate || typeof apiCfg.statusUpdate !== 'object') problems.push('ต้องมี api.statusUpdate');
    if (!cfg.devStaff?.email || !cfg.devStaff?.password) problems.push('ต้องมี devStaff.email และ devStaff.password');
  }
  rec('TEAM', 'T1', 'project.config.json กรอกครบและถูกรูปแบบ', problems.length === 0, problems.join(' · '));

  const contract = read('TEAM_CONTRACT.md');
  const named = members.filter((m) => m?.name && contract.includes(m.name)).length;
  rec('TEAM', 'T2', 'TEAM_CONTRACT.md กรอกแล้ว (มีชื่อสมาชิกทุกคน · ไม่มีช่อง <…> ค้าง)',
    contract && members.length && named === members.length && !/<[^>\n]{1,40}>/.test(contract),
    !contract ? 'ไม่พบไฟล์' : `พบชื่อ ${named}/${members.length} คน${/<[^>\n]{1,40}>/.test(contract) ? ' · ยังมี <…> ค้าง' : ''}`);

  const readme = read('README.md');
  const need = [['ติดตั้ง', /ติดตั้ง|install/i], ['วิธีรัน', /วิธีรัน|run/i], ['test', /test|ทดสอบ/i], ['deploy', /deploy/i],
    ['บัญชีทดสอบ', /บัญชีทดสอบ|test account/i], ['การใช้ AI', /การใช้ AI|AI disclosure/i]];
  const miss = need.filter(([, re]) => !re.test(readme)).map(([n]) => n);
  const hasUrl = cfg?.deployUrl && readme.includes(String(cfg.deployUrl).replace(/\/+$/, ''));
  if (!hasUrl) miss.push('URL ที่ deploy (ตรงกับ deployUrl)');
  if (/Campus Service/i.test(readme.split('\n').slice(0, 5).join('\n'))) miss.push('หัวเรื่องยังเป็น Campus Service');
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
  const schema = strip(read('api/data/schema.sql').replace(/--[^\n]*/g, ''));
  const tables = [...schema.matchAll(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?["`]?(\w+)/gi)].map((m) => m[1].toLowerCase());
  const own = tables.filter((t) => t !== 'users');
  rec('BE', 'B1', 'schema.sql: ตารางของหัวข้อ ≥ 2 (ไม่นับ users) · มี FOREIGN KEY · ไม่มีตาราง requests เดิม',
    own.length >= 2 && /REFERENCES/i.test(schema) && !tables.includes('requests'),
    `ตาราง: ${tables.join(', ') || '—'}`);

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
    health: 'GET /api/health → 200 และต่อฐานข้อมูลได้',
    list: `GET ${resource || '/api/<resource>'} → 200 รายการ ≥ 5`,
    filter: 'กรองด้วย ?status= ได้เฉพาะสถานะนั้น',
    one: 'GET /:id → 200 · ไม่มี → 404',
    post: 'POST ข้อมูลถูก → 201 · ข้อมูลว่าง → 400 พร้อม error',
    big: 'body ใหญ่เกิน 10kb → 413',
    noauth: 'PUT ไม่มี token / token ปลอม → 401',
    forbidden: 'PUT ด้วย token ที่ไม่ใช่เจ้าหน้าที่ → 403',
    login: 'login: ถูก → token (role staff · มี exp · ไม่มีรหัสผ่าน) · ผิดกับอีเมลไม่มี → 401 ข้อความเดียวกัน',
    staff: 'เจ้าหน้าที่: PUT → 200 · DELETE → 204 · GET ซ้ำ → 404',
  };
  const srv = existsSync(path.join(API, 'src/server.js'))
    ? await startServer({ dbFile, env: { NODE_ENV: 'development', JWT_SECRET: SECRET } })
    : null;
  const up = srv && await waitHealthy(srv);
  if (!up || !resource) {
    const why = !srv ? 'ไม่พบ api/src/server.js' : !resource ? 'ยังไม่ได้กรอก api.resource' : `เปิด API ไม่ได้ — ${srv.log().split('\n').filter(Boolean).slice(-3).join(' | ') || 'ไม่ตอบภายใน 20 วินาที'}`;
    for (const [k, n] of Object.entries(names)) rec('BE', `B2.${k}`, n, false, why);
  } else {
    const B = srv.base;
    let r = await call(B, 'GET', '/api/health');
    const dbOk = r.json?.database?.connected ?? r.json?.db?.connected ?? (r.json?.status === 'ok');
    rec('BE', 'B2.health', names.health, r.status === 200 && dbOk, `ได้ ${r.status}`);

    r = await call(B, 'GET', resource);
    const list = listOf(r.json);
    rec('BE', 'B2.list', names.list, r.status === 200 && list && list.length >= 5, `ได้ ${r.status} · ${list ? list.length + ' รายการ' : 'ไม่ใช่ array'}`);

    const sf = apiCfg.statusField ?? 'status';
    const want = apiCfg.statusFilter ?? (list?.find((x) => x?.[sf])?.[sf]);
    r = await call(B, 'GET', `${resource}?status=${encodeURIComponent(want ?? '')}`);
    const fl = listOf(r.json);
    rec('BE', 'B2.filter', names.filter, want && r.status === 200 && fl && fl.length >= 1 && fl.every((x) => x?.[sf] === want) && (!list || fl.length < list.length),
      `?status=${want} → ${r.status} · ${fl ? fl.length : '-'} รายการ`);

    const r1 = await call(B, 'GET', `${resource}/${encodeURIComponent(apiCfg.existingId ?? '')}`);
    const r2 = await call(B, 'GET', `${resource}/no-such-id-999999`);
    rec('BE', 'B2.one', names.one, r1.status === 200 && r2.status === 404, `ได้ ${r1.status} / ${r2.status}`);

    const rp = await call(B, 'POST', resource, { body: apiCfg.validSample ?? {} });
    const re = await call(B, 'POST', resource, { body: apiCfg.invalidSample ?? {} });
    const created = objOf(rp.json);
    const errs = re.json?.errors ?? re.json?.error;
    rec('BE', 'B2.post', names.post, rp.status === 201 && created?.id !== undefined && re.status === 400 && errs && (Array.isArray(errs) ? errs.length : String(errs).length),
      `ข้อมูลถูก ${rp.status}${rp.status !== 201 && rp.json ? ' ' + JSON.stringify(rp.json).slice(0, 120) : ''} · ข้อมูลว่าง ${re.status}`);

    r = await call(B, 'POST', resource, { raw: JSON.stringify({ ...(apiCfg.validSample ?? {}), padding: 'x'.repeat(11 * 1024) }) });
    rec('BE', 'B2.big', names.big, r.status === 413 && r.json, `ได้ ${r.status}`);

    const putUrl = `${resource}/${encodeURIComponent(apiCfg.existingId ?? '')}`;
    const p0 = await call(B, 'PUT', putUrl, { body: apiCfg.statusUpdate });
    const p1 = await call(B, 'PUT', putUrl, { body: apiCfg.statusUpdate, token: sign({ sub: '1', name: 'x', role: 'staff' }, 'not-the-real-secret') });
    rec('BE', 'B2.noauth', names.noauth, p0.status === 401 && p1.status === 401, `ได้ ${p0.status} / ${p1.status}`);

    const p2 = await call(B, 'PUT', putUrl, { body: apiCfg.statusUpdate, token: sign({ sub: '999', name: 'checker', role: 'requester' }, SECRET) });
    rec('BE', 'B2.forbidden', names.forbidden, p2.status === 403, jwt ? `ได้ ${p2.status}` : 'ไม่พบ jsonwebtoken ใน api/');

    const staff = cfg?.devStaff ?? {};
    const lg = await call(B, 'POST', '/api/auth/login', { body: { email: staff.email, password: staff.password } });
    const lw = await call(B, 'POST', '/api/auth/login', { body: { email: staff.email, password: `${staff.password}-wrong` } });
    const lu = await call(B, 'POST', '/api/auth/login', { body: { email: `nobody-${Date.now()}@example.com`, password: staff.password } });
    const token = lg.json?.token;
    const pl = decode(token);
    const okLogin = lg.status === 200 && String(token ?? '').split('.').length === 3 && pl?.role === 'staff' && pl?.exp
      && !JSON.stringify(pl).includes(String(staff.password)) && !('password' in (pl ?? {}))
      && lw.status === 401 && lu.status === 401 && JSON.stringify(lw.json) === JSON.stringify(lu.json);
    rec('BE', 'B2.login', names.login, okLogin, `ถูก ${lg.status} · รหัสผิด ${lw.status} · อีเมลไม่มี ${lu.status}${lw.status === 401 && lu.status === 401 && JSON.stringify(lw.json) !== JSON.stringify(lu.json) ? ' · ข้อความต่างกัน' : ''}`);

    const ps = await call(B, 'PUT', putUrl, { body: apiCfg.statusUpdate, token });
    const newStatus = apiCfg.statusUpdate?.[sf];
    const psBody = objOf(ps.json);
    const statusOk = ps.status === 200 && (newStatus === undefined || !psBody || psBody[sf] === undefined || psBody[sf] === newStatus);
    let dOk = false, dDetail = 'ไม่มีรายการที่สร้างจาก POST ให้ลบ';
    if (created?.id !== undefined) {
      const d = await call(B, 'DELETE', `${resource}/${encodeURIComponent(created.id)}`, { token });
      const g = await call(B, 'GET', `${resource}/${encodeURIComponent(created.id)}`);
      dOk = [200, 204].includes(d.status) && g.status === 404;
      dDetail = `DELETE ${d.status} · GET ซ้ำ ${g.status}`;
    }
    rec('BE', 'B2.staff', names.staff, okLogin && statusOk && dOk, okLogin ? `PUT ${ps.status} · ${dDetail}` : 'ต้อง login เจ้าหน้าที่ให้ผ่านก่อน (ข้อ B2.login)');
    srv.stop();
  }

  const apiRun = runVitest(API);
  const unit = countIn(apiRun, 'tests/unit');
  const integ = countIn(apiRun, 'tests/integration');
  const allPass = apiRun.ok && apiRun.failed === 0 && apiRun.broken === 0;
  rec('BE', 'B3', 'api: unit ≥ 10 · integration ≥ 12 · ผ่านทั้งหมด',
    allPass && unit >= 10 && integ >= 12,
    apiRun.ok ? `unit ${unit} · integration ${integ} · ไม่ผ่าน ${apiRun.failed}${apiRun.broken ? ` · ไฟล์ที่โหลดไม่ขึ้น ${apiRun.broken}` : ''}` : apiRun.detail);
  const testSrc = readAll(listFiles(path.join(API, 'tests'), (f) => f.endsWith('.test.js')));
  rec('BE', 'B4', 'integration test มีกรณี 401 และ 403 ของ resource ใหม่',
    /401/.test(testSrc) && /403/.test(testSrc) && resourceName && testSrc.includes(resourceName), resourceName ? '' : 'ยังไม่ได้กรอก api.resource');

  const dlog = read('DEBUG_LOG.md');
  const causes = (dlog.match(/\*\*สาเหตุ[^*]*\*\*[ \t]*\S[^\n]{5,}/g) ?? []).length;
  const fromLab = /REQ-\d{3}|nextId|MIN_DETAILS|requestSummary/.test(dlog);
  rec('BE', 'B5', 'DEBUG_LOG.md: bug จริงของโปรเจกต์ ≥ 2 (มีสาเหตุ · ไม่ใช่ bug ของ LAB 12)', causes >= 2 && !fromLab,
    !dlog ? 'ไม่พบไฟล์' : `กรอกสาเหตุ ${causes} bug${fromLab ? ' · ยังมี bug ของ LAB 12' : ''}`);
}

// ══════════════════════════════════════════════════════════════════
// FE · Front-end
// ══════════════════════════════════════════════════════════════════
if (RUN.has('FE')) {
  const src = path.join(FE, 'src');
  const jsFiles = listFiles(src, (f) => /\.(jsx?|tsx?)$/.test(f) && !/\.test\./.test(f));
  const code = strip(readAll(jsFiles));
  const loginPage = jsFiles.find((f) => /login/i.test(path.basename(f)) && /\.(jsx|tsx)$/.test(f));
  rec('FE', 'F1', 'มีหน้า login (ไฟล์ชื่อ …Login….jsx)', !!loginPage, loginPage ? path.relative(ROOT, loginPage) : 'ไม่พบ');
  rec('FE', 'F2', 'แนบ Authorization: Bearer ในชั้น service (ไม่กระจายในหน้า)', /Authorization/.test(code) && /Bearer/.test(code),
    /Authorization/.test(code) ? '' : 'ไม่พบ "Authorization" ใน frontend/src');
  rec('FE', 'F3', 'จัดการ 401 (ล้าง token / พาไป login)', /\b401\b/.test(code));
  rec('FE', 'F4', 'ไม่ใช้ dangerouslySetInnerHTML', !/dangerouslySetInnerHTML/.test(code));
  rec('FE', 'F5', `เรียก resource ของหัวข้อ (${resource || '/api/<resource>'})`,
    resourceName && new RegExp(`['"\`/]${resourceName}\\b`).test(code) && resourceName !== 'requests',
    resourceName ? `ค้นหา "/${resourceName}" ใน frontend/src` : 'ยังไม่ได้กรอก api.resource');
  const feRun = runVitest(FE);
  rec('FE', 'F6', 'frontend test ≥ 3 ข้อ ผ่านทั้งหมด', feRun.ok && feRun.total >= 3 && feRun.failed === 0 && feRun.broken === 0,
    feRun.ok ? `${feRun.total} ข้อ · ไม่ผ่าน ${feRun.failed}` : feRun.detail);
  if (SKIP_BUILD) rec('FE', 'F7', 'npm run build ผ่าน', false, 'ข้าม (--skip-build)');
  else {
    const b = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build', '--prefix', FE],
      { cwd: ROOT, encoding: 'utf8', timeout: 180000, shell: process.platform === 'win32', env: { ...process.env, NODE_ENV: 'production' } });
    rec('FE', 'F7', 'npm run build ผ่าน', b.status === 0, b.status === 0 ? '' : (b.stderr || b.stdout || '').split('\n').filter(Boolean).slice(-2).join(' | '));
  }
}

// ══════════════════════════════════════════════════════════════════
// DEVOPS
// ══════════════════════════════════════════════════════════════════
let wfText = '';
if (RUN.has('DEVOPS') || RUN.has('TRIO')) {
  wfText = readAll(listFiles(path.join(ROOT, '.github/workflows'), (f) => /\.ya?ml$/.test(f)));
}
if (RUN.has('DEVOPS')) {
  rec('DEVOPS', 'D1', 'CI: workflow รัน npm test เมื่อ push และ pull_request',
    /npm (run )?test/.test(wfText) && /push/.test(wfText) && /pull_request/.test(wfText),
    wfText ? '' : 'ไม่พบไฟล์ใน .github/workflows/');

  const ry = read('render.yaml');
  rec('DEVOPS', 'D2', 'render.yaml: JWT_SECRET แบบ generateValue · ไม่มี rootDir ที่ชี้ labs/',
    /JWT_SECRET[\s\S]{0,40}generateValue:\s*true/.test(ry) && !/rootDir:\s*labs\//.test(ry) && /healthCheckPath:\s*\/api\/health/.test(ry),
    !ry ? 'ไม่พบไฟล์' : (/rootDir:\s*labs\//.test(ry) ? 'ยังมี rootDir: labs/… ของ Student Repository' : ''));

  const ex = read('api/.env.example');
  const gi = read('.gitignore');
  const filled = ex.split('\n').filter((l) => /^(JWT_SECRET|TURSO_AUTH_TOKEN|TURSO_DATABASE_URL)\s*=\s*\S/.test(l));
  const tracked = git('ls-files').stdout.split('\n')
    .filter((f) => /(^|\/)\.env(\.|$)/.test(f) && !/\.example$/.test(f) && f !== 'frontend/.env.production');
  rec('DEVOPS', 'D3', '.env.example มี JWT_SECRET= ค่าว่าง · .gitignore มี .env · ไม่มี .env ใน git',
    /^JWT_SECRET=\s*$/m.test(ex) && filled.length === 0 && /^\.env\s*$/m.test(gi) && tracked.length === 0,
    [!/^JWT_SECRET=\s*$/m.test(ex) ? (ex ? 'ไม่มีบรรทัด JWT_SECRET= ค่าว่าง ใน api/.env.example' : 'ไม่พบ api/.env.example') : '',
      !/^\.env\s*$/m.test(gi) ? '.gitignore ไม่มีบรรทัด .env' : '',
      filled.length ? `มีค่าจริงใน .env.example: ${filled.map((l) => l.split('=')[0]).join(', ')}` : '',
      tracked.length ? `ไฟล์ใน git: ${tracked.join(', ')}` : ''].filter(Boolean).join(' · '));

  // production ไม่มี JWT_SECRET → ต้องไม่ยอม start
  const p1 = await startServer({ dbFile: path.join(TMP, 'prod1.db'), env: { NODE_ENV: 'production', JWT_SECRET: undefined } });
  const end = Date.now() + 10000;
  while (p1.exited() === null && Date.now() < end) await sleep(200);
  const refused = p1.exited() !== null && p1.exited() !== 0 && /JWT_SECRET/.test(p1.log());
  p1.stop();
  rec('DEVOPS', 'D4', 'production ไม่ตั้ง JWT_SECRET → ระบบไม่ยอม start (fail fast)', refused,
    p1.exited() === null ? 'ระบบ start ได้ — ยังใช้ secret ค่า default' : (refused ? '' : `หยุดแต่ไม่บอกว่าขาด JWT_SECRET (exit ${p1.exited()})`));

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
    d5 = `ได้ ${r.status}${/"stack"|\.(m?js):\d+/.test(r.text) ? ' · มี stack/ชื่อไฟล์ในคำตอบ' : ''}`;
    const seedLogin = await call(p2.base, 'POST', '/api/auth/login', { body: { email: devStaff.email, password: devStaff.password } });
    const envLogin = await call(p2.base, 'POST', '/api/auth/login', { body: { email: devStaff.email, password: prodPass } });
    staffOk = seedLogin.status === 401 && envLogin.status === 200;
    d8 = `รหัสใน seed → ${seedLogin.status} (ต้อง 401) · รหัสจาก STAFF_PASSWORD → ${envLogin.status} (ต้อง 200)`;
  } else d5 = d8 = resource ? 'เปิด production ไม่ได้' : 'ยังไม่ได้กรอก api.resource';
  p2.stop();
  rec('DEVOPS', 'D5', 'production: error ไม่ส่ง stack trace ให้ผู้ใช้', noStack, d5);
  rec('DEVOPS', 'D8', 'production: รหัสเจ้าหน้าที่มาจาก STAFF_EMAIL/STAFF_PASSWORD (รหัสใน seed ใช้ไม่ได้)', staffOk, d8);

  const rc = read('RELEASE_CHECKLIST.md');
  const open = (rc.match(/^\s*[-*] \[ \]/gm) ?? []).length;
  const done = (rc.match(/^\s*[-*] \[[xX]\]/gm) ?? []).length;
  rec('DEVOPS', 'D6', 'RELEASE_CHECKLIST.md ติ๊กครบทุกข้อ', rc && done >= 8 && open === 0, rc ? `ติ๊ก ${done} · ค้าง ${open}` : 'ไม่พบไฟล์');

  if (ONLINE) {
    const url = String(cfg?.deployUrl ?? '').replace(/\/+$/, '');
    let ok = false, det = 'ยังไม่ได้กรอก deployUrl';
    if (url) {
      for (let i = 0; i < 3 && !ok; i++) {
        const r = await call(url, 'GET', '/api/health');
        ok = r.status === 200; det = `ได้ ${r.status || r.error}`;
        if (!ok) await sleep(20000);   // Render free tier อาจกำลังตื่น (cold start)
      }
    }
    rec('DEVOPS', 'D7', `URL ที่ deploy: ${url || '—'}/api/health → 200`, ok, det);
  } else rec('DEVOPS', 'D7', 'URL ที่ deploy ตอบ /api/health (ใช้ --online)', false, 'ข้าม — รันซ้ำด้วย --online');
}

// ══════════════════════════════════════════════════════════════════
// TRIO · DevOps ของกลุ่ม 3 คน
// ══════════════════════════════════════════════════════════════════
if (RUN.has('TRIO')) {
  rec('TRIO', 'X1', 'CI รันทั้ง test และ build', /npm (run )?test/.test(wfText) && /npm run build/.test(wfText));
  const dep = read('DEPLOY.md');
  rec('TRIO', 'X2', 'DEPLOY.md มีขั้นตอน deploy · Turso · rollback', /turso/i.test(dep) && /rollback|ย้อน/i.test(dep) && /JWT_SECRET/.test(dep),
    dep ? '' : 'ไม่พบไฟล์');
  rec('TRIO', 'X3', 'README มีป้าย CI (badge)', /actions\/workflows\/[^)\s]+\/badge\.svg/.test(read('README.md')));
  if (ONLINE) {
    const url = String(cfg?.deployUrl ?? '').replace(/\/+$/, '');
    const r = url ? await call(url, 'GET', '/api/health') : { status: 0 };
    const drv = r.json?.database?.driver ?? r.json?.driver;
    rec('TRIO', 'X4', 'deploy ใช้ Turso (health บอก driver: turso)', r.status === 200 && drv === 'turso', `driver: ${drv ?? '—'}`);
  } else rec('TRIO', 'X4', 'deploy ใช้ Turso (ใช้ --online)', false, 'ข้าม — รันซ้ำด้วย --online');
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
  console.log(`\n${TITLES[g]}  (${rs.filter((r) => r.ok).length}/${rs.length})`);
  for (const r of rs) console.log(`  ${r.ok ? '✓' : '✗'} ${r.id.padEnd(11)} ${r.name}${!r.ok && r.detail ? `\n                ↳ ${r.detail}` : (r.ok && r.detail && /unit|frontend|ติ๊ก|tag/.test(r.detail) ? `  (${r.detail})` : '')}`);
}
const pass = results.filter((r) => r.ok).length;
console.log(`\nรวม ผ่าน ${pass}/${results.length} รายการ`);
if (!ONLINE && (RUN.has('DEVOPS') || RUN.has('TRIO'))) console.log('  (ข้อที่ต้องใช้อินเทอร์เน็ตข้ามไว้ — รันซ้ำด้วย --online หลัง deploy)');
console.log('\nหมายเหตุ: checker ตรวจว่า "มีและทำงาน" — การออกแบบและความเข้าใจตรวจจาก rubric และการสัมภาษณ์');
console.log('');
if (JSON_OUT) writeFileSync(path.resolve(JSON_OUT), JSON.stringify({ team: cfg?.team, section: cfg?.section, topic: cfg?.topic, checkedAt: new Date().toISOString(), results }, null, 2));
process.exitCode = pass === results.length ? 0 : 1;
