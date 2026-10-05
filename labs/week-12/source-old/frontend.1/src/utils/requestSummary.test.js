import { describe, test, expect } from 'vitest';
import { summarizeRequests } from './requestSummary.js';

describe('summarizeRequests', () => {
  test('รายการว่าง → ทุกค่าเป็น 0', () => {
    expect(summarizeRequests([])).toEqual({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  });

  // 🏫 TODO W12-DEBUG (CP47 · BUG #2): เพิ่ม test ที่ใช้ข้อมูลหน้าตาเดียวกับที่ API ส่งมา
  //   เปิด DevTools → Network → GET /api/requests → ดูค่า status จริง แล้วคัดลอกมาใช้
});
