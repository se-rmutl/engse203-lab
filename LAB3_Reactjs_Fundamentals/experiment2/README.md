# สัปดาห์ที่ 5: Experiment2: JSX Workshop - React.js Fundamentals

ยินดีต้อนรับนักศึกษาวิศวกรรมซอฟต์แวร์ชั้นปีที่ 2 ทุกคนเข้าสู่ Workshop การพัฒนาเว็บแอปพลิเคชันด้วย React.js ในสัปดาห์นี้ เราจะมาปูพื้นฐานที่สำคัญที่สุดของ React ซึ่งเป็น Framework ที่ได้รับความนิยมอย่างสูงในปัจจุบัน (และแน่นอนในปี 2025) ไปด้วยกันแบบ Step-by-Step

**เป้าหมายการเรียนรู้:**
* เข้าใจแนวคิดของ Component-Based Architecture
* สามารถเขียน JSX Syntax ได้อย่างถูกต้อง
* จัดการข้อมูลภายใน Component ด้วย State และส่งต่อข้อมูลด้วย Props
* ใช้งาน React Hooks ที่จำเป็น (useState, useEffect) ได้อย่างคล่องแคล่ว
* จัดการกับ Event ต่างๆ จากผู้ใช้งานได้
* สร้างเว็บแอปพลิเคชันขนาดเล็กที่รวบรวมทุกแนวคิดเข้าไว้ด้วยกันได้

---

## เตรียมความพร้อม (Preparation): การติดตั้ง Environment

ก่อนจะเริ่มเขียนโค้ด เราต้องเตรียมเครื่องมือกันก่อน สำหรับปี 2025 เราจะใช้ **Vite** (อ่านว่า "วีท") เป็นเครื่องมือสำหรับสร้างโปรเจกต์ React ซึ่งรวดเร็วกว่า `create-react-app` แบบดั้งเดิมมาก

เปิด Terminal หรือ Command Prompt แล้วทำตามขั้นตอนต่อไปนี้:

1.  **สร้างโปรเจกต์ React ใหม่ด้วย Vite:**
    ```bash
    # npm 7+, a shorter way:
    npm create vite@latest react-workshop -- --template react
    
    # หรือ yarn
    # yarn create vite react-workshop --template react
    ```
    * `react-workshop` คือชื่อโปรเจกต์ของเรา สามารถเปลี่ยนเป็นชื่ออื่นได้

2.  **เข้าไปในโฟลเดอร์โปรเจกต์:**
    ```bash
    cd react-workshop
    ```

3.  **ติดตั้ง Dependencies (Library ที่จำเป็น):**
    ```bash
    npm install
    # หรือ yarn
    ```

4.  **เริ่มการทำงานของ Development Server:**
    ```bash
    npm run dev
    # หรือ yarn dev
    ```

เมื่อทำสำเร็จ คุณจะเห็น URL (เช่น `http://localhost:5173`) ใน Terminal ให้เปิด URL นั้นในเบราว์เซอร์ แล้วคุณจะพบกับหน้าเริ่มต้นของ React ครับ!

---

## Step 1: Components และ JSX Syntax (หัวใจของ React)

**Component** คือหน่วยย่อยอิสระที่ประกอบกันเป็นหน้าเว็บ ลองนึกภาพหน้า Facebook ที่ประกอบด้วย Component ของ Navbar, Sidebar, Post, Comment แต่ละส่วนถูกสร้างแยกกันแล้วนำมาประกอบร่างกัน ทำให้ง่ายต่อการจัดการและนำกลับมาใช้ใหม่

**JSX (JavaScript XML)** คือ Syntax พิเศษที่ทำให้เราสามารถเขียนโค้ดที่หน้าตาเหมือน HTML ลงไปใน JavaScript ได้โดยตรง

**ลงมือปฏิบัติ:**

1.  เปิดโปรเจกต์ใน VS Code แล้วไปที่ไฟล์ `src/App.jsx`
2.  ลบโค้ดเดิมทั้งหมด แล้วใส่โค้ดนี้ลงไป:
    ```jsx
    // src/App.jsx
    
    // นี่คือ Functional Component ชื่อ App
    function App() {
      // Component จะ return โค้ด JSX ที่จะถูกนำไปแสดงผล
      return (
        <div>
          <h1>สวัสดี, React!</h1>
          <p>นี่คือ Component แรกของฉัน</p>
        </div>
      );
    }
    
    export default App;
    ```
    สังเกตว่าเราเขียนโค้ดคล้าย HTML ใน `return` ได้เลย นี่คือพลังของ JSX

