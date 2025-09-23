# 📦 Lab 8.5: Building และ Distribution
## การสร้างไฟล์ .exe และแจกจ่าย Desktop Application

### 🎓 สำหรับนักศึกษาวิศวกรรมซอฟต์แวร์ ปีที่ 2
#### เวลาในการทำ: 1 สัปดาห์

---

## 🎯 วัตถุประสงค์ของ Lab 8.5

### **Learning Objectives**
เมื่อเสร็จสิ้น Lab 8.5 นี้ นักศึกษาจะสามารถ:
- 📦 Build Electron app เป็นไฟล์ .exe, .dmg, .deb
- 🏗️ ใช้ electron-builder สำหรับการ packaging
- 🖼️ สร้าง icon และ assets สำหรับ app
- 📋 เขียน package.json สำหรับ distribution
- 🚀 แจกจ่าย app ให้ผู้ใช้งานจริง
- 📝 สร้าง installer และ uninstaller

### **💡 ทำไมต้องเรียน Building?**
```
Development ≠ Production
├── npm start               ├── app.exe (Windows)
├── ต้องมี Node.js            ├── app.dmg (macOS)  
├── ต้องมี source code        ├── app.deb (Linux)
├── Developer เท่านั้น         ├── ไม่ต้องติดตั้งอะไร
└── ใช้งานยาก                └── คลิกเดียวใช้ได้
```

---

## 📚 ทำความเข้าใจ Building Process

### **🏗️ Building Workflow:**

```
Source Code
    ↓
Package Dependencies  
    ↓
Create Executable
    ↓
Add Assets & Icons
    ↓
Create Installer
    ↓
Ready to Distribute!
```

### **📦 Tools ที่จะใช้:**
- **electron-builder** - เครื่องมือ build หลัก
- **electron-packager** - ทางเลือกอื่น (ไม่ใช้ใน lab นี้)
- **Auto-updater** - สำหรับ update app (bonus)

---

## 🚀 Step 1: เตรียม Project สำหรับ Building

### **📂 ใช้ Project จาก Lab 8.4**
```bash
# Copy project จาก Lab 8.4
cp -r lab8-4-realtime lab8-5-build
cd lab8-5-build

# หรือสร้างใหม่
mkdir lab8-5-build
cd lab8-5-build
npm init -y
npm install electron --save-dev
```

### **🔧 ติดตั้ง electron-builder**
```bash
npm install electron-builder --save-dev
```

### **📝 อัพเดท package.json**
```json
{
  "name": "agent-wallboard",
  "version": "1.0.0",
  "description": "Real-time Agent Wallboard Desktop Application",
  "main": "main.js",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "scripts": {
    "start": "electron .",
    "dev": "electron . --dev",
    "build": "electron-builder",
    "build-win": "electron-builder --win",
    "build-mac": "electron-builder --mac", 
    "build-linux": "electron-builder --linux",
    "build-all": "electron-builder --win --mac --linux",
    "dist": "npm run build",
    "pack": "electron-builder --dir"
  },
  "devDependencies": {
    "electron": "^27.0.0",
    "electron-builder": "^24.6.4"
  },
  "dependencies": {},
  "build": {
    "appId": "com.yourcompany.agent-wallboard",
    "productName": "Agent Wallboard",
    "copyright": "Copyright © 2024 Your Company Name",
    "directories": {
      "output": "dist",
      "buildResources": "build"
    },
    "files": [
      "main.js",
      "preload.js", 
      "index.html",
      "api-config.js",
      "mock-data.json",
      "assets/**/*",
      "node_modules/**/*"
    ],
    "extraResources": [
      {
        "from": "assets",
        "to": "assets"
      }
    ],
    "win": {
      "target": "nsis",
      "icon": "build/icon.ico",
      "requestedExecutionLevel": "asInvoker"
    },
    "mac": {
      "target": "dmg",
      "icon": "build/icon.icns",
      "category": "public.app-category.business"
    },
    "linux": {
      "target": "deb",
      "icon": "build/icon.png",
      "category": "Office"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true,
      "shortcutName": "Agent Wallboard"
    }
  }
}
```

