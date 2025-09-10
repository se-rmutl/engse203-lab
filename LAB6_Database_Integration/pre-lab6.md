# Pre-Lab6: เรียนรู้ Node.js กับ Database (MSSQL & MongoDB)

## 🎯 จุดประสงค์และเป้าหมาย

### จุดประสงค์
ให้นักศึกษาเรียนรู้การเขียนโปรแกรม Node.js เพื่อติดต่อกับฐานข้อมูล MS SQL Server และ MongoDB แบบเบื้องต้น

### เป้าหมาย
- ✅ เข้าใจคำสั่ง SQL และ MongoDB commands พื้นฐาน
- ✅ สร้าง Connection ติดต่อฐานข้อมูลทั้งสองแบบ
- ✅ เขียน CRUD operations ผ่าน API endpoints
- ✅ ทดสอบการทำงานด้วย Postman
- ✅ เวลาทำงานไม่เกิน 1 ชั่วโมง
---

### ตารางเทียบคุณสมบัติ Database Selection Criteria

| **Criteria**           | **MSSQL**   | **MongoDB** | **Winner**  |
| ---------------------- | ----------- | ----------- | ----------- |
| **ACID Transactions**  | ✅ Strong    | ⚠️ Limited  | **MSSQL**   |
| **Flexible Schema**    | ❌ Rigid     | ✅ Dynamic   | **MongoDB** |
| **Complex Joins**      | ✅ Excellent | ❌ Limited   | **MSSQL**   |
| **Real-time Inserts**  | ⚠️ Good     | ✅ Excellent | **MongoDB** |
| **Horizontal Scaling** | ❌ Difficult | ✅ Easy      | **MongoDB** |
| **Data Consistency**   | ✅ Strong    | ⚠️ Eventual | **MSSQL**   |

---

## 🔹 ACID ย่อมาจากอะไร?

1. **A – Atomicity (อะตอมมิก)**

   * การทำงานของ Transaction ต้อง **สำเร็จทั้งหมด หรือไม่สำเร็จเลย**
   * ถ้ามีขั้นตอนใดล้มเหลว ระบบต้อง Rollback กลับไปยังสภาพก่อนเริ่ม transaction
     ✅ ตัวอย่าง: โอนเงิน → หักบัญชี A และเพิ่มบัญชี B ต้องทำครบทั้งสอง ไม่งั้นยกเลิกทั้งหมด

2. **C – Consistency (ความถูกต้องของข้อมูล)**

   * หลังจาก Transaction เสร็จสิ้น ข้อมูลต้องอยู่ใน **สภาวะที่ถูกต้องตามกฎของฐานข้อมูล**
   * เช่น ข้อกำหนด Primary Key, Foreign Key, Constraints ต้องไม่ถูกละเมิด

3. **I – Isolation (ความเป็นอิสระ)**

   * Transaction แต่ละตัวต้องทำงานแยกกัน
   * ผลลัพธ์ของ Transaction ที่ยังไม่เสร็จ **ไม่ควรถูกมองเห็นโดย Transaction อื่น**
   * SQL Server มี **Isolation Levels** เช่น Read Uncommitted, Read Committed, Repeatable Read, Serializable

4. **D – Durability (ความทนทาน)**

   * เมื่อ Transaction เสร็จสมบูรณ์ (Commit แล้ว) ข้อมูลต้องถูกบันทึกอย่างถาวร
   * แม้ระบบ crash หรือไฟดับ ข้อมูลก็ยังไม่หาย เพราะ DBMS เขียน log ไว้

---

## 🔹 MongoDB เป็น ACID หรือไม่?

* **MongoDB 4.0+** → รองรับ **ACID transactions แบบ multi-document** แล้ว
* **ก่อนหน้านั้น** → MongoDB เป็น **ACID** เฉพาะในระดับ *single document* เท่านั้น

---

## 🔹 รายละเอียด

**ตั้งแต่ MongoDB 4.0 ขึ้นไป**

