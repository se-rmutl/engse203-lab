# Setup บน macOS / iMac M1

> ใช้กับ iMac M1 ในห้องปฏิบัติการ และ MacBook ของนักศึกษา  
> หลังทำหน้านี้เสร็จ ให้ไปต่อที่ [Git + GitHub SSH](./git-github-ssh.md)

## เป้าหมาย

เมื่อจบขั้นตอนนี้ เครื่อง macOS ต้องมี:

- Terminal พร้อมใช้งาน และมี Git
- Visual Studio Code และคำสั่ง `code`
- nvm สำหรับเลือก Node.js version
- Node.js **22.x** และ npm
- SQLite CLI สำหรับ LAB ช่วงหลัง

## 1) ติดตั้ง Xcode Command Line Tools

เปิด **Terminal.app** แล้วรัน:

```bash
xcode-select --install
```

ทำตามหน้าต่างติดตั้งจนเสร็จ จากนั้นปิดและเปิด Terminal ใหม่ แล้วตรวจ:

```bash
xcode-select -p
git --version
```

หาก `git --version` แสดงเวอร์ชันได้ ให้ไปขั้นตอนถัดไป

## 2) ติดตั้ง Homebrew (แนะนำ)

Homebrew ช่วยติดตั้งเครื่องมือ CLI ที่ใช้ใน LAB ช่วงหลัง เช่น SQLite, jq และ ripgrep

1. เปิด [Homebrew](https://brew.sh/)
2. ใช้คำสั่งติดตั้งล่าสุดตามหน้าเว็บทางการ
3. ทำคำสั่งเพิ่ม Homebrew เข้า PATH ที่ installer แสดงให้ครบ

สำหรับ Apple Silicon มักเป็น:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

ตรวจ:

```bash
brew --version
brew doctor
```

> ถ้าเป็นเครื่องห้องปฏิบัติการที่ติดตั้ง Homebrew อยู่แล้ว ให้ข้ามขั้นตอนติดตั้ง และใช้เฉพาะคำสั่งตรวจสอบ

## 3) ติดตั้ง Visual Studio Code

1. ดาวน์โหลด [Visual Studio Code สำหรับ macOS](https://code.visualstudio.com/download)
2. เลือก **Universal** หรือ Apple Silicon ตามเครื่อง
3. ย้าย `Visual Studio Code.app` ไปไว้ใน `Applications`
4. เปิด VS Code หนึ่งครั้ง
5. กด `Cmd + Shift + P` แล้วเลือก **Shell Command: Install 'code' command in PATH**
6. ปิดและเปิด Terminal ใหม่

ตรวจ:

```bash
code --version
```

หากไม่พบ `code` ให้ทำข้อ 5 ซ้ำ แล้วเปิด Terminal ใหม่อีกครั้ง

## 4) ติดตั้ง nvm และ Node.js 22.x

> ใช้ **nvm** เพียงแนวทางเดียวสำหรับ Node.js ของรายวิชา ไม่ควรติดตั้ง Node `.pkg` และ nvm ปะปนกันโดยไม่เข้าใจ PATH

ติดตั้ง nvm ตาม script จากโครงการ nvm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash
```

โหลดค่า shell ปัจจุบัน:

```bash
source ~/.zshrc
command -v nvm
```

ถ้าเห็นคำว่า `nvm` ให้ติดตั้ง Node 22 และตั้งเป็นค่าเริ่มต้น:

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

สำหรับ LAB 02 ที่ใช้ Vite ให้ Node ต้องเป็น **22.12.0 หรือใหม่กว่า**:

```bash
node -e "const [major, minor] = process.versions.node.split('.').map(Number); const ok = major > 22 || (major === 22 && minor >= 12); console.log(ok ? 'OK: Node version meets ENGSE203 baseline' : 'ERROR: install Node 22.12.0 or newer'); process.exit(ok ? 0 : 1)"
```

### เมื่อเปิด Terminal ใหม่แล้วขึ้น `nvm: command not found`

รัน:

```bash
source ~/.zshrc
command -v nvm
```

หากยังไม่พบ ให้ตรวจว่าไฟล์ `~/.zshrc` มีบรรทัดสำหรับ `NVM_DIR` และ source `nvm.sh` ซึ่ง installer ของ nvm ควรเพิ่มให้อัตโนมัติ

## 5) ติดตั้งเครื่องมือเสริมที่ใช้ในรายวิชา

```bash
brew install sqlite jq ripgrep
```

ตรวจ:

```bash
sqlite3 --version
jq --version
rg --version
```

> Docker Desktop และ MongoDB Compass ยังไม่จำเป็นใน Week 1 ให้ติดตั้งเมื่อผู้สอนประกาศใน LAB ที่เกี่ยวข้อง

## 6) สร้าง workspace ของรายวิชา

```bash
mkdir -p ~/Documents/ENGSE203
cd ~/Documents/ENGSE203
pwd
```

ผลลัพธ์ควรมีลักษณะ:

```text
/Users/<mac-username>/Documents/ENGSE203
```

เปิด workspace ใน VS Code:

```bash
code .
```

## 7) ไปต่อ

1. [ตั้งค่า Git account และ SSH key](./git-github-ssh.md)
2. [ตั้งค่า VS Code และ GitHub sign-in](./vscode-github.md)
3. [ทดสอบระบบทั้งหมด](./verification.md)

## อ้างอิงทางการ

- [Visual Studio Code on macOS](https://code.visualstudio.com/docs/setup/mac)
- [nvm installation](https://github.com/nvm-sh/nvm#installing-and-updating)
- [Node.js release schedule](https://nodejs.org/en/about/previous-releases)
