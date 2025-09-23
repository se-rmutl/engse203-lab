# 🖥️ Lab 8.3: Native APIs และ System Integration
## การเข้าถึงระบบปฏิบัติการและฟีเจอร์ดั้งเดิม

### 🎓 สำหรับนักศึกษาวิศวกรรมซอฟต์แวร์ ปีที่ 2
#### เวลาในการทำ: 1 สัปดาห์

---

## 🎯 วัตถุประสงค์ของ Lab 8.3

### **Learning Objectives**
เมื่อเสร็จสิ้น Lab 8.3 นี้ นักศึกษาจะสามารถ:
- 📁 เข้าถึงระบบไฟล์ (file dialogs, file operations)
- 🔔 สร้าง desktop notifications
- 🖱️ ใช้ system tray (ถาดระบบ)
- ⌨️ จัดการ menu และ keyboard shortcuts
- 🖥️ ควบคุม window และ display
- 📊 ประยุกต์ใช้สำหรับ agent wallboard

### **💡 ทำไมต้องเรียน Native APIs?**
```
Web App ❌                    Desktop App ✅
├── ไม่มี file access        ├── เปิด/บันทึกไฟล์ได้
├── ไม่มี notifications      ├── แจ้งเตือนแบบ OS
├── ไม่มี system tray        ├── ไอคอนใน taskbar
├── จำกัดด้วย browser        ├── เข้าถึงระบบเต็มรูปแบบ
└── ไม่มี keyboard shortcuts └── Shortcuts แบบ desktop app
```

---

## 📚 ทำความเข้าใจ Native APIs

### **🧩 Native APIs ที่สำคัญ:**

```
Electron Native APIs
├── 📁 File System
│   ├── dialog (เปิด/บันทึกไฟล์)
│   └── fs (อ่าน/เขียนไฟล์)
├── 🔔 Notifications
│   └── แจ้งเตือนแบบ OS
├── 🖱️ System Tray
│   └── ไอคอนใน taskbar/menubar
├── 📋 Menu
│   ├── Application menu
│   └── Context menu
└── 🖥️ Window Control
    ├── ขนาด/ตำแหน่ง
    └── fullscreen/minimize
```

### **🎯 สำหรับ Agent Wallboard:**
- 📊 **Export report** เป็นไฟล์ CSV/PDF
- 🔔 **Popup notifications** เมื่อมี call เข้า
- 🖱️ **System tray** เพื่อซ่อน app
- ⌨️ **Hotkeys** สำหรับเปลี่ยนสถานะเร็ว
- 🖥️ **Always on top** สำหรับ monitoring

---

## 🚀 Step 1: Project Setup

### **📂 สร้าง Project Structure**
```
lab8-3-native/
├── main.js
├── preload.js  
├── index.html
├── package.json
├── assets/
│   ├── icon.png         (16x16, 32x32 สำหรับ tray)
│   └── notification.png (สำหรับ notification icon)
└── exports/            (โฟลเดอร์สำหรับ export files)
```

### **📝 package.json**
```json
{
  "name": "lab8-3-native-apis",
  "version": "1.0.0", 
  "description": "Learning Native APIs for Agent Wallboard",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "devDependencies": {
    "electron": "^27.0.0"
  }
}
```

### **🖼️ เตรียม Assets**
```bash
# สร้างโฟลเดอร์
mkdir assets exports

# ใส่ไฟล์ไอคอน (หรือใช้ emoji เป็น placeholder)
# icon.png: 16x16, 32x32 pixels
# notification.png: 64x64 pixels
```

---

## 📁 Step 2: File System APIs

