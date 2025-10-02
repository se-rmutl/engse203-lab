const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Notification API
  showNotification: (title, body) => {
    return ipcRenderer.invoke('show-notification', { title, body });
  },
  
  // App control API
  closeApp: () => {
    return ipcRenderer.invoke('close-app');
  },
  
  minimizeToTray: () => {
    return ipcRenderer.invoke('minimize-to-tray');
  },
  
  showApp: () => {
    return ipcRenderer.invoke('show-app');
  },
  
  // Environment info
  isElectron: true,
  platform: process.platform,
  
  // Version info
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  }
});

// Remove loading screen when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.remove();
  }
});