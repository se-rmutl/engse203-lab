#!/usr/bin/env node
/**
 * ENGSE203 Week 13 — Checker
 * ตรวจ: validation เข้มขึ้น · password hashing · JWT login · 401/403 · secrets ตอน production
 *
 *   node --disable-warning=ExperimentalWarning check-week13.mjs            ตรวจทั้งหมด
 *   node --disable-warning=ExperimentalWarning check-week13.mjs --inclass  เฉพาะในห้อง
 *
 * ⚠ ต้อง npm install ใน api/ ก่อน (ใช้ jsonwebtoken, supertest และ Vitest ของโปรเจกต์)
 */
import { readFile } from 'node:fs/promises';
import { existsSync, readdirSync, readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const API = path.join(ROOT, 'api');
const INCLASS = process.argv.includes('--inclass');

// ── ฐานข้อมูลในหน่วยความจำ · ไม่แตะ Turso · ใช้ secret สำหรับพัฒนา ──
process.env.DB_FILE = ':memory:';
delete process.env.TURSO_DATABASE_URL;
delete process.env.TURSO_AUTH_TOKEN;
delete process.env.JWT_SECRET;
if (process.env.NODE_ENV === 'production') delete process.env.NODE_ENV;

const TMP = mkdtempSync(path.join(tmpdir(), 'engse203-w13-'));
process.on('exit', () => { try { rmSync(TMP, { recursive: true, force: true }); } catch {} });

const results = [];
const rec = (id, scope, name, ok, detail = '') => results.push({ id, scope, name, ok: !!ok, detail });
const read = async (p) => { try { return await readFile(path.join(ROOT, p), 'utf8'); } catch { return ''; } };
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
const has = (s, ...f) => f.every((x) => new RegExp(x, 'i').test(s));
const load = async (rel) => { try { return await import(pathToFileURL(path.join(ROOT, rel)).href); } catch { return null; } };
const apiRequire = createRequire(path.join(API, 'package.json'));
const fromApi = async (name) => {
  try { return (await import(name)).default; }
  catch { try { return (await import(pathToFileURL(apiRequire.resolve(name)).href)).default; } catch { return null; } }
};
const readTests = () => {
  const dir = path.join(API, 'tests');
  if (!existsSync(dir)) return '';
  return readdirSync(dir, { recursive: true }).filter((f) => String(f).endsWith('.test.js'))
    .map((f) => readFileSync(path.join(dir, String(f)), 'utf8')).join('\n');
};

// ════════ CP48 · validation เข้มขึ้น ════════
const validator = await load('api/src/validators/requestValidator.js');
const base = { requesterName: 'สมชาย ใจดี', requestType: 'แจ้งซ่อม', location: 'ห้อง 301',
  details: 'แอร์ไม่เย็นตั้งแต่เช้า', priority: 'normal' };
const v = (patch) => validator ? validator.validateRequestInput({ ...base, ...patch }) : null;
rec('CP48', 'inclass', 'ชื่อผู้แจ้ง 100 ตัวผ่าน · 101 ตัวถูกปฏิเสธ',
  validator && v({ requesterName: 'ก'.repeat(100) }).length === 0 && v({ requesterName: 'ก'.repeat(101) }).length === 1);
rec('CP48', 'inclass', 'รายละเอียด 1000 ตัวผ่าน · 1001 ตัวถูกปฏิเสธ',
  validator && v({ details: 'ก'.repeat(1000) }).length === 0 && v({ details: 'ก'.repeat(1001) }).length === 1);
rec('CP48', 'inclass', 'สถานที่ยาวเกิน 100 ตัวถูกปฏิเสธ', validator && v({ location: 'ก'.repeat(101) }).length === 1);

// ════════ CP49 · password hashing ════════
const pw = await load('api/src/utils/password.js');
let h1 = '', h2 = '';
try { h1 = pw.hashPassword('secret-123'); h2 = pw.hashPassword('secret-123'); } catch {}
rec('CP49', 'inclass', 'hashPassword คืนรูปแบบ scrypt$salt$hash', /^scrypt\$[0-9a-f]{32}\$[0-9a-f]{128}$/.test(h1),
  pw ? (h1 ? `ได้ ${String(h1).slice(0, 24)}…` : 'ยังไม่ได้เขียน') : 'ไม่พบ api/src/utils/password.js');
rec('CP49', 'inclass', 'รหัสผ่านเดียวกันได้ hash ต่างกัน (salt สุ่ม) และไม่มีรหัสผ่านจริงปน',
  h1 && h2 && h1 !== h2 && !h1.includes('secret-123'));
let okV = false;
try { okV = pw.verifyPassword('secret-123', h1) === true && pw.verifyPassword('secret-999', h1) === false; } catch {}
rec('CP49', 'inclass', 'verifyPassword: ถูก → true · ผิด → false', okV);
const schema = await read('api/data/schema.sql');
const seedHash = (schema.match(/'(scrypt\$[0-9a-f]{32}\$[0-9a-f]{128})'/) ?? [])[1];
let okSeed = false;
try { okSeed = !!seedHash && pw.verifyPassword('staff1234', seedHash) === true; } catch {}
rec('CP49', 'inclass', 'ตรวจ hash บัญชีเจ้าหน้าที่ใน schema.sql ได้', okSeed);
rec('CP49', 'inclass', 'ตาราง users มีคอลัมน์ role และ password_hash', has(schema, 'role\\s+TEXT', 'password_hash\\s+TEXT'));

// ════════ CP50–CP51 · เข้าสู่ระบบและสิทธิ์ (ยิงจริงผ่าน supertest) ════════
let app = null, request = null, svc = null, jwt = null;
try {
  svc = await import(pathToFileURL(path.join(API, 'src/services/requestService.js')).href);
  const appMod = await import(pathToFileURL(path.join(API, 'src/app.js')).href);
  request = await fromApi('supertest');
  jwt = await fromApi('jsonwebtoken');
  await svc.loadSeed();
  app = appMod.createApp();
} catch (e) { console.log(`\n[!] เปิด API ไม่ได้: ${e.message}\n`); }

const safe = async (fn) => { try { return await fn(); } catch (e) { return { status: 0, body: {}, headers: {}, _e: e.message }; } };
const quiet = async (fn) => { const o = console.error, l = console.log; console.error = console.log = () => {}; try { return await fn(); } finally { console.error = o; console.log = l; } };
const STAFF = { email: 'staff@rmutl.ac.th', password: 'staff1234' };
const valid = { requesterName: 'ตรวจ อัตโนมัติ', requestType: 'แจ้งซ่อม', location: 'C3-401',
  details: 'รายละเอียดยาวพอสมควรจริง', priority: 'normal' };
const login = (body) => quiet(() => safe(() => request(app).post('/api/auth/login').send(body)));
const sign = (payload, secret) => { try { return jwt.sign(payload, secret, { expiresIn: '5m' }); } catch { return 'x.y.z'; } };

const names = {
  big: 'body ใหญ่เกิน 10kb → 413 เป็น JSON',
  ok: 'POST /api/auth/login ถูกต้อง → 200 พร้อม token (3 ส่วน)',
  payload: 'payload ของ token มี role=staff และ exp · ไม่มีรหัสผ่าน',
  same: 'รหัสผ่านผิด กับ อีเมลที่ไม่มี → 401 ข้อความเดียวกัน',
  requester: 'ผู้แจ้งทั่วไป (ไม่มีรหัสผ่าน) เข้าสู่ระบบไม่ได้',
  noToken: 'PUT ไม่มี token → 401',
  forged: 'PUT ด้วย token ปลอม (secret อื่น) → 401',
  forbidden: 'PUT ด้วย token ที่ไม่ใช่เจ้าหน้าที่ → 403',
  staff: 'เจ้าหน้าที่: PUT → 200 และ DELETE → 204',
  public: 'GET และ POST ยังไม่ต้องเข้าสู่ระบบ',
  regress: 'ไม่ถอยหลัง · BUG #1 ของสัปดาห์ 12 ยังแก้อยู่ (ลบแล้วเพิ่มใหม่ → 201)',
};

let tokenOk = null;
if (app && request && jwt) {
  let r = await quiet(() => safe(() => request(app).post('/api/requests').send({ ...valid, details: 'x'.repeat(20000) })));
  rec('CP48', 'inclass', names.big, r.status === 413 && typeof r.body?.error === 'string', `ได้ ${r.status}`);

  r = await login(STAFF);
  tokenOk = r.status === 200 && typeof r.body?.token === 'string' && r.body.token.split('.').length === 3 ? r.body.token : null;
  rec('CP50', 'inclass', names.ok, tokenOk, `ได้ ${r.status}`);
  const payload = tokenOk ? jwt.decode(tokenOk) : null;
  rec('CP50', 'inclass', names.payload,
    payload?.role === 'staff' && !!payload?.exp && !/staff1234|scrypt/.test(JSON.stringify(payload ?? {})));
  const wrong = await login({ ...STAFF, password: 'nope-12345' });
  const unknown = await login({ email: 'ghost@rmutl.ac.th', password: 'nope-12345' });
  rec('CP50', 'inclass', names.same,
    wrong.status === 401 && unknown.status === 401 && wrong.body?.error === unknown.body?.error, `ได้ ${wrong.status} / ${unknown.status}`);
  const req1 = await login({ email: 'somchai@rmutl.ac.th', password: 'anything-1' });
  rec('CP50', 'inclass', names.requester, req1.status === 401, `ได้ ${req1.status}`);

  const put = (headers = {}) => quiet(() => safe(() => request(app).put('/api/requests/REQ-001').set(headers).send({ status: 'completed' })));
  r = await put();
  rec('CP51', 'inclass', names.noToken, r.status === 401, `ได้ ${r.status}`);
  r = await put({ Authorization: `Bearer ${sign({ sub: '5', role: 'staff' }, 'not-the-real-secret')}` });
  rec('CP51', 'inclass', names.forged, r.status === 401, `ได้ ${r.status}`);
  const devSecret = (await load('api/src/config.js'))?.config?.jwtSecret ?? 'none';
  r = await put({ Authorization: `Bearer ${sign({ sub: '1', role: 'requester' }, devSecret)}` });
  rec('CP51', 'inclass', names.forbidden, r.status === 403, `ได้ ${r.status}`);
  await svc.loadSeed();
  const auth = tokenOk ? { Authorization: `Bearer ${tokenOk}` } : {};
  const rp = await put(auth);
  const rd = await quiet(() => safe(() => request(app).delete('/api/requests/REQ-003').set(auth)));
  rec('CP51', 'inclass', names.staff, rp.status === 200 && rd.status === 204, `ได้ ${rp.status} / ${rd.status}`);
  await svc.loadSeed();
  const g = await safe(() => request(app).get('/api/requests'));
  const pst = await quiet(() => safe(() => request(app).post('/api/requests').send(valid)));
  rec('CP51', 'inclass', names.public, g.status === 200 && pst.status === 201, `ได้ ${g.status} / ${pst.status}`);
  await svc.loadSeed();
  const rr = await quiet(() => safe(async () => {
    await request(app).delete('/api/requests/REQ-002').set(auth);
    return request(app).post('/api/requests').send(valid);
  }));
  rec('CP51', 'inclass', names.regress, rr.status === 201, `ได้ ${rr.status}`);
} else {
  // ⚠ บันทึกครบทุกข้อเหมือนกรณีเปิดได้ — ตัวหารต้องคงที่เสมอ
  const why = !app ? 'เปิด API ไม่ได้' : 'ยังไม่ได้ npm install ใน api/ (supertest / jsonwebtoken)';
  rec('CP48', 'inclass', names.big, false, why);
  for (const k of ['ok', 'payload', 'same', 'requester']) rec('CP50', 'inclass', names[k], false, why);
  for (const k of ['noToken', 'forged', 'forbidden', 'staff', 'public', 'regress']) rec('CP51', 'inclass', names[k], false, why);
}

// ════════ CP52 · secrets และ production ════════
const childEnv = (extra) => {
  const env = { ...process.env, DB_FILE: ':memory:', ...extra };
  delete env.TURSO_DATABASE_URL; delete env.TURSO_AUTH_TOKEN;
  return env;
};
const noSecretEnv = childEnv({ NODE_ENV: 'production' }); delete noSecretEnv.JWT_SECRET;
const c1 = spawnSync(process.execPath, ['--disable-warning=ExperimentalWarning', '--input-type=module', '-e', "await import('./src/config.js')"],
  { cwd: API, env: noSecretEnv, encoding: 'utf8' });
rec('CP52', 'inclass', 'production ไม่ตั้ง JWT_SECRET → ระบบไม่ยอม start', c1.status !== 0 && /JWT_SECRET/.test(c1.stderr),
  c1.status === 0 ? 'ยัง start ได้ — ต้อง throw error เมื่อไม่มี JWT_SECRET' : '');

const prodScript = `
  const { createRequire } = await import('node:module');
  const { pathToFileURL } = await import('node:url');
  const req = createRequire(process.cwd() + '/package.json');
  const request = (await import(pathToFileURL(req.resolve('supertest')).href)).default;
  const { createApp } = await import('./src/app.js');
  const { loadSeed } = await import('./src/services/requestService.js');
  await loadSeed();
  const r = await request(createApp()).post('/api/requests').set('Content-Type', 'application/json').send('{"broken": ');
  console.log(JSON.stringify({ status: r.status, keys: Object.keys(r.body ?? {}) }));`;
const c2 = spawnSync(process.execPath, ['--disable-warning=ExperimentalWarning', '--input-type=module', '-e', prodScript],
  { cwd: API, env: childEnv({ NODE_ENV: 'production', JWT_SECRET: 'checker-production-secret' }), encoding: 'utf8' });
let prod = null;
try { prod = JSON.parse(c2.stdout.trim().split('\n').pop()); } catch {}
rec('CP52', 'inclass', 'production: error ไม่ส่ง stack trace ให้ผู้ใช้', prod && prod.status === 400 && !prod.keys.includes('stack'),
  prod ? `ได้ ${prod.status} · keys ${prod.keys.join(',')}` : 'รันโหมด production ไม่ได้');

const envEx = await read('api/.env.example');
const gi = (await read('.gitignore')) + '\n' + (await read('api/.gitignore'));
rec('CP52', 'inclass', '.env.example มี JWT_SECRET ค่าว่าง และ .gitignore ไม่รวม .env',
  /^JWT_SECRET=\s*$/m.test(envEx) && /^\.env\s*$/m.test(gi));

// ทดสอบของโปรเจกต์ผ่านทั้งหมด และมี test เรื่องสิทธิ์
let run = null;
try {
  const bin = path.join(path.dirname(apiRequire.resolve('vitest/package.json')), 'vitest.mjs');
  const out = path.join(TMP, 'vitest.json');
  const env = { ...process.env }; delete env.DB_FILE;
  spawnSync(process.execPath, [bin, 'run', '--reporter=json', `--outputFile=${out}`], { cwd: API, env, encoding: 'utf8', timeout: 180000 });
  run = JSON.parse(readFileSync(out, 'utf8'));
} catch {}
const tests = strip(readTests());
rec('CP52', 'inclass', 'npm test ใน api ผ่านทุกข้อ และมี test ของ 401 กับ 403',
  run && run.numFailedTests === 0 && run.numFailedTestSuites === 0 && run.numTotalTests >= 50 && has(tests, '401', '403'),
  run ? `ผ่าน ${run.numTotalTests - run.numFailedTests}/${run.numTotalTests}${run.numTotalTests < 50 ? ' · ต้องมีอย่างน้อย 50 ข้อ' : ''}${has(tests, '401', '403') ? '' : ' · ยังไม่มี test 401/403'}` : 'รัน vitest ไม่ได้');

// ════════ ⭐ Challenge ════════
if (app && request) {
  const r = await safe(() => request(app).get('/api/health'));
  rec('CHAL', 'challenge', '⭐ มี security header (X-Content-Type-Options: nosniff)', r.headers?.['x-content-type-options'] === 'nosniff');
  // จำกัดการเดารหัสผ่าน — ทำเป็นข้อสุดท้าย เพราะจะล็อกอีเมลนี้ไว้ชั่วคราว
  const routes = await load('api/src/routes/authRoutes.js');
  routes?.resetLoginLimiter?.();
  for (let i = 0; i < 5; i += 1) await login({ ...STAFF, password: `wrong-guess-${i}` });
  const after = await login(STAFF);
  rec('CHAL', 'challenge', '⭐ ผิดเกิน 5 ครั้ง → 429 (จำกัดการเดารหัสผ่าน)', after.status === 429, `ครั้งที่ 6 ได้ ${after.status}`);
} else {
  rec('CHAL', 'challenge', '⭐ มี security header (X-Content-Type-Options: nosniff)', false, 'เปิด API ไม่ได้');
  rec('CHAL', 'challenge', '⭐ ผิดเกิน 5 ครั้ง → 429 (จำกัดการเดารหัสผ่าน)', false, 'เปิด API ไม่ได้');
}
const apiClient = strip(await read('frontend/src/services/apiClient.js'));
rec('CHAL', 'challenge', '⭐ frontend แนบ Authorization: Bearer ทุกคำขอ (ทำต่อใน Term Project)', has(apiClient, 'Authorization', 'Bearer'));
const ry = await read('render.yaml');
rec('CHAL', 'challenge', '⭐ render.yaml ให้ Render สร้าง JWT_SECRET (generateValue)', has(ry, 'JWT_SECRET', 'generateValue:\\s*true'));

// ── รายงาน ──
const shown = INCLASS ? results.filter((r) => r.scope === 'inclass') : results;
console.log('');
for (const r of shown) console.log(`${r.ok ? '✅' : '[TODO]'} ${r.id} ${r.name}${r.detail && !r.ok ? ' — ' + r.detail : ''}`);
const grp = (s) => results.filter((r) => r.scope === s);
const p = (a) => a.filter((x) => x.ok).length;
const ic = grp('inclass'), ch = grp('challenge');
console.log('\n' + '─'.repeat(58));
console.log(`🏫 ในห้อง (CP48–CP52)   ผ่าน ${p(ic)}/${ic.length} รายการ`);
if (!INCLASS) {
  console.log(`⭐ Challenge            ผ่าน ${p(ch)}/${ch.length} รายการ`);
  console.log('─'.repeat(58));
  console.log(`ผ่าน ${p(results)}/${results.length} รายการ`);
}
console.log('\nหมายเหตุ: checker ตรวจพฤติกรรมด้านความปลอดภัยได้ แต่ตรวจไม่ได้ว่าเข้าใจเหตุผล');
console.log('ผู้สอนจะถามว่า 401 ต่างจาก 403 อย่างไร และทำไมต้อง hash รหัสผ่าน');
