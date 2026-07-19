# ENGSE203 LAB 4 — Instructor Grading Checklist

คะแนนเต็ม 3.00 คะแนน ตรวจจาก `main`, merged PR, Pages URL และ README evidence

## Gate ก่อนให้คะแนน

- [ ] repository ชื่อ `engse203-lab04-<student-id>`
- [ ] `npm install`, `npm run check`, `npm run build` ผ่าน
- [ ] Console ไม่มี error/key warning
- [ ] ไม่มี `node_modules`, secret, token หรือ `.env`
- [ ] งานอยู่ในขอบเขต Week 04

## Area 1 — JSX, Components และ Props (0.60)

- [ ] App + child components 6 ชื่อครบ
- [ ] responsibility แยกชัด
- [ ] Props ลงอย่างน้อย 2 จุด
- [ ] callback กลับ Parent อย่างน้อย 1 จุด

## Area 2 — State, Events และ Controlled Form (0.80)

- [ ] requests/filter/form/errors อยู่ใน state ที่เหมาะสม
- [ ] summary/filteredRequests เป็น derived data
- [ ] `onChange`, `onSubmit`, `onClick` ทำงาน
- [ ] add/delete ใช้ immutable update
- [ ] form controlled และ reset เฉพาะ valid

## Area 3 — Responsive, Feedback และ Validation (0.50)

- [ ] validation 5 rules ครบ
- [ ] error ใกล้ field + `aria-invalid`
- [ ] empty/error/success states ชัด
- [ ] 375px ไม่มี horizontal scroll; desktop hierarchy ชัด
- [ ] focus/label/status ใช้ keyboard ได้

## Area 4 — Code Quality / File Structure (0.40)

- [ ] files/data/style แยกตาม contract
- [ ] ไม่มี `querySelector`, `innerHTML`, `push`, `splice` เพื่อเปลี่ยน UI/state
- [ ] `request.id` เป็น key
- [ ] ชื่อและ formatting อ่านได้

## Area 5 — Git, PR และ README (0.40)

- [ ] branch `feature/react-service-request`
- [ ] meaningful commits หลาย checkpoint
- [ ] PR merge แล้วและมีคำอธิบาย/test checklist
- [ ] README มี component tree, setup, URLs, screenshots, AI disclosure

## Area 6 — Pages และ Test Evidence (0.30)

- [ ] Pages เปิด Incognito ได้และ assets ไม่ 404
- [ ] TC-01–TC-12 มีผลจริง
- [ ] screenshots แสดง desktop/mobile และ state สำคัญ

## Quick Diagnosis

- หน้า blank → Console: แก้ JSX/import error แรก
- controlled warning → ตรวจ `value` + `onChange` และ initial value
- summary ไม่ตรง → อย่าเก็บ summary เป็น state; คำนวณจาก requests
- ลบ card ผิด → ใช้ unique `request.id` ไม่ใช้ index
- Pages 404/assets หาย → ตรวจ Vite `base`, commit `docs/`, Pages source
- build ผ่านแต่ check ไม่ผ่าน → ตรวจ component filenames และ forbidden mutable/DOM patterns

