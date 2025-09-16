# Agent Desktop App - Complete Phase 2 Guide
## สำหรับ MongoDB + WebSocket API Integration

## 📋 **ภาพรวมโปรเจกต์**

### 🎯 **เป้าหมายหลัก**
สร้าง Agent Desktop Application ด้วย Electron.js ที่เชื่อมต่อกับ Phase 2 API ที่ใช้:
- **MongoDB** สำหรับเก็บข้อมูล Agent และ Messages
- **WebSocket** สำหรับการสื่อสารแบบ Real-time
- **RESTful API** สำหรับ CRUD operations

### 🏗️ **สถาปัตยกรรมระบบ**

```
┌─────────────────────────────────┐
│    Electron Desktop App         │ ← Frontend (Phase 2)
│    (Agent Interface)            │
└─────────────┬───────────────────┘
              │ HTTP REST + WebSocket
              ▼
┌─────────────────────────────────┐
│    Node.js + Express API        │ ← Backend (Phase 2)
│    + Socket.io WebSocket        │
└─────────────┬───────────────────┘
              │ Database Queries
              ▼
┌─────────────────────────────────┐
│    MongoDB Database             │ ← Data Storage
│    (Agents + Messages)          │
└─────────────────────────────────┘
```

### ⏰ **แผนการพัฒนา (8-10 ชั่วโมง)**

**Phase 2A: Basic Integration (4-5 ชั่วโมง)**
- ชั่วโมงที่ 1: Project Setup + API Connection Testing
- ชั่วโมงที่ 2: Login System + Agent Authentication
- ชั่วโมงที่ 3: Status Management + Database Integration
- ชั่วโมงที่ 4: Basic UI + Error Handling
- ชั่วโมงที่ 5: Testing + Debugging

**Phase 2B: Advanced Features (4-5 ชั่วโมง)**
- ชั่วโมงที่ 6: WebSocket Integration + Real-time Updates
- ชั่วโมงที่ 7: Message System + Communication
- ชั่วโมงที่ 8: Notifications + Sound System
- ชั่วโมงที่ 9: Advanced UI Features + Settings
- ชั่วโมงที่ 10: Build + Deployment + Documentation

---

## 🛠️ **ชั่วโมงที่ 1: Project Setup + API Connection Testing**

### 📦 **Project Initialization (15 นาที)**

```bash
# 1. สร้างโปรเจคใหม่
mkdir agent-desktop-phase2
cd agent-desktop-phase2

# 2. Initialize npm
npm init -y

# 3. ติดตั้ง Electron และ dependencies
npm install electron --save-dev
npm install axios socket.io-client --save

# 4. ติดตั้ง development tools
npm install --save-dev electron-builder concurrently wait-on
```

### 📁 **Project Structure (15 นาที)**

```
agent-desktop-phase2/
├── src/
│   ├── main/                  # Main Process (Node.js)
│   │   ├── main.js           # Application entry point
│   │   └── menu.js           # Application menu
│   ├── renderer/             # Renderer Process (Web UI)
│   │   ├── index.html        # Main dashboard
│   │   ├── login.html        # Login window
│   │   ├── css/
│   │   │   └── style.css     # Main styles
│   │   └── js/
│   │       ├── api-client.js     # API communication layer
│   │       ├── websocket-manager.js # WebSocket management
│   │       ├── login.js          # Login handling
│   │       ├── dashboard.js      # Main dashboard logic
│   │       ├── message-manager.js # Message system
│   │       ├── notification-manager.js # Notifications
│   │       └── utils.js          # Utility functions
│   └── assets/               # Static resources
│       ├── icon.png          # App icon
│       └── sounds/           # Notification sounds
├── package.json
├── README.md
└── .env.example
```

### ⚙️ **Package.json Configuration (15 นาที)**

```json
{
  "name": "agent-desktop-phase2",
  "version": "2.0.0",
  "description": "Agent Desktop Application for MongoDB + WebSocket API",
  "main": "src/main/main.js",
  "scripts": {
    "start": "electron .",
    "dev": "electron . --dev",
    "build": "electron-builder",
    "build-win": "electron-builder --win",
    "dist": "electron-builder --publish=never",
    "test-api": "node test/api-test.js"
  },
  "build": {
    "appId": "com.wallboard.agent-desktop-phase2",
    "productName": "Agent Desktop Phase 2",
    "directories": {
      "output": "dist"
    },
    "files": [
      "src/**/*",
      "package.json"
    ],
    "win": {
      "icon": "src/assets/icon.png",
      "target": "nsis"
    }
  },
  "dependencies": {
    "axios": "^1.6.0",
    "socket.io-client": "^4.7.2"
  },
  "devDependencies": {
    "electron": "^27.0.0",
    "electron-builder": "^24.6.4"
  }
}
```

### 🔌 **API Client Setup (15 นาที)**

**src/renderer/js/api-client.js:**

