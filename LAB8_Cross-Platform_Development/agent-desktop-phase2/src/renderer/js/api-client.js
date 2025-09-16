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