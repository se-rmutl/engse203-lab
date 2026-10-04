import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { config } from './config.js';
import requestRoutes from './routes/requestRoutes.js';
import userRoutes from './routes/userRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  // ① CORS — dev ใช้ (frontend 5173 เรียก API 3001 ข้ามพอร์ต)
  //    production ไม่จำเป็น เพราะเว็บกับ API อยู่ origin เดียวกัน แต่ใส่ไว้ไม่เสียหาย
  app.use(cors({ origin: config.corsOrigin }));

  // ② logging — dev อ่านง่าย · production ละเอียดสำหรับเก็บ log
  // test ไม่ต้อง log ทุกคำขอ — ผลการทดสอบจะได้อ่านง่าย
  if (config.env !== 'test') app.use(morgan(config.isProd ? 'combined' : 'dev'));

  // ③ อ่าน JSON body
  // 🏫 TODO W13-VALID (CP48): จำกัดขนาด body ไม่เกิน 10kb → express.json({ limit: '10kb' })
  app.use(express.json());

  // ④ route ของ API — ทุกอย่างอยู่ใต้ /api
  app.get('/api', (req, res) => {
    res.json({ message: 'Campus Service API is running', version: '3.0.0' });
  });
  app.use('/api/health', healthRoutes);
  // 🏫 TODO W13-LOGIN (CP50): import authRoutes แล้วผูกที่ /api/auth
  app.use('/api/requests', requestRoutes);
  app.use('/api/users', userRoutes);

  // ⑤ หน้าแรก / — ขึ้นกับสภาพแวดล้อม (CP39)
  if (config.isProd && existsSync(config.staticDir)) {
    // production: API เสิร์ฟหน้าเว็บที่ build แล้ว → ผู้ใช้เปิด URL เดียวได้ทั้งเว็บและ API
    app.use(express.static(config.staticDir));
    // ทุก path ที่ไม่ขึ้นต้นด้วย /api → คืน index.html ให้ React Router จัดการต่อ
    app.get(/^\/(?!api).*/, (req, res) => {
      res.sendFile(path.join(config.staticDir, 'index.html'));
    });
  } else {
    // development: หน้าเว็บอยู่ที่ Vite (พอร์ต 5173) · / ของ API ตอบข้อความบอกทางแทน
    app.get('/', (req, res) => {
      res.json({ message: 'Campus Service API (dev) — หน้าเว็บอยู่ที่ Vite พอร์ต 5173', api: '/api' });
    });
  }

  // ⑥ ปิดท้าย — ต้องอยู่หลังสุดเสมอ
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
