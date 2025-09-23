# 🌐 Lab 8.4: API และ Real-time Communication
## การเชื่อมต่อ API ภายนอกและ WebSocket สำหรับ Agent Wallboard

### 🎓 สำหรับนักศึกษาวิศวกรรมซอฟต์แวร์ ปีที่ 2
#### เวลาในการทำ: 1 สัปดาห์ (Lab สุดท้าย)

---

## 🎯 วัตถุประสงค์ของ Lab 8.4

### **Learning Objectives**
เมื่อเสร็จสิ้น Lab 8.4 นี้ นักศึกษาจะสามารถ:
- 🌐 เรียกใช้ API ภายนอกใน Electron
- ⚡ ใช้ WebSocket สำหรับ real-time communication
- 📊 สร้าง Agent Wallboard ที่อัพเดทแบบ real-time
- 🔄 จัดการ connection และ error handling
- 📱 รวม features ทั้งหมดเป็น app สมบูรณ์

### **💡 ทำไมต้องเรียน Real-time?**
```
Traditional App ❌              Real-time App ✅
├── รอกดปุ่ม refresh           ├── อัพเดทอัตโนมัติ
├── ข้อมูลล้าสมัย                ├── ข้อมูลล่าสุดเสมอ
├── ไม่รู้ว่ามีอะไรเปลี่ยน          ├── แจ้งเตือนทันที
└── Agent ไม่รู้สถานะกัน         └── เห็นสถานะทุกคนแบบ live
```

---

## 📚 ทำความเข้าใจ Real-time APIs

### **🧩 สิ่งที่จะใช้:**

```
Lab 8.4 Architecture
├── 🌐 HTTP APIs
│   ├── JSONPlaceholder (ฟรี)
│   ├── WorldTimeAPI (ฟรี)
│   └── OpenWeatherMap (ฟรี - ใส่ API key)
├── ⚡ WebSocket
│   ├── WebSocket.org Echo Test
│   └── จำลอง real-time updates
├── 📊 Agent Wallboard
│   ├── Live clock
│   ├── Weather widget
│   └── Real-time status updates
```

### **🎯 สำหรับ Agent Wallboard จริง:**
- 📞 **Real-time call data** จาก PBX system
- 👥 **Agent status updates** แบบ live
- 📊 **Dashboard metrics** อัพเดททันที
- 🔔 **Instant notifications** เมื่อมีเหตุการณ์

---

## 🚀 Step 1: Project Setup

### **📂 Project Structure**
```
lab8-4-realtime/
├── main.js
├── preload.js
├── index.html
├── package.json
├── api-config.js      (การตั้งค่า APIs)
└── mock-data.json     (ข้อมูลจำลอง)
```

### **📝 package.json**
```json
{
  "name": "lab8-4-realtime-wallboard",
  "version": "1.0.0",
  "description": "Agent Wallboard with Real-time APIs",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "devDependencies": {
    "electron": "^27.0.0"
  }
}
```

### **🕒 สมัคร World Time API ที่ https://rapidapi.com/sleeyax/api/world-time-api3**
```
ไปที่เว็ป: https://rapidapi.com/sleeyax/api/world-time-api3
สมัครแบบ BASIC Free plan.
เข้าเมนูด้านซ้าย Open playground
Copy API Key ที่ x-rapidapi-key จากตัวอย่างด้านล่าง

curl --request GET \
	--url https://world-time-api3.p.rapidapi.com/ip.txt \
	--header 'x-rapidapi-host: world-time-api3.p.rapidapi.com' \
	--header 'x-rapidapi-key: b90cbdbe05msh59545428395405cp1e02efjsn46971c89499a'

```

