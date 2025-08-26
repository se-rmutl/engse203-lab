// 1. เลือก DOM Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsGrid = document.getElementById('results-grid');

// 2. เพิ่ม Event Listener ให้กับฟอร์ม
searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // ป้องกันไม่ให้หน้าเว็บโหลดใหม่
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
        searchRecipes(searchTerm);
    }
});

// 3. สร้าง async function สำหรับ fetch ข้อมูล
async function searchRecipes(keyword) {
    // 4.1 แสดงสถานะ Loading
    resultsGrid.innerHTML = '<p class="status-message">Searching for recipes...</p>';

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        displayRecipes(data.meals);

    } catch (error) {
        // 4.3 แสดงข้อผิดพลาด
        console.error('Fetch error:', error);
        resultsGrid.innerHTML = '<p class="status-message">An error occurred. Please try again later.</p>';
    }
}

// ฟังก์ชันสำหรับแสดงผลลัพธ์
function displayRecipes(meals) {
    // 2. ตรวจสอบว่ามีข้อมูลหรือไม่
    if (meals === null) {
        resultsGrid.innerHTML = '<p class="status-message">No recipes found.</p>';
        return;
    }

    // 3. ล้างข้อมูลเก่าและสร้าง HTML ใหม่
    resultsGrid.innerHTML = '';

    const mealCardsHTML = meals.map(meal => {
        return `
            <div class="meal-card">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
        `;
    }).join('');

    resultsGrid.innerHTML = mealCardsHTML;
}