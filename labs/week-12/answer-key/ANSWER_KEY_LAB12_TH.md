# เฉลย LAB 12 (ในห้อง CP44–CP47) — แก้ไฟล์ไหน ตรงไหน

⚠ **สำหรับผู้สอน** — อยู่ใน `resources/` (ไม่ขึ้น GitHub) · ตรวจแล้ว 5 ต.ค. 2569 บน starter ล่าสุดใน GitHub (main) · Node 22.22

| ผลหลังใส่เฉลย | ได้ |
|---|---|
| `npm test --prefix api` | 40 passed |
| `npm test --prefix frontend` | 2 passed |
| `check-week12 --inclass` | **20/20** |

ใช้เฉลยทั้งชุดในคราวเดียว (จาก `labs/week-12/source/` ของ starter ที่ยังไม่แก้):

```bash
cp -r ../week-12-testing-debugging/lab12/starter source
cd source
npm install --prefix api && npm install --prefix frontend
patch -p1 < ../source-old/lab12-inclass.patch    # ต้องไม่มี "Reversed" และไม่มี "FAILED"
cp api/.env.example api/.env && npm run db:reset --prefix api
node --disable-warning=ExperimentalWarning check-week12.mjs --inclass     # ต้องได้ 20/20
```

> Challenge (coverage ≥ 85% · CI) ไม่อยู่ในเฉลยนี้ — ดู `../reference-solution/` (22/22)

## สรุป: แก้ 9 ไฟล์ · โค้ดที่แก้ bug จริงมีแค่ 4 จุด

| CP | ไฟล์ | แก้อะไร | อยู่ในหน้า live coding ไหม |
|---|---|---|---|
| CP44 | `TEST_CASES.md` | กรอก TC-03 ถึง TC-12 (≥ 8 ข้อ · มีค่าขอบ) | บางส่วน — TC-03 ถึง TC-05 (We do) · ที่เหลือเป็น You do |
| CP45 | `api/src/validators/requestValidator.js:37` | **BUG #0** `<=` → `<` | ✓ |
| CP45 | `api/tests/unit/requestValidator.test.js` | test ค่าขอบ 9 · 10 · 11 ตัวอักษร + กรณีอื่น | ✓ บนจอ 20 ข้อ · **You do อีก 4 ข้อ** (ประเภท/ความเร่งด่วนนอกรายการ) ไม่มีโค้ดบนจอ |
| CP46 | `api/tests/integration/requests.api.test.js` | integration test PUT · DELETE · 400 · 404 (≥ 12 ข้อ) | ✓ |
| CP47 | `api/src/controllers/requestController.js:30` | **BUG #3** ย้าย `console.log` ไปหลัง `if (!updated)` | ✓ (ก่อน/หลัง) |
| CP47 | `api/src/services/requestService.js:101` | **BUG #1** `nextId()` หารหัสล่าสุด +1 แทนนับแถว +1 | ✓ |
| CP47 | `frontend/src/utils/requestSummary.js:12` | **BUG #2** `'in progress'` → `'in-progress'` | ⚠ **มีแค่ลูกศรชี้บรรทัดที่ผิด** (You do) — ไม่มีบรรทัดที่แก้แล้วบนจอ |
| CP47 | `frontend/src/utils/requestSummary.test.js` · `requests.api.test.js` | regression test ของ BUG #1 · #2 · #3 | ✓ |
| CP47 | `DEBUG_LOG.md` | สาเหตุครบ 4 bug (ไฟล์:บรรทัด) | ⚠ บนจอมีตัวอย่าง BUG #3 ข้อเดียว · BUG #0 · #1 · #2 นักศึกษาเขียนเอง |