3.  **สร้าง Component ใหม่:**
    * สร้างไฟล์ใหม่ในโฟลเดอร์ `src` ชื่อว่า `Welcome.jsx`
    * ใส่โค้ดนี้ลงไป:
    ```jsx
    // src/Welcome.jsx
    
    function Welcome() {
      return <h2>ยินดีต้อนรับสู่ Workshop ของเรา!</h2>;
    }
    
    export default Welcome;
    ```

4.  **นำ Component มาใช้งาน (Composition):**
    * กลับไปที่ไฟล์ `src/App.jsx`
    * `import` Welcome component เข้ามา แล้วเรียกใช้งานเหมือนเป็น HTML tag
    ```jsx
    // src/App.jsx
    import Welcome from './Welcome'; // Import Component ที่เราสร้าง
    
    function App() {
      return (
        <div>
          <Welcome /> {/* เรียกใช้ Component ที่ import มา */}
          <h1>สวัสดี, React!</h1>
          <p>นี่คือ Component แรกของฉัน</p>
        </div>
      );
    }
    
    export default App;
    ```
    เมื่อกลับไปดูที่เบราว์เซอร์ คุณจะเห็นข้อความจาก `Welcome` component แสดงผลขึ้นมา

---

## Step 2: State และ Props (การจัดการและส่งต่อข้อมูล)

**Props (Properties):** คือวิธีส่งข้อมูลจาก **Parent Component (ตัวแม่)** ไปยัง **Child Component (ตัวลูก)** เหมือนการส่ง argument ให้ฟังก์ชัน Props เป็นข้อมูลที่ "อ่านได้อย่างเดียว" (Read-only) ในฝั่งลูก

**State:** คือข้อมูลที่ "อยู่ภายใน" Component และสามารถ "เปลี่ยนแปลงได้" เมื่อ State เปลี่ยน React จะทำการ Render Component นั้นใหม่โดยอัตโนมัติเพื่อแสดงผลข้อมูลล่าสุด

**ลงมือปฏิบัติ (Props):**

1.  แก้ไข `src/App.jsx` เพื่อส่งข้อมูล `name` ไปให้ `Welcome` component
    ```jsx
    // src/App.jsx
    import Welcome from './Welcome';
    
    function App() {
      return (
        <div>
          {/* ส่ง props ชื่อ name และมีค่าเป็น "นักศึกษา" */}
          <Welcome name="นักศึกษา" />
          <Welcome name="อาจารย์" />
        </div>
      );
    }
    
    export default App;
    ```

2.  แก้ไข `src/Welcome.jsx` เพื่อรับและแสดงผล `props`
    ```jsx
    // src/Welcome.jsx
    
    // รับ props เป็น parameter ของฟังก์ชัน
    function Welcome(props) {
      // เข้าถึงค่า props ผ่าน props.ชื่อprops
      return <h2>ยินดีต้อนรับ, {props.name}!</h2>;
    }
    
    // หรือใช้ Destructuring (นิยมกว่า)
    // function Welcome({ name }) {
    //   return <h2>ยินดีต้อนรับ, {name}!</h2>;
    // }
    
    export default Welcome;
    ```
    คุณจะเห็นข้อความต้อนรับ 2 อันที่มีชื่อต่างกัน

**ลงมือปฏิบัติ (State และ `useState` Hook):**

`useState` คือ **Hook** ตัวแรกที่เราจะเรียนรู้ มันทำให้ Functional Component สามารถมี State เป็นของตัวเองได้

เราจะสร้าง Component สำหรับนับเลขง่ายๆ

1.  สร้างไฟล์ใหม่ `src/Counter.jsx`
2.  ใส่โค้ดนี้ลงไป:
    ```jsx
    // src/Counter.jsx
    import React, { useState } from 'react'; // ต้อง import useState
    
    function Counter() {
      // ประกาศ state ชื่อ count และฟังก์ชันสำหรับอัปเดตชื่อ setCount
      // 0 คือค่าเริ่มต้นของ count
      const [count, setCount] = useState(0);
    
      return (
        <div>
          <p>คุณกดไปแล้ว {count} ครั้ง</p>
        </div>
      );
    }
    
    export default Counter;
    ```

