# LAB 02 — Modern JavaScript, Modules & Async Data

**สัปดาห์ที่ 2** · หน่วยที่ 1 พื้นฐานการพัฒนาโปรแกรมสมัยใหม่และการทำงานร่วมกัน  
**รูปแบบงาน:** รายบุคคล  
**CLO ที่เกี่ยวข้อง:** CLO1, CLO2  
**การประเมิน:** A2 Weekly LAB — **3.00 คะแนนย่อย**  
**รูปแบบการส่ง:** GitHub Repository + Pull Request + GitHub Pages URL ผ่าน LMS

> งานนี้ใช้ **Vanilla JavaScript + Vite** เพื่อฝึก JavaScript สมัยใหม่อย่างชัดเจนก่อนเริ่ม React.js ในสัปดาห์ที่ 3

---

## 0. Classroom Sandbox — ทำพร้อมผู้สอน

ก่อนเริ่มทำ LAB ให้นักศึกษาเปิด Sandbox เพื่อทดลองแนวคิดสำคัญในสัปดาห์นี้แบบแก้โค้ดและดูผลลัพธ์ได้ทันที

- [เปิด Modern JavaScript Classroom Sandbox (source)](./sandbox/index.html)
- GitHub Pages ของรายวิชา: `https://se-rmutl.github.io/engse203/labs/week-02-modern-javascript/sandbox/`
- เนื้อหา: `const/let`, template literal, destructuring, spread, `map/filter/reduce`, `async/await`, `response.ok`, `try/catch/finally`
- มีโจทย์ Try It เพิ่มหัวข้อละ 2 กิจกรรม พร้อมปุ่มเปิด starter code ใน Editor และเฉลย/ผลลัพธ์
- มี **Free JavaScript Editor** แบบว่าง พร้อมปุ่ม `Run code` / `Reset` และ Console output สำหรับ Live Coding ในชั้นเรียน

> ลำดับที่แนะนำ: ทำตัวอย่าง → กด Run code → ทำโจทย์ Try It → เปิดเฉลย → เริ่มพัฒนาไฟล์ใน `starter/src/`

---

## 1. เป้าหมายของ LAB

เมื่อทำ LAB 02 เสร็จ นักศึกษาจะสามารถ

1. จัดโครงสร้าง JavaScript ด้วย **ES Modules** และใช้ `import` / `export` ได้
2. ใช้ **ES6+** เช่น `const`, `let`, destructuring, spread syntax, arrow function และ array methods ในงานจริงได้
3. โหลดข้อมูล JSON ด้วย `fetch` และ `async/await` พร้อมตรวจ `response.ok`
4. จัดการสถานะ **loading / success / error** ด้วย `try/catch/finally` โดยหน้าเว็บไม่เป็น blank page เมื่อเกิดข้อผิดพลาด
5. ใช้ `npm` scripts สำหรับ development, check, build และ preview ได้
6. ใช้ Git workflow แบบ `feature branch → meaningful commits → pull request → merge` ได้
7. Deploy เว็บไซต์ static ผ่าน **GitHub Pages** โดยใช้ผลลัพธ์ build ในโฟลเดอร์ `docs/` ได้

---

## 2. โจทย์: ENGSE203 Learning Dashboard

ให้สร้างเว็บแอปพลิเคชันชื่อ **ENGSE203 Learning Dashboard** สำหรับแสดงรายการแผนการเรียนรู้/งานฝึกปฏิบัติของรายวิชา

### ฟีเจอร์ขั้นต่ำที่ต้องมี

- ส่วนหัวเว็บมีชื่อ `ENGSE203 Learning Dashboard` และคำอธิบายสั้น ๆ
- โหลดข้อมูลจาก `public/data/learning-tasks.json` **ด้วย `fetch` + `async/await`**
- ไม่สร้าง task card แบบ hard-code ทั้งหมดใน HTML
- แสดง summary card 4 รายการ: `Total`, `To do`, `In progress`, `Done`
- ค้นหารายการด้วยคำค้นจาก **ชื่อหรือหัวข้อ**
- กรองสถานะ: `All`, `To do`, `In progress`, `Done`
- แสดงสถานะ `กำลังโหลดข้อมูล...` ก่อนโหลดสำเร็จ
- แสดงข้อความสำเร็จเมื่อโหลดข้อมูลได้
- เมื่อเปิด URL ที่เติม `?simulateError=1` ต้องแสดง error message ที่อ่านเข้าใจได้ และไม่แสดงหน้า blank
- หน้าเว็บ responsive อย่างน้อยรองรับความกว้าง desktop และ mobile
- หลัง build ต้องมี `docs/` และ GitHub Pages เปิดหน้าเว็บได้จริง

