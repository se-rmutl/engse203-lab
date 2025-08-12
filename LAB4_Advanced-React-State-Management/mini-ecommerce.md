# Lab 4: Mini E-commerce Application 

**วิชา:** ENGSE203 การเขียนโปรแกรมสำหรับวิศวกรซอฟต์แวร์  
**หัวข้อ:** Advanced React & State Management  
**ระดับ:** ปานกลาง

### Live Demo: [Lab 4: Mini E-commerce Application](https://se-rmutl.github.io/engse203/week6/mini-ecommerce/)
---

## Table of Contents
- [Lab 4: Mini E-commerce Application](#lab-4-mini-e-commerce-application)
    - [Live Demo: Lab 4: Mini E-commerce Application](#live-demo-lab-4-mini-e-commerce-application)
  - [Table of Contents](#table-of-contents)
  - [เป้าหมายการเรียนรู้ (Learning Objectives)](#เป้าหมายการเรียนรู้-learning-objectives)
  - [ภาพรวมของแอปพลิเคชัน (Application Overview)](#ภาพรวมของแอปพลิเคชัน-application-overview)
  - [ขั้นตอนการทำงานด้วย Git (Git Workflow)](#ขั้นตอนการทำงานด้วย-git-git-workflow)
  - [ขั้นตอนการพัฒนา (Development Steps)](#ขั้นตอนการพัฒนา-development-steps)
    - [ขั้นตอนที่ 1: การตั้งค่าโปรเจค](#ขั้นตอนที่-1-การตั้งค่าโปรเจค)
    - [ขั้นตอนที่ 2: สร้าง Routing และ Layout](#ขั้นตอนที่-2-สร้าง-routing-และ-layout)
    - [ขั้นตอนที่ 3: การดึงข้อมูลสินค้า (Data Fetching)](#ขั้นตอนที่-3-การดึงข้อมูลสินค้า-data-fetching)
    - [ขั้นตอนที่ 4: การจัดการ State ด้วย Redux Toolkit](#ขั้นตอนที่-4-การจัดการ-state-ด้วย-redux-toolkit)
    - [ขั้นตอนที่ 5: Performance Optimization](#ขั้นตอนที่-5-performance-optimization)
  - [การส่งงาน](#การส่งงาน)

---

## เป้าหมายการเรียนรู้ (Learning Objectives)
- **Routing:** สร้าง SPA ที่มีหลายหน้าและจัดการ Dynamic Route (`/products/:id`) ด้วย React Router.
- **State Management:** ออกแบบและจัดการ Global State ที่ซับซ้อน (ตะกร้าสินค้า) ด้วย Redux Toolkit.
- **Data Fetching:** ดึงข้อมูลจาก External API, พร้อมจัดการสถานะ Loading และ Error.
- **Performance:** ประยุกต์ใช้ `React.memo` และ `useCallback` เพื่อป้องกันการ re-render ที่ไม่จำเป็น.
- **Git Workflow:** ใช้ Git ในการจัดการเวอร์ชันและส่งงานผ่าน Pull Request.

---

## ภาพรวมของแอปพลิเคชัน (Application Overview)
เราจะสร้างแอป E-commerce ขนาดเล็กที่มีหน้าตาและฟังก์ชันการทำงานที่สมจริงยิ่งขึ้น:

- **หน้าแสดงสินค้า (Products Page):** แสดงรายการสินค้าที่ดึงมาจาก API ในรูปแบบ Card
- **หน้าแสดงรายละเอียดสินค้า (Product Detail Page):** แสดงข้อมูลสินค้าแบบเจาะลึก
- **หน้าตะกร้าสินค้า (Cart Page):** แสดงรายการสินค้าในตะกร้า, ปรับจำนวน, ลบสินค้า, และดูราคารวม
- **Navigation Bar:** นำทางไปยังหน้าต่างๆ และแสดงจำนวนสินค้าในตะกร้าแบบ Real-time

---

## ขั้นตอนการทำงานด้วย Git (Git Workflow)
1. **Fork & Clone:** Fork Repository ต้นแบบของอาจารย์ และ Clone ลงมาที่เครื่อง 
2. **Create Branch**

   ```bash
   git checkout -b lab4-development
   ```

3. **Commit Regularly:**

   ```bash
   git commit -m "feat: Implement product list page with API data"
   ```
4. **Push to Origin:**

   ```bash
   git push origin lab4-feature-ecommerce
   ```
5. **Create Pull Request:** ส่งงานผ่าน Pull Request

---

## ขั้นตอนการพัฒนา (Development Steps)

### ขั้นตอนที่ 1: การตั้งค่าโปรเจค

```bash
# 1. สร้างโปรเจคด้วย Vite
npm create vite@latest mini-ecommerce -- --template react

# 2. เข้าไปในโฟลเดอร์
cd mini-ecommerce

# 3. ติดตั้ง dependencies
npm install react-router-dom @reduxjs/toolkit react-redux axios

# 4. ติดตั้ง Tailwind CSS dependencies ที่เกี่ยวข้อง
npm install -D tailwindcss@3.4.4 postcss@8.4.38 
npm install -D autoprefixer

# 5. สร้างไฟล์ config ของ Tailwind และ PostCSS
npx tailwindcss init -p

# 6. สร้างโครงสร้างโฟลเดอร์
mkdir -p src/components src/features/cart src/pages src/api

# 7. รันโปรเจค
npm run dev
```

> หมายเหตุ: อย่าลืมตั้งค่า `tailwind.config.js` ให้ถูกต้อง

---

### ขั้นตอนที่ 2: สร้าง Routing และ Layout

**ไฟล์:** `src/App.jsx`

```jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductListPage />} />
        {/* TODO 1: สร้าง Dynamic Route สำหรับหน้ารายละเอียดสินค้า */}
        {/* Path ควรเป็น /products/:productId */}
        
        <Route path="cart" element={<CartPage />} />
      </Route>
    </Routes>
  );
}
export default App;
```

**โจทย์:**

* สร้างไฟล์ Page Components ทั้งหมด (`HomePage`, `ProductListPage`, `ProductDetailPage`, `CartPage`) และ `Layout.jsx`
* เติมโค้ดในส่วน **TODO 1** ให้สมบูรณ์

---

### ขั้นตอนที่ 3: การดึงข้อมูลสินค้า (Data Fetching)

**ไฟล์:** `src/pages/ProductListPage.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // TODO 2: ดึงข้อมูลสินค้าจาก 'https://fakestoreapi.com/products'
        
      } catch (err) {
        setError('Failed to fetch products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
export default ProductListPage;
```

**โจทย์:**

* สร้าง Component `ProductCard.jsx` ที่แสดงรูปภาพ, ชื่อ, ราคา และปุ่ม "Add to Cart"
* เติมโค้ดในส่วน **TODO 2** ให้สมบูรณ์
* (เพิ่มเติม) ใน `ProductDetailPage.jsx` ดึงข้อมูลสินค้าเดียวโดยใช้ `productId` จาก URL

---

### ขั้นตอนที่ 4: การจัดการ State ด้วย Redux Toolkit

**ไฟล์:** `src/features/cart/cartSlice.js`

```js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // { id, title, price, image, quantity }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    // TODO 3: removeItem
    // TODO 4: updateQuantity
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
```

**โจทย์:**

* สร้าง `store.js` และตั้งค่า `<Provider>` ใน `main.jsx`
* เติมโค้ดในส่วน **TODO 3** และ **TODO 4**

---

### ขั้นตอนที่ 5: Performance Optimization

**ไฟล์:** `src/components/ProductCard.jsx` (บางส่วน)

```jsx
import React from 'react'; // TODO 6: import `memo`
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

// TODO 5: ใช้ React.memo
function ProductCard({ product }) {
  const dispatch = useDispatch();

  // TODO 7: ใช้ useCallback ใน Component แม่
  const handleAddToCart = () => {
    dispatch(addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
    }));
  };

  return ( /* ... JSX ... */ );
}

export default ProductCard;
```

**โจทย์:**

* **TODO 5:** ใช้ `React.memo` กับ `ProductCard`
* **TODO 6 & 7:** ย้าย `handleAddToCart` ไปไว้ที่ `ProductListPage.jsx` และใช้ `useCallback` เพื่อ memoize

---

## การส่งงาน

* เมื่อทำทุกขั้นตอนเสร็จสิ้นแล้ว ให้ push โค้ดขึ้น GitHub และสร้าง Pull Request ตามขั้นตอน Git Workflow

---


