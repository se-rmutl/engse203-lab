# อธิบายการทำงานในแต่ละขั้นตอน Pre-LAB 6

## 🔍 การทำงานของ MS SQL Connection

### 📊 ขั้นตอนการเชื่อมต่อ MS SQL Server

**1. การสร้าง Configuration Object**
```javascript
const sqlConfig = {
    user: 'sa',                           // Username
    password: 'yourpassword',             // Password  
    server: 'localhost\\SQLEXPRESS',      // Server name or IP Address
    database: 'StudentDB',               // Database name
    options: {
        encrypt: false,                   // สำหรับ local development
        trustServerCertificate: true      // ไว้ใจ server certificate
    }
};

// อธิบาย: Object นี้เก็บข้อมูลที่จำเป็นสำหรับการเชื่อมต่อ
// เหมือนกับการบอกที่อยู่และรหัสผ่านให้กับ SQL Server
```

**2. การสร้าง Connection Pool**
```javascript
let sqlPool;

const connectMSSQL = async () => {
    try {
        // สร้าง connection pool
        sqlPool = await sql.connect(sqlConfig);
        console.log('✅ Connected to MS SQL Server');
        
        // Pool จะจัดการ connections หลายๆ ตัว
        // ไม่ต้องสร้างใหม่ทุกครั้งที่ query
        
        return sqlPool;
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        throw error;
    }
};

/* 
Connection Pool คืออะไร?
- เหมือนสระว่ายน้ำที่เต็มไปด้วย connections
- เมื่อต้องการ query ก็ไปเอา connection มาใช้
- ใช้เสร็จแล้วคืนกลับไปใน pool
- ประหยัดเวลาและ resources
*/
```

**3. การ Execute Query แบบ Safe**
```javascript
const getStudentById = async (id) => {
    try {
        const pool = getSqlPool();              // ได้ pool ที่สร้างไว้
        
        // สร้าง request object
        const request = pool.request();
        
        // เพิ่ม input parameters (ป้องกัน SQL Injection)
        request.input('id', sql.Int, id);
        
        // Execute query
        const result = await request.query('SELECT * FROM Students WHERE id = @id');
        
        // ได้ผลลัพธ์
        return result.recordset[0];    // recordset คือ array ของ rows
        
    } catch (error) {
        throw error;
    }
};

/*
ทำไมต้องใช้ Parameters?

❌ อันตราย:
const query = `SELECT * FROM Students WHERE id = ${id}`;
// ถ้า id = "1; DROP TABLE Students;" จะลบตารางทิ้ง!

✅ ปลอดภัย:  
request.input('id', sql.Int, id);
const query = 'SELECT * FROM Students WHERE id = @id';
// SQL Server จะตรวจสอบและแปลงข้อมูลก่อน
*/
```

**4. การจัดการ Result Set**
```javascript
const result = await request.query('SELECT * FROM Students');

console.log('Result structure:', {
    recordset: result.recordset,      // Array ของ rows [{ id: 1, name: "John" }]
    rowsAffected: result.rowsAffected, // จำนวน rows ที่ได้รับผลกระทบ [1]
    returnValue: result.returnValue    // Return value จาก stored procedure
});

// การใช้งานจริง
const students = result.recordset;    // เอาเฉพาะข้อมูล
const count = students.length;        // นับจำนวน
```

---

## 🍃 การทำงานของ MongoDB Connection

### 📱 ขั้นตอนการเชื่อมต่อ MongoDB

**1. การเชื่อมต่อผ่าน Mongoose**
```javascript
const connectMongoDB = async () => {
    try {
        // เชื่อมต่อกับ MongoDB
        await mongoose.connect('mongodb://localhost:27017/ProductDB');
        
        console.log('✅ Connected to MongoDB');
        
        // Connection events
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to MongoDB');
        });
        
        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
        });
        
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        throw error;
    }
};

/*
Mongoose คืออะไร?
- ODM (Object Document Mapper) สำหรับ MongoDB
- เหมือน ORM แต่สำหรับ Document Database
- ช่วยจัดการ Schema, Validation, และ Type casting
- ทำให้การใช้งาน MongoDB ง่ายขึ้น
*/
```

**2. การสร้าง Schema และ Model**
```javascript
// Schema = แผนผังโครงสร้างข้อมูล
const productSchema = new mongoose.Schema({
    name: {
        type: String,                    // ประเภทข้อมูล
        required: true,                  // บังคับมี
        trim: true                       // ตัด whitespace
    },
    price: {
        type: Number,
        required: true,
        min: 0                          // ค่าต่ำสุด
    },
    category: {
        type: String,
        enum: ['Electronics', 'Clothing', 'Books'],  // จำกัดค่าที่ใส่ได้
        required: true
    },
    inStock: {
        type: Boolean,
        default: true                   // ค่า default
    },
    createdAt: {
        type: Date,
        default: Date.now              // ใส่เวลาปัจจุบันอัตโนมัติ
    }
});

// Model = Class ที่สร้างจาก Schema
const Product = mongoose.model('Product', productSchema);

/*
Schema vs Model:
- Schema = Blueprint (แบบแปลน)
- Model = Constructor function (คลาสสำหรับสร้าง object)
*/
```

