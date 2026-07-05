# ENGSE203 LAB Repository

> **Repository version:** v3.0.0 — Node.js 22+, GitHub SSH, VS Code และ Cross-platform Setup

> **ENGSE203 การเขียนโปรแกรมสำหรับวิศวกรซอฟต์แวร์**  
> *Computer Programming for Software Engineer*  
> หลักสูตรวิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมซอฟต์แวร์

Repository นี้เป็นพื้นที่รวมเอกสารปฏิบัติการ (LAB), starter files, แบบฟอร์มการส่งงาน และแนวทางพัฒนาโครงงานของรายวิชา ENGSE203 โดยออกแบบให้ผู้เรียนต่อยอดจากพื้นฐานในรายวิชา **ENGCC304 การเขียนโปรแกรมคอมพิวเตอร์** ไปสู่การพัฒนาโปรแกรมแบบ **Full-Stack** ที่มี Front-end, Back-end, RESTful API, ฐานข้อมูล, การทดสอบ และการทำงานร่วมกันด้วย Git/GitHub

## ผลลัพธ์ปลายทางของรายวิชา

เมื่อจบรายวิชา นักศึกษาควรสามารถสร้างโปรแกรมขนาดย่อมที่มีคุณลักษณะต่อไปนี้ได้

- Front-end แบบ Responsive และ Interactive ด้วย **React.js**
- Back-end และ **RESTful API** ด้วย **Node.js / Express**
- การจัดเก็บข้อมูลด้วย **SQLite** หรือ **MongoDB**
- การทดสอบระดับหน่วย การแก้ไขข้อผิดพลาด และการตรวจสอบคุณภาพพื้นฐาน
- README, Git history, branch, pull request และหลักฐานการทำงานที่ตรวจสอบได้
- โครงงานกลุ่ม Full-Stack พร้อมการสาธิตในช่วงท้ายรายวิชา

## การใช้ Repository นี้

Repository นี้เป็น **Course Repository** สำหรับอ่านใบงานและคัดลอก starter files เท่านั้น เว้นแต่ผู้สอนประกาศให้ส่งงานผ่าน GitHub Classroom โดยตรง

1. Clone หรือดาวน์โหลด repository นี้ไว้ในเครื่อง
2. เปิด README ของ LAB ที่กำลังเรียนจากตารางด้านล่าง
3. สร้าง repository ส่งงานของตนเองตามชื่อที่ LAB กำหนด
4. คัดลอก starter files เฉพาะเมื่อใบงานระบุให้ใช้
5. Commit และ push งานของตนเอง แล้วส่ง URL ผ่าน LMS/Google Classroom

> **สำคัญ:** ไม่ควร commit รหัสผ่าน, token, ไฟล์ `.env` หรือข้อมูลส่วนบุคคลที่ไม่จำเป็นขึ้น GitHub

## เริ่มต้นใช้งาน Course Repository บน GitHub

นักศึกษาให้เปิดหน้า repository ของรายวิชาบน GitHub → **Code → SSH** แล้ว clone ด้วย URL ที่ผู้สอนประกาศ เช่น:

```bash
git clone git@github.com:<organization-or-user>/engse203-lab.git
cd engse203-lab
```

ผู้ดูแล repository ที่กำลังเตรียม source ขึ้น GitHub ครั้งแรก ให้กำหนด remote แล้ว push:

```bash
git remote add origin git@github.com:<organization-or-user>/engse203-lab.git
git push -u origin main
```

## เครื่องมือหลัก

| เครื่องมือ | ใช้ทำอะไร | หมายเหตุ |
|---|---|---|
| Visual Studio Code | เขียนโค้ดและเปิด Integrated Terminal | ใช้ได้ทั้ง macOS และ Windows |
| Node.js (LTS) + npm | รัน JavaScript และจัดการ package/script | ใช้รุ่นที่ผู้สอนกำหนด |
| Git + GitHub | จัดการเวอร์ชัน ส่งงาน และทำงานร่วมกัน | ตรวจสอบ commit history ทุกงาน |
| Browser DevTools | ตรวจสอบหน้าเว็บและแก้ไขข้อผิดพลาด | Chrome, Edge, Safari หรือ Firefox |
| Postman / Thunder Client | ทดสอบ RESTful API | ใช้ตาม LAB ที่กำหนด |
| SQLite / MongoDB tools | ตรวจสอบและจัดการฐานข้อมูล | ใช้ตามประเภทฐานข้อมูลของ LAB |

## เริ่มต้นตั้งค่าเครื่อง (Setup Guide v3)

ก่อนเริ่ม LAB 01 นักศึกษาต้องตั้งค่าเครื่องให้ครบตามลำดับด้านล่าง โดยมาตรฐานของรายวิชาคือ **Node.js 22.x (`>=22.12.0`)**, GitHub SSH และ Visual Studio Code

