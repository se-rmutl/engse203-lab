# 🔄 Lab 8.2: IPC Communication
## การสื่อสารระหว่าง Main Process และ Renderer Process

### 🎓 สำหรับนักศึกษาวิศวกรรมซอฟต์แวร์ ปีที่ 2
#### เวลาในการทำ: 1 สัปดาห์

---

## 🎯 วัตถุประสงค์ของ Lab 8.2

### **Learning Objectives**
เมื่อเสร็จสิ้น Lab 8.2 นี้ นักศึกษาจะสามารถ:
- 🔄 เข้าใจ IPC (Inter-Process Communication) ใน Electron
- 🛡️ สร้าง preload.js เพื่อความปลอดภัย
- 📤 ส่งข้อมูลจาก Renderer ไป Main Process
- 📥 รับข้อมูลกลับจาก Main Process
- 🔧 สร้าง API functions สำหรับ desktop app
- 📊 ประยุกต์ใช้สำหรับ agent wallboard system

### **ทำไมต้องเรียน IPC?**
💡 **สำหรับ Agent Wallboard App:**
- 🔐 Login system (ส่ง credentials ไป validate)
- 📊 Real-time status updates (รับข้อมูล agent status)
- 💬 Message notifications (แสดง popup แจ้งเตือน)
- 📈 Dashboard data (โหลดข้อมูลสถิติ)

---

## 📚 ทำความเข้าใจ IPC

### **🤔 IPC คืออะไร?**
**IPC (Inter-Process Communication)** = การสื่อสารระหว่าง processes

```
Main Process (Backend)          Renderer Process (Frontend)
├── ควบคุม system                ├── แสดง UI
├── เข้าถึง file system          ├── รับ user input  
├── จัดการ database              ├── แสดงผลข้อมูล
└── Handle business logic        └── User interactions

        ↕️ IPC Communication ↕️
    ipcMain.handle()  ←→  ipcRenderer.invoke()
```

### **🔐 ปัญหา Security**
❌ **อันตราย:** ให้ Renderer เข้าถึง Node.js APIs โดยตรง
```javascript
// อันตราย! อย่าทำ
webPreferences: {
  nodeIntegration: true  // ❌ เสี่ยงต่อการโจมตี
}
```

✅ **ปลอดภัย:** ใช้ preload.js เป็นตัวกลาง
```javascript
// ปลอดภัย ✅
webPreferences: {
  nodeIntegration: false,
  contextIsolation: true,
  preload: path.join(__dirname, 'preload.js')
}
```

---

## 🚀 Step 1: Project Setup

### **📂 สร้าง Project Structure**
```
lab8-2-ipc/
├── main.js          (Main Process)
├── preload.js       (Security Bridge)  
├── index.html       (UI)
├── package.json
└── agent-data.json  (จำลองข้อมูล agents)
```

### **📝 package.json**
```json
{
  "name": "lab8-2-ipc",
  "version": "1.0.0",
  "description": "Learning IPC Communication for Agent Wallboard",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "devDependencies": {
    "electron": "^27.0.0"
  }
}
```

### **📊 สร้างไฟล์ข้อมูลจำลอง agent-data.json**
```json
{
  "agents": [
    {
      "id": "AG001",
      "name": "Alice Johnson",
      "status": "Available",
      "extension": "1001",
      "department": "Sales",
      "loginTime": "2024-01-15T08:00:00Z",
      "totalCalls": 15,
      "avgCallTime": 245
    },
    {
      "id": "AG002", 
      "name": "Bob Smith",
      "status": "Busy",
      "extension": "1002",
      "department": "Support",
      "loginTime": "2024-01-15T08:30:00Z",
      "totalCalls": 8,
      "avgCallTime": 312
    },
    {
      "id": "AG003",
      "name": "Carol Lee",
      "status": "Break",
      "extension": "1003", 
      "department": "Sales",
      "loginTime": "2024-01-15T09:00:00Z",
      "totalCalls": 12,
      "avgCallTime": 198
    }
  ],
  "statistics": {
    "totalAgents": 3,
    "availableAgents": 1,
    "busyAgents": 1,
    "onBreakAgents": 1,
    "totalCallsToday": 35,
    "avgWaitTime": 45
  }
}
```

---

## 🖥️ Step 2: Main Process พื้นฐาน

