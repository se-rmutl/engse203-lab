const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods to renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Notifications
  showNotification: (title, body) => {
    return ipcRenderer.invoke('show-notification', { title, body });
  },
  
  // Window management
  minimizeToTray: () => {
    return ipcRenderer.invoke('minimize-to-tray');
  },
  
  showApp: () => {
    return ipcRenderer.invoke('show-app');
  },
  
  // App info
  getAppVersion: () => {
    return ipcRenderer.invoke('get-app-version');
  },
  
  // Environment
  isElectron: true,
  platform: process.platform,
  isDevelopment: process.env.NODE_ENV === 'development'
});

// Log when preload is complete
console.log('Preload script loaded');