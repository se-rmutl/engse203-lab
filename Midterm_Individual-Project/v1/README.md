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

### **เกณฑ์การให้คะแนน (สรุป)**

| ส่วน | ข้อ | รายละเอียด | คะแนน |
| :--- | :--- | :--- | :--- |
| **Part 1** | 1.1 | Git Setup | 5 |
| | 1.2 | Search & API Fetching | 20 |
| | 1.3 | Display Results | 15 |
| | 1.4 | Error/Loading State | 10 |
| **Part 2** | 2.1 | Project Setup & Components | 10 |
| | 2.2 | State & API Hooks | 20 |
| | 2.3 | Conditional Rendering | 10 |
| | 2.4 | Build & Deploy | 10 |
| **รวม** | | | **100** |

  * **หมายเหตุ**: การมี Git history ที่ดี (commits สม่ำเสมอและมี message ที่สื่อความหมาย) เป็นสิ่งจำเป็น หากไม่มีการ commit ตามที่กำหนด อาจถูกหักคะแนนส่วน Code Quality

-----

### **ภาพรวมของโปรเจกต์: "Recipe Finder" 🍳**

ในข้อสอบนี้ คุณจะต้องสร้างเว็บแอปพลิเคชันสำหรับค้นหาสูตรอาหาร โดยใช้ Public API จาก **TheMealDB** ซึ่งเป็นบริการฟรีที่ไม่ต้องใช้ API Key การทำงานจะแบ่งออกเป็น 2 ส่วนหลัก เพื่อวัดความเข้าใจในเทคโนโลยีที่แตกต่างกัน

-----

### **คำแนะนำการใช้ TheMealDB API**

นอกจากการค้นหาแล้ว TheMealDB API ยังสามารถดึงข้อมูลของเมนูอาหารที่เจาะจงด้วย ID ได้

  * **Endpoint สำหรับดึงข้อมูลตาม ID**: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=MEAL_ID`
      * แทนที่ `MEAL_ID` ด้วย ID ของเมนูอาหาร (เช่น `52772`)
      * ผลลัพธ์ที่ได้จะมีข้อมูล `strInstructions` (วิธีทำ), `strIngredient1` - `strIngredient20` (ส่วนผสม), และ `strYoutube` (ลิงก์วิดีโอ)

API นี้ไม่จำเป็นต้องใช้ Key ในการเข้าถึง คุณสามารถใช้คำค้นหา (Keyword) ที่หลากหลายเพื่อทดสอบแอปพลิเคชันของคุณได้

**ตัวอย่างคำค้นหา (Keywords):**

  * **ค้นหาตามหมวดหมู่ (Category):** `Seafood`, `Chicken`, `Beef`, `Pork`, `Dessert`, `Vegetarian`, `Pasta`
  * **ค้นหาตามสัญชาติ (Cuisine):** `Thai`, `Japanese`, `Italian`, `Mexican`, `Indian`, `Chinese`
  * **ค้นหาตามชื่อเมนู (Specific Meal):** `Arrabiata`, `Sushi`, `Lasagne`, `Pad Thai`, `Tom Yum Goong`, `Spaghetti Carbonara`

**💡 คำแนะนำ:** เพื่อให้ง่ายต่อการทดสอบ ให้เริ่มจากการค้นหาด้วย **หมวดหมู่** เช่น `Chicken` เพื่อดูว่าแอปของคุณสามารถแสดงผลหลายรายการได้ถูกต้องหรือไม่

-----
### **เริ่มต้นโดยการสร้าง repository บน github สำหรับสอบกลางภาค**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com) กดที่นี่

- ที่ github สร้าง repository ใหม่ชื่อ `engse2003-midterm-รหัสนักศึกษา` เป็น `private`
- **เพิ่มผู้สอนเป็น Collaborator**: ที่หน้า Settings \> Collaborators เพิ่ม Username ของผู้สอน (`tkeatkaew`)
- ทำการ clone มาที่ local เพื่อทำการพัฒนาต่อ แบบ SSH
- สร้างและเข้าไปที่โฟลเดอร์ `part1-vanilla-js`

-----

### **Part 1: Vanilla JS & API Integration (50 คะแนน)**

**เป้าหมาย:** ใช้ HTML, CSS, และ JavaScript (ES6+) เพื่อทำให้หน้าเว็บแบบ Static สามารถค้นหาและแสดงผลข้อมูลสูตรอาหารจาก API ได้

-----

#### **โครงสร้างและไฟล์เริ่มต้น (Part 1)**

```
part1-vanilla-js/
├── index.html         // โครงสร้าง HTML (มี container ว่างๆ รอ JS)
├── style.css          // CSS ที่สไตล์ให้แล้ว 100%
└── js/
    └── script.js      // ไฟล์หลักสำหรับเขียน JavaScript (ว่าง)
