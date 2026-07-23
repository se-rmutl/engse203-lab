# ENGSE203 Pre-LAB 04 — React Study Task Board

Pre-LAB นี้เป็นกิจกรรม **ทำตามในชั้นเรียน 240 นาที** สำหรับผู้ที่ยังไม่เคยใช้ React โดยจะสร้าง Study Task Board ทีละ checkpoint ก่อนนำ mental model ไปประยุกต์กับ LAB 4 ด้วยตนเอง

ก่อนเริ่มให้เปิด [React Beginner Bridge — Start Here](../react-beginner-bridge/00_START_HERE_REACT_BEGINNER_TH.md) เอกสารแต่ละบทจะเชื่อมกับ checkpoint โดยตรง

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

## สร้าง working copy ใน Student Repository

อย่าแก้ Course Repository โดยตรง ให้สร้าง branch Week 04 ใน Student Repository เดิม แล้วคัดลอก starter ไปยัง source:

```bash
cd ~/projects/engse203-student-labs-<student-id>
git switch main
git pull
git switch -c lab/week-04
cp -R <course-repo>/labs/week-04-react-components-state/pre-lab04/starter/. labs/week-04/source/
cd labs/week-04/source
npm install
npm run dev
```

บน macOS สามารถเปลี่ยน `~/projects` เป็นโฟลเดอร์งานที่ผู้สอนกำหนด

> **สำหรับผู้สอน:** ใช้ `INSTRUCTOR_STEP_SCRIPT_PHASE_B1.md` และ checkpoints จาก Instructor Private Kit เป็นหน้าหลักระหว่างสอน

## Checkpoint 240 นาที

### CP00 — First React Success (15 นาที)

**อ่านคู่:** [01 Mental Model](../react-beginner-bridge/01_WEEK03_TO_REACT_MENTAL_MODEL_TH.md) + [02 First App](../react-beginner-bridge/02_REACT_VITE_FIRST_APP_TH.md)

1. เปิด URL ที่ Vite แสดง
2. เปิด `src/App.jsx`
3. เปลี่ยน subtitle แล้วบันทึก
4. สังเกต Hot Module Replacement โดยไม่ reload เอง

**ผ่านเมื่อ:** หน้าแสดง Study Task Board และ Console ไม่มี error

### CP01 — JSX และ Components (30 นาที)

**อ่านคู่:** [03 JSX](../react-beginner-bridge/03_JSX_FUNDAMENTALS_TH.md) + [04 Components](../react-beginner-bridge/04_FUNCTIONAL_COMPONENTS_TH.md)

สร้าง `AppHeader` และ `SummaryPanel` ตาม TODO โดยย้าย markup ออกจาก `App.jsx`

**ถามก่อนรัน:** component ต่างจาก function ทั่วไปตรง input/output อย่างไร  
**ผ่านเมื่อ:** UI เหมือนเดิม แต่ React DevTools เห็น component แยก responsibility

### CP02 — Props, List, `map()` และ `key` (35 นาที)

**อ่านคู่:** [05 Props](../react-beginner-bridge/05_PROPS_AND_ONE_WAY_DATA_FLOW_TH.md) + [07 List/Key](../react-beginner-bridge/07_LIST_KEY_CONDITIONAL_RENDERING_TH.md)

สร้าง `TaskList` และ `TaskCard` แล้วส่ง `initialTasks` จาก App ลงไป

**ผ่านเมื่อ:** เห็น task เริ่มต้น 3 รายการและใช้ `task.id` เป็น key ไม่ใช้ array index

### CP03 — State, Derived Data และ Filter (40 นาที)

**อ่านคู่:** [06 State and Events](../react-beginner-bridge/06_STATE_AND_EVENTS_TH.md)

1. เปลี่ยน tasks เป็น `useState(initialTasks)`
2. เพิ่ม `statusFilter`
3. คำนวณ summary/filteredTasks จาก tasks โดยไม่สร้าง state ซ้ำ
4. เชื่อม `FilterBar` ด้วย `onChange`

**ผ่านเมื่อ:** เลือก todo/doing/done แล้ว list และ count ตรงกัน

### CP04 — Controlled Form และ Add Event (50 นาที)

**อ่านคู่:** [08 Controlled Form](../react-beginner-bridge/08_CONTROLLED_FORM_VALIDATION_TH.md)

สร้าง `TaskForm` ที่มี `title`, `category`, `priority` พร้อม:

- `value` + `onChange`
- `onSubmit` + `preventDefault()`
- validation: title อย่างน้อย 3 ตัวอักษรและต้องเลือก category
- immutable add ด้วย `[newTask, ...currentTasks]`
- reset form เมื่อ valid เท่านั้น

**ผ่านเมื่อ:** invalid ไม่เพิ่มรายการ ส่วน valid เพิ่มรายการสถานะ `todo`

### CP05 — Callback Delete และ Conditional Rendering (35 นาที)

**อ่านคู่:** [05 Props/Callback](../react-beginner-bridge/05_PROPS_AND_ONE_WAY_DATA_FLOW_TH.md) + [07 Conditional Rendering](../react-beginner-bridge/07_LIST_KEY_CONDITIONAL_RENDERING_TH.md)

ส่ง `onDeleteTask` จาก App → TaskList → TaskCard และใช้ `filter()` ลบตาม id

**ผ่านเมื่อ:** ลบถูก card, count เปลี่ยน และเมื่อไม่มีรายการแสดง empty state

### CP06 — Responsive และ Accessibility (20 นาที)

**อ่านคู่:** [09 Guided Build](../react-beginner-bridge/09_STUDY_TASK_BOARD_GUIDED_BUILD_TH.md)

ทดสอบที่ 375px และ desktop:

- ไม่มี horizontal scroll
- label/control เชื่อมกัน
- focus-visible ชัด
- error ใกล้ fieldและมี `aria-invalid`
- feedback มี `role="status"`

### CP07 — Verify, Build และ Transfer Plan (15 นาที)

**อ่านคู่:** [10 Transfer to LAB04](../react-beginner-bridge/10_TRANSFER_TO_LAB04_CAMPUS_SERVICE_REQUEST_TH.md) + [11 Test/Build/Submit](../react-beginner-bridge/11_TEST_BUILD_PAGES_SUBMISSION_TH.md)

```bash
npm run check:cp -- CP07
npm run check
npm run build
npm run preview
```

ตอบใน `REFLECTION.md` สั้น ๆ:

1. State owner อยู่ที่ใดและเพราะอะไร
2. Props ไหลลงและ event ไหลกลับตรงไหน
3. LAB 4 ต้องเปลี่ยน data contract และ validation อย่างไร

## ใช้ checkpoint เมื่อหลุดจากชั้นเรียน

ผู้สอนถือ source snapshot CP00–CP07 ไว้ใน Instructor Private Kit นักศึกษาจะได้รับ snapshot เฉพาะ checkpoint ที่จำเป็นหลังพยายามแก้และอธิบายปัญหาแล้ว

## หลังจบ Pre-LAB

ไปที่ [LAB 4 — React Campus Service Request](../lab04/README.md) ใน branch `lab/week-04` เดิม และประยุกต์ pattern โดยไม่คัดลอกชื่อ field/component ของ Study Task Board ตรง ๆ