3.  นำ `Counter` ไปใช้ใน `src/App.jsx`
    ```jsx
    // src/App.jsx
    import Counter from './Counter';
    
    function App() {
      return (
        <div>
          <h1>Workshop: State & Props</h1>
          <Counter />
        </div>
      );
    }
    
    export default App;
    ```
    ตอนนี้คุณจะเห็นตัวนับเลข แต่ยังกดเพิ่มค่าไม่ได้...

---

## Step 3: Event Handling (การตอบสนองผู้ใช้)

เราจะทำให้ปุ่มใน `Counter` ของเราทำงานได้จริง

**ลงมือปฏิบัติ:**

1.  กลับไปที่ไฟล์ `src/Counter.jsx`
2.  เพิ่มปุ่มและฟังก์ชันสำหรับจัดการการคลิก
    ```jsx
    // src/Counter.jsx
    import React, { useState } from 'react';
    
    function Counter() {
      const [count, setCount] = useState(0);
    
      // ฟังก์ชันที่จะทำงานเมื่อปุ่มถูกคลิก
      const handleIncrement = () => {
        // ใช้ setCount เพื่ออัปเดตค่า state
        setCount(count + 1);
      };
    
      const handleDecrement = () => {
        setCount(count - 1);
      }
    
      return (
        <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem' }}>
          <h3>ตัวนับเลข</h3>
          <p>คุณกดไปแล้ว: {count} ครั้ง</p>
          {/* ใช้ onClick เพื่อผูก Event เข้ากับฟังก์ชัน */}
          <button onClick={handleIncrement}>
            เพิ่มค่า +
          </button>
          <button onClick={handleDecrement} style={{ marginLeft: '8px' }}>
            ลดค่า -
          </button>
        </div>
      );
    }
    
    export default Counter;
    ```
    ตอนนี้คุณสามารถกดปุ่มเพื่อเพิ่มและลดค่าตัวเลขได้แล้ว! ทุกครั้งที่ `setCount` ถูกเรียก, React จะ render `Counter` component ใหม่ด้วยค่า `count` ล่าสุด

---

## Step 4: `useEffect` Hook (การจัดการ Side Effects)

**Side Effects** คือการทำงานใดๆ ที่อยู่นอกเหนือการ render UI ปกติ เช่น การเรียก API, การตั้งค่า timers, หรือการเปลี่ยนแปลง DOM โดยตรง

`useEffect` Hook ให้เราสามารถจัดการ Side Effects เหล่านี้ได้

**ลงมือปฏิบัติ:**

เราจะทำให้ Title ของหน้าเว็บเปลี่ยนไปตามค่าของ `count`

1.  แก้ไขไฟล์ `src/Counter.jsx`
    ```jsx
    // src/Counter.jsx
    import React, { useState, useEffect } from 'react'; // import useEffect
    
    function Counter() {
      const [count, setCount] = useState(0);
    
      // useEffect จะทำงานหลังจากที่ component render เสร็จสิ้น
      useEffect(() => {
        // นี่คือ side effect ที่เราต้องการทำ
        console.log('Effect ทำงาน!');
        document.title = `คุณกดไปแล้ว ${count} ครั้ง`;
    
        // Dependency Array [count] หมายความว่า
        // effect นี้จะทำงานใหม่ "ก็ต่อเมื่อ" ค่า count เปลี่ยนแปลงเท่านั้น
      }, [count]);
    
      const handleIncrement = () => {
        setCount(count + 1);
      };
    
      // ... (ส่วนอื่นๆ เหมือนเดิม)
    
      return (
        <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem' }}>
          <h3>ตัวนับเลข (พร้อม Effect)</h3>
          <p>คุณกดไปแล้ว: {count} ครั้ง</p>
          <button onClick={handleIncrement}>
            เพิ่มค่า +
          </button>
        </div>
      );
    }
    
    export default Counter;
    ```
    **ข้อสังเกต:**
    * **`useEffect(callback, [dependencies])`**
    * ถ้า Dependency Array เป็น `[]` (ว่างเปล่า): Effect จะทำงานแค่ **ครั้งเดียว** หลังจากการ render ครั้งแรก (เหมาะสำหรับ fetch ข้อมูลเริ่มต้น)
    * ถ้าไม่มี Dependency Array: Effect จะทำงาน **ทุกครั้ง** ที่มีการ render ใหม่ (ต้องระวังการเกิด infinite loop!)

