# LAB2: Portfolio Website Development
## HTML5 & CSS3 Fundamentals

### 🎯 Lab Objectives
- เข้าใจโครงสร้างและ Semantic HTML5
- ใช้งาน CSS3 สำหรับ Layout และ Styling
- สร้าง Responsive Design
- ฝึกการใช้งาน Git สำหรับ Version Control
- ทำงานร่วมกันเป็นคู่ (Pair Programming)

### ⏰ Time Allocation
- **Part 2:** 1.5 hours (Pair Work - Adding Features)

---

## 📋 Prerequisites
- VS Code หรือ Text Editor
- Git และ GitHub Account
- Live Server Extension (สำหรับ VS Code)
- Basic understanding of HTML และ CSS

---

## 🚀 Part 2: Pair Programming Features  (1.5 ชั่วโมง)

### **นักศึกษา 2 คนทำงานร่วมกันและแบ่งหน้าที่ Feature Distribution:**

### **นักศึกษา A:(45 minutes):**

1. **Dark Mode Toggle - เปลี่ยนธีมเว็บไซต์**
2. **Loading Animation - หน้าจอโหลดแบบมืออาชีพ**
3. **Scroll Progress Indicator - แสดงความคืบหน้าการเลื่อนหน้า**

### **นักศึกษา B: (45 minutes):**

1. **Project Filter System - กรองโปรเจกต์ตามหมวดหมู่**
2. **Typing Animation - เอฟเฟกต์พิมพ์ข้อความในส่วน Hero**
3. **Back to Top Button - ปุ่มกลับไปด้านบน**

### ✨ จุดเด่นของ Lab นี้:

1. เรียนรู้แบบค่อยเป็นค่อยไป - Part 1 สอนพื้นฐาน, Part 2 ต่อยอด
2. ใช้เทคโนโลยีทันสมัย - Modern CSS, ES6+ JavaScript, Git workflow
3. ฝึกการทำงานเป็นทีม - Pair programming และ Git collaboration
4. ผลงานที่ใช้งานได้จริง - Portfolio website ที่สามารถนำไปใช้ได้
5. ครอบคลุมทักษะที่จำเป็น - HTML5, CSS3, JavaScript, Git, Responsive Design

### **นักศึกษา A Implementation:**

#### **1. Dark Mode Toggle (15 minutes)**

**Add to HTML (in navbar):**
```html
<div class="theme-toggle">
    <i class="fas fa-moon" id="theme-icon"></i>
</div>
```

**Add to CSS:**
```css
/* Dark Mode Styles */
[data-theme="dark"] {
    --bg-color: #1a1a1a;
    --text-color: #ffffff;
    --card-bg: #2d2d2d;
    --section-bg: #262626;
}

[data-theme="light"] {
    --bg-color: #ffffff;
    --text-color: #333333;
    --card-bg: #ffffff;
    --section-bg: #f8f9fa;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s ease, color 0.3s ease;
}

.theme-toggle {
    cursor: pointer;
    font-size: 1.2rem;
    color: #333;
    transition: color 0.3s ease;
}

.theme-toggle:hover {
    color: #3498db;
}

/* Update other elements to use CSS variables */
.skill-item, .project-card, .contact-form {
    background: var(--card-bg);
}

.about, .projects {
    background: var(--section-bg);
}
```

**Add to JavaScript:**
```javascript
// Dark Mode Toggle
const themeToggle = document.getElementById('theme-icon');
const currentTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggle.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}
```

#### **2. Loading Animation (15 minutes)**

**Add to HTML (at the beginning of body):**
```html
<div class="loader">
    <div class="loader-content">
        <div class="spinner"></div>
        <p>Loading...</p>
    </div>
</div>
```

**Add to CSS:**
```css
/* Loading Animation */
.loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
}

.loader-content {
    text-align: center;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loader.fade-out {
    opacity: 0;
    pointer-events: none;
}
```

**Add to JavaScript:**
```javascript
// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});
```

#### **3. Scroll Progress Indicator (15 minutes)**

**Add to HTML (after navbar):**
```html
<div class="scroll-progress">
    <div class="progress-bar"></div>
</div>
```

**Add to CSS:**
```css
/* Scroll Progress Indicator */
.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    z-index: 1001;
}

.progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #3498db, #f39c12);
    width: 0%;
    transition: width 0.1s ease;
}
```

**Add to JavaScript:**
```javascript
// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    document.querySelector('.progress-bar').style.width = scrollPercent + '%';
});
```

### **นักศึกษา B Implementation:**

#### **1. Project Filter System (15 minutes)**

