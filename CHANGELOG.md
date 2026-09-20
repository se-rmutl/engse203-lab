# Changelog

## v7.2.0 — เพิ่ม playground-seed.sql สำหรับ CP17

**เหตุผล** — CP17 ให้นักศึกษารัน `SELECT * FROM requests` บน SQL playground (sqlime.org) แต่ playground เริ่มเป็นฐานข้อมูลเปล่า · ถ้ายังไม่สร้างตารางจะได้ `no such table: requests` · และ `schema.sql` ใน starter เป็น TODO (ยังเขียนไม่เสร็จ) จึงใช้ตอน CP17 ไม่ได้

- เพิ่ม **`lab09/starter/playground-seed.sql`** — ไฟล์สำเร็จรูป คัดลอกวางใน playground แล้วกด Run ได้ทันที
  - มี CREATE TABLE 2 ตาราง + INSERT ข้อมูลตัวอย่าง (users 4 · requests 5) + SELECT ทดสอบ
  - ทดสอบแล้วว่าทั้ง 3 คำสั่งใน CP17 (SELECT *, เลือกคอลัมน์, AS) รันได้จริง
- เพิ่ม **ขั้น ⓪ เตรียม playground** ใน LAB09 In-Class Guide ก่อนหัวข้อ ① SELECT
  - อธิบายว่าต้องวาง seed ก่อน และทำไมต้องวางใหม่ทุกครั้งที่เปิด playground
- เพิ่มกล่องเตือนในสไลด์ CP17 + ปรับกล่องข้อควรระวังในเอกสาร (หัวข้อ 0.4)
- เพิ่ม checklist ผ่าน CP17: ต้องวาง seed เห็น 5 แถวก่อน
- ก็อป playground-seed.sql ไว้ใน reference ด้วย (ผู้สอนใช้ฉาย/แจก)
- หมายเหตุ: ทางสำรองออฟไลน์ (try.mjs ในเอกสาร 0.4) มีเนื้อหา CREATE+INSERT เดียวกันอยู่แล้ว

## v7.1.0 — เพิ่ม footer/nav/hud ที่ขาดใน Live-Coding Week 10

**เหตุผล** — Live-Coding Week 10 ทั้ง 5 ไฟล์ขาดส่วนท้ายที่ Week 07 มี · เกิดตอนดึง template โดยตัดที่ตำแหน่ง `<script>` จึงทิ้ง footer + nav + hud ที่อยู่ก่อนหน้าไปโดยไม่ตั้งใจ

- เพิ่ม **footer** — ชื่อ CP + ลิงก์ไปบทในเอกสารประกอบการสอน
- เพิ่ม **nav** — ปุ่มข้ามระหว่าง CP26–CP30 ไฮไลต์ตำแหน่งปัจจุบัน
- เพิ่ม **hud** — ปุ่ม A− / A+ / เต็มจอ (JS มีอยู่แล้ว แค่ขาดปุ่ม)
- ตรวจแล้ว: ทั้ง 5 ไฟล์ footer/nav/hud ครบ · ปุ่มข้าม CP ชี้ไฟล์จริง · div ปิดสมดุล · โครงตรงกับ Week 07
- ก็อปตรงกันทั้ง repo และเว็บ

## v7.0.0 — จัดเลข LAB ให้ตรงเลขสัปดาห์ และเปลี่ยนชื่อโฟลเดอร์ให้ตรงเนื้อหา (breaking)

**เหตุผล** — เลข LAB เดิมเลื่อนจากเลขสัปดาห์เพราะมีสอบกลางภาคคั่น (สัปดาห์ 9 = LAB08) ทำให้สับสน · และชื่อโฟลเดอร์สัปดาห์ 10–11 ยังเป็นแผนเก่า (MongoDB) ทั้งที่เนื้อหาเปลี่ยนแล้ว

### เปลี่ยนชื่อโฟลเดอร์ให้ตรงเนื้อหาจริง

