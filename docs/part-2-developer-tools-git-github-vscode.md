> **คู่มือหลักที่อัปเดตล่าสุด:** [Setup Guide v3](./setup/README.md)
> เอกสารนี้เก็บไว้เพื่ออ้างอิงลำดับเดิมของ Repository v2; นักศึกษาใหม่ให้ใช้คู่มือ v3 เป็นหลัก

# Part 2 — โปรแกรมที่ต้องติดตั้ง, Checklist และ Git/GitHub/VS Code ผ่าน SSH

> ใช้คู่กับ [Part 1 — WSL 2 + Ubuntu 24.04 LTS บน Windows 11](./part-1-wsl2-ubuntu-24.04-windows-11.md)  
> ครอบคลุมการเตรียมเครื่อง **iMac M1/macOS** และ **Windows 11 + Ubuntu WSL 2** เพื่อใช้ต่อเนื่องกับ JavaScript, React.js, Node.js, RESTful API, SQLite, MongoDB, testing และ teamwork

## หลักการสำคัญของรายวิชา

| เครื่องที่ใช้ | Environment มาตรฐาน | ตำแหน่ง project | Terminal หลัก |
|---|---|---|---|
| iMac M1 / macOS | macOS native | `~/Documents/ENGSE203` | zsh ใน VS Code / Terminal |
| Windows 11 notebook | Ubuntu 24.04 LTS บน WSL 2 | `~/workspace/engse203` | Bash ใน VS Code Remote - WSL |

> Windows students ไม่จำเป็นต้องติดตั้ง Node.js หรือ Git เพื่อใช้กับ LAB ใน PowerShell อีกชุดหนึ่ง เพราะรายวิชาจะใช้ Node.js และ Git **ภายใน Ubuntu WSL** เป็นมาตรฐานเดียวกับ Linux server ในอนาคต

---

## 1. Master checklist ก่อนเริ่ม LAB 01

### 1.1 สำหรับทุกคน

- [ ] มีบัญชี GitHub และยืนยันอีเมลแล้ว
- [ ] ติดตั้ง VS Code และเปิด Terminal ใน VS Code ได้
- [ ] ติดตั้ง Node.js รุ่น LTS และ `npm` ได้
- [ ] ติดตั้ง Git และกำหนด `user.name` / `user.email` แล้ว
- [ ] สร้าง SSH key เฉพาะ environment ที่ใช้งาน และเพิ่ม public key ใน GitHub แล้ว
- [ ] ทดสอบ `ssh -T git@github.com` ผ่าน
- [ ] clone/push repository ผ่าน URL แบบ SSH ได้
- [ ] มี browser สำหรับตรวจ GitHub และทดลอง Web application

### 1.2 เพิ่มเติมสำหรับ Windows 11

- [ ] ติดตั้ง Ubuntu 24.04 LTS บน **WSL 2** แล้ว
- [ ] VS Code แสดงสถานะ `WSL: Ubuntu-24.04` เมื่อเปิด project
- [ ] ทำงานใน `~/workspace/engse203` ไม่ใช่ `/mnt/c/...`

### 1.3 เครื่องมือสำหรับ LAB ช่วงหลัง

- [ ] `sqlite3` command line
- [ ] REST Client extension หรือโปรแกรมทดสอบ API ที่ผู้สอนกำหนด
- [ ] ESLint และ Prettier extensions ใน VS Code
- [ ] MongoDB Compass หรือ MongoDB tooling ตามที่ผู้สอนประกาศใน LAB 10
- [ ] Docker Desktop / MongoDB local container **เฉพาะเมื่อผู้สอนประกาศ** — ยังไม่จำเป็นในสัปดาห์ที่ 1

---

## 2. รายการโปรแกรมและสถานะการติดตั้ง

