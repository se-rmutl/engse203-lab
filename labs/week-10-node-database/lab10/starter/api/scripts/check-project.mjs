#!/usr/bin/env node
/**
 * ENGSE203 Week 06 — Checker
 * ตรวจ API จริงด้วยการยิง request เข้าไป ไม่ใช่แค่อ่านโค้ด
 *
 * ใช้:  node scripts/check-project.mjs
 *      node scripts/check-project.mjs --inclass   (ตรวจเฉพาะ CP00–CP05 ที่ทำในห้อง)
 */
import request from 'supertest';
import { existsSync } from 'node:fs';

const INCLASS_ONLY = process.argv.includes('--inclass');
const results = [];
let app = null;

function record(id, scope, name, ok, detail = '') {
  results.push({ id, scope, name, ok, detail });
}

async function setup() {
  try {
    const { createApp } = await import('../src/app.js');
    const { loadSeed } = await import('../src/services/requestService.js');
    await loadSeed();
    app = createApp();
    return true;
  } catch (err) {
    console.log(`\n❌ เปิดแอปไม่ได้: ${err.message}`);
    console.log('   ตรวจว่าทำ TODO ใน src/app.js และ src/services/requestService.js แล้วหรือยัง\n');
    return false;
  }
}

async function safe(fn) {
  try { return await fn(); } catch (err) { return { status: 0, body: {}, _err: err.message }; }
}