| ลำดับ | สิ่งที่ทำ | macOS / iMac M1 | Windows 11 + WSL2 |
|---:|---|---|---|
| 1 | เตรียม OS, VS Code, nvm, Node.js, Git และ SQLite | [macOS Setup](./docs/setup/macos.md) | [Windows 11 + WSL2 Setup](./docs/setup/windows-11-wsl2.md) |
| 2 | ตั้งค่า Git commit identity และ SSH key สำหรับ GitHub | [Git + GitHub SSH](./docs/setup/git-github-ssh.md) | [Git + GitHub SSH](./docs/setup/git-github-ssh.md) |
| 3 | Sign in GitHub ใน VS Code และติดตั้ง extensions | [VS Code + GitHub](./docs/setup/vscode-github.md) | [VS Code + GitHub](./docs/setup/vscode-github.md) |
| 4 | ตรวจ Node/npm/Git/SSH และทดสอบ push งานจริง | [Setup Verification](./docs/setup/verification.md) | [Setup Verification](./docs/setup/verification.md) |

> **มาตรฐาน Windows ของรายวิชา:** เปิด project ด้วย VS Code Remote - WSL และรัน `node`, `npm`, `git`, `ssh`, `sqlite3` **ภายใน Ubuntu WSL** เท่านั้น ไม่ทำงานใน PowerShell และไม่เก็บ active project ไว้ใน `/mnt/c/...`

### เริ่มเร็ว

- [Setup Hub — เลือกคู่มือตามเครื่อง](./docs/setup/README.md)
- [ตรวจแบบเร็วด้วย `node scripts/verify-setup.mjs`](./docs/setup/verification.md)
- [แก้ปัญหา SSH account / permission / หลาย GitHub accounts](./docs/setup/git-github-ssh.md)

## เส้นทาง LAB ตลอดรายวิชา

| สัปดาห์ | หน่วยเรียน / งาน | รูปแบบ | หลักฐานสำคัญ | ลิงก์ |
|---:|---|---|---|---|
| 1 | LAB 01 — Developer Environment & GitHub Repository Setup | รายบุคคล | Node/npm/Git, `hello.js`, README, GitHub repository | [เปิด LAB 01](./labs/week-01-developer-environment-git-github/) |
| 2 | LAB 02 — Modern JavaScript, Modules & Async Data | รายบุคคล | ES6+, module, async/await, error handling, branch/PR | [เปิด LAB 02](./labs/week-02-modern-javascript/) |
| 3 | LAB 03 — Responsive Web UI & Form Interaction | รายบุคคล | HTML/CSS, responsive UI, form validation, DOM/event | [เปิด LAB 03](./labs/week-03-responsive-ui/) |
| 4 | LAB 04 — React Components, Props & State | รายบุคคล | React component, props, state, event handling | [เปิด LAB 04](./labs/week-04-react-components-state/) |
| 5 | LAB 05 — React Routing, Data Fetching & Front-end Mini App | รายบุคคล | routing, form, local state, fetch/mock data | [เปิด LAB 05](./labs/week-05-react-mini-app/) |
| 6 | LAB 06 — Node.js / Express API Foundation | รายบุคคล | Express app, route, middleware, controller/service | [เปิด LAB 06](./labs/week-06-express-api-foundation/) |
| 7 | LAB 07 — RESTful API, Validation & Error Handling | รายบุคคล | REST design, HTTP status, validation, errors | [เปิด LAB 07](./labs/week-07-rest-validation/) |
| 8 | LAB 08 — API Contract, CORS & Front-end Integration | รายบุคคล | API contract, API test, CORS/configuration, integration | [เปิด LAB 08](./labs/week-08-api-integration/) |
| 9 | สอบกลางภาค | รายบุคคล | ทฤษฎีและปฏิบัติ JavaScript, React, REST API | [รายละเอียดขอบเขต](./labs/week-09-midterm/) |
| 10 | LAB 09 — SQLite & SQL CRUD with Node.js | รายบุคคล | data model, SQLite, SQL CRUD, parameterized query | [เปิด LAB 09](./labs/week-10-sqlite-crud/) |
| 11 | LAB 10 — MongoDB, Mongoose & NoSQL CRUD | รายบุคคล | collection/document, schema, model, CRUD | [เปิด LAB 10](./labs/week-11-mongodb-mongoose/) |
| 12 | LAB 11 — Individual Full-Stack Integration | รายบุคคล | React + API + Database working end-to-end | [เปิด LAB 11](./labs/week-12-fullstack-integration/) |
| 13 | LAB 12 — Unit Testing & Debugging Report | รายบุคคล | test case, unit test, debugging/logging evidence | [เปิด LAB 12](./labs/week-13-testing-debugging/) |
| 14 | LAB 13 — Quality, Security & Delivery Readiness | รายบุคคล | validation, `.env`, security checklist, documentation | [เปิด LAB 13](./labs/week-14-quality-security/) |
| 15 | LAB 14 — Cross-platform Product Sprint 1 | กลุ่ม | team plan, issue, branch, PR, cross-platform plan | [เปิด LAB 14](./labs/week-15-team-sprint-1/) |
| 16 | LAB 15 — Team Full-Stack Sprint 2 & Demo | กลุ่ม | code review, test, README, demo, peer evaluation | [เปิด LAB 15](./labs/week-16-team-sprint-2-demo/) |
| 17 | ทบทวนบทเรียน | รายบุคคล | checkpoint, error clinic, final preparation | [แนวทางทบทวน](./labs/week-17-review/) |
| 18 | สอบปลายภาค | รายบุคคล | วิเคราะห์/ประยุกต์/ปรับปรุงระบบจากโจทย์ | [รายละเอียดขอบเขต](./labs/week-18-final/) |