**Update Projects HTML:**
```html
<section id="projects" class="projects">
    <div class="container">
        <h2 class="section-title">My Projects</h2>
        
        <!-- Filter Buttons -->
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="web">Web Apps</button>
            <button class="filter-btn" data-filter="mobile">Mobile</button>
            <button class="filter-btn" data-filter="ui">UI/UX</button>
        </div>
        
        <div class="projects-grid">
            <div class="project-card" data-category="web">
                <!-- Project content -->
            </div>
            <div class="project-card" data-category="mobile">
                <!-- Project content -->
            </div>
            <div class="project-card" data-category="ui">
                <!-- Project content -->
            </div>
        </div>
    </div>
</section>
```

**Add to CSS:**
```css
/* Project Filter */
.filter-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.filter-btn {
    padding: 10px 20px;
    border: none;
    background: transparent;
    color: #666;
    cursor: pointer;
    border-radius: 25px;
    transition: all 0.3s ease;
    font-weight: 500;
}

.filter-btn.active,
.filter-btn:hover {
    background: #3498db;
    color: white;
}

.project-card.hide {
    display: none;
}
```

**Add to JavaScript:**
```javascript
// Project Filter System
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    });
});
```

#### **2. Typing Animation for Hero (15 minutes)**

**Update Hero HTML:**
```html
<h1>Hello, I'm <span class="highlight">Your Name</span></h1>
<p class="hero-subtitle">
    <span id="typing-text"></span>
    <span class="cursor">|</span>
</p>
```

**Add to CSS:**
```css
/* Typing Animation */
.cursor {
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}
```

**Add to JavaScript:**
```javascript
// Typing Animation
const typingText = document.getElementById('typing-text');
const textArray = ['Full Stack Developer', 'React Specialist', 'Node.js Expert', 'UI/UX Enthusiast'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = textArray[textIndex];
    
    if (!isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
            return;
        }
    } else {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
        }
    }
    
    setTimeout(typeWriter, isDeleting ? 50 : 150);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});
```

#### **3. Back to Top Button (15 minutes)**

**Add to HTML:**
```html
<button class="back-to-top" id="backToTop">
    <i class="fas fa-arrow-up"></i>
</button>
```

**Add to CSS:**
```css
/* Back to Top Button */
.back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
}

.back-to-top.show {
    opacity: 1;
    visibility: visible;
}

.back-to-top:hover {
    background: #2980b9;
    transform: translateY(-2px);
}
```

**Add to JavaScript:**
```javascript
// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
```

---

## 📋 Final Integration & Testing (30 minutes)

### **Step 1: Code Review (10 minutes)**
- นักศึกษาทั้งสองคนรวม code เข้าด้วยกัน
- ตรวจสอบความถูกต้องของ syntax
- ทดสอบ responsive design

### **Step 2: Git Collaboration (10 minutes)**
```bash
# Student A pushes their features
git add .
git commit -m "Add dark mode, loading animation, and scroll progress"
git push origin main

# Student B pulls and merges
git pull origin main
git add .
git commit -m "Add project filter, typing animation, and back to top"
git push origin main
```

### **Step 3: Final Testing (10 minutes)**
- ทดสอบทุก features ที่เพิ่มเข้ามา
- ตรวจสอบ responsive design บนหน้าจอขนาดต่างๆ
- ทดสอบ cross-browser compatibility

---

## 🎯 Assessment Criteria

### **Part 1: Template Implementation (50%)**
- ความถูกต้องของ HTML structure (15%)
- การใช้งาน CSS และ responsive design (20%)
- การใช้งาน JavaScript (10%)
- การใช้งาน Git อย่างถูกต้อง (5%)

### **Part 2: Feature Implementation (50%)**
- ความถูกต้องของ features ที่เพิ่ม (30%)
- Code quality และ organization (10%)
- การทำงานร่วมกันเป็นทีม (10%)

---

## 📚 Learning Resources

### **HTML5 & CSS3:**
- [MDN Web Docs - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### **JavaScript:**
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)

### **Git & GitHub:**
- [Pro Git Book](https://git-scm.com/book)
- [GitHub Guides](https://guides.github.com/)

---

## 🔍 Troubleshooting

### **Common Issues:**
1. **Images not loading:** ตรวจสอบ path และ file names
2. **CSS not applying:** ตรวจสอบ link tag และ CSS syntax
3. **JavaScript errors:** ใช้ browser developer tools
4. **Git conflicts:** ใช้ git status และ git diff

### **Tips:**
- ใช้ Live Server extension ใน VS Code
- ตรวจสอบ console ใน browser developer tools
- ใช้ Git กระซิบๆ ตั้งแต่เริ่มต้น
- Comment code อย่างชัดเจน

---

## 📝 Submission Requirements

1. **GitHub Repository** พร้อม complete source code
2. **README.md** อธิบายโครงการและวิธีการใช้งาน
3. **Live Demo** (deploy ไปยัง GitHub Pages หรือ Netlify)
4. **Documentation** ของ features ที่เพิ่มเข้ามา
5. **Reflection Report** (1-2 หน้า) เกี่ยวกับสิ่งที่เรียนรู้

**Due Date:** สิ้นสุด Week 3