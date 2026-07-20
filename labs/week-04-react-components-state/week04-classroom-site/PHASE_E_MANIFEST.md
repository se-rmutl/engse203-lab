# Phase E Manifest — Week 04 Classroom Website

**สถานะ:** Verified baseline — unified Student Repository contract  
**รูปแบบ:** Single-page HTML slide website, 16:9 desktop/projector และ responsive mobile  
**Publishing source:** `docs/`

## Artifact Inventory

| Path | Role | Status |
|---|---|---|
| `docs/index.html` | 33-slide teaching website + embedded CSS/JavaScript | verified |
| `docs/images/` | 6 Week 04 diagrams/desktop/mobile references | verified |
| `docs/fonts/` | Thai Sarabun New Regular/Bold | verified |
| `docs/.nojekyll` | GitHub Pages compatibility | ready |
| `README.md` | local use, controls และ deployment guide | baseline |

## Required Section Coverage

- Overview
- Week 03 → React Bridge
- JSX Demo
- Component Demo
- Props Demo
- State & Event Demo
- Controlled Form Demo
- Pre-LAB 04
- LAB 4 Steps
- Instructor Solution
- GitHub Pages
- Submission Checklist
- Week 05 Connection / scope boundary

## Automated QA Record

- HTML contains 33 unique slide sections: pass
- JavaScript syntax: pass
- Runtime interaction suite: pass
- Chromium 1920×1080 slide overflow check: pass 33/33
- Chromium 390×844 horizontal overflow check: pass
- Mobile navigation drawer: pass
- JSX/component/props/state/form/checkpoint/checklist demos: pass
- Local images load: pass 6/6
- Embedded Thai font rendering: pass
- Markdown links in course repository: pass

## Release Gates

ก่อนใช้สอนจริงให้ผู้สอน:

1. เปิด `docs/index.html` ผ่าน VS Code Live Server บน iMac ห้องเรียน
2. ทดสอบ Fullscreen, keyboard, font scaling และ Copy อย่างละหนึ่งครั้ง
3. เปิดสไลด์ State และ Controlled Form แล้วทดลอง interaction
4. Deploy repository root `week04-classroom-site/` จาก `main /docs`
5. เปิด Pages URL ใน Incognito และตรวจ Console/Network ว่าไม่มี error หรือ 404

## Scope Boundary

เว็บไซต์สอนเฉพาะ Week 04: JSX, Components, Props, State, Events, Controlled Form, list/key, conditional rendering, responsive UI และ delivery workflow ไม่มี implementation ของ Router, remote fetching, persistence หรือ authentication