```javascript
// API Client สำหรับ Phase 2 MongoDB API
class ApiClient {
    constructor() {
        this.baseURL = 'http://localhost:3001/api';
        this.axios = null;
        this.setupAxios();
    }

    setupAxios() {
        const axios = require('axios');
        
        this.axios = axios.create({
            baseURL: this.baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Request interceptor for logging
        this.axios.interceptors.request.use(
            (config) => {
                console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
                return config;
            },
            (error) => {
                console.error('API Request Error:', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor for error handling
        this.axios.interceptors.response.use(
            (response) => {
                console.log(`API Response: ${response.status} ${response.config.url}`);
                return response;
            },
            (error) => {
                console.error('API Response Error:', error.response?.data || error.message);
                return Promise.reject(error);
            }
        );
    }

    // Health check
    async checkHealth() {
        try {
            const response = await this.axios.get('/health');
            return response.data;
        } catch (error) {
            throw new Error(`Health check failed: ${error.message}`);
        }
    }

    // Agent operations
    async getAllAgents(filters = {}) {
        try {
            const params = new URLSearchParams();
            if (filters.status) params.append('status', filters.status);
            if (filters.department) params.append('department', filters.department);
            if (filters.isOnline !== undefined) params.append('isOnline', filters.isOnline);

            const response = await this.axios.get(`/agents?${params}`);
            return response.data;
        } catch (error) {
            throw new Error(`Get agents failed: ${error.response?.data?.message || error.message}`);
        }
    }

    async getAgentById(agentId) {
        try {
            const response = await this.axios.get(`/agents/${agentId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Get agent failed: ${error.response?.data?.message || error.message}`);
        }
    }

    async getAgentByCode(agentCode) {
        try {
            // Search agents by agentCode
            const response = await this.axios.get(`/agents?agentCode=${agentCode}`);
            if (response.data.success && response.data.data.length > 0) {
                return {
                    success: true,
                    data: response.data.data[0]
                };
            }
            return {
                success: false,
                message: `Agent with code ${agentCode} not found`
            };
        } catch (error) {
            throw new Error(`Get agent by code failed: ${error.response?.data?.message || error.message}`);
        }
    }

    async updateAgentStatus(agentId, status, reason = null) {
        try {
            const response = await this.axios.patch(`/agents/${agentId}/status`, {
                status,
                reason
            });
            return response.data;
        } catch (error) {
            throw new Error(`Update status failed: ${error.response?.data?.message || error.message}`);
        }
    }

    async createAgent(agentData) {
        try {
            const response = await this.axios.post('/agents', agentData);
            return response.data;
        } catch (error) {
            throw new Error(`Create agent failed: ${error.response?.data?.message || error.message}`);
        }
    }

    // Message operations
    async sendMessage(messageData) {
        try {
            const response = await this.axios.post('/messages', messageData);
            return response.data;
        } catch (error) {
            throw new Error(`Send message failed: ${error.response?.data?.message || error.message}`);
        }
    }

    async getMessagesForAgent(agentCode, options = {}) {
        try {
            const params = new URLSearchParams();
            if (options.limit) params.append('limit', options.limit);
            if (options.page) params.append('page', options.page);
            if (options.unreadOnly) params.append('unreadOnly', options.unreadOnly);

            const response = await this.axios.get(`/messages/${agentCode}?${params}`);
            return response.data;
        } catch (error) {
            throw new Error(`Get messages failed: ${error.response?.data?.message || error.message}`);
        }
    }

    async markMessageAsRead(messageId) {
        try {
            const response = await this.axios.patch(`/messages/${messageId}/read`);
            return response.data;
        } catch (error) {
            throw new Error(`Mark message as read failed: ${error.response?.data?.message || error.message}`);
        }
    }

    // Statistics
    async getStatusSummary() {
        try {
            const response = await this.axios.get('/agents/status/summary');
            return response.data;
        } catch (error) {
            throw new Error(`Get status summary failed: ${error.response?.data?.message || error.message}`);
        }
    }

    async getAgentHistory(agentId, options = {}) {
        try {
            const params = new URLSearchParams();
            if (options.limit) params.append('limit', options.limit);
            if (options.page) params.append('page', options.page);

            const response = await this.axios.get(`/agents/${agentId}/history?${params}`);
            return response.data;
        } catch (error) {
            throw new Error(`Get agent history failed: ${error.response?.data?.message || error.message}`);
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ApiClient;
} else {
    window.ApiClient = ApiClient;
}
```

### 🧪 **API Connection Test (15 นาที)**

**test/api-test.js:**

```javascript
// API Connection Test Script
const ApiClient = require('../src/renderer/js/api-client');

async function testApiConnection() {
    console.log('🧪 Testing API Connection...');
    
    const api = new ApiClient();
    
    try {
        // Test 1: Health Check
        console.log('\n1. Testing Health Check...');
        const health = await api.checkHealth();
        console.log('✅ Health Check:', health);
        
        // Test 2: Get All Agents
        console.log('\n2. Testing Get All Agents...');
        const agents = await api.getAllAgents();
        console.log('✅ Agents:', agents.count, 'agents found');
        
        // Test 3: Get Status Summary
        console.log('\n3. Testing Status Summary...');
        const summary = await api.getStatusSummary();
        console.log('✅ Status Summary:', summary.data);
        
        console.log('\n🎉 All API tests passed!');
        
    } catch (error) {
        console.error('❌ API Test Failed:', error.message);
        console.log('\n📋 Troubleshooting:');
        console.log('1. Make sure Phase 2 API server is running on port 3001');
        console.log('2. Check MongoDB connection');
        console.log('3. Verify API endpoints are working');
    }
}

if (require.main === module) {
    testApiConnection();
}

module.exports = testApiConnection;
```

---

## 🔐 **ชั่วโมงที่ 2: Login System + Agent Authentication**

### 🎨 **Login UI Design (20 นาที)**

**src/renderer/login.html:**

```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agent Desktop - Login</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="login-body">
    <div class="login-container">
        <div class="login-header">
            <img src="../assets/icon.png" alt="Logo" class="logo">
            <h1>Agent Desktop</h1>
            <p class="subtitle">Phase 2 - MongoDB + WebSocket API</p>
            <p class="version">Version 2.0.0</p>
        </div>
        
        <form id="loginForm" class="login-form">
            <div class="form-group">
                <label for="agentCode">รหัสเอเย่นต์ (Agent Code):</label>
                <input type="text" id="agentCode" name="agentCode" required 
                       placeholder="เช่น A001" maxlength="10"
                       pattern="[A-Z]\d{3}"
                       title="รูปแบบ: A001 (ตัวอักษร 1 ตัว + ตัวเลข 3 ตัว)">
            </div>
            
            <div class="form-group">
                <label for="password">รหัสผ่าน:</label>
                <input type="password" id="password" name="password" required 
                       placeholder="รหัสผ่าน" minlength="6">
            </div>
            
            <div class="form-group">
                <label for="serverUrl">API Server URL:</label>
                <input type="text" id="serverUrl" name="serverUrl" 
                       value="http://localhost:3001" 
                       placeholder="http://localhost:3001">
            </div>
            
            <div class="form-group">
                <label class="checkbox-container">
                    <input type="checkbox" id="rememberMe">
                    <span class="checkmark"></span>
                    จดจำการเข้าสู่ระบบ
                </label>
            </div>
            
            <button type="submit" id="loginBtn" class="btn-primary">
                <span class="btn-text">เข้าสู่ระบบ</span>
                <span class="btn-loader" style="display: none;">
                    <span class="spinner"></span>
                    กำลังเข้าสู่ระบบ...
                </span>
            </button>
            
            <div id="loginStatus" class="status-message"></div>
        </form>
        
        <div class="login-footer">
            <div class="connection-status">
                <span id="connectionIndicator" class="connection-dot offline"></span>
                <span id="connectionText">ไม่ได้เชื่อมต่อ</span>
            </div>
            <div class="api-info">
                <small>API Version: Phase 2 (MongoDB + WebSocket)</small>
            </div>
            <p class="copyright">© 2024 Agent Wallboard System</p>
        </div>
    </div>
    
    <script src="js/api-client.js"></script>
    <script src="js/login.js"></script>
</body>
</html>
```

### 🎨 **Enhanced CSS Styles (15 นาที)**

**src/renderer/css/style.css:**

```css
/* Reset & Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: #333;
}

/* Login Styles */
.login-body {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
}

.login-container {
    background: white;
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    width: 100%;
    max-width: 420px;
    backdrop-filter: blur(10px);
}

.login-header {
    text-align: center;
    margin-bottom: 30px;
}

.logo {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    border-radius: 12px;
}

.login-header h1 {
    color: #333;
    margin-bottom: 8px;
    font-size: 28px;
    font-weight: 600;
}

.subtitle {
    color: #667eea;
    font-size: 14px;
    margin-bottom: 4px;
    font-weight: 500;
}

.version {
    color: #888;
    font-size: 12px;
}

/* Form Styles */
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 6px;
    color: #333;
    font-weight: 500;
    font-size: 14px;
}

.form-group input[type="text"],
.form-group input[type="password"] {
    width: 100%;
    padding: 14px 16px;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.3s ease;
    background: #f8f9fa;
}

.form-group input:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input:invalid {
    border-color: #dc3545;
}

.form-group input:valid {
    border-color: #28a745;
}

/* Checkbox Styles */
.checkbox-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    color: #555;
}

.checkbox-container input[type="checkbox"] {
    margin-right: 8px;
}

/* Button Styles */
.btn-primary {
    width: 100%;
    padding: 14px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    position: relative;
    overflow: hidden;
}

.btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.btn-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Status Messages */
.status-message {
    text-align: center;
    padding: 12px;
    border-radius: 6px;
    margin-top: 16px;
    font-size: 14px;
    font-weight: 500;
    display: none;
}

.status-message.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.status-message.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.status-message.info {
    background: #d1ecf1;
    color: #0c5460;
    border: 1px solid #bee5eb;
}

/* Footer Styles */
.login-footer {
    text-align: center;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #e1e5e9;
}

.connection-status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 12px;
    font-size: 14px;
}

.connection-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.connection-dot.online {
    background: #28a745;
    box-shadow: 0 0 8px rgba(40, 167, 69, 0.5);
}

.connection-dot.offline {
    background: #dc3545;
}

.connection-dot.testing {
    background: #ffc107;
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.api-info {
    margin-bottom: 8px;
    color: #667eea;
    font-weight: 500;
}

.copyright {
    color: #888;
    font-size: 12px;
}

/* Main Dashboard Styles */
.app-header {
    background: white;
    padding: 16px 24px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e5e9;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 16px;
}

.header-logo {
    width: 40px;
    height: 40px;
    border-radius: 8px;
}

.header-left h1 {
    color: #333;
    font-size: 24px;
    font-weight: 600;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 20px;
}

.agent-info {
    text-align: right;
}

.agent-name {
    display: block;
    font-weight: 600;
    color: #333;
    font-size: 16px;
}

.agent-code {
    display: block;
    font-size: 12px;
    color: #666;
    margin-top: 2px;
}

.btn-secondary {
    padding: 10px 20px;
    border: 1px solid #6c757d;
    border-radius: 6px;
    background: white;
    color: #6c757d;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-secondary:hover {
    background: #6c757d;
    color: white;
}

/* Main Content */
.main-content {
    padding: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    min-height: calc(100vh - 80px);
    background: #f8f9fa;
}

/* Panel Styles */
.panel {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    border: 1px solid #e1e5e9;
}

.panel h2 {
    color: #333;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 600;
    border-bottom: 2px solid #667eea;
    padding-bottom: 8px;
}

/* Status Panel */
.current-status {
    margin-bottom: 24px;
    padding: 20px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 10px;
    border-left: 4px solid #667eea;
}

.status-label {
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
    display: block;
}

.status-badge {
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.status-available { background: #d4edda; color: #155724; }
.status-busy { background: #f8d7da; color: #721c24; }
.status-break { background: #fff3cd; color: #856404; }
.status-not-ready { background: #f5f5f5; color: #495057; }
.status-offline { background: #e2e3e5; color: #383d41; }

/* Status Controls */
.status-controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 24px;
}

.status-btn {
    padding: 14px 16px;
    border: 2px solid transparent;
    border-radius: 8px;
    background: #f8f9fa;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
}

.status-btn:hover {
    border-color: #667eea;
    background: #e7f0ff;
    transform: translateY(-2px);
}

.status-btn.active {
    border-color: #667eea;
    background: #667eea;
    color: white;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.status-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

/* Connection Status */
.connection-panel {
    margin-top: 24px;
}

.connection-status-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;
}

.connection-label {
    font-weight: 500;
    color: #333;
}

.connection-indicator {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
}

.connection-indicator.online {
    background: #d4edda;
    color: #155724;
}

.connection-indicator.offline {
    background: #f8d7da;
    color: #721c24;
}

/* Login Time */
.login-time {
    font-size: 14px;
    color: #666;
    text-align: center;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;
    margin-top: 16px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .main-content {
        grid-template-columns: 1fr;
        padding: 16px;
        gap: 16px;
    }
    
    .app-header {
        padding: 12px 16px;
        flex-direction: column;
        gap: 12px;
        text-align: center;
    }
    
    .status

controls {
        grid-template-columns: 1fr;
    }
}
```

### 🔧 **Login Logic Implementation (25 นาที)**

**src/renderer/js/login.js:**

```javascript
// Login Manager สำหรับ Phase 2 API
class LoginManager {
    constructor() {
        this.api = new ApiClient();
        this.connectionCheckInterval = null;
        this.initializeForm();
        this.startConnectionCheck();
    }

    initializeForm() {
        const loginForm = document.getElementById('loginForm');
        const loginBtn = document.getElementById('loginBtn');
        const statusDiv = document.getElementById('loginStatus');

        // Form submit handler
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Real-time validation
        const agentCodeInput = document.getElementById('agentCode');
        agentCodeInput.addEventListener('input', this.validateAgentCode);

        const passwordInput = document.getElementById('password');
        passwordInput.addEventListener('input', this.validatePassword);

        // Server URL change handler
        const serverUrlInput = document.getElementById('serverUrl');
        serverUrlInput.addEventListener('change', (e) => {
            this.api.baseURL = e.target.value + '/api';
            this.checkConnection();
        });

        // Remember me functionality
        this.loadSavedCredentials();

        // Pre-fill development data if in dev mode
        if (this.isDevelopmentMode()) {
            agentCodeInput.value = 'A001';
            passwordInput.value = 'password123';
        }
    }

    isDevelopmentMode() {
        return process.argv && process.argv.includes('--dev');
    }

    validateAgentCode(e) {
        const value = e.target.value.toUpperCase();
        e.target.value = value;
        
        const isValid = /^[A-Z]\d{3}$/.test(value);
        e.target.style.borderColor = isValid ? '#28a745' : '#dc3545';
    }

    validatePassword(e) {
        const isValid = e.target.value.length >= 6;
        e.target.style.borderColor = isValid ? '#28a745' : '#dc3545';
    }

    async startConnectionCheck() {
        await this.checkConnection();
        
        // Check connection every 10 seconds
        this.connectionCheckInterval = setInterval(() => {
            this.checkConnection();
        }, 10000);
    }

    async checkConnection() {
        const indicator = document.getElementById('connectionIndicator');
        const text = document.getElementById('connectionText');
        
        try {
            indicator.className = 'connection-dot testing';
            text.textContent = 'กำลังตรวจสอบ...';
            
            const health = await this.api.checkHealth();
            
            if (health.success) {
                indicator.className = 'connection-dot online';
                text.textContent = `เชื่อมต่อแล้ว (${health.database?.status || 'Unknown'})`;
            } else {
                throw new Error('Health check failed');
            }
        } catch (error) {
            indicator.className = 'connection-dot offline';
            text.textContent = 'ไม่สามารถเชื่อมต่อได้';
            console.error('Connection check failed:', error);
        }
    }

    async handleLogin() {
        const agentCode = document.getElementById('agentCode').value.trim().toUpperCase();
        const password = document.getElementById('password').value;
        const serverUrl = document.getElementById('serverUrl').value.trim();
        const rememberMe = document.getElementById('rememberMe').checked;
        
        const loginBtn = document.getElementById('loginBtn');
        const btnText = loginBtn.querySelector('.btn-text');
        const btnLoader = loginBtn.querySelector('.btn-loader');

        // Validation
        if (!this.validateLoginForm(agentCode, password, serverUrl)) {
            return;
        }

        // Set loading state
        this.setLoginLoading(true);

        try {
            // Update API base URL
            this.api.baseURL = serverUrl + '/api';
            
            // Step 1: Check API health
            const health = await this.api.checkHealth();
            if (!health.success) {
                throw new Error('API server is not healthy');
            }

            // Step 2: Find agent by code (Phase 2 API doesn't have direct login endpoint)
            const agentResponse = await this.api.getAgentByCode(agentCode);
            
            if (!agentResponse.success) {
                throw new Error(`ไม่พบ Agent Code "${agentCode}" ในระบบ`);
            }

            const agent = agentResponse.data;

            // Step 3: Simple password validation 
            // (In production, this would be proper authentication)
            if (!this.validatePassword(password)) {
                throw new Error('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
            }

            // Step 4: Update agent status to Available (login action)
            try {
                await this.api.updateAgentStatus(agent._id, 'Available', 'Logged in via Desktop App');
            } catch (statusError) {
                console.warn('Could not update status on login:', statusError);
                // Continue with login even if status update fails
            }

            // Step 5: Prepare user data for main window
            const userData = {
                agentId: agent._id,
                agentCode: agent.agentCode,
                agentName: agent.name,
                email: agent.email,
                department: agent.department,
                skills: agent.skills || [],
                status: agent.status,
                loginTime: new Date().toISOString(),
                serverUrl: serverUrl
            };

            // Step 6: Save credentials if requested
            if (rememberMe) {
                this.saveCredentials(agentCode, serverUrl);
            }

            // Step 7: Save login data to localStorage for main window
            localStorage.setItem('agentData', JSON.stringify(userData));
            localStorage.setItem('apiConfig', JSON.stringify({
                baseURL: serverUrl + '/api',
                wsURL: serverUrl.replace('http', 'ws')
            }));
            
            this.showStatus('เข้าสู่ระบบสำเร็จ!', 'success');
            
            // Step 8: Notify main process to open main window
            setTimeout(() => {
                const { ipcRenderer } = require('electron');
                ipcRenderer.send('login-success', userData);
            }, 1500);

        } catch (error) {
            console.error('Login error:', error);
            let errorMessage = 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
            
            if (error.message.includes('ไม่พบ Agent Code')) {
                errorMessage = error.message;
            } else if (error.message.includes('รหัสผ่าน')) {
                errorMessage = error.message;
            } else if (error.message.includes('ECONNREFUSED')) {
                errorMessage = 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาตรวจสอบ URL';
            } else if (error.message.includes('timeout')) {
                errorMessage = 'หมดเวลาการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง';
            } else {
                errorMessage = error.message || errorMessage;
            }
            
            this.showStatus(errorMessage, 'error');
        } finally {
            this.setLoginLoading(false);
        }
    }

    validateLoginForm(agentCode, password, serverUrl) {
        // Agent Code validation
        if (!agentCode) {
            this.showStatus('กรุณากรอกรหัส Agent', 'error');
            return false;
        }

        if (!/^[A-Z]\d{3}$/.test(agentCode)) {
            this.showStatus('รูปแบบรหัส Agent ไม่ถูกต้อง (เช่น A001)', 'error');
            return false;
        }

        // Password validation
        if (!password) {
            this.showStatus('กรุณากรอกรหัสผ่าน', 'error');
            return false;
        }

        if (password.length < 6) {
            this.showStatus('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร', 'error');
            return false;
        }

        // Server URL validation
        if (!serverUrl) {
            this.showStatus('กรุณากรอก Server URL', 'error');
            return false;
        }

        try {
            new URL(serverUrl);
        } catch {
            this.showStatus('รูปแบบ Server URL ไม่ถูกต้อง', 'error');
            return false;
        }

        return true;
    }

    validatePassword(password) {
        // Simple validation for demo purposes
        // In production, this would validate against database
        return password.length >= 6;
    }

    setLoginLoading(isLoading) {
        const loginBtn = document.getElementById('loginBtn');
        const btnText = loginBtn.querySelector('.btn-text');
        const btnLoader = loginBtn.querySelector('.btn-loader');
        const form = document.getElementById('loginForm');

        loginBtn.disabled = isLoading;
        
        if (isLoading) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'flex';
            form.style.pointerEvents = 'none';
        } else {
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
            form.style.pointerEvents = 'auto';
        }
    }

    showStatus(message, type) {
        const statusDiv = document.getElementById('loginStatus');
        statusDiv.textContent = message;
        statusDiv.className = `status-message ${type}`;
        statusDiv.style.display = 'block';

        // Auto hide after 5 seconds for success messages
        if (type === 'success') {
            setTimeout(() => {
                statusDiv.style.display = 'none';
            }, 5000);
        }
    }

    saveCredentials(agentCode, serverUrl) {
        try {
            const credentials = {
                agentCode,
                serverUrl,
                savedAt: new Date().toISOString()
            };
            localStorage.setItem('savedCredentials', JSON.stringify(credentials));
        } catch (error) {
            console.warn('Could not save credentials:', error);
        }
    }

    loadSavedCredentials() {
        try {
            const saved = localStorage.getItem('savedCredentials');
            if (saved) {
                const credentials = JSON.parse(saved);
                
                // Only auto-fill if saved within last 30 days
                const savedDate = new Date(credentials.savedAt);
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                
                if (savedDate > thirtyDaysAgo) {
                    document.getElementById('agentCode').value = credentials.agentCode || '';
                    document.getElementById('serverUrl').value = credentials.serverUrl || 'http://localhost:3001';
                    document.getElementById('rememberMe').checked = true;
                }
            }
        } catch (error) {
            console.warn('Could not load saved credentials:', error);
        }
    }

    cleanup() {
        if (this.connectionCheckInterval) {
            clearInterval(this.connectionCheckInterval);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loginManager = new LoginManager();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        loginManager.cleanup();
    });
});

// Handle window focus for better UX
window.addEventListener('focus', () => {
    document.getElementById('agentCode').focus();
});
```

---

## 📊 **ชั่วโมงที่ 3: Status Management + Database Integration**

### 🏠 **Main Dashboard HTML (20 นาที)**

**src/renderer/index.html:**

```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agent Desktop - Dashboard</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Header -->
    <header class="app-header">
        <div class="header-left">
            <img src="../assets/icon.png" alt="Logo" class="header-logo">
            <div class="header-info">
                <h1>Agent Dashboard</h1>
                <span class="api-version">Phase 2 - MongoDB + WebSocket</span>
            </div>
        </div>
        
        <div class="header-right">
            <div class="agent-info">
                <span class="agent-name" id="agentName">Loading...</span>
                <span class="agent-code" id="agentCode">---</span>
            </div>
            <button id="logoutBtn" class="btn-secondary">ออกจากระบบ</button>
        </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
        <!-- Status Management Panel -->
        <section class="panel status-panel">
            <h2>🔄 การจัดการสถานะ</h2>
            
            <div class="current-status">
                <span class="status-label">สถานะปัจจุบัน:</span>
                <span id="currentStatus" class="status-badge status-offline">Offline</span>
                <small class="status-time">อัพเดทล่าสุด: <span id="lastStatusUpdate">--:--:--</span></small>
            </div>
            
            <div class="status-controls">
                <button class="status-btn" data-status="Available" title="พร้อมรับงาน">
                    🟢 Available
                </button>
                <button class="status-btn" data-status="Busy" title="ไม่ว่าง">
                    🔴 Busy
                </button>
                <button class="status-btn" data-status="Break" title="พักเบรก">
                    🟡 Break
                </button>
                <button class="status-btn" data-status="Not Ready" title="ไม่พร้อม">
                    ⚫ Not Ready
                </button>
            </div>
            
            <div class="status-reason">
                <input type="text" id="statusReason" placeholder="เหตุผล (ไม่บังคับ)" maxlength="200">
            </div>
            
            <div class="login-time">
                <span>เข้าสู่ระบบเมื่อ: </span>
                <span id="loginTime">--:--:--</span>
            </div>
        </section>

        <!-- Messages Panel -->
        <section class="panel messages-panel">
            <h2>💬 ข้อความ</h2>
            
            <div class="messages-header">
                <div class="message-tabs">
                    <button class="tab-btn active" data-tab="received">
                        ได้รับ (<span id="receivedCount">0</span>)
                    </button>
                    <button class="tab-btn" data-tab="sent">
                        ส่งแล้ว (<span id="sentCount">0</span>)
                    </button>
                </div>
                <button id="composeBtn" class="btn-primary btn-small">เขียนข้อความ</button>
            </div>
            
            <div class="message-content">
                <div id="receivedMessages" class="tab-content active">
                    <div class="message-list" id="receivedMessageList">
                        <div class="no-messages">ยังไม่มีข้อความที่ได้รับ</div>
                    </div>
                </div>
                
                <div id="sentMessages" class="tab-content">
                    <div class="message-list" id="sentMessageList">
                        <div class="no-messages">ยังไม่มีข้อความที่ส่ง</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Connection Status Panel -->
        <section class="panel connection-panel">
            <h2>🌐 สถานะการเชื่อมต่อ</h2>
            
            <div class="connection-status-item">
                <span class="connection-label">API Server:</span>
                <span id="apiStatus" class="connection-indicator offline">Disconnected</span>
            </div>
            
            <div class="connection-status-item">
                <span class="connection-label">WebSocket:</span>
                <span id="wsStatus" class="connection-indicator offline">Disconnected</span>
            </div>
            
            <div class="connection-status-item">
                <span class="connection-label">Database:</span>
                <span id="dbStatus" class="connection-indicator offline">Unknown</span>
            </div>
            
            <div class="connection-actions">
                <button id="reconnectBtn" class="btn-secondary btn-small">เชื่อมต่อใหม่</button>
                <button id="testConnectionBtn" class="btn-secondary btn-small">ทดสอบการเชื่อมต่อ</button>
            </div>
        </section>

        <!-- Statistics Panel -->
        <section class="panel stats-panel">
            <h2>📊 สถิติวันนี้</h2>
            
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number" id="totalCalls">0</div>
                    <div class="stat-label">สายทั้งหมด</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="onlineTime">00:00:00</div>
                    <div class="stat-label">เวลาออนไลน์</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="messagesCount">0</div>
                    <div class="stat-label">ข้อความ</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="statusChanges">0</div>
                    <div class="stat-label">เปลี่ยนสถานะ</div>
                </div>
            </div>
        </section>

        <!-- Quick Actions Panel -->
        <section class="panel actions-panel">
            <h2>⚡ การดำเนินการ</h2>
            
            <div class="action-buttons">
                <button class="action-btn" id="refreshBtn" title="รีเฟรชข้อมูล">
                    🔄 รีเฟรช
                </button>
                <button class="action-btn" id="settingsBtn" title="ตั้งค่า">
                    ⚙️ ตั้งค่า
                </button>
                <button class="action-btn" id="helpBtn" title="ช่วยเหลือ">
                    ❓ ช่วยเหลือ
                </button>
                <button class="action-btn" id="soundToggleBtn" title="เปิด/ปิดเสียง">
                    🔊 เสียง
                </button>
            </div>
            
            <div class="system-info">
                <small>
                    <div>Version: 2.0.0</div>
                    <div>Agent ID: <span id="systemAgentId">---</span></div>
                    <div>Session: <span id="sessionId">---</span></div>
                </small>
            </div>
        </section>

        <!-- Real-time Updates Panel -->
        <section class="panel realtime-panel">
            <h2>⚡ อัพเดทสด</h2>
            
            <div class="realtime-feed" id="realtimeFeed">
                <div class="feed-item welcome">
                    <span class="feed-time">--:--:--</span>
                    <span class="feed-message">ยินดีต้อนรับสู่ระบบ Agent Desktop</span>
                </div>
            </div>
        </section>
    </main>

    <!-- Message Compose Modal -->
    <div id="composeModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>เขียนข้อความ</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="composeForm">
                    <div class="form-group">
                        <label for="recipientSelect">ส่งถึง:</label>
                        <select id="recipientSelect" required>
                            <option value="">เลือกผู้รับ</option>
                            <option value="ALL">ทุกคน (Broadcast)</option>
                            <option value="supervisor">Supervisor</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="messageType">ประเภทข้อความ:</label>
                        <select id="messageType">
                            <option value="message">ข้อความทั่วไป</option>
                            <option value="alert">แจ้งเตือน</option>
                            <option value="broadcast">ประกาศ</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="messagePriority">ความสำคัญ:</label>
                        <select id="messagePriority">
                            <option value="normal">ปกติ</option>
                            <option value="high">สูง</option>
                            <option value="urgent">เร่งด่วน</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="messageText">ข้อความ:</label>
                        <textarea id="messageText" rows="4" required 
                                  placeholder="พิมพ์ข้อความของคุณ..." 
                                  maxlength="1000"></textarea>
                        <small class="char-counter">0/1000 ตัวอักษร</small>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" id="cancelBtn">ยกเลิก</button>
                        <button type="submit" class="btn-primary">ส่งข้อความ</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="js/api-client.js"></script>
    <script src="js/websocket-manager.js"></script>
    <script src="js/message-manager.js"></script>
    <script src="js/notification-manager.js"></script>
    <script src="js/utils.js"></script>
    <script src="js/dashboard.js"></script>
</body>
</html>
```

### 🔧 **Dashboard Logic Implementation (40 นาที)**

**src/renderer/js/dashboard.js:**

```javascript
// Main Dashboard Controller สำหรับ Phase 2 API
class AgentDashboard {
    constructor() {
        // Core properties
        this.agentData = null;
        this.apiConfig = null;
        this.currentStatus = 'Offline';
        this.statusUpdateCount = 0;
        
        // Timers and intervals
        this.statusSyncInterval = null;
        this.onlineTimer = null;
        this.onlineStartTime = null;
        this.realtimeUpdateInterval = null;
        
        // Component managers
        this.api = null;
        this.wsManager = null;
        this.messageManager = null;
        this.notificationManager = null;
        
        // Initialize
        this.initialize();
    }

    async initialize() {
        try {
            console.log('🚀 Initializing Agent Dashboard...');
            
            // Load configuration and agent data
            await this.loadConfiguration();
            
            // Initialize API client
            this.initializeApiClient();
            
            // Setup UI
            this.setupUI();
            this.setupEventListeners();
            
            // Initialize component managers
            await this.initializeManagers();
            
            // Start services
            this.startServices();
            
            // Load initial data
            await this.loadInitialData();
            
            console.log('✅ Agent Dashboard initialized successfully');
            this.addRealtimeUpdate('ระบบเริ่มต้นสำเร็จ', 'success');
            
        } catch (error) {
            console.error('❌ Dashboard initialization error:', error);
            this.showError('เกิดข้อผิดพลาดในการเริ่มต้นระบบ: ' + error.message);
            
            // Fallback to logout if initialization fails
            setTimeout(() => this.logout(), 3000);
        }
    }

    async loadConfiguration() {
        // Load agent data from localStorage
        const savedAgentData = localStorage.getItem('agentData');
        const savedApiConfig = localStorage.getItem('apiConfig');
        
        if (!savedAgentData || !savedApiConfig) {
            throw new Error('ไม่พบข้อมูลการเข้าสู่ระบบ กรุณาเข้าสู่ระบบใหม่');
        }

        this.agentData = JSON.parse(savedAgentData);
        this.apiConfig = JSON.parse(savedApiConfig);
        
        console.log('📋 Loaded agent data:', this.agentData.agentCode);
        console.log('🔗 API Config:', this.apiConfig.baseURL);
    }

    initializeApiClient() {
        this.api = new ApiClient();
        this.api.baseURL = this.apiConfig.baseURL;
    }

    setupUI() {
        // Update header information
        document.getElementById('agentName').textContent = this.agentData.agentName;
        document.getElementById('agentCode').textContent = this.agentData.agentCode;
        document.getElementById('systemAgentId').textContent = this.agentData.agentId;
        
        // Set current status
        this.currentStatus = this.agentData.status || 'Available';
        this.updateStatusDisplay();
        
        // Format and display login time
        const loginTime = new Date(this.agentData.loginTime);
        document.getElementById('loginTime').textContent = 
            loginTime.toLocaleString('th-TH', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

        // Generate session ID
        const sessionId = this.generateSessionId();
        document.getElementById('sessionId').textContent = sessionId;
    }

    setupEventListeners() {
        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.confirmLogout();
        });

        // Status buttons
        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const newStatus = e.target.getAttribute('data-status');
                const reason = document.getElementById('statusReason').value.trim();
                this.changeStatus(newStatus, reason);
            });
        });

        // Status reason input - clear on Enter
        document.getElementById('statusReason').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                // Trigger status change of currently active status
                const activeBtn = document.querySelector('.status-btn.active');
                if (activeBtn) {
                    const status = activeBtn.getAttribute('data-status');
                    this.changeStatus(status, e.target.value.trim());
                }
            }
        });

        // Quick action buttons
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.refreshData();
        });

        document.getElementById('settingsBtn').addEventListener('click', () => {
            this.openSettings();
        });

        document.getElementById('helpBtn').addEventListener('click', () => {
            this.showHelp();
        });

        document.getElementById('soundToggleBtn').addEventListener('click', () => {
            this.toggleSound();
        });

        // Connection actions
        document.getElementById('reconnectBtn').addEventListener('click', () => {
            this.reconnectAll();
        });

        document.getElementById('testConnectionBtn').addEventListener('click', () => {
            this.testAllConnections();
        });

        // Window and app event listeners
        const { ipcRenderer } = require('electron');
        ipcRenderer.on('app-closing', () => {
            this.handleAppClosing();
        });

        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });

        window.addEventListener('focus', () => {
            this.onWindowFocus();
        });

        window.addEventListener('blur', () => {
            this.onWindowBlur();
        });
    }

    async initializeManagers() {
        try {
            // Initialize WebSocket Manager
            this.wsManager = new WebSocketManager(
                this.apiConfig.wsURL,
                this.agentData.agentCode,
                this.agentData.agentName
            );
            
            // Set up WebSocket event handlers
            this.wsManager.onStatusUpdate = (data) => {
                this.handleRemoteStatusUpdate(data);
            };
            
            this.wsManager.onMessage = (data) => {
                this.handleNewMessage(data);
            };
            
            this.wsManager.onConnectionChange = (isConnected) => {
                this.updateConnectionStatus('websocket', isConnected);
            };

            // Initialize Message Manager
            this.messageManager = new MessageManager(this.api, this.agentData.agentCode);
            
            // Initialize Notification Manager
            this.notificationManager = new NotificationManager();
            
            console.log('✅ All managers initialized');
            
        } catch (error) {
            console.error('❌ Manager initialization error:', error);
            throw error;
        }
    }

    startServices() {
        // Start online timer
        this.startOnlineTimer();
        
        // Start status sync
        this.startStatusSync();
        
        // Start realtime updates
        this.startRealtimeUpdates();
        
        console.log('✅ All services started');
    }

    async loadInitialData() {
        try {
            // Check API connection
            await this.checkApiConnection();
            
            // Sync current status with server
            await this.syncAgentStatus();
            
            // Load messages
            if (this.messageManager) {
                await this.messageManager.loadMessages();
                this.updateMessageCounts();
            }
            
            // Load statistics
            this.loadStatistics();
            
        } catch (error) {
            console.error('Error loading initial data:', error);
            this.addRealtimeUpdate('ไม่สามารถโหลดข้อมูลเริ่มต้นได้: ' + error.message, 'error');
        }
    }

    async changeStatus(newStatus, reason = '') {
        if (newStatus === this.currentStatus) {
            this.addRealtimeUpdate(`สถานะเป็น ${newStatus} อยู่แล้ว`, 'info');
            return;
        }

        const previousStatus = this.currentStatus;

        try {
            // Show loading state
            this.setStatusLoading(true);
            this.addRealtimeUpdate(`กำลังเปลี่ยนสถานะเป็น ${newStatus}...`, 'info');

            // Update via API using agent ID from Phase 2
            const response = await this.api.updateAgentStatus(
                this.agentData.agentId, 
                newStatus, 
                reason || null
            );

            if (response.success) {
                // Update local state
                this.currentStatus = newStatus;
                this.statusUpdateCount++;
                this.updateStatusDisplay();
                
                // Clear reason input
                document.getElementById('statusReason').value = '';
                
                // Update statistics
                this.updateStatistics();
                
                // Send WebSocket update if connected
                if (this.wsManager && this.wsManager.isConnected) {
                    this.wsManager.sendStatusUpdate({
                        agentCode: this.agentData.agentCode,
                        status: newStatus,
                        reason: reason,
                        timestamp: new Date().toISOString()
                    });
                }
                
                this.addRealtimeUpdate(
                    `เปลี่ยนสถานะจาก ${previousStatus} เป็น ${newStatus} สำเร็จ`, 
                    'success'
                );
                
                // Show notification
                if (this.notificationManager) {
                    this.notificationManager.showNotification(
                        'เปลี่ยนสถานะสำเร็จ',
                        `สถานะเปลี่ยนเป็น ${newStatus}`,
                        'success'
                    );
                }
                
            } else {
                throw new Error(response.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Status change error:', error);
            
            let errorMessage = 'ไม่สามารถเปลี่ยนสถานะได้';
            
            if (error.message.includes('transition')) {
                errorMessage = error.message;
            } else if (error.message.includes('not found')) {
                errorMessage = 'ไม่พบข้อมูล Agent ในระบบ';
            } else if (error.message.includes('timeout')) {
                errorMessage = 'หมดเวลาการเชื่อมต่อ';
            }
            
            this.addRealtimeUpdate(`เปลี่ยนสถานะล้มเหลว: ${errorMessage}`, 'error');
            
            if (this.notificationManager) {
                this.notificationManager.showNotification(
                    'เปลี่ยนสถานะล้มเหลว',
                    errorMessage,
                    'error'
                );
            }
        } finally {
            this.setStatusLoading(false);
        }
    }

    setStatusLoading(isLoading) {
        const statusButtons = document.querySelectorAll('.status-btn');
        statusButtons.forEach(btn => {
            btn.disabled = isLoading;
            btn.style.opacity = isLoading ? '0.5' : '1';
        });
        
        const reasonInput = document.getElementById('statusReason');
        reasonInput.disabled = isLoading;
    }

    updateStatusDisplay() {
        const statusBadge = document.getElementById('currentStatus');
        const statusButtons = document.querySelectorAll('.status-btn');
        const lastUpdate = document.getElementById('lastStatusUpdate');

        // Update status badge
        statusBadge.textContent = this.currentStatus;
        statusBadge.className = `status-badge status-${this.currentStatus.toLowerCase().replace(' ', '-')}`;

        // Update active button
        statusButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-status') === this.currentStatus) {
                btn.classList.add('active');
            }
        });
        
        // Update last update time
        lastUpdate.textContent = new Date().toLocaleTimeString('th-TH');
        
        // Update window title
        document.title = `Agent Desktop - ${this.agentData.agentCode} (${this.currentStatus})`;
    }

    async checkApiConnection() {
        try {
            const health = await this.api.checkHealth();
            const isConnected = health.success;
            
            this.updateConnectionStatus('api', isConnected);
            
            if (isConnected && health.database) {
                this.updateConnectionStatus('database', health.database.status === 'Connected');
            }
            
            return isConnected;
        } catch (error) {
            console.error('API connection check failed:', error);
            this.updateConnectionStatus('api', false);
            this.updateConnectionStatus('database', false);
            return false;
        }
    }

    updateConnectionStatus(type, isConnected) {
        const statusElements = {
            'api': document.getElementById('apiStatus'),
            'websocket': document.getElementById('wsStatus'),
            'database': document.getElementById('dbStatus')
        };
        
        const element = statusElements[type];
        if (element) {
            element.textContent = isConnected ? 'Connected' : 'Disconnected';
            element.className = `connection-indicator ${isConnected ? 'online' : 'offline'}`;
        }
    }

    async syncAgentStatus() {
        try {
            const response = await this.api.getAgentById(this.agentData.agentId);
            
            if (response.success) {
                const serverStatus = response.data.status;
                if (serverStatus !== this.currentStatus) {
                    console.log(`Status sync: ${this.currentStatus} -> ${serverStatus}`);
                    this.currentStatus = serverStatus;
                    this.updateStatusDisplay();
                    this.addRealtimeUpdate(
                        `สถานะถูกอัพเดทจากเซิร์ฟเวอร์: ${serverStatus}`, 
                        'info'
                    );
                }
            }
        } catch (error) {
            console.error('Status sync error:', error);
        }
    }

    startStatusSync() {
        // Sync with server every 30 seconds
        this.statusSyncInterval = setInterval(async () => {
            if (await this.checkApiConnection()) {
                await this.syncAgentStatus();
            }
        }, 30000);
    }

    startOnlineTimer() {
        this.onlineStartTime = new Date();
        
        this.onlineTimer = setInterval(() => {
            this.updateOnlineTime();
        }, 1000);
    }

    updateOnlineTime() {
        if (this.onlineStartTime) {
            const now = new Date();
            const diffMs = now - this.onlineStartTime;
            const hours = Math.floor(diffMs / (1000 * 60 * 60));
            const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
            
            const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            document.getElementById('onlineTime').textContent = timeString;
        }
    }

    startRealtimeUpdates() {
        this.realtimeUpdateInterval = setInterval(() => {
            this.updateStatistics();
        }, 5000);
    }

    updateStatistics() {
        // Update status changes count
        document.getElementById('statusChanges').textContent = this.statusUpdateCount;
        
        // Update message counts if message manager exists
        if (this.messageManager) {
            this.updateMessageCounts();
        }
        
        // Other statistics would be updated here
        // document.getElementById('totalCalls').textContent = this.callCount;
    }

    updateMessageCounts() {
        if (this.messageManager) {
            const received = this.messageManager.getReceivedCount();
            const sent = this.messageManager.getSentCount();
            
            document.getElementById('receivedCount').textContent = received;
            document.getElementById('sentCount').textContent = sent;
            document.getElementById('messagesCount').textContent = received + sent;
        }
    }

    loadStatistics() {
        try {
            const saved = localStorage.getItem(`agentStats_${this.agentData.agentCode}`);
            if (saved) {
                const stats = JSON.parse(saved);
                // Apply saved statistics to UI
                Object.keys(stats).forEach(key => {
                    const element = document.getElementById(key);
                    if (element) {
                        element.textContent = stats[key];
                    }
                });
            }
        } catch (error) {
            console.error('Error loading statistics:', error);
        }
    }

    saveStatistics() {
        try {
            const stats = {
                statusChanges: this.statusUpdateCount,
                totalCalls: document.getElementById('totalCalls').textContent,
                messagesCount: document.getElementById('messagesCount').textContent
            };
            
            localStorage.setItem(
                `agentStats_${this.agentData.agentCode}`, 
                JSON.stringify(stats)
            );
        } catch (error) {
            console.error('Error saving statistics:', error);
        }
    }

    addRealtimeUpdate(message, type = 'info') {
        const feed = document.getElementById('realtimeFeed');
        const feedItem = document.createElement('div');
        feedItem.className = `feed-item ${type}`;
        
        const time = new Date().toLocaleTimeString('th-TH');
        feedItem.innerHTML = `
            <span class="feed-time">${time}</span>
            <span class="feed-message">${message}</span>
        `;
        
        feed.insertBefore(feedItem, feed.firstChild);
        
        // Keep only last 50 items
        while (feed.children.length > 50) {
            feed.removeChild(feed.lastChild);
        }
    }

    async refreshData() {
        try {
            this.addRealtimeUpdate('กำลังรีเฟรชข้อมูล...', 'info');
            
            const refreshPromises = [
                this.checkApiConnection(),
                this.syncAgentStatus()
            ];
            
            if (this.messageManager) {
                refreshPromises.push(this.messageManager.loadMessages());
            }
            
            await Promise.allSettled(refreshPromises);
            
            this.updateMessageCounts();
            this.addRealtimeUpdate('รีเฟรชข้อมูลเรียบร้อยแล้ว', 'success');
            
        } catch (error) {
            console.error('Refresh data error:', error);
            this.addRealtimeUpdate('ไม่สามารถรีเฟรชข้อมูลได้', 'error');
        }
    }

    async reconnectAll() {
        try {
            this.addRealtimeUpdate('กำลังเชื่อมต่อใหม่...', 'info');
            
            // Reconnect API
            await this.checkApiConnection();
            
            // Reconnect WebSocket
            if (this.wsManager) {
                await this.wsManager.reconnect();
            }
            
            this.addRealtimeUpdate('เชื่อมต่อใหม่เรียบร้อยแล้ว', 'success');
            
        } catch (error) {
            console.error('Reconnect error:', error);
            this.addRealtimeUpdate('ไม่สามารถเชื่อมต่อใหม่ได้', 'error');
        }
    }

    async testAllConnections() {
        this.addRealtimeUpdate('กำลังทดสอบการเชื่อมต่อ...', 'info');
        
        try {
            // Test API
            const apiResult = await this.checkApiConnection();
            this.addRealtimeUpdate(
                `API: ${apiResult ? 'เชื่อมต่อได้' : 'ไม่สามารถเชื่อมต่อได้'}`, 
                apiResult ? 'success' : 'error'
            );
            
            // Test WebSocket
            const wsResult = this.wsManager ? this.wsManager.isConnected : false;
            this.addRealtimeUpdate(
                `WebSocket: ${wsResult ? 'เชื่อมต่อได้' : 'ไม่สามารถเชื่อมต่อได้'}`, 
                wsResult ? 'success' : 'error'
            );
            
        } catch (error) {
            console.error('Connection test error:', error);
            this.addRealtimeUpdate('ทดสอบการเชื่อมต่อล้มเหลว', 'error');
        }
    }

    openSettings() {
        this.addRealtimeUpdate('เปิดหน้าตั้งค่า', 'info');
        // Settings functionality would be implemented here
        alert('ฟีเจอร์การตั้งค่าจะพัฒนาในเวอร์ชันต่อไป');
    }

    showHelp() {
        const helpContent = `
วิธีใช้งาน Agent Desktop Phase 2

การเปลี่ยนสถานะ:
• คลิกปุ่มสถานะที่ต้องการ
• ใส่เหตุผล (ไม่บังคับ) แล้วกด Enter
• สถานะจะอัพเดทในฐานข้อมูล MongoDB

การส่งข้อความ:
• คลิก "เขียนข้อความ" ในแผง Messages
• เลือกผู้รับและประเภทข้อความ
• ข้อความจะส่งผ่าน WebSocket แบบ Real-time

การเชื่อมต่อ:
• ตรวจสอบสถานะการเชื่อมต่อในแผง Connection
• ใช้ปุ่ม "เชื่อมต่อใหม่" หากมีปัญหา

ปุ่มลัด:
• F12: Developer Tools
• Ctrl+R: รีเฟรชแอป
• Ctrl+Q: ออกจากระบบ
        `;
        
        alert(helpContent);
    }

    toggleSound() {
        // Sound toggle functionality would be implemented here
        const btn = document.getElementById('soundToggleBtn');
        const isEnabled = btn.textContent.includes('🔊');
        
        btn.textContent = isEnabled ? '🔇 เสียง' : '🔊 เสียง';
        this.addRealtimeUpdate(
            `${isEnabled ? 'ปิด' : 'เปิด'}เสียงแจ้งเตือน`, 
            'info'
        );
    }

    // Event handlers for external communication
    handleRemoteStatusUpdate(data) {
        if (data.agentCode === this.agentData.agentCode) {
            const oldStatus = this.currentStatus;
            this.currentStatus = data.status;
            this.updateStatusDisplay();
            
            this.addRealtimeUpdate(
                `สถานะถูกอัพเดทจากระบบภายนอก: ${data.status}`, 
                'info'
            );
        }
    }

    handleNewMessage(data) {
        this.addRealtimeUpdate(
            `ข้อความใหม่จาก ${data.from}: ${data.message.substring(0, 50)}...`, 
            'success'
        );
        
        if (this.messageManager) {
            this.messageManager.handleNewMessage(data);
            this.updateMessageCounts();
        }
        
        if (this.notificationManager) {
            this.notificationManager.showNotification(
                `ข้อความใหม่จาก ${data.from}`,
                data.message,
                'message'
            );
        }
    }

    onWindowFocus() {
        console.log('Window focused');
        // Resume polling or refresh data
        this.refreshData();
    }

    onWindowBlur() {
        console.log('Window blurred');
        // Reduce polling frequency or save state
    }

    showError(message) {
        this.addRealtimeUpdate(message, 'error');
        
        if (this.notificationManager) {
            this.notificationManager.showNotification(
                'เกิดข้อผิดพลาด',
                message,
                'error'
            );
        }
    }

    confirmLogout() {
        const shouldLogout = confirm(
            'คุณต้องการออกจากระบบหรือไม่?\n\nการออกจากระบบจะเปลี่ยนสถานะเป็น Offline'
        );
        
        if (shouldLogout) {
            this.logout();
        }
    }

    async handleAppClosing() {
        console.log('App closing initiated...');
        
        try {
            this.addRealtimeUpdate('กำลังออกจากระบบ...', 'info');
            
            // Set status to offline before closing
            if (this.currentStatus !== 'Offline') {
                await this.api.updateAgentStatus(
                    this.agentData.agentId, 
                    'Offline',
                    'Logged out from Desktop App'
                );
            }
        } catch (error) {
            console.error('Error setting offline status:', error);
        }
        
        this.cleanup();
        
        const { ipcRenderer } = require('electron');
        ipcRenderer.send('app-ready-to-close');
    }

    async logout() {
        console.log('Logout initiated...');
        
        try {
            // Set status to offline
            if (this.currentStatus !== 'Offline') {
                await this.api.updateAgentStatus(
                    this.agentData.agentId, 
                    'Offline',
                    'Manual logout'
                );
            }
        } catch (error) {
            console.error('Logout status update error:', error);
        }

        this.cleanup();
        
        // Clear saved data
        localStorage.removeItem('agentData');
        localStorage.removeItem('apiConfig');
        
        const { ipcRenderer } = require('electron');
        ipcRenderer.send('logout');
    }

    cleanup() {
        console.log('Cleaning up resources...');
        
        // Clear all intervals
        if (this.statusSyncInterval) {
            clearInterval(this.statusSyncInterval);
            this.statusSyncInterval = null;
        }
        
        if (this.onlineTimer) {
            clearInterval(this.onlineTimer);
            this.onlineTimer = null;
        }
        
        if (this.realtimeUpdateInterval) {
            clearInterval(this.realtimeUpdateInterval);
            this.realtimeUpdateInterval = null;
        }
        
        // Disconnect WebSocket
        if (this.wsManager) {
            this.wsManager.disconnect();
            this.wsManager = null;
        }
        
        // Save final statistics
        this.saveStatistics();
        
        console.log('Cleanup completed');
    }

    generateSessionId() {
        return `${this.agentData.agentCode}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Agent Dashboard...');
    window.agentDashboard = new AgentDashboard();
});

