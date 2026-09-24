#!/usr/bin/env node
/**
 * ENGSE203 Week 07 — Checker
 * ตรวจทั้ง API และ frontend · รันจาก root ของ week-07
 *
 * ใช้:  node check-week07.mjs
 *      node check-week07.mjs --inclass    (เฉพาะ CP09–CP12 ที่ทำในห้อง)
 */
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ── supertest อยู่ใน devDependencies ของ api/ — หาได้ทั้งจาก root และจาก api/ ──
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
async function loadSupertest() {
  try { return (await import('supertest')).default; }
  catch {
    const req = createRequire(path.join(ROOT, 'api', 'package.json'));
    return (await import(pathToFileURL(req.resolve('supertest')).href)).default;
  }
}

// ── ใช้ฐานข้อมูลชั่วคราว — checker ไม่เขียนข้อมูลทดสอบลง campus.db ที่ต้อง commit ──
import { tmpdir } from 'node:os';
import { rmSync as rmCheckDb } from 'node:fs';
const CHECK_DB = path.join(tmpdir(), `engse203-check-${process.pid}.db`);
if (!process.env.DB_FILE) process.env.DB_FILE = CHECK_DB;
// ⚠ checker ใช้ฐานข้อมูลในเครื่องเสมอ — ไม่เขียนข้อมูลทดสอบขึ้น Turso (Challenge ⭐⭐)
delete process.env.TURSO_DATABASE_URL;
delete process.env.TURSO_AUTH_TOKEN;
process.on('exit', () => { try { rmCheckDb(CHECK_DB, { force: true }); } catch {} });

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const INCLASS = process.argv.includes('--inclass');
const results = [];
const rec = (id, scope, name, ok, detail = '') => results.push({ id, scope, name, ok, detail });

const read = async (p) => { try { return await readFile(path.join(ROOT, p), 'utf8'); } catch { return ''; } };
const has = (s, ...frags) => frags.every((f) => s.includes(f));
/** ลบคอมเมนต์ก่อนตรวจ เพื่อไม่ให้ TODO ที่เขียนไว้ถูกนับว่าทำแล้ว */
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');

let app = null;
let request = null;

async function setup() {
  try {
    const mod = await import('./api/src/app.js');
    const svc = await import('./api/src/services/requestService.js');
    request = await loadSupertest();
    await svc.loadSeed();
    app = mod.createApp();
    return true;
  } catch (err) {
    console.log(`\n❌ เปิด API ไม่ได้: ${err.message}\n   ตรวจว่าทำ TODO ใน api/src/config.js และ api/src/app.js แล้วหรือยัง\n`);
    return false;
  }
}
const safe = async (fn) => { try { return await fn(); } catch (e) { return { status: 0, body: {}, headers: {}, _e: e.message }; } };

