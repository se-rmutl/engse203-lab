## **ข้อสอบปฏิบัติกลางภาค (Midterm Practical Examination)**
### Version 1 - แบบฝึกหัดทบทวน (Take-Home Practice)
**รายวิชา:** ENGSE203 - Computer Programming for Software Engineer  
**หัวข้อ:** API Integration, DOM Manipulation, and React.js Application Development  
**เวลา:** 4 ชั่วโมง (240 นาที)  
**คะแนนเต็ม:** 100 คะแนน

-----

### **คำชี้แจงทั่วไป**

1.  **Academic Integrity**: ข้อสอบนี้เป็น **Open Book** อนุญาตให้ค้นคว้าข้อมูลจากแหล่งเรียนรู้ต่างๆ ได้ แต่ **ห้ามสื่อสารหรือปรึกษากับผู้อื่นโดยเด็ดขาด**
2.  **Version Control**: นักศึกษา **ต้อง** ใช้ Git บันทึกความคืบหน้าอย่างสม่ำเสมอ (อย่างน้อย 1 commit ต่อ 1 ข้อที่ทำเสร็จ)
3.  **Starter Project**: เริ่มต้นจาก copy ข้อมูลแต่ละไฟล์จากข้อสอบนี้ `starter-project` ซึ่งจะมีโครงสร้างและโค้ดให้ประมาณ 60% ตามที่ระบุในข้อสอบ
4.  **การส่งงาน**: ปฏิบัติตามขั้นตอนการส่งงานท้ายข้อสอบอย่างเคร่งครัด

-----

### **ภาพรวมของโปรเจกต์: "Recipe Finder" 🍳**

คุณจะต้องสร้างเว็บแอปพลิเคชันสำหรับค้นหาสูตรอาหาร โดยใช้ Public API จาก **TheMealDB** ซึ่งเป็นบริการฟรีที่ไม่ต้องใช้ API Key การทำงานจะแบ่งออกเป็น 2 ส่วนหลัก

-----

### **คำแนะนำการใช้ TheMealDB API**

API นี้ไม่จำเป็นต้องใช้ Key ในการเข้าถึง คุณสามารถใช้คำค้นหา (Keyword) ที่หลากหลายเพื่อทดสอบแอปพลิเคชันของคุณได้

**ตัวอย่างคำค้นหา (Keywords):**

  * **ค้นหาตามหมวดหมู่ (Category):** `Seafood`, `Chicken`, `Beef`, `Pork`, `Dessert`, `Vegetarian`, `Pasta`
  * **ค้นหาตามสัญชาติ (Cuisine):** `Thai`, `Japanese`, `Italian`, `Mexican`, `Indian`, `Chinese`
  * **ค้นหาตามชื่อเมนู (Specific Meal):** `Arrabiata`, `Sushi`, `Lasagne`, `Pad Thai`, `Tom Yum Goong`, `Spaghetti Carbonara`

**💡 คำแนะนำ:** เพื่อให้ง่ายต่อการทดสอบ ให้เริ่มจากการค้นหาด้วย **หมวดหมู่** เช่น `Chicken` เพื่อดูว่าแอปของคุณสามารถแสดงผลหลายรายการได้ถูกต้องหรือไม่

-----

-----

### **Part 1: Vanilla JS & API Integration (50 คะแนน)**

**เป้าหมาย:** ใช้ HTML, CSS, และ JavaScript (ES6+) เพื่อทำให้หน้าเว็บแบบ Static สามารถค้นหาและแสดงผลข้อมูลสูตรอาหารจาก API ได้

#### **โครงสร้างและไฟล์เริ่มต้น (Part 1)**

คุณจะได้รับไฟล์เริ่มต้นในโฟลเดอร์ `part1-vanilla-js/` ดังนี้:

  * **`index.html` (มีให้สมบูรณ์)**
    ```html
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recipe Finder - Vanilla JS</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div class="container">
            <header>
                <h1>🍳 Recipe Finder</h1>
                <form id="search-form">
                    <input type="text" id="search-input" placeholder="e.g., Chicken, Pasta, Thai...">
                    <button type="submit">Search</button>
                </form>
            </header>
            <main id="results-container">
                <div id="results-grid" class="results-grid">
                    <p class="placeholder">Type something in the search box to find recipes!</p>
                </div>
            </main>
        </div>
        <script src="js/script.js"></script>
    </body>
    </html>
    ```
  * **`style.css` (มีให้สมบูรณ์)**
    ```css
    /* (ไฟล์ CSS ที่สไตล์หน้าเว็บให้สวยงามทั้งหมดจะอยู่ในนี้) */
    body { font-family: sans-serif; background-color: #f0f2f5; margin: 0; }
    .container { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
    header { text-align: center; margin-bottom: 2rem; }
    h1 { color: #333; }
    #search-form { display: flex; max-width: 500px; margin: 1rem auto; }
    #search-input { flex-grow: 1; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px 0 0 4px; font-size: 1rem; }
    #search-form button { padding: 0.75rem 1.5rem; border: none; background-color: #007bff; color: white; border-radius: 0 4px 4px 0; cursor: pointer; }
    .results-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; }
    .meal-card { background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; }
    .meal-card img { width: 100%; height: 200px; object-fit: cover; }
    .meal-card h3 { padding: 1rem; font-size: 1.1rem; margin: 0; }
    .placeholder, .status-message { color: #666; text-align: center; grid-column: 1 / -1; }
    ```
  * **`js/script.js` (ไฟล์ว่างสำหรับให้นักศึกษาทำ)**

