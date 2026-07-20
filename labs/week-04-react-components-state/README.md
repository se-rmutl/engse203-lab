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
4. เปิด Student Repository เดิม `engse203-student-labs-<student-id>`
5. ทำงานบน branch `lab/week-04` ที่ `labs/week-04/source/`
6. ส่ง Pages Hub URL, LAB04 Result URL, merged Pull Request URL และ tag `lab-04-submission-v1`

## เริ่มต้นสำหรับผู้สอน

- [Classroom Website — Single-page 16:9](./week04-classroom-site/README.md)
- [Instructor Step Script — Pre-LAB 04](./pre-lab04/INSTRUCTOR_STEP_SCRIPT.md)
- [Phase D1 Alignment และ checkpoint contract](./PHASE_D1_ALIGNMENT.md)
- [LAB 4 Instructor Grading Checklist](./lab04/INSTRUCTOR_GRADING_CHECKLIST.md)
- เฉลย Pre-LAB/LAB4 เก็บใน Instructor Kit แยกจาก Course Repository สาธารณะ

> Course Repository สาธารณะต้องไม่มี LAB4 solution ผู้สอนใช้ Instructor Kit แยกต่างหาก

## ขอบเขต Week 04

ครอบคลุม JSX, Functional Components, Props, one-way data flow, `useState`, immutable update, React events, Controlled Form, validation, `map()`/`key`, Conditional Rendering, Responsive UI, Git/PR/build/Pages

ยังไม่ใช้ React Router, remote API, LocalStorage/database, `useEffect()` เชิงลึก, Context API หรือ authentication ซึ่งเป็นสะพานไป Week 05