async function run() {
  // ── โครงสร้างไฟล์ ──
  const files = [
    ['src/app.js', 'STRUCT'], ['src/server.js', 'STRUCT'],
    ['src/routes/requestRoutes.js', 'STRUCT'],
    ['src/controllers/requestController.js', 'STRUCT'],
    ['src/services/requestService.js', 'STRUCT'],
    ['src/middleware/logger.js', 'STRUCT'],
    ['data/initialRequests.json', 'STRUCT'],
  ];
  for (const [f] of files) {
    record('STRUCT', 'inclass', `มีไฟล์ ${f}`, existsSync(new URL(`../${f}`, import.meta.url)));
  }

  if (!(await setup())) {
    // ยังต้องรายงานจำนวนรายการเต็ม เพื่อให้ตัวหารคงที่
    const pending = [
      ['CP01','inclass','GET / ตอบ 200 พร้อมข้อความ'],
      ['CP02','inclass','GET /api/requests ตอบ 200 พร้อม array'],
      ['CP02','inclass','ข้อมูลมี field ครบตาม contract'],
      ['CP02','inclass','GET /:id ที่มีอยู่ ตอบ 200'],
      ['CP02','inclass','GET /:id ที่ไม่มี ตอบ 404'],
      ['CP03','inclass','express.json() ทำงาน (req.body อ่านได้)'],
      ['CP04','inclass','POST ที่ถูกต้อง ตอบ 201'],
      ['CP04','inclass','คำร้องใหม่มี status = pending'],
      ['CP04','inclass','คำร้องใหม่มี id ขึ้นต้นด้วย REQ-'],
      ['CP04','inclass','POST ข้อมูลไม่ครบ ตอบ 400'],
      ['CP04','inclass','POST details สั้นกว่า 10 ตัว ตอบ 400'],
      ['CP04','inclass','POST priority ผิด ตอบ 400'],
      ['CP04','inclass','POST ที่ไม่มี requesterName เลย ตอบ 400'],
      ['CP05','inclass','DELETE ที่มีอยู่ ตอบ 204'],
      ['CP05','inclass','DELETE ที่ไม่มี ตอบ 404'],
      ['CP05','inclass','ลบแล้วหายจากรายการจริง'],
      ['CP07','takehome','path ที่ไม่มี ตอบ 404 พร้อม JSON'],
      ['CP07','takehome','ข้อความ error บอกรายละเอียดที่ผิด'],
      ['CHAL','challenge','⭐ GET ?status= กรองได้'],
      ['CHAL','challenge','⭐ PUT เปลี่ยนสถานะได้'],
      ['CHAL','challenge','⭐ PUT status ผิด ตอบ 400'],
    ];
    for (const [id, scope, name] of pending) record(id, scope, name, false, 'ยังเปิดแอปไม่ได้');
    return;
  }

  // ── CP01 root ──
  let r = await safe(() => request(app).get('/'));
  record('CP01', 'inclass', 'GET / ตอบ 200 พร้อมข้อความ', r.status === 200 && !!r.body?.message, `ได้ ${r.status}`);

  // ── CP02 GET ──
  r = await safe(() => request(app).get('/api/requests'));
  const listOk = r.status === 200 && Array.isArray(r.body) && r.body.length >= 3;
  record('CP02', 'inclass', 'GET /api/requests ตอบ 200 พร้อม array', listOk, `ได้ ${r.status} · ${Array.isArray(r.body) ? r.body.length + ' รายการ' : 'ไม่ใช่ array'}`);

  const fields = ['id', 'requesterName', 'requestType', 'location', 'details', 'priority', 'status'];
  const first = listOk ? r.body[0] : null;
  record('CP02', 'inclass', 'ข้อมูลมี field ครบตาม contract',
    !!first && fields.every((f) => f in first),
    first ? `ขาด: ${fields.filter((f) => !(f in first)).join(', ') || 'ไม่ขาด'}` : 'ยังไม่มีรายการให้ตรวจ');

  r = await safe(() => request(app).get('/api/requests/REQ-001'));
  record('CP02', 'inclass', 'GET /:id ที่มีอยู่ ตอบ 200', r.status === 200 && r.body?.id === 'REQ-001', `ได้ ${r.status}`);

  r = await safe(() => request(app).get('/api/requests/REQ-999'));
  record('CP02', 'inclass', 'GET /:id ที่ไม่มี ตอบ 404', r.status === 404, `ได้ ${r.status}`);

  // ── CP03 middleware ──
  const good = { requesterName: 'ทดสอบ ระบบ', requestType: 'แจ้งซ่อม', location: 'C3-401', details: 'รายละเอียดยาวพอสมควรจริง', priority: 'normal' };
  r = await safe(() => request(app).post('/api/requests').send(good));
  record('CP03', 'inclass', 'express.json() ทำงาน (req.body อ่านได้)', r.status !== 400 || !String(r.body?.error ?? '').includes('ต้องส่งข้อมูล'), `POST ได้ ${r.status}`);

  // ── CP04 POST ──
  record('CP04', 'inclass', 'POST ที่ถูกต้อง ตอบ 201', r.status === 201, `ได้ ${r.status}`);
  const created = r.body;
  record('CP04', 'inclass', 'คำร้องใหม่มี status = pending', created?.status === 'pending', `ได้ ${created?.status}`);
  record('CP04', 'inclass', 'คำร้องใหม่มี id ขึ้นต้นด้วย REQ-', typeof created?.id === 'string' && created.id.startsWith('REQ-'), `ได้ ${created?.id}`);

  r = await safe(() => request(app).post('/api/requests').send({ requesterName: 'x' }));
  record('CP04', 'inclass', 'POST ข้อมูลไม่ครบ ตอบ 400', r.status === 400, `ได้ ${r.status}`);

  r = await safe(() => request(app).post('/api/requests').send({ ...good, details: 'สั้น' }));
  record('CP04', 'inclass', 'POST details สั้นกว่า 10 ตัว ตอบ 400', r.status === 400, `ได้ ${r.status}`);

  r = await safe(() => request(app).post('/api/requests').send({ ...good, priority: 'มั่ว' }));
  record('CP04', 'inclass', 'POST priority ผิด ตอบ 400', r.status === 400, `ได้ ${r.status}`);

  r = await safe(() => request(app).post('/api/requests').send({ ...good, requesterName: undefined }));
  record('CP04', 'inclass', 'POST ที่ไม่มี requesterName เลย ตอบ 400', r.status === 400, `ได้ ${r.status}`);

  // ── CP05 DELETE ──
  const delId = created?.id ?? 'REQ-001';
  r = await safe(() => request(app).delete(`/api/requests/${delId}`));
  record('CP05', 'inclass', 'DELETE ที่มีอยู่ ตอบ 204', r.status === 204, `ได้ ${r.status}`);
  r = await safe(() => request(app).delete('/api/requests/REQ-999'));
  record('CP05', 'inclass', 'DELETE ที่ไม่มี ตอบ 404', r.status === 404, `ได้ ${r.status}`);

  r = await safe(() => request(app).get('/api/requests'));
  record('CP05', 'inclass', 'ลบแล้วหายจากรายการจริง', Array.isArray(r.body) && !r.body.some((x) => x.id === created?.id));

  // ══ TAKE-HOME ══
  r = await safe(() => request(app).get('/api/unknown-path-xyz'));
  record('CP07', 'takehome', 'path ที่ไม่มี ตอบ 404 พร้อม JSON', r.status === 404 && typeof r.body?.error === 'string', `ได้ ${r.status}`);

  r = await safe(() => request(app).post('/api/requests').send({ requesterName: 'x' }));
  record('CP07', 'takehome', 'ข้อความ error บอกรายละเอียดที่ผิด', Array.isArray(r.body?.details) && r.body.details.length > 0, `details: ${r.body?.details?.length ?? 0} ข้อ`);

  // ══ CHALLENGE ══
  r = await safe(() => request(app).get('/api/requests?status=pending'));
  const filterOk = r.status === 200 && Array.isArray(r.body) && r.body.every((x) => x.status === 'pending');
  record('CHAL', 'challenge', '⭐ GET ?status= กรองได้', filterOk, `ได้ ${r.status} · ${Array.isArray(r.body) ? r.body.length + ' รายการ' : ''}`);

  r = await safe(() => request(app).put('/api/requests/REQ-001').send({ status: 'in-progress' }));
  record('CHAL', 'challenge', '⭐ PUT เปลี่ยนสถานะได้', r.status === 200 && r.body?.status === 'in-progress', `ได้ ${r.status}`);

  r = await safe(() => request(app).put('/api/requests/REQ-001').send({ status: 'มั่ว' }));
  record('CHAL', 'challenge', '⭐ PUT status ผิด ตอบ 400', r.status === 400, `ได้ ${r.status}`);
}

