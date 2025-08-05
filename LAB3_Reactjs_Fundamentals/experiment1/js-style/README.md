# React.js Fundamentals - คู่มือฝึกปฏิบัติ
## สำหรับนักศึกษาวิศวกรรมซอฟต์แวร์ ชั้นปีที่ 2

### 📋 Overview
ในสัปดาห์นี้เราจะเรียนรู้พื้นฐาน React.js ตั้งแต่การสร้าง Component พื้นฐานไปจนถึงการจัดการ State และ Event Handling พร้อมสร้างโปรเจ็กต์เล็กๆ เพื่อรวมทุกเนื้อหาเข้าด้วยกัน

---

## 🎯 Learning Objectives
หลังจากจบสัปดาห์นี้ นักศึกษาจะสามารถ:
- เข้าใจและเขียน JSX syntax ได้อย่างถูกต้อง
- สร้างและใช้งาน React Components
- จัดการ State และ Props ในแอปพลิเคชัน
- ใช้งาน React Hooks พื้นฐาน (useState, useEffect, useContext)
- Handle Events ใน React อย่างเหมาะสม
- ออกแบบ Component patterns ที่มีประสิทธิภาพ

---

## 📚 เนื้อหาและการฝึกปฏิบัติ

### **Day 1: React Components และ JSX Syntax**

## 🚀 Initial Setup & Complete Starter Code

### Step 1: Create Project

```bash
# สร้างโปรเจค
npm create vite@latest lab3-experiment -- --template react
cd lab3-experiment
npm install

# run first time 
npm run dev
```


#### 🎓 ทฤษฎี: JSX และ Components
JSX (JavaScript XML) เป็น syntax extension ของ JavaScript ที่ช่วยให้เราเขียน UI ได้อย่างง่ายดาย คล้ายกับ HTML แต่มีพลังของ JavaScript

**Key Points:**
- JSX คือการรวม HTML กับ JavaScript
- Component คือ building block ของ React app
- Component สามารถเป็น Function หรือ Class
- Modern React แนะนำใช้ Function Components

#### 🛠️ Practice 1.1: สร้าง Component แรก

```jsx
// App.js
import React from 'react';

// Function Component
function Welcome() {
  return (
    <div>
      <h1>Welcome to React!</h1>
      <p>This is my first React component</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Welcome />
    </div>
  );
}

export default App;
```

#### 🛠️ Practice 1.2: JSX Rules และ Best Practices

```jsx
// UserCard.js
import React from 'react';

function UserCard() {
  const user = {
    name: "สมชาย ใจดี",
    age: 20,
    university: "มหาวิทยาลัยเทคโนโลยี"
  };

  return (
    <div className="user-card">
      {/* JSX Comment */}
      <h2>{user.name}</h2>
      <p>อายุ: {user.age} ปี</p>
      <p>จาก: {user.university}</p>
      
      {/* Conditional Rendering */}
      {user.age >= 18 && <span className="adult-badge">ผู้ใหญ่</span>}
      
      {/* List Rendering */}
      <div className="skills">
        <h3>ทักษะ:</h3>
        <ul>
          {['JavaScript', 'React', 'CSS'].map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserCard;
```

#### 📝 Exercise 1: สร้าง ProfileCard Component
สร้าง Component ที่แสดงข้อมูลโปรไฟล์ของตัวเอง ประกอบด้วย:
- รูปภาพ (ใช้ placeholder ได้)
- ชื่อ-นามสกุล
- สาขาวิชา
- ปีการศึกษา
- งานอดิเรก (แสดงเป็น list)

---

### **Day 2: Props - การส่งข้อมูลระหว่าง Components**

#### 🎓 ทฤษฎี: Props
Props (Properties) เป็นวิธีการส่งข้อมูลจาก Parent Component ไปยัง Child Component

**Key Points:**
- Props เป็น read-only
- ใช้สำหรับทำให้ Component reusable
- สามารถส่งได้ทั้ง primitive values และ objects
- รองรับ default props และ prop validation

#### 🛠️ Practice 2.1: Basic Props

