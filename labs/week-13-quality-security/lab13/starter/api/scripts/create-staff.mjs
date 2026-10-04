#!/usr/bin/env node
/**
 * create-staff.mjs — สร้าง/เปลี่ยนรหัสผ่านบัญชีเจ้าหน้าที่ (Week 13)
 *
 *   npm run create-staff -- <อีเมล> <รหัสผ่าน> [ชื่อ]
 *   npm run create-staff -- somsak@rmutl.ac.th "Str0ng-Pass!" "สมศักดิ์ ใจเย็น"
 *
 * ใช้ hashPassword ตัวเดียวกับระบบ — ฐานข้อมูลเก็บแค่ hash
 * ทำงานผ่าน service จึงใช้ได้ทั้ง campus.db และ Turso (ถ้าตั้งค่า TURSO_* ไว้)
 */
import { loadSeed, upsertStaff } from '../src/services/requestService.js';
import { hashPassword } from '../src/utils/password.js';

const [email, password, name = 'เจ้าหน้าที่'] = process.argv.slice(2);
if (!email || !password || password.length < 8) {
  console.error('วิธีใช้: npm run create-staff -- <อีเมล> <รหัสผ่านอย่างน้อย 8 ตัว> [ชื่อ]');
  process.exit(1);
}
await loadSeed();   // สร้างตารางถ้ายังไม่มี
const result = upsertStaff({ email, name, passwordHash: hashPassword(password) });
console.log(result === 'created' ? `  ✓ สร้างบัญชีเจ้าหน้าที่ ${email} แล้ว` : `  ✓ เปลี่ยนรหัสผ่านของ ${email} แล้ว`);
