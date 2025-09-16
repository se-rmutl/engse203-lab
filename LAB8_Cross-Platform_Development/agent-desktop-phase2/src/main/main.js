// Main Process สำหรับ Agent Desktop Phase 2
const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

class AgentDesktopApp {
    constructor() {
        this.loginWindow = null;
        this.mainWindow = null;
        this.isQuitting = false;
        
        this.initialize();
    }

    initialize() {
        // Handle app ready
        app.whenReady().then(() => {
            this.createLoginWindow();
            this.setupIpcHandlers();
            this.setupAppMenu();
            
            if (isDev) {
                console.log('Agent Desktop App started in development mode');
            }
        });

        // Handle all windows closed
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });

        // Handle app activate (macOS)
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                this.createLoginWindow();
            }
        });

        // Handle before quit
        app.on('before-quit', (event) => {
            this.isQuitting = true;
            
            if (this.mainWindow && !this.mainWindow.isDestroyed()) {
                event.preventDefault();
                this.mainWindow.webContents.send('app-closing');
            }
        });
    }

    createLoginWindow() {
        this.loginWindow = new BrowserWindow({
            width: 500,
            height: 700,
            resizable: false,
            maximizable: false,
            center: true,
            title: 'Agent Desktop - Login',
            icon: path.join(__dirname, '../assets/icon.png'),
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
            },
            show: false
        });

        this.loginWindow.loadFile(path.join(__dirname, '../renderer/login.html'));

        this.loginWindow.once('ready-to-show', () => {
            this.loginWindow.show();
            
            if (isDev) {
                this.loginWindow.webContents.openDevTools();
            }
        });

        this.loginWindow.on('closed', () => {
            this.loginWindow = null;
            if (!this.mainWindow) {
                app.quit();
            }
        });
    }

    createMainWindow(userData) {
        this.mainWindow = new BrowserWindow({
            width: 1400,
            height: 900,
            minWidth: 1200,
            minHeight: 800,
            center: true,
            title: `Agent Desktop - ${userData.agentCode} (${userData.agentName})`,
            icon: path.join(__dirname, '../assets/icon.png'),
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
            },
            show: false
        });

        this.mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

        this.mainWindow.once('ready-to-show', () => {
            this.mainWindow.show();
            
            if (isDev) {
                this.mainWindow.webContents.openDevTools();
            }
        });

        this.mainWindow.on('close', (event) => {
            if (!this.isQuitting) {
                event.preventDefault();
                this.showCloseConfirmation();
            }
        });

        this.mainWindow.on('closed', () => {
            this.mainWindow = null;
        });

        // Close login window if it exists
        if (this.loginWindow && !this.loginWindow.isDestroyed()) {
            this.loginWindow.close();
        }
    }

    setupIpcHandlers() {
        // Handle login success
        ipcMain.on('login-success', (event, userData) => {
            console.log('Login successful for agent:', userData.agentCode);
            this.createMainWindow(userData);
        });

        // Handle logout
        ipcMain.on('logout', () => {
            console.log('Logout requested');
            
            if (this.mainWindow && !this.mainWindow.isDestroyed()) {
                this.mainWindow.close();
            }
            
            this.createLoginWindow();
        });

        // Handle app ready to close
        ipcMain.on('app-ready-to-close', () => {
            console.log('App ready to close');
            app.quit();
        });

        // Handle focus window
        ipcMain.on('focus-window', () => {
            if (this.mainWindow && !this.mainWindow.isDestroyed()) {
                if (this.mainWindow.isMinimized()) {
                    this.mainWindow.restore();
                }
                this.mainWindow.focus();
            }
        });

        // Handle error reporting
        ipcMain.on('error-report', (event, errorData) => {
            console.error('Error reported from renderer:', errorData);
            
            dialog.showErrorBox(
                'เกิดข้อผิดพลาด',
                `เกิดข้อผิดพลาดในระบบ: ${errorData.message}\n\nกรุณาลองใหม่อีกครั้ง หากปัญหายังคงมีอยู่ กรุณาติดต่อผู้ดูแลระบบ`
            );
        });
    }

    setupAppMenu() {
        const template = [
            {
                label: 'Agent Desktop',
                submenu: [
                    {
                        label: 'เกี่ยวกับ Agent Desktop',
                        click: () => {
                            dialog.showMessageBox(null, {
                                type: 'info',
                                title: 'เกี่ยวกับ Agent Desktop',
                                message: 'Agent Desktop Application',
                                detail: `Version: 2.0.0\nPhase 2: MongoDB + WebSocket API\n\nCall Center Agent Management System\nพัฒนาด้วย Electron.js + Node.js`,
                                buttons: ['ตกลง']
                            });
                        }
                    },
                    { type: 'separator' },
                    {
                        label: 'ออกจากระบบ',
                        accelerator: 'CmdOrCtrl+Q',
                        click: () => {
                            this.showLogoutConfirmation();
                        }
                    }
                ]
            },
            {
                label: 'แก้ไข',
                submenu: [
                    { label: 'เลิกทำ', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
                    { label: 'ทำซ้ำ', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
                    { type: 'separator' },
                    { label: 'ตัด', accelerator: 'CmdOrCtrl+X', role: 'cut' },
                    { label: 'คัดลอก', accelerator: 'CmdOrCtrl+C', role: 'copy' },
                    { label: 'วาง', accelerator: 'CmdOrCtrl+V', role: 'paste' },
                    { label: 'เลือกทั้งหมด', accelerator: 'CmdOrCtrl+A', role: 'selectall' }
                ]
            },
            {
                label: 'มุมมอง',
                submenu: [
                    { label: 'รีโหลด', accelerator: 'CmdOrCtrl+R', role: 'reload' },
                    { label: 'รีโหลดแบบบังคับ', accelerator: 'CmdOrCtrl+Shift+R', role: 'forceReload' },
                    { label: 'เครื่องมือนักพัฒนา', accelerator: 'F12', role: 'toggleDevTools' },
                    { type: 'separator' },
                    { label: 'ขนาดจริง', accelerator: 'CmdOrCtrl+0', role: 'resetZoom' },
                    { label: 'ซูมเข้า', accelerator: 'CmdOrCtrl+Plus', role: 'zoomIn' },
                    { label: 'ซูมออก', accelerator: 'CmdOrCtrl+-', role: 'zoomOut' },
                    { type: 'separator' },
                    { label: 'เต็มจอ', accelerator: 'F11', role: 'togglefullscreen' }
                ]
            },
            {
                label: 'หน้าต่าง',
                submenu: [
                    { label: 'ย่อเก็บ', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
                    { label: 'ปิด', accelerator: 'CmdOrCtrl+W', role: 'close' }
                ]
            },
            {
                label: 'ช่วยเหลือ',
                submenu: [
                    {
                        label: 'คู่มือการใช้งาน',
                        click: () => {
                            this.showHelpDialog();
                        }
                    },
                    {
                        label: 'คีย์ลัดทั้งหมด',
                        click: () => {
                            this.showShortcutsDialog();
                        }
                    },
                    { type: 'separator' },
                    {
                        label: 'รายงานปัญหา',
                        click: () => {
                            dialog.showMessageBox(null, {
                                type: 'info',
                                title: 'รายงานปัญหา',
                                message: 'หากพบปัญหาการใช้งาน',
                                detail: 'กรุณาติดต่อ:\n- IT Support: ext. 1234\n- Email: support@company.com\n- หรือใช้ระบบ Help Desk',
                                buttons: ['ตกลง']
                            });
                        }
                    }
                ]
            }
        ];

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    }

    showCloseConfirmation() {
        const choice = dialog.showMessageBoxSync(this.mainWindow, {
            type: 'question',
            buttons: ['ออกจากระบบ', 'ยกเลิก'],
            defaultId: 1,
            title: 'ยืนยันการออกจากระบบ',
            message: 'คุณต้องการออกจากระบบหรือไม่?',
            detail: 'การออกจากระบบจะเปลี่ยนสถานะเป็น Offline และปิดการเชื่อมต่อทั้งหมด'
        });

        if (choice === 0) {
            this.isQuitting = true;
            this.mainWindow.webContents.send('app-closing');
        }
    }

    showLogoutConfirmation() {
        const choice = dialog.showMessageBoxSync(null, {
            type: 'question',
            buttons: ['ออกจากระบบ', 'ยกเลิก'],
            defaultId: 1,
            title: 'ยืนยันการออกจากระบบ',
            message: 'คุณต้องการออกจากระบบหรือไม่?'
        });

        if (choice === 0) {
            if (this.mainWindow && !this.mainWindow.isDestroyed()) {
                this.mainWindow.webContents.send('logout');
            } else {
                app.quit();
            }
        }
    }

    showHelpDialog() {
        dialog.showMessageBox(null, {
            type: 'info',
            title: 'คู่มือการใช้งาน Agent Desktop',
            message: 'คู่มือการใช้งาน Agent Desktop Phase 2',
            detail: `การเปลี่ยนสถานะ:
• คลิกปุ่มสถานะที่ต้องการ
• ใส่เหตุผล (ไม่บังคับ) แล้วกด Enter
• สถานะจะอัพเดทในฐานข้อมูล MongoDB

การส่งข้อความ:
• คลิก "เขียนข้อความ" ในแผง Messages
• เลือกผู้รับและประเภทข้อความ
• ข้อความจะส่งผ่าน WebSocket แบบ Real-time

การเชื่อมต่อ:
• ตรวจสอบสถานะการเชื่อมต่อในแผง Connection
• ใช้ปุ่ม "เชื่อมต่อใหม่" หากมีปัญหา

ปุ่มลัด:
• Ctrl+R: รีเฟรช
• Ctrl+Q: ออกจากระบบ
• Ctrl+M: เขียนข้อความ
• F12: Developer Tools`,
            buttons: ['ตกลง']
        });
    }

    showShortcutsDialog() {
        dialog.showMessageBox(null, {
            type: 'info',
            title: 'ปุ่มลัดทั้งหมด',
            message: 'รายการปุ่มลัดที่ใช้ได้',
            detail: `ทั่วไป:
• Ctrl+R: รีเฟรชข้อมูล
• Ctrl+Q: ออกจากระบบ
• F12: Developer Tools
• F11: เต็มจอ
• Escape: ปิด Modal

การทำงาน:
• Ctrl+M: เขียนข้อความใหม่
• Ctrl+Shift+R: รีโหลดแบบบังคับ
• Ctrl+0: ขนาดจริง
• Ctrl++: ซูมเข้า
• Ctrl+-: ซูมออก

หน้าต่าง:
• Ctrl+W: ปิดหน้าต่าง
• Ctrl+M: ย่อเก็บหน้าต่าง`,
            buttons: ['ตกลง']
        });
    }
}

// Initialize the application
new AgentDesktopApp();