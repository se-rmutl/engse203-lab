# Changelog

## v6.1.0 — เชื่อมสื่อการสอนบนเว็บเข้ากับ LAB repository

**ปัญหาที่แก้** — README ของ LAB ลิงก์ไฟล์ `.html` ใน `guides/` แบบ relative
ซึ่ง **GitHub ไม่ render HTML** นักศึกษาที่กดจะเห็นเป็นโค้ดดิบ เปิดใช้งานจริงไม่ได้

- เปลี่ยนลิงก์สื่อทั้งหมดใน README ให้ชี้ **GitHub Pages** (`se-rmutl.github.io/engse203`) ซึ่งเปิดได้ทันที
- เพิ่มหัวข้อ **"สื่อการสอนออนไลน์"** ใน README ของ LAB 05, 06, 07 พร้อมตารางหน้าจอ Live-Coding ครบทุก checkpoint
- เพิ่มตารางรวมสื่อทั้งรายวิชาใน README หลัก (สไลด์ · เอกสารประกอบ · live-coding แยกรายสัปดาห์)
- เติมไฟล์ live-coding ลง `guides/` ของแต่ละ LAB เพื่อให้ clone ไปเปิดออฟไลน์ได้
  - LAB 05 เพิ่ม 9 ไฟล์ (5A 4 · 5B 5) · LAB 06 เพิ่ม 6 ไฟล์ · LAB 07 เพิ่ม 4 ไฟล์
- ทุกลิงก์ตรวจแล้วว่าชี้ไฟล์ที่มีอยู่จริงบนเว็บไซต์รายวิชา

## v6.0.0 — ปรับผังสัปดาห์ให้ตรง มคอ. ฉบับ v2 (breaking)

**เหตุผล** — โครงสร้างหน่วยเรียนฉบับ v2 กำหนดหน่วยที่ 3 เป็น **สัปดาห์ที่ 6–7** (เดิมวางไว้ 6–8)
และสอบกลางภาค **สัปดาห์ที่ 8** (เดิม 9) ทำให้สัปดาห์ที่ 8 เป็นต้นไปเลื่อนลง 1 สัปดาห์ทั้งหมด

- **ลบ** `labs/week-08-api-integration/` — เนื้อหา (API contract, CORS, front-end integration) รวมเข้า `week-07-rest-validation` แล้ว
- **เปลี่ยนชื่อโฟลเดอร์** ให้ตรงสัปดาห์จริง (เลื่อนลง 1 ตั้งแต่สัปดาห์ 8)
  - `week-09-midterm` → `week-08-midterm`
  - `week-10-sqlite-crud` → `week-09-sqlite-crud`
  - `week-11-mongodb-mongoose` → `week-10-mongodb-mongoose`
  - `week-12-fullstack-integration` → `week-11-fullstack-integration`
  - `week-13-testing-debugging` → `week-12-testing-debugging`
  - `week-14-quality-security` → `week-13-quality-security`
  - `week-15-team-sprint-1` → `week-14-team-sprint-1`
  - `week-16-team-sprint-2-demo` → `week-15-team-sprint-2-demo`
  - `week-17-review` → `week-16-review` · `week-18-final` → `week-17-final`
- เลข LAB เลื่อนตาม — LAB 08 SQLite (สัปดาห์ 9) ถึง LAB 14 Team Sprint 2 (สัปดาห์ 15)
- อัปเดตตารางและแผนผังโฟลเดอร์ใน README หลัก
- ⚠ โฟลเดอร์ที่เปลี่ยนชื่อทั้งหมดยังเป็นโครง README เท่านั้น ยังไม่มีนักศึกษาใช้งาน จึงปรับได้โดยไม่กระทบใคร

## v5.3.0 — เพิ่มสไลด์บทนำ API Foundations