-----

#### **ข้อ 1.1: Project Setup & Git Initialization**

  * **เวลาที่แนะนำ:** 10 นาที
  * **คะแนน:** 5 คะแนน

<!-- end list -->

1.  เข้าไปที่โฟลเดอร์ `part1-vanilla-js` และรัน `git init`
2.  ทำการ **Initial Commit** สำหรับโปรเจกต์เริ่มต้นทั้งหมดด้วย message "feat: Initial project setup for Part 1"

-----

#### **ข้อ 1.2: Search & API Fetching**

  * **เวลาที่แนะนำ:** 60 นาที
  * **คะแนน:** 20 คะแนน

<!-- end list -->

1.  ใน `script.js` สร้างตัวแปรอ้างอิงถึง DOM Elements ที่จำเป็น (`<form>`, `<input>`, `<div id="results-grid">`)
2.  เพิ่ม `submit` event listener ให้กับฟอร์ม
3.  สร้าง `async function searchRecipes(keyword)` เพื่อ `fetch` ข้อมูลจาก `https://www.themealdb.com/api/json/v1/1/search.php?s=KEYWORD`
4.  เมื่อฟอร์มถูก submit ให้เรียกใช้ฟังก์ชัน `searchRecipes`

-----

#### **ข้อ 1.3: Display Results on DOM**

  * **เวลาที่แนะนำ:** 40 นาที
  * **คะแนน:** 15 คะแนน

<!-- end list -->

1.  สร้างฟังก์ชัน `displayRecipes(meals)`
2.  หาก `meals` เป็น `null` (ไม่พบผลลัพธ์) ให้แสดงข้อความ "No recipes found."
3.  หากพบข้อมูล ให้ใช้ `map` เพื่อสร้าง HTML string สำหรับแต่ละ `meal` แล้วนำไปแสดงผลใน `<div id="results-grid">` โดยใช้ `.innerHTML`
      * ใช้ `strMealThumb` สำหรับ `src` ของ `<img>` และ `strMeal` สำหรับ `<h3>`

-----

#### **ข้อ 1.4: Error Handling & Loading State**

  * **เวลาที่แนะนำ:** 10 นาที
  * **คะแนน:** 10 คะแนน

<!-- end list -->

1.  ก่อนเริ่ม `fetch` ให้แสดงข้อความ "Searching..." ใน `<div id="results-grid">`
2.  ใช้ `try...catch` เพื่อดักจับข้อผิดพลาด และถ้าเกิด Error ให้แสดงข้อความ "An error occurred."

**เมื่อทำ Part 1 เสร็จ ให้ Commit และสร้าง Tag:**

```bash
git add .
git commit -m "feat: Complete all features for Part 1"
git tag part-1-complete
```

-----

-----

### **Part 2: React.js Application with Vite (50 คะแนน)**

**เป้าหมาย:** สร้างแอปพลิเคชันเดิมขึ้นมาใหม่ด้วย React.js เพื่อฝึกฝนการคิดแบบ Component-Based, การจัดการ State, และการ Deploy

#### **โครงสร้างและไฟล์เริ่มต้น (Part 2)**

คุณจะต้องสร้างโปรเจกต์ Vite และสร้างไฟล์ตามโครงสร้างนี้ โดยคัดลอกโค้ดเริ่มต้นที่ให้ไปใส่ในไฟล์ที่เกี่ยวข้อง

  * **`part2-react/` (สร้างด้วย Vite)**
      * **`src/components/MealCard.jsx` (สร้างไฟล์เปล่า)**
      * **`src/components/SearchBar.jsx` (สร้างไฟล์เปล่า)**
      * **`src/App.jsx` (ใช้โค้ดเริ่มต้นนี้)**
        ```jsx
        import React, { useState, useEffect } from 'react';
        import SearchBar from './components/SearchBar';
        import MealCard from './components/MealCard';
        import './App.css';

        function App() {
          // TODO: สร้าง state สำหรับ meals, searchTerm, isLoading, error

          // TODO: สร้าง useEffect เพื่อ fetch ข้อมูลเมื่อ searchTerm เปลี่ยน

          const handleSearch = (term) => {
            // TODO: อัปเดต searchTerm state
          };

          return (
            <div className="container">
              <header>
                <h1>🍳 Recipe Finder (React)</h1>
                {/* TODO: Render SearchBar component และส่ง props ที่จำเป็น */}
              </header>
              <main>
                <div className="results-grid">
                  {/* TODO: ใช้ Conditional Rendering เพื่อแสดง Loading, Error, หรือ Meal Cards */}
                </div>
              </main>
            </div>
          );
        }

        export default App;
        ```
      * **`src/App.css` (ใช้ CSS เดียวกับ `style.css` ใน Part 1)**