**3. การทำ CRUD Operations**
```javascript
// CREATE - สร้างข้อมูล
const createProduct = async (productData) => {
    // วิธีที่ 1: สร้าง instance แล้ว save
    const product = new Product(productData);
    const savedProduct = await product.save();
    
    // วิธีที่ 2: ใช้ Model.create() โดยตรง
    const savedProduct2 = await Product.create(productData);
    
    return savedProduct;
};

// READ - อ่านข้อมูล
const getProducts = async () => {
    // หาทั้งหมด
    const allProducts = await Product.find();
    
    // หาตามเงื่อนไข
    const electronicsProducts = await Product.find({ category: 'Electronics' });
    
    // หาตัวเดียว
    const oneProduct = await Product.findById(productId);
    
    // หาด้วยเงื่อนไขซับซ้อน
    const expensiveProducts = await Product.find({
        price: { $gt: 10000 },        // ราคามากกว่า 10000
        inStock: true                 // และมีของในสต็อก
    }).sort({ price: -1 })            // เรียงตามราคาสูงสุดก่อน
      .limit(10);                     // เอาแค่ 10 รายการ
    
    return allProducts;
};

// UPDATE - แก้ไขข้อมูล
const updateProduct = async (id, updateData) => {
    // วิธีที่ 1: findByIdAndUpdate
    const updatedProduct = await Product.findByIdAndUpdate(
        id,                           // ID ที่ต้องการอัพเดท
        updateData,                   // ข้อมูลใหม่
        { 
            new: true,               // return document ที่อัพเดทแล้ว
            runValidators: true      // ตรวจสอบ validation
        }
    );
    
    // วิธีที่ 2: หาก่อนแล้ว save
    const product = await Product.findById(id);
    Object.assign(product, updateData);
    await product.save();
    
    return updatedProduct;
};

// DELETE - ลบข้อมูล
const deleteProduct = async (id) => {
    // วิธีที่ 1: findByIdAndDelete
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    // วิธีที่ 2: deleteOne
    const result = await Product.deleteOne({ _id: id });
    
    return deletedProduct;
};
```

---

## 🔄 Request/Response Lifecycle อย่างละเอียด

### 📨 เมื่อ Client ส่ง POST Request

**ตัวอย่าง: สร้าง Student ใหม่**

```javascript
// Client ส่ง Request
/*
POST http://localhost:3000/api/students
Content-Type: application/json

{
    "firstName": "สมชาย",
    "lastName": "ใจดี", 
    "email": "somchai@email.com",
    "age": 20,
    "major": "Computer Science"
}
*/

// Server ประมวลผลเป็นขั้นตอน:

// 1. Express Server รับ HTTP Request
app.listen(3000) // Server listening บน port 3000

// 2. CORS Middleware ตรวจสอบ
app.use(cors());  
// ✓ ตรวจสอบ Origin header
// ✓ เพิ่ม Access-Control-Allow-Origin header

// 3. Body Parser Middleware แปลง JSON
app.use(express.json());
// ✓ อ่าน raw body data
// ✓ แปลง JSON string เป็น JavaScript object
// ✓ ใส่ใน req.body

// 4. Logging Middleware
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.path}`);
    // ✓ พิมพ์ "📨 POST /api/students"
    next(); // ไปต่อ middleware ถัดไป
});

// 5. Router จับคู่ Path
app.use('/api/students', studentRoutes);
// ✓ เช็คว่า path ขึ้นต้นด้วย /api/students หรือไม่
// ✓ ส่งต่อไป studentRoutes

// 6. Route Handler ทำงาน
router.post('/', async (req, res) => {
    try {
        const studentData = req.body;
        // ✓ ได้ข้อมูล: { firstName: "สมชาย", lastName: "ใจดี", ... }
        
        console.log('📝 Creating new student:', studentData);
        
        // 7. เรียกใช้ Model Method
        const newStudent = await Student.create(studentData);
        
        // 8. Model execute SQL
        /*
        ภายใน Student.create():
        - สร้าง SQL query
        - เพิ่ม parameters
        - Execute ใน database
        - รับผลลัพธ์กลับมา
        */
        
        // 9. ส่ง Response กลับ
        res.status(201).json({
            success: true,
            message: 'Student created successfully', 
            data: newStudent
        });
        
    } catch (error) {
        // 10. Error Handling
        console.error('❌ Error creating student:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to create student',
            error: error.message
        });
    }
});
```

### 📤 Response ที่ Client ได้รับ

```javascript
// Success Response
HTTP/1.1 201 Created
Content-Type: application/json

{
    "success": true,
    "message": "Student created successfully",
    "data": {
        "id": 1,
        "firstName": "สมชาย",
        "lastName": "ใจดี",
        "email": "somchai@email.com", 
        "age": 20,
        "major": "Computer Science",
        "createdAt": "2024-01-15T10:30:00.000Z"
    }
}

