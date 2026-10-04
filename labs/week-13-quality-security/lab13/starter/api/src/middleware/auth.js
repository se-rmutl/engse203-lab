import { verifyToken } from '../services/authService.js';

/**
 * 🏫 TODO W13-AUTH (CP51) — ป้องกัน route ด้วย JWT
 *
 *   authenticate      → "คุณคือใคร"         ไม่มี token / token ปลอม / หมดอายุ  → 401
 *   requireRole(role) → "คุณทำสิ่งนี้ได้ไหม"  รู้ว่าเป็นใคร แต่ไม่มีสิทธิ์          → 403
 *
 * header ที่ส่งมา:  Authorization: Bearer <token>
 */
export function authenticate(req, res, next) {
  // TODO: อ่าน req.get('Authorization') → แยก 'Bearer' กับ token
  //       ไม่มี → 401 { error: 'ต้องเข้าสู่ระบบก่อน' }
  //       verifyToken(token) ผ่าน → req.user = payload แล้ว next()
  //       verifyToken โยน error → 401
  next();
}

export function requireRole(role) {
  return (req, res, next) => {
    // TODO: req.user?.role ไม่ตรง role → 403 { error: 'ไม่มีสิทธิ์ทำรายการนี้' }
    next();
  };
}
