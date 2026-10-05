#!/usr/bin/env node
/**
 * ENGSE203 Week 12 — Checker
 * ตรวจ: ออกแบบ test case · unit test · integration test · coverage · แก้ bug 4 ตัวพร้อม regression test
 *
 *   node --disable-warning=ExperimentalWarning check-week12.mjs            ตรวจทั้งหมด
 *   node --disable-warning=ExperimentalWarning check-week12.mjs --inclass  เฉพาะในห้อง
 *
 * ⚠ ต้อง npm install ทั้งใน api/ และ frontend/ ก่อน (checker เรียก Vitest ของโปรเจกต์)
 */
import { readFile } from 'node:fs/promises';
import { existsSync, readdirSync, readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const INCLASS = process.argv.includes('--inclass');

// ── ฐานข้อมูลในหน่วยความจำ — checker ไม่แตะ campus.db และไม่แตะ Turso ──
process.env.DB_FILE = ':memory:';
delete process.env.TURSO_DATABASE_URL;
delete process.env.TURSO_AUTH_TOKEN;

const TMP = mkdtempSync(path.join(tmpdir(), 'engse203-w12-'));
process.on('exit', () => { try { rmSync(TMP, { recursive: true, force: true }); } catch {} });

const results = [];
const rec = (id, scope, name, ok, detail = '') => results.push({ id, scope, name, ok: !!ok, detail });
const read = async (p) => { try { return await readFile(path.join(ROOT, p), 'utf8'); } catch { return ''; } };
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
const has = (s, ...f) => f.every((x) => new RegExp(x, 'i').test(s));
const readDir = (rel) => {
  const dir = path.join(ROOT, rel);
  if (!existsSync(dir)) return '';
  return readdirSync(dir, { recursive: true })
    .filter((f) => String(f).endsWith('.test.js'))
    .map((f) => readFileSync(path.join(dir, String(f)), 'utf8')).join('\n');
};

/** รัน Vitest ของโปรเจกต์ในโฟลเดอร์ที่กำหนด แล้วอ่านผลแบบ JSON */
function runVitest(rel, extra = []) {
  const dir = path.join(ROOT, rel);
  let bin;
  try {
    const req = createRequire(path.join(dir, 'package.json'));
    bin = path.join(path.dirname(req.resolve('vitest/package.json')), 'vitest.mjs');
  } catch { return { ok: false, detail: `ยังไม่ได้ npm install ใน ${rel}/` }; }
  const out = path.join(TMP, `${rel.replace(/\W/g, '_')}-${extra.length}.json`);
  const env = { ...process.env };
  delete env.DB_FILE; // ให้ vitest.config.js ของโปรเจกต์เป็นคนกำหนด
  spawnSync(process.execPath, [bin, 'run', '--reporter=json', `--outputFile=${out}`, ...extra],
    { cwd: dir, env, encoding: 'utf8', timeout: 120000 });
  try {
    const j = JSON.parse(readFileSync(out, 'utf8'));
    const files = (j.testResults ?? []).map((t) => ({
      name: path.relative(dir, t.name).replace(/\\/g, '/'),
      tests: t.assertionResults?.length ?? 0,
      failed: (t.assertionResults ?? []).filter((a) => a.status === 'failed').length,
      suiteFailed: t.status === 'failed' && !(t.assertionResults ?? []).length,
    }));
    // suiteFailed = ไฟล์ test ที่โหลดไม่ขึ้นเลย (เช่น import ผิด) — ไม่ใช่ไฟล์ที่มี test fail
    return { ok: true, total: j.numTotalTests, failed: j.numFailedTests, suiteFailed: files.filter((f) => f.suiteFailed).length, files };
  } catch { return { ok: false, detail: `รัน vitest ใน ${rel}/ ไม่สำเร็จ — ลอง npm test ดู error` }; }
}
const countIn = (run, prefix) => run.ok ? run.files.filter((f) => f.name.startsWith(prefix)).reduce((n, f) => n + f.tests, 0) : 0;

// ════════ STRUCT · เครื่องมือทดสอบพร้อม ════════
const apiPkg = await read('api/package.json');
const vcfg = strip(await read('api/vitest.config.js'));
rec('CP44', 'inclass', 'api ใช้ Vitest (script test = vitest)', has(apiPkg, '"test":\\s*"vitest'));
rec('CP44', 'inclass', 'test ใช้ฐานข้อมูลแยก (DB_FILE :memory: ใน vitest.config.js)', has(vcfg, 'DB_FILE', ':memory:'));

// ════════ CP44 · ออกแบบ test case ════════
const tc = await read('TEST_CASES.md');
const tcRows = tc.split('\n').filter((l) => /^\|\s*TC-\d+\s*\|\s*[^|\s]/.test(l)).length;
rec('CP44', 'inclass', 'TEST_CASES.md มีกรณีทดสอบอย่างน้อย 8 ข้อ', tcRows >= 8, `มี ${tcRows} ข้อ`);
rec('CP44', 'inclass', 'มีกรณีค่าขอบ (boundary) ในตาราง', has(tc, 'ขอบ|boundary'));

// ════════ CP45 · unit test + BUG #0 ════════
const apiRun = runVitest('api');
const unitN = countIn(apiRun, 'tests/unit');
rec('CP45', 'inclass', 'มี unit test อย่างน้อย 10 ข้อ (tests/unit)', unitN >= 10, apiRun.ok ? `มี ${unitN} ข้อ` : apiRun.detail);

let validator = null;
try { validator = await import(pathToFileURL(path.join(ROOT, 'api/src/validators/requestValidator.js')).href); } catch {}
const base = { requesterName: 'สมชาย ใจดี', requestType: 'แจ้งซ่อม', location: 'ห้อง 301', details: 'x', priority: 'normal' };
const errs = (details) => validator ? validator.validateRequestInput({ ...base, details }) : null;
rec('CP45', 'inclass', 'BUG #0 · รายละเอียด 10 ตัวอักษรพอดี → ผ่าน', validator && errs('1234567890').length === 0,
  validator ? 'ค่าขอบถูกปฏิเสธ — ดูเงื่อนไข < กับ <=' : 'ไม่พบ validators/requestValidator.js');
rec('CP45', 'inclass', 'รายละเอียด 9 ตัวอักษร → ยังถูกปฏิเสธ (ไม่แก้เกิน)', validator && errs('123456789').length === 1);

// ════════ CP46 · integration test + coverage ════════
const integN = countIn(apiRun, 'tests/integration');
const integSrc = strip(readDir('api/tests/integration'));
rec('CP46', 'inclass', 'มี integration test อย่างน้อย 12 ข้อ (tests/integration)', integN >= 12, apiRun.ok ? `มี ${integN} ข้อ` : apiRun.detail);
rec('CP46', 'inclass', 'integration test ครอบคลุม PUT และ DELETE', has(integSrc, '\\.put\\(', '\\.delete\\('));
rec('CP46', 'inclass', 'ตั้งค่า coverage แล้ว (script coverage + @vitest/coverage-v8)',
  has(apiPkg, '"coverage"', '@vitest/coverage-v8'));
rec('CP46', 'inclass', 'npm test ใน api ผ่านทุกข้อ', apiRun.ok && apiRun.failed === 0 && !apiRun.suiteFailed && apiRun.total >= 22,
  apiRun.ok ? `ผ่าน ${apiRun.total - apiRun.failed}/${apiRun.total}${apiRun.total < 22 ? ' · ต้องมีอย่างน้อย 22 ข้อ' : ''}${apiRun.suiteFailed ? ' · มีไฟล์ test ที่โหลดไม่ขึ้น' : ''}` : apiRun.detail);

// ════════ CP47 · debug 3 bug จากผู้ใช้ ════════
let app = null, request = null, svc = null;
try {
  svc = await import(pathToFileURL(path.join(ROOT, 'api/src/services/requestService.js')).href);
  const appMod = await import(pathToFileURL(path.join(ROOT, 'api/src/app.js')).href);
  try { request = (await import('supertest')).default; }
  catch {
    const req = createRequire(path.join(ROOT, 'api', 'package.json'));
    request = (await import(pathToFileURL(req.resolve('supertest')).href)).default;
  }
  app = appMod.createApp();
} catch (e) { console.log(`\n[!] เปิด API ไม่ได้: ${e.message}\n`); }

const valid = { requesterName: 'ตรวจ อัตโนมัติ', requestType: 'แจ้งซ่อม', location: 'C3-401',
  details: 'รายละเอียดยาวพอสมควรจริง', priority: 'normal' };
const safe = async (fn) => { try { return await fn(); } catch (e) { return { status: 0, body: {}, _e: e.message }; } };
const quiet = async (fn) => { const o = console.error, l = console.log; console.error = console.log = () => {}; try { return await fn(); } finally { console.error = o; console.log = l; } };

// สัปดาห์ 13 เพิ่มการเข้าสู่ระบบ — ถ้ามี /api/auth/login ให้ขอ token ของเจ้าหน้าที่ก่อนยิง PUT/DELETE
async function staffAuth() {
  const r = await safe(() => request(app).post('/api/auth/login').send({ email: 'staff@rmutl.ac.th', password: 'staff1234' }));
  return r.status === 200 && r.body?.token ? { Authorization: `Bearer ${r.body.token}` } : {};
}

if (app) {
  await svc.loadSeed();
  const auth1 = await staffAuth();
  const r1 = await quiet(() => safe(async () => {
    await request(app).delete('/api/requests/REQ-002').set(auth1);
    return request(app).post('/api/requests').send(valid);
  }));
  rec('CP47', 'inclass', 'BUG #1 · ลบรายการกลางแล้วเพิ่มใหม่ → 201', r1.status === 201, `ได้ ${r1.status}`);

  await svc.loadSeed();
  const auth3 = await staffAuth();
  const r3 = await quiet(() => safe(() => request(app).put('/api/requests/REQ-999').set(auth3).send({ status: 'completed' })));
  rec('CP47', 'inclass', 'BUG #3 · เปลี่ยนสถานะคำร้องที่ไม่มี → 404 (ไม่ใช่ 500)', r3.status === 404, `ได้ ${r3.status}`);

  await svc.loadSeed();
  const rh = await safe(() => request(app).get('/api/health'));
  rec('CP47', 'inclass', 'ไม่ถอยหลัง · /api/health ยังตอบ 200 และต่อฐานข้อมูลได้',
    rh.status === 200 && rh.body?.database?.connected === true, `ได้ ${rh.status}`);
} else {
  // ⚠ บันทึกครบทุกข้อเหมือนกรณีเปิดได้ — ตัวหารต้องคงที่เสมอ
  rec('CP47', 'inclass', 'BUG #1 · ลบรายการกลางแล้วเพิ่มใหม่ → 201', false, 'เปิด API ไม่ได้');
  rec('CP47', 'inclass', 'BUG #3 · เปลี่ยนสถานะคำร้องที่ไม่มี → 404 (ไม่ใช่ 500)', false, 'เปิด API ไม่ได้');
  rec('CP47', 'inclass', 'ไม่ถอยหลัง · /api/health ยังตอบ 200 และต่อฐานข้อมูลได้', false, 'เปิด API ไม่ได้');
}

let summary = null;
try { summary = (await import(pathToFileURL(path.join(ROOT, 'frontend/src/utils/requestSummary.js')).href)).summarizeRequests; } catch {}
const s2 = summary ? summary([{ status: 'pending' }, { status: 'in-progress' }, { status: 'in-progress' }, { status: 'completed' }]) : null;
rec('CP47', 'inclass', 'BUG #2 · Dashboard นับ "กำลังดำเนินการ" ถูก', s2 && s2.inProgress === 2,
  summary ? `นับได้ ${s2.inProgress} (ควรเป็น 2)` : 'ไม่พบ frontend/src/utils/requestSummary.js');

const feRun = runVitest('frontend');
rec('CP47', 'inclass', 'frontend มี test และผ่านทุกข้อ', feRun.ok && feRun.total >= 2 && feRun.failed === 0 && !feRun.suiteFailed,
  feRun.ok ? `ผ่าน ${feRun.total - feRun.failed}/${feRun.total}${feRun.total < 2 ? ' · ต้องมีอย่างน้อย 2 ข้อ' : ''}` : feRun.detail);

// regression test — กันไม่ให้ bug กลับมา (ตรวจว่ามี test ที่ยิงกรณีนั้นจริง)
const feSrc = strip(readDir('frontend/src'));
rec('CP47', 'inclass', 'regression test BUG #1 (ลบแล้วเพิ่มใหม่)', /\.delete\((?:(?!\b(?:test|it|describe)\s*[.(])[\s\S]){0,600}?\.post\(/.test(integSrc));
rec('CP47', 'inclass', 'regression test BUG #2 (นับ in-progress)', has(feSrc, 'in-progress', 'inProgress'));
rec('CP47', 'inclass', 'regression test BUG #3 (PUT คำร้องที่ไม่มี → 404)',
  /\.put\(\s*['"`]\/api\/requests\/(REQ-9\d\d|\$\{)/.test(integSrc) && has(integSrc, '404'));

// DEBUG_LOG.md — ทุก bug ต้องระบุสาเหตุ
const log = await read('DEBUG_LOG.md');
const sections = log.split(/^##\s+BUG\s*#/m).slice(1);
const filled = sections.filter((sec) => /\*\*สาเหตุ[^*]*\*\*[ \t]*\S[^\n]{5,}/.test(sec)).length;
rec('CP47', 'inclass', 'DEBUG_LOG.md ระบุสาเหตุครบ 4 bug', filled >= 4, `ระบุแล้ว ${filled}/4`);

// ════════ ⭐ Challenge ════════
let pct = null;
if (apiRun.ok) {
  const covDir = path.join(TMP, 'cov');
  runVitest('api', ['--coverage', '--coverage.reporter=json-summary', `--coverage.reportsDirectory=${covDir}`]);
  try { pct = JSON.parse(readFileSync(path.join(covDir, 'coverage-summary.json'), 'utf8')).total.statements.pct; } catch {}
}
rec('CHAL', 'challenge', '⭐ coverage ของ api ≥ 85% (statements)', pct !== null && pct >= 85, pct === null ? 'วัดไม่ได้' : `ได้ ${pct}%`);
// GitHub รัน workflow จาก .github/workflows ที่ root ของ repo เท่านั้น — ตรวจทั้ง root ของ Student Repository (3 ชั้นขึ้นไป) และในโฟลเดอร์นี้
const ciDirs = [path.join(ROOT, '../../../.github/workflows'), path.join(ROOT, '.github/workflows')];
const ci = ciDirs.filter((d) => existsSync(d))
  .flatMap((d) => readdirSync(d).filter((f) => /\.ya?ml$/.test(f)).map((f) => readFileSync(path.join(d, f), 'utf8'))).join('\n');
rec('CHAL', 'challenge', '⭐ CI รัน npm test ทุกครั้งที่ push', has(ci, 'npm test|npm run test|vitest'));

// ── รายงาน ──
const shown = INCLASS ? results.filter((r) => r.scope === 'inclass') : results;
console.log('');
for (const r of shown) console.log(`${r.ok ? '✅' : '[TODO]'} ${r.id} ${r.name}${r.detail && !r.ok ? ' — ' + r.detail : ''}`);
const grp = (s) => results.filter((r) => r.scope === s);
const p = (a) => a.filter((x) => x.ok).length;
const ic = grp('inclass'), ch = grp('challenge');
console.log('\n' + '─'.repeat(58));
console.log(`🏫 ในห้อง (CP44–CP47)   ผ่าน ${p(ic)}/${ic.length} รายการ`);
if (!INCLASS) {
  console.log(`⭐ Challenge            ผ่าน ${p(ch)}/${ch.length} รายการ`);
  console.log('─'.repeat(58));
  console.log(`ผ่าน ${p(results)}/${results.length} รายการ`);
}
console.log('\nหมายเหตุ: checker ตรวจได้ว่า bug หายและมี test กัน แต่ตรวจไม่ได้ว่าเข้าใจสาเหตุ');
console.log('ผู้สอนจะถามให้เล่าว่าใช้เครื่องมือไหนหาเจอ และทำไมแก้ตรงนั้น');