// หรือ Error Response  
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
    "success": false,
    "message": "Failed to create student",
    "error": "Violation of UNIQUE KEY constraint"
}
```

---

## ⚡ Error Handling Flow

### 🚨 ประเภทของ Errors และการจัดการ

**1. Connection Errors**
```javascript
// เกิดเมื่อเชื่อมต่อ database ไม่ได้
try {
    const pool = await sql.connect(sqlConfig);
} catch (error) {
    console.error('Connection failed:', error.message);
    
    // ตัวอย่าง error messages:
    // "Login failed for user 'sa'"
    // "A network-related error occurred"
    // "Database 'StudentDB' does not exist"
    
    // การจัดการ:
    process.exit(1); // ปิดโปรแกรมเพราะไม่สามารถทำงานต่อได้
}
```

**2. SQL Constraint Errors**
```javascript
try {
    await pool.request()
        .input('email', 'duplicate@email.com') // email ที่มีอยู่แล้ว
        .query('INSERT INTO Students (email) VALUES (@email)');
        
} catch (error) {
    console.error('SQL Error:', error);
    
    // แยกประเภท error ตาม error code
    switch (error.number) {
        case 2627: // Unique constraint violation
        case 2601:
            res.status(409).json({
                success: false,
                message: 'Email already exists'
            });
            break;
            
        case 515: // Cannot insert NULL
            res.status(400).json({
                success: false,
                message: 'Required field is missing'
            });
            break;
            
        case 245: // Conversion failed
            res.status(400).json({
                success: false,
                message: 'Invalid data type'
            });
            break;
            
        default:
            res.status(500).json({
                success: false,
                message: 'Database operation failed'
            });
    }
}
```

**3. Mongoose Validation Errors**
```javascript
try {
    const product = new Product({
        name: "",           // ผิด: required field
        price: -100,        // ผิด: ต้อง >= 0
        category: "Invalid" // ผิด: ไม่อยู่ใน enum
    });
    
    await product.save();
    
} catch (error) {
    console.error('Validation Error:', error);
    
    if (error.name === 'ValidationError') {
        // ดึง error messages ทั้งหมด
        const messages = Object.values(error.errors).map(e => e.message);
        
        res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: messages
            // ["Name is required", "Price must be positive", "Invalid category"]
        });
    }
}
```

**4. Global Error Handler**
```javascript
// วางไว้ท้ายสุดใน server.js
app.use((error, req, res, next) => {
    console.error('🚨 Unhandled Error:', {
        message: error.message,
        stack: error.stack,
        url: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString()
    });
    
    // ไม่เผย internal error details ให้ client
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

/*
Global Error Handler จะทำงานเมื่อ:
1. มี error ที่ไม่ได้จัดการใน route handlers
2. มีการเรียก next(error) ใน middleware
3. เกิด unhandled promise rejection
*/
```

---

## 🧩 การทำงานของ Express Middleware

### 🔄 Middleware Execution Order

```javascript
// 1. Application-level Middleware (ทำงานทุก request)
app.use(cors());                    // ก่อน
app.use(express.json());           // ถัดมา
app.use(express.urlencoded());     // ถัดมา

// 2. Custom Logging Middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    
    // บันทึกเวลาเริ่มต้น
    req.startTime = Date.now();
    
    // วัดเวลาที่ใช้
    res.on('finish', () => {
        const duration = Date.now() - req.startTime;
        console.log(`⏱️ Response time: ${duration}ms`);
    });
    
    next(); // สำคัญ! ต้องเรียกเพื่อไปต่อ
});

// 3. Router-level Middleware (เฉพาะ path ที่กำหนด)
app.use('/api/students', studentRoutes);   // เฉพาะ /api/students/*
app.use('/api/products', productRoutes);   // เฉพาะ /api/products/*

// 4. Route-specific Middleware
router.post('/', 
    validateInput,                  // Custom validation middleware
    async (req, res) => {          // Route handler
        // ทำงานเฉพาะ POST requests
    }
);

// 5. Error-handling Middleware (สุดท้าย)
app.use((error, req, res, next) => {
    // จัดการ errors ที่เกิดขึ้น
});

/*
การทำงานของ next():
- next()       = ไปต่อ middleware ถัดไป
- next(error)  = ข้าม middleware ปกติ ไปหา error handler
- ไม่เรียก next() = หยุดการทำงาน (ต้องส่ง response)
*/
```

### 🛡️ Custom Middleware Examples

**1. Authentication Middleware**
```javascript
const authenticateToken = (req, res, next) => {
    // ดึง token จาก header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access token required'
        });
    }
    
    try {
        // ตรวจสอบ token (จำลอง)
        if (token === 'valid-token') {
            req.user = { id: 1, email: 'user@example.com' }; // เก็บข้อมูล user
            next(); // อนุญาตให้ผ่าน
        } else {
            throw new Error('Invalid token');
        }
    } catch (error) {
        res.status(403).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

// วิธีใช้
router.get('/protected', authenticateToken, (req, res) => {
    res.json({
        success: true,
        message: 'This is protected data',
        user: req.user // ข้อมูลจาก middleware
    });
});
```

**2. Input Validation Middleware**
```javascript
const validateStudentInput = (req, res, next) => {
    const { firstName, lastName, email, age } = req.body;
    
    const errors = [];
    
    // ตรวจสอบข้อมูลจำเป็น
    if (!firstName || firstName.trim().length < 2) {
        errors.push('First name must be at least 2 characters');
    }
    
    if (!lastName || lastName.trim().length < 2) {
        errors.push('Last name must be at least 2 characters');
    }
    
    // ตรวจสอบ email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Please provide a valid email address');
    }
    
    // ตรวจสอบอายุ
    if (!age || age < 1 || age > 150) {
        errors.push('Age must be between 1 and 150');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }
    
    // ทำความสะอาดข้อมูล
    req.body.firstName = firstName.trim();
    req.body.lastName = lastName.trim();
    req.body.email = email.trim().toLowerCase();
    req.body.age = parseInt(age);
    
    next(); // ผ่านการตรวจสอบ
};

