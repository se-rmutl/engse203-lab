# ENGSE203 LAB 4 — React Campus Service Request

**รูปแบบ:** งานรายบุคคลหลังเรียน  
**คะแนน:** 3.00 คะแนน ภายใต้ A2 Weekly LAB  
**CLO:** CLO3  
**การส่ง:** Pages Hub + Weekly Result + merged Pull Request + tag

**เวลาที่ออกแบบ:** การบ้านประมาณ 240 นาที ภายใต้เวลาศึกษาด้วยตนเองของรายวิชา

## โจทย์

Refactor Campus Service Request จาก Week 03 ให้เป็น React Component-based Application โดยประยุกต์ mental model จาก Pre-LAB 04 ด้วยตนเอง งานนี้ไม่ใช่การ copy/rename Study Task Board เพราะมี data contract, component contract, validation และ evidence ที่ต่างกัน

## Repository Contract

| รายการ | ค่าที่กำหนด |
|---|---|
| Repository | `engse203-student-labs-<student-id>` (repository เดียวกับ LAB01–03) |
| Branch | `lab/week-04` |
| Source | `labs/week-04/source/` |
| Evidence | `labs/week-04/evidence/` |
| Publish input | `labs/week-04/publish/` |
| Pages result | `docs/labs/week-04/` |
| Tag | `lab-04-submission-v1` |
| Node.js | `>=22.12.0` |
| Framework | React + Vite |
| Vite build output | `dist/` แล้ว import เข้า `publish/` |
| Pages | `main` / `/docs` |

## เริ่มงาน

1. เปิด Student Repository เดิมและอัปเดต `main`
2. สร้าง branch `lab/week-04`
3. คัดลอกไฟล์จาก `starter/` ไป `labs/week-04/source/`
4. กรอกข้อมูลผู้เรียนใน README/evidence

```bash
cd ~/projects/engse203-student-labs-<student-id>
git switch main
git pull
git switch -c lab/week-04
cp -R <course-repo>/labs/week-04-react-components-state/lab04/starter/. labs/week-04/source/
cd labs/week-04/source
nvm use
npm install
git add .
git commit -m "feat: create React project structure"
npm run dev
```

`npm run check` ควรยังไม่ผ่านใน starter และจะรายงาน requirement ที่ยังต้องทำ

## Suggested Homework Timebox — 240 นาที

| ช่วง | นาที | Definition of Done |
|---|---:|---|
| H0 Setup | 20 | unified repo/starter/install/initial commit/branch พร้อม |
| H1 Structure | 45 | component tree, initial data และ props rendering |
| H2 State | 50 | summary/filter/list/delete ทำงานด้วย immutable state |
| H3 Form | 60 | controlled form, validation, add และ feedback ทำงาน |
| H4 UX/Test | 30 | 375px/keyboard และ TC-01–TC-10 บันทึกแล้ว |
| H5 Delivery | 30 | README, build, PR, merge และ Pages |
| H6 Submit | 5 | เปิด Pages Incognito และส่ง 3 Links + 1 Tag |
| **รวม** | **240** |  |

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

ต้องมี App และ child components 6 ชื่อตามนี้เป็นอย่างน้อย

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
- LAB4-R02 มี component tree ครบ
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
- LAB4-R13 แยกไฟล์อ่านง่าย ไม่มี DOM mutation หรือ state mutation
- LAB4-R14 branch/commits/PR/README/build/Pages ครบ

## Validation

| Field | Rule |
|---|---|
| Requester Name | trim แล้วอย่างน้อย 2 ตัวอักษร |
| Request Type | ต้องเลือก |
| Location | trim แล้วไม่ว่าง |
| Details | trim แล้วอย่างน้อย 10 ตัวอักษร |
| Priority | `normal` หรือ `urgent` |

## Suggested Commit Checkpoints

```text
feat: create React project structure
feat: add reusable request components
feat: render requests with props
feat: manage request state and events
feat: add controlled request form
feat: add filter validation and feedback
style: add responsive React layout
docs: add test evidence and usage guide
build: prepare GitHub Pages deployment
```

## Test Cases ที่ต้องบันทึกใน README

| ID | Scenario | Expected Result |
|---|---|---|
| TC-01 | Initial render | initial requests/summary ถูกต้อง; console ไม่มี error |
| TC-02 | Controlled input | ทุก field เปลี่ยนตาม state |
| TC-03 | Invalid submit | ไม่เพิ่ม; error ใกล้ field |
| TC-04 | Valid submit | เพิ่ม pending; summary เพิ่ม; reset form |
| TC-05 | Filter status | เห็นเฉพาะสถานะที่เลือก |
| TC-06 | Return all | เห็นทุกสถานะ |
| TC-07 | Empty state | มีข้อความเมื่อไม่มีรายการ |
| TC-08 | Delete | ลบถูก id; summary/list เปลี่ยน |
| TC-09 | 375px | ไม่มี horizontal scroll |
| TC-10 | Keyboard | focus/label/error/feedback ใช้งานได้ |
| TC-11 | Build/preview | `npm run build` และ preview ผ่าน |
| TC-12 | Pages | Incognito โหลดหน้า/assets ครบ |

## Build, Pull Request และ Pages

Vite ใช้ relative base เพื่อให้ผลลัพธ์ทำงานภายใต้ Pages Hub path:

```js
base: './'
```

จากนั้น:

```bash
npm run check
npm run build
cd ../../..
npm run import:publish -- 04 labs/week-04/source/dist --replace
npm run build:pages
git add labs/week-04 docs
git commit -m "build: prepare GitHub Pages deployment"
git push -u origin lab/week-04
```

เปิด PR `lab/week-04 → main`, ตรวจ checklist, merge แล้วเปิด Pages Hub และ Weekly Result ใน Incognito จากนั้นสร้าง tag `lab-04-submission-v1`

## สิ่งที่ต้องส่ง

1. Pages Hub URL
2. Weekly Result URL (`/labs/week-04/`)
3. merged Pull Request URL
4. Tag `lab-04-submission-v1`
5. README/evidence ที่มีข้อมูลผู้เรียน, component tree, วิธีรัน, test evidence, screenshots, URLs และ AI disclosure

## ขอบเขต

ไม่ต้องใช้ React Router, remote API/fetch, LocalStorage/database, `useEffect()` เชิงลึก, Context/Redux/Zustand, authentication หรือ automated component testing framework
