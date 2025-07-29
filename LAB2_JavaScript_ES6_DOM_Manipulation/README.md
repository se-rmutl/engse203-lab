# 📚 สัปดาห์ที่ 4: JavaScript ES6+ & DOM Manipulation

## 🎯 ภาพรวมบทเรียน

ยินดีต้อนรับสู่สัปดาห์ที่ 4 ของวิชา ENGSE203 การเขียนโปรแกรมสำหรับวิศวกรซอฟต์แวร์! ในสัปดาห์นี้เราจะเจาะลึกเข้าสู่โลกของ Modern JavaScript และการสร้าง Dynamic Web Applications ที่ตอบสนองต่อผู้ใช้แบบ Real-time

### 🌟 ทำไมต้องเรียน JavaScript ES6+?

JavaScript เป็นภาษาที่พัฒนาอย่างต่อเนื่อง ES6 (ECMAScript 2015) และ versions ที่ตามมาได้เพิ่ม features ที่ทำให้การเขียนโค้ดสะอาด อ่านง่าย และมีประสิทธิภาพมากขึ้น ซึ่งเป็นมาตรฐานที่ใช้ในอุตสาหกรรมปัจจุบัน

---

## 📋 เนื้อหาที่จะเรียน

### 1. **Modern JavaScript Features (ES6+)**
- 🔸 Variables: `let`, `const` vs `var`
- 🔸 Template Literals และ String Interpolation
- 🔸 Destructuring Objects และ Arrays
- 🔸 Arrow Functions
- 🔸 Spread Operator และ Rest Parameters
- 🔸 ES6 Classes และ Modules
- 🔸 Array Methods: `map()`, `filter()`, `reduce()`

### 2. **Asynchronous Programming**
- 🔹 Understanding Asynchronous JavaScript
- 🔹 Callbacks และ Callback Hell
- 🔹 Promises และ Promise Chaining
- 🔹 Async/Await Syntax
- 🔹 Error Handling ใน Async Code

### 3. **DOM Manipulation และ Event Handling**
- 🔶 DOM Tree และ Selectors
- 🔶 Creating และ Modifying Elements
- 🔶 Event Listeners และ Event Object
- 🔶 Event Bubbling และ Delegation
- 🔶 Form Handling และ Validation

### 4. **Fetch API และ JSON**
- 🔷 Introduction to Fetch API
- 🔷 Making HTTP Requests (GET, POST)
- 🔷 Working with JSON Data
- 🔷 Error Handling และ Loading States
- 🔷 Real-world API Integration

---

## 🎓 ผลลัพธ์การเรียนรู้ (Learning Outcomes)

หลังจากเรียนจบสัปดาห์นี้ นักศึกษาจะสามารถ:

1. ✅ **เขียน Modern JavaScript** โดยใช้ ES6+ features ได้อย่างคล่องแคล่ว
2. ✅ **จัดการ Asynchronous Operations** ด้วย Promises และ Async/Await
3. ✅ **สร้าง Interactive Web Pages** ด้วย DOM Manipulation
4. ✅ **เชื่อมต่อกับ External APIs** และจัดการข้อมูล JSON
5. ✅ **Debug JavaScript** อย่างมีประสิทธิภาพด้วย Browser DevTools
6. ✅ **สร้าง Dynamic Web Application** ที่ทำงานกับข้อมูล Real-time

---

## 📖 เนื้อหาการบรรยาย (2 ชั่วโมง)

### ⏱️ ตารางเวลา

| เวลา | หัวข้อ | กิจกรรม |
|------|--------|---------|
| 00:00-00:15 | Introduction & ES6 Variables | Live coding demos |
| 00:15-00:30 | ES6 Features Overview | Interactive examples |
| 00:30-00:45 | Asynchronous Programming | Visualizing async flow |
| 00:45-01:00 | DOM Manipulation Basics | Hands-on practice |
| 01:00-01:15 | Break | - |
| 01:15-01:30 | Event Handling Deep Dive | Interactive demos |
| 01:30-01:45 | Fetch API & JSON | API testing |
| 01:45-02:00 | Debugging with DevTools | Live debugging session |

### 📊 สไลด์การสอน

เข้าถึงสไลด์ทั้งหมด 25 หน้า พร้อม interactive demos ที่: [Link to slides]

