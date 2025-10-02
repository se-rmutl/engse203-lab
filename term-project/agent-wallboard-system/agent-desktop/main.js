// Load environment variables first
require('dotenv').config();

const { app, BrowserWindow, Tray, Menu, ipcMain, Notification } = require('electron');
const path = require('path');

// Determine if in development mode
const isDev = process.env.ELECTRON_IS_DEV === 'true' || 
              process.env.NODE_ENV === 'development' ||
              !app.isPackaged;

let mainWindow;
let tray;

console.log('Starting Agent Wallboard Desktop App');
console.log('Environment:', isDev ? 'DEVELOPMENT' : 'PRODUCTION');

// IPC Handlers
ipcMain.handle('show-notification', async (event, { title, body }) => {
  try {
    const notification = new Notification({ 
      title, 
      body,
      icon: path.join(__dirname, 'public/assets/icon.png')
    });
    notification.show();
    console.log('✅ Electron notification shown:', title); // เพิ่มบรรทัดนี้
    return { success: true };
  } catch (error) {
    console.error('❌ Notification error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('minimize-to-tray', () => {
  if (mainWindow) {
    mainWindow.hide();
    return { success: true };
  }
  return { success: false };
});

ipcMain.handle('show-app', () => {
  if (mainWindow) {
    mainWindow.show();
    mainWindow.focus();
    return { success: true };
  }
  return { success: false };
});

ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 700,
    minWidth: 350,
    minHeight: 600,
    maxWidth: 500,
    icon: path.join(__dirname, 'public/assets/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      devTools: isDev
    },
    show: false,
    resizable: true,
    maximizable: false,
    frame: true,
    backgroundColor: '#667eea'
  });

  // Load app URL
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, 'build/index.html')}`;
  
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl);

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    console.log('Window ready to show');
    mainWindow.show();
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Handle window close
  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
      
      // Show notification on first minimize
      if (!global.hasShownTrayNotification) {
        if (tray) {
          tray.displayBalloon({
            title: 'Agent Wallboard',
            content: 'Application minimized to tray'
          });
        }
        global.hasShownTrayNotification = true;
      }
    }
  });

  // Handle navigation errors
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
    if (!isDev) {
      mainWindow.loadURL(`file://${path.join(__dirname, 'build/index.html')}`);
    }
  });
}

function createTray() {
  try {
    const trayIconPath = path.join(__dirname, 'public/assets/tray-icon.png');
    console.log('Creating tray icon:', trayIconPath);
    
    tray = new Tray(trayIconPath);
    
    const contextMenu = Menu.buildFromTemplate([
      { 
        label: 'Show App', 
        click: () => {
          if (mainWindow) {
            mainWindow.show();
            mainWindow.focus();
          }
        }
      },
      { type: 'separator' },
      { 
        label: `Version ${app.getVersion()}`,
        enabled: false
      },
      { type: 'separator' },
      { 
        label: 'Quit', 
        click: () => {
          app.isQuiting = true;
          app.quit();
        }
      }
    ]);
    
    tray.setContextMenu(contextMenu);
    tray.setToolTip('Agent Wallboard');
    
    // Double click to show
    tray.on('double-click', () => {
      if (mainWindow) {
        mainWindow.show();
        mainWindow.focus();
      }
    });
    
    console.log('Tray icon created successfully');
  } catch (error) {
    console.error('Tray creation failed:', error);
    console.log('Application will continue without tray icon');
  }
}

// App ready
app.whenReady().then(() => {
  console.log('App is ready');
  createWindow();
  createTray();
});

// Window management
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  } else if (mainWindow) {
    mainWindow.show();
  }
});

// Prevent multiple instances
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  console.log('Another instance is already running');
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});