### **🖥️ main.js - File Operations**
```javascript
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;

function createWindow() {
  console.log('🚀 [MAIN] สร้าง window...');
  
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();
  
  console.log('✅ [MAIN] Window พร้อมแล้ว');
}

// ===== FILE SYSTEM APIS =====

// 📂 เปิดไฟล์
ipcMain.handle('open-file', async () => {
  console.log('📂 [MAIN] เปิด file dialog...');
  
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: [
        { name: 'Text Files', extensions: ['txt', 'json', 'csv'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (!result.canceled && result.filePaths[0]) {
      const filePath = result.filePaths[0];
      const content = await fs.readFile(filePath, 'utf8');
      
      console.log('✅ [MAIN] อ่านไฟล์สำเร็จ:', path.basename(filePath));
      
      return {
        success: true,
        fileName: path.basename(filePath),
        filePath: filePath,
        content: content,
        size: content.length
      };
    }
    
    return { success: false, cancelled: true };
    
  } catch (error) {
    console.error('❌ [MAIN] Error:', error);
    return { success: false, error: error.message };
  }
});

// 💾 บันทึกไฟล์
ipcMain.handle('save-file', async (event, { content, fileName = 'export.txt' }) => {
  console.log('💾 [MAIN] บันทึกไฟล์...');
  
  try {
    const result = await dialog.showSaveDialog(mainWindow, {
      defaultPath: fileName,
      filters: [
        { name: 'Text Files', extensions: ['txt'] },
        { name: 'CSV Files', extensions: ['csv'] },
        { name: 'JSON Files', extensions: ['json'] }
      ]
    });

    if (!result.canceled && result.filePath) {
      await fs.writeFile(result.filePath, content, 'utf8');
      
      console.log('✅ [MAIN] บันทึกสำเร็จ:', path.basename(result.filePath));
      
      return {
        success: true,
        fileName: path.basename(result.filePath),
        filePath: result.filePath
      };
    }
    
    return { success: false, cancelled: true };
    
  } catch (error) {
    console.error('❌ [MAIN] Error:', error);
    return { success: false, error: error.message };
  }
});

/*
อธิบาย
app.whenReady().then(createWindow)
→ ใช้สำหรับสร้าง BrowserWindow ครั้งแรก ตอน Electron พร้อมแล้ว
→ ใช้ได้ทั้ง Windows และ macOS

app.on('activate', …)
→ เป็น พิเศษสำหรับ macOS
→ เวลาผู้ใช้กด icon แอปใน Dock หรือเปิด Spotlight หาแอปขึ้นมา
→ ถ้าไม่มี window → ต้อง createWindow() ใหม่
→ ถ้ามี window อยู่แล้ว (แค่ถูก hide) → mainWindow.show()

บน Windows ไม่มี event activate แบบนี้ แต่ใส่ไว้ก็ไม่เสียหาย
*/

//ใช้ได้ทั้ง Windows และ macOS + Tray
app.whenReady().then(() => {
  createWindow();

  // macOS: สร้าง window ใหม่เมื่อกด Dock icon ถ้าไม่มี window
  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    } else {
      mainWindow.show();
    }
  });
});

// ป้องกันการปิด app เมื่อปิด window สุดท้าย
app.on('window-all-closed', () => {
  // ไม่ quit เพื่อให้ app ทำงานใน tray ต่อไป
  // app จะปิดเมื่อเลือก "ออกจากโปรแกรม" จาก tray menu
});

// เมื่อจะปิด app จริงๆ
app.on('before-quit', () => {
  app.isQuiting = true;
});


```

**🔑 อธิบาย Code:**
- `dialog.showOpenDialog()` = เปิด file picker ของ OS
- `dialog.showSaveDialog()` = เปิด save dialog ของ OS
- `filters` = กำหนดประเภทไฟล์ที่แสดง
- `fs.readFile()` / `fs.writeFile()` = อ่าน/เขียนไฟล์

---

## 🌉 Step 3: Preload Script พื้นฐาน

### **📄 preload.js**
```javascript
const { contextBridge, ipcRenderer } = require('electron');

console.log('🌉 [PRELOAD] ตั้งค่า Native APIs...');

// เปิดเผย Native APIs ให้ Renderer ใช้
contextBridge.exposeInMainWorld('nativeAPI', {
  // 📁 File Operations
  openFile: () => {
    console.log('📁 [PRELOAD] เปิดไฟล์...');
    return ipcRenderer.invoke('open-file');
  },
  
  saveFile: (content, fileName) => {
    console.log('💾 [PRELOAD] บันทึกไฟล์...');
    return ipcRenderer.invoke('save-file', { content, fileName });
  }
});

console.log('✅ [PRELOAD] Native APIs พร้อมใช้งาน');
```

---

## 🎨 Step 4: UI สำหรับทดสอบ File Operations

