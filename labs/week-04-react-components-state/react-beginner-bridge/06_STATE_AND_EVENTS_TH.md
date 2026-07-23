# 06 — State and Events

## เป้าหมาย

ผู้เรียนสามารถใช้ `useState()`, เชื่อม React events, อัปเดต array แบบ immutable และแยก state ออกจาก derived data

## เมื่อใดควรเป็น State

ข้อมูลควรเป็น state เมื่อ:

- เปลี่ยนระหว่างการใช้งาน
- การเปลี่ยนมีผลต่อ UI
- ไม่สามารถคำนวณตรงจาก state/props อื่นได้อย่างเหมาะสม

ตัวอย่างของ Study Task Board:

```jsx
const [tasks, setTasks] = useState(initialTasks);
const [statusFilter, setStatusFilter] = useState('all');
```

Summary ไม่ต้องเป็น state แยก เพราะคำนวณจาก `tasks`

## ใช้ `useState`

```jsx
import { useState } from 'react';

function StatusFilter() {
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <select
      value={statusFilter}
      onChange={(event) => setStatusFilter(event.target.value)}
    >
      <option value="all">ทั้งหมด</option>
      <option value="todo">ยังไม่เริ่ม</option>
      <option value="doing">กำลังทำ</option>
      <option value="done">เสร็จแล้ว</option>
    </select>
  );
}
```

`useState('all')` คืนค่า 2 ส่วน:

1. `statusFilter` — ค่า state ปัจจุบัน
2. `setStatusFilter` — function สำหรับขอให้ React เปลี่ยน state และ render ใหม่

## Event Object

สำหรับ input/select:

```jsx
function handleFilterChange(event) {
  setStatusFilter(event.target.value);
}
```

ใน JSX:

```jsx
<select value={statusFilter} onChange={handleFilterChange}>
```

## Immutable Update

เพิ่มรายการ:

```jsx
setTasks((currentTasks) => [newTask, ...currentTasks]);
```

ลบรายการ:

```jsx
setTasks((currentTasks) =>
  currentTasks.filter((task) => task.id !== taskId),
);
```

อัปเดตสถานะ:

```jsx
setTasks((currentTasks) =>
  currentTasks.map((task) =>
    task.id === taskId ? { ...task, status: 'done' } : task,
  ),
);
```

หลีกเลี่ยง:

```jsx
tasks.push(newTask);
tasks[0].status = 'done';
tasks.splice(index, 1);
```

การสร้าง array/object ใหม่ทำให้การเปลี่ยนแปลงชัดเจนและช่วยให้ React เปรียบเทียบค่าได้ถูกต้อง

## Derived Data

```jsx
const summary = {
  total: tasks.length,
  todo: tasks.filter((task) => task.status === 'todo').length,
  doing: tasks.filter((task) => task.status === 'doing').length,
  done: tasks.filter((task) => task.status === 'done').length,
};

const filteredTasks =
  statusFilter === 'all'
    ? tasks
    : tasks.filter((task) => task.status === statusFilter);
```

ไม่ควรสร้าง `todoCount` เป็น state แล้วคอยปรับพร้อม `tasks` เพราะเสี่ยงให้สองค่าไม่ตรงกัน

## State Ownership

ให้เก็บ state ที่ component ร่วมใกล้ที่สุดซึ่งต้องแจกข้อมูลให้ลูกหลายตัว

ใน Task Board:

- `SummaryPanel` ต้องอ่าน tasks
- `TaskList` ต้องอ่าน tasks
- `TaskForm` ต้องเพิ่ม tasks
- `FilterBar` ต้องเปลี่ยน filter

ดังนั้น `App` เป็น owner ที่เหมาะสมของ `tasks` และ `statusFilter`

## Predict ก่อนรัน

```jsx
function handleAddTask() {
  setTasks((currentTasks) => [
    {
      id: `TASK-${Date.now()}`,
      title: 'งานใหม่',
      status: 'todo',
    },
    ...currentTasks,
  ]);
}
```

ตอบ:

1. งานใหม่อยู่ด้านบนหรือด้านล่าง
2. `total` เปลี่ยนหรือไม่ หาก summary คำนวณจาก tasks
3. เหตุใดจึงใช้ callback form ของ setter

## CP03 — State, Derived Data และ Filter

ผ่านเมื่อ:

- [ ] `tasks` และ `statusFilter` เป็น state
- [ ] filter เปลี่ยน list
- [ ] summary คำนวณจาก tasks
- [ ] ไม่สร้าง count state ซ้ำ
- [ ] ไม่ mutate array/object เดิม
- [ ] ชี้ได้ว่า `App` เป็น state owner เพราะอะไร

ต่อไป: [07 — List, Key and Conditional Rendering](./07_LIST_KEY_CONDITIONAL_RENDERING_TH.md)