```jsx
// StudentCard.js
import React from 'react';

function StudentCard({ name, studentId, major, year, gpa }) {
  return (
    <div className="student-card">
      <h3>{name}</h3>
      <div className="student-info">
        <p><strong>รหัสนักศึกษา:</strong> {studentId}</p>
        <p><strong>สาขา:</strong> {major}</p>
        <p><strong>ชั้นปี:</strong> {year}</p>
        <p><strong>เกรดเฉลี่ย:</strong> {gpa}</p>
        
        {/* Conditional styling based on GPA */}
        <div className={`grade-status ${gpa >= 3.0 ? 'good' : 'needs-improvement'}`}>
          {gpa >= 3.0 ? '🎉 เกรดดี' : '📚 ต้องพยายามเพิ่ม'}
        </div>
      </div>
    </div>
  );
}

// Default Props
StudentCard.defaultProps = {
  gpa: 0.0,
  year: 1
};

export default StudentCard;
```

#### 🛠️ Practice 2.2: Props with Objects และ Functions

```jsx
// CourseList.js
import React from 'react';

function CourseItem({ course, onEnroll }) {
  return (
    <div className="course-item">
      <h4>{course.name}</h4>
      <p>{course.description}</p>
      <div className="course-details">
        <span>เครดิต: {course.credits}</span>
        <span>อาจารย์: {course.instructor}</span>
      </div>
      <button onClick={() => onEnroll(course.id)} className="enroll-btn">
        ลงทะเบียน
      </button>
    </div>
  );
}

function CourseList({ courses, onCourseEnroll }) {
  return (
    <div className="course-list">
      <h2>รายวิชาที่เปิดสอน</h2>
      {courses.map(course => (
        <CourseItem 
          key={course.id} 
          course={course} 
          onEnroll={onCourseEnroll}
        />
      ))}
    </div>
  );
}

// Usage in App.js
function App() {
  const courses = [
    {
      id: 1,
      name: "Software Engineering",
      description: "หลักการพัฒนาซอฟต์แวร์",
      credits: 3,
      instructor: "อ.สมหญิง"
    },
    {
      id: 2,
      name: "Database Systems",
      description: "ระบบฐานข้อมูล",
      credits: 3,
      instructor: "อ.สมศักดิ์"
    }
  ];

  const handleCourseEnroll = (courseId) => {
    alert(`ลงทะเบียนวิชารหัส ${courseId} เรียบร้อย!`);
  };

  return (
    <CourseList courses={courses} onCourseEnroll={handleCourseEnroll} />
  );
}
```

#### 📝 Exercise 2: Product Catalog
สร้าง Component hierarchy สำหรับแสดงสินค้า:
- `ProductCatalog` (Parent)
- `ProductCard` (Child)
- แสดงรายการสินค้าพร้อมรูป, ชื่อ, ราคา, และปุ่ม "เพิ่มในตะกร้า"

---

### **Day 3: State Management และ useState Hook**

#### 🎓 ทฤษฎี: State และ useState
State เป็นข้อมูลที่เปลี่ยนแปลงได้ใน Component และจะทำให้ Component re-render เมื่อมีการเปลี่ยนแปลง

**Key Points:**
- State เป็น local data ของ Component
- ใช้ useState Hook ใน Function Components
- State updates เป็น asynchronous
- อย่า mutate state โดยตรง

#### 🛠️ Practice 3.1: Basic useState

```jsx
// Counter.js
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => {
    setCount(count + step);
  };

  const decrement = () => {
    setCount(count - step);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter">
      <h2>เครื่องนับ</h2>
      <div className="count-display">
        <span className="count-value">{count}</span>
      </div>
      
      <div className="step-control">
        <label>ขั้น: </label>
        <input 
          type="number" 
          value={step} 
          onChange={(e) => setStep(parseInt(e.target.value) || 1)}
          min="1"
        />
      </div>
      
      <div className="buttons">
        <button onClick={decrement}>- ลด</button>
        <button onClick={reset}>รีเซ็ต</button>
        <button onClick={increment}>+ เพิ่ม</button>
      </div>
    </div>
  );
}

export default Counter;
```

#### 🛠️ Practice 3.2: Complex State with Objects