### **📄 index.html**
```html
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lab 8.3 - Native APIs Demo</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
      color: white;
    }
    
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.1);
      padding: 30px;
      border-radius: 15px;
      backdrop-filter: blur(10px);
    }
    
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .section {
      background: rgba(255, 255, 255, 0.1);
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    
    .button {
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid white;
      color: white;
      padding: 12px 24px;
      border-radius: 25px;
      cursor: pointer;
      font-size: 16px;
      margin: 10px 5px;
      transition: all 0.3s ease;
    }
    
    .button:hover {
      background: white;
      color: #4CAF50;
      transform: translateY(-2px);
    }
    
    .result-box {
      background: rgba(0, 0, 0, 0.2);
      padding: 15px;
      border-radius: 8px;
      margin-top: 15px;
      font-family: monospace;
      white-space: pre-wrap;
      max-height: 200px;
      overflow-y: auto;
    }
    
    .file-content {
      background: rgba(255, 255, 255, 0.9);
      color: #333;
      padding: 15px;
      border-radius: 8px;
      margin-top: 15px;
      max-height: 300px;
      overflow-y: auto;
      font-family: monospace;
    }
    
    textarea {
      width: 100%;
      height: 150px;
      padding: 10px;
      border: none;
      border-radius: 5px;
      font-family: monospace;
      font-size: 14px;
      resize: vertical;
      box-sizing: border-box;
    }
    
    .loading { color: #FFD700; }
    .success { color: #90EE90; }
    .error { color: #FF6B6B; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🖥️ Native APIs Demo</h1>
      <p>การใช้ Native APIs ของ Operating System</p>
    </div>

    <!-- File Operations Section -->
    <div class="section">
      <h3>📁 File Operations</h3>
      <p>เปิดและบันทึกไฟล์ด้วย OS dialogs</p>
      
      <button class="button" onclick="openFile()">📂 เปิดไฟล์</button>
      <button class="button" onclick="exportAgentData()">📊 Export Agent Data</button>
      <button class="button" onclick="saveCurrentContent()">💾 บันทึกเนื้อหา</button>
      
      <div class="result-box" id="fileResult">กดปุ่มเพื่อทดสอบ file operations</div>
      
      <div id="fileContent" class="file-content" style="display: none;"></div>
    </div>

    <!-- Text Editor Section -->
    <div class="section">
      <h3>📝 Text Editor</h3>
      <p>เขียนข้อความและบันทึกเป็นไฟล์</p>
      
      <textarea id="textEditor" placeholder="เขียนข้อความที่นี่... จะสามารถบันทึกเป็นไฟล์ได้">
# Agent Report
วันที่: ${new Date().toLocaleDateString('th-TH')}

## สรุปข้อมูล Agents
- Agent ID: AG001
- ชื่อ: Alice Johnson  
- สถานะ: Available
- จำนวนสาย: 15 calls
- เวลาเฉลี่ย: 245 วินาที

## สถิติวันนี้
- Total Calls: 35
- Avg Wait Time: 45 วินาที
- Available Agents: 1 คน
- Busy Agents: 1 คน
      </textarea>
    </div>
  </div>

  <script>
    console.log('🎨 [RENDERER] Native APIs Demo โหลดแล้ว');

    // ตรวจสอบ API
    if (window.nativeAPI) {
      console.log('✅ [RENDERER] Native APIs พร้อมใช้งาน');
    } else {
      console.error('❌ [RENDERER] Native APIs ไม่พร้อม');
    }

    // ฟังก์ชันแสดงผลลัพธ์
    function showResult(elementId, message, type = 'info') {
      const element = document.getElementById(elementId);
      const timestamp = new Date().toLocaleTimeString('th-TH');
      
      element.innerHTML = `[${timestamp}] ${message}`;
      element.className = `result-box ${type}`;
    }

    // ฟังก์ชันเปิดไฟล์
    async function openFile() {
      try {
        console.log('📂 [RENDERER] เปิดไฟล์...');
        showResult('fileResult', 'กำลังเปิด file dialog...', 'loading');
        
        const result = await window.nativeAPI.openFile();
        
        if (result.success) {
          console.log('✅ [RENDERER] เปิดไฟล์สำเร็จ:', result.fileName);
          
          showResult('fileResult', 
            `✅ เปิดไฟล์สำเร็จ!\n\n` +
            `📄 ชื่อไฟล์: ${result.fileName}\n` +
            `📁 ที่อยู่: ${result.filePath}\n` +
            `📊 ขนาด: ${result.size} characters`, 
            'success'
          );
          
          // แสดงเนื้อหาไฟล์
          const contentDiv = document.getElementById('fileContent');
          contentDiv.style.display = 'block';
          contentDiv.innerHTML = `<strong>📄 เนื้อหาไฟล์ ${result.fileName}:</strong>\n\n${result.content}`;
          
          // ใส่เนื้อหาใน text editor
          document.getElementById('textEditor').value = result.content;
          
        } else if (result.cancelled) {
          showResult('fileResult', '⏹️ ยกเลิกการเปิดไฟล์', 'info');
        } else {
          throw new Error(result.error);
        }
        
      } catch (error) {
        console.error('❌ [RENDERER] Error:', error);
        showResult('fileResult', `❌ Error: ${error.message}`, 'error');
      }
    }

    // ฟังก์ชันส่งออกข้อมูล Agent
    async function exportAgentData() {
      try {
        console.log('📊 [RENDERER] ส่งออกข้อมูล Agent...');
        showResult('fileResult', 'กำลังสร้างรายงาน Agent...', 'loading');
        
        // สร้างข้อมูล CSV
        const agentData = [
          'Agent ID,Name,Status,Extension,Department,Total Calls,Avg Call Time',
          'AG001,Alice Johnson,Available,1001,Sales,15,245',
          'AG002,Bob Smith,Busy,1002,Support,8,312', 
          'AG003,Carol Lee,Break,1003,Sales,12,198'
        ].join('\n');
        
        const fileName = `agent-report-${new Date().toISOString().split('T')[0]}.csv`;
        
        const result = await window.nativeAPI.saveFile(agentData, fileName);
        
        if (result.success) {
          console.log('✅ [RENDERER] ส่งออกสำเร็จ:', result.fileName);
          
          showResult('fileResult',
            `📊 ส่งออกข้อมูล Agent สำเร็จ!\n\n` +
            `📄 ชื่อไฟล์: ${result.fileName}\n` +
            `📁 ตำแหน่ง: ${result.filePath}\n` +
            `📈 ข้อมูล: 3 agents ใน CSV format`,
            'success'
          );
          
        } else if (result.cancelled) {
          showResult('fileResult', '⏹️ ยกเลิกการส่งออก', 'info');
        } else {
          throw new Error(result.error);
        }
        
      } catch (error) {
        console.error('❌ [RENDERER] Error:', error);
        showResult('fileResult', `❌ Error: ${error.message}`, 'error');
      }
    }

    // ฟังก์ชันบันทึกเนื้อหาปัจจุบัน
    async function saveCurrentContent() {
      const content = document.getElementById('textEditor').value;
      
      if (!content.trim()) {
        showResult('fileResult', '❌ ไม่มีเนื้อหาให้บันทึก', 'error');
        return;
      }
      
      try {
        console.log('💾 [RENDERER] บันทึกเนื้อหา...');
        showResult('fileResult', 'กำลังบันทึกไฟล์...', 'loading');
        
        const fileName = `my-document-${Date.now()}.txt`;
        const result = await window.nativeAPI.saveFile(content, fileName);
        
        if (result.success) {
          console.log('✅ [RENDERER] บันทึกสำเร็จ:', result.fileName);
          
          showResult('fileResult',
            `💾 บันทึกเนื้อหาสำเร็จ!\n\n` +
            `📄 ชื่อไฟล์: ${result.fileName}\n` +
            `📁 ตำแหน่ง: ${result.filePath}\n` +
            `📊 ขนาด: ${content.length} characters`,
            'success'
          );
          
        } else if (result.cancelled) {
          showResult('fileResult', '⏹️ ยกเลิกการบันทึก', 'info');
        } else {
          throw new Error(result.error);
        }
        
      } catch (error) {
        console.error('❌ [RENDERER] Error:', error);
        showResult('fileResult', `❌ Error: ${error.message}`, 'error');
      }
    }

    // Event listeners
    window.addEventListener('DOMContentLoaded', () => {
      console.log('📄 [RENDERER] DOM พร้อมแล้ว');
      showResult('fileResult', '✅ Native APIs Demo พร้อมใช้งาน\n\nกดปุ่มเพื่อทดสอบ file operations', 'success');
    });
  </script>
</body>
</html>
```