// วิธีใช้
router.post('/', validateStudentInput, createStudent);
```

---

## 📊 HTTP Status Codes และการใช้งาน

### 🎯 เมื่อไหร่ใช้ Status Code อะไร

| Status Code | ชื่อ | เมื่อไหร่ใช้ | ตัวอย่างการใช้งาน |
|-------------|------|-------------|-------------------|
| **200** | OK | สำเร็จทั่วไป | GET, PUT ที่สำเร็จ |
| **201** | Created | สร้างข้อมูลสำเร็จ | POST สร้าง resource ใหม่ |
| **204** | No Content | สำเร็จแต่ไม่มี content | DELETE สำเร็จ |
| **400** | Bad Request | Request ไม่ถูกต้อง | Validation ผิด, JSON ผิด format |
| **401** | Unauthorized | ต้อง authenticate | ไม่มี token หรือ token ผิด |
| **403** | Forbidden | ไม่มีสิทธิ์ | มี token แต่ไม่มีสิทธิ์เข้าถึง |
| **404** | Not Found | ไม่พบข้อมูล | ไม่มี resource หรือ route |
| **409** | Conflict | ข้อมูลขัดแย้ง | Email ซ้ำ, unique constraint |
| **422** | Unprocessable Entity | ข้อมูลถูก format แต่ผิด logic | Business logic validation |
| **500** | Internal Server Error | Server error | Database error, unexpected error |

**ตัวอย่างการใช้งานจริง:**
```javascript
// 200 OK - ดึงข้อมูลสำเร็จ
router.get('/', async (req, res) => {
    const students = await Student.getAll();
    res.status(200).json({ success: true, data: students });
});

// 201 Created - สร้างสำเร็จ
router.post('/', async (req, res) => {
    const newStudent = await Student.create(req.body);
    res.status(201).json({ success: true, data: newStudent });
});

// 400 Bad Request - ข้อมูลไม่ถูกต้อง
if (!req.body.email) {
    return res.status(400).json({
        success: false,
        message: 'Email is required'
    });
}

// 404 Not Found - ไม่พบข้อมูล
const student = await Student.getById(id);
if (!student) {
    return res.status(404).json({
        success: false,
        message: 'Student not found'
    });
}

// 409 Conflict - ข้อมูลซ้ำ
if (error.number === 2627) { // SQL Server unique constraint
    return res.status(409).json({
        success: false,
        message: 'Email already exists'
    });
}

// 500 Internal Server Error - Server error
catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
}
```

---

## 🔐 Security และ Best Practices

### 🛡️ SQL Injection Prevention

**SQL Injection คืออะไร?**
```javascript
// ❌ อันตราย - เปิดโอกาสให้ SQL Injection
const userInput = "1; DROP TABLE Students; --";
const dangerousQuery = `SELECT * FROM Students WHERE id = ${userInput}`;
// ผลลัพธ์: SELECT * FROM Students WHERE id = 1; DROP TABLE Students; --
// จะลบตาราง Students ทิ้ง!

// ✅ ปลอดภัย - ใช้ Parameterized Queries
const safeQuery = 'SELECT * FROM Students WHERE id = @id';
await pool.request()
    .input('id', sql.Int, userInput) // SQL Server จะ validate และ escape
    .query(safeQuery);
```

**วิธีการป้องกัน:**
```javascript
// 1. ใช้ Parameters เสมอ
const searchStudents = async (name, age) => {
    // ❌ ผิด
    const badQuery = `SELECT * FROM Students WHERE name = '${name}' AND age = ${age}`;
    
    // ✅ ถูก
    const result = await pool.request()
        .input('name', sql.NVarChar(50), name)
        .input('age', sql.Int, age)
        .query('SELECT * FROM Students WHERE name = @name AND age = @age');
    
    return result.recordset;
};

// 2. Input Validation
const validateInput = (input) => {
    // ตรวจสอบ data type
    if (typeof input !== 'string') return false;
    
    // ตรวจสอบ length
    if (input.length > 100) return false;
    
    // ตรวจสอบ special characters
    const dangerousChars = /[<>'"&]/;
    if (dangerousChars.test(input)) return false;
    
    return true;
};

// 3. Escape HTML (ป้องกัน XSS)
const escapeHtml = (text) => {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, (m) => map[m]);
};
```

### 🔒 Environment Variables Security

```javascript
// การจัดการ sensitive data
require('dotenv').config();

// ❌ ไม่ควรทำ - hard-code sensitive data
const badConfig = {
    password: 'mypassword123',
    apiKey: 'sk-1234567890abcdef'
};

// ✅ ควรทำ - ใช้ environment variables
const goodConfig = {
    password: process.env.DB_PASSWORD,
    apiKey: process.env.API_KEY
};

// ตรวจสอบว่า environment variables ที่จำเป็นมีครบหรือไม่
const requiredEnvVars = ['DB_PASSWORD', 'DB_SERVER', 'DB_NAME'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingVars);
    process.exit(1);
}

// .env file ต้องอยู่ใน .gitignore
// ห้าม commit sensitive data ลง Git!
```

---

## 🎯 Performance Optimization

### ⚡ Connection Pool Management

```javascript
// การตั้งค่า Connection Pool สำหรับ production
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    
    // Pool settings
    pool: {
        max: 10,                    // จำนวน connections สูงสุด
        min: 0,                     // จำนวน connections ต่ำสุด
        idleTimeoutMillis: 30000,   // ปิด connection ที่ไม่ใช้งาน (30 วินาที)
        acquireTimeoutMillis: 60000 // รอ connection ได้สูงสุด (60 วินาที)
    },
    
    // Timeout settings
    connectionTimeout: 60000,       // เวลาเชื่อมต่อ
    requestTimeout: 60000,          // เวลา execute query
    
    // Options
    options: {
        encrypt: true,              // เข้ารหัสการเชื่อมต่อ
        trustServerCertificate: false,
        enableArithAbort: true
    }
};

/*
ทำไมต้องใช้ Connection Pool?

1. Performance:
   - ไม่ต้องสร้าง connection ใหม่ทุกครั้ง
   - ประหยัดเวลาและ CPU

2. Resource Management:
   - จำกัดจำนวน connections ป้องกัน database overload
   - จัดการ idle connections อัตโนมัติ

3. Reliability:
   - Auto-retry เมื่อ connection ขาด
   - Graceful handling ของ connection errors
*/
```

### 🚀 Query Optimization

```javascript
// การเขียน Query ที่มีประสิทธิภาพ

