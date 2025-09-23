# 🚀 Lab 8.1: Electron.js เบื้องต้น
## Hello Desktop App - การรู้จักและทดลองใช้ Electron.js ครั้งแรก

### 🎓 สำหรับนักศึกษาวิศวกรรมซอฟต์แวร์ ปีที่ 2
#### เวลาในการทำ: 1 สัปดาห์

---

## 🎯 วัตถุประสงค์ของ Lab 8.1

### **Learning Objectives**
เมื่อเสร็จสิ้น Lab 8.1 นี้ นักศึกษาจะสามารถ:
- 📖 เข้าใจว่า Electron.js คืออะไร และทำงานอย่างไร
- 🛠️ ติดตั้งและตั้งค่า Electron.js project แรก
- 🖥️ เข้าใจความแตกต่างระหว่าง Main Process และ Renderer Process
- 🎨 สร้าง desktop application ง่ายๆ ด้วย HTML, CSS, JavaScript
- ▶️ รัน desktop app บนเครื่องตัวเอง

### **Prerequisites**
✅ JavaScript พื้นฐาน  
✅ HTML/CSS พื้นฐาน  
✅ Node.js และ npm ติดตั้งแล้ว
✅ Text editor (VS Code แนะนำ)

---

## 📚 ทำความเข้าใจ Electron.js

### **🤔 Electron.js คืออะไร?**
Electron เป็น framework ที่ให้เราสร้าง **desktop applications** ด้วยเทคโนโลยี **web** (HTML, CSS, JavaScript)

### **💡 ทำไมต้องใช้ Electron?**
- ✅ เขียนครั้งเดียว รันได้หลาย platform (Windows, macOS, Linux)
- ✅ ใช้ความรู้ web development ที่มีอยู่
- ✅ ไม่ต้องเรียนภาษาใหม่สำหรับแต่ละ OS
- ✅ Apps ดังๆ ใช้ Electron: VS Code, Discord, Slack, WhatsApp Desktop

### **🏗️ Architecture พื้นฐาน**
```
Electron App
├── Main Process (เสมือน backend)
│   ├── ควบคุม application lifecycle  
│   ├── สร้างและจัดการ windows
│   └── เข้าถึง OS APIs
└── Renderer Process (เสมือน frontend)
    ├── แสดง UI ด้วย HTML/CSS/JS
    ├── ทำงานเหมือน web browser
    └── สื่อสารกับ Main Process
```

---

## 🚀 Step 1: สร้าง Project แรก

### **📂 สร้าง Directory และ Initialize**
```bash
# สร้างโฟลเดอร์ project
mkdir my-first-electron-app
cd my-first-electron-app

# สร้าง package.json
npm init -y

# ติดตั้ง Electron
npm install electron --save-dev
```

### **📝 แก้ไข package.json**
เปิดไฟล์ `package.json` และแก้ไขให้เป็นแบบนี้:

```json
{
  "name": "my-first-electron-app",
  "version": "1.0.0",
  "description": "My first Electron application",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "electron": "^38.1.2"
  }
}
```

**🔑 จุดสำคัญ:**
- `"main": "main.js"` = ไฟล์เริ่มต้นของ app
- `"start": "electron ."` = คำสั่งเพื่อรัน app

---

## 🖥️ Step 2: สร้าง Main Process

### **📄 สร้างไฟล์ main.js**
```javascript
// main.js - Main Process (เสมือน backend)
const { app, BrowserWindow } = require('electron');

// ตัวแปรเก็บ window
let mainWindow;

// ฟังก์ชันสร้าง window
function createWindow() {
  console.log('🚀 กำลังสร้าง window...');
  
  // สร้าง browser window
  mainWindow = new BrowserWindow({
    width: 800,           // ความกว้าง
    height: 600,          // ความสูง
    webPreferences: {
      nodeIntegration: false,    // ปิดเพื่อความปลอดภัย
      contextIsolation: true     // เปิดเพื่อความปลอดภัย
    }
  });

  // โหลดไฟล์ HTML
  mainWindow.loadFile('index.html');

  // แสดงข้อความเมื่อ window ถูกปิด
  mainWindow.on('closed', () => {
    console.log('❌ Window ถูกปิดแล้ว');
    mainWindow = null;
  });
  
  console.log('✅ สร้าง window สำเร็จ!');
}

// เมื่อ Electron พร้อมทำงาน
app.whenReady().then(() => {
  console.log('⚡ Electron พร้อมทำงาน');
  createWindow();
});

// เมื่อปิด window ทั้งหมด
app.on('window-all-closed', () => {
  console.log('🔴 ปิด window ทั้งหมดแล้ว');
  
  // ใน macOS, app จะไม่ปิดทันที
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ใน macOS, เมื่อคลิก dock icon
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
```

