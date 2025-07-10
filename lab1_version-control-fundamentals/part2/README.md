## Part 2:  GitHub Workflow & Team Collaboration 🚀

### วัตถุประสงค์:

* เข้าใจและสามารถประยุกต์ใช้ GitHub Flow ในการทำงานร่วมกับผู้อื่น

* ฝึกฝนการใช้ Git commands ที่จำเป็นสำหรับการทำงานเป็นทีม (branch, commit, push, pull, merge)

* เรียนรู้กระบวนการ Pull Request (PR) และ Code Review

* ฝึกทักษะการแก้ไข Merge Conflict ที่อาจเกิดขึ้นในการทำงานจริง

### สถานการณ์จำลอง:
เรามีโปรเจกต์ Mini-Ecommerce (Version 1) ที่มีฟีเจอร์พื้นฐานแต่ยังพบปัญหาหลายอย่าง นักศึกษา 2 คนจะได้รับบทบาทเป็นนักพัฒนาเพื่อแก้ไขปัญหานี้

* Dev A (Frontend/UX Developer): รับผิดชอบการปรับปรุงหน้าตา (UI/UX), จัดการ Loading States และเพิ่มระบบ Notification

* Dev B (Backend/Logic Developer): รับผิดชอบการปรับปรุงประสิทธิภาพระบบค้นหาและเพิ่มการ Validation ข้อมูล

### Version 1: The Initial Project (โค้ดเริ่มต้น)
นี่คือโค้ดของโปรเจกต์ตั้งต้นที่ยังมีปัญหาอยู่

### โครงสร้างไฟล์:
```
mini-ecommerce/
├── index.html
├── js/
│   ├── main.js
│   └── products.json
├── css/
│   └── style.css
└── README.md
```
### ขั้นตอนที่ 1: สร้าง Repository และเชื่อมต่อกับ GitHub

#### 1.1 สร้างโฟลเดอร์โปรเจกต์
```bash
# สร้างโฟลเดอร์โปรเจกต์
mkdir mini-ecommerce
cd mini-ecommerce

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
    <title>Mini E-Commerce</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>My Simple Store</h1>
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="ค้นหาสินค้า...">
        </div>
    </header>
    <main id="product-list">
        </main>
    <script src="js/main.js"></script>
</body>
</html>
```
















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

