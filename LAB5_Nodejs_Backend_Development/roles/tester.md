# **QA Test Plan: Agent Wallboard API - Phase 1 (ฉบับสมบูรณ์)**

เอกสารนี้เป็นคู่มือการทดสอบ **Agent Wallboard API Phase 1** แบบ Step-by-Step ที่สมบูรณ์ โดยมีเป้าหมายเพื่อรับประกันคุณภาพของ API ในทุกมิติ ตั้งแต่ฟังก์ชันพื้นฐานไปจนถึง Business Logic ที่ซับซ้อน

-----

## **ส่วนที่ 1: การเตรียมตัวและตรวจสอบระบบ (Preparation & Sanity Check)**

### **Step 1.1: ติดตั้งและรันโปรเจกต์**

1.  **ติดตั้ง Dependencies**:
    ```bash
    npm install
    ```
2.  **ตั้งค่า Environment**: คัดลอกไฟล์ `.env.example` ไปเป็น `.env`
    ```bash
    cp .env.example .env
    ```
3.  **รันเซิร์ฟเวอร์**:
    ```bash
    npm run dev
    ```
4.  **ตรวจสอบ**: เซิร์ฟเวอร์ควรจะทำงานที่ `http://localhost:3001`

### **Step 1.2: ตรวจสอบ Health Check Endpoint**

  * **Action**: ส่ง Request `GET` ไปที่ `http://localhost:3001/api/health`
  * **Expected Result**:
      * **Status Code**: `200 OK`
      * **Response Body**: มี `success: true` และ `status: "OK"`

-----

## **ส่วนที่ 2: การทดสอบฟังก์ชันหลัก (Core Feature Testing)**

### **Step 2: ทดสอบการสร้าง Agent (`POST /api/agents`)**

#### **2.1 - [Success Case] การสร้าง Agent ที่สมบูรณ์และทดสอบค่า Default**

  * **Objective**: ตรวจสอบว่าสามารถสร้าง Agent ใหม่ได้ และระบบกำหนดค่า Default ให้ถูกต้อง
  * **Action**: ส่ง `POST` Request ไปที่ `http://localhost:3001/api/agents` พร้อม Body (จงใจไม่ใส่ `department` และ `skills`):
    ```json
    {
      "agentCode": "A101",
      "name": "Somsak Jaidee",
      "email": "somsak.j@example.com"
    }
    ```
  * **Expected Result**:
      * **Status Code**: `201 Created`
      * **Response Body**:
          * `department` ต้องมีค่าเป็น `"General"`
          * `skills` ต้องมีค่าเป็น `[]` (Array ว่าง)
          * **ต้องมี Fields ครบถ้วน**: `id`, `agentCode`, `name`, `email`, `department`, `skills`, `status`, `isActive`, `loginTime`, `lastStatusChange`, `createdAt`, `updatedAt`

#### **2.2 - [Failure Case] การสร้าง Agent ด้วยข้อมูลที่ไม่ถูกต้อง (Validation)**

  * **Objective**: ตรวจสอบว่า Validation Logic ทำงานครอบคลุมทุก Field
  * **Actions**: ทดสอบส่ง Request ในแต่ละกรณีต่อไปนี้:
    1.  **`agentCode` ผิดรูปแบบ**: `{ "agentCode": "invalid" }`
    2.  **`email` ผิดรูปแบบ**: `{ "email": "somsak.com" }`
    3.  **`department` ไม่มีในระบบ**: `{ "department": "Marketing" }`
    4.  **`skills` ไม่ใช่ Array**: `{ "skills": "Thai" }`
  * **Expected Result (สำหรับทุกกรณี)**:
      * **Status Code**: `400 Bad Request`
      * **Response Body**: มี `success: false` และ `message: "Validation failed"` พร้อมรายละเอียดของ `errors` ที่ชัดเจน

#### **2.3 - [Failure Case] การสร้าง Agent ที่มี `agentCode` ซ้ำ**

  * **Objective**: ตรวจสอบว่าระบบป้องกัน `agentCode` ที่ซ้ำกันได้
  * **Action**:
    1.  สร้าง Agent `A101` ตามข้อ 2.1
    2.  สร้าง Agent อีกครั้งโดยใช้ `agentCode`: `A101`
  * **Expected Result**:
      * **Status Code**: `409 Conflict`
      * **Response Body**: มี `success: false` และข้อความระบุว่า Agent code นี้มีอยู่แล้ว

### **Step 3: ทดสอบการดึงข้อมูล Agent (`GET /api/agents`)**

#### **3.1 - [Success Case] การดึงข้อมูล Agent รายบุคคล**

  * **Objective**: ตรวจสอบว่าข้อมูล Agent ที่ได้กลับมามีโครงสร้างและ Field ครบถ้วน
  * **Action**: คัดลอก `id` ของ Agent ที่สร้างในข้อ 2.1 แล้วส่ง `GET` Request ไปที่ `http://localhost:3001/api/agents/{id}`
  * **Expected Result**:
      * **Status Code**: `200 OK`
      * **Response Body**: **ต้องมี Fields ครบถ้วน**: `id`, `agentCode`, `name`, `email`, `department`, `skills`, `status`, `isActive`, `loginTime`, `lastStatusChange`, `createdAt`, `updatedAt`

