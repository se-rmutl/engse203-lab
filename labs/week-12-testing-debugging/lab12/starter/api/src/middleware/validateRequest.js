import { validateRequestInput } from '../validators/requestValidator.js';

/**
 * middleware บาง ๆ — เรียก pure function แล้วตัดสินว่าจะไปต่อหรือตอบ 400
 * กฎทั้งหมดอยู่ใน validators/requestValidator.js (ทดสอบแยกได้ด้วย unit test)
 */
export function validateRequest(req, res, next) {
  const errors = validateRequestInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: 'ข้อมูลคำร้องไม่ถูกต้อง', details: errors });
  }
  next();
}
