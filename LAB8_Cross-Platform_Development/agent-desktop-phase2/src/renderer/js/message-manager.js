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