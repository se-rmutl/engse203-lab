# GitHub Lab Exercise: Version Control Fundamentals

## Overview
แลปนี้ออกแบบมาเพื่อให้นักศึกษาเรียนรู้การใช้งาน Git และ GitHub ตั้งแต่ระดับพื้นฐานไปจนถึงระดับที่ซับซ้อนขึ้น โดยแบ่งเป็น 2 ส่วนหลัก

---

## Part 1: Git Fundamentals & Local Development (40 คะแนน)

### วัตถุประสงค์
- เรียนรู้การใช้งาน Git commands พื้นฐาน
- สามารถเชื่อมต่อ Local Repository กับ GitHub
- ฝึกการทำงานกับ branching และ merging

### เตรียมตัวก่อนเริ่มทำแลป
1. ติดตั้ง Git บนเครื่องคอมพิวเตอร์
2. สร้างบัญชี GitHub
3. ตั้งค่า Git configuration

```bash
# ตั้งค่าชื่อและอีเมล
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# ตรวจสอบการตั้งค่า
git config --list
```

### ขั้นตอนที่ 1: สร้าง Repository และเชื่อมต่อกับ GitHub

#### 1.1 สร้างโฟลเดอร์โปรเจกต์
```bash
# สร้างโฟลเดอร์โปรเจกต์
mkdir my-portfolio
cd my-portfolio

# เริ่มต้น Git repository
git init
```

#### 1.2 สร้างไฟล์พื้นฐาน
สร้างไฟล์ `index.html`:
```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>สวัสดี! ฉันคือ [ชื่อของคุณ]</h1>
        <p>นักพัฒนาเว็บไซต์มือใหม่</p>
    </header>
    
    <main>
        <section id="about">
            <h2>เกี่ยวกับฉัน</h2>
            <p>ฉันกำลังเรียนรู้การพัฒนาเว็บไซต์และตื่นเต้นมากกับเทคโนโลยีใหม่ๆ</p>
        </section>
        
        <section id="skills">
            <h2>ทักษะ</h2>
            <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript (เรียนรู้อยู่)</li>
            </ul>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 My Portfolio</p>
    </footer>
</body>
</html>
```

สร้างไฟล์ `style.css`:
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}

header {
    background-color: #2c3e50;
    color: white;
    text-align: center;
    padding: 2rem;
}

header h1 {
    margin-bottom: 0.5rem;
}

main {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
}

section {
    background-color: white;
    margin-bottom: 2rem;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

section h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
}

ul {
    list-style-type: none;
    padding-left: 0;
}

ul li {
    background-color: #3498db;
    color: white;
    padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
}

footer {
    background-color: #2c3e50;
    color: white;
    text-align: center;
    padding: 1rem;
    margin-top: 2rem;
}
```

#### 1.3 เพิ่มไฟล์ไปยัง Repository
```bash
# ตรวจสอบสถานะไฟล์
git status

# เพิ่มไฟล์ทั้งหมดไปยัง staging area
git add .

# ตรวจสอบสถานะอีกครั้ง
git status

# Commit ครั้งแรก
git commit -m "Initial commit: Add basic portfolio structure"
```

#### 1.4 สร้าง Repository บน GitHub และเชื่อมต่อ
1. ไปที่ GitHub.com และล็อกอิน
2. คลิก "New Repository"
3. ตั้งชื่อ repository เป็น "my-portfolio"
4. ไม่ต้องเลือก "Initialize with README"
5. คลิก "Create Repository"

```bash
# เชื่อมต่อกับ GitHub repository
git remote add origin https://github.com/[your-username]/my-portfolio.git

# ตรวจสอบการเชื่อมต่อ
git remote -v

# Push ไฟล์ไปยัง GitHub
git push -u origin main
```

### ขั้นตอนที่ 2: การทำงานกับ Branches

#### 2.1 สร้าง Branch ใหม่สำหรับเพิ่มฟีเจอร์
```bash
# สร้าง branch ใหม่และเปลี่ยนไป
git checkout -b feature/add-projects

