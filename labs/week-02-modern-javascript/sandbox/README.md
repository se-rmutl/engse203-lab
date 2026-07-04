# ENGSE203 Week 02 — Modern JavaScript Classroom Sandbox

Sandbox นี้เป็นหน้าเว็บ static สำหรับใช้สอนสดและให้นักศึกษาลองแก้ JavaScript ในเบราว์เซอร์ โดยไม่ต้องติดตั้ง Node.js หรือ Vite เพิ่ม

## เนื้อหา

1. `const` / `let` และ template literal
2. destructuring, spread, arrow function, `map` / `filter` / `reduce`
3. `async` / `await`, `response.ok`, `try` / `catch` / `finally`
4. Mini Challenge เชื่อมไปยังโครงสร้าง `api.js`, `utils.js`, `ui.js`, `main.js` ของ LAB 02

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