* เพิ่ม **Multi-Document Transactions** → ทำงานเหมือน RDBMS (เช่น MSSQL, MySQL)
* สนับสนุน **ACID ครบทั้ง 4 ข้อ (Atomicity, Consistency, Isolation, Durability)**
* ใช้ได้ทั้งใน **Replica Sets (4.0)** และ **Sharded Clusters (4.2+)**

---

## 🔹 เปรียบเทียบสั้น ๆ

| คุณสมบัติ       | MongoDB ≤ 3.x                    | MongoDB ≥ 4.0         |
| --------------- | -------------------------------- | --------------------- |
| **Atomicity**   | ต่อ 1 document เท่านั้น          | Multi-document        |
| **Consistency** | Eventual (ขึ้นกับ write concern) | Strong (configurable) |
| **Isolation**   | Partial (บางกรณีเห็นค่าไม่เสร็จ) | Full isolation        |
| **Durability**  | ✅ ผ่าน Write-Ahead Log           | ✅ ผ่าน Journal        |
| **สรุป**        | ไม่ใช่ ACID เต็มรูปแบบ           | ✅ ACID-compliant      |

---


## 📚 การเชื่อมต่อ MSSQL Server ด้วย VS Code + Extension

#### 🔹 1. ติดตั้ง VS Code + Extension

1. ติดตั้ง **Visual Studio Code**
2. ไปที่ **Extensions** (Ctrl+Shift+X)
   ค้นหาและติดตั้ง

   * `SQL Server (mssql)` (โดย Microsoft)

---

#### 🔹 2. ตั้งค่า Connection ใน VS Code

1. เปิด **Command Palette** (Ctrl+Shift+P)
2. พิมพ์ **MS SQL: Connect**
3. กรอกค่าตามนี้:

   * **Server name**: `localhost` หรือ `localhost,1433` (ถ้า port 1433)
   * **Authentication Type**:

     * Windows Authentication (ใช้ user Windows)
     * SQL Login (เช่น `team4`)
   * **User name**: `team4`
   * **Password**: `StrongP@ssword123`
   * **Database**: `YourDatabase` (หรือเว้นว่าง = master)

---

#### 🔹 3. ทดลอง Query

1. สร้างไฟล์ใหม่ใน VS Code → ตั้งนามสกุล `.sql`
2. เขียน query เช่น

   ```sql
   SELECT SUSER_NAME() AS LoginName, DB_NAME() AS CurrentDB;
   ```
3. กด **Ctrl+Shift+E** → รัน query

---

## 📚 ส่วนที่ 1: ทำความเข้าใจ Database Commands

### 🔹MSSQL Commands พื้นฐาน

#### การสร้างตารางและ CRUD Operations

```sql
-- 1. สร้างฐานข้อมูล โดยกำหนดชื่อเป็นรหัสนักศึกษา (ไม่รวมขีด)
CREATE DATABASE se_รหัสนักศึกษาDB; --เช่น se_67123456789DB

-- ทำการระบุใช้งาน Database ที่สร้างขึ้น
USE se_67123456789DB;

-- 2. สร้างตาราง Students
CREATE TABLE Students (
    id INT IDENTITY(1,1) PRIMARY KEY,
    firstName NVARCHAR(50) NOT NULL,
    lastName NVARCHAR(50) NOT NULL,
    email NVARCHAR(100) UNIQUE,
    age INT,
    major NVARCHAR(100),
    createdAt DATETIME2 DEFAULT GETDATE()
);

-- 3. INSERT - เพิ่มข้อมูล
INSERT INTO Students (firstName, lastName, email, age, major)
VALUES ('สมชาย', 'ใจดี', 'somchai@email.com', 20, 'Computer Science');

INSERT INTO Students (firstName, lastName, email, age, major)
VALUES ('สมหญิง', 'รักเรียน', 'somying@email.com', 19, 'Software Engineering');

-- 4. SELECT - ดึงข้อมูล
SELECT * FROM Students;                    -- ทั้งหมด
SELECT * FROM Students WHERE age > 19;     -- ตามเงื่อนไข
SELECT firstName, lastName FROM Students;  -- เฉพาะ column

-- 5. UPDATE - แก้ไขข้อมูล
UPDATE Students 
SET age = 21, major = 'Data Science'
WHERE id = 1;

-- 6. DELETE - ลบข้อมูล
DELETE FROM Students WHERE id = 2;

-- 7. การ Query ขั้นสูง
SELECT major, COUNT(*) as studentCount 
FROM Students 
GROUP BY major;

SELECT * FROM Students 
ORDER BY age DESC;
```

