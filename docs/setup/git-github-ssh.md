# Git Account + SSH Key สำหรับ GitHub

> ทำหนึ่งครั้งต่อ **environment** ที่ใช้ส่งงาน  
> macOS สร้าง key ใน macOS · Windows สร้าง key **ภายใน Ubuntu WSL**

## ก่อนเริ่ม

1. มี GitHub account ของตนเอง
2. ไปที่ **GitHub → Settings → Emails** แล้วเพิ่ม/ยืนยันอีเมลที่ตั้งใจใช้กับ commit
3. ตัดสินใจว่าจะใช้ email ใดเป็นค่าเริ่มต้นของรายวิชา

> GitHub account เดียวเพิ่ม email ได้หลายอันได้ แต่ email ที่ใช้กับ commit ควรเป็น email ที่เพิ่มและ verify ไว้ใน GitHub แล้ว

## 1) ตั้งค่า Git commit identity

แทนค่าตัวอย่างด้วยข้อมูลจริงของนักศึกษา:

```bash
git config --global user.name "Your English Name"
git config --global user.email "your-github-email@example.com"
git config --global init.defaultBranch main
git config --global core.autocrlf input
git config --global fetch.prune true
```

ตรวจ:

```bash
git config --global user.name
git config --global user.email
git config --global --list --show-origin | grep user
```

### มี 2 email ใช้อย่างไร

ใช้ email หนึ่งเป็นค่า default ของรายวิชา แล้วเปลี่ยนเฉพาะ repository เมื่อจำเป็น:

```bash
# ทำในโฟลเดอร์ repository ที่ต้องการเปลี่ยนเท่านั้น
git config user.email "another-email@example.com"
git config user.name "Your English Name"
```

ค่าแบบ local จะ override ค่า `--global` เฉพาะ repo นั้น

> `user.name` และ `user.email` คือ **ผู้เขียน commit** ไม่ใช่ account ที่ GitHub ใช้ตรวจสิทธิ์ตอน push

## 2) ตรวจ SSH key เดิม

```bash
ls -al ~/.ssh
```

มองหาไฟล์เช่น:

```text
id_ed25519
id_ed25519.pub
```

ถ้ามี key ที่แน่ใจว่าเป็นของตนเองและใช้กับ GitHub account ที่ถูกต้อง สามารถใช้ต่อได้ หากไม่แน่ใจให้สร้าง key ใหม่โดยกำหนดชื่อไฟล์ชัดเจน

## 3) สร้าง SSH key แบบ Ed25519

### macOS

```bash
ssh-keygen -t ed25519 \
  -C "your-github-email@example.com" \
  -f ~/.ssh/id_ed25519_github_macos
```

### Ubuntu WSL

```bash
ssh-keygen -t ed25519 \
  -C "your-github-email@example.com" \
  -f ~/.ssh/id_ed25519_github_wsl
```

กำหนด passphrase เพื่อป้องกัน private key เมื่อเหมาะสม

ไฟล์ที่ได้:

```text
~/.ssh/id_ed25519_github_macos       # private key — ห้ามส่งให้ใคร
~/.ssh/id_ed25519_github_macos.pub   # public key — เพิ่มใน GitHub ได้
```

> ส่วน `-C` เป็นข้อความกำกับ key เท่านั้น ไม่ได้เลือก GitHub account ให้เอง ส่วน `-f` ช่วยตั้งชื่อไฟล์ไม่ให้ชนกัน

## 4) เพิ่ม key เข้า SSH agent

### macOS

สร้างไฟล์ config หากยังไม่มี:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
open -e ~/.ssh/config
```

เพิ่มหรือปรับ block นี้ โดยให้ชื่อไฟล์ตรงกับ key ที่สร้าง:

```text
Host github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519_github_macos
  IdentitiesOnly yes
```

บันทึกไฟล์ แล้วรัน:

```bash
chmod 600 ~/.ssh/config
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519_github_macos
```

### Ubuntu WSL

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519_github_wsl
chmod 644 ~/.ssh/id_ed25519_github_wsl.pub

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_github_wsl
```

