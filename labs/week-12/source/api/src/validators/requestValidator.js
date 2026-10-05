/**
 * requestValidator.js — กฎตรวจข้อมูลคำร้อง เป็น "pure function"
 *
 * Week 12 · CP45 — ทำไมต้องแยกออกจาก middleware
 *   middleware ผูกกับ req / res / next → จะทดสอบต้องเปิด server หรือจำลอง req/res
 *   pure function รับข้อมูลเข้า คืนผลลัพธ์ ไม่แตะอะไรภายนอก → เขียน unit test ได้ทันที
 *
 *   validateRequestInput(input) → [] ถ้าผ่าน · ['ข้อความ error', ...] ถ้าไม่ผ่าน
 */

export const REQUEST_TYPES = ['แจ้งซ่อม', 'บริการบัญชีผู้ใช้', 'ขอใช้อุปกรณ์', 'อื่น ๆ'];
export const PRIORITIES = ['normal', 'urgent'];
export const STATUSES = ['pending', 'in-progress', 'completed'];

export const MIN_NAME = 2;
export const MIN_DETAILS = 10;

function readText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function validateRequestInput(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return ['ต้องส่งข้อมูลคำร้องมาด้วย'];
  }

  const errors = [];
  if (readText(input.requesterName).length < MIN_NAME) {
    errors.push(`ชื่อผู้แจ้งต้องมีอย่างน้อย ${MIN_NAME} ตัวอักษร`);
  }
  if (!REQUEST_TYPES.includes(input.requestType)) {
    errors.push('ประเภทคำร้องไม่ถูกต้อง');
  }
  if (!readText(input.location)) {
    errors.push('กรุณาระบุสถานที่');
  }
  if (readText(input.details).length < MIN_DETAILS) {
    errors.push(`รายละเอียดต้องมีอย่างน้อย ${MIN_DETAILS} ตัวอักษร`);
  }
  if (!PRIORITIES.includes(input.priority)) {
    errors.push('ความเร่งด่วนต้องเป็น normal หรือ urgent');
  }
  return errors;
}

/** สถานะที่ PUT /api/requests/:id รับได้ */
export function isValidStatus(status) {
  return STATUSES.includes(status);
}