# ตรวจสอบ branch ปัจจุบัน
git branch
```

#### 2.2 เพิ่มเนื้อหาใน Branch ใหม่
แก้ไขไฟล์ `index.html` โดยเพิ่มส่วน projects หลัง section skills:
```html
        <section id="projects">
            <h2>โปรเจกต์ของฉัน</h2>
            <div class="project">
                <h3>เว็บไซต์ Portfolio</h3>
                <p>เว็บไซต์แสดงผลงานส่วนตัวที่สร้างด้วย HTML, CSS</p>
                <a href="#" class="project-link">ดูโปรเจกต์</a>
            </div>
            <div class="project">
                <h3>To-Do List App</h3>
                <p>แอปพลิเคชันจดบันทึกรายการสิ่งที่ต้องทำ (กำลังพัฒนา)</p>
                <a href="#" class="project-link">ดูโปรเจกต์</a>
            </div>
        </section>
```

เพิ่ม CSS สำหรับ projects ในไฟล์ `style.css`:
```css
.project {
    border: 1px solid #ddd;
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    background-color: #f9f9f9;
}

.project h3 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
}

.project-link {
    display: inline-block;
    background-color: #3498db;
    color: white;
    padding: 0.5rem 1rem;
    text-decoration: none;
    border-radius: 4px;
    margin-top: 1rem;
}

.project-link:hover {
    background-color: #2980b9;
}
```

#### 2.3 Commit การเปลี่ยนแปลง
```bash
# ตรวจสอบการเปลี่ยนแปลง
git diff

# เพิ่มไฟล์ที่แก้ไข
git add .

# Commit
git commit -m "Add projects section with styling"

# Push branch ใหม่ไปยัง GitHub
git push -u origin feature/add-projects
```

### ขั้นตอนที่ 3: Merging และ Pull Request

#### 3.1 สร้าง Pull Request บน GitHub
1. ไปที่ repository บน GitHub
2. คลิก "Compare & pull request"
3. เขียนรายละเอียดการเปลี่ยนแปลง
4. คลิก "Create pull request"

#### 3.2 Merge กลับไปยัง Main Branch
```bash
# เปลี่ยนกลับไปยัง main branch
git checkout main

# Pull การเปลี่ยนแปลงล่าสุดจาก GitHub
git pull origin main

# Merge feature branch
git merge feature/add-projects

# Push การเปลี่ยนแปลงไปยัง GitHub
git push origin main

# ลบ branch ที่ไม่ใช้แล้ว
git branch -d feature/add-projects
```

### ขั้นตอนที่ 4: การจัดการ Conflicts

#### 4.1 สร้าง Conflict เพื่อฝึกแก้ไข
```bash
# สร้าง branch ใหม่
git checkout -b feature/update-contact

# แก้ไข footer ในไฟล์ index.html
# เปลี่ยนจาก: <p>&copy; 2024 My Portfolio</p>
# เป็น: <p>&copy; 2024 My Portfolio | Contact: myemail@example.com</p>

git add .
git commit -m "Add contact info to footer"
git push -u origin feature/update-contact
```

#### 4.2 สร้างการเปลี่ยนแปลงใน Main Branch
```bash
# กลับไปยัง main
git checkout main

# แก้ไข footer เหมือนกัน แต่ต่างกัน
# เปลี่ยนเป็น: <p>&copy; 2024 My Portfolio | Version 1.0</p>

git add .
git commit -m "Add version info to footer"
git push origin main
```

#### 4.3 แก้ไข Conflict
```bash
# เปลี่ยนกลับไปยัง feature branch
git checkout feature/update-contact

# พยายาม merge main เพื่อสร้าง conflict
git merge main

# แก้ไข conflict ในไฟล์
# เลือกรวม: <p>&copy; 2024 My Portfolio | Version 1.0 | Contact: myemail@example.com</p>

