import { test, before, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { loadSeed } from '../src/services/requestService.js';

let app;
before(async () => { await loadSeed(); app = createApp(); });

const valid = { requesterName: 'ทดสอบ อัตโนมัติ', requestType: 'แจ้งซ่อม',
  location: 'C3-401', details: 'รายละเอียดยาวพอสมควรจริง', priority: 'normal' };

describe('GET /api/requests', () => {
  test('คืน array จากฐานข้อมูล พร้อม 200', async () => {
    const r = await request(app).get('/api/requests');
    assert.equal(r.status, 200);
    assert.ok(Array.isArray(r.body));
  });
  test('คืน requesterName ไม่ใช่ requester_id', async () => {
    const r = await request(app).get('/api/requests');
    assert.ok('requesterName' in r.body[0]);
    assert.ok(!('requester_id' in r.body[0]));
  });
  test('กรอง ?status= ทำงาน', async () => {
    const r = await request(app).get('/api/requests?status=pending');
    assert.ok(r.body.every((x) => x.status === 'pending'));
  });
});

describe('GET /api/requests/:id', () => {
  test('พบ → 200', async () => {
    const r = await request(app).get('/api/requests/REQ-001');
    assert.equal(r.status, 200);
  });
  test('ไม่พบ → 404', async () => {
    const r = await request(app).get('/api/requests/REQ-999');
    assert.equal(r.status, 404);
  });
});

describe('POST /api/requests', () => {
  test('ข้อมูลถูกต้อง → 201 · แปลงชื่อเป็น id', async () => {
    const r = await request(app).post('/api/requests').send(valid);
    assert.equal(r.status, 201);
    assert.equal(r.body.requesterName, valid.requesterName);
  });
  test('ข้อมูลไม่ครบ → 400', async () => {
    const r = await request(app).post('/api/requests').send({ requesterName: 'x' });
    assert.equal(r.status, 400);
  });
});

describe('ความปลอดภัย', () => {
  test('SQL injection ผ่าน ?status= ไม่หลุด', async () => {
    const r = await request(app).get(`/api/requests?status=${encodeURIComponent("x' OR '1'='1")}`);
    assert.equal(r.status, 200);
    assert.equal(r.body.length, 0);
  });
});
