# LAB 01 — Developer Environment & GitHub Repository Setup

**สัปดาห์ที่ 1** · หน่วยที่ 1 พื้นฐานการพัฒนาโปรแกรมสมัยใหม่และการทำงานร่วมกัน  
**รูปแบบงาน:** รายบุคคล  
**CLO ที่เกี่ยวข้อง:** CLO1, CLO2, CLO7  
**หลักฐานการประเมิน:** A2 Weekly LAB — 3 คะแนนย่อย

## เป้าหมายของ LAB

เมื่อทำ LAB นี้เสร็จ นักศึกษาจะสามารถ

1. ตรวจสอบและใช้ Node.js, npm, Visual Studio Code และ Git จาก Terminal ได้
2. สร้างโครงงาน JavaScript ขนาดย่อม พร้อม `package.json` และ npm script
3. รันโปรแกรม Node.js ที่แสดงชื่อ รหัสนักศึกษา OS และ Node.js version ได้
4. สร้าง GitHub repository, commit, push และจัดทำ README เพื่อเป็นหลักฐานการเรียนรู้ได้

## สิ่งที่ต้องเตรียม

- Visual Studio Code
- Node.js รุ่น LTS และ npm
- Git
- บัญชี GitHub ที่ใช้งานได้
- อินเทอร์เน็ต

> ใช้ iMac M1/macOS ในห้องปฏิบัติการ หรือ notebook Windows ของตนเองได้ โดยทำ [Setup Guide v3](../../docs/setup/README.md) ให้ครบก่อน สำหรับ Windows ให้ใช้ Ubuntu 24.04 LTS บน WSL 2 ตาม [Windows 11 + WSL2 Setup](../../docs/setup/windows-11-wsl2.md)

---

## ขั้นตอนที่ 1 — ตรวจสอบเครื่องมือ

เปิด **Visual Studio Code → Terminal → New Terminal** แล้วรันคำสั่งต่อไปนี้

```bash
node -v
npm -v
git --version
```

ผลลัพธ์ควรเป็นหมายเลขเวอร์ชันทั้ง 3 รายการ หากคำสั่งใดแสดงข้อความว่าไม่พบคำสั่ง ให้แจ้งผู้สอน/ผู้ช่วยสอนก่อนดำเนินการต่อ

### จุดที่ macOS และ Windows ต่างกัน

| รายการ | iMac M1 / macOS | Windows 11 notebook | แนวปฏิบัติร่วม |
|---|---|---|---|
| Terminal | VS Code Terminal (zsh) | VS Code Remote - WSL Terminal (Bash) | ใช้ VS Code Integrated Terminal เป็นหลัก |
| Environment | macOS native | Ubuntu 24.04 LTS บน WSL 2 | รัน Node.js, npm และ Git จาก environment นี้ |
| โฟลเดอร์งาน | `~/Documents/ENGSE203` | `~/workspace/engse203` ใน Ubuntu WSL | ตั้งชื่อ project เป็นภาษาอังกฤษ |
| การเปิดโฟลเดอร์ | `code .` | รัน `code .` จาก Ubuntu WSL | Windows ต้องเห็น `WSL: Ubuntu-24.04` ที่มุมซ้ายล่าง |

> **Windows:** ห้ามทำ LAB นี้ใน PowerShell หรือโฟลเดอร์ `/mnt/c/...` ให้เปิด Ubuntu WSL แล้วทำตาม [Windows 11 + WSL2 Setup](../../docs/setup/windows-11-wsl2.md) และ [Git + GitHub SSH Guide](../../docs/setup/git-github-ssh.md) ก่อน

---

## ขั้นตอนที่ 2 — สร้างโครงสร้างโครงงาน

สร้างพื้นที่ทำงานของรายวิชา แล้วสร้างโครงงาน LAB 1

**macOS / iMac M1**

```bash
mkdir -p ~/Documents/ENGSE203
cd ~/Documents/ENGSE203
```

**Windows 11 + Ubuntu WSL**

```bash
mkdir -p ~/workspace/engse203
cd ~/workspace/engse203
```

จากนั้น ใช้คำสั่งร่วมกันทั้งสองระบบ

```bash
mkdir engse203-lab01
cd engse203-lab01
npm init -y
mkdir src
code .
```

> Windows students ต้องรันคำสั่งนี้ใน Ubuntu WSL terminal เท่านั้น และหลัง `code .` ให้ตรวจว่ามุมซ้ายล่างของ VS Code แสดง `WSL: Ubuntu-24.04`

โครงสร้างขั้นต่ำที่ต้องได้คือ

```text
engse203-lab01/
├── src/
│   └── hello.js
├── package.json
└── README.md
```

นักศึกษาสามารถคัดลอกไฟล์ตัวอย่างจากโฟลเดอร์ [`starter/`](./starter/) ไปยัง repository ส่งงานของตนเอง หรือสร้างเองตามขั้นตอนนี้

---

## ขั้นตอนที่ 3 — เขียนและรันโปรแกรม JavaScript

สร้างไฟล์ `src/hello.js` แล้วใส่โค้ดต่อไปนี้ โดยเปลี่ยนชื่อและรหัสนักศึกษาเป็นของตนเอง

```js
const student = {
  name: "ชื่อ-นามสกุล",
  studentId: "รหัสนักศึกษา",
  os: process.platform,
  node: process.version,
};

function createGreeting({ name, studentId, os, node }) {
  return `Hello ${name} (${studentId}) | OS: ${os} | Node: ${node}`;
}

console.log(createGreeting(student));
```

เปิดไฟล์ `package.json` และแก้ส่วน `scripts` ให้มีคำสั่ง `start`