> **ถ้าทำตามหน้า live coding อย่างเดียวจะยังไม่ได้ 20/20** — ต้องทำส่วน You do ด้วย: แก้ BUG #2 เอง (checker ข้อ "BUG #2 · Dashboard นับ กำลังดำเนินการ ถูก") · เขียน DEBUG_LOG ครบ 4 bug (ข้อ "DEBUG_LOG.md ระบุสาเหตุครบ 4 bug") · TEST_CASES ≥ 8 ข้อ (ข้อ CP44)

---

## CP44 — ออกแบบ test case

**`TEST_CASES.md`**

```diff
@@ -14,11 +14,15 @@
 |---|---|---|---|---|
 | TC-01 | ถูกต้อง | — (ถูกทุกช่อง) | ไม่มี error · API ตอบ 201 | unit + integration |
 | TC-02 | ค่าขอบ รายละเอียด | 9 ตัวอักษร | error 1 ข้อ | unit |
-| TC-03 | ค่าขอบ รายละเอียด | 10 ตัวอักษรพอดี | ? | unit |
-| TC-04 | | | | |
-| TC-05 | | | | |
-| TC-06 | | | | |
-| TC-07 | | | | |
-| TC-08 | | | | |
+| TC-03 | ค่าขอบ รายละเอียด | 10 ตัวอักษรพอดี | ผ่าน | unit |
+| TC-04 | ค่าขอบ รายละเอียด | 11 ตัวอักษร | ผ่าน | unit |
+| TC-05 | ไม่ถูกต้อง | รายละเอียดเป็นช่องว่างล้วน | error (ตัดช่องว่างก่อนนับ) | unit |
+| TC-06 | ค่าขอบ ชื่อ | 1 ตัวอักษร | error | unit |
+| TC-07 | ค่าขอบ ชื่อ | 2 ตัวอักษร | ผ่าน | unit |
+| TC-08 | นอกรายการ | ประเภท `แจ้งเหตุ` | error ประเภทไม่ถูกต้อง | unit |
+| TC-09 | นอกรายการ | ความเร่งด่วน `high` | error | unit |
+| TC-10 | ผิดรูปแบบ | body เป็น null / array / ตัวเลข | error เดียว "ต้องส่งข้อมูล" | unit |
+| TC-11 | ผิดหลายช่อง | `{}` | error ครบ 5 ช่อง · API ตอบ 400 | unit + integration |
+| TC-12 | ลำดับการทำงาน | ลบ REQ-002 แล้วเพิ่มใหม่ | 201 · รหัสไม่ซ้ำ | integration |
 
 > **ค่าขอบ** — ถ้ากฎคือ "อย่างน้อย N" ให้ทดสอบ N−1 · N · N+1 เสมอ
```

## CP45 — unit test ค่าขอบ · BUG #0

**`api/src/validators/requestValidator.js`** — กฎคือ "อย่างน้อย 10 ตัวอักษร" แต่เขียน `<=` ทำให้ 10 ตัวพอดีถูกปฏิเสธ

```diff
@@ -34,7 +34,7 @@ export function validateRequestInput(input) {
   if (!readText(input.location)) {
     errors.push('กรุณาระบุสถานที่');
   }
-  if (readText(input.details).length <= MIN_DETAILS) {
+  if (readText(input.details).length < MIN_DETAILS) {
     errors.push(`รายละเอียดต้องมีอย่างน้อย ${MIN_DETAILS} ตัวอักษร`);
   }
   if (!PRIORITIES.includes(input.priority)) {
```

**`api/tests/unit/requestValidator.test.js`** — describe สุดท้าย (ค่าที่ต้องอยู่ในรายการ) คือส่วน You do

