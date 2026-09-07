import * as service from '../services/requestService.js';

/**
 * controller รู้จัก req/res และเป็นคนตัดสิน status code
 * แต่ไม่จัดการข้อมูลเอง — ให้ service ทำ
 */

/**
 * TODO W06-C1 (CP02) · GET /api/requests
 * - อ่าน req.query.status (ถ้ามี) ส่งต่อให้ service.findAll()
 * - ตอบ 200 พร้อมรายการ
 */
export function listRequests(req, res) {
  throw new Error('TODO W06-C1: listRequests');
}

/**
 * TODO W06-C2 (CP02) · GET /api/requests/:id
 * - อ่านรหัสจาก req.params.id
 * - ไม่พบ → 404 พร้อมข้อความ · พบ → 200 พร้อมข้อมูล
 */
export function getRequest(req, res) {
  throw new Error('TODO W06-C2: getRequest');
}

/**
 * TODO W06-C3 (CP04) · POST /api/requests
 * - validateRequest middleware ตรวจ body มาให้แล้ว ตรงนี้เชื่อ req.body ได้เลย
 * - เรียก service.create() แล้วตอบ 201 พร้อมคำร้องที่สร้าง
 * ⚠ POST สำเร็จตอบ 201 ไม่ใช่ 200
 */
export function createRequest(req, res) {
  throw new Error('TODO W06-C3: createRequest');
}

/**
 * TODO W06-C4 (⭐ Challenge) · PUT /api/requests/:id
 * - status ที่รับได้: 'pending' | 'in-progress' | 'completed'
 * - status ไม่ถูกต้อง → 400 · ไม่พบคำร้อง → 404 · สำเร็จ → 200
 */
export function updateRequestStatus(req, res) {
  throw new Error('TODO W06-C4: updateRequestStatus');
}

/**
 * TODO W06-C5 (CP05) · DELETE /api/requests/:id
 * - ไม่พบ → 404 · ลบสำเร็จ → 204 (ไม่มีข้อมูลส่งกลับ ใช้ res.status(204).end())
 */
export function deleteRequest(req, res) {
  throw new Error('TODO W06-C5: deleteRequest');
}
