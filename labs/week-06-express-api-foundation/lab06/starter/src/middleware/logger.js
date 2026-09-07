/**
 * TODO W06-M1 (CP03) · middleware บันทึกทุกคำขอลง terminal
 *
 * middleware มี 3 พารามิเตอร์: (req, res, next)
 * ลำดับ: พิมพ์ method กับ url ออก console → เรียก next() เพื่อส่งต่อชั้นถัดไป
 *
 * ตัวอย่างผลที่ต้องเห็นใน terminal:
 *   GET /api/requests → 200 (2ms)
 *
 * คำใบ้: ใช้ res.on('finish', ...) เพื่อรู้ status code หลังตอบเสร็จ
 *        และ Date.now() เพื่อจับเวลา
 *
 * ⚠ ถ้าลืมเรียก next() คำขอจะค้าง ไม่มีวันถึง handler
 */
export function logger(req, res, next) {
  throw new Error('TODO W06-M1: logger');
}