```jsx
// StudentForm.js
import React, { useState } from 'react';

function StudentForm() {
  const [student, setStudent] = useState({
    name: '',
    studentId: '',
    major: '',
    year: 1,
    gpa: 0.0
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!student.name.trim()) newErrors.name = 'กรุณากรอกชื่อ';
    if (!student.studentId.trim()) newErrors.studentId = 'กรุณากรอกรหัสนักศึกษา';
    if (!student.major.trim()) newErrors.major = 'กรุณาเลือกสาขา';
    if (student.gpa < 0 || student.gpa > 4) newErrors.gpa = 'เกรดเฉลี่ยต้องอยู่ระหว่าง 0-4';
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Student Data:', student);
      alert('บันทึกข้อมูลเรียบร้อย!');
      // Reset form
      setStudent({
        name: '',
        studentId: '',
        major: '',
        year: 1,
        gpa: 0.0
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="student-form">
      <h2>ลงทะเบียนข้อมูลนักศึกษา</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ชื่อ-นามสกุล:</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleInputChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>รหัสนักศึกษา:</label>
          <input
            type="text"
            name="studentId"
            value={student.studentId}
            onChange={handleInputChange}
            className={errors.studentId ? 'error' : ''}
          />
          {errors.studentId && <span className="error-message">{errors.studentId}</span>}
        </div>

        <div className="form-group">
          <label>สาขา:</label>
          <select
            name="major"
            value={student.major}
            onChange={handleInputChange}
            className={errors.major ? 'error' : ''}
          >
            <option value="">เลือกสาขา</option>
            <option value="วิศวกรรมซอฟต์แวร์">วิศวกรรมซอฟต์แวร์</option>
            <option value="วิศวกรรมคอมพิวเตอร์">วิศวกรรมคอมพิวเตอร์</option>
            <option value="เทคโนโลยีสารสนเทศ">เทคโนโลยีสารสนเทศ</option>
          </select>
          {errors.major && <span className="error-message">{errors.major}</span>}
        </div>

        <div className="form-group">
          <label>ชั้นปี:</label>
          <select
            name="year"
            value={student.year}
            onChange={handleInputChange}
          >
            <option value={1}>ปี 1</option>
            <option value={2}>ปี 2</option>
            <option value={3}>ปี 3</option>
            <option value={4}>ปี 4</option>
          </select>
        </div>

        <div className="form-group">
          <label>เกรดเฉลี่ย:</label>
          <input
            type="number"
            name="gpa"
            value={student.gpa}
            onChange={handleInputChange}
            min="0"
            max="4"
            step="0.01"
            className={errors.gpa ? 'error' : ''}
          />
          {errors.gpa && <span className="error-message">{errors.gpa}</span>}
        </div>

        <button type="submit" className="submit-btn">บันทึกข้อมูล</button>
      </form>
      
      {/* Preview */}
      <div className="preview">
        <h3>ตัวอย่างข้อมูล:</h3>
        <pre>{JSON.stringify(student, null, 2)}</pre>
      </div>
    </div>
  );
}

export default StudentForm;
```

#### 📝 Exercise 3: Todo List
สร้าง Todo List application ที่มีความสามารถ:
- เพิ่ม task ใหม่
- ทำเครื่องหมาย task ว่าเสร็จแล้ว
- ลบ task
- แสดงจำนวน task ที่เหลือ

---

### **Day 4: useEffect Hook และ Side Effects**

#### 🎓 ทฤษฎี: useEffect
useEffect ใช้สำหรับจัดการ side effects เช่น API calls, subscriptions, หรือการเปลี่ยนแปลง DOM

**Key Points:**
- ทำงานหลังจาก render เสร็จ
- สามารถมี dependency array
- รองรับ cleanup function
- แทนที่ lifecycle methods ใน Class Components

#### 🛠️ Practice 4.1: Basic useEffect

```jsx
// Timer.js
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    
    // Cleanup function
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <h2>เครื่องจับเวลา</h2>
      <div className="time-display">
        {formatTime(seconds)}
      </div>
      <div className="timer-controls">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'หยุด' : 'เริ่ม'}
        </button>
        <button onClick={reset}>รีเซ็ต</button>
      </div>
    </div>
  );
}

export default Timer;
```

#### 🛠️ Practice 4.2: Data Fetching with useEffect