> เมื่อปิด/เปิด Ubuntu ใหม่ `ssh-agent` อาจลืม key จึงต้องรัน `eval "$(ssh-agent -s)"` และ `ssh-add ...` ใหม่ตามความจำเป็น

## 5) เพิ่ม public key ใน GitHub

### macOS

```bash
pbcopy < ~/.ssh/id_ed25519_github_macos.pub
```

### Ubuntu WSL

แสดง key เพื่อ copy:

```bash
cat ~/.ssh/id_ed25519_github_wsl.pub
```

หรือ copy เข้า Windows clipboard:

```bash
clip.exe < ~/.ssh/id_ed25519_github_wsl.pub
```

บน GitHub ไปที่:

```text
Profile picture → Settings → SSH and GPG keys → New SSH key
```

กรอก:

```text
Title: ENGSE203-MacBook หรือ ENGSE203-Windows-WSL
Key type: Authentication Key
Key: วาง public key ที่คัดลอกมา
```

กด **Add SSH key**

## 6) ทดสอบการเชื่อมต่อ

```bash
ssh -T git@github.com
```

ครั้งแรกให้พิมพ์ `yes` เพื่อยอมรับ host fingerprint

ผลสำเร็จจะมีข้อความใกล้เคียง:

```text
Hi <github-username>! You've successfully authenticated,
but GitHub does not provide shell access.
```

ข้อความว่า GitHub ไม่ให้ shell access เป็นปกติ แปลว่า SSH authentication สำเร็จแล้ว

## 7) ใช้ SSH URL เพื่อ clone / push

ตัวอย่าง repository ของนักศึกษา:

```bash
git clone git@github.com:<github-username>/engse203-student-labs-<student-id>.git
```

ตรวจ remote:

```bash
git remote -v
```

ต้องเห็น URL ขึ้นต้นด้วย:

```text
git@github.com:
```

เปลี่ยน repository ที่ clone ด้วย HTTPS ให้ใช้ SSH:

```bash
git remote set-url origin git@github.com:<github-username>/<repository-name>.git
```

## Multiple GitHub Accounts — ใช้เมื่อจำเป็นเท่านั้น

ถ้าเครื่องเดียวมี GitHub มากกว่า 1 account ให้ใช้ **SSH host alias** เพื่อไม่ให้ key สลับผิด account

ตัวอย่าง `~/.ssh/config`:

```text
Host github-personal
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_personal
  IdentitiesOnly yes

Host github-course
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_course
  IdentitiesOnly yes
```

ทดสอบแต่ละ account:

```bash
ssh -T git@github-personal
ssh -T git@github-course
```

และใช้ alias ใน remote URL:

```bash
git remote set-url origin git@github-course:<github-username>/<repository-name>.git
```

### อาการ: `Permission denied to owner/repository.git`

ให้ตรวจ:

```bash
ssh -T git@github.com
git remote -v
git config user.name
git config user.email
```

สาเหตุส่วนใหญ่มักเป็น:

- `ssh -T` แสดง GitHub account ที่ไม่ใช่เจ้าของหรือ collaborator ของ repo
- remote URL ชี้ไปยัง repository ของคนอื่น
- GitHub account ยังไม่รับ invitation เข้า collaborator/team

## ห้ามทำ

- ห้าม upload หรือส่งไฟล์ private key ที่ไม่มี `.pub`
- ห้าม commit โฟลเดอร์ `~/.ssh` หรือไฟล์ `.env`
- ห้ามเชื่อว่าเปลี่ยน `git config user.email` แล้วจะเปลี่ยน account ที่ SSH ใช้ push

## อ้างอิงทางการ

- [GitHub Docs — Generating a new SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [GitHub Docs — Adding a new SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
- [GitHub Docs — Testing your SSH connection](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection)
- [GitHub Docs — Setting username and email in Git](https://docs.github.com/en/get-started/git-basics/setting-your-username-in-git)