---

## ▶️ Step 5: ทดสอบ File Operations

### **🚀 รัน Application**
```bash
npm start
```

### **🧪 ทดสอบการทำงาน:**

1. **📂 ทดสอบเปิดไฟล์:**
   - กดปุ่ม "เปิดไฟล์"
   - เลือกไฟล์ text หรือ JSON
   - ดูเนื้อหาที่แสดง

2. **📊 ทดสอบ Export:**
   - กดปุ่ม "Export Agent Data"
   - เลือกตำแหน่งบันทึก
   - เปิดไฟล์ CSV ที่สร้าง

3. **💾 ทดสอบบันทึก:**
   - แก้ไขข้อความใน text editor
   - กดปุ่ม "บันทึกเนื้อหา"
   - เลือกชื่อไฟล์และบันทึก

### **✅ ผลลัพธ์ที่ควรได้:**
- 📁 File dialogs ของ OS เปิดขึ้นมา
- 📄 เนื้อหาไฟล์แสดงใน app
- 💾 ไฟล์ถูกบันทึกในตำแหน่งที่เลือก
- 🔍 Console logs แสดงข้อมูลครบถ้วน

---

## 🔔 Step 6: เพิ่ม Notifications

### **🔧 เพิ่มใน main.js**
```javascript
// เพิ่มส่วนนี้ใน main.js

const { Notification } = require('electron');

// ===== NOTIFICATION APIS =====

// 🔔 สร้าง notification
ipcMain.handle('show-notification', (event, { title, body, urgent = false }) => {
  console.log('🔔 [MAIN] แสดง notification:', title);

    // Check the icon path for correctness
  const iconPath = path.join(__dirname, 'assets', 'notification.png');
  console.log('Notification icon path:', iconPath);

  try {
    const notification = new Notification({
      title: title,
      body: body,
      icon: path.join(__dirname, 'assets', 'notification.png'), // ถ้ามี
      urgency: urgent ? 'critical' : 'normal',
      timeoutType: urgent ? 'never' : 'default'
    });
    
    notification.show();
    
    // เมื่อคลิก notification
    notification.on('click', () => {
      console.log('🔔 [MAIN] คลิก notification');
      mainWindow.show();
      mainWindow.focus();
    });
    
    console.log('✅ [MAIN] แสดง notification สำเร็จ');
    return { success: true };
    
  } catch (error) {
    console.error('❌ [MAIN] Error notification:', error);
    return { success: false, error: error.message };
  }
});

// 📢 Notification สำหรับ Agent Events
ipcMain.handle('notify-agent-event', (event, { agentName, eventType, details }) => {
  console.log('📢 [MAIN] Agent event notification:', agentName, eventType);
  
  const eventMessages = {
    'login': `🟢 ${agentName} เข้าสู่ระบบแล้ว`,
    'logout': `🔴 ${agentName} ออกจากระบบแล้ว`,
    'status_change': `🔄 ${agentName} เปลี่ยนสถานะเป็น ${details.newStatus}`,
    'call_received': `📞 ${agentName} รับสายใหม่`,
    'call_ended': `📞 ${agentName} จบการโทร (${details.duration} วินาที)`
  };
  
  const notification = new Notification({
    title: 'Agent Wallboard Update',
    body: eventMessages[eventType] || `📊 ${agentName}: ${eventType}`,
    icon: path.join(__dirname, 'assets', 'notification.png')
  });
  
  notification.show();
  
  notification.on('click', () => {
    mainWindow.show();
    mainWindow.focus();
  });
  
  return { success: true };
});
```