```jsx
// WeatherApp.js
import React, { useState, useEffect } from 'react';

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Bangkok');

  // Simulated weather API call
  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock weather data
      const mockWeatherData = {
        Bangkok: { temp: 32, condition: 'Sunny', humidity: 75 },
        'Chiang Mai': { temp: 28, condition: 'Cloudy', humidity: 68 },
        Phuket: { temp: 30, condition: 'Rainy', humidity: 85 }
      };
      
      const data = mockWeatherData[cityName];
      if (data) {
        setWeather({
          city: cityName,
          temperature: data.temp,
          condition: data.condition,
          humidity: data.humidity
        });
      } else {
        throw new Error('ไม่พบข้อมูลสภาพอากาศของเมืองนี้');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  if (loading) {
    return (
      <div className="weather-app loading">
        <h2>กำลังโหลดข้อมูลสภาพอากาศ...</h2>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-app error">
        <h2>เกิดข้อผิดพลาด</h2>
        <p>{error}</p>
        <button onClick={() => fetchWeather(city)}>ลองใหม่</button>
      </div>
    );
  }

  return (
    <div className="weather-app">
      <h2>สภาพอากาศ</h2>
      
      <div className="city-selector">
        <label>เลือกเมือง: </label>
        <select value={city} onChange={handleCityChange}>
          <option value="Bangkok">กรุงเทพฯ</option>
          <option value="Chiang Mai">เชียงใหม่</option>
          <option value="Phuket">ภูเก็ต</option>
        </select>
      </div>

      {weather && (
        <div className="weather-info">
          <h3>{weather.city}</h3>
          <div className="temperature">{weather.temperature}°C</div>
          <div className="condition">{weather.condition}</div>
          <div className="humidity">ความชื้น: {weather.humidity}%</div>
        </div>
      )}
      
      <button onClick={() => fetchWeather(city)} className="refresh-btn">
        รีเฟรช
      </button>
    </div>
  );
}

export default WeatherApp;
```

#### 📝 Exercise 4: User Profile Dashboard
สร้าง Dashboard ที่:
- โหลดข้อมูล user จาก mock API
- แสดง loading state
- Handle error states
- มีการ refresh ข้อมูล

---

### **Day 5: useContext Hook และ Event Handling**

#### 🎓 ทฤษฎี: useContext และ Event Handling
useContext ช่วยในการแชร์ state ระหว่าง Components โดยไม่ต้องส่ง props ลงไปทีละชั้น

#### 🛠️ Practice 5.1: Theme Context

```jsx
// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
```

```jsx
// ThemedComponent.js
import React from 'react';
import { useTheme } from './ThemeContext';

function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={`header ${theme}`}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'} Switch to {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </header>
  );
}

function MainContent() {
  const { theme } = useTheme();
  
  return (
    <main className={`main-content ${theme}`}>
      <h2>Welcome to our app!</h2>
      <p>Current theme: {theme}</p>
    </main>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <MainContent />
      </div>
    </ThemeProvider>
  );
}
```

#### 🛠️ Practice 5.2: Advanced Event Handling

```jsx
// InteractiveCard.js
import React, { useState, useRef } from 'react';

function InteractiveCard() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const cardRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    setPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  const handleDoubleClick = () => {
    setPosition({ x: 0, y: 0 });
    setClickCount(0);
  };

  const handleKeyDown = (e) => {
    const step = 10;
    switch(e.key) {
      case 'ArrowUp':
        setPosition(prev => ({ ...prev, y: prev.y - step }));
        break;
      case 'ArrowDown':
        setPosition(prev => ({ ...prev, y: prev.y + step }));
        break;
      case 'ArrowLeft':
        setPosition(prev => ({ ...prev, x: prev.x - step }));
        break;
      case 'ArrowRight':
        setPosition(prev => ({ ...prev, x: prev.x + step }));
        break;
      case 'Enter':
        handleClick();
        break;
      default:
        break;
    }
  };

  return (
    <div 
      className="interactive-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={cardRef}
        className={`interactive-card ${isDragging ? 'dragging' : ''}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <h3>Interactive Card</h3>
        <p>คลิก: {clickCount} ครั้ง</p>
        <p>ตำแหน่ง: ({Math.round(position.x)}, {Math.round(position.y)})</p>
        <div className="instructions">
          <p>🖱️ ลากเพื่อย้าย</p>
          <p>👆 คลิกเพื่อนับ</p>
          <p>👆👆 ดับเบิลคลิกเพื่อรีเซ็ต</p>
          <p>⌨️ ใช้ลูกศรเพื่อย้าย</p>
        </div>
      </div>
    </div>
  );
}