git add .
git commit -m "Resolve merge conflict in footer"
git push origin feature/update-contact
```

### งานที่ต้องส่ง Part 1
1. ลิงก์ GitHub Repository
2. Screenshot ของ commit history
3. Screenshot ของ Pull Request ที่สร้าง
4. ไฟล์ index.html และ style.css ที่สมบูรณ์

---

## Part 2: Advanced Git Workflow & Team Collaboration (60 คะแนน)

### วัตถุประสงค์
- พัฒนาความสามารถในการทำงานเป็นทีม (2 คน)
- ฝึกการใช้งาน Git Workflow แบบมืออาชีพ
- เรียนรู้การทำ Code Review และ Collaboration
- ฝึกการแก้ไขปัญหาและพัฒนาฟีเจอร์ใหม่

### โจทย์: ปรับปรุงและพัฒนาเว็บไซต์ E-commerce Mini

คุณและคู่หู (2 คน) ได้รับมอบหมายให้ปรับปรุงเว็บไซต์ E-commerce ที่มีอยู่แล้ว โดยมีเวลา **1 สัปดาห์**

#### โครงสร้างทีม:
- **Developer A**: รับผิดชอบ Frontend และ UI/UX
- **Developer B**: รับผิดชอบ Backend Logic และ Data Management

### ขั้นตอนที่ 1: Setup Project (วันที่ 1)

#### 1.1 อาจารย์จะให้ไฟล์เริ่มต้นมา - Mini E-commerce Starter

**โครงสร้างไฟล์ที่ได้รับ:**
```
mini-ecommerce/
├── index.html
├── products.html
├── cart.html
├── about.html
├── css/
│   ├── style.css
│   └── components.css
├── js/
│   ├── main.js
│   └── cart.js
├── data/
│   └── products.json
├── images/
│   └── placeholder.jpg
├── README.md
└── .gitignore
```

#### 1.2 ตั้งค่าโปรเจกต์
**Developer A (Team Leader) Tasks:**
```bash
# Fork repository จากอาจารย์
# Clone repository
git clone https://github.com/[your-username]/mini-ecommerce.git
cd mini-ecommerce

# เพิ่ม upstream remote
git remote add upstream https://github.com/[teacher-username]/mini-ecommerce.git

# สร้าง develop branch
git checkout -b develop
git push -u origin develop

# เชิญ Developer B เข้า repository
# Settings > Collaborators > Add Developer B
```

**Developer B Tasks:**
```bash
# Clone repository
git clone https://github.com/[team-leader-username]/mini-ecommerce.git
cd mini-ecommerce

# เปลี่ยนไปยัง develop branch
git checkout develop
git pull origin develop
```

### ขั้นตอนที่ 2: ศึกษาและวิเคราะห์โค้ด (วันที่ 1-2)

#### 2.1 ทำความเข้าใจโค้ดเดิม
**ทั้งทีมต้องศึกษา:**
- โครงสร้างไฟล์และการทำงาน
- ฟีเจอร์ที่มีอยู่แล้ว
- ปัญหาและข้อบกพร่องที่พบ
- จุดที่ต้องปรับปรุง

#### 2.2 วิเคราะห์ปัญหา
**ปัญหาที่พบในโค้ดเดิม (ตัวอย่าง):**
- การจัดการข้อมูลสินค้าไม่มีประสิทธิภาพ
- UI/UX ไม่ responsive
- ไม่มีระบบจัดการ cart ที่ดี
- ไม่มีการ validation ข้อมูล
- Performance ไม่ดี

### ขั้นตอนที่ 3: วางแผนการพัฒนา (วันที่ 2)

#### 3.1 สร้าง Issues บน GitHub
**Developer A สร้าง Issues:**
- Issue #1: Improve responsive design
- Issue #2: Add product search functionality
- Issue #3: Enhance cart UI/UX
- Issue #4: Add loading states

**Developer B สร้าง Issues:**
- Issue #5: Implement product filtering
- Issue #6: Add form validation
- Issue #7: Improve cart functionality
- Issue #8: Add local storage management

#### 3.2 กำหนด Milestones
- **Milestone 1**: Bug fixes และ improvements (วันที่ 2-3)
- **Milestone 2**: New features (วันที่ 4-5)
- **Milestone 3**: Testing และ final touches (วันที่ 6-7)

### ขั้นตอนที่ 4: Development Phase (วันที่ 2-5)

#### 4.1 การทำงานแบบ Parallel

**Developer A Workflow:**
```bash
# สร้าง feature branch
git checkout develop
git pull origin develop
git checkout -b feature/responsive-design

