# Setup Verification — ตรวจระบบก่อนเริ่ม LAB 01

> ให้ทำการตรวจนี้ใน **VS Code Integrated Terminal** ของ environment ที่จะใช้ส่งงานจริง

## 1) ตรวจ Node.js, npm และ Git

```bash
node -v
npm -v
git --version
```

ต้องมีผลลัพธ์ทุกคำสั่ง และ Node.js ต้องเป็น `22.12.0` หรือใหม่กว่า:

```bash
node -e "const [major, minor] = process.versions.node.split('.').map(Number); const ok = major > 22 || (major === 22 && minor >= 12); console.log(ok ? 'OK: Node version meets ENGSE203 baseline' : 'ERROR: install Node 22.12.0 or newer'); process.exit(ok ? 0 : 1)"
```

## 2) รันตัวตรวจอัตโนมัติของ Course Repository

หลัง clone Course Repository แล้ว:

```bash
node scripts/verify-setup.mjs
```

ตัวตรวจนี้เช็ก Node, npm, Git, Git identity, VS Code CLI และ workspace เบื้องต้น

> การทดสอบ SSH ทำแยกในขั้นที่ 3 เพราะ `ssh -T` จะถามยืนยัน host fingerprint ในครั้งแรก

## 3) ตรวจ Git identity และ SSH GitHub

```bash
git config --global user.name
git config --global user.email
ssh -T git@github.com
```

ผลสำเร็จของ SSH ต้องระบุ GitHub username ของ **ตนเอง**

หากแสดง username ของคนอื่น ให้กลับไปดู [Multiple GitHub Accounts](./git-github-ssh.md)

## 4) ตรวจ VS Code

### ทุกเครื่อง

```bash
code --version
```

เปิด VS Code แล้วตรวจ:

- [ ] Accounts menu แสดง GitHub account ที่ intended
- [ ] Source Control เปิดได้
- [ ] Extensions: ESLint, Prettier, GitHub Pull Requests and Issues ติดตั้งแล้ว

### Windows + WSL เท่านั้น

ใน VS Code ต้องเห็น `WSL: Ubuntu-24.04` ที่ status bar และใน terminal:

```bash
pwd
uname -s
```

ต้องเป็น path `/home/...` และ `Linux`

## 5) End-to-End Test: สร้าง repository ทดสอบและ push จริง

### 5.1 สร้าง repository ว่างบน GitHub

สร้าง repository ชื่อ:

```text
engse203-setup-check-<student-id>
```

- เลือก Public หรือ Private ตามที่ผู้สอนอนุญาต
- **ไม่ต้อง** Add README, `.gitignore` หรือ License จากหน้า GitHub
- กด **Code → SSH** แล้วคัดลอก SSH URL

### 5.2 สร้าง project ทดสอบ

**macOS**

```bash
cd ~/Documents/ENGSE203
```

**Windows + WSL**

```bash
cd ~/workspace/engse203
```

จากนั้นใช้คำสั่งร่วมกัน:

```bash
mkdir engse203-setup-check-<student-id>
cd engse203-setup-check-<student-id>

git init
echo "# ENGSE203 Setup Check" > README.md
printf "console.log('ENGSE203 setup is ready');\n" > hello.js

node hello.js

git add README.md hello.js
git commit -m "chore: verify ENGSE203 development setup"
git branch -M main
git remote add origin git@github.com:<github-username>/engse203-setup-check-<student-id>.git
git push -u origin main
```

### 5.3 ตรวจบน GitHub และ clone ซ้ำ

เปิด repository ผ่าน browser ต้องเห็น `README.md` และ `hello.js`

ทดสอบ clone:

```bash
cd ..
git clone git@github.com:<github-username>/engse203-setup-check-<student-id>.git setup-check-clone
cd setup-check-clone
node hello.js
git remote -v
```

ถ้าคำสั่งนี้ผ่านครบ แปลว่า GitHub SSH, commit, push, clone และ Node.js พร้อมใช้งานจริง

## 6) เก็บหลักฐานสำหรับ LAB 01

บันทึก screenshot หรือข้อความผลลัพธ์ที่แสดง:

- `node -v`, `npm -v`, `git --version`
- `ssh -T git@github.com`
- GitHub repository ของ setup check หรือ LAB 01
- Windows: VS Code status `WSL: Ubuntu-24.04`

## 7) Troubleshooting แบบรวดเร็ว

| อาการ | ตรวจ/แก้ |
|---|---|
| `nvm: command not found` | macOS: `source ~/.zshrc` · WSL: `source ~/.bashrc` |
| Node ต่ำกว่า 22.12 | `nvm install 22 && nvm use 22 && nvm alias default 22` |
| `Permission denied (publickey)` | ตรวจ `ssh -T git@github.com`, key ใน GitHub และ `ssh-add -l` |
| Push ถูกปฏิเสธให้คนอื่น | `ssh -T` ระบุ account ไม่ตรงกับ owner/collaborator หรือ remote URL ชี้ repo คนอื่น |
| Windows ใช้ Node ใน PowerShell | เปิด Ubuntu แล้ว `cd ~/workspace/engse203 && code .` |
| `code` ไม่พบคำสั่ง | macOS ติดตั้ง command in PATH · Windows ปิด/เปิด Terminal หลังติดตั้ง VS Code |

ผ่านครบแล้วให้เริ่ม [LAB 01](../../labs/week-01-developer-environment-git-github/)