### **📄 main.js - เริ่มต้นง่ายๆ**
```javascript
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;

function createWindow() {
  console.log('🖥️ [MAIN] กำลังสร้าง window...');
  
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: false,      // ✅ ปิดเพื่อความปลอดภัย
      contextIsolation: true,      // ✅ เปิดเพื่อความปลอดภัย  
      preload: path.join(__dirname, 'preload.js')  // ✅ ใช้ preload
    }
  });

  mainWindow.loadFile('index.html');
  
  // เปิด DevTools เพื่อดู console
  mainWindow.webContents.openDevTools();
  
  console.log('✅ [MAIN] สร้าง window สำเร็จ');
}

app.whenReady().then(() => {
  console.log('⚡ [MAIN] Electron พร้อมทำงาน');
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
```

---

## 🌉 Step 3: สร้าง preload.js (Security Bridge)

### **🔐 preload.js - ตัวกลางที่ปลอดภัย**
```javascript
const { contextBridge, ipcRenderer } = require('electron');

console.log('🌉 [PRELOAD] กำลังตั้งค่า security bridge...');

// ✅ เปิดเผย APIs ที่ปลอดภัยให้ Renderer ใช้
contextBridge.exposeInMainWorld('electronAPI', {
  // 📤 ส่งข้อความไป Main Process
  sendMessage: (message) => {
    console.log('📤 [PRELOAD] ส่งข้อความ:', message);
    return ipcRenderer.invoke('send-message', message);
  },
  
  // 👋 Hello function ทดสอบ
  sayHello: (name) => {
    console.log('👋 [PRELOAD] ส่งคำทักทาย:', name);
    return ipcRenderer.invoke('say-hello', name);
  }
});

console.log('✅ [PRELOAD] Security bridge พร้อมแล้ว');
```

### **🔑 จุดสำคัญ:**
- `contextBridge.exposeInMainWorld()` = เปิดเผย functions ให้ Renderer ใช้
- `ipcRenderer.invoke()` = ส่งข้อความไป Main Process แบบ async
- ✅ ปลอดภัย: Renderer ไม่สามารถเข้าถึง Node.js APIs โดยตรง

---

## 📤 Step 4: เพิ่ม IPC Handlers ใน Main Process

### **🔧 เพิ่ม handlers ใน main.js**
```javascript
// เพิ่มส่วนนี้ใน main.js หลังจาก createWindow()

// ===== IPC HANDLERS =====

// 📨 Handler สำหรับรับข้อความ
ipcMain.handle('send-message', (event, message) => {
  console.log('📨 [MAIN] ได้รับข้อความ:', message);
  
  // ประมวลผลข้อความ
  const response = {
    original: message,
    reply: `Server ได้รับ: "${message}"`,
    timestamp: new Date().toISOString(),
    status: 'success'
  };
  
  console.log('📤 [MAIN] ส่งกลับ:', response);
  return response;
});

// 👋 Handler สำหรับคำทักทาย
ipcMain.handle('say-hello', (event, name) => {
  console.log('👋 [MAIN] ทักทายกับ:', name);
  
  const greetings = [
    `สวัสดี ${name}! ยินดีต้อนรับสู่ Agent Wallboard`,
    `หวัดดี ${name}! วันนี้พร้อมทำงานแล้วหรือยัง?`,
    `Hello ${name}! มีความสุขในการทำงานนะ`,
  ];
  
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  
  return {
    greeting: randomGreeting,
    name: name,
    time: new Date().toLocaleString('th-TH'),
    agentCount: 3  // จำลองจำนวน agents ที่ online
  };
});

console.log('🔧 [MAIN] IPC Handlers ตั้งค่าเสร็จแล้ว');
```

---

## 🎨 Step 5: สร้าง UI และทดสอบ IPC