**🔑 จุดสำคัญ:**
- `app.whenReady()` = รอให้ Electron พร้อมใช้งาน
- `BrowserWindow` = สร้างหน้าต่าง desktop
- `loadFile()` = โหลดไฟล์ HTML

---

## 🎨 Step 3: สร้าง Renderer Process (UI)

### **📄 สร้างไฟล์ index.html**
```html
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Electron App</title>
  <style>
    /* CSS สำหรับตกแต่ง */
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    
    .container {
      text-align: center;
      background: rgba(255, 255, 255, 0.1);
      padding: 40px;
      border-radius: 20px;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      max-width: 500px;
    }
    
    .title {
      font-size: 2.5em;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .subtitle {
      font-size: 1.2em;
      margin-bottom: 30px;
      opacity: 0.9;
    }
    
    .button {
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid white;
      color: white;
      padding: 12px 30px;
      font-size: 16px;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin: 10px;
    }
    
    .button:hover {
      background: white;
      color: #667eea;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    .info {
      margin-top: 30px;
      padding: 20px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      font-size: 14px;
    }
    
    .process-info {
      text-align: left;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="title">🚀 Hello Electron!</h1>
    <p class="subtitle">นี่คือ Desktop App แรกของเรา</p>
    
    <button class="button" onclick="showAlert()">🎉 Click Me!</button>
    <button class="button" onclick="showTime()">⏰ Show Time</button>
    <button class="button" onclick="changeColor()">🎨 Change Color</button>
    
    <div class="info">
      <strong>🖥️ System Information:</strong>
      <div class="process-info" id="systemInfo">Loading...</div>
    </div>
    
    <div class="info">
      <strong>📊 Process Information:</strong>
      <div class="process-info">
        <div>🎨 <strong>Renderer Process:</strong> แสดง UI นี้</div>
        <div>🖥️ <strong>Main Process:</strong> ควบคุม window และ app</div>
        <div>🌐 <strong>Technology:</strong> HTML + CSS + JavaScript</div>
      </div>
    </div>
  </div>

  <script>
    console.log('🎨 Renderer Process เริ่มทำงาน');
    
    // ฟังก์ชันแสดง alert
    function showAlert() {
      alert('🎉 สวัสดี! นี่คือ Desktop App ที่สร้างด้วย Electron\n\n' +
            '✨ เราใช้ HTML, CSS, JavaScript เหมือน web\n' +
            '🖥️ แต่รันเป็น desktop application!');
    }
    
    // ฟังก์ชันแสดงเวลา
    function showTime() {
      const now = new Date();
      const timeString = now.toLocaleString('th-TH');
      alert(`⏰ เวลาปัจจุบัน:\n${timeString}`);
    }
    
    // ฟังก์ชันเปลี่ยนสี background
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    ];
    
    let currentColorIndex = 0;
    
    function changeColor() {
      currentColorIndex = (currentColorIndex + 1) % colors.length;
      document.body.style.background = colors[currentColorIndex];
      console.log('🎨 เปลี่ยนสีพื้นหลัง:', currentColorIndex);
    }
    
    // แสดงข้อมูล system
    function displaySystemInfo() {
      const info = document.getElementById('systemInfo');
      info.innerHTML = `
        <div>🌐 Platform: ${navigator.platform}</div>
        <div>🔧 User Agent: ${navigator.userAgent.split(' ')[0]}</div>
        <div>📱 Screen: ${screen.width} x ${screen.height}</div>
        <div>🌍 Language: ${navigator.language}</div>
      `;
    }
    
    // เรียกใช้เมื่อ page โหลดเสร็จ
    window.addEventListener('DOMContentLoaded', () => {
      console.log('📄 HTML โหลดเสร็จแล้ว');
      displaySystemInfo();
    });
    
    // แสดงข้อความเมื่อ page โหลดเสร็จสมบูรณ์
    window.addEventListener('load', () => {
      console.log('✅ ทุกอย่างโหลดเสร็จแล้ว - พร้อมใช้งาน!');
    });
  </script>
</body>
</html>
```

---

## ▶️ Step 4: รัน Application