-----

#### **ข้อ 2.1: Project Setup & Component Creation**

  * **เวลาที่แนะนำ:** 30 นาที
  * **คะแนน:** 10 คะแนน

<!-- end list -->

1.  สร้างโปรเจกต์ React ด้วย Vite: `npm create vite@latest part2-react -- --template react`
2.  สร้างไฟล์ components ตามโครงสร้างที่ให้ไว้
3.  **`SearchBar.jsx`**: สร้าง component ที่มี `<form>` และ `<input>` เพื่อรับคำค้นหา และเรียกใช้ฟังก์ชัน `onSearch` ที่รับมาจาก props เมื่อ submit
4.  **`MealCard.jsx`**: สร้าง component ที่รับ `prop` ชื่อ `meal` และแสดงผลรูปภาพกับชื่ออาหาร

-----

#### **ข้อ 2.2: State Management & API Fetching with Hooks**

  * **เวลาที่แนะนำ:** 60 นาที
  * **คะแนน:** 20 คะแนน

<!-- end list -->

1.  ใน `App.jsx`, ใช้ `useState` เพื่อสร้าง state สำหรับ `meals`, `searchTerm`, `isLoading`, และ `error`
2.  ใช้ `useEffect` เพื่อ `fetch` ข้อมูลจาก API ทุกครั้งที่ `searchTerm` เปลี่ยนแปลง โดยต้องจัดการสถานะ `isLoading` และ `error` ภายใน `useEffect` ด้วย
3.  **State Lifting**: ส่งฟังก์ชัน `handleSearch` เป็น `prop` ไปให้ `SearchBar.jsx` เพื่อให้ `App` component สามารถรับรู้คำค้นหาใหม่ได้

-----

#### **ข้อ 2.3: Conditional Rendering**

  * **เวลาที่แนะนำ:** 20 นาที
  * **คะแนน:** 10 คะแนน

<!-- end list -->

1.  ใน `App.jsx`, เขียน JSX เพื่อแสดงผลตามเงื่อนไข:
      * ถ้า `isLoading` เป็น `true`, แสดงข้อความ "Loading..."
      * ถ้า `error` มีค่า, แสดงข้อความ `error`
      * ถ้า `meals` มีข้อมูล, `map` ข้อมูลแล้ว render `MealCard` component
      * ถ้า `meals` เป็น array ว่าง (หลังค้นหา), แสดง "No recipes found."

-----

#### **ข้อ 2.4: Build & Deploy**

  * **เวลาที่แนะนำ:** 30 นาที
  * **คะแนน:** 10 คะแนน

<!-- end list -->

1.  **Production Build**: รันคำสั่ง `npm run build` เพื่อสร้างโฟลเดอร์ `dist`
2.  **Deploy**: นำโฟลเดอร์ `dist` ไป deploy บน **Netlify** หรือ **Vercel**
3.  ตรวจสอบว่า Live URL ที่ได้มาสามารถใช้งานแอปพลิเคชันได้จริง

-----

### **ขั้นตอนการส่งงาน (สำคัญมาก) 🔧**

1.  **Commit งานสุดท้าย**: เมื่อทำ Part 2 และ Deploy เสร็จแล้ว ให้ commit งานทั้งหมด
    ```bash
    git add .
    git commit -m "feat: Complete Part 2 and deploy to production"
    ```
2.  **สร้าง GitHub Repository**: สร้าง **Private Repository** บน GitHub และเชื่อมต่อ Local repository ของคุณ
3.  **เพิ่มผู้สอนเป็น Collaborator**: ที่หน้า Settings \> Collaborators เพิ่ม Username ของผู้สอน (`tkeatkaew`)
4.  **Push to GitHub**: Push โค้ดและ Tags ทั้งหมดขึ้น Repository
    ```bash
    git push origin main --tags
    ```
5.  **ส่งงานใน google sheet ของวิชา**:
      * ส่ง **URL ของ GitHub Repository** (Private) ของคุณ
      * ทำ README.md ข้อมูลการสอบ กลางภาคของวิชาและข้อมูลนักศึกษาต่างๆ โดยมี URL ของ Live App อยู่ด้วย
      * ส่ง **URL ของ Live App ที่ Deploy แล้ว** (เช่น `https://your-recipe-app.netlify.app`)
  
### **จากนั้นวันสอบจริงเพื่อพัฒนาต่อเป็น Version2 **
- SEC1: สอบวันที่ 19 สิงหาคม 2568 เวลา 8:00
- SEC1: สอบวันที่ 20 สิงหาคม 2568 เวลา 8:00