### **⚙️ api-config.js**
```javascript
// api-config.js - การตั้งค่า APIs ที่ใช้

module.exports = {
  // 🕒 World Time API (ฟรี)
  timeAPI: 'https://world-time-api3.p.rapidapi.com/timezone/Asia/Bangkok',
  timeHost: 'world-time-api3.p.rapidapi.com',
  timeKey: 'YOUR_API_KEY_HERE', // แทนที่ด้วย API key จริง


  // 📊 JSONPlaceholder (ฟรี - สำหรับทดสอบ HTTP requests)
  usersAPI: 'https://jsonplaceholder.typicode.com/users',
  postsAPI: 'https://jsonplaceholder.typicode.com/posts',
  
  // ⚡ WebSocket Echo Test (ฟรี)
  websocketURL: 'wss://echo.websocket.org/',
  
  // 🌤️ OpenWeatherMap (ฟรี - ต้องสมัคร API key)
  // ไปสมัครที่: https://openweathermap.org/api
  weatherAPI: 'https://api.openweathermap.org/data/2.5/weather',
  weatherKey: 'YOUR_API_KEY_HERE', // แทนที่ด้วย API key จริง
  
  // 📱 จำลอง Agent API endpoints
  mockAgentAPI: {
    status: 'http://localhost:3001/api/agents/status',
    update: 'http://localhost:3001/api/agents/update'
  }
};
```

### **📊 mock-data.json**
```json
{
  "agents": [
    {
      "id": "AG001",
      "name": "Alice Johnson",
      "status": "Available",
      "extension": "1001",
      "currentCall": null,
      "lastUpdate": "2024-01-15T10:30:00Z",
      "stats": {
        "callsToday": 15,
        "avgCallTime": 245,
        "totalTalkTime": 3675
      }
    },
    {
      "id": "AG002", 
      "name": "Bob Smith",
      "status": "Busy",
      "extension": "1002",
      "currentCall": {
        "callerNumber": "02-123-4567",
        "startTime": "2024-01-15T10:45:00Z",
        "duration": 120
      },
      "lastUpdate": "2024-01-15T10:45:00Z",
      "stats": {
        "callsToday": 8,
        "avgCallTime": 312,
        "totalTalkTime": 2496
      }
    }
  ],
  "systemStats": {
    "totalCalls": 156,
    "avgWaitTime": 23,
    "longestWait": 145,
    "activeCalls": 3
  }
}
```

---

## 🖥️ Step 2: Main Process พร้อม HTTP APIs

### **📄 main.js**
```javascript
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const https = require('https');
const fs = require('fs').promises;
const config = require('./api-config');

let mainWindow;

function createWindow() {
  console.log('🚀 [MAIN] สร้าง Real-time Wallboard...');
  
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    title: 'Agent Wallboard - Real-time Dashboard'
  });

  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();
  
  console.log('✅ [MAIN] Wallboard พร้อมแล้ว');
}

// ===== HTTP API FUNCTIONS =====

// 🌐 ฟังก์ชันเรียก HTTP API
function callAPI(url) {
  return new Promise((resolve, reject) => {
    console.log('🌐 [MAIN] เรียก API:', url);
    
    https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log('✅ [MAIN] API สำเร็จ');
          resolve(jsonData);
        } catch (error) {
          console.error('❌ [MAIN] Parse error:', error);
          reject(error);
        }
      });
      
    }).on('error', (error) => {
      console.error('❌ [MAIN] API error:', error);
      reject(error);
    });
  });
}

function fetchTimeWithAPIKey(url) {
    return new Promise((resolve, reject) => {
        console.log('🌐 [MAIN] เรียก API:', url);

        // Define the headers, including the X-RapidAPI-Key
        const options = {
            headers: {
                'X-RapidAPI-Key': config.timeKey,  // Replace with your RapidAPI key
                'X-RapidAPI-Host': config.timeHost,  // This is the RapidAPI host for the WorldTimeAPI
            }
        };

        // Use https.get with the options to include the headers
        https.get(url, options, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    console.log('✅ [MAIN] API สำเร็จ');
                    resolve(jsonData);
                } catch (error) {
                    console.error('❌ [MAIN] Parse error:', error);
                    reject(error);
                }
            });

        }).on('error', (error) => {
            console.error('❌ [MAIN] API error:', error);
            reject(error);
        });
    });
}

// ===== IPC HANDLERS =====

// 🕒 ดึงเวลาจาก World Time API
ipcMain.handle('get-world-time', async () => {
    try {
        console.log('🕒 [MAIN] ดึงเวลาจาก API...');
        const timeData = await fetchTimeWithAPIKey(config.timeAPI);

        return {
            success: true,
            datetime: timeData.datetime,
            timezone: timeData.timezone,
            formatted: new Date(timeData.datetime).toLocaleString('th-TH')
        };

    } catch (error) {
        console.error('❌ [MAIN] Time API error:', error);
        return {
            success: false,
            error: error.message,
            fallback: new Date().toLocaleString('th-TH')
        };
    }
});

// 📊 ดึงข้อมูล mock users (จำลอง agents)
ipcMain.handle('get-mock-agents', async () => {
  try {
    console.log('📊 [MAIN] ดึงข้อมูล mock agents...');
    const users = await callAPI(config.usersAPI);
    
    // แปลง users เป็น agent format
    const agents = users.slice(0, 5).map((user, index) => {
      const statuses = ['Available', 'Busy', 'Break', 'Offline'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        id: `AG${String(index + 1).padStart(3, '0')}`,
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: randomStatus,
        extension: `100${index + 1}`,
        company: user.company.name,
        lastUpdate: new Date().toISOString()
      };
    });
    
    return {
      success: true,
      agents: agents,
      count: agents.length,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ [MAIN] Mock agents error:', error);
    
    // Fallback ข้อมูล
    const mockData = await fs.readFile('mock-data.json', 'utf8');
    const fallbackData = JSON.parse(mockData);
    
    return {
      success: true,
      agents: fallbackData.agents,
      fallback: true,
      error: error.message
    };
  }
});

// 🌤️ ดึงข้อมูลสภาพอากาศ (ถ้ามี API key)
ipcMain.handle('get-weather', async () => {
  if (config.weatherKey === 'YOUR_API_KEY_HERE') {
    return {
      success: false,
      error: 'ไม่ได้ตั้งค่า Weather API key',
      fallback: {
        location: 'Bangkok',
        temperature: '32°C',
        description: 'Sunny',
        humidity: '65%'
      }
    };
  }
  
  try {
    const weatherURL = `${config.weatherAPI}?q=Bangkok&appid=${config.weatherKey}&units=metric`;
    const weatherData = await callAPI(weatherURL);
    
    return {
      success: true,
      location: weatherData.name,
      temperature: Math.round(weatherData.main.temp) + '°C',
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity + '%',
      icon: weatherData.weather[0].icon
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message,
      fallback: {
        location: 'Bangkok',
        temperature: '32°C', 
        description: 'Data unavailable',
        humidity: 'N/A'
      }
    };
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
```

