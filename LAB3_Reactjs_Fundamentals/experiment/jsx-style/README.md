# React.js Fundamentals - คู่มือฝึกปฏิบัติ JSX แบบ Step-by-Step
## สำหรับนักศึกษาวิศวกรรมซอฟต์แวร์ ชั้นปีที่ 2

### 📋 Overview
ในสัปดาห์นี้เราจะเรียนรู้ React.js ตั้งแต่การติดตั้ง setup project จนถึงการ build และ deploy พร้อมการทดลอง run ในแต่ละขั้นตอนด้วย Hot Reload

---

## 🎯 Learning Objectives
หลังจากจบสัปดาห์นี้ นักศึกษาจะสามารถ:
- ติดตั้งและ setup React project ด้วย Vite
- เข้าใจโครงสร้างของ React application
- เขียน JSX syntax และสร้าง Components
- ใช้งาน Hot Reload ในการพัฒนา
- Build และ deploy React application
- Debug และ troubleshoot โปรเจ็กต์

---

## 🛠️ Pre-requisites & Setup

### ติดตั้ง Development Environment

```bash
# 1. ตรวจสอบ Node.js version (ต้อง >= 18.0.0)
node --version
npm --version

# 2. ติดตั้ง Node.js หากยังไม่มี (download จาก nodejs.org)

# 3. ติดตั้ง VS Code Extensions (แนะนำ)
# - ES7+ React/Redux/React-Native snippets
# - Bracket Pair Colorizer
# - Auto Rename Tag
# - Prettier - Code formatter
```

---

## 📚 เนื้อหาและการฝึกปฏิบัติ

### **Day 1: โครงสร้าง React และการสร้างโปรเจ็กต์แรก**

#### 🎓 ทฤษฎี: React Project Structure
React application ประกอบด้วยส่วนสำคัญ:
- **Components**: Building blocks ของ UI
- **JSX**: JavaScript XML syntax
- **Virtual DOM**: ระบบจัดการ DOM ที่มีประสิทธิภาพ
- **Hot Reload**: การอัพเดท UI แบบ real-time

#### 🛠️ Practice 1.1: สร้างโปรเจ็กต์แรก

```bash
# สร้างโปรเจ็กต์ใหม่ด้วย Vite (เร็วกว่า Create React App)
npm create vite@latest my-first-react-app -- --template react
cd my-first-react-app

# ติดตั้ง dependencies
npm install

# รันโปรเจ็กต์ (Hot Reload จะเริ่มทำงาน)
npm run dev
```

**ผลลัพธ์ที่ควรเห็น:**
```
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

#### 📁 โครงสร้างโปรเจ็กต์:
```
my-first-react-app/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx          # Main App Component
│   ├── index.css
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json
└── vite.config.js       # Vite configuration
```

#### 🧪 **ทดลองที่ 1**: แก้ไข App.jsx และดู Hot Reload

```jsx
// src/App.jsx - แก้ไขไฟล์นี้
import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🎉 สวัสดี React.js!</h1>
        <p>นี่คือแอปพลิเคชัน React แรกของฉัน</p>
        <p>ปัจจุบันเวลา: {new Date().toLocaleString('th-TH')}</p>
      </header>
    </div>
  )
}

export default App
```

**💡 ทดสอบ Hot Reload:**
1. บันทึกไฟล์ (Ctrl+S)
2. สังเกตเบราว์เซอร์จะอัพเดททันทีโดยไม่ต้อง refresh
3. ลองเปลี่ยนข้อความและดูผลลัพธ์

#### 🛠️ Practice 1.2: สร้าง Component แรก

```jsx
// src/components/Welcome.jsx - สร้างไฟล์ใหม่
import React from 'react'

