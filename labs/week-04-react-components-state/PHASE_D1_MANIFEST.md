# Week 04 Student-Safe Code Manifest

**สถานะ:** Baseline synchronized with Unified Student Repository  
**วันที่:** 2026-07-20

## Artifact Inventory

| Path | Audience | Role | Status |
|---|---|---|---|
| `pre-lab04/README.md` | Student | guided activity 240 นาที | baseline |
| `pre-lab04/INSTRUCTOR_STEP_SCRIPT.md` | Instructor | facilitation/check/misconception | baseline |
| `pre-lab04/starter/` | Student | CP00 working copy | build verified |
| `pre-lab04/checkpoints/CP00–CP07/` | Instructor/Student recovery | source snapshots | baseline |
| `lab04/README.md` | Student | independent homework 240 นาที | unified contract |
| `lab04/starter/` | Student | React scaffold + TODO/evidence | starter check intentionally incomplete |
| `lab04/INSTRUCTOR_GRADING_CHECKLIST.md` | Instructor | rubric/diagnosis | unified contract |

Instructor solutions และ Live-Coding Runbook ฉบับเต็มเก็บใน Instructor Kit แยกจาก Course Repository สาธารณะ

## Canonical Delivery Contract

```text
Repository: engse203-student-labs-<student-id>
Branch: lab/week-04
Source: labs/week-04/source/
Evidence: labs/week-04/evidence/
Vite output: labs/week-04/source/dist/
Publish input: labs/week-04/publish/
Pages output: docs/labs/week-04/
Submission tag: lab-04-submission-v1
```

## Verification Record

- Pre-LAB starter production build: pass
- CP00–CP07 baseline available
- LAB4 starter build contract uses `base: './'` and `outDir: 'dist'`
- LAB4 verifier checks component/state/form/immutable/accessibility contract
- Student Repository scripts own Pages Hub generation and weekly verification
- Course Repository public package contains no LAB4 solution
- Week 05 implementation remains out of scope

## Release Gates

- Test starter on iMac M1 and Windows 11 + WSL2
- Simulate branch `lab/week-04`, PR, merge and tag
- Import `dist/` into publish and build Pages Hub
- Open `/labs/week-04/` in Incognito and check asset 404
- Keep Instructor Solution outside public Student Kit