**🔑 อธิบาย Code:**
- `https.get()` = เรียก HTTP API แบบ native Node.js
- `callAPI()` = wrapper function สำหรับจัดการ API calls
- Error handling = มี fallback data เมื่อ API ไม่ทำงาน
- JSON parsing = แปลงข้อมูลจาก API เป็น JavaScript object

---

## 🌉 Step 3: Preload สำหรับ APIs

### **📄 preload.js**
```javascript
const { contextBridge, ipcRenderer } = require('electron');

console.log('🌉 [PRELOAD] ตั้งค่า Real-time APIs...');

contextBridge.exposeInMainWorld('realtimeAPI', {
  // 🕒 Time API
  getWorldTime: () => {
    console.log('🕒 [PRELOAD] ร้องขอเวลา...');
    return ipcRenderer.invoke('get-world-time');
  },
  
  // 📊 Mock Agents API
  getMockAgents: () => {
    console.log('📊 [PRELOAD] ร้องขอข้อมูล agents...');
    return ipcRenderer.invoke('get-mock-agents');
  },
  
  // 🌤️ Weather API
  getWeather: () => {
    console.log('🌤️ [PRELOAD] ร้องขอสภาพอากาศ...');
    return ipcRenderer.invoke('get-weather');
  }
});

console.log('✅ [PRELOAD] Real-time APIs พร้อมใช้งาน');
```

---

## 🎨 Step 4: UI Dashboard