// ❌ ไม่ดี - N+1 Problem
const getBadStudentsWithDetails = async () => {
    const students = await Student.getAll();        // 1 query
    
    for (let student of students) {
        student.courses = await getCourses(student.id); // N queries
    }
    
    return students;
    // รวม = 1 + N queries (ถ้ามี 100 students จะมี 101 queries!)
};

// ✅ ดี - JOIN Query
const getGoodStudentsWithDetails = async () => {
    const query = `
        SELECT 
            s.id, s.firstName, s.lastName, s.email,
            c.courseName, c.courseCode
        FROM Students s
        LEFT JOIN StudentCourses sc ON s.id = sc.studentId
        LEFT JOIN Courses c ON sc.courseId = c.id
        ORDER BY s.id
    `;
    
    const result = await pool.request().query(query);
    
    // Group results by student
    const studentsMap = {};
    result.recordset.forEach(row => {
        if (!studentsMap[row.id]) {
            studentsMap[row.id] = {
                id: row.id,
                firstName: row.firstName,
                lastName: row.lastName,
                email: row.email,
                courses: []
            };
        }
        
        if (row.courseName) {
            studentsMap[row.id].courses.push({
                name: row.courseName,
                code: row.courseCode
            });
        }
    });
    
    return Object.values(studentsMap);
    // เพียง 1 query เท่านั้น!
};

// การใช้ Index
const createIndexes = async () => {
    // สร้าง index สำหรับ columns ที่ค้นหาบ่อย
    await pool.request().query(`
        CREATE INDEX IX_Students_Email ON Students(email);
        CREATE INDEX IX_Students_Major ON Students(major);
        CREATE INDEX IX_Students_Age ON Students(age);
    `);
    
    console.log('✅ Database indexes created');
};

/*
Index คืออะไร?
- เหมือนดัชนีในหนังสือ
- ช่วยให้ database หาข้อมูลได้เร็วขึ้น
- ควรสร้างสำหรับ columns ที่ใช้ใน WHERE, JOIN, ORDER BY
*/
```

### 📊 MongoDB Performance Tips

```javascript
// การปรับแต่ง MongoDB สำหรับ Performance

// 1. การใช้ Aggregation Pipeline
const getProductStats = async () => {
    const stats = await Product.aggregate([
        // Stage 1: Filter
        { $match: { inStock: true } },
        
        // Stage 2: Group by category
        {
            $group: {
                _id: '$category',
                totalProducts: { $sum: 1 },
                averagePrice: { $avg: '$price' },
                totalValue: { $sum: { $multiply: ['$price', '$quantity'] } },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
            }
        },
        
        // Stage 3: Sort by total value
        { $sort: { totalValue: -1 } },
        
        // Stage 4: Limit results
        { $limit: 10 }
    ]);
    
    return stats;
};

// 2. การใช้ Indexes ใน MongoDB
const createMongoIndexes = async () => {
    // Single field index
    await Product.collection.createIndex({ category: 1 });
    await Product.collection.createIndex({ price: 1 });
    
    // Compound index
    await Product.collection.createIndex({ 
        category: 1, 
        price: -1 
    });
    
    // Text index สำหรับการค้นหา
    await Product.collection.createIndex({
        name: 'text',
        description: 'text'
    });
    
    console.log('✅ MongoDB indexes created');
};

// 3. การใช้ lean() สำหรับ performance
const getFastProducts = async () => {
    // ❌ ช้า - return Mongoose documents (มี methods)
    const slowProducts = await Product.find({ inStock: true });
    
    // ✅ เร็ว - return plain JavaScript objects
    const fastProducts = await Product.find({ inStock: true }).lean();
    
    return fastProducts;
};

// 4. Pagination ที่มีประสิทธิภาพ
const getProductsWithPagination = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    
    // ❌ ไม่ดีสำหรับ page ที่สูง
    const badPagination = await Product.find()
        .skip(skip)     // ช้าเมื่อ skip จำนวนมาก
        .limit(limit);
    
    // ✅ ดีกว่า - ใช้ cursor-based pagination
    const lastId = req.query.lastId;
    let query = {};
    
    if (lastId) {
        query._id = { $gt: lastId };
    }
    
    const goodPagination = await Product.find(query)
        .sort({ _id: 1 })
        .limit(limit);
    
    return goodPagination;
};
```

---

## 🔄 Async/Await Deep Dive

### ⚡ เข้าใจ Asynchronous Programming

```javascript
// เปรียบเทียบ Synchronous vs Asynchronous

// ❌ Synchronous (Blocking) - จินตนาการ
function getStudentsSync() {
    console.log('1. เริ่มดึงข้อมูล students');
    
    const students = database.querySync('SELECT * FROM Students'); // รอ 2 วินาที
    console.log('2. ได้ข้อมูล students แล้ว');
    
    const courses = database.querySync('SELECT * FROM Courses');   // รอ 1 วินาที
    console.log('3. ได้ข้อมูล courses แล้ว');
    
    return { students, courses };
}

// ผลลัพธ์: ใช้เวลารวม 3 วินาที, บล็อก Node.js event loop