# พัฒนา responsive design
# ... code development ...

# Commit regularly
git add .
git commit -m "Add responsive grid system"
git commit -m "Improve mobile navigation"
git commit -m "Add responsive product cards"

# Push และสร้าง PR
git push -u origin feature/responsive-design
```

**Developer B Workflow:**
```bash
# สร้าง feature branch
git checkout develop
git pull origin develop
git checkout -b feature/product-filtering

# พัฒนา filtering system
# ... code development ...

# Commit regularly
git add .
git commit -m "Add filter data structure"
git commit -m "Implement filter UI components"
git commit -m "Add filter functionality"

# Push และสร้าง PR
git push -u origin feature/product-filtering
```

#### 4.2 Code Review Process
**สำหรับทุก Pull Request:**
1. สร้าง PR พร้อมรายละเอียดชัดเจน
2. คู่หูต้อง review และให้ comment
3. แก้ไข feedback ก่อน merge
4. ใช้ GitHub review tools
5. Merge เมื่อได้ approval

### ขั้นตอนที่ 5: โจทย์การพัฒนา (เลือก 3 จาก 6 ข้อ)

#### **โจทย์ที่ 1: Search & Filter System**
**ปัญหา:** ระบบค้นหาไม่มีประสิทธิภาพ
**งานที่ต้องทำ:**
```bash
# Developer A: UI Components
git checkout -b feature/search-ui
# - สร้าง search bar component
# - ออกแบบ filter dropdown
# - เพิ่ม search results layout

# Developer B: Logic Implementation
git checkout -b feature/search-logic
# - เขียนฟังก์ชันค้นหา
# - สร้าง filter algorithm
# - เชื่อมต่อ UI กับ logic
```

#### **โจทย์ที่ 2: Shopping Cart Enhancement**
**ปัญหา:** Cart system ไม่มีฟีเจอร์ครบถ้วน
**งานที่ต้องทำ:**
```bash
# Developer A: Cart UI
git checkout -b feature/cart-ui
# - ปรับปรุง cart layout
# - เพิ่ม quantity controls
# - สร้าง checkout summary

# Developer B: Cart Logic
git checkout -b feature/cart-logic
# - เพิ่ม cart state management
# - สร้าง local storage system
# - เขียน cart calculations
```

#### **โจทย์ที่ 3: Product Management**
**ปัญหา:** การจัดการสินค้าไม่ยืดหยุ่น
**งานที่ต้องทำ:**
```bash
# Developer A: Product Display
git checkout -b feature/product-display
# - ปรับปรุง product cards
# - เพิ่ม product detail modal
# - สร้าง product image gallery

# Developer B: Product Data
git checkout -b feature/product-data
# - เพิ่ม product categories
# - สร้าง product rating system
# - เขียน product management functions
```

#### **โจทย์ที่ 4: User Experience**
**ปัญหา:** UX ไม่ smooth และขาด feedback
**งานที่ต้องทำ:**
```bash
# Developer A: UI/UX
git checkout -b feature/ux-improvements
# - เพิ่ม loading animations
# - สร้าง error states
# - ปรับปรุง navigation

