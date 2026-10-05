import { defineConfig } from 'vitest/config';

/**
 * Week 12 — ตั้งค่า Vitest สำหรับ API
 *
 * env.DB_FILE = ':memory:'
 *   ทุกครั้งที่เรียก loadSeed() จะได้ฐานข้อมูลใหม่ในหน่วยความจำ พร้อมข้อมูลตั้งต้น 5 รายการ
 *   → test ไม่แตะ campus.db ตัวจริง · test แต่ละข้อเริ่มจากสภาพเดียวกัน (isolation)
 */
export default defineConfig({
  test: {
    environment: 'node',
    execArgv: ['--disable-warning=ExperimentalWarning'],   // ไม่ต้องเตือนเรื่อง node:sqlite ทุกไฟล์
    include: ['tests/**/*.test.js'],
    env: {
      DB_FILE: ':memory:',
      NODE_ENV: 'test',
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.js'],
      exclude: ['src/server.js'],
      reporter: ['text', 'html'],
    },
  },
});