### 🔹 MongoDB Commands พื้นฐาน

#### การสร้าง Collection และ CRUD Operations

```javascript
// 1. สร้าง Database และ Collection (อัตโนมัติเมื่อ insert document แรก)
use('ProductDB');

// 2. INSERT - เพิ่มข้อมูล (Create)
db.products.insertOne({
    name: "iPhone 15",
    price: 35000,
    category: "Electronics",
    inStock: true,
    quantity: 10,
    createdAt: new Date()
});

db.products.insertMany([
    {
        name: "MacBook Pro",
        price: 65000,
        category: "Electronics", 
        inStock: true,
        quantity: 5,
        createdAt: new Date()
    },
    {
        name: "Nike Air Force",
        price: 3500,
        category: "Shoes",
        inStock: false,
        quantity: 0,
        createdAt: new Date()
    }
]);

// 3. FIND - ดึงข้อมูล (Read)
db.products.find();                          // ทั้งหมด
db.products.find({category: "Electronics"}); // ตามเงื่อนไข
db.products.find({price: {$gt: 10000}});    // ราคามากกว่า 10000
db.products.find({}, {name: 1, price: 1});  // เฉพาะ field ที่ต้องการ

// 4. UPDATE - แก้ไขข้อมูล (Update)
db.products.updateOne(
    {name: "iPhone 15"},
    {$set: {price: 32000, quantity: 8}}
);

db.products.updateMany(
    {category: "Electronics"},
    {$set: {inStock: true}}
);

// 5. DELETE - ลบข้อมูล (Delete)
db.products.deleteOne({name: "Nike Air Force"});
db.products.deleteMany({inStock: false});

// 6. การ Query ขั้นสูง
db.products.aggregate([
    {$group: {_id: "$category", total: {$sum: "$quantity"}}}
]);

db.products.find().sort({price: -1});        // เรียงลำดับ
db.products.find().limit(5);                 // จำกัดผลลัพธ์
```

---

## 🚀 ส่วนที่ 2: Setup Project

### Step 1: เตรียม Environment

```bash
# สร้าง project folder
mkdir nodejs-database-lab
cd nodejs-database-lab

# สร้าง package.json
npm init -y

# ติดตั้ง dependencies
npm install express mssql mongoose cors dotenv

# สร้างไฟล์ต่างๆ
touch server.js .env
mkdir config routes
```

### Step 2: Configuration Files

**📄 .env**
```env
# Server
PORT=3000

# MS SQL Server
MSSQL_SERVER=localhost\\SQLEXPRESS
MSSQL_DATABASE=StudentDB
MSSQL_USER=sa
MSSQL_PASSWORD=yourpassword

# MongoDB
MONGODB_URI=mongodb://localhost:27017/ProductDB
```

**📄 package.json (เพิ่ม scripts)**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## 🔧 ส่วนที่ 3: Database Connections

### Step 3: สร้าง Database Connections

**📄 config/database.js**
```javascript
const sql = require('mssql');
const mongoose = require('mongoose');

// MS SQL Configuration
const sqlConfig = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    server: process.env.MSSQL_SERVER,
    database: process.env.MSSQL_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// MS SQL Connection
let sqlPool;
const connectMSSQL = async () => {
    try {
        sqlPool = await sql.connect(sqlConfig);
        console.log('✅ Connected to MS SQL Server');
        return sqlPool;
    } catch (error) {
        console.error('❌ MS SQL connection failed:', error.message);
        throw error;
    }
};

// MongoDB Connection  
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        throw error;
    }
};

// Get SQL Pool
const getSqlPool = () => {
    if (!sqlPool) {
        throw new Error('SQL Pool not initialized');
    }
    return sqlPool;
};

module.exports = {
    connectMSSQL,
    connectMongoDB,
    getSqlPool,
    sql
};
```