#### **3.2 - [Success Case] การกรองข้อมูล (Filter)**

  * **Objective**: ตรวจสอบว่าฟังก์ชัน filter ทำงานได้ถูกต้อง
  * **Action**: ส่ง `GET` Request ไปที่ `http://localhost:3001/api/agents?status=Available&department=Support`
  * **Expected Result**:
      * **Status Code**: `200 OK`
      * **Response Body**: แสดงผลลัพธ์เฉพาะ Agent ที่มีสถานะ `Available` **และ** อยู่ในแผนก `Support`

### **Step 4: ทดสอบ Business Logic - การอัปเดตสถานะ (`PATCH /api/agents/:id/status`)**

**ส่วนทดสอบที่สำคัญที่สุด** เพื่อรับประกันว่า Logic หลักของระบบทำงานถูกต้อง 100%

#### **4.1 - [Success & Failure] ตารางทดสอบการเปลี่ยนสถานะ**

  * **Objective**: ทดสอบทุกเงื่อนไขการเปลี่ยนสถานะตามกฎ `VALID_STATUS_TRANSITIONS`
  * **Action**: สำหรับ Agent ที่มีสถานะเริ่มต้น (From Status) ให้ลองเปลี่ยนไปยังสถานะต่างๆ และตรวจสอบผลลัพธ์
    | From Status | To Status | Expected Result |
    | :--- | :--- | :--- |
    | `Available` | `Busy` | ✅ **Success (200 OK)** |
    | `Available` | `Wrap` | ❌ **Failure (400 Bad Request)** |
    | `Busy` | `Wrap` | ✅ **Success (200 OK)** |
    | `Busy` | `Break` | ❌ **Failure (400 Bad Request)** |
    | `Wrap` | `Available` | ✅ **Success (200 OK)** |
    | `Wrap` | `Busy` | ❌ **Failure (400 Bad Request)** |
    | ... (ทดสอบให้ครบทุกเงื่อนไข) | | |

### **Step 5: ทดสอบการแก้ไขและลบข้อมูล**

#### **5.1 - [Success Case] การแก้ไขข้อมูล Agent (`PUT /api/agents/:id`)**

  * **Objective**: ตรวจสอบว่าสามารถแก้ไขข้อมูลพื้นฐานของ Agent ได้
  * **Action**: ส่ง `PUT` Request ไปที่ `http://localhost:3001/api/agents/{id}`
  * **Expected Result**: **Status Code**: `200 OK`

#### **5.2 - [Success Case] การลบ Agent (`DELETE /api/agents/:id`)**

  * **Objective**: ตรวจสอบว่าสามารถลบ Agent และข้อมูลนั้นหายไปจากระบบจริง
  * **Actions**:
    1.  ส่ง `DELETE` Request ไปที่ `http://localhost:3001/api/agents/{id}`
    2.  **(Verification)** ส่ง `GET` Request ไปที่ ID เดิมอีกครั้ง
  * **Expected Result**:
      * Request แรก: **Status Code** `200 OK`
      * Request ที่สอง (Verification): **Status Code** `404 Not Found`

### **Step 6: ทดสอบ Endpoint สรุปผล (`GET /api/agents/status/summary`)**

  * **Objective**: ตรวจสอบว่าข้อมูลสรุปถูกต้องและอัปเดตตามสถานะจริง
  * **Action**:
    1.  ส่ง `GET` Request ไปที่ `/summary` และบันทึกผล
    2.  สร้าง Agent ใหม่ หรือ เปลี่ยนสถานะ Agent ที่มีอยู่
    3.  ส่ง `GET` Request ไปที่ `/summary` อีกครั้ง
  * **Expected Result**: ข้อมูล `totalAgents`, `statusCounts` ใน Request ครั้งที่สองต้องมีการเปลี่ยนแปลงที่สอดคล้องกับ Action ที่ทำในข้อ 2

-----

## **ส่วนที่ 3: การตรวจสอบ Response มาตรฐาน (Standard Response Verification)**

  * **Objective**: ตรวจสอบว่าข้อความและรูปแบบ Response เป็นไปตามมาตรฐานที่กำหนดไว้
  * **Action**: ในระหว่างการทดสอบ Step ก่อนหน้า ให้สังเกต `message` ที่ได้รับกลับมา
  * **Expected Messages**:
    | Scenario | Expected Message |
    | :--- | :--- |
    | สร้าง Agent สำเร็จ | `Agent created successfully` |
    | ไม่พบ Agent | `Agent not found` |
    | Validation ล้มเหลว | `Validation failed` |
    | Server มีปัญหา | `Internal server error` |
    | อัปเดตสถานะสำเร็จ | `Agent status updated successfully` |

-----

## **ส่วนที่ 4: การทดสอบกรณีพิเศษ (Edge Case Testing)**

### **Step 7: ทดสอบ Invalid Route**

  * **Objective**: ตรวจสอบว่า API จัดการกับ URL ที่ไม่มีอยู่จริงได้อย่างถูกต้อง
  * **Action**: ส่ง `GET` Request ไปที่ `http://localhost:3001/api/non-existent-route`
  * **Expected Result**:
      * **Status Code**: `404 Not Found`
      * **Response Body**: ข้อความระบุว่าไม่พบ Route ที่ร้องขอ