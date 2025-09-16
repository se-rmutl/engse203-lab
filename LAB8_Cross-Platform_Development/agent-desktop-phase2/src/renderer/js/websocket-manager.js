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