| เดิม | ใหม่ |
|---|---|
| `week-09-sqlite-crud` | `week-09-sql-fundamentals` |
| `week-10-mongodb-mongoose` | `week-10-node-database` |
| `week-11-fullstack-integration` | `week-11-mongodb-fullstack` |

### เลข LAB = เลขสัปดาห์ (ทุกที่)

- สัปดาห์ 9: `lab08/` → `lab09/` · `LAB08_*_GUIDE` → `LAB09` · tag `lab-08` → `lab-09`
- สัปดาห์ 10: `lab09/` → `lab10/` · `LAB09_*_GUIDE` → `LAB10` · tag `lab-09` → `lab-10`
- สัปดาห์ 11–15: แก้เลข LAB ใน README ให้ = เลขสัปดาห์ (เดิมเลื่อน 1)
- CP ไม่เปลี่ยน (ยังนับต่อเนื่อง CP17–CP34)

### เพิ่ม Live-Coding ครบ (ข้อที่เคยขาด)

- Week 10 มี Live-Coding 5 ไฟล์ครบเหมือน Week 07 — CP26–CP30
- รูปแบบเดียวกับ Week 06/07 (step · say · warn · check · copy)

### ตรวจแล้วทั้งหมด

- checker: W09 ref 30/30 · W10 ref 31/31 · W10→W07 36/36 · หลังเปลี่ยนชื่อทุกอย่างยังผ่าน
- README ทุกสัปดาห์: สัปดาห์ = LAB = ชื่อโฟลเดอร์ ตรงกันหมด
- ตารางสื่อการสอน + ปุ่มลิงก์ทุกแถวตรงสัปดาห์
- tag submission · branch · path ในคู่มือและ step script ตรงกันหมด
- ไม่มีเลข LAB เก่าหรือชื่อโฟลเดอร์เก่าตกค้าง (ยกเว้นใน CHANGELOG ที่เป็นประวัติ)

## v6.8.0 — แก้ SVG · เพิ่ม SQL playground · เติม Week 10 ให้ครบ

### ① แก้ภาพ SVG ทุกไฟล์

- **หัวลูกศรวาดผิดทิศ 5 จุด** — `orient="auto"` หมุน marker ให้ +X ตรงกับทิศเส้น แต่เดิมวาดชี้ลง/ขึ้น จึงเรนเดอร์เป็น `<` แทนลูกศร
  - แก้ทุก marker ให้วาดชี้ +X แล้วปรับ `refX`/`refY` ตาม
- **เส้นทับข้อความ 5 จุด** — ที่ชัดที่สุดคือเส้นจาก Service ไป `campus.db` พาดผ่าน `api/src/services/`
  - เปลี่ยนเป็นเส้นหักมุม และขยับกล่อง `campus.db` ลงให้พ้นป้ายชื่อโฟลเดอร์
  - ขยับป้าย `FK` ใน W09 ให้พ้นเส้นประ
- ตรวจด้วยสคริปต์ทั้ง 4 ไฟล์ แล้ว render เป็นภาพยืนยันด้วยตา

### ② Week 09 — เพิ่มข้อมูล SQL playground

- หัวข้อ 0.4 ในเอกสาร + สไลด์ 2 หน้า — **ระบุเว็บที่ใช้ฟรีได้จริง**
  - **⭐ sqlime.org** (แนะนำ) — SQLite แท้ ทำงานในเบราว์เซอร์ ข้อมูลไม่ออกจากเครื่อง โหลดไฟล์ `.db` ได้
  - sqliteonline.com · db-fiddle.com (สำรอง)
  - ระบุว่า **W3Schools ไม่เหมาะ** เพราะไม่ใช่ SQLite
- เพิ่ม **ทางสำรองแบบออฟไลน์** — `try.mjs` ใช้ `node:sqlite` กับ `:memory:` ลอง SQL ได้โดยไม่ต้องใช้เน็ต
- อัปเดต LAB08 In-Class Guide ให้ตรงกัน
- สไลด์ 57 → **59 หน้า**

### ③ Week 10 — เติมของที่ขาด