---

## Mini Project: Simple To-Do List App

ถึงเวลานำความรู้ทั้งหมดมาประกอบร่างกัน! เราจะสร้างแอป To-Do List ง่ายๆ ที่สามารถ เพิ่ม และ ลบ รายการได้

**โครงสร้าง Component:**
* `App.jsx`: Component หลักที่เก็บ `state` ของ to-do list ทั้งหมด
* `TodoForm.jsx`: Component ที่มี `input` และ `button` สำหรับเพิ่ม to-do ใหม่
* `TodoList.jsx`: Component ที่แสดงรายการ to-do ทั้งหมด

**Step 1: สร้างไฟล์**
สร้างไฟล์ใหม่ 2 ไฟล์ใน `src`: `TodoForm.jsx` และ `TodoList.jsx`

**Step 2: เขียนโค้ด `App.jsx` (State Management Hub)**
```jsx
// src/App.jsx
import React, { useState } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import './App.css'; // import css เพื่อความสวยงาม

function App() {
  // State หลักสำหรับเก็บรายการ todos ทั้งหมด
  const [todos, setTodos] = useState([
    { id: 1, text: 'เรียนรู้ React Hooks', completed: false },
    { id: 2, text: 'ทำ Mini Project', completed: false },
  ]);

  // ฟังก์ชันสำหรับเพิ่ม todo ใหม่ (จะส่งไปให้ TodoForm ผ่าน props)
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // ใช้ timestamp เป็น id ชั่วคราว
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]); // เพิ่ม todo ใหม่เข้าไปใน array เดิม
  };

  // ฟังก์ชันสำหรับลบ todo (จะส่งไปให้ TodoList ผ่าน props)
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app">
      <h1>My To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
```

**Step 3: เขียนโค้ด `TodoForm.jsx` (Input & Event)**
```jsx
// src/TodoForm.jsx
import React, { useState } from 'react';

function TodoForm({ addTodo }) { // รับฟังก์ชัน addTodo มาจาก props
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // ป้องกันไม่ให้ฟอร์ม refresh หน้า
    if (!inputValue.trim()) return; // ไม่เพิ่มถ้าค่าว่าง
    addTodo(inputValue);
    setInputValue(''); // ล้างค่าใน input field
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="เพิ่มรายการใหม่..."
      />
      <button type="submit">เพิ่ม</button>
    </form>
  );
}

export default TodoForm;
```

**Step 4: เขียนโค้ด `TodoList.jsx` (Display & Props)**
```jsx
// src/TodoList.jsx
import React from 'react';

function TodoList({ todos, deleteTodo }) { // รับ todos และ deleteTodo มาจาก props
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className="todo-item">
          <span>{todo.text}</span>
          <button onClick={() => deleteTodo(todo.id)}>ลบ</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
```

**Step 5: เพิ่ม CSS เพื่อความสวยงาม**
สร้างไฟล์ `src/App.css` แล้วใส่ CSS นี้ลงไป:
```css
/* src/App.css */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f4f4f9;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  margin-top: 40px;
}

.app {
  width: 100%;
  max-width: 500px;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #4a4a4a;
}

.todo-form {
  display: flex;
  margin-bottom: 1rem;
}

.todo-form input {
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
}

.todo-form button {
  padding: 0.75rem 1rem;
  border: none;
  background-color: #5c67f2;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  transition: background-color 0.2s;
}

.todo-form button:hover {
  background-color: #4a54d1;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #fafafa;
  border-bottom: 1px solid #eee;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-item button {
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.todo-item button:hover {
  background: #e60000;
}
```

ตอนนี้คุณจะมี To-Do List App ที่ทำงานได้อย่างสมบูรณ์!

---

## สรุปและก้าวต่อไป (Conclusion & Next Steps)

ใน Workshop นี้ เราได้เรียนรู้หัวใจสำคัญของ React:
1.  **Components & JSX**: การสร้าง UI แบบประกอบร่าง
2.  **Props**: การส่งข้อมูลจากบนลงล่าง
3.  **State (`useState`)**: การจัดการข้อมูลที่เปลี่ยนแปลงได้ภายใน Component
4.  **Event Handling**: การตอบสนองต่อการกระทำของผู้ใช้
5.  **Side Effects (`useEffect`)**: การทำงานกับสิ่งที่อยู่นอกเหนือการ render

