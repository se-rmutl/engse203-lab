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