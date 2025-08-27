# **ข้อสอบปฏิบัติกลางภาค (Midterm Practical Examination) - Version 3 (Cocktail Finder)**

[![Course](https://img.shields.io/badge/Course-ENGSE203-blue)](https://github.com) [![Language](https://img.shields.io/badge/Language-JavaScript-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![Framework](https://img.shields.io/badge/Framework-React-61DAFB)](https://reactjs.org/) [![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)


**รายวิชา:** ENGSE203 - Computer Programming for Software Engineer
**หัวข้อ:** Advanced API Interaction, DOM, React Routing, and LocalStorage
**เวลา:** 4 ชั่วโมง (240 นาที)

-----

### **คำชี้แจงทั่วไป**

1.  **Prerequisite**: ข้อสอบนี้เป็นการต่อยอดจาก **"Recipe Finder" Version 1 (Take-Home Practice)**
2.  **Academic Integrity**: ข้อสอบนี้เป็น **Open Book** แต่ **ห้ามใช้ AI Tools และห้ามสื่อสารกับผู้อื่นโดยเด็ดขาด**
3.  **Version Control**: **ต้อง**ใช้ Git และ Commit งานในทุกขั้นตอนย่อยที่ระบุไว้ในข้อสอบ
4.  **เริ่มต้น**: ใช้โค้ด Version 1 ของท่านเป็นฐาน และปฏิบัติตามขั้นตอนในข้อสอบนี้
5.  **ส่งงานใน Google Sheet**:
      * ส่ง **URL ของ GitHub Repository** (Private)
      * ส่ง **ปรับสถานะแต่ละ Check Point**

-----

### **เกณฑ์การให้คะแนน**

| Part | รายละเอียด | คะแนน |
| :--- | :--- | :--- |
| **Part 1** | **Core Task - Vanilla JS Application** (ทำตามขั้นตอนได้ครบ) | **30** |
| **Part 2** | **Core Task - React.js Application** (ทำตามขั้นตอนได้ครบ) | **30** |
| **สPart 3** | **Additional Challenges** (เลือกทำเพื่อเก็บคะแนนเพิ่ม) | **40** |
| **รวม** | | **100** |

-----

## **ภาพรวมของโปรเจกต์: "Cocktail Finder V3 - Favorites & Random" 🍸**

คุณจะต้องอัปเกรดแอปพลิเคชัน "Recipe Finder" จาก V1 ให้กลายเป็น **"Cocktail Finder"** ที่มีความสามารถสูงขึ้นมาก โดยใช้ API จาก **TheCocktailDB**

ใน Version 3 นี้ คุณจะต้องเปลี่ยนแอปพลิเคชันเดิมให้กลายเป็นการค้นหาค็อกเทล โดยเพิ่มความสามารถใหม่เข้ามา:

### **🎯 ฟีเจอร์ใหม่ที่ต้องเพิ่ม:**

1.  **ค้นหาค็อกเทล**: ค้นหาเครื่องดื่มจากชื่อ (เช่น "Margarita")
2.  **คลิกดูรายละเอียด**: แสดงส่วนผสม, วิธีทำ, และรูปภาพขนาดใหญ่
3.  **สุ่มเครื่องดื่ม (🎲)**: มีปุ่มสำหรับสุ่มเครื่องดื่มมาแสดงในหน้ารายละเอียด
4.  **จัดการ Favorites (⭐)**: เพิ่ม/ลบเครื่องดื่มโปรด โดยข้อมูลจะถูกเก็บไว้ใน **LocalStorage**
5.  **React Router**: สำหรับ Part 2 ให้ใช้ URL routing `/drink/:drinkId`, `/random`, และ `/favorites`


### **📊 API Endpoints**

  * **ค้นหา**: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=KEYWORD`
  * **รายละเอียด**: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=DRINK_ID`
  * **สุ่ม**: `https://www.thecocktaildb.com/api/json/v1/1/random.php`

### **💡 วิธีการทดสอบและใช้งาน API ที่ถูกต้อง**

เมื่อคุณลองเข้า URL หลักของ API คือ `https://www.thecocktaildb.com/api/json/v1/1/` โดยตรงบนเบราว์เซอร์ คุณจะพบกับหน้าจอ **Error 403 Forbidden** ซึ่งเป็นเรื่องปกติ การใช้งานที่ถูกต้องคือต้องระบุ **Endpoint** ที่ต้องการเรียกใช้ต่อท้าย URL เสมอ เช่น [`.../search.php?s=Margarita`](https://www.google.com/search?q=%5Bhttps://www.thecocktaildb.com/api/json/v1/1/search.php%3Fs%3DMargarita%5D\(https://www.thecocktaildb.com/api/json/v1/1/search.php%3Fs%3DMargarita\))

-----

## **Part 1: Core Task - Vanilla JS Application (30 คะแนน)**

### **ขั้นตอนที่ 1.1: ตั้งค่าโปรเจกต์, Git Branch และไฟล์วิเคราะห์**

**เวลาที่แนะนำ:** 10 นาที

1.  ใน Terminal, เข้าไปยังโฟลเดอร์โปรเจกต์ V1 ของคุณ
2.  สร้าง Branch ใหม่สำหรับทำข้อสอบ V3
    ```bash
    git checkout -b version-3-cocktail
    ```
3.  **สร้างไฟล์วิเคราะห์:** สร้างไฟล์ใหม่ชื่อ `ANALYSIS_V3.md` ที่ Root ของโปรเจกต์ แล้วคัดลอกคำถามต่อไปนี้ลงไปเพื่อตอบ (ตอบเป็นภาษาไทยหรืออังกฤษก็ได้)
    ```markdown
    # ANALYSIS_V3.md - Midterm Exam Analysis [Sec2]

    **ชื่อ-สกุล:** [ใส่ชื่อ-สกุลของคุณ]
    **รหัสนักศึกษา:** [ใส่รหัสนักศึกษา]

    ---

    ## Part 1: Vanilla JS Analysis

    ### 1. การจัดการ View
    ในแอปพลิเคชันนี้มี 3 หน้าจอหลัก (ผลการค้นหา, รายละเอียด, รายการโปรด) แต่ทั้งหมดอยู่ในไฟล์ HTML เดียวกัน อธิบายแนวคิดหรือวิธีการที่คุณจะใช้ในฟังก์ชัน `showView()` เพื่อจัดการให้แสดงผลได้ทีละหน้าจอเดียว

    > (คำตอบของคุณ)

    ### 2. การจัดการ Event
    เมื่อผู้ใช้คลิกบน Grid ที่แสดงผลลัพธ์ (`results-grid`) โค้ดของคุณจะรู้ได้อย่างไรว่าผู้ใช้คลิกที่ "ปุ่มรูปดาว (Favorite)" หรือคลิกที่ "การ์ดของเครื่องดื่ม" เพื่อดูรายละเอียด?

    > (คำตอบของคุณ)

    ### 3. การใช้ LocalStorage
    เหตุใดเราจึงต้องใช้ `JSON.stringify()` ก่อนบันทึกข้อมูลลงใน LocalStorage และต้องใช้ `JSON.parse()` เมื่ออ่านข้อมูลออกมา?

    > (คำตอบของคุณ)

    ---

    ## Part 2: React Analysis

    ### 1. การสื่อสารระหว่าง Component (Props)
    ในหน้า `HomePage` Component ลูก (`SearchBar`) จะรับคำค้นหาจากผู้ใช้ แต่ Component แม่ (`HomePage`) คือผู้ที่ต้องนำคำค้นหานั้นไปใช้เพื่อดึงข้อมูล API อธิบายกลไกที่ React ใช้เพื่อให้ Component ลูกสามารถส่งข้อมูลกลับขึ้นไปให้ Component แม่ได้

    > (คำตอบของคุณ)

    ### 2. การจัดการ State ข้าม Components (Custom Hooks)
    ฟังก์ชัน "รายการโปรด" ต้องทำงานสอดคล้องกันในหลายๆ ที่ (เช่น ปุ่มบน `DrinkCard` และหน้าที่แสดงรายการโปรด `FavoritesPage`) Custom Hook อย่าง `useFavorites` เข้ามาช่วยแก้ปัญหานี้ได้อย่างไร?

    > (คำตอบของคุณ)

    ### 3. การจัดการ Routing และ State
    `React Router` สามารถส่งข้อมูลระหว่างหน้าได้ 2 วิธีหลัก คือผ่าน URL Parameters (เช่น `/drink/:drinkId`) และผ่าน `state` ใน Component `<Link>` อธิบายความแตกต่างและยกตัวอย่างว่าควรใช้วิธีใดในสถานการณ์ไหน

    > (คำตอบของคุณ)
    ```

## 🎯 Check Point #1

4.  **Commit แรก**: 

    ```bash
    git add ANALYSIS_V3.md
    git commit -m "เริ่มต้น V3: วิเคราะห์โครงสร้างและวางแผนสำหรับ Cocktail Finder"
    ```

---

5.  **Action:** คัดลอกโค้ด HTML และ CSS ที่ให้ไว้ ไปวางทับไฟล์ `index.html` และ `style.css` เดิมของคุณ
      * **ไฟล์ `index.html`:**
        ```html
        <!DOCTYPE html>
        <html lang="th">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cocktail Finder 🍸 - Vanilla JS</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <div class="container">
                <header>
                    <h1>🍸 Cocktail Finder</h1>
                    <form id="search-form">
                        <input type="text" id="search-input" placeholder="e.g., Margarita, Mojito, Gin...">
                        <button type="submit">Search</button>
                    </form>
                    <div class="actions-container">
                        <button id="random-btn" class="action-button">🎲 Random Drink</button>
                        <button id="favorites-btn" class="action-button">⭐ Show Favorites</button>
                    </div>
                </header>

                <main id="results-container">
                    <div id="results-grid" class="results-grid">
                        <p class="placeholder">Type something in the search box to find cocktails!</p>
                    </div>
                </main>

                <section id="details-container" class="hidden"></section>

                <section id="favorites-container" class="hidden">
                    <h2>⭐ My Favorite Drinks</h2>
                    <div id="favorites-grid" class="results-grid"></div>
                </section>
            </div>
            <script src="script.js"></script>
        </body>
        </html>
        ```
       * **คำอธิบาย:** สไตล์ชีตสำหรับตกแต่งหน้าเว็บให้สวยงามและรองรับการแสดงผลแบบ Grid รวมถึงสถานะต่างๆ เช่น `hidden` หรือปุ่ม `favorite`
      * **Action:** คัดลอกโค้ดทั้งหมดนี้ไปวางในไฟล์ `style.css` ของคุณ
      * **ไฟล์ `style.css`:**
        ```css
        /* General Styles */
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f0f2f5; margin: 0; }
        .container { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
        header { text-align: center; margin-bottom: 2rem; }
        h1 { color: #333; }
        #search-form { display: flex; max-width: 500px; margin: 1rem auto; }
        #search-input { flex-grow: 1; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px 0 0 4px; font-size: 1rem; }
        #search-form button { padding: 0.75rem 1.5rem; border: none; background-color: #007bff; color: white; border-radius: 0 4px 4px 0; cursor: pointer; }
        .actions-container { display: flex; justify-content: center; gap: 1rem; margin-top: 1rem; }
        .action-button { background-color: #6c757d; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 5px; cursor: pointer; font-size: 1rem; transition: background-color 0.3s; }
        .action-button:hover { background-color: #5a6268; }
        .results-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; }
        .drink-card { background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; cursor: pointer; position: relative; transition: transform 0.2s; }
        .drink-card:hover { transform: translateY(-5px); }
        .drink-card img { width: 100%; height: 200px; object-fit: cover; }
        .drink-card h3 { padding: 1rem; font-size: 1.1rem; margin: 0; }
        .placeholder, .status-message { color: #666; text-align: center; grid-column: 1 / -1; padding: 2rem; }
        .favorite-btn { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.5); border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 1.5rem; cursor: pointer; color: white; transition: all 0.2s; z-index: 10; }
        .favorite-btn.is-favorite { color: #ffc107; transform: scale(1.2); }
        .hidden { display: none !important; }
        #details-container, #favorites-container { background: white; padding: 2rem; border-radius: 8px; margin-top: 2rem; }
        .details-header { display: grid; grid-template-columns: 1fr 2fr; gap: 2rem; margin-bottom: 2rem; }
        .details-header img { width: 100%; border-radius: 8px; }
        .ingredients-list { list-style-position: inside; padding-left: 0; }
        .instructions { white-space: pre-line; line-height: 1.6; }
        ```

## 🎯 Check Point #2

6.  **Commit งาน:**
    ```bash
    git add .
    git commit -m "feat(part1): setup initial files, branch, and analysis doc for v3"
    ```

<hr>

### **ขั้นตอนที่ 1.2: เขียนโค้ด JavaScript (`script.js`)**

  * **คำอธิบาย:** ขั้นตอนนี้เป็นการวางโค้ด JavaScript ทั้งหมดที่จำเป็นในการทำให้แอปพลิเคชันทำงานได้อย่างสมบูรณ์

  * **Action:** คัดลอกโค้ดทั้งหมดนี้ไปวางในไฟล์ `script.js` ของคุณ (หากมีโค้ดเก่าอยู่ให้ลบทิ้งทั้งหมดก่อน)

    ```javascript
    document.addEventListener('DOMContentLoaded', () => {
        // --- DOM Elements ---
        const searchForm = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');
        const resultsContainer = document.getElementById('results-container');
        const resultsGrid = document.getElementById('results-grid');
        const detailsContainer = document.getElementById('details-container');
        const favoritesContainer = document.getElementById('favorites-container');
        const favoritesGrid = document.getElementById('favorites-grid');
        const randomBtn = document.getElementById('random-btn');
        const favoritesBtn = document.getElementById('favorites-btn');

        // --- API & LocalStorage Constants ---
        const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';
        const FAVORITES_KEY = 'cocktailFavorites';

        // --- LocalStorage Helper Functions ---
        const getFavorites = () => JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
        const saveFavorites = (favorites) => localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));

        // --- Event Listeners ---
        searchForm.addEventListener('submit', handleSearch);
        randomBtn.addEventListener('click', fetchRandomDrink);
        favoritesBtn.addEventListener('click', showFavorites);
        resultsGrid.addEventListener('click', handleGridClick);
        favoritesGrid.addEventListener('click', handleGridClick);

        // --- Event Handlers ---
        function handleSearch(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                searchDrinks(searchTerm);
            }
        }

        function handleGridClick(event) {
            const favoriteBtn = event.target.closest('.favorite-btn');
            const drinkCard = event.target.closest('.drink-card');
            
            if (favoriteBtn) {
                const drinkId = favoriteBtn.dataset.drinkId;
                toggleFavorite(drinkId);
            } else if (drinkCard) {
                const drinkId = drinkCard.dataset.drinkId;
                loadDrinkDetails(drinkId);
            }
        }
        
        // --- API Functions ---
        async function searchDrinks(keyword) {
            showView(resultsContainer);
            resultsGrid.innerHTML = '<p class="status-message">Searching for cocktails...</p>';
            try {
                const response = await fetch(`${API_BASE_URL}/search.php?s=${keyword}`);
                const data = await response.json();
                displayResults(data.drinks, resultsGrid);
            } catch (error) {
                resultsGrid.innerHTML = '<p class="status-message">An error occurred. Please try again.</p>';
            }
        }

        async function loadDrinkDetails(drinkId) {
            showView(detailsContainer);
            detailsContainer.innerHTML = '<p class="status-message">Loading details...</p>';
            try {
                const response = await fetch(`${API_BASE_URL}/lookup.php?i=${drinkId}`);
                const data = await response.json();
                displayDrinkDetails(data.drinks[0]);
            } catch (error) {
                detailsContainer.innerHTML = '<p class="status-message">Could not load details.</p>';
            }
        }
        
        async function fetchRandomDrink() {
            showView(detailsContainer);
            detailsContainer.innerHTML = '<p class="status-message">Fetching a random drink...</p>';
            try {
                const response = await fetch(`${API_BASE_URL}/random.php`);
                const data = await response.json();
                displayDrinkDetails(data.drinks[0]);
            } catch (error) {
                detailsContainer.innerHTML = '<p class="status-message">Could not fetch a random drink.</p>';
            }
        }

        // --- Display Functions ---
        function displayResults(drinks, gridElement) {
            gridElement.innerHTML = '';
            if (!drinks) {
                gridElement.innerHTML = '<p class="status-message">No cocktails found. Try another keyword!</p>';
                return;
            }

            const favorites = getFavorites();
            drinks.forEach(drink => {
                const isFavorite = favorites.some(favId => favId === drink.idDrink);
                const drinkCard = document.createElement('div');
                drinkCard.className = 'drink-card';
                drinkCard.dataset.drinkId = drink.idDrink;
                drinkCard.innerHTML = `
                    <button class="favorite-btn ${isFavorite ? 'is-favorite' : ''}" data-drink-id="${drink.idDrink}">⭐</button>
                    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                    <h3>${drink.strDrink}</h3>
                `;
                gridElement.appendChild(drinkCard);
            });
        }

        function displayDrinkDetails(drink) {
            const ingredients = [];
            for (let i = 1; i <= 15; i++) {
                const ingredient = drink[`strIngredient${i}`];
                const measure = drink[`strMeasure${i}`];
                if (ingredient) {
                    ingredients.push(`<li>${measure || ''} ${ingredient}</li>`);
                }
            }
            detailsContainer.innerHTML = `
                <div class="details-header">
                    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                    <div>
                        <h2>${drink.strDrink}</h2>
                        <p><strong>Category:</strong> ${drink.strCategory}</p>
                        <p><strong>Glass:</strong> ${drink.strGlass}</p>
                        <h3>Ingredients</h3>
                        <ul class="ingredients-list">${ingredients.join('')}</ul>
                    </div>
                </div>
                <h3>Instructions</h3>
                <p class="instructions">${drink.strInstructions}</p>
            `;
        }

        function showFavorites() {
            showView(favoritesContainer);
            const favoriteIds = getFavorites();
            if (favoriteIds.length === 0) {
                favoritesGrid.innerHTML = '<p class="status-message">You have no favorite drinks yet.</p>';
                return;
            }

            favoritesGrid.innerHTML = '<p class="status-message">Loading favorites...</p>';
            const favoritePromises = favoriteIds.map(id => 
                fetch(`${API_BASE_URL}/lookup.php?i=${id}`).then(res => res.json())
            );

            Promise.all(favoritePromises)
                .then(results => {
                    const favoriteDrinks = results.map(result => result.drinks[0]);
                    displayResults(favoriteDrinks, favoritesGrid);
                })
                .catch(error => {
                    favoritesGrid.innerHTML = '<p class="status-message">Could not load favorites.</p>';
                });
        }
        
        // --- Utility Functions ---
        function toggleFavorite(drinkId) {
            let favorites = getFavorites();
            if (favorites.includes(drinkId)) {
                favorites = favorites.filter(id => id !== drinkId);
            } else {
                favorites.push(drinkId);
            }
            saveFavorites(favorites);
            
            document.querySelectorAll(`.favorite-btn[data-drink-id="${drinkId}"]`).forEach(btn => {
                btn.classList.toggle('is-favorite');
            });
        }

        function showView(viewToShow) {
            [resultsContainer, detailsContainer, favoritesContainer].forEach(view => {
                view.classList.add('hidden');
            });
            viewToShow.classList.remove('hidden');
        }
    });
    ```

## 🎯 Check Point #3

  * **Commit งาน:**

    ```bash
    git add .
    git commit -m "feat(part1): implement all javascript logic for core task"
    git tag part1-v3-complete
    ```

<hr>

## **Part 2: Core Task - React.js Application (30 คะแนน)**

**เป้าหมาย:** สร้างแอปพลิเคชันเดียวกันขึ้นใหม่ด้วย React.js, Vite, และ React Router

### **ขั้นตอนที่ 2.1: ตั้งค่าโปรเจกต์และติดตั้ง Dependencies**

1.  สร้างโปรเจกต์ React: `npm create vite@latest part2-react-v3 -- --template react`
2.  เข้าโฟลเดอร์และติดตั้ง dependencies: `cd part2-react-v3`, `npm install`, `npm install react-router-dom`
3.  สร้างโครงสร้างไฟล์ตามนี้:
    ```
    src/
    ├── components/
    │   ├── DrinkCard.jsx
    │   ├── Navbar.jsx
    │   └── SearchBar.jsx
    ├── hooks/
    │   └── useFavorites.js
    ├── pages/
    │   ├── DrinkDetailPage.jsx
    │   ├── FavoritesPage.jsx
    │   └── HomePage.jsx
    ├── App.jsx
    ├── index.css
    └── main.jsx
    ```

## 🎯 Check Point #4

4.  **Commit งาน:**
    ```bash
    git add .
    git commit -m "feat(part2): setup react project and install dependencies"
    ```

<hr>

### **ขั้นตอนที่ 2.2: เขียนโค้ดสำหรับแต่ละไฟล์**

### \#\#\# **ขั้นตอนที่ 2.2: เขียนโค้ดสำหรับแต่ละไฟล์**

  * **คำอธิบาย:** คัดลอกโค้ดแต่ละส่วนไปวางในไฟล์ที่ถูกต้อง โค้ดเหล่านี้สร้างแอปพลิเคชันที่มีการจัดการหน้า (Routing), การจัดการสถานะ (State), และการใช้ Custom Hook เพื่อนำ Logic มาใช้ซ้ำ
  * **Action:** คัดลอกโค้ดไปวางในไฟล์ที่ตรงกัน

**`src/index.css`** (ใช้ CSS เดียวกับ Part 1)

**`src/main.jsx`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
```

**`src/App.jsx`**

```jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DrinkDetailPage from './pages/DrinkDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drink/:drinkId" element={<DrinkDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/random" element={<DrinkDetailPage isRandom={true} />} />
        </Routes>
      </main>
    </>
  );
}
export default App;
```

**`src/hooks/useFavorites.js`**

```jsx
import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'cocktailFavoritesReact';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (drinkId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(drinkId)) {
        return prevFavorites.filter((id) => id !== drinkId);
      } else {
        return [...prevFavorites, drinkId];
      }
    });
  };

  return { favorites, toggleFavorite };
}
```

**`src/components/Navbar.jsx`**

```jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">🍸 Cocktail Finder</NavLink>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Search</NavLink>
          <NavLink to="/random" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Random</NavLink>
          <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Favorites</NavLink>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
