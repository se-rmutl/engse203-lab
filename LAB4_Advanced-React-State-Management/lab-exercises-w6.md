# Lab Exercises: Advanced React & State Management

### สัปดาห์ที่ 6 | ENGSE203

เอกสารนี้จะแนะนำการทำโจทย์เพื่อฝึกฝนแนวคิดขั้นสูงใน React ทั้ง 5 หัวข้อ ได้แก่ Custom Hooks, Context API, Redux Toolkit, React Router และ Performance Optimization

-----

## ขั้นตอนที่ 1: การตั้งค่าโปรเจค

เริ่มต้นด้วยการสร้างโปรเจคและติดตั้งเครื่องมือที่จำเป็นทั้งหมด

**1.1 สร้างโปรเจคด้วย Vite และติดตั้ง Dependencies**
เปิด Terminal แล้วรันคำสั่งตามลำดับ:

```bash
# 1. สร้างโปรเจค React ใหม่
npm create vite@latest react-lab-w6 -- --template react

# 2. เข้าไปในโฟลเดอร์โปรเจค
cd react-lab-w6

# 3. ติดตั้ง dependencies ที่จำเป็นสำหรับ Lab
npm install react-router-dom @reduxjs/toolkit react-redux
```

**1.2 ติดตั้งและตั้งค่า Tailwind CSS**

```bash
# 1. ติดตั้ง Tailwind CSS และ dependencies ที่เกี่ยวข้อง
npm install -D tailwindcss@3.4.4 postcss@8.4.38 
npm install -D autoprefixer

# 2. สร้างไฟล์ config ของ Tailwind และ PostCSS (คำสั่งนี้จะสร้าง tailwind.config.js และ postcss.config.js)
npx tailwindcss init -p
```

**1.3 แก้ไขไฟล์ `tailwind.config.js`**
เปิดไฟล์ `tailwind.config.js` และกำหนดค่า `content` เพื่อให้ Tailwind รู้ว่าจะสแกนหา class ในไฟล์ไหนบ้าง:

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // สำคัญมาก
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**1.4 เพิ่ม Tailwind Directives ไปยัง `index.css`**
เปิดไฟล์ `src/index.css` ลบโค้ดเก่าทั้งหมด และใส่ 3 บรรทัดนี้เข้าไปแทน:

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**1.5 สร้างโครงสร้างโฟลเดอร์ทั้งหมด**
รันคำสั่งนี้เพื่อสร้างโฟลเดอร์ทั้งหมดที่เราจะใช้ใน Lab นี้:

```bash
mkdir -p src/components src/contexts src/hooks src/features/cart src/pages src/store
```

สร้างไฟล์ทั้งหมด ที่ระบุในขั้นตอนถัดไปให้ครบทุกไฟล์ตามตำแหน่งที่ถูกต้อง แต่ยังไม่ต้องใส่โค้ดก็ได้ (สร้างเป็นไฟล์เปล่าๆ ไว้ก่อน)

> src/hooks/useLocalStorage.js
> src/components/NameSaver.jsx
> src/contexts/AuthContext.jsx
> src/components/LoginComponent.jsx
> src/features/cart/cartSlice.js
> src/components/ShoppingCart.jsx
> src/pages/ProductListPage.jsx
> src/pages/ProductDetailPage.jsx
> src/components/ParentComponent.jsx

เมื่อทำครบทุกขั้นตอน โปรเจคของคุณจะพร้อมสำหรับขั้นตอนถัดไป

-----

## ขั้นตอนที่ 2: การสร้างไฟล์หลักของแอปพลิเคชัน

เราจะสร้างไฟล์ที่เป็นศูนย์กลาง 3 ไฟล์ เพื่อให้แอปพลิเคชันของเราทำงานร่วมกับ Redux และ React Router ได้อย่างสมบูรณ์

**2.1 สร้าง Redux Store (`store.js`)**
สร้างไฟล์ใหม่ที่ `src/store/store.js` เพื่อตั้งค่า Redux store ของเรา

```javascript
// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer, // กำหนดให้ cart reducer จัดการ state ในส่วนของ cart
  },
});
```

**2.2 สร้าง Entry Point ของแอป (`main.jsx`)**
แก้ไขไฟล์ `src/main.jsx` ทั้งหมดให้เป็นดังนี้ เพื่อครอบแอปด้วย Provider ที่จำเป็น

```javascript
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Import Tailwind CSS

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provider ของ Redux ทำให้ทุก component เข้าถึง store ได้ */}
    <Provider store={store}>
      {/* BrowserRouter เปิดใช้งาน React Router */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
```

**2.3 สร้าง Main App Component (`App.jsx`)**
แก้ไขไฟล์ `src/App.jsx` ทั้งหมดให้เป็นศูนย์กลางที่ควบคุม Layout, Navigation และการสลับหน้าของโจทย์แต่ละข้อ