export default InteractiveCard;
```

#### 📝 Exercise 5: Shopping Cart Context
สร้าง Shopping Cart ที่ใช้ Context เพื่อ:
- เพิ่ม/ลดสินค้าในตะกร้า
- คำนวณราคารวม
- แสดงจำนวนสินค้าใน header

---

## 🎯 Final Project: Student Course Management System

### Project Overview
สร้างระบบจัดการรายวิชาสำหรับนักศึกษา ที่รวมทุกเนื้อหาที่เรียนมา

### Features Required:
1. **Student Profile Management**
   - แสดงและแก้ไขข้อมูลนักศึกษา
   - ใช้ useState สำหรับจัดการ form

2. **Course Catalog**
   - แสดงรายการวิชาที่เปิดสอน
   - กรองตามภาคเรียน/ปีการศึกษา
   - ใช้ Props สำหรับส่งข้อมูล

3. **Enrollment System**
   - ลงทะเบียนเรียน/ถอนวิชา
   - ตรวจสอบเงื่อนไขการลงทะเบียน
   - ใช้ useContext สำหรับ global state

4. **Grade Tracking**
   - แสดงเกรดรายวิชา
   - คำนวณเกรดเฉลี่ย
   - ใช้ useEffect สำหรับการคำนวณ

5. **Theme & UI Controls**
   - เปลี่ยน theme (light/dark)
   - Responsive design
   - Event handling ที่หลากหลาย

### Project Structure:
```
src/
├── components/
│   ├── StudentProfile.js
│   ├── CourseCard.js
│   ├── CourseCatalog.js
│   ├── EnrollmentForm.js
│   └── GradeTracker.js
├── contexts/
│   ├── StudentContext.js
│   ├── CourseContext.js
│   └── ThemeContext.js
├── utils/
│   └── gradeCalculator.js
├── styles/
│   └── App.css
└── App.js
```

### Implementation Guide:

#### Step 1: Setup Context Providers

```jsx
// contexts/StudentContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentContext = createContext();

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within StudentProvider');
  }
  return context;
};

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState({
    id: '64001234',
    name: '',
    major: 'วิศวกรรมซอฟต์แวร์',
    year: 2,
    gpa: 0.0,
    enrolledCourses: [],
    completedCourses: []
  });

  const [courses, setCourses] = useState([
    {
      id: 'CS201',
      name: 'Data Structures and Algorithms',
      credits: 3,
      semester: 1,
      year: 2025,
      instructor: 'อ.ดร.สมชาย ใจดี',
      maxStudents: 40,
      enrolled: 25,
      prerequisites: ['CS101'],
      description: 'ศึกษาโครงสร้างข้อมูลและอัลกอริทึมพื้นฐาน'
    },
    {
      id: 'CS202',
      name: 'Object-Oriented Programming',
      credits: 3,
      semester: 1,
      year: 2025,
      instructor: 'อ.ดร.สมหญิง รักเรียน',
      maxStudents: 35,
      enrolled: 30,
      prerequisites: ['CS101'],
      description: 'หลักการเขียนโปรแกรมเชิงวัตถุ'
    },
    {
      id: 'CS203',
      name: 'Database Systems',
      credits: 3,
      semester: 1,
      year: 2025,
      instructor: 'อ.ดร.สมศักดิ์ วิชาการ',
      maxStudents: 45,
      enrolled: 20,
      prerequisites: [],
      description: 'ระบบฐานข้อมูลและการออกแบบ'
    }
  ]);

  const updateStudent = (updates) => {
    setStudent(prev => ({ ...prev, ...updates }));
  };

  const enrollCourse = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return { success: false, message: 'ไม่พบรายวิชานี้' };
    
    if (student.enrolledCourses.includes(courseId)) {
      return { success: false, message: 'ลงทะเบียนวิชานี้แล้ว' };
    }
    
    if (course.enrolled >= course.maxStudents) {
      return { success: false, message: 'รายวิชาเต็มแล้ว' };
    }

    setStudent(prev => ({
      ...prev,
      enrolledCourses: [...prev.enrolledCourses, courseId]
    }));

    setCourses(prev => prev.map(c => 
      c.id === courseId ? { ...c, enrolled: c.enrolled + 1 } : c
    ));

    return { success: true, message: 'ลงทะเบียนสำเร็จ' };
  };

  const withdrawCourse = (courseId) => {
    setStudent(prev => ({
      ...prev,
      enrolledCourses: prev.enrolledCourses.filter(id => id !== courseId)
    }));

    setCourses(prev => prev.map(c => 
      c.id === courseId ? { ...c, enrolled: Math.max(0, c.enrolled - 1) } : c
    ));

    return { success: true, message: 'ถอนรายวิชาสำเร็จ' };
  };

  const value = {
    student,
    courses,
    updateStudent,
    enrollCourse,
    withdrawCourse
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};
```

#### Step 2: Student Profile Component

```jsx
// components/StudentProfile.js
import React, { useState } from 'react';
import { useStudent } from '../contexts/StudentContext';