### **📄 index.html - UI พื้นฐาน**
```html
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lab 8.2 - IPC Communication Demo</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
    
    .demo-section {
      background: rgba(255, 255, 255, 0.1);
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    
    .input-group {
      margin: 15px 0;
    }
    
    .input-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    
    .input-group input {
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      box-sizing: border-box;
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
      color: #667eea;
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
    
    .loading {
      color: #ffd700;
      font-style: italic;
    }
    
    .success {
      color: #90ee90;
    }
    
    .error {
      color: #ff6b6b;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔄 IPC Communication Demo</h1>
      <p>การสื่อสารระหว่าง Main Process และ Renderer Process</p>
    </div>

    <!-- Demo 1: ส่งข้อความพื้นฐาน -->
    <div class="demo-section">
      <h3>📤 Demo 1: ส่งข้อความไป Main Process</h3>
      <p>ทดสอบการส่งข้อความและรับ response กลับมา</p>
      
      <div class="input-group">
        <label>ข้อความที่ต้องการส่ง:</label>
        <input type="text" id="messageInput" placeholder="พิมพ์ข้อความที่นี่..." value="Hello from Renderer Process!">
      </div>
      
      <button class="button" onclick="sendMessage()">📤 ส่งข้อความ</button>
      <button class="button" onclick="clearResult('messageResult')">🧹 เคลียร์</button>
      
      <div class="result-box" id="messageResult">กดปุ่ม "ส่งข้อความ" เพื่อทดสอบ IPC</div>
    </div>

    <!-- Demo 2: ระบบทักทาย -->
    <div class="demo-section">
      <h3>👋 Demo 2: ระบบทักทาย Agent</h3>
      <p>จำลองการ login และทักทายเหมือนใน agent wallboard</p>
      
      <div class="input-group">
        <label>ชื่อ Agent:</label>
        <input type="text" id="agentName" placeholder="ใส่ชื่อของคุณ..." value="Agent001">
      </div>
      
      <button class="button" onclick="sayHello()">👋 เข้าสู่ระบบ</button>
      <button class="button" onclick="clearResult('helloResult')">🧹 เคลียร์</button>
      
      <div class="result-box" id="helloResult">กดปุ่ม "เข้าสู่ระบบ" เพื่อทดสอบระบบทักทาย</div>
    </div>

    <!-- ข้อมูล Process -->
    <div class="demo-section">
      <h3>📊 Process Information</h3>
      <div class="result-box">
🖥️ <strong>Main Process:</strong> ทำงานใน Node.js environment, จัดการ business logic
🎨 <strong>Renderer Process:</strong> ทำงานใน Chromium environment, แสดง UI
🌉 <strong>Preload Script:</strong> ตัวกลางที่ปลอดภัยสำหรับ IPC communication

<strong>🔄 การทำงาน:</strong>
1. Renderer เรียก window.electronAPI.sendMessage()
2. Preload ส่งต่อไป Main ด้วย ipcRenderer.invoke()
3. Main ประมวลผลด้วย ipcMain.handle()
4. Main ส่ง response กลับ
5. Renderer ได้รับผลลัพธ์
      </div>
    </div>
  </div>

  <script>
    console.log('🎨 [RENDERER] กำลังโหลด...');

    // ตรวจสอบว่า electronAPI พร้อมใช้งาน
    if (window.electronAPI) {
      console.log('✅ [RENDERER] electronAPI พร้อมใช้งาน');
    } else {
      console.error('❌ [RENDERER] electronAPI ไม่พร้อมใช้งาน');
    }

    // ฟังก์ชันแสดงผลลัพธ์
    function displayResult(elementId, data, type = 'info') {
      const element = document.getElementById(elementId);
      const timestamp = new Date().toLocaleTimeString('th-TH');
      
      let content;
      if (typeof data === 'object') {
        content = JSON.stringify(data, null, 2);
      } else {
        content = data.toString();
      }
      
      element.innerHTML = `[${timestamp}] ${content}`;
      element.className = `result-box ${type}`;
    }

    // ฟังก์ชันส่งข้อความ
    async function sendMessage() {
      const message = document.getElementById('messageInput').value;
      
      if (!message.trim()) {
        displayResult('messageResult', 'กรุณาใส่ข้อความ', 'error');
        return;
      }

      try {
        console.log('📤 [RENDERER] กำลังส่งข้อความ:', message);
        displayResult('messageResult', 'กำลังส่งข้อความ...', 'loading');
        
        // ส่งข้อความไป Main Process
        const response = await window.electronAPI.sendMessage(message);
        
        console.log('📥 [RENDERER] ได้รับ response:', response);
        displayResult('messageResult', response, 'success');
        
      } catch (error) {
        console.error('❌ [RENDERER] Error:', error);
        displayResult('messageResult', `Error: ${error.message}`, 'error');
      }
    }

    // ฟังก์ชันทักทาย
    async function sayHello() {
      const name = document.getElementById('agentName').value;
      
      if (!name.trim()) {
        displayResult('helloResult', 'กรุณาใส่ชื่อ Agent', 'error');
        return;
      }

      try {
        console.log('👋 [RENDERER] กำลังทักทาย:', name);
        displayResult('helloResult', 'กำลังเข้าสู่ระบบ...', 'loading');
        
        // ส่งคำทักทายไป Main Process
        const response = await window.electronAPI.sayHello(name);
        
        console.log('📥 [RENDERER] ได้รับการทักทาย:', response);
        
        // แสดงผลลัพธ์แบบสวยงาม
        const resultText = `
