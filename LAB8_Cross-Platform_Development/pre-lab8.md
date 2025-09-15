# Pre-LAB8: Cross-Platform Development with Electron.js
## พัฒนา Desktop Application สำหรับ Agent Wallboard System

### 🎯 **วัตถุประสงค์**
- พัฒนา Desktop Application ด้วย Electron.js ที่เชื่อมต่อกับ API ที่สร้างไว้ใน Phase 1-2
- เรียนรู้การทำงานร่วมกันระหว่าง Frontend (Desktop) และ Backend (API)
- ปรับปรุงโครงสร้างโค้ดให้เรียบง่ายและใช้งานได้จริง

### 📋 **Pre-requisites**
- ✅ API Phase 1 สำเร็จแล้ว (REST API + CRUD Operations)
- ✅ API Phase 2 สำเร็จแล้ว (MongoDB + WebSocket + Messages)
- ✅ Node.js และ npm ติดตั้งแล้ว

---

## ⏰ **Time Allocation (4 ชั่วโมง)**
- **Hour 1:** Electron.js Setup + Project Structure (60 นาที)
- **Hour 2:** Main Window + API Integration (60 นาที)  
- **Hour 3:** Agent Status Management + Real-time Updates (60 นาที)
- **Hour 4:** Message System + Polish (60 นาที)

---

## 🚀 **HOUR 1: Electron Setup & Project Structure**

### 📦 **Step 1: Project Initialization (15 นาที)**

```bash
# 1. สร้างโปรเจค Desktop App
mkdir agent-desktop-app
cd agent-desktop-app

# 2. Initialize npm
npm init -y

# 3. ติดตั้ง dependencies
npm install electron
npm install axios socket.io-client
npm install --save-dev electron-builder nodemon

# 4. สร้าง folder structure
mkdir src assets css
touch main.js src/renderer.js css/style.css assets/.gitkeep
```

### 📁 **Step 2: Project Structure (10 นาที)**

```
agent-desktop-app/
├── 📁 assets/              # Icons และ images
│   └── agent_icon.png
├── 📁 css/                 # Stylesheets
│   └── style.css
├── 📁 src/                 # Renderer scripts
│   ├── renderer.js         # Main renderer logic
│   ├── api.js             # API communication
│   └── websocket.js       # WebSocket handling
├── 📄 main.js             # Main Electron process
├── 📄 index.html          # Main window HTML
├── 📄 package.json
└── 📄 .env               # Environment config
```

### ⚙️ **Step 3: Package.json Configuration (10 นาที)**

```json
{
  "name": "agent-desktop-app",
  "version": "1.0.0",
  "description": "Agent Wallboard Desktop Application",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "dev": "nodemon --exec electron .",
    "build": "electron-builder",
    "pack": "electron-builder --dir"
  },
  "build": {
    "appId": "com.company.agent-wallboard",
    "productName": "Agent Wallboard",
    "directories": {
      "output": "dist"
    },
    "files": [
      "**/*",
      "!dist/**/*"
    ],
    "win": {
      "target": "nsis",
      "icon": "assets/agent_icon.ico"
    }
  },
  "dependencies": {
    "electron": "^latest",
    "axios": "^1.6.0",
    "socket.io-client": "^4.7.0"
  },
  "devDependencies": {
    "electron-builder": "^latest",
    "nodemon": "^3.0.0"
  }
}
```

### 🔧 **Step 4: Environment Configuration (10 นาที)**

```env
# .env
API_BASE_URL=http://localhost:3001
WS_BASE_URL=http://localhost:3001
ENVIRONMENT=development
```

### 🖥️ **Step 5: Main Process Setup (15 นาที)**