### **🌉 เพิ่มใน preload.js**
```javascript
// เพิ่มส่วนนี้ใน preload.js

contextBridge.exposeInMainWorld('nativeAPI', {
  // File Operations (เดิม)
  openFile: () => ipcRenderer.invoke('open-file'),
  saveFile: (content, fileName) => ipcRenderer.invoke('save-file', { content, fileName }),
  
  // 🔔 Notifications
  showNotification: (title, body, urgent = false) => {
    console.log('🔔 [PRELOAD] แสดง notification:', title);
    return ipcRenderer.invoke('show-notification', { title, body, urgent });
  },
  
  notifyAgentEvent: (agentName, eventType, details = {}) => {
    console.log('📢 [PRELOAD] Agent event:', agentName, eventType);
    return ipcRenderer.invoke('notify-agent-event', { agentName, eventType, details });
  }
});
```

### **🎨 เพิ่ม UI สำหรับ Notifications**
```html
<!-- เพิ่มส่วนนี้ใน index.html หลัง File Operations Section -->

<!-- Notifications Section -->
<div class="section">
  <h3>🔔 Desktop Notifications</h3>
  <p>แจ้งเตือนแบบ Operating System</p>
  
  <button class="button" onclick="testBasicNotification()">🔔 ทดสอบ Notification</button>
  <button class="button" onclick="testAgentLogin()">🟢 Agent Login</button>
  <button class="button" onclick="testCallReceived()">📞 Call Received</button>
  <button class="button" onclick="testUrgentAlert()">🚨 Urgent Alert</button>
  
  <div class="result-box" id="notificationResult">กดปุ่มเพื่อทดสอบ notifications</div>
</div>
```

### **📜 เพิ่ม JavaScript Functions**
```javascript
// เพิ่มส่วนนี้ใน <script> ของ index.html

// ทดสอบ notification พื้นฐาน
async function testBasicNotification() {
  try {
    console.log('🔔 [RENDERER] ทดสอบ notification...');
    showResult('notificationResult', 'กำลังแสดง notification...', 'loading');
    
    const result = await window.nativeAPI.showNotification(
      'Agent Wallboard',
      'นี่คือ desktop notification ทดสอบ! 🎉'
    );
    
    if (result.success) {
      showResult('notificationResult', '✅ แสดง notification สำเร็จ\n\nดู notification ที่มุมจอของคุณ', 'success');
    } else {
      throw new Error(result.error);
    }

  } catch (error) {
    console.error('❌ [RENDERER] Error:', error);
    showResult('notificationResult', `❌ Error: ${error.message}`, 'error');
  }
}

// ทดสอบ Agent Login notification
async function testAgentLogin() {
  try {
    console.log('🟢 [RENDERER] Agent login notification...');
    showResult('notificationResult', 'แจ้งเตือน Agent เข้าสู่ระบบ...', 'loading');
    
    const result = await window.nativeAPI.notifyAgentEvent(
      'Alice Johnson',
      'login',
      { time: new Date().toLocaleTimeString('th-TH') }
    );
    
    if (result.success) {
      showResult('notificationResult', '🟢 แจ้งเตือน Agent Login สำเร็จ\n\nAgent Alice Johnson เข้าสู่ระบบแล้ว', 'success');
    } else {
      throw new Error(result.error);
    }
    
  } catch (error) {
    console.error('❌ [RENDERER] Error:', error);
    showResult('notificationResult', `❌ Error: ${error.message}`, 'error');
  }
}

// ทดสอบ Call Received notification
async function testCallReceived() {
  try {
    console.log('📞 [RENDERER] Call received notification...');
    showResult('notificationResult', 'แจ้งเตือนสายเข้า...', 'loading');
    
    const result = await window.nativeAPI.notifyAgentEvent(
      'Bob Smith',
      'call_received',
      { 
        callerNumber: '02-123-4567',
        queue: 'Support Queue'
      }
    );
    
    if (result.success) {
      showResult('notificationResult', '📞 แจ้งเตือนสายเข้าสำเร็จ\n\nAgent Bob Smith มีสายเข้าใหม่', 'success');
    }
    
  } catch (error) {
    console.error('❌ [RENDERER] Error:', error);
    showResult('notificationResult', `❌ Error: ${error.message}`, 'error');
  }
}

// ทดสอบ Urgent Alert
async function testUrgentAlert() {
  try {
    console.log('🚨 [RENDERER] Urgent alert...');
    showResult('notificationResult', 'แจ้งเตือนด่วน...', 'loading');
    
    const result = await window.nativeAPI.showNotification(
      '🚨 แจ้งเตือนด่วน!',
      'ระบบโทรศัพท์มีปัญหา กรุณาตรวจสอบด่วน!',
      true // urgent = true
    );
    
    if (result.success) {
      showResult('notificationResult', '🚨 แจ้งเตือนด่วนสำเร็จ\n\nนี่คือ notification แบบ urgent', 'success');
    }
    
  } catch (error) {
    console.error('❌ [RENDERER] Error:', error);
    showResult('notificationResult', `❌ Error: ${error.message}`, 'error');
  }
}
```

