# คู่มือ Cross-platform Setup (Quick Reference)

> **ใช้ Setup Guide v3 เป็นคู่มือหลัก:** [เริ่มต้นที่ Setup Hub](./setup/README.md)

| เครื่อง | Environment มาตรฐาน | Workspace | Terminal สำหรับ LAB |
|---|---|---|---|
| iMac M1 / macOS | macOS native | `~/Documents/ENGSE203` | zsh ใน VS Code / Terminal.app |
| Windows 11 | Ubuntu 24.04 LTS บน WSL 2 | `~/workspace/engse203` | Bash ใน VS Code Remote - WSL |

## ลิงก์ตั้งค่า

1. **macOS:** [ติดตั้งเครื่องมือและ Node.js 22](./setup/macos.md)
2. **Windows 11 + WSL2:** [ติดตั้ง WSL2, Ubuntu 24.04 และ Node.js 22](./setup/windows-11-wsl2.md)
3. **Git + GitHub SSH:** [ตั้งค่า commit identity, SSH key และหลาย account](./setup/git-github-ssh.md)
4. **VS Code + GitHub:** [extensions, sign-in และ Remote - WSL](./setup/vscode-github.md)
5. **Verification:** [ตรวจ Node/npm/Git/SSH และทดสอบ push](./setup/verification.md)

## เกณฑ์ก่อนเริ่ม LAB 01

```bash
node -v
npm -v
git --version
ssh -T git@github.com
node scripts/verify-setup.mjs
```

- Node.js ต้อง `>=22.12.0`
- Windows ต้องเห็น `WSL: Ubuntu-24.04` ใน VS Code
- `ssh -T git@github.com` ต้องยืนยันเป็น username ของตนเอง
- Windows ทำ LAB ใน `/home/<user>/workspace/engse203` ไม่ใช่ `/mnt/c/...`