**🔑 อธิบาย Configuration:**
- `appId` = รหัสเฉพาะของ app (ใช้ reverse domain notation)
- `productName` = ชื่อที่แสดงใน installer
- `files` = ไฟล์ที่ต้องการรวมใน build
- `extraResources` = ไฟล์เพิ่มเติม (assets, configs)
- `win/mac/linux` = การตั้งค่าเฉพาะแต่ละ platform

---

## 🖼️ Step 2: สร้าง Icons และ Assets

### **📁 สร้าง Directory Structure**
```bash
mkdir -p build assets
```

### **🎨 สร้าง Icons**

**Windows (.ico) - ต้องมีหลายขนาด:**
```
build/icon.ico
├── 16x16 pixels
├── 24x24 pixels  
├── 32x32 pixels
├── 48x48 pixels
├── 64x64 pixels
├── 128x128 pixels
└── 256x256 pixels
```

**macOS (.icns) - Apple format:**
```
build/icon.icns
├── 16x16@1x, 16x16@2x
├── 32x32@1x, 32x32@2x
├── 128x128@1x, 128x128@2x
└── 256x256@1x, 256x256@2x
```

**Linux (.png) - PNG format:**
```
build/icon.png (512x512 pixels แนะนำ)
```

### **🛠️ วิธีสร้าง Icons:**

**Option 1: ใช้ Online Tools (ง่ายที่สุด)**
```
1. ไป https://www.icoconverter.com/
2. อัปโหลดรูป PNG ขนาด 512x512
3. Convert เป็น .ico, .icns
4. ดาวน์โหลดมาใส่ใน build/
```

**Option 2: ใช้ AI/Design Tools**
```
1. ใช้ DALL-E, Midjourney สร้างรูป
2. หรือใช้ Canva, Figma ออกแบบ
3. Export เป็น PNG 512x512
4. Convert ด้วย online tools
```

**Option 3: ใช้ Emoji (สำหรับทดสอบ)**
```bash
# สร้างไฟล์ชั่วคราวด้วย emoji
echo "📊" > build/icon.txt
# แล้วแปลงเป็นรูปด้วย online tools
```

### **📄 สร้าง build/installer.nsh (Windows)**
```nsh
; installer.nsh - Custom installer script

!include "MUI2.nsh"

; Installer pages
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_LICENSE "LICENSE"
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

; Uninstaller pages  
!insertmacro MUI_UNPAGE_WELCOME
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_UNPAGE_FINISH

; Languages
!insertmacro MUI_LANGUAGE "English"
!insertmacro MUI_LANGUAGE "Thai"
```

---

## 🔧 Step 3: เพิ่ม Build Scripts

### **📄 สร้าง build-config.js**
```javascript
// build-config.js - การตั้งค่าเพิ่มเติมสำหรับ build

const path = require('path');

module.exports = {
  // ตรวจสอบไฟล์ที่จำเป็น
  checkRequiredFiles: () => {
    const requiredFiles = [
      'main.js',
      'preload.js', 
      'index.html',
      'package.json'
    ];
    
    const missingFiles = requiredFiles.filter(file => {
      try {
        require.resolve(path.join(process.cwd(), file));
        return false;
      } catch {
        return true;
      }
    });
    
    if (missingFiles.length > 0) {
      console.error('❌ ไฟล์ที่จำเป็นหายไป:', missingFiles);
      process.exit(1);
    }
    
    console.log('✅ ไฟล์ที่จำเป็นครบถ้วน');
  },
  
  // ล้างโฟลเดอร์ dist
  cleanDist: () => {
    const fs = require('fs');
    const distPath = path.join(process.cwd(), 'dist');
    
    if (fs.existsSync(distPath)) {
      fs.rmSync(distPath, { recursive: true, force: true });
      console.log('🗑️ ล้างโฟลเดอร์ dist แล้ว');
    }
  },
  
  // แสดงข้อมูล build
  showBuildInfo: () => {
    const packageJson = require('./package.json');
    
    console.log('\n📦 BUILD INFORMATION');
    console.log('===================');
    console.log(`📱 App Name: ${packageJson.name}`);
    console.log(`🏷️ Version: ${packageJson.version}`);
    console.log(`👤 Author: ${packageJson.author}`);
    console.log(`📝 Description: ${packageJson.description}`);
    console.log(`🖥️ Platform: ${process.platform}`);
    console.log(`📁 Output: ./dist/\n`);
  }
};
```

