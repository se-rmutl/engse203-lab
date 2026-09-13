import { useState } from 'react';

/**
 * useManualReload — ให้มาแล้ว ไม่ต้องแก้
 *
 * ปัญหาที่ hook นี้แก้:
 * useEffect จะทำงานใหม่ก็ต่อเมื่อค่าใน dependency array เปลี่ยนเท่านั้น
 * แต่บางครั้งเราอยากสั่งให้โหลดข้อมูลใหม่ทั้งที่ไม่มีอะไรเปลี่ยนเลย
 * เช่น ตอนผู้ใช้กดปุ่ม "ลองอีกครั้ง"
 *
 * วิธีแก้คือจงใจเปลี่ยนตัวเลขหนึ่งตัวที่อยู่ใน dependency array
 * React เห็นว่าค่าเปลี่ยนก็จะเรียก Effect ใหม่ให้
 *
 * วิธีใช้:
 *   const [reloadKey, reload] = useManualReload();
 *
 *   useEffect(() => {
 *     // โหลดข้อมูล
 *   }, [reloadKey]);        ← ใส่ reloadKey ไว้ใน dependency array
 *
 *   <button onClick={reload}>ลองอีกครั้ง</button>
 *
 * @returns {[number, () => void]} ค่าปัจจุบัน และฟังก์ชันสั่งให้โหลดใหม่
 */
export default function useManualReload() {
  const [reloadKey, setReloadKey] = useState(0);
  return [reloadKey, () => setReloadKey((value) => value + 1)];
}
