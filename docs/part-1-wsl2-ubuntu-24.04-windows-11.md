# Part 1 — ติดตั้งและตั้งค่า WSL 2 + Ubuntu 24.04 LTS บน Windows 11

> **ใช้สำหรับนักศึกษาที่ทำ LAB บน notebook Windows 11**  
> รายวิชา ENGSE203 กำหนดให้ใช้ **Ubuntu 24.04 LTS บน WSL 2** เป็น development environment หลัก แทนการรัน Node.js, Git และฐานข้อมูลจาก PowerShell โดยตรง

## เป้าหมายหลังทำคู่มือนี้จบ

เมื่อทำครบแล้ว นักศึกษาจะสามารถ

- เปิด Ubuntu 24.04 LTS ผ่าน WSL 2 ได้
- ตรวจสอบได้ว่า distribution ทำงานบน **WSL 2** ไม่ใช่ WSL 1
- เก็บ source code ไว้ใน Linux filesystem ที่ `~/workspace/engse203`
- เปิดโฟลเดอร์ WSL ด้วย Visual Studio Code และเห็นสถานะ `WSL: Ubuntu-24.04`
- ใช้ Terminal แบบ Bash เพื่อทำ LAB ในรายวิชาต่อไปได้

> **หลักปฏิบัติของรายวิชา:** Windows ใช้เป็น host สำหรับ VS Code, browser และโปรแกรม GUI ส่วนคำสั่งพัฒนา เช่น `node`, `npm`, `git`, `sqlite3` จะรันภายใน Ubuntu WSL เท่านั้น

---

## 1. ตรวจสอบความพร้อมก่อนติดตั้ง

### Checklist

- [ ] ใช้ **Windows 11** ที่อัปเดตแล้ว
- [ ] มีสิทธิ์เปิด PowerShell แบบ **Run as administrator**
- [ ] มีพื้นที่ว่างอย่างน้อย 15 GB
- [ ] เชื่อมต่ออินเทอร์เน็ตได้
- [ ] เปิดใช้ virtualization ใน BIOS/UEFI แล้ว (ตรวจเฉพาะเมื่อ WSL ติดตั้งไม่สำเร็จ)
- [ ] สำรองงานสำคัญก่อนปรับระบบหรือรีสตาร์ตเครื่อง

### เปิด PowerShell แบบผู้ดูแลระบบ

1. กดปุ่ม **Start** แล้วพิมพ์ `PowerShell`
2. คลิกขวา **Windows PowerShell** หรือ **Terminal**
3. เลือก **Run as administrator**
4. กด **Yes** เมื่อ Windows ขอสิทธิ์

---

## 2. ติดตั้ง WSL 2 และ Ubuntu 24.04 LTS

### 2.1 ตรวจสอบรายชื่อ distribution ที่ติดตั้งได้

ใน **PowerShell (Administrator)** ให้รัน

```powershell
wsl --list --online
```

มองหารายการชื่อ `Ubuntu-24.04` แล้วติดตั้งด้วยคำสั่ง

```powershell
wsl --install --distribution Ubuntu-24.04
```

หากเครื่องมี WSL อยู่แล้ว ให้ตรวจและอัปเดตก่อน

```powershell
wsl --update
wsl --set-default-version 2
wsl --install --distribution Ubuntu-24.04
```

> ในบางเครื่อง Windows จะขอให้รีสตาร์ต หลังรีสตาร์ตให้เปิด **Ubuntu 24.04** จาก Start menu เพื่อสร้างบัญชี Linux ครั้งแรก

### 2.2 สร้างบัญชี Linux ครั้งแรก

เมื่อหน้าต่าง Ubuntu เปิดขึ้น ให้กำหนด

- **UNIX username:** ใช้อักษรอังกฤษตัวเล็ก เช่น `student01`
- **UNIX password:** ตั้งรหัสผ่านที่จำได้เอง

ระหว่างพิมพ์รหัสผ่านจะ **ไม่แสดงตัวอักษรหรือจุด** บนหน้าจอ เป็นพฤติกรรมปกติของ Linux

> ชื่อผู้ใช้และรหัสผ่าน Ubuntu ไม่จำเป็นต้องตรงกับบัญชี Windows และไม่ควรนำไปใส่ใน README หรือ commit

### 2.3 ตรวจสอบว่าเป็น WSL 2 จริง

กลับไปที่ PowerShell แล้วรัน

```powershell
wsl --list --verbose
```

ตัวอย่างผลลัพธ์ที่ถูกต้อง

```text
  NAME            STATE           VERSION
* Ubuntu-24.04    Running         2
```

หากคอลัมน์ `VERSION` เป็น `1` ให้แก้ไขด้วย

```powershell
wsl --set-version Ubuntu-24.04 2
```

ตั้งให้ Ubuntu 24.04 เป็น default distribution

```powershell
wsl --set-default Ubuntu-24.04
```

ตรวจสถานะเพิ่มเติมได้ด้วย

