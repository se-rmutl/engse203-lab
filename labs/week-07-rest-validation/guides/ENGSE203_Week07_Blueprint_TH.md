# ENGSE203 Week 07 — Blueprint

**หน่วยที่ 3 · สัปดาห์ที่ 7 · เชื่อม Front-end กับ Back-end**
**CLO4 (หลัก) · CLO6 (รอง) · ทฤษฎี 1 ชม. + ปฏิบัติ 3 ชม.**
**หัวข้อ มคอ. 3.2.1 และ 3.2.2**

---

## 1. ⚠ เรื่องที่ต้องปรับก่อน — Week 06 กินเนื้อหา Week 07 ไปบางส่วน

ตอนวาง blueprint หน่วย 3 เราวางให้ validation และ error handling อยู่ Week 07 แต่**ตอนทำจริง Week 06 ทำไปแล้ว**

| หัวข้อ | วางไว้ตอนแรก | **ทำจริงแล้วที่** | Week 07 ทำอะไรต่อ |
|---|---|---|---|
| validation | Week 07 | **Week 06 CP04** | ยกระดับเป็น schema แยกไฟล์ + reuse |
| error handling | Week 07 | **Week 06 CP07** | เพิ่ม async error + custom error class |
| CORS | Week 07 | ยังไม่ทำ | ✅ ทำสัปดาห์นี้ |
| env config | Week 07 | ยังไม่ทำ | ✅ ทำสัปดาห์นี้ |
| logging (morgan) | Week 07 | มี logger เองแล้ว | ยกระดับเป็น morgan + แยก level |
| เชื่อม React | Week 07 | ยังไม่ทำ | ✅ **หัวใจของสัปดาห์นี้** |
| API contract | Week 07 | ยังไม่ทำ | ✅ ทำสัปดาห์นี้ |

**ผลที่ตามมา** — Week 07 มีเวลาเหลือมากขึ้น จึงเพิ่มเรื่องที่ควรมีแต่ไม่ได้วางไว้เดิม

| เพิ่มเข้ามา | เหตุผล |
|---|---|
| **PUT/PATCH เต็มรูปแบบ** | Week 06 เป็นแค่ challenge · CRUD ต้องครบจริงก่อนจบหน่วย |
| **loading / error state ฝั่ง React** | เป็นเรื่องที่เกิดขึ้นจริงเมื่อเรียก API ข้ามเครื่อง |
| **automated test ด้วย supertest** | CLO6 · นักศึกษาเขียน test เองไม่ใช่แค่รัน checker |

---

## 2. จุดยืนของสัปดาห์นี้

```
Week 05          Week 06              Week 07                 Week 08+
React frontend → Express API      →  เชื่อมสองฝั่ง         →  Database
(localStorage)   (memory/JSON)        (CORS + fetch จริง)      (SQLite)
     ↑                ↑                     ↑
requestService   4 endpoint         ⭐ payoff ที่ปูมา 2 สัปดาห์
```

**ประโยคแกนกลางของสัปดาห์**

> **เปลี่ยนแค่ Service Layer แล้วทั้งแอปทำงานกับ backend จริง — component ไม่ต้องแก้เลย**

นี่คือ payoff ที่เราปูมาตั้งแต่ Week 05 (สร้าง Service Layer) และ Week 06 (สร้าง endpoint ให้ตรง contract)

---

## 3. CLO และหัวข้อ มคอ.

| หัวข้อ มคอ. | เนื้อหา | CP |
|---|---|---|
| **3.2.1** | Validation, Error handling, **CORS**, **Environment Config**, **Logging** | CP01–CP04 |
| **3.2.2** | **Postman/Thunder Client**, **API Contract**, CRUD API, **เชื่อม Front-end กับ Back-end** | CP05–CP09 |

| CLO | ประเมินจาก |
|---|---|
| **CLO4** | ออกแบบ API contract · จัดการ CORS/env/error · เชื่อมสองฝั่งได้ |
| **CLO6** | เขียน test ด้วย supertest · ใช้ DevTools debug ปัญหา CORS · logging |

---

## 4. โครงสร้าง Checkpoint

**นับต่อจาก Week 06 ที่จบ CP08** — Week 07 เริ่มที่ CP09 เพื่อไม่ให้เลขซ้ำ

### 🏫 In-Class (CP09–CP12 · ทำเสร็จในคาบ)

