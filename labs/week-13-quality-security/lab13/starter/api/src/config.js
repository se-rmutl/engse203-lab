/**
 * config.js — รวมการอ่าน environment variable ไว้ที่เดียว
 *
 * ทำไมต้องมีไฟล์นี้ (CP36)
 *   - ไม่ให้ค่า config กระจายอยู่ทั่วโค้ด (hardcode)
 *   - แยก dev / production ด้วยค่าเดียว: NODE_ENV
 *   - อ่านค่าจาก process.env ที่เดียว ที่อื่น import จากนี่
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const API_ROOT = path.resolve(HERE, '..');

export const config = {
  // สภาพแวดล้อม — 'development' หรือ 'production'
  env: process.env.NODE_ENV ?? 'development',
  isProd: process.env.NODE_ENV === 'production',

  // พอร์ตของ API
  port: Number(process.env.PORT ?? 3001),

  // ที่อยู่ frontend ที่อนุญาตให้เรียก (CORS)
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',

  // ไฟล์ฐานข้อมูล
  dbFile: process.env.DB_FILE ?? path.join(API_ROOT, 'data', 'campus.db'),
  schemaFile: path.join(API_ROOT, 'data', 'schema.sql'),

  // production เสิร์ฟไฟล์ frontend ที่ build แล้วจากที่ไหน
  staticDir: process.env.STATIC_DIR ?? path.join(API_ROOT, '..', 'frontend', 'dist'),

  /**
   * 🏫 TODO W13-SECRET (CP52) — แบบนี้ยังอันตราย
   *   ถ้าลืมตั้ง JWT_SECRET ตอน production ระบบจะใช้ค่าด้านล่างซึ่งอยู่ใน GitHub ให้ทุกคนเห็น
   *   → ใครก็ปลอม token ของเจ้าหน้าที่ได้
   *   แก้: production ที่ไม่มี JWT_SECRET ต้อง throw new Error(...) ทันที (fail fast)
   *        dev/test ยังใช้ค่าสำหรับพัฒนาได้
   */
  jwtSecret: process.env.JWT_SECRET || 'dev-only-secret-do-not-use-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '2h',
};