- **เขียน README ใหม่ทั้งไฟล์** — เดิมยังเป็นโครงเก่าเรื่อง MongoDB จึงไม่มีลิงก์ไปหา LAB Guide ที่มีอยู่แล้ว
- **เพิ่ม Live-Coding 5 ไฟล์** — CP26 เปิด DB · CP27 กับดัก path · CP28 JOIN · CP29 แปลงชื่อเป็น id · CP30 CRUD + พิสูจน์ว่าไม่พัง
- เพิ่ม `_instructor-private/README.md` พร้อมรายการไฟล์สำรองที่ต้องเตรียม
- อัปเดตตารางสื่อและชื่อ LAB ใน README หลัก

## v6.7.0 — เพิ่มภาพประกอบ Week 09 และสคริปต์สร้างฐานข้อมูล Week 10

**เหตุผล** — Week 09 มีแต่ตัวหนังสือ จินตนาการยาก · และพบช่องว่างว่า `schema.sql` ที่ Week 09 สร้าง ไม่ถูกพูดถึงใน Week 10 เลย

### Week 09 — เพิ่มภาพและขอบเขต

- **SVG ใหม่ 2 ภาพ**
  - *ฐานข้อมูลประกอบด้วยอะไร* — Database → Table → Column/Row → Value เป็นลำดับชั้น พร้อม Primary/Foreign Key
  - *แผนผัง `campus.db` ฉบับเต็ม* — 2 ตาราง 12 คอลัมน์ พร้อมชนิดและ constraint ครบ **เป็นข้อกำหนดของงานที่ต้องส่ง**
- **หัวข้อใหม่ "ขอบเขตของสัปดาห์นี้"** — ตารางเทียบว่าเรียนอะไร ข้ามอะไร (Normalization, transaction, trigger, view ไว้เทอมหน้า)
  - ย้ำว่า SQL ที่ต้องเขียนได้จริงมีแค่ **6 คำสั่ง**
- เพิ่มสไลด์ 5 หน้า — ขอบเขต · โครงสร้างฐานข้อมูล · เทียบกับ Excel · แผนผังที่ต้องส่ง · การส่งมอบให้ W10
- สไลด์ 52 → **57 หน้า** · เอกสารมี **6 ภาพ**

### Week 10 — เพิ่มสคริปต์สร้างฐานข้อมูล

- **`api/scripts/setup-db.mjs`** ใหม่ พร้อม `npm run db:setup` และ `npm run db:reset`
  - รองรับ `--force` ล้างข้อมูลเริ่มใหม่ · `DB_FILE=` สร้างฐานข้อมูลทดสอบแยก
  - **รายงาน Foreign Key ให้ด้วย** — ถ้า schema จาก W09 ไม่ครบจะรู้ทันที ไม่ต้องรอไปพังตอน CP29
  - ใช้ `fileURLToPath(import.meta.url)` ตามบทเรียนเรื่อง path
- เพิ่มหัวข้อ 3.5 ในเอกสาร — ทำไมต้องมีสคริปต์ทั้งที่ `loadSeed()` สร้างให้อยู่แล้ว · ควร commit `campus.db` ไหม
- เพิ่มสไลด์ 2 หน้า — รับของจาก W09 (พร้อมทางแก้ถ้าไม่มี) · `npm run db:setup`
- สไลด์ 47 → **49 หน้า**

### บทบาทของสองสัปดาห์ (ชัดเจนขึ้น)

| | Week 09 | Week 10 |
|---|---|---|
| ทำอะไร | **ออกแบบและสร้าง** ฐานข้อมูล | **ใช้** ฐานข้อมูลจากโค้ด |
| แตะโค้ด | ไม่เลย | `requestService.js` ไฟล์เดียว |
| ส่งมอบ | `campus.db` · `schema.sql` · `queries.sql` | API ที่ใช้ฐานข้อมูลจริง |

### ทดสอบแล้ว