- เพิ่ม `ENGSE203_API_Foundations_Slides.html` (20 สไลด์ · 5 SVG) เป็นบทนำก่อนเข้า Week 06
- เติมช่องว่างที่ขาดไป: ทำไมต้องมี API · ทำไมเลือก API เป็นหลังบ้าน · REST มาจากไหน · RESTful แปลว่าอะไร
- ครอบคลุม 6 หลักการของ REST, Richardson Maturity Model, และเทียบ SOAP/REST/GraphQL/gRPC
- มี simulator ให้ลองแปลงความต้องการเป็น endpoint (รวมกรณียาก "ยืมหนังสือ" → `POST /loans`)
- อัปเดต Instructor Step Script Week 06 ให้มีช่วงบทนำ 30 นาที พร้อมจังหวะการเล่าและแผนตัดเวลา

## v5.2.0 — Week 07 เชื่อม Front-end กับ Back-end (ปิดหน่วยที่ 3)

- เพิ่มชุดสอน Week 07 ครบ: เอกสารประกอบการสอน 10 บท (7 ภาพ SVG), สไลด์ 23 หน้า, หน้าจอ live-coding 4 หน้า
- starter และ reference มีทั้ง `api/` (Express) และ `frontend/` (React) ในโฟลเดอร์เดียว
- เพิ่ม `check-week07.mjs` ตรวจทั้งสองฝั่ง — 36 รายการ แยก 🏫 ในห้อง / 🏠 ที่บ้าน / ⭐ challenge
- เนื้อหา: CORS, preflight, environment config, API client layer, loading/error state
- เพิ่ม `API_CONTRACT.md` ฉบับสมบูรณ์เป็นทั้งสื่อสอนและเฉลย
- เพิ่ม automated test ด้วย `node:test` + supertest (CP16) — นักศึกษาเขียนเอง 6 เคส
- `requestService.js` เปลี่ยนเป็นเรียก API โดยคง signature เดิมครบ — component ไม่ต้องแก้เลย
- ปิดหน่วยที่ 3: Week 06 สร้าง API ให้ทำงานได้ · Week 07 ทำให้ทั้งระบบใช้งานได้จริง

## v5.1.0 — Week 06 Node.js/Express RESTful API Foundation

- เพิ่มชุดสอน Week 06 ครบ: เอกสารประกอบการสอน 12 บท (9 ภาพ SVG), สไลด์ 2 เวอร์ชัน, หน้าจอ live-coding 6 หน้า
- เพิ่ม starter (TODO 19 จุด) และ reference solution ของ Campus Service API ด้วย Express 5
- เพิ่ม `check-project.mjs` ที่ยิง endpoint จริงด้วย supertest — 28 รายการ แยก 🏫 ในห้อง / 🏠 ที่บ้าน / ⭐ challenge
- แบ่งงานเป็น 3 ระดับ: In-Class (CP00–CP05 ทำเสร็จในคาบ), Take-Home (CP06–CP08), Challenge (คะแนนเพิ่ม)
- เพิ่ม Postman collection, API_TEST template และ AI_USAGE template
- endpoint ออกแบบให้ตรงกับ `requestService.js` ของ Week 05 เพื่อเชื่อมกับ React ใน Week 07
- เพิ่ม Instructor Step Script 300 นาที พร้อม Hint Ladder และแผนสำรอง

## v5.0.0 — Week 05 React Routing, Data Fetching & Browser Storage

- แยก Week 05 เป็น 2 คาบ: 5A Read Path (routing + data fetching) และ 5B Write Path (storage + recovery)
- เพิ่มเอกสารประกอบการสอน 5A/5B, สไลด์, Pre-LAB, LAB Guide, checkpoint cards และหน้าจอ live-coding
- เพิ่ม checker v2 (133 รายการ) ที่ตรวจพฤติกรรมจริงด้วย vitest + Testing Library
- ออกแบบ Service Layer ให้เปลี่ยนแหล่งข้อมูลได้โดยไม่แก้ UI — ปูทางไป REST API ใน Week 06–08
- LAB 05 เป็นงานชิ้นเดียว ส่งครั้งเดียวหลังจบคาบ 5B

## v4.0.0 — Unified Student Repository LAB01–04