🎉 เข้าสู่ระบบสำเร็จ!

👤 Agent: ${response.name}
💬 ข้อความ: ${response.greeting}
⏰ เวลา: ${response.time}
👥 Agents ออนไลน์: ${response.agentCount} คน

✅ พร้อมทำงานแล้ว!`;

        displayResult('helloResult', resultText, 'success');
        
      } catch (error) {
        console.error('❌ [RENDERER] Error:', error);
        displayResult('helloResult', `Error: ${error.message}`, 'error');
      }
    }

    // ฟังก์ชันเคลียร์ผลลัพธ์
    function clearResult(elementId) {
      const element = document.getElementById(elementId);
      element.innerHTML = 'เคลียร์แล้ว...';
      element.className = 'result-box';
    }

    // Event Listeners
    document.getElementById('messageInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });

    document.getElementById('agentName').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sayHello();
      }
    });

    // เมื่อ page โหลดเสร็จ
    window.addEventListener('DOMContentLoaded', () => {
      console.log('📄 [RENDERER] HTML โหลดเสร็จ');
    });

    window.addEventListener('load', () => {
      console.log('✅ [RENDERER] ทุกอย่างพร้อมแล้ว');
    });
  </script>
</body>
</html>
```

---

## ▶️ Step 6: ทดสอบ IPC Communication

### **🚀 รัน Application**
```bash
npm start
```

### **🧪 ทดสอบการทำงาน:**

1. **📤 ทดสอบการส่งข้อความ:**
   - พิมพ์ข้อความใน input box
   - กดปุ่ม "ส่งข้อความ"
   - ดูผลลัพธ์ที่ได้รับกลับ

2. **👋 ทดสอบระบบทักทาย:**
   - ใส่ชื่อ Agent
   - กดปุ่ม "เข้าสู่ระบบ"
   - ดูข้อความต้อนรับ

3. **🔍 ตรวจสอบ Console:**
   - เปิด DevTools (F12)
   - ดู console logs จาก Renderer Process
   - ดู terminal logs จาก Main Process

### **✅ สิ่งที่ควรเห็น:**
- 🖥️ Main Process logs ใน terminal
- 🎨 Renderer Process logs ใน browser console
- 📤 ข้อมูลถูกส่งไปกลับระหว่าง processes
- 🔄 Response กลับมาเป็น JSON object

---

## 🔧 Step 7: เพิ่ม Agent Functions

### **📊 เพิ่ม handlers สำหรับ agent data ใน main.js**
```javascript
// เพิ่มส่วนนี้ใน main.js

// 📊 Handler สำหรับโหลดข้อมูล agents
ipcMain.handle('get-agents', async () => {
  console.log('📊 [MAIN] กำลังโหลดข้อมูล agents...');
  
  try {
    // อ่านไฟล์ข้อมูล agents
    const data = await fs.readFile('agent-data.json', 'utf8');
    const agentData = JSON.parse(data);
    
    console.log('✅ [MAIN] โหลดข้อมูล agents สำเร็จ');
    return {
      success: true,
      data: agentData,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ [MAIN] Error โหลดข้อมูล:', error);
    return {
      success: false,
      error: error.message
    };
  }
});

// 🔄 Handler สำหรับเปลี่ยนสถานะ agent
ipcMain.handle('change-agent-status', async (event, { agentId, newStatus }) => {
  console.log(`🔄 [MAIN] เปลี่ยนสถานะ agent ${agentId} เป็น ${newStatus}`);
  
  try {
    // อ่านข้อมูลปัจจุบัน
    const data = await fs.readFile('agent-data.json', 'utf8');
    const agentData = JSON.parse(data);
    
    // หา agent และเปลี่ยนสถานะ
    const agent = agentData.agents.find(a => a.id === agentId);
    if (agent) {
      agent.status = newStatus;
      agent.lastStatusChange = new Date().toISOString();
      
      // บันทึกกลับไปยังไฟล์
      await fs.writeFile('agent-data.json', JSON.stringify(agentData, null, 2));
      
      console.log(`✅ [MAIN] เปลี่ยนสถานะ ${agentId} สำเร็จ`);
      return {
        success: true,
        agent: agent,
        message: `เปลี่ยนสถานะเป็น ${newStatus} แล้ว`
      };
    } else {
      throw new Error(`ไม่พบ agent ID: ${agentId}`);
    }
    
  } catch (error) {
    console.error('❌ [MAIN] Error เปลี่ยนสถานะ:', error);
    return {
      success: false,
      error: error.message
    };
  }
});
```

