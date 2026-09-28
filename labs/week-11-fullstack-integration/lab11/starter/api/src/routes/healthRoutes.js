import { Router } from 'express';
import { getDbStatus } from '../services/requestService.js';
import { config } from '../config.js';

/**
 * 🏫 TODO W11-HEALTH (CP37)
 *   GET /api/health — ระบบบอกสถานะตัวเอง
 *   - คืน status: 'ok' ถ้าต่อฐานข้อมูลได้
 *   - บอก env, uptime, และสถานะฐานข้อมูล (ใช้ getDbStatus จาก service)
 *   - ถ้าต่อ DB ไม่ได้ → status 503
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

router.get('/xxx', (req, res) => {
  res.json({ status: 'todo', message: 'ยังไม่ได้ทำ TODO W11-HEALTH' });
});

router.get('/yyy', (req, res) => {
  res.json({ status: 'todo', message: 'ยังไม่ได้ทำ TODO W11-HEALTH' });
});

export default router;