| รายการ | จำเป็นเมื่อ | macOS/iMac M1 | Windows 11 + WSL | วิธีตรวจสอบ |
|---|---|---|---|---|
| Visual Studio Code | LAB 01 เป็นต้นไป | ติดตั้งใน macOS | ติดตั้งใน Windows host | `code --version` |
| WSL 2 + Ubuntu 24.04 | Windows เท่านั้น | ไม่ใช้ | ติดตั้งตาม Part 1 | `wsl -l -v` |
| Node.js LTS + npm | LAB 01 เป็นต้นไป | ติดตั้งผ่าน `nvm` | ติดตั้งผ่าน `nvm` ใน Ubuntu WSL | `node -v`, `npm -v` |
| Git + OpenSSH | LAB 01 เป็นต้นไป | Xcode CLT/Homebrew | `apt install` ใน WSL | `git --version`, `ssh -V` |
| GitHub SSH key | LAB 01 เป็นต้นไป | key ของ macOS | key ของ Ubuntu WSL | `ssh -T git@github.com` |
| SQLite CLI | LAB 09 เป็นต้นไป | `brew install sqlite` | `apt install sqlite3` | `sqlite3 --version` |
| REST Client extension | LAB 06 เป็นต้นไป | VS Code | VS Code in WSL | เปิดไฟล์ `.http` |
| MongoDB tooling | LAB 10 เป็นต้นไป | ตามประกาศ | ตามประกาศ | ตรวจตามใบงาน |
| Docker Desktop | เฉพาะเมื่อประกาศ | optional | Windows host optional | `docker --version` |

---

# A. การติดตั้งบน iMac M1 / macOS

## A1. ติดตั้ง Xcode Command Line Tools

เปิด **Terminal.app** หรือ VS Code Terminal แล้วรัน

```bash
xcode-select --install
```

ทำตามหน้าต่าง installer จนเสร็จ แล้วปิด/เปิด Terminal ใหม่

ตรวจสอบ

```bash
xcode-select -p
git --version
```

> macOS มักมี Git จาก Xcode Command Line Tools อยู่แล้ว แต่ยังควรตรวจเวอร์ชันก่อนเริ่ม LAB

---

## A2. ติดตั้ง Homebrew

Homebrew ช่วยให้ติดตั้ง CLI tools และ applications ซ้ำได้ง่ายบน Apple Silicon โดยจะใช้ path หลัก `/opt/homebrew`

### วิธีที่ 1 — Download/installer

1. เปิด <https://brew.sh/>
2. อ่านสิ่งที่จะติดตั้ง และใช้ installer ตามหน้าเว็บทางการ
3. ปิด/เปิด Terminal ใหม่หลังติดตั้ง

### วิธีที่ 2 — Command line

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

หลังติดตั้ง หาก Terminal แจ้งให้เพิ่ม Homebrew ลง PATH ให้รันคำสั่งที่ installer แสดง ตัวอย่างสำหรับ Apple Silicon มักมีลักษณะดังนี้

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

ตรวจสอบ

```bash
brew --version
brew doctor
```

---

## A3. ติดตั้ง Visual Studio Code บน macOS

### วิธีที่ 1 — Download program

1. เปิด <https://code.visualstudio.com/>
2. ดาวน์โหลด **macOS Universal** หรือรุ่นที่ตรงกับ Apple Silicon
3. ลาก `Visual Studio Code.app` ไปที่ Applications
4. เปิด VS Code หนึ่งครั้งและอนุญาตตามที่ macOS ถาม
5. กด `Cmd + Shift + P` แล้วเลือก **Shell Command: Install 'code' command in PATH**

### วิธีที่ 2 — Command line ผ่าน Homebrew

```bash
brew install --cask visual-studio-code
```

ตรวจสอบ

```bash
code --version
```

---

## A4. ติดตั้ง Node.js LTS + npm

