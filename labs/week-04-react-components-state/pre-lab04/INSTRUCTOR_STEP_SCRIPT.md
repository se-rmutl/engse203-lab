# Instructor Step Script — Pre-LAB 04 (240 นาที)

## ก่อนเริ่มชั้นเรียน

- ทดสอบ `starter/`, `solution/` และ CP00–CP07 ด้วย Node.js 22.12+
- เปิด VS Code, Browser, DevTools Console และ Responsive viewport
- เตรียม starter ZIP สำหรับกรณี network/npm ช้า
- อย่าเปิด CP07 หรือ solution ทั้งไฟล์บนจอตั้งแต่ต้น

## รูปแบบการสอนทุก checkpoint

ใช้วงจร **Predict → I Do → We Do → You Do → Check** โดย live coding ครั้งละไม่เกินประมาณ 7–10 นาที

## CP00 — 0–15 นาที: First Success

1. ให้ทุกคนรัน `npm install` และ `npm run dev`
2. ชี้เส้นทาง `index.html → main.jsx → App.jsx`
3. ให้เปลี่ยน subtitle หนึ่งจุดและสังเกต HMR

**Formative check:** React เปลี่ยน UI เพราะเราแก้ DOM โดยตรงหรือเพราะ component render ใหม่  
**ช่วยเมื่อช้า:** แจก starter ที่มี `node_modules` ผ่านเครื่อง/LAN เฉพาะในคาบ แต่ไม่ให้ commit

## CP01 — 15–45 นาที: JSX/Components

- I Do: แยก `AppHeader` และอธิบาย component = function ที่คืน JSX
- We Do: สร้าง `SummaryPanel`
- You Do: ปรับ title/subtitle ผ่าน props

**Misconception:** component = ทุก `div` → ถามว่า responsibility ที่ตั้งชื่อได้คืออะไร

## CP02 — 45–80 นาที: Props/List

- วาด data ลงจาก App ไป TaskList/TaskCard
- สาธิต `tasks.map()` เพียงหนึ่ง card
- ให้นักศึกษาทำ TaskCard และใช้ `task.id` เป็น key

**Formative check:** ทำไม key ไม่ควรใช้ indexเมื่อมีการลบ

## CP03 — 80–120 นาที: State/Filter

- Predict ก่อนรัน: แก้ตัวแปรธรรมดาแล้ว UI จะเปลี่ยนหรือไม่
- เปลี่ยนเป็น `useState(initialTasks)`
- สาธิต derived summary และ filtered list
- เชื่อม FilterBar ผ่าน value/onChange

**Checkpoint:** นักศึกษาชี้ได้ว่าใคร owns state และใครรับ read-only props

## CP04 — 120–170 นาที: Controlled Form

- สาธิต field เดียวให้ครบ `value`, `name`, `onChange`
- ให้นักศึกษาต่ออีกสอง field
- เขียน validation เป็น pure function
- เรียง flow: prevent → read state → validate → stop/add → feedback/reset

**Misconception:** เรียก handler ระหว่าง render → เปรียบเทียบ `onSubmit={handleSubmit}` กับ `onSubmit={handleSubmit()}`

## CP05 — 170–205 นาที: Callback/Delete/Condition

- วาด events ไหลขึ้น TaskCard → TaskList → App
- ใช้ `filter()` ไม่ใช้ `splice()`
- ให้นักศึกษาออกแบบ empty message

**Check:** ลบรายการกลางแล้ว card อื่นไม่สลับ identity

## CP06 — 205–225 นาที: Responsive/A11y

- ทดสอบ 375px, keyboard และ 200% zoom
- ตรวจ label, focus, error, status โดยไม่พึ่งสีอย่างเดียว

## CP07 — 225–240 นาที: Verify/Bridge

- รัน `npm run check`, `npm run build`
- ให้ผู้เรียนตอบ state owner/props/callback ด้วยคำของตนเอง
- เปิด LAB 4 เฉพาะ requirements และให้ทำ transfer matrix 3 แถว

## กติกาการใช้ checkpoint

1. ให้ hint ก่อน
2. เปิดเฉพาะ diff หรือไฟล์ของ checkpoint ก่อนหน้า
3. ใช้ snapshot เต็มเมื่อผู้เรียนตามไม่ทันและต้องกลับเข้ากิจกรรมปัจจุบัน
4. ให้ผู้เรียนอธิบายสิ่งที่ copy ก่อนถือว่าผ่าน checkpoint

## Contingency

| ปัญหา | วิธีดำเนินชั้นเรียนต่อ |
|---|---|
| npm/network ช้า | ใช้ instructor demo + starter cache/LAN; coding ต่อในไฟล์และติดตั้งภายหลัง |
| Vite port ชน | ใช้ port ที่ Vite เสนอหรือ `npm run dev -- --port 5174` |
| WSL path ช้า | ย้าย project ไป `~/projects` ใน Ubuntu ไม่ใช้ `/mnt/c` |
| JSX blank page | เปิด Console แก้ error แรก ตรวจ tag/import/default export |
| ผู้เรียนตามไม่ทัน | restore checkpoint ก่อนหน้า แล้วทำ TODO ปัจจุบันต่อ |
| projector/browser fail | ใช้ source snapshot + predict trace บนกระดาษ แล้วกลับมารันเมื่อพร้อม |