---

## 🖱️ Step 7: เพิ่ม System Tray

### **🔧 เพิ่ม System Tray ใน main.js**
```javascript
// เพิ่มส่วนนี้ใน main.js

const { Menu, Tray, nativeImage } = require('electron');

let tray = null;

// ฟังก์ชันสร้าง System Tray
function createTray() {
  console.log('🖱️ [MAIN] สร้าง system tray...');
  
  try {

    // สร้าง icon (ใช้ built-in icon ถ้าไม่มีไฟล์)
    let trayIcon;
    try {
        trayIcon = nativeImage.createFromPath(path.join(__dirname, 'assets', 'icon.png'));
        if (trayIcon.isEmpty()) throw new Error('Icon file not found');
    } catch {
        // ใช้ built-in icon ถ้าไม่มีไฟล์
        trayIcon = nativeImage.createEmpty();
    }

    // สำหรับ macOS
    if (process.platform === 'darwin') {
        trayIcon = trayIcon.resize({ width: 16, height: 16 });
        trayIcon.setTemplateImage(true); // monochrome บน macOS
    }

    /*
      1. process.platform === 'darwin'
      ใช้ตรวจว่ากำลังรันบน macOS (darwin = ชื่อ kernel ของ macOS)
      ถ้าเป็น Windows/Linux จะไม่เข้ามาโค้ดนี้

      2. trayIcon.resize({ width: 16, height: 16 })
      บน macOS menubar tray icon ควรเป็นขนาดเล็ก (16×16 px หรือ 22×22 px)
      ถ้าใช้ icon PNG 256×256 โดยตรง → จะใหญ่เกินและเบลอ
      เลยต้อง resize ลงมาให้พอดีกับ menubar

      3. trayIcon.setTemplateImage(true)
      บอก Electron ว่า icon นี้เป็น “Template Image” ของ macOS
      macOS จะ:
      แสดงเป็น monochrome (ขาว/ดำ) อัตโนมัติ
      ปรับสี icon ตาม theme (Light / Dark Mode)
      ทำให้ดู native เหมือน app อื่น ๆ
      ถ้าไม่ใส่ → icon จะโชว์เป็นรูปสีเต็ม ๆ ซึ่งดู “ไม่เข้ากับ macOS”
    */
    
    tray = new Tray(trayIcon);
    
    // สร้าง context menu
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '📊 แสดง Wallboard',
        click: () => {
          console.log('📊 [TRAY] แสดง wallboard');
          mainWindow.show();
          mainWindow.focus();
        }
      },
      {
        label: '🔄 เปลี่ยนสถานะ',
        submenu: [
          {
            label: '🟢 Available',
            click: () => changeAgentStatusFromTray('Available')
          },
          {
            label: '🔴 Busy', 
            click: () => changeAgentStatusFromTray('Busy')
          },
          {
            label: '🟡 Break',
            click: () => changeAgentStatusFromTray('Break')
          }
        ]
      },
      { type: 'separator' },
      {
        label: '⚙️ ตั้งค่า',
        click: () => {
          console.log('⚙️ [TRAY] เปิดตั้งค่า');
          // เปิดหน้าตั้งค่า (ในอนาคต)
        }
      },
      {
        label: '❌ ออกจากโปรแกรม',
        click: () => {
          console.log('❌ [TRAY] ออกจากโปรแกรม');
          app.quit();
        }
      }
    ]);
    
    // ตั้งค่า tray
    tray.setContextMenu(contextMenu);
    tray.setToolTip('Agent Wallboard - Desktop App');
    
    // เมื่อคลิก tray icon
    tray.on('click', () => {
      console.log('🖱️ [TRAY] คลิก tray icon');
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    });
    
    console.log('✅ [MAIN] System tray พร้อมแล้ว');
    
  } catch (error) {
    console.error('❌ [MAIN] Error สร้าง tray:', error);
  }
}

// ฟังก์ชันเปลี่ยนสถานะจาก tray
function changeAgentStatusFromTray(status) {
  console.log('🔄 [TRAY] เปลี่ยนสถานะเป็น:', status);
  
  // ส่งข้อความไปยัง renderer
  mainWindow.webContents.send('status-changed-from-tray', {
    newStatus: status,
    timestamp: new Date().toISOString()
  });
  
  // แสดง notification
  new Notification({
    title: 'สถานะเปลี่ยนแล้ว',
    body: `เปลี่ยนสถานะเป็น ${status} แล้ว`,
    icon: path.join(__dirname, 'assets', 'notification.png')
  }).show();
}

// เรียกใช้ใน createWindow()
function createWindow() {
  // ... code เดิม ...
  
  // เพิ่มการสร้าง tray
  createTray();
  
  // ซ่อน window แทนการปิดเมื่อกด X
  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
      
      // แสดง notification แจ้งว่า app ยังทำงานอยู่
      new Notification({
        title: 'Agent Wallboard',
        body: 'แอปยังทำงานอยู่ใน system tray\nคลิกขวาที่ icon เพื่อเปิดเมนู'
      }).show();
    }
  });
}

// IPC Events ซ่อนไป Tray ---
ipcMain.on('hide-to-tray', () => {
  if (mainWindow) {
    mainWindow.hide();
    if (process.platform === 'win32') {
      new Notification({
        title: 'Agent Wallboard',
        body: 'App is still running in the system tray'
      }).show();
    }
  }
});

// IPC Events แสดงเมื่อกดที่ Tray ---
ipcMain.on('show-app', () => {
  if (mainWindow) {
    mainWindow.show();
    mainWindow.focus();
  }
});

// ... code เดิม ...

// ป้องกันการปิด app เมื่อปิด window สุดท้าย
app.on('window-all-closed', () => {
  // ไม่ quit เพื่อให้ app ทำงานใน tray ต่อไป
  // app จะปิดเมื่อเลือก "ออกจากโปรแกรม" จาก tray menu
});

// เมื่อจะปิด app จริงๆ
app.on('before-quit', () => {
  app.isQuiting = true;
});
```