> **เลือกติดตั้งเพียงแนวทางเดียว:** รายวิชาแนะนำ **nvm** เพราะสลับ Node.js version ได้ตาม LAB/โครงงานในอนาคตได้ง่าย ไม่ควรติดตั้ง Node `.pkg` และ nvm ปะปนกันโดยไม่เข้าใจ PATH

### วิธีที่ 1 — Download Node.js installer (ทางเลือก)

1. เปิด <https://nodejs.org/en/download>
2. เลือก **LTS** และเลือกรุ่น **macOS ARM64 `.pkg`** สำหรับ iMac M1
3. เปิดไฟล์ `.pkg` และทำตาม installer
4. ปิด/เปิด Terminal แล้วตรวจสอบ

```bash
node -v
npm -v
```

> ใช้วิธีนี้ได้เมื่อผู้สอนกำหนดรุ่น LTS เดียวตลอดภาคเรียน แต่สำหรับรายวิชานี้ให้ใช้ **วิธีที่ 2 (nvm)** เป็นค่าแนะนำ

### วิธีที่ 2 — Command line ด้วย nvm (แนะนำ)

ติดตั้ง nvm โดยใช้ script จาก project ทางการ

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash
```

ปิด/เปิด Terminal ใหม่ แล้วตรวจสอบ

```bash
command -v nvm
```

ติดตั้ง Node.js LTS ที่ใช้งานปัจจุบัน

```bash
nvm install --lts
nvm alias default 'lts/*'
nvm use --lts
```

ตรวจสอบ

```bash
node -v
npm -v
```

> เมื่อเข้าสู่ภาคการศึกษา ผู้สอนอาจระบุ major version ที่ต้องใช้ เช่น Node.js 24 LTS ให้ใช้ `nvm install 24` และ `nvm use 24` เฉพาะเมื่อมีประกาศนั้น

---

## A5. ติดตั้ง SQLite CLI และเครื่องมือเพิ่มเติม

```bash
brew install sqlite jq ripgrep
```

ตรวจสอบ

```bash
sqlite3 --version
jq --version
rg --version
```

---

## A6. ตั้งค่า Git บน macOS

```bash
git config --global user.name "Your English Name"
git config --global user.email "your-github-email@example.com"
git config --global init.defaultBranch main
git config --global core.autocrlf input
git config --global fetch.prune true

git config --global --list
```

หากต้องการใช้ GitHub noreply email ให้ดูอีเมลจาก **GitHub → Settings → Emails** แล้วนำมาแทนค่า `user.email`

---

# B. การติดตั้งบน Windows 11 + Ubuntu 24.04 LTS (WSL 2)

> ทำ Part 1 ให้เสร็จก่อน แล้วจึงทำส่วนนี้ **ภายใน Ubuntu WSL terminal**

## B1. ติดตั้ง Visual Studio Code บน Windows host

### วิธีที่ 1 — Download program

1. เปิด <https://code.visualstudio.com/download>
2. ดาวน์โหลด **Windows System Installer (x64)**
3. ติดตั้งโดยเลือกตัวเลือก **Add to PATH** หาก installer แสดง
4. เปิด VS Code แล้วติดตั้ง extension **WSL** โดย Microsoft

### วิธีที่ 2 — Command line ผ่าน winget

เปิด **PowerShell** หรือ **Windows Terminal** แล้วรัน

```powershell
winget install --id Microsoft.VisualStudioCode -e --source winget
```

ติดตั้ง extension WSL จาก Windows host

```powershell
code --install-extension ms-vscode-remote.remote-wsl
```

จากนั้นเปิด Ubuntu WSL และทำงานผ่าน

```bash
cd ~/workspace/engse203
code .
```

> ไม่ต้องติดตั้ง VS Code แบบ Linux GUI ใน Ubuntu WSL สำหรับรายวิชานี้ เพราะ VS Code บน Windows จะเชื่อมเข้า Ubuntu ด้วย Remote - WSL

---

## B2. ติดตั้ง Node.js LTS + npm ใน Ubuntu WSL

ตรวจว่ามี `curl` แล้ว (ติดตั้งใน Part 1) จากนั้นติดตั้ง nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash
```

