/**
 * TODO W06-M3 (🏠 CP07) · จับ error ที่หลุดมาจากทุก route
 * ⚠ ต้องมี 4 พารามิเตอร์ (err, req, res, next) Express ถึงจะรู้ว่าเป็น error handler
 * ตอบ 500 พร้อมข้อความที่ผู้ใช้ทั่วไปเข้าใจ (อย่าส่ง stack trace ออกไป)
 */
export function errorHandler(err, req, res, next) {
  throw new Error('TODO W06-M3: errorHandler');
}

/**
 * TODO W06-M4 (🏠 CP07) · ไม่มี route ไหนตรงกับคำขอ
 * ตอบ 404 พร้อมบอกว่า path ไหนที่หาไม่เจอ
 */
export function notFound(req, res) {
  throw new Error('TODO W06-M4: notFound');
}