ขอให้สนุกกับการเขียน React ครับ! นี่เป็นเพียงจุดเริ่มต้นของการเดินทางในโลกของ Frontend Development ที่น่าตื่นเต้น

---

## ภาคผนวก: กิจกรรมท้าทาย (Appendix: Challenge Activities)

ยินดีต้อนรับสู่ส่วนท้าทาย! ในส่วนนี้ เราจะนำความรู้จาก Mini Project มาต่อยอดเพื่อเพิ่มความสามารถให้แอป To-Do List ของเรา และเรียนรู้แนวคิดที่สำคัญเพิ่มเติมใน React

### Challenge 1: เพิ่มฟังก์ชัน Toggle (ขีดฆ่ารายการที่ทำเสร็จ)

**เป้าหมาย:** ทำให้ผู้ใช้สามารถคลิกที่รายการ to-do เพื่อสลับสถานะ "เสร็จสิ้น" (completed) และแสดงผลเป็นการขีดฆ่าข้อความ

**ขั้นตอน:**

**1. เพิ่ม Logic การ Toggle ใน `App.jsx`**

เราต้องสร้างฟังก์ชันที่สามารถอัปเดตสถานะ `completed` ของ to-do item ที่ต้องการ

* เปิดไฟล์ `src/App.jsx`
* เพิ่มฟังก์ชัน `toggleTodo` เข้าไป
* ส่งฟังก์ชัน `toggleTodo` เป็น prop ไปให้ `TodoList`

```jsx
// src/App.jsx

import React, { useState } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'เรียนรู้ React Hooks', completed: true },
    { id: 2, text: 'ทำ Mini Project', completed: false },
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 🔽 เพิ่มฟังก์ชันนี้
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="app">
      <h1>My To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      {/* 🔽 ส่ง toggleTodo เป็น prop */}
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </div>
  );
}

export default App;
```

**2. ทำให้ `TodoList` สามารถเรียกใช้ `toggleTodo` และเปลี่ยน Style ได้**

* เปิดไฟล์ `src/TodoList.jsx`
* รับ `toggleTodo` มาจาก props
* เพิ่ม `onClick` event ให้กับ `<span>` ที่แสดงข้อความ เพื่อเรียก `toggleTodo`
* เพิ่ม `className` แบบมีเงื่อนไข เพื่อให้สามารถใส่สไตล์สำหรับรายการที่เสร็จแล้วได้

```jsx
// src/TodoList.jsx

import React from 'react';

// 🔽 รับ toggleTodo เพิ่ม
function TodoList({ todos, deleteTodo, toggleTodo }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        // 🔽 เพิ่ม className แบบมีเงื่อนไข
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          {/* 🔽 เพิ่ม onClick และเปลี่ยน span */}
          <span onClick={() => toggleTodo(todo.id)}>
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>ลบ</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
```

**3. เพิ่ม Style การขีดฆ่าใน `App.css`**

* เปิดไฟล์ `src/App.css`
* เพิ่ม style rule สำหรับ class `.completed`

```css
/* src/App.css */

/* ... (โค้ดเดิม) ... */

.todo-item {
  /* ... (โค้ดเดิม) ... */
  cursor: pointer; /* เพิ่ม cursor เพื่อให้รู้ว่าคลิกได้ */
}

/* 🔽 เพิ่ม rule นี้ */
.todo-item.completed span {
  text-decoration: line-through;
  color: #999;
}

.todo-item button {
  /* ... (โค้ดเดิม) ... */
}
```

**ผลลัพธ์:** ตอนนี้เมื่อคุณคลิกที่ข้อความของ to-do item มันจะถูกขีดฆ่า และคลิกอีกครั้งเพื่อยกเลิก!

---

### Challenge 2: แก้ไขรายการ To-Do

**เป้าหมาย:** เพิ่มความสามารถให้ผู้ใช้แก้ไขข้อความของ to-do ที่มีอยู่แล้วได้

**แนวคิด:** เราจะสร้าง state ใหม่เพื่อติดตามว่า item ไหนกำลังอยู่ใน "โหมดแก้ไข" (editing mode) เมื่ออยู่ในโหมดนี้ เราจะแสดง `<input>` แทนข้อความปกติ

**ขั้นตอน:**

**1. (แนะนำ) Refactor เป็น `TodoItem` Component**

