# 09 — Guided Build: Study Task Board

บทนี้รวมแนวคิดจากบท 01–08 เป็นกิจกรรม Pre-LAB04 จำนวน 8 checkpoint ใช้เวลารวม 240 นาที

## กติกาการเรียน

ในแต่ละ checkpoint:

1. อ่านเป้าหมาย
2. ทำนายผลก่อนแก้
3. อาจารย์สาธิตส่วนสั้น
4. นักศึกษาพิมพ์และแก้ด้วยตนเอง
5. รันและตรวจ UI/Console
6. อธิบาย flow ด้วยคำของตนเอง
7. บันทึก checkpoint

หากตามไม่ทัน ให้ใช้ snapshot ของ checkpoint ก่อนหน้าเพื่อกลับเข้าสู่กิจกรรมปัจจุบัน ไม่ให้คัดลอก CP07 ตั้งแต่ต้น

## โครงสร้างปลายทาง

```text
src/
├── components/
│   ├── AppHeader.jsx
│   ├── SummaryPanel.jsx
│   ├── TaskForm.jsx
│   ├── FilterBar.jsx
│   ├── TaskList.jsx
│   └── TaskCard.jsx
├── data/
│   └── initialTasks.js
├── App.jsx
├── main.jsx
└── styles.css
```

## CP00 — First React Success (15 นาที)

### ทำ

```bash
cd ~/projects/engse203-prelab04
npm install
npm run dev
```

แก้ subtitle ใน `src/App.jsx` แล้วบันทึก

### สังเกต

- HMR เปลี่ยนหน้าโดยไม่ reload
- `main.jsx` render `<App />` เข้า `#root`

### ผ่านเมื่อ

- หน้า Study Task Board แสดง
- Console ไม่มี error
- อธิบาย entry flow ได้

## CP01 — JSX และ Components (30 นาที)

### ทำ

1. สร้าง `src/components/AppHeader.jsx`
2. ย้าย header ออกจาก `App.jsx`
3. สร้าง `SummaryPanel.jsx`
4. ใช้ `className`, ปิด tag และคืน root เดียว

### ทำนาย

ถ้าเป็น refactor อย่างถูกต้อง UI ควรเปลี่ยนหรือไม่

### ผ่านเมื่อ

- UI เดิมยังอยู่
- `App` สั้นลง
- component แต่ละตัวมี responsibility ชัด

## CP02 — Props, List และ Key (35 นาที)

### Data เริ่มต้น

```js
export const initialTasks = [
  {
    id: 'TASK-001',
    title: 'อ่าน JSX Fundamentals',
    category: 'reading',
    priority: 'normal',
    status: 'todo',
  },
  {
    id: 'TASK-002',
    title: 'แยก AppHeader component',
    category: 'coding',
    priority: 'high',
    status: 'doing',
  },
  {
    id: 'TASK-003',
    title: 'ทบทวน immutable update',
    category: 'review',
    priority: 'normal',
    status: 'done',
  },
];
```

### ทำ

1. Import `initialTasks` ใน `App`
2. ส่ง `tasks` ไป `TaskList`
3. ใช้ `map()` สร้าง `TaskCard`
4. ใช้ `task.id` เป็น key

### ผ่านเมื่อ

- เห็น 3 cards
- title/status ถูกต้อง
- ไม่ใช้ array index เป็น key

## CP03 — State, Derived Data และ Filter (40 นาที)

### ทำ

```jsx
const [tasks, setTasks] = useState(initialTasks);
const [statusFilter, setStatusFilter] = useState('all');
```

คำนวณ:

- `summary` จาก `tasks`
- `filteredTasks` จาก `tasks + statusFilter`

ส่ง value/callback ให้ `FilterBar`

### ทำนาย

หาก filter เป็น `done` Summary total ควรแสดง 3 หรือ 1 เพราะอะไร

### ผ่านเมื่อ

- filter ทุกค่าแสดงถูก
- Summary เป็นภาพรวมของ tasks ทั้งหมด
- ไม่มี count state ซ้ำ

## CP04 — Controlled Form และ Add (50 นาที)

### ทำ

1. สร้าง form state: `title`, `category`, `priority`
2. เชื่อม `value` และ `onChange`
3. `onSubmit` เรียก `preventDefault()`
4. Validate title ≥ 3 และ category ไม่ว่าง
5. ส่ง valid data ผ่าน `onAddTask`
6. Parent สร้าง id/status และเพิ่มแบบ immutable
7. reset เมื่อ valid เท่านั้น

### ผ่านเมื่อ

- invalid ไม่เพิ่มและไม่ล้างข้อมูล
- valid เพิ่ม task ด้านบน
- Summary เพิ่ม
- success feedback แสดง

## CP05 — Callback, Delete และ Empty State (35 นาที)

### ทำ

ส่ง callback:

```text
App → TaskList → TaskCard
```

แล้วลบ:

```jsx
setTasks((currentTasks) =>
  currentTasks.filter((task) => task.id !== taskId),
);
```

### ทดสอบ

1. ลบรายการตรงกลาง
2. ตรวจว่า card อื่นไม่สลับข้อมูล
3. เลือก filter ที่ไม่มีรายการ
4. ลบจนไม่เหลือและดู empty state

### ผ่านเมื่อ

- ลบถูก id
- count/list เปลี่ยน
- มีข้อความ empty state

## CP06 — Responsive และ Accessibility (20 นาที)

### ตรวจที่ 375px

- ไม่มี horizontal scroll
- form และ cards เรียงอ่านได้
- button กดได้สะดวก

### ตรวจด้วย Keyboard

- Tab ไปทุก control
- focus indicator มองเห็น
- Enter submit form ได้
- label เชื่อม field
- error มี `aria-invalid`/`aria-describedby`
- feedback มี `role="status"`

### ผ่านเมื่อ

UI ใช้งานได้ทั้ง mobile และ desktop โดยไม่พึ่งสีเพียงอย่างเดียว

## CP07 — Verify, Build และ Transfer (15 นาที)

```bash
npm run check:cp -- CP07
npm run check
npm run build
npm run preview
```

ตอบใน `REFLECTION.md`:

1. State owner อยู่ที่ใด เพราะอะไร
2. Props ไหลลงที่จุดใด
3. Callback ไหลกลับที่จุดใด
4. Derived data มีอะไรบ้าง
5. LAB04 ต้องเปลี่ยน contract ใด

## แผนช่วยเมื่อผู้เรียนติด

| ระดับ | การช่วย |
|---|---|
| Hint 1 | ชี้ error แรกหรือชี้ component ที่เกี่ยวข้อง |
| Hint 2 | ให้ pseudocode/data flow |
| Hint 3 | เปิด diff เฉพาะส่วนของ checkpoint ก่อนหน้า |
| Recovery | restore snapshot ก่อนหน้า แล้วทำ TODO ปัจจุบันต่อ |

## Exit Ticket

เติมช่องว่างโดยไม่เปิด source:

```text
State หลักอยู่ที่ __________
Child อ่านข้อมูลผ่าน __________
Child ขอให้ Parent เปลี่ยนข้อมูลผ่าน __________
List สร้างจาก array ด้วย __________
Form field ถูกควบคุมด้วย __________ + __________
```

ต่อไป: [10 — Transfer to LAB04 Campus Service Request](./10_TRANSFER_TO_LAB04_CAMPUS_SERVICE_REQUEST_TH.md)