```
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

1.  เข้าไปที่โฟลเดอร์ `part1-vanilla-js` 
2.  ทำการ **Initial Commit** สำหรับโปรเจกต์เริ่มต้นทั้งหมดด้วย message "feat: Initial project setup for Part 1"

-----

#### **ข้อ 1.2: Search & API Fetching**

  * **เวลาที่แนะนำ:** 60 นาที
  * **คะแนน:** 20 คะแนน

<!-- end list -->

1.  **เลือก DOM Elements**: ใน `script.js` สร้างตัวแปรเพื่ออ้างอิงถึง `<form>`, `<input id="search-input">`, และ `<div id="results-grid">`
2.  **เพิ่ม Event Listener**: ดักจับ `submit` event ของฟอร์ม เมื่อผู้ใช้ค้นหา ให้ดึงค่าจาก input ออกมา
3.  **สร้าง `async function`**: เขียนฟังก์ชัน (เช่น `searchRecipes(keyword)`) เพื่อดึงข้อมูลจาก TheMealDB API
      * **API Endpoint**: `https://www.themealdb.com/api/json/v1/1/search.php?s=KEYWORD`
      * แทนที่ `KEYWORD` ด้วยคำที่ผู้ใช้ค้นหา
      * ใช้ `fetch` และ `async/await` ในการดึงข้อมูล
4.  **เรียกใช้ฟังก์ชัน**: เมื่อฟอร์มถูก submit ให้เรียกใช้ฟังก์ชัน `searchRecipes` พร้อมส่งคำค้นหาเข้าไป

-----

#### **ข้อ 1.3: Display Results on DOM**

  * **เวลาที่แนะนำ:** 40 นาที
  * **คะแนน:** 15 คะแนน

<!-- end list -->

1.  **สร้างฟังก์ชันแสดงผล**: เขียนฟังก์ชันใหม่ (เช่น `displayRecipes(meals)`) ที่รับ `array` ของสูตรอาหารเป็นพารามิเตอร์
2.  **ตรวจสอบข้อมูล**: หาก `meals` เป็น `null` (ไม่พบผลลัพธ์) ให้แสดงข้อความ "No recipes found." ใน `<div id="results-grid">`
3.  **วนลูปและสร้าง Element**: หากพบข้อมูล ให้ล้างข้อมูลเก่าใน `<div id="results-grid">` ออกก่อน จากนั้นใช้ `map` หรือ `forEach` เพื่อวนลูป `meals`
4.  **สร้าง Meal Card**: สำหรับแต่ละ `meal` ให้สร้าง HTML string หรือ DOM element ที่มีโครงสร้างดังนี้:
    ```html
    <div class="meal-card">
      <img src="URL_IMAGE_FROM_API" alt="TITLE_FROM_API">
      <h3>TITLE_FROM_API</h3>
    </div>
    ```
      * ใช้ข้อมูล `strMealThumb` สำหรับ URL รูปภาพ และ `strMeal` สำหรับชื่ออาหาร ที่ `<h3>`
5.  **นำไปแสดงผล**: นำ Meal Card ทั้งหมดที่สร้างขึ้นไปใส่ใน `<div id="results-grid">`

-----

#### **ข้อ 1.4: Error Handling & Loading State**

  * **เวลาที่แนะนำ:** 10 นาที
  * **คะแนน:** 10 คะแนน

<!-- end list -->

1.  **Loading State**: ก่อนเริ่ม `fetch` ข้อมูล ให้แสดงข้อความ "Searching for recipes..." ใน `<div id="results-grid">`
2.  **Error Handling**: ใช้ `try...catch` block ใน `async function` ของคุณ เพื่อดักจับข้อผิดพลาดที่อาจเกิดขึ้นจากการเชื่อมต่อ API
3.  **แสดงข้อผิดพลาด**: หากเกิด Error ให้แสดงข้อความ "An error occurred. Please try again later." ใน `<div id="results-grid">`

