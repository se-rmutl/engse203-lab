# คู่มือ Cross-platform Setup (Quick Reference)

รายวิชา ENGSE203 ใช้ iMac M1/macOS ในห้องปฏิบัติการ และอนุญาตให้นักศึกษาพัฒนาต่อบน notebook Windows 11 ได้ โดยกำหนด environment มาตรฐานดังนี้

| เครื่อง | Environment สำหรับพัฒนา | Workspace มาตรฐาน | Terminal ที่ใช้ทำ LAB |
|---|---|---|---|
| iMac M1 / macOS | macOS native | `~/Documents/ENGSE203` | zsh ใน VS Code / Terminal.app |
| Windows 11 | Ubuntu 24.04 LTS บน WSL 2 | `~/workspace/engse203` | Bash ใน VS Code Remote - WSL |

## เอกสารตั้งค่าแบบละเอียด (Repository v2)

1. **Windows 11:** [Part 1 — ติดตั้งและตั้งค่า WSL 2 + Ubuntu 24.04 LTS](./part-1-wsl2-ubuntu-24.04-windows-11.md)
2. **macOS และ Windows + WSL:** [Part 2 — โปรแกรมที่ต้องติดตั้ง, Checklist และ Git/GitHub/VS Code ผ่าน SSH](./part-2-developer-tools-git-github-vscode.md)

## คำสั่งตรวจสอบก่อนเริ่ม LAB

### macOS

```bash
node -v
npm -v
git --version
sqlite3 --version
ssh -T git@github.com
```

### Windows + WSL

เปิดโฟลเดอร์ใน VS Code แล้วตรวจว่ามุมซ้ายล่างขึ้น `WSL: Ubuntu-24.04` จากนั้นเปิด terminal ใน VS Code และรัน

```bash
pwd
node -v
npm -v
git --version
sqlite3 --version
ssh -T git@github.com
```

## ข้อควรระวัง

- Windows students ต้องรัน Node.js, npm, Git และ SQLite **ภายใน Ubuntu WSL** ไม่ใช่ PowerShell
- เก็บ active project ไว้ใน Linux filesystem (`~/workspace/engse203`) ไม่ใช่ `/mnt/c/...`
- สร้าง SSH key แยกสำหรับ macOS และ Ubuntu WSL; ห้ามคัดลอกหรือเผยแพร่ private key
- ใช้ URL GitHub แบบ SSH (`git@github.com:...`) สำหรับ clone/push
- อย่าติดตั้ง package แบบ global หาก LAB ไม่ได้กำหนด
- เก็บ path และชื่อไฟล์เป็นภาษาอังกฤษเมื่อเป็น source code เพื่อลดปัญหากับบาง package/tool

**เริ่มต้นจาก:** [Part 2](./part-2-developer-tools-git-github-vscode.md) แล้วจึงทำ [LAB 01](../labs/week-01-developer-environment-git-github/)