ให้ปิด/เปิด Ubuntu ใหม่ หรือโหลดค่า shell ปัจจุบัน

```bash
source ~/.bashrc
command -v nvm
```

ติดตั้ง Node.js LTS

```bash
nvm install --lts
nvm alias default 'lts/*'
nvm use --lts
```

ตรวจสอบ

```bash
node -v
npm -v
```

> **อย่ารัน Node/npm ใน PowerShell สำหรับ LAB** ให้เปิด folder ใน WSL และใช้ terminal ที่มี prompt ของ Ubuntu เท่านั้น

---

## B3. ติดตั้ง Git และ SQLite ใน Ubuntu WSL

หากทำ Part 1 แล้ว เครื่องมือเหล่านี้ควรติดตั้งอยู่แล้ว ให้ตรวจสอบก่อน

```bash
git --version
ssh -V
sqlite3 --version
```

หากคำสั่งใดไม่พบ ให้ติดตั้ง

```bash
sudo apt update
sudo apt install -y git openssh-client sqlite3 jq ripgrep
```

ตั้งค่า Git

```bash
git config --global user.name "Your English Name"
git config --global user.email "your-github-email@example.com"
git config --global init.defaultBranch main
git config --global core.autocrlf input
git config --global fetch.prune true

git config --global --list
```

---

# C. ติดตั้ง VS Code extensions ที่ใช้ต่อเนื่อง

## C1. Extensions หลัก

| Extension | ID | ใช้เมื่อ |
|---|---|---|
| WSL | `ms-vscode-remote.remote-wsl` | Windows + WSL |
| ESLint | `dbaeumer.vscode-eslint` | JavaScript/React |
| Prettier - Code formatter | `esbenp.prettier-vscode` | จัดรูปแบบโค้ด |
| GitHub Pull Requests and Issues | `GitHub.vscode-pull-request-github` | ทำงานร่วมกัน/PR |
| REST Client | `humao.rest-client` | ทดสอบ REST API จากไฟล์ `.http` |

### วิธีติดตั้งจากหน้าจอ VS Code

1. เปิดโฟลเดอร์ project ใน VS Code
2. กด `Ctrl + Shift + X` บน Windows หรือ `Cmd + Shift + X` บน macOS
3. ค้นหาชื่อ extension แล้วเลือก **Install**
4. สำหรับ Windows + WSL ให้สังเกตปุ่ม **Install in WSL: Ubuntu-24.04** และติดตั้ง extension ฝั่ง WSL เมื่อตัวโปรแกรมแนะนำ

### วิธีติดตั้งจาก command line

บน macOS หรือ Windows host ที่คำสั่ง `code` ใช้งานได้

```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension GitHub.vscode-pull-request-github
code --install-extension humao.rest-client
```

สำหรับ Windows ให้ติดตั้ง WSL extension ด้วย

```powershell
code --install-extension ms-vscode-remote.remote-wsl
```

> ใน WSL project บาง extension ต้องถูกติดตั้ง **ใน WSL environment** เพิ่มเติม ใช้วิธีติดตั้งผ่าน Extensions panel ขณะ VS Code แสดง `WSL: Ubuntu-24.04` จะชัดเจนที่สุด

---

# D. เชื่อม Git กับ GitHub ผ่าน SSH key

## D1. หลักความปลอดภัย

- สร้าง **key แยกสำหรับแต่ละ environment**: Mac key 1 ชุด, Ubuntu WSL key 1 ชุด
- เพิ่มเฉพาะไฟล์ public key ที่ลงท้าย `.pub` เข้า GitHub
- ห้ามส่ง private key เช่น `~/.ssh/id_ed25519` ให้ผู้อื่น หรือ commit ขึ้น GitHub
- ตั้ง passphrase สำหรับ key เมื่อเหมาะสม
- ไม่ต้องคัดลอก private key จาก macOS ไป WSL หรือจาก Windows ไป macOS

