# ENGSE203 Setup Hub — เริ่มต้นติดตั้งเครื่องก่อนทำ LAB

> **Setup Guide v3.0.0** · ใช้กับปีการศึกษา 2569  
> ทำตามลำดับนี้เพียงครั้งเดียวต่อ **เครื่อง / environment** ที่ใช้งาน

คู่มือนี้ทำให้นักศึกษาพร้อมสำหรับ LAB 01–15 ด้วย environment เดียวกันทั้ง macOS และ Windows 11 + WSL2:

- Node.js **22.x ขึ้นไป** — รายวิชามาตรฐานที่ `>= 22.12.0`
- npm, Git และ SSH สำหรับ GitHub
- Visual Studio Code และ extensions ที่ใช้ต่อเนื่อง
- GitHub account, commit identity, branch และ repository workflow

## เลือกเส้นทางตามเครื่องที่ใช้

| เครื่อง | Environment มาตรฐานของรายวิชา | Workspace | Terminal ที่ใช้จริง |
|---|---|---|---|
| iMac M1 / macOS | macOS native | `~/Documents/ENGSE203` | zsh ใน VS Code หรือ Terminal.app |
| Windows 11 notebook | Ubuntu 24.04 LTS บน WSL 2 | `~/workspace/engse203` | Bash ใน VS Code Remote - WSL |

> **กติกาสำคัญสำหรับ Windows:** ใช้ Node.js, npm, Git และ SSH **ภายใน Ubuntu WSL** เท่านั้น และเก็บ project ใน `~/workspace/engse203` ไม่ใช่ `/mnt/c/...`

## ทำตามลำดับนี้

### เส้นทาง A — macOS / iMac M1

1. [ติดตั้งเครื่องมือบน macOS: Xcode CLI, VS Code, nvm, Node.js 22 และ SQLite](./macos.md)
2. [ตั้งค่า Git account และ SSH key เพื่อใช้ GitHub](./git-github-ssh.md)
3. [Sign in GitHub ใน VS Code และติดตั้ง extensions](./vscode-github.md)
4. [ตรวจสอบเครื่องและทดสอบ clone / commit / push](./verification.md)

### เส้นทาง B — Windows 11 + WSL2 / Ubuntu 24.04 LTS

1. [ติดตั้ง WSL2, Ubuntu 24.04 และเครื่องมือใน Ubuntu](./windows-11-wsl2.md)
2. [ตั้งค่า Git account และ SSH key เพื่อใช้ GitHub](./git-github-ssh.md)
3. [เปิด VS Code แบบ Remote - WSL, Sign in GitHub และติดตั้ง extensions](./vscode-github.md)
4. [ตรวจสอบเครื่องและทดสอบ clone / commit / push](./verification.md)

## สิ่งที่ต้องทำให้ผ่านก่อนเริ่ม LAB 01

- [ ] `node -v` แสดง Node.js `v22.12.0` หรือใหม่กว่า
- [ ] `npm -v` และ `git --version` ทำงาน
- [ ] GitHub account มี email ที่ยืนยันแล้วอย่างน้อย 1 อีเมล
- [ ] `git config --global user.name` และ `git config --global user.email` แสดงข้อมูลของตนเอง
- [ ] `ssh -T git@github.com` ยืนยันตัวตนเป็น GitHub username ของตนเอง
- [ ] VS Code เปิดโฟลเดอร์ workspace ได้ และ Windows ต้องเห็น `WSL: Ubuntu-24.04`
- [ ] ทำ [Setup Verification](./verification.md) จนผ่านครบ

## แนวคิดที่ต้องแยกให้ออก

| เรื่อง | ใช้ทำอะไร | ตัวอย่าง |
|---|---|---|
| **Git commit identity** | ชื่อ/อีเมลที่ติดไปกับ commit | `git config user.email ...` |
| **GitHub SSH authentication** | account ที่ GitHub ใช้ตรวจสิทธิ์ตอน clone/push | `ssh -T git@github.com` |
| **VS Code sign-in** | ใช้ GitHub Pull Requests, Issues และการเชื่อมบัญชีใน editor | Accounts → Sign in with GitHub |

> การเปลี่ยน `git config user.name` หรือ `git config user.email` **ไม่ได้** เปลี่ยน GitHub account ที่ SSH ใช้ push งาน หาก `ssh -T git@github.com` แสดง account ผิด ให้ดูหัวข้อ Multiple Accounts ใน [คู่มือ GitHub SSH](./git-github-ssh.md)

## ชุดคำสั่งตรวจแบบเร็ว

```bash
node -v
npm -v
git --version
ssh -T git@github.com
node scripts/verify-setup.mjs
```

สำหรับรายละเอียดและการทดสอบแบบส่งงานจริง ให้ไปที่ [Verification Checklist](./verification.md)

## ขอบเขตเครื่องมือในช่วงต้นรายวิชา

| เครื่องมือ | เริ่มใช้ | หมายเหตุ |
|---|---:|---|
| Node.js / npm / Git / GitHub / VS Code | Week 1 | ต้องพร้อมทุกคน |
| Vite และ Modern JavaScript | Week 2 | ใช้ Node `>=22.12.0` |
| REST Client | Week 6 | extension ใน VS Code |
| SQLite CLI | Week 10 | ติดตั้งในคู่มือนี้ไว้แล้ว |
| MongoDB Compass / Docker Desktop | Week 11 เป็นต้นไป | ติดตั้งเมื่อผู้สอนประกาศเท่านั้น |

## เอกสารอ้างอิงทางการ

- [Node.js Releases](https://nodejs.org/en/about/previous-releases)
- [nvm — Node Version Manager](https://github.com/nvm-sh/nvm)
- [GitHub Docs — Connecting to GitHub with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [Visual Studio Code — Developing in WSL](https://code.visualstudio.com/docs/remote/wsl)
- [Microsoft Learn — Install WSL](https://learn.microsoft.com/en-us/windows/wsl/install)
