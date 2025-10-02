export const showDesktopNotification = async (title, body) => {
  console.log('🔔 [Step 1] showDesktopNotification called');
  console.log('   Title:', title);
  console.log('   Body:', body);
  
  try {
    // Check Electron API
    console.log('🔔 [Step 2] Checking window.electronAPI:', !!window.electronAPI);
    console.log('🔔 [Step 3] Checking showNotification:', !!window.electronAPI?.showNotification);
    
    if (window.electronAPI && window.electronAPI.showNotification) {
      console.log('🔔 [Step 4] Using Electron API');
      
      const result = await window.electronAPI.showNotification(title, body);
      
      console.log('🔔 [Step 5] Electron API result:', result);
      
      if (result.success) {
        console.log('✅ [Step 6] Notification shown successfully');
        return true;
      } else {
        console.error('❌ [Step 6] Notification failed:', result.error);
      }
    } else {
      console.log('⚠️ [Step 4] Electron API not available, trying Web API');
    }
    
    // Fallback to Web Notification API
    if ('Notification' in window) {
      console.log('🔔 [Step 7] Notification API available');
      console.log('🔔 [Step 8] Permission:', Notification.permission);
      
      if (Notification.permission === 'granted') {
        console.log('🔔 [Step 9] Creating notification');
        
        const notification = new Notification(title, {
          body,
          icon: '/assets/icon.png',
          badge: '/assets/tray-icon.png'
        });
        
        notification.onclick = () => {
          console.log('🔔 [Step 10] Notification clicked');
          window.focus();
        };
        
        console.log('✅ [Step 11] Web notification created');
        return true;
        
      } else if (Notification.permission === 'default') {
        console.log('🔔 [Step 9] Requesting permission');
        const permission = await Notification.requestPermission();
        console.log('🔔 [Step 10] Permission result:', permission);
        
        if (permission === 'granted') {
          return showDesktopNotification(title, body);
        }
      } else {
        console.error('❌ [Step 9] Permission denied');
      }
    } else {
      console.error('❌ [Step 7] Notification API not available');
    }
    
    return false;
    
  } catch (error) {
    console.error('❌ [Error] Notification error:', error);
    console.error('   Stack:', error.stack);
    return false;
  }
};

export const requestNotificationPermission = async () => {
  if ('Notification' in window && Notification.permission === 'default') {
    const permission = await Notification.requestPermission();
    console.log('Notification permission:', permission);
    return permission;
  }
  return Notification.permission;
};