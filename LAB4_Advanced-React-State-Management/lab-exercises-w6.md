# Exercises: Advanced React & State Management
### สัปดาห์ที่ 6 | ENGSE203

---

## ขั้นตอนที่ 1: การตั้งค่าโปรเจค (Vite + React)
เริ่มต้นด้วยการสร้างโปรเจค React ใหม่ด้วย Vite และจัดโครงสร้างโฟลเดอร์ตามแนวทางปฏิบัติที่ดี

```bash
# 1. สร้างโปรเจค
npm create vite@latest react-lab-w6 -- --template react

# 2. เข้าไปในโฟลเดอร์
cd react-lab-w6

# 3. ติดตั้ง dependencies ที่จำเป็น
npm install
npm install react-router-dom @reduxjs/toolkit react-redux

# 4. สร้างโครงสร้างโฟลเดอร์
mkdir -p src/components src/hooks src/features src/pages

# 5. รันโปรเจค
npm run dev
```

ในแต่ละหัวข้อด้านล่าง ให้นักศึกษาสร้างไฟล์ตามที่ระบุและลองเขียนโค้ดตามตัวอย่าง จากนั้นแก้ไขปัญหาในส่วน "โจทย์สำหรับฝึกฝน"

-----

## หัวข้อที่ 1: Custom Hooks

### คำอธิบาย

สร้าง Custom Hook ชื่อ `useLocalStorage` ที่ทำหน้าที่เหมือน `useState` แต่จะทำการบันทึกข้อมูลลงใน Local Storage ของเบราว์เซอร์โดยอัตโนมัติ

### ตัวอย่างโค้ดเริ่มต้น

```jsx
// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    // BUG: โค้ดส่วนนี้ทำงานไม่ถูกต้องเมื่อ value เป็น undefined
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// src/components/NameSaver.jsx
import { useLocalStorage } from '../hooks/useLocalStorage';

export function NameSaver() {
  const [name, setName] = useLocalStorage('username', '');

  return (
    <div>
      <input 
        className="border p-2 rounded"
        value={name} 
        onChange={e => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <h2>Hello, {name || 'Guest'}!</h2>
      <p>(ลองรีเฟรชหน้าเว็บดูสิ!)</p>
    </div>
  );
}
```

> **โจทย์สำหรับฝึกฝน 🎯**
>
> เมื่อผู้ใช้ลบชื่อใน input จนหมด (กลายเป็น string ว่าง) แล้วรีเฟรชหน้า, ค่าใน state จะกลายเป็น `undefined` ทำให้เกิด error. จงแก้ไข `useEffect` ใน `useLocalStorage` เพื่อจัดการกรณีนี้ให้ถูกต้อง โดยถ้า `value` เป็น `undefined` ให้ลบ item นั้นออกจาก Local Storage แทน
>
> \<details\>
> \<summary\>แสดง/ซ่อนคำใบ้\</summary\>
> \<b\>คำใบ้:\</b\> เพิ่มเงื่อนไข `if (value !== undefined)` ก่อน `localStorage.setItem` และเพิ่ม `else` เพื่อเรียก `localStorage.removeItem(key)`
> \</details\>

-----

## หัวข้อที่ 2: Context API

### คำอธิบาย

สร้างระบบ User Authentication แบบง่ายๆ โดยใช้ Context API เพื่อส่งข้อมูลผู้ใช้ที่ login อยู่ไปยังทุก Component โดยไม่ต้องทำ Prop Drilling

### ตัวอย่างโค้ดเริ่มต้น

```jsx
// src/contexts/AuthContext.jsx
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null means logged out

  const login = (username) => setUser({ name: username });
  const logout = () => setUser(null);

  // BUG: value ที่ส่งลงไปใน Provider ขาดฟังก์ชันที่จำเป็น
  const value = { user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
```

```jsx
// src/components/LoginComponent.jsx
import { useAuth } from '../contexts/AuthContext';

export function LoginComponent() {
  const { user, login, logout } = useAuth();

  if (user) {
    return <div>Welcome, {user.name}! <button onClick={logout}>Logout</button></div>;
  }
  return <button onClick={() => login('Somsak')}>Login</button>;
}
```

> **โจทย์สำหรับฝึกฝน 🎯**
>
> โค้ดข้างบนจะเกิด error เพราะ `LoginComponent` พยายามจะเรียกใช้ `login` และ `logout` ซึ่งไม่มีอยู่ใน context. จงแก้ไข `value` ที่ถูกส่งจาก `AuthProvider` ให้มีฟังก์ชัน `login` และ `logout` รวมอยู่ด้วย
>
> \<details\>
> \<summary\>แสดง/ซ่อนคำใบ้\</summary\>
> \<b\>คำใบ้:\</b\> แก้ไขบรรทัด `const value = { user };` ให้เป็น `const value = { user, login, logout };`
> \</details\>

-----

## หัวข้อที่ 3: Redux Toolkit

### คำอธิบาย

สร้างระบบตะกร้าสินค้า (Shopping Cart) โดยใช้ Redux Toolkit เพื่อจัดการ state ของสินค้าในตะกร้า

### ตัวอย่างโค้ดเริ่มต้น

```jsx
// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [], totalQuantity: 0 };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({ ...newItem, quantity: 1 });
      } else {
        existingItem.quantity++;
      }
    },
    // BUG: reducer สำหรับ removeItem ยังไม่ได้ถูกสร้างขึ้น
  }
});
export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
```

