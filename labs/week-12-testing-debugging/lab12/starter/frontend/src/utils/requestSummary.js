/**
 * requestSummary.js — นับคำร้องตามสถานะ สำหรับ SummaryPanel บน Dashboard
 *
 * Week 12 · CP47 — แยกการคำนวณออกจาก component เป็น pure function
 *   component วาดหน้าจอ · function คำนวณ → ทดสอบการคำนวณได้โดยไม่ต้องเปิดเบราว์เซอร์
 */
export function summarizeRequests(requests) {
  const count = (status) => requests.filter((request) => request.status === status).length;
  return {
    total: requests.length,
    pending: count('pending'),
    inProgress: count('in progress'),
    completed: count('completed'),
  };
}
