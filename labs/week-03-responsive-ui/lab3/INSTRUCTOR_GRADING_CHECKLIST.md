# ENGSE203 LAB 3 — Instructor Grading Checklist

คะแนนเต็ม 3.00 คะแนน

## 1. Semantic HTML / Accessibility — 0.50

- [ ] มี `header`, `main`, `section`, `aside`, `form`
- [ ] `label for` ตรงกับ `id`
- [ ] ทุก control มี `name`
- [ ] focus state มองเห็น
- [ ] error เชื่อมด้วย `aria-describedby`

## 2. Responsive Layout — 0.75

- [ ] 375px เป็นหนึ่งคอลัมน์
- [ ] ไม่มี horizontal scroll
- [ ] Desktop เป็นสองคอลัมน์
- [ ] Zoom 200% ยังใช้งานได้

## 3. Event / Live Preview — 0.75

- [ ] ใช้ `input` event
- [ ] ใช้ `submit` event และ `preventDefault()`
- [ ] ใช้ `textContent` กับข้อมูลผู้ใช้
- [ ] Console ไม่มี error

## 4. Validation / Feedback — 0.50

- [ ] invalid state ชัดเจนและแสดงใกล้ field
- [ ] success state ชัดเจน
- [ ] ไม่ reset form เมื่อข้อมูลผิด
- [ ] valid แล้วเพิ่มรายการและ reset ได้

## 5. Git / README / Pages — 0.50

- [ ] ใช้ branch `lab/week-03`
- [ ] มี commit checkpoints
- [ ] มี Pull Request ที่ merge แล้ว
- [ ] README มี test cases/screenshots
- [ ] GitHub Pages เปิดได้จริง

## Quick diagnosis

- Pages 404 → ตรวจ Pages Hub, merge ล่าสุด และ `docs/labs/week-03/`
- ไม่มี CSS/JS → ตรวจ `base: './'`, import `dist/` เข้า publish แล้ว build Pages Hub ใหม่
- FormData ว่าง → ตรวจ `name`
- Submit reload → ตรวจ `preventDefault()`
- Push denied → ตรวจ `ssh -T git@github.com` และ `git remote -v`