### **📄 index.html**
```html
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agent Wallboard - Real-time Dashboard</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
      color: white;
    }
    
    .dashboard {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .widget {
      background: rgba(255, 255, 255, 0.1);
      padding: 20px;
      border-radius: 15px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .widget h3 {
      margin: 0 0 15px 0;
      font-size: 1.2em;
      text-align: center;
    }
    
    .header {
      grid-column: 1 / -1;
      text-align: center;
      margin-bottom: 20px;
    }
    
    .clock {
      font-size: 2em;
      text-align: center;
      font-weight: bold;
      margin: 20px 0;
    }
    
    .status-indicator {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 8px;
    }
    
    .status-available { background: #2ecc71; }
    .status-busy { background: #e74c3c; }
    .status-break { background: #f39c12; }
    .status-offline { background: #95a5a6; }
    
    .agent-item {
      background: rgba(255, 255, 255, 0.1);
      padding: 10px;
      margin: 5px 0;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .button {
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid white;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      margin: 5px;
      transition: all 0.3s ease;
    }
    
    .button:hover {
      background: white;
      color: #3498db;
    }
    
    .loading {
      text-align: center;
      opacity: 0.7;
      font-style: italic;
    }
    
    .error {
      color: #e74c3c;
      font-size: 0.9em;
    }
    
    .websocket-status {
      padding: 10px;
      border-radius: 8px;
      margin: 10px 0;
      text-align: center;
    }
    
    .ws-connected { background: rgba(46, 204, 113, 0.3); }
    .ws-disconnected { background: rgba(231, 76, 60, 0.3); }
    .ws-connecting { background: rgba(243, 156, 18, 0.3); }
  </style>
</head>
<body>
  <div class="dashboard">
    <!-- Header -->
    <div class="header widget">
      <h1>🏢 Agent Wallboard Dashboard</h1>
      <p>Real-time Monitoring System</p>
      <div class="clock" id="liveClock">กำลังโหลดเวลา...</div>
    </div>

    <!-- Weather Widget -->
    <div class="widget">
      <h3>🌤️ สภาพอากาศ</h3>
      <div id="weatherInfo" class="loading">กำลังโหลด...</div>
      <button class="button" onclick="refreshWeather()">🔄 รีเฟรช</button>
    </div>

    <!-- System Status -->
    <div class="widget">
      <h3>⚡ WebSocket Status</h3>
      <div id="websocketStatus" class="websocket-status ws-disconnected">
        🔴 ไม่ได้เชื่อมต่อ
      </div>
      <button class="button" onclick="connectWebSocket()">🔌 เชื่อมต่อ</button>
      <button class="button" onclick="sendTestMessage()">💬 ทดสอบ</button>
    </div>

    <!-- Real-time Clock -->
    <div class="widget">
      <h3>🕒 เวลาจาก API</h3>
      <div id="apiTime" class="loading">กำลังโหลด...</div>
      <button class="button" onclick="refreshTime()">🔄 รีเฟรช</button>
    </div>

    <!-- Agents List -->
    <div class="widget" style="grid-column: span 2;">
      <h3>👥 Agent Status (Mock Data)</h3>
      <div id="agentsList" class="loading">กำลังโหลดรายชื่อ agents...</div>
      <button class="button" onclick="refreshAgents()">🔄 รีเฟรช Agents</button>
      <button class="button" onclick="startAutoRefresh()">⏰ Auto Refresh</button>
      <button class="button" onclick="stopAutoRefresh()">⏹️ หยุด Auto</button>
    </div>
  </div>

  <script>
    console.log('🎨 [RENDERER] Real-time Dashboard โหลดแล้ว');

    // Global variables
    let websocket = null;
    let autoRefreshInterval = null;
    let clockInterval = null;

    // ===== WEBSOCKET FUNCTIONS =====

    function connectWebSocket() {
      try {
        console.log('⚡ [RENDERER] เชื่อมต่อ WebSocket...');
        updateWebSocketStatus('connecting', '🟡 กำลังเชื่อมต่อ...');
        
        // เชื่อมต่อ WebSocket Echo Test
        websocket = new WebSocket('wss://echo.websocket.org/');
        
        websocket.onopen = function(event) {
          console.log('✅ [RENDERER] WebSocket เชื่อมต่อแล้ว');
          updateWebSocketStatus('connected', '🟢 เชื่อมต่อแล้ว');
          
          // ส่งข้อความต้อนรับ
          websocket.send(JSON.stringify({
            type: 'wallboard_connected',
            message: 'Agent Wallboard เชื่อมต่อแล้ว',
            timestamp: new Date().toISOString()
          }));
        };
        
        websocket.onmessage = function(event) {
          console.log('📨 [RENDERER] ได้รับข้อความ:', event.data);
          
          try {
            const data = JSON.parse(event.data);
            handleWebSocketMessage(data);
          } catch (error) {
            console.log('📨 [RENDERER] Text message:', event.data);
          }
        };
        
        websocket.onclose = function(event) {
          console.log('🔴 [RENDERER] WebSocket ปิดการเชื่อมต่อ');
          updateWebSocketStatus('disconnected', '🔴 ไม่ได้เชื่อมต่อ');
          websocket = null;
        };
        
        websocket.onerror = function(error) {
          console.error('❌ [RENDERER] WebSocket error:', error);
          updateWebSocketStatus('disconnected', '❌ เกิดข้อผิดพลาด');
        };
        
      } catch (error) {
        console.error('❌ [RENDERER] Error:', error);
        updateWebSocketStatus('disconnected', '❌ เชื่อมต่อไม่ได้');
      }
    }

    function sendTestMessage() {
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        const testMessage = {
          type: 'agent_status_update',
          agentId: 'AG001',
          newStatus: 'Available',
          timestamp: new Date().toISOString(),
          message: 'ทดสอบข้อความจาก Agent Wallboard'
        };
        
        console.log('💬 [RENDERER] ส่งข้อความทดสอบ...');
        websocket.send(JSON.stringify(testMessage));
      } else {
        alert('❌ กรุณาเชื่อมต่อ WebSocket ก่อน');
      }
    }

    function updateWebSocketStatus(status, message) {
      const statusEl = document.getElementById('websocketStatus');
      statusEl.className = `websocket-status ws-${status}`;
      statusEl.textContent = message;
    }

    function handleWebSocketMessage(data) {
      console.log('🔄 [RENDERER] ประมวลผลข้อความ:', data);
      
      // จำลองการอัพเดท agent status แบบ real-time
      if (data.type === 'agent_status_update') {
        showNotification(`🔄 ${data.agentId} เปลี่ยนสถานะเป็น ${data.newStatus}`);
      }
    }

    // ===== API FUNCTIONS =====

    async function refreshTime() {
      try {
        console.log('🕒 [RENDERER] รีเฟรชเวลา...');
        document.getElementById('apiTime').innerHTML = '<div class="loading">กำลังโหลด...</div>';
        
        const timeData = await window.realtimeAPI.getWorldTime();
        
        if (timeData.success) {
          document.getElementById('apiTime').innerHTML = `
            <strong>🕒 ${timeData.formatted}</strong><br>
            <small>Timezone: ${timeData.timezone}</small>
          `;
        } else {
          document.getElementById('apiTime').innerHTML = `
            <div class="error">❌ ${timeData.error}</div>
            <div>Fallback: ${timeData.fallback}</div>
          `;
        }
        
      } catch (error) {
        console.error('❌ [RENDERER] Error:', error);
        document.getElementById('apiTime').innerHTML = `<div class="error">❌ ${error.message}</div>`;
      }
    }

    async function refreshWeather() {
      try {
        console.log('🌤️ [RENDERER] รีเฟรชสภาพอากาศ...');
        document.getElementById('weatherInfo').innerHTML = '<div class="loading">กำลังโหลด...</div>';
        
        const weatherData = await window.realtimeAPI.getWeather();
        
        if (weatherData.success) {
          document.getElementById('weatherInfo').innerHTML = `
            <strong>📍 ${weatherData.location}</strong><br>
            🌡️ ${weatherData.temperature}<br>
            ☁️ ${weatherData.description}<br>
            💧 ความชื้น: ${weatherData.humidity}
          `;
        } else {
          const fallback = weatherData.fallback;
          document.getElementById('weatherInfo').innerHTML = `
            <div class="error">⚠️ ${weatherData.error}</div>
            <div><strong>📍 ${fallback.location}</strong><br>
            🌡️ ${fallback.temperature}<br>
            ☁️ ${fallback.description}</div>
          `;
        }
        
      } catch (error) {
        console.error('❌ [RENDERER] Error:', error);
        document.getElementById('weatherInfo').innerHTML = `<div class="error">❌ ${error.message}</div>`;
      }
    }

    async function refreshAgents() {
      try {
        console.log('👥 [RENDERER] รีเฟรช agents...');
        document.getElementById('agentsList').innerHTML = '<div class="loading">กำลังโหลด...</div>';
        
        const agentData = await window.realtimeAPI.getMockAgents();
        
        if (agentData.success) {
          let agentsHTML = '';
          
          agentData.agents.forEach(agent => {
            const statusClass = `status-${agent.status.toLowerCase()}`;
            agentsHTML += `
              <div class="agent-item">
                <div>
                  <span class="status-indicator ${statusClass}"></span>
                  <strong>${agent.name}</strong> (${agent.id})
                </div>
                <div>
                  ${agent.status} | Ext: ${agent.extension}
                </div>
              </div>
            `;
          });
          
          agentsHTML += `<div style="margin-top: 15px; font-size: 0.9em;">
            📊 Total: ${agentData.count} agents
            ${agentData.fallback ? ' (Fallback data)' : ' (Live from API)'}
          </div>`;
          
          document.getElementById('agentsList').innerHTML = agentsHTML;
        } else {
          document.getElementById('agentsList').innerHTML = `<div class="error">❌ ${agentData.error}</div>`;
        }
        
      } catch (error) {
        console.error('❌ [RENDERER] Error:', error);
        document.getElementById('agentsList').innerHTML = `<div class="error">❌ ${error.message}</div>`;
      }
    }

    // ===== AUTO REFRESH FUNCTIONS =====

    function startAutoRefresh() {
      if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
      }
      
      console.log('⏰ [RENDERER] เริ่ม auto refresh...');
      
      // รีเฟรชทุก 30 วินาที
      autoRefreshInterval = setInterval(() => {
        console.log('🔄 [RENDERER] Auto refresh...');
        refreshAgents();
        refreshTime();
      }, 30000);
      
      showNotification('⏰ เริ่ม Auto Refresh แล้ว (ทุก 30 วินาที)');
    }

    function stopAutoRefresh() {
      if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
        console.log('⏹️ [RENDERER] หยุด auto refresh');
        showNotification('⏹️ หยุด Auto Refresh แล้ว');
      }
    }

    // ===== UTILITY FUNCTIONS =====

    function updateLiveClock() {
      const now = new Date();
      document.getElementById('liveClock').textContent = now.toLocaleString('th-TH');
    }

    function showNotification(message) {
      // จำลอง notification (ในที่นี้ใช้ console.log)
      console.log('🔔 [NOTIFICATION]', message);
      
      // หรือใช้ alert สำหรับการทดสอบ
      // alert(message);
    }

    // ===== INITIALIZATION =====

    window.addEventListener('DOMContentLoaded', () => {
      console.log('📄 [RENDERER] DOM พร้อมแล้ว');
      
      // เริ่มต้น live clock
      clockInterval = setInterval(updateLiveClock, 1000);
      updateLiveClock();
      
      // โหลดข้อมูลเริ่มต้น
      refreshTime();
      refreshWeather();
      refreshAgents();
      
      console.log('✅ [RENDERER] Dashboard พร้อมใช้งาน');
    });

    // Cleanup เมื่อปิด window
    window.addEventListener('beforeunload', () => {
      console.log('🔄 [RENDERER] ทำความสะอาด...');
      
      if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
      }
      
      if (clockInterval) {
        clearInterval(clockInterval);
      }
      
      if (websocket) {
        websocket.close();
      }
    });
  </script>
</body>
</html>
```