## D2. ตรวจสอบว่ามี key อยู่แล้วหรือไม่

รันใน environment ที่จะใช้ GitHub เช่น macOS terminal หรือ Ubuntu WSL terminal

```bash
ls -al ~/.ssh
```

มองหาไฟล์เช่น

```text
id_ed25519
id_ed25519.pub
```

ถ้ามี key ที่ตนเองรู้แหล่งที่มาและยังใช้ได้ อาจใช้ต่อได้ หากไม่แน่ใจให้สร้าง key ใหม่ตามขั้นตอนต่อไป

## D3. สร้าง SSH key แบบ Ed25519

แทนที่ `your-github-email@example.com` ด้วยอีเมล GitHub ของตนเอง

```bash
ssh-keygen -t ed25519 -C "your-github-email@example.com"
```

เมื่อโปรแกรมถามตำแหน่งไฟล์ ให้กด Enter เพื่อใช้ค่าเริ่มต้น

```text
Enter file in which to save the key (/home/<user>/.ssh/id_ed25519):
```

จากนั้นกำหนด passphrase หรือกด Enter หากผู้สอนกำหนดให้ทำแบบไม่มี passphrase ในห้องปฏิบัติการ

ตั้ง permission สำหรับ WSL/Linux (ไม่จำเป็นต้องทำใน macOS หากใช้ default)

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
```

## D4. เพิ่ม key เข้า ssh-agent

### macOS

```bash
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

สร้าง/แก้ไขไฟล์ `~/.ssh/config`

```bash
cat >> ~/.ssh/config <<'CONFIG'
Host github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519
CONFIG

chmod 600 ~/.ssh/config
```

### Ubuntu WSL

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

หากเปิด Ubuntu ใหม่แล้ว Git ขอ passphrase อีกครั้ง ให้รันสองคำสั่งนี้ใหม่ใน terminal session นั้น เป็นพฤติกรรมปกติของ ssh-agent

## D5. คัดลอก public key และเพิ่มใน GitHub

### macOS

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

### Ubuntu WSL

```bash
cat ~/.ssh/id_ed25519.pub
```

คัดลอกข้อความทั้งหมดที่ขึ้นต้นด้วย `ssh-ed25519` แล้วทำตามนี้

1. เปิด GitHub
2. คลิกรูป profile → **Settings**
3. เลือก **SSH and GPG keys**
4. กด **New SSH key**
5. ตั้ง Title เช่น `ENGSE203-iMac-M1` หรือ `ENGSE203-Windows-WSL`
6. เลือก key type เป็น **Authentication Key**
7. วาง public key แล้วกด **Add SSH key**

## D6. ทดสอบ SSH connection

```bash
ssh -T git@github.com
```

ครั้งแรกอาจถามให้ยืนยัน host fingerprint ให้พิมพ์

```text
yes
```

ผลลัพธ์ที่สำเร็จจะมีความหมายว่า authenticated แล้ว และ GitHub ไม่ได้ให้ shell access ซึ่งเป็นพฤติกรรมปกติ

## D7. Clone / Push ด้วย SSH URL

### Clone course repository

```bash
git clone git@github.com:<organization-or-user>/engse203-labs-2569.git
```

### เชื่อม repository งานของนักศึกษา

```bash
git remote add origin git@github.com:<github-username>/engse203-student-labs-<student-id>.git
git branch -M main
git push -u origin main
```

ตรวจสอบ remote

```bash
git remote -v
```

ต้องเห็น URL ที่ขึ้นต้นด้วย

```text
git@github.com:
```

หาก URL เป็น `https://github.com/...` และต้องการเปลี่ยนเป็น SSH

```bash
git remote set-url origin git@github.com:<github-username>/<repository>.git
```

---