function StudentProfile() {
  const { student, updateStudent } = useStudent();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: student.name,
    major: student.major,
    year: student.year
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStudent(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: student.name,
      major: student.major,
      year: student.year
    });
    setIsEditing(false);
  };

  return (
    <div className="student-profile">
      <div className="profile-header">
        <h2>ข้อมูลนักศึกษา</h2>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="edit-btn">
            ✏️ แก้ไข
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>ชื่อ-นามสกุล:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>สาขา:</label>
            <select
              name="major"
              value={formData.major}
              onChange={handleInputChange}
            >
              <option value="วิศวกรรมซอฟต์แวร์">วิศวกรรมซอฟต์แวร์</option>
              <option value="วิศวกรรมคอมพิวเตอร์">วิศวกรรมคอมพิวเตอร์</option>
              <option value="เทคโนโลยีสารสนเทศ">เทคโนโลยีสารสนเทศ</option>
            </select>
          </div>

          <div className="form-group">
            <label>ชั้นปี:</label>
            <select
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

          <div className="form-actions">
            <button type="submit" className="save-btn">บันทึก</button>
            <button type="button" onClick={handleCancel} className="cancel-btn">
              ยกเลิก
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-display">
          <div className="profile-info">
            <div className="info-item">
              <span className="label">รหัสนักศึกษา:</span>
              <span className="value">{student.id}</span>
            </div>
            <div className="info-item">
              <span className="label">ชื่อ-นามสกุล:</span>
              <span className="value">{student.name || 'ยังไม่ได้กรอก'}</span>
            </div>
            <div className="info-item">
              <span className="label">สาขา:</span>
              <span className="value">{student.major}</span>
            </div>
            <div className="info-item">
              <span className="label">ชั้นปี:</span>
              <span className="value">ปี {student.year}</span>
            </div>
            <div className="info-item">
              <span className="label">เกรดเฉลี่ย:</span>
              <span className="value gpa">{student.gpa.toFixed(2)}</span>
            </div>
          </div>

          <div className="enrollment-summary">
            <h3>สรุปการลงทะเบียน</h3>
            <div className="summary-stats">
              <div className="stat">
                <span className="stat-number">{student.enrolledCourses.length}</span>
                <span className="stat-label">วิชาที่ลงทะเบียน</span>
              </div>
              <div className="stat">
                <span className="stat-number">{student.completedCourses.length}</span>
                <span className="stat-label">วิชาที่เรียนจบ</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentProfile;
```

#### Step 3: Course Catalog Component

```jsx
// components/CourseCatalog.js
import React, { useState, useEffect } from 'react';
import { useStudent } from '../contexts/StudentContext';
import CourseCard from './CourseCard';

function CourseCatalog() {
  const { courses, student, enrollCourse, withdrawCourse } = useStudent();
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [filters, setFilters] = useState({
    semester: 'all',
    year: 'all',
    enrolled: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let filtered = courses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by semester
    if (filters.semester !== 'all') {
      filtered = filtered.filter(course =>
        course.semester === parseInt(filters.semester)
      );
    }

    // Filter by year
    if (filters.year !== 'all') {
      filtered = filtered.filter(course =>
        course.year === parseInt(filters.year)
      );
    }

    // Filter by enrollment status
    if (filters.enrolled === 'enrolled') {
      filtered = filtered.filter(course =>
        student.enrolledCourses.includes(course.id)
      );
    } else if (filters.enrolled === 'available') {
      filtered = filtered.filter(course =>
        !student.enrolledCourses.includes(course.id)
      );
    }

    setFilteredCourses(filtered);
  }, [courses, filters, searchTerm, student.enrolledCourses]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEnrollment = async (courseId, action) => {
    const result = action === 'enroll' ? 
      enrollCourse(courseId) : 
      withdrawCourse(courseId);
    
    // You could add a toast notification here
    console.log(result.message);
  };

  return (
    <div className="course-catalog">
      <div className="catalog-header">
        <h2>รายวิชาที่เปิดสอน</h2>
        
        <div className="search-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="ค้นหารายวิชา..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters">
            <select
              name="semester"
              value={filters.semester}
              onChange={handleFilterChange}
            >
              <option value="all">ภาคเรียนทั้งหมด</option>
              <option value="1">ภาคเรียนที่ 1</option>
              <option value="2">ภาคเรียนที่ 2</option>
            </select>

            <select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
            >
              <option value="all">ปีการศึกษาทั้งหมด</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>

            <select
              name="enrolled"
              value={filters.enrolled}
              onChange={handleFilterChange}
            >
              <option value="all">ทั้งหมด</option>
              <option value="enrolled">ลงทะเบียนแล้ว</option>
              <option value="available">ยังไม่ลงทะเบียน</option>
            </select>
          </div>
        </div>
      </div>

      <div className="course-stats">
        <div className="stat">
          <span className="stat-number">{filteredCourses.length}</span>
          <span className="stat-label">รายวิชาที่แสดง</span>
        </div>
        <div className="stat">
          <span className="stat-number">{student.enrolledCourses.length}</span>
          <span className="stat-label">ลงทะเบียนแล้ว</span>
        </div>
      </div>

      <div className="course-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={student.enrolledCourses.includes(course.id)}
              onEnrollment={handleEnrollment}
            />
          ))
        ) : (
          <div className="no-courses">
            <p>ไม่พบรายวิชาที่ตรงกับเงื่อนไขการค้นหา</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCatalog;
```

#### Step 4: Course Card Component

```jsx
// components/CourseCard.js
import React, { useState } from 'react';

function CourseCard({ course, isEnrolled, onEnrollment }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleEnrollmentAction = async (action) => {
    setIsLoading(true);
    await onEnrollment(course.id, action);
    setIsLoading(false);
  };

  const getAvailabilityStatus = () => {
    const available = course.maxStudents - course.enrolled;
    if (available === 0) return { status: 'full', text: 'เต็มแล้ว', color: 'red' };
    if (available <= 5) return { status: 'limited', text: `เหลือ ${available} ที่`, color: 'orange' };
    return { status: 'available', text: `ว่าง ${available} ที่`, color: 'green' };
  };

  const availability = getAvailabilityStatus();

  return (
    <div className={`course-card ${isEnrolled ? 'enrolled' : ''}`}>
      <div className="course-header">
        <div className="course-code">{course.id}</div>
        <div className={`availability ${availability.status}`}>
          {availability.text}
        </div>
      </div>

      <div className="course-info">
        <h3 className="course-name">{course.name}</h3>
        <p className="course-description">{course.description}</p>
        
        <div className="course-details">
          <div className="detail-item">
            <span className="label">อาจารย์:</span>
            <span className="value">{course.instructor}</span>
          </div>
          <div className="detail-item">
            <span className="label">หน่วยกิต:</span>
            <span className="value">{course.credits}</span>
          </div>
          <div className="detail-item">
            <span className="label">ภาคเรียน:</span>
            <span className="value">{course.semester}/{course.year}</span>
          </div>
          <div className="detail-item">
            <span className="label">นักศึกษา:</span>
            <span className="value">{course.enrolled}/{course.maxStudents}</span>
          </div>
        </div>

        {course.prerequisites.length > 0 && (
          <div className="prerequisites">
            <span className="label">วิชาบังคับก่อน:</span>
            <div className="prereq-list">
              {course.prerequisites.map(prereq => (
                <span key={prereq} className="prereq-item">{prereq}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="course-actions">
        {isEnrolled ? (
          <button
            onClick={() => handleEnrollmentAction('withdraw')}
            disabled={isLoading}
            className="withdraw-btn"
          >
            {isLoading ? '⏳ กำลังประมวลผล...' : '🗑️ ถอนรายวิชา'}
          </button>
        ) : (
          <button
            onClick={() => handleEnrollmentAction('enroll')}
            disabled={isLoading || availability.status === 'full'}
            className="enroll-btn"
          >
            {isLoading ? '⏳ กำลังประมวลผล...' : 
             availability.status === 'full' ? '❌ เต็มแล้ว' : '✅ ลงทะเบียน'}
          </button>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
```

#### Step 5: Main App Component

```jsx
// App.js
import React from 'react';
import { StudentProvider } from './contexts/StudentContext';
import { ThemeProvider } from './contexts/ThemeContext';
import StudentProfile from './components/StudentProfile';
import CourseCatalog from './components/CourseCatalog';
import Header from './components/Header';
import './styles/App.css';

function App() {
  return (
    <ThemeProvider>
      <StudentProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <div className="container">
              <StudentProfile />
              <CourseCatalog />
            </div>
          </main>
        </div>
      </StudentProvider>
    </ThemeProvider>
  );
}

export default App;
```

### CSS Styles (App.css) - Key Highlights:

```css
/* Theme Variables */
:root {
  --primary-color: #2563eb;
  --secondary-color: #64748b;
  --success-color: #059669;
  --warning-color: #d97706;
  --error-color: #dc2626;
  --bg-color: #ffffff;
  --card-bg: #f8fafc;
  --text-color: #1f2937;
  --border-color: #e5e7eb;
}

[data-theme="dark"] {
  --bg-color: #1f2937;
  --card-bg: #374151;
  --text-color: #f9fafb;
  --border-color: #4b5563;
}

/* Responsive Design */
.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .course-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 🎯 Assessment Criteria

### การประเมินผล (100 คะแนน):

1. **Component Structure & JSX (20 คะแนน)**
   - การเขียน JSX syntax ที่ถูกต้อง
   - การแบ่ง Components อย่างเหมาะสม
   - การใช้ Props ถูกต้อง

2. **State Management (25 คะแนน)**
   - การใช้ useState อย่างมีประสิทธิภาพ
   - การจัดการ complex state
   - การ update state ที่ถูกต้อง

3. **React Hooks (20 คะแนน)**
   - การใช้ useEffect อย่างเหมาะสม
   - การใช้ useContext สำหรับ global state
   - การ cleanup effects

4. **Event Handling (15 คะแนน)**
   - การ handle events หลากหลายรูปแบบ
   - การ prevent default behaviors
   - การ validate user inputs

5. **Code Quality & Best Practices (10 คะแนน)**
   - Code organization และ readability
   - การใช้ modern JavaScript features
   - การ handle errors และ edge cases

6. **UI/UX & Responsive Design (10 คะแนน)**
   - ความสวยงามและใช้งานง่าย
   - Responsive design
   - Accessibility considerations

---

## 📝 Homework Assignments

### Week 5 Assignments:

1. **Individual Assignment**: Complete the Student Course Management System
   - ต้องมี features ครบตามที่กำหนด
   - เพิ่มความสามารถในการ export/import ข้อมูล
   - **Due**: สัปดาห์หน้า

2. **Group Project** (3-4 คน): Library Management System
   - ระบบจัดการหนังสือห้องสมุด
   - มี features: ค้นหาหนังสือ, ยืม-คืน, จองหนังสือ
   - ใช้ Context API สำหรับ state management
   - **Due**: 2 สัปดาห์

3. **Extra Credit**: Component Library
   - สร้าง reusable components (Button, Modal, Table, etc.)
   - เขียน documentation และ examples
   - Deploy บน GitHub Pages

---

## 🔍 Troubleshooting Common Issues

### 1. useState Updates ไม่ทำงาน
```jsx
// ❌ Wrong
const [count, setCount] = useState(0);
setCount(count + 1);
setCount(count + 1); // Still 1, not 2

// ✅ Correct
setCount(prev => prev + 1);
setCount(prev => prev + 1); // Now it's 2
```

### 2. useEffect Infinite Loop
```jsx
// ❌ Wrong - infinite loop
useEffect(() => {
  setData(newData);
}); // No dependency array

// ✅ Correct
useEffect(() => {
  setData(newData);
}, []); // Empty dependency array
```

### 3. Context Value Updates
```jsx
// ❌ Wrong - creates new object every render
<MyContext.Provider value={{ user, setUser }}>

// ✅ Correct - memoize the value
const value = useMemo(() => ({ user, setUser }), [user]);
<MyContext.Provider value={value}>
```

---

## 🚀 Next Steps

หลังจบสัปดาห์นี้ นักศึกษาจะพร้อมสำหรับ:
- Advanced React Patterns (Higher-Order Components, Render Props)
- State Management Libraries (Redux, Zustand)
- React Router สำหรับ Single Page Applications
- Testing React Components
- Performance Optimization

---

## 📚 Additional Resources

### Documentation:
- [React Official Docs](https://react.dev/)
- [React Hooks Reference](https://react.dev/reference/react)

### Practice Platforms:
- [React Challenges](https://react-challenges.netlify.app/)
- [Scrimba React Course](https://scrimba.com/learn/learnreact)

### Community:
- [React Thailand Facebook Group](https://www.facebook.com/groups/react.th)
- [Stack Overflow React Tag](https://stackoverflow.com/questions/tagged/reactjs)

---

**หมายเหตุ**: คู่มือนี้ออกแบบมาให้ฝึกปฏิบัติแบบ hands-on เน้นการเรียนรู้จริงและการประยุกต์ใช้ในโปรเจ็กต์จริง นักศึกษาควรทำตามทุก step และไม่ลังเลที่จะทดลองและปรับแต่งโค้ดเพื่อความเข้าใจที่ลึกซึ้งยิ่งขึ้น

**Happy Coding! 🎉**