```powershell
wsl --status
wsl --version
```

---

## 3. อัปเดต Ubuntu และติดตั้งเครื่องมือพื้นฐาน

เปิด **Ubuntu 24.04** จาก Start menu หรือรันคำสั่งนี้ใน PowerShell

```powershell
wsl --distribution Ubuntu-24.04
```

จากนั้นรันคำสั่งต่อไปนี้ใน **Ubuntu terminal**

```bash
sudo apt update && sudo apt full-upgrade -y
sudo apt install -y \
  build-essential \
  ca-certificates \
  curl \
  wget \
  unzip \
  zip \
  git \
  openssh-client \
  lsb-release \
  sqlite3 \
  jq \
  ripgrep
```

ตรวจสอบว่าเครื่องมือพื้นฐานพร้อมแล้ว

```bash
git --version
ssh -V
sqlite3 --version
```

### เครื่องมือแต่ละตัวใช้ทำอะไร

| เครื่องมือ | ใช้ในรายวิชา |
|---|---|
| `build-essential` | เครื่องมือ compile สำหรับ package บางชนิดของ Node.js |
| `curl`, `wget` | ดาวน์โหลดไฟล์และ script ที่เชื่อถือได้ |
| `git` | จัดการเวอร์ชันและส่งงานไป GitHub |
| `openssh-client` | เชื่อมต่อ GitHub ผ่าน SSH key |
| `lsb-release` | แสดงชื่อ/รุ่น Ubuntu ในคำสั่งตรวจสอบ environment |
| `sqlite3` | ทดลองฐานข้อมูล SQLite ใน LAB ช่วงหลัง |
| `jq`, `ripgrep` | ช่วยอ่าน JSON และค้นหาข้อความใน project |

---

## 4. สร้างพื้นที่เก็บงานแบบมาตรฐาน

ให้เก็บ source code ของรายวิชาไว้ใน **Linux filesystem** เพื่อให้ Node.js และ VS Code Remote ทำงานได้มีประสิทธิภาพและลดปัญหา permission/line ending

```bash
mkdir -p ~/workspace/engse203
cd ~/workspace/engse203
pwd
```

ผลลัพธ์ควรคล้าย

```text
/home/<linux-username>/workspace/engse203
```

### สำคัญ: หลีกเลี่ยงการเก็บ project ที่กำลังพัฒนาไว้ใน `/mnt/c/...`

Windows files จะเข้าถึงได้จาก WSL ผ่าน path เช่น

```bash
cd /mnt/c/Users/<WindowsUser>/Downloads
```

ใช้ path นี้ได้สำหรับคัดลอกไฟล์หรือเปิดเอกสาร แต่ **ไม่แนะนำ** ให้เก็บ React/Node project ที่กำลังพัฒนาไว้ที่นี่ เพราะอาจช้ากว่าและทำให้ permission หรือ file watching ผิดปกติได้

| ทำได้ | ไม่แนะนำ |
|---|---|
| เก็บ project ที่ `~/workspace/engse203` | พัฒนา project ใน `C:\Users\...` ผ่าน `/mnt/c/...` |
| ใช้ Git ที่ติดตั้งใน Ubuntu WSL | สลับใช้ Git for Windows และ Git ใน WSL กับ project เดียวกัน |
| เปิด project ด้วย `code .` จาก WSL | เปิดโฟลเดอร์ Linux ผ่าน File Explorer แล้วรัน tool แบบ Windows โดยไม่ใช้ Remote WSL |

---

## 5. เชื่อม Visual Studio Code กับ Ubuntu WSL

> ติดตั้ง VS Code บน **Windows host** ก่อน โดยดู [Part 2 — โปรแกรม เครื่องมือ และ GitHub SSH](./part-2-developer-tools-git-github-vscode.md)

### 5.1 ติดตั้ง extension Remote - WSL

ใน VS Code บน Windows

1. กด `Ctrl + Shift + X`
2. ค้นหา `WSL`
3. ติดตั้ง extension ชื่อ **WSL** โดย Microsoft (`ms-vscode-remote.remote-wsl`)

### 5.2 เปิด project จาก Ubuntu WSL

กลับไปที่ Ubuntu terminal แล้วรัน

```bash
cd ~/workspace/engse203
code .
```

ครั้งแรก VS Code จะติดตั้ง VS Code Server ใน Ubuntu โดยอัตโนมัติ ให้รอจนเสร็จ

ตรวจสอบที่มุมซ้ายล่างของ VS Code ต้องเห็นข้อความประมาณ

```text
WSL: Ubuntu-24.04
```

และเปิด Terminal ใหม่ใน VS Code แล้วรัน

```bash
pwd
uname -a
```

`pwd` ควรขึ้นต้นด้วย `/home/...` และ `uname -a` ควรมีคำว่า `Linux`

### 5.3 วิธีเปิด WSL workspace ในครั้งถัดไป

เลือกวิธีใดวิธีหนึ่ง

