const { contextBridge, ipcRenderer } = require('electron');

console.log('🌉 [PRELOAD] กำลังตั้งค่า security bridge...');

// ✅ เปิดเผย APIs ที่ปลอดภัยให้ Renderer ใช้
contextBridge.exposeInMainWorld('electronAPI', {
    
  // 📤 ส่งข้อความไป Main Process
  sendMessage: (message) => {
    console.log('📤 [PRELOAD] ส่งข้อความ:', message);
    return ipcRenderer.invoke('send-message', message);
  },
  
  // 👋 Hello function ทดสอบ
  sayHello: (name) => {
    console.log('👋 [PRELOAD] ส่งคำทักทาย:', name);
    return ipcRenderer.invoke('say-hello', name);
  }

});

console.log('✅ [PRELOAD] Security bridge พร้อมแล้ว');