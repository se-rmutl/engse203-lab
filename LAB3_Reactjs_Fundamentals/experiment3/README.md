# Experiment3: สร้าง To-Do List App ด้วย React.js

**วัตถุประสงค์:** ใน Lab นี้ เราจะนำความรู้ทั้งหมดที่ได้เรียนมา ไม่ว่าจะเป็น Components, JSX, State, Props, และ Hooks มาสร้างเว็บแอปพลิเคชัน To-Do List ที่ทำงานได้อย่างสมบูรณ์

**เวลาที่ใช้:** 3 ชั่วโมง

---

### **ภาพรวมของแอปพลิเคชันที่เราจะสร้าง**

เราจะสร้างแอปที่สามารถ:
* แสดงรายการ To-Do
* เพิ่มรายการใหม่
* ลบรายการ
* ขีดฆ่ารายการที่ทำเสร็จแล้ว (Toggle Status)
* แก้ไขข้อความของรายการที่มีอยู่



---

### **ขั้นตอนที่ 1: การตั้งค่าโปรเจกต์และโครงสร้างพื้นฐาน**

เริ่มต้นจากการสร้างโครงสร้างพื้นฐานของแอป ที่สามารถแสดงผล, เพิ่ม, และลบรายการได้

**1.1 สร้างไฟล์ที่จำเป็น**

ในโปรเจกต์ React ของคุณ (ที่สร้างจาก Vite) ให้สร้างไฟล์ต่อไปนี้ในโฟลเดอร์ `src/`:
* `App.jsx` (ไฟล์หลัก)
* `TodoForm.jsx`
* `TodoList.jsx`
* `App.css` (สำหรับตกแต่งหน้าตา)

**1.2 เขียนโค้ดสำหรับ State และ Logic หลัก (`App.jsx`)**

ไฟล์นี้จะเป็นศูนย์กลางในการจัดการ `state` ของ to-do ทั้งหมด

```jsx
// src/App.jsx
import React, { useState } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import './App.css';

function App() {
  // State หลักสำหรับเก็บรายการ todos ทั้งหมด
  const [todos, setTodos] = useState([
    { id: 1, text: 'เรียนรู้ React Hooks', completed: false },
    { id: 2, text: 'ทำ Mini Project', completed: false },
  ]);

  // ฟังก์ชันสำหรับเพิ่ม todo ใหม่
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // ใช้ timestamp เป็น id ชั่วคราว
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // ฟังก์ชันสำหรับลบ todo
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

**1.3 สร้างฟอร์มสำหรับเพิ่มรายการ (`TodoForm.jsx`)**

Component นี้จะรับผิดชอบส่วนของ `input` และปุ่มสำหรับเพิ่ม to-do

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

**1.4 สร้าง Component สำหรับแสดงผลรายการ (`TodoList.jsx`)**

Component นี้จะรับ `array` ของ to-do มาแสดงผล

```jsx
// src/TodoList.jsx
import React from 'react';