```javascript
// main.js - Main Electron Process
const { app, BrowserWindow, Menu, Tray, nativeImage, ipcMain } = require('electron');
const path = require('path');

// Load environment variables
require('dotenv').config();

class AgentDesktopApp {
  constructor() {
    this.mainWindow = null;
    this.tray = null;
    this.isAppReady = false;
  }

  // Create main application window
  createMainWindow() {
    this.mainWindow = new BrowserWindow({
      width: 400,
      height: 500,
      icon: path.join(__dirname, 'assets/agent_icon.png'),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
      },
      show: false,
      frame: true,
      resizable: true,
      alwaysOnTop: false
    });

    // Load the HTML file
    this.mainWindow.loadFile('index.html');

    // Show window when ready
    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow.show();
    });

    // Handle window close
    this.mainWindow.on('close', (event) => {
      if (!app.isQuiting) {
        event.preventDefault();
        this.mainWindow.hide();
      }
    });

    // Development tools
    if (process.env.ENVIRONMENT === 'development') {
      this.mainWindow.webContents.openDevTools();
    }
  }

  // Create system tray
  createTray() {
    const iconPath = path.join(__dirname, 'assets/agent_icon.png');
    this.tray = new Tray(nativeImage.createFromPath(iconPath));
    
    const contextMenu = Menu.buildFromTemplate([
      { 
        label: 'Show Agent App', 
        click: () => {
          this.mainWindow.show();
        }
      },
      { type: 'separator' },
      { 
        label: 'Quit', 
        click: () => {
          app.isQuiting = true;
          app.quit();
        }
      }
    ]);

    this.tray.setToolTip('Agent Wallboard');
    this.tray.setContextMenu(contextMenu);
    
    // Double click to show/hide
    this.tray.on('double-click', () => {
      if (this.mainWindow.isVisible()) {
        this.mainWindow.hide();
      } else {
        this.mainWindow.show();
      }
    });
  }

  // Initialize the application
  initialize() {
    app.whenReady().then(() => {
      this.createMainWindow();
      this.createTray();
      this.setupIPC();
      this.isAppReady = true;
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createMainWindow();
      }
    });
  }

  // Setup IPC communication
  setupIPC() {
    ipcMain.on('app-close', () => {
      app.isQuiting = true;
      app.quit();
    });

    ipcMain.on('app-minimize', () => {
      this.mainWindow.hide();
    });
  }
}

// Create and start the application
const agentApp = new AgentDesktopApp();
agentApp.initialize();

module.exports = agentApp;
```

---

## 🎨 **HOUR 2: Main Window + API Integration**

### 📄 **Step 6: HTML Structure (20 นาที)**

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agent Wallboard</title>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <div class="app-container">
        <!-- Header -->
        <div class="header">
            <div class="title">
                <i class="fas fa-headset"></i>
                Agent Wallboard
            </div>
            <div class="window-controls">
                <button id="minimize-btn" class="control-btn">
                    <i class="fas fa-minus"></i>
                </button>
                <button id="close-btn" class="control-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>

        <!-- Connection Status -->
        <div class="status-section">
            <div class="connection-status" id="connection-status">
                <i class="fas fa-circle" id="status-icon"></i>
                <span id="status-text">Disconnected</span>
            </div>
        </div>

        <!-- Agent Login Form -->
        <div class="login-section" id="login-section">
            <h3>Agent Login</h3>
            <div class="input-group">
                <label for="agent-code">Agent Code</label>
                <input type="text" id="agent-code" placeholder="Enter your agent code" required>
            </div>
            <div class="input-group">
                <label for="agent-name">Agent Name</label>
                <input type="text" id="agent-name" placeholder="Enter your name" required>
            </div>
            <button id="login-btn" class="primary-btn">
                <i class="fas fa-sign-in-alt"></i>
                Login
            </button>
        </div>

        <!-- Agent Dashboard -->
        <div class="dashboard-section hidden" id="dashboard-section">
            <div class="agent-info">
                <h3 id="agent-display-name">Agent Name</h3>
                <p id="agent-display-code">Agent Code</p>
            </div>

            <!-- Status Control -->
            <div class="status-control">
                <label for="status-select">Current Status:</label>
                <select id="status-select">
                    <option value="Available">Available</option>
                    <option value="Busy">Busy</option>
                    <option value="Wrap">Wrap</option>
                    <option value="Break">Break</option>
                    <option value="Not Ready">Not Ready</option>
                </select>
                <button id="update-status-btn" class="secondary-btn">
                    Update Status
                </button>
            </div>

            <!-- Messages -->
            <div class="messages-section">
                <h4>
                    <i class="fas fa-envelope"></i>
                    Messages
                    <span class="message-count" id="message-count">0</span>
                </h4>
                <div class="messages-container" id="messages-container">
                    <!-- Messages will be displayed here -->
                </div>
            </div>

            <!-- Actions -->
            <div class="actions">
                <button id="logout-btn" class="danger-btn">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                </button>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <span id="last-update">Ready</span>
        </div>
    </div>

    <!-- Load Scripts -->
    <script src="src/api.js"></script>
    <script src="src/websocket.js"></script>
    <script src="src/renderer.js"></script>
</body>
</html>
```

### 🎨 **Step 7: CSS Styling (15 นาที)**

```css
/* css/style.css */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #333;
    height: 100vh;
    overflow: hidden;
}

.app-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 10px;
    margin: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