await run();

// ── รายงานผล ──
const shown = INCLASS_ONLY ? results.filter((x) => x.scope === 'inclass') : results;
const inclass = results.filter((x) => x.scope === 'inclass');
const takehome = results.filter((x) => x.scope === 'takehome');
const challenge = results.filter((x) => x.scope === 'challenge');

console.log('');
for (const r of shown) {
  const mark = r.ok ? '✅' : '[TODO]';
  console.log(`${mark} ${r.id} ${r.name}${r.detail && !r.ok ? ' — ' + r.detail : ''}`);
}

const p = (arr) => arr.filter((x) => x.ok).length;
console.log('');
console.log('─'.repeat(56));
console.log(`🏫 ในห้อง (CP00–CP05)   ผ่าน ${p(inclass)}/${inclass.length} รายการ`);
if (!INCLASS_ONLY) {
  console.log(`🏠 ที่บ้าน (CP06–CP08)   ผ่าน ${p(takehome)}/${takehome.length} รายการ`);
  console.log(`⭐ Challenge            ผ่าน ${p(challenge)}/${challenge.length} รายการ`);
  console.log('─'.repeat(56));
  console.log(`ผ่าน ${p(results)}/${results.length} รายการ`);
}
console.log('');
console.log('หมายเหตุ: checker ยิง request จริง แต่ตรวจ log ใน terminal ไม่ได้');
console.log('ต้องดูด้วยตาว่า logger middleware พิมพ์ออกมาจริงหรือไม่');
