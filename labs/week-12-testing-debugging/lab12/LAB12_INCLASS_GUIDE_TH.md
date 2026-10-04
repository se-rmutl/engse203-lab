# ENGSE203 LAB 12 — คู่มือ In-Class

**🏫 ทำในห้อง · ช่วงเช้า · CP44 → CP47 · การทดสอบและการแก้ไขข้อผิดพลาด**
**หน่วยที่ 5 · สัปดาห์ที่ 12 · CLO6 · ประมาณ 3 ชั่วโมง (ช่วงบ่ายต่อด้วย LAB 13)**

---

## 🖥️ หน้าจอ Live-Coding (ฉายประกอบการสอน)

| Checkpoint | เนื้อหา | เปิด |
|---|---|---|
| CP44 | ออกแบบ test case ก่อนเขียนโค้ด | [เปิด](https://se-rmutl.github.io/engse203/week12/guides/ENGSE203_Week12_CP44_LiveCoding.html) |
| CP45 | unit test ด้วย Vitest → เจอ BUG #0 | [เปิด](https://se-rmutl.github.io/engse203/week12/guides/ENGSE203_Week12_CP45_LiveCoding.html) |
| CP46 | integration test + coverage | [เปิด](https://se-rmutl.github.io/engse203/week12/guides/ENGSE203_Week12_CP46_LiveCoding.html) |
| CP47 | debug 3 bug จากผู้ใช้ + regression test | [เปิด](https://se-rmutl.github.io/engse203/week12/guides/ENGSE203_Week12_CP47_LiveCoding.html) |

[สไลด์](https://se-rmutl.github.io/engse203/week12) · [เอกสารประกอบการสอน Week 12](https://se-rmutl.github.io/engse203/week12/week12-teaching-doc.html) (อ่านบทที่ 1–3 ก่อนเข้าคาบ)

---

## อ่านก่อนเริ่ม

เช้านี้เราได้รับ codebase ของระบบ Campus Service ที่เปิดให้ทดลองใช้แล้ว พร้อม**รายงานปัญหาจากผู้ใช้ 3 เรื่อง** (`BUG_REPORTS.md`)

ลองรัน test ที่มีอยู่ก่อน — **ผ่านทั้งหมด** ทั้งที่ระบบมี bug อย่างน้อย 4 ตัว

> **ประโยคแกนกลางของเช้านี้**
> **"test ผ่าน" ไม่ได้แปลว่า "ไม่มี bug" — แปลว่า "ยังไม่มี test สำหรับกรณีนั้น"**

### สิ่งที่จะได้ทำ

| ช่วง | ทำอะไร |
|---|---|
| ออกแบบ | เขียนตารางกรณีทดสอบ (ค่าขอบ · กลุ่มข้อมูล) **ก่อน**เขียนโค้ด test |
| ทดสอบ | unit test (pure function) · integration test (ยิง HTTP จริง) · อ่าน coverage |
| debug | หา bug ด้วยเครื่องมือจริง: stack trace · breakpoint · DevTools → แก้ → เขียน test กันไม่ให้กลับมา |

### เป้าหมายตอนจบช่วงเช้า

```bash
node --disable-warning=ExperimentalWarning check-week12.mjs --inclass    # 20/20
```

---

## ⓪ เตรียมโฟลเดอร์ใน Student Repository

สัปดาห์นี้**ทุกคนเริ่มจาก starter เดียวกัน** (มี bug ที่ผู้ใช้แจ้งมา) — ไม่ใช่งาน Week 11 ของตัวเอง

```bash
# รันที่ root ของ Student Repository
# (สมมติว่า clone Course Repository ไว้ข้าง ๆ ที่ ../engse203-lab — ถ้าไม่เห็นโฟลเดอร์ week-12 ให้ git pull ใน Course Repository ก่อน · ถ้าไม่ได้ clone ให้ดาวน์โหลด zip จาก GitHub)
mkdir -p labs/week-12                # ต้องมีโฟลเดอร์แม่ก่อน ไม่งั้น cp ขึ้น "No such file or directory"
cp -r ../engse203-lab/labs/week-12-testing-debugging/lab12/starter labs/week-12/source
cd labs/week-12/source

npm install --prefix api
npm install --prefix frontend
cp api/.env.example api/.env         # npm run dev ต้องใช้ไฟล์นี้ (CP47) — ไม่มีจะขึ้น "node: .env: not found"
npm run db:setup --prefix api        # สร้าง api/data/campus.db
```

> 🪟 **Windows (PowerShell)** — ใช้ `mkdir labs\week-12` แล้ว `Copy-Item -Recurse ..\engse203-lab\labs\week-12-testing-debugging\lab12\starter labs\week-12\source` · คัดลอก .env ด้วย `Copy-Item api\.env.example api\.env`

### โครงสร้างที่ต้องมีตอนจบ

```
labs/week-12/source/
├── api/
│   ├── src/validators/requestValidator.js   ← pure function (CP45)
│   ├── tests/unit/requestValidator.test.js  ← CP45
│   ├── tests/integration/requests.api.test.js ← CP46 · CP47
│   └── vitest.config.js                     ← DB_FILE=':memory:' (ให้มาแล้ว)
├── frontend/src/utils/requestSummary.test.js ← CP47
├── BUG_REPORTS.md      ← อาการที่ผู้ใช้แจ้ง (อ่านอย่างเดียว)
├── TEST_CASES.md       ← CP44
├── DEBUG_LOG.md        ← CP45 · CP47
└── check-week12.mjs
```

---

# CP44 · ออกแบบ test case ก่อนเขียนโค้ด

**🏫 25 นาที · We do**

## ① อ่านกฎจากโค้ด

เปิด `api/src/validators/requestValidator.js` แล้วจดกฎ

| ช่อง | กฎ |
|---|---|
| ชื่อผู้แจ้ง | อย่างน้อย 2 ตัวอักษร (ตัดช่องว่างหัวท้ายก่อนนับ) |
| ประเภท | `แจ้งซ่อม` · `บริการบัญชีผู้ใช้` · `ขอใช้อุปกรณ์` · `อื่น ๆ` |
| สถานที่ | ต้องมี |
| รายละเอียด | อย่างน้อย 10 ตัวอักษร |
| ความเร่งด่วน | `normal` · `urgent` |

## ② สองเทคนิคที่ใช้

| เทคนิค | แนวคิด | ตัวอย่าง |
|---|---|---|
| **แบ่งกลุ่มข้อมูล** (equivalence) | ข้อมูลในกลุ่มเดียวกันให้ผลแบบเดียวกัน — ทดสอบกลุ่มละ 1 ค่าพอ | priority: `normal` (ถูก) · `high` (นอกรายการ) |
| **ค่าขอบ** (boundary) | bug ชอบซ่อนตรงขอบ — ถ้ากฎคือ "อย่างน้อย N" ทดสอบ **N−1 · N · N+1** | รายละเอียด 9 · 10 · 11 ตัว |

## ③ เติม `TEST_CASES.md` ให้ครบอย่างน้อย 8 ข้อ

ตัวอย่างให้มาแล้ว 3 ข้อ — แต่ละข้อเปลี่ยนข้อมูล**ทีละช่อง** จะได้รู้ว่าผลมาจากช่องไหน

### ✓ ผ่าน CP44 เมื่อ

- [ ] `TEST_CASES.md` มีอย่างน้อย 8 ข้อ
- [ ] มีกรณีค่าขอบของรายละเอียด (9 · 10 · 11) และของชื่อ (1 · 2)
- [ ] มีกรณีข้อมูลผิดรูปแบบ (เช่น ส่ง `null` หรือ `{}`)

### 💬 คำถามที่ต้องตอบได้

> ทำไมต้องทดสอบ 10 ตัวอักษร**พอดี** ทั้งที่ทดสอบ 9 กับ 11 แล้ว

---

# CP45 · unit test ด้วย Vitest

**🏫 40 นาที · I do → We do**

## ① รัน test ที่มีอยู่

```bash
npm test --prefix api          # ผ่านทั้งหมด 11 ข้อ — ทั้งที่มี bug!
npm run test:watch --prefix api   # (แนะนำ) รันใหม่ทุกครั้งที่บันทึกไฟล์
```

## ② ทำไม validator ต้องเป็น pure function

| middleware เดิม | pure function |
|---|---|
| ผูกกับ `req` · `res` · `next` | รับข้อมูลเข้า คืนผลลัพธ์ |
| จะทดสอบต้องเปิด server หรือจำลอง req/res | เรียกตรง ๆ ได้ทันที |

`validateRequest` (middleware) เหลือแค่เรียก `validateRequestInput(req.body)` แล้วตัดสินว่าจะตอบ 400 ไหม

## ③ เพิ่ม unit test จากตาราง (`api/tests/unit/requestValidator.test.js`)

```js
test('10 ตัวอักษร → ผ่าน (ตรงขอบพอดี)', () => {
  expect(validateRequestInput(withField({ details: '1234567890' }))).toEqual([]);
});

// หลายค่าในรูปแบบเดียวกัน — ใช้ test.each
test.each([null, undefined, 'text', 42, []])('input = %j → error เดียว', (input) => {
  expect(validateRequestInput(input)).toEqual(['ต้องส่งข้อมูลคำร้องมาด้วย']);
});
```

| matcher | ใช้เมื่อ |
|---|---|
| `toBe(x)` | ค่าเดี่ยว (ตัวเลข · ข้อความ · true/false) |
| `toEqual([...])` | array / object — เทียบเนื้อใน |
| `toHaveLength(n)` | นับจำนวน error |
| `toContain('…')` | มีข้อความนี้อยู่ใน array |

## ④ test ค่าขอบ 10 ตัวอักษร **fail** → นี่คือ BUG #0

> ⚠ **อย่าแก้ test ให้ผ่าน** — test ตรงกับกฎ ("อย่างน้อย 10") · ให้ไปอ่านเงื่อนไขใน validator

แก้ให้ถูก แล้วบันทึกใน `DEBUG_LOG.md` หัวข้อ BUG #0 (ตั้งชื่อเอง)

### ✓ ผ่าน CP45 เมื่อ

- [ ] unit test อย่างน้อย 10 ข้อ ผ่านทั้งหมด
- [ ] รายละเอียด 10 ตัวพอดีผ่าน · 9 ตัวยังไม่ผ่าน
- [ ] `DEBUG_LOG.md` บันทึก BUG #0 ครบ 6 ช่อง

### 💬 คำถามที่ต้องตอบได้

> bug นี้ไม่มีผู้ใช้แจ้งเลย — เราเจอมันได้อย่างไร และถ้าไม่เขียน test จะเจอเมื่อไร

---

# CP46 · integration test + coverage

**🏫 35 นาที · We do → You do**

## ① ฐานข้อมูลของ test แยกจากของจริง

`api/vitest.config.js` ตั้ง `DB_FILE: ':memory:'` ไว้แล้ว

```js
beforeEach(async () => { await loadSeed(); });   // ทุก test ได้ฐานข้อมูลใหม่ 5 รายการ
```

> test ข้อหนึ่งลบข้อมูล ไม่กระทบข้ออื่น · และไม่แตะ `campus.db` ที่ต้อง commit

## ② เพิ่ม integration test ของ PUT และ DELETE

ใน `api/tests/integration/requests.api.test.js`

```js
describe('PUT /api/requests/:id', () => {
  test('เปลี่ยนสถานะ → 200 และค่าใหม่ถูกบันทึก', async () => {
    const r = await request(app).put('/api/requests/REQ-001').send({ status: 'completed' });
    expect(r.status).toBe(200);
    expect(r.body.status).toBe('completed');
  });
  // สถานะนอกรายการ → 400
});

describe('DELETE /api/requests/:id', () => {
  test('ลบแล้ว GET ซ้ำ → 404', async () => {
    await request(app).delete('/api/requests/REQ-003').expect(204);
    await request(app).get('/api/requests/REQ-003').expect(404);
  });
});
```

## ③ อ่าน coverage

```bash
npm run coverage
# ตารางใน terminal + รายงานละเอียดที่ api/coverage/index.html
```

| เห็นอะไร | แปลว่า |
|---|---|
| `logger.js` 0% | ไม่มีใครเรียกเลย → **dead code** (ถูกแทนด้วย morgan) ลบได้ |
| `errorHandler.js` ต่ำ | ยังไม่มี test ที่ทำให้เกิด error → เพิ่ม test `GET /api/nope` → 404 |
| บรรทัดสีแดงใน HTML | บรรทัดที่ยังไม่มี test วิ่งผ่าน |

> ⚠ **coverage 100% ≠ ไม่มี bug** — บอกแค่ว่าโค้ดถูก "วิ่งผ่าน" ไม่ได้บอกว่าตรวจผลถูก

### ✓ ผ่าน CP46 เมื่อ

- [ ] integration test อย่างน้อย 12 ข้อ รวม PUT และ DELETE
- [ ] `npm test --prefix api` ผ่านทั้งหมด และรวมอย่างน้อย 22 ข้อ
- [ ] เปิดรายงาน coverage และชี้ได้ว่าไฟล์ไหนยังไม่มี test

### 💬 คำถามที่ต้องตอบได้

> ถ้าใช้ `beforeAll` (ครั้งเดียว) แทน `beforeEach` แล้ว test ข้อ "ลบ" รันก่อนข้อ "คืน 5 รายการ" จะเกิดอะไร

---

# CP47 · debug 3 bug จากผู้ใช้

**🏫 50 นาที · I do (BUG #3) → We do (BUG #1) → You do (BUG #2)**

## กระบวนการ 6 ขั้น — ใช้กับทุก bug

```
อาการ → ทำซ้ำได้ → แยกชั้น (frontend / API / DB) → สมมติฐาน + หลักฐาน → แก้ → regression test
```

**regression test** = เขียน test ที่ "ทำซ้ำอาการ" ก่อน → ต้อง **fail** → แก้โค้ด → test ผ่าน → bug นี้จะไม่กลับมาโดยไม่มีใครรู้

## BUG #3 · เปลี่ยนสถานะคำร้องที่ไม่มีอยู่ ได้ 500 — 🔧 อ่าน stack trace

```bash
npm run dev --prefix api
# อีก terminal
curl -X PUT localhost:3001/api/requests/REQ-999 -H "Content-Type: application/json" -d '{"status":"completed"}'
```

terminal ของ API แสดง

```
เกิดข้อผิดพลาดภายใน: TypeError: Cannot read properties of null (reading 'id')
    at updateRequestStatus (file:///…/api/src/controllers/requestController.js:30:35)   ← เริ่มอ่านบรรทัดนี้
    at Layer.handleRequest (…/node_modules/router/lib/layer.js:152:17)                  ← โค้ดของ library ข้ามได้
```

> บรรทัดแรก = **อะไร**พัง · บรรทัดแรกที่เป็น**ไฟล์ของเรา** = **พังที่ไหน** (ไฟล์:บรรทัด:ตัวอักษร)

## BUG #1 · ลบแล้วเพิ่มใหม่ ได้ 500 — 🔧 breakpoint

1. VS Code → แผง Terminal → ลูกศรข้างปุ่ม **+** → **JavaScript Debug Terminal** (หรือ `Ctrl+Shift+P` → JavaScript Debug Terminal · ไม่ต้องตั้งค่าอะไรเพิ่ม)
2. ปิด `npm run dev` ตัวเดิมจาก BUG #3 ก่อน (`Ctrl+C` — พอร์ต 3001 จะได้ไม่ชน) แล้วในเทอร์มินัลใหม่นั้น `npm run dev --prefix api`
3. เปิด `api/src/services/requestService.js` → คลิกซ้ายของเลขบรรทัดใน `nextId()` (จุดแดง = breakpoint)
4. ทำซ้ำอาการ: ลบ REQ-002 แล้วส่งคำร้องใหม่ — โปรแกรมหยุดที่ breakpoint
5. ชี้เมาส์ดูค่าตัวแปร / แผง VARIABLES → รหัสที่คำนวณได้ซ้ำกับของเดิมหรือไม่

```bash
curl -X DELETE localhost:3001/api/requests/REQ-002
curl -X POST localhost:3001/api/requests -H "Content-Type: application/json" \
  -d '{"requesterName":"ทดสอบ","requestType":"แจ้งซ่อม","location":"ห้อง 1","details":"แอร์ไม่เย็นตั้งแต่เช้า","priority":"normal"}'
```

## BUG #2 · Dashboard "กำลังดำเนินการ 0" — 🔧 DevTools แยกชั้น

> ⚠ ถ้าลบ REQ-002 ไปตอน BUG #1 ให้ปิด API (`Ctrl+C`) → `npm run db:reset --prefix api` → `npm run dev --prefix api` ใหม่ก่อน (REQ-002 คือคำร้องเดียวที่เป็น in-progress · reset ตอน API ยังเปิดอยู่ API จะยังเห็นข้อมูลเดิม)

1. `npm run dev --prefix frontend` → เปิด Dashboard → การ์ด "กำลังดำเนินการ" แสดง 0
2. F12 → **Network** → คลิก `requests` → แท็บ Response → เห็น `"status": "in-progress"` ไหม
3. ถ้า API ส่งถูก → **ปัญหาอยู่ frontend** → ไปดู `frontend/src/utils/requestSummary.js`
4. (ทางเลือก) DevTools → **Sources** → วาง breakpoint ใน `summarizeRequests`

regression test ฝั่ง frontend (`frontend/src/utils/requestSummary.test.js`) — ใช้ข้อมูลหน้าตาเดียวกับที่ API ส่งมา

```bash
npm test --prefix frontend
```

## บันทึก `DEBUG_LOG.md` ให้ครบทุก bug

| ช่อง | ตัวอย่างคำถามที่ต้องตอบ |
|---|---|
| อาการ | ผู้ใช้เห็นอะไร |
| วิธีทำซ้ำ | คำสั่งหรือขั้นตอนที่ทำให้เกิดทุกครั้ง |
| เครื่องมือ | stack trace / breakpoint / Network / unit test |
| สาเหตุ (ไฟล์:บรรทัด) | เงื่อนไขไหนผิด เพราะอะไร |
| วิธีแก้ | เปลี่ยนอะไร |
| test ที่กัน | ชื่อไฟล์และชื่อ test |

### ✓ ผ่าน CP47 เมื่อ

- [ ] BUG #1 · #2 · #3 หายทั้งหมด และแต่ละตัวมี regression test
- [ ] `npm test` (api + frontend) ผ่านทั้งหมด
- [ ] `DEBUG_LOG.md` ระบุสาเหตุครบ 4 bug (#0–#3)
- [ ] `check-week12.mjs --inclass` ได้ **20/20**

### 💬 คำถามที่ต้องตอบได้

> BUG #2 — เปิด Network แล้วเห็นอะไร ที่ทำให้มั่นใจว่าไม่ต้องไปแก้ API

---

# ตรวจงานและส่ง (ก่อนพักกลางวัน)

```bash
node --disable-warning=ExperimentalWarning check-week12.mjs --inclass   # 20/20
node --disable-warning=ExperimentalWarning check-week12.mjs             # 22/22 ถ้าทำ Challenge
```

> checker เรียก Vitest ของโปรเจกต์ — ต้อง `npm install` ทั้งใน `api/` และ `frontend/` ก่อน

> `api/data/campus.db` ต้อง commit — ถ้าระหว่าง debug ไปเพิ่ม/ลบข้อมูลไว้ ให้หยุด `npm run dev` แล้ว `npm run db:reset --prefix api` ก่อน commit เพื่อให้ข้อมูลกลับเป็นค่าเริ่มต้น

```bash
git switch -c unit5/week-12
git add -A
git commit -m "LAB12: test + debug 4 bugs"
git push -u origin unit5/week-12
git tag lab-12-submission-v1 && git push origin lab-12-submission-v1
```

## ⭐ Challenge (ถ้าเหลือเวลา)

| ข้อ | ทำอะไร |
|---|---|
| coverage ≥ 85% | เพิ่ม test จนตัวเลข statements ของ api ถึง 85% (ดูจาก `npm run coverage`) |
| CI | `.github/workflows/check.yml` ที่ **root ของ Student Repository** (GitHub รัน workflow จากที่นี่เท่านั้น) รัน `npm test` ทุกครั้งที่ push · ใส่ `defaults: { run: { working-directory: labs/week-12/source } }` |

---

## ตารางไล่ปัญหาที่พบบ่อย

| อาการ | สาเหตุ / วิธีแก้ |
|---|---|
| `vitest: not found` / checker บอก "ยังไม่ได้ npm install" | `npm install --prefix api` และ `--prefix frontend` |
| checker พิมพ์ `POST /api/auth/login 404` · `PUT … 500` ก่อนรายการผล | เป็น log คำขอที่ checker ยิงเอง (login ไว้เผื่อสัปดาห์ 13) — ไม่ใช่ error · ดูผลที่บรรทัด ✅ / [TODO] |
| `node: .env: not found` ตอน `npm run dev --prefix api` | ยังไม่ได้คัดลอก `.env` → `cp api/.env.example api/.env` (ข้อ ⓪) |
| `Failed to load url sqlite` | Vitest รุ่นเก่า — ใช้รุ่นใน package.json ของ starter (Vitest 5) อย่าเปลี่ยนเวอร์ชัน |
| test ผ่านบ้างไม่ผ่านบ้างตามลำดับ | ใช้ `beforeAll` แทน `beforeEach` — ต้องรีเซ็ตฐานข้อมูลทุก test |
| breakpoint ไม่หยุด (จุดสีเทา) | ไม่ได้รันใน **JavaScript Debug Terminal** · ยังมี `npm run dev` ตัวเดิมเปิดอยู่ (ตัวใหม่ขึ้น `Completed running` แล้วไม่ได้ฟังพอร์ต — curl ไปเข้าตัวเดิม) · หรือ path ไฟล์ที่เปิดไม่ใช่ไฟล์ที่ server ใช้ |
| Dashboard ไม่มีคำร้อง in-progress ให้ดู | ลบ REQ-002 ไปแล้ว → ปิด API → `npm run db:reset --prefix api` → `npm run dev --prefix api` ใหม่ |
| แก้ test ให้ผ่านแล้วแต่ bug ยังอยู่ | อย่าแก้ test ให้ตรงกับโค้ด — แก้โค้ดให้ตรงกับกฎ |

---

## ต่อจากนี้

- **ช่วงบ่าย** — LAB 13 เพิ่มความปลอดภัย: ระบบจะต้อง login ก่อนเปลี่ยนสถานะหรือลบ → test PUT/DELETE ที่เขียนเช้านี้จะพัง 401 (ตั้งใจ)
- **Final Term Project** — test (unit + integration + frontend) และ `DEBUG_LOG.md` เป็นข้อกำหนดของ project
