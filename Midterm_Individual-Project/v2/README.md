# **ข้อสอบปฏิบัติกลางภาค (Midterm Practical Examination) - Version 2**

[![Course](https://img.shields.io/badge/Course-ENGSE203-blue)](https://github.com) [![Language](https://img.shields.io/badge/Language-JavaScript-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![Framework](https://img.shields.io/badge/Framework-React-61DAFB)](https://reactjs.org/) [![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**รายวิชา:** ENGSE203 - Computer Programming for Software Engineer  
**หัวข้อ:** Advanced API Interaction, DOM, and React Routing  
**เวลา:** 4 ชั่วโมง (240 นาที)  
**คะแนนเต็ม:** 100 คะแนน

-----

### **คำชี้แจงทั่วไป**

1. **Prerequisite**: ข้อสอบนี้เป็นการต่อยอดจาก **"Recipe Finder" Version 1** ที่นักศึกษาทำเสร็จแล้ว
2. **Academic Integrity**: ข้อสอบนี้เป็น **Open Book** แต่ **ห้ามใช้ AI Tools และห้ามสื่อสารกับผู้อื่นโดยเด็ดขาต**
3. **Version Control**: การใช้ Git อย่างถูกต้องเป็นส่วนหนึ่งของการให้คะแนน
4. **เริ่มต้น**: ใช้โค้ด Version 1 ที่ทำเสร็จแล้วเป็นฐาน

---

### **เกณฑ์การให้คะแนน (สรุป)**

| ส่วน | ข้อ | รายละเอียด | คะแนน |
| :--- | :--- | :--- | :--- |
| **Part 1** | 1.1 | Git Branching & Setup | 5 |
| | 1.2 | HTML Structure สำหรับหน้ารายละเอียด | 10 |
| | 1.3 | Event Handling สำหรับคลิกเมื่อเลือกอาหาร | 15 |
| | 1.4 | API Integration & Display รายละเอียด | 20 |
| **Part 2** | 2.1 | Router Setup & File Organization | 10 |
| | 2.2 | Component Refactoring | 15 |
| | 2.3 | URL Parameters & Navigation | 15 |
| | 2.4 | Complete Detail Page | 10 |
| **รวม** | | | **100** |

---

## **ภาพรวมของโปรเจกต์: "Recipe Finder V2 - Meal Details" 🍲**

ใน Version 2 นี้ คุณจะต้องต่อยอดจากแอปพลิเคชันเดิม โดยเพิ่มความสามารถหลักใหม่:

### **🎯 ฟีเจอร์ใหม่ที่ต้องเพิ่ม:**
1. **คลิกดูรายละเอียด**: เมื่อคลิกที่ Meal Card จะแสดงหน้ารายละเอียดอาหาร
2. **หน้ารายละเอียดสมบูรณ์**: แสดงส่วนผสม, วิธีทำ, และลิงก์วิดีโอ
3. **Navigation**: ปุ่มกลับไปหน้าค้นหา
4. **React Router**: สำหรับ Part 2 ให้ใช้ URL routing แทนการแสดง/ซ่อน

### **📊 API Endpoint เพิ่มเติมสำหรับ V2:**
- **ดึงรายละเอียดตาม ID**: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=MEAL_ID`
  - ใช้ `meal.idMeal` จาก search results เป็น `MEAL_ID`
  - Response จะมี `strInstructions`, `strIngredient1-20`, `strMeasure1-20`, `strYoutube`

### **🎬 Demo ผลลัพธ์ที่คาดหวัง:**
1. ผู้ใช้ค้นหา "Chicken" → เห็น meal cards เหมือนเดิม
2. คลิกที่ meal card ใดก็ได้ → เปลี่ยนเป็นหน้ารายละเอียดแสดง:
   - ชื่ออาหารและรูปภาพขนาดใหญ่
   - รายการส่วนผสมพร้อมปริมาณ
   - วิธีการทำอาหารแบบละเอียด
   - ลิงก์วิดีโอ YouTube (ถ้ามี)
3. คลิกปุ่ม "กลับไปค้นหา" → กลับไปหน้าเดิม

---

### **เริ่มต้นโดยการสร้าง Branch ใหม่**

```bash
# เข้าไปที่โปรเจกต์ V1 ของคุณ
cd engse203-midterm-[รหัสนักศึกษา]

# สร้าง branch ใหม่สำหรับ V2
git checkout -b version-2-development

# ตรวจสอบให้แน่ใจว่าอยู่ใน branch ที่ถูกต้อง
git branch
```

---

## **Part 1: Vanilla JavaScript Enhancement (50 คะแนน)**

**เป้าหมาย:** เพิ่มฟีเจอร์การดูรายละเอียดอาหารในโปรเจกต์ Vanilla JS เดิม

---

### **ข้อ 1.1: Git Setup & Project Analysis (5 คะแนน)**
**เวลาที่แนะนำ:** 10 นาที

1. **สร้าง branch ใหม่** สำหรับทำ V2:
   ```bash
   git checkout -b version-2-development
   ```

2. **สร้างไฟล์วิเคราะห์** `ANALYSIS.md` และตอบคำถามเหล่านี้:
   ```markdown
   # Version 2 Development Plan
   
   ## คำถามที่ต้องตอบก่อนเริ่มเขียนโค้ด:
   
   ### 1. DOM Elements ที่ต้องเพิ่ม
   - ต้องเพิ่ม HTML element ใดบ้างสำหรับแสดงรายละเอียดอาหาร?
   - จะจัดการการแสดง/ซ่อนระหว่างหน้าค้นหาและหน้ารายละเอียดอย่างไร?
   
   ### 2. Event Handling Strategy  
   - จะเพิ่ม click event ให้ meal cards ที่สร้างแบบ dynamic ได้อย่างไร?
   - ต้องส่งข้อมูล meal ID ไปยังฟังก์ชันใหม่อย่างไร?
   
   ### 3. API Integration Plan
   - API endpoint สำหรับดึงรายละเอียดคืออะไร?
   - ข้อมูลส่วนผสม (ingredients) มาในรูปแบบไหน และต้องประมวลผลอย่างไร?
   ```

3. **Commit แรก**:
   ```bash
   git add ANALYSIS.md
   git commit -m "เริ่มต้น V2: วิเคราะห์โครงสร้างและวางแผนการพัฒนา"
   ```

---

### **ข้อ 1.2: HTML Structure สำหรับหน้ารายละเอียด (10 คะแนน)**
**เวลาที่แนะนำ:** 25 นาที

**งานที่ต้องทำ:** เพิ่ม HTML structure สำหรับแสดงรายละเอียดอาหาร

1. **เพิ่ม HTML section ใหม่** ใน `index.html` (หลัง `</main>` ของส่วนค้นหา):

```html
<!-- Meal Details Section -->
<section id="meal-details-section" class="meal-details hidden">
    <div class="container">
        <!-- Back Button -->
        <button id="back-to-search-btn" class="back-button">
            ← กลับไปค้นหาอาหาร
        </button>
        
        <!-- Loading State -->
        <div id="details-loading" class="loading-message hidden">
            กำลังโหลดรายละเอียดอาหาร...
        </div>
        
        <!-- Error State -->
        <div id="details-error" class="error-message hidden">
            เกิดข้อผิดพลาด ไม่สามารถโหลดข้อมูลได้
        </div>
        
        <!-- Meal Details Content -->
        <div id="meal-details-content" class="meal-details-content hidden">
            <!-- เนื้อหารายละเอียดจะถูกสร้างด้วย JavaScript -->
        </div>
    </div>
</section>
```

2. **เพิ่ม CSS Styles** ใน `style.css`:

```css
/* Meal Details Styles */
.meal-details {
    min-height: 100vh;
    padding: 2rem 0;
}

.hidden {
    display: none !important;
}

.back-button {
    background: #6c757d;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-bottom: 2rem;
    transition: background-color 0.3s ease;
}

.back-button:hover {
    background: #545b62;
}

.meal-details-content {
    background: white;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.meal-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
}

.meal-header img {
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
}

.meal-info h1 {
    color: var(--primary-color, #2c3e50);
    margin-bottom: 1rem;
}

.ingredients-section, .instructions-section {
    margin: 2rem 0;
}

.ingredients-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 0.5rem;
    list-style: none;
    padding: 0;
}

.ingredients-list li {
    background: #f8f9fa;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border-left: 3px solid #007bff;
}

.instructions-text {
    line-height: 1.8;
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    white-space: pre-line;
}

.video-link {
    display: inline-block;
    background: #dc3545;
    color: white;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    margin-top: 1rem;
    transition: background-color 0.3s ease;
}

.video-link:hover {
    background: #c82333;
}

/* Responsive Design */
@media (max-width: 768px) {
    .meal-header {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .ingredients-list {
        grid-template-columns: 1fr;
    }
}
```

3. **เพิ่มฟังก์ชันสำหรับการแสดง/ซ่อน sections** ใน `script.js`:

```javascript
// Global variables สำหรับ DOM elements
let mealDetailsSection = null;
let resultsContainer = null;

// Function เพื่อ initialize DOM elements
function initializeDOMElements() {
    mealDetailsSection = document.getElementById('meal-details-section');
    resultsContainer = document.getElementById('results-container');
    
    // Test ว่า elements ถูกเลือกมาได้หรือไม่
    console.log('Meal details section:', mealDetailsSection);
    console.log('Results container:', resultsContainer);
}

// Function สำหรับแสดงหน้ารายละเอียด
function showMealDetailsPage() {
    if (resultsContainer) resultsContainer.style.display = 'none';
    if (mealDetailsSection) mealDetailsSection.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Function สำหรับแสดงหน้าค้นหา
function showSearchPage() {
    if (mealDetailsSection) mealDetailsSection.classList.add('hidden');
    if (resultsContainer) resultsContainer.style.display = 'block';
}

// เรียกใช้ initialize เมื่อ DOM โหลดเสร็จ
document.addEventListener('DOMContentLoaded', initializeDOMElements);
```

4. **Commit งาน**:
```bash
git add .
git commit -m "เพิ่ม HTML structure และ CSS สำหรับหน้ารายละเอียดอาหาร"
```

---

### **ข้อ 1.3: Event Handling สำหรับคลิกเมื่อเลือกอาหาร (15 คะแนน)**
**เวลาที่แนะนำ:** 40 นาที

**งานที่ต้องทำ:** เพิ่ม event handling เพื่อให้คลิกที่ meal card แล้วไปหน้ารายละเอียดได้

1. **แก้ไขฟังก์ชัน `displayRecipes`** ให้เพิ่ม `data-meal-id` ในทุก meal card:

```javascript
function displayRecipes(meals) {
    const resultsGrid = document.getElementById('results-grid');
    
    if (!meals) {
        resultsGrid.innerHTML = '<p class="status-message">No recipes found.</p>';
        return;
    }
    
    resultsGrid.innerHTML = '';
    
    meals.forEach(meal => {
        // สร้าง meal card พร้อม data-meal-id
        const mealCard = document.createElement('div');
        mealCard.className = 'meal-card';
        mealCard.setAttribute('data-meal-id', meal.idMeal); // สำคัญ!
        mealCard.style.cursor = 'pointer'; // แสดงว่าคลิกได้
        
        mealCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
        `;
        
        resultsGrid.appendChild(mealCard);
    });
    
    console.log('แสดงผลลัพธ์:', meals.length, 'รายการ');
}
```

2. **เพิ่ม Event Delegation** เพื่อจับการคลิกที่ meal cards:

```javascript
// Event delegation สำหรับจับการคลิกที่ meal cards
function setupMealCardClickHandlers() {
    const resultsGrid = document.getElementById('results-grid');
    
    resultsGrid.addEventListener('click', function(event) {
        console.log('คลิกที่:', event.target);
        
        // หา meal card ที่ใกล้ที่สุด
        const mealCard = event.target.closest('.meal-card');
        
        if (mealCard) {
            const mealId = mealCard.getAttribute('data-meal-id');
            console.log('คลิกที่ meal ID:', mealId);
            
            if (mealId) {
                // เรียกฟังก์ชันเพื่อโหลดรายละเอียด
                loadMealDetails(mealId);
            }
        }
    });
    
    console.log('ติดตั้ง event listener สำหรับ meal cards แล้ว');
}
```

3. **เพิ่ม Event Handler สำหรับปุ่มกลับ**:

```javascript
function setupBackButtonHandler() {
    const backButton = document.getElementById('back-to-search-btn');
    
    if (backButton) {
        backButton.addEventListener('click', function() {
            console.log('กดปุ่มกลับ');
            showSearchPage();
        });
        
        console.log('ติดตั้ง event listener สำหรับปุ่มกลับแล้ว');
    }
}
```

4. **เรียกใช้ Event Handlers** ใน initialization:

```javascript
// อัปเดตฟังก์ชัน initializeDOMElements
function initializeDOMElements() {
    mealDetailsSection = document.getElementById('meal-details-section');
    resultsContainer = document.getElementById('results-container');
    
    // ติดตั้ง event handlers
    setupMealCardClickHandlers();
    setupBackButtonHandler();
    
    console.log('Initialize DOM elements และ event handlers เสร็จแล้ว');
}
```

5. **สร้างฟังก์ชัน placeholder สำหรับ loadMealDetails**:

```javascript
// Placeholder function สำหรับโหลดรายละเอียด (จะทำจริงในข้อต่อไป)
function loadMealDetails(mealId) {
    console.log('กำลังโหลดรายละเอียดสำหรับ meal ID:', mealId);
    
    // แสดงหน้ารายละเอียดก่อน (เพื่อทดสอบการทำงาน)
    showMealDetailsPage();
    
    // แสดง loading state
    document.getElementById('details-loading').classList.remove('hidden');
    document.getElementById('meal-details-content').classList.add('hidden');
    document.getElementById('details-error').classList.add('hidden');
    
    // TODO: จะเพิ่มการเรียก API จริงในข้อ 1.4
}
```

6. **ทดสอบและ Commit**:
```bash
# ทดสอบใน browser:
# 1. ค้นหาอาหาร
# 2. คลิกที่ meal card 
# 3. ควรเปลี่ยนไปหน้ารายละเอียด
# 4. คลิกปุ่มกลับควรกลับมาหน้าค้นหา

git add .
git commit -m "เพิ่ม event handling สำหรับคลิก meal cards และปุ่มกลับ"
```

---

### **ข้อ 1.4: API Integration & Display รายละเอียด (20 คะแนน)**
**เวลาที่แนะนำ:** 75 นาที

**งานที่ต้องทำ:** เรียกใช้ API เพื่อดึงรายละเอียดอาหาร และแสดงผลแบบสมบูรณ์

1. **สร้างฟังก์ชันเรียก API สำหรับรายละเอียด**:

```javascript
async function fetchMealDetails(mealId) {
    console.log('กำลังดึงข้อมูลรายละเอียดสำหรับ ID:', mealId);
    
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    console.log('API URL:', apiUrl);
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log('ข้อมูลที่ได้จาก API:', data);
        
        if (data.meals && data.meals.length > 0) {
            return data.meals[0]; // return meal object
        } else {
            throw new Error('ไม่พบข้อมูลอาหาร');
        }
    } catch (error) {
        console.error('Error fetching meal details:', error);
        throw error;
    }
}
```

2. **สร้างฟังก์ชันประมวลผลส่วนผสม**:

```javascript
function processMealIngredients(meal) {
    const ingredients = [];
    
    // วนลูปเพื่อรวบรวมส่วนผสมจาก strIngredient1-20 และ strMeasure1-20
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        
        // ตรวจสอบว่ามีส่วนผสมหรือไม่
        if (ingredient && ingredient.trim() !== '') {
            let ingredientText = '';
            
            if (measure && measure.trim() !== '') {
                ingredientText = `${measure.trim()} ${ingredient.trim()}`;
            } else {
                ingredientText = ingredient.trim();
            }
            
            ingredients.push(ingredientText);
        }
    }
    
    console.log('ส่วนผสมที่ประมวลผลแล้ว:', ingredients);
    return ingredients;
}
```

3. **สร้างฟังก์ชันแสดงรายละเอียด**:

```javascript
function displayMealDetailsContent(meal) {
    console.log('แสดงรายละเอียดของ:', meal.strMeal);
    
    const contentDiv = document.getElementById('meal-details-content');
    const ingredients = processMealIngredients(meal);
    
    // สร้าง HTML สำหรับแสดงรายละเอียด
    const detailsHTML = `
        <div class="meal-header">
            <div class="meal-image">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            <div class="meal-info">
                <h1>${meal.strMeal}</h1>
                <p><strong>หมวดหมู่:</strong> ${meal.strCategory || 'ไม่ระบุ'}</p>
                <p><strong>ประเทศ:</strong> ${meal.strArea || 'ไม่ระบุ'}</p>
                ${meal.strTags ? `<p><strong>แท็ก:</strong> ${meal.strTags}</p>` : ''}
            </div>
        </div>
        
        <div class="ingredients-section">
            <h2>🥘 ส่วนผสม</h2>
            <ul class="ingredients-list">
                ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>
        
        <div class="instructions-section">
            <h2>👨‍🍳 วิธีทำ</h2>
            <div class="instructions-text">${meal.strInstructions || 'ไม่มีข้อมูลวิธีทำ'}</div>
        </div>
        
        ${meal.strYoutube ? `
            <div class="video-section">
                <h2>📺 วิดีโอการทำ</h2>
                <a href="${meal.strYoutube}" target="_blank" class="video-link">
                    ดูวิดีโอใน YouTube
                </a>
            </div>
        ` : ''}
    `;
    
    contentDiv.innerHTML = detailsHTML;
}
```

4. **อัปเดตฟังก์ชัน `loadMealDetails`** ให้เรียก API จริง:

```javascript
async function loadMealDetails(mealId) {
    console.log('เริ่มโหลดรายละเอียดสำหรับ meal ID:', mealId);
    
    // แสดงหน้ารายละเอียดและ loading state
    showMealDetailsPage();
    
    const loadingDiv = document.getElementById('details-loading');
    const contentDiv = document.getElementById('meal-details-content');
    const errorDiv = document.getElementById('details-error');
    
    // แสดง loading, ซ่อนส่วนอื่น
    loadingDiv.classList.remove('hidden');
    contentDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    
    try {
        // เรียก API
        const meal = await fetchMealDetails(mealId);
        
        // แสดงรายละเอียด
        displayMealDetailsContent(meal);
        
        // ซ่อน loading, แสดง content
        loadingDiv.classList.add('hidden');
        contentDiv.classList.remove('hidden');
        
    } catch (error) {
        console.error('ไม่สามารถโหลดรายละเอียดได้:', error);
        
        // แสดง error message
        errorDiv.textContent = `เกิดข้อผิดพลาด: ${error.message}`;
        errorDiv.classList.remove('hidden');
        loadingDiv.classList.add('hidden');
    }
}
```

5. **ทดสอบการทำงาน**:

```javascript
// เพิ่มฟังก์ชันทดสอบ (optional)
function testMealDetails() {
    // ทดสอบด้วย Meal ID ที่รู้ว่ามีข้อมูล
    loadMealDetails('52772'); // Teriyaki Chicken Casserole
}

// สามารถเรียกใน console เพื่อทดสอบ: testMealDetails()
```

6. **Final Testing & Commit**:

```bash
# ทดสอบครบทุก flow:
# 1. ค้นหาอาหาร (เช่น "chicken")
# 2. คลิกที่ meal card ใดก็ได้  
# 3. ควรเห็นหน้า loading แล้วแสดงรายละเอียด
# 4. ทดสอบส่วนผสม, วิธีทำ, ลิงก์วิดีโอ
# 5. คลิกปุ่มกลับ

git add .
git commit -m "เสร็จสิ้น Part 1: API integration และแสดงรายละเอียดอาหารครบถ้วน"
git tag part1-v2-complete
```

---

## **Part 2: React.js with Router (50 คะแนน)**

**เป้าหมาย:** สร้างเวอร์ชัน React ที่ใช้ URL routing สำหรับหน้ารายละเอียด

---

### **ข้อ 2.1: Router Setup & File Organization (10 คะแนน)**
**เวลาที่แนะนำ:** 25 นาที

**งานที่ต้องทำ:** ติดตั้ง React Router และจัดระเบียบไฟล์

1. **เข้าไปที่โปรเจกต์ React V1**:
```bash
cd part2-react
```

2. **ติดตั้ง React Router**:
```bash
npm install react-router-dom
```

3. **สร้างโครงสร้างไฟล์ใหม่**:
```
src/
├── components/
│   ├── SearchBar.jsx      (มีอยู่แล้ว)
│   └── MealCard.jsx       (มีอยู่แล้ว)
├── pages/
│   ├── HomePage.jsx       (สร้างใหม่)
│   └── MealDetailPage.jsx (สร้างใหม่)
├── App.jsx               (แก้ไขใหม่)
└── main.jsx             (แก้ไขเพิ่ม BrowserRouter)
```

4. **แก้ไข `main.jsx`** เพื่อเพิ่ม BrowserRouter:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

5. **สร้าง `src/pages/` directory และไฟล์ต่างๆ**:

```bash
mkdir src/pages
touch src/pages/HomePage.jsx
touch src/pages/MealDetailPage.jsx
```

6. **แก้ไข `App.jsx`** ให้เป็น Router Hub:

```jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MealDetailPage from './pages/MealDetailPage'

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meal/:mealId" element={<MealDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
```

7. **สร้าง Template สำหรับ HomePage.jsx**:

```jsx
import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  // TODO: จะย้าย logic จาก App.jsx เดิมมาที่นี่ในข้อถัดไป
  
  return (
    <div>
      <header>
        <h1>🍳 Recipe Finder (React V2 with Router)</h1>
        <p>กำลังพัฒนา... (ข้อ 2.2)</p>
      </header>
      
      {/* ทดสอบ router */}
      <Link to="/meal/52772">ทดสอบไปหน้ารายละเอียด</Link>
    </div>
  )
}

export default HomePage
```

8. **สร้าง Template สำหรับ MealDetailPage.jsx**:

```jsx
import React from 'react'
import { Link, useParams } from 'react-router-dom'

function MealDetailPage() {
  const { mealId } = useParams()
  
  // TODO: จะเพิ่ม logic ดึงข้อมูลในข้อถัดไป
  
  return (
    <div>
      <Link to="/">← กลับไปหน้าค้นหา</Link>
      <h1>หน้ารายละเอียดอาหาร</h1>
      <p>Meal ID จาก URL: {mealId}</p>
      <p>กำลังพัฒนา... (ข้อ 2.3-2.4)</p>
    </div>
  )
}

export default MealDetailPage
```

9. **ทดสอบและ Commit**:

```bash
npm run dev

# ทดสอบใน browser:
# - ไป localhost:3000 ควรเห็นหน้า HomePage
# - คลิก link "ทดสอบไปหน้ารายละเอียด" ควรไป /meal/52772
# - URL ควรเปลี่ยน และแสดง Meal ID

git add .
git commit -m "ข้อ 2.1: ติดตั้ง React Router และสร้างโครงสร้างไฟล์"
```

---

### **ข้อ 2.2: Component Refactoring (15 คะแนน)**
**เวลาที่แนะนำ:** 40 นาที

**งานที่ต้องทำ:** ย้าย logic จาก App.jsx เดิมไป HomePage.jsx และแก้ไข MealCard ให้ใช้ Link

1. **ย้าย logic ไปที่ HomePage.jsx** (คัดลอกจาก App.jsx เก่า):

```jsx
import React, { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import MealCard from '../components/MealCard'

function HomePage() {
  // State variables (คัดลอกจาก V1)
  const [meals, setMeals] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // useEffect สำหรับ fetch ข้อมูล (คัดลอกจาก V1)
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setMeals([])
      return
    }

    const fetchMeals = async () => {
      setIsLoading(true)
      setError(null)

      try {
        console.log('ค้นหาคำว่า:', searchTerm)
        
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        const data = await response.json()

        console.log('ผลการค้นหา:', data)

        if (data.meals) {
          setMeals(data.meals)
        } else {
          setMeals([])
        }
      } catch (err) {
        console.error('เกิดข้อผิดพลาดในการค้นหา:', err)
        setError('เกิดข้อผิดพลาดในการค้นหา กรุณาลองใหม่อีกครั้ง')
        setMeals([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchMeals()
  }, [searchTerm])

  // Handler function
  const handleSearch = (term) => {
    console.log('รับคำค้นหา:', term)
    setSearchTerm(term)
  }

  return (
    <>
      <header>
        <h1>🍳 Recipe Finder (React V2)</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      
      <main>
        <div className="results-grid">
          {/* Loading State */}
          {isLoading && (
            <p className="status-message">กำลังค้นหาอาหาร...</p>
          )}

          {/* Error State */}
          {error && (
            <p className="status-message" style={{color: 'red'}}>{error}</p>
          )}

          {/* No Results */}
          {!isLoading && !error && meals.length === 0 && searchTerm && (
            <p className="status-message">ไม่พบอาหารที่ตรงกับคำค้นหา</p>
          )}

          {/* Welcome Message */}
          {!isLoading && !error && meals.length === 0 && !searchTerm && (
            <p className="placeholder">พิมพ์ชื่ออาหารในช่องค้นหาเพื่อเริ่มต้น!</p>
          )}

          {/* Meal Cards */}
          {!isLoading && !error && meals.length > 0 && (
            meals.map(meal => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))
          )}
        </div>
      </main>
    </>
  )
}

export default HomePage
```

2. **แก้ไข MealCard.jsx** ให้ใช้ Link แทนการแสดงผลแบบเดิม:

```jsx
import React from 'react'
import { Link } from 'react-router-dom'

function MealCard({ meal }) {
  return (
    <Link 
      to={`/meal/${meal.idMeal}`}
      style={{ 
        textDecoration: 'none', 
        color: 'inherit',
        display: 'block' 
      }}
    >
      <div className="meal-card">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <h3>{meal.strMeal}</h3>
      </div>
    </Link>
  )
}

export default MealCard
```

3. **อัปเดต CSS สำหรับ hover effect ที่ดีขึ้น** (เพิ่มใน `index.css`):

```css
/* เพิ่ม hover effect สำหรับ meal cards ที่เป็น links */
.meal-card {
  transition: all 0.3s ease;
}

.meal-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

/* ปรับ cursor สำหรับ meal cards */
a .meal-card {
  cursor: pointer;
}
```

4. **ทดสอบการทำงาน**:

```bash
npm run dev

# ทดสอบ:
# 1. ค้นหาอาหาร (เช่น "pasta")
# 2. คลิกที่ meal card ใดก็ได้
# 3. URL ควรเปลี่ยนเป็น /meal/:id
# 4. หน้าควรเปลี่ยนไปหน้ารายละเอียด
# 5. ทดสอบ browser back button
```

5. **Commit งาน**:

```bash
git add .
git commit -m "ข้อ 2.2: ย้าย logic ไป HomePage และแก้ไข MealCard ใช้ Link"
```

---

### **ข้อ 2.3: URL Parameters & Navigation (15 คะแนน)**
**เวลาที่แนะนำ:** 35 นาที

**งานที่ต้องทำ:** พัฒนา MealDetailPage ให้ดึงข้อมูลจาก API และแสดงผลพื้นฐาน

1. **พัฒนา MealDetailPage.jsx** ให้สมบูรณ์:

```jsx
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function MealDetailPage() {
  const { mealId } = useParams()
  
  // State สำหรับเก็บข้อมูล
  const [meal, setMeal] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  console.log('Meal ID จาก URL:', mealId)

  // useEffect สำหรับดึงข้อมูล
  useEffect(() => {
    const fetchMealDetails = async () => {
      setIsLoading(true)
      setError(null)

      try {
        console.log('กำลังดึงข้อมูลสำหรับ Meal ID:', mealId)
        
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        const data = await response.json()

        console.log('ข้อมูลที่ได้จาก API:', data)

        if (data.meals && data.meals.length > 0) {
          setMeal(data.meals[0])
        } else {
          setError('ไม่พบข้อมูลอาหารที่คุณต้องการ')
        }
      } catch (err) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', err)
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูล กรุณาลองใหม่อีกครั้ง')
      } finally {
        setIsLoading(false)
      }
    }

    if (mealId) {
      fetchMealDetails()
    }
  }, [mealId])

  // แสดง Loading State
  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Link to="/" style={{ display: 'block', marginBottom: '2rem' }}>
          ← กลับไปหน้าค้นหา
        </Link>
        <div className="status-message">กำลังโหลดรายละเอียดอาหาร...</div>
      </div>
    )
  }

  // แสดง Error State
  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Link to="/" style={{ display: 'block', marginBottom: '2rem' }}>
          ← กลับไปหน้าค้นหา
        </Link>
        <div className="status-message" style={{ color: 'red' }}>{error}</div>
      </div>
    )
  }

  // แสดง Not Found
  if (!meal) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Link to="/" style={{ display: 'block', marginBottom: '2rem' }}>
          ← กลับไปหน้าค้นหา
        </Link>
        <div className="status-message">ไม่พบข้อมูลอาหาร</div>
      </div>
    )
  }

  // แสดงรายละเอียดอาหาร (พื้นฐาน)
  return (
    <div style={{ padding: '2rem' }}>
      <Link to="/" className="back-button" style={{ 
        display: 'inline-block',
        marginBottom: '2rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#6c757d',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
      }}>
        ← กลับไปหน้าค้นหา
      </Link>

      <div className="meal-details-content">
        <div className="meal-header">
          <div>
            <img 
              src={meal.strMealThumb} 
              alt={meal.strMeal}
              style={{ 
                width: '100%', 
                maxWidth: '400px', 
                borderRadius: '10px' 
              }}
            />
          </div>
          <div>
            <h1>{meal.strMeal}</h1>
            {meal.strCategory && <p><strong>หมวดหมู่:</strong> {meal.strCategory}</p>}
            {meal.strArea && <p><strong>ประเทศ:</strong> {meal.strArea}</p>}
            {meal.strTags && <p><strong>แท็ก:</strong> {meal.strTags}</p>}
          </div>
        </div>

        {/* ส่วนผสมและวิธีทำจะเพิ่มในข้อ 2.4 */}
        <div style={{ marginTop: '2rem' }}>
          <h3>🔧 กำลังพัฒนาต่อในข้อ 2.4...</h3>
          <p>✅ URL Parameters ทำงานแล้ว</p>
          <p>✅ API Fetch ทำงานแล้ว</p>
          <p>⏳ รอทำส่วนผสมและวิธีทำ</p>
        </div>
      </div>
    </div>
  )
}

export default MealDetailPage
```

2. **เพิ่ม CSS สำหรับหน้ารายละเอียด** ใน `index.css`:

```css
/* Meal Detail Page Styles */
.meal-details-content {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  margin-top: 1rem;
}

.meal-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

.meal-header h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.meal-header p {
  margin: 0.5rem 0;
  color: #666;
}

/* Responsive สำหรับ mobile */
@media (max-width: 768px) {
  .meal-header {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
```

3. **ทดสอบการทำงาน**:

```bash
# ทดสอบ flow ทั้งหมด:
# 1. หน้าแรก - ค้นหาอาหาร
# 2. คลิก meal card - ไปหน้ารายละเอียด
# 3. URL เปลี่ยนเป็น /meal/:id
# 4. แสดงรายละเอียดพื้นฐาน
# 5. ปุ่มกลับทำงาน
# 6. ทดสอบ direct URL: localhost:3000/meal/52772
# 7. ทดสอบ invalid ID: localhost:3000/meal/99999
```

4. **Commit งาน**:

```bash
git add .
git commit -m "ข้อ 2.3: สมบูรณ์ - URL parameters, API fetch, และ navigation"
```

---

### **ข้อ 2.4: Complete Detail Page (10 คะแนน)**
**เวลาที่แนะนำ:** 30 นาที

**งานที่ต้องทำ:** เพิ่มส่วนผสมและวิธีทำให้สมบูรณ์

1. **สร้าง helper function สำหรับประมวลผลส่วนผสม**:

```jsx
// เพิ่มใน MealDetailPage.jsx (ก่อน function MealDetailPage)
function processMealIngredients(meal) {
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]

    if (ingredient && ingredient.trim() !== '') {
      if (measure && measure.trim() !== '') {
        ingredients.push(`${measure.trim()} ${ingredient.trim()}`)
      } else {
        ingredients.push(ingredient.trim())
      }
    }
  }

  return ingredients
}
```

2. **อัปเดตส่วนแสดงรายละเอียด** ใน MealDetailPage.jsx:

```jsx
// แทนที่ส่วน "กำลังพัฒนาต่อในข้อ 2.4..." ด้วยโค้ดนี้:
{/* ส่วนผสม */}
<div style={{ margin: '2rem 0' }}>
  <h2>🥘 ส่วนผสม</h2>
  <div className="ingredients-section">
    {(() => {
      const ingredients = processMealIngredients(meal)
      return (
        <ul className="ingredients-list">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      )
    })()}
  </div>
</div>

{/* วิธีทำ */}
<div style={{ margin: '2rem 0' }}>
  <h2>👨‍🍳 วิธีทำ</h2>
  <div className="instructions-section">
    <div className="instructions-text">
      {meal.strInstructions || 'ไม่มีข้อมูลวิธีทำ'}
    </div>
  </div>
</div>

{/* วิดีโอ (ถ้ามี) */}
{meal.strYoutube && (
  <div style={{ margin: '2rem 0' }}>
    <h2>📺 วิดีโอการทำ</h2>
    <a 
      href={meal.strYoutube} 
      target="_blank" 
      rel="noopener noreferrer"
      className="video-link"
      style={{
        display: 'inline-block',
        backgroundColor: '#dc3545',
        color: 'white',
        padding: '0.75rem 1.5rem',
        textDecoration: 'none',
        borderRadius: '5px',
        marginTop: '1rem'
      }}
    >
      ดูวิดีโอใน YouTube
    </a>
  </div>
)}
```

3. **เพิ่ม CSS สำหรับส่วนผสมและวิธีทำ** ใน `index.css`:

```css
/* Ingredients Section */
.ingredients-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.ingredients-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.ingredients-list li {
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  border-left: 4px solid #007bff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.ingredients-list li:hover {
  transform: translateY(-2px);
}

/* Instructions Section */
.instructions-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.instructions-text {
  line-height: 1.8;
  color: #333;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  white-space: pre-line;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Video Link */
.video-link:hover {
  background-color: #c82333 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .ingredients-list {
    grid-template-columns: 1fr;
  }
  
  .ingredients-section,
  .instructions-section {
    padding: 1rem;
  }
  
  .instructions-text {
    padding: 1rem;
  }
}
```

4. **เพิ่ม Loading Animation** (optional bonus):

```css
/* Loading Animation */
.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 2rem auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

และอัปเดต loading state ใน MealDetailPage:

```jsx
// แทนที่ส่วน Loading State
if (isLoading) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Link to="/" style={{ display: 'block', marginBottom: '2rem' }}>
        ← กลับไปหน้าค้นหา
      </Link>
      <div className="loading-spinner"></div>
      <div className="status-message">กำลังโหลดรายละเอียดอาหาร...</div>
    </div>
  )
}
```

5. **Final Testing**:

```bash
# ทดสอบครบทุกฟีเจอร์:
# 1. ค้นหาอาหาร (หลายประเภท)
# 2. คลิกดูรายละเอียด
# 3. ตรวจสอบส่วนผสม (ครบถ้วน)
# 4. อ่านวิธีทำ (format ถูกต้อง)
# 5. ทดสอบลิงก์วิดีโอ (ถ้ามี)
# 6. ทดสอบ responsive design
# 7. ทดสอบ browser back/forward

npm run dev
```

6. **Build & Deploy**:

```bash
npm run build

# Deploy ไปยังแพลตฟอร์มที่เลือก (Netlify/Vercel)
# Upload โฟลเดอร์ dist หรือใช้ Git integration

# ทดสอบ production build
npm run preview
```

7. **Final Commit & Tag**:

```bash
git add .
git commit -m "เสร็จสมบูรณ์ - Part 2: React Router + รายละเอียดอาหารครบถ้วน"
git tag v2-complete
```

---

## **🎯 ขั้นตอนการส่งงาน**

### **Final Checklist:**

#### **Repository Requirements:**
- [ ] มี branch `version-2-development` พร้อม commits ที่สมเหตุสมผล
- [ ] Tag `part1-v2-complete` และ `v2-complete` อยู่ในที่ถูกต้อง
- [ ] Repository เป็น private และเพิ่มอาจารย์เป็น collaborator

#### **Part 1 (Vanilla JS) - Functionality Test:**
- [ ] ค้นหาอาหารได้
- [ ] คลิก meal card เปลี่ยนเป็นหน้ารายละเอียด
- [ ] แสดงส่วนผสมครบถ้วน
- [ ] แสดงวิธีทำที่อ่านได้
- [ ] ปุ่มกลับทำงาน
- [ ] จัดการ loading และ error states

#### **Part 2 (React) - Functionality Test:**
- [ ] Router ทำงาน (URL เปลี่ยน)
- [ ] ค้นหาอาหารได้ในหน้าแรก
- [ ] คลิก meal card ไปหน้ารายละเอียด (URL routing)
- [ ] หน้ารายละเอียดแสดงข้อมูลครบ
- [ ] Direct URL access ทำงาน (เช่น /meal/52772)
- [ ] Browser back/forward buttons ทำงาน

#### **Code Quality Check:**
- [ ] มี console.log สำหรับ debugging
- [ ] Commit messages เป็นภาษาไทยและสื่อความหมาย
- [ ] ไม่มี code patterns ที่สมบูรณ์แบบเกินไป
- [ ] สามารถอธิบายโค้ดได้เมื่อถูกถาม

### **การส่งงาน:**

1. **Push ทุกอย่างขึ้น GitHub:**
```bash
git push origin version-2-development --tags
git push origin main --tags
```

2. **ส่งใน LMS หรือระบบที่กำหนด:**
   - **GitHub Repository URL** (private)
   - **Live Demo URL - Part 1** (Vanilla JS)
   - **Live Demo URL - Part 2** (React)
   - **Self-Assessment Score** (ประเมินตนเองได้กี่คะแนน)

3. **สร้าง README.md summary:**

```markdown
# ENGSE203 Midterm V2 - Recipe Finder Enhancement

**ชื่อ-สกุล:** [ชื่อนักศึกษา]  
**รหัสนักศึกษา:** [รหัส]  
**วันที่ส่ง:** [วันที่]

## 🚀 Live Demos
- **Part 1 (Vanilla JS):** [URL]
- **Part 2 (React):** [URL]

## ✅ Features Completed
- [x] Part 1: Event handling สำหรับ meal cards
- [x] Part 1: API integration สำหรับรายละเอียด  
- [x] Part 1: แสดงส่วนผสมและวิธีทำ
- [x] Part 2: React Router setup
- [x] Part 2: URL
```