```diff
@@ -29,22 +29,53 @@ describe('validateRequestInput — รายละเอียด (ค่าข
   test('9 ตัวอักษร → error (ต่ำกว่าขอบ 1)', () => {
     expect(validateRequestInput(withField({ details: '123456789' }))).toHaveLength(1);
   });
+  test('10 ตัวอักษร → ผ่าน (ตรงขอบพอดี)', () => {
+    expect(validateRequestInput(withField({ details: '1234567890' }))).toEqual([]);
+  });
+  test('11 ตัวอักษร → ผ่าน (เกินขอบ 1)', () => {
+    expect(validateRequestInput(withField({ details: '12345678901' }))).toEqual([]);
+  });
+  test('ช่องว่างล้วนถูกตัดทิ้งก่อนนับ → error', () => {
+    expect(validateRequestInput(withField({ details: '            ' }))).toHaveLength(1);
+  });
+});
+
+describe('validateRequestInput — ชื่อผู้แจ้ง (ค่าขอบ 2 ตัวอักษร)', () => {
+  test('1 ตัวอักษร → error', () => {
+    expect(validateRequestInput(withField({ requesterName: 'ก' }))).toHaveLength(1);
+  });
+  test('2 ตัวอักษร → ผ่าน', () => {
+    expect(validateRequestInput(withField({ requesterName: 'กข' }))).toEqual([]);
+  });
+});
 
-  // 🏫 TODO W12-UNIT (CP45): เพิ่มกรณีจากตาราง TEST_CASES.md ให้ครบ
-  //   - 10 ตัวอักษรพอดี → ผ่าน          ← ค่าขอบ
-  //   - 11 ตัวอักษร → ผ่าน
-  //   - ช่องว่างล้วน → error
-  //   ⚠ ถ้า test ข้อไหน fail อย่าเพิ่งแก้ test — อ่านโค้ดใน validator ก่อน
+describe('validateRequestInput — ค่าที่ต้องอยู่ในรายการ', () => {
+  test('ประเภทคำร้องนอกรายการ → error', () => {
+    expect(validateRequestInput(withField({ requestType: 'แจ้งเหตุ' }))).toContain('ประเภทคำร้องไม่ถูกต้อง');
+  });
+  test.each(['normal', 'urgent'])('priority "%s" → ผ่าน', (priority) => {
+    expect(validateRequestInput(withField({ priority }))).toEqual([]);
+  });
+  test('priority "high" → error', () => {
+    expect(validateRequestInput(withField({ priority: 'high' }))).toHaveLength(1);
+  });
 });
 
-// 🏫 TODO W12-UNIT (CP45): เพิ่ม describe อื่น ๆ
-//   - ชื่อผู้แจ้ง 1 ตัว / 2 ตัว
-//   - ประเภทคำร้องนอกรายการ · priority "high"
-//   - input ผิดรูปแบบ (null · array · ตัวเลข)  ← ลองใช้ test.each([...])
-//   - isValidStatus('pending') / isValidStatus('done')
+describe('validateRequestInput — ข้อมูลผิดรูปแบบ', () => {
+  test.each([null, undefined, 'text', 42, []])('input = %j → error เดียว', (input) => {
+    expect(validateRequestInput(input)).toEqual(['ต้องส่งข้อมูลคำร้องมาด้วย']);
+  });
+
+  test('ผิดหลายช่องพร้อมกัน → ได้ error ครบทุกช่อง', () => {
+    expect(validateRequestInput({})).toHaveLength(5);
+  });
+});
 
 describe('isValidStatus', () => {
-  test('"pending" → true', () => {
-    expect(isValidStatus('pending')).toBe(true);
+  test.each(['pending', 'in-progress', 'completed'])('"%s" → true', (s) => {
+    expect(isValidStatus(s)).toBe(true);
+  });
+  test.each(['done', 'in progress', '', undefined])('%j → false', (s) => {
+    expect(isValidStatus(s)).toBe(false);
   });
 });
```

## CP46 + CP47 — integration test และ regression test

**`api/tests/integration/requests.api.test.js`** — CP46 = PUT/DELETE/400/404 · CP47 = regression BUG #1 และ BUG #3

