import { Router } from 'express';
import * as service from '../services/requestService.js';

// ⭐ endpoint สำหรับดูผู้ใช้และคำร้องของแต่ละคน
// ใช้ฐานข้อมูลผ่าน service เหมือน route อื่น — ไม่เปิด connection เอง
// (เดิมเปิด DatabaseSync ตรงนี้ ทำให้ test ที่ใช้ฐานข้อมูลในหน่วยความจำไม่เห็นข้อมูลชุดเดียวกัน)
const router = Router();

router.get('/', (req, res) => {
  res.json(service.listUsers());
});

router.get('/:id/requests', (req, res) => {
  res.json(service.listRequestsByUser(Number(req.params.id)));
});

export default router;
