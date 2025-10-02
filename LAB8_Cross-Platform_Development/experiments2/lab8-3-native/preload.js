const { contextBridge, ipcRenderer } = require('electron');

console.log('🌉 [PRELOAD] ตั้งค่า Native APIs...');

// เปิดเผย Native APIs ให้ Renderer ใช้
contextBridge.exposeInMainWorld('nativeAPI', {

    // 📁 File Operations
    openFile: () => {
        console.log('📁 [PRELOAD] เปิดไฟล์...');
        return ipcRenderer.invoke('open-file');
    },

    saveFile: (content, fileName) => {
        console.log('💾 [PRELOAD] บันทึกไฟล์...');
        return ipcRenderer.invoke('save-file', { content, fileName });
    },

    // 🔔 Notifications
    showNotification: (title, body, urgent = false) => {
        console.log('🔔 [PRELOAD] แสดง notification:', title);
        return ipcRenderer.invoke('show-notification', { title, body, urgent });
    },

    notifyAgentEvent: (agentName, eventType, details = {}) => {
        console.log('📢 [PRELOAD] Agent event:', agentName, eventType);
        return ipcRenderer.invoke('notify-agent-event', { agentName, eventType, details });
    },

    // 🖱️ System Tray Events
    onStatusChangedFromTray: (callback) => {
        console.log('🖱️ [PRELOAD] ลงทะเบียน tray status listener');
        ipcRenderer.on('status-changed-from-tray', (event, data) => callback(data));
    },

    hideToTray: () => ipcRenderer.send('hide-to-tray'),
    
    showApp: () => ipcRenderer.send('show-app')


});

console.log('✅ [PRELOAD] Native APIs พร้อมใช้งาน');

