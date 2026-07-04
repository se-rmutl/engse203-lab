# ENGSE203 Week 02 — Modern JavaScript Classroom Sandbox

Sandbox นี้เป็นหน้าเว็บ static สำหรับใช้สอนสดและให้นักศึกษาลองแก้ JavaScript ในเบราว์เซอร์ โดยไม่ต้องติดตั้ง Node.js หรือ Vite เพิ่ม

## เนื้อหา

1. `const` / `let` และ template literal
2. destructuring, spread, arrow function, `map` / `filter` / `reduce`
3. `async` / `await`, `response.ok`, `try` / `catch` / `finally`
4. Try It เพิ่มหัวข้อละ 2 กิจกรรม พร้อม starter code, เฉลย และผลลัพธ์ตัวอย่าง
5. Free JavaScript Editor แบบว่าง พร้อม `Run code`, `Reset` และ Console output สำหรับ Live Coding
6. Mini Challenge เชื่อมไปยังโครงสร้าง `api.js`, `utils.js`, `ui.js`, `main.js` ของ LAB 02

## วิธีเปิดในเครื่อง

เปิด `sandbox/index.html` ด้วยเบราว์เซอร์ได้ทันที หรือรัน static server จาก root ของ course repository:

```bash
python3 -m http.server 8000
```

แล้วเปิด `http://localhost:8000/sandbox/`

## การเผยแพร่

เมื่อ course repository ถูกเผยแพร่ผ่าน GitHub Pages ที่ path `engse203/labs/week-02-modern-javascript/` หน้านี้จะอยู่ที่:

```text
https://se-rmutl.github.io/engse203/labs/week-02-modern-javascript/sandbox/
```

> Sandbox นี้เป็น static HTML/CSS/JavaScript จึงไม่ต้อง build ด้วย Vite และไม่มี dependency เพิ่มเติม

## การใช้ Free JavaScript Editor

ส่วน **Free JavaScript Editor** ใช้สำหรับผู้สอนพิมพ์โค้ดสด หรือให้นักศึกษาลอง JavaScript สั้น ๆ โดยไม่กระทบตัวอย่างหลัก

1. พิมพ์ JavaScript ใน Editor
2. กด `Run code`
3. อ่านผลลัพธ์หรือ error ที่ Console output
4. กด `Reset` เพื่อล้าง Editor กลับเป็นพื้นที่ว่าง

ตัว runner รองรับ `console.log`, `console.warn`, `console.error` และมี `fakeFetchTasks()` สำหรับทดลองแนวคิด async/await เช่นเดียวกับบทเรียนที่ 3
