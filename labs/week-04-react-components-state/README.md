# Week 04 — React Components, Props, State และ Events

**รายวิชา:** ENGSE203 การเขียนโปรแกรมสำหรับวิศวกรซอฟต์แวร์

**CLO หลัก:** CLO3

**รูปแบบ:** ทฤษฎี 60 นาที + ปฏิบัติในชั้นเรียน 240 นาที + LAB 4 รายบุคคล

**กรณีศึกษาต่อเนื่อง:** Campus Service Request จาก Week 03

Week 04 แบ่งงานเป็นสองส่วนชัดเจนเพื่อให้นักศึกษาที่ไม่เคยใช้ React มาก่อนเรียนได้เป็นลำดับ

| ส่วน | ทำเมื่อใด | กรณีตัวอย่าง | เป้าหมาย |
|---|---|---|---|
| [Pre-LAB 04](./pre-lab04/) | ทำตามในชั้นเรียน 240 นาที | Study Task Board | ฝึก mental model และ syntax พร้อม checkpoint |
| [LAB 4](./lab04/) | งานรายบุคคลหลังเรียน | Campus Service Request | ประยุกต์ความรู้ด้วยตนเองและส่งผ่าน GitHub |

## เส้นทางการเรียน

```text
Week 03: DOM-driven Campus Service Request
  → Pre-LAB 04: guided React Study Task Board
  → LAB 4: independent React Campus Service Request
  → Week 05: Router / data fetching / persistence
```

## เริ่มต้นสำหรับนักศึกษา

1. ตรวจ `node --version` ให้เป็น `22.12.0` หรือใหม่กว่า
2. เปิด [Pre-LAB 04 README](./pre-lab04/README.md) และทำ CP00–CP07 ตามเวลา
3. หลังเรียน เปิด [LAB 4 README](./lab04/README.md)
4. สร้าง repository `engse203-lab04-<student-id>` ของตนเอง
5. ทำงานบน branch `feature/react-service-request`
6. ส่ง Repository URL, Pull Request URL และ GitHub Pages URL

## เริ่มต้นสำหรับผู้สอน

- [Instructor Step Script — Pre-LAB 04](./pre-lab04/INSTRUCTOR_STEP_SCRIPT.md)
- [Phase D1 Alignment และ checkpoint contract](./PHASE_D1_ALIGNMENT.md)
- [LAB 4 Instructor Grading Checklist](./lab04/INSTRUCTOR_GRADING_CHECKLIST.md)
- `pre-lab04/solution/` — เฉลย worked example
- `lab04/solution/` — เฉลยอ้างอิงสำหรับตรวจงาน

> หาก repository นี้เปิดให้นักศึกษาอ่านแบบสาธารณะ ผู้สอนควรย้าย `lab04/solution/` ไปยัง private branch หรือ instructor-only package ก่อนเผยแพร่โจทย์จริง

## ขอบเขต Week 04

ครอบคลุม JSX, Functional Components, Props, one-way data flow, `useState`, immutable update, React events, Controlled Form, validation, `map()`/`key`, Conditional Rendering, Responsive UI, Git/PR/build/Pages

ยังไม่ใช้ React Router, remote API, LocalStorage/database, `useEffect()` เชิงลึก, Context API หรือ authentication ซึ่งเป็นสะพานไป Week 05