### **🌉 เพิ่ม functions ใน preload.js**
```javascript
// เพิ่มส่วนนี้ใน preload.js

contextBridge.exposeInMainWorld('electronAPI', {
  // ฟังก์ชันเดิม
  sendMessage: (message) => {
    console.log('📤 [PRELOAD] ส่งข้อความ:', message);
    return ipcRenderer.invoke('send-message', message);
  },
  
  sayHello: (name) => {
    console.log('👋 [PRELOAD] ส่งคำทักทาย:', name);
    return ipcRenderer.invoke('say-hello', name);
  },
  
  // ฟังก์ชันใหม่สำหรับ agent wallboard
  getAgents: () => {
    console.log('📊 [PRELOAD] ร้องขอข้อมูล agents');
    return ipcRenderer.invoke('get-agents');
  },
  
  changeAgentStatus: (agentId, newStatus) => {
    console.log(`🔄 [PRELOAD] เปลี่ยนสถานะ ${agentId} เป็น ${newStatus}`);
    return ipcRenderer.invoke('change-agent-status', { agentId, newStatus });
  }
});
```

### **🎨 เพิ่ม UI สำหรับ agent functions ใน index.html**
```html
<!-- เพิ่มส่วนนี้ใน index.html หลัง demo-section สุดท้าย -->

<!-- Demo 3: Agent Wallboard Functions -->
<div class="demo-section">
  <h3>📊 Demo 3: Agent Wallboard Functions</h3>
  <p>ฟังก์ชันสำหรับจัดการข้อมูล agents (เตรียมสำหรับ wallboard app)</p>
  
  <button class="button" onclick="loadAgents()">📊 โหลดข้อมูล Agents</button>
  <button class="button" onclick="showStatusSelector()">🔄 เปลี่ยนสถานะ</button>
  <button class="button" onclick="clearResult('agentResult')">🧹 เคลียร์</button>
  
  <div id="statusSelector" style="display: none; margin: 15px 0;">
    <select id="agentSelect" style="padding: 8px; margin-right: 10px;">
      <option value="">เลือก Agent</option>
    </select>
    
    <select id="statusSelect" style="padding: 8px; margin-right: 10px;">
      <option value="Available">Available</option>
      <option value="Busy">Busy</option>
      <option value="Break">Break</option>
      <option value="Offline">Offline</option>
    </select>
    
    <button class="button" onclick="changeStatus()">✅ เปลี่ยน</button>
  </div>
  
  <div class="result-box" id="agentResult">กดปุ่ม "โหลดข้อมูล Agents" เพื่อเริ่มต้น</div>
</div>
```

### **📜 เพิ่ม JavaScript functions**
```javascript
// เพิ่มส่วนนี้ใน <script> ของ index.html

// ตัวแปรเก็บข้อมูล agents
let agentsData = null;

// ฟังก์ชันโหลดข้อมูล agents
async function loadAgents() {
  try {
    console.log('📊 [RENDERER] กำลังโหลดข้อมูล agents...');
    displayResult('agentResult', 'กำลังโหลดข้อมูล agents...', 'loading');
    
    // เรียก API ผ่าน IPC
    const response = await window.electronAPI.getAgents();
    
    if (response.success) {
      agentsData = response.data;
      console.log('✅ [RENDERER] โหลดข้อมูลสำเร็จ:', agentsData);
      
      // แสดงข้อมูล agents
      displayAgentData(agentsData);
      
      // อัพเดท dropdown สำหรับเปลี่ยนสถานะ
      updateAgentSelector(agentsData.agents);
      
    } else {
      throw new Error(response.error);
    }
    
  } catch (error) {
    console.error('❌ [RENDERER] Error โหลดข้อมูล:', error);
    displayResult('agentResult', `Error: ${error.message}`, 'error');
  }
}

// ฟังก์ชันแสดงข้อมูล agents
function displayAgentData(data) {
  const agentList = data.agents.map(agent => {
    const statusEmoji = {
      'Available': '🟢',
      'Busy': '🔴', 
      'Break': '🟡',
      'Offline': '⚫'
    };
    
    return `${statusEmoji[agent.status] || '❓'} ${agent.name} (${agent.id})
   📞 Ext: ${agent.extension} | 🏢 ${agent.department}
   📊 Calls: ${agent.totalCalls} | ⏱️ Avg: ${agent.avgCallTime}s`;
  }).join('\n\n');
  
  const statistics = data.statistics;
  
  const resultText = `
