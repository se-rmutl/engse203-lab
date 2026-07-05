# Setup บน Windows 11 + WSL2 + Ubuntu 24.04 LTS

> รายวิชาใช้ **VS Code บน Windows** เชื่อมเข้ากับ **Ubuntu 24.04 LTS บน WSL2**  
> Node.js, npm, Git, SSH และ SQLite ที่ใช้ทำ LAB ต้องรัน **ภายใน Ubuntu WSL**

## เป้าหมาย

เมื่อจบขั้นตอนนี้ ต้องได้:

- Windows 11 มี WSL2 และ Ubuntu 24.04 LTS
- VS Code บน Windows พร้อม extension **WSL**
- workspace อยู่ใน Linux filesystem: `~/workspace/engse203`
- Node.js 22.x, npm, Git, SSH และ SQLite อยู่ใน Ubuntu

## 1) ติดตั้ง WSL2 และ Ubuntu 24.04 LTS

เปิด **PowerShell แบบ Run as administrator** แล้วรัน:

```powershell
wsl --list --online
wsl --install -d Ubuntu-24.04
```

หากมี WSL อยู่แล้ว ให้ทำ:

```powershell
wsl --update
wsl --set-default-version 2
wsl --install -d Ubuntu-24.04
```

รีสตาร์ตเครื่องเมื่อ Windows ขอ แล้วเปิด **Ubuntu 24.04 LTS** จาก Start menu เพื่อสร้าง:

- Linux username: ใช้อังกฤษตัวเล็ก เช่น `student01`
- password: ตั้งเองและจดจำให้ได้

> ตอนพิมพ์ password ใน Linux จะไม่เห็นตัวอักษรหรือจุดบนหน้าจอ เป็นพฤติกรรมปกติ

ตรวจจาก PowerShell:

```powershell
wsl --list --verbose
```

ต้องเห็น `Ubuntu-24.04` และ `VERSION` เป็น `2`

## 2) อัปเดต Ubuntu และติดตั้งเครื่องมือพื้นฐาน

เปิด Ubuntu 24.04 แล้วรัน:

```bash
sudo apt update && sudo apt full-upgrade -y
sudo apt install -y \
  build-essential \
  ca-certificates \
  curl \
  git \
  openssh-client \
  sqlite3 \
  jq \
  ripgrep \
  unzip \
  zip
```

ตรวจ:

```bash
git --version
ssh -V
sqlite3 --version
```

## 3) สร้าง workspace ใน Linux filesystem

```bash
mkdir -p ~/workspace/engse203
cd ~/workspace/engse203
pwd
```

ผลลัพธ์ต้องขึ้นต้นด้วย:

```text
/home/<linux-username>/workspace/engse203
```

> **ห้ามเก็บ project ที่กำลังพัฒนาใน `/mnt/c/...`** เพราะ Node.js, file watching และ permission อาจทำงานช้าหรือสับสน ให้ใช้ `/mnt/c` เฉพาะคัดลอกไฟล์เข้า/ออกเท่านั้น

## 4) ติดตั้ง Visual Studio Code บน Windows host

1. ดาวน์โหลด [Visual Studio Code สำหรับ Windows](https://code.visualstudio.com/download)
2. แนะนำ **User Setup**
3. ใน installer ให้เลือก **Add to PATH** หากมีตัวเลือก
4. เปิด VS Code หนึ่งครั้ง แล้วติดตั้ง extension `WSL` by Microsoft

จาก PowerShell สามารถติดตั้ง extension WSL ได้ด้วย:

```powershell
code --install-extension ms-vscode-remote.remote-wsl
```

## 5) เปิด workspace แบบ Remote - WSL

กลับไปที่ Ubuntu terminal:

```bash
cd ~/workspace/engse203
code .
```

ครั้งแรก VS Code จะติดตั้ง VS Code Server ใน Ubuntu โดยอัตโนมัติ รอให้เสร็จ

ในหน้าต่าง VS Code ให้ตรวจมุมซ้ายล่าง ต้องเห็น:

```text
WSL: Ubuntu-24.04
```

เปิด **Terminal → New Terminal** ใน VS Code แล้วรัน:

```bash
pwd
uname -s
```

ผลที่ถูกต้อง:

```text
/home/<linux-username>/workspace/engse203
Linux
```

## 6) ติดตั้ง nvm และ Node.js 22.x ใน Ubuntu WSL

รันใน Ubuntu WSL terminal เท่านั้น:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash
source ~/.bashrc
command -v nvm
```

ติดตั้ง Node 22 และเลือกเป็นค่าเริ่มต้น:

```bash
nvm install 22
nvm alias default 22
nvm use 22
```

ตรวจ:

```bash
node -v
npm -v
```

ตรวจ baseline สำหรับ LAB 02 / Vite:

```bash
node -e "const [major, minor] = process.versions.node.split('.').map(Number); const ok = major > 22 || (major === 22 && minor >= 12); console.log(ok ? 'OK: Node version meets ENGSE203 baseline' : 'ERROR: install Node 22.12.0 or newer'); process.exit(ok ? 0 : 1)"
```

## 7) ไปต่อ

1. [ตั้งค่า Git account และ SSH key ภายใน Ubuntu WSL](./git-github-ssh.md)
2. [ตั้งค่า VS Code, GitHub sign-in และ extensions](./vscode-github.md)
3. [ทดสอบระบบทั้งหมด](./verification.md)

## Troubleshooting ย่อ

| อาการ | ตรวจ/แก้เบื้องต้น |
|---|---|
| `wsl --install` ใช้ไม่ได้ | เปิด PowerShell แบบ Administrator, รัน `wsl --update`, รีสตาร์ต แล้วลองใหม่ |
| พบ Ubuntu แต่เป็น WSL1 | `wsl --set-version Ubuntu-24.04 2` |
| `code .` ไม่เปิด | ตรวจติดตั้ง VS Code บน Windows + extension WSL แล้วปิด/เปิด Ubuntu ใหม่ |
| Node อยู่ใน PowerShell แต่ไม่อยู่ใน WSL | ถูกต้องที่ต้องติดตั้ง nvm/Node ซ้ำ **ภายใน Ubuntu WSL** ตามขั้นตอน 6 |
| VS Code ไม่เห็น `WSL: Ubuntu-24.04` | ปิดหน้าต่าง, เปิด Ubuntu แล้วรัน `code .` จาก path `/home/...` อีกครั้ง |

## อ้างอิงทางการ

- [Microsoft Learn — Install WSL](https://learn.microsoft.com/en-us/windows/wsl/install)
- [VS Code — Developing in WSL](https://code.visualstudio.com/docs/remote/wsl)
- [nvm installation](https://github.com/nvm-sh/nvm#installing-and-updating)