function Welcome({ name, age, university }) {
  return (
    <div className="welcome-card">
      <h2>ยินดีต้อนรับ!</h2>
      <div className="user-info">
        <p><strong>ชื่อ:</strong> {name}</p>
        <p><strong>อายุ:</strong> {age} ปี</p>
        <p><strong>มหาวิทยาลัย:</strong> {university}</p>
        
        {/* JSX Conditional Rendering */}
        {age >= 18 ? (
          <span className="badge adult">🎓 นักศึกษา</span>
        ) : (
          <span className="badge minor">👶 เยาวชน</span>
        )}
      </div>
      
      {/* JSX List Rendering */}
      <div className="skills">
        <h4>ทักษะที่สนใจ:</h4>
        <ul>
          {['JavaScript', 'React', 'CSS', 'Node.js'].map((skill, index) => (
            <li key={index} className="skill-item">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Welcome
```

```jsx
// src/App.jsx - อัพเดทเพื่อใช้ Welcome component
import { useState } from 'react'
import Welcome from './components/Welcome'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🎉 React Components Demo</h1>
        
        {/* ใช้ Component พร้อม Props */}
        <Welcome 
          name="สมชาย ใจดี" 
          age={20} 
          university="มหาวิทยาลัยเทคโนโลยี"
        />
        
        <Welcome 
          name="สมหญิง รักเรียน" 
          age={19} 
          university="มหาวิทยาลัยเทคโนโลยี"
        />
      </header>
    </div>
  )
}

export default App
```

```css
/* src/App.css - เพิ่ม styles */
.welcome-card {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.welcome-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.user-info {
  text-align: left;
  margin: 15px 0;
}

.badge {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
}

.badge.adult {
  background: #10b981;
  color: white;
}

.badge.minor {
  background: #f59e0b;
  color: white;
}

.skills ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-item {
  background: #3b82f6;
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
}
```

#### 🧪 **ทดลองที่ 2**: Test Component Props
1. เปลี่ยนค่า props ใน App.jsx
2. เพิ่ม Welcome component ใหม่ด้วยข้อมูลต่างกัน
3. ดู Hot Reload อัพเดท UI ทันที

#### 📝 Exercise 1: สร้าง StudentCard Component
**เป้าหมาย**: สร้าง Component แสดงข้อมูลนักศึกษา

```jsx
// src/components/StudentCard.jsx
import React from 'react'

function StudentCard({ student }) {
  const { id, name, major, year, gpa, photo, hobbies } = student
  
  const getGradeColor = (gpa) => {
    if (gpa >= 3.5) return '#10b981' // เขียว
    if (gpa >= 3.0) return '#f59e0b' // เหลือง
    if (gpa >= 2.5) return '#ef4444' // แดง
    return '#6b7280' // เทา
  }

  return (
    <div className="student-card">
      <div className="photo-section">
        <img 
          src={photo || 'https://via.placeholder.com/100'} 
          alt={`${name} profile`}
          className="student-photo"
        />
      </div>
      
      <div className="info-section">
        <h3>{name}</h3>
        <p className="student-id">รหัส: {id}</p>
        <p className="major">{major}</p>
        <p className="year">ชั้นปีที่ {year}</p>
        
        <div className="gpa-section">
          <span>เกรดเฉลี่ย: </span>
          <span 
            className="gpa-value"
            style={{ color: getGradeColor(gpa) }}
          >
            {gpa.toFixed(2)}
          </span>
        </div>
        
        {hobbies && hobbies.length > 0 && (
          <div className="hobbies">
            <h4>งานอดิเรก:</h4>
            <div className="hobby-tags">
              {hobbies.map((hobby, index) => (
                <span key={index} className="hobby-tag">
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentCard
```

**🧪 การทดสอบ**: สร้างข้อมูลนักศึกษาหลายคนและแสดงใน App.jsx

---

### **Day 2: JSX Advanced และ Event Handling**

#### 🎓 ทฤษฎี: JSX Rules และ Best Practices
- JSX elements ต้องมี parent element เดียว
- ใช้ className แทน class
- Event handlers ใช้ camelCase
- Inline styles เป็น objects

#### 🛠️ Practice 2.1: Interactive Components

```jsx
// src/components/Counter.jsx
import React, { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)
  const [history, setHistory] = useState([0])

  const increment = () => {
    const newCount = count + step
    setCount(newCount)
    setHistory(prev => [...prev, newCount])
  }

  const decrement = () => {
    const newCount = count - step
    setCount(newCount)
    setHistory(prev => [...prev, newCount])
  }

  const reset = () => {
    setCount(0)
    setHistory([0])
  }

  const handleStepChange = (e) => {
    const value = parseInt(e.target.value) || 1
    setStep(value)
  }

  // Event handlers for keyboard
  const handleKeyPress = (e) => {
    switch(e.key) {
      case 'ArrowUp':
        increment()
        break
      case 'ArrowDown':
        decrement()
        break
      case 'Enter':
        reset()
        break
      default:
        break
    }
  }

  return (
    <div 
      className="counter-widget"
      onKeyDown={handleKeyPress}
      tabIndex={0}
      style={{ outline: 'none' }}
    >
      <h2>🔢 เครื่องนับอัจฉริยะ</h2>
      
      <div className="counter-display">
        <span className="count-value">{count}</span>
      </div>

      <div className="step-control">
        <label htmlFor="step-input">ขั้น: </label>
        <input
          id="step-input"
          type="number"
          value={step}
          onChange={handleStepChange}
          min="1"
          max="100"
          className="step-input"
        />
      </div>

      <div className="button-group">
        <button 
          onClick={decrement}
          className="btn btn-decrement"
          disabled={count <= 0 && step > 0}
        >
          ➖ ลด {step}
        </button>
        
        <button 
          onClick={reset}
          className="btn btn-reset"
        >
          🔄 รีเซ็ต
        </button>
        
        <button 
          onClick={increment}
          className="btn btn-increment"
        >
          ➕ เพิ่ม {step}
        </button>
      </div>

      <div className="keyboard-help">
        <small>💡 ใช้ ↑↓ เพื่อเปลี่ยนค่า, Enter เพื่อรีเซ็ต</small>
      </div>

      <div className="history">
        <h4>ประวัติการเปลี่ยนแปลง:</h4>
        <div className="history-values">
          {history.slice(-10).map((value, index) => (
            <span key={index} className="history-item">
              {value}
            </span>
          ))}
          {history.length > 10 && <span>...</span>}
        </div>
      </div>
    </div>
  )
}

export default Counter
```

#### 🧪 **ทดลองที่ 3**: Interactive Counter
1. รัน `npm run dev`
2. เพิ่ม Counter component ใน App.jsx
3. ทดสอบ:
   - คลิกปุ่มต่างๆ
   - เปลี่ยนค่า step
   - ใช้ keyboard controls
   - สังเกต Hot Reload เมื่อแก้โค้ด

#### 🛠️ Practice 2.2: Form Handling

```jsx
// src/components/StudentForm.jsx
import React, { useState } from 'react'

function StudentForm({ onStudentAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    major: '',
    year: 1,
    gpa: 0.0,
    hobbies: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const majors = [
    'วิศวกรรมซอฟต์แวร์',
    'วิศวกรรมคอมพิวเตอร์', 
    'เทคโนโลยีสารสนเทศ',
    'วิทยาการคอมพิวเตอร์'
  ]

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }))

    // Clear error เมื่อ user เริ่มแก้ไข
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'กรุณากรอกชื่อ-นามสกุล'
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'กรุณากรอกรหัสนักศึกษา'
    } else if (!/^\d{8}$/.test(formData.studentId)) {
      newErrors.studentId = 'รหัสนักศึกษาต้องเป็นตัวเลข 8 หลัก'
    }

    if (!formData.major) {
      newErrors.major = 'กรุณาเลือกสาขาวิชา'
    }

    if (formData.gpa < 0 || formData.gpa > 4) {
      newErrors.gpa = 'เกรดเฉลี่ยต้องอยู่ระหว่าง 0.00-4.00'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // จำลองการส่งข้อมูลไปเซิร์ฟเวอร์
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const studentData = {
        ...formData,
        id: Date.now(), // สร้าง ID แบบง่ายๆ
        hobbies: formData.hobbies ? formData.hobbies.split(',').map(h => h.trim()) : []
      }

      onStudentAdd && onStudentAdd(studentData)
      
      // Reset form
      setFormData({
        name: '',
        studentId: '',
        major: '',
        year: 1,
        gpa: 0.0,
        hobbies: ''
      })

      alert('✅ บันทึกข้อมูลเรียบร้อย!')
      
    } catch (error) {
      alert('❌ เกิดข้อผิดพลาด: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="student-form">
      <h2>📝 ลงทะเบียนข้อมูลนักศึกษา</h2>
      
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">ชื่อ-นามสกุล *</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={errors.name ? 'error' : ''}
            placeholder="เช่น นายสมชาย ใจดี"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="studentId">รหัสนักศึกษา *</label>
          <input
            id="studentId"
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            className={errors.studentId ? 'error' : ''}
            placeholder="12345678"
            maxLength={8}
          />
          {errors.studentId && <span className="error-message">{errors.studentId}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="major">สาขาวิชา *</label>
          <select
            id="major"
            name="major"
            value={formData.major}
            onChange={handleInputChange}
            className={errors.major ? 'error' : ''}
          >
            <option value="">-- เลือกสาขาวิชา --</option>
            {majors.map(major => (
              <option key={major} value={major}>{major}</option>
            ))}
          </select>
          {errors.major && <span className="error-message">{errors.major}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="year">ชั้นปี</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
            >
              <option value={1}>ปี 1</option>
              <option value={2}>ปี 2</option>
              <option value={3}>ปี 3</option>
              <option value={4}>ปี 4</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="gpa">เกรดเฉลี่ย</label>
            <input
              id="gpa"
              type="number"
              name="gpa"
              value={formData.gpa}
              onChange={handleInputChange}
              min="0"
              max="4"
              step="0.01"
              className={errors.gpa ? 'error' : ''}
            />
            {errors.gpa && <span className="error-message">{errors.gpa}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="hobbies">งานอดิเรก</label>
          <input
            id="hobbies"
            type="text"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleInputChange}
            placeholder="เช่น อ่านหนังสือ, เล่นเกม, ฟังเพลง (คั่นด้วยเครื่องหมายจุลภาค)"
          />
          <small>แยกแต่ละงานอดิเรกด้วยเครื่องหมายจุลภาค (,)</small>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            {isSubmitting ? '⏳ กำลังบันทึก...' : '💾 บันทึกข้อมูล'}
          </button>
        </div>
      </form>

      {/* Live Preview */}
      <div className="form-preview">
        <h3>ตัวอย่างข้อมูล:</h3>
        <pre className="preview-data">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default StudentForm
```

#### 🧪 **ทดลองที่ 4**: Form Validation
1. เพิ่ม StudentForm ใน App.jsx
2. ทดสอบ validation แต่ละ field
3. ดู live preview การเปลี่ยนแปลงข้อมูล
4. ทดลองส่งข้อมูลและสังเกต loading state

---