---

## 📊 ส่วนที่ 4: Data Models

### Step 4: สร้าง Models

**📄 models/Student.js (MS SQL Model)**
```javascript
const { getSqlPool, sql } = require('../config/database');

class Student {
    // สร้างตาราง Students
    static async createTable() {
        try {
            const pool = getSqlPool();
            await pool.request().query(`
                IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Students' AND xtype='U')
                CREATE TABLE Students (
                    id INT IDENTITY(1,1) PRIMARY KEY,
                    firstName NVARCHAR(50) NOT NULL,
                    lastName NVARCHAR(50) NOT NULL,
                    email NVARCHAR(100),
                    age INT,
                    major NVARCHAR(100),
                    createdAt DATETIME2 DEFAULT GETDATE()
                )
            `);
            console.log('✅ Students table ready');
        } catch (error) {
            console.error('❌ Error creating Students table:', error.message);
            throw error;
        }
    }

    // ดึงข้อมูลทั้งหมด
    static async getAll() {
        try {
            const pool = getSqlPool();
            const result = await pool.request().query('SELECT * FROM Students ORDER BY id');
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    // ดึงข้อมูลตาม ID
    static async getById(id) {
        try {
            const pool = getSqlPool();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM Students WHERE id = @id');
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    // เพิ่มข้อมูลใหม่
    static async create(studentData) {
        try {
            const pool = getSqlPool();
            const result = await pool.request()
                .input('firstName', sql.NVarChar(50), studentData.firstName)
                .input('lastName', sql.NVarChar(50), studentData.lastName)
                .input('email', sql.NVarChar(100), studentData.email)
                .input('age', sql.Int, studentData.age)
                .input('major', sql.NVarChar(100), studentData.major)
                .query(`
                    INSERT INTO Students (firstName, lastName, email, age, major)
                    OUTPUT INSERTED.*
                    VALUES (@firstName, @lastName, @email, @age, @major)
                `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    // อัพเดทข้อมูล
    static async update(id, studentData) {
        try {
            const pool = getSqlPool();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('firstName', sql.NVarChar(50), studentData.firstName)
                .input('lastName', sql.NVarChar(50), studentData.lastName)
                .input('email', sql.NVarChar(100), studentData.email)
                .input('age', sql.Int, studentData.age)
                .input('major', sql.NVarChar(100), studentData.major)
                .query(`
                    UPDATE Students SET 
                        firstName = @firstName,
                        lastName = @lastName,
                        email = @email,
                        age = @age,
                        major = @major
                    OUTPUT INSERTED.*
                    WHERE id = @id
                `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    // ลบข้อมูล
    static async delete(id) {
        try {
            const pool = getSqlPool();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM Students WHERE id = @id');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Student;
```

**📄 models/Product.js (MongoDB Model)**
```javascript
const mongoose = require('mongoose');

// สร้าง Schema สำหรับ Product
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// สร้าง Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
```

---

## 🛣️ ส่วนที่ 5: API Routes

### Step 5: สร้าง Routes สำหรับ Students (MS SQL)