# E. เชื่อม VS Code กับ GitHub อย่างเหมาะสม

VS Code มี 2 ส่วนที่เกี่ยวข้องกัน แต่ทำหน้าที่ต่างกัน

| ส่วน | หน้าที่ |
|---|---|
| Git ผ่าน SSH | clone, commit, pull, push ให้ repository ของตนเอง |
| GitHub Pull Requests and Issues extension | ดู issue, pull request และการทำงานร่วมกันผ่านหน้า VS Code |

## E1. เปิด repository ผ่าน VS Code

### macOS

```bash
cd ~/Documents/ENGSE203
code .
```

### Windows + WSL

```bash
cd ~/workspace/engse203
code .
```

## E2. ตรวจสอบ Git ใน VS Code

1. เปิด **Source Control** (`Ctrl + Shift + G` หรือ `Cmd + Shift + G`)
2. แก้ไขไฟล์หนึ่งไฟล์
3. ตรวจว่าไฟล์ปรากฏใน Changes
4. ใส่ข้อความ commit ที่สื่อความหมาย เช่น

```text
feat: add initial lab 1 greeting
```

5. Commit แล้ว Push ผ่านปุ่มใน VS Code หรือ Terminal

```bash
git status
git add .
git commit -m "feat: add initial lab 1 greeting"
git push
```

## E3. Sign in GitHub ใน VS Code (สำหรับ Pull Requests)

1. กด Accounts icon ที่มุมล่างซ้ายของ VS Code
2. เลือก **Sign in with GitHub**
3. อนุญาตผ่าน browser ตามขั้นตอน

> การ Sign in ใน VS Code ช่วยใช้งาน PR/Issues ได้ แต่การ `git push` ของรายวิชายังคงใช้ SSH key ที่ตั้งค่าไว้ตามส่วน D

---

# F. ตรวจสอบ environment ทั้งระบบ

## macOS

```bash
printf "OS: " && sw_vers -productVersion
printf "Node: " && node -v
printf "npm: " && npm -v
printf "Git: " && git --version
printf "SQLite: " && sqlite3 --version
printf "VS Code: " && code --version | head -n 1
ssh -T git@github.com
```

## Ubuntu WSL

```bash
printf "OS: " && lsb_release -ds
printf "Kernel: " && uname -r
printf "Node: " && node -v
printf "npm: " && npm -v
printf "Git: " && git --version
printf "SQLite: " && sqlite3 --version
ssh -T git@github.com
```

ถ้าคำสั่งทั้งหมดทำงาน ให้เริ่ม [LAB 01](../labs/week-01-developer-environment-git-github/)

---

# G. เครื่องมือเสริมสำหรับ LAB ในอนาคต

## G1. REST API testing

แนะนำเริ่มจาก **REST Client** ใน VS Code เพราะไฟล์ `.http` สามารถ commit และตรวจคำสั่งซ้ำได้ง่าย

ตัวอย่างไฟล์ `requests.http`

```http
GET http://localhost:3000/health

###
POST http://localhost:3000/api/tasks
Content-Type: application/json

{
  "title": "Practice REST API"
}
```

## G2. MongoDB

LAB MongoDB จะประกาศรูปแบบที่ใช้ก่อนถึงสัปดาห์นั้น อาจใช้หนึ่งในแนวทางต่อไปนี้

- MongoDB Atlas สำหรับฐานข้อมูลบน cloud
- MongoDB Community ผ่าน Docker Desktop
- เครื่อง MongoDB ที่ผู้สอนจัดเตรียม

### MongoDB Compass (GUI, ติดตั้งเมื่อผู้สอนประกาศ)

MongoDB Compass ใช้ดู collection/document และเชื่อมต่อ Atlas หรือ database ที่ผู้สอนจัดเตรียม ไม่จำเป็นต้องติดตั้ง MongoDB Server ในเครื่องเพื่อใช้ Compass

