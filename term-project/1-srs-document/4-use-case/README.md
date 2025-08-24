# Use Case Analysis - Agent Wallboard System

## 📋 สารบัญ
1. [Use Case Overview](#use-case-overview)
2. [Use Case Diagram](#use-case-diagram)
3. [Detailed Use Cases](#detailed-use-cases)
4. [Use Case to User Story Mapping](#use-case-to-user-story-mapping)

---

## 1. Use Case Overview

### 1.1 Actors (ผู้ใช้งาน)

| Actor | Description | Primary Goals |
|-------|-------------|---------------|
| **🎧 Agent** | พนักงาน Call Center ที่ใช้งาน desktop application | จัดการสถานะตัวเอง, รับข้อความจาก supervisor |
| **👨‍💼 Supervisor** | หัวหน้าทีมที่ดูแล agents | ติดตามสถานะทีม, ส่งข้อความ, ดู dashboard |
| **🏢 Operations Manager** | ผู้จัดการระดับสูงที่ดูภาพรวม | ดูรายงานและสถิติโดยรวม |
| **🔧 System Admin** | ผู้ดูแลระบบ IT | จัดการระบบ, configuration, deployment |

### 1.2 System Scope

```
🎯 Primary System: Agent Wallboard System
📦 Components: Desktop App + Web Dashboard + API Server + Database
🔗 External Systems: MSSQL Database, Windows OS, Network Infrastructure
```

---

## 2. Use Case Diagram

### 2.1 Draw.io XML Code

```xml
<mxfile host="app.diagrams.net" modified="2024-01-01T00:00:00.000Z" agent="5.0" version="22.1.16">
  <diagram name="Use Case Diagram - Agent Wallboard System" id="wallboard-usecase">
    <mxGraphModel dx="1422" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        
        <!-- System Boundary -->
        <mxCell id="system-boundary" value="Agent Wallboard System" style="swimlane;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontSize=16;fontStyle=1;startSize=30;" vertex="1" parent="1">
          <mxGeometry x="200" y="80" width="700" height="600" as="geometry" />
        </mxCell>
        
        <!-- Use Cases -->
        <mxCell id="uc-login" value="UC-01&#xa;Login to System" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="system-boundary">
          <mxGeometry x="50" y="80" width="120" height="60" as="geometry" />
        </mxCell>
        
        <mxCell id="uc-manage-status" value="UC-02&#xa;Manage Agent Status" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="system-boundary">
          <mxGeometry x="220" y="80" width="120" height="60" as="geometry" />
        </mxCell>
        
        <mxCell id="uc-monitor-agents" value="UC-03&#xa;Monitor Agents&#xa;Real-time" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="system-boundary">
          <mxGeometry x="400" y="80" width="120" height="60" as="geometry" />
        </mxCell>
        
        <mxCell id="uc-send-message" value="UC-04&#xa;Send Message&#xa;to Agent" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="system-boundary">
          <mxGeometry x="550" y="80" width="120" height="60" as="geometry" />
        </mxCell>
        
        <mxCell id="uc-receive-notification" value="UC-05&#xa;Receive&#xa;Notification" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="system-boundary">
          <mxGeometry x="50" y="200" width="120" height="60" as="geometry" />
        </mxCell>
        
        <mxCell id="uc-view-dashboard" value="UC-06&#xa;View Team&#xa;Dashboard" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="system-boundary">
          <mxGeometry x="220" y="200" width="120" height="60" as="geometry" />
        </mxCell>
        
        <mxCell id="uc-track-attendance" value="UC-07&#xa;Track Agent&#xa;Attendance" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="system-boundary">
          <mxGeometry x="400" y="200" width="120" height="60" as="geometry" />
        </mxCell>
        
        <mxCell id="uc-view-reports" value="UC-08&#xa;View Statistical&#xa;Reports" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="system-boundary">
          <mxGeometry x="550" y="200" width="120" height="60" as="geometry" />
        </mxCell>
        
        <mxCell id="uc-manage-database" value="UC-09&#xa;Manage Database&#xa;Configuration" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="system-boundary">
          <mxGeometry x="50" y="320" width="120" height="60" as="geometry" />
        </mxCell>
        
        <mxCell id="uc-manage-api" value="UC-10&#xa;Manage API&#xa;Endpoints" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="system-boundary">
          <mxGeometry x="220" y="320" width="120" height="60" as="geometry" />
        </mxCell>
        
        <mxCell id="uc-manage-websocket" value="UC-11&#xa;Manage WebSocket&#xa;Connections" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="system-boundary">
          <mxGeometry x="400" y="320" width="120" height="60" as="geometry" />
        </mxCell>
        
        <mxCell id="uc-deploy-application" value="UC-12&#xa;Deploy Desktop&#xa;Application" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="system-boundary">
          <mxGeometry x="550" y="320" width="120" height="60" as="geometry" />
        </mxCell>
        
        <mxCell id="uc-configure-system" value="UC-13&#xa;Configure System&#xa;Environment" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="system-boundary">
          <mxGeometry x="300" y="440" width="120" height="60" as="geometry" />
        </mxCell>
        
        <!-- Actors -->
        <mxCell id="actor-agent" value="Agent" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="80" y="200" width="30" height="60" as="geometry" />
        </mxCell>
        
        <mxCell id="actor-supervisor" value="Supervisor" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="80" y="350" width="30" height="60" as="geometry" />
        </mxCell>
        
        <mxCell id="actor-manager" value="Operations&#xa;Manager" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="80" y="500" width="30" height="60" as="geometry" />
        </mxCell>
        
        <mxCell id="actor-admin" value="System&#xa;Admin" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="980" y="400" width="30" height="60" as="geometry" />
        </mxCell>
        
        <!-- Agent Connections -->
        <mxCell id="conn-agent-login" value="" style="endArrow=none;html=1;rounded=0;entryX=0;entryY=0.5;" edge="1" parent="1" source="actor-agent" target="uc-login">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="120" y="230" as="sourcePoint" />
            <mxPoint x="250" y="190" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="conn-agent-status" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="actor-agent" target="uc-manage-status">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="120" y="230" as="sourcePoint" />
            <mxPoint x="420" y="190" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="conn-agent-notification" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="actor-agent" target="uc-receive-notification">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="120" y="230" as="sourcePoint" />
            <mxPoint x="250" y="310" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        
        <!-- Supervisor Connections -->
        <mxCell id="conn-supervisor-login" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="actor-supervisor" target="uc-login">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="120" y="380" as="sourcePoint" />
            <mxPoint x="250" y="190" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="conn-supervisor-monitor" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="actor-supervisor" target="uc-monitor-agents">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="120" y="380" as="sourcePoint" />
            <mxPoint x="600" y="190" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="conn-supervisor-message" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="actor-supervisor" target="uc-send-message">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="120" y="380" as="sourcePoint" />
            <mxPoint x="750" y="190" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="conn-supervisor-dashboard" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="actor-supervisor" target="uc-view-dashboard">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="120" y="380" as="sourcePoint" />
            <mxPoint x="420" y="310" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="conn-supervisor-attendance" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="actor-supervisor" target="uc-track-attendance">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="120" y="380" as="sourcePoint" />
            <mxPoint x="600" y="310" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        
        <!-- Manager Connections -->
        <mxCell id="conn-manager-dashboard" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="actor-manager" target="uc-view-dashboard">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="120" y="530" as="sourcePoint" />
            <mxPoint x="420" y="310" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="conn-manager-reports" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="actor-manager" target="uc-view-reports">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="120" y="530" as="sourcePoint" />
            <mxPoint x="750" y="310" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        
        <!-- Admin Connections -->
        <mxCell id="conn-admin-database" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="actor-admin" target="uc-manage-database">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="980" y="430" as="sourcePoint" />
            <mxPoint x="250" y="430" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="conn-admin-api" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="actor-admin" target="uc-manage-api">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="980" y="430" as="sourcePoint" />
            <mxPoint x="420" y="430" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="conn-admin-websocket" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="actor-admin" target="uc-manage-websocket">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="980" y="430" as="sourcePoint" />
            <mxPoint x="600" y="430" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="conn-admin-deploy" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="actor-admin" target="uc-deploy-application">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="980" y="430" as="sourcePoint" />
            <mxPoint x="750" y="430" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="conn-admin-configure" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="actor-admin" target="uc-configure-system">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="980" y="430" as="sourcePoint" />
            <mxPoint x="500" y="550" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        
        <!-- Include Relationships -->
        <mxCell id="include1" value="&amp;lt;&amp;lt;include&amp;gt;&amp;gt;" style="endArrow=open;endSize=12;dashed=1;html=1;rounded=0;" edge="1" parent="1" source="uc-manage-status" target="uc-login">
          <mxGeometry width="160" relative="1" as="geometry">
            <mxPoint x="400" y="300" as="sourcePoint" />
            <mxPoint x="560" y="300" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="include2" value="&amp;lt;&amp;lt;include&amp;gt;&amp;gt;" style="endArrow=open;endSize=12;dashed=1;html=1;rounded=0;" edge="1" parent="1" source="uc-monitor-agents" target="uc-manage-websocket">
          <mxGeometry width="160" relative="1" as="geometry">
            <mxPoint x="600" y="220" as="sourcePoint" />
            <mxPoint x="500" y="320" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        
        <mxCell id="include3" value="&amp;lt;&amp;lt;include&amp;gt;&amp;gt;" style="endArrow=open;endSize=12;dashed=1;html=1;rounded=0;" edge="1" parent="1" source="uc-send-message" target="uc-manage-websocket">
          <mxGeometry width="160" relative="1" as="geometry">
            <mxPoint x="650" y="220" as="sourcePoint" />
            <mxPoint x="520" y="320" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

## 3. Detailed Use Cases

### 3.1 Epic 1: Real-time Agent Status Monitoring

#### **UC-01: Login to System**
- **Primary Actor**: Agent, Supervisor
- **Goal**: เข้าสู่ระบบเพื่อใช้งาน application
- **Related User Stories**: US-006

**Main Success Scenario:**
1. ผู้ใช้เปิด desktop application
2. ระบบแสดงหน้า login
3. ผู้ใช้กรอก Agent Code
4. ระบบตรวจสอบ Agent Code กับฐานข้อมูล
5. ระบบสร้าง WebSocket connection
6. ระบบแสดงหน้าหลักพร้อมข้อมูล agent
7. ระบบอัปเดตสถานะเป็น "Connected"

**Extensions:**
- 4a. Agent Code ไม่ถูกต้อง:
  - 4a1. ระบบแสดงข้อความ "Agent not found"
  - 4a2. กลับไปขั้นตอนที่ 3
- 5a. WebSocket connection ล้มเหลว:
  - 5a1. ระบบแสดงข้อความเตือน
  - 5a2. พยายามเชื่อมต่อใหม่

**Preconditions**: 
- Agent มี valid Agent Code ในระบบ
- Network connection พร้อมใช้งาน

**Postconditions**:
- Agent อยู่ในสถานะ "Connected"
- WebSocket connection สร้างสำเร็จ

---

#### **UC-02: Manage Agent Status**
- **Primary Actor**: Agent
- **Goal**: เปลี่ยนสถานะการทำงานของตัวเอง
- **Related User Stories**: US-002

**Main Success Scenario:**
1. Agent เลือกสถานะใหม่จาก dropdown (Available, Active, Wrap, Not Ready)
2. ระบบส่งคำขอเปลี่ยนสถานะไปยัง API server
3. API server อัปเดตสถานะในฐานข้อมูล
4. API server ส่งข้อมูลอัปเดตผ่าน WebSocket
5. ระบบอัปเดต UI ของ agent
6. Supervisor dashboard อัปเดตสถานะแบบ real-time

**Extensions:**
- 2a. Network error:
  - 2a1. ระบบแสดงข้อความ "Failed to update status"
  - 2a2. เก็บ status ไว้ใน local cache
  - 2a3. retry เมื่อ connection กลับมา

**Preconditions**: 
- Agent ต้อง login แล้ว
- WebSocket connection active

**Postconditions**:
- Status ในฐานข้อมูลอัปเดต
- All connected supervisors เห็นสถานะใหม่

---

#### **UC-03: Monitor Agents Real-time**
- **Primary Actor**: Supervisor
- **Goal**: ติดตามสถานะของ agents ในทีมแบบ real-time
- **Related User Stories**: US-001, US-008

**Main Success Scenario:**
1. Supervisor เข้าสู่หน้า dashboard
2. ระบบดึงรายการ agents ทั้งหมดจาก API
3. ระบบแสดงรายการ agents พร้อมสถานะปัจจุบัน
4. ระบบแสดงสถิติโดยรวม (Available, Active, Wrap, Not Ready)
5. ระบบรับการอัปเดตผ่าน WebSocket
6. ระบบอัปเดต display แบบ real-time

**Alternative Flows:**
- 2a. API ไม่ตอบสนอง:
  - 2a1. ระบบแสดง cached data
  - 2a2. แสดงสถานะ "Data may not be current"

**Preconditions**: 
- Supervisor login แล้ว
- มี agents ในระบบ

**Postconditions**:
- Dashboard แสดงข้อมูล real-time
- สถิติอัปเดตตามสถานะ agents

---

### 3.2 Epic 2: Supervisor Communication System

#### **UC-04: Send Message to Agent**
- **Primary Actor**: Supervisor
- **Goal**: ส่งข้อความไปยัง agent ที่เฉพาะเจาะจง
- **Related User Stories**: US-004

**Main Success Scenario:**
1. Supervisor เลือก agent จากรายการ
2. Supervisor พิมพ์ข้อความในช่อง message
3. Supervisor กดปุ่ม "Send"
4. ระบบส่งข้อความผ่าน API
5. API server forward ข้อความผ่าน WebSocket ไปยัง agent
6. ระบบแสดงสถานะ "Message sent"
7. Agent ได้รับ notification

**Extensions:**
- 5a. Agent ไม่ online:
  - 5a1. ระบบแสดงข้อความ "Agent not available"
  - 5a2. เก็บข้อความไว้ใน queue (future enhancement)

**Preconditions**: 
- Supervisor login แล้ว
- Target agent ต้อง online

**Postconditions**:
- ข้อความส่งถึง agent สำเร็จ
- มี log การส่งข้อความ

---

#### **UC-05: Receive Notification**
- **Primary Actor**: Agent
- **Goal**: รับและแสดงการแจ้งเตือนจาก supervisor
- **Related User Stories**: US-005

**Main Success Scenario:**
1. Agent ได้รับข้อความผ่าน WebSocket
2. ระบบแสดง desktop notification
3. ระบบเล่นเสียงแจ้งเตือน
4. ระบบแสดง popup พร้อมข้อความ
5. Agent อ่านข้อความ
6. Agent กดปุ่ม "Close"
7. ระบบปิด notification

**Extensions:**
- 2a. Desktop notification ถูก disable:
  - 2a1. แสดงเฉพาะ popup ใน application

**Preconditions**: 
- Agent login และ online
- มี supervisor ส่งข้อความมา

**Postconditions**:
- Agent รับทราบข้อความแล้ว
- Notification history อัปเดต

---

### 3.3 Epic 3: Agent Self-Service Portal

#### **UC-06: View Team Dashboard**
- **Primary Actor**: Supervisor, Operations Manager
- **Goal**: ดูภาพรวมของทีมและสถิติต่างๆ
- **Related User Stories**: US-008, US-009

**Main Success Scenario:**
1. ผู้ใช้เข้าสู่หน้า dashboard
2. ระบบแสดงสถิติทีม (จำนวน agents แต่ละสถานะ)
3. ระบบแสดง charts และ graphs
4. ระบบแสดงเวลาปัจจุบันและ team summary
5. ระบบอัปเดตข้อมูลแบบ real-time
6. ผู้ใช้สามารถ drill-down ดูรายละเอียดได้

**Alternative Flows:**
- 2a. ไม่มีข้อมูล:
  - 2a1. แสดงค่าเริ่มต้น (0 for all metrics)

**Preconditions**: 
- ผู้ใช้ login แล้ว
- มีสิทธิ์เข้าถึง dashboard

**Postconditions**:
- Dashboard แสดงข้อมูลล่าสุด
- ข้อมูลอัปเดตแบบ real-time

---

### 3.4 Epic 4: Management Dashboard & Reporting

#### **UC-07: Track Agent Attendance**
- **Primary Actor**: Supervisor
- **Goal**: ติดตามการเข้า-ออกงานของ agents
- **Related User Stories**: US-003

**Main Success Scenario:**
1. ระบบบันทึก login time เมื่อ agent เข้าระบบ
2. ระบบบันทึก logout time เมื่อ agent ออกจากระบบ
3. Supervisor เข้าดู attendance report
4. ระบบแสดงรายการ agents พร้อม login/logout times
5. ระบบคำนวณชั่วโมงการทำงาน
6. ระบบแสดงสถิติการเข้างาน

**Extensions:**
- 2a. Agent ปิด application กะทันหัน:
  - 2a1. ระบบตรวจจับ connection lost
  - 2a2. บันทึก logout time เป็นเวลาที่ connection หลุด

**Preconditions**: 
- มีข้อมูล login/logout ของ agents
- Supervisor มีสิทธิ์ดู attendance

**Postconditions**:
- มีรายงานการเข้างานที่ถูกต้อง
- สถิติการทำงานอัปเดต

---

#### **UC-08: View Statistical Reports**
- **Primary Actor**: Operations Manager
- **Goal**: ดูรายงานสถิติเพื่อการตัดสินใจ
- **Related User Stories**: US-009

**Main Success Scenario:**
1. Manager เข้าสู่ reports section
2. Manager เลือกประเภทรายงาน (daily, weekly, monthly)
3. ระบบดึงข้อมูลจากฐานข้อมูล
4. ระบบประมวลผลและสร้าง charts
5. ระบบแสดงรายงานในรูปแบบ graphs และ tables
6. Manager สามารถ export รายงานได้

**Alternative Flows:**
- 3a. ไม่มีข้อมูลในช่วงเวลาที่เลือก:
  - 3a1. แสดงข้อความ "No data available for selected period"

**Preconditions**: 
- Manager login แล้ว
- มีข้อมูลประวัติการทำงานในระบบ

**Postconditions**:
- รายงานแสดงข้อมูลที่ถูกต้องและทันสมัย
- Manager ได้ข้อมูลสำหรับตัดสินใจ

---

### 3.5 Epic 5: System Administration & Configuration

#### **UC-09: Manage Database Configuration**
- **Primary Actor**: System Admin
- **Goal**: จัดการและกำหนดค่าฐานข้อมูล
- **Related User Stories**: US-010

**Main Success Scenario:**
1. Admin เข้าสู่ database management interface
2. Admin ตรวจสอบ database connection status
3. Admin กำหนดค่า connection parameters
4. ระบบทดสอบ database connection
5. ระบบบันทึก configuration
6. ระบบ restart database connections
7. ระบบยืนยันการตั้งค่าสำเร็จ

**Extensions:**
- 4a. Database connection ล้มเหลว:
  - 4a1. ระบบแสดง error message พร้อมรายละเอียด
  - 4a2. กลับไปขั้นตอนที่ 3 เพื่อแก้ไข parameters
- 6a. Restart ล้มเหลว:
  - 6a1. ระบบ rollback configuration เดิม
  - 6a2. แจ้งเตือน admin

**Preconditions**: 
- Admin มีสิทธิ์ระดับ administrator
- Database server พร้อมใช้งาน

**Postconditions**:
- Database configuration อัปเดต
- Application สามารถเชื่อมต่อฐานข้อมูลได้

---

#### **UC-10: Manage API Endpoints**
- **Primary Actor**: System Admin
- **Goal**: จัดการ API endpoints และ security
- **Related User Stories**: US-011

**Main Success Scenario:**
1. Admin เข้าสู่ API management console
2. Admin ตรวจสอบสถานะ API endpoints
3. Admin กำหนดค่า authentication tokens
4. Admin ทดสอบ API endpoints
5. ระบบแสดงผล response times และ availability
6. Admin กำหนดค่า rate limiting (ถ้าจำเป็น)
7. ระบบบันทึก configuration changes

**Extensions:**
- 4a. API endpoint ไม่ตอบสนอง:
  - 4a1. ระบบแสดง error details
  - 4a2. Admin ตรวจสอบ server status
  - 4a3. Restart API service หากจำเป็น
- 5a. Performance ต่ำกว่ามาตรฐาน:
  - 5a1. ระบบแจ้งเตือนและแนะนำการแก้ไข

**Preconditions**: 
- API server running
- Admin มี access credentials

**Postconditions**:
- API endpoints ทำงานปกติ
- Security configuration อัปเดต

---

#### **UC-11: Manage WebSocket Connections**
- **Primary Actor**: System Admin
- **Goal**: จัดการ WebSocket connections และ real-time communications
- **Related User Stories**: US-012

**Main Success Scenario:**
1. Admin เข้าสู่ WebSocket management dashboard
2. ระบบแสดงรายการ active connections
3. Admin ตรวจสอบ connection health
4. Admin ดู message throughput statistics
5. Admin จัดการ connection pools
6. ระบบแสดงข้อมูล performance metrics
7. Admin กำหนดค่า timeout และ retry parameters

**Extensions:**
- 3a. มี connections ที่ไม่ตอบสนอง:
  - 3a1. Admin เลือก terminate connection
  - 3a2. ระบบ cleanup resources
  - 3a3. แจ้งเตือน affected users
- 4a. Message throughput สูงผิดปกติ:
  - 4a1. ระบบแสดงการเตือน
  - 4a2. Admin สามารถ throttle connections ได้

**Preconditions**: 
- WebSocket server running
- มี active connections ในระบบ

**Postconditions**:
- WebSocket connections มีประสิทธิภาพดี
- Real-time communication เสถียร

---

#### **UC-12: Deploy Desktop Application**
- **Primary Actor**: System Admin
- **Goal**: สร้างและแจกจ่าย desktop application
- **Related User Stories**: US-013

**Main Success Scenario:**
1. Admin เตรียม source code สำหรับ build
2. Admin รัน build script สำหรับ Electron application
3. ระบบสร้าง executable files
4. Admin ทดสอบ application บน test machine
5. Admin สร้าง installer package
6. Admin ทดสอบ installation process
7. Admin อัปโหลด installer ไป distribution server
8. Admin แจ้งเตือน users เรื่อง update ใหม่

**Extensions:**
- 2a. Build ล้มเหลว:
  - 2a1. ระบบแสดง build errors
  - 2a2. Admin แก้ไข source code
  - 2a3. กลับไปขั้นตอนที่ 2
- 4a. Application ไม่สามารถรันได้:
  - 4a1. Admin ตรวจสอบ dependencies
  - 4a2. แก้ไขปัญหาและ rebuild

**Preconditions**: 
- Source code พร้อมและผ่าน testing
- Build environment ตั้งค่าเรียบร้อย

**Postconditions**:
- Desktop application พร้อม deploy
- Users สามารถ download และติดตั้งได้

---

#### **UC-13: Configure System Environment**
- **Primary Actor**: System Admin
- **Goal**: กำหนดค่าระบบสำหรับ environments ต่างๆ
- **Related User Stories**: US-014

**Main Success Scenario:**
1. Admin เข้าสู่ configuration management interface
2. Admin เลือก environment (development/production)
3. Admin กำหนดค่า database connection strings
4. Admin กำหนดค่า API URLs และ endpoints
5. Admin กำหนดค่า WebSocket server addresses
6. Admin กำหนดค่า SSL certificates
7. ระบบ validate configuration
8. ระบบบันทึกและ apply configuration

**Extensions:**
- 7a. Configuration validation ล้มเหลว:
  - 7a1. ระบบแสดง validation errors
  - 7a2. Admin แก้ไข configuration
  - 7a3. กลับไปขั้นตอนที่ 7
- 8a. Apply configuration ล้มเหลว:
  - 8a1. ระบบ rollback ไปยัง configuration เดิม
  - 8a2. แจ้งเตือน admin

**Preconditions**: 
- Admin มีสิทธิ์เปลี่ยน configuration
- Target environment พร้อมใช้งาน

**Postconditions**:
- System configuration อัปเดตตาม environment
- Application ทำงานด้วย configuration ใหม่

---

## 4. Use Case to User Story Mapping

### 4.1 Complete Mapping Table

| Use Case ID | Use Case Name | Related User Stories | Epic | Priority | Sprint |
|-------------|---------------|---------------------|------|----------|--------|
| **UC-01** | Login to System | US-006 (Agent Authentication) | Epic 3 | HIGH | Sprint 1 |
| **UC-02** | Manage Agent Status | US-002 (Status Updates) | Epic 1 | HIGH | Sprint 1 |
| **UC-03** | Monitor Agents Real-time | US-001 (Status Display)<br/>US-008 (Dashboard) | Epic 1, 4 | HIGH | Sprint 1, 2 |
| **UC-04** | Send Message to Agent | US-004 (Send Message) | Epic 2 | HIGH | Sprint 2 |
| **UC-05** | Receive Notification | US-005 (Receive Notification) | Epic 2 | HIGH | Sprint 2 |
| **UC-06** | View Team Dashboard | US-008 (Dashboard)<br/>US-007 (Agent Profile) | Epic 4, 3 | HIGH | Sprint 2 |
| **UC-07** | Track Agent Attendance | US-003 (Login Tracking) | Epic 1 | MEDIUM | Sprint 3 |
| **UC-08** | View Statistical Reports | US-009 (Real-time Stats) | Epic 4 | MEDIUM | Sprint 3 |
| **UC-09** | Manage Database Configuration | US-010 (Database Management) | Epic 5 | HIGH | Sprint 1 |
| **UC-10** | Manage API Endpoints | US-011 (API Management) | Epic 5 | HIGH | Sprint 1 |
| **UC-11** | Manage WebSocket Connections | US-012 (WebSocket Management) | Epic 5 | HIGH | Sprint 1 |
| **UC-12** | Deploy Desktop Application | US-013 (App Distribution) | Epic 5 | MEDIUM | Sprint 3 |
| **UC-13** | Configure System Environment | US-014 (Configuration) | Epic 5 | MEDIUM | Sprint 2 |

### 4.2 Epic to Use Case Distribution

#### **📊 Epic 1: Real-time Agent Status Monitoring (3 Use Cases)**
- UC-02: Manage Agent Status *(Core functionality)*
- UC-03: Monitor Agents Real-time *(Supervisor view)*  
- UC-07: Track Agent Attendance *(Historical data)*

#### **💬 Epic 2: Supervisor Communication System (2 Use Cases)**
- UC-04: Send Message to Agent *(Outbound communication)*
- UC-05: Receive Notification *(Inbound communication)*

#### **🎧 Epic 3: Agent Self-Service Portal (2 Use Cases)**
- UC-01: Login to System *(Authentication)*
- UC-06: View Team Dashboard *(Shared with Epic 4)*

#### **📈 Epic 4: Management Dashboard & Reporting (2 Use Cases)**
- UC-06: View Team Dashboard *(Shared with Epic 3)*
- UC-08: View Statistical Reports *(Advanced reporting)*

#### **⚙️ Epic 5: System Administration & Configuration (5 Use Cases)**
- UC-09: Manage Database Configuration *(Data tier)*
- UC-10: Manage API Endpoints *(Application tier)*
- UC-11: Manage WebSocket Connections *(Communication layer)*
- UC-12: Deploy Desktop Application *(Presentation tier)*
- UC-13: Configure System Environment *(Environment management)*

### 4.3 Actor to Use Case Matrix

| Actor | Primary Use Cases | Secondary Use Cases | Total |
|-------|------------------|-------------------|-------|
| **🎧 Agent** | UC-01, UC-02, UC-05 | - | 3 |
| **👨‍💼 Supervisor** | UC-03, UC-04, UC-06, UC-07 | UC-01 | 5 |
| **🏢 Operations Manager** | UC-06, UC-08 | - | 2 |
| **🔧 System Admin** | UC-09, UC-10, UC-11, UC-12, UC-13 | - | 5 |

### 4.4 Dependencies Between Use Cases

#### **Critical Path Dependencies**
```
UC-09 (Database) → UC-10 (API) → UC-11 (WebSocket) → UC-01 (Login) → UC-02 (Status)
                                                    ↓
                                                  UC-03 (Monitor)
                                                    ↓
                                                  UC-04 (Message) → UC-05 (Notification)
```

#### **Include Relationships**
- **UC-02** includes **UC-01** (ต้อง login ก่อนเปลี่ยนสถานะ)
- **UC-03** includes **UC-11** (ต้องมี WebSocket เพื่อ monitor real-time)
- **UC-04** includes **UC-11** (ต้องมี WebSocket เพื่อส่งข้อความ)

#### **Extend Relationships**
- **UC-07** extends **UC-01** (เพิ่ม attendance tracking เมื่อ login)
- **UC-08** extends **UC-06** (เพิ่ม advanced reports บน dashboard)

---

## 5. Implementation Guidelines

### 5.1 Use Case Implementation Priority

#### **🔴 Critical (Sprint 1)**
1. **UC-09, UC-10, UC-11**: Infrastructure foundation
2. **UC-01**: User authentication  
3. **UC-02, UC-03**: Core monitoring functionality

#### **🟡 Important (Sprint 2)**
4. **UC-04, UC-05**: Communication features
5. **UC-06**: Dashboard and reporting
6. **UC-13**: Environment configuration

#### **🟢 Enhancement (Sprint 3)**
7. **UC-07**: Attendance tracking
8. **UC-08**: Advanced reporting  
9. **UC-12**: Application distribution

### 5.2 Testing Strategy per Use Case

#### **Unit Testing Focus**
- **UC-01**: Authentication logic, validation
- **UC-02**: Status change logic, data validation
- **UC-04, UC-05**: Message routing, WebSocket handling

#### **Integration Testing Focus**
- **UC-03**: Real-time data flow end-to-end
- **UC-06**: Dashboard data aggregation
- **UC-11**: WebSocket connection management

#### **User Acceptance Testing Focus**
- **UC-02, UC-03**: Agent and Supervisor workflows
- **UC-04, UC-05**: Communication scenarios
- **UC-06, UC-08**: Dashboard and reporting usability

### 5.3 Documentation Requirements

#### **Technical Documentation**
- API specifications for UC-10
- Database schema for UC-09  
- WebSocket protocol for UC-11
- Deployment guide for UC-12

#### **User Documentation** 
- Agent user guide for UC-01, UC-02, UC-05
- Supervisor manual for UC-03, UC-04, UC-06, UC-07
- Administrator handbook for UC-09 through UC-13

---

## 6. Quality Assurance & Validation

### 6.1 Use Case Validation Criteria

| Use Case | Success Metrics | Performance Criteria | Security Requirements |
|----------|-----------------|---------------------|---------------------|
| **UC-01** | Login success rate > 95% | Authentication < 2s | Secure credential handling |
| **UC-02** | Status update success > 99% | Update propagation < 1s | User authorization check |
| **UC-03** | Data freshness < 5s | Dashboard load < 3s | Role-based access |
| **UC-04** | Message delivery > 98% | End-to-end latency < 2s | Message encryption |
| **UC-05** | Notification display 100% | Alert delay < 1s | User privacy protection |

### 6.2 Risk Mitigation per Use Case

#### **High-Risk Use Cases**
- **UC-11 (WebSocket)**: Connection stability, scalability
- **UC-10 (API)**: Security vulnerabilities, performance
- **UC-03 (Real-time)**: Data synchronization, browser compatibility

#### **Medium-Risk Use Cases**  
- **UC-04, UC-05**: Message delivery reliability
- **UC-09**: Database performance and backup
- **UC-12**: Cross-platform compatibility

---

## 📊 Summary

### **Total Use Cases**: 13
### **Total User Stories Covered**: 14 (100% coverage)
### **Primary Actors**: 4 (Agent, Supervisor, Manager, Admin)
### **Implementation Sprints**: 3 (spanning 7 weeks)

### **Key Success Factors**:
- ✅ **Complete traceability** between Use Cases และ User Stories
- ✅ **Clear actor responsibilities** และ system boundaries  
- ✅ **Detailed scenarios** สำหรับ development และ testing
- ✅ **Risk-based prioritization** สำหรับ implementation planning

---

*Use Case Analysis นี้ให้รายละเอียดที่ครบถ้วนสำหรับการ implement Agent Wallboard System ตาม Software Engineering principles และสอดคล้องกับ LAB requirements ที่กำหนดไว้*