- เปลี่ยน LAB รายบุคคลเป็นหนึ่ง Student Repository ตลอดรายวิชา
- กำหนด branch `lab/week-NN`, source/evidence/publish และ Pages Hub contract เดียวกัน
- เพิ่มคู่มือสร้าง Student Repository จาก Template ก่อน LAB01 สำหรับรุ่นถัดไป
- เพิ่ม migration workflow สำหรับรุ่นปัจจุบันที่มี repo LAB01–03 แยกแล้ว
- ปรับ LAB01–04, Vite build, PR, tag และ submission ให้สอดคล้องกัน
- Student solution ยังคงแยกจาก Course Repository สาธารณะ

## v3.1.0 — Week 04 React Guided Practice & LAB 4

- เพิ่ม Pre-LAB 04 แบบ CP00–CP07 รวม 240 นาที สำหรับผู้เริ่ม React
- เพิ่ม Study Task Board starter, checkpoint snapshots, instructor script และ verified solution
- เพิ่ม LAB 4 Campus Service Request starter, requirements, grading checklist, verifier และ instructor solution
- เชื่อม JSX, components, props, state, events, controlled form, list/filter/delete, responsive UI และ GitHub Pages โดยไม่ล้ำ Week 05
- ปรับ README หลักและ Week 04 hub ให้แยก guided practice ออกจาก independent homework ชัดเจน

## v3.0.0 — Unified Setup Guide: Node.js 22+, GitHub SSH & VS Code

- เพิ่ม `docs/setup/` เป็น Setup Hub แยกเส้นทางชัดเจนสำหรับ macOS และ Windows 11 + WSL2
- กำหนด baseline ของรายวิชาเป็น Node.js `>=22.12.0`; เพิ่ม `.nvmrc` และ `engines.node` ใน starter ของ LAB 02
- เพิ่มคู่มือ Git commit identity, SSH key แบบตั้งชื่อไฟล์, GitHub account, multiple accounts และการวิเคราะห์ permission error
- เพิ่มคู่มือ VS Code: GitHub sign-in, Source Control, Remote - WSL และ extension IDs ที่ใช้ในรายวิชา
- เพิ่ม `scripts/verify-setup.mjs` และ Verification Checklist สำหรับตรวจ environment และทดสอบ clone/commit/push จริง
- ปรับ README และ LAB 01–02 ให้ชี้ไปยัง Setup Guide v3

## v2.0.0 — WSL 2, Development Environment & GitHub SSH Setup

- เพิ่ม **Part 1**: คู่มือติดตั้งและตั้งค่า Windows 11 + WSL 2 + Ubuntu 24.04 LTS
- เพิ่ม **Part 2**: รายการโปรแกรม checklist ขั้นตอนติดตั้ง macOS/WSL, Node.js LTS, VS Code extensions, Git และ GitHub SSH key
- ปรับมาตรฐาน Windows ของรายวิชาให้ใช้ VS Code Remote - WSL และ Ubuntu WSL สำหรับ Node.js, npm, Git และ SQLite
- ปรับคู่มือ Cross-platform Setup เป็น quick reference ที่เชื่อมไปยังเอกสาร Setup v2
- ปรับ LAB 01 ให้ใช้ workspace ที่เหมาะสมกับ macOS และ Ubuntu WSL และใช้ GitHub remote แบบ SSH
- เพิ่มแนวทางความปลอดภัยของ SSH key, line ending และการเก็บ source code ใน Linux filesystem

## v0.1.0 — Initial course repository

- สร้างโครงสร้าง Repository สำหรับ ENGSE203
- เพิ่ม README ภาพรวมรายวิชาและแผน LAB สัปดาห์ที่ 1–18
- เพิ่มใบงาน LAB 01 แบบละเอียด พร้อม starter files และ checklist
- เพิ่มเอกสารมาตรฐานการส่งงาน, Cross-platform setup และแนวปฏิบัติด้าน AI
- เพิ่ม placeholder README สำหรับ LAB/กิจกรรมที่เหลือ เพื่อทยอยเผยแพร่รายละเอียดรายสัปดาห์