function TodoList({ todos, deleteTodo }) {
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

**1.5 เพิ่ม CSS เพื่อความสวยงาม (`App.css`)**

```css
/* src/App.css */
body {
  font-family: 'Sarabun', sans-serif;
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
  background-color: #0ea5e9;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  transition: background-color 0.2s;
}

.todo-form button:hover {
  background-color: #0284c7;
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
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.todo-item button:hover {
  background: #dc2626;
}
```

**Checkpoint:** ณ จุดนี้ แอปของคุณควรจะแสดงผล, เพิ่ม และลบรายการได้แล้ว ลองรันโปรเจกต์ของคุณ (`npm run dev`) เพื่อทดสอบ

---

### **ขั้นตอนที่ 2: เพิ่มฟังก์ชัน Toggle Status (ขีดฆ่ารายการ)**

เราจะเพิ่มความสามารถให้ผู้ใช้คลิกที่รายการเพื่อสลับสถานะ "เสร็จสิ้น" (completed)

**2.1 เพิ่มฟังก์ชัน `toggleTodo` ใน `App.jsx`**

ฟังก์ชันนี้จะรับ `id` ของ to-do เข้ามา แล้วทำการ `map` เพื่อสร้าง array ใหม่ โดยสลับค่า `completed` ของ item ที่มี `id` ตรงกัน

```jsx
// src/App.jsx

// ... (imports และ state เดิม)
function App() {
  // ... (state และฟังก์ชัน addTodo, deleteTodo เดิม)

  // เพิ่มฟังก์ชันนี้
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
      {/* ส่ง toggleTodo เป็น prop */}
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </div>
  );
}
// ...
```

**2.2 อัปเดต `TodoList.jsx`**

รับ `toggleTodo` prop เข้ามา และเพิ่ม `onClick` event ให้กับ `<span>` ที่แสดงข้อความ พร้อมทั้งเพิ่ม `className` แบบมีเงื่อนไข

```jsx
// src/TodoList.jsx
import React from 'react';

// รับ toggleTodo เพิ่ม
function TodoList({ todos, deleteTodo, toggleTodo }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        // เพิ่ม className แบบมีเงื่อนไข
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          {/* เพิ่ม onClick และเปลี่ยน span */}
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

**2.3 เพิ่ม Style สำหรับการขีดฆ่าใน `App.css`**

```css
/* src/App.css */

/* ... (โค้ดเดิม) ... */

.todo-item span {
  cursor: pointer; /* เพิ่ม cursor เพื่อให้รู้ว่าคลิกได้ */
}

/* เพิ่ม rule นี้ */
.todo-item.completed span {
  text-decoration: line-through;
  color: #999;
}
```

**Checkpoint:** ตอนนี้เมื่อคุณคลิกที่ข้อความของ to-do item มันควรจะถูกขีดฆ่า และคลิกอีกครั้งเพื่อยกเลิกได้

---

### **ขั้นตอนที่ 3: เพิ่มฟังก์ชันแก้ไขรายการ (Edit Item)**

นี่เป็นส่วนที่ซับซ้อนขึ้น เราจะทำให้ผู้ใช้สามารถแก้ไขข้อความของ to-do ที่มีอยู่ได้

**3.1 (Refactor) สร้าง `TodoItem.jsx`**

เพื่อจัดการความซับซ้อนที่เพิ่มขึ้น เราควรแยกแต่ละ item ใน list ออกมาเป็น Component ของตัวเองก่อน

* สร้างไฟล์ใหม่ `src/TodoItem.jsx`

```jsx
// src/TodoItem.jsx
import React from 'react';

// ในขั้นตอนนี้ เราจะยังไม่ใส่ Logic การแก้ไข
// แต่จะเตรียมโครงสร้างไว้ก่อน
function TodoItem({ todo, deleteTodo, toggleTodo }) {
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

**3.2 ปรับปรุง `TodoList.jsx` ให้ใช้ `TodoItem`**

```jsx
// src/TodoList.jsx
import React from 'react';
import TodoItem from './TodoItem'; // Import

function TodoList({ todos, deleteTodo, toggleTodo }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        // เรียกใช้ TodoItem และส่ง props ต่อไป
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

**3.3 เพิ่ม Logic การแก้ไขทั้งหมด**

* **`App.jsx`**: สร้างฟังก์ชัน `editTodo` และส่งเป็น prop ลงไป

```jsx
// src/App.jsx

// ...
function App() {
  // ... (state และฟังก์ชันอื่นๆ)

  // เพิ่มฟังก์ชันนี้
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
      {/* ส่ง editTodo เป็น prop */}
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
      />
    </div>
  );
}
// ...
```

* **`TodoList.jsx`**: รับ `editTodo` และส่งต่อไปยัง `TodoItem`

```jsx
// src/TodoList.jsx
// ...
function TodoList({ todos, deleteTodo, toggleTodo, editTodo }) { // รับ editTodo
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          editTodo={editTodo} // ส่งต่อ editTodo
        />
      ))}
    </ul>
  );
}
// ...
```

* **`TodoItem.jsx`**: เพิ่ม State และ Logic สำหรับโหมดแก้ไข

```jsx
// src/TodoItem.jsx
import React, { useState } from 'react';