// Handle page unload
window.addEventListener('beforeunload', (event) => {
    if (window.agentDashboard) {
        window.agentDashboard.cleanup();
    }
});
```

---

## 🌐 **ชั่วโมงที่ 4: WebSocket Integration + Real-time Updates**

### 🔌 **WebSocket Manager Implementation (30 นาที)**

**src/renderer/js/websocket-manager.js:**

```javascript
// WebSocket Manager สำหรับ Phase 2 API Integration
class WebSocketManager {
    constructor(serverUrl, agentCode, agentName) {
        this.serverUrl = serverUrl;
        this.agentCode = agentCode;
        this.agentName = agentName;
        this.socket = null;
        this.isConnected = false;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectInterval = 2000;
        
        // Event handlers
        this.onConnectionChange = null;
        this.onStatusUpdate = null;
        this.onMessage = null;
        this.onNotification = null;
        
        this.connect();
    }

    connect() {
        try {
            console.log(`🔌 Connecting to WebSocket: ${this.serverUrl}`);
            
            // Import socket.io-client
            const io = require('socket.io-client');
            
            this.socket = io(this.serverUrl, {
                transports: ['websocket', 'polling'],
                timeout: 5000,
                autoConnect: true,
                reconnection: true,
                reconnectionAttempts: this.maxReconnectAttempts,
                reconnectionDelay: this.reconnectInterval
            });

            this.setupEventHandlers();
            
        } catch (error) {
            console.error('❌ WebSocket connection error:', error);
            this.handleConnectionChange(false);
            this.scheduleReconnect();
        }
    }

