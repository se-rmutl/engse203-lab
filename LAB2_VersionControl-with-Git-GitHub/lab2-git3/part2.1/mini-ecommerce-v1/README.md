# Mini E-commerce - Version 1 (มีปัญหา)

เว็บไซต์ร้านค้าออนไลน์แบบง่าย - เวอร์ชันที่มีปัญหาหลายอย่าง

## ปัญหาที่พบ

### 1. การจัดการข้อมูลสินค้าไม่มีประสิทธิภาพ
- ❌ ไม่มีการโหลดข้อมูลจาก JSON
- ❌ Hard-coded products ใน JavaScript
- ❌ ไม่มีการจัดการ state ที่ดี
- ❌ ไม่มี error handling

### 2. UI/UX ไม่ responsive
- ❌ Grid layout แบบ fixed columns
- ❌ ไม่มี breakpoints ที่ดี
- ❌ Navigation ไม่ทำงานบนมือถือ
- ❌ ไม่มี loading states

### 3. ไม่มีระบบจัดการ cart ที่ดี
- ❌ ไม่มี quantity controls
- ❌ Layout ไม่ใช้ CSS Grid
- ❌ ไม่มี cart summary ที่ครบถ้วน
- ❌ ไม่มี validation

### 4. ไม่มีการ validation ข้อมูล
- ❌ ไม่มี form validation
- ❌ ไม่มี input sanitization
- ❌ ไม่มี error messages
- ❌ ใช้ alert() แทน proper notifications

### 5. Performance ไม่ดี
- ❌ ไม่มี debouncing สำหรับ search
- ❌ ไม่มี lazy loading
- ❌ ไม่มี image optimization
- ❌ ไม่มี caching

## โครงสร้างไฟล์

```
mini-ecommerce-v1/
├── index.html
├── products.html
├── cart.html
├── about.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── data/
│   └── products.json
└── README.md
```

## วิธีใช้งาน

1. เปิดไฟล์ index.html ในเบราว์เซอร์
2. จะเห็นปัญหาต่างๆ ที่ต้องแก้ไข

## ปัญหาเฉพาะที่ต้องแก้ไข

### CSS Issues:
- Fixed grid columns
- ไม่มี responsive breakpoints
- ไม่มี loading animations
- ไม่มี proper form styling

### JavaScript Issues:
- ไม่ใช้ modern ES6+ features
- ไม่มี proper error handling
- ไม่มี debouncing
- ไม่มี proper state management
- ใช้ onclick แทน addEventListener

### HTML Issues:
- ไม่มี proper semantic structure
- ไม่มี loading states
- ไม่มี error states
- ไม่มี accessibility features

## License

MIT License

// .gitignore
# Node modules
node_modules/

# Logs
*.log

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/

# Build files
dist/
build/

# Temporary files
tmp/
temp/