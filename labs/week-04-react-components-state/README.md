# Week 04 — React Components, Props, State และ Events

**รายวิชา:** ENGSE203 การเขียนโปรแกรมสำหรับวิศวกรซอฟต์แวร์

**CLO หลัก:** CLO3

**รูปแบบ:** ทฤษฎี 60 นาที + ปฏิบัติในชั้นเรียน 240 นาที + LAB 4 รายบุคคล

**กรณีศึกษาต่อเนื่อง:** Campus Service Request จาก Week 03

Week 04 ใช้เส้นทางสามชั้นสำหรับนักศึกษาที่ไม่เคยใช้ React/JSX มาก่อน

| ส่วน | ทำเมื่อใด | กรณีตัวอย่าง | เป้าหมาย |
|---|---|---|---|
| [React Beginner Bridge](./react-beginner-bridge/00_START_HERE_REACT_BEGINNER_TH.md) | อ่าน/ทดลองก่อนและระหว่างคาบ | ตัวอย่างย่อย | สร้าง mental model และ syntax จากพื้นฐาน |
| [Pre-LAB 04](./pre-lab04/) | ทำตามในชั้นเรียน 240 นาที | Study Task Board | รวมแนวคิดเป็น CP00–CP07 |
| [LAB 4](./lab04/) | งานรายบุคคลหลังเรียน | Campus Service Request | ประยุกต์ความรู้ด้วยตนเองและส่งผ่าน GitHub |

## เส้นทางการเรียน

```text
Week 03: DOM-driven Campus Service Request
  → React Beginner Bridge: อ่าน–ทดลอง–อธิบาย
  → Pre-LAB 04: guided React Study Task Board CP00–CP07
  → LAB 4: independent React Campus Service Request
  → Week 05: Router / data fetching / persistence
```

## เริ่มต้นสำหรับนักศึกษา

1. ตรวจ `node --version` ให้เป็น `22.12.0` หรือใหม่กว่า
2. เปิด [00 — Start Here](./react-beginner-bridge/00_START_HERE_REACT_BEGINNER_TH.md)
3. ใช้ตารางด้านล่างเปิดบทที่ตรงกับ CP ปัจจุบัน แล้วทำ [Pre-LAB 04](./pre-lab04/README.md)
4. หลัง CP07 เปิด [LAB 4 README](./lab04/README.md)
5. ใช้ Student Repository เดิมและสร้าง branch `lab/week-04`
6. ส่ง Pages Hub URL, Weekly Result URL, merged PR URL และ tag `lab-04-submission-v1`

## Beginner Guide → Checkpoint Map

| CP | เวลา | อ่าน/ทดลอง | หลักฐานผ่าน |
|---|---:|---|---|
| CP00 | 15 | [01 Mental Model](./react-beginner-bridge/01_WEEK03_TO_REACT_MENTAL_MODEL_TH.md), [02 First App](./react-beginner-bridge/02_REACT_VITE_FIRST_APP_TH.md) | Vite/HMR และ entry flow |
| CP01 | 30 | [03 JSX](./react-beginner-bridge/03_JSX_FUNDAMENTALS_TH.md), [04 Components](./react-beginner-bridge/04_FUNCTIONAL_COMPONENTS_TH.md) | แยก component ได้ |
| CP02 | 35 | [05 Props](./react-beginner-bridge/05_PROPS_AND_ONE_WAY_DATA_FLOW_TH.md), [07 List/Key](./react-beginner-bridge/07_LIST_KEY_CONDITIONAL_RENDERING_TH.md) | list + stable key |
| CP03 | 40 | [06 State/Events](./react-beginner-bridge/06_STATE_AND_EVENTS_TH.md) | state owner/filter/derived data |
| CP04 | 50 | [08 Controlled Form](./react-beginner-bridge/08_CONTROLLED_FORM_VALIDATION_TH.md) | valid/invalid submit |
| CP05 | 35 | [05 Props/Callback](./react-beginner-bridge/05_PROPS_AND_ONE_WAY_DATA_FLOW_TH.md), [07 Conditional](./react-beginner-bridge/07_LIST_KEY_CONDITIONAL_RENDERING_TH.md) | delete + empty state |
| CP06 | 20 | [09 Guided Build](./react-beginner-bridge/09_STUDY_TASK_BOARD_GUIDED_BUILD_TH.md) | 375px/keyboard/a11y |
| CP07 | 15 | [10 Transfer](./react-beginner-bridge/10_TRANSFER_TO_LAB04_CAMPUS_SERVICE_REQUEST_TH.md), [11 Test/Submit](./react-beginner-bridge/11_TEST_BUILD_PAGES_SUBMISSION_TH.md) | check/build/transfer matrix |

หากติดปัญหาให้เปิด [12 — Troubleshooting](./react-beginner-bridge/12_REACT_BEGINNER_TROUBLESHOOTING_TH.md) แล้วแก้ error แรกก่อน

## สำหรับผู้สอน

- [Classroom Website — Single-page 16:9 interactive slides](./week04-classroom-site/README.md)
- Instructor Step Script, checkpoint snapshots, solutions และ grading checklist อยู่ใน `03_Instructor_Private_Kit/` ของ Phase B1 package และไม่รวมใน Course Repository สาธารณะ

## ขอบเขต Week 04

ครอบคลุม JSX, Functional Components, Props, one-way data flow, `useState`, immutable update, React events, Controlled Form, validation, `map()`/`key`, Conditional Rendering, Responsive UI, Git/PR/build/Pages

ยังไม่ใช้ React Router, remote API, LocalStorage/database, `useEffect()` เชิงลึก, Context API หรือ authentication ซึ่งเป็นสะพานไป Week 05