📊 AGENT WALLBOARD DATA
======================

👥 AGENTS (${statistics.totalAgents} คน):
${agentList}

📈 STATISTICS:
🟢 Available: ${statistics.availableAgents} คน
🔴 Busy: ${statistics.busyAgents} คน  
🟡 Break: ${statistics.onBreakAgents} คน
📞 Total Calls Today: ${statistics.totalCallsToday}
⏰ Avg Wait Time: ${statistics.avgWaitTime}s

⏰ Last Updated: ${new Date().toLocaleString('th-TH')}`;

  displayResult('agentResult', resultText, 'success');
}

// ฟังก์ชันอัพเดท dropdown สำหรับเลือก agent
function updateAgentSelector(agents) {
  const agentSelect = document.getElementById('agentSelect');
  agentSelect.innerHTML = '<option value="">เลือก Agent</option>';
  
  agents.forEach(agent => {
    const option = document.createElement('option');
    option.value = agent.id;
    option.textContent = `${agent.name} (${agent.id}) - ${agent.status}`;
    agentSelect.appendChild(option);
  });
}

// ฟังก์ชันแสดง/ซ่อน status selector
function showStatusSelector() {
  if (!agentsData) {
    displayResult('agentResult', 'กรุณาโหลดข้อมูล agents ก่อน', 'error');
    return;
  }
  
  const selector = document.getElementById('statusSelector');
  selector.style.display = selector.style.display === 'none' ? 'block' : 'none';
}

// ฟังก์ชันเปลี่ยนสถานะ agent
async function changeStatus() {
  const agentId = document.getElementById('agentSelect').value;
  const newStatus = document.getElementById('statusSelect').value;
  
  if (!agentId || !newStatus) {
    displayResult('agentResult', 'กรุณาเลือก Agent และ Status', 'error');
    return;
  }
  
  try {
    console.log(`🔄 [RENDERER] เปลี่ยนสถานะ ${agentId} เป็น ${newStatus}`);
    displayResult('agentResult', `กำลังเปลี่ยนสถานะ ${agentId}...`, 'loading');
    
    // เรียก API เปลี่ยนสถานะ
    const response = await window.electronAPI.changeAgentStatus(agentId, newStatus);
    
    if (response.success) {
      console.log('✅ [RENDERER] เปลี่ยนสถานะสำเร็จ:', response);
      
      const resultText = `
✅ เปลี่ยนสถานะสำเร็จ!

👤 Agent: ${response.agent.name} (${response.agent.id})
🔄 Status: ${response.agent.status}
⏰ เวลา: ${new Date(response.agent.lastStatusChange).toLocaleString('th-TH')}

${response.message}`;

      displayResult('agentResult', resultText, 'success');
      
      // โหลดข้อมูลใหม่เพื่อแสดงการเปลี่ยนแปลง
      setTimeout(() => {
        loadAgents();
      }, 2000);
      
    } else {
      throw new Error(response.error);
    }
    
  } catch (error) {
    console.error('❌ [RENDERER] Error เปลี่ยนสถานะ:', error);
    displayResult('agentResult', `Error: ${error.message}`, 'error');
  }
}
```

---

## 🧪 Step 8: ทดสอบ Agent Functions

### **🚀 รัน Application และทดสอบ**
```bash
npm start
```

### **📋 ขั้นตอนการทดสอบ:**

1. **📊 ทดสอบโหลดข้อมูล:**
   - กดปุ่ม "โหลดข้อมูล Agents"
   - ดูข้อมูล agents และสถิติที่แสดง
   - ตรวจสอบ console logs