เพื่อจัดการความซับซ้อนที่เพิ่มขึ้น เราควรแยกแต่ละ item ใน list ออกมาเป็น Component ของตัวเอง

* สร้างไฟล์ใหม่ `src/TodoItem.jsx`

```jsx
// src/TodoItem.jsx
import React, { useState } from 'react';

// 🔽 รับ props ทั้งหมดที่จำเป็น
function TodoItem({ todo, deleteTodo, toggleTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  // เราจะเพิ่มฟังก์ชันแก้ไขในขั้นตอนต่อไป
  // const handleSave = () => { ... };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span onClick={() => toggleTodo(todo.id)}>
        {todo.text}
      </span>
      <div>
        <button className="edit-btn">แก้ไข</button>
        <button onClick={() => deleteTodo(todo.id)}>ลบ</button>
      </div>
    </li>
  );
}

export default TodoItem;
```

**2. ปรับปรุง `TodoList.jsx` ให้ใช้ `TodoItem`**

```jsx
// src/TodoList.jsx
import React from 'react';
import TodoItem from './TodoItem'; // 🔽 Import

function TodoList({ todos, deleteTodo, toggleTodo }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        // 🔽 เรียกใช้ TodoItem และส่ง props ต่อไป
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
```

**3. เพิ่ม Logic การแก้ไข**

* **`App.jsx`**: สร้างฟังก์ชัน `editTodo` และส่งเป็น prop ลงไป

```jsx
// src/App.jsx

// ... (imports และ state เดิม)
function App() {
  // ... (state และฟังก์ชัน addTodo, deleteTodo, toggleTodo เดิม)

  // 🔽 เพิ่มฟังก์ชันนี้
  const editTodo = (id, newText) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <div className="app">
      <h1>My To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      {/* 🔽 ส่ง editTodo เป็น prop */}
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
      />
    </div>
  );
}

export default App;
```

* **`TodoList.jsx`**: รับ `editTodo` และส่งต่อไปยัง `TodoItem`

```jsx
// src/TodoList.jsx
// ...
function TodoList({ todos, deleteTodo, toggleTodo, editTodo }) { // 🔽 รับ editTodo
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          editTodo={editTodo} // 🔽 ส่งต่อ editTodo
        />
      ))}
    </ul>
  );
}
// ...
```

* **`TodoItem.jsx`**: เพิ่ม UI และ Logic สำหรับโหมดแก้ไข

```jsx
// src/TodoItem.jsx
import React, { useState } from 'react';

function TodoItem({ todo, deleteTodo, toggleTodo, editTodo }) { // 🔽 รับ editTodo
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleSave = () => {
    if (newText.trim()) {
      editTodo(todo.id, newText);
      setIsEditing(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        // 🔽 UI สำหรับโหมดแก้ไข
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleSave} // บันทึกเมื่อ focus หลุด
          onKeyPress={(e) => e.key === 'Enter' && handleSave()} // บันทึกเมื่อกด Enter
          autoFocus // focus อัตโนมัติเมื่อแสดงผล
        />
      ) : (
        // UI ปกติ
        <span onClick={() => toggleTodo(todo.id)}>
          {todo.text}
        </span>
      )}

      <div>
        {isEditing ? (
          <button onClick={handleSave} className="save-btn">บันทึก</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="edit-btn">แก้ไข</button>
        )}
        <button onClick={() => deleteTodo(todo.id)}>ลบ</button>
      </div>
    </li>
  );
}

export default TodoItem;
```

**4. เพิ่ม Style สำหรับปุ่มและ Input ใน `App.css`**

```css
/* src/App.css */
/* ... */
.todo-item .edit-btn, .todo-item .save-btn {
  background-color: #f0ad4e;
  margin-right: 8px;
}

.todo-item .save-btn {
  background-color: #5cb85c;
}

.todo-item .edit-btn:hover {
  background-color: #ec971f;
}

.todo-item .save-btn:hover {
  background-color: #4cae4c;
}

.todo-item input[type="text"] {
  flex-grow: 1;
  border: 1px solid #ddd;
  padding: 0.4rem;
  border-radius: 4px;
}

.todo-item > div {
  display: flex;
  align-items: center;
}
```

**ผลลัพธ์:** ตอนนี้คุณจะมีปุ่ม "แก้ไข" เมื่อกดแล้วจะเข้าสู่โหมดแก้ไข และสามารถบันทึกการเปลี่ยนแปลงได้

