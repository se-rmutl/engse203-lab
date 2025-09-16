// Application Menu Configuration สำหรับ Agent Desktop
const { Menu, dialog, shell } = require('electron');

class MenuManager {
    static createMenu(app, mainWindow) {
        const template = [
            // macOS specific menu
            ...(process.platform === 'darwin' ? [{
                label: app.getName(),
                submenu: [
                    { role: 'about' },
                    { type: 'separator' },
                    { role: 'services' },
                    { type: 'separator' },
                    { role: 'hide' },
                    { role: 'hideothers' },
                    { role: 'unhide' },
                    { type: 'separator' },
                    { role: 'quit' }
                ]
            }] : []),

            // File menu
            {
                label: 'ไฟล์',
                submenu: [
                    {
                        label: 'ออกจากระบบ',
                        accelerator: 'CmdOrCtrl+Shift+Q',
                        click: () => {
                            mainWindow.webContents.send('logout');
                        }
                    },
                    { type: 'separator' },
                    {
                        label: process.platform === 'darwin' ? 'ปิด Agent Desktop' : 'ออก',
                        accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                        click: () => {
                            app.quit();
                        }
                    }
                ]
            },

            // Edit menu
            {
                label: 'แก้ไข',
                submenu: [
                    { label: 'เลิกทำ', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
                    { label: 'ทำซ้ำ', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
                    { type: 'separator' },
                    { label: 'ตัด', accelerator: 'CmdOrCtrl+X', role: 'cut' },
                    { label: 'คัดลอก', accelerator: 'CmdOrCtrl+C', role: 'copy' },
ต่อจากส่วน Menu Configuration:

```javascript
                    { label: 'วาง', accelerator: 'CmdOrCtrl+V', role: 'paste' },
                    { label: 'เลือกทั้งหมด', accelerator: 'CmdOrCtrl+A', role: 'selectall' }
                ]
            },

            // Agent menu
            {
                label: 'Agent',
                submenu: [
                    {
                        label: 'รีเฟรชข้อมูล',
                        accelerator: 'CmdOrCtrl+R',
                        click: () => {
                            mainWindow.webContents.send('refresh-data');
                        }
                    },
                    {
                        label: 'เขียนข้อความ',
                        accelerator: 'CmdOrCtrl+M',
                        click: () => {
                            mainWindow.webContents.send('open-compose');
                        }
                    },
                    { type: 'separator' },
                    {
                        label: 'เปลี่ยนเป็น Available',
                        accelerator: 'CmdOrCtrl+1',
                        click: () => {
                            mainWindow.webContents.send('change-status', 'Available');
                        }
                    },
                    {
                        label: 'เปลี่ยนเป็น Busy',
                        accelerator: 'CmdOrCtrl+2',
                        click: () => {
                            mainWindow.webContents.send('change-status', 'Busy');
                        }
                    },
                    {
                        label: 'เปลี่ยนเป็น Break',
                        accelerator: 'CmdOrCtrl+3',
                        click: () => {
                            mainWindow.webContents.send('change-status', 'Break');
                        }
                    }
                ]
            },

            // View menu
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

            // Window menu
            {
                label: 'หน้าต่าง',
                submenu: [
                    { label: 'ย่อเก็บ', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
                    { label: 'ปิด', accelerator: 'CmdOrCtrl+W', role: 'close' }
                ]
            },

            // Help menu
            {
                label: 'ช่วยเหลือ',
                submenu: [
                    {
                        label: 'คู่มือการใช้งาน',
                        click: () => {
                            MenuManager.showUserGuide();
                        }
                    },
                    {
                        label: 'คีย์ลัดทั้งหมด',
                        click: () => {
                            MenuManager.showKeyboardShortcuts();
                        }
                    },
                    { type: 'separator' },
                    {
                        label: 'ตรวจสอบการอัพเดท',
                        click: () => {
                            MenuManager.checkForUpdates();
                        }
                    },
                    { type: 'separator' },
                    {
                        label: 'รายงานปัญหา',
                        click: () => {
                            MenuManager.reportIssue();
                        }
                    },
                    {
                        label: 'เกี่ยวกับ Agent Desktop',
                        click: () => {
                            MenuManager.showAbout();
                        }
                    }
                ]
            }
        ];

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    }

    static showUserGuide() {
        dialog.showMessageBox(null, {
            type: 'info',
            title: 'คู่มือการใช้งาน Agent Desktop Phase 2',
            message: 'คู่มือการใช้งานฉบับย่อ',
            detail: `1. การเข้าสู่ระบบ:
   • ใส่รหัส Agent (รูปแบบ A001)
   • ใส่รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)
   • ตรวจสอบ Server URL

2. การเปลี่ยนสถานะ:
   • คลิกปุ่มสถานะที่ต้องการ
   • ใส่เหตุผล (ไม่บังคับ)
   • สถานะจะบันทึกใน MongoDB

3. การส่งข้อความ:
   • คลิก "เขียนข้อความ"
   • เลือกผู้รับและประเภท
   • ข้อความส่งผ่าน WebSocket

4. การตรวจสอบการเชื่อมต่อ:
   • ดูสถานะใน Connection Panel
   • API: เชื่อมต่อกับ Phase 2 API
   • WebSocket: สำหรับ Real-time
   • Database: MongoDB สถานะ`,
            buttons: ['ตกลง']
        });
    }

    static showKeyboardShortcuts() {
        dialog.showMessageBox(null, {
            type: 'info',
            title: 'รายการปุ่มลัด',
            message: 'ปุ่มลัดที่ใช้ได้ใน Agent Desktop',
            detail: `ทั่วไป:
• Ctrl+R: รีเฟรชข้อมูล
• Ctrl+Q: ออกจากระบบ
• Ctrl+Shift+Q: ออกจาก Agent เท่านั้น
• F12: เครื่องมือนักพัฒนา
• F11: เต็มจอ
• Escape: ปิด Modal

การจัดการสถานะ:
• Ctrl+1: เปลี่ยนเป็น Available
• Ctrl+2: เปลี่ยนเป็น Busy  
• Ctrl+3: เปลี่ยนเป็น Break

การส่งข้อความ:
• Ctrl+M: เปิดหน้าต่างเขียนข้อความ

การดูข้อมูล:
• Ctrl+0: ขนาดจริง
• Ctrl++: ซูมเข้า
• Ctrl+-: ซูมออก`,
            buttons: ['ตกลง']
        });
    }

    static checkForUpdates() {
        dialog.showMessageBox(null, {
            type: 'info',
            title: 'ตรวจสอบการอัพเดท',
            message: 'Agent Desktop Version 2.0.0',
            detail: 'คุณใช้เวอร์ชันล่าสุดแล้ว\n\nPhase 2 Features:\n• MongoDB Database Integration\n• WebSocket Real-time Communication\n• Enhanced Message System\n• Improved Performance',
            buttons: ['ตกลง']
        });
    }

    static reportIssue() {
        dialog.showMessageBox(null, {
            type: 'info',
            title: 'รายงานปัญหา',
            message: 'แจ้งปัญหาการใช้งาน',
            detail: `หากพบปัญหาการใช้งาน กรุณาติดต่อ:

📞 IT Support: ext. 1234
📧 Email: support@company.com  
🎫 Help Desk System: help.company.com

ข้อมูลที่ควรแจ้ง:
• Agent Code ของคุณ
• ขั้นตอนที่ทำก่อนเกิดปัญหา
• ข้อความ Error (ถ้ามี)
• เวอร์ชัน: 2.0.0 (Phase 2)`,
            buttons: ['ตกลง', 'เปิด Help Desk'],
            defaultId: 0
        }).then((result) => {
            if (result.response === 1) {
                shell.openExternal('https://help.company.com');
            }
        });
    }

    static showAbout() {
        dialog.showMessageBox(null, {
            type: 'info',
            title: 'เกี่ยวกับ Agent Desktop',
            message: 'Agent Desktop Application',
            detail: `Version: 2.0.0
Phase: 2 (MongoDB + WebSocket)
Platform: ${process.platform}
Electron: ${process.versions.electron}
Node.js: ${process.versions.node}
Chrome: ${process.versions.chrome}

Agent Desktop เป็นแอปพลิเคชันสำหรับ
จัดการสถานะและการสื่อสารของ
Agent ในระบบ Call Center

พัฒนาด้วย:
• Electron.js - Desktop Framework
• Node.js - Backend Runtime  
• MongoDB - Database
• Socket.io - WebSocket Communication

© 2024 Agent Wallboard System`,
            buttons: ['ตกลง']
        });
    }
}

module.exports = MenuManager;