2. **🔄 ทดสอบเปลี่ยนสถานะ:**
   - กดปุ่ม "เปลี่ยนสถานะ"
   - เลือก Agent และ Status ใหม่
   - กดปุ่ม "เปลี่ยน"
   - ดูการอัพเดทข้อมูล

3. **🔍 ตรวจสอบไฟล์:**
   - เปิดไฟล์ `agent-data.json`
   - ดูว่าข้อมูลเปลี่ยนแล้วหรือไม่

### **✅ ผลลัพธ์ที่ควรได้:**
- 📊 แสดงรายชื่อ agents พร้อมสถานะ
- 📈 แสดงสถิติของ wallboard
- 🔄 เปลี่ยนสถานะ agent ได้
- 💾 บันทึกการเปลี่ยนแปลงในไฟล์

---

## 💡 Step 9: เข้าใจการประยุกต์ใช้

### **🎯 สำหรับ Agent Wallboard Application:**

```
Real Agent Wallboard App จะมี:

📊 Dashboard Features:
├── Real-time agent status display
├── Call queue information  
├── Performance metrics
├── Time tracking
└── Notification system

🔄 IPC Communications:
├── Login/Authentication
├── Status updates
├── Call data retrieval
├── Real-time notifications  
└── Settings management

🛡️ Security Considerations:
├── Input validation
├── Error handling
├── Access control
└── Data encryption
```

### **🔧 Pattern ที่เรียนรู้:**

1. **📤 Request Pattern:**
```javascript
// Renderer → Main
const result = await window.electronAPI.functionName(data);
```

2. **📥 Response Pattern:**
```javascript
// Main → Renderer
return {
  success: true/false,
  data: responseData,
  error: errorMessage,
  timestamp: new Date().toISOString()
};
```

3. **🔄 Data Flow:**
```
UI Input → IPC Call → Business Logic → File/DB → Response → UI Update
```

---

## 🏆 Assignment: สร้าง Agent Login System

### **📝 งานที่ต้องทำ:**

1. **🔐 สร้างระบบ Login:**
   - เพิ่ม form login (agent ID + password)
   - สร้าง IPC handler สำหรับ authentication
   - จำลองการตรวจสอบ credentials

2. **📊 Dashboard หลัง Login:**
   - แสดงข้อมูลเฉพาะ agent ที่ login
   - ปุ่มเปลี่ยนสถานะตัวเอง
   - แสดงสถิติส่วนตัว

3. **🔔 Notification System:**
   - แสดง popup เมื่อมี agent เปลี่ยนสถานะ
   - ใช้ JavaScript `alert()` หรือ custom notification

### **💯 Bonus Features:**
- 🕒 Real-time clock
- 📈 Charts แสดงสถิติ
- 🔊 เสียงแจ้งเตือน
- 💾 Remember login

### **📤 การส่งงาน:**
1. 📁 Project folder พร้อม source code
2. 📸 Screenshots ของ app ที่ทำงาน
3. 📝 README อธิบายฟีเจอร์ที่เพิ่ม
4. 🎥 Video demo (ถ้าอยาก)

---

## 🎉 สรุป Lab 8.2

### **🏆 สิ่งที่เรียนรู้แล้ว:**
- ✅ เข้าใจ IPC Communication ใน Electron
- ✅ ใช้ preload.js เพื่อความปลอดภัย
- ✅ สร้าง API functions สำหรับ desktop app
- ✅ จัดการข้อมูลแบบ async
- ✅ ประยุกต์ใช้สำหรับ agent wallboard
- ✅ Error handling และ user feedback

### **🔑 Key Concepts:**
1. **Security First:** ใช้ contextIsolation + preload.js
2. **Async Communication:** ใช้ invoke/handle pattern
3. **Data Structure:** JSON objects สำหรับการสื่อสार
4. **Error Handling:** ตรวจสอบ success/error ทุกครั้ง
5. **User Experience:** Loading states + feedback

### **🚀 พร้อมสำหรับ Lab ต่อไป:**
- Lab 8.3: Native APIs และ System Integration
- Lab 8.4: Real-time Features และ WebSocket
- Lab 8.5: Building และ Distribution

---

**🎊 ยินดีด้วย! ตอนนี้คุณเข้าใจ IPC Communication แล้ว!**

*คุณพร้อมที่จะสร้าง Agent Wallboard Application ที่สมบูรณ์แล้ว! การสื่อสารระหว่าง processes เป็นหัวใจสำคัญของ Electron apps ทั้งหมด* 🚀✨