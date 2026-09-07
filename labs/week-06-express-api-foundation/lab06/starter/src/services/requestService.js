import { readFile } from 'node:fs/promises';

const SEED_PATH = new URL('../../data/initialRequests.json', import.meta.url);

/** ข้อมูลอยู่ในหน่วยความจำของเซิร์ฟเวอร์ — หน่วย 4 จะเปลี่ยนเป็นฐานข้อมูล */
let requests = [];

/** โหลดข้อมูลตัวอย่างตอนเซิร์ฟเวอร์เริ่มทำงาน — ให้มาแล้ว ไม่ต้องแก้ */
export async function loadSeed() {
  const raw = await readFile(SEED_PATH, 'utf8');
  requests = JSON.parse(raw);
  return requests;
}

/**
 * TODO W06-S1 (CP02) · คืนรายการคำร้องทั้งหมด
 * - คืนสำเนาด้วย structuredClone() เพื่อไม่ให้ข้างนอกแก้ข้อมูลต้นฉบับ
 * TODO W06-S1b (⭐ Challenge) · ถ้ามี options.status ให้กรองเฉพาะสถานะนั้น
 */
export function findAll({ status } = {}) {
  throw new Error('TODO W06-S1: findAll');
}

/**
 * TODO W06-S2 (CP02) · คืนคำร้องใบเดียวตามรหัส
 * - ถ้าไม่พบให้คืน null (ห้าม throw — controller จะเป็นคนตัดสินว่าตอบ 404)
 */
export function findById(id) {
  throw new Error('TODO W06-S2: findById');
}

/** สร้างรหัสไม่ซ้ำ — ให้มาแล้ว ไม่ต้องแก้ */
function createId() {
  let id;
  do {
    const time = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    id = `REQ-${time}-${rand}`;
  } while (requests.some((r) => r.id === id));
  return id;
}

/**
 * TODO W06-S3 (CP04) · เพิ่มคำร้องใหม่
 * ลำดับ: สร้าง object ใหม่ (ใช้ createId()) → ตัดช่องว่างหัวท้ายทุก field ที่เป็นข้อความ
 *        → status เริ่มต้นเป็น 'pending' เสมอ → push เข้า requests → คืนสำเนา
 */
export function create(input) {
  throw new Error('TODO W06-S3: create');
}

/**
 * TODO W06-S4 (⭐ Challenge) · เปลี่ยนสถานะคำร้อง
 * - ไม่พบคืน null · พบแล้วเปลี่ยน status และคืนสำเนา
 */
export function updateStatus(id, status) {
  throw new Error('TODO W06-S4: updateStatus');
}

/**
 * TODO W06-S5 (CP05) · ลบคำร้องตามรหัส
 * - คืน true ถ้าลบได้จริง · คืน false ถ้าไม่พบรหัสนั้น
 * - ใช้ .filter() สร้าง array ใหม่ อย่าแก้ array เดิม
 */
export function remove(id) {
  throw new Error('TODO W06-S5: remove');
}
