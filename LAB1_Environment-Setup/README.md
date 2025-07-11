# Development Environment Setup Overview

### 3-tier Architecture Overview

The development environment follows a 3-tier architecture pattern:

**Tier 1 (Frontend)**
- Browser interfaces
- Desktop applications
- Apache/Nginx Web Server

**Tier 2 (Backend)**
- API Services
- Node.js applications
- WebSocket connections
- Agent Notification (Electron.js)

**Tier 3 (Database)**
- Database servers
- MSSQL
- MongoDB

### Development Team Structure

The architecture supports different developer roles:
- **Frontend Developer**: Focuses on user interface and user experience
- **Backend/Full-stack Developer**: Handles server-side logic and APIs
- **Data Engineer/Database Admin**: Manages database design and optimization
---

## ภาพรวมของการตั้งค่าสภาพแวดล้อมการพัฒนา

เอกสารนี้เป็นคำแนะนำในการตั้งค่าสภาพแวดล้อมการพัฒนาสำหรับการเขียนโปรแกรม Web Development ที่สามารถทำงานได้ทั้งบน Local Machine และ Virtual Machine โดยมีคำแนะนำสำหรับทั้งระบบ Mac และ Windows

## 🔧 ซอฟต์แวร์พื้นฐานที่ต้องติดตั้ง

### Development Tools
- **IDE**: Visual Studio Code
- **Version Control**: Git, GitHub Desktop
- **Remote Terminal**: Terminus
- **FTP Client**: FileZilla
- **Web Browsers**: Chrome, Firefox, Edge

### Design & Collaboration Tools
- **Diagram**: Draw.io
- **Wireframe**: Moqups
- **UI Design**: Figma
- **Task Management**: Trello
- **Team Collaboration**: Miro
- **API Testing**: Postman

## 📋 เนื้อหาสำคัญในแต่ละเอกสาร

### 🍎 Mac Environment Setup
การตั้งค่าสภาพแวดล้อมบน macOS รวมถึง:
- การติดตั้ง Node.js ผ่าน NVM
- การตั้งค่า Git และ SSH keys
- การเชื่อมต่อกับ GitHub repository
- การใช้งาน VSCode กับ Git

### 🪟 Windows Environment Setup
การตั้งค่าสภาพแวดล้อมบน Windows รวมถึง:
- การติดตั้ง WSL (Windows Subsystem for Linux) Ubuntu 24.04
- การตั้งค่า Git และ SSH keys บน Ubuntu
- การเชื่อมต่อกับ GitHub repository
- การใช้งาน VSCode กับ WSL extension

## 🎯 เป้าหมายการเรียนรู้

เมื่อทำตามคำแนะนำในเอกสารทั้ง 2 ฉบับแล้ว ผู้เรียนจะสามารถ:

1. **จัดการ Node.js versions** ด้วย NVM
2. **เชื่อมต่อ local development** กับ GitHub repository แบบ SSH
3. **เชื่อมต่อ local development** กับ Local VM แบบ SSH
4. **เชื่อมต่อ Local VM** กับ GitHub repository แบบ SSH

## 📚 เอกสารแนะนำ

### สำหรับผู้ใช้ Mac
- [Development Environment Preparation (Mac)](Development-Environment-Preparation-(Mac).md)
- เหมาะสำหรับผู้ที่ใช้ macOS
- ครอบคลุมการตั้งค่าแบบ native บน Mac

### สำหรับผู้ใช้ Windows
- [Development Environment Preparation (Windows)](Development-Environment-Preparation-(Windows).md)
- เหมาะสำหรับผู้ที่ใช้ Windows 10/11
- ใช้ WSL Ubuntu เป็นสภาพแวดล้อมการพัฒนาหลัก

## 🚀 ขั้นตอนการเริ่มต้น

1. **เลือกเอกสาร** ที่เหมาะสมกับระบบปฏิบัติการของคุณ
2. **ติดตั้งซอฟต์แวร์** ตามรายการที่แนะนำ
3. **ตั้งค่า Git** และสร้าง SSH keys
4. **เชื่อมต่อกับ GitHub** และทดสอบการทำงาน
5. **ตั้งค่า VSCode** ให้เชื่อมต่อกับ Git repository

## 📝 หมายเหตุสำคัญ

- ใช้ email ของมหาวิทยาลัยในการสมัครใช้งาน design tools
- เก็บข้อมูล SSH keys ไว้อย่างปลอดภัย
- ทดสอบการเชื่อมต่อทุกขั้นตอนให้แน่ใจว่าทำงานได้ถูกต้อง

---

**สำหรับรายละเอียดเพิ่มเติม** กรุณาเลือกเอกสารที่เหมาะสมกับระบบปฏิบัติการของคุณจากลิงก์ด้านบน