### โครงสร้างไฟล์ขั้นต่ำ

```text
engse203-lab02-<student-id>/
├── public/
│   ├── .nojekyll
│   └── data/
│       └── learning-tasks.json
├── scripts/
│   └── check-project.mjs
├── src/
│   ├── api.js
│   ├── main.js
│   ├── style.css
│   ├── ui.js
│   └── utils.js
├── docs/                         # สร้างจาก npm run build และต้อง commit
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

### หน้าที่ของแต่ละ Module

| ไฟล์ | หน้าที่ |
|---|---|
| `src/api.js` | โหลดข้อมูล JSON, ตรวจ `response.ok`, แจ้ง error |
| `src/utils.js` | ตรรกะที่ไม่ผูกกับ DOM เช่น filter, summary, label |
| `src/ui.js` | สร้าง summary card, task card และข้อความสถานะ |
| `src/main.js` | เชื่อม module, เก็บ state, ผูก event และเรียกโหลดข้อมูล |

---

## 3. สิ่งที่ต้องเตรียม

- Node.js รุ่น LTS + npm
- Git และบัญชี GitHub ที่ตั้งค่า SSH แล้ว
- Visual Studio Code
- เบราว์เซอร์สมัยใหม่
- อินเทอร์เน็ต

### มาตรฐานการใช้เครื่อง

| เครื่องที่ใช้ | Environment ที่ต้องใช้ |
|---|---|
| **iMac M1 / macOS** | VS Code Integrated Terminal (zsh) และโฟลเดอร์ `~/Documents/ENGSE203` |
| **Windows 11 notebook** | **VS Code Remote - WSL** + Ubuntu 24.04 LTS, ใช้โฟลเดอร์ `~/workspace/engse203` ใน WSL |

> สำหรับ Windows ห้ามรัน Node.js/npm/Git ของ LAB นี้จาก PowerShell หรือจาก `/mnt/c/...` ให้เปิดโฟลเดอร์ผ่าน WSL และตรวจว่ามุมซ้ายล่างของ VS Code แสดง `WSL: Ubuntu-24.04`

อ่านคู่มือเพิ่มเติม:
- [Part 1 — WSL 2 + Ubuntu 24.04 LTS](../../docs/part-1-wsl2-ubuntu-24.04-windows-11.md)
- [Part 2 — Developer Tools, GitHub SSH และ VS Code](../../docs/part-2-developer-tools-git-github-vscode.md)
- [คู่มือการส่งงาน](../../docs/submission-guide.md)

---

## 4. ขั้นตอนการทำ LAB

### ขั้นตอนที่ 1 — สร้าง Repository ส่งงานและ Feature Branch

1. สร้าง GitHub repository ใหม่ชื่อ

```text
engse203-lab02-<student-id>
```

2. สำหรับผู้ใช้ GitHub Free ให้ตั้ง repository เป็น **Public** เฉพาะกรณีที่นโยบายรายวิชาอนุญาต เพื่อใช้ GitHub Pages จาก branch ได้  
3. คัดลอก SSH URL แล้วเปิด Terminal ของ VS Code ใน workspace ของตนเอง

**macOS / iMac M1**

```bash
mkdir -p ~/Documents/ENGSE203
cd ~/Documents/ENGSE203
```

**Windows 11 + WSL**

```bash
mkdir -p ~/workspace/engse203
cd ~/workspace/engse203
```

จากนั้นใช้คำสั่งร่วมกัน

```bash
git clone git@github.com:<github-username>/engse203-lab02-<student-id>.git
cd engse203-lab02-<student-id>
git switch -c feature/lab02-dashboard
```

ตรวจสอบ branch:

```bash
git branch --show-current
```

ผลลัพธ์ต้องเป็น `feature/lab02-dashboard`

---

### ขั้นตอนที่ 2 — นำ Starter Files ไปใช้

ใน Course Repository นี้มี starter files อยู่ที่ [`starter/`](./starter/)

ให้คัดลอก **เนื้อหาภายใน** โฟลเดอร์ `starter/` ไปยัง repository ส่งงานของตนเอง โดยต้องไม่คัดลอก `.git` ของ Course Repository

ตัวอย่างเมื่อ clone Course Repository ไว้ข้าง ๆ งานของตนเอง:

```bash
cp -R ../ENGSE203-Labs-2569/labs/week-02-modern-javascript/starter/. .
```

หรือใช้การคัดลอกไฟล์ผ่าน Finder / File Explorer ได้ แต่ต้องคงโครงสร้างโฟลเดอร์ตามโจทย์

จากนั้นติดตั้ง dependency:

```bash
npm install
```

> Starter files มี `TODO` เพื่อเป็นจุดที่นักศึกษาต้องพัฒนาเอง ห้ามนำ solution ของผู้อื่นมาแทนที่ starter โดยไม่ทำความเข้าใจ

---

### ขั้นตอนที่ 3 — ตั้งค่า Vite สำหรับ GitHub Pages

เปิด `vite.config.js` แล้วเปลี่ยนค่าชื่อ repository ให้ตรงกับของตนเอง:

```js
const repositoryName = "engse203-lab02-<student-id>";
```

ค่า `base` ต้องเป็น

```text
/engse203-lab02-<student-id>/
```

และ build output ต้องเป็น `docs/`

> หาก `base` ไม่ตรงกับชื่อ repository เว็บไซต์ที่ deploy แล้วอาจพบไฟล์ CSS/JavaScript/JSON ไม่โหลดหรือขึ้น 404

---

### ขั้นตอนที่ 4 — พัฒนา Modern JavaScript Modules

พัฒนาไฟล์ต่อไปนี้ให้ครบ

#### 4.1 `src/api.js`

ต้องมี

- `export async function fetchLearningTasks(...)`
- `fetch` ไปยัง `data/learning-tasks.json` โดยคำนึงถึง Vite base path
- ตรวจ `response.ok`
- `throw new Error(...)` เมื่อโหลดข้อมูลไม่สำเร็จ
- รองรับ `simulateError` เพื่อให้ทดสอบ URL `?simulateError=1`

#### 4.2 `src/utils.js`

ต้องมีฟังก์ชันสำหรับ

- แปลงชื่อสถานะเป็นข้อความ
- ค้นหาและกรอง task จาก `query` และ `status`
- คำนวณ summary ได้แก่ total, todo, doing, done
- ใช้ Modern JavaScript อย่างน้อย 2 แนวคิด เช่น destructuring, spread syntax, arrow function, optional chaining, `map`, `filter`, `reduce`

#### 4.3 `src/ui.js`

ต้องมีฟังก์ชันสำหรับ

- แสดงข้อความ loading / success / error
- สร้าง summary cards
- สร้าง task cards จากข้อมูลที่โหลดมา
- แสดง empty state เมื่อค้นหา/กรองแล้วไม่พบข้อมูล

#### 4.4 `src/main.js`

ต้องมี

- import module จาก `api.js`, `utils.js`, `ui.js`
- state สำหรับ tasks, query และ status
- event listener ของ search input และ status select
- `async function loadDashboard()`
- `try/catch/finally` ที่แสดงผล error state อย่างชัดเจน
- อ่าน `simulateError` จาก URL query string

---

### ขั้นตอนที่ 5 — ตรวจและรันในเครื่อง

คำสั่งที่ต้องใช้:

```bash
npm run check
npm run dev
```

เปิด URL ที่ Vite แสดงใน Terminal แล้วตรวจฟีเจอร์ต่อไปนี้

1. หน้าเว็บโหลดรายการ task และ summary cards
2. ค้นหาคำว่า เช่น `React` หรือ `API`
3. เลือก filter status แล้วรายการเปลี่ยนตาม
4. เปิด URL แบบ error state

```text
http://localhost:5173/engse203-lab02-<student-id>/?simulateError=1
```

> URL ของ dev server อาจใช้ port อื่นได้ ให้คงเฉพาะ path และ query string ตามตัวอย่าง

ทดสอบ build:

```bash
npm run build
npm run preview
```

หลัง `npm run build` ต้องมีโฟลเดอร์ `docs/` และต้อง commit โฟลเดอร์นี้ด้วย

---

### ขั้นตอนที่ 6 — Commit, Pull Request และ Merge

ขั้นต่ำแนะนำให้มีอย่างน้อย **3 meaningful commits** บน feature branch เช่น

```bash
git add .
git commit -m "chore: scaffold LAB 02 dashboard"

