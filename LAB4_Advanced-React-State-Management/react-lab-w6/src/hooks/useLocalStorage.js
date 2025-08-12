import { useState, useEffect } from 'react';

// โจทย์: สร้าง Custom Hook ที่ทำงานเหมือน useState แต่ sync ข้อมูลกับ Local Storage
// เฉลย: โค้ดด้านล่างคือเวอร์ชันที่แก้ไข Bug เรียบร้อยแล้ว
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      // BUG FIX: จัดการกรณีที่ value เป็น undefined หรือ null
      if (value === undefined || value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [key, value]);

  return [value, setValue];
}