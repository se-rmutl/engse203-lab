## Part 1: Git Fundamentals & Local Development - [งานเดี่ยว] (40 คะแนน)

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
        <p>&copy; 2025 My Portfolio</p>
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
git remote add origin git@github.com:[your-username]/my-portfolio.git

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
# เปลี่ยนจาก: <p>&copy; 2025 My Portfolio</p>
# เป็น: <p>&copy; 2025 My Portfolio | Contact: myemail@example.com</p>

git add .
git commit -m "Add contact info to footer"
git push -u origin feature/update-contact
```

#### 4.2 สร้างการเปลี่ยนแปลงใน Main Branch
```bash
# กลับไปยัง main
git checkout main

# แก้ไข footer เหมือนกัน แต่ต่างกัน
# เปลี่ยนเป็น: <p>&copy; 2025 My Portfolio | Version 1.0</p>

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
# เลือกรวม: <p>&copy; 2025 My Portfolio | Version 1.0 | Contact: myemail@example.com</p>

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

## 📚 Additional Resources

- [Git Official Documentation](https://git-scm.com/doc)
- [GitHub Desktop Documentation](https://docs.github.com/en/desktop)
- [VS Code Git Integration](https://code.visualstudio.com/docs/editor/versioncontrol)
- [Interactive Git Tutorial](https://learngitbranching.js.org/)

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

## Rubric การให้คะแนน

### Part 1: Git Fundamentals (40 คะแนน)

| หัวข้อ | ดีเยี่ยม (9-10) | ดี (7-8) | ปานกลาง (5-6) | ต้องปรับปรุง (1-4) |
|--------|----------------|----------|----------------|-------------------|
| **Repository Setup** (10 คะแนน) | Repository ตั้งค่าถูกต้อง มี commit history ที่ดี | Repository ตั้งค่าถูกต้อง มี commit เพียงพอ | Repository ตั้งค่าได้ แต่ commit ไม่เพียงพอ | Repository ไม่สมบูรณ์ |
| **Branch Management** (10 คะแนน) | ใช้ branch ถูกต้อง merge สำเร็จ | ใช้ branch ได้ แต่ merge มีปัญหาเล็กน้อย | สร้าง branch ได้ แต่ merge ไม่สมบูรณ์ | ไม่สามารถใช้ branch ได้ |
| **Code Quality** (10 คะแนน) | Code สะอาด ทำงานได้สมบูรณ์ | Code ทำงานได้ มีข้อผิดพลาดเล็กน้อย | Code ทำงานได้บางส่วน | Code ไม่ทำงาน |
| **Git Commands** (10 คะแนน) | ใช้ commands ได้หลากหลาย และถูกต้อง | ใช้ commands พื้นฐานได้ดี | ใช้ commands ได้บางส่วน | ใช้ commands ไม่ถูกต้อง |

**Next**: Continue to [Part 2: Advanced Git Workflow & Team Collaboration](../part2)