- `npm run db:setup` ทั้ง 3 โหมด (ปกติ · `--force` · `DB_FILE=`) ทำงานถูกต้อง
- checker Week 10 ยัง **31/31** · Week 07 ยัง **36/36**
- JS ของสไลด์ทั้งสองไฟล์ syntax ถูกต้อง

## v6.6.0 — เพิ่มสื่อ interactive และ SVG อธิบายลำดับชั้น

**เหตุผล** — เราเผยแพร่เป็นเว็บ จึงควรใช้ประโยชน์จากภาพและสื่อโต้ตอบที่หนังสือทำไม่ได้

### Interactive ใหม่ 4 ตัว

| สื่อ | อยู่ที่ | ทำอะไร |
|---|---|---|
| **Layer Tracer** | W10 | กดทีละขั้นดูคำขอเดินผ่าน 7 ชั้น พร้อม**ชื่อไฟล์จริง**และโค้ดที่ทำงานในชั้นนั้น |
| **Query Stepper** | W09 | กดดู `SELECT` ทำงานทีละขั้น FROM → WHERE → ORDER BY → SELECT พร้อมตารางที่แถวหายไปจริง |
| **JOIN visual** | W09 | กดจับคู่ทีละแถว เห็นว่า `ON` ทำงานอย่างไร และทำไมชื่อซ้ำในผลลัพธ์แต่ไม่ซ้ำในฐานข้อมูล |
| **Injection compare** | W10 | ส่งค่าอันตรายเข้าไป เห็น SQL ที่ได้จริงทั้งแบบต่อ string และ parameterized เทียบกัน |

### SVG ใหม่ 4 ภาพ

- **W10 ภาพที่ 2** — ลำดับชั้นหลังบ้านเทียบกับโฟลเดอร์/ไฟล์จริง พร้อมตาราง "แต่ละชั้นรู้อะไร ไม่รู้อะไร"
- **W09 ภาพที่ 2** — ลำดับที่เขียนกับลำดับที่ฐานข้อมูลทำงานจริง (และเหตุผลที่ใช้ alias ใน WHERE ไม่ได้)
- **W09 ภาพที่ 4** — กลไกการจับคู่ของ JOIN
- **W09** — ภาพ update anomaly ในสไลด์ (แก้ชื่อไม่ครบแล้วเป็นอย่างไร)

### อื่น ๆ

- สไลด์ W09 49 → **52 หน้า** · W10 44 → **47 หน้า**
- เพิ่มหัวข้อ 1.3–1.4 ในเอกสาร W10 — ลำดับชั้นและตารางว่าแต่ละชั้นรู้/ไม่รู้อะไร
- **ติดตั้ง Week 10 ลง repo ครบชุด** (`week-10-mongodb-mongoose/` — ชื่อโฟลเดอร์จะเปลี่ยนตอนจบสัปดาห์ 11)
- ทดสอบแล้ว: JS syntax ถูกต้องทั้งสองไฟล์ · ตรรกะ Query Stepper ตรงกับผล SQL จริง

## v6.4.0 — Week 09 ฐานข้อมูลเชิงสัมพันธ์และภาษา SQL (เริ่มหน่วยที่ 4)

- เพิ่มชุดสอน Week 09 ครบ: เอกสารประกอบการสอน 10 บท, สไลด์ 49 หน้า (10 บท), LAB Guide 2 ฉบับ, Step Script 300 นาที
- starter และ reference ใช้ `node:sqlite` ที่มากับ Node 22 — **ไม่ต้อง `npm install` อะไรเลย**
- เพิ่ม `check-week09.mjs` ตรวจโครงสร้างตาราง ข้อมูล และ constraint — 30 รายการ
- **data model 2 ตาราง** — `users` และ `requests` เชื่อมด้วย Foreign Key เพื่อสอนความสัมพันธ์ตาม มคอ. 4.1.1
- ⚠ **สัปดาห์นี้ไม่แตะโค้ด Node เลย** — เป็น SQL ล้วน เพื่อให้คล่องก่อนไปต่อ Node ในสัปดาห์ที่ 10
  - เหตุผล: นักศึกษายังไม่เคยเรียน SQL มาก่อน (จะได้เรียนวิชาฐานข้อมูลเทอมหน้า)
  - ถ้าสอน SQL + แนวคิดเชิงสัมพันธ์ + การต่อ Node พร้อมกัน จะเป็น 3 เรื่องใหม่ซ้อนกันในคาบเดียว