```javascript
// src/App.jsx
import { Routes, Route, NavLink } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Import หน้าและ Component ของโจทย์แต่ละข้อ
import { NameSaver } from './components/NameSaver';
import { LoginComponent } from './components/LoginComponent';
import { ShoppingCart } from './components/ShoppingCart';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import ParentComponent from './components/ParentComponent';

function App() {
  const activeLinkStyle = {
    color: '#0ea5e9', // sky-500
    textDecorationLine: 'underline',
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        <header className="bg-white shadow-md sticky top-0 z-10">
          <nav className="container mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">W6 Lab: Advanced React</div>
              <div className="flex space-x-6 text-gray-600 font-medium">
                <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Hook</NavLink>
                <NavLink to="/context" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Context</NavLink>
                <NavLink to="/redux" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Redux</NavLink>
                <NavLink to="/router" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Router</NavLink>
                <NavLink to="/performance" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Performance</NavLink>
              </div>
            </div>
          </nav>
        </header>

        <main className="container mx-auto p-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Routes>
              <Route path="/" element={<NameSaver />} />
              <Route path="/context" element={<LoginComponent />} />
              <Route path="/redux" element={<ShoppingCart />} />
              <Route path="/router" element={<ProductListPage />} />
              <Route path="/products/:productId" element={<ProductDetailPage />} />
              <Route path="/performance" element={<ParentComponent />} />
            </Routes>
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
```

**รันโปรเจค:** ตอนนี้คุณสามารถรัน `npm run dev` ได้แล้ว จะเห็นหน้าเว็บพร้อม Navbar สำหรับกดสลับไปดูโจทย์แต่ละข้อ

-----

## ขั้นตอนที่ 3: เริ่มทำโจทย์ Lab (หัวข้อที่ 1-5)

ให้นักศึกษาสร้างไฟล์และเขียนโค้ดตามโจทย์ในแต่ละหัวข้อ

### หัวข้อที่ 1: Custom Hooks

  - **ไฟล์ที่ต้องสร้าง:** `src/hooks/useLocalStorage.js` และ `src/components/NameSaver.jsx`

<!-- end list -->

```javascript
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
```

```javascript
// src/components/NameSaver.jsx
import { useLocalStorage } from '../hooks/useLocalStorage';

export function NameSaver() {
  const [name, setName] = useLocalStorage('username', '');
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Topic 1: Custom Hook</h2>
      <input 
        className="border p-2 rounded w-full"
        value={name || ''} 
        onChange={e => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <h3 className="text-xl mt-4">Hello, <span className="font-semibold text-blue-600">{name || 'Guest'}</span>!</h3>
      <p className="text-gray-500 mt-2">(ลองพิมพ์ชื่อแล้วรีเฟรชหน้าเว็บ)</p>
    </div>
  );
}
```

> **โจทย์สำหรับฝึกฝน 🎯**
> เมื่อผู้ใช้ลบชื่อใน input จนหมดแล้วรีเฟรชหน้า, ค่าใน state อาจกลายเป็น `undefined` หรือ `null` ซึ่งทำให้เกิด error ได้ จงแก้ไข `useEffect` ใน `useLocalStorage` เพื่อจัดการกรณีนี้: ถ้า `value` เป็น `undefined` ให้ลบ item นั้นออกจาก Local Storage แทน
>
> **คำใบ้:** เพิ่มเงื่อนไข `if (value !== undefined)` ก่อน `localStorage.setItem` และเพิ่ม `else` เพื่อเรียก `localStorage.removeItem(key)`

### หัวข้อที่ 2: Context API

  - **ไฟล์ที่ต้องสร้าง:** `src/contexts/AuthContext.jsx` และ `src/components/LoginComponent.jsx`

<!-- end list -->

```javascript
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

```javascript
// src/components/LoginComponent.jsx
import { useAuth } from '../contexts/AuthContext';

export function LoginComponent() {
  const { user, login, logout } = useAuth(); // จะเกิด Error เพราะ login, logout เป็น undefined

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Topic 2: Context API</h2>
      {user ? (
        <div className="flex items-center space-x-4">
          <p>Welcome, <span className="font-semibold text-green-600">{user.name}</span>!</p>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={logout}>Logout</button>
        </div>
      ) : (
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => login('Somsak')}>Login</button>
      )}
    </div>
  );
}
```

> **โจทย์สำหรับฝึกฝน 🎯**
> โค้ดข้างบนจะเกิด error เพราะ `LoginComponent` พยายามจะเรียกใช้ `login` และ `logout` ซึ่งไม่มีอยู่ใน context. จงแก้ไข `value` ที่ถูกส่งจาก `AuthProvider` ให้มีฟังก์ชัน `login` และ `logout` รวมอยู่ด้วย
>
> **คำใบ้:** แก้ไขบรรทัด `const value = { user };` ให้เป็น `const value = { user, login, logout };`

### หัวข้อที่ 3: Redux Toolkit

  - **ไฟล์ที่ต้องสร้าง:** `src/features/cart/cartSlice.js` และ `src/components/ShoppingCart.jsx`

<!-- end list -->

```javascript
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
        state.items.push({ ...newItem, quantity: 1, price: 1500 }); // สมมติราคา
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