/* Header */
.header {
    background: #2c3e50;
    color: white;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px 10px 0 0;
}

.title {
    font-weight: bold;
    font-size: 16px;
}

.title i {
    margin-right: 8px;
    color: #3498db;
}

.window-controls {
    display: flex;
    gap: 5px;
}

.control-btn {
    background: none;
    border: none;
    color: white;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
}

.control-btn:hover {
    background: rgba(255,255,255,0.1);
}

/* Status Section */
.status-section {
    padding: 15px 20px;
    background: #ecf0f1;
    border-bottom: 1px solid #bdc3c7;
}

.connection-status {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
}

#status-icon.connected {
    color: #27ae60;
}

#status-icon.disconnected {
    color: #e74c3c;
}

/* Login Section */
.login-section {
    padding: 20px;
    flex: 1;
}

.login-section h3 {
    margin-bottom: 20px;
    color: #2c3e50;
}

.input-group {
    margin-bottom: 15px;
}

.input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #555;
}

.input-group input {
    width: 100%;
    padding: 10px;
    border: 2px solid #bdc3c7;
    border-radius: 5px;
    font-size: 14px;
    transition: border-color 0.2s;
}

.input-group input:focus {
    outline: none;
    border-color: #3498db;
}

/* Buttons */
.primary-btn, .secondary-btn, .danger-btn {
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    width: 100%;
}

.primary-btn {
    background: #3498db;
    color: white;
}

.primary-btn:hover {
    background: #2980b9;
}

.secondary-btn {
    background: #95a5a6;
    color: white;
}

.secondary-btn:hover {
    background: #7f8c8d;
}

.danger-btn {
    background: #e74c3c;
    color: white;
}

.danger-btn:hover {
    background: #c0392b;
}

/* Dashboard Section */
.dashboard-section {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.agent-info {
    text-align: center;
    background: #f8f9fa;
    padding: 15px;
    border-radius: 5px;
}

.agent-info h3 {
    color: #2c3e50;
    margin-bottom: 5px;
}

.agent-info p {
    color: #7f8c8d;
    font-weight: 500;
}

/* Status Control */
.status-control {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 5px;
}

.status-control label {
    display: block;
    margin-bottom: 10px;
    font-weight: 500;
    color: #555;
}

.status-control select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 2px solid #bdc3c7;
    border-radius: 5px;
    font-size: 14px;
}

/* Messages Section */
.messages-section {
    flex: 1;
    background: #f8f9fa;
    border-radius: 5px;
    padding: 15px;
    display: flex;
    flex-direction: column;
}

.messages-section h4 {
    color: #2c3e50;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.message-count {
    background: #e74c3c;
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
}

.messages-container {
    flex: 1;
    overflow-y: auto;
    max-height: 150px;
}

.message-item {
    background: white;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border-left: 4px solid #3498db;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.message-header {
    font-size: 12px;
    color: #7f8c8d;
    margin-bottom: 5px;
}

.message-content {
    font-size: 14px;
    color: #2c3e50;
}

/* Footer */
.footer {
    background: #ecf0f1;
    padding: 10px 20px;
    text-align: center;
    font-size: 12px;
    color: #7f8c8d;
    border-radius: 0 0 10px 10px;
}

/* Utility Classes */
.hidden {
    display: none !important;
}