## แผนผังหน่วยเรียน

```text
หน่วยที่ 1  พื้นฐานการพัฒนาโปรแกรมสมัยใหม่และการทำงานร่วมกัน
            └─ Week 1–2: JavaScript, Node/npm, Git/GitHub

หน่วยที่ 2  การพัฒนาส่วนติดต่อผู้ใช้ด้วย React.js
            └─ Week 3–5: Responsive UI, React Components, Routing

หน่วยที่ 3  การพัฒนาส่วนหลังและ RESTful API ด้วย Node.js
            └─ Week 6–8: Express, REST API, Validation, API Integration

หน่วยที่ 4  ฐานข้อมูลและการบูรณาการระบบ Full-Stack
            └─ Week 10–12: SQLite, MongoDB, Full-Stack Integration

หน่วยที่ 5  คุณภาพซอฟต์แวร์ การทดสอบ และความพร้อมก่อนใช้งาน
            └─ Week 13–14: Unit Test, Debugging, Security, Documentation

หน่วยที่ 6  การพัฒนาแบบข้ามแพลตฟอร์มและโครงงานบูรณาการ
            └─ Week 15–16: Team Sprint, Git Collaboration, Demo
```

## การประเมินผลที่เชื่อมกับงานใน Repository

| กิจกรรม | สัดส่วน | หลักฐานจาก Repository |
|---|---:|---|
| A1 ความรับผิดชอบทางวิชาชีพ | 5% | แหล่งอ้างอิง, AI disclosure, ความครบถ้วน, Git history |
| A2 Weekly LAB รายบุคคล | 25% | งาน LAB 01–10 และ LAB 12 ที่กำหนด |
| A3 สอบกลางภาค | 15% | ตามข้อสอบและชิ้นงานในสัปดาห์ที่ 9 |
| A4 งานบูรณาการ Full-Stack รายบุคคล | 15% | LAB 11: React + API + Database |
| A5 งานคุณภาพและความปลอดภัย | 10% | LAB 13: test, validation, `.env`, documentation |
| A6 Team Mini Project & Demo | 15% | LAB 14–15: issue, branch, PR, peer review, demo |
| A7 สอบปลายภาค | 15% | ตามข้อสอบและชิ้นงานในสัปดาห์ที่ 18 |
| **รวม** | **100%** | |

## กติกาการส่งงานมาตรฐาน

- ส่ง **URL ของ GitHub repository** ผ่าน LMS/Google Classroom ภายในเวลาที่กำหนด
- `main` branch ต้องรันได้ตาม README
- ทุกงานต้องมี README ที่อธิบายวิธีติดตั้ง วิธีรัน และหลักฐานผลลัพธ์ตามที่ใบงานกำหนด
- งานกลุ่มต้องแสดงการมีส่วนร่วมของสมาชิกผ่าน issue, branch, commit และ pull request
- การใช้ AI หรือแหล่งตัวอย่างภายนอกทำได้เมื่อผู้สอนอนุญาต แต่ต้องเปิดเผยแหล่งอ้างอิงและอธิบายส่วนที่นักศึกษาปรับ/เข้าใจด้วยตนเอง

อ่านรายละเอียดที่ [คู่มือการส่งงาน](./docs/submission-guide.md) และ [แนวปฏิบัติด้านความซื่อสัตย์ทางวิชาการและ AI](./docs/academic-integrity-ai.md)

## โครงสร้าง Repository

```text
ENGSE203-Labs-2569/
├── README.md
├── docs/
│   ├── setup/
│   │   ├── README.md
│   │   ├── macos.md
│   │   ├── windows-11-wsl2.md
│   │   ├── git-github-ssh.md
│   │   ├── vscode-github.md
│   │   └── verification.md
│   └── cross-platform-setup.md
├── templates/
├── labs/
│   ├── week-01-developer-environment-git-github/
│   ├── week-02-modern-javascript/
│   ├── ...
│   └── week-18-final/
└── .github/
```

---

**ผู้รับผิดชอบรายวิชา:** อาจารย์ธนิต เกตุแก้ว  
**กลุ่มเป้าหมาย:** นักศึกษาวิศวกรรมซอฟต์แวร์ ชั้นปีที่ 2  
**คำแนะนำ:** ทำ [Setup Guide v3](./docs/setup/README.md) ให้ครบก่อน แล้วจึงเริ่ม [LAB 01](./labs/week-01-developer-environment-git-github/) อย่าข้ามการตั้งค่า Git/GitHub ผ่าน SSH เพราะเป็นฐานของการทำ branch, pull request, push และหลักฐานการเรียนรู้ตลอดภาคการศึกษา