### **📄 สร้าง scripts/build.js**
```bash
mkdir scripts
```

```javascript
// scripts/build.js - Build script หลัก

const { execSync } = require('child_process');
const config = require('../build-config');

async function build() {
  try {
    console.log('🚀 เริ่มต้น build process...\n');
    
    // ตรวจสอบไฟล์
    config.checkRequiredFiles();
    
    // ล้าง dist folder
    config.cleanDist();
    
    // แสดงข้อมูล build
    config.showBuildInfo();
    
    // เริ่ม build
    console.log('🔨 กำลัง build application...');
    
    const platform = process.argv[2] || 'current';
    let buildCommand;
    
    switch (platform) {
      case 'win':
        buildCommand = 'npm run build-win';
        break;
      case 'mac':
        buildCommand = 'npm run build-mac';
        break;
      case 'linux':
        buildCommand = 'npm run build-linux';
        break;
      case 'all':
        buildCommand = 'npm run build-all';
        break;
      default:
        buildCommand = 'npm run build';
    }
    
    console.log(`⚙️ รันคำสั่ง: ${buildCommand}`);
    
    execSync(buildCommand, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('\n✅ Build สำเร็จ!');
    console.log('📁 ไฟล์ output อยู่ในโฟลเดอร์: ./dist/');
    console.log('🎉 พร้อมแจกจ่ายแล้ว!\n');
    
  } catch (error) {
    console.error('\n❌ Build ล้มเหลว:', error.message);
    process.exit(1);
  }
}

// รัน build
build();
```

### **📝 อัพเดท package.json scripts**
```json
{
  "scripts": {
    "start": "electron .",
    "dev": "electron . --dev",
    "prebuild": "node build-config.js",
    "build": "electron-builder",
    "build-win": "electron-builder --win",
    "build-mac": "electron-builder --mac",
    "build-linux": "electron-builder --linux", 
    "build-all": "electron-builder --win --mac --linux",
    "build-script": "node scripts/build.js",
    "build-script-win": "node scripts/build.js win",
    "build-script-all": "node scripts/build.js all",
    "pack": "electron-builder --dir",
    "dist": "npm run build"
  }
}
```

---

## ▶️ Step 4: ทดสอบ Building

### **🧪 Test 1: Pack (ไม่สร้าง installer)**
```bash
# ทดสอบ pack ก่อน (เร็วกว่า)
npm run pack
```

**ผลลัพธ์:**
```
dist/
├── win-unpacked/          (Windows)
│   ├── Agent Wallboard.exe
│   ├── resources/
│   └── ...
├── mac/                   (macOS) 
└── linux-unpacked/        (Linux)
```

### **🧪 Test 2: Build เฉพาะ Platform ปัจจุบัน**
```bash
# Build สำหรับ OS ปัจจุบัน
npm run build
```

### **🧪 Test 3: Build สำหรับ Windows**
```bash
# Build สำหรับ Windows (ทำได้บนทุก OS)
npm run build-win
```

**ผลลัพธ์ (Windows):**
```
dist/
├── Agent Wallboard Setup 1.0.0.exe    (Installer)
├── Agent Wallboard 1.0.0.exe          (Portable)
└── win-unpacked/                       (Folder)
```

### **🧪 Test 4: ใช้ Build Script**
```bash
# ใช้ custom build script
npm run build-script
npm run build-script-win
```

---

## 🔍 Step 5: ตรวจสอบและทดสอบ App

### **✅ Checklist ก่อน Build:**

**1. ตรวจสอบไฟล์:**
```bash
# ตรวจสอบว่าไฟล์ครบ
ls -la main.js preload.js index.html package.json
ls -la build/icon.ico  # หรือ .icns, .png
```

**2. ทดสอบ Development:**
```bash
# ต้องทำงานใน dev mode ก่อน
npm run dev
```