```diff
@@ -69,6 +69,58 @@ describe('POST /api/requests', () => {
     expect(r.status).toBe(400);
     expect(Array.isArray(r.body.details)).toBe(true);
   });
+  // 🐞 regression test — BUG #1: ลบแล้วเพิ่มใหม่ ได้ 500 (รหัสซ้ำ) · ใส่ใน describe POST
+  test('ลบรายการกลาง แล้วเพิ่มใหม่ → 201 และรหัสไม่ซ้ำของเดิม', async () => {
+    await request(app).delete('/api/requests/REQ-002').expect(204);
+    const r = await request(app).post('/api/requests').send(valid);
+    expect(r.status).toBe(201);
+    const ids = (await request(app).get('/api/requests')).body.map((x) => x.id);
+    expect(new Set(ids).size).toBe(ids.length);
+  });
+});
+
+describe('PUT /api/requests/:id', () => {
+  test('เปลี่ยนสถานะ → 200 และค่าใหม่ถูกบันทึก', async () => {
+    const r = await request(app).put('/api/requests/REQ-001').send({ status: 'completed' });
+    expect(r.status).toBe(200);
+    expect(r.body.status).toBe('completed');
+  });
+  test('สถานะนอกรายการ → 400', async () => {
+    const r = await request(app).put('/api/requests/REQ-001').send({ status: 'done' });
+    expect(r.status).toBe(400);
+  });
+  // 🐞 regression test — BUG #3: เปลี่ยนสถานะคำร้องที่ไม่มีอยู่ ได้ 500
+  test('คำร้องที่ไม่มีอยู่ → 404 (ไม่ใช่ 500)', async () => {
+    const r = await request(app).put('/api/requests/REQ-999').send({ status: 'completed' });
+    expect(r.status).toBe(404);
+  });
+});
+
+describe('DELETE /api/requests/:id', () => {
+  test('ลบแล้ว GET ซ้ำ → 404', async () => {
+    await request(app).delete('/api/requests/REQ-003').expect(204);
+    await request(app).get('/api/requests/REQ-003').expect(404);
+  });
+  test('ลบรายการที่ไม่มี → 404', async () => {
+    await request(app).delete('/api/requests/REQ-999').expect(404);
+  });
+});
+
+describe('เส้นทางที่ไม่มีอยู่', () => {
+  test('GET /api/nope → 404 เป็น JSON', async () => {
+    const r = await request(app).get('/api/nope');
+    expect(r.status).toBe(404);
+    expect(r.body.error).toMatch(/ไม่พบเส้นทาง/);
+  });
+});
+
+describe('ข้อมูลผิดรูปแบบ', () => {
+  test('ส่ง JSON ที่เสีย → 400 เป็น JSON ไม่ใช่ 500', async () => {
+    const r = await request(app).post('/api/requests')
+      .set('Content-Type', 'application/json').send('{"requesterName": ');
+    expect(r.status).toBe(400);
+    expect(r.body).toHaveProperty('error');
+  });
 });
 
 // 🏫 TODO W12-INTEG (CP46): เพิ่ม test ของ PUT และ DELETE
```

## CP47 — แก้ bug จากผู้ใช้

### BUG #3 · PUT คำร้องที่ไม่มี → 500 (stack trace `requestController.js:30:35`)

**`api/src/controllers/requestController.js`** — `updated` เป็น `null` แต่ log อ่าน `updated.id` ก่อนตรวจ

```diff
@@ -27,10 +27,10 @@ export function updateRequestStatus(req, res) {
     return res.status(400).json({ error: 'สถานะต้องเป็น pending, in-progress หรือ completed' });
   }
   const updated = service.updateStatus(req.params.id, status);
-  console.log(`[status] ${updated.id} → ${updated.status}`);   // บันทึกการเปลี่ยนสถานะ
   if (!updated) {
     return res.status(404).json({ error: `ไม่พบคำร้องรหัส ${req.params.id}` });
   }
+  console.log(`[status] ${updated.id} → ${updated.status}`);   // บันทึกการเปลี่ยนสถานะ
   res.status(200).json(updated);
 }
```