function TodoItem({ todo, deleteTodo, toggleTodo, editTodo }) {
  // State เพื่อติดตามว่ากำลังอยู่ในโหมดแก้ไขหรือไม่
  const [isEditing, setIsEditing] = useState(false);
  // State เพื่อเก็บข้อความใหม่ที่กำลังพิมพ์
  const [newText, setNewText] = useState(todo.text);

  const handleSave = () => {
    if (newText.trim()) {
      editTodo(todo.id, newText);
      setIsEditing(false); // ออกจากโหมดแก้ไข
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        // UI สำหรับโหมดแก้ไข
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

**3.4 เพิ่ม Style สำหรับปุ่มและ Input ใน `App.css`**

```css
/* src/App.css */
/* ... */
.todo-item .edit-btn, .todo-item .save-btn {
  background-color: #f59e0b;
  color: white;
  margin-right: 8px;
}

.todo-item .save-btn {
  background-color: #22c55e;
}

.todo-item .edit-btn:hover {
  background-color: #d97706;
}

.todo-item .save-btn:hover {
  background-color: #16a34a;
}

.todo-item input[type="text"] {
  flex-grow: 1;
  border: 1px solid #ddd;
  padding: 0.4rem;
  border-radius: 4px;
  margin-right: 1rem;
}

.todo-item > div {
  display: flex;
  align-items: center;
}
```

**Checkpoint:** ตอนนี้คุณควรจะมีปุ่ม "แก้ไข" เมื่อกดแล้วจะเข้าสู่โหมดแก้ไข และสามารถบันทึกการเปลี่ยนแปลงได้

---

### **ขั้นตอนที่ 4: (Challenge) Refactor with `useContext`**

ในตอนนี้ เรามีปัญหา **"Prop Drilling"** คือการส่ง `props` (เช่น `deleteTodo`, `editTodo`) ผ่าน `TodoList` ซึ่งไม่ได้ใช้ `props` เหล่านั้นเลย แต่ส่งต่อไปให้ `TodoItem` เท่านั้น เราจะใช้ **Context API** เพื่อแก้ปัญหานี้

**4.1 สร้าง Context File**

* สร้างโฟลเดอร์ใหม่ `src/contexts`
* สร้างไฟล์ใหม่ `src/contexts/TodoContext.js`

```javascript
// src/contexts/TodoContext.js
import { createContext } from 'react';

export const TodoContext = createContext();
```

**4.2 Provide Context ใน `App.jsx`**

เราจะใช้ `App.jsx` เป็น Provider เพื่อส่ง State และฟังก์ชันทั้งหมดผ่าน Context

```jsx
// src/App.jsx
import React, { useState } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import { TodoContext } from './contexts/TodoContext'; // Import
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'เรียนรู้ useContext', completed: false },
  ]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
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

  // สร้าง object ที่จะส่งผ่าน context
  const todoContextValue = {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
  };

  return (
    // ครอบด้วย Provider และส่ง value
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

**4.3 Consume Context ใน Component ลูก**

ตอนนี้เราจะลบ `props` ที่ไม่จำเป็นออก แล้วดึงค่าจาก Context มาใช้โดยตรง

* **`TodoForm.jsx`**

```jsx
// src/TodoForm.jsx
import React, { useState, useContext } from 'react';
import { TodoContext } from './contexts/TodoContext';

function TodoForm() {
  const { addTodo } = useContext(TodoContext); // ดึงฟังก์ชันมาจาก context
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

function TodoList() {
  const { todos } = useContext(TodoContext); // ดึง state มาจาก context

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        // ไม่ต้องส่ง props ที่เป็นฟังก์ชันอีกต่อไป
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

function TodoItem({ todo }) { // รับแค่ todo ก็พอ
  // ดึงฟังก์ชันที่ต้องการใช้มาจาก context
  const { deleteTodo, toggleTodo, editTodo } = useContext(TodoContext);
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

**Checkpoint:** แอปพลิเคชันยังทำงานได้เหมือนเดิมทุกประการ แต่ตอนนี้โครงสร้างโค้ดของเราสะอาดขึ้นมาก และง่ายต่อการบำรุงรักษาในอนาคต

---

### **ขั้นตอนที่ 5: การ Build โปรเจกต์สำหรับ Production**

หลังจากพัฒนาแอปพลิเคชันเสร็จเรียบร้อยในโหมด Development (`npm run dev`) ขั้นตอนสุดท้ายคือการสร้างไฟล์เวอร์ชันที่ปรับให้มีประสิทธิภาพสูงสุดสำหรับนำไปใช้งานจริง (Production)

**5.1 รันคำสั่ง Build**

เปิด Terminal ในโปรเจกต์ของคุณแล้วรันคำสั่ง:

```bash
npm run build
```

**5.2 เกิดอะไรขึ้น?**

* Vite จะทำการรวม (Bundle) และบีบอัด (Minify) ไฟล์ JavaScript และ CSS ทั้งหมดของคุณให้มีขนาดเล็กที่สุด
* ผลลัพธ์ทั้งหมดจะถูกสร้างไว้ในโฟลเดอร์ใหม่ชื่อ `dist` ที่ root ของโปรเจกต์
* ไฟล์ในโฟลเดอร์ `dist` นี้คือ Static Files (HTML, CSS, JS) ที่พร้อมสำหรับนำไป deploy บนเว็บเซิร์ฟเวอร์ได้เลย

**5.3 ทดสอบเวอร์ชัน Production**

คุณสามารถทดสอบไฟล์ที่ build แล้วบนเครื่องของคุณได้โดยใช้ `serve` ซึ่งเป็นแพ็กเกจง่ายๆ สำหรับการรันเว็บเซิร์ฟเวอร์

1.  **ติดตั้ง `serve` (ถ้ายังไม่มี):**
    ```bash
    npm install -g serve
    ```
2.  **รันเซิร์ฟเวอร์จากโฟลเดอร์ `dist`:**
    ```bash
    serve -s dist
    ```
3.  Terminal จะแสดง URL (เช่น `http://localhost:3000`) ให้คุณเปิดในเบราว์เซอร์เพื่อดูแอปพลิเคชันเวอร์ชัน Production ของคุณ

---

### **สรุป**

ขอแสดงความยินดีด้วย! คุณได้สร้าง To-Do List App ที่มีความสามารถครบถ้วน และได้เรียนรู้การทำ Refactor เพื่อปรับปรุงคุณภาพของโค้ดด้วยเทคนิคที่สำคัญใน React รวมถึงขั้นตอนการเตรียมโปรเจกต์สำหรับใช้งานจริง

**สิ่งที่คุณได้เรียนรู้จาก Lab นี้:**
* การจัดการ State ใน Component หลัก
* การส่งต่อข้อมูลและฟังก์ชันผ่าน Props
* การจัดการ Event ของผู้ใช้
* การแยก Component เพื่อให้โค้ดเป็นสัดส่วน (Refactoring)
* การแก้ปัญหา Prop Drilling ด้วย Context API
* การ Build โปรเจกต์สำหรับ Production