# Developer B: Interactions
git checkout -b feature/user-interactions
# - เพิ่ม form validation
# - สร้าง toast notifications
# - เขียน user feedback system
```

#### **โจทย์ที่ 5: Performance Optimization**
**ปัญหา:** Website โหลดช้าและไม่ smooth
**งานที่ต้องทำ:**
```bash
# Developer A: Frontend Performance
git checkout -b feature/frontend-optimization
# - ปรับปรุง CSS performance
# - เพิ่ม lazy loading
# - optimize images

# Developer B: JavaScript Performance
git checkout -b feature/js-optimization
# - refactor JavaScript code
# - เพิ่ม debouncing
# - optimize data structures
```

#### **โจทย์ที่ 6: Mobile Experience**
**ปัญหา:** Mobile experience ไม่ดี
**งานที่ต้องทำ:**
```bash
# Developer A: Mobile UI
git checkout -b feature/mobile-ui
# - ปรับปรุง mobile layout
# - เพิ่ม touch gestures
# - optimize for mobile

# Developer B: Mobile Features
git checkout -b feature/mobile-features
# - เพิ่ม mobile-specific features
# - optimize mobile performance
# - add progressive web app features
```

### ขั้นตอนที่ 6: Integration & Testing (วันที่ 6-7)

#### 6.1 Integration Process
```bash
# Developer A: Integration branch
git checkout develop
git pull origin develop
git checkout -b integration/final-features

# Merge completed features
git merge feature/responsive-design
git merge feature/search-ui
git merge feature/cart-ui

# Test integration
# ... testing ...

# Push integration branch
git push -u origin integration/final-features
```

#### 6.2 Final Testing
**ทดสอบที่ต้องทำ:**
- Functionality testing
- Cross-browser compatibility
- Mobile responsiveness
- Performance testing
- User experience testing

#### 6.3 Production Release
```bash
# สร้าง release branch
git checkout develop
git pull origin develop
git checkout -b release/v1.0

# Final testing และ bug fixes
# ... final touches ...

git add .
git commit -m "Prepare release v1.0"

# Merge ไปยัง main
git checkout main
git merge release/v1.0
git tag -a v1.0 -m "Release version 1.0"
git push origin main --tags

