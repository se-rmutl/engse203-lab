/**
 * config.js — รวมการอ่าน environment variable ไว้ที่เดียว
 *
 * 🏫 TODO W11-CONFIG (CP36)
 *   ตอนนี้ค่ายัง hardcode อยู่ในโค้ดหลายที่ · งานคือย้ายมารวมที่นี่
 *   - อ่าน NODE_ENV, PORT, CORS_ORIGIN, DB_FILE จาก process.env
 *   - มี isProd แยก dev/production
 *   - มี staticDir สำหรับ production build (CP39)
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const API_ROOT = path.resolve(HERE, '..');

export const config = {
  env: process.env.NODE_ENV ?? 'development',
  // TODO: เพิ่ม isProd, port, corsOrigin, dbFile, schemaFile, staticDir
  isProd: process.env.NODE_ENV === 'production',
  port:       Number(process.env.PORT ?? 3001),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  dbFile: process.env.DB_FILE ?? path.join(API_ROOT, 'data', 'campus.db'),
  schemaFile: path.join(API_ROOT, 'data', 'schema.sql'),
  staticDir:  process.env.STATIC_DIR ?? path.join(API_ROOT, '..', 'frontend', 'dist'),
};