**เมื่อทำ Part 1 เสร็จสมบูรณ์ ให้ Commit งานและสร้าง Tag:**

```bash
git add .
git commit -m "feat: Complete all features for Part 1"
git tag part-1-complete
```

-----

### **Part 2: React.js Application with Vite (50 คะแนน)**

-----

### **Part 2: React.js Application with Vite (50 คะแนน)**

**เป้าหมาย:** สร้างแอปพลิเคชันเดิมขึ้นมาใหม่ด้วย React.js เพื่อฝึกฝนการคิดแบบ Component-Based, การจัดการ State, และการ Build for Production

**โครงสร้างไฟล์เริ่มต้น (Part 2):**

```
part2-react/
└── src/
    ├── components/
    │   ├── MealCard.jsx       // (สร้างไฟล์ให้ แต่ข้างในว่าง)
    │   └── SearchBar.jsx      // (สร้างไฟล์ให้ แต่ข้างในว่าง)
    ├── App.jsx                // (มีโครงสร้าง JSX และ import พื้นฐานให้)
    └── index.css              // (มี CSS ให้แล้ว)
```

-----

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

1.  สร้างโปรเจกต์ React ด้วย Vite: `npm create vite@latest part2-react -- --template react` จากนั้น `cd part2-react` และ `npm install`
2.  สร้างไฟล์ components ตามโครงสร้างที่ให้ไว้
3.  **`SearchBar.jsx`**: สร้าง component ที่มี `<form>` และ `<input>` เพื่อรับคำค้นหา และเรียกใช้ฟังก์ชัน `onSearch` ที่รับมาจาก props เมื่อ submit
4.  **`MealCard.jsx`**: สร้าง component ที่รับ `props` (เช่น `meal`) และแสดงผลรูปภาพ (`strMealThumb`) กับชื่ออาหาร (`strMeal`)


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

1.  ใน `App.jsx` เขียน JSX เพื่อแสดงผลตามเงื่อนไขของ State:
      * ถ้า `isLoading` เป็น `true` ให้แสดงข้อความ "Loading..."
      * ถ้า `error` มีค่า ให้แสดงข้อความ `error`
      * ถ้า `meals` มีข้อมูล ให้ `map` ผ่าน `meals` แล้ว render `MealCard` component สำหรับแต่ละรายการ
      * ถ้า `meals` เป็น array ว่าง (หลังจากค้นหา) ให้แสดง "No recipes found."

-----

#### **ข้อ 2.4: Build & Deploy**

  * **เวลาที่แนะนำ:** 30 นาที
  * **คะแนน:** 10 คะแนน

<!-- end list -->

1.  **Production Build**: รันคำสั่ง `npm run build` ใน terminal เพื่อสร้าง production-ready files ในโฟลเดอร์ `dist`
2.  **Deploy**: นำโฟลเดอร์ `dist` ที่ได้ไป deploy บนบริการฟรี เช่น **Netlify** หรือ **Vercel**
      * (วิธีที่ง่ายที่สุดคือการลากและวางโฟลเดอร์ `dist` ของคุณไปที่หน้า Deploy ของ Netlify)
3.  **ตรวจสอบ**: เข้าไปที่ URL ที่ได้จากการ deploy เพื่อให้แน่ใจว่าแอปพลิเคชันทำงานได้จริง

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
      * ทำ README.md ใส่ข้อมูลการสอบ Midterm ของวิชาและข้อมูลนักศึกษาต่างๆ โดยมี URL ของ Live App ทั้ง 2 part (เฉพาะ version 2) อยู่ด้วย
      * ส่ง **URL ของ Live App Part1 ที่ Deploy แล้ว** (เช่น `https://6712345678-recipe-finder-part1.netlify.app`)
      * ส่ง **URL ของ Live App Part2 ที่ Deploy แล้ว** (เช่น `https://6712345678-recipe-finder-part2.netlify.app`)
-----

### **วันสอบจริงเพื่อพัฒนาต่อเป็น Version 2  กำหนดดังนี้**
- **SEC1:** สอบวันที่ 26 สิงหาคม 2568 เวลา 8:00
- **SEC2:** สอบวันที่ 27 สิงหาคม 2568 เวลา 8:00

-----
