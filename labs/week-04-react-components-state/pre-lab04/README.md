# ENGSE203 Pre-LAB 04 — React Study Task Board

Pre-LAB นี้เป็นกิจกรรม **ทำตามในชั้นเรียน 240 นาที** สำหรับผู้ที่ยังไม่เคยใช้ React โดยจะสร้าง Study Task Board ทีละ checkpoint ก่อนนำ mental model ไปประยุกต์กับ LAB 4 ด้วยตนเอง

## ผลลัพธ์ปลายคาบ

เมื่อจบ CP07 ผู้เรียนสามารถ:

- อ่าน JSX และสร้าง Functional Component
- ส่งข้อมูลด้วย Props และอธิบาย one-way data flow
- ใช้ `useState()` และ immutable update
- ใช้ `onChange`, `onSubmit`, `onClick`
- สร้าง Controlled Form และ validation ขั้นพื้นฐาน
- render list ด้วย `map()` และ stable `key`
- แสดง empty/error/success ด้วย Conditional Rendering
- ตรวจ responsive UI และ production build

## เตรียมเครื่อง

```bash
node --version
npm --version
git --version
```

ต้องใช้ Node.js `>=22.12.0` หากใช้ Windows ให้เปิด repository ผ่าน VS Code Remote — WSL และรันคำสั่งใน Ubuntu

## สร้าง working copy

อย่าแก้ Course Repository โดยตรง ให้คัดลอก starter ไปยังพื้นที่ทำงานของตนเอง:

```bash
cp -R starter ~/projects/engse203-prelab04
cd ~/projects/engse203-prelab04
npm install
npm run dev
```

บน macOS สามารถเปลี่ยน `~/projects` เป็นโฟลเดอร์งานที่ผู้สอนกำหนด

## Checkpoint 240 นาที

### CP00 — First React Success (15 นาที)

1. เปิด URL ที่ Vite แสดง
2. เปิด `src/App.jsx`
3. เปลี่ยน subtitle แล้วบันทึก
4. สังเกต Hot Module Replacement โดยไม่ reload เอง

**ผ่านเมื่อ:** หน้าแสดง Study Task Board และ Console ไม่มี error

### CP01 — JSX และ Components (30 นาที)

สร้าง `AppHeader` และ `SummaryPanel` ตาม TODO โดยย้าย markup ออกจาก `App.jsx`

**ถามก่อนรัน:** component ต่างจาก function ทั่วไปตรง input/output อย่างไร  
**ผ่านเมื่อ:** UI เหมือนเดิม แต่ React DevTools เห็น component แยก responsibility

### CP02 — Props, List, `map()` และ `key` (35 นาที)

สร้าง `TaskList` และ `TaskCard` แล้วส่ง `initialTasks` จาก App ลงไป

**ผ่านเมื่อ:** เห็น task เริ่มต้น 3 รายการและใช้ `task.id` เป็น key ไม่ใช้ array index

### CP03 — State, Derived Data และ Filter (40 นาที)

1. เปลี่ยน tasks เป็น `useState(initialTasks)`
2. เพิ่ม `statusFilter`
3. คำนวณ summary/filteredTasks จาก tasks โดยไม่สร้าง state ซ้ำ
4. เชื่อม `FilterBar` ด้วย `onChange`

**ผ่านเมื่อ:** เลือก todo/doing/done แล้ว list และ count ตรงกัน

### CP04 — Controlled Form และ Add Event (50 นาที)

สร้าง `TaskForm` ที่มี `title`, `category`, `priority` พร้อม:

- `value` + `onChange`
- `onSubmit` + `preventDefault()`
- validation: title อย่างน้อย 3 ตัวอักษรและต้องเลือก category
- immutable add ด้วย `[newTask, ...currentTasks]`
- reset form เมื่อ valid เท่านั้น

**ผ่านเมื่อ:** invalid ไม่เพิ่มรายการ ส่วน valid เพิ่มรายการสถานะ `todo`

### CP05 — Callback Delete และ Conditional Rendering (35 นาที)

ส่ง `onDeleteTask` จาก App → TaskList → TaskCard และใช้ `filter()` ลบตาม id

**ผ่านเมื่อ:** ลบถูก card, count เปลี่ยน และเมื่อไม่มีรายการแสดง empty state

### CP06 — Responsive และ Accessibility (20 นาที)

ทดสอบที่ 375px และ desktop:

- ไม่มี horizontal scroll
- label/control เชื่อมกัน
- focus-visible ชัด
- error ใกล้ fieldและมี `aria-invalid`
- feedback มี `role="status"`

### CP07 — Verify, Build และ Transfer Plan (15 นาที)

```bash
npm run check
npm run build
npm run preview
```

ตอบใน `REFLECTION.md` สั้น ๆ:

1. State owner อยู่ที่ใดและเพราะอะไร
2. Props ไหลลงและ event ไหลกลับตรงไหน
3. LAB 4 ต้องเปลี่ยน data contract และ validation อย่างไร

## ใช้ checkpoint เมื่อหลุดจากชั้นเรียน

โฟลเดอร์ `checkpoints/CP00`–`CP07` เป็น source snapshot สำหรับผู้สอนตรวจหรือให้นักศึกษาเปรียบเทียบเฉพาะหลังพยายามแก้เองแล้ว ไม่ควรคัดลอก CP07 ตั้งแต่ต้น

## หลังจบ Pre-LAB

ไปที่ [LAB 4 — React Campus Service Request](../lab04/README.md) เปิด branch `lab/week-04` ใน Student Repository เดิม และประยุกต์ pattern โดยไม่คัดลอกชื่อ field/component ของ Study Task Board ตรง ๆ
