# LAB 06 — Node.js / Express API Foundation

**สัปดาห์ที่ 6** · หน่วยที่ 3 การพัฒนาส่วนหลังและบริการ RESTful API ด้วย Node.js
**รูปแบบงาน:** รายบุคคล · **CLO:** CLO4 (หลัก) · CLO6 (รอง) · **การประเมิน:** A2 Weekly LAB

> **สัปดาห์นี้แบ่งงานเป็น 3 ระดับ** — 🏫 ทำในห้อง · 🏠 ทำที่บ้าน · ⭐ Challenge (คะแนนเพิ่ม)
> งานในห้องต้องทำให้เสร็จในคาบ ส่วนงานที่บ้านส่งภายใน 5 วันหลังคาบ

---

## เริ่มตรงไหน

| ลำดับ | ทำเมื่อไร | เปิดไฟล์ |
|---|---|---|
| 1 | ก่อนเข้าคาบ | [เอกสารประกอบการสอน](guides/ENGSE203_Week06_Teaching_Document_TH.html) **บทที่ 1–3** (Backend · Node · HTTP) |
| 2 | ในคาบ | [`lab06/LAB06_INCLASS_GUIDE_TH.md`](lab06/LAB06_INCLASS_GUIDE_TH.md) |
| 3 | ที่บ้าน | [`lab06/LAB06_TAKEHOME_GUIDE_TH.md`](lab06/LAB06_TAKEHOME_GUIDE_TH.md) |

อ่านประกอบได้ตลอด — [เอกสารประกอบการสอน Week 06](guides/ENGSE203_Week06_Teaching_Document_TH.html) (12 บท · 9 ภาพประกอบ)

---

## ภาพรวม

สร้าง **RESTful API** ด้วย Express พร้อม routing, middleware, controller/service และ endpoint ครบสำหรับ resource `requests` — เป็น back-end ให้กับแอป **Campus Service Request** ที่พัฒนามาแล้วใน Week 04–05

```
getRequests()       →  GET    /api/requests
getRequestById(id)  →  GET    /api/requests/:id
addRequest(input)   →  POST   /api/requests
deleteRequest(id)   →  DELETE /api/requests/:id
```

**API ที่สร้างสัปดาห์นี้ตรงกับฟังก์ชันใน `requestService.js` ของ Week 05 พอดีทุกเส้น** — ข้อตกลงนี้ถูกออกแบบไว้ล่วงหน้าตั้งแต่ Week 05

> **Week 06 ยังไม่เชื่อมกับ React** — สัปดาห์นี้ทดสอบ API ด้วย **Postman / Thunder Client** ก่อน
> การเชื่อม API เข้ากับแอป React อยู่ใน **Week 07** หลังจากเรียน CORS แล้ว

---

## งาน 3 ระดับ

| | ทำที่ไหน | Checkpoint | สัดส่วนคะแนน |
|---|---|---|---|
| 🏫 **In-Class** | ในห้อง ทำให้เสร็จในคาบ | CP00–CP05 · CRUD ครบ | 30% |
| 🏠 **Take-Home** | ที่บ้าน ภายใน 5 วัน | CP06–CP08 · แยกชั้น, error handling, เก็บลงไฟล์ | 70% |
| ⭐ **Challenge** | ที่บ้าน ไม่บังคับ | PUT เปลี่ยนสถานะ · query filter | +15% bonus |

---

## Checkpoint ทั้งหมด

| CP | ทำอะไร | ที่ไหน |
|---|---|---|
| **CP00** | รู้จัก API ของจริง — public API + DevTools Network + Postman | 🏫 |
| **CP01** | Hello Server — Express ตัวแรก | 🏫 |
| **CP02** | `GET /api/requests` และ `GET /:id` + 404 | 🏫 |
| **CP03** | middleware — logger + `express.json()` | 🏫 |
| **CP04** | `POST /api/requests` + validation + 201/400 | 🏫 |
| **CP05** | `DELETE /api/requests/:id` + 204/404 | 🏫 |
| **CP06** | ตรวจการแยกชั้น route / controller / service | 🏠 |
| **CP07** | error handling + notFound รวมศูนย์ | 🏠 |
| **CP08** | เก็บข้อมูลลงไฟล์ JSON + API_TEST.md + screenshot | 🏠 |

---

## สิ่งที่คาดว่าจะได้เรียนรู้

- อธิบายความต่างระหว่าง front-end กับ back-end และบทบาทของเซิร์ฟเวอร์ได้
- อธิบายโครงสร้าง HTTP request/response, method, URL และ status code ได้
- สร้าง Express application พร้อม routing และ middleware ได้
- แยกความรับผิดชอบเป็นชั้น route / controller / service ได้
- ออกแบบ endpoint ตามหลัก RESTful และเลือก status code ได้เหมาะสม
- ทดสอบ API ด้วย Postman / Thunder Client และบันทึกผลได้

