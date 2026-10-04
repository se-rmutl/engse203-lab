# LAB 12 — การทดสอบและการแก้ไขข้อผิดพลาด

**สัปดาห์ที่ 12** · หน่วยที่ 5 คุณภาพซอฟต์แวร์ การทดสอบ และความพร้อมก่อนใช้งาน · **ช่วงเช้า** · CLO6 · งาน A2 Weekly LAB

> สัปดาห์ 12 และ 13 **สอนวันเดียวต่อกัน** — เช้า LAB 12 (09:00–12:00) · บ่าย [LAB 13](../week-13-quality-security/) (13:00–16:00)
> Sec 1 วันจันทร์ที่ 5 ต.ค. · Sec 2 วันพฤหัสบดีที่ 8 ต.ค.

---

## เริ่มตรงไหน

| ลำดับ | ทำเมื่อไร | เปิดไฟล์ |
|---|---|---|
| 1 | ก่อนเข้าคาบ | [เอกสารประกอบการสอน](https://se-rmutl.github.io/engse203/week12/week12-teaching-doc.html) **บทที่ 1–3** |
| 2 | ในคาบ | [`lab12/LAB12_INCLASS_GUIDE_TH.md`](lab12/LAB12_INCLASS_GUIDE_TH.md) |
| 3 | หลังคาบ | ทำส่วนที่ค้างให้ครบ · ทักษะนี้เป็นข้อกำหนดของ [Final Term Project](../final-term-project/) |

## สื่อการสอนออนไลน์

| สื่อ | เปิด |
|---|---|
| สไลด์ Week 12 (42 หน้า · 9 บท · interactive 2 ตัว) | [เปิดสไลด์](https://se-rmutl.github.io/engse203/week12) |
| เอกสารประกอบการสอน (9 บท · 12 ภาพ) | [เปิดเอกสาร](https://se-rmutl.github.io/engse203/week12/week12-teaching-doc.html) |

### หน้าจอ Live-Coding (ใช้ในคาบ)

| CP | ทำอะไร | เปิด |
|---|---|---|
| CP44 | ออกแบบ test case ก่อนเขียนโค้ด | [เปิด](https://se-rmutl.github.io/engse203/week12/guides/ENGSE203_Week12_CP44_LiveCoding.html) |
| CP45 | unit test ด้วย Vitest | [เปิด](https://se-rmutl.github.io/engse203/week12/guides/ENGSE203_Week12_CP45_LiveCoding.html) |
| CP46 | integration test + coverage | [เปิด](https://se-rmutl.github.io/engse203/week12/guides/ENGSE203_Week12_CP46_LiveCoding.html) |
| CP47 | debug 3 bug จากผู้ใช้ + regression test | [เปิด](https://se-rmutl.github.io/engse203/week12/guides/ENGSE203_Week12_CP47_LiveCoding.html) |

---

## ภาพรวม

ระบบ Campus Service ที่ deploy เมื่อสัปดาห์ก่อนมีผู้ใช้แจ้งปัญหามา 3 เรื่อง — แต่ `npm test` **ผ่านทั้งหมด**

```
"test ผ่าน"  ≠  "ไม่มี bug"   →   แปลว่า "ยังไม่มี test สำหรับกรณีนั้น"

ออกแบบ test case  →  unit test  →  integration test  →  debug ด้วยเครื่องมือจริง  →  regression test
(ค่าขอบ · กลุ่ม)     (Vitest)        (supertest)          (stack trace · breakpoint · DevTools)
```

| ทักษะ | เครื่องมือ |
|---|---|
| ออกแบบ test case | equivalence partitioning · boundary value (N−1 · N · N+1) |
| unit test | **Vitest 5** · pure function |
| integration test | supertest · ฐานข้อมูล `:memory:` แยกจากของจริง · `beforeEach` |
| coverage | `@vitest/coverage-v8` |
| debug | stack trace · VS Code JavaScript Debug Terminal (breakpoint) · DevTools Network |

> เคยเขียน test ด้วย node:test มาแล้ว (Week 07, 10) — สัปดาห์นี้เน้น**การออกแบบ test case และการ debug** ไม่ใช่ syntax ใหม่

---

## Checkpoint ทั้งหมด

| CP | ทำอะไร | ✓ ผ่านเมื่อ | ที่ไหน |
|---|---|---|---|
| **CP44** | ออกแบบ test case | `TEST_CASES.md` ≥ 8 ข้อ มีค่าขอบ | 🏫 |
| **CP45** | unit test pure function | ≥ 10 ข้อ · แก้ BUG #0 · บันทึก `DEBUG_LOG.md` | 🏫 |
| **CP46** | integration test + coverage | ≥ 12 ข้อ รวม PUT/DELETE · api รวม ≥ 22 ข้อ | 🏫 |
| **CP47** | debug 3 bug จากผู้ใช้ | ทุก bug มี regression test · `DEBUG_LOG.md` ครบ 4 bug | 🏫 |
| ⭐ | coverage ≥ 85% | `npm run coverage` | ไม่บังคับ |
| ⭐ | CI รัน `npm test` ทุกครั้งที่ push | `.github/workflows/` | ไม่บังคับ |

---

## เริ่มทำ LAB

> **ทุกคนเริ่มจาก starter เดียวกัน** (มี bug ที่ผู้ใช้แจ้งมา) — ไม่ใช้งาน Week 11 ของตัวเอง

```bash
# รันที่ root ของ Student Repository
mkdir -p labs/week-12
cp -r ../engse203-lab/labs/week-12-testing-debugging/lab12/starter labs/week-12/source
cd labs/week-12/source
npm install --prefix api
npm install --prefix frontend
cp api/.env.example api/.env   # npm run dev --prefix api ต้องใช้ (CP47)
npm run db:setup --prefix api
npm test --prefix api          # ผ่านทั้งหมด — ทั้งที่มี bug!
```

```bash
# ตรวจงาน — รันจาก labs/week-12/source/
node --disable-warning=ExperimentalWarning check-week12.mjs --inclass   # 20/20
node --disable-warning=ExperimentalWarning check-week12.mjs            # 22/22 (รวม Challenge)
```

---

## สิ่งที่ต้องส่ง

| ไฟล์ | จาก CP |
|---|---|
| `TEST_CASES.md` | CP44 |
| `api/tests/unit/requestValidator.test.js` | CP45 |
| `api/tests/integration/requests.api.test.js` | CP46 · CP47 |
| `frontend/src/utils/requestSummary.test.js` | CP47 |
| `DEBUG_LOG.md` (4 bug × 6 ช่อง) | CP45 · CP47 |

```bash
git switch -c unit5/week-12
git add -A && git commit -m "LAB12: test + debug 4 bugs"
git push -u origin unit5/week-12
git tag lab-12-submission-v1 && git push origin lab-12-submission-v1
```

> checker ตรวจได้ว่า bug หายและมี test กัน แต่ตรวจไม่ได้ว่าเข้าใจสาเหตุ — ในการสัมภาษณ์ปลายภาคจะถามให้เล่าว่าใช้เครื่องมือไหนหาเจอ

---

## โครงสร้างโฟลเดอร์

```
week-12-testing-debugging/
├── lab12/
│   ├── LAB12_INCLASS_GUIDE_TH.md
│   └── starter/          (มี bug 4 ตัว · test 11 ข้อผ่านหมด · check-week12.mjs)
└── guides/               (เอกสาร · สไลด์ · live-coding CP44–47 · blueprint หน่วยที่ 5)
```

---

## ต่อจากนี้

- **ช่วงบ่าย** — [LAB 13](../week-13-quality-security/) เริ่มจาก starter ใหม่ที่แก้ bug ทั้งหมดแล้ว (ใครทำเช้าไม่เสร็จก็เริ่มบ่ายได้)
- **Final Term Project** — unit + integration + frontend test และ `DEBUG_LOG.md` เป็นข้อกำหนดของโปรเจกต์
