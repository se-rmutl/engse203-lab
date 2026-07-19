# Phase D1 Alignment — Pre-LAB 04 → LAB 4

เอกสารนี้เป็น code-asset contract สำหรับทำให้กิจกรรมในชั้นเรียน โค้ด checkpoint งานการบ้าน และการประเมินใช้ mental model เดียวกัน

## 1. Backward Design

| LO | Pre-LAB evidence | LAB 4 transfer evidence | CLO3 |
|---|---|---|---|
| W4-LO1 | อธิบาย State → Render ใน CP03 | README เปรียบเทียบ DOM-driven กับ State-driven | Interactive UI mental model |
| W4-LO2 | แยก Task components ใน CP01–CP02 | มี App และ child components ตาม contract | Component-based UI |
| W4-LO3 | Props ลงและ callback ขึ้นใน CP02/CP05 | Request props/callback และ state ownership | One-way data flow |
| W4-LO4 | useState, form, add/filter/delete ใน CP03–CP05 | LAB4-R04–R11 และ test evidence | State-driven interaction |
| W4-LO5 | Responsive/build/check ใน CP06–CP07 | Branch, PR, build, README และ Pages | Deliverable React UI |

## 2. เวลา Pre-LAB 04 — 240 นาที

| Checkpoint | นาที | สะสม | สิ่งที่ผู้เรียนทำสำเร็จ |
|---|---:|---:|---|
| CP00 | 15 | 15 | ติดตั้ง รัน Vite แก้ข้อความ และเห็น HMR |
| CP01 | 30 | 45 | สร้าง JSX และ Functional Components |
| CP02 | 35 | 80 | ส่ง Props, render list ด้วย `map()` และ stable `key` |
| CP03 | 40 | 120 | ใช้ `useState`, derived summary และ status filter |
| CP04 | 50 | 170 | Controlled Form, validation, `onChange`, `onSubmit`, immutable add |
| CP05 | 35 | 205 | Callback delete และ Conditional Rendering |
| CP06 | 20 | 225 | Responsive 375px, focus, label และ feedback |
| CP07 | 15 | 240 | รัน verifier/build และเขียน transfer plan สำหรับ LAB 4 |
| **รวม** | **240** |  |  |

## 3. Transfer ไม่ใช่ Copy/Rename

| Pre-LAB 04: Study Task Board | LAB 4: Campus Service Request |
|---|---|
| `title`, `category`, `priority`, `status` | `requesterName`, `requestType`, `location`, `details`, `priority`, `status` |
| Task components | AppHeader, SummaryPanel, RequestForm, FilterBar, RequestList, RequestCard |
| validation 2–3 rules | validation 5 rulesและ accessible error |
| summary todo/doing/done | total/pending/in-progress/completed |
| local build verification | repository, feature branch, PR, Pages และ test evidence |

ผู้เรียนใช้รูปแบบ state ownership, props/callback, controlled input, immutable array update และ conditional JSX จาก Pre-LAB แต่ต้องออกแบบ data mapping, validation, component responsibility และหลักฐานของ LAB 4 เอง

## 4. เวลา LAB 4 การบ้าน — เป้าหมาย 240 นาที

สอดคล้องกับเวลาศึกษาด้วยตนเอง 4 ชั่วโมงของรายวิชา 3(1-4-4)

| ช่วง | นาที | งาน |
|---|---:|---|
| H0 | 20 | สร้าง repo, copy starter, install, initial commit และ feature branch |
| H1 | 45 | component tree, data contract และ props rendering |
| H2 | 50 | requests/filter state, derived summary, list/filter/delete |
| H3 | 60 | Controlled Form, validation, add และ conditional feedback |
| H4 | 30 | responsive/accessibility และ TC-01–TC-10 |
| H5 | 30 | README evidence, build, PR, merge และ Pages |
| H6 | 5 | เปิด Pages Incognito และส่ง URLs |
| **รวม** | **240** |  |

## 5. Definition of Done — Phase D1

- Pre-LAB starter เปิดได้ตั้งแต่ CP00 และ checkpoint CP00–CP07 มี source snapshot
- ทุก checkpoint ผ่าน production build เมื่อใช้ไฟล์ snapshot นั้น
- Pre-LAB solution ผ่าน `npm run check` และ `npm run build`
- LAB 4 starter มี TODO/contract โดยไม่ให้คำตอบ implementation ทั้งหมด
- LAB 4 solution ครบ LAB4-R01–R14 และผ่าน `npm run check`/`npm run build`
- ไม่มี Router, fetching, persistence, `useEffect()` เชิงลึก หรือ state library
- root README และ Week 04 README เชื่อมไปยัง Pre-LAB/LAB 4 ได้
