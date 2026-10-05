import { describe, test, expect } from 'vitest';
import { summarizeRequests } from './requestSummary.js';

// 🐞 regression test — BUG #2: Dashboard แสดง "กำลังดำเนินการ 0" ทั้งที่มีคำร้อง in-progress
// ข้อมูลรูปแบบเดียวกับที่ GET /api/requests ส่งมา (ดูได้ใน DevTools → Network)
const sample = [
  { id: 'REQ-001', status: 'pending' },
  { id: 'REQ-002', status: 'in-progress' },
  { id: 'REQ-003', status: 'completed' },
  { id: 'REQ-004', status: 'pending' },
];

describe('summarizeRequests', () => {
  test('นับครบทุกสถานะ', () => {
    expect(summarizeRequests(sample)).toEqual({ total: 4, pending: 2, inProgress: 1, completed: 1 });
  });
  test('รายการว่าง → ทุกค่าเป็น 0', () => {
    expect(summarizeRequests([])).toEqual({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  });
  test('ผลรวมของแต่ละสถานะเท่ากับ total เมื่อทุกรายการมีสถานะที่รู้จัก', () => {
    const s = summarizeRequests(sample);
    expect(s.pending + s.inProgress + s.completed).toBe(s.total);
  });
});
