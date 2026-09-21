import { Router } from 'express';

/**
 * 🏫 TODO W11-HEALTH (CP37)
 *   GET /api/health — ระบบบอกสถานะตัวเอง
 *   - คืน status: 'ok' ถ้าต่อฐานข้อมูลได้
 *   - บอก env, uptime, และสถานะฐานข้อมูล (ใช้ getDbStatus จาก service)
 *   - ถ้าต่อ DB ไม่ได้ → status 503
 */
const router = Router();

router.get('/', (req, res) => {
  res.json({ status: 'todo', message: 'ยังไม่ได้ทำ TODO W11-HEALTH' });
});

export default router;
