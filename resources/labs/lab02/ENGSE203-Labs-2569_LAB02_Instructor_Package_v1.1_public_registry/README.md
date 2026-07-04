# ENGSE203 LAB 02 — Instructor Solution & Grading Package

> **สำหรับผู้สอน/ผู้ช่วยสอนเท่านั้น — ห้าม push โฟลเดอร์นี้ไปยัง Course Repository ที่นักศึกษาเข้าถึงได้**

## Contents

```text
ENGSE203-Labs-2569_LAB02_Instructor_Package/
├── solution/
│   └── engse203-lab02-solution/   # Reference solution, tested with Vite
├── grading/
│   ├── LAB02_Grading_Guide.md     # Rubric and inspection workflow
│   ├── LAB02_Score_Sheet.csv      # Score entry template
│   └── README.md
└── instructor-tools/
    └── evaluate-lab02.mjs         # Structural-evidence checklist
```

## Reference solution

```bash
cd solution/engse203-lab02-solution
npm ci
npm run check
npm run build
npm run dev
```

## Check a student repository

```bash
node instructor-tools/evaluate-lab02.mjs /path/to/engse203-lab02-<student-id>
```

This command checks files and basic code evidence only. Read the grading guide before awarding the final score.

---

## v1.1 repair — public npm registry

The solution package lock has been repaired to use `https://registry.npmjs.org/` rather than a private build registry. See [`FIX_NPM_INSTALL_MACOS.md`](./FIX_NPM_INSTALL_MACOS.md) if an earlier extracted copy is still timing out during `npm install`.
