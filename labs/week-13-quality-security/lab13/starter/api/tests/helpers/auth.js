import request from 'supertest';
import jwt from 'jsonwebtoken';
import { config } from '../../src/config.js';

/** บัญชีเจ้าหน้าที่จาก schema.sql (ใช้เฉพาะพัฒนาและทดสอบ) */
export const STAFF = { email: 'staff@rmutl.ac.th', password: 'staff1234' };

/** เข้าสู่ระบบจริงผ่าน API แล้วคืน token */
export async function loginAsStaff(app) {
  const r = await request(app).post('/api/auth/login').send(STAFF);
  return r.body.token;
}

/** สร้าง token ของผู้ใช้ที่ "ไม่ใช่เจ้าหน้าที่" — ใช้ทดสอบ 403 */
export function tokenFor(role, secret = config.jwtSecret) {
  return jwt.sign({ sub: '1', name: 'ทดสอบ', role }, secret, { expiresIn: '5m' });
}
