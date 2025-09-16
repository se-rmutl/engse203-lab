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