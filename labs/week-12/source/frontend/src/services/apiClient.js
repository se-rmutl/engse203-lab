/**
 * ตัวกลางสำหรับคุยกับ API — ที่เดียวที่เรียก fetch()
 * ทุกฟังก์ชันใน requestService เรียกผ่านตรงนี้
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

/** error ที่รู้ว่ามาจาก API พร้อม status ที่ได้กลับมา */
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function parseError(response) {
  try {
    const body = await response.json();
    return body.error ?? `คำขอไม่สำเร็จ (${response.status})`;
  } catch {
    return `คำขอไม่สำเร็จ (${response.status})`;
  }
}

/**
 * เรียก API แล้วคืนข้อมูลที่ parse แล้ว
 * - ตอบ 2xx → คืนข้อมูล (204 คืน null เพราะไม่มี body)
 * - ตอบ 4xx/5xx → โยน ApiError พร้อม status
 * - ต่อ API ไม่ได้เลย → โยน ApiError status 0
 */
export async function apiFetch(path, options = {}) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
  } catch {
    // fetch โยน error เมื่อต่อเซิร์ฟเวอร์ไม่ได้เลย เช่น API ไม่ได้เปิด
    throw new ApiError('ติดต่อเซิร์ฟเวอร์ไม่ได้ — ตรวจว่าเปิด API ที่พอร์ต 3001 แล้วหรือยัง', 0);
  }

  if (!response.ok) {
    throw new ApiError(await parseError(response), response.status);
  }

  if (response.status === 204) return null;
  return response.json();
}
