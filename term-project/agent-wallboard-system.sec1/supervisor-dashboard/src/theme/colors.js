/**
 * สีสำหรับแต่ละ Status
 */
export const statusColors = {
  Available: '#4caf50',  // เขียว - พร้อมรับงาน
  Busy: '#ff9800',       // ส้ม - ไม่ว่าง
  Break: '#2196f3',      // น้ำเงิน - พัก
  Offline: '#9e9e9e',    // เทา - ออฟไลน์
};

/**
 * ดึงสี status
 */
export const getStatusColor = (status) => {
  return statusColors[status] || statusColors.Offline;
};

/**
 * Priority Colors (สำหรับข้อความ)
 */
export const priorityColors = {
  low: '#4caf50',
  normal: '#2196f3',
  high: '#f44336',
};

/**
 * Chart Colors (สำหรับกราฟ/สถิติ)
 */
export const chartColors = [
  '#1976d2', // Blue
  '#dc004e', // Pink
  '#4caf50', // Green
  '#ff9800', // Orange
  '#9c27b0', // Purple
  '#00bcd4', // Cyan
];