# Merge กลับไปยัง develop
git checkout develop
git merge release/v1.0
git push origin develop
```

### ขั้นตอนที่ 7: Documentation & Deployment (วันที่ 7)

#### 7.1 อัปเดต Documentation
**README.md ต้องมี:**
- Project description
- Features implemented
- Installation instructions
- Usage guide
- Team member contributions
- Known issues และ future improvements

#### 7.2 Deploy to GitHub Pages
```bash
# เปิดใช้งาน GitHub Pages
# Settings > Pages > Source: main branch
# URL: https://[username].github.io/mini-ecommerce
```

### การส่งงาน Part 2

#### Deliverables:
1. **Working Website**: เว็บไซต์ที่ทำงานได้สมบูรณ์
2. **Repository**: GitHub repository พร้อม proper structure
3. **Documentation**: README.md ที่อธิบายโปรเจกต์
4. **Git History**: Commit history ที่เป็นระเบียบ
5. **Pull Requests**: อย่างน้อย 5 PRs พร้อม reviews
6. **Team Report**: รายงานการทำงานเป็นทีม (2-3 หน้า)

#### Team Report ต้องมี:
- การแบ่งหน้าที่ความรับผิดชอบ
- ปัญหาที่พบและวิธีแก้ไข
- การใช้งาน Git commands และ workflow
- บทเรียนที่ได้รับจากการทำงานเป็นทีม
- ความคิดเห็นเกี่ยวกับ Version Control

---

## Rubric การให้คะแนน

### Part 1: Git Fundamentals (40 คะแนน)

| หัวข้อ | ดีเยี่ยม (9-10) | ดี (7-8) | ปานกลาง (5-6) | ต้องปรับปรุง (1-4) |
|--------|----------------|----------|----------------|-------------------|
| **Repository Setup** (10 คะแนน) | Repository ตั้งค่าถูกต้อง มี commit history ที่ดี | Repository ตั้งค่าถูกต้อง มี commit เพียงพอ | Repository ตั้งค่าได้ แต่ commit ไม่เพียงพอ | Repository ไม่สมบูรณ์ |
| **Branch Management** (10 คะแนน) | ใช้ branch ถูกต้อง merge สำเร็จ | ใช้ branch ได้ แต่ merge มีปัญหาเล็กน้อย | สร้าง branch ได้ แต่ merge ไม่สมบูรณ์ | ไม่สามารถใช้ branch ได้ |
| **Code Quality** (10 คะแนน) | Code สะอาด ทำงานได้สมบูรณ์ | Code ทำงานได้ มีข้อผิดพลาดเล็กน้อย | Code ทำงานได้บางส่วน | Code ไม่ทำงาน |
| **Git Commands** (10 คะแนน) | ใช้ commands ได้หลากหลาย และถูกต้อง | ใช้ commands พื้นฐานได้ดี | ใช้ commands ได้บางส่วน | ใช้ commands ไม่ถูกต้อง |

### Part 2: Advanced Workflow (60 คะแนน)

| หัวข้อ | ดีเยี่ยม (13-15) | ดี (10-12) | ปานกลาง (7-9) | ต้องปรับปรุง (1-6) |
|--------|-----------------|------------|----------------|-------------------|
| **Team Collaboration** (15 คะแนน) | ทำงานเป็นทีมได้ดีมาก มีการแบ่งงานชัดเจน | ทำงานเป็นทีมได้ดี | ทำงานเป็นทีมได้ปานกลาง | ทำงานเป็นทีมได้น้อย |
| **Git Workflow** (15 คะแนน) | ใช้ workflow ซับซ้อนได้ถูกต้อง | ใช้ workflow ได้ดี | ใช้ workflow ได้พอใช้ | ใช้ workflow ไม่ถูกต้อง |
| **Code Review** (15 คะแนน) | Review ละเอียด มีคอมเมนต์ที่เป็นประโยชน์ | Review ดี มีคอมเมนต์บางส่วน | Review ได้ แต่ไม่ละเอียด | Review ไม่เพียงพอ |
| **Final Product** (15 คะแนน) | เว็บไซต์สมบูรณ์ ทำงานได้ดีมาก | เว็บไซต์ทำงานได้ดี | เว็บไซต์ทำงานได้บางส่วน | เว็บไซต์ไม่สมบูรณ์ |

### คะแนนพิเศษ (Bonus 10 คะแนน)
- การใช้ Advanced Git features (rebase, cherry-pick, stash)
- Documentation ที่ดีเยี่ยม
- การใช้ GitHub Actions หรือ automation tools
- การแก้ไข merge conflicts ได้ดี
- การนำเสนอที่โดดเด่น

### หมายเหตุ:
- ทุกคนในทีมจะได้คะแนนเท่ากันใน Part 2
- หากมีสมาชิกไม่มีส่วนร่วม จะได้คะแนนลดลง
- ต้องส่งงานตรงเวลาเท่านั้น
- สามารถใช้ ChatGPT หรือ AI tools ได้ แต่ต้องระบุในรายงาน

---

## Resources & References

### Git Commands Reference
```bash
# พื้นฐาน
git init
git clone <url>
git add <file>
git commit -m "message"
git push
git pull

# Branching
git branch
git checkout -b <branch>
git merge <branch>
git branch -d <branch>

# Remote
git remote add origin <url>
git remote -v
git push -u origin <branch>

# Advanced
git rebase
git cherry-pick
git stash
git tag
```

### GitHub Features
- Issues and Project boards
- Pull Requests and Code Review
- GitHub Actions
- Branch protection rules
- Collaborative features

### Best Practices
- เขียน commit messages ที่ชัดเจน
- ใช้ branch naming convention
- ทำ regular commits
- Review code ก่อน merge
- เขียน documentation ที่ดี