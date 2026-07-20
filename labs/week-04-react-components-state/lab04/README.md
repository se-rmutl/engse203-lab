# ENGSE203 LAB 4 — React Campus Service Request

**รูปแบบ:** งานรายบุคคลหลังเรียน · **A2 Weekly LAB: 3.00 คะแนน**  
**CLO:** CLO3 · **เวลาที่ออกแบบ:** ประมาณ 240 นาที

## โจทย์

Refactor Campus Service Request จาก Week 03 ให้เป็น React Component-based Application โดยประยุกต์ mental model จาก Pre-LAB 04 ด้วยตนเอง ไม่ใช่การ copy/rename Study Task Board

## Repository Contract

| รายการ | ค่าที่กำหนด |
|---|---|
| Repository | `engse203-student-labs-<student-id>` repository เดิม |
| Branch | `lab/week-04` |
| Source | `labs/week-04/source/` |
| Evidence | `labs/week-04/evidence/` |
| Publish input | `labs/week-04/publish/` |
| Pages result | `docs/labs/week-04/` |
| Tag | `lab-04-submission-v1` |
| Node.js | `>=22.12.0` |

## เริ่มงาน

เปิด Terminal ที่ root ของ Student Repository:

```bash
git switch main
git pull origin main
git switch -c lab/week-04
cp -R ../engse203-lab/labs/week-04-react-components-state/lab04/starter/. labs/week-04/source/
npm --prefix labs/week-04/source install
npm --prefix labs/week-04/source run dev
```

`npm run check` ของ starter ควรยังไม่ผ่าน เพราะ requirement ยังไม่ถูก implement

## Suggested Homework Timebox — 240 นาที

| ช่วง | นาที | Definition of Done |
|---|---:|---|
| H0 Setup | 20 | main ล่าสุด, branch, starter และ install พร้อม |
| H1 Structure | 45 | component tree, initial data และ props rendering |
| H2 State | 50 | summary/filter/list/delete ด้วย immutable state |
| H3 Form | 60 | controlled form, validation, add และ feedback |
| H4 UX/Test | 30 | 375px/keyboard และ TC-01–TC-10 |
| H5 Delivery | 30 | evidence, metadata, build, PR และ Pages Hub |
| H6 Submit | 5 | เปิด Incognito และส่ง URL/tag |
| **รวม** | **240** | |

## Component Contract

```text
App
├── AppHeader
├── SummaryPanel
├── RequestForm
├── FilterBar
└── RequestList
    └── RequestCard
```

## Data Contract

```js
{
  id: "REQ-001",
  requesterName: "สมชาย ใจดี",
  requestType: "แจ้งซ่อม",
  location: "ห้องปฏิบัติการ 301",
  details: "เครื่องปรับอากาศไม่ทำงาน",
  priority: "normal",
  status: "pending"
}
```

- `priority`: `normal | urgent`
- `status`: `pending | in-progress | completed`
- `filter`: `all | pending | in-progress | completed`

## Requirements

- LAB4-R01 ใช้ case/data contract ที่กำหนด
- LAB4-R02 มี App และ child components 6 ชื่อครบ
- LAB4-R03 ใช้ Props อย่างน้อย 2 จุดและ callback Child → Parent
- LAB4-R04 Summary คำนวณจาก requests จริง
- LAB4-R05 ทุก field เป็น Controlled Form
- LAB4-R06 invalid ไม่เพิ่มและแสดง error ใกล้ field
- LAB4-R07 valid submit เพิ่ม pending request แบบ immutable และ reset
- LAB4-R08 filter ทุกสถานะทำงาน
- LAB4-R09 list ใช้ `map()` และ `request.id` เป็น key
- LAB4-R10 delete ส่ง id ผ่าน callback และใช้ `filter()`
- LAB4-R11 มี empty/error/success conditional states
- LAB4-R12 responsive 375px/desktop และ accessible ขั้นพื้นฐาน
- LAB4-R13 แยกไฟล์อ่านง่าย ไม่มี DOM/state mutation
- LAB4-R14 branch/commits/PR/evidence/build/Pages/tag ครบ

## Validation

| Field | Rule |
|---|---|
| Requester Name | trim แล้วอย่างน้อย 2 ตัวอักษร |
| Request Type | ต้องเลือก |
| Location | trim แล้วไม่ว่าง |
| Details | trim แล้วอย่างน้อย 10 ตัวอักษร |
| Priority | `normal` หรือ `urgent` |

## Test Cases

| ID | Scenario | Expected Result |
|---|---|---|
| TC-01 | Initial render | requests/summary ถูกต้อง; console ไม่มี error |
| TC-02 | Controlled input | ทุก field เปลี่ยนตาม state |
| TC-03 | Invalid submit | ไม่เพิ่ม; error ใกล้ field |
| TC-04 | Valid submit | เพิ่ม pending; summary เพิ่ม; reset form |
| TC-05 | Filter status | เห็นเฉพาะสถานะที่เลือก |
| TC-06 | Return all | เห็นทุกสถานะ |
| TC-07 | Empty state | มีข้อความเมื่อไม่มีรายการ |
| TC-08 | Delete | ลบถูก id; summary/list เปลี่ยน |
| TC-09 | 375px | ไม่มี horizontal scroll |
| TC-10 | Keyboard | focus/label/error/feedback ใช้งานได้ |
| TC-11 | Build/preview | check/build/preview ผ่าน |
| TC-12 | Pages | Incognito โหลดหน้า/assets ครบ |

## Build, Publish และ Verify

Starter ใช้ `base: './'` และ build ไป `dist/` ไม่ต้องใส่ชื่อ repository ใน Vite config

```bash
npm --prefix labs/week-04/source run check
npm --prefix labs/week-04/source run build
npm run import:publish -- week-04 labs/week-04/source/dist
npm run build:pages
```

ใส่ screenshots/test/reflection ใน `labs/week-04/evidence/` และแก้ metadata:

```json
{
  "status": "ready",
  "sourceOrigin": "course-starter",
  "submissionTag": "lab-04-submission-v1",
  "testStatus": "pass"
}
```

ตรวจและ push:

```bash
npm run verify:lab -- week-04
git add .
git commit -m "feat(week-04): build React campus service request"
git push -u origin lab/week-04
```

เปิด PR `lab/week-04 → main`, ใส่ PR URL ใน metadata, เปลี่ยน status เป็น `submitted`, build/verify/push แล้ว merge

```bash
git switch main
git pull origin main
git tag lab-04-submission-v1
git push origin lab-04-submission-v1
```

## สิ่งที่ต้องส่ง

1. Pages Hub URL
2. LAB04 Result URL ที่ `.../labs/week-04/`
3. Pull Request URL ของ `lab/week-04 → main` ที่ merge แล้ว
4. Tag `lab-04-submission-v1`

ใน repository ต้องมี Evidence/README ที่อธิบาย component tree, state/props/callback,
ผล TC-01–TC-12, screenshots และ References & AI Assistance

## ขอบเขต

ไม่ใช้ React Router, remote API/fetch, LocalStorage/database, `useEffect()` เชิงลึก, Context/Redux/Zustand, authentication หรือ automated component testing framework

อ่าน workflow กลางที่ [Weekly Workflow](../../../docs/student-repository/WEEKLY_WORKFLOW_AND_SUBMISSION_TH.md)
