# ENGSE203 LAB 4 — React Campus Service Request

**รูปแบบ:** งานรายบุคคลหลังเรียน  
**คะแนน:** 3.00 คะแนน ภายใต้ A2 Weekly LAB  
**CLO:** CLO3  
**การส่ง:** GitHub Repository + merged Pull Request + GitHub Pages

**เวลาที่ออกแบบ:** การบ้านประมาณ 240 นาที ภายใต้เวลาศึกษาด้วยตนเองของรายวิชา

## โจทย์

Refactor Campus Service Request จาก Week 03 ให้เป็น React Component-based Application โดยประยุกต์ mental model จาก Pre-LAB 04 ด้วยตนเอง งานนี้ไม่ใช่การ copy/rename Study Task Board เพราะมี data contract, component contract, validation และ evidence ที่ต่างกัน

## Repository Contract

| รายการ | ค่าที่กำหนด |
|---|---|
| Repository | `engse203-lab04-<student-id>` |
| Branch | `feature/react-service-request` |
| Node.js | `>=22.12.0` |
| Framework | React + Vite |
| Build output | `docs/` |
| Pages | `main` / `/docs` |

## เริ่มงาน

1. สร้าง GitHub repository ชื่อตาม contract โดยให้มี README เริ่มต้น
2. Clone ผ่าน SSH และคัดลอกไฟล์จาก `starter/` ไปที่ root ของ repository ตนเอง
3. แก้ `STUDENT-ID` ใน `package.json`, `vite.config.js` และ README

```bash
git clone git@github.com:<username>/engse203-lab04-<student-id>.git
cd engse203-lab04-<student-id>
cp -R <course-repo>/labs/week-04-react-components-state/lab04/starter/. .
nvm use
npm install
git add .
git commit -m "feat: create React project structure"
git switch -c feature/react-service-request
npm run dev
```

`npm run check` ควรยังไม่ผ่านใน starter และจะรายงาน requirement ที่ยังต้องทำ

## Suggested Homework Timebox — 240 นาที

| ช่วง | นาที | Definition of Done |
|---|---:|---|
| H0 Setup | 20 | repo/starter/install/initial commit/feature branch พร้อม |
| H1 Structure | 45 | component tree, initial data และ props rendering |
| H2 State | 50 | summary/filter/list/delete ทำงานด้วย immutable state |
| H3 Form | 60 | controlled form, validation, add และ feedback ทำงาน |
| H4 UX/Test | 30 | 375px/keyboard และ TC-01–TC-10 บันทึกแล้ว |
| H5 Delivery | 30 | README, build, PR, merge และ Pages |
| H6 Submit | 5 | เปิด Pages Incognito และส่ง 3 URLs |
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

ก่อน build แก้ `base` เป็นชื่อ repository จริง:

```js
base: '/engse203-lab04-<student-id>/'
```

จากนั้น:

```bash
npm run check
npm run build
git add .
git commit -m "build: prepare GitHub Pages deployment"
git push -u origin feature/react-service-request
```

เปิด PR ไป `main`, ตรวจ checklist, merge แล้วตั้ง GitHub Pages เป็น `main` / `/docs` และเปิด URL ใน Incognito

## สิ่งที่ต้องส่ง

1. Repository URL
2. merged Pull Request URL
3. GitHub Pages URL
4. README ที่กรอกข้อมูลผู้เรียน, component tree, วิธีรัน, test evidence, screenshots, URLs และ AI disclosure ครบ

## ขอบเขต

ไม่ต้องใช้ React Router, remote API/fetch, LocalStorage/database, `useEffect()` เชิงลึก, Context/Redux/Zustand, authentication หรือ automated component testing framework