**หัวข้อสไลด์หลัก:**
1. หน้าปก & Overview
2. เป้าหมายการเรียนรู้
3. JavaScript Evolution Timeline
4. ES6+ Features (10 สไลด์)
5. Asynchronous Programming (5 สไลด์)
6. DOM & Events (5 สไลด์)
7. Workshop Preview
8. Best Practices
9. Tools & Resources

---

## 💻 กิจกรรมการเรียนการสอน

### 🎯 1. Interactive Coding Challenges (30 นาที)

นักศึกษาจะได้ฝึกทักษะผ่าน coding challenges แบบ real-time:

#### Challenge 1: ES6 Refactoring
```javascript
// แปลงโค้ด ES5 เป็น ES6
// Old code
var users = response.data;
var names = [];
for (var i = 0; i < users.length; i++) {
    names.push(users[i].name);
}

// Your ES6 solution here...
```

#### Challenge 2: Async Data Fetching
```javascript
// เขียน function ดึงข้อมูลจาก API
async function getUserPosts(userId) {
    // Your code here...
}
```

#### Challenge 3: DOM Manipulation
```javascript
// สร้าง Todo List แบบ dynamic
// Requirements: Add, Delete, Mark complete
```

### 🚀 2. Workshop Project: Weather Dashboard (3 ชั่วโมง)

**Project Overview:**
สร้าง Weather Dashboard Application ที่มี features:
- 🔍 ค้นหาสภาพอากาศตามเมือง
- 📍 ใช้ตำแหน่งปัจจุบัน
- 📊 แสดงพยากรณ์อากาศ 5 วัน
- ⭐ บันทึกเมืองโปรด
- 🌓 Dark/Light theme
- 📱 Responsive design

**Technology Stack:**
- HTML5 (Semantic markup)
- CSS3 (Flexbox, Grid)
- JavaScript ES6+ (Modules)
- OpenWeatherMap API
- LocalStorage
- Git version control

### 🔧 3. Debug Workshop (30 นาที)

เรียนรู้การใช้ Browser DevTools อย่างมืออาชีพ:

1. **Console Methods**
   - `console.log()`, `console.table()`, `console.time()`
   - Debugging techniques

2. **Sources Panel**
   - Setting breakpoints
   - Step through code
   - Watch variables

3. **Network Tab**
   - Monitor API calls
   - Analyze performance

4. **Common Debugging Scenarios**
   - Undefined variables
   - Async timing issues
   - API errors

---

## 📚 การเตรียมตัวก่อนเรียน

### 🛠️ Software Requirements

1. **Code Editor**: VS Code (recommended)
   - Extensions: Live Server, Prettier, ESLint

2. **Web Browser**: Chrome หรือ Firefox (latest version)

3. **Git**: Version control system

4. **Node.js**: Optional (สำหรับ local server)

### 📖 Pre-class Reading