.fade-in {
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Scrollbar */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
```

### 🔌 **Step 8: API Communication (25 นาที)**

```javascript
// src/api.js - API Communication Layer
class AgentAPI {
    constructor() {
        this.baseURL = process.env.API_BASE_URL || 'http://localhost:3001';
        this.currentAgent = null;
    }

    // Login agent (create new agent if not exists)
    async loginAgent(agentCode, agentName) {
        try {
            // First try to find existing agent
            let agent = await this.getAgent(agentCode);
            
            if (!agent) {
                // Create new agent if not exists
                const response = await fetch(`${this.baseURL}/api/agents`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        agentCode: agentCode,
                        name: agentName,
                        email: `${agentCode}@company.com`,
                        department: 'General'
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to create agent');
                }

                agent = await response.json();
                agent = agent.data;
            }

            // Update status to Available
            await this.updateAgentStatus(agentCode, 'Available');
            
            this.currentAgent = agent;
            return agent;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    // Get agent by code
    async getAgent(agentCode) {
        try {
            const response = await fetch(`${this.baseURL}/api/agents/${agentCode}`);
            if (response.ok) {
                const result = await response.json();
                return result.data;
            }
            return null;
        } catch (error) {
            console.error('Get agent error:', error);
            return null;
        }
    }

    // Update agent status
    async updateAgentStatus(agentCode, status) {
        try {
            const response = await fetch(`${this.baseURL}/api/agents/${agentCode}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            return await response.json();
        } catch (error) {
            console.error('Update status error:', error);
            throw error;
        }
    }

    // Get messages for agent
    async getMessages(agentCode) {
        try {
            const response = await fetch(`${this.baseURL}/api/messages/${agentCode}`);
            if (response.ok) {
                const result = await response.json();
                return result.data || [];
            }
            return [];
        } catch (error) {
            console.error('Get messages error:', error);
            return [];
        }
    }

    // Logout agent
    async logoutAgent(agentCode) {
        try {
            await this.updateAgentStatus(agentCode, 'Offline');
            this.currentAgent = null;
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    // Test API connection
    async testConnection() {
        try {
            const response = await fetch(`${this.baseURL}/api/health`);
            return response.ok;
        } catch (error) {
            console.error('Connection test failed:', error);
            return false;
        }
    }
}

// Export for use in renderer
window.AgentAPI = AgentAPI;
```

---

## 📡 **HOUR 3: Agent Status Management + Real-time Updates**

### 🔌 **Step 9: WebSocket Integration (20 นาที)**

```javascript
// src/websocket.js - WebSocket Communication
class AgentWebSocket {
    constructor(apiInstance) {
        this.api = apiInstance;
        this.socket = null;
        this.wsURL = process.env.WS_BASE_URL || 'http://localhost:3001';
        this.isConnected = false;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }

    // Initialize WebSocket connection
    connect() {
        try {
            // Note: socket.io-client should be available globally
            this.socket = io(this.wsURL, {
                transports: ['websocket', 'polling']
            });

            this.setupEventListeners();
        } catch (error) {
            console.error('WebSocket connection error:', error);
            this.handleReconnect();
        }
    }

    // Setup event listeners
    setupEventListeners() {
        this.socket.on('connect', () => {
            console.log('WebSocket connected');
            this.isConnected = true;
            this.reconnectAttempts = 0;
            this.updateConnectionStatus('Connected');
        });

        this.socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
            this.isConnected = false;
            this.updateConnectionStatus('Disconnected');
            this.handleReconnect();
        });

        // Listen for agent status changes
        this.socket.on('agentStatusChanged', (data) => {
            console.log('Agent status changed:', data);
            this.handleAgentStatusUpdate(data);
        });

        // Listen for new messages
        this.socket.on('newMessage', (data) => {
            console.log('New message received:', data);
            this.handleNewMessage(data);
        });

        this.socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
            this.isConnected = false;
            this.updateConnectionStatus('Connection Error');
        });
    }

    // Handle agent status updates
    handleAgentStatusUpdate(data) {
        // Update UI if it's current agent
        if (this.api.currentAgent && data.agentCode === this.api.currentAgent.agentCode) {
            const statusSelect = document.getElementById('status-select');
            if (statusSelect) {
                statusSelect.value = data.newStatus;
            }
            this.updateLastUpdate(`Status updated: ${data.newStatus}`);
        }
    }

    // Handle new messages
    handleNewMessage(data) {
        // Add message to UI if it's for current agent
        if (this.api.currentAgent && 
            (data.to === this.api.currentAgent.agentCode || data.to === 'ALL')) {
            this.addMessageToUI(data);
            this.updateMessageCount();
        }
    }

    // Add message to UI
    addMessageToUI(message) {
        const messagesContainer = document.getElementById('messages-container');
        if (!messagesContainer) return;

        const messageElement = document.createElement('div');
        messageElement.className = 'message-item fade-in';
        messageElement.innerHTML = `
            <div class="message-header">
                From: ${message.from} | ${new Date(message.timestamp).toLocaleString()}
            </div>
            <div class="message-content">
                ${message.message}
            </div>
        `;

        messagesContainer.insertBefore(messageElement, messagesContainer.firstChild);
    }

    // Update message count
    updateMessageCount() {
        const messageCount = document.getElementById('message-count');
        const messagesContainer = document.getElementById('messages-container');
        if (messageCount && messagesContainer) {
            const count = messagesContainer.children.length;
            messageCount.textContent = count;
        }
    }

    // Update connection status UI
    updateConnectionStatus(status) {
        const statusText = document.getElementById('status-text');
        const statusIcon = document.getElementById('status-icon');
        
        if (statusText) statusText.textContent = status;
        
        if (statusIcon) {
            statusIcon.className = 'fas fa-circle ' + 
                (this.isConnected ? 'connected' : 'disconnected');
        }
    }

    // Update last update time
    updateLastUpdate(message) {
        const lastUpdate = document.getElementById('last-update');
        if (lastUpdate) {
            lastUpdate.textContent = `${message} - ${new Date().toLocaleTimeString()}`;
        }
    }

    // Handle reconnection
    handleReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
            
            setTimeout(() => {
                this.connect();
            }, 3000 * this.reconnectAttempts); // Exponential backoff
        } else {
            console.log('Max reconnection attempts reached');
            this.updateConnectionStatus('Connection Failed');
        }
    }

    // Disconnect WebSocket
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.isConnected = false;
        }
    }
}

// Export for use in renderer
window.AgentWebSocket = AgentWebSocket;
```

### 🎛️ **Step 10: Main Renderer Logic (25 นาที)**

```javascript
// src/renderer.js - Main Application Logic
class AgentDesktopRenderer {
    constructor() {
        this.api = new AgentAPI();
        this.websocket = new AgentWebSocket(this.api);
        this.currentAgent = null;
        this.isLoggedIn = false;

        this.init();
    }

    // Initialize the application
    async init() {
        console.log('Initializing Agent Desktop App...');
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Test API connection
        await this.testAPIConnection();
        
        // Initialize WebSocket
        this.websocket.connect();
        
        // Load initial UI state
        this.showLoginSection();
    }

    // Setup all event listeners
    setupEventListeners() {
        // Window controls
        document.getElementById('minimize-btn').addEventListener('click', () => {
            const { ipcRenderer } = require('electron');
            ipcRenderer.send('app-minimize');
        });

        document.getElementById('close-btn').addEventListener('click', () => {
            const { ipcRenderer } = require('electron');
            ipcRenderer.send('app-close');
        });

        // Login functionality
        document.getElementById('login-btn').addEventListener('click', () => {
            this.handleLogin();
        });

        // Enter key for login
        document.getElementById('agent-code').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleLogin();
        });

        document.getElementById('agent-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleLogin();
        });

        // Status update
        document.getElementById('update-status-btn').addEventListener('click', () => {
            this.handleStatusUpdate();
        });

        // Logout functionality
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.handleLogout();
        });
    }

    // Test API connection
    async testAPIConnection() {
        try {
            const isConnected = await this.api.testConnection();
            this.updateConnectionStatus(isConnected ? 'API Connected' : 'API Disconnected');
        } catch (error) {
            console.error('API connection test failed:', error);
            this.updateConnectionStatus('API Error');
        }
    }

    // Handle agent login
    async handleLogin() {
        const agentCode = document.getElementById('agent-code').value.trim();
        const agentName = document.getElementById('agent-name').value.trim();

        if (!agentCode || !agentName) {
            this.showError('Please enter both Agent Code and Name');
            return;
        }

        try {
            this.showLoading('Logging in...');
            
            // Login through API
            const agent = await this.api.loginAgent(agentCode, agentName);
            
            this.currentAgent = agent;
            this.isLoggedIn = true;
            
            // Load messages
            await this.loadMessages();
            
            // Show dashboard
            this.showDashboard();
            
            this.showSuccess('Login successful!');
            
        } catch (error) {
            console.error('Login failed:', error);
            this.showError('Login failed. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    // Handle status update
    async handleStatusUpdate() {
        if (!this.currentAgent) return;

        const newStatus = document.getElementById('status-select').value;
        
        try {
            this.showLoading('Updating status...');
            
            await this.api.updateAgentStatus(this.currentAgent.agentCode, newStatus);
            
            this.showSuccess(`Status updated to: ${newStatus}`);
            
        } catch (error) {
            console.error('Status update failed:', error);
            this.showError('Failed to update status');
        } finally {
            this.hideLoading();
        }
    }

    // Handle logout
    async handleLogout() {
        if (!this.currentAgent) return;

        try {
            this.showLoading('Logging out...');
            
            await this.api.logoutAgent(this.currentAgent.agentCode);
            
            this.currentAgent = null;
            this.isLoggedIn = false;
            
            // Clear form
            document.getElementById('agent-code').value = '';
            document.getElementById('agent-name').value = '';
            
            // Show login section
            this.showLoginSection();
            
            this.showSuccess('Logout successful!');
            
        } catch (error) {
            console.error('Logout failed:', error);
            this.showError('Logout failed');
        } finally {
            this.hideLoading();
        }
    }

    // Load messages for current agent
    async loadMessages() {
        if (!this.currentAgent) return;

        try {
            const messages = await this.api.getMessages(this.currentAgent.agentCode);
            this.displayMessages(messages);
        } catch (error) {
            console.error('Failed to load messages:', error);
        }
    }

    // Display messages in UI
    displayMessages(messages) {
        const container = document.getElementById('messages-container');
        container.innerHTML = '';

        messages.forEach(message => {
            this.websocket.addMessageToUI(message);
        });

        this.websocket.updateMessageCount();
    }

    // Show login section
    showLoginSection() {
        document.getElementById('login-section').classList.remove('hidden');
        document.getElementById('dashboard-section').classList.add('hidden');
    }

    // Show dashboard section
    showDashboard() {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('dashboard-section').classList.remove('hidden');
        
        // Update agent info
        document.getElementById('agent-display-name').textContent = this.currentAgent.name;
        document.getElementById('agent-display-code').textContent = this.currentAgent.agentCode;
        document.getElementById('status-select').value = this.currentAgent.status || 'Available';
    }

    // Update connection status
    updateConnectionStatus(status) {
        const statusText = document.getElementById('status-text');
        if (statusText) {
            statusText.textContent = status;
        }
    }

    // Show success message
    showSuccess(message) {
        this.updateLastUpdate(message);
        console.log('SUCCESS:', message);
    }

    // Show error message
    showError(message) {
        this.updateLastUpdate(`ERROR: ${message}`);
        console.error('ERROR:', message);
    }

    // Show loading state
    showLoading(message) {
        this.updateLastUpdate(`Loading: ${message}`);
    }

    // Hide loading state
    hideLoading() {
        this.updateLastUpdate('Ready');
    }

    // Update last update display
    updateLastUpdate(message) {
        const lastUpdate = document.getElementById('last-update');
        if (lastUpdate) {
            lastUpdate.textContent = `${message} - ${new Date().toLocaleTimeString()}`;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load socket.io client library
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.0/socket.io.js';
    script.onload = () => {
        // Initialize the app after socket.io is loaded
        window.agentApp = new AgentDesktopRenderer();
    };
    document.head.appendChild(script);
});
```

---

## 💬 **HOUR 4: Message System + Polish**

### 📱 **Step 11: Enhanced Message Features (20 นาที)**

```javascript
// เพิ่มใน src/renderer.js - Enhanced Message Features
class MessageManager {
    constructor(api, websocket) {
        this.api = api;
        this.websocket = websocket;
        this.unreadCount = 0;
        this.soundEnabled = true;
    }

    // Play notification sound for new messages
    playNotificationSound() {
        if (this.soundEnabled) {
            // Create simple notification sound
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }
    }

    // Show desktop notification
    showDesktopNotification(message) {
        if (Notification.permission === 'granted') {
            new Notification('New Message from Supervisor', {
                body: message.message,
                icon: '../assets/agent_icon.png',
                badge: '../assets/agent_icon.png'
            });
        }
    }

    // Mark message as read
    markAsRead(messageElement) {
        messageElement.style.opacity = '0.7';
        messageElement.classList.add('message-read');
    }

    // Auto-refresh messages
    startAutoRefresh() {
        setInterval(async () => {
            if (this.api.currentAgent) {
                await this.loadMessages();
            }
        }, 30000); // Refresh every 30 seconds
    }
}
```

### 🎯 **Step 12: Application Enhancement (25 นาที)**

```javascript
// เพิ่มใน src/renderer.js - Application Enhancement
class AgentDesktopRenderer {
    constructor() {
        this.api = new AgentAPI();
        this.websocket = new AgentWebSocket(this.api);
        this.messageManager = new MessageManager(this.api, this.websocket);
        this.currentAgent = null;
        this.isLoggedIn = false;

        this.init();
    }

    async init() {
        console.log('Initializing Agent Desktop App...');
        
        // Request notification permission
        this.requestNotificationPermission();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Test API connection
        await this.testAPIConnection();
        
        // Initialize WebSocket with enhanced features
        this.initializeWebSocket();
        
        // Start auto-refresh
        this.messageManager.startAutoRefresh();
        
        // Load initial UI state
        this.showLoginSection();
    }

    // Request notification permission
    async requestNotificationPermission() {
        if ('Notification' in window) {
            if (Notification.permission === 'default') {
                await Notification.requestPermission();
            }
        }
    }

    // Initialize WebSocket with enhanced message handling
    initializeWebSocket() {
        this.websocket.connect();
        
        // Override message handler to include notifications
        const originalHandleNewMessage = this.websocket.handleNewMessage;
        this.websocket.handleNewMessage = (data) => {
            // Call original handler
            originalHandleNewMessage.call(this.websocket, data);
            
            // Add enhancements
            if (this.currentAgent && 
                (data.to === this.currentAgent.agentCode || data.to === 'ALL')) {
                
                // Play sound
                this.messageManager.playNotificationSound();
                
                // Show desktop notification
                this.messageManager.showDesktopNotification(data);
                
                // Flash window if not focused (for Windows)
                if (process.platform === 'win32') {
                    const { remote } = require('electron');
                    const currentWindow = remote.getCurrentWindow();
                    if (!currentWindow.isFocused()) {
                        currentWindow.flashFrame(true);
                    }
                }
            }
        };
    }

    // Enhanced message display with read status
    displayMessages(messages) {
        const container = document.getElementById('messages-container');
        container.innerHTML = '';

        messages.forEach(message => {
            const messageElement = this.createMessageElement(message);
            container.insertBefore(messageElement, container.firstChild);
        });

        this.websocket.updateMessageCount();
    }

    // Create enhanced message element
    createMessageElement(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message-item fade-in';
        
        const isRecent = new Date() - new Date(message.timestamp) < 300000; // 5 minutes
        if (isRecent) {
            messageElement.classList.add('message-recent');
        }

        messageElement.innerHTML = `
            <div class="message-header">
                From: ${message.from} | ${new Date(message.timestamp).toLocaleString()}
                ${isRecent ? '<span class="message-new-badge">NEW</span>' : ''}
            </div>
            <div class="message-content">
                ${message.message}
            </div>
        `;

        // Add click to mark as read
        messageElement.addEventListener('click', () => {
            this.messageManager.markAsRead(messageElement);
        });

        return messageElement;
    }

    // Enhanced status update with validation
    async handleStatusUpdate() {
        if (!this.currentAgent) return;

        const newStatus = document.getElementById('status-select').value;
        const currentStatus = this.currentAgent.status;
        
        // Prevent unnecessary updates
        if (newStatus === currentStatus) {
            this.showSuccess('Status is already up to date');
            return;
        }

        try {
            this.showLoading('Updating status...');
            
            await this.api.updateAgentStatus(this.currentAgent.agentCode, newStatus);
            
            // Update local agent object
            this.currentAgent.status = newStatus;
            
            this.showSuccess(`Status updated: ${currentStatus} → ${newStatus}`);
            
        } catch (error) {
            console.error('Status update failed:', error);
            this.showError('Failed to update status');
            
            // Revert select to previous value
            document.getElementById('status-select').value = currentStatus;
        } finally {
            this.hideLoading();
        }
    }
}
```

### 🎨 **Step 13: Additional CSS Enhancements (10 นาที)**

```css
/* เพิ่มใน css/style.css - Additional Styles */

/* Message Enhancements */
.message-recent {
    border-left-color: #e74c3c !important;
    animation: glow 2s infinite;
}

.message-read {
    opacity: 0.7;
    background: #f8f9fa !important;
}

.message-new-badge {
    background: #e74c3c;
    color: white;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 10px;
    font-weight: bold;
    margin-left: 10px;
}

@keyframes glow {
    0% { box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    50% { box-shadow: 0 2px 20px rgba(231, 76, 60, 0.3); }
    100% { box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
}

/* Loading States */
.loading {
    opacity: 0.6;
    pointer-events: none;
    position: relative;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Status Indicators */
.status-available { color: #27ae60; }
.status-busy { color: #e74c3c; }
.status-wrap { color: #f39c12; }
.status-break { color: #9b59b6; }
.status-not-ready { color: #95a5a6; }
.status-offline { color: #7f8c8d; }

/* Responsive Design */
@media (max-width: 480px) {
    .app-container {
        margin: 5px;
    }
    
    .header {
        padding: 10px 15px;
    }
    
    .login-section, .dashboard-section {
        padding: 15px;
    }
}

/* Dark Mode Support (Optional) */
@media (prefers-color-scheme: dark) {
    body {
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    }
    
    .app-container {
        background: #2c3e50;
        color: #ecf0f1;
    }
    
    .input-group input, .status-control select {
        background: #34495e;
        color: #ecf0f1;
        border-color: #555;
    }
    
    .message-item {
        background: #34495e;
        color: #ecf0f1;
    }
}
```

### 🔧 **Step 14: Final Configuration & Testing (5 นาที)**

```javascript
// package.json - Final script configuration
{
  "scripts": {
    "start": "electron .",
    "dev": "nodemon --exec electron . --watch main.js --watch src/ --watch css/",
    "build": "electron-builder",
    "build-win": "electron-builder --win",
    "build-mac": "electron-builder --mac",
    "pack": "electron-builder --dir",
    "clean": "rimraf dist/ node_modules/.cache/"
  }
}
```

---

## 🧪 **Testing & Validation**

### ✅ **Step 15: Testing Checklist (15 นาที)**

**1. API Connection Testing:**
```bash
# เริ่ม API Server ก่อน
cd agent-wallboard-api
npm run dev

# จากนั้นเริ่ม Desktop App
cd agent-desktop-app
npm run dev
```

**2. Feature Testing:**
- ✅ Agent Login/Logout
- ✅ Status Updates (Available, Busy, Wrap, Break, Not Ready)
- ✅ Real-time WebSocket Connection
- ✅ Message Receiving from Supervisor
- ✅ Desktop Notifications
- ✅ Window Controls (Minimize, Close)
- ✅ System Tray Integration

**3. Error Handling Testing:**
- ✅ API Server Down
- ✅ Invalid Agent Code
- ✅ Network Connection Issues
- ✅ WebSocket Reconnection

---

## 🚀 **Deployment & Distribution**

### 📦 **Step 16: Build Distribution (10 นาที)**

```bash
# Build for Windows
npm run build-win

# Build for macOS
npm run build-mac

# Build for current platform
npm run build

# Output จะอยู่ใน dist/ folder
```

---

## 🎯 **Summary & Next Steps**

### ✅ **What We Accomplished:**
1. **Professional Electron.js Desktop App** - ใช้งานได้จริง
2. **API Integration** - เชื่อมต่อกับ Backend ที่สร้างใน Phase 1-2
3. **Real-time Features** - WebSocket สำหรับ Status Updates และ Messages
4. **User-friendly Interface** - Modern UI/UX design
5. **System Integration** - Tray icon, Desktop notifications
6. **Error Handling** - Robust error management และ reconnection

### 🔄 **Integration Architecture:**
```
Desktop App (Electron.js) ←→ API Server (Node.js) ←→ Database (MongoDB)
         ↕                           ↕
   WebSocket Client            WebSocket Server
```

### 🎨 **Key Features Delivered:**
- 🔐 **Agent Authentication** - Login/Logout with validation
- 📊 **Status Management** - Real-time status updates
- 💬 **Message System** - Receive messages from supervisors
- 🔔 **Notifications** - Desktop และ sound notifications
- 🎛️ **System Tray** - Minimize to tray functionality
- 📱 **Responsive Design** - Clean, modern interface

### 🚀 **Extensions for Advanced Students:**
1. **Message Reply Feature** - ส่งข้อความกลับหา Supervisor
2. **Activity Logging** - Log ประวัติการเปลี่ยน Status
3. **Supervisor Dashboard** - แยก App สำหรับ Supervisor
4. **Advanced Notifications** - Customizable notification settings
5. **Performance Metrics** - แสดง uptime, response time
6. **Auto-updater** - Automatic app updates

### 📚 **Learning Outcomes:**
- **Desktop Development** with Electron.js
- **API Integration** และ HTTP communication
- **Real-time Communication** with WebSocket
- **UI/UX Design** principles
- **System Integration** (Tray, Notifications)
- **Error Handling** และ User Experience

### 💡 **Best Practices Applied:**
- Modular code structure
- Separation of concerns (API, WebSocket, UI)
- Error handling และ user feedback
- Responsive design
- Professional UI/UX
- Performance considerations

---

## 🔧 **Troubleshooting Guide**

### ❗ **Common Issues:**

**1. "Module not found" errors:**
```bash
# ลบ node_modules และติดตั้งใหม่
rm -rf node_modules package-lock.json
npm install
```

**2. WebSocket connection fails:**
```javascript
// ตรวจสอบ API Server running และ CORS settings
// Check port 3001 availability
```

**3. Electron app ไม่เริ่ม:**
```bash
# ตรวจสอบ main.js path ใน package.json
# ตรวจสอบ syntax errors
npm run dev
```

**4. API calls fail:**
```javascript
// ตรวจสอบ API_BASE_URL ใน .env
// ตรวจสอบ CORS configuration ใน API server
```

---

## 📖 **Additional Resources**

**Documentation:**
- [Electron.js Documentation](https://www.electronjs.org/docs)
- [Socket.io Client Documentation](https://socket.io/docs/v4/client-api/)
- [Node.js Fetch API](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#fetch)

**UI/UX Resources:**
- [Font Awesome Icons](https://fontawesome.com/icons)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Electron UI Guidelines](https://www.electronjs.org/docs/latest/tutorial/style)

**Happy Coding! 🎉**