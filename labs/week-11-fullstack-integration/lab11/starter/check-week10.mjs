#!/usr/bin/env node
/**
 * ENGSE203 Week 10 — Checker
 * ตรวจว่า service เปลี่ยนมาใช้ SQLite จริง และ API ยังทำงานเหมือนเดิม
 *
 * ใช้:  node --disable-warning=ExperimentalWarning check-week10.mjs
 *      node --disable-warning=ExperimentalWarning check-week10.mjs --inclass
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
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
const has = (s, ...f) => f.every((x) => new RegExp(x, 'i').test(s));

// ── โครงสร้างไฟล์ ──
rec('STRUCT', 'inclass', 'มีไฟล์ api/data/schema.sql', existsSync(path.join(ROOT, 'api/data/schema.sql')));
rec('STRUCT', 'inclass', 'มี service ที่ api/src/services/requestService.js',
  existsSync(path.join(ROOT, 'api/src/services/requestService.js')));

const svc = strip(await read('api/src/services/requestService.js'));

// ── CP26 · เปิดฐานข้อมูลด้วย node:sqlite ──
rec('CP26', 'inclass', 'service เรียกใช้ node:sqlite', has(svc, "node:sqlite|libsql", 'DatabaseSync|new Database'),
  'ต้อง import { DatabaseSync } from "node:sqlite"');
rec('CP26', 'inclass', 'เปิด PRAGMA foreign_keys = ON', has(svc, 'foreign_keys'),
  'ไม่งั้น Foreign Key จะไม่ทำงาน');
rec('CP26', 'inclass', 'ไม่อ่านไฟล์ JSON แบบเดิมแล้ว', !has(svc, 'requests\\.json') && !has(svc, "readFile.*\\.json"));

// ── CP27 · path อ้างจากตำแหน่งไฟล์ ──
rec('CP27', 'inclass', 'ใช้ fileURLToPath / import.meta.url (path ไม่พึ่งที่รัน)',
  has(svc, 'import\\.meta\\.url') || has(svc, 'fileURLToPath'),
  'ไม่งั้นรัน dev กับ checker จากคนละโฟลเดอร์จะหาไฟล์ไม่เจอ');

// ── CP28–CP29 · SELECT ด้วย JOIN + แปลงชื่อ ──
rec('CP28', 'inclass', 'findAll ใช้ JOIN กับตาราง users', has(svc, 'join\\s+users'),
  'ต้อง JOIN เพื่อคืน requesterName');
rec('CP28', 'inclass', 'คืน requesterName ด้วย AS (ไม่ใช่ requester_id)',
  has(svc, 'as\\s+requestername') || has(svc, 'requesterName'));
rec('CP29', 'inclass', 'create แปลงชื่อผู้แจ้งเป็น id',
  has(svc, 'users\\s+where\\s+name') || has(svc, 'resolveUserId'),
  'frontend ส่งชื่อมา แต่ฐานข้อมูลเก็บ id');

// ── CP31 · parameterized query (ความปลอดภัย) ──
rec('CP31', 'takehome', 'ใช้ prepare() กับ placeholder ?', has(svc, 'prepare\\('),
  'ต้องใช้ ? ไม่ใช่ต่อ string');
// ตรวจว่าไม่มีการต่อ string เข้า SQL (ช่องโหว่ injection)
const injection = /`[^`]*(select|insert|update|delete)[^`]*\$\{[^}]*(input|status|id|req|name)[^}]*\}/i.test(svc);
rec('CP31', 'takehome', 'ไม่ต่อค่าจากผู้ใช้เข้า SQL โดยตรง (กัน SQL injection)', !injection,
  'พบการต่อ string ที่มีค่าจากผู้ใช้เข้า SQL — เสี่ยง injection');

// ── ทดสอบพฤติกรรมจริง ──
let app = null, request = null;
async function setup() {
  try {
    const svcMod = await import('./api/src/services/requestService.js');
    const appMod = await import('./api/src/app.js');
    request = await loadSupertest();
    await svcMod.loadSeed();
    app = appMod.createApp();
    return true;
  } catch (e) {
    console.log(`\n❌ เปิด API ไม่ได้: ${e.message}\n`);
    return false;
  }
}
const safe = async (fn) => { try { return await fn(); } catch (e) { return { status: 0, body: {}, _e: e.message }; } };

if (await setup()) {
  let r = await safe(() => request(app).get('/api/requests'));
  rec('CP28', 'inclass', 'GET /api/requests คืนข้อมูลจากฐานข้อมูล',
    r.status === 200 && Array.isArray(r.body) && r.body.length > 0, `ได้ ${r.status} · ${r.body?.length ?? 0} รายการ`);
  rec('CP28', 'inclass', 'ข้อมูลที่คืนมีรูปแบบ requesterName (ไม่ใช่ requester_id)',
    r.body?.[0] && 'requesterName' in r.body[0] && !('requester_id' in r.body[0]),
    r.body?.[0] ? `keys: ${Object.keys(r.body[0]).join(', ')}` : 'ไม่มีข้อมูล');

  r = await safe(() => request(app).get('/api/requests?status=pending'));
  rec('CP28', 'inclass', 'กรอง ?status= ทำงาน (WHERE ในฐานข้อมูล)',
    r.status === 200 && r.body.every?.((x) => x.status === 'pending'), `ได้ ${r.body?.length ?? 0} รายการ`);

  r = await safe(() => request(app).get('/api/requests/REQ-001'));
  rec('CP28', 'inclass', 'GET /:id ที่มีจริง → 200', r.status === 200, `ได้ ${r.status}`);
  r = await safe(() => request(app).get('/api/requests/REQ-999'));
  rec('CP28', 'inclass', 'GET /:id ที่ไม่มี → 404', r.status === 404, `ได้ ${r.status}`);

  const payload = { requesterName: 'ผู้ทดสอบ เช็คเกอร์', requestType: 'อื่น ๆ',
    location: 'ห้องทดสอบ', details: 'รายละเอียดยาวพอสมควรจริง', priority: 'normal' };
  r = await safe(() => request(app).post('/api/requests').send(payload));
  rec('CP29', 'inclass', 'POST สร้างคำร้อง → 201 · แปลงชื่อเป็น id ให้เอง',
    r.status === 201 && r.body?.requesterName === payload.requesterName, `ได้ ${r.status}`);
  const newId = r.body?.id;

  r = await safe(() => request(app).post('/api/requests').send({ requesterName: 'x' }));
  rec('CP29', 'inclass', 'POST ข้อมูลไม่ครบ → 400 (validation ยังทำงาน)', r.status === 400, `ได้ ${r.status}`);

  r = await safe(() => request(app).put(`/api/requests/${newId ?? 'REQ-001'}`).send({ status: 'in-progress' }));
  rec('CP30', 'inclass', 'PUT เปลี่ยนสถานะ → 200', r.status === 200 && r.body?.status === 'in-progress', `ได้ ${r.status}`);
  r = await safe(() => request(app).put('/api/requests/REQ-001').send({ status: 'ผิด' }));
  rec('CP30', 'inclass', 'PUT status ไม่ถูกต้อง → 400', r.status === 400, `ได้ ${r.status}`);

  if (newId) {
    r = await safe(() => request(app).delete(`/api/requests/${newId}`));
    rec('CP30', 'inclass', 'DELETE → 204', r.status === 204, `ได้ ${r.status}`);
  } else rec('CP30', 'inclass', 'DELETE → 204', false, 'ไม่มี id ให้ลบ');

  // parameterized ทำงานจริง — ยิง injection แล้วต้องไม่หลุด
  r = await safe(() => request(app).get(`/api/requests?status=${encodeURIComponent("x' OR '1'='1")}`));
  rec('CP31', 'takehome', 'ยิง SQL injection แล้วไม่หลุด (คืน 0 รายการ)',
    r.status === 200 && Array.isArray(r.body) && r.body.length === 0, `ได้ ${r.body?.length ?? '?'} รายการ`);

  // CORS ยังทำงาน
  r = await safe(() => request(app).get('/api/requests').set('Origin', 'http://localhost:5173'));
  rec('CP30', 'inclass', 'CORS ยังทำงาน (ของ Week 07 ไม่พัง)',
    r.headers?.['access-control-allow-origin'] === 'http://localhost:5173');
} else {
  for (const [i, s, n] of [
    ['CP28','inclass','GET /api/requests คืนข้อมูลจากฐานข้อมูล'],
    ['CP29','inclass','POST สร้างคำร้อง → 201 · แปลงชื่อเป็น id ให้เอง'],
    ['CP30','inclass','PUT เปลี่ยนสถานะ → 200'],
    ['CP31','takehome','ยิง SQL injection แล้วไม่หลุด (คืน 0 รายการ)'],
  ]) rec(i, s, n, false, 'เปิด API ไม่ได้');
}

// ── CP32 · error handling ──
const errH = strip(await read('api/src/middleware/errorHandler.js'));
rec('CP32', 'takehome', 'มี errorHandler รวมศูนย์ (จาก Week 06)', has(errH, 'errorHandler'));

// ── CP33 · automated test ──
const test = strip(await read('api/tests/api.test.js'));
const cases = (test.match(/\btest\s*\(/g) ?? []).length;
rec('CP33', 'takehome', 'มี test อย่างน้อย 6 เคส', cases >= 6, `พบ ${cases} เคส`);
rec('CP33', 'takehome', 'test ยิง request จริงด้วย supertest', has(test, 'request\\(app\\)'));

// ── CP34 · เอกสาร ──
const contract = await read('API_CONTRACT.md');
rec('CP34', 'takehome', 'มี API_CONTRACT.md ที่อัปเดต', contract.length > 0);
rec('CP34', 'takehome', 'contract มีหัวข้อ data model / ฐานข้อมูล',
  /data model|ฐานข้อมูล|schema|ตาราง/i.test(contract) && contract.length > 500);

// ── ⭐ Challenge ──
const routes = strip(await read('api/src/routes/requestRoutes.js'))
             + strip(await read('api/src/routes/userRoutes.js'));
rec('CHAL', 'challenge', '⭐ มี endpoint สำหรับ users', has(routes, 'users') || existsSync(path.join(ROOT, 'api/src/routes/userRoutes.js')));
rec('CHAL', 'challenge', '⭐ ใช้ transaction', has(svc, 'transaction') || has(svc, 'BEGIN'));
rec('CHAL', 'challenge', '⭐ สร้าง INDEX', has(await read('api/data/schema.sql'), 'create\\s+index'));

// ── รายงาน ──
const shown = INCLASS ? results.filter((r) => r.scope === 'inclass') : results;
console.log('');
for (const r of shown) console.log(`${r.ok ? '✅' : '[TODO]'} ${r.id} ${r.name}${r.detail && !r.ok ? ' — ' + r.detail : ''}`);
const grp = (s) => results.filter((r) => r.scope === s);
const p = (a) => a.filter((x) => x.ok).length;
const ic = grp('inclass'), th = grp('takehome'), ch = grp('challenge');
console.log('\n' + '─'.repeat(58));
console.log(`🏫 ในห้อง (CP26–CP30)   ผ่าน ${p(ic)}/${ic.length} รายการ`);
if (!INCLASS) {
  console.log(`🏠 ที่บ้าน (CP31–CP34)   ผ่าน ${p(th)}/${th.length} รายการ`);
  console.log(`⭐ Challenge            ผ่าน ${p(ch)}/${ch.length} รายการ`);
  console.log('─'.repeat(58));
  console.log(`ผ่าน ${p(results)}/${results.length} รายการ`);
}
console.log('\nหมายเหตุ: checker ตรวจว่า service ใช้ฐานข้อมูลจริง แต่ตรวจไม่ได้ว่าเข้าใจ');
console.log('ผู้สอนจะสุ่มถามให้แก้ query หรืออธิบายว่าทำไมต้องแปลงชื่อเป็น id');