### **🚀 เริ่มการทดสอบ**
```bash
# รัน app
npm start

# หรือ
npx electron .
```

### **✅ สิ่งที่ควรเห็น:**
1. 🖥️ หน้าต่าง desktop app เปิดขึ้นมา
2. 🎨 UI สวยงามพร้อม gradient background
3. 🔲 ปุ่มต่างๆ กดได้และทำงาน
4. 📊 แสดงข้อมูล system information
5. 💻 Console แสดง log messages

### **🐛 ถ้าเกิด Error:**
- ✅ ตรวจสอบว่าไฟล์ `main.js` และ `index.html` อยู่ใน folder เดียวกัน
- ✅ ตรวจสอบ `package.json` ว่า `"main": "main.js"` ถูกต้อง
- ✅ ตรวจสอบว่าติดตั้ง Electron แล้ว: `npm list electron`

---

## 🔍 Step 5: ทำความเข้าใจ Code

### **🖥️ Main Process (main.js)**
```javascript
// ส่วนสำคัญของ Main Process:

1. const { app, BrowserWindow } = require('electron');
   // นำเข้า modules จาก Electron

2. app.whenReady().then(() => { createWindow(); });
   // รอให้ Electron พร้อม แล้วสร้าง window

3. new BrowserWindow({ width: 800, height: 600 });
   // สร้างหน้าต่าง desktop ขนาด 800x600

4. mainWindow.loadFile('index.html');
   // โหลดไฟล์ HTML เข้ามาแสดง
```

### **🎨 Renderer Process (index.html)**
```html
<!-- ส่วนสำคัญของ Renderer Process: -->

1. HTML Structure: สร้างโครงสร้างหน้าเว็บ
2. CSS Styling: ตكแต่งให้สวยงาม  
3. JavaScript: เพิ่ม interactivity
4. ทำงานเหมือน web browser ปกติ
```

### **🔄 กระบวนการทำงาน:**
```
1. เรารัน: npm start
2. Electron เริ่มทำงาน
3. Main Process สร้าง BrowserWindow
4. โหลด index.html เข้า window
5. Renderer Process แสดง UI
6. ผู้ใช้โต้ตอบกับ app ได้!
```

---

## 🎯 Assignment: ปรับแต่ง App ของคุณ

### **📝 งานที่ต้องทำ:**

1. **🎨 ปรับแต่ง UI:**
   - เปลี่ยนสีและรูปแบบตามใจชอบ
   - เพิ่มปุ่มใหม่อย่างน้อย 2 ปุ่ม
   - ใส่รูปภาพหรือ icon

2. **⚙️ เพิ่ม Functionality:**
   - เพิ่มฟังก์ชันคำนวณง่ายๆ (เช่น เครื่องคิดเลข)
   - แสดงข้อมูลเพิ่มเติม (เช่น วันที่ปัจจุบัน)
   - เพิ่มเสียงเอฟเฟกต์ (ถ้าอยากลอง)

3. **🖥️ ปรับ Window:**
   - เปลี่ยนขนาด window
   - เปลี่ยน title ของแอป
   - ลองเพิ่ม icon ให้ app

### **📤 ส่งงาน:**
1. 📁 อัปโหลด project folder ทั้งหมด
2. 📸 Screenshot ของ app ที่รัน
3. 📝 อธิบายสั้นๆ ว่าปรับแต่งอะไรบ้าง

---

## 🎉 สรุป Lab 8.1

### **🏆 สิ่งที่เรียนรู้แล้ว:**
- ✅ เข้าใจ concept ของ Electron.js
- ✅ รู้ความแตกต่างระหว่าง Main Process และ Renderer Process  
- ✅ สร้าง desktop app แรกได้สำเร็จ
- ✅ รู้วิธีรันและทดสอบ app
- ✅ เข้าใจ project structure พื้นฐาน

### **🚀 Next Steps:**
- Lab 8.2: การสื่อสารระหว่าง processes (IPC)
- Lab 8.3: การเข้าถึง native APIs
- Lab 8.4: การสร้าง production app

### **💡 Key Takeaways:**
1. **Electron = Web + Desktop** 🌐➕🖥️
2. **Main Process = Backend**, **Renderer = Frontend**
3. **ใช้ความรู้ web ที่มีอยู่ได้เลย!**
4. **สร้าง cross-platform apps ได้ง่ายๆ**

---

**🎊 ยินดีด้วย! คุณได้สร้าง Desktop Application แรกแล้ว!**