**📄 routes/students.js**
```javascript
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET /api/students - ดึงข้อมูลนักเรียนทั้งหมด
router.get('/', async (req, res) => {
    try {
        console.log('📖 Getting all students...');
        const students = await Student.getAll();
        
        res.json({
            success: true,
            message: 'Students retrieved successfully',
            data: students,
            count: students.length
        });
    } catch (error) {
        console.error('❌ Error getting students:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to get students',
            error: error.message
        });
    }
});

// GET /api/students/:id - ดึงข้อมูลนักเรียนตาม ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`📖 Getting student with ID: ${id}`);
        
        const student = await Student.getById(parseInt(id));
        
        if (!student) {
            return res.status(404).json({
                success: false,
                message: `Student not found with ID: ${id}`
            });
        }

        res.json({
            success: true,
            message: 'Student retrieved successfully',
            data: student
        });
    } catch (error) {
        console.error('❌ Error getting student:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to get student',
            error: error.message
        });
    }
});

// POST /api/students - เพิ่มนักเรียนใหม่
router.post('/', async (req, res) => {
    try {
        const studentData = req.body;
        console.log('📝 Creating new student:', studentData);
        
        const newStudent = await Student.create(studentData);
        
        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            data: newStudent
        });
    } catch (error) {
        console.error('❌ Error creating student:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to create student',
            error: error.message
        });
    }
});

// PUT /api/students/:id - อัพเดทนักเรียน
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const studentData = req.body;
        console.log(`✏️ Updating student ID: ${id}`, studentData);
        
        const updatedStudent = await Student.update(parseInt(id), studentData);
        
        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: `Student not found with ID: ${id}`
            });
        }

        res.json({
            success: true,
            message: 'Student updated successfully',
            data: updatedStudent
        });
    } catch (error) {
        console.error('❌ Error updating student:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to update student',
            error: error.message
        });
    }
});

// DELETE /api/students/:id - ลบนักเรียน
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`🗑️ Deleting student ID: ${id}`);
        
        const deleted = await Student.delete(parseInt(id));
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: `Student not found with ID: ${id}`
            });
        }

        res.json({
            success: true,
            message: 'Student deleted successfully'
        });
    } catch (error) {
        console.error('❌ Error deleting student:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to delete student',
            error: error.message
        });
    }
});

module.exports = router;
```

### Step 6: สร้าง Routes สำหรับ Products (MongoDB)

**📄 routes/products.js**
```javascript
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - ดึงข้อมูล products ทั้งหมด
router.get('/', async (req, res) => {
    try {
        console.log('📖 Getting all products...');
        const products = await Product.find().sort({ createdAt: -1 });
        
        res.json({
            success: true,
            message: 'Products retrieved successfully',
            data: products,
            count: products.length
        });
    } catch (error) {
        console.error('❌ Error getting products:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to get products',
            error: error.message
        });
    }
});

// GET /api/products/:id - ดึงข้อมูล product ตาม ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`📖 Getting product with ID: ${id}`);
        
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: `Product not found with ID: ${id}`
            });
        }

        res.json({
            success: true,
            message: 'Product retrieved successfully',
            data: product
        });
    } catch (error) {
        console.error('❌ Error getting product:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to get product',
            error: error.message
        });
    }
});

// POST /api/products - เพิ่ม product ใหม่
router.post('/', async (req, res) => {
    try {
        const productData = req.body;
        console.log('📝 Creating new product:', productData);
        
        const newProduct = new Product(productData);
        const savedProduct = await newProduct.save();
        
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: savedProduct
        });
    } catch (error) {
        console.error('❌ Error creating product:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to create product',
            error: error.message
        });
    }
});

// PUT /api/products/:id - อัพเดท product
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productData = req.body;
        console.log(`✏️ Updating product ID: ${id}`, productData);
        
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            productData, 
            { new: true } // return updated document
        );
        
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: `Product not found with ID: ${id}`
            });
        }

        res.json({
            success: true,
            message: 'Product updated successfully',
            data: updatedProduct
        });
    } catch (error) {
        console.error('❌ Error updating product:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to update product',
            error: error.message
        });
    }
});

// DELETE /api/products/:id - ลบ product
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`🗑️ Deleting product ID: ${id}`);
        
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: `Product not found with ID: ${id}`
            });
        }

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('❌ Error deleting product:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to delete product',
            error: error.message
        });
    }
});

module.exports = router;
```

---

## 🚀 ส่วนที่ 6: Main Server