### BUG #1 · ลบรายการกลางแล้วเพิ่มใหม่ได้รหัสซ้ำ (breakpoint ใน `nextId()`)

**`api/src/services/requestService.js`** — ลบ REQ-002 แล้วเหลือ 4 แถว → นับได้ 4+1 = REQ-005 ซึ่งมีอยู่แล้ว

```diff
@@ -98,8 +98,11 @@ export function findById(id) {
 /** สร้างรหัสคำร้องถัดไป เช่น REQ-006 */
 function nextId() {
   // รหัสถัดไป = จำนวนคำร้องที่มีอยู่ + 1  (ปรับให้เรียบง่ายขึ้นในรุ่นนี้)
-  const { total } = db.prepare('SELECT COUNT(*) AS total FROM requests').get();
-  return `REQ-${String(total + 1).padStart(3, '0')}`;
+  const row = db.prepare(
+    "SELECT id FROM requests WHERE id LIKE 'REQ-%' ORDER BY id DESC LIMIT 1"
+  ).get();
+  const n = row ? Number(String(row.id).replace('REQ-', '')) + 1 : 1;
+  return `REQ-${String(n).padStart(3, '0')}`;
 }
 
 /**
```

### BUG #2 · Dashboard นับ "กำลังดำเนินการ" ได้ 0 (DevTools → Network)

**`frontend/src/utils/requestSummary.js`** — API ส่ง `in-progress` (มีขีด) แต่นับ `in progress` (เว้นวรรค)

```diff
@@ -9,7 +9,7 @@ export function summarizeRequests(requests) {
   return {
     total: requests.length,
     pending: count('pending'),
-    inProgress: count('in progress'),
+    inProgress: count('in-progress'),
     completed: count('completed'),
   };
 }
```

**`frontend/src/utils/requestSummary.test.js`**

```diff
@@ -6,6 +6,17 @@ describe('summarizeRequests', () => {
     expect(summarizeRequests([])).toEqual({ total: 0, pending: 0, inProgress: 0, completed: 0 });
   });
 
+  // 🐞 regression test — BUG #2 · ข้อมูลรูปแบบเดียวกับที่ GET /api/requests ส่งมา
+  const sample = [
+    { id: 'REQ-001', status: 'pending' },
+    { id: 'REQ-002', status: 'in-progress' },
+    { id: 'REQ-003', status: 'completed' },
+    { id: 'REQ-004', status: 'pending' },
+  ];
+  test('นับครบทุกสถานะ', () => {
+    expect(summarizeRequests(sample)).toEqual({ total: 4, pending: 2, inProgress: 1, completed: 1 });
+  });
+
   // 🏫 TODO W12-DEBUG (CP47 · BUG #2): เพิ่ม test ที่ใช้ข้อมูลหน้าตาเดียวกับที่ API ส่งมา
   //   เปิด DevTools → Network → GET /api/requests → ดูค่า status จริง แล้วคัดลอกมาใช้
 });
```

### DEBUG_LOG

**`DEBUG_LOG.md`**

