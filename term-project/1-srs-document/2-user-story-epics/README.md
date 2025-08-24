# User Stories - Agent Wallboard System

## ภาพรวม
ชุด User Stories นี้ครอบคลุมการพัฒนา Agent Wallboard System ทั้ง 5 Epics ในขอบเขตที่สอดคล้องกับ LAB 5-7 ที่มีอยู่ รวม 14 User Stories

---

## Epic 1: Real-time Agent Status Monitoring

### US-001: การแสดงสถานะ Agent แบบ Real-time
**ในฐานะ** Supervisor ของ Call Center  
**ฉันต้องการ** ดูสถานะปัจจุบันของ agents ทั้งหมดในทีมบน dashboard แบบ real-time  
**เพื่อที่** ฉันจะได้รู้ได้ทันทีว่าใครว่างงาน ใครกำลังยุ่ง หรือใครออฟไลน์  

**Acceptance Criteria:**
- ✅ แสดงรายการ agent พร้อมสถานะปัจจุบัน (Available, Active, Wrap, Not Ready, Offline)
- ✅ แสดง agent code, ชื่อ และสถานะปัจจุบันด้วยสีที่แตกต่างกัน
- ✅ อัปเดตสถานะอัตโนมัติโดยไม่ต้อง refresh หน้าจอ (WebSocket)
- ✅ แสดง timestamp ของการอัปเดตสถานะครั้งล่าสุด

**Priority:** HIGH | **Story Points:** 8 | **Sprint:** 1

---

### US-002: การเปลี่ยนสถานะของ Agent
**ในฐานะ** Agent ของ Call Center  
**ฉันต้องการ** เปลี่ยนสถานะของตัวเองผ่าน desktop application  
**เพื่อที่** supervisor จะได้รู้ว่าฉันพร้อมรับงานหรือไม่  

**Acceptance Criteria:**
- ✅ Agent สามารถเปลี่ยนสถานะผ่าน dropdown (Available, Active, Wrap, Not Ready)
- ✅ การเปลี่ยนสถานะแสดงผลใน wallboard ทันที
- ✅ ระบบบันทึก timestamp ของการเปลี่ยนสถานะ
- ✅ Agent เห็นสถานะปัจจุบันของตัวเองใน application

**Priority:** HIGH | **Story Points:** 5 | **Sprint:** 1

---

### US-003: การติดตาม Login/Logout ของ Agent
**ในฐานะ** Supervisor ของ Call Center  
**ฉันต้องการ** ติดตามเวลา login และ logout ของ agents  
**เพื่อที่** ฉันจะได้ตรวจสอบการเข้างานและความพร้อมใช้งาน  

**Acceptance Criteria:**
- ✅ ระบบบันทึกเวลา login/logout ของแต่ละ agent
- ✅ แสดงสถานะ "Connected" เมื่อ agent login สำเร็จ
- ✅ แสดงสถานะ "Disconnected" เมื่อ agent logout หรือ connection หลุด
- ✅ เก็บ log ประวัติการ login/logout

**Priority:** MEDIUM | **Story Points:** 3 | **Sprint:** 1

---

## Epic 2: Supervisor Communication System

### US-004: การส่งข้อความถึง Agent
**ในฐานะ** Supervisor  
**ฉันต้องการ** ส่งข้อความไปยัง agent ที่เฉพาะเจาะจง  
**เพื่อที่** ฉันจะได้สื่อสารข้อมูลสำคัญหรือคำแนะนำได้ทันที  

**Acceptance Criteria:**
- ✅ Supervisor สามารถเลือก agent ปลายทางและพิมพ์ข้อความ
- ✅ ข้อความส่งผ่าน WebSocket แบบ real-time
- ✅ Agent ได้รับ notification ทันทีเมื่อมีข้อความใหม่
- ✅ แสดง timestamp และผู้ส่งข้อความ

**Priority:** HIGH | **Story Points:** 5 | **Sprint:** 2

---

### US-005: การรับ Notification สำหรับ Agent
**ในฐานะ** Agent  
**ฉันต้องการ** รับ notification เมื่อมีข้อความจาก supervisor  
**เพื่อที่** ฉันจะได้รับทราบข้อมูลสำคัญทันที  

