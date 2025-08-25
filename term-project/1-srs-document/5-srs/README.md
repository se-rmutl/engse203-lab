# เอกสารกำหนดความต้องการซอฟต์แวร์ (SRS)
## Agent Wallboard System

**เวอร์ชัน**: 1.0  
**วันที่**: มกราคม 2025  
**มาตรฐาน**: IEEE Std 830-1998  
**ผู้จัดทำ**: ทีมพัฒนา ENGSE206  

---

## สารบัญ

1. [บทนำ (Introduction)](#1-บทนำ-introduction)
2. [คำอธิบายโดยรวม (Overall Description)](#2-คำอธิบายโดยรวม-overall-description)
3. [ความต้องการเฉพาะ (Specific Requirements)](#3-ความต้องการเฉพาะ-specific-requirements)
4. [ภาคผนวก (Appendices)](#4-ภาคผนวก-appendices)

---

## 1. บทนำ (Introduction)

### 1.1 วัตถุประสงค์ (Purpose)

เอกสารกำหนดความต้องการซอฟต์แวร์ (SRS) นี้อธิบายความต้องการเชิงหน้าที่ (Functional Requirements) และความต้องการเชิงคุณภาพ (Non-functional Requirements) ของระบบ Agent Wallboard System เอกสารนี้จัดทำสำหรับ:

- **ทีมพัฒนา (Development Team)**: วิศวกรซอฟต์แวร์ที่ทำการ implement ระบบ
- **ทีมทดสอบ (Testing Team)**: วิศวกร Quality Assurance ที่ทำการตรวจสอบระบบ
- **ผู้มีส่วนได้ส่วนเสียในโครงการ (Project Stakeholders)**: Supervisors, Managers และ Administrators ที่จะใช้งานระบบ
- **การประเมินผลทางวิชาการ (Academic Review)**: อาจารย์ผู้สอนและเพื่อนร่วมชั้นในการประเมินโครงการวิชา ENGSE206

ระบบให้ความสามารถในการติดตาม real-time และการสื่อสารสำหรับการดำเนินงาน call center โดยใช้การ implement แบบ 3-tier architecture

### 1.2 ขอบเขต (Scope)

**ชื่อผลิตภัณฑ์**: Agent Wallboard System  
**ขอบเขตผลิตภัณฑ์**: ระบบติดตามและสื่อสาร call center agents แบบ real-time

**หน้าที่หลัก (Primary Functions)**:
- ✅ **การติดตาม Agent Status แบบ Real-time**: ติดตามสถานะความพร้อมและการทำงานของ agent
- ✅ **การสื่อสารสองทิศทาง (Bidirectional Communication)**: ให้ supervisor สามารถส่งข้อความถึง agent ได้
- ✅ **Dashboard และ Reporting**: แสดงข้อมูลเชิงลึกและสถิติการดำเนินงาน
- ✅ **การบริหารระบบ (System Administration)**: จัดการ configuration และ deployment ของระบบ

**ประโยชน์หลัก (Major Benefits)**:
- เพิ่มประสิทธิภาพการดำเนินงาน 25% ผ่านการติดตาม real-time
- ลดความพยายามในการควบคุมดูแลแบบ manual 60%
- เพิ่มความเร็วในการสื่อสารระหว่าง supervisors และ agents
- ให้ข้อมูลสำหรับการตัดสินใจที่อิงข้อมูล (data-driven decision making)

**สิ่งที่ไม่อยู่ในขอบเขต (Out of Scope)**:
- การรวม (Integration) กับระบบ telephony หรือ PBX
- การจัดการ customer data หรือ call recording
- Mobile application สำหรับ smartphone
- Advanced analytics หรือ machine learning features

### 1.3 คำจำกัดความ, คำย่อ และข้อตกลง (Definitions, Acronyms, and Abbreviations)

**คำจำกัดความ (Definitions)**:

| คำศัพท์ | ความหมาย |
|---------|-----------|
| **Agent** | พนักงาน call center ที่ใช้งาน desktop application |
| **Supervisor** | หัวหน้าทีมที่ดูแลและติดตาม agents |
| **Operations Manager** | ผู้จัดการระดับสูงที่ดูภาพรวมการดำเนินงาน |
| **System Admin** | ผู้ดูแลระบบ IT และการ configuration |
| **Wallboard** | หน้าจอแสดงสถานะของ agents แบบ real-time |
| **Real-time** | การอัปเดตข้อมูลที่มีความหน่วงเวลาไม่เกิน 5 วินาที |

**คำย่อ (Acronyms)**:

| คำย่อ | ความหมาย |
|--------|-----------|
| **SRS** | Software Requirements Specification |
| **API** | Application Programming Interface |
| **UI/UX** | User Interface/User Experience |
| **MSSQL** | Microsoft SQL Server |
| **HTTP/HTTPS** | Hypertext Transfer Protocol (Secure) |
| **WebSocket** | Protocol สำหรับการสื่อสาร real-time |
| **JSON** | JavaScript Object Notation |
| **SSL/TLS** | Secure Sockets Layer/Transport Layer Security |
| **JWT** | JSON Web Token |
| **REST** | Representational State Transfer |

### 1.4 การอ้างอิง (References)

**มาตรฐานและเอกสารอ้างอิง**:
- IEEE Std 830-1998 - IEEE Recommended Practice for Software Requirements Specifications
- RFC 6455 - The WebSocket Protocol  
- RFC 7519 - JSON Web Token (JWT)
- ENGSE206 Course Materials - Software Requirements Specification and Design
- LAB 5-7 Implementation Guides - 3-Tier Architecture

**เอกสารที่เกี่ยวข้อง**:
- Overall Context Analysis - Agent Wallboard System
- User Stories และ Requirements Analysis
- Use Case Analysis พร้อม Use Case Diagram

### 1.5 ภาพรวม (Overview)

เอกสาร SRS นี้จัดองค์ประกอบตามมาตรฐาน IEEE 830 ดังนี้:

**Section 2 (คำอธิบายโดยรวม)**: อธิบายบริบท, หน้าที่หลัก, ลักษณะผู้ใช้งาน, ข้อจำกัด และสมมติฐานของระบบ

**Section 3 (ความต้องการเฉพาะ)**: รายละเอียดความต้องการเชิงหน้าที่ (Functional Requirements) และความต้องการเชิงคุณภาพ (Non-functional Requirements) พร้อม traceability mapping

**Section 4 (ภาคผนวก)**: ข้อมูลเสริมรวมถึง glossary และรายละเอียดเทคนิค

---

## 2. คำอธิบายโดยรวม (Overall Description)

### 2.1 มุมมองผลิตภัณฑ์ (Product Perspective)

#### 2.1.1 System Context

Agent Wallboard System เป็น standalone system ที่ออกแบบด้วย **3-Tier Architecture**:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Presentation   │    │   Application   │    │      Data       │
│      Tier       │◄──►│      Tier       │◄──►│      Tier       │
│                 │    │                 │    │                 │
│ Desktop App     │    │ Node.js API     │    │ MSSQL Database  │
│ (Electron.js)   │    │ WebSocket       │    │ MongoDB         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

#### 2.1.2 System Interfaces

**External System Interfaces**:
- **Database Systems**: MSSQL Server สำหรับ transactional data, MongoDB สำหรับ real-time data
- **Operating System**: Windows 10/11 สำหรับ desktop application
- **Network Infrastructure**: TCP/IP network สำหรับ HTTP/HTTPS และ WebSocket communications

**User Interfaces**:
- **Desktop Application**: Electron.js-based application สำหรับ agents
- **Web Dashboard**: Browser-based interface สำหรับ supervisors และ managers

**Hardware Interfaces**:
- **Client Workstations**: Windows PCs ที่มี minimum 4GB RAM, dual-core processor
- **Server Hardware**: Application server และ database server ตามความต้องการใน production

**Software Interfaces**:
- **Node.js Runtime**: Version 18 หรือสูงกว่า
- **Database Drivers**: MSSQL driver, MongoDB driver
- **Web Browser**: Chrome 90+, Firefox 88+, Edge 90+

**Communication Interfaces**:
- **REST API**: HTTP/HTTPS protocols สำหรับ client-server communication
- **WebSocket**: Real-time bidirectional communication
- **SSL/TLS**: Secure communication channels

### 2.2 หน้าที่ของผลิตภัณฑ์ (Product Functions)

ระบบ Agent Wallboard System มีหน้าที่หลัก 5 กลุ่ม ตาม Epic structure:

#### **2.2.1 Epic 1: Real-time Agent Status Monitoring**
- 📊 **แสดงสถานะ Agent**: แสดงสถานะ Available, Active, Wrap, Not Ready, Offline แบบ real-time
- 🔄 **อัปเดตสถานะ**: Agent สามารถเปลี่ยนสถานะผ่าน desktop application
- 📝 **ติดตาม Login/Logout**: บันทึกเวลาเข้า-ออกงานของ agents

#### **2.2.2 Epic 2: Supervisor Communication System**  
- 💬 **ส่งข้อความ**: Supervisor ส่งข้อความไปยัง agent ที่เฉพาะเจาะจง
- 🔔 **การแจ้งเตือน**: Agent รับ desktop notification และ popup messages

#### **2.2.3 Epic 3: Agent Self-Service Portal**
- 🔐 **การยืนยันตัวตน**: Agent login ด้วย Agent Code
- 👤 **ข้อมูลส่วนตัว**: แสดงข้อมูลและสถานะปัจจุบันของ agent

#### **2.2.4 Epic 4: Management Dashboard & Reporting**
- 📈 **Dashboard**: แสดงสถิติทีมและ real-time metrics
- 📊 **รายงาน**: สถิติการทำงานและ attendance reports

#### **2.2.5 Epic 5: System Administration & Configuration**
- 🛠️ **จัดการฐานข้อมูล**: Database configuration และ connection management
- ⚙️ **API Management**: จัดการ endpoints และ security
- 🔗 **WebSocket Management**: จัดการ real-time connections
- 📦 **Deployment**: สร้างและแจกจ่าย desktop application

### 2.3 ลักษณะผู้ใช้งาน (User Characteristics)

#### **2.3.1 Agent (Primary User)**
- **จำนวน**: 50-500 คนต่อองค์กร
- **ความเชี่ยวชาญด้านเทคโนโลยี**: พื้นฐานถึงปานกลาง
- **ความถี่การใช้งาน**: ใช้งานต่อเนื่อง 8 ชั่วโมงต่อวัน
- **วัตถุประสงค์หลัก**: จัดการสถานะงาน, รับข้อมูลจาก supervisor
- **การฝึกอบรม**: ต้องการการฝึกอบรม 1-2 ชั่วโมง

#### **2.3.2 Supervisor (Power User)**
- **จำนวน**: 5-50 คนต่อองค์กร
- **ความเชี่ยวชาญด้านเทคโนโลยี**: ปานกลางถึงสูง
- **ความถี่การใช้งาน**: ใช้งานสม่ำเสมอตลอดวัน
- **วัตถุประสงค์หลัก**: ติดตามทีม, ส่งข้อความ, ดูรายงาน
- **การฝึกอบรม**: ต้องการการฝึกอบรม 2-4 ชั่วโมง

#### **2.3.3 Operations Manager (Executive User)**
- **จำนวน**: 1-10 คนต่อองค์กร  
- **ความเชี่ยวชาญด้านเทคโนโลยี**: ปานกลาง
- **ความถี่การใช้งาน**: ใช้งานเป็นระยะเพื่อดูรายงาน
- **วัตถุประสงค์หลัก**: ดูสถิติโดยรวม, วิเคราะห์ performance
- **การฝึกอบรม**: ต้องการการฝึกอบรม 1 ชั่วโมง

#### **2.3.4 System Administrator (Technical User)**
- **จำนวน**: 1-5 คนต่อองค์กร
- **ความเชี่ยวชาญด้านเทคโนโลยี**: สูง
- **ความถี่การใช้งาน**: ใช้งานเมื่อต้องการบำรุงรักษาและ configuration
- **วัตถุประสงค์หลัก**: จัดการระบบ, deployment, troubleshooting  
- **การฝึกอบรม**: ต้องการเอกสารเทคนิคและการฝึกอบรม 4-8 ชั่วโมง

### 2.4 ข้อจำกัด (Constraints)

#### **2.4.1 Regulatory Constraints**
- ไม่มีข้อจำกัดด้าน regulatory เนื่องจากเป็น internal system
- ต้องปฏิบัติตามนโยบาย IT security ของบริษัท

#### **2.4.2 Hardware Limitations**  
- **Client Requirements**: Windows 10/11, minimum 4GB RAM, 1GB disk space
- **Server Requirements**: ต้องมี dedicated server สำหรับ production deployment
- **Network Requirements**: Stable internet connection สำหรับ real-time features

#### **2.4.3 Technology Constraints**
- **Programming Language**: JavaScript (Node.js) สำหรับ backend
- **Database**: MSSQL และ MongoDB เท่านั้น
- **Desktop Platform**: Windows only (Electron.js limitation ตาม LAB requirements)
- **Browser Support**: Modern browsers ที่รองรับ WebSocket

#### **2.4.4 Academic/Project Constraints**
- **Timeline**: ต้องพัฒนาให้เสร็จใน 7 สัปดาห์ ตาม academic schedule
- **Team Size**: Limited team members (3-4 คน)
- **Budget**: ไม่มี budget สำหรับ commercial software licenses
- **Learning Curve**: ทีมต้องเรียนรู้ technology ขณะพัฒนา

### 2.5 สมมติฐานและการพึ่งพิง (Assumptions and Dependencies)

#### **2.5.1 Assumptions**
- **Network Stability**: สมมติว่า network connection มีความเสถียรสำหรับ real-time features
- **User Training**: สมมติว่าผู้ใช้งานจะได้รับการฝึกอบรมก่อนใช้งานจริง  
- **Data Volume**: สมมติว่าจะมี agents ไม่เกิน 100 คนใน initial deployment
- **Operating Hours**: ระบบจะใช้งานในเวลาทำการปกติ (8AM-6PM)

#### **2.5.2 Dependencies**
- **External Dependencies**:
  - Windows Operating System availability
  - MSSQL Server instance พร้อมใช้งาน  
  - Network infrastructure พร้อมรองรับ WebSocket
  - SSL certificates สำหรับ secure communication

- **Internal Dependencies**:
  - Database schema ต้องสร้างก่อน API development
  - API endpoints ต้องพร้อมก่อน frontend development
  - WebSocket server ต้องเสถียรก่อน real-time features
  - Authentication system ต้องทำงานก่อน user-specific features

#### **2.5.3 Risk Mitigation**
- **Performance Risk**: จะมี performance testing ก่อน production deployment
- **Security Risk**: จะมี security review และ testing
- **Scalability Risk**: จะออกแบบให้รองรับการขยายใน future versions
- **User Adoption Risk**: จะมี user training และ change management plan

---

## 3. ความต้องการเฉพาะ (Specific Requirements)

### 3.1 ความต้องการเชิงหน้าที่ (Functional Requirements)

#### **3.1.1 Epic 1: Real-time Agent Status Monitoring**

##### **FR-001: Agent Status Display**
- **Requirement ID**: FR-001
- **Title**: แสดงสถานะ Agent แบบ Real-time
- **Description**: ระบบต้องสามารถแสดงสถานะปัจจุบันของ agents ทั้งหมดบน dashboard แบบ real-time
- **Related Use Cases**: UC-03
- **Related User Stories**: US-001
- **Priority**: HIGH
- **Input**: Agent status changes จาก database
- **Process**: Query agent data, format display, update via WebSocket
- **Output**: Real-time dashboard แสดง agent list พร้อมสถานะ
- **Success Criteria**: 
  - แสดงข้อมูล agents ภายใน 3 วินาที
  - อัปเดต real-time เมื่อมี status changes
  - แสดง color coding ตาม status
  - แสดง timestamp ของการอัปเดตล่าสุด

##### **FR-002: Agent Status Update**  
- **Requirement ID**: FR-002
- **Title**: การเปลี่ยนสถานะของ Agent
- **Description**: Agent ต้องสามารถเปลี่ยนสถานะของตัวเองผ่าน desktop application
- **Related Use Cases**: UC-02
- **Related User Stories**: US-002
- **Priority**: HIGH
- **Input**: Status selection จาก dropdown (Available, Active, Wrap, Not Ready)
- **Process**: Validate status, update database, broadcast via WebSocket
- **Output**: Status อัปเดตใน dashboard และ agent application
- **Success Criteria**:
  - Status อัปเดตใน dashboard ภายใน 1 วินาที
  - ไม่มี status conflicts หรือ race conditions
  - บันทึก timestamp ของการเปลี่ยนสถานะ
  - Agent เห็น confirmation ของการเปลี่ยนสถานะ

##### **FR-003: Agent Login/Logout Tracking**
- **Requirement ID**: FR-003  
- **Title**: ติดตามการ Login/Logout ของ Agent
- **Description**: ระบบต้องบันทึกและติดตามเวลา login/logout ของ agents
- **Related Use Cases**: UC-01, UC-07
- **Related User Stories**: US-003, US-006
- **Priority**: HIGH
- **Input**: Agent login/logout events
- **Process**: Record timestamps, update connection status, log to database
- **Output**: Attendance logs และ connection status indicators
- **Success Criteria**:
  - บันทึก login time เมื่อ agent เข้าระบบสำเร็จ
  - บันทึก logout time เมื่อ agent ออกจากระบบ
  - ตรวจจับ unexpected disconnection
  - เก็บ attendance history สำหรับ reporting

#### **3.1.2 Epic 2: Supervisor Communication System**

##### **FR-004: Send Message to Agent**
- **Requirement ID**: FR-004
- **Title**: การส่งข้อความไปยัง Agent
- **Description**: Supervisor ต้องสามารถส่งข้อความไปยัง agent ที่เฉพาะเจาะจงผ่าน dashboard
- **Related Use Cases**: UC-04
- **Related User Stories**: US-004
- **Priority**: HIGH  
- **Input**: Target agent selection, message text
- **Process**: Validate message, route via WebSocket, log message
- **Output**: Message delivered to target agent, delivery confirmation
- **Success Criteria**:
  - ส่งข้อความถึง online agent ภายใน 2 วินาที
  - แสดง delivery status confirmation
  - บันทึก message history
  - Handle case เมื่อ agent offline

##### **FR-005: Receive Notification**
- **Requirement ID**: FR-005
- **Title**: การรับ Notification สำหรับ Agent  
- **Description**: Agent ต้องรับ notification เมื่อมีข้อความจาก supervisor
- **Related Use Cases**: UC-05
- **Related User Stories**: US-005
- **Priority**: HIGH
- **Input**: Message จาก supervisor via WebSocket
- **Process**: Display notification, play alert sound, show popup
- **Output**: Desktop notification และ popup message
- **Success Criteria**:
  - แสดง desktop notification ทันที
  - เล่นเสียงแจ้งเตือน
  - แสดง popup พร้อม message content
  - Agent สามารถปิด notification ได้

#### **3.1.3 Epic 3: Agent Self-Service Portal**

##### **FR-006: Agent Authentication**
- **Requirement ID**: FR-006
- **Title**: การยืนยันตัวตนของ Agent
- **Description**: Agent ต้องสามารถ login เข้าระบบด้วย Agent Code
- **Related Use Cases**: UC-01
- **Related User Stories**: US-006
- **Priority**: HIGH
- **Input**: Agent Code
- **Process**: Validate against database, create session, establish WebSocket
- **Output**: Authenticated session, dashboard access
- **Success Criteria**:
  - Authentication ภายใน 2 วินาที
  - แสดง error message สำหรับ invalid Agent Code
  - สร้าง secure session
  - เชื่อมต่อ WebSocket หลัง authentication สำเร็จ

##### **FR-007: Agent Profile Information**
- **Requirement ID**: FR-007
- **Title**: การจัดการข้อมูลส่วนตัวของ Agent
- **Description**: Agent ต้องสามารถดูข้อมูลส่วนตัวและสถานะปัจจุบัน
- **Related Use Cases**: UC-06 (ส่วนหนึ่ง)
- **Related User Stories**: US-007
- **Priority**: MEDIUM
- **Input**: Agent session information
- **Process**: Query agent data, format display
- **Output**: Agent profile information display
- **Success Criteria**:
  - แสดง Agent Code, Name, และ current status
  - แสดงเวลา login วันปัจจุบัน
  - อัปเดตข้อมูลแบบ real-time

#### **3.1.4 Epic 4: Management Dashboard & Reporting**

##### **FR-008: Team Dashboard**
- **Requirement ID**: FR-008
- **Title**: Dashboard สำหรับ Supervisor
- **Description**: แสดงสถิติโดยรวมของทีมและ real-time metrics
- **Related Use Cases**: UC-06
- **Related User Stories**: US-008
- **Priority**: HIGH
- **Input**: Aggregated agent data
- **Process**: Calculate statistics, create visualizations, update real-time
- **Output**: Interactive dashboard พร้อม charts และ metrics
- **Success Criteria**:
  - แสดงจำนวน agents ตาม status categories
  - แสดงสถิติ online/offline agents
  - อัปเดตข้อมูลแบบ real-time
  - แสดงเวลาปัจจุบันและ team summary

##### **FR-009: Statistical Reports**
- **Requirement ID**: FR-009
- **Title**: รายงานสถิติแบบ Real-time
- **Description**: แสดงสถิติการทำงานและ performance metrics
- **Related Use Cases**: UC-08
- **Related User Stories**: US-009
- **Priority**: MEDIUM
- **Input**: Historical และ real-time data
- **Process**: Generate reports, create visualizations
- **Output**: Statistical reports และ performance metrics
- **Success Criteria**:
  - แสดง placeholder metrics (Queue, Calls statistics)
  - อัปเดตตัวเลขแบบ real-time  
  - ใช้สีและ icons ที่เหมาะสม
  - เตรียมไว้สำหรับ future enhancements

#### **3.1.5 Epic 5: System Administration & Configuration**

##### **FR-010: Database Management**
- **Requirement ID**: FR-010
- **Title**: การจัดการฐานข้อมูล
- **Description**: จัดการ database connections และ data operations
- **Related Use Cases**: UC-09
- **Related User Stories**: US-010
- **Priority**: HIGH
- **Input**: Database configuration parameters
- **Process**: Establish connections, handle queries, manage connection pool
- **Output**: Stable database operations
- **Success Criteria**:
  - เชื่อมต่อ MSSQL database สำเร็จ
  - จัดการ connection pool อย่างมีประสิทธิภาพ
  - Handle connection failures gracefully
  - Support concurrent operations

##### **FR-011: API Endpoint Management**
- **Requirement ID**: FR-011
- **Title**: การจัดการ API Endpoints
- **Description**: จัดการ REST API endpoints และ authentication
- **Related Use Cases**: UC-10
- **Related User Stories**: US-011
- **Priority**: HIGH
- **Input**: API requests พร้อม authentication tokens
- **Process**: Route requests, validate authentication, process business logic
- **Output**: JSON responses ตาม REST principles
- **Success Criteria**:
  - API endpoints ทำงานตาม specification
  - Bearer Token authentication ทำงานถูกต้อง
  - Response times ภายใน 500ms
  - Error handling และ appropriate HTTP status codes

##### **FR-012: WebSocket Connection Management**
- **Requirement ID**: FR-012
- **Title**: การจัดการ WebSocket Connections
- **Description**: จัดการ real-time connections และ message routing
- **Related Use Cases**: UC-11
- **Related User Stories**: US-012
- **Priority**: HIGH
- **Input**: WebSocket connection requests และ messages
- **Process**: Manage connection pool, route messages, handle disconnections
- **Output**: Stable real-time communication
- **Success Criteria**:
  - Support concurrent WebSocket connections
  - Message routing ระหว่าง clients
  - Handle connection drops และ reconnection
  - Performance monitoring และ logging

##### **FR-013: Application Deployment**
- **Requirement ID**: FR-013
- **Title**: การ Deploy Desktop Application
- **Description**: สร้างและแจกจ่าย desktop application installer
- **Related Use Cases**: UC-12
- **Related User Stories**: US-013
- **Priority**: MEDIUM
- **Input**: Electron.js application source code
- **Process**: Build executable, create installer, distribute
- **Output**: Windows installer package
- **Success Criteria**:
  - สร้าง .exe installer สำเร็จ
  - Installer ทำงานบน target Windows systems
  - Application รันได้หลัง installation
  - Configuration management สำหรับ different environments

##### **FR-014: System Configuration**
- **Requirement ID**: FR-014
- **Title**: การจัดการ Configuration ระบบ
- **Description**: จัดการ configuration แยกตาม environment (development/production)
- **Related Use Cases**: UC-13
- **Related User Stories**: US-014
- **Priority**: MEDIUM
- **Input**: Environment-specific configuration parameters
- **Process**: Load configuration, validate settings, apply to system components
- **Output**: System configured สำหรับ target environment
- **Success Criteria**:
  - แยก configuration files ตาม environment
  - จัดการ database connection strings
  - กำหนด API URLs และ WebSocket endpoints
  - SSL certificate management

### 3.2 ความต้องการเชิงคุณภาพ (Non-functional Requirements)

#### **3.2.1 Performance Requirements**

##### **NFR-001: Response Time**
- **Requirement ID**: NFR-001
- **Description**: ระบบต้องมี response time ที่เหมาะสมสำหรับ real-time operations
- **Specifications**:
  - API response time: < 500ms สำหรับ 95% ของ requests
  - WebSocket message delivery: < 1 วินาที
  - Dashboard loading time: < 3 วินาที
  - Status update propagation: < 1 วินาที
- **Measurement**: Response time monitoring และ performance testing
- **Priority**: HIGH

##### **NFR-002: Throughput**
- **Requirement ID**: NFR-002
- **Description**: ระบบต้องรองรับจำนวน concurrent users และ operations ตามที่กำหนด
- **Specifications**:
  - Concurrent agents: ≥ 100 agents
  - Concurrent supervisors: ≥ 20 supervisors  
  - API requests: ≥ 1000 requests/minute
  - WebSocket connections: ≥ 120 concurrent connections
- **Measurement**: Load testing และ performance monitoring
- **Priority**: HIGH

##### **NFR-003: Scalability**
- **Requirement ID**: NFR-003
- **Description**: ระบบต้องสามารถขยายตัวได้เมื่อมีผู้ใช้เพิ่มขึ้น
- **Specifications**:
  - Horizontal scaling: รองรับ multiple API server instances
  - Database scaling: Connection pooling และ query optimization
  - Memory usage: < 500MB RAM ต่อ 100 concurrent users
- **Measurement**: Scalability testing และ resource monitoring
- **Priority**: MEDIUM

#### **3.2.2 Reliability Requirements**

##### **NFR-004: Availability**
- **Requirement ID**: NFR-004
- **Description**: ระบบต้องมี uptime ที่สูงสำหรับการใช้งานต่อเนื่อง
- **Specifications**:
  - System uptime: ≥ 99% ในเวลาทำการ
  - WebSocket connection stability: ≥ 95% connection success rate
  - Data consistency: 100% ของ status updates ต้องถูกบันทึก
- **Measurement**: Uptime monitoring และ reliability testing
- **Priority**: HIGH

##### **NFR-005: Error Handling**
- **Requirement ID**: NFR-005
- **Description**: ระบบต้องจัดการ errors และ exceptions ได้อย่างเหมาะสม
- **Specifications**:
  - Graceful degradation เมื่อ network issues
  - Automatic reconnection สำหรับ WebSocket
  - User-friendly error messages
  - Error logging และ monitoring
- **Measurement**: Error rate monitoring และ exception handling testing
- **Priority**: HIGH

#### **3.2.3 Usability Requirements**

##### **NFR-006: User Interface**
- **Requirement ID**: NFR-006
- **Description**: User interface ต้องใช้งานง่ายและเป็นมิตรกับผู้ใช้
- **Specifications**:
  - Intuitive navigation: Users สามารถเข้าใจการใช้งานภายใน 5 นาที
  - Consistent UI: ใช้ design patterns เดียวกันทั้งระบบ
  - Responsive design: แสดงผลได้ดีบน screen sizes ต่างๆ
  - Accessibility: รองรับ basic accessibility features
- **Measurement**: Usability testing และ user feedback
- **Priority**: MEDIUM

##### **NFR-007: Learning Curve**
- **Requirement ID**: NFR-007
- **Description**: ผู้ใช้ใหม่ต้องสามารถเรียนรู้การใช้งานได้อย่างรวดเร็ว
- **Specifications**:
  - Agent training time: ≤ 1 ชั่วโมง
  - Supervisor training time: ≤ 2 ชั่วโมง
  - Online help และ documentation
  - Clear labeling และ visual cues
- **Measurement**: Training time metrics และ user feedback
- **Priority**: MEDIUM

#### **3.2.4 Security Requirements**

##### **NFR-008: Authentication & Authorization**
- **Requirement ID**: NFR-008
- **Description**: ระบบต้องมีความปลอดภัยในการ authentication และ authorization
- **Specifications**:
  - Secure authentication: Bearer Token authentication
  - Session management: Secure session handling
  - Role-based access: แยกสิทธิ์ตาม user roles
  - Password security: Secure credential storage (ถ้ามี)
- **Measurement**: Security testing และ penetration testing
- **Priority**: HIGH

##### **NFR-009: Data Protection**
- **Requirement ID**: NFR-009
- **Description**: ข้อมูลต้องได้รับการปกป้องจากการเข้าถึงที่ไม่ได้รับอนุญาต
- **Specifications**:
  - HTTPS/SSL encryption สำหรับ web communications
  - WSS (Secure WebSocket) สำหรับ real-time communications
  - Database connection security
  - Input validation และ sanitization
- **Measurement**: Security audit และ vulnerability testing
- **Priority**: HIGH

#### **3.2.5 Compatibility Requirements**

##### **NFR-010: Platform Compatibility**
- **Requirement ID**: NFR-010
- **Description**: ระบบต้องทำงานได้บน platforms ที่กำหนด
- **Specifications**:
  - Desktop OS: Windows 10/11 (64-bit)
  - Web browsers: Chrome 90+, Firefox 88+, Edge 90+
  - Node.js: Version 18 หรือสูงกว่า
  - Database: MSSQL 2019+, MongoDB 4.4+
- **Measurement**: Compatibility testing บน target platforms
- **Priority**: HIGH

##### **NFR-011: Integration Compatibility**
- **Requirement ID**: NFR-011
- **Description**: ระบบต้องสามารถ integrate กับ systems และ tools ปัจจุบัน
- **Specifications**:
  - Database connectivity: Standard drivers และ protocols
  - API compatibility: REST API standards
  - Network protocols: Standard TCP/IP, HTTP/HTTPS, WebSocket
- **Measurement**: Integration testing
- **Priority**: MEDIUM

#### **3.2.6 Maintainability Requirements**

##### **NFR-012: Code Quality**
- **Requirement ID**: NFR-012
- **Description**: Code ต้องมีคุณภาพและบำรุงรักษาได้ง่าย
- **Specifications**:
  - Code documentation: Comments และ technical documentation
  - Coding standards: Consistent coding style
  - Modular design: Separation of concerns
  - Error logging: Comprehensive logging system
- **Measurement**: Code review และ static analysis
- **Priority**: MEDIUM

##### **NFR-013: Deployment & Updates**
- **Requirement ID**: NFR-013
- **Description**: ระบบต้อง deploy และ update ได้ง่าย
- **Specifications**:
  - Automated deployment: Build และ deployment scripts
  - Configuration management: Environment-specific configurations
  - Rollback capability: สามารถ rollback เมื่อมีปัญหา
  - Update mechanism: สำหรับ desktop application updates
- **Measurement**: Deployment success rate และ update testing
- **Priority**: MEDIUM

### 3.3 Traceability Matrix

#### **3.3.1 Requirements to Use Case Mapping**

| Functional Requirement | Use Case | User Story | Epic | Priority | Verification Method |
|------------------------|----------|------------|------|----------|-------------------|
| **FR-001** | UC-03 | US-001 | Epic 1 | HIGH | Integration Testing, UI Testing |
| **FR-002** | UC-02 | US-002 | Epic 1 | HIGH | Unit Testing, Integration Testing |
| **FR-003** | UC-01, UC-07 | US-003, US-006 | Epic 1, Epic 3 | HIGH | Database Testing, Session Testing |
| **FR-004** | UC-04 | US-004 | Epic 2 | HIGH | WebSocket Testing, Message Testing |
| **FR-005** | UC-05 | US-005 | Epic 2 | HIGH | Notification Testing, UI Testing |
| **FR-006** | UC-01 | US-006 | Epic 3 | HIGH | Authentication Testing, Security Testing |
| **FR-007** | UC-06 | US-007 | Epic 3 | MEDIUM | UI Testing, Data Validation Testing |
| **FR-008** | UC-06 | US-008 | Epic 4 | HIGH | Dashboard Testing, Real-time Testing |
| **FR-009** | UC-08 | US-009 | Epic 4 | MEDIUM | Reporting Testing, Data Analysis Testing |
| **FR-010** | UC-09 | US-010 | Epic 5 | HIGH | Database Testing, Connection Testing |
| **FR-011** | UC-10 | US-011 | Epic 5 | HIGH | API Testing, Security Testing |
| **FR-012** | UC-11 | US-012 | Epic 5 | HIGH | WebSocket Testing, Performance Testing |
| **FR-013** | UC-12 | US-013 | Epic 5 | MEDIUM | Deployment Testing, Installation Testing |
| **FR-014** | UC-13 | US-014 | Epic 5 | MEDIUM | Configuration Testing, Environment Testing |

#### **3.3.2 Epic Coverage Analysis**

| Epic | Requirements Count | Use Cases Count | User Stories Count | Completion % |
|------|-------------------|-----------------|-------------------|--------------|
| **Epic 1: Real-time Monitoring** | 3 (FR-001 to FR-003) | 3 (UC-01, UC-02, UC-03, UC-07) | 3 (US-001, US-002, US-003, US-006) | 100% |
| **Epic 2: Communication** | 2 (FR-004, FR-005) | 2 (UC-04, UC-05) | 2 (US-004, US-005) | 100% |
| **Epic 3: Agent Portal** | 2 (FR-006, FR-007) | 2 (UC-01, UC-06) | 2 (US-006, US-007) | 100% |
| **Epic 4: Dashboard & Reporting** | 2 (FR-008, FR-009) | 2 (UC-06, UC-08) | 2 (US-008, US-009) | 100% |
| **Epic 5: Administration** | 5 (FR-010 to FR-014) | 5 (UC-09 to UC-13) | 5 (US-010 to US-014) | 100% |

#### **3.3.3 Verification and Validation Matrix**

| Requirement Type | Verification Method | Validation Method | Acceptance Criteria |
|------------------|-------------------|------------------|-------------------|
| **Functional Requirements** | Unit Testing, Integration Testing | User Acceptance Testing | Business rules compliance |
| **Performance Requirements** | Load Testing, Performance Testing | Stress Testing | Performance benchmarks met |
| **Security Requirements** | Security Testing, Code Review | Penetration Testing | Security standards compliance |
| **Usability Requirements** | Usability Testing, UI Review | User Experience Testing | User satisfaction metrics |
| **Compatibility Requirements** | Platform Testing, Browser Testing | Cross-platform Validation | Platform support verification |

### 3.4 System Features

#### **3.4.1 Feature: Real-time Status Monitoring**
- **Feature ID**: F-001
- **Description**: ระบบแสดงและอัปเดตสถานะ agents แบบ real-time
- **Associated Requirements**: FR-001, FR-002, FR-003, NFR-001, NFR-004
- **Priority**: HIGH
- **Risk**: MEDIUM (WebSocket stability dependencies)

#### **3.4.2 Feature: Bidirectional Communication**
- **Feature ID**: F-002  
- **Description**: ระบบสื่อสารระหว่าง supervisors และ agents แบบ real-time
- **Associated Requirements**: FR-004, FR-005, NFR-002, NFR-008
- **Priority**: HIGH
- **Risk**: MEDIUM (Message delivery reliability)

#### **3.4.3 Feature: Management Dashboard**
- **Feature ID**: F-003
- **Description**: Dashboard สำหรับการจัดการและติดตาม team performance
- **Associated Requirements**: FR-008, FR-009, NFR-006, NFR-010
- **Priority**: HIGH  
- **Risk**: LOW (Standard dashboard functionality)

#### **3.4.4 Feature: System Administration**
- **Feature ID**: F-004
- **Description**: เครื่องมือสำหรับ system administrators ในการจัดการระบบ
- **Associated Requirements**: FR-010 to FR-014, NFR-012, NFR-013
- **Priority**: MEDIUM
- **Risk**: LOW (Administrative tools)

---

## 4. ภาคผนวก (Appendices)

### 4.1 Glossary

#### **4.1.1 Technical Terms**

| Term | Definition |
|------|------------|
| **3-Tier Architecture** | แบบแผนการออกแบบซอฟต์แวร์ที่แบ่งเป็น 3 ชั้น: Presentation, Application, และ Data |
| **API (Application Programming Interface)** | ชุดของ protocols และ tools สำหรับการสร้าง software applications |
| **Bearer Token** | วิธีการ authentication โดยใช้ token ในการยืนยันตัวตน |
| **Desktop Application** | โปรแกรมที่รันบน desktop operating system |
| **Electron.js** | Framework สำหรับการสร้าง desktop applications ด้วย web technologies |
| **JSON (JavaScript Object Notation)** | รูปแบบการแลกเปลี่ยนข้อมูลที่อ่านได้ง่าย |
| **JWT (JSON Web Token)** | มาตรฐานสำหรับการสร้าง access tokens |
| **MongoDB** | NoSQL database ที่เก็บข้อมูลในรูปแบบ documents |
| **MSSQL (Microsoft SQL Server)** | Relational database management system ของ Microsoft |
| **Node.js** | JavaScript runtime สำหรับการพัฒนา server-side applications |
| **Real-time** | การประมวลผลที่ให้ผลลัพธ์ทันทีหรือใกล้เคียงกับเวลาจริง |
| **REST (Representational State Transfer)** | Architectural style สำหรับการออกแบบ web services |
| **SSL/TLS** | Protocols สำหรับการเข้ารหัสการสื่อสารผ่าน network |
| **WebSocket** | Protocol สำหรับการสื่อสารแบบ bidirectional ระหว่าง client และ server |

#### **4.1.2 Business Terms**

| Term | Definition |
|------|------------|
| **Agent** | พนักงาน call center ที่รับโทรศัพท์จากลูกค้า |
| **Available** | สถานะที่แสดงว่า agent พร้อมรับงานใหม่ |
| **Active** | สถานะที่แสดงว่า agent กำลังดำเนินงานอยู่ |
| **Call Center** | ศูนย์บริการลูกค้าทางโทรศัพท์ |
| **Dashboard** | หน้าจอแสดงข้อมูลสรุปและสถิติ |
| **Not Ready** | สถานะที่แสดงว่า agent ไม่พร้อมรับงาน |
| **Operations Manager** | ผู้จัดการระดับสูงที่ดูแลการดำเนินงานโดยรวม |
| **Supervisor** | หัวหน้าทีมที่ดูแลและควบคุม agents |
| **System Administrator** | ผู้ดูแลระบบ IT และการกำหนดค่าระบบ |
| **Wallboard** | หน้าจอแสดงสถานะและสถิติของ agents |
| **Wrap** | สถานะที่แสดงว่า agent กำลังจัดการงานหลังการให้บริการ |

### 4.2 Requirements Verification Plan

#### **4.2.1 Testing Strategy**

##### **Unit Testing (ระดับ Component)**
- **Scope**: ทดสอบ individual functions และ methods
- **Coverage Target**: ≥ 80% code coverage
- **Tools**: Jest, Mocha
- **Responsibility**: Development Team

##### **Integration Testing (ระดับ System)**  
- **Scope**: ทดสอบการทำงานร่วมกันระหว่าง components
- **Focus Areas**: API integration, Database connectivity, WebSocket communication
- **Tools**: Postman, Custom test scripts
- **Responsibility**: Development Team + Testing Team

##### **System Testing (ระดับ End-to-End)**
- **Scope**: ทดสอบระบบทั้งหมดตาม user scenarios  
- **Focus Areas**: User workflows, Performance, Security
- **Tools**: Selenium, Manual testing
- **Responsibility**: Testing Team

##### **User Acceptance Testing (ระดับ Business)**
- **Scope**: ทดสอบตาม business requirements และ user expectations
- **Participants**: End users, Project stakeholders
- **Duration**: 1 สัปดาห์
- **Responsibility**: Product Owner + End Users

#### **4.2.2 Acceptance Criteria Summary**

| Requirement Category | Success Metrics | Testing Method |
|---------------------|-----------------|----------------|
| **Functional** | All user stories pass acceptance criteria | UAT, Integration Testing |
| **Performance** | Response time < 500ms, Support 100+ users | Load Testing, Performance Testing |
| **Security** | Authentication working, HTTPS encryption | Security Testing, Penetration Testing |
| **Usability** | User satisfaction > 4/5, Training time < targets | Usability Testing, User Feedback |
| **Compatibility** | Works on target platforms | Platform Testing, Browser Testing |

### 4.3 Risk Assessment

#### **4.3.1 Technical Risks**

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|---------|-------------------|
| **WebSocket Performance Issues** | Medium | High | Early performance testing, Connection pooling |
| **Database Scalability** | Medium | Medium | Query optimization, Connection management |
| **Browser Compatibility** | Low | Medium | Cross-browser testing, Fallback mechanisms |
| **Security Vulnerabilities** | Low | High | Security review, Penetration testing |

#### **4.3.2 Project Risks**

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|---------|-------------------|
| **Timeline Delays** | Medium | High | Agile development, Regular progress monitoring |
| **Skill Gap** | Medium | Medium | Training, Knowledge sharing, Mentoring |
| **Scope Creep** | Medium | Medium | Clear requirements, Change control process |
| **Resource Availability** | Low | Medium | Resource planning, Backup plans |

### 4.4 Change Management Process

#### **4.4.1 Change Request Process**
1. **Change Identification**: Stakeholder identifies need for change
2. **Impact Analysis**: Assess impact on timeline, resources, other requirements
3. **Change Approval**: Project stakeholders review and approve/reject
4. **Implementation**: Update requirements, design, and implementation
5. **Verification**: Test and validate changes
6. **Documentation Update**: Update all relevant documents

#### **4.4.2 Version Control**
- **Document Version**: SRS version tracked และ maintained
- **Requirements Traceability**: Changes tracked back to source
- **Baseline Management**: Approved baselines maintained
- **Change History**: Complete change history documented

### 4.5 Compliance and Standards

#### **4.5.1 IEEE 830 Compliance Checklist**

| IEEE 830 Criterion | Compliance Status | Notes |
|--------------------|------------------|-------|
| **Correct** | ✅ Compliant | Requirements reviewed by stakeholders |
| **Unambiguous** | ✅ Compliant | Clear descriptions และ acceptance criteria |
| **Complete** | ✅ Compliant | All system functions covered |
| **Consistent** | ✅ Compliant | No conflicting requirements |
| **Ranked for importance** | ✅ Compliant | Priority levels assigned |
| **Verifiable** | ✅ Compliant | Testable acceptance criteria |
| **Modifiable** | ✅ Compliant | Clear structure และ traceability |
| **Traceable** | ✅ Compliant | Traceability matrix provided |

#### **4.5.2 Quality Standards**
- **Software Quality**: ISO 9126 quality characteristics considered
- **Security Standards**: Basic security principles applied
- **Development Standards**: Coding standards และ best practices
- **Documentation Standards**: Consistent documentation format

---

## สรุปผู้บริหาร (Executive Summary)

### Project Overview
Agent Wallboard System เป็นระบบ real-time monitoring และ communication สำหรับ call center operations ที่พัฒนาด้วย 3-tier architecture โดยมีเป้าหมายเพื่อเพิ่มประสิทธิภาพการดำเนินงานและปรับปรุงการสื่อสารระหว่าง supervisors และ agents

### Key Requirements Summary
- **14 Functional Requirements** ครอบคลุม 5 Epic areas
- **13 Non-functional Requirements** เน้น performance, security และ usability  
- **13 Use Cases** พร้อม complete traceability
- **4 Primary User Types** ที่มีความต้องการแตกต่างกัน

### Success Criteria
- ✅ **100% Requirements Coverage**: ทุก user stories มี functional requirements รองรับ
- ✅ **Complete Traceability**: Requirements ↔ Use Cases ↔ User Stories mapping
- ✅ **IEEE 830 Compliance**: เป็นไปตามมาตรฐาน IEEE 830-1998
- ✅ **Academic Quality**: เหมาะสมสำหรับการประเมินในระดับ undergraduate
