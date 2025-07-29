// 1. การตั้งค่าและเลือก DOM Elements
const apiKey = 'e2172288ce5304a184355b63a061278e'; // สำคัญ: นักศึกษาต้องใส่ Key ของตัวเอง

const searchForm = document.querySelector('#search-form');
const cityInput = document.querySelector('#city-input');
const weatherInfoContainer = document.querySelector('#weather-info-container');

// 2. เพิ่ม Event Listener ให้กับฟอร์ม
searchForm.addEventListener('submit', event => {
    // ป้องกันไม่ให้หน้าเว็บรีโหลดเมื่อกด submit
    event.preventDefault();

    // ดึงค่าจาก input และตัดช่องว่างที่ไม่จำเป็นออก
    const cityName = cityInput.value.trim();

    // ตรวจสอบว่ามีข้อความถูกป้อนเข้ามาหรือไม่
    if (cityName) {
        getWeather(cityName);
    } else {
        alert('กรุณาป้อนชื่อเมือง');
    }
});

// 3. ฟังก์ชันสำหรับดึงข้อมูลสภาพอากาศจาก API
async function getWeather(city) {
    // แสดงสถานะ "กำลังโหลด..." ระหว่างรอข้อมูล
    weatherInfoContainer.innerHTML = `<p>กำลังโหลดข้อมูล...</p>`;

    // สร้าง URL สำหรับเรียกใช้ API
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=th`;

    try {
        // ส่ง Request ไปยัง API และรอการตอบกลับ
        const response = await fetch(apiUrl);

        // ตรวจสอบว่าการตอบกลับสำเร็จหรือไม่ (status code 200-299)
        if (!response.ok) {
            // หากไม่สำเร็จ ให้โยน Error เพื่อให้ catch ทำงาน
            throw new Error('ไม่พบข้อมูลเมืองนี้ หรือมีข้อผิดพลาดบางอย่าง');
        }

        // แปลงข้อมูลที่ได้จาก JSON string เป็น JavaScript object
        const data = await response.json();
        
        // ส่งข้อมูลที่ได้ไปให้ฟังก์ชันแสดงผล
        displayWeather(data);

    } catch (error) {
        // หากเกิด Error ขึ้นใน try block จะเข้ามาทำงานในนี้
        weatherInfoContainer.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

// 4. ฟังก์ชันสำหรับแสดงผลข้อมูลบนหน้าเว็บ
function displayWeather(data) {
    // ใช้ Destructuring เพื่อดึงค่าที่ต้องการออกจาก Object ให้ง่ายขึ้น
    const { name, main, weather } = data;
    const { temp, humidity } = main;
    const { description, icon } = weather[0];

    // ใช้ Template Literals ในการสร้าง HTML string
    const weatherHtml = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p class="temp">${temp.toFixed(1)}°C</p>
        <p>${description}</p>
        <p>ความชื้น: ${humidity}%</p>
    `;

    // นำ HTML ที่สร้างเสร็จไปแสดงใน container
    weatherInfoContainer.innerHTML = weatherHtml;
}