// ✅ Asynchronous (Non-blocking)
async function getStudentsAsync() {
    console.log('1. เริ่มดึงข้อมูล students');
    
    const studentsPromise = Student.getAll();        // ไม่รอ
    console.log('2. เริ่มดึงข้อมูล courses');
    
    const coursesPromise = Course.getAll();          // ไม่รอ
    console.log('3. รอผลลัพธ์ทั้งคู่');
    
    // รอให้ทั้งคู่เสร็จพร้อมกัน
    const [students, courses] = await Promise.all([
        studentsPromise,
        coursesPromise
    ]);
    
    console.log('4. ได้ข้อมูลทั้งหมดแล้ว');
    return { students, courses };
}

// ผลลัพธ์: ใช้เวลา 2 วินาที (parallel execution), ไม่บล็อก Node.js
```

### 🎯 Error Handling ใน Async/Await

```javascript
// การจัดการ Error อย่างถูกต้อง

// ❌ ไม่ดี - ไม่จัดการ error
async function badExample() {
    const student = await Student.getById(999); // อาจ error
    return student.name; // จะ crash ถ้า student เป็น null
}

// ✅ ดี - จัดการ error แบบ specific
async function goodExample(id) {
    try {
        // Validate input
        if (!id || isNaN(id)) {
            throw new Error('Invalid student ID');
        }
        
        const student = await Student.getById(parseInt(id));
        
        // Check result
        if (!student) {
            const error = new Error('Student not found');
            error.statusCode = 404;
            throw error;
        }
        
        return student;
        
    } catch (error) {
        // Re-throw เพื่อให้ caller จัดการต่อ
        console.error(`Error getting student ${id}:`, error.message);
        throw error;
    }
}

// ✅ ดีมาก - จัดการ multiple async operations
async function excellentExample() {
    try {
        // Parallel execution
        const [students, courses, teachers] = await Promise.all([
            Student.getAll(),
            Course.getAll(),
            Teacher.getAll()
        ]);
        
        return { students, courses, teachers };
        
    } catch (error) {
        // ถ้า operation ใดก็ตามล้มเหลว จะมาที่นี่
        console.error('Error fetching data:', error.message);
        
        // ส่ง partial data ถ้าเป็นไปได้
        try {
            const students = await Student.getAll();
            return { 
                students, 
                courses: [], 
                teachers: [],
                warning: 'Some data could not be loaded'
            };
        } catch (fallbackError) {
            throw new Error('All data sources unavailable');
        }
    }
}
```

### 🔧 Promise Patterns

```javascript
// รูปแบบการใช้ Promise ต่างๆ

// 1. Sequential Execution (ทำตามลำดับ)
async function sequential() {
    console.time('sequential');
    
    const student1 = await Student.getById(1);    // รอ 100ms
    const student2 = await Student.getById(2);    // รอ 100ms
    const student3 = await Student.getById(3);    // รอ 100ms
    
    console.timeEnd('sequential'); // ~300ms
    return [student1, student2, student3];
}

// 2. Parallel Execution (ทำพร้อมกัน)
async function parallel() {
    console.time('parallel');
    
    const [student1, student2, student3] = await Promise.all([
        Student.getById(1),    // ทำพร้อมกัน
        Student.getById(2),    // ทำพร้อมกัน  
        Student.getById(3)     // ทำพร้อมกัน
    ]);
    
    console.timeEnd('parallel'); // ~100ms
    return [student1, student2, student3];
}

// 3. Promise.allSettled (ไม่หยุดถ้า error)
async function allSettled() {
    const results = await Promise.allSettled([
        Student.getById(1),     // สำเร็จ
        Student.getById(999),   // ล้มเหลว
        Student.getById(3)      // สำเร็จ
    ]);
    
    const students = results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);
    
    const errors = results
        .filter(result => result.status === 'rejected')
        .map(result => result.reason);
    
    return { students, errors };
}

// 4. Promise.race (เอาตัวแรกที่เสร็จ)
async function withTimeout() {
    try {
        const result = await Promise.race([
            Student.getById(1),                     // operation จริง
            new Promise((_, reject) =>              // timeout
                setTimeout(() => reject(new Error('Timeout')), 5000)
            )
        ]);
        
        return result;
    } catch (error) {
        if (error.message === 'Timeout') {
            throw new Error('Database operation timed out');
        }
        throw error;
    }
}
```

---

## 🎨 Response Format Standardization

### 📋 Consistent API Response Structure

```javascript
// มาตรฐาน Response Format สำหรับทุก API

// ✅ Success Response Structure
const successResponse = {
    success: true,
    message: 'Operation completed successfully',
    data: {}, // ข้อมูลจริง
    meta: {   // ข้อมูลเพิ่มเติม (optional)
        timestamp: '2024-01-15T10:30:00.000Z',
        version: '1.0',
        requestId: 'req-123456'
    }
};

// ✅ Error Response Structure  
const errorResponse = {
    success: false,
    message: 'Operation failed',
    error: {
        code: 'VALIDATION_ERROR',
        details: 'Specific error message',
        field: 'email' // สำหรับ validation errors
    },
    meta: {
        timestamp: '2024-01-15T10:30:00.000Z',
        requestId: 'req-123456'
    }
};

// Helper Functions สำหรับสร้าง Response
class ResponseHelper {
    static success(data, message = 'Success', meta = {}) {
        return {
            success: true,
            message,
            data,
            meta: {
                timestamp: new Date().toISOString(),
                ...meta
            }
        };
    }
    
    static error(message, error = {}, statusCode = 500) {
        return {
            success: false,
            message,
            error: {
                code: error.code || 'INTERNAL_ERROR',
                details: error.message || 'An unexpected error occurred',
                ...error
            },
            meta: {
                timestamp: new Date().toISOString(),
                statusCode
            }
        };
    }
    