### **🌉 เพิ่มใน preload.js**
```javascript
// เพิ่มส่วนนี้ใน preload.js

contextBridge.exposeInMainWorld('nativeAPI', {
  // APIs เดิม...
  
  // 🖱️ System Tray Events
  onStatusChangedFromTray: (callback) => {
    console.log('🖱️ [PRELOAD] ลงทะเบียน tray status listener');
    ipcRenderer.on('status-changed-from-tray', (event, data) => callback(data));
  },
  hideToTray: () => ipcRenderer.send('hide-to-tray'),
  showApp: () => ipcRenderer.send('show-app')
});
```

### **🎨 เพิ่ม UI สำหรับ System Tray**
```html
<!-- เพิ่มส่วนนี้ใน index.html -->

<!-- System Tray Section -->
<div class="section">
  <h3>🖱️ System Tray Integration</h3>
  <p>ควบคุม app ผ่าน system tray (ถาดระบบ)</p>
  
  <button class="button" onclick="testHideToTray()">👁️ ซ่อนไป Tray</button>
  <button class="button" onclick="testTrayNotification()">🔔 แจ้งเตือนจาก Tray</button>
  
  <div class="result-box" id="trayResult">
ℹ️ System Tray Features:
• คลิกขวาที่ icon ใน taskbar เพื่อเปิดเมนู
• เปลี่ยนสถานะ agent ได้จาก tray menu
• ซ่อน/แสดง app ได้จาก tray
• ปิดโปรแกรมได้จาก tray menu

💡 ลองปิด window นี้ - แอปจะซ่อนไปใน system tray!
  </div>
</div>
```

