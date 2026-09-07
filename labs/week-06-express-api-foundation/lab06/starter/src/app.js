import express from 'express';
import requestRoutes from './routes/requestRoutes.js';
import { logger } from './middleware/logger.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  /**
   * TODO W06-A1 (CP03) · ติดตั้ง middleware — ต้องมาก่อน route เสมอ
   *   app.use(logger)            ← บันทึกทุกคำขอ
   *   app.use(express.json())    ← ทำให้ req.body อ่านได้
   *
   * ⚠ ถ้าลืม express.json() แล้ว req.body จะเป็น undefined ตลอด
   *   POST จะพังโดยไม่มี error บอกสาเหตุ — กับดักอันดับ 1 ของมือใหม่
   */

  /**
   * TODO W06-A2 (CP01) · route ทดสอบว่าเซิร์ฟเวอร์ทำงาน
   *   GET / → res.json({ message: 'Campus Service API is running', version: '1.0.0' })
   */

  /**
   * TODO W06-A3 (CP02) · เชื่อม requestRoutes เข้ากับ path /api/requests
   *   app.use('/api/requests', requestRoutes)
   */

  /**
   * TODO W06-A4 (🏠 CP07) · ปิดท้ายด้วย notFound แล้วตามด้วย errorHandler
   * ⚠ สองตัวนี้ต้องอยู่ท้ายสุด หลัง route ทั้งหมด
   */

  return app;
}