| CP | ทำอะไร | โหมด | checkpoint ผ่านเมื่อ |
|---|---|---|---|
| **CP09** | ปัญหา CORS — ให้เห็นของจริงก่อนแก้ | I do สาธิต | เห็น error ใน Console ด้วยตา |
| **CP10** | เปิด CORS + env config (.env) | We do | React เรียก API ได้ · PORT เปลี่ยนได้ |
| **CP11** | **แก้ `requestService.js` ฝั่ง React** ครบ 4 ฟังก์ชัน | We do → You do | **แอป Campus ทำงานกับ API จริง** |
| **CP12** | loading + error state ฝั่ง React | You do | API ล่มแล้วผู้ใช้เห็นข้อความ ไม่ใช่หน้าขาว |

**จบในห้อง: เห็น full-stack เชื่อมกันทำงานจริง** — payoff ที่รอมา 2 สัปดาห์

### 🏠 Take-Home (CP13–CP16)

| CP | ทำอะไร |
|---|---|
| **CP13** | PUT/PATCH เปลี่ยนสถานะ — ทั้ง API และปุ่มใน React |
| **CP14** | logging ยกระดับ (morgan) + แยก level dev/prod |
| **CP15** | **API Contract** เอกสาร (ใช้ template ของ repo) + Postman collection ครบ |
| **CP16** | เขียน **automated test** ด้วย supertest อย่างน้อย 6 เคส |

### ⭐ Challenge

- validation แยกเป็น schema reusable (เตรียมทางไป Zod ในอนาคต)
- custom error class + async error wrapper
- retry อัตโนมัติฝั่ง React เมื่อ API ล่มชั่วคราว

---

## 5. ความท้าทายเฉพาะของสัปดาห์นี้

| ความท้าทาย | วิธีแก้ในชุดสอนนี้ |
|---|---|
| **ต้องรัน 2 process** (React 5173 + API 3001) | สอนเปิด 2 terminal · มีสคริปต์ `dev:all` ให้เป็นทางเลือก |
| **CORS เป็นนามธรรม** | ให้เห็น error จริงใน Console ก่อน แล้วค่อยแก้ (CP09 → CP10) |
| นักศึกษาอาจทำ Week 06 ไม่จบ | เตรียม **snapshot ของ Week 06 ที่สมบูรณ์** ให้เริ่มพร้อมกัน |
| โปรเจกต์ React จาก Week 05 อาจหาย/พัง | เตรียม **React starter ที่พร้อมใช้** ให้ดาวน์โหลด |
| debug ข้ามสองฝั่ง | สอนใช้ DevTools Network ดูว่า request ไปถึง API ไหม + ดู terminal ฝั่ง API |

---

## 6. ⚠ เรื่องที่ต้องตัดสินใจก่อนเริ่ม — โครงสร้าง repo ของนักศึกษา

Week 07 มี **ทั้ง API และ React** ในสัปดาห์เดียว · template ปัจจุบันมี `labKind` แค่ `web` กับ `api`

| ทางเลือก | โครง `source/` | ข้อดี | ข้อเสีย |
|---|---|---|---|
| **A · ใช้ `web`** ⭐ แนะนำ | `source/api/` + `source/frontend/` | deploy React ขึ้น Pages ได้ตามปกติ · ไม่ต้องแก้ script | โค้ดสองฝั่งอยู่ใน source เดียว |
| B · แยก 2 สัปดาห์ | `week-07-api/` + `week-07-web/` | แยกตรวจได้ชัด | นักศึกษาจัดการ 2 โฟลเดอร์ · metadata ซ้ำซ้อน |
| C · เพิ่ม `fullstack` | `source/api/` + `source/frontend/` | ตรงความจริงที่สุด | ต้องแก้ `verify-repository.mjs` อีกรอบ |

**ผมเสนอทางเลือก A** — เพราะสิ่งที่ deploy จริงคือ React และนักศึกษาไม่ต้องเรียนรู้กลไกใหม่ · API รันบนเครื่องตัวเอง ไม่ได้ deploy อยู่แล้ว

> **ข้อนี้ต้องยืนยันก่อนสร้าง starter** เพราะกระทบโครงโฟลเดอร์ทั้งหมด

---

## 7. Timeline คาบ (300 นาที)

| ช่วง | เวลา | ทำอะไร | โหมด |
|---|---|---|---|
| A · ทวน + ทฤษฎี | 0–45 | ทวน Week 06 · ทฤษฎี CORS / origin / env | สอนรวบ |
| B0 · เห็นปัญหา | 45–70 | **CP09 สาธิต CORS error ให้เห็นจริง** | I do |
| — | 70–80 | พัก | |
| B1 | 80–120 | CP10 เปิด CORS + .env | We do |
| B2 | 120–180 | **CP11 แก้ requestService — payoff!** | We → You |
| — | 180–190 | พัก | |
| B3 | 190–235 | CP12 loading + error state | You do |
| B4 | 235–265 | **ตรวจสด** + demo CP13 ให้ดู | ตรวจ + I do |
| C | 265–300 | สรุปหน่วย 3 + มอบงานบ้าน + เตรียมสอบกลางภาค | ปิดคาบ |