---

## เริ่มทำ LAB

```bash
cd lab06/starter
npm install
npm run dev
# เปิด http://localhost:3001
```

**ตรวจงานด้วย checker**

```bash
npm run check -- --inclass               # งานในห้อง — เป้าหมาย 23/23
npm run check                            # ทั้งหมด — เป้าหมาย 25/28 (28/28 ถ้าทำ Challenge)
npm run check -- --inclass | grep TODO   # ดูเฉพาะที่ยังไม่ผ่าน
```

> checker **ยิง request จริงเข้า API** ไม่ใช่แค่อ่านโค้ด · แต่ตรวจ log ใน terminal ไม่ได้ ต้องดูด้วยตาเอง

---

## สิ่งที่ต้องส่ง

- Source code ที่รันได้ตาม README
- `evidence/API_TEST.md` บันทึกผลทดสอบจริง 9 รายการ (+ Challenge ถ้าทำ)
- Screenshot 3 ภาพใน `evidence/images/` — Postman GET 200, Postman POST 201, terminal ที่เห็น log
- Postman collection ที่ใช้ทดสอบ
- `AI_USAGE.md` กรอกครบถ้ามีการใช้ AI
- Git history ที่แสดงการทำงานอย่างต่อเนื่อง

**ส่งผ่าน**

```bash
git switch -c unit3/week-06
git add -A
git commit -m "LAB06: RESTful API ด้วย Express"
git push -u origin unit3/week-06
git tag lab-06-submission-v1 && git push origin lab-06-submission-v1
```

> **ใช้ AI ได้ แต่ต้องเป็นเจ้าของโค้ด** — ผู้สอนจะสุ่มถามจากโค้ดที่ส่ง ถ้าอธิบายไม่ได้คะแนนส่วนนั้นจะถูกทบทวน

---

## การเตรียมตัวล่วงหน้า

- ทบทวน `async/await` และ `fetch()` จาก Week 05
- ตรวจว่า **Node.js ≥ 22.12.0**, npm, Git และ VS Code พร้อมใช้งาน (`node -v`)
- ติดตั้ง **Postman** หรือส่วนขยาย **Thunder Client** ใน VS Code
- อ่าน [คู่มือการส่งงาน](../../docs/submission-guide.md)
- ดู [API contract template](../../templates/api-contract-template.md) และ [test case template](../../templates/test-case-template.md)

---

## โครงสร้างโฟลเดอร์

```
week-06-express-api-foundation/
├── lab06/
│   ├── LAB06_INCLASS_GUIDE_TH.md     ← คู่มือทำในห้อง
│   ├── LAB06_TAKEHOME_GUIDE_TH.md    ← คู่มือทำที่บ้าน + Challenge
│   ├── starter/                       ← โค้ดเริ่มต้น (มี TODO 19 จุด)
│   └── Campus_Service_API.postman_collection.json
├── guides/
│   ├── ENGSE203_Week06_Teaching_Document_TH.html   ← 12 บท · 9 ภาพ
│   ├── ENGSE203_Week06_Slides.html                 ← 25 สไลด์
│   └── ENGSE203_Week06_Slides_Deluxe.html          ← 31 สไลด์ · 12 SVG
├── live-coding/                       ← 6 หน้าจอสำหรับฉายในคาบ
└── _instructor-private/               ⚠ สำหรับผู้สอนเท่านั้น
```

---

## สำหรับผู้สอน

| ไฟล์ | ใช้ทำอะไร |
|---|---|
| [Instructor Step Script](_instructor-private/ENGSE203_Week06_Instructor_Step_Script_TH.md) | สคริปต์การสอน 300 นาที + Hint Ladder + แผนสำรอง |
| `_instructor-private/reference-solution/` | เฉลยครบทุก CP รวม Challenge (28/28) |
| `live-coding/*.html` | หน้าจอฉายทีละ checkpoint |
| `guides/*_Slides*.html` | สไลด์ 2 เวอร์ชัน — เลือกตามเวลาที่มี |

**ตรวจก่อนสอน**

```bash
cd _instructor-private/reference-solution && npm ci
node scripts/check-project.mjs | tail -5             # ต้องได้ 28/28

cd ../../lab06/starter && npm ci
node scripts/check-project.mjs --inclass | tail -3   # ต้องได้ 10/23
npm run dev                                          # ต้องเปิดได้แม้ยังไม่ทำ TODO
```

⚠ **`_instructor-private/` ต้องไม่เผยแพร่ให้นักศึกษา** — ถ้า repo เป็น public ให้ย้ายออกหรือใส่ `.gitignore`