---

## ▶️ Step 5: ทดสอบ Real-time Features

### **🚀 รัน Application**
```bash
npm start
```

### **🧪 ทดสอบ Features:**

1. **🕒 Time API:**
   - ดูเวลาที่อัพเดทจาก WorldTimeAPI
   - กดปุ่ม "รีเฟรช" เพื่อดูการเปลี่ยนแปลง

2. **📊 Mock Agents API:**
   - ดูรายชื่อ agents จาก JSONPlaceholder
   - ทดสอบ Auto Refresh ทุก 30 วินาที

3. **⚡ WebSocket:**
   - กดปุ่ม "เชื่อมต่อ" เพื่อเชื่อมต่อ WebSocket
   - กดปุ่ม "ทดสอบ" เพื่อส่งข้อความ
   - ดู echo message กลับมา

4. **🌤️ Weather API:**
   - ดู fallback data (เพราะไม่ได้ตั้ง API key)
   - ถ้าอยากทดสอบจริงให้ไปสมัคร API key ฟรีที่ OpenWeatherMap

### **✅ ผลลัพธ์ที่ควรได้:**
- ⏰ Live clock ทำงานตลอดเวลา
- 🌐 API calls ได้ข้อมูลจริงจากเซิร์ฟเวอร์ภายนอก
- ⚡ WebSocket เชื่อมต่อและรับส่งข้อความได้
- 🔄 Auto refresh อัพเดทข้อมูลอัตโนมัติ