> **สัปดาห์ที่ 8 คือสอบกลางภาค** — ช่วงปิดคาบต้องพูดถึงขอบเขตสอบด้วย

---

## 8. ผลลัพธ์ที่จะสร้าง — 11 ชิ้น (สั่งทีละขั้น)

ลำดับเดียวกับ Week 06 · **โค้ดก่อนเสมอ** เพราะทุกอย่างอ้างอิงจากมัน

| ขั้น | ชิ้นงาน | ได้อะไร |
|---|---|---|
| **1** | **เอกสารประกอบการสอน** (HTML + SVG) | ~10 บท · CORS, origin, env, contract, การ debug ข้ามฝั่ง |
| **2** | **สไลด์** (HTML interactive) | 2 เวอร์ชันเหมือน Week 06 · มี simulate CORS |
| **3** | **Starter + Reference** | API ต่อจาก Week 06 + React ที่มี TODO ใน `requestService.js` |
| **4** | **Checker** | ยิง endpoint + ตรวจ CORS header + ตรวจโค้ด React |
| **5** | **LAB Guide In-Class** | CP09–CP12 |
| **6** | **LAB Guide Take-Home** | CP13–CP16 + Challenge + วิธีส่ง |
| **7** | **หน้าจอ live-coding** | 5–6 หน้า ตาม CP |
| **8** | **Instructor Step Script** | 300 นาที + Hint Ladder + แผนสำรอง |
| **9** | **API Contract ตัวอย่าง** | ใช้ template ของ repo · เป็นทั้งสื่อสอนและเฉลย |
| **10** | **Course repo package** | ติดตั้งลง `labs/week-07-rest-validation/` |
| **11** | **สรุปปิดหน่วย 3** | ภาพรวม Week 06+07 · เชื่อมกับสอบกลางภาค |

**ของแถมที่จะทำไปด้วย** — Postman collection อัปเดต · snapshot Week 06 สำหรับคนตามไม่ทัน · React starter สำรอง

---

## 9. สิ่งที่ยืนยันแล้วด้วยการทดสอบจริง

ก่อนวาง blueprint ผมทดสอบบน reference solution ของ Week 06 จริง

| ทดสอบ | ผล |
|---|---|
| ติดตั้ง `cors` แล้วเปิดใช้ | ✅ `Access-Control-Allow-Origin: http://localhost:5173` |
| preflight `OPTIONS` | ✅ 204 · allow-methods ครบ 6 method |
| checker เดิมยังผ่านหลังเพิ่ม CORS | ✅ 28/28 ไม่ regression |

**แปลว่าแผนทำได้จริง** ไม่ใช่วางบนกระดาษ

---

## 10. หลักการที่ยึด (ต่อเนื่องจาก Week 05–06)

1. **ต่อยอดของจริง** — ใช้ API จาก Week 06 และ React จาก Week 05 ตัวเดียวกัน
2. **ทดสอบด้วยการรันจริง** — ทุก endpoint และทุกโค้ดในเอกสารต้องรันผ่าน
3. **เห็นปัญหาก่อนแก้** — CP09 ให้เจอ CORS error ด้วยตาก่อน แล้วค่อยแก้ใน CP10
4. **ไม่เดาว่านักศึกษารู้** — CORS, origin, env เป็นของใหม่ทั้งหมด ต้องปูพื้น
5. **แบ่ง 3 ระดับ** — 🏫 ในห้อง / 🏠 ที่บ้าน / ⭐ Challenge
6. **ปิดหน่วยให้สมบูรณ์** — สัปดาห์หน้าสอบกลางภาค ต้องสรุปให้ครบ

---

## 11. ต้องยืนยัน 3 เรื่องก่อนเริ่มขั้นที่ 1

| # | เรื่อง | ตัวเลือก | ที่ผมเสนอ |
|---|---|---|---|
| 1 | โครง repo นักศึกษา (ข้อ 6) | A / B / C | **A — `labKind: web` + `source/api/` + `source/frontend/`** |
| 2 | ขอบเขต In-Class | CP09–CP12 ตามที่วาง | ตามที่วาง (จบที่ React ต่อ API ได้) |
| 3 | เพิ่ม automated test (CP16) | เอา / ไม่เอา | **เอา** — CLO6 ต้องการ และเป็นทักษะจริง |

**ถ้าเห็นด้วยทั้ง 3 ข้อ สั่ง "เริ่มขั้นที่ 1" ได้เลย** — ผมจะทำเอกสารประกอบการสอน Week 07