    static paginated(data, pagination) {
        return {
            success: true,
            message: 'Data retrieved successfully',
            data,
            pagination: {
                page: pagination.page,
                limit: pagination.limit,
                total: pagination.total,
                totalPages: Math.ceil(pagination.total / pagination.limit),
                hasNext: pagination.page < Math.ceil(pagination.total / pagination.limit),
                hasPrev: pagination.page > 1
            },
            meta: {
                timestamp: new Date().toISOString()
            }
        };
    }
}

// การใช้งานใน Route Handlers
router.get('/', async (req, res) => {
    try {
        const students = await Student.getAll();
        
        res.status(200).json(
            ResponseHelper.success(students, 'Students retrieved successfully')
        );
    } catch (error) {
        res.status(500).json(
            ResponseHelper.error('Failed to get students', error)
        );
    }
});

router.post('/', async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        
        res.status(201).json(
            ResponseHelper.success(newStudent, 'Student created successfully')
        );
    } catch (error) {
        if (error.number === 2627) { // Unique constraint
            res.status(409).json(
                ResponseHelper.error('Email already exists', {
                    code: 'DUPLICATE_EMAIL',
                    field: 'email'
                }, 409)
            );
        } else {
            res.status(500).json(
                ResponseHelper.error('Failed to create student', error)
            );
        }
    }
});
```

### 🎯 HTTP Status Code Best Practices

```javascript
// การเลือกใช้ Status Code ให้เหมาะสม

class StatusCodes {
    // 2xx Success
    static OK = 200;                    // GET, PUT successful
    static CREATED = 201;              // POST successful  
    static ACCEPTED = 202;             // Async operation started
    static NO_CONTENT = 204;           // DELETE successful
    
    // 4xx Client Error
    static BAD_REQUEST = 400;          // Invalid request format
    static UNAUTHORIZED = 401;         // Authentication required
    static FORBIDDEN = 403;            // Access denied
    static NOT_FOUND = 404;           // Resource not found
    static METHOD_NOT_ALLOWED = 405;   // Wrong HTTP method
    static CONFLICT = 409;            // Resource conflict (duplicate)
    static UNPROCESSABLE_ENTITY = 422; // Validation failed
    static TOO_MANY_REQUESTS = 429;   // Rate limit exceeded
    
    // 5xx Server Error
    static INTERNAL_SERVER_ERROR = 500; // Unexpected server error
    static NOT_IMPLEMENTED = 501;       // Feature not implemented
    static BAD_GATEWAY = 502;          // External service error
    static SERVICE_UNAVAILABLE = 503;  // Server temporarily down
    static GATEWAY_TIMEOUT = 504;      // External service timeout
}

// ตัวอย่างการใช้งาน
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validation
        if (!id || isNaN(id)) {
            return res.status(StatusCodes.BAD_REQUEST).json(
                ResponseHelper.error('Invalid student ID format', {
                    code: 'INVALID_ID_FORMAT',
                    field: 'id'
                })
            );
        }
        
        const student = await Student.getById(parseInt(id));
        
        // Not found
        if (!student) {
            return res.status(StatusCodes.NOT_FOUND).json(
                ResponseHelper.error('Student not found', {
                    code: 'STUDENT_NOT_FOUND',
                    studentId: id
                })
            );
        }
        
        // Success
        res.status(StatusCodes.OK).json(
            ResponseHelper.success(student, 'Student retrieved successfully')
        );
        
    } catch (error) {
        console.error('Error getting student:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            ResponseHelper.error('Failed to get student', error)
        );
    }
});
```

---

## 🔍 Debugging และ Monitoring

### 🕵️ Debugging Techniques

```javascript
// เทคนิคการ Debug ที่มีประสิทธิภาพ

// 1. Structured Logging
class Logger {
    static info(message, data = {}) {
        console.log(`ℹ️  [${new Date().toISOString()}] INFO: ${message}`, data);
    }
    
    static error(message, error = {}) {
        console.error(`❌ [${new Date().toISOString()}] ERROR: ${message}`, {
            message: error.message,
            stack: error.stack,
            code: error.code
        });
    }
    
    static debug(message, data = {}) {
        if (process.env.NODE_ENV === 'development') {
            console.log(`🐛 [${new Date().toISOString()}] DEBUG: ${message}`, data);
        }
    }
    
    static performance(label, startTime) {
        const duration = Date.now() - startTime;
        console.log(`⏱️  [${new Date().toISOString()}] PERF: ${label} took ${duration}ms`);
    }
}