---

## 🎯 Step 6: สร้าง Agent Status Simulator

### **📄 เพิ่มใน main.js**
```javascript
// เพิ่มส่วนนี้ใน main.js

// ===== AGENT STATUS SIMULATOR =====

let agentStatusInterval = null;

// จำลองการเปลี่ยนสถานะ agent แบบสุ่ม
ipcMain.handle('start-agent-simulator', () => {
  console.log('🎭 [MAIN] เริ่ม Agent Status Simulator...');
  
  if (agentStatusInterval) {
    clearInterval(agentStatusInterval);
  }
  
  const statuses = ['Available', 'Busy', 'Break'];
  const agentIds = ['AG001', 'AG002', 'AG003'];
  
  agentStatusInterval = setInterval(() => {
    const randomAgent = agentIds[Math.floor(Math.random() * agentIds.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    console.log(`🎭 [SIMULATOR] ${randomAgent} → ${randomStatus}`);
    
    // ส่งข้อมูลไปยัง renderer
    mainWindow.webContents.send('agent-status-changed', {
      agentId: randomAgent,
      newStatus: randomStatus,
      timestamp: new Date().toISOString(),
      simulated: true
    });
    
  }, 10000); // ทุก 10 วินาที
  
  return { success: true, message: 'Agent Simulator เริ่มทำงานแล้ว' };
});

ipcMain.handle('stop-agent-simulator', () => {
  console.log('⏹️ [MAIN] หยุด Agent Status Simulator');
  
  if (agentStatusInterval) {
    clearInterval(agentStatusInterval);
    agentStatusInterval = null;
  }
  
  return { success: true, message: 'Agent Simulator หยุดแล้ว' };
});
```

