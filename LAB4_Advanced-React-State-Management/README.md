# LAB: Advanced React & State Management (สัปดาห์ที่ 6)

เอกสารนี้สรุปภาพรวมของ Lab ประจำสัปดาห์ที่ 6 ในหัวข้อ **Advanced React & State Management** ซึ่งประกอบด้วยแบบฝึกหัดสำหรับทำความเข้าใจแนวคิดหลักในคาบเรียน และการบ้านซึ่งเป็นโปรเจคย่อยเพื่อประยุกต์ใช้ความรู้ทั้งหมดเข้าด้วยกัน

---

## 🎯 วัตถุประสงค์การเรียนรู้ (Learning Objectives)

เมื่อสิ้นสุด Lab นี้ นักศึกษาจะสามารถ:

1.  **สร้างและใช้งาน Custom Hooks** เพื่อห่อหุ้ม Logic ที่ใช้ซ้ำๆ เช่น การจัดการ `localStorage`
2.  **จัดการ Routing ใน Single Page Application (SPA)** ด้วย `react-router-dom` รวมถึงการสร้าง Dynamic Routes (`/path/:id`)
3.  **ดึงข้อมูลจาก External API** แบบ Asynchronous พร้อมทั้งจัดการสถานะ Loading และ Error ที่เกิดขึ้น
4.  **จัดการ Global State** ที่ซับซ้อนด้วย **Redux Toolkit** สำหรับฟีเจอร์อย่างระบบตะกร้าสินค้า และเข้าใจหลักการทำงานของ Context API
5.  **ปรับปรุง Performance ของแอปพลิเคชัน** โดยการป้องกันการ re-render ที่ไม่จำเป็นด้วย `React.memo` และ `useCallback`
6.  **ใช้ Git Workflow** ในการทำงานจริง ตั้งแต่การสร้าง Branch, การ Commit อย่างสม่ำเสมอ, และการส่งงานผ่าน Pull Request

---

## 📝 โครงสร้างของ Lab (Lab Structure)

Lab ของสัปดาห์นี้แบ่งออกเป็น 2 ส่วนหลัก:

### 1. แบบฝึกหัดในคาบเรียน (In-Class Exercises)

เป็นชุดแบบฝึกหัดย่อยที่เน้นทำความเข้าใจทีละหัวข้อ ตั้งแต่การตั้งค่าโปรเจค, Custom Hooks, Context API, Redux Toolkit, React Router ไปจนถึง Performance Optimization เพื่อสร้างความคุ้นเคยกับแต่ละเครื่องมือ

* **[ดูแบบฝึกหัด (lab-exercises-w6.md)](./lab-exercises-w6.md)**

### 2. การบ้าน (Take-Home Assignment)

เป็นโปรเจคย่อย "Mini E-commerce" ที่ให้นักศึกษาได้นำความรู้จากทุกหัวข้อมาประยุกต์ใช้จริงเพื่อสร้างแอปพลิเคชันที่มีฟังก์ชันสมบูรณ์ ตั้งแต่การแสดงผลสินค้า การเพิ่มของลงตะกร้า ไปจนถึงการจัดการ State ทั้งหมดด้วย Redux

* **[ดูโจทย์การบ้าน (mini-ecommerce.md)](./mini-ecommerce.md)**