**Acceptance Criteria:**
- ✅ แสดง desktop notification เมื่อมีข้อความใหม่
- ✅ เล่นเสียงแจ้งเตือนเมื่อได้รับข้อความ
- ✅ แสดงข้อความใน popup window พร้อมปุ่ม "Close"
- ✅ บันทึกประวัติข้อความที่ได้รับ

**Priority:** HIGH | **Story Points:** 3 | **Sprint:** 2

---

## Epic 3: Agent Self-Service Portal

### US-006: การ Authentication ของ Agent
**ในฐานะ** Agent  
**ฉันต้องการ** login เข้าระบบด้วย Agent Code  
**เพื่อที่** ฉันจะได้ใช้งาน desktop application ได้  

**Acceptance Criteria:**
- ✅ Agent สามารถใส่ Agent Code เพื่อ login
- ✅ ระบบตรวจสอบ Agent Code กับฐานข้อมูล
- ✅ แสดงข้อผิดพลาดเมื่อ Agent Code ไม่ถูกต้อง
- ✅ เชื่อมต่อ WebSocket หลังจาก login สำเร็จ

**Priority:** HIGH | **Story Points:** 5 | **Sprint:** 1

---

### US-007: การจัดการข้อมูลส่วนตัวของ Agent
**ในฐานะ** Agent  
**ฉันต้องการ** เห็นข้อมูลส่วนตัวและสถานะปัจจุบันของฉัน  
**เพื่อที่** ฉันจะได้ตรวจสอบความถูกต้องของข้อมูล  

**Acceptance Criteria:**
- ✅ แสดง Agent Code และ Agent Name
- ✅ แสดงสถานะปัจจุบันและเวลาที่เริ่มสถานะนั้น
- ✅ แสดงเวลา login ของวันนี้
- ✅ อัปเดตข้อมูลแบบ real-time

**Priority:** MEDIUM | **Story Points:** 2 | **Sprint:** 2

---

## Epic 4: Management Dashboard & Reporting

### US-008: Dashboard สำหรับ Supervisor
**ในฐานะ** Supervisor  
**ฉันต้องการ** dashboard ที่แสดงสถิติโดยรวมของทีม  
**เพื่อที่** ฉันจะได้ตัดสินใจในการจัดการทีมได้อย่างมีข้อมูล  

**Acceptance Criteria:**
- ✅ แสดงจำนวน agents แต่ละสถานะ (Available, Active, Wrap, Not Ready)
- ✅ แสดงจำนวน agents ที่ online/offline
- ✅ แสดงข้อมูลแบบ real-time ด้วย charts/graphs
- ✅ แสดงเวลาปัจจุบันและข้อมูล team summary

**Priority:** HIGH | **Story Points:** 8 | **Sprint:** 2

---

### US-009: การแสดงสถิติแบบ Real-time
**ในฐานะ** Supervisor  
**ฉันต้องการ** เห็นสถิติการทำงานของ agents แบบ real-time  
**เพื่อที่** ฉันจะได้ติดตาม performance ได้ตลอดเวลา  

**Acceptance Criteria:**
- ✅ แสดงจำนวน Total Queue เป็น 0 (placeholder สำหรับ future development)
- ✅ แสดงจำนวน Offer Call และ Abandon Call (placeholder)
- ✅ อัปเดตตัวเลขแบบ real-time
- ✅ ใช้สีและ icon ที่เหมาะสมสำหรับแต่ละประเภท metric

**Priority:** MEDIUM | **Story Points:** 5 | **Sprint:** 3

---

## Epic 5: System Administration & Configuration

### US-010: การจัดการ Agent Database
**ในฐานะ** System Administrator  
**ฉันต้องการ** จัดการข้อมูล agents ในฐานข้อมูล  
**เพื่อที่** ระบบจะทำงานได้อย่างถูกต้องและมี agents ที่จำเป็น  

**Acceptance Criteria:**
- ✅ ระบบเชื่อมต่อกับ MSSQL database ได้
- ✅ สามารถ query ข้อมูล agent จากตาราง OnlineAgents
- ✅ สามารถ insert/update ข้อมูล agent status
- ✅ จัดการ database connection pool อย่างมีประสิทธิภาพ

