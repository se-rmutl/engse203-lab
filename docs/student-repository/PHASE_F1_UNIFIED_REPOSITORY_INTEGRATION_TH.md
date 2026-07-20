# Phase F1 — Week 04 Unified Repository Integration

สถานะ: Canonical baseline  
วันที่: 20 กรกฎาคม 2569 (2026)

## Source

- Input: `engse203-lab_20-7-2026.zip`
- SHA-256: `cefd244c23834e8632a8289a3cbad227f84283d5de9b4a54e98aa48b13ae5d4c`

## Decision ที่ล็อกแล้ว

```text
Course Repository: read-only สำหรับโจทย์/starter/rubric
Student Repository: engse203-student-labs-<student-id>
Weekly branch: lab/week-NN
Source: labs/week-NN/source/
Evidence: labs/week-NN/evidence/
Publish input: labs/week-NN/publish/
Pages output: docs/labs/week-NN/
Pages source: main /docs
Submission: Pages Hub + Weekly Result + merged PR + submission tag
```

LAB04 จึงไม่ใช้ repository `engse203-lab04-<student-id>` และไม่ใช้ branch
`feature/react-service-request` อีกต่อไป แต่ใช้ `lab/week-04` ใน Student Repository เดิม

## Integration Scope

| Artifact | การปรับ |
|---|---|
| LAB01 | ใช้ `lab/week-01`, source/evidence และ LAB01 Evidence Result ใน Pages Hub |
| LAB02 | ใช้ `lab/week-02`, Vite `base: './'`, build `dist/`, import ไป publish |
| LAB03 | ใช้ `lab/week-03`, source/evidence/publish และ result `/labs/week-03/` |
| LAB04 | ใช้ `lab/week-04`, React source ที่ `labs/week-04/source/`, result `/labs/week-04/` |
| Student Template | รองรับ setup, add lab, import source/publish, build Pages และ verify |
| รุ่นถัดไป | ใช้ `CREATE_STUDENT_REPOSITORY_BEFORE_LAB01_TH.md` ก่อน LAB01 |
| รุ่นปัจจุบัน | ใช้ `MIGRATE_EXISTING_LAB01_TO_LAB03_TH.md` และเก็บ repo เดิมเป็นหลักฐาน |

## Weekly Submission Contract

นักศึกษาส่ง 4 ค่าใน Google Sheet/LMS:

1. Pages Hub URL
2. Weekly Result URL เช่น `.../labs/week-04/`
3. merged Pull Request URL ของ `lab/week-NN → main`
4. tag เช่น `lab-04-submission-v1`

Repository URL ส่งครั้งแรกหรือเมื่อผู้สอนร้องขอ

## Public/Private Boundary

- Course Repository และ Student Template ห้ามมี Instructor Solution
- Week04 Instructor Solution, checkpoint recovery และ grading notes อยู่ใน Instructor Private Kit
- ZIP สาธารณะต้องไม่มี `.git/`, `node_modules/`, `.env`, token หรือไฟล์จาก `__MACOSX/`

## Acceptance Criteria

- [x] LAB01–LAB04 ใช้ Student Repository เดียวและ weekly branch
- [x] ทุก LAB มี source/evidence/publish/pages path ที่ตรวจได้
- [x] LAB04 ใช้ `lab/week-04` และ tag `lab-04-submission-v1`
- [x] มีคู่มือก่อน LAB01 สำหรับรุ่นถัดไป
- [x] มี migration guide สำหรับรุ่นปัจจุบันที่มี repo LAB01–03 แยกแล้ว
- [x] Template รองรับ LAB ในอนาคตด้วย `npm run add:lab -- week-NN`
- [x] ผู้สอนตรวจ code ผ่าน repository และผลผ่าน Pages Hub/Weekly Result ได้