```powershell
# วิธีที่ 1: จาก PowerShell / Windows Terminal
wsl --distribution Ubuntu-24.04
```

```bash
# วิธีที่ 2: เมื่ออยู่ใน Ubuntu แล้ว
cd ~/workspace/engse203
code .
```

หรือใน VS Code กด `Ctrl + Shift + P` แล้วเลือก **WSL: Connect to WSL**

---

## 6. การตั้งค่า Git สำหรับ WSL

ให้ทำครั้งเดียวใน Ubuntu WSL โดยใช้ข้อมูลที่สอดคล้องกับ GitHub account ของตนเอง

```bash
git config --global user.name "Your English Name"
git config --global user.email "your-github-email@example.com"
git config --global init.defaultBranch main
git config --global core.autocrlf input
git config --global fetch.prune true
```

ตรวจสอบค่า

```bash
git config --global --list
```

> `core.autocrlf input` ช่วยให้ไฟล์ที่ commit จาก WSL ใช้ line ending แบบ Linux (`LF`) อย่างสม่ำเสมอ โดยไม่ทำให้ไฟล์ที่มีอยู่ถูกแปลงไปมาระหว่าง Windows และ macOS

การสร้าง SSH key และเชื่อม GitHub ทำใน Part 2 เพื่อใช้ขั้นตอนเดียวกันทั้ง macOS และ WSL

---

## 7. Quick Verification ก่อนเริ่ม LAB 01

เปิด VS Code ในโฟลเดอร์ WSL แล้วรันใน Integrated Terminal

```bash
printf "OS: " && uname -s
printf "Workspace: " && pwd
git --version
sqlite3 --version
```

จากนั้นทำ checklist

- [ ] `wsl --list --verbose` แสดง `Ubuntu-24.04` และ `VERSION 2`
- [ ] VS Code มุมล่างซ้ายแสดง `WSL: Ubuntu-24.04`
- [ ] workspace อยู่ที่ `~/workspace/engse203`
- [ ] `git --version` ทำงาน
- [ ] `sqlite3 --version` ทำงาน
- [ ] เปิดเอกสาร Part 2 เพื่อกำหนด Node.js, VS Code extensions และ GitHub SSH key ต่อ

---

## 8. Troubleshooting ที่พบบ่อย

### A. `wsl --install` ใช้ไม่ได้หรือขึ้นว่าไม่รู้จักคำสั่ง

1. ตรวจว่าใช้ Windows 11 ที่อัปเดตแล้ว
2. เปิด PowerShell แบบ Administrator อีกครั้ง
3. ใช้วิธี manual fallback ด้านล่าง แล้ว restart เครื่อง

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

หลัง restart ให้รัน

```powershell
wsl --update
wsl --set-default-version 2
wsl --install --distribution Ubuntu-24.04
```

### B. ติดตั้งแล้วแต่ขึ้น WSL 1

```powershell
wsl --set-version Ubuntu-24.04 2
```

หากขึ้นข้อความเกี่ยวกับ virtualization ให้เปิด virtualization ใน BIOS/UEFI หรือขอความช่วยเหลือจากผู้ดูแลเครื่อง

### C. `code .` ไม่เปิด VS Code หรือคำสั่ง `code` ไม่พบ

- ตรวจว่าติดตั้ง VS Code บน Windows แล้ว
- ติดตั้ง extension **WSL** ใน VS Code
- ปิด Terminal แล้วเปิด Ubuntu ใหม่
- ใน VS Code กด `Ctrl + Shift + P` แล้วเลือก **WSL: Connect to WSL** เป็นทางเลือก

### D. เปิดไฟล์ได้แต่ Node/VS Code ทำงานช้าหรือ watch file ไม่อัปเดต

ตรวจว่า project อยู่ใน

```text
~/workspace/engse203
```

ไม่ใช่ใน `/mnt/c/...`

### E. ลืมรหัสผ่าน Ubuntu

เปิด PowerShell แบบ Administrator และตั้ง root session ชั่วคราว

```powershell
wsl -d Ubuntu-24.04 -u root
```

จากนั้นใน Ubuntu ให้แทน `<linux-username>` ด้วยชื่อผู้ใช้ Linux ของตนเอง

```bash
passwd <linux-username>
exit
```

---

## เอกสารอ้างอิงทางการ

- Microsoft WSL installation: <https://learn.microsoft.com/en-us/windows/wsl/install>
- Microsoft manual WSL installation: <https://learn.microsoft.com/en-us/windows/wsl/install-manual>
- Visual Studio Code — Developing in WSL: <https://code.visualstudio.com/docs/remote/wsl>
- Visual Studio Code — WSL tutorial: <https://code.visualstudio.com/docs/remote/wsl-tutorial>

---

**ไปต่อ:** [Part 2 — โปรแกรม เครื่องมือ และ GitHub SSH](./part-2-developer-tools-git-github-vscode.md) แล้วจึงเริ่ม [LAB 01](../labs/week-01-developer-environment-git-github/)