    setupEventHandlers() {
        this.socket.on('connect', () => {
            console.log('✅ WebSocket connected');
            this.isConnected = true;
            this.reconnectAttempts = 0;
            
            // Send agent login event (Phase 2 API expects this)
            this.socket.emit('agent-login', {
                agentCode: this.agentCode,
                agentName: this.agentName,
                timestamp: new Date().toISOString()
            });
            
            this.handleConnectionChange(true);
        });

        this.socket.on('disconnect', (reason) => {
            console.log('❌ WebSocket disconnected:', reason);
            this.isConnected = false;
            this.handleConnectionChange(false);
            
            if (reason === 'io server disconnect') {
                // Server disconnected, try to reconnect
                this.scheduleReconnect();
            }
        });

        this.socket.on('connect_error', (error) => {
            console.error('❌ WebSocket connection error:', error);
            this.isConnected = false;
            this.handleConnectionChange(false);
            this.scheduleReconnect();
        });

        // Phase 2 API WebSocket Events
        this.socket.on('login-success', (data) => {
            console.log('✅ Agent login successful:', data);
        });

        this.socket.on('login-error', (data) => {
            console.error('❌ Agent login failed:', data);
        });

        this.socket.on('agentStatusChanged', (data) => {
            console.log('📊 Status update received:', data);
            if (this.onStatusUpdate) {
                this.onStatusUpdate(data);
            }
        });

        this.socket.on('newMessage', (data) => {
            console.log('💬 New message received:', data);
            if (this.onMessage) {
                this.onMessage(data);
            }
        });

        this.socket.on('agentCreated', (data) => {
            console.log('👤 Agent created:', data);
        });

        this.socket.on('agentUpdated', (data) => {
            console.log('✏️ Agent updated:', data);
        });

        this.socket.on('agentDeleted', (data) => {
            console.log('🗑️ Agent deleted:', data);
        });

        this.socket.on('agent-online', (data) => {
            console.log('🟢 Agent online:', data);
        });

        this.socket.on('agent-offline', (data) => {
            console.log('🔴 Agent offline:', data);
        });

        this.socket.on('dashboardUpdate', (data) => {
            console.log('📊 Dashboard update:', data);
        });

        this.socket.on('messageRead', (data) => {
            console.log('👁️ Message read:', data);
        });

        // Generic notification handler
        this.socket.on('notification', (data) => {
            console.log('🔔 Notification received:', data);
            if (this.onNotification) {
                this.onNotification(data);
            }
        });

        // Ping-pong for connection health
        this.socket.on('pong', () => {
            console.log('🏓 Pong received');
        });
    }

    sendStatusUpdate(statusData) {
        if (this.isConnected && this.socket) {
            console.log('📤 Sending status update:', statusData);
            this.socket.emit('status-change', statusData);
        } else {
            console.warn('⚠️ Cannot send status update - not connected');
        }
    }

    sendMessage(messageData) {
        if (this.isConnected && this.socket) {
            console.log('📤 Sending message:', messageData);
            this.socket.emit('send-message', messageData);
        } else {
            console.warn('⚠️ Cannot send message - not connected');
        }
    }

    joinDashboard() {
        if (this.isConnected && this.socket) {
            console.log('📊 Joining dashboard room');
            this.socket.emit('join-dashboard');
        }
    }

    sendHeartbeat() {
        if (this.isConnected && this.socket) {
            this.socket.emit('ping');
        }
    }

    logout() {
        if (this.isConnected && this.socket) {
            console.log('🚪 Sending logout event');
            this.socket.emit('agent-logout', {
                agentCode: this.agentCode,
                timestamp: new Date().toISOString()
            });
        }
    }

    async reconnect() {
        this.disconnect();
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.connect();
    }

    scheduleReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            const delay = this.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1);
            
            console.log(`🔄 Scheduling reconnect attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms`);
            
            setTimeout(() => {
                if (!this.isConnected) {
                    this.connect();
                }
            }, delay);
        } else {
            console.error('❌ Max reconnection attempts reached');
        }
    }

    handleConnectionChange(isConnected) {
        this.isConnected = isConnected;
        
        if (this.onConnectionChange) {
            this.onConnectionChange(isConnected);
        }
    }

    disconnect() {
        if (this.socket) {
            console.log('🔌 Disconnecting WebSocket');
            this.socket.disconnect();
            this.socket = null;
        }
        this.isConnected = false;
    }

    getConnectionInfo() {
        return {
            isConnected: this.isConnected,
            serverUrl: this.serverUrl,
            agentCode: this.agentCode,
            reconnectAttempts: this.reconnectAttempts
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WebSocketManager;
} else {
    window.WebSocketManager = WebSocketManager;
}
```

### 💬 **Message Manager Implementation (30 นาที)**

**src/renderer/js/message-manager.js:**

```javascript
// Message Manager สำหรับ Phase 2 API
class MessageManager {
    constructor(apiClient, agentCode) {
        this.api = apiClient;
        this.agentCode = agentCode;
        this.receivedMessages = [];
        this.sentMessages = [];
        this.unreadCount = 0;
        
        this.initializeUI();
    }

    initializeUI() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.getAttribute('data-tab'));
            });
        });

        // Compose modal
        document.getElementById('composeBtn').addEventListener('click', () => {
            this.openComposeModal();
        });

        document.querySelector('.modal-close').addEventListener('click', () => {
            this.closeComposeModal();
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeComposeModal();
        });

        document.getElementById('composeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendMessage();
        });

        // Close modal on outside click
        document.getElementById('composeModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeComposeModal();
            }
        });

        // Character counter for message text
        const messageText = document.getElementById('messageText');
        const charCounter = document.querySelector('.char-counter');
        
        messageText.addEventListener('input', (e) => {
            const length = e.target.value.length;
            charCounter.textcontrols {        
             Content = `${length}/1000 ตัวอักษร`;
            });
        }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}Messages`).classList.add('active');
    }

    async loadMessages() {
        try {
            console.log('📬 Loading messages for agent:', this.agentCode);
            
            const response = await this.api.getMessagesForAgent(this.agentCode, {
                limit: 50,
                page: 1
            });
            
            if (response.success) {
                // Separate received and sent messages
                this.receivedMessages = response.data.messages.filter(msg => 
                    msg.to === this.agentCode || msg.to === 'ALL'
                );
                
                this.sentMessages = response.data.messages.filter(msg => 
                    msg.from === this.agentCode
                );
                
                this.unreadCount = response.data.unreadCount || 0;
                
                this.renderMessages();
                
                console.log(`✅ Loaded ${response.data.messages.length} messages`);
            }
        } catch (error) {
            console.error('❌ Load messages error:', error);
        }
    }

    renderMessages() {
        this.renderReceivedMessages();
        this.renderSentMessages();
        this.updateMessageCounts();
    }

    renderReceivedMessages() {
        const container = document.getElementById('receivedMessageList');
        
        if (this.receivedMessages.length === 0) {
            container.innerHTML = '<div class="no-messages">ยังไม่มีข้อความที่ได้รับ</div>';
            return;
        }

        container.innerHTML = this.receivedMessages
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map(msg => this.createMessageElement(msg, false))
            .join('');
    }

    renderSentMessages() {
        const container = document.getElementById('sentMessageList');
        
        if (this.sentMessages.length === 0) {
            container.innerHTML = '<div class="no-messages">ยังไม่มีข้อความที่ส่ง</div>';
            return;
        }

        container.innerHTML = this.sentMessages
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map(msg => this.createMessageElement(msg, true))
            .join('');
    }

    createMessageElement(message, isSent = false) {
        const time = new Date(message.timestamp).toLocaleString('th-TH', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const displayName = isSent ? `ถึง: ${message.to}` : `จาก: ${message.from}`;
        const priorityClass = message.priority && message.priority !== 'normal' ? `priority-${message.priority}` : '';
        const typeClass = message.type && message.type !== 'message' ? `type-${message.type}` : '';
        const unreadClass = !message.read && !isSent ? 'unread' : '';
        
        return `
            <div class="message-item ${unreadClass} ${priorityClass} ${typeClass}" data-id="${message._id}">
                <div class="message-header">
                    <div class="message-info">
                        <span class="message-sender">${displayName}</span>
                        ${message.type !== 'message' ? `<span class="message-type">[${message.type}]</span>` : ''}
                        ${message.priority !== 'normal' ? `<span class="message-priority">${message.priority}</span>` : ''}
                    </div>
                    <span class="message-time">${time}</span>
                </div>
                <div class="message-text">${this.escapeHtml(message.message)}</div>
                ${!isSent && !message.read ? `
                    <div class="message-actions">
                        <button class="mark-read-btn" onclick="window.messageManager.markAsRead('${message._id}')">
                            ทำเครื่องหมายว่าอ่านแล้ว
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    updateMessageCounts() {
        document.getElementById('receivedCount').textContent = this.receivedMessages.length;
        document.getElementById('sentCount').textContent = this.sentMessages.length;
    }

    openComposeModal() {
        document.getElementById('composeModal').style.display = 'block';
        document.getElementById('messageText').focus();
    }

    closeComposeModal() {
        document.getElementById('composeModal').style.display = 'none';
        document.getElementById('composeForm').reset();
        document.querySelector('.char-counter').textContent = '0/1000 ตัวอักษร';
    }

    async sendMessage() {
        const recipient = document.getElementById('recipientSelect').value;
        const messageText = document.getElementById('messageText').value.trim();
        const messageType = document.getElementById('messageType').value;
        const messagePriority = document.getElementById('messagePriority').value;

        if (!recipient || !messageText) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            return;
        }

        try {
            const messageData = {
                from: this.agentCode,
                to: recipient,
                message: messageText,
                type: messageType,
                priority: messagePriority
            };

            console.log('📤 Sending message:', messageData);

            const response = await this.api.sendMessage(messageData);

            if (response.success) {
                // Add to sent messages
                this.sentMessages.unshift({
                    ...messageData,
                    _id: response.data._id,
                    timestamp: response.data.timestamp || new Date().toISOString()
                });
                
                this.renderSentMessages();
                this.updateMessageCounts();
                this.closeComposeModal();
                
                // Show success notification
                if (window.agentDashboard) {
                    window.agentDashboard.addRealtimeUpdate(
                        `ส่งข้อความถึง ${recipient} สำเร็จ`, 
                        'success'
                    );
                }
                
                console.log('✅ Message sent successfully');
            }
        } catch (error) {
            console.error('❌ Send message error:', error);
            alert('ไม่สามารถส่งข้อความได้: ' + error.message);
        }
    }

    async markAsRead(messageId) {
        try {
            console.log('👁️ Marking message as read:', messageId);
            
            const response = await this.api.markMessageAsRead(messageId);
            
            if (response.success) {
                // Update local message
                const message = this.receivedMessages.find(msg => msg._id === messageId);
                if (message) {
                    message.read = true;
                    this.unreadCount = Math.max(0, this.unreadCount - 1);
                }
                
                // Re-render messages
                this.renderReceivedMessages();
                
                console.log('✅ Message marked as read');
            }
        } catch (error) {
            console.error('❌ Mark as read error:', error);
        }
    }

    handleNewMessage(messageData) {
        console.log('📬 Handling new message:', messageData);
        
        // Add to received messages if it's for this agent
        if (messageData.to === this.agentCode || messageData.to === 'ALL') {
            this.receivedMessages.unshift({
                ...messageData,
                read: false
            });
            
            this.unreadCount++;
            this.renderReceivedMessages();
            this.updateMessageCounts();
        }
        
        // Add to sent messages if it's from this agent
        if (messageData.from === this.agentCode) {
            this.sentMessages.unshift(messageData);
            this.renderSentMessages();
        }
    }

    getReceivedCount() {
        return this.receivedMessages.length;
    }

    getSentCount() {
        return this.sentMessages.length;
    }

    getUnreadCount() {
        return this.unreadCount;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MessageManager;
} else {
    window.MessageManager = MessageManager;
}
```

---

## 🔔 **ชั่วโมงที่ 5: Notifications + Sound System**

### 📢 **Notification Manager Implementation (20 นาที)**

**src/renderer/js/notification-manager.js:**

```javascript
// Notification Manager สำหรับ Phase 2
class NotificationManager {
    constructor() {
        this.permission = 'default';
        this.soundEnabled = true;
        this.notificationQueue = [];
        this.maxNotifications = 5;
        
        this.initialize();
    }

    async initialize() {
        // Request notification permission
        await this.requestPermission();
        
        // Initialize sound system
        this.initializeSounds();
        
        // Load settings
        this.loadSettings();
        
        console.log('🔔 Notification Manager initialized');
    }

    async requestPermission() {
        if ('Notification' in window) {
            this.permission = await Notification.requestPermission();
            console.log('📋 Notification permission:', this.permission);
        } else {
            console.warn('⚠️ Notifications not supported');
        }
    }

    initializeSounds() {
        // Create audio contexts for different notification types
        this.sounds = {
            message: this.createBeepSound(800, 300),
            status: this.createBeepSound(600, 200),
            error: this.createBeepSound(400, 500),
            success: this.createBeepSound(1000, 200)
        };
    }

    createBeepSound(frequency, duration) {
        return () => {
            if (!this.soundEnabled) return;
            
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.frequency.value = frequency;
                oscillator.type = 'sine';

                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration / 1000);
            } catch (error) {
                console.warn('Sound play failed:', error);
            }
        };
    }

    showNotification(title, body, type = 'info', options = {}) {
        // Show desktop notification
        this.showDesktopNotification(title, body, type);
        
        // Show in-app notification
        this.showInAppNotification(title, body, type);
        
        // Play sound
        this.playNotificationSound(type);
        
        // Add to real-time feed if dashboard exists
        if (window.agentDashboard) {
            window.agentDashboard.addRealtimeUpdate(`${title}: ${body}`, type);
        }
    }

    showDesktopNotification(title, body, type) {
        if (this.permission === 'granted') {
            const notification = new Notification(title, {
                body: body,
                icon: '../assets/icon.png',
                badge: '../assets/icon.png',
                tag: `agent-notification-${type}`,
                requireInteraction: type === 'error',
                silent: !this.soundEnabled
            });

            // Auto close after 5 seconds (except for errors)
            if (type !== 'error') {
                setTimeout(() => {
                    notification.close();
                }, 5000);
            }

            // Handle click - bring window to focus
            notification.onclick = () => {
                const { ipcRenderer } = require('electron');
                ipcRenderer.send('focus-window');
                notification.close();
            };

            return notification;
        }
    }

    showInAppNotification(title, body, type) {
        const notification = document.createElement('div');
        notification.className = `in-app-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-header">
                    <span class="notification-title">${this.escapeHtml(title)}</span>
                    <button class="notification-close">&times;</button>
                </div>
                <div class="notification-body">${this.escapeHtml(body)}</div>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Position notification
        this.positionNotification(notification);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeInAppNotification(notification);
        });

        // Auto remove after duration based on type
        const duration = type === 'error' ? 10000 : 5000;
        setTimeout(() => {
            this.removeInAppNotification(notification);
        }, duration);

        // Manage notification queue
        this.notificationQueue.push(notification);
        this.cleanupNotificationQueue();

        return notification;
    }

    positionNotification(notification) {
        const notifications = document.querySelectorAll('.in-app-notification');
        const index = Array.from(notifications).indexOf(notification);
        
        notification.style.position = 'fixed';
        notification.style.top = `${20 + (index * 80)}px`;
        notification.style.right = '20px';
        notification.style.zIndex = '10000';
        notification.style.animation = 'slideInRight 0.3s ease-out';
    }

    removeInAppNotification(notification) {
        if (notification && notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
                
                // Remove from queue
                const index = this.notificationQueue.indexOf(notification);
                if (index > -1) {
                    this.notificationQueue.splice(index, 1);
                }
                
                // Reposition remaining notifications
                this.repositionNotifications();
            }, 300);
        }
    }

    repositionNotifications() {
        const notifications = document.querySelectorAll('.in-app-notification');
        notifications.forEach((notification, index) => {
            notification.style.top = `${20 + (index * 80)}px`;
        });
    }

    cleanupNotificationQueue() {
        // Remove excess notifications
        while (this.notificationQueue.length > this.maxNotifications) {
            const oldest = this.notificationQueue.shift();
            this.removeInAppNotification(oldest);
        }
    }

    playNotificationSound(type) {
        if (this.soundEnabled && this.sounds[type]) {
            this.sounds[type]();
        }
    }

    // Predefined notification types for common scenarios
    notifyStatusChange(newStatus) {
        this.showNotification(
            'เปลี่ยนสถานะ',
            `สถานะเปลี่ยนเป็น ${newStatus}`,
            'success'
        );
    }

    notifyNewMessage(from, message) {
        const preview = message.length > 50 ? message.substring(0, 50) + '...' : message;
        this.showNotification(
            `ข้อความใหม่จาก ${from}`,
            preview,
            'message'
        );
    }

    notifyConnectionLost() {
        this.showNotification(
            'การเชื่อมต่อขาดหาย',
            'กำลังพยายามเชื่อมต่อใหม่...',
            'error'
        );
    }

    notifyConnectionRestored() {
        this.showNotification(
            'เชื่อมต่อสำเร็จ',
            'การเชื่อมต่อกลับมาปกติแล้ว',
            'success'
        );
    }

    notifyError(title, message) {
        this.showNotification(title, message, 'error');
    }

    notifySuccess(title, message) {
        this.showNotification(title, message, 'success');
    }

    notifyInfo(title, message) {
        this.showNotification(title, message, 'info');
    }

    // Settings management
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.saveSettings();
        
        this.showNotification(
            'การตั้งค่าเสียง',
            `เสียงแจ้งเตือน${this.soundEnabled ? 'เปิด' : 'ปิด'}`,
            'info'
        );
        
        return this.soundEnabled;
    }

    setSoundEnabled(enabled) {
        this.soundEnabled = enabled;
        this.saveSettings();
    }

    saveSettings() {
        try {
            const settings = {
                soundEnabled: this.soundEnabled,
                permission: this.permission
            };
            localStorage.setItem('notificationSettings', JSON.stringify(settings));
        } catch (error) {
            console.error('Error saving notification settings:', error);
        }
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('notificationSettings');
            if (saved) {
                const settings = JSON.parse(saved);
                this.soundEnabled = settings.soundEnabled !== false; // Default to true
                this.permission = settings.permission || 'default';
            }
        } catch (error) {
            console.error('Error loading notification settings:', error);
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Cleanup method
    cleanup() {
        // Remove all in-app notifications
        this.notificationQueue.forEach(notification => {
            this.removeInAppNotification(notification);
        });
        this.notificationQueue = [];
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationManager;
} else {
    window.NotificationManager = NotificationManager;
}
```

### 🎨 **Enhanced CSS for Notifications (15 นาที)**

เพิ่มใน **src/renderer/css/style.css:**

```css
/* In-App Notification Styles */
.in-app-notification {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    border-left: 4px solid;
    min-width: 300px;
    max-width: 400px;
    overflow: hidden;
}

.in-app-notification.success {
    border-left-color: #28a745;
}

.in-app-notification.error {
    border-left-color: #dc3545;
}

.in-app-notification.info {
    border-left-color: #17a2b8;
}

.in-app-notification.message {
    border-left-color: #667eea;
}

.in-app-notification.warning {
    border-left-color: #ffc107;
}

.notification-content {
    padding: 16px;
}

.notification-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
}

.notification-title {
    font-weight: 600;
    color: #333;
    font-size: 14px;
}

.notification-close {
    background: none;
    border: none;
    font-size: 18px;
    color: #666;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.notification-close:hover {
    color: #333;
}

.notification-body {
    color: #555;
    font-size: 13px;
    line-height: 1.4;
}