```json
{
  "scripts": {
    "start": "node src/hello.js"
  }
}
```

จากนั้นรันโปรแกรม

```bash
npm run start
```

ผลลัพธ์ต้องแสดงชื่อ รหัสนักศึกษา ระบบปฏิบัติการ และ Node.js version ของเครื่องที่ใช้จริง

---

## ขั้นตอนที่ 4 — สร้าง GitHub Repository และ Push งาน

1. เปิด GitHub ผ่านเว็บเบราว์เซอร์
2. สร้าง repository ใหม่ชื่อ

```text
engse203-lab01-<student-id>
```

3. เลือกสร้าง repository ว่าง **ไม่ต้องสร้าง README จากหน้า GitHub**
4. กดปุ่ม **Code → SSH** แล้วคัดลอก SSH repository URL จาก GitHub จากนั้นรันคำสั่งด้านล่างภายในโฟลเดอร์ `engse203-lab01`

```bash
git config --global user.name "ชื่อภาษาอังกฤษของนักศึกษา"
git config --global user.email "อีเมลที่ใช้กับ GitHub"

git init
git add .
git commit -m "feat: initialize ENGSE203 Lab 1"
git branch -M main
git remote add origin git@github.com:<github-username>/engse203-lab01-<student-id>.git
git push -u origin main
```

หลัง push สำเร็จ ให้เปิดหน้า repository แล้วตรวจว่ามี `src/hello.js`, `package.json` และ `README.md` ครบถ้วน หาก push ไม่ผ่านให้กลับไปตรวจ SSH key ตาม [GitHub SSH Guide](../../docs/setup/git-github-ssh.md)

---

## ขั้นตอนที่ 5 — เขียน README ของงานตนเอง

ให้ใช้ [README template](../../templates/student-lab-readme-template.md) แล้วเติมข้อมูลอย่างน้อยต่อไปนี้

- ชื่อ-นามสกุล และรหัสนักศึกษา
- ระบบปฏิบัติการที่ใช้ (macOS หรือ Windows)
- คำสั่งติดตั้ง/รันงาน: `npm run start`
- ภาพหน้าจอหรือข้อความผลลัพธ์จาก Terminal อย่างน้อย 1 หลักฐาน
- ปัญหาที่พบและวิธีแก้ไข (ถ้ามี)
- หัวข้อ `References & AI Assistance` เมื่อมีการใช้เอกสาร/เว็บไซต์/AI ช่วยทำความเข้าใจ

---

## สิ่งที่ต้องส่ง

ส่งผ่าน LMS/Google Classroom หรือระบบที่ผู้สอนกำหนด

1. URL ของ GitHub repository ชื่อ `engse203-lab01-<student-id>`
2. `src/hello.js` ที่รันได้จริงและแสดงชื่อ รหัสนักศึกษา OS และ Node.js version
3. `package.json` ที่มี `scripts.start = "node src/hello.js"`
4. README ที่ครบถ้วนตามข้อกำหนด พร้อมหลักฐานผลการรัน
5. Git history อย่างน้อย 1 meaningful commit ที่ push ไปยัง `main` แล้ว

> **ไม่ส่งไฟล์ ZIP** เว้นแต่ผู้สอนสั่งเป็นกรณีพิเศษ

---

## เกณฑ์ประเมิน (รวม 3 คะแนน)

| รายการ | เกณฑ์ | คะแนน |
|---|---|---:|
| 1. เครื่องมือและ environment | ตรวจ `node -v`, `npm -v`, `git --version` สำเร็จ และใช้ Terminal ใน VS Code ได้ | 0.5 |
| 2. โครงสร้างโครงงานและ npm script | มี `src/hello.js`, `package.json` และ `npm run start` รันได้จริง | 1.0 |
| 3. README และหลักฐานการใช้งาน | README ครบ มีวิธีรันและหลักฐานผลลัพธ์ | 0.5 |
| 4. Git/GitHub workflow | มี repository, commit, push และข้อความ commit เหมาะสม | 0.5 |
| 5. ความรับผิดชอบและคุณภาพงาน | ส่งตรงเวลา ไม่มี secret และระบุการอ้างอิง/AI เมื่อมี | 0.5 |
| **รวม** |  | **3.0** |

## Checklist ก่อนส่ง

- [ ] `node -v`, `npm -v`, `git --version` ทำงาน
- [ ] มี `src/hello.js`, `package.json`, `README.md`
- [ ] `npm run start` แสดงชื่อ รหัสนักศึกษา OS และ Node.js version
- [ ] README มีวิธีรัน และหลักฐานผลลัพธ์
- [ ] GitHub repository มี commit และ push ไป `main` แล้ว
- [ ] ส่ง URL ผ่าน LMS แล้ว
- [ ] ไม่มี token, password หรือ `.env` อยู่ใน repository

## เมื่อเจอปัญหา

| อาการ | แนวทางตรวจสอบ |
|---|---|
| `node` ไม่พบคำสั่ง | ตรวจว่าติดตั้ง Node.js แล้ว และเปิด Terminal ใหม่ |
| `git` ไม่พบคำสั่ง | ตรวจการติดตั้ง Git / macOS อาจต้องยืนยัน Command Line Tools |
| `npm run start` ไม่ทำงาน | ตรวจ `package.json` ว่ามี `scripts.start` และ path ไฟล์ถูกต้อง |
| push ไม่ได้ | ตรวจ remote URL, ชื่อ branch `main`, สิทธิ์ GitHub และการ sign in |
| หน้า GitHub ไม่มีไฟล์ | รัน `git status` และตรวจว่าได้ `git add`, `commit`, `push` ครบ |