git add .
git commit -m "feat: load and filter learning tasks"

git add .
git commit -m "feat: add dashboard UI and error state"
```

สร้าง build output ก่อนเปิด Pull Request:

```bash
npm run check
npm run build
git add .
git commit -m "build: prepare GitHub Pages deployment"
git push -u origin feature/lab02-dashboard
```

บน GitHub:

1. เลือก **Compare & pull request**
2. สร้าง Pull Request จาก `feature/lab02-dashboard` ไป `main`
3. ใน PR description ให้ตอบสั้น ๆ:
   - ใช้ ES Modules อย่างไร
   - ทดสอบ normal และ error state อย่างไร
   - วิธี run/build ของโครงงานคืออะไร
4. ตรวจสอบไฟล์และ merge Pull Request ไป `main`

หลัง merge ให้ตรวจว่า `main` มีโฟลเดอร์ `docs/` ล่าสุด

---

### ขั้นตอนที่ 7 — Deploy ด้วย GitHub Pages

1. เปิด GitHub repository → **Settings**
2. เลือก **Pages** ในส่วน *Code and automation*
3. ในหัวข้อ *Build and deployment* เลือก Source เป็น **Deploy from a branch**
4. เลือก Branch: `main`
5. เลือก Folder: `/docs`
6. กด Save และรอระบบ deploy
7. เปิด URL ที่ GitHub แสดง เช่น

```text
https://<github-username>.github.io/engse203-lab02-<student-id>/
```

ตรวจทั้ง normal state และ error state:

```text
https://<github-username>.github.io/engse203-lab02-<student-id>/?simulateError=1
```

> GitHub Pages ที่ publish แล้วเข้าถึงได้สาธารณะ จึงห้ามใส่ password, token, ข้อมูลส่วนบุคคลที่ไม่จำเป็น หรือข้อมูลลับใด ๆ ใน repository และในหน้าเว็บ

---

## 5. สิ่งที่ต้องส่ง

ส่งผ่าน LMS/Google Classroom หรือระบบที่ผู้สอนกำหนด

1. URL GitHub repository: `engse203-lab02-<student-id>`
2. URL GitHub Pages ที่เปิดหน้า Dashboard ได้จริง
3. URL Pull Request จาก `feature/lab02-dashboard` ไป `main` ที่ merge แล้ว
4. `README.md` ที่มีหัวข้อขั้นต่ำ:
   - ชื่อรายวิชา / รหัสนักศึกษา (ตามนโยบายรายวิชา)
   - คำอธิบายโครงงาน
   - วิธีติดตั้งและรัน `npm install`, `npm run dev`, `npm run check`, `npm run build`
   - GitHub Pages URL
   - ภาพหน้าจอ **normal state** และ **error state**
   - ปัญหาที่พบและวิธีแก้
   - `References & AI Assistance`
5. Source code ที่มี 4 modules ขั้นต่ำและ build output `docs/` บน `main`

> **ไม่ส่งไฟล์ ZIP** เว้นแต่ผู้สอนกำหนดเป็นกรณีพิเศษ

---

## 6. เกณฑ์ประเมิน A2: LAB 02 (รวม 3.00 คะแนน)

| เกณฑ์ | หลักฐานที่ตรวจ | คะแนน |
|---|---|---:|
| Modern JavaScript & ES Modules | Modern JS เหมาะสม, แยก `api/utils/ui/main`, import/export ถูกต้อง | 0.80 |
| Async/Await & Error Handling | `fetch`, `async/await`, `response.ok`, `try/catch/finally`, loading/success/error state | 0.80 |
| npm Scripts & Build | `dev`, `build`, `preview`, `check`; `npm run check` และ `npm run build` สำเร็จ; มี `docs/` | 0.40 |
| Git Workflow | feature branch, meaningful commits, PR และ merge ตรวจสอบได้ | 0.50 |
| GitHub Pages & Documentation | Pages ทำงาน, README ครบ, หลักฐาน normal/error, อ้างอิง/AI disclosure | 0.50 |
| **รวม** |  | **3.00** |

---

## 7. Checklist ก่อนส่ง

- [ ] ใช้ repository ชื่อ `engse203-lab02-<student-id>`
- [ ] ทำงานบน `feature/lab02-dashboard` และ merge PR ไป `main` แล้ว
- [ ] มี `src/api.js`, `src/utils.js`, `src/ui.js`, `src/main.js`
- [ ] ข้อมูลโหลดจาก JSON ด้วย `fetch` และ `async/await`
- [ ] มี `response.ok`, `try/catch/finally` และ error state จาก `?simulateError=1`
- [ ] ค้นหา กรอง และ summary ทำงาน
- [ ] `npm run check` ผ่าน
- [ ] `npm run build` ผ่าน และมี `docs/` ใน `main`
- [ ] GitHub Pages ตั้งค่า `main` + `/docs` และ URL เปิดได้
- [ ] README มีวิธีรัน, screenshot normal/error และ References & AI Assistance
- [ ] ไม่มี `node_modules`, token, password หรือ `.env` ที่มีความลับใน repository
- [ ] ส่ง Repository URL + Pages URL + PR URL ผ่าน LMS แล้ว

---

## 8. ปัญหาที่พบบ่อย

| อาการ | แนวทางตรวจสอบ |
|---|---|
| `npm` หรือ `node` ไม่พบคำสั่ง | Windows ให้ตรวจว่ากำลังใช้ terminal ของ WSL Ubuntu; ปิด/เปิด terminal ใหม่หลังติดตั้ง |
| เปิด `index.html` ตรง ๆ แล้วข้อมูลไม่โหลด | ต้องใช้ `npm run dev` หรือ `npm run preview` ไม่ใช้ `file://` |
| Deploy แล้ว CSS/JS/JSON ขึ้น 404 | ตรวจชื่อ repository ใน `vite.config.js`, ค่า `base`, build ใหม่ และ commit `docs/` ไป `main` |
| Browser แจ้ง import error | ตรวจ `<script type="module">` และใช้ relative import เช่น `./utils.js` |
| GitHub Pages ยังไม่ขึ้น | ตรวจ `Settings → Pages → main /docs`, ตรวจว่า `docs/` มีอยู่ใน `main`, แล้วดู Actions/Pages deployment |
| `git push` ผ่าน SSH ไม่ได้ | ทดสอบ `ssh -T git@github.com` และกลับไปตรวจ SSH key ตามคู่มือ Part 2 |

---

## 9. ความซื่อสัตย์ทางวิชาการ

งานนี้เป็น **งานรายบุคคล** นักศึกษาปรึกษาแนวคิดได้ แต่ต้องพัฒนา repository ของตนเองและสามารถอธิบายโค้ดทุกส่วนที่ส่งได้

- ให้เปิดเผยเว็บไซต์ เอกสาร ตัวอย่างโค้ด และการใช้ AI ในหัวข้อ `References & AI Assistance`
- ระบุสิ่งที่ตนเองนำมาปรับและสิ่งที่เข้าใจจากแหล่งดังกล่าว
- ห้ามคัดลอก repository ของผู้อื่นหรือ upload solution ของผู้อื่นเป็นงานของตน
- ห้าม push token, password, `.env` หรือข้อมูลลับขึ้น GitHub

---

## เอกสารอ้างอิง

- GitHub Docs — Quickstart for GitHub Pages
- GitHub Docs — Configuring a publishing source for your GitHub Pages site
- Vite Documentation — Static Site Deployment
- MDN Web Docs — JavaScript Modules, Fetch API, async function และ Error handling