### Step 7: สร้าง Main Server File

**📄 server.js**
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import configurations
const { connectMSSQL, connectMongoDB } = require('./config/database');
const Student = require('./models/Student');

// Import routes
const studentRoutes = require('./routes/students');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log(`📨 ${new Date().toLocaleTimeString()} - ${req.method} ${req.path}`);
    next();
});

// Health check
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: '🎉 Node.js Database API is running!',
        endpoints: {
            students: '/api/students (MS SQL)',
            products: '/api/products (MongoDB)'
        },
        timestamp: new Date().toISOString()
    });
});

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/products', productRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Error handler
app.use((error, req, res, next) => {
    console.error('🚨 Server Error:', error.message);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
    });
});

// Start server
const startServer = async () => {
    try {
        console.log('🚀 Starting server...');
        
        // Connect to databases
        await connectMSSQL();
        await connectMongoDB();
        
        // Create tables
        await Student.createTable();
        
        // Start listening
        app.listen(PORT, () => {
            console.log('🎯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(`🌟 Server running on http://localhost:${PORT}`);
            console.log('📚 API Endpoints:');
            console.log(`   👤 Students: http://localhost:${PORT}/api/students`);
            console.log(`   📦 Products: http://localhost:${PORT}/api/products`);
            console.log('🎯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        });
        
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();
```

---

## 🧪 ส่วนที่ 7: การทดสอบด้วย Postman

### Step 8: การรันและทดสอบระบบ

**วิธีการรัน:**
```bash
# ติดตั้ง nodemon (optional)
npm install -g nodemon

# รันโปรแกรม
npm start
# หรือ
nodemon server.js
```

### Step 9: ทดสอบ API ด้วย Postman

#### 🔵 ทดสอบ Students API (MS SQL)

**1. Health Check**
```
GET http://localhost:3000/
```

**2. ดึงข้อมูลนักเรียนทั้งหมด**
```
GET http://localhost:3000/api/students
```

**3. เพิ่มนักเรียนใหม่**
```
POST http://localhost:3000/api/students
Content-Type: application/json

{
    "firstName": "สมชาย",
    "lastName": "ใจดี", 
    "email": "somchai@email.com",
    "age": 20,
    "major": "Computer Science"
}
```

**4. ดึงข้อมูลนักเรียนตาม ID**
```
GET http://localhost:3000/api/students/1
```

**5. อัพเดทข้อมูลนักเรียน**
```
PUT http://localhost:3000/api/students/1
Content-Type: application/json

{
    "firstName": "สมชาย",
    "lastName": "ใจดี Updated",
    "email": "somchai.updated@email.com", 
    "age": 21,
    "major": "Data Science"
}
```

**6. ลบนักเรียน**
```
DELETE http://localhost:3000/api/students/1
```

#### 🟢 ทดสอบ Products API (MongoDB)

**1. ดึงข้อมูล products ทั้งหมด**
```
GET http://localhost:3000/api/products
```

**2. เพิ่ม product ใหม่**
```
POST http://localhost:3000/api/products
Content-Type: application/json

{
    "name": "iPhone 15",
    "price": 35000,
    "category": "Electronics",
    "inStock": true,
    "quantity": 10
}
```

**3. เพิ่ม product อีกตัว**
```
POST http://localhost:3000/api/products
Content-Type: application/json

{
    "name": "MacBook Pro",
    "price": 65000,
    "category": "Electronics",
    "inStock": true,
    "quantity": 5
}
```

**4. ดึงข้อมูล product ตาม ID**
```
GET http://localhost:3000/api/products/ObjectId_ที่ได้จาก_response
```

**5. อัพเดท product**
```
PUT http://localhost:3000/api/products/ObjectId_ที่ได้จาก_response
Content-Type: application/json

{
    "name": "iPhone 15 Pro",
    "price": 42000,
    "quantity": 8
}
```

**6. ลบ product**
```
DELETE http://localhost:3000/api/products/ObjectId_ที่ได้จาก_response
```

---
