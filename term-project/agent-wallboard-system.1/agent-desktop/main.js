const { app, BrowserWindow, Tray, Menu, ipcMain, Notification } = require('electron');
const path = require('path');
require('dotenv').config();
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;
let tray;

// IPC Handlers
ipcMain.handle('show-notification', async (event, { title, body }) => {
  try {
    const notification = new Notification({ title, body });
    notification.show();
    return { success: true };
  } catch (error) {
    console.error('Notification error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('close-app', () => {
  app.quit();
});

ipcMain.handle('minimize-to-tray', () => {
  if (mainWindow) {
    mainWindow.hide();
  }
});

ipcMain.handle('show-app', () => {
  if (mainWindow) {
    mainWindow.show();
    mainWindow.focus();
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 700,
    minWidth: 350,
    minHeight: 600,
    icon: path.join(__dirname, 'public/assets/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    show: false,
    titleBarStyle: 'default',
    resizable: true,
    maximizable: false,
    fullscreenable: false
  });

  // Load React app
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;
  
  console.log(`isDev: ${isDev}`);
  console.log(`startUrl: ${startUrl}`);

  mainWindow.loadURL(startUrl);
  
  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Handle window close - minimize to tray instead
  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
      
      // Show tray notification on first minimize
      if (tray && !tray.isDestroyed()) {
        new Notification({
          title: 'Agent Wallboard',
          body: 'App was minimized to tray'
        }).show();
      }
    }
  });

  // Handle window restore
  mainWindow.on('restore', () => {
    mainWindow.show();
  });
}

function createTray() {
  try {
    tray = new Tray(path.join(__dirname, 'public/assets/tray-icon.png'));
    
    const contextMenu = Menu.buildFromTemplate([
      { 
        label: 'Show Agent Wallboard', 
        click: () => {
          mainWindow.show();
          mainWindow.focus();
        }
      },
      { type: 'separator' },
      { 
        label: 'About', 
        click: () => {
          require('electron').dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'About',
            message: 'Agent Wallboard Desktop',
            detail: 'Version 1.0.0\nBuilt with Electron + React'
          });
        }
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
    tray.setToolTip('Agent Wallboard - Click to show');
    
    // Double click to show
    tray.on('double-click', () => {
      mainWindow.show();
      mainWindow.focus();
    });
    
    // Single click to show (Windows/Linux)
    tray.on('click', () => {
      mainWindow.show();
      mainWindow.focus();
    });
    
  } catch (error) {
    console.error('Tray creation failed:', error);
  }
}

// App event handlers
app.whenReady().then(() => {
  createWindow();
  createTray();
});

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
  app.quit();
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, focus our window instead
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
  });
});