---

### Challenge 3: แก้ปัญหา Prop Drilling ด้วย `useContext` Hook

**เป้าหมาย:** เรียนรู้วิธีใช้ `useContext` เพื่อส่งข้อมูลและฟังก์ชันจาก `App` component ไปยัง component ลูกหลานได้โดยตรง โดยไม่ต้องส่งผ่าน props เป็นทอดๆ (Prop Drilling)

**แนวคิด:**
1.  **Create Context:** สร้าง "กล่อง" กลางสำหรับเก็บข้อมูล
2.  **Provide Context:** นำ "กล่อง" ไปครอบ component ทั้งหมดที่ต้องการใช้ข้อมูล และใส่ข้อมูลลงไป
3.  **Consume Context:** ใน component ลูกหลานที่ต้องการใช้ข้อมูล ให้ "เปิดกล่อง" เพื่อหยิบข้อมูลไปใช้

**ขั้นตอน:**

**1. สร้าง Context File**

* สร้างโฟลเดอร์ใหม่ `src/contexts`
* สร้างไฟล์ใหม่ `src/contexts/TodoContext.js`

```javascript
// src/contexts/TodoContext.js
import { createContext } from 'react';

export const TodoContext = createContext();
```

**2. Provide Context ใน `App.jsx`**

* เราจะย้าย state และ logic ทั้งหมดไปไว้ใน Provider
* `App.jsx` จะทำหน้าที่แค่ "Provide" context ให้กับลูกๆ

```jsx
// src/App.jsx
import React, { useState } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import { TodoContext } from './contexts/TodoContext'; // 🔽 Import
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'เรียนรู้ useContext', completed: true },
    { id: 2, text: 'ทำความเข้าใจ Prop Drilling', completed: false },
  ]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // 🔽 สร้าง object ที่จะส่งผ่าน context
  const todoContextValue = {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
  };

  return (
    // 🔽 ครอบด้วย Provider และส่ง value
    <TodoContext.Provider value={todoContextValue}>
      <div className="app">
        <h1>My To-Do List (with Context)</h1>
        <TodoForm />
        <TodoList />
      </div>
    </TodoContext.Provider>
  );
}

export default App;
```

**3. Consume Context ใน Component ลูก**

ตอนนี้เราไม่ต้องรับ props ที่เกี่ยวกับ to-do อีกต่อไป แต่จะดึงมาจาก context โดยตรง

* **`TodoForm.jsx`**

```jsx
// src/TodoForm.jsx
import React, { useState, useContext } from 'react'; // 🔽 import useContext
import { TodoContext } from './contexts/TodoContext'; // 🔽 Import Context

function TodoForm() { // 🔽 ไม่ต้องรับ props แล้ว
  const { addTodo } = useContext(TodoContext); // 🔽 ดึงฟังก์ชันมาจาก context
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    addTodo(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="เพิ่มรายการใหม่..."
      />
      <button type="submit">เพิ่ม</button>
    </form>
  );
}

export default TodoForm;
```

* **`TodoList.jsx`**

```jsx
// src/TodoList.jsx
import React, { useContext } from 'react';
import TodoItem from './TodoItem';
import { TodoContext } from './contexts/TodoContext';

function TodoList() { // 🔽 ไม่ต้องรับ props แล้ว
  const { todos } = useContext(TodoContext); // 🔽 ดึง state มาจาก context

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
```

* **`TodoItem.jsx`**

```jsx
// src/TodoItem.jsx
import React, { useState, useContext } from 'react';
import { TodoContext } from './contexts/TodoContext';

function TodoItem({ todo }) { // 🔽 รับแค่ todo ก็พอ
  const { deleteTodo, toggleTodo, editTodo } = useContext(TodoContext); // 🔽 ดึงฟังก์ชันมาจาก context
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleSave = () => {
    if (newText.trim()) {
      editTodo(todo.id, newText);
      setIsEditing(false);
    }
  };

  // ... (ส่วน JSX เหมือนเดิมทุกประการ)
  return (
     <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleSave}
          onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
        />
      ) : (
        <span onClick={() => toggleTodo(todo.id)}>
          {todo.text}
        </span>
      )}
      <div>
        {isEditing ? (
          <button onClick={handleSave} className="save-btn">บันทึก</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="edit-btn">แก้ไข</button>
        )}
        <button onClick={() => deleteTodo(todo.id)}>ลบ</button>
      </div>
    </li>
  );
}

export default TodoItem;
```