// 2. Request Tracing Middleware
const requestTracer = (req, res, next) => {
    const requestId = `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();
    
    // เพิ่ม requestId ใน request object
    req.requestId = requestId;
    
    Logger.info('Request started', {
        requestId,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        body: req.body
    });
    
    // Log เมื่อ response เสร็จ
    res.on('finish', () => {
        Logger.performance(`Request ${requestId}`, startTime);
        Logger.info('Request completed', {
            requestId,
            statusCode: res.statusCode,
            duration: Date.now() - startTime
        });
    });
    
    next();
};

// 3. Database Query Debugging
const debugQuery = async (query, params = {}) => {
    const startTime = Date.now();
    
    Logger.debug('SQL Query', {
        query: query.replace(/\s+/g, ' ').trim(),
        params
    });
    
    try {
        const pool = getSqlPool();
        const request = pool.request();
        
        // เพิ่ม parameters
        Object.keys(params).forEach(key => {
            request.input(key, params[key]);
        });
        
        const result = await request.query(query);
        
        Logger.performance('SQL Query', startTime);
        Logger.debug('SQL Result', {
            rowCount: result.recordset.length,
            rowsAffected: result.rowsAffected
        });
        
        return result;
    } catch (error) {
        Logger.error('SQL Query failed', {
            query,
            params,
            error: error.message
        });
        throw error;
    }
};

// 4. Error Context Capture
const captureErrorContext = (error, req) => {
    return {
        error: {
            message: error.message,
            stack: error.stack,
            name: error.name,
            code: error.code
        },
        request: {
            id: req.requestId,
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            body: req.body,
            params: req.params,
            query: req.query,
            ip: req.ip
        },
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    };
};

// การใช้งานใน Error Handler
app.use((error, req, res, next) => {
    const errorContext = captureErrorContext(error, req);
    
    Logger.error('Unhandled error', errorContext);
    
    // ส่งไปยัง monitoring service (production)
    if (process.env.NODE_ENV === 'production') {
        // sendToMonitoringService(errorContext);
    }
    
    res.status(500).json(
        ResponseHelper.error('Internal server error', {
            requestId: req.requestId
        })
    );
});
```

### 📊 Performance Monitoring

```javascript
// การวัดและติดตาม Performance

// 1. Response Time Monitoring
const responseTimeMonitor = (req, res, next) => {
    const startHrTime = process.hrtime();
    
    res.on('finish', () => {
        const [seconds, nanoseconds] = process.hrtime(startHrTime);
        const duration = seconds * 1000 + nanoseconds / 1000000; // milliseconds
        
        // Log slow requests
        if (duration > 1000) { // มากกว่า 1 วินาที
            Logger.error('Slow request detected', {
                method: req.method,
                url: req.originalUrl,
                duration: `${duration.toFixed(2)}ms`,
                statusCode: res.statusCode
            });
        }
        
        // Collect metrics
        collectMetric('response_time', duration, {
            method: req.method,
            route: req.route?.path || req.originalUrl,
            status_code: res.statusCode
        });
    });
    
    next();
};

// 2. Database Connection Monitoring
const monitorDatabaseHealth = async () => {
    const health = {
        mssql: { status: 'unknown', responseTime: null },
        mongodb: { status: 'unknown', responseTime: null }
    };
    
    // Test MS SQL
    try {
        const startTime = Date.now();
        const pool = getSqlPool();
        await pool.request().query('SELECT 1 as test');
        
        health.mssql = {
            status: 'healthy',
            responseTime: Date.now() - startTime
        };
    } catch (error) {
        health.mssql = {
            status: 'unhealthy',
            error: error.message
        };
    }
    
    // Test MongoDB
    try {
        const startTime = Date.now();
        await mongoose.connection.db.admin().ping();
        
        health.mongodb = {
            status: 'healthy',
            responseTime: Date.now() - startTime
        };
    } catch (error) {
        health.mongodb = {
            status: 'unhealthy',
            error: error.message
        };
    }
    
    return health;
};

// 3. Memory Usage Monitoring
const monitorMemoryUsage = () => {
    const usage = process.memoryUsage();
    
    const formatBytes = (bytes) => {
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    };
    
    Logger.info('Memory usage', {
        rss: formatBytes(usage.rss),           // Resident Set Size
        heapTotal: formatBytes(usage.heapTotal), // Total heap allocated
        heapUsed: formatBytes(usage.heapUsed),   // Heap actually used
        external: formatBytes(usage.external)    // External memory
    });
    
    // Warning ถ้าใช้ memory มาก
    if (usage.heapUsed > 500 * 1024 * 1024) { // 500MB
        Logger.error('High memory usage detected', {
            heapUsed: formatBytes(usage.heapUsed)
        });
    }
};

// 4. Health Check Endpoint
app.get('/health', async (req, res) => {
    try {
        const startTime = Date.now();
        
        const health = {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            databases: await monitorDatabaseHealth(),
            environment: process.env.NODE_ENV,
            version: process.env.npm_package_version || '1.0.0'
        };
        
        // ตรวจสอบสถานะรวม
        const allHealthy = Object.values(health.databases)
            .every(db => db.status === 'healthy');
        
        if (!allHealthy) {
            health.status = 'degraded';
        }
        
        const statusCode = health.status === 'ok' ? 200 : 503;
        
        Logger.performance('Health check', startTime);
        res.status(statusCode).json(health);
        
    } catch (error) {
        Logger.error('Health check failed', error);
        res.status(503).json({
            status: 'error',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// รัน monitoring เป็นระยะ
setInterval(() => {
    monitorMemoryUsage();
}, 60000); // ทุก 1 นาที
```

---

## 🎓 สรุปการเรียนรู้

### ✅ สิ่งสำคัญที่ต้องจำ

**1. Database Connection Patterns**
- MS SQL ใช้ Connection Pool สำหรับประสิทธิภาพ
- MongoDB ใช้ Mongoose สำหรับ ODM และ Schema validation
- เสมอใช้ environment variables สำหรับ sensitive data

**2. Security Best Practices**  
- ใช้ parameterized queries ป้องกัน SQL Injection
- Validate input ทุกครั้งก่อนประมวลผล
- ไม่เผย sensitive information ใน error messages

**3. Error Handling Strategy**
- จัดการ error ในทุกระดับ (connection, query, business logic)
- ใช้ consistent error response format
- Log error details สำหรับ debugging

**4. Performance Optimization**
- ใช้ async/await สำหรับ non-blocking operations  
- Implement connection pooling
- สร้าง database indexes สำหรับ frequently queried columns
- ใช้ parallel execution เมื่อเป็นไปได้

**5. Code Organization**
- แยก concerns ด้วย MVC pattern
- ใช้ middleware สำหรับ cross-cutting concerns
- สร้าง reusable helper functions