1. [MDN: JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
2. [JavaScript.info: Modern JavaScript Tutorial](https://javascript.info/)
3. [ES6 Features Overview](http://es6-features.org/)

### 🎯 Pre-class Quiz

ทดสอบความพร้อมของคุณ: [Take the quiz]

**หัวข้อที่ควรทบทวน:**
- Basic JavaScript syntax
- HTML/CSS fundamentals
- Basic programming concepts (loops, conditions, functions)

---

## 📝 การประเมินผล

### 📊 เกณฑ์การให้คะแนน

| Component | Weight | Details |
|-----------|--------|---------|
| **Workshop Project** | 40% | Functionality, Code quality, Git usage |
| **Coding Challenges** | 20% | Completion and correctness |
| **Class Participation** | 10% | Active engagement |
| **Debug Exercise** | 10% | Problem-solving skills |
| **Code Review** | 20% | Peer review and feedback |

### 🎯 Grading Rubric

**A (90-100%)**: ทำ features ครบ, clean code, มี bonus features  
**B (80-89%)**: Features หลักสมบูรณ์, code quality ดี  
**C (70-79%)**: Basic features ทำงานได้, มี minor bugs  
**D (60-69%)**: ทำได้บางส่วน, code ต้องปรับปรุง  
**F (<60%)**: ไม่ส่งงาน หรือ features หลักไม่ทำงาน

---

## 🚀 Workshop Details

### ⏰ Timeline (3 ชั่วโมง)

#### **ชั่วโมงที่ 1: Project Setup & Basic Structure**
- Git repository setup
- HTML structure (semantic)
- CSS styling (responsive)
- JavaScript modules configuration
- API registration

#### **ชั่วโมงที่ 2: Core Functionality**
- Search functionality
- Weather data fetching
- Display current weather
- Error handling
- Loading states

#### **ชั่วโมงที่ 3: Advanced Features**
- 5-day forecast
- Favorites system
- Geolocation
- Theme toggle
- Final touches & deployment

### 📁 Project Structure

```
weather-app/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js         # Main application
│   ├── weather.js     # API service
│   └── config.js      # Configuration
├── .gitignore
└── README.md
```

### 🔑 Key Learning Points

1. **Git Workflow**
   - Feature branches
   - Meaningful commits
   - Pull requests

2. **ES6+ in Practice**
   - Modules (import/export)
   - Async/await
   - Destructuring
   - Template literals

3. **API Integration**
   - HTTP requests
   - Error handling
   - Data transformation
   - Loading states

4. **Best Practices**
   - Code organization
   - Error handling
   - Performance optimization
   - Security (API keys)

---

## 📖 Resources & References

### 🔗 Essential Links

- **Documentation**
  - [MDN Web Docs](https://developer.mozilla.org/)
  - [JavaScript.info](https://javascript.info/)
  - [Can I Use](https://caniuse.com/)

- **API Documentation**
  - [OpenWeatherMap API](https://openweathermap.org/api)
  - [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

- **Tools**
  - [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
  - [VS Code](https://code.visualstudio.com/)
  - [Git Documentation](https://git-scm.com/doc)

### 📚 Recommended Reading

1. **Books**
   - "Eloquent JavaScript" by Marijn Haverbeke
   - "JavaScript: The Good Parts" by Douglas Crockford
   - "You Don't Know JS" series by Kyle Simpson

2. **Online Courses**
   - freeCodeCamp JavaScript Algorithms
   - The Modern JavaScript Tutorial
   - JavaScript30 by Wes Bos

### 🎮 Practice Platforms

- [CodeWars](https://www.codewars.com/)
- [LeetCode](https://leetcode.com/)
- [HackerRank](https://www.hackerrank.com/)
- [Exercism](https://exercism.io/)

---

## ❓ FAQ

### 1. ต้องมีพื้นฐานอะไรบ้าง?
- HTML/CSS พื้นฐาน
- JavaScript syntax เบื้องต้น
- ความเข้าใจ programming concepts

### 2. ทำไมต้องใช้ Git?
- Industry standard
- Version control
- Collaboration
- Portfolio building

### 3. API Key ใช้ยังไง?
- สมัครฟรีที่ OpenWeatherMap
- ใส่ใน config.js
- ไม่ push ขึ้น GitHub!

### 4. ติด Error ทำยังไง?
- Check console
- Use debugger
- Read error messages
- Ask for help

---

## 🤝 การส่งงานและ Submission

### 📅 Deadline
- **Workshop Project**: ภายใน 1 สัปดาห์หลังเรียน
- **Late Submission**: -10% ต่อวัน (สูงสุด 3 วัน)

### 📤 Submission Format
1. GitHub repository (public)
2. Live demo link (GitHub Pages/Netlify)
3. README.md with documentation
4. Self-evaluation form

### ✅ Submission Checklist
- [ ] All features implemented
- [ ] No console errors
- [ ] Responsive design tested
- [ ] Git history shows progress
- [ ] README is complete
- [ ] Code is commented
- [ ] API key is hidden

---

## 💡 Tips for Success

1. **Start Early**: อย่ารอถึงวันสุดท้าย
2. **Commit Often**: บันทึกความคืบหน้าเป็นระยะ
3. **Test Thoroughly**: ทดสอบทุก features
4. **Ask Questions**: ไม่เข้าใจให้ถาม
5. **Help Others**: แชร์ความรู้กับเพื่อน
6. **Go Beyond**: ลองทำ bonus features

---

## 🎉 Next Week Preview

**สัปดาห์ที่ 5: Advanced Frontend Frameworks**
- Introduction to React.js
- Component-based architecture
- State management
- Building a full-stack application

---

## 📞 Contact & Support

- **Instructor**: [Your Name]
- **Email**: instructor@university.edu
- **Office Hours**: Mon/Wed 14:00-16:00
- **TA Support**: Available on Discord
- **Class Repository**: [GitHub Link]

---

> 💪 **Remember**: "The expert in anything was once a beginner. Every master was once a disaster." - Keep coding, keep learning!

---

*Last updated: [Current Date]*  
*Course: ENGSE203 - Computer Programming for Software Engineer*