**ผลลัพธ์:** แอปพลิเคชันยังทำงานได้เหมือนเดิมทุกประการ แต่โค้ดภายในสะอาดขึ้นมาก เราไม่ต้องส่ง props ที่ไม่จำเป็นผ่าน `TodoList` อีกต่อไป ทำให้โค้ดง่ายต่อการบำรุงรักษาในระยะยาว

---

### Challenge 4: Component Design Pattern (Container/Presentational)

**เป้าหมาย:** ทำความเข้าใจและประยุกต์ใช้ Pattern การแยก "Component ที่จัดการ Logic" (Container) ออกจาก "Component ที่ใช้แสดงผล" (Presentational) เพื่อให้โค้ดมีระเบียบและนำกลับมาใช้ใหม่ได้ง่ายขึ้น

**แนวคิด:**
* **Presentational Components:** โง่ๆ สวยๆ สนใจแค่ว่า "จะแสดงผลอย่างไร" รับข้อมูลผ่าน props และเรียกใช้ฟังก์ชันจาก props ไม่ควรมี state หรือ logic ที่ซับซ้อน (เช่น `TodoForm`, `TodoList`, `TodoItem` ของเราตอนนี้)
* **Container Components:** ฉลาดๆ ทำงานเบื้องหลัง สนใจแค่ว่า "จะทำงานอย่างไร" จัดการ state, เรียก API, มี logic การทำงานทั้งหมด แล้วส่งข้อมูลและฟังก์ชันที่จำเป็นไปให้ Presentational Components

**ขั้นตอน:**

ใน Challenge ที่ 3 เราได้ใช้ `App.jsx` เป็น Container อยู่แล้ว แต่เพื่อให้เห็นภาพชัดเจน เราจะสร้าง Container Component แยกออกมาโดยเฉพาะ

**1. สร้าง Container Component**

* สร้างโฟลเดอร์ใหม่ `src/containers`
* สร้างไฟล์ใหม่ `src/containers/TodoAppContainer.jsx`
* **ย้าย Logic ทั้งหมด** จาก `App.jsx` มาไว้ที่นี่

```jsx
// src/containers/TodoAppContainer.jsx
import React, { useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import TodoList from '../TodoList';
import TodoForm from '../TodoForm';

function TodoAppContainer() {
  // 🔽 Logic ทั้งหมดอยู่ที่นี่
  const [todos, setTodos] = useState([
    { id: 1, text: 'เรียนรู้ Design Patterns', completed: false },
  ]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const todoContextValue = {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
  };

  // 🔽 Container จะ return ส่วนของ UI ที่เกี่ยวข้อง
  return (
    <TodoContext.Provider value={todoContextValue}>
      <div className="app">
        <h1>My To-Do List (Container Pattern)</h1>
        <TodoForm />
        <TodoList />
      </div>
    </TodoContext.Provider>
  );
}

export default TodoAppContainer;
```

**2. ทำให้ `App.jsx` เป็นแค่ตัวกลาง**

ตอนนี้ `App.jsx` จะสะอาดมาก หน้าที่ของมันคือการ Render Container หลักเท่านั้น

```jsx
// src/App.jsx
import React from 'react';
import TodoAppContainer from './containers/TodoAppContainer';
import './App.css';

function App() {
  // 🔽 ไม่มี state ไม่มี logic มีแค่การเรียกใช้ Container
  return <TodoAppContainer />;
}

export default App;
```

**ผลลัพธ์:** แอปยังทำงานเหมือนเดิม แต่โครงสร้างโปรเจกต์ของเราตอนนี้ชัดเจนมาก
* `App.jsx`: จุดเริ่มต้นของแอป
* `containers/`: โฟลเดอร์เก็บ Component ที่มี Logic การทำงาน
* `components/` (ถ้าเราสร้าง): โฟลเดอร์เก็บ Presentational Components ที่นำไปใช้ซ้ำได้
* `contexts/`: โฟลเดอร์เก็บ Context API

Pattern นี้มีประโยชน์อย่างยิ่งในโปรเจกต์ขนาดใหญ่ที่ Logic มีความซับซ้อนและ UI ต้องถูกนำไปใช้ในหลายๆ ที่
