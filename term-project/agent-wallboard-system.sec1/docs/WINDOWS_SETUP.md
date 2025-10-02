# Windows Setup Guide สำหรับ Agent Desktop App

## เหตุผลที่ต้องใช้ Windows

Electron Desktop Application ต้องการ:
1. Native GUI framework
2. System tray access
3. Desktop notifications
4. Hardware acceleration

WSL2 ไม่รองรับสิ่งเหล่านี้โดยตรง

## Setup Instructions

### 1. ติดตั้ง Node.js บน Windows
- Download: https://nodejs.org/
- เลือก LTS version
- ติดตั้งตามขั้นตอน

### 2. Clone Project
```powershell
cd C:\Projects
git clone <your-repo>
cd agent-desktop
npm install
```

### 3. เตรียม Icons
- สร้าง icon.png (256x256)
- สร้าง tray-icon.png (32x32)
- วางใน public/assets/

### 4. สร้าง .env
```
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_SOCKET_URL=http://localhost:3001
NODE_ENV=development
```

### 5. รัน Application
```powershell
# ตรวจสอบ backend รันอยู่บน WSL2
# จากนั้นรัน:
npm run electron-dev
```

## Troubleshooting

### ปัญหา: Port ชน
```powershell
# หา process ที่ใช้ port
netstat -ano | findstr :3000
# Kill process
taskkill /PID <pid> /F
```

### ปัญหา: Icon ไม่แสดง
- ตรวจสอบ path ใน main.js
- ใช้ absolute path
- สร้าง .ico file สำหรับ Windows
