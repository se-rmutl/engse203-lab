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