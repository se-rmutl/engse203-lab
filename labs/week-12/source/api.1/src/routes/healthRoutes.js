import { Router } from 'express';
import { getDbStatus } from '../services/requestService.js';
import { config } from '../config.js';

/**
 * GET /api/health — ระบบบอกสถานะตัวเอง (CP37)
 *
 * ทำไมสำคัญ
 *   - ตอน deploy จริง เราต้องรู้ว่าระบบยังทำงานไหม โดยไม่ต้องเปิดหน้าเว็บดู
 *   - cloud (Render/Railway) เรียก endpoint นี้อัตโนมัติเพื่อเช็คว่า deploy สำเร็จ
 *   - บอกได้ว่า API เปิดอยู่ + ต่อฐานข้อมูลได้จริงไหม
 */
const router = Router();

router.get('/', (req, res) => {
  const db = getDbStatus();
  const ok = db.connected;
  res.status(ok ? 200 : 503).json({
    status: ok ? 'ok' : 'degraded',
    env: config.env,
    uptime: Math.round(process.uptime()),
    database: db,
    time: new Date().toISOString(),
  });
});

export default router;