```diff
@@ -7,38 +7,34 @@
 
 ---
 
-## BUG #0 · (ตั้งชื่อเอง หลังเจอใน CP45)
-
-- **อาการ:**
-- **วิธีทำซ้ำ:**
-- **เครื่องมือ:**
-- **สาเหตุ (ไฟล์:บรรทัด):**
-- **วิธีแก้:**
-- **test ที่กัน:**
+## BUG #0 · ค่าขอบรายละเอียด 10 ตัวอักษร (test เจอ — ไม่มีผู้ใช้แจ้ง)
+- **อาการ:** ส่งรายละเอียด 10 ตัวอักษรพอดี ถูกปฏิเสธ ทั้งที่ข้อความบอกว่า "อย่างน้อย 10"
+- **วิธีทำซ้ำ:** unit test `validateRequestInput({ ...valid, details: '1234567890' })`
+- **เครื่องมือ:** unit test ค่าขอบ (TC-03) — fail ทันทีที่เขียน
+- **สาเหตุ (ไฟล์:บรรทัด):** `api/src/validators/requestValidator.js` เงื่อนไข `length <= MIN_DETAILS`
+- **วิธีแก้:** เปลี่ยนเป็น `length < MIN_DETAILS`
+- **test ที่กัน:** `tests/unit/requestValidator.test.js` → "10 ตัวอักษร → ผ่าน (ตรงขอบพอดี)"
 
 ## BUG #1 · ลบคำร้องแล้วเพิ่มใหม่ ได้ 500
-
-- **อาการ:**
-- **วิธีทำซ้ำ:**
-- **เครื่องมือ:**
-- **สาเหตุ (ไฟล์:บรรทัด):**
-- **วิธีแก้:**
-- **test ที่กัน:**
+- **อาการ:** ลบ REQ-002 แล้ว POST คำร้องใหม่ ได้ 500
+- **วิธีทำซ้ำ:** `curl -X DELETE localhost:3001/api/requests/REQ-002` แล้ว POST
+- **เครื่องมือ:** log (UNIQUE constraint failed) + breakpoint ใน nextId()
+- **สาเหตุ (ไฟล์:บรรทัด):** `api/src/services/requestService.js:101` นับจำนวนแถว +1 ได้ REQ-005 ซ้ำ
+- **วิธีแก้:** หารหัสล่าสุดแล้ว +1
+- **test ที่กัน:** `tests/integration/requests.api.test.js` → "ลบรายการกลาง แล้วเพิ่มใหม่ → 201 และรหัสไม่ซ้ำของเดิม"
 
 ## BUG #2 · Dashboard แสดง "กำลังดำเนินการ 0"
-
-- **อาการ:**
-- **วิธีทำซ้ำ:**
-- **เครื่องมือ:**
-- **สาเหตุ (ไฟล์:บรรทัด):**
-- **วิธีแก้:**
-- **test ที่กัน:**
+- **อาการ:** การ์ดกำลังดำเนินการแสดง 0
+- **วิธีทำซ้ำ:** เปิด Dashboard
+- **เครื่องมือ:** DevTools Network → API ส่ง "in-progress" ถูก
+- **สาเหตุ (ไฟล์:บรรทัด):** `frontend/src/utils/requestSummary.js:12` นับ 'in progress' (ช่องว่าง)
+- **วิธีแก้:** เปลี่ยนเป็น 'in-progress'
+- **test ที่กัน:** `frontend/src/utils/requestSummary.test.js` → "นับครบทุกสถานะ"
 
 ## BUG #3 · เปลี่ยนสถานะคำร้องที่ไม่มีอยู่ ได้ 500
-
-- **อาการ:**
-- **วิธีทำซ้ำ:**
-- **เครื่องมือ:**
-- **สาเหตุ (ไฟล์:บรรทัด):**
-- **วิธีแก้:**
-- **test ที่กัน:**
+- **อาการ:** `PUT /api/requests/REQ-999` ได้ 500 แทน 404
+- **วิธีทำซ้ำ:** `curl -X PUT localhost:3001/api/requests/REQ-999 -H "Content-Type: application/json" -d '{"status":"completed"}'`
+- **เครื่องมือ:** อ่าน stack trace ใน terminal — `TypeError: Cannot read properties of null (reading 'id')`
+- **สาเหตุ (ไฟล์:บรรทัด):** `api/src/controllers/requestController.js:30` log `updated.id` อยู่ก่อน `if (!updated)`
+- **วิธีแก้:** ย้าย log ไปไว้หลังการตรวจ null
+- **test ที่กัน:** `tests/integration/requests.api.test.js` → "คำร้องที่ไม่มีอยู่ → 404 (ไม่ใช่ 500)"
```

