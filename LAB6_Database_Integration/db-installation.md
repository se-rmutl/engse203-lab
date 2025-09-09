# คู่มือติดตั้ง Database สำหรับ Database Integration

## 📑 สารบัญ
- [🍃 ส่วนที่ 1: MongoDB และ MongoDB Compass](#-ส่วนที่-1-mongodb-และ-mongodb-compass)
  - [1.1 Windows Installation](#11-windows-installation)
  - [1.2 Mac Installation](#12-mac-installation)
  - [1.3 MongoDB สำหรับ Ubuntu on WSL2 Installation](#13-mongodb-สำหรับ-ubuntu-on-wsl2-installation)
- [🗄️ ส่วนที่ 2: MS SQL Server](#-ส่วนที่-2-ms-sql-server)
  - [2.1 MS SQL Server Express for Windows](#21-ms-sql-server-express-for-windows)
  - [2.2 MS SQL Server for Ubuntu 2404 Linux](#22-ms-sql-server-for-ubuntu-2404-linux)
- [🧪 การทดสอบความพร้อม](#-การทดสอบความพร้อม)
- [❗ Troubleshooting](#-troubleshooting)
- [✅ Checklist ก่อนทำ Pre-Lab6](#-checklist-ก่อนทำ-pre-lab6)


## 📋 รายการ Software ที่ต้องติดตั้ง

- **MongoDB Community Edition** - NoSQL Document Database
- **MongoDB Compass** - GUI Tool สำหรับจัดการ MongoDB
- **MS SQL Server Express** - Relational Database (Windows)
- **MS SQL Server** - Relational Database (Linux)
- **SQL Server Management Studio (SSMS)** - GUI Tool สำหรับจัดการ MS SQL Server

---

## 🍃 ส่วนที่ 1: MongoDB และ MongoDB Compass

### 1.1 Windows Installation

#### Step 1: ติดตั้ง MongoDB Community Edition

**📥 Download MongoDB**
1. ไปที่ https://www.mongodb.com/try/download/community
2. เลือก:
   - **Version:** Latest (8.0.x)
   - **Platform:** Windows
   - **Package:** msi
3. คลิก **Download**

**⚙️ การติดตั้ง**
1. **เรียกใช้ไฟล์** `mongodb-windows-x86_64-8.0.x.msi`
2. **Welcome Screen:** คลิก `Next`
3. **License Agreement:** เลือก `I accept` และคลิก `Next`
4. **Choose Setup Type:** เลือก `Complete`
5. **Service Configuration:**
   - ✅ เลือก `Install MongoDB as a Service`
   - **Service Name:** `MongoDB`
   - **Data Directory:** `C:\Program Files\MongoDB\Server\8.0\data\`
   - **Log Directory:** `C:\Program Files\MongoDB\Server\8.0\log\`
   - ✅ เลือก `Run service as Network Service user`
6. **Install MongoDB Compass:** ✅ เลือก `Install MongoDB Compass`
7. คลิก `Install`
8. รอการติดตั้งเสร็จสิ้น และคลิก `Finish`

**🔧 ตรวจสอบการติดตั้ง**
```cmd
# เปิด Command Prompt แบบ Administrator
# ตรวจสอบ MongoDB service
sc query MongoDB

# ทดสอบการเชื่อมต่อ
mongo --version

# หรือใช้คำสั่งใหม่
mongosh --version
```

**🚀 เริ่มใช้งาน MongoDB**
```cmd
# เชื่อมต่อกับ MongoDB
mongosh

# ทดสอบคำสั่งพื้นฐาน
> show dbs
> use testdb
> db.test.insertOne({message: "Hello MongoDB"})
> db.test.find()
> exit
```

#### Step 2: ติดตั้ง MongoDB Compass (ถ้ายังไม่ได้ติดตั้ง)

1. ไปที่ https://www.mongodb.com/try/download/compass
2. เลือก **Windows 64-bit (10+)**
3. Download และติดตั้ง
4. เปิด MongoDB Compass
5. เชื่อมต่อด้วย connection string: `mongodb://localhost:27017`

#### Step 3: ถ้าต้องการเข้าถึง MongoDB ได้จากเครื่องอื่น ให้ตั้งค่าตามนี้

**1. แก้ไขการตั้งค่า** `mongod.cfg`

ไฟล์ปกติจะอยู่ที่

```
C:\Program Files\MongoDB\Server\8.0\bin\mongod.cfg
```

หาบรรทัดนี้:

```yaml
net:
  bindIp: 127.0.0.1
  port: 27017
```

**แก้เป็น**

```yaml
net:
  bindIp: 0.0.0.0
  port: 27017
```

* `127.0.0.1` = รับแค่ localhost
* `0.0.0.0` = รับทุก network interface (เช่น จาก WSL, เครื่องอื่นใน LAN)
* ถ้าต้องการกำหนดเฉพาะ IP ก็ใส่แบบนี้ เช่น

  ```yaml
  bindIp: 127.0.0.1,192.168.1.100
  ```
** 192.168.1.100 เป็น IP ตัวอย่างเท่านั้น ***

---

**2. Restart MongoDB Service**

เปิด PowerShell (Run as Administrator):

```powershell
net stop MongoDB
net start MongoDB
```

หรือใช้ Services.msc แล้ว restart service `MongoDB`.

---

 **3. ตั้งค่า Firewall (Windows Defender)**

ให้เปิดพอร์ต `27017` (หรือพอร์ตที่คุณใช้)

```powershell
New-NetFirewallRule -DisplayName "MongoDB" -Direction Inbound -Protocol TCP -LocalPort 27017 -Action Allow
```

---

**4. ตรวจสอบการเชื่อมต่อจาก WSL**

ใน WSL (Linux terminal):

```bash
mongo "mongodb://<windows-ip>:27017"
```

* `<windows-ip>` = IP ของ Windows host (ดูได้จาก `ipconfig` → ค่า `IPv4 Address`)
* ถ้าเป็น Node.js ใช้ connection string เช่น:

```javascript
const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://192.168.1.100:27017/mydb");

async function run() {
  await client.connect();
  console.log("Connected to MongoDB!");
}
run();
```

---

**5. (แนะนำ) เปิด Authentication**

ถ้าเปิด remote access แล้ว **ไม่ควรปล่อยให้ connect ได้โดยไม่มี user/pass**
ให้แก้ `mongod.cfg` เพิ่ม:

```yaml
security:
  authorization: enabled
```

แล้วสร้าง user ด้วย:

```bash
use admin
db.createUser({
  user: "myuser",
  pwd: "mypassword",
  roles: [ { role: "root", db: "admin" } ]
})
```

จากนั้น connect แบบ:

```
mongodb://myuser:mypassword@192.168.1.100:27017/mydb
```
** 192.168.1.100 เป็น IP ตัวอย่างเท่านั้น ***

---

### 1.2 Mac Installation

#### Step 1: ติดตั้ง MongoDB ด้วย Homebrew

**📦 ติดตั้ง Homebrew (ถ้ายังไม่มี)**
```bash
# ติดตั้ง Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**🍃 ติดตั้ง MongoDB**
```bash
# เพิ่ม MongoDB tap
brew tap mongodb/brew

# ทำการ update brew
brew update

# ติดตั้ง MongoDB Community Edition
brew install mongodb-community@8.0


# ติดตั้ง MongoDB Database Tools
brew install mongodb-database-tools
```

**🔧 ตั้งค่าและเริ่มใช้งาน**
```bash
# สร้างโฟลเดอร์สำหรับข้อมูล
sudo mkdir -p /usr/local/var/mongodb
sudo mkdir -p /usr/local/var/log/mongodb

# กำหนดสิทธิ์
sudo chown `id -un` /usr/local/var/mongodb
sudo chown `id -un` /usr/local/var/log/mongodb

# เริ่ม MongoDB service
brew services start mongodb/brew/mongodb-community@8.0

# ตรวจสอบสถานะ
brew services list | grep mongodb

#  หรือต้องการจะ stop MongoDB service
brew services stop mongodb/brew/mongodb-community@8.0

# ทดสอบการเชื่อมต่อ
mongosh

# ทดสอบคำสั่งพื้นฐาน
> show dbs
> use testdb
> db.test.insertOne({message: "Hello MongoDB on Mac"})
> db.test.find()
> exit
```

#### Step 2: ติดตั้ง MongoDB Compass


**📥 Download และติดตั้ง**
```bash
# วิธีที่ 1: ใช้ Homebrew
brew install --cask mongodb-compass

# วิธีที่ 2: Download manual
# ไปที่ https://www.mongodb.com/try/download/compass
# เลือก macOS 64-bit (10.14+)
# Download .dmg file และติดตั้ง
```

**🚀 เปิดใช้งาน**
1. เปิด MongoDB Compass จาก Applications
2. เชื่อมต่อด้วย: `mongodb://localhost:27017`
3. คลิก **Connect**

####  **หรือ กรณีต้องการ MongoDB Compass Download แบบ (GUI)**

```
https://downloads.mongodb.com/compass/mongodb-compass-1.46.9-darwin-arm64.dmg
```


---

### 1.3 MongoDB สำหรับ Ubuntu on WSL2 Installation

#### Prerequisites: ตั้งค่า WSL2

```bash
# ตรวจสอบเวอร์ชัน Ubuntu
lsb_release -a

# อัพเดท system
sudo apt update && sudo apt upgrade -y
```

#### Step 1: ติดตั้ง MongoDB

**📦 เพิ่ม MongoDB repository**
```bash
# Import MongoDB public GPG Key
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
   --dearmor

# เพิ่ม MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

# อัพเดท package list
sudo apt update
```

**⚙️ ติดตั้ง MongoDB**
```bash
# ติดตั้ง MongoDB packages
sudo apt install -y mongodb-org

# ตรวจสอบเวอร์ชัน
mongod --version
mongosh --version
```

**🔧 ตั้งค่าและเริ่มใช้งาน**
```bash
# สร้างโฟลเดอร์สำหรับข้อมูล
sudo mkdir -p /data/db

# กำหนดสิทธิ์
sudo chown -R $USER:$USER /data/db

# เริ่ม MongoDB service
sudo systemctl start mongod

# ตั้งค่าให้เริ่มอัตโนมัติ
sudo systemctl enable mongod

# ตรวจสอบสถานะ
sudo systemctl status mongod

# ทดสอบการเชื่อมต่อ
mongosh

# ทดสอบคำสั่ง
> show dbs
> use testdb
> db.test.insertOne({message: "Hello MongoDB on WSL2"})
> db.test.find()
> exit
```

#### Step 2: เข้าถึง MongoDB จาก Windows

**🌐 กำหนด IP Address**
```bash
# หา IP address ของ WSL2
ip addr show eth0

# หรือ
hostname -I
```

**🔧 แก้ไข MongoDB configuration**
```bash
# แก้ไขไฟล์ config
sudo nano /etc/mongod.conf

# หา section net: และแก้ไข
net:
  port: 27017
  bindIp: 0.0.0.0  # เปลี่ยนจาก 127.0.0.1 เป็น 0.0.0.0

# รีสตาร์ท MongoDB
sudo systemctl restart mongod
```

**🖥️ เชื่อมต่อจาก Windows**
- เปิด MongoDB Compass บน Windows
- ใช้ connection string: `mongodb://<WSL2_IP_ADDRESS>:27017`
- เช่น: `mongodb://172.20.10.5:27017`

---

## 🗄️ ส่วนที่ 2: MS SQL Server

### 2.1 MS SQL Server Express for Windows

#### Step 1: Download SQL Server Express

**📥 Download**
1. ไปที่ https://www.microsoft.com/en-us/sql-server/sql-server-downloads
2. ในส่วน **SQL Server Express** คลิก **Download now**
3. Download ไฟล์ `SQL2022-SSEI-Expr.exe`

#### Step 2: ติดตั้ง SQL Server Express

**⚙️ การติดตั้ง**
1. **เรียกใช้** `SQL2022-SSEI-Expr.exe` แบบ **Run as Administrator**
2. **Installation Type:** เลือก `Custom`
3. **Download Location:** เลือกโฟลเดอร์สำหรับ download
4. คลิก **Install** และรอการ download
5. เมื่อ download เสร็จ จะเปิด **SQL Server Installation Center**

**🔧 SQL Server Installation Center**
1. **Installation:** คลิก `New SQL Server stand-alone installation`
2. **License Terms:** ยอมรับ license และคลิก `Next`
3. **Microsoft Update:** เลือกตามต้องการ และคลิก `Next`
4. **Feature Selection:**
   - ✅ **Database Engine Services**
   - ✅ **SQL Server Replication** (optional)
   - คลิก `Next`
5. **Instance Configuration:**
   - ✅ เลือก **Named instance**
   - **Instance name:** `SQLEXPRESS`
   - คลิก `Next`
6. **Server Configuration:**
   - **SQL Server Database Engine:** `Automatic`
   - **SQL Server Browser:** `Automatic`
   - คลิก `Next`
7. **Database Engine Configuration:**
   - **Authentication Mode:** เลือก `Mixed Mode`
   - **Password:** ใส่รหัสผ่านสำหรับ `sa` account (จำให้ดี!)
   - **SQL Server Administrators:** คลิก `Add Current User`
   - คลิก `Next`
8. **Ready to Install:** คลิก `Install`
9. รอการติดตั้งเสร็จสิ้น

#### Step 3: ติดตั้ง SQL Server Management Studio (SSMS)

**📥 Download SSMS**
1. ไปที่ https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms
2. คลิก **Download SQL Server Management Studio (SSMS)**
3. Download ไฟล์ `SSMS-Setup-ENU.exe`

**⚙️ ติดตั้ง SSMS**
1. เรียกใช้ `SSMS-Setup-ENU.exe` แบบ **Run as Administrator**
2. คลิก **Install**
3. รอการติดตั้งเสร็จสิ้น (อาจใช้เวลานาน)
4. **Restart** คอมพิวเตอร์

#### Step 4: ทดสอบการเชื่อมต่อ

**🔌 เชื่อมต่อด้วย SSMS**
1. เปิด **SQL Server Management Studio**
2. **Connect to Server:**
   - **Server type:** Database Engine
   - **Server name:** `localhost\SQLEXPRESS` หรือ `.\SQLEXPRESS`
   - **Authentication:** SQL Server Authentication
   - **Login:** `sa`
   - **Password:** รหัสผ่านที่ตั้งไว้
3. คลิก **Connect**

**🧪 ทดสอบคำสั่ง SQL**
```sql
-- สร้างฐานข้อมูลทดสอบ
CREATE DATABASE TestDB;

-- ใช้งานฐานข้อมูล
USE TestDB;

-- สร้างตารางทดสอบ
CREATE TABLE TestTable (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(50),
    created_date DATETIME DEFAULT GETDATE()
);

-- เพิ่มข้อมูลทดสอบ
INSERT INTO TestTable (name) VALUES ('Test User 1');
INSERT INTO TestTable (name) VALUES ('Test User 2');

-- ดึงข้อมูล
SELECT * FROM TestTable;
```

---

### 2.2 MS SQL Server for Ubuntu 24.04 Linux

#### Step 1: เพิ่ม Microsoft Repository

**🔑 Import Microsoft GPG Key**
```bash
# Download และ import GPG key
curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor -o /usr/share/keyrings/microsoft-prod.gpg
```

**📦 เพิ่ม Repository**
```bash
# เพิ่ม Microsoft repository
sudo curl -fsSL https://packages.microsoft.com/config/ubuntu/24.04/mssql-server-2022.list -o /etc/apt/sources.list.d/mssql-server-2022.list

# อัพเดท package list
sudo apt update
```

#### Step 2: ติดตั้ง SQL Server

**⚙️ ติดตั้ง**
```bash
# ติดตั้ง SQL Server
sudo apt install -y mssql-server

# รัน setup script
sudo /opt/mssql/bin/mssql-conf setup
```

**🔧 การตั้งค่า Setup**
1. **Edition Selection:** เลือก `2` (Express - free)
2. **License Terms:** พิมพ์ `Yes`
3. **SA Password:** ใส่รหัสผ่านที่แข็งแรง (ต้องมีอย่างน้อย 8 ตัวอักษร, ตัวพิมพ์ใหญ่, ตัวพิมพ์เล็ก, ตัวเลข, และอักขระพิเศษ)
4. **Confirm Password:** ยืนยันรหัสผ่าน

**✅ ตรวจสอบสถานะ**
```bash
# ตรวจสอบสถานะ SQL Server
sudo systemctl status mssql-server

# ตั้งค่าให้เริ่มอัตโนมัติ
sudo systemctl enable mssql-server
```

#### Step 3: ติดตั้ง SQL Server Command Line Tools

**📦 เพิ่ม Tools Repository**
```bash
# เพิ่ม repository สำหรับ tools
sudo curl -fsSL https://packages.microsoft.com/config/ubuntu/24.04/prod.list -o /etc/apt/sources.list.d/mssql-release.list

# อัพเดท package list
sudo apt update
```

**⚙️ ติดตั้ง Tools**
```bash
# ติดตั้ง mssql-tools และ unixodbc-dev
sudo ACCEPT_EULA=Y apt install -y mssql-tools18 unixodbc-dev

# เพิ่ม tools ใน PATH
echo 'export PATH="$PATH:/opt/mssql-tools18/bin"' >> ~/.bashrc
source ~/.bashrc
```

#### Step 4: ทดสอบการเชื่อมต่อ

**🔌 เชื่อมต่อด้วย sqlcmd**
```bash
# เชื่อมต่อกับ SQL Server
sqlcmd -S localhost -U sa -P 'YourStrongPassword' -C

# หรือใช้คำสั่งแบบ interactive
sqlcmd -S localhost -U sa -C
# จะถาม password
```

**🧪 ทดสอบคำสั่ง SQL**
```sql
-- สร้างฐานข้อมูลทดสอบ
1> CREATE DATABASE TestDB;
2> GO

-- ใช้งานฐานข้อมูล
1> USE TestDB;
2> GO

-- สร้างตารางทดสอบ
1> CREATE TABLE TestTable (
2>     id INT IDENTITY(1,1) PRIMARY KEY,
3>     name NVARCHAR(50),
4>     created_date DATETIME DEFAULT GETDATE()
5> );
6> GO

-- เพิ่มข้อมูลทดสอบ
1> INSERT INTO TestTable (name) VALUES ('Linux User 1');
2> GO
1> INSERT INTO TestTable (name) VALUES ('Linux User 2');
2> GO

-- ดึงข้อมูล
1> SELECT * FROM TestTable;
2> GO

-- ออกจากโปรแกรม
1> EXIT
```

#### Step 5: กำหนดค่าสำหรับเชื่อมต่อจากภายนอก (Optional)

**🌐 เปิดใช้งาน TCP/IP**
```bash
# แก้ไขการตั้งค่า
sudo /opt/mssql/bin/mssql-conf set network.tcpport 1433
sudo /opt/mssql/bin/mssql-conf set network.ipaddress 0.0.0.0

# รีสตาร์ท SQL Server
sudo systemctl restart mssql-server
```

**🔥 เปิด Firewall Port (ถ้าจำเป็น)**
```bash
# เปิด port 1433
sudo ufw allow 1433/tcp

# ตรวจสอบ firewall status
sudo ufw status
```

---

## 🧪 การทดสอบความพร้อม

### ตรวจสอบ MongoDB

**Windows/Mac:**
```bash
# เชื่อมต่อ MongoDB
mongosh

# ทดสอบคำสั่งพื้นฐาน
> db.version()
> show dbs
> use prelab6test
> db.testCollection.insertOne({test: "MongoDB Ready"})
> db.testCollection.find()
> exit
```

**MongoDB Compass:**
1. เปิด MongoDB Compass
2. เชื่อมต่อ: `mongodb://localhost:27017`
3. สร้าง Database: `prelab6test`
4. สร้าง Collection: `testCollection`
5. Insert Document: `{test: "Compass Ready"}`

### ตรวจสอบ MS SQL Server

**Windows (SSMS):**
```sql
-- เชื่อมต่อด้วย SSMS
-- Server: localhost\SQLEXPRESS
-- Auth: SQL Server Authentication
-- User: sa
-- Password: [your password]

-- ทดสอบคำสั่ง
SELECT @@VERSION;
SELECT GETDATE();

-- สร้าง test database
CREATE DATABASE PreLab6Test;
USE PreLab6Test;

-- สร้าง test table
CREATE TABLE TestConnection (
    id INT IDENTITY(1,1) PRIMARY KEY,
    message NVARCHAR(100),
    created_at DATETIME DEFAULT GETDATE()
);

-- Insert test data
INSERT INTO TestConnection (message) VALUES ('SQL Server Ready');

-- Select test data
SELECT * FROM TestConnection;
```

**Ubuntu (sqlcmd):**
```bash
# เชื่อมต่อ
sqlcmd -S localhost -U sa -C

# ใน sqlcmd
1> SELECT @@VERSION;
2> GO

1> SELECT GETDATE();
2> GO

1> CREATE DATABASE PreLab6Test;
2> GO

1> USE PreLab6Test;
2> GO

1> CREATE TABLE TestConnection (
2>     id INT IDENTITY(1,1) PRIMARY KEY,
3>     message NVARCHAR(100),
4>     created_at DATETIME DEFAULT GETDATE()
5> );
6> GO

1> INSERT INTO TestConnection (message) VALUES ('SQL Server on Linux Ready');
2> GO

1> SELECT * FROM TestConnection;
2> GO

1> EXIT
```

---

## ❗ Troubleshooting

### MongoDB Issues

**ปัญหา: MongoDB service ไม่เริ่ม**
```bash
# Windows
net start MongoDB

# Mac
brew services restart mongodb/brew/mongodb-community

# Ubuntu/WSL2
sudo systemctl restart mongod
```

**ปัญหา: Permission denied**
```bash
# Mac/Linux - แก้ไขสิทธิ์
sudo chown -R $USER:$USER /usr/local/var/mongodb
sudo chown -R $USER:$USER /data/db
```

### MS SQL Server Issues

**ปัญหา: Cannot connect to server**
```bash
# ตรวจสอบ service
# Windows
services.msc → SQL Server (SQLEXPRESS)

# Linux
sudo systemctl status mssql-server
sudo systemctl restart mssql-server
```

**ปัญหา: Login failed for user 'sa'**
1. ตรวจสอบรหัสผ่านที่ใช้
2. ตรวจสอบว่าเปิดใช้งาน Mixed Mode Authentication
3. ตรวจสอบว่า sa account ไม่ถูก disable

**ปัญหา: Network-related error**
```sql
-- เปิดใช้งาน TCP/IP
-- Windows: SQL Server Configuration Manager
-- Linux: 
sudo /opt/mssql/bin/mssql-conf set network.tcpport 1433
sudo systemctl restart mssql-server
```

---

## ✅ Checklist ก่อนทำ Pre-Lab6

### MongoDB
- [ ] MongoDB Community Edition ติดตั้งเรียบร้อย
- [ ] MongoDB service กำลังรันอยู่
- [ ] สามารถเชื่อมต่อด้วย `mongosh` ได้
- [ ] MongoDB Compass ติดตั้งและเชื่อมต่อได้
- [ ] สามารถสร้าง database และ collection ได้

### MS SQL Server
- [ ] SQL Server Express/Linux ติดตั้งเรียบร้อย
- [ ] SQL Server service กำลังรันอยู่
- [ ] สามารถเชื่อมต่อด้วย sa account ได้
- [ ] SSMS หรือ sqlcmd ใช้งานได้
- [ ] สามารถสร้าง database และ table ได้

### การเชื่อมต่อ
- [ ] MongoDB: `mongodb://localhost:27017`
- [ ] MS SQL Server: `localhost\SQLEXPRESS` (Windows) หรือ `localhost` (Linux)
- [ ] Port 27017 (MongoDB) และ 1433 (SQL Server) เปิดใช้งาน

### Connection Strings สำหรับ Node.js
```javascript
// MongoDB
MONGODB_URI=mongodb://localhost:27017/prelab6db

// MS SQL Server (Windows)
MSSQL_SERVER=localhost\\SQLEXPRESS
MSSQL_USER=sa
MSSQL_PASSWORD=YourPassword
MSSQL_DATABASE=PreLab6DB

// MS SQL Server (Linux)  
MSSQL_SERVER=localhost
MSSQL_USER=sa
MSSQL_PASSWORD=YourPassword
MSSQL_DATABASE=PreLab6DB
```

---

## 🎉 พร้อมแล้ว!

เมื่อทำตาม checklist ครบแล้ว คุณพร้อมที่จะเริ่มทำ **Pre-Lab6: เรียนรู้ Node.js กับ Database** แล้ว!

หากพบปัญหาใดๆ สามารถ:
- ตรวจสอบ log files ของแต่ละ service
- ค้นหาข้อมูลเพิ่มเติมจาก official documentation
- สอบถามอาจารย์หรือเพื่อนร่วมชั้นเรียน

**Good luck! 🚀**