**Priority:** HIGH | **Story Points:** 5 | **Sprint:** 1

---

### US-011: API Endpoint Management
**ในฐานะ** System Administrator  
**ฉันต้องการ** API endpoints ที่มั่นคงและปลอดภัย  
**เพื่อที่** ระบบจะสื่อสารระหว่าง tiers ได้อย่างถูกต้อง  

**Acceptance Criteria:**
- ✅ มี API endpoint สำหรับ getOnlineAgentByAgentCode
- ✅ มี API endpoint สำหรับ postOnlineAgentStatus
- ✅ มี API endpoint สำหรับ postSendMessage
- ✅ ใช้ Bearer Token authentication
- ✅ ส่ง response ในรูปแบบ JSON ที่มีมาตรฐาน

**Priority:** HIGH | **Story Points:** 8 | **Sprint:** 1

---

### US-012: WebSocket Connection Management
**ในฐานะ** System Administrator  
**ฉันต้องการ** จัดการ WebSocket connections อย่างมีประสิทธิภาพ  
**เพื่อที่** การสื่อสาร real-time จะทำงานได้เสถียร  

**Acceptance Criteria:**
- ✅ จัดการ WebSocket connection pool
- ✅ ตรวจสอบและจัดการ agent ที่ disconnect
- ✅ ส่งข้อความ broadcast ไปยัง agents ที่เกี่ยวข้อง
- ✅ มี error handling สำหรับ connection failures

**Priority:** HIGH | **Story Points:** 8 | **Sprint:** 1

---

### US-013: Desktop Application Distribution
**ในฐานะ** System Administrator  
**ฉันต้องการ** สร้าง installer สำหรับ desktop application  
**เพื่อที่** agents สามารถติดตั้งและใช้งาน application ได้  

**Acceptance Criteria:**
- ✅ สร้าง executable file จาก Electron.js application
- ✅ สร้าง installer package สำหรับ Windows
- ✅ Application สามารถ auto-update configuration ได้
- ✅ มี error handling และ user-friendly messages

**Priority:** MEDIUM | **Story Points:** 3 | **Sprint:** 3

---

### US-014: System Configuration Management
**ในฐานะ** System Administrator  
**ฉันต้องการ** จัดการ configuration ของระบบแยกตาม environment  
**เพื่อที่** จะสามารถ deploy ระบบใน development และ production ได้  

**Acceptance Criteria:**
- ✅ แยก configuration file สำหรับ development/production
- ✅ จัดการ database connection strings แยกตาม environment
- ✅ จัดการ API URLs และ WebSocket endpoints
- ✅ มี SSL certificate management สำหรับ HTTPS

**Priority:** MEDIUM | **Story Points:** 5 | **Sprint:** 2

---

## สรุป User Stories

| Epic | จำนวน Stories | Total Story Points | Priority Distribution |
|------|---------------|-------------------|---------------------|
| Epic 1: Real-time Monitoring | 3 | 16 | HIGH: 2, MEDIUM: 1 |
| Epic 2: Communication | 2 | 8 | HIGH: 2 |
| Epic 3: Agent Portal | 2 | 7 | HIGH: 1, MEDIUM: 1 |
| Epic 4: Dashboard | 2 | 13 | HIGH: 1, MEDIUM: 1 |
| Epic 5: Administration | 5 | 29 | HIGH: 3, MEDIUM: 2 |

**รวมทั้งสิ้น:** 14 User Stories | **Total Effort:** 73 Story Points

---

## Sprint Planning แนะนำ

### Sprint 1 (Foundation) - 3 สัปดาห์
- US-001, US-002, US-006, US-010, US-011, US-012
- **Focus**: Core functionality และ infrastructure

### Sprint 2 (Communication) - 2 สัปดาห์  
- US-004, US-005, US-007, US-008, US-014
- **Focus**: Communication features และ dashboard

### Sprint 3 (Enhancement) - 2 สัปดาห์
- US-003, US-009, US-013
- **Focus**: Additional features และ deployment

---
