# คู่มือเตรียมเครื่องแบบ Cross-platform

รายวิชาใช้เครื่อง iMac M1 ในห้องปฏิบัติการ และอนุญาตให้ทำงานต่อบน notebook Windows ของนักศึกษา จึงกำหนดให้ใช้ **Visual Studio Code Integrated Terminal** เป็นหลัก เพื่อลดความแตกต่างของระบบปฏิบัติการ

## พื้นที่เก็บงานแนะนำ

| macOS / iMac M1 | Windows notebook | แนวปฏิบัติร่วม |
|---|---|---|
| `~/Documents/ENGSE203` | `C:\Users\<username>\Documents\ENGSE203` | เก็บงานรายวิชาไว้ในโฟลเดอร์เดียวและตั้งชื่อสม่ำเสมอ |

## ตรวจสอบเครื่องมือ

เปิด Terminal ใน VS Code แล้วรันคำสั่งต่อไปนี้ ซึ่งใช้ได้ทั้ง macOS และ Windows PowerShell

```bash
node -v
npm -v
git --version
```

หากคำสั่งใดแสดงว่าไม่พบคำสั่ง ให้หยุดทำ LAB และแจ้งผู้สอน/ผู้ช่วยสอนก่อนเริ่มขั้นตอนถัดไป

## ความต่างที่ควรรู้

| งาน | macOS / iMac M1 | Windows notebook | ข้อแนะนำ |
|---|---|---|---|
| Terminal | zsh ผ่าน VS Code หรือ Terminal.app | PowerShell ผ่าน VS Code หรือ Windows Terminal | ใช้ VS Code Integrated Terminal เป็นหลัก |
| เปิดโฟลเดอร์ด้วย UI | `open .` | `start .` | ใช้ File Explorer ของ VS Code จะลดความต่างได้ |
| เปิดโฟลเดอร์ใน VS Code | `code .` | `code .` | ต้องเปิดใช้คำสั่ง `code` ใน PATH ก่อน |
| Path separator | `/` | `\` หรือ `/` | ในคำสั่ง Node/npm มักใช้ `/` ได้ |
| คำสั่งสร้างโฟลเดอร์ | `mkdir` | `mkdir` | ใช้ได้เหมือนกันใน PowerShell |

## ข้อควรระวัง

- ใช้ Node.js รุ่น LTS ตามที่ผู้สอนกำหนดในภาคการศึกษานั้น
- หลังติดตั้ง Node.js หรือ Git ใหม่ ให้ปิดและเปิด Terminal ใหม่ก่อนตรวจสอบเวอร์ชัน
- อย่าติดตั้ง package แบบ global หากใบงานไม่ได้กำหนด เพราะอาจทำให้เครื่องแต่ละคนมีสภาพแวดล้อมต่างกัน
- ในงานที่ต้องใช้ path ให้เก็บไฟล์ในโฟลเดอร์ภาษาอังกฤษเพื่อหลีกเลี่ยงปัญหาบางเครื่องมือ