async function run() {
  // ── โครงสร้าง ──
  for (const f of ['api/src/app.js', 'api/src/config.js', 'api/.env.example',
                   'frontend/src/services/apiClient.js', 'frontend/src/services/requestService.js']) {
    rec('STRUCT', 'inclass', `มีไฟล์ ${f}`, existsSync(path.join(ROOT, f)));
  }

  // ── CP10 · config + CORS + env ──
  const cfg = strip(await read('api/src/config.js'));
  rec('CP10', 'inclass', 'config.js อ่าน PORT จาก environment', has(cfg, 'process.env.PORT'), 'ยังไม่ได้อ่าน process.env.PORT');
  rec('CP10', 'inclass', 'config.js อ่าน CORS_ORIGIN จาก environment', has(cfg, 'process.env.CORS_ORIGIN'));
  rec('CP10', 'inclass', 'config.js แปลง port เป็นตัวเลข', /Number\s*\(|parseInt/.test(cfg), 'process.env ได้ string ต้องแปลงเอง');

  const appSrc = strip(await read('api/src/app.js'));
  rec('CP10', 'inclass', 'app.js เรียกใช้ cors()', has(appSrc, 'cors('), 'ยังไม่ได้ app.use(cors(...))');
  rec('CP10', 'inclass', 'cors ใช้ค่าจาก config ไม่ใช่ค่าฝังในโค้ด', has(appSrc, 'config.corsOrigin'));

  const srv = strip(await read('api/src/server.js'));
  rec('CP10', 'inclass', 'server.js ใช้ config.port แทนเลขฝังในโค้ด', has(srv, 'config.port'));

  if (!(await setup())) {
    const pend = [
      ['CP10','inclass','ตอบ Access-Control-Allow-Origin ให้ frontend'],
      ['CP10','inclass','รองรับ preflight OPTIONS'],
      ['CP11','inclass','GET /api/requests ยังทำงาน'],
      ['CP13','takehome','PUT /api/requests/:id เปลี่ยนสถานะได้'],
      ['CP13','takehome','PUT status ไม่ถูกต้อง → 400'],
      ['CP14','takehome','ใช้ morgan เป็น logger'],
    ];
    for (const [i, s, n] of pend) rec(i, s, n, false, 'ยังเปิด API ไม่ได้');
  } else {
    let r = await safe(() => request(app).get('/api/requests').set('Origin', 'http://localhost:5173'));
    rec('CP10', 'inclass', 'ตอบ Access-Control-Allow-Origin ให้ frontend',
      r.headers?.['access-control-allow-origin'] === 'http://localhost:5173',
      `ได้ ${r.headers?.['access-control-allow-origin'] ?? 'ไม่มี header'}`);

    r = await safe(() => request(app).options('/api/requests')
      .set('Origin', 'http://localhost:5173').set('Access-Control-Request-Method', 'POST'));
    rec('CP10', 'inclass', 'รองรับ preflight OPTIONS', r.status === 204 || r.status === 200, `ได้ ${r.status}`);

    r = await safe(() => request(app).get('/api/requests'));
    rec('CP11', 'inclass', 'GET /api/requests ยังทำงาน', r.status === 200 && Array.isArray(r.body), `ได้ ${r.status}`);

    r = await safe(() => request(app).put('/api/requests/REQ-001').send({ status: 'in-progress' }));
    rec('CP13', 'takehome', 'PUT /api/requests/:id เปลี่ยนสถานะได้', r.status === 200 && r.body?.status === 'in-progress', `ได้ ${r.status}`);

    r = await safe(() => request(app).put('/api/requests/REQ-001').send({ status: 'ไม่มีสถานะนี้' }));
    rec('CP13', 'takehome', 'PUT status ไม่ถูกต้อง → 400', r.status === 400, `ได้ ${r.status}`);

    rec('CP14', 'takehome', 'ใช้ morgan เป็น logger', has(appSrc, 'morgan'), 'ยังใช้ logger ที่เขียนเอง');
  }

  // ── CP11 · frontend เรียก API ──
  const client = strip(await read('frontend/src/services/apiClient.js'));
  rec('CP11', 'inclass', 'apiClient อ่าน VITE_API_BASE_URL', has(client, 'VITE_API_BASE_URL'));
  rec('CP11', 'inclass', 'apiClient เรียก fetch()', has(client, 'fetch('));
  rec('CP11', 'inclass', 'apiClient จัดการกรณีต่อเซิร์ฟเวอร์ไม่ได้ (try/catch รอบ fetch)',
    /try\s*{[\s\S]*fetch\([\s\S]*}\s*catch/.test(client), 'ถ้า API ไม่เปิด fetch จะโยน error');
  rec('CP11', 'inclass', 'apiClient โยน ApiError เมื่อ response ไม่ ok', has(client, '!response.ok', 'ApiError'));
  rec('CP11', 'inclass', 'apiClient คืน null เมื่อได้ 204', /204/.test(client) && /return\s+null/.test(client));

  const svc = strip(await read('frontend/src/services/requestService.js'));
  rec('CP11', 'inclass', 'getRequests เรียก API ไม่ใช่ localStorage', has(svc, 'apiFetch') && !svc.includes('requestStorage'));
  rec('CP11', 'inclass', 'addRequest ส่ง method POST', /addRequest[\s\S]{0,400}POST/.test(svc));
  rec('CP11', 'inclass', 'deleteRequest ส่ง method DELETE', /deleteRequest[\s\S]{0,400}DELETE/.test(svc));
  rec('CP11', 'inclass', 'getRequestById คืน null เมื่อ 404 (ไม่โยน error)',
    /getRequestById[\s\S]{0,500}404[\s\S]{0,120}null/.test(svc), 'ไม่พบคำร้องไม่ใช่ความผิดพลาดของระบบ');

  // ── CP12 · loading / error state ──
  const dash = await read('frontend/src/pages/DashboardPage.jsx');
  rec('CP12', 'inclass', 'Dashboard มีสถานะ loading', /loadState|isLoading|loading/.test(dash));
  rec('CP12', 'inclass', 'Dashboard จัดการกรณีโหลดไม่สำเร็จ', /error/i.test(dash));

  // ── CP13 · frontend PUT ──
  rec('CP13', 'takehome', 'frontend มี updateRequestStatus ที่ใช้ PUT',
    /updateRequestStatus[\s\S]{0,400}PUT/.test(svc));

  // ── CP15 · API contract ──
  rec('CP15', 'takehome', 'มีไฟล์ API_CONTRACT.md', existsSync(path.join(ROOT, 'API_CONTRACT.md')));
  const contract = await read('API_CONTRACT.md');
  rec('CP15', 'takehome', 'API contract ครอบคลุมครบ 5 endpoint',
    ['GET', 'POST', 'PUT', 'DELETE'].every((m) => contract.includes(m)) && contract.includes('/api/requests'));

  // ── CP16 · automated test ──
  const tests = strip(await read('api/tests/api.test.js'));
  const caseCount = (tests.match(/\btest\s*\(/g) ?? []).length;
  rec('CP16', 'takehome', 'เขียน test อย่างน้อย 6 เคส', caseCount >= 6, `พบ ${caseCount} เคส`);
  rec('CP16', 'takehome', 'test ยิง request จริงด้วย supertest', has(tests, 'request(app)'));

  // ── Challenge ──
  const errH = strip(await read('api/src/middleware/errorHandler.js'));
  rec('CHAL', 'challenge', '⭐ มี AppError สำหรับกำหนด status เอง', has(errH, 'class AppError'));
  rec('CHAL', 'challenge', '⭐ มี asyncHandler ห่อ handler ที่เป็น async', has(errH, 'asyncHandler'));
  rec('CHAL', 'challenge', '⭐ ไม่ส่ง stack trace ตอน production', has(errH, 'isProduction') || has(errH, 'NODE_ENV'));
}

await run();

const shown = INCLASS ? results.filter((r) => r.scope === 'inclass') : results;
console.log('');
for (const r of shown) console.log(`${r.ok ? '✅' : '[TODO]'} ${r.id} ${r.name}${r.detail && !r.ok ? ' — ' + r.detail : ''}`);

const grp = (s) => results.filter((r) => r.scope === s);
const p = (a) => a.filter((x) => x.ok).length;
const ic = grp('inclass'), th = grp('takehome'), ch = grp('challenge');
console.log('\n' + '─'.repeat(58));
console.log(`🏫 ในห้อง (CP09–CP12)   ผ่าน ${p(ic)}/${ic.length} รายการ`);
if (!INCLASS) {
  console.log(`🏠 ที่บ้าน (CP13–CP16)   ผ่าน ${p(th)}/${th.length} รายการ`);
  console.log(`⭐ Challenge            ผ่าน ${p(ch)}/${ch.length} รายการ`);
  console.log('─'.repeat(58));
  console.log(`ผ่าน ${p(results)}/${results.length} รายการ`);
}
console.log('\nหมายเหตุ: checker ตรวจ CORS จาก header ได้ แต่ตรวจพฤติกรรมจริงในเบราว์เซอร์ไม่ได้');
console.log('ต้องเปิดแอปคู่กับ API แล้วดูด้วยตาว่า Dashboard โหลดข้อมูลขึ้นจริง');
