import { config } from '../config.js';

/** error ที่เรารู้สาเหตุและอยากกำหนด status เอง */
export class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

/**
 * ห่อ handler ที่เป็น async เพื่อให้ error ที่เกิดข้างในถูกส่งไป errorHandler
 * ถ้าไม่ห่อ Express 5 จะจับได้แต่ Express 4 จะเงียบไปเลย
 */
export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

/** ไม่มี route ไหนตรงกับคำขอ */
export function notFound(req, res) {
  res.status(404).json({ error: `ไม่พบเส้นทาง ${req.method} ${req.originalUrl}` });
}

/** จับ error ที่หลุดมาจากทุก route — ต้องมี 4 พารามิเตอร์ */
export function errorHandler(err, req, res, next) {
  const status = err.status ?? 500;

  if (status >= 500) {
    console.error('เกิดข้อผิดพลาดภายใน:', err.message);
  }

  res.status(status).json({
    error: status >= 500 ? 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' : err.message,
    // ส่ง stack เฉพาะตอนพัฒนา — production ห้ามเปิดเผยโครงสร้างภายใน
    ...(config.isProduction ? {} : { stack: err.stack?.split('\n').slice(0, 3) }),
  });
}