/* Notification Animations */
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

/* Message Item Styles (Updated) */
.message-item {
    margin-bottom: 12px;
    padding: 16px;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    background: white;
    transition: all 0.3s ease;
}

.message-item.unread {
    border-left: 4px solid #667eea;
    background: #f8f9ff;
    font-weight: 500;
}

.message-item.priority-high {
    border-left: 4px solid #ffc107;
}

.message-item.priority-urgent {
    border-left: 4px solid #dc3545;
    background: #fff5f5;
}

.message-item.type-alert {
    background: #fff3cd;
}

.message-item.type-broadcast {
    background: #d1ecf1;
}

.message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.message-info {
    display: flex;
    align-items: center;
    gap: 8px;
}

.message-sender {
    font-weight: 600;
    color: #333;
}

.message-type {
    background: #667eea;
    color: white;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 10px;
    text-transform: uppercase;
}

.message-priority {
    background: #ffc107;
    color: #333;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 10px;
    text-transform: uppercase;
}

.message-time {
    font-size: 12px;
    color: #666;
}

.message-text {
    color: #333;
    line-height: 1.4;
    margin-bottom: 8px;
}

.message-actions {
    text-align: right;
}

.mark-read-btn {
    background: #667eea;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    cursor: pointer;
    transition: background 0.3s;
}

.mark-read-btn:hover {
    background: #5a6fd8;
}

/* Modal Styles (Updated) */
.modal {
    display: none;
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    backdrop-filter: blur(2px);
}

.modal-content {
    background-color: white;
    margin: 5% auto;
    padding: 0;
    border-radius: 12px;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.modal-header {
    padding: 24px 24px 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e5e9;
    padding-bottom: 16px;
    margin-bottom: 24px;
}

.modal-header h3 {
    color: #333;
    font-size: 20px;
    font-weight: 600;
}

.modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    padding: 4px;
}

.modal-body {
    padding: 0 24px 24px 24px;
}

.form-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #e1e5e9;
}

.char-counter {
    display: block;
    text-align: right;
    font-size: 11px;
    color: #666;
    margin-top: 4px;
}

/* Feed Styles for Real-time Updates */
.realtime-feed {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    background: #f8f9fa;
}

.feed-item {
    padding: 8px 12px;
    border-bottom: 1px solid #e1e5e9;
    font-size: 13px;
    display: flex;
    gap: 8px;
}

.feed-item:last-child {
    border-bottom: none;
}

.feed-item.success {
    background: #d4edda;
    color: #155724;
}

.feed-item.error {
    background: #f8d7da;
    color: #721c24;
}

.feed-item.info {
    background: #d1ecf1;
    color: #0c5460;
}

.feed-item.welcome {
    background: #e7f0ff;
    color: #0066cc;
}

.feed-time {
    font-weight: 600;
    min-width: 60px;
}

.feed-message {
    flex: 1;
}

/* Stats Grid */
.stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.stat-item {
    text-align: center;
    padding: 20px 16px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 8px;
    border: 1px solid #e1e5e9;
}

.stat-number {
    font-size: 28px;
    font-weight: bold;
    color: #667eea;
    margin-bottom: 6px;
}