```jsx
// src/components/ShoppingCart.jsx
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

export function ShoppingCart() {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch(addItem({ id: 'p1', name: 'Laptop' }));
  };

  return (
    <div>
      <h2>Cart Items: {totalQuantity}</h2>
      <button onClick={handleAddItem}>Add Laptop</button>
      <button>Remove Laptop (Not working)</button>
    </div>
  );
}
```

> **โจทย์สำหรับฝึกฝน 🎯**
>
> ปุ่ม "Remove Laptop" ยังทำงานไม่ได้. จงเพิ่ม reducer ใหม่ชื่อ `removeItem` เข้าไปใน `cartSlice` ที่รับ `action.payload` เป็น `id` ของสินค้าที่ต้องการลบ และทำการลบสินค้านั้นออกจากตะกร้า พร้อมทั้งลด `totalQuantity` ลง (อย่าลืม export action ใหม่ด้วย\!)
>
> \<details\>
> \<summary\>แสดง/ซ่อนคำใบ้\</summary\>
> \<b\>คำใบ้:\</b\> เพิ่ม `removeItem(state, action) { ... }` ใน `reducers`. ใช้ `.filter()` เพื่อสร้าง array ใหม่ที่ไม่มี item ที่ต้องการลบ และอย่าลืม `state.totalQuantity--`
> \</details\>

-----

## หัวข้อที่ 4: React Router

### คำอธิบาย

สร้างหน้าสำหรับแสดงข้อมูลสินค้าแต่ละชิ้น โดยใช้ Dynamic Route (`/products/:productId`)

### ตัวอย่างโค้ดเริ่มต้น

```jsx
// src/pages/ProductListPage.jsx
import { Link } from 'react-router-dom';
const products = [{id: 'p1', name: 'Laptop'}, {id: 'p2', name: 'Mouse'}];

export function ProductListPage() {
  return (
    <ul>
      {products.map(p => (
        // BUG: Link ที่สร้างขึ้นมี path ไม่ถูกต้อง
        <li key={p.id}><Link to={`/product/${p.id}`}>{p.name}</Link></li>
      ))}
    </ul>
  );
}
```

```jsx
// src/pages/ProductDetailPage.jsx
import { useParams } from 'react-router-dom';
export function ProductDetailPage() {
  const { productId } = useParams();
  return <h1>Details for Product {productId}</h1>;
}
```

```jsx
// src/App.jsx
import { Routes, Route } from 'react-router-dom';
// ... import components
function App() {
  return (
    <Routes>
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
    </Routes>
  );
}
```

> **โจทย์สำหรับฝึกฝน 🎯**
>
> เมื่อคลิกลิงก์สินค้าในหน้า `ProductListPage` มันจะไม่ไปที่หน้า Product Detail เพราะ path ใน `<Link>` ไม่ตรงกับที่กำหนดไว้ใน `<Route>`. จงแก้ไข `to` prop ใน `<Link>` ให้ถูกต้อง
>
> \<details\>
> \<summary\>แสดง/ซ่อนคำใบ้\</summary\>
> \<b\>คำใบ้:\</b\> Path ที่ถูกต้องคือ `/products/...` ไม่ใช่ `/product/...`
> \</details\>

-----

## หัวข้อที่ 5: Performance Optimization

### คำอธิบาย

แก้ไขปัญหาการ re-render ที่ไม่จำเป็นใน Component ลูก โดยใช้ `React.memo` และ `useCallback`

### ตัวอย่างโค้ดเริ่มต้น

```jsx
import React, { useState, memo } from 'react';

// Component ลูกที่รับ props เป็นฟังก์ชัน
function HeavyCalculationComponent({ onCalculate }) {
  console.log('HeavyCalculationComponent is rendering!');
  return <button onClick={onCalculate}>Perform Heavy Calculation</button>;
}

// BUG: HeavyCalculationComponent ถูก re-render ทุกครั้งที่ parent state เปลี่ยน
// แม้ว่า props ของมันจะไม่ได้เปลี่ยนเลย

function ParentComponent() {
  const [count, setCount] = useState(0);

  const performCalculation = () => {
    // สมมติว่านี่คือการคำนวณที่หนักมาก
    console.log("Performing calculation...");
  };

  return (
    <div>
      <h2>Unrelated Counter: {count}</h2>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <hr className="my-4" />
      <HeavyCalculationComponent onCalculate={performCalculation} />
    </div>
  );
}
```

> **โจทย์สำหรับฝึกฝน 🎯**
>
> ทุกครั้งที่กดปุ่ม "Increment", `HeavyCalculationComponent` จะถูก re-render ใหม่ (สังเกตจาก console.log) ซึ่งไม่ควรจะเกิดขึ้น. จงใช้ `React.memo` และ `useCallback` เพื่อป้องกันการ re-render ที่ไม่จำเป็นนี้
>
> \<details\>
> \<summary\>แสดง/ซ่อนคำใบ้\</summary\>
> \<b\>คำใบ้:\</b\> 1. ครอบ `HeavyCalculationComponent` ด้วย `memo()` ตอน export. 2. ใน `ParentComponent`, ครอบฟังก์ชัน `performCalculation` ด้วย `useCallback` พร้อม dependency array ที่ว่างเปล่า `[]`
> \</details\>
