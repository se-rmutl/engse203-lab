/**
 * password.js — เก็บรหัสผ่านอย่างปลอดภัยด้วย scrypt (มากับ Node ใน node:crypto)
 *
 * 🏫 TODO W13-HASH (CP49) — ทำให้ tests/unit/password.test.js ผ่านทุกข้อ
 *
 *   รูปแบบที่ต้องเก็บ:  scrypt$<salt>$<hash>
 *     salt = randomBytes(16) แปลงเป็น hex  (32 ตัวอักษร)
 *     hash = scryptSync(รหัสผ่าน, salt, 64) แปลงเป็น hex  (128 ตัวอักษร)
 *
 *   ⚠ รูปแบบต้องตรงเป๊ะ — schema.sql มี hash ของบัญชีเจ้าหน้าที่ (รหัสผ่าน staff1234)
 *     ที่สร้างด้วยรูปแบบนี้ ถ้าเขียนต่างไป จะเข้าสู่ระบบด้วยบัญชีนี้ไม่ได้
 */
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const KEY_LENGTH = 64;

export function hashPassword(plain) {
  // TODO: สุ่ม salt → scryptSync → คืน `scrypt$${salt}$${hash}`
  throw new Error('TODO W13-HASH: ยังไม่ได้เขียน hashPassword');
}

export function verifyPassword(plain, stored) {
  // TODO: แยก stored ด้วย '$' → ตรวจว่า scheme เป็น 'scrypt'
  //       → scryptSync(plain, salt, ความยาวของ hash เดิม)
  //       → เทียบด้วย timingSafeEqual (ไม่ใช่ ===)  ← ทำไม? อ่านเอกสารบทที่ 4
  //       hash ผิดรูปแบบ → คืน false (ห้ามโยน error)
  throw new Error('TODO W13-HASH: ยังไม่ได้เขียน verifyPassword');
}
