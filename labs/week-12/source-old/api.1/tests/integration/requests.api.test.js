import { describe, test, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/app.js';
import { loadSeed } from '../../src/services/requestService.js';

/**
 * Integration test — ยิง HTTP จริงผ่านทุกชั้น: route → controller → service → SQLite
 * beforeEach เรียก loadSeed() ใหม่ทุกข้อ → ได้ฐานข้อมูลในหน่วยความจำชุดใหม่ (5 รายการ)
 * test ข้อหนึ่งลบหรือเพิ่มข้อมูล จึงไม่กระทบข้ออื่น
 */

const app = createApp();
beforeEach(async () => { await loadSeed(); });

const valid = {
  requesterName: 'ทดสอบ อัตโนมัติ', requestType: 'แจ้งซ่อม',
  location: 'C3-401', details: 'รายละเอียดยาวพอสมควรจริง', priority: 'normal',
};

describe('GET /api/requests', () => {
  test('คืน array 5 รายการจากข้อมูลตั้งต้น พร้อม 200', async () => {
    const r = await request(app).get('/api/requests');
    expect(r.status).toBe(200);
    expect(r.body).toHaveLength(5);
  });
  test('คืน requesterName ไม่ใช่ requester_id', async () => {
    const r = await request(app).get('/api/requests');
    expect(r.body[0]).toHaveProperty('requesterName');
    expect(r.body[0]).not.toHaveProperty('requester_id');
  });
  test('กรอง ?status= ทำงาน', async () => {
    const r = await request(app).get('/api/requests?status=pending');
    expect(r.body.length).toBeGreaterThan(0);
    expect(r.body.every((x) => x.status === 'pending')).toBe(true);
  });
  test('SQL injection ผ่าน ?status= ไม่หลุด', async () => {
    const r = await request(app).get("/api/requests?status=' OR '1'='1");
    expect(r.status).toBe(200);
    expect(r.body).toHaveLength(0);
  });
});

describe('GET /api/requests/:id', () => {
  test('พบ → 200', async () => {
    const r = await request(app).get('/api/requests/REQ-001');
    expect(r.status).toBe(200);
    expect(r.body.id).toBe('REQ-001');
  });
  test('ไม่พบ → 404', async () => {
    const r = await request(app).get('/api/requests/REQ-999');
    expect(r.status).toBe(404);
  });
});

describe('POST /api/requests', () => {
  test('ข้อมูลถูกต้อง → 201 · ได้รหัสถัดไป', async () => {
    const r = await request(app).post('/api/requests').send(valid);
    expect(r.status).toBe(201);
    expect(r.body.id).toBe('REQ-006');
    expect(r.body.requesterName).toBe('ทดสอบ อัตโนมัติ');
  });
  test('ข้อมูลไม่ครบ → 400 พร้อมรายการ error', async () => {
    const r = await request(app).post('/api/requests').send({ requesterName: 'x' });
    expect(r.status).toBe(400);
    expect(Array.isArray(r.body.details)).toBe(true);
  });
  // 🐞 regression test — BUG #1: ลบแล้วเพิ่มใหม่ ได้ 500 (รหัสซ้ำ)
  test('ลบรายการกลาง แล้วเพิ่มใหม่ → 201 และรหัสไม่ซ้ำของเดิม', async () => {
    await request(app).delete('/api/requests/REQ-002').expect(204);
    const r = await request(app).post('/api/requests').send(valid);
    expect(r.status).toBe(201);
    const ids = (await request(app).get('/api/requests')).body.map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('PUT /api/requests/:id', () => {
  test('เปลี่ยนสถานะ → 200 และค่าใหม่ถูกบันทึก', async () => {
    const r = await request(app).put('/api/requests/REQ-001').send({ status: 'completed' });
    expect(r.status).toBe(200);
    expect(r.body.status).toBe('completed');
  });
  test('สถานะนอกรายการ → 400', async () => {
    const r = await request(app).put('/api/requests/REQ-001').send({ status: 'done' });
    expect(r.status).toBe(400);
  });
  // 🐞 regression test — BUG #3: เปลี่ยนสถานะคำร้องที่ไม่มีอยู่ ได้ 500
  test('คำร้องที่ไม่มีอยู่ → 404 (ไม่ใช่ 500)', async () => {
    const r = await request(app).put('/api/requests/REQ-999').send({ status: 'completed' });
    expect(r.status).toBe(404);
  });
});

describe('DELETE /api/requests/:id', () => {
  test('ลบแล้ว GET ซ้ำ → 404', async () => {
    await request(app).delete('/api/requests/REQ-003').expect(204);
    await request(app).get('/api/requests/REQ-003').expect(404);
  });
  test('ลบรายการที่ไม่มี → 404', async () => {
    await request(app).delete('/api/requests/REQ-999').expect(404);
  });
});

describe('GET /api/health และ /api/users', () => {
  test('health บอกว่าต่อฐานข้อมูลได้', async () => {
    const r = await request(app).get('/api/health');
    expect(r.status).toBe(200);
    expect(r.body.database.connected).toBe(true);
  });
  test('/api/users ใช้ฐานข้อมูลชุดเดียวกับ service', async () => {
    const r = await request(app).get('/api/users');
    expect(r.body).toHaveLength(4);
    expect(r.body[0]).not.toHaveProperty('email');
  });
});

describe('เส้นทางที่ไม่มีอยู่', () => {
  // เพิ่มหลังเปิด coverage report (CP46) — errorHandler.js ยังไม่มี test ไหนวิ่งผ่าน
  test('GET /api/nope → 404 เป็น JSON', async () => {
    const r = await request(app).get('/api/nope');
    expect(r.status).toBe(404);
    expect(r.body.error).toMatch(/ไม่พบเส้นทาง/);
  });
});

describe('ข้อมูลผิดรูปแบบและ endpoint ผู้ใช้', () => {
  test('ส่ง JSON ที่เสีย → 400 เป็น JSON ไม่ใช่ 500', async () => {
    const r = await request(app).post('/api/requests')
      .set('Content-Type', 'application/json').send('{"requesterName": ');
    expect(r.status).toBe(400);
    expect(r.body).toHaveProperty('error');
  });
  test('GET /api/users/1/requests → คำร้องของผู้ใช้คนนั้น', async () => {
    const r = await request(app).get('/api/users/1/requests');
    expect(r.status).toBe(200);
    expect(r.body.map((x) => x.id)).toEqual(['REQ-001', 'REQ-004']);
  });
});
