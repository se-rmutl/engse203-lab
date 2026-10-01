import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config.js';
import requestRoutes from './routes/requestRoutes.js';
import userRoutes from './routes/userRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { errorHandler, notFound } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  // ① CORS ต้องมาก่อนทุกอย่าง — ไม่งั้นเบราว์เซอร์จะถูกบล็อกก่อนถึง route
  app.use(cors({ origin: config.corsOrigin }));

  // ② logging — dev อ่านง่าย · production กระชับสำหรับเก็บ log
  app.use(morgan(config.isProd ? 'combined' : 'dev'));

  // ③ อ่าน JSON body
  app.use(express.json());

  // ④ route
  app.get('/', (req, res) => {
    res.json({ message: 'Campus Service API is running', version: '2.0.0' });
  });
  app.use('/api/health', healthRoutes);
  app.use('/api/requests', requestRoutes);
  app.use('/api/users', userRoutes);

  /**
   * 🏫 TODO W11-STATIC (CP39) · ทำให้ production เปิด URL เดียวได้ทั้งเว็บและ API
   *
   *   ① ตอน production (config.isProd) ให้เสิร์ฟไฟล์ใน config.staticDir (frontend/dist)
   *      app.use(express.static(config.staticDir))
   *   ② ทุก path ที่ไม่ขึ้นต้นด้วย /api → คืน index.html (React Router จัดการต่อ)
   *      ใช้ regex ที่จับ "ทุก path ยกเว้นที่ขึ้นต้นด้วย /api" (ดูเอกสารบทที่ 6)
   *   ③ ⚠ route app.get('/') ด้านบนจะ "ชิง" หน้าแรกไปตอบเป็น JSON
   *      → ย้ายข้อความต้อนรับไปไว้ที่ /api และให้ '/' ตอบ JSON เฉพาะตอน dev
   *      (ไม่งั้นผู้ใช้เปิด URL บน cloud แล้วจะเห็น JSON แทนหน้าเว็บ)
   */

  // ⑥ ปิดท้าย
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
