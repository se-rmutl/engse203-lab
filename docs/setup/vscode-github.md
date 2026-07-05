# Visual Studio Code + GitHub สำหรับ ENGSE203

> จุดมุ่งหมาย: เปิด project ใน environment ถูกต้อง, ใช้ Source Control ได้, sign in GitHub ได้ และติดตั้ง extension เท่าที่จำเป็น

## 1) เข้าใจความสัมพันธ์ของ VS Code, Git และ GitHub

| สิ่งที่เห็น | หน้าที่ | ต้องตั้งที่ไหน |
|---|---|---|
| VS Code Source Control | ดูไฟล์ที่แก้, stage, commit, branch | VS Code |
| Git commit identity | ชื่อ/อีเมลที่ปรากฏใน commit | `git config` |
| GitHub SSH | clone / pull / push ด้วยสิทธิ์ของ GitHub account | SSH key ใน macOS หรือ WSL |
| GitHub sign-in ใน VS Code | PR, Issues, account integration และ Settings Sync | Accounts menu ใน VS Code |

> **สำคัญ:** Sign in GitHub ใน VS Code ไม่แทน SSH key สำหรับ Git workflow ของรายวิชา

## 2) Extensions ที่ใช้ในรายวิชา

| Extension | ID | ใช้เมื่อ | ติดตั้งที่ไหน |
|---|---|---:|---|
| ESLint | `dbaeumer.vscode-eslint` | Week 2 เป็นต้นไป | macOS หรือ WSL environment |
| Prettier - Code formatter | `esbenp.prettier-vscode` | Week 2 เป็นต้นไป | macOS หรือ WSL environment |
| GitHub Pull Requests and Issues | `GitHub.vscode-pull-request-github` | Week 1 เป็นต้นไป | macOS หรือ Windows host |
| REST Client | `humao.rest-client` | Week 6 เป็นต้นไป | macOS หรือ WSL environment |
| EditorConfig for VS Code | `EditorConfig.EditorConfig` | แนะนำ | macOS หรือ WSL environment |
| WSL | `ms-vscode-remote.remote-wsl` | Windows เท่านั้น | Windows host |

### ติดตั้งผ่าน Extensions panel

1. เปิด VS Code
2. กด `Cmd + Shift + X` บน macOS หรือ `Ctrl + Shift + X` บน Windows
3. ค้นหาชื่อ extension แล้วกด **Install**
4. สำหรับ Windows + WSL ให้เปิด folder ผ่าน `code .` ใน Ubuntu ก่อน แล้วกด **Install in WSL: Ubuntu-24.04** สำหรับ extension ที่ต้องทำงานกับ Node.js ภายใน WSL

### ติดตั้งผ่าน Terminal

```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension GitHub.vscode-pull-request-github
code --install-extension humao.rest-client
code --install-extension EditorConfig.EditorConfig
```

สำหรับ Windows host:

```powershell
code --install-extension ms-vscode-remote.remote-wsl
```

## 3) Sign in GitHub ใน VS Code

1. เปิด VS Code
2. กดไอคอน **Accounts** ที่มุมล่างซ้าย
3. เลือก **Sign in with GitHub**
4. Browser จะเปิดขึ้น ให้ login ด้วย GitHub account ของตนเอง
5. กดยอมรับการ authorize แล้วกลับมายัง VS Code

ตรวจว่า account ถูกต้องจาก Accounts menu อีกครั้ง

## 4) เปิด project ให้ถูก environment

### macOS

```bash
cd ~/Documents/ENGSE203
code .
```

### Windows + WSL

เปิด Ubuntu แล้วรัน:

```bash
cd ~/workspace/engse203
code .
```

ตรวจ VS Code status bar ต้องเห็น:

```text
WSL: Ubuntu-24.04
```

และ Terminal ใน VS Code ต้องตอบ:

```bash
pwd
uname -s
```

เป็น path `/home/...` และ `Linux`

## 5) ทดสอบ Source Control และ GitHub SSH

ใน VS Code:

1. เปิด repository ใด repository หนึ่ง
2. กด Source Control (`Cmd/Ctrl + Shift + G`)
3. แก้ไฟล์ `README.md` หนึ่งบรรทัด
4. ตรวจว่าไฟล์แสดงใน Changes
5. Stage file และเขียน commit message ที่สื่อความหมาย เช่น:

```text
docs: verify VS Code source control setup
```

6. Commit แล้วเปิด Integrated Terminal รัน:

```bash
git status
git push
```

หาก `git push` ผ่าน แปลว่า VS Code + Git + SSH ทำงานร่วมกันได้

## 6) ตั้งค่าที่แนะนำใน Workspace

เปิด Command Palette (`Cmd/Ctrl + Shift + P`) แล้วเลือก **Preferences: Open User Settings (JSON)** หรือสร้าง `.vscode/settings.json` เฉพาะ project ตามความเหมาะสม

ตัวอย่างค่าที่ไม่ผูกกับ framework:

```json
{
  "editor.formatOnSave": true,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

> ไม่ควร commit API key, token หรือ secret ลงไฟล์ settings

## ปัญหาที่พบบ่อย

| อาการ | แนวทางตรวจ |
|---|---|
| VS Code sign-in สำเร็จ แต่ `git push` ไม่ได้ | ตรวจ `ssh -T git@github.com` ใน terminal ของ environment นั้น |
| Windows VS Code แต่ Terminal ขึ้น PowerShell | เปิด Ubuntu แล้วรัน `code .` อีกครั้ง; ต้องเห็น `WSL: Ubuntu-24.04` |
| ESLint/Prettier ไม่ทำงานใน WSL | ติดตั้ง extension ในหน้าต่าง VS Code ที่เชื่อม WSL ไม่ใช่เฉพาะ Windows host |
| `code` ไม่พบคำสั่งบน macOS | ใช้ Command Palette → **Shell Command: Install 'code' command in PATH** แล้วเปิด Terminal ใหม่ |
| account ใน VS Code ไม่ตรงกับ account ที่ SSH ใช้ | ตรวจ Accounts menu และ `ssh -T git@github.com`; ทั้งสองส่วนอาจแยกกันได้ แต่ account ที่ SSH ใช้ต้องมีสิทธิ์ push repo |

## อ้างอิงทางการ

- [VS Code — Working with GitHub](https://code.visualstudio.com/docs/sourcecontrol/github)
- [VS Code — Source Control](https://code.visualstudio.com/docs/sourcecontrol/overview)
- [VS Code — Extension Marketplace](https://code.visualstudio.com/docs/configure/extensions/extension-marketplace)
- [VS Code — Developing in WSL](https://code.visualstudio.com/docs/remote/wsl)