.stat-label {
    font-size: 12px;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Action Buttons */
.action-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.action-btn {
    padding: 14px 16px;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
}

.action-btn:hover {
    border-color: #667eea;
    background: #f8f9ff;
    transform: translateY(-2px);
}

.action-btn.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

.system-info {
    margin-top: 16px;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 6px;
    font-size: 11px;
    color: #666;
}

.system-info div {
    margin-bottom: 2px;
}

/* Responsive adjustments for mobile */
@media (max-width: 768px) {
    .in-app-notification {
        min-width: 280px;
        max-width: calc(100vw - 40px);
    }
    
    .modal-content {
        margin: 10% auto;
        width: 95%;
    }
    
    .stats-grid,
    .action-buttons {
        grid-template-columns: 1fr;
    }
}

```

## 🔧 **Utility Functions (25 นาที) - ต่อจากส่วนที่ขาดหาย**

**src/renderer/js/utils.js:**

```javascript
// Utility Functions สำหรับ Phase 2 Agent Desktop App
class Utils {
    constructor() {
        this.dateFormatter = new Intl.DateTimeFormat('th-TH', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        this.timeFormatter = new Intl.DateTimeFormat('th-TH', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    // Date and Time utilities
    formatDateTime(date) {
        return this.dateFormatter.format(new Date(date));
    }

    formatTime(date) {
        return this.timeFormatter.format(new Date(date));
    }

    formatDuration(startTime, endTime = new Date()) {
        const diffMs = new Date(endTime) - new Date(startTime);
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
        
        return {
            hours,
            minutes,
            seconds,
            formatted: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        };
    }

    formatRelativeTime(date) {
        const now = new Date();
        const diff = now - new Date(date);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (minutes < 1) return 'เมื่อสักครู่';
        if (minutes < 60) return `${minutes} นาทีที่แล้ว`;
        if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`;
        if (days < 7) return `${days} วันที่แล้ว`;
        return this.formatDateTime(date);
    }

    // Status utilities
    getStatusDisplayName(status) {
        const statusMap = {
            'Available': 'พร้อมทำงาน',
            'Busy': 'ไม่ว่าง',
            'Break': 'พักเบรก',
            'Not Ready': 'ไม่พร้อม',
            'Offline': 'ออฟไลน์',
            'Wrap': 'สรุปงาน'
        };
        return statusMap[status] || status;
    }

    getStatusColor(status) {
        const colorMap = {
            'Available': '#28a745',
            'Busy': '#dc3545',
            'Break': '#ffc107',
            'Not Ready': '#6c757d',
            'Offline': '#868e96',
            'Wrap': '#17a2b8'
        };
        return colorMap[status] || '#6c757d';
    }

    getStatusIcon(status) {
        const iconMap = {
            'Available': '🟢',
            'Busy': '🔴',
            'Break': '🟡',
            'Not Ready': '⚫',
            'Offline': '⚪',
            'Wrap': '🔵'
        };
        return iconMap[status] || '⚫';
    }

    // Validation utilities
    validateAgentCode(code) {
        const pattern = /^[A-Z]\d{3}$/;
        return {
            isValid: pattern.test(code),
            message: pattern.test(code) ? null : 'รหัส Agent ต้องเป็นรูปแบบ A001 (ตัวอักษร 1 ตัว + ตัวเลข 3 ตัว)'
        };
    }

    validateEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
            isValid: pattern.test(email),
            message: pattern.test(email) ? null : 'รูปแบบอีเมลไม่ถูกต้อง'
        };
    }

    validateMessage(message) {
        const trimmed = message.trim();
        return {
            isValid: trimmed.length > 0 && trimmed.length <= 1000,
            message: trimmed.length === 0 ? 'ข้อความไม่สามารถว่างเปล่าได้' :
                     trimmed.length > 1000 ? 'ข้อความยาวเกิน 1000 ตัวอักษร' : null
        };
    }

    // Sanitization utilities
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    unescapeHtml(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    // Storage utilities
    setLocalStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('localStorage set error:', error);
            return false;
        }
    }

    getLocalStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('localStorage get error:', error);
            return defaultValue;
        }
    }

    removeLocalStorage(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('localStorage remove error:', error);
            return false;
        }
    }

    // UI utilities
    showLoading(element, message = 'กำลังโหลด...') {
        if (element) {
            element.disabled = true;
            element.style.opacity = '0.7';
            element.setAttribute('data-original-text', element.textContent);
            element.textContent = message;
        }
    }

    hideLoading(element) {
        if (element) {
            element.disabled = false;
            element.style.opacity = '1';
            const originalText = element.getAttribute('data-original-text');
            if (originalText) {
                element.textContent = originalText;
                element.removeAttribute('data-original-text');
            }
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Network utilities
    async retryOperation(operation, maxRetries = 3, delay = 1000) {
        for (let i = 0; i <= maxRetries; i++) {
            try {
                return await operation();
            } catch (error) {
                if (i === maxRetries) throw error;
                console.warn(`Operation failed, retrying in ${delay}ms... (${i + 1}/${maxRetries})`);
                await this.sleep(delay);
                delay *= 2; // Exponential backoff
            }
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Random utilities
    generateId(length = 8) {
        return Math.random().toString(36).substr(2, length);
    }

    generateSessionId() {
        return `${Date.now()}_${this.generateId(10)}`;
    }

    // Array utilities
    groupBy(array, keyFn) {
        return array.reduce((result, item) => {
            const key = keyFn(item);
            if (!result[key]) {
                result[key] = [];
            }
            result[key].push(item);
            return result;
        }, {});
    }

    sortBy(array, keyFn, direction = 'asc') {
        return array.sort((a, b) => {
            const aVal = keyFn(a);
            const bVal = keyFn(b);
            
            if (direction === 'desc') {
                return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
            }
            return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        });
    }

    // Message prioritization utilities
    getMessagePriorityLevel(priority) {
        const levels = { low: 1, normal: 2, high: 3, urgent: 4 };
        return levels[priority] || 2;
    }

    getMessagePriorityColor(priority) {
        const colors = {
            low: '#28a745',
            normal: '#17a2b8',
            high: '#ffc107',
            urgent: '#dc3545'
        };
        return colors[priority] || '#17a2b8';
    }

    // Connection status utilities
    getConnectionStatusText(isConnected, lastChecked = null) {
        if (isConnected) {
            return 'เชื่อมต่อแล้ว';
        }
        
        if (lastChecked) {
            const timeSince = this.formatRelativeTime(lastChecked);
            return `ไม่ได้เชื่อมต่อ (ตรวจสอบล่าสุด: ${timeSince})`;
        }
        
        return 'ไม่ได้เชื่อมต่อ';
    }

    // Performance utilities
    performanceLogger(name, fn) {
        return async (...args) => {
            const start = performance.now();
            try {
                const result = await fn(...args);
                const end = performance.now();
                console.log(`Performance: ${name} took ${(end - start).toFixed(2)}ms`);
                return result;
            } catch (error) {
                const end = performance.now();
                console.error(`Performance: ${name} failed after ${(end - start).toFixed(2)}ms`, error);
                throw error;
            }
        };
    }

    // Keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            // Ctrl+R: Refresh
            if (event.ctrlKey && event.key === 'r') {
                event.preventDefault();
                if (window.agentDashboard) {
                    window.agentDashboard.refreshData();
                }
            }
            
            // Ctrl+Q: Logout
            if (event.ctrlKey && event.key === 'q') {
                event.preventDefault();
                if (window.agentDashboard) {
                    window.agentDashboard.confirmLogout();
                }
            }
            
            // Ctrl+M: Open message compose
            if (event.ctrlKey && event.key === 'm') {
                event.preventDefault();
                if (window.messageManager) {
                    window.messageManager.openComposeModal();
                }
            }
            
            // Escape: Close any modal
            if (event.key === 'Escape') {
                const modal = document.querySelector('.modal[style*="block"]');
                if (modal) {
                    modal.style.display = 'none';
                }
            }
        });
    }

    // Browser compatibility checks
    checkBrowserFeatures() {
        const features = {
            webSocket: typeof WebSocket !== 'undefined',
            notification: 'Notification' in window,
            audioContext: typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined',
            localStorage: typeof Storage !== 'undefined',
            fetch: typeof fetch !== 'undefined'
        };
        
        const missing = Object.keys(features).filter(key => !features[key]);
        
        if (missing.length > 0) {
            console.warn('Missing browser features:', missing);
        }
        
        return features;
    }
}

// Create global utils instance
const utils = new Utils();

// Setup keyboard shortcuts on load
document.addEventListener('DOMContentLoaded', () => {
    utils.setupKeyboardShortcuts();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
} else {
    window.Utils = Utils;
    window.utils = utils;
}
```

---

## 🏗️ **ชั่วโมงที่ 6: Main Process (Electron) Implementation (60 นาที)**

### ⚡ **Main Process Setup (30 นาที)**

**src/main/main.js:**

```javascript
// Main Process สำหรับ Agent Desktop Phase 2
const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

class AgentDesktopApp {
    constructor() {
        this.loginWindow = null;
        this.mainWindow = null;
        this.isQuitting = false;
        
        this.initialize();
    }

    initialize() {
        // Handle app ready
        app.whenReady().then(() => {
            this.createLoginWindow();
            this.setupIpcHandlers();
            this.setupAppMenu();
            
            if (isDev) {
                console.log('Agent Desktop App started in development mode');
            }
        });

        // Handle all windows closed
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });

        // Handle app activate (macOS)
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                this.createLoginWindow();
            }
        });

        // Handle before quit
        app.on('before-quit', (event) => {
            this.isQuitting = true;
            
            if (this.mainWindow && !this.mainWindow.isDestroyed()) {
                event.preventDefault();
                this.mainWindow.webContents.send('app-closing');
            }
        });
    }

    createLoginWindow() {
        this.loginWindow = new BrowserWindow({
            width: 500,
            height: 700,
            resizable: false,
            maximizable: false,
            center: true,
            title: 'Agent Desktop - Login',
            icon: path.join(__dirname, '../assets/icon.png'),
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
            },
            show: false
        });

        this.loginWindow.loadFile(path.join(__dirname, '../renderer/login.html'));

        this.loginWindow.once('ready-to-show', () => {
            this.loginWindow.show();
            
            if (isDev) {
                this.loginWindow.webContents.openDevTools();
            }
        });

        this.loginWindow.on('closed', () => {
            this.loginWindow = null;
            if (!this.mainWindow) {
                app.quit();
            }
        });
    }

    createMainWindow(userData) {
        this.mainWindow = new BrowserWindow({
            width: 1400,
            height: 900,
            minWidth: 1200,
            minHeight: 800,
            center: true,
            title: `Agent Desktop - ${userData.agentCode} (${userData.agentName})`,
            icon: path.join(__dirname, '../assets/icon.png'),
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
            },
            show: false
        });

        this.mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

        this.mainWindow.once('ready-to-show', () => {
            this.mainWindow.show();
            
            if (isDev) {
                this.mainWindow.webContents.openDevTools();
            }
        });

        this.mainWindow.on('close', (event) => {
            if (!this.isQuitting) {
                event.preventDefault();
                this.showCloseConfirmation();
            }
        });

        this.mainWindow.on('closed', () => {
            this.mainWindow = null;
        });

        // Close login window if it exists
        if (this.loginWindow && !this.loginWindow.isDestroyed()) {
            this.loginWindow.close();
        }
    }

    setupIpcHandlers() {
        // Handle login success
        ipcMain.on('login-success', (event, userData) => {
            console.log('Login successful for agent:', userData.agentCode);
            this.createMainWindow(userData);
        });

        // Handle logout
        ipcMain.on('logout', () => {
            console.log('Logout requested');
            
            if (this.mainWindow && !this.mainWindow.isDestroyed()) {
                this.mainWindow.close();
            }
            
            this.createLoginWindow();
        });

        // Handle app ready to close
        ipcMain.on('app-ready-to-close', () => {
            console.log('App ready to close');
            app.quit();
        });

        // Handle focus window
        ipcMain.on('focus-window', () => {
            if (this.mainWindow && !this.mainWindow.isDestroyed()) {
                if (this.mainWindow.isMinimized()) {
                    this.mainWindow.restore();
                }
                this.mainWindow.focus();
            }
        });

        // Handle error reporting
        ipcMain.on('error-report', (event, errorData) => {
            console.error('Error reported from renderer:', errorData);
            
            dialog.showErrorBox(
                'เกิดข้อผิดพลาด',
                `เกิดข้อผิดพลาดในระบบ: ${errorData.message}\n\nกรุณาลองใหม่อีกครั้ง หากปัญหายังคงมีอยู่ กรุณาติดต่อผู้ดูแลระบบ`
            );
        });
    }

    setupAppMenu() {
        const template = [
            {
                label: 'Agent Desktop',
                submenu: [
                    {
                        label: 'เกี่ยวกับ Agent Desktop',
                        click: () => {
                            dialog.showMessageBox(null, {
                                type: 'info',
                                title: 'เกี่ยวกับ Agent Desktop',
                                message: 'Agent Desktop Application',
                                detail: `Version: 2.0.0\nPhase 2: MongoDB + WebSocket API\n\nCall Center Agent Management System\nพัฒนาด้วย Electron.js + Node.js`,
                                buttons: ['ตกลง']
                            });
                        }
                    },
                    { type: 'separator' },
                    {
                        label: 'ออกจากระบบ',
                        accelerator: 'CmdOrCtrl+Q',
                        click: () => {
                            this.showLogoutConfirmation();
                        }
                    }
                ]
            },
            {
                label: 'แก้ไข',
                submenu: [
                    { label: 'เลิกทำ', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
                    { label: 'ทำซ้ำ', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
                    { type: 'separator' },
                    { label: 'ตัด', accelerator: 'CmdOrCtrl+X', role: 'cut' },
                    { label: 'คัดลอก', accelerator: 'CmdOrCtrl+C', role: 'copy' },
                    { label: 'วาง', accelerator: 'CmdOrCtrl+V', role: 'paste' },
                    { label: 'เลือกทั้งหมด', accelerator: 'CmdOrCtrl+A', role: 'selectall' }
                ]
            },
            {
                label: 'มุมมอง',
                submenu: [
                    { label: 'รีโหลด', accelerator: 'CmdOrCtrl+R', role: 'reload' },
                    { label: 'รีโหลดแบบบังคับ', accelerator: 'CmdOrCtrl+Shift+R', role: 'forceReload' },
                    { label: 'เครื่องมือนักพัฒนา', accelerator: 'F12', role: 'toggleDevTools' },
                    { type: 'separator' },
                    { label: 'ขนาดจริง', accelerator: 'CmdOrCtrl+0', role: 'resetZoom' },
                    { label: 'ซูมเข้า', accelerator: 'CmdOrCtrl+Plus', role: 'zoomIn' },
                    { label: 'ซูมออก', accelerator: 'CmdOrCtrl+-', role: 'zoomOut' },
                    { type: 'separator' },
                    { label: 'เต็มจอ', accelerator: 'F11', role: 'togglefullscreen' }
                ]
            },
            {
                label: 'หน้าต่าง',
                submenu: [
                    { label: 'ย่อเก็บ', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
                    { label: 'ปิด', accelerator: 'CmdOrCtrl+W', role: 'close' }
                ]
            },
            {
                label: 'ช่วยเหลือ',
                submenu: [
                    {
                        label: 'คู่มือการใช้งาน',
                        click: () => {
                            this.showHelpDialog();
                        }
                    },
                    {
                        label: 'คีย์ลัดทั้งหมด',
                        click: () => {
                            this.showShortcutsDialog();
                        }
                    },
                    { type: 'separator' },
                    {
                        label: 'รายงานปัญหา',
                        click: () => {
                            dialog.showMessageBox(null, {
                                type: 'info',
                                title: 'รายงานปัญหา',
                                message: 'หากพบปัญหาการใช้งาน',
                                detail: 'กรุณาติดต่อ:\n- IT Support: ext. 1234\n- Email: support@company.com\n- หรือใช้ระบบ Help Desk',
                                buttons: ['ตกลง']
                            });
                        }
                    }
                ]
            }
        ];

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    }

    showCloseConfirmation() {
        const choice = dialog.showMessageBoxSync(this.mainWindow, {
            type: 'question',
            buttons: ['ออกจากระบบ', 'ยกเลิก'],
            defaultId: 1,
            title: 'ยืนยันการออกจากระบบ',
            message: 'คุณต้องการออกจากระบบหรือไม่?',
            detail: 'การออกจากระบบจะเปลี่ยนสถานะเป็น Offline และปิดการเชื่อมต่อทั้งหมด'
        });

        if (choice === 0) {
            this.isQuitting = true;
            this.mainWindow.webContents.send('app-closing');
        }
    }

    showLogoutConfirmation() {
        const choice = dialog.showMessageBoxSync(null, {
            type: 'question',
            buttons: ['ออกจากระบบ', 'ยกเลิก'],
            defaultId: 1,
            title: 'ยืนยันการออกจากระบบ',
            message: 'คุณต้องการออกจากระบบหรือไม่?'
        });

        if (choice === 0) {
            if (this.mainWindow && !this.mainWindow.isDestroyed()) {
                this.mainWindow.webContents.send('logout');
            } else {
                app.quit();
            }
        }
    }

    showHelpDialog() {
        dialog.showMessageBox(null, {
            type: 'info',
            title: 'คู่มือการใช้งาน Agent Desktop',
            message: 'คู่มือการใช้งาน Agent Desktop Phase 2',
            detail: `การเปลี่ยนสถานะ:
• คลิกปุ่มสถานะที่ต้องการ
• ใส่เหตุผล (ไม่บังคับ) แล้วกด Enter
• สถานะจะอัพเดทในฐานข้อมูล MongoDB

การส่งข้อความ:
• คลิก "เขียนข้อความ" ในแผง Messages
• เลือกผู้รับและประเภทข้อความ
• ข้อความจะส่งผ่าน WebSocket แบบ Real-time

การเชื่อมต่อ:
• ตรวจสอบสถานะการเชื่อมต่อในแผง Connection
• ใช้ปุ่ม "เชื่อมต่อใหม่" หากมีปัญหา

ปุ่มลัด:
• Ctrl+R: รีเฟรช
• Ctrl+Q: ออกจากระบบ
• Ctrl+M: เขียนข้อความ
• F12: Developer Tools`,
            buttons: ['ตกลง']
        });
    }

    showShortcutsDialog() {
        dialog.showMessageBox(null, {
            type: 'info',
            title: 'ปุ่มลัดทั้งหมด',
            message: 'รายการปุ่มลัดที่ใช้ได้',
            detail: `ทั่วไป:
• Ctrl+R: รีเฟรชข้อมูล
• Ctrl+Q: ออกจากระบบ
• F12: Developer Tools
• F11: เต็มจอ
• Escape: ปิด Modal

การทำงาน:
• Ctrl+M: เขียนข้อความใหม่
• Ctrl+Shift+R: รีโหลดแบบบังคับ
• Ctrl+0: ขนาดจริง
• Ctrl++: ซูมเข้า
• Ctrl+-: ซูมออก

หน้าต่าง:
• Ctrl+W: ปิดหน้าต่าง
• Ctrl+M: ย่อเก็บหน้าต่าง`,
            buttons: ['ตกลง']
        });
    }
}

// Initialize the application
new AgentDesktopApp();
```

### 🎛️ **Menu Configuration (15 นาที)**

**src/main/menu.js:**

```javascript
// Application Menu Configuration สำหรับ Agent Desktop
const { Menu, dialog, shell } = require('electron');

class MenuManager {
    static createMenu(app, mainWindow) {
        const template = [
            // macOS specific menu
            ...(process.platform === 'darwin' ? [{
                label: app.getName(),
                submenu: [
                    { role: 'about' },
                    { type: 'separator' },
                    { role: 'services' },
                    { type: 'separator' },
                    { role: 'hide' },
                    { role: 'hideothers' },
                    { role: 'unhide' },
                    { type: 'separator' },
                    { role: 'quit' }
                ]
            }] : []),

            // File menu
            {
                label: 'ไฟล์',
                submenu: [
                    {
                        label: 'ออกจากระบบ',
                        accelerator: 'CmdOrCtrl+Shift+Q',
                        click: () => {
                            mainWindow.webContents.send('logout');
                        }
                    },
                    { type: 'separator' },
                    {
                        label: process.platform === 'darwin' ? 'ปิด Agent Desktop' : 'ออก',
                        accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                        click: () => {
                            app.quit();
                        }
                    }
                ]
            },

            // Edit menu
            {
                label: 'แก้ไข',
                submenu: [
                    { label: 'เลิกทำ', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
                    { label: 'ทำซ้ำ', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
                    { type: 'separator' },
                    { label: 'ตัด', accelerator: 'CmdOrCtrl+X', role: 'cut' },
                    { label: 'คัดลอก', accelerator: 'CmdOrCtrl+C', role: 'copy' },
                    { label: 'วาง', accelerator: 'CmdOrCtrl+V', role: 'paste' },
                    { label: 'เลือกทั้งหมด', accelerator: 'CmdOrCtrl+A', role: 'selectall' }
                ]
            },

            // Agent menu
            {
                label: 'Agent',
                submenu: [
                    {
                        label: 'รีเฟรชข้อมูล',
                        accelerator: 'CmdOrCtrl+R',
                        click: () => {
                            mainWindow.webContents.send('refresh-data');
                        }
                    },
                    {
                        label: 'เขียนข้อความ',
                        accelerator: 'CmdOrCtrl+M',
                        click: () => {
                            mainWindow.webContents.send('open-compose');
                        }
                    },
                    { type: 'separator' },
                    {
                        label: 'เปลี่ยนเป็น Available',
                        accelerator: 'CmdOrCtrl+1',
                        click: () => {
                            mainWindow.webContents.send('change-status', 'Available');
                        }
                    },
                    {
                        label: 'เปลี่ยนเป็น Busy',
                        accelerator: 'CmdOrCtrl+2',
                        click: () => {
                            mainWindow.webContents.send('change-status', 'Busy');
                        }
                    },
                    {
                        label: 'เปลี่ยนเป็น Break',
                        accelerator: 'CmdOrCtrl+3',
                        click: () => {
                            mainWindow.webContents.send('change-status', 'Break');
                        }
                    }
                ]
            },

            // View menu
            {
                label: 'มุมมอง',
                submenu: [
                    { label: 'รีโหลด', accelerator: 'CmdOrCtrl+R', role: 'reload' },
                    { label: 'รีโหลดแบบบังคับ', accelerator: 'CmdOrCtrl+Shift+R', role: 'forceReload' },
                    { label: 'เครื่องมือนักพัฒนา', accelerator: 'F12', role: 'toggleDevTools' },
                    { type: 'separator' },
                    { label: 'ขนาดจริง', accelerator: 'CmdOrCtrl+0', role: 'resetZoom' },
                    { label: 'ซูมเข้า', accelerator: 'CmdOrCtrl+Plus', role: 'zoomIn' },
                    { label: 'ซูมออก', accelerator: 'CmdOrCtrl+-', role: 'zoomOut' },
                    { type: 'separator' },
                    { label: 'เต็มจอ', accelerator: 'F11', role: 'togglefullscreen' }
                ]
            },

            // Window menu
            {
                label: 'หน้าต่าง',
                submenu: [
                    { label: 'ย่อเก็บ', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
                    { label: 'ปิด', accelerator: 'CmdOrCtrl+W', role: 'close' }
                ]
            },

            // Help menu
            {
                label: 'ช่วยเหลือ',
                submenu: [
                    {
                        label: 'คู่มือการใช้งาน',
                        click: () => {
                            MenuManager.showUserGuide();
                        }
                    },
                    {
                        label: 'คีย์ลัดทั้งหมด',
                        click: () => {
                            MenuManager.showKeyboardShortcuts();
                        }
                    },
                    { type: 'separator' },
                    {
                        label: 'ตรวจสอบการอัพเดท',
                        click: () => {
                            MenuManager.checkForUpdates();
                        }
                    },
                    { type: 'separator' },
                    {
                        label: 'รายงานปัญหา',
                        click: () => {
                            MenuManager.reportIssue();
                        }
                    },
                    {
                        label: 'เกี่ยวกับ Agent Desktop',
                        click: () => {
                            MenuManager.showAbout();
                        }
                    }
                ]
            }
        ];

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    }

    static showUserGuide() {
        dialog.showMessageBox(null, {
            type: 'info',
            title: 'คู่มือการใช้งาน Agent Desktop Phase 2',
            message: 'คู่มือการใช้งานฉบับย่อ',
            detail: `1. การเข้าสู่ระบบ:
   • ใส่รหัส Agent (รูปแบบ A001)
   • ใส่รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)
   • ตรวจสอบ Server URL

2. การเปลี่ยนสถานะ:
   • คลิกปุ่มสถานะที่ต้องการ
   • ใส่เหตุผล (ไม่บังคับ)
   • สถานะจะบันทึกใน MongoDB

3. การส่งข้อความ:
   • คลิก "เขียนข้อความ"
   • เลือกผู้รับและประเภท
   • ข้อความส่งผ่าน WebSocket

4. การตรวจสอบการเชื่อมต่อ:
   • ดูสถานะใน Connection Panel
   • API: เชื่อมต่อกับ Phase 2 API
   • WebSocket: สำหรับ Real-time
   • Database: MongoDB สถานะ`,
            buttons: ['ตกลง']
        });
    }

    static showKeyboardShortcuts() {
        dialog.showMessageBox(null, {
            type: 'info',
            title: 'รายการปุ่มลัด',
            message: 'ปุ่มลัดที่ใช้ได้ใน Agent Desktop',
            detail: `ทั่วไป:
• Ctrl+R: รีเฟรชข้อมูล
• Ctrl+Q: ออกจากระบบ
• Ctrl+Shift+Q: ออกจาก Agent เท่านั้น
• F12: เครื่องมือนักพัฒนา
• F11: เต็มจอ
• Escape: ปิด Modal

การจัดการสถานะ:
• Ctrl+1: เปลี่ยนเป็น Available
• Ctrl+2: เปลี่ยนเป็น Busy  
• Ctrl+3: เปลี่ยนเป็น Break

การส่งข้อความ:
• Ctrl+M: เปิดหน้าต่างเขียนข้อความ

การดูข้อมูล:
• Ctrl+0: ขนาดจริง
• Ctrl++: ซูมเข้า
• Ctrl+-: ซูมออก`,
            buttons: ['ตกลง']
        });
    }

    static checkForUpdates() {
        dialog.showMessageBox(null, {
            type: 'info',
            title: 'ตรวจสอบการอัพเดท',
            message: 'Agent Desktop Version 2.0.0',
            detail: 'คุณใช้เวอร์ชันล่าสุดแล้ว\n\nPhase 2 Features:\n• MongoDB Database Integration\n• WebSocket Real-time Communication\n• Enhanced Message System\n• Improved Performance',
            buttons: ['ตกลง']
        });
    }

    static reportIssue() {
        dialog.showMessageBox(null, {
            type: 'info',
            title: 'รายงานปัญหา',
            message: 'แจ้งปัญหาการใช้งาน',
            detail: `หากพบปัญหาการใช้งาน กรุณาติดต่อ:

📞 IT Support: ext. 1234
📧 Email: support@company.com  
🎫 Help Desk System: help.company.com

ข้อมูลที่ควรแจ้ง:
• Agent Code ของคุณ
• ขั้นตอนที่ทำก่อนเกิดปัญหา
• ข้อความ Error (ถ้ามี)
• เวอร์ชัน: 2.0.0 (Phase 2)`,
            buttons: ['ตกลง', 'เปิด Help Desk'],
            defaultId: 0
        }).then((result) => {
            if (result.response === 1) {
                shell.openExternal('https://help.company.com');
            }
        });
    }

    static showAbout() {
        dialog.showMessageBox(null, {
            type: 'info',
            title: 'เกี่ยวกับ Agent Desktop',
            message: 'Agent Desktop Application',
            detail: `Version: 2.0.0
Phase: 2 (MongoDB + WebSocket)
Platform: ${process.platform}
Electron: ${process.versions.electron}
Node.js: ${process.versions.node}
Chrome: ${process.versions.chrome}

Agent Desktop เป็นแอปพลิเคชันสำหรับ
จัดการสถานะและการสื่อสารของ
Agent ในระบบ Call Center

พัฒนาด้วย:
• Electron.js - Desktop Framework
• Node.js - Backend Runtime  
• MongoDB - Database
• Socket.io - WebSocket Communication

© 2024 Agent Wallboard System`,
            buttons: ['ตกลง']
        });
    }
}

module.exports = MenuManager;
```

### 🎯 **ชั่วโมงที่ 7: Final Integration & Testing (60 นาที)**

### 🔗 **Complete Integration (25 นาที)**

**อัพเดท `src/renderer/js/dashboard.js` เพื่อรองรับ IPC communication:**

```javascript
// เพิ่มใน dashboard.js constructor
setupIpcHandlers() {
    const { ipcRenderer } = require('electron');
    
    // Handle menu shortcuts
    ipcRenderer.on('refresh-data', () => {
        this.refreshData();
    });
    
    ipcRenderer.on('open-compose', () => {
        if (this.messageManager) {
            this.messageManager.openComposeModal();
        }
    });
    
    ipcRenderer.on('change-status', (event, status) => {
        this.changeStatus(status);
    });
    
    ipcRenderer.on('logout', () => {
        this.logout();
    });
}

// เรียกใน initialize()
this.setupIpcHandlers();
```

### 🧪 **Comprehensive Testing Suite (35 นาที)**

**test/integration-test.js:**

```javascript
// Integration Test สำหรับ Agent Desktop Phase 2
const { Application } = require('spectron');
const path = require('path');

class IntegrationTester {
    constructor() {
        this.app = null;
        this.testResults = {
            total: 0,
            passed: 0,
            failed: 0,
            errors: []
        };
    }

    async initialize() {
        console.log('🧪 Starting Integration Tests...');
        
        this.app = new Application({
            path: require('electron'),
            args: [path.join(__dirname, '../src/main/main.js'), '--test-mode'],
            env: { NODE_ENV: 'test' }
        });

        await this.app.start();
        console.log('✅ Electron app started');
    }

    async runAllTests() {
        try {
            await this.initialize();
            
            // Test suites
            await this.testAppLaunch();
            await this.testLoginWindow();
            await this.testApiConnection();
            await this.testStatusManagement();
            await this.testMessageSystem();
            await this.testWebSocketConnection();
            
            this.printResults();
            
        } catch (error) {
            console.error('❌ Test suite failed:', error);
            this.testResults.errors.push(error.message);
        } finally {
            if (this.app && this.app.isRunning()) {
                await this.app.stop();
            }
        }
    }

    async testAppLaunch() {
        console.log('\n📱 Testing App Launch...');
        
        await this.runTest('App should start', async () => {
            const isVisible = await this.app.browserWindow.isVisible();
            return isVisible;
        });

        await this.runTest('Login window should be focused', async () => {
            const title = await this.app.browserWindow.getTitle();
            return title.includes('Login');
        });
    }

    async testLoginWindow() {
        console.log('\n🔐 Testing Login Window...');
        
        await this.runTest('Login form should exist', async () => {
            const loginForm = await this.app.client.$('#loginForm');
            return await loginForm.isExisting();
        });

        await this.runTest('Agent code input validation', async () => {
            const agentCodeInput = await this.app.client.$('#agentCode');
            await agentCodeInput.setValue('A001');
            const value = await agentCodeInput.getValue();
            return value === 'A001';
        });

        await this.runTest('Connection status indicator exists', async () => {
            const indicator = await this.app.client.$('#connectionIndicator');
            return await indicator.isExisting();
        });
    }

    async testApiConnection() {
        console.log('\n🌐 Testing API Connection...');
        
        await this.runTest('API client should be available', async () => {
            const result = await this.app.client.execute(() => {
                return typeof window.ApiClient !== 'undefined';
            });
            return result.value;
        });

        await this.runTest('Health check endpoint', async () => {
            const result = await this.app.client.executeAsync((done) => {
                const api = new window.ApiClient();
                api.checkHealth()
                    .then(response => done(response.success))
                    .catch(() => done(false));
            });
            return result.value;
        });
    }

    async testStatusManagement() {
        console.log('\n📊 Testing Status Management...');
        
        // Simulate login first
        await this.simulateLogin();

        await this.runTest('Status buttons should exist', async () => {
            const statusBtns = await this.app.client.$$('.status-btn');
            return statusBtns.length >= 4;
        });

        await this.runTest('Current status display', async () => {
            const statusDisplay = await this.app.client.$('#currentStatus');
            return await statusDisplay.isExisting();
        });
    }

    async testMessageSystem() {
        console.log('\n💬 Testing Message System...');
        
        await this.runTest('Message manager should initialize', async () => {
            const result = await this.app.client.execute(() => {
                return typeof window.messageManager !== 'undefined';
            });
            return result.value;
        });

        await this.runTest('Compose button should exist', async () => {
            const composeBtn = await this.app.client.$('#composeBtn');
            return await composeBtn.isExisting();
        });
    }

    async testWebSocketConnection() {
        console.log('\n🔌 Testing WebSocket Connection...');
        
        await this.runTest('WebSocket manager should initialize', async () => {
            const result = await this.app.client.execute(() => {
                return typeof window.WebSocketManager !== 'undefined';
            });
            return result.value;
        });

        await this.runTest('Connection status tracking', async () => {
            const wsStatus = await this.app.client.$('#wsStatus');
            return await wsStatus.isExisting();
        });
    }

    async simulateLogin() {
        // Fill login form
        await this.app.client.$('#agentCode').setValue('A001');
        await this.app.client.$('#password').setValue('password123');
        await this.app.client.$('#serverUrl').setValue('http://localhost:3001');
        
        // Submit form (but don't actually login to avoid requiring running server)
        // await this.app.client.$('#loginForm').submitForm();
    }

    async runTest(testName, testFn) {
        this.testResults.total++;
        
        try {
            const result = await testFn();
            if (result) {
                console.log(`✅ ${testName}`);
                this.testResults.passed++;
            } else {
                console.log(`❌ ${testName}`);
                this.testResults.failed++;
                this.testResults.errors.push(`${testName}: Test assertion failed`);
            }
        } catch (error) {
            console.log(`❌ ${testName}: ${error.message}`);
            this.testResults.failed++;
            this.testResults.errors.push(`${testName}: ${error.message}`);
        }
    }

    printResults() {
        console.log('\n📊 Test Results Summary:');
        console.log(`Total Tests: ${this.testResults.total}`);
        console.log(`Passed: ${this.testResults.passed}`);
        console.log(`Failed: ${this.testResults.failed}`);
        console.log(`Success Rate: ${((this.testResults.passed / this.testResults.total) * 100).toFixed(1)}%`);
        
        if (this.testResults.errors.length > 0) {
            console.log('\n❌ Failed Tests:');
            this.testResults.errors.forEach(error => {
                console.log(`  • ${error}`);
            });
        }
        
        if (this.testResults.failed === 0) {
            console.log('\n🎉 All tests passed!');
        }
    }
}

// Run tests if called directly
if (require.main === module) {
    const tester = new IntegrationTester();
    tester.runAllTests()
        .then(() => {
            console.log('\n✅ Test suite completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Test suite failed:', error);
            process.exit(1);
        });
}

module.exports = IntegrationTester;
```

### 📚 **Complete Documentation (Documentation ที่ขาดหายไป)**

**README.md:**

```markdown
# Agent Desktop Application - Phase 2
## MongoDB + WebSocket API Integration

### 🎯 Overview
Agent Desktop Application สำหรับ Call Center Agents ที่เชื่อมต่อกับ Phase 2 API ที่ใช้:
- **MongoDB** สำหรับเก็บข้อมูล Agent และ Messages
- **WebSocket** สำหรับการสื่อสารแบบ Real-time
- **RESTful API** สำหรับ CRUD operations

### 🏗️ Architecture

```
┌─────────────────────────────────┐
│    Electron Desktop App         │ ← Frontend (Phase 2)
│    (Agent Interface)            │
└─────────────┬───────────────────┘
              │ HTTP REST + WebSocket
              ▼
┌─────────────────────────────────┐
│    Node.js + Express API        │ ← Backend (Phase 2)
│    + Socket.io WebSocket        │
└─────────────┬───────────────────┘
              │ Database Queries
              ▼
┌─────────────────────────────────┐
│    MongoDB Database             │ ← Data Storage
│    (Agents + Messages)          │
└─────────────────────────────────┘
```

### 🚀 Quick Start

#### Prerequisites
- Node.js 16+ และ npm
- Phase 2 API Server ที่รันอยู่บน localhost:3001
- MongoDB ที่เชื่อมต่อได้

#### Installation
```bash
# 1. Clone และ install dependencies
git clone <repository>
cd agent-desktop-phase2
npm install

# 2. ตั้งค่า environment
cp .env.example .env

# 3. รันใน development mode
npm run dev

# 4. Build สำหรับ production
npm run build
```

### 🎮 Usage Guide

#### การเข้าสู่ระบบ
1. เปิดแอป Agent Desktop
2. ใส่รหัส Agent (รูปแบบ A001)
3. ใส่รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)
4. ตรวจสอบ Server URL (default: http://localhost:3001)
5. คลิก "เข้าสู่ระบบ"

#### การจัดการสถานะ
- คลิกปุ่มสถานะที่ต้องการ (Available, Busy, Break, Not Ready)
- ใส่เหตุผล (ไม่บังคับ) ในช่อง input
- สถานะจะอัพเดทใน MongoDB และส่งผ่าน WebSocket

#### การส่งข้อความ
1. คลิก "เขียนข้อความ" ในแผง Messages
2. เลือกผู้รับ (Agent Code หรือ ALL สำหรับ broadcast)
3. เลือกประเภทข้อความ (message, alert, broadcast)
4. เลือกระดับความสำคัญ (normal, high, urgent)
5. พิมพ์ข้อความและคลิก "ส่งข้อความ"

### ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+R` | รีเฟรชข้อมูล |
| `Ctrl+Q` | ออกจากระบบ |
| `Ctrl+M` | เขียนข้อความใหม่ |
| `Ctrl+1` | เปลี่ยนเป็น Available |
| `Ctrl+2` | เปลี่ยนเป็น Busy |
| `Ctrl+3` | เปลี่ยนเป็น Break |
| `F12` | Developer Tools |
| `F11` | เต็มจอ |
| `Escape` | ปิด Modal |

### 🔧 Development

#### Project Structure
```
src/
├── main/                  # Main Process (Node.js)
│   ├── main.js           # Application entry point
│   └── menu.js           # Application menu
├── renderer/             # Renderer Process (Web UI)
│   ├── index.html        # Main dashboard
│   ├── login.html        # Login window
│   ├── css/
│   │   └── style.css     # Main styles
│   └── js/
│       ├── api-client.js     # API communication layer
│       ├── websocket-manager.js # WebSocket management
│       ├── login.js          # Login handling
│       ├── dashboard.js      # Main dashboard logic
│       ├── message-manager.js # Message system
│       ├── notification-manager.js # Notifications
│       └── utils.js          # Utility functions
└── assets/               # Static resources
    └── icon.png          # App icon
```

#### API Integration
แอปพลิเคชันเชื่อมต่อกับ Phase 2 API endpoints:

**Agent Management:**
- `GET /api/agents` - ดูรายการ agents
- `GET /api/agents/:id` - ดูข้อมูล agent เฉพาะ
- `PATCH /api/agents/:id/status` - อัพเดทสถานะ
- `GET /api/agents/status/summary` - สถิติสถานะ

**Message System:**
- `POST /api/messages` - ส่งข้อความ
- `GET /api/messages/:agentCode` - ดูข้อความของ agent
- `PATCH /api/messages/:id/read` - ทำเครื่องหมายว่าอ่านแล้ว

**WebSocket Events:**
- `agent-login` - Agent เข้าสู่ระบบ
- `agentStatusChanged` - สถานะ agent เปลี่ยน
- `newMessage` - ข้อความใหม่
- `agent-online/offline` - Agent ออนไลน์/ออฟไลน์

### 🧪 Testing

```bash
# รัน integration tests
npm test

# รัน API connection test
npm run test-api

# Manual testing checklist
npm run test-manual
```

### 🚨 Troubleshooting

#### ปัญหาที่พบบ่อย

**1. ไม่สามารถเชื่อมต่อ API ได้**
- ตรวจสอบว่า Phase 2 API Server รันอยู่บน port 3001
- ตรวจสอบ MongoDB connection
- ตรวจสอบ CORS settings

**2. WebSocket ไม่ทำงาน**
- ตรวจสอบ Socket.io server ใน API
- ตรวจสอบ firewall settings
- ลองรีสตาร์ท API server

**3. การเข้าสู่ระบบล้มเหลว**
- ตรวจสอบ Agent Code ในฐานข้อมูล
- ตรวจสอบรูปแบบ Agent Code (A001)
- ตรวจสอบ Server URL

### 📈 Performance Tips

1. **Memory Usage**: แอปจะใช้หน่วยความจำประมาณ 150-200MB
2. **Network**: WebSocket จะใช้ bandwidth น้อยมากสำหรับ real-time updates
3. **Database**: แต่ละ status update จะสร้าง record ใหม่ใน MongoDB
4. **Caching**: แอปจะ cache ข้อมูล agent และ messages ใน memory

### 🔄 Updates & Maintenance

#### การอัพเดทแอป
1. ดาวน์โหลดเวอร์ชันใหม่
2. ปิดแอปเดิม
3. ติดตั้งเวอร์ชันใหม่
4. รันแอปใหม่

#### Logs และ Debugging
- Logs จะแสดงใน Console (F12)
- Error reports จะส่งไปยัง main process
- ใช้ Developer Tools สำหรับ debugging

### 🆘 Support

หากพบปัญหา กรุณาติดต่อ:
- **IT Support**: ext. 1234
- **Email**: support@company.com
- **Help Desk**: help.company.com

### 📄 License
Copyright (c) 2024 Agent Wallboard System
```

### 🎉 **Final Integration Checklist**

```bash
# Phase 2 Integration Checklist

✅ Project Structure
  ✅ Proper folder organization
  ✅ All required files created
  ✅ Assets and resources in place

✅ API Integration
  ✅ ApiClient class implementation
  ✅ MongoDB endpoint compatibility
  ✅ Error handling and retries
  ✅ Authentication flow

✅ WebSocket Integration
  ✅ Socket.io client setup
  ✅ Real-time event handlers
  ✅ Connection management
  ✅ Reconnection logic

✅ UI Components
  ✅ Login window implementation
  ✅ Main dashboard layout
  ✅ Status management interface
  ✅ Message system UI
  ✅ Notification system

✅ Electron Integration
  ✅ Main process setup
  ✅ IPC communication
  ✅ Menu integration
  ✅ Window management

✅ Testing & Documentation
  ✅ Integration tests
  ✅ API connection tests
  ✅ User documentation
  ✅ Developer guide

✅ Phase 2 Compatibility
  ✅ MongoDB operations
  ✅ WebSocket real-time features
  ✅ Enhanced message system
  ✅ Online/offline tracking
```