| macOS | Windows 11 |
|---|---|
| Download: <https://www.mongodb.com/products/tools/compass> | Download: <https://www.mongodb.com/products/tools/compass> |
| Command line: `brew install --cask mongodb-compass` | ใช้ installer จากหน้า download ทางการ |

**ยังไม่ต้องติดตั้ง MongoDB Server ใน Week 1** เพราะรูปแบบการใช้งานจะกำหนดตามทรัพยากรและโจทย์ของ LAB

## G3. Docker Desktop (ติดตั้งเมื่อผู้สอนประกาศเท่านั้น)

| macOS | Windows 11 |
|---|---|
| Download: <https://www.docker.com/products/docker-desktop/> | Download: <https://www.docker.com/products/docker-desktop/> |
| Command line: `brew install --cask docker` | Command line: `winget install -e --id Docker.DockerDesktop` |

หลังติดตั้ง ต้องเปิด Docker Desktop หนึ่งครั้งและตรวจ

```bash
docker --version
```

> Docker Desktop ใช้ทรัพยากรเครื่องและการตั้งค่า virtualization จึงยังไม่ควรติดตั้งล่วงหน้าโดยไม่จำเป็น

---

# H. Troubleshooting

### `nvm: command not found`

**macOS:** ปิด/เปิด Terminal ใหม่ หรือรัน

```bash
source ~/.zshrc
```

**Ubuntu WSL:**

```bash
source ~/.bashrc
```

### `Permission denied (publickey)` เมื่อ push

ตรวจ 4 จุด

```bash
ssh -T git@github.com
ls -al ~/.ssh
ssh-add -l
git remote -v
```

สำหรับ WSL ให้รัน

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

ตรวจว่า public key ของ environment ปัจจุบันถูกเพิ่มอยู่ใน GitHub และ remote ใช้ `git@github.com:...`

### VS Code เปิด WSL แต่ extension ไม่ทำงาน

1. ตรวจสถานะมุมล่างซ้ายว่าเป็น `WSL: Ubuntu-24.04`
2. เปิด Extensions panel
3. ค้นหา extension นั้นและกด **Install in WSL: Ubuntu-24.04**
4. กด Reload Window เมื่อ VS Code ขอ

### Git commit บอกว่า `Author identity unknown`

ตั้งค่าอีกครั้ง

```bash
git config --global user.name "Your English Name"
git config --global user.email "your-github-email@example.com"
```

### ระบบ Windows กับ WSL มี Node.js คนละ version

เป็นเรื่องปกติ แต่รายวิชาใช้ version ภายใน WSL เป็นหลัก ให้ตรวจจาก VS Code terminal ที่กำลังเปิด WSL ด้วย

```bash
which node
node -v
```

path ควรอยู่ใต้ `/home/<linux-username>/.nvm/...` เมื่อใช้ nvm ใน WSL

---

## เอกสารอ้างอิงทางการ

- Node.js download and LTS guidance: <https://nodejs.org/en/download>
- Homebrew: <https://brew.sh/> และ <https://docs.brew.sh/Installation>
- VS Code on Windows: <https://code.visualstudio.com/docs/setup/windows>
- VS Code — Developing in WSL: <https://code.visualstudio.com/docs/remote/wsl>
- GitHub — Set up Git: <https://docs.github.com/en/get-started/git-basics/set-up-git>
- GitHub — Connecting to GitHub with SSH: <https://docs.github.com/en/authentication/connecting-to-github-with-ssh>
- GitHub — Adding an SSH key: <https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account>
- SQLite command-line shell: <https://sqlite.org/cli.html>

---

**เส้นทางแนะนำ:** ทำ Part 1 (สำหรับ Windows) → ทำ Part 2 → เปิด [LAB 01](../labs/week-01-developer-environment-git-github/) → ส่ง URL GitHub repository ตาม [คู่มือการส่งงาน](./submission-guide.md)