```javascript
// src/components/ShoppingCart.jsx
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

export function ShoppingCart() {
  const { items, totalQuantity } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const handleAddItem = () => dispatch(addItem({ id: 'p1', name: 'Laptop' }));
  const handleRemoveItem = () => {
    // ฟังก์ชันนี้ยังทำงานไม่ได้เพราะ action ยังไม่มี
    // dispatch(removeItem({ id: 'p1' })); 
    alert('Funtion not implemented yet!');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Topic 3: Redux Toolkit</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Cart ({totalQuantity} items)</h3>
        <ul className="list-disc pl-5 mt-2">
          {items.map(item => <li key={item.id}>{item.name} (x{item.quantity})</li>)}
        </ul>
      </div>
      <div className="flex space-x-4 mt-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleAddItem}>Add Laptop</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600" onClick={handleRemoveItem}>Remove Laptop (Not working)</button>
      </div>
    </div>
  );
}
```

> **โจทย์สำหรับฝึกฝน 🎯**
> ปุ่ม "Remove Laptop" ยังทำงานไม่ได้. จงเพิ่ม reducer ใหม่ชื่อ `removeItem` ใน `cartSlice` ที่รับ `id` ของสินค้า และทำการลบสินค้านั้นออกจากตะกร้า พร้อมลด `totalQuantity` (อย่าลืม export action ใหม่ด้วย)
>
> **คำใบ้:** เพิ่ม `removeItem(state, action) { ... }` ใน `reducers`. ข้างในให้หา `existingItem` ถ้ามีของชิ้นเดียวให้ `filter` ออก ถ้ามีหลายชิ้นให้ลด `quantity` ลง และอย่าลืม `state.totalQuantity--`

### หัวข้อที่ 4: React Router

  - **ไฟล์ที่ต้องสร้าง:** `src/pages/ProductListPage.jsx` และ `src/pages/ProductDetailPage.jsx`

<!-- end list -->

```javascript
// src/pages/ProductListPage.jsx
import { Link } from 'react-router-dom';
const products = [{id: 'p1', name: 'Laptop'}, {id: 'p2', name: 'Mouse'}];

export function ProductListPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Topic 4: React Router</h2>
      <p>Select a product:</p>
      <ul className="list-disc pl-5 mt-2 space-y-2">
        {products.map(p => (
          // BUG: Link ที่สร้างขึ้นมี path ไม่ถูกต้อง
          <li key={p.id} className="text-blue-600 hover:underline">
            <Link to={`/product/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

```javascript
// src/pages/ProductDetailPage.jsx
import { useParams, Link } from 'react-router-dom';
export function ProductDetailPage() {
  const { productId } = useParams();
  return (
    <div>
      <Link to="/router" className="text-blue-600 hover:underline mb-4 block">&larr; Back to Products</Link>
      <h1 className="text-2xl font-bold">Details for Product: {productId}</h1>
    </div>
  );
}
```

> **โจทย์สำหรับฝึกฝน 🎯**
> เมื่อคลิกลิงก์สินค้าในหน้า `ProductListPage` มันจะไม่ไปที่หน้า Product Detail เพราะ path ใน `<Link>` (`/product/...`) ไม่ตรงกับที่กำหนดไว้ใน `App.jsx` (`/products/...`). จงแก้ไข `to` prop ใน `<Link>` ให้ถูกต้อง
>
> **คำใบ้:** Path ที่ถูกต้องคือ `/products/...` ไม่ใช่ `/product/...`

### หัวข้อที่ 5: Performance Optimization

  - **ไฟล์ที่ต้องสร้าง:** `src/components/ParentComponent.jsx`

<!-- end list -->

```javascript
// src/components/ParentComponent.jsx
import React, { useState, useCallback } from 'react';

// Component ลูกที่รับ props เป็นฟังก์ชัน
const HeavyCalculationComponent = ({ onCalculate }) => {
  console.log('HeavyCalculationComponent is rendering!');
  return <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600" onClick={onCalculate}>Perform Heavy Calculation</button>;
};

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
      <h2 className="text-2xl font-bold mb-4">Topic 5: Performance Optimization</h2>
      <div className="mb-4">
        <p className="text-lg">Unrelated Counter: <span className="font-bold">{count}</span></p>
        <button className="mt-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setCount(c => c + 1)}>Increment</button>
      </div>
      <hr className="my-4" />
      <p className="mb-2">This button's component should not re-render when the counter changes:</p>
      <HeavyCalculationComponent onCalculate={performCalculation} />
    </div>
  );
}

export default ParentComponent;
```

> **โจทย์สำหรับฝึกฝน 🎯**
> ทุกครั้งที่กดปุ่ม "Increment", `HeavyCalculationComponent` จะถูก re-render ใหม่ (สังเกตจาก console.log) ซึ่งไม่ควรจะเกิดขึ้น. จงใช้ `React.memo` และ `useCallback` เพื่อป้องกันการ re-render ที่ไม่จำเป็นนี้
>
> **คำใบ้:** 1. ครอบ `HeavyCalculationComponent` ด้วย `React.memo()`. 2. ใน `ParentComponent`, ครอบฟังก์ชัน `performCalculation` ด้วย `useCallback` พร้อม dependency array ที่ว่างเปล่า `[]`