**3. ทดสอบ Production Mode:**
```bash
# ทดสอบโดยไม่มี DevTools
npm start
```

### **🧪 การทดสอบ Built App:**

**1. ทดสอบ Installer:**
```
1. รัน .exe installer
2. ติดตั้งใน Program Files
3. ตรวจสอบ Start Menu shortcut
4. ตรวจสอบ Desktop shortcut
5. เปิด app และทดสอบ features
```

**2. ทดสอบ Portable Version:**
```
1. รัน .exe โดยตรง (ไม่ต้องติดตั้ง)
2. ทดสอบบนเครื่องที่ไม่มี Node.js
3. ทดสอบ features ทั้งหมด
4. ตรวจสอบว่าไม่มี error
```

**3. ทดสอบการ Uninstall:**
```
1. ถอนการติดตั้งจาก Control Panel
2. ตรวจสอบว่าไฟล์ถูกลบหมด
3. ตรวจสอบว่า registry entries ถูกลบ
```

---

## 📦 Step 6: การแจกจ่าย (Distribution)

### **🌐 วิธีการแจกจ่าย:**

**1. Manual Distribution:**
```
📁 สร้างโฟลเดอร์ distribution/
├── Agent-Wallboard-Setup-1.0.0.exe    (Installer)
├── Agent-Wallboard-Portable-1.0.0.exe (Portable)
├── README.txt                          (คำแนะนำ)
├── CHANGELOG.txt                       (บันทึกการเปลี่ยนแปลง)
└── LICENSE.txt                         (ลิขสิทธิ์)
```

**2. Cloud Storage:**
```
🔗 อัปโหลดไป:
├── Google Drive / OneDrive
├── Dropbox
├── GitHub Releases  
└── Company Server
```

**3. GitHub Releases (แนะนำ):**
```bash
# 1. Push code ไป GitHub
git add .
git commit -m "Release v1.0.0"
git tag v1.0.0
git push origin main --tags

# 2. สร้าง Release ใน GitHub
# 3. อัปโหลด .exe files
# 4. เขียน Release Notes
```

### **📄 สร้างไฟล์เอกสาร:**

**README.txt:**
```
🏢 Agent Wallboard v1.0.0
=========================

📋 System Requirements:
- Windows 10/11 (64-bit)
- 4GB RAM
- 100MB Storage

🚀 Installation:
1. ดาวน์โหลด Agent-Wallboard-Setup-1.0.0.exe
2. คลิกขวา > Run as Administrator
3. ติดตั้งตามขั้นตอน
4. เปิดจาก Start Menu

💡 Features:
- Real-time agent monitoring
- WebSocket communication  
- Desktop notifications
- System tray integration
- Data export (CSV)

📞 Support:
Email: support@yourcompany.com
Phone: 02-xxx-xxxx
```

**CHANGELOG.txt:**
```
📅 CHANGELOG
============

v1.0.0 (2024-01-15)
------------------
🎉 Initial Release
✅ Real-time agent dashboard
✅ WebSocket integration
✅ Desktop notifications
✅ System tray support
✅ CSV export functionality

🔧 Technical:
- Built with Electron 27.0.0
- Supports Windows 10/11
- Auto-updater ready
- Installer size: ~120MB
```

---

## 🎯 Step 7: Auto-Updater (Bonus)

### **🔄 เพิ่ม Auto-Update Feature:**

**1. ติดตั้ง electron-updater:**
```bash
npm install electron-updater --save
```

**2. เพิ่มใน main.js:**
```javascript
// เพิ่มส่วนนี้ใน main.js

const { autoUpdater } = require('electron-updater');

// ตั้งค่า auto-updater
autoUpdater.checkForUpdatesAndNotify();

// Event listeners
autoUpdater.on('checking-for-update', () => {
  console.log('🔍 ตรวจสอบ updates...');
});

autoUpdater.on('update-available', (info) => {
  console.log('🆕 มี update ใหม่:', info.version);
});

autoUpdater.on('update-not-available', (info) => {
  console.log('✅ ใช้ version ล่าสุดแล้ว:', info.version);
});

autoUpdater.on('error', (err) => {
  console.error('❌ Auto-updater error:', err);
});

autoUpdater.on('download-progress', (progressObj) => {
  let logMessage = "Download speed: " + progressObj.bytesPerSecond;
  logMessage = logMessage + ' - Downloaded ' + progressObj.percent + '%';
  logMessage = logMessage + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  console.log(logMessage);
});

autoUpdater.on('update-downloaded', (info) => {
  console.log('✅ Update downloaded:', info.version);
  autoUpdater.quitAndInstall();
});
```

