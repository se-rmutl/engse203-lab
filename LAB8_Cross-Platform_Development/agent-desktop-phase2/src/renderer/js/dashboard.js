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
            
            // เรียกใน initialize()
            this.setupIpcHandlers();

            console.log('✅ Agent Dashboard initialized successfully');
            this.addRealtimeUpdate('ระบบเริ่มต้นสำเร็จ', 'success');
            
        } catch (error) {
            console.error('❌ Dashboard initialization error:', error);
            this.showError('เกิดข้อผิดพลาดในการเริ่มต้นระบบ: ' + error.message);
            
            // Fallback to logout if initialization fails
            setTimeout(() => this.logout(), 3000);
        }
    }

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