```

**`src/components/Navbar.css`** (สร้างไฟล์นี้เพิ่ม)

```css
.navbar { background-color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 0.5rem 0; position: sticky; top: 0; z-index: 100; }
.nav-container { display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
.nav-logo { font-size: 1.5rem; font-weight: bold; color: #333; text-decoration: none; }
.nav-links { display: flex; gap: 1.5rem; }
.nav-link { text-decoration: none; color: #555; font-size: 1rem; padding-bottom: 5px; border-bottom: 2px solid transparent; transition: color 0.3s, border-color 0.3s; }
.nav-link:hover { color: #007bff; }
.nav-link.active { color: #007bff; border-bottom-color: #007bff; }
```

**`src/components/SearchBar.jsx`**

```jsx
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term.trim());
    }
  };

  return (
    <form id="search-form" onSubmit={handleSubmit}>
      <input type="text" id="search-input" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="e.g., Margarita, Mojito, Gin..." />
      <button type="submit">Search</button>
    </form>
  );
}
export default SearchBar;
```

**`src/components/DrinkCard.jsx`**

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';

function DrinkCard({ drink }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(drink.idDrink);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(drink.idDrink);
  };

  return (
    <Link to={`/drink/${drink.idDrink}`} className="drink-card-link">
      <div className="drink-card">
        <button onClick={handleFavoriteClick} className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`} data-drink-id={drink.idDrink}>⭐</button>
        <img src={drink.strDrinkThumb} alt={drink.strDrink} />
        <h3>{drink.strDrink}</h3>
      </div>
    </Link>
  );
}
export default DrinkCard;
```

**`src/pages/HomePage.jsx`**

```jsx
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import DrinkCard from '../components/DrinkCard';

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