### **📜 เพิ่ม JavaScript Functions**
```javascript
// เพิ่มส่วนนี้ใน <script> ของ index.html

// ทดสอบซ่อนไป tray
function testHideToTray() {
  try {
    console.log('👁️ [RENDERER] ซ่อนไป tray...');
    showResult('trayResult', '👁️ กำลังซ่อนไป system tray...', 'loading');
    
    setTimeout(() => { // หน่วงเวลา 1 sec.
      // รับ event ซ่อน system tray
      window.nativeAPI.hideToTray();
    }, 1000);
    
  } catch (error) {
    console.error('❌ [RENDERER] Error:', error);
    showResult('trayResult', `❌ Error: ${error.message}`, 'error');
  }
}

// แสดง tray
function testShowApp() {
  console.log('👁️ [RENDERER] แสดงจาก tray...');
  
    setTimeout(() => { // หน่วงเวลา 1 sec.
      // รับ event แสดง system tray
      window.nativeAPI.showApp();
    }, 1000);
}

// ทดสอบ notification จาก tray action
function testTrayNotification() {
  try {
    console.log('🔔 [RENDERER] ทดสอบ notification จาก tray...');
    showResult('trayResult', 
      '✅ ทดสอบ System Tray สำเร็จ!\n\n' +
      '🖱️ คลิกขวาที่ icon ใน taskbar/menubar\n' +
      '📋 ลองเลือกเมนูต่างๆ\n' +
      '🔄 ทดสอบเปลี่ยนสถานะจาก tray menu',
      'success'
    );
    
  } catch (error) {
    console.error('❌ [RENDERER] Error:', error);
    showResult('trayResult', `❌ Error: ${error.message}`, 'error');
  }
}

// รับ event เมื่อเปลี่ยนสถานะจาก tray
window.nativeAPI.onStatusChangedFromTray((data) => {
  console.log('🔄 [RENDERER] ได้รับ status change จาก tray:', data);
  
  showResult('trayResult',
    `🔄 เปลี่ยนสถานะจาก System Tray!\n\n` +
    `📊 สถานะใหม่: ${data.newStatus}\n` +
    `⏰ เวลา: ${new Date(data.timestamp).toLocaleString('th-TH')}\n\n` +
    `✅ นี่คือ communication จาก Main → Renderer`,
    'success'
  );
});
```

---

## ▶️ Step 8: ทดสอบ Native APIs แบบรวม

### **🚀 รัน Application**
```bash
npm start
```

### **🧪 ทดสอบทุก Features:**

1. **📁 File Operations:**
   - เปิดไฟล์และดูเนื้อหา
   - Export CSV ของ agent data
   - บันทึกข้อความจาก text editor

2. **🔔 Desktop Notifications:**
   - ทดสอบ notification พื้นฐาน
   - ทดสอบ agent login notification
   - ทดสอบ urgent alert

3. **🖱️ System Tray:**
   - ดู tray icon ใน taskbar/menubar
   - คลิกขวาเพื่อเปิดเมนู
   - ทดสอบเปลี่ยนสถานะจาก tray
   - ปิด window และเปิดจาก tray

### **✅ ผลลัพธ์ที่ควรได้:**
- 📁 File dialogs ทำงานถูกต้อง
- 🔔 Notifications แสดงที่มุมจอ
- 🖱️ Tray icon ปรากฏใน system tray
- 🔄 App ซ่อน/แสดงจาก tray ได้
- 📊 All features เชื่อมต่อกันได้

---

## 🎯 Assignment: สร้าง Agent Dashboard แบบสมบูรณ์

### **📝 งานที่ต้องทำ:**

1. **📊 Agent Status Dashboard:**
   - แสดงรายชื่อ agents แบบ real-time
   - เปลี่ยนสถานะได้จากหน้า UI
   - Export รายงานเป็น CSV

2. **🔔 Smart Notifications:**
   - แจ้งเตือนเมื่อ agent เปลี่ยนสถานะ
   - แจ้งเตือนเมื่อมีสายเข้า
   - เสียงแจ้งเตือน (ถ้าทำได้)

3. **🖱️ System Tray Integration:**
   - Quick status change จาก tray
   - แสดงจำนวน available agents ใน tooltip
   - Context menu ที่ครบฟีเจอร์

### **💯 Bonus Features:**
- ⌨️ Keyboard shortcuts (Ctrl+1, Ctrl+2, etc.)
- 📈 Charts แสดงสถิติ
- 🕒 Auto-refresh ทุก 30 วินาที
- 💾 Save/Load settings

---

## 🎉 สรุป Lab 8.3

### **🏆 สิ่งที่เรียนรู้แล้ว:**
- ✅ **File Operations:** เปิด/บันทึกไฟล์ด้วย OS dialogs
- ✅ **Desktop Notifications:** แจ้งเตือนแบบ native OS
- ✅ **System Tray:** ควบคุม app จากถาดระบบ
- ✅ **Integration:** รวม features ทั้งหมดเป็น app เดียว
- ✅ **Real-world Application:** ประยุกต์สำหรับ agent wallboard

### **🔑 Key Concepts:**
1. **Native APIs:** เข้าถึงฟีเจอร์ของ OS
2. **User Experience:** ทำงานเหมือน desktop app จริงๆ
3. **Background Operations:** app ทำงานได้แม้ไม่แสดง window
4. **System Integration:** ผสานกับ OS อย่างสมบูรณ์

### **🚀 พร้อมสำหรับ Lab ต่อไป:**
- Lab 8.4: Real-time Communication และ WebSocket
- Lab 8.5: Building และ Distribution
- Final Project: Complete Agent Wallboard System

---

**🎊 ยินดีด้วย! ตอนนี้ app ของคุณเป็น Desktop App จริงๆ แล้ว!**

*คุณได้เรียนรู้การใช้ Native APIs ที่เป็นจุดแข็งของ Electron และทำให้ app ต่างจาก web application ทั่วไป* 🖥️✨