**3. เพิ่มใน package.json:**
```json
{
  "build": {
    "publish": [
      {
        "provider": "github",
        "owner": "your-username",
        "repo": "agent-wallboard"
      }
    ]
  }
}
```

---

## 📋 Assignment: สร้าง Complete Distribution

### **📝 งานที่ต้องทำ:**

1. **🏗️ Build Setup:**
   - สร้าง icons ทุก format (.ico, .icns, .png)
   - ตั้งค่า package.json ให้ครบถ้วน
   - ทดสอบ build บนเครื่องตัวเอง

2. **📦 Create Distribution:**
   - Build installer สำหรับ Windows
   - สร้าง portable version
   - เขียนเอกสาร README และ CHANGELOG

3. **🧪 Testing:**
   - ทดสอบ installer บนเครื่องอื่น
   - ทดสอบ uninstaller
   - ตรวจสอบ features ทั้งหมดทำงาน

4. **🌐 Distribution:**
   - อัปโหลดไป GitHub Releases
   - สร้าง download links
   - เขียน installation guide

### **💯 Bonus Features:**
- 🔄 **Auto-updater** ที่ทำงานได้
- 🍎 **macOS build** (.dmg file)
- 🐧 **Linux build** (.deb package)
- 📊 **Build analytics** (file sizes, build time)
- 🔐 **Code signing** (digital certificate)

---

## 🎉 สรุป Lab 8.5

### **🏆 สิ่งที่เรียนรู้แล้ว:**
- ✅ **electron-builder** - การ build Electron apps
- ✅ **Cross-platform building** - Windows, macOS, Linux
- ✅ **Icons และ Assets** - การเตรียมไฟล์สำหรับ build
- ✅ **Installer creation** - NSIS, DMG, DEB
- ✅ **Distribution strategies** - การแจกจ่าย app
- ✅ **Auto-updater** - การอัปเดทอัตโนมัติ
- ✅ **Testing และ QA** - การทดสอบ built app

### **🔑 Key Skills ที่ได้:**
1. **Production Ready** - สร้าง app ที่พร้อมใช้งานจริง
2. **Professional Distribution** - แจกจ่ายแบบมืออาชีป
3. **Multi-platform Support** - รองรับหลาย OS
4. **User Experience** - installer ที่ใช้งานง่าย
5. **Maintenance** - การอัปเดทและบำรุงรักษา

### **🎯 ครบวงจร Electron Workshop:**
**Lab 8.1** → **Lab 8.2** → **Lab 8.3** → **Lab 8.4** → **Lab 8.5**
พื้นฐาน → IPC → Native APIs → Real-time → Building

**🚀 คุณพร้อมสร้าง Desktop Apps ระดับ Enterprise แล้ว!**

---

**🎊 ยินดีด้วย! จบ Electron.js Workshop สมบูรณ์แล้ว!**

*ตอนนี้คุณมีทักษะครบถ้วนสำหรับสร้าง Agent Wallboard หรือ desktop application อื่นๆ ตั้งแต่เริ่มต้นจนถึงแจกจ่ายให้ผู้ใช้งานจริง!* 

**🎯 Next Level:**
- 🏢 **Enterprise Features** - Authentication, Database integration
- 🌟 **Advanced UI** - React, Vue.js integration  
- 🔐 **Security** - Code signing, secure updates
- 📊 **Analytics** - Usage tracking, crash reporting
- 💼 **Commercialization** - License management, payment

**สุดท้าย: เอาไปใส่ Portfolio และหางานได้เลย!** 💼✨