function HomePage() {
  const [drinks, setDrinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) {
      setDrinks([]);
      return;
    }

    const fetchDrinks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/search.php?s=${searchTerm}`);
        if (!response.ok) throw new Error('Something went wrong!');
        const data = await response.json();
        setDrinks(data.drinks || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDrinks();
  }, [searchTerm]);

  return (
    <div>
      <header>
        <h1>Find Your Perfect Cocktail</h1>
        <SearchBar onSearch={setSearchTerm} />
      </header>
      <div className="results-grid">
        {isLoading && <p className="status-message">Searching for cocktails...</p>}
        {error && <p className="status-message error">{error}</p>}
        {!isLoading && !error && drinks.length === 0 && searchTerm && (
          <p className="status-message">No cocktails found for "{searchTerm}".</p>
        )}
        {!isLoading && !error && drinks.length > 0 && (
          drinks.map(drink => <DrinkCard key={drink.idDrink} drink={drink} />)
        )}
      </div>
    </div>
  );
}
export default HomePage;
```

**`src/pages/DrinkDetailPage.jsx`**

```jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

function DrinkDetailPage({ isRandom = false }) {
  const { drinkId } = useParams();
  const navigate = useNavigate();
  const [drink, setDrink] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrinkData = async () => {
      setIsLoading(true);
      setError(null);
      const url = isRandom
        ? `${API_BASE_URL}/random.php`
        : `${API_BASE_URL}/lookup.php?i=${drinkId}`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const fetchedDrink = data.drinks ? data.drinks[0] : null;
        
        if (!fetchedDrink) throw new Error('Drink not found!');

        if (isRandom) {
          navigate(`/drink/${fetchedDrink.idDrink}`, { replace: true });
        } else {
          setDrink(fetchedDrink);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDrinkData();
  }, [drinkId, isRandom, navigate]);

  if (isLoading) return <p className="status-message">Loading...</p>;
  if (error) return <p className="status-message error">{error}</p>;
  if (!drink) return <p className="status-message">Drink not found.</p>;
  
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    if (drink[`strIngredient${i}`]) {
      ingredients.push(
        <li key={i}>{drink[`strMeasure${i}`] || ''} {drink[`strIngredient${i}`]}</li>
      );
    }
  }

  return (
    <div id="details-container">
      <div className="details-header">
        <img src={drink.strDrinkThumb} alt={drink.strDrink} />
        <div>
          <h2>{drink.strDrink}</h2>
          <p><strong>Category:</strong> {drink.strCategory}</p>
          <p><strong>Glass:</strong> {drink.strGlass}</p>
          <h3>Ingredients</h3>
          <ul className="ingredients-list">{ingredients}</ul>
        </div>
      </div>
      <h3>Instructions</h3>
      <p className="instructions">{drink.strInstructions}</p>
    </div>
  );
}
export default DrinkDetailPage;
```

**`src/pages/FavoritesPage.jsx`**

```jsx
import React, { useState, useEffect } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import DrinkCard from '../components/DrinkCard';

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

function FavoritesPage() {
  const { favorites } = useFavorites();
  const [favoriteDrinks, setFavoriteDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (favorites.length === 0) {
      setIsLoading(false);
      setFavoriteDrinks([]);
      return;
    }

    const fetchFavorites = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const promises = favorites.map(id =>
          fetch(`${API_BASE_URL}/lookup.php?i=${id}`).then(res => {
            if (!res.ok) throw new Error('Failed to fetch a favorite drink.');
            return res.json();
          })
        );
        const results = await Promise.all(promises);
        const drinks = results.map(result => result.drinks[0]);
        setFavoriteDrinks(drinks);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  return (
    <div>
      <h2>⭐ My Favorite Drinks</h2>
      <div className="results-grid">
        {isLoading && <p className="status-message">Loading favorites...</p>}
        {error && <p className="status-message error">{error}</p>}
        {!isLoading && !error && favoriteDrinks.length > 0 && (
          favoriteDrinks.map(drink => <DrinkCard key={drink.idDrink} drink={drink} />)
        )}
        {!isLoading && !error && favoriteDrinks.length === 0 && (
          <p className="status-message">You have no favorite drinks yet. Go find some!</p>
        )}
      </div>
    </div>
  );
}
export default FavoritesPage;
```

## 🎯 Check Point #5

  * **Commit งาน:** หลังจากวางโค้ดครบทุกไฟล์แล้ว
    ```bash
    git add .
    git commit -m "feat(part2): implement all components, pages, and hooks for core task"
    git tag part2-v3-complete
    ```

-----

## **ส่วนที่ 3: Additional Challenges (40 คะแนน)**

  * **คำอธิบาย:** ส่วนนี้เป็นส่วนที่นักศึกษาต้องลงมือเขียนโค้ดด้วยตนเองตามคำแนะนำ เพื่อเก็บคะแนนเพิ่มเติม
  * **Action:** อ่านโจทย์และคำแนะนำในข้อสอบ แล้วลงมือแก้ไขโค้ดจากส่วน Core Task
  * **Commit งาน:** เมื่อทำ Challenge ใดสำเร็จ ให้ commit โดยระบุถึง Challenge ที่ทำ
    ```bash
    # ตัวอย่างการ commit เมื่อทำ Challenge 1.1 สำเร็จ
    git add .
    git commit -m "feat(challenge): implement search debouncing in part 1"
    ```
**เป้าหมาย:** เลือกทำโจทย์ท้าทายต่อไปนี้เพื่อเก็บคะแนนเพิ่มเติมและแสดงความเข้าใจในระดับที่ลึกขึ้น

### **Part 1 Challenges (Vanilla JS)**

**Challenge 1.1: Debouncing Search Input (10 คะแนน)**

  * **โจทย์:** ป้องกันการยิง API ทุกครั้งที่พิมพ์ในช่องค้นหา โดยให้รอจนกว่าผู้ใช้จะหยุดพิมพ์สักครู่ (เช่น 500ms) แล้วจึงส่งคำค้นหา
  * **คำแนะนำและตัวอย่างโค้ด:**
    1.  เปลี่ยนจากการดักจับ event `submit` มาเป็นการดักจับ event `input` ของช่องค้นหา
    2.  สร้างฟังก์ชัน `debounce` เพื่อหน่วงเวลาการทำงานของฟังก์ชันอื่น
        ```javascript
        // ตัวอย่างโครงสร้างฟังก์ชัน debounce
        function debounce(func, delay) {
          let timeoutId;
          return function(...args) {
            // ล้าง timeout เก่าที่ยังไม่ทำงาน
            clearTimeout(timeoutId);
            // ตั้ง timeout ใหม่เพื่อนับถอยหลัง
            timeoutId = setTimeout(() => {
              func.apply(this, args);
            }, delay);
          };
        }
        ```
    3.  นำฟังก์ชัน `debounce` มาใช้กับ `searchDrinks` และผูกกับ event `input`
        ```javascript
        // ลบ searchForm.addEventListener('submit', ...) ของเดิมออก

        // สร้างฟังก์ชัน search ที่หน่วงเวลาแล้ว
        const debouncedSearch = debounce(searchDrinks, 500);

        // เมื่อมีการพิมพ์ในช่องค้นหา ให้เรียกฟังก์ชันที่หน่วงเวลานี้
        searchInput.addEventListener('input', (e) => {
            if (e.target.value.trim().length > 0) {
                debouncedSearch(e.target.value.trim());
            }
        });
        ```

**Challenge 1.2: Persistent Search Term (10 คะแนน)**

  * **โจทย์:** เมื่อผู้ใช้ค้นหาแล้วทำการรีเฟรชหน้าเว็บ ให้คำค้นหาล่าสุดยังคงอยู่ในช่องค้นหาและแสดงผลลัพธ์เดิมโดยอัตโนมัติ
  * **คำแนะนำและตัวอย่างโค้ด:**
    1.  **ในฟังก์ชัน `searchDrinks(keyword)`** ให้เพิ่มโค้ดสำหรับบันทึกคำค้นหาล่าสุดลงใน `localStorage`
        ```javascript
        async function searchDrinks(keyword) {
            // ... โค้ดที่มีอยู่เดิม ...
            localStorage.setItem('lastSearchTerm', keyword); // <-- เพิ่มบรรทัดนี้
            try {
            // ...
            }
        }
        ```
    2.  **ใน Event Listener `DOMContentLoaded`** (ที่อยู่บนสุดของไฟล์) ให้เพิ่มโค้ดสำหรับโหลดคำค้นหาล่าสุดเมื่อเปิดหน้าเว็บ
        ```javascript
        document.addEventListener('DOMContentLoaded', () => {
            // ... โค้ดที่มีอยู่เดิม ...

            // เพิ่มส่วนนี้เพื่อโหลดคำค้นหาล่าสุด
            const savedTerm = localStorage.getItem('lastSearchTerm');
            if (savedTerm) {
              searchInput.value = savedTerm;
              searchDrinks(savedTerm);
            }
        });
        ```

### **Part 2 Challenges (React)**

**Challenge 2.1: "Back to Search Results" State (10 คะแนน)**

  * **โจทย์:** เมื่อผู้ใช้ค้นหา -\> คลิกดูรายละเอียด -\> แล้วกดปุ่ม "Back" ใน Browser ควรจะกลับมาที่หน้าค้นหาพร้อมผลลัพธ์เดิม โดยไม่ต้องค้นหาใหม่
  * **คำแนะนำและตัวอย่างโค้ด:**
    1.  **ใน `HomePage.jsx`** ส่ง `searchTerm` เป็น prop ไปยัง `DrinkCard`
        ```jsx
        // แก้ไขส่วน map
        drinks.map(drink => <DrinkCard key={drink.idDrink} drink={drink} searchTerm={searchTerm} />)
        ```
    2.  **ใน `DrinkCard.jsx`** รับ `searchTerm` prop แล้วส่งไปกับ `state` ของ `<Link>`
        ```jsx
        function DrinkCard({ drink, searchTerm }) {
            // ...
            return (
                <Link to={`/drink/${drink.idDrink}`} state={{ fromSearch: searchTerm }}>
                {/* ... */}
                </Link>
            );
        }
        ```
    3.  **ใน `DrinkDetailPage.jsx`** สร้างปุ่ม Back ที่ใช้ `useNavigate` เพื่อย้อนกลับ
        ```jsx
        import { useParams, useNavigate } from 'react-router-dom';

        function DrinkDetailPage() {
            const navigate = useNavigate();
            // ...
            return (
                <div>
                    <button onClick={() => navigate(-1)} className="action-button" style={{marginBottom: '1rem'}}>
                        &larr; Back
                    </button>
                    {/* ... ส่วนแสดงรายละเอียด */}
                </div>
            );
        }
        ```

**Challenge 2.2: Skeleton Loader (10 คะแนน)**

  * **โจทย์:** แทนที่จะแสดงข้อความ "Loading..." ให้แสดง "Skeleton Screen" (กล่องสีเทาๆ ที่มี animation) ตามโครงสร้างของ `DrinkCard`
  * **คำแนะนำและตัวอย่างโค้ด:**
    1.  **สร้าง Component `SkeletonCard.jsx`**
        ```jsx
        // src/components/SkeletonCard.jsx
        import React from 'react';
        import './SkeletonCard.css';

        function SkeletonCard() {
            return (
                <div className="skeleton-card">
                    <div className="skeleton skeleton-img"></div>
                    <div className="skeleton skeleton-text"></div>
                </div>
            );
        }
        export default SkeletonCard;
        ```
    2.  **เพิ่ม CSS ในไฟล์ `SkeletonCard.css`**
        ```css
        /* src/components/SkeletonCard.css */
        .skeleton-card { background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; }
        .skeleton { animation: shimmer 1.5s infinite linear; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        .skeleton-img { height: 200px; width: 100%; }
        .skeleton-text { height: 20px; width: 80%; margin: 1rem; border-radius: 4px; }
        ```
    3.  **ใน `HomePage.jsx` (หรือ `FavoritesPage.jsx`)** ให้แสดง `SkeletonCard` เมื่อ `isLoading`
        ```jsx
        import SkeletonCard from '../components/SkeletonCard';
        // ...
        function HomePage() {
            // ...
            if (isLoading) {
              return (
                  <div className="results-grid">
                      {Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)}
                  </div>
              );
            }
            // ...
        }
        ```

-----

## **ขั้นตอนการส่งงาน (สำคัญมาก) 🔧**

1.  **Build โปรเจกต์ Part 2**: ใน terminal ของโฟลเดอร์ `part2-react-v3` รันคำสั่ง `npm run build`
2.  **Deploy ทั้งสอง Part**:
      * **Part 1**: Deploy โฟลเดอร์ `part1-vanilla-js` ของคุณขึ้น Netlify หรือ Vercel
      * **Part 2**: Deploy โฟลเดอร์ `part2-react-v3/dist` ที่ได้จากการ build ขึ้น Netlify หรือ Vercel
3.  **สร้างไฟล์ `README.md` ที่ Root ของโปรเจกต์**: ใส่เนื้อหาตามนี้:
    ```markdown
    # ENGSE203 Midterm Exam [Sec2] - V3

    **ชื่อ-สกุล:** [ใส่ชื่อ-สกุลของคุณ]  
    **รหัสนักศึกษา:** [ใส่รหัสนักศึกษา]  

    ## 🚀 Live Demos

    - **Part 1 (Vanilla JS):** [ใส่ URL ของ Part 1 ที่ Deploy แล้ว]
    - **Part 2 (React):** [ใส่ URL ของ Part 2 ที่ Deploy แล้ว]

    ## ✅ Features Checklist

    - [x] Part 1: Core Task - Vanilla JS Application
    - [x] Part 2: Core Task - React.js Application
    - [x] ANALYSIS_V3.md: ตอบคำถามเชิงวิเคราะห์ครบถ้วน

    ## 🏆 Additional Challenges Completed

    - [ ] Part 1.1: Debouncing Search Input
    - [ ] Part 1.2: Persistent Search Term
    - [ ] Part 2.1: "Back to Search Results" State
    - [ ] Part 2.2: Skeleton Loader

    *(กาเครื่องหมาย [x] ในช่องที่ทำสำเร็จ)*
    ```
4.  **Push to GitHub**: Push โค้ด, branch, และ tags ทั้งหมดขึ้น Private Repository ของคุณ
    ```bash
    git push origin version-3-cocktail --tags
    ```

## 🎯 Finish - Check Point

---