- เขียน README ของ `week-09-sqlite-crud` ใหม่ให้ตรงแผน (เดิมระบุว่า "SQL CRUD ร่วมกับ Node.js")
- สัปดาห์นี้ส่งมอบ `campus.db` · `schema.sql` · `queries.sql` เป็นอินพุตของสัปดาห์ที่ 10

## v6.3.0 — ปรับสไลด์และเอกสาร Week 06 ให้มีโครงบท

**ปัญหาที่แก้** — สไลด์ Week 06 เป็นหัวข้อเรียงกันโดยไม่มีเลขบท นักศึกษาไม่รู้ว่าอยู่ตรงไหนและจบหรือยัง
และเนื้อหางานที่บ้าน (CP07, CP08) ซึ่งคิดเป็น 70% ของคะแนน **ถูกระบุแค่ในรายการ ไม่ได้สอนเลย**

### เอกสาร `week06-teaching-doc.html` — เพิ่ม 2 บท

- **บทที่ 11 · Error Handling** — ปัญหาของ try/catch กระจาย · errorHandler 4 พารามิเตอร์ · notFound · ลำดับ · `next(err)`
- **บทที่ 12 · เก็บข้อมูลถาวร** — ระดับของการเก็บข้อมูล · รูปแบบอ่าน/เขียนไฟล์ · กับดัก 3 อัน · จุดที่ต้องเรียก persist
- บทที่ 11 เดิม (จากทฤษฎีสู่ Checkpoint) เลื่อนเป็นบทที่ 13 · เพิ่มกลุ่ม 4 ในสารบัญ

### สไลด์ — รวมเป็นไฟล์เดียว 66 หน้า มีโครง 12 บท

- เพิ่มสไลด์คั่นบท 12 · ป้ายบททุกสไลด์ 48 · สรุปท้ายบท 12 · กล่องเหตุผล 5 · แถบความคืบหน้า 24
- **เพิ่มเนื้อหาที่เคยขาด** — npm/package.json (บท 2.2) · หนึ่งคำขอตอบได้ครั้งเดียว (บท 6.3)
- **เพิ่มกลุ่ม 4** สอน CP07 และ CP08 ในห้องก่อนไปทำที่บ้าน
- เลิกใช้ `ENGSE203_Week06_Slides_Deluxe.html` — รวมเป็น `ENGSE203_Week06_Slides.html` ไฟล์เดียว

## v6.2.0 — API Contract template (Markdown + Word)

- เขียน `templates/api-contract-template.md` ใหม่ทั้งไฟล์ (เดิม 19 บรรทัด → ฉบับเต็มพร้อมคำอธิบาย)
  - มีตัวอย่างที่เขียนเสร็จแล้วจาก Campus Service API (GET, POST) เป็นแบบอย่าง
  - เว้นส่วน PUT และ DELETE ให้นักศึกษาเขียนเองตามรูปแบบเดียวกัน
  - มีคำอธิบายกำกับทุกหัวข้อว่า "มีไว้ทำไม" และเช็คลิสต์ก่อนส่ง 12 ข้อ
- เพิ่ม `templates/api-contract-template.docx` — ฉบับทางการสำหรับส่งลูกค้า/หน่วยงาน
  - ปก · สารบัญอัตโนมัติ · หัวท้ายกระดาษ · เลขหน้า · หน้าลงนามรับทราบ · 11 หน้า
- คัดลอกทั้งสองไฟล์ลง `week-07/lab07/starter/templates/` ให้นักศึกษาหยิบใช้ได้ทันที
- อัปเดต LAB07 Take-Home Guide หัวข้อ CP15 — อธิบายสัญลักษณ์ ✅/✍️ และเมื่อไรควรใช้ `.docx`

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
