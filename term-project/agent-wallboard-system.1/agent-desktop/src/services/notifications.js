// Notification service with Electron and browser support

export const showDesktopNotification = async (title, body, icon = null) => {
  try {
    // Try Electron API first
    if (window.electronAPI && window.electronAPI.showNotification) {
      const result = await window.electronAPI.showNotification(title, body);
      return result.success;
    }
    
    // Fallback to browser Notification API
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        const notification = new Notification(title, {
          body,
          icon: icon || '/assets/icon.png',
          badge: '/assets/tray-icon.png',
          tag: 'agent-wallboard',
          requireInteraction: false,
          silent: false
        });
        
        // Auto-close after 5 seconds
        setTimeout(() => {
          notification.close();
        }, 5000);
        
        return true;
      } else {
        console.warn('Notification permission not granted');
        return false;
      }
    }
    
    console.warn('Notifications not supported');
    return false;
    
  } catch (error) {
    console.error('Notification error:', error);
    return false;
  }
};

export const requestNotificationPermission = async () => {
  try {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      console.log('Notification permission:', permission);
      return permission === 'granted';
    }
    
    return Notification.permission === 'granted';
  } catch (error) {
    console.error('Permission request error:', error);
    return false;
  }
};

export const playNotificationSound = () => {
  try {
    // Create audio element for notification sound
    const audio = new Audio('/assets/notification.mp3');
    audio.volume = 0.5;
    audio.play().catch(error => {
      console.log('Could not play notification sound:', error);
    });
  } catch (error) {
    console.log('Notification sound not available:', error);
  }
};

export const showSystemNotification = (title, message, type = 'info') => {
  // Show in-app notification for important system messages
  const notification = document.createElement('div');
  notification.className = `system-notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <strong>${title}</strong>
      <p>${message}</p>
    </div>
    <button class="notification-close">&times;</button>
  `;
  
  // Style the notification
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#4caf50'};
    color: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 10000;
    max-width: 300px;
    animation: slideIn 0.3s ease-out;
  `;
  
  // Add close functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.onclick = () => notification.remove();
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
};