### **🌉 เพิ่มใน preload.js**
```javascript
// เพิ่มส่วนนี้ใน preload.js

contextBridge.exposeInMainWorld('realtimeAPI', {
  // APIs เดิม...
  
  // 🎭 Agent Simulator
  startSimulator: () => {
    console.log('🎭 [PRELOAD] เริ่ม simulator...');
    return ipcRenderer.invoke('start-agent-simulator');
  },
  
  stopSimulator: () => {
    console.log('⏹️ [PRELOAD] หยุด simulator...');
    return ipcRenderer.invoke('stop-agent-simulator');
  },
  
  // 📡 รับ events จาก main process
  onAgentStatusChanged: (callback) => {
    console.log('📡 [PRELOAD] ลงทะเบียน status listener...');
    ipcRenderer.on('agent-status-changed', (event, data) => callback(data));
  }
});
```

### **🎨 เพิ่ม UI สำหรับ Simulator**
```html
<!-- เพิ่มส่วนนี้ใน index.html -->

<!-- Agent Simulator Widget -->
<div class="widget">
  <h3>🎭 Agent Status Simulator</h3>
  <p>จำลองการเปลี่ยนสถานะแบบ real-time</p>
  
  <button class="button" onclick="startSimulator()">▶️ เริ่ม Simulator</button>
  <button class="button" onclick="stopSimulator()">⏹️ หยุด Simulator</button>
  
  <div id="simulatorStatus" style="margin-top: 15px;">
    📍 Simulator ยังไม่ทำงาน
  </div>
  
  <div id="lastStatusChange" style="margin-top: 10px; font-size: 0.9em;">
    รอการเปลี่ยนแปลง...
  </div>
</div>
```

### **📜 เพิ่ม JavaScript Functions**
```javascript
// เพิ่มส่วนนี้ใน <script> ของ index.html

// ===== SIMULATOR FUNCTIONS =====

async function startSimulator() {
  try {
    console.log('🎭 [RENDERER] เริ่ม simulator...');
    
    const result = await window.realtimeAPI.startSimulator();
    
    if (result.success) {
      document.getElementById('simulatorStatus').innerHTML = '🟢 Simulator ทำงานอยู่';
      showNotification('🎭 Agent Status Simulator เริ่มทำงานแล้ว');
    }
    
  } catch (error) {
    console.error('❌ [RENDERER] Error:', error);
  }
}

async function stopSimulator() {
  try {
    console.log('⏹️ [RENDERER] หยุด simulator...');
    
    const result = await window.realtimeAPI.stopSimulator();
    
    if (result.success) {
      document.getElementById('simulatorStatus').innerHTML = '🔴 Simulator หยุดแล้ว';
      showNotification('⏹️ Agent Status Simulator หยุดแล้ว');
    }
    
  } catch (error) {
    console.error('❌ [RENDERER] Error:', error);
  }
}

// รับ event การเปลี่ยนสถานะจาก simulator
window.realtimeAPI.onAgentStatusChanged((data) => {
  console.log('📡 [RENDERER] Agent status changed:', data);
  
  // อัพเดท UI
  document.getElementById('lastStatusChange').innerHTML = `
    🔄 <strong>${data.agentId}</strong> → ${data.newStatus}<br>
    <small>⏰ ${new Date(data.timestamp).toLocaleTimeString('th-TH')}</small>
  `;
  
  // แสดง notification
  showNotification(`🔄 ${data.agentId} เปลี่ยนเป็น ${data.newStatus}`);
  
  // รีเฟรช agents list
  refreshAgents();
});
```

---

## 🎉 Assignment: Agent Wallboard สมบูรณ์

### **📝 งานที่ต้องทำ:**

1. **🌐 API Integration:**
   - ทดสอบ APIs ทั้งหมดให้ทำงาน
   - เพิ่ม error handling ที่ดี
   - สร้าง fallback data เมื่อ API ไม่ทำงาน

2. **⚡ Real-time Features:**
   - ทดสอบ WebSocket communication
   - ใช้ Auto Refresh ทุก 30 วินาที
   - ทดสอบ Agent Status Simulator

3. **📊 Dashboard Enhancement:**
   - ปรับแต่ง UI ให้สวยงาม
   - เพิ่มสถิติและ metrics
   - เพิ่มเสียงแจ้งเตือน (ถ้าทำได้)

### **💯 Bonus Features:**
- 🔔 **Desktop Notifications** เมื่อ agent เปลี่ยนสถานะ
- 📈 **Charts** แสดงสถิติแบบ real-time
- 🌙 **Dark/Light Mode** toggle
- 💾 **Save/Load** settings
- 🖱️ **System Tray** integration

---

## 🎓 สรุป Lab 8.4

### **🏆 สิ่งที่เรียนรู้ครบทั้งหมด:**

**Lab 8.1:** 🚀 Hello Electron - พื้นฐาน Main/Renderer Process
**Lab 8.2:** 🔄 IPC Communication - การสื่อสารระหว่าง processes  
**Lab 8.3:** 🖥️ Native APIs - File system, Notifications, System tray
**Lab 8.4:** 🌐 Real-time APIs - HTTP APIs, WebSocket, Live updates
**Lab 8.5:** 📦 Building และ Distribution

### **🔑 Key Technologies:**
- ✅ **Electron.js** - Desktop app framework
- ✅ **Node.js APIs** - File system, HTTP requests
- ✅ **WebSocket** - Real-time communication
- ✅ **External APIs** - Time, Weather, Mock data
- ✅ **IPC** - Main ↔ Renderer communication
- ✅ **Security** - Context isolation, preload scripts

### **🎯 Agent Wallboard Features:**
- 📊 **Real-time agent monitoring**
- 🔄 **Live status updates**
- 🌐 **External API integration**
- 🔔 **Desktop notifications**
- ⚡ **WebSocket communication**
- 🖱️ **System tray control**

### **🚀 Ready for Production:**
คุณมีความรู้ครบถ้วนแล้วสำหรับสร้าง:
- 💼 **Enterprise desktop applications**
- 📊 **Real-time monitoring dashboards**  
- 🔄 **Live communication systems**
- 📱 **Cross-platform desktop apps**

---

**🎊 ยินดีด้วย! คุณจบ Electron.js Workshop แล้ว!**

*ตอนนี้คุณสามารถสร้าง Agent Wallboard Desktop Application ที่สมบูรณ์ หรือ desktop app อื่นๆ ที่ต้องการได้แล้ว!* 🚀✨

**Next Steps:**
- 📦 **Lab Bonus:** Building และ Distribution
- 🎯 **Final Project:** Complete Agent Wallboard System  
- 🌟 **Portfolio:** นำไปใส่ portfolio ได้เลย!ชื่อมต่อ WebSocket Echo Test