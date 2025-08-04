# React.js Fundamentals
## สัปดาห์ที่ 5: Frontend Framework - React.js

---

## Slide 1: Course Overview
### จุดประสงค์การเรียนรู้
- เข้าใจพื้นฐาน React.js และ JSX syntax
- สามารถสร้าง React components และจัดการ Props
- เรียนรู้การใช้ React Hooks (useState, useEffect, useContext)
- เข้าใจการจัดการ Event handling ใน React

### ผลลัพธ์การเรียนรู้
หลังจากเรียนจบ นักศึกษาจะสามารถ:
1. สร้าง React application พื้นฐานได้
2. ออกแบบ Component architecture
3. จัดการ State และ Props อย่างมีประสิทธิภาพ
4. ใช้ React Hooks ในการพัฒนา

**เวลาเรียน:** 1-2 ชั่วโมง + Lab 3 ชั่วโมง

---

## Slide 2: What is React.js?
### React คืออะไร?
React เป็น JavaScript library สำหรับสร้าง User Interfaces โดยเฉพาะ Web Applications

### คุณสมบัติเด่นของ React (2025)
- **Component-Based Architecture** - แบ่งแยก UI เป็นชิ้นส่วนเล็กๆ
- **Virtual DOM** - ประสิทธิภาพสูงในการ render
- **Declarative** - บอกว่าต้องการอะไร ไม่ใช่ทำยังไง
- **React Server Components** - สำหรับ performance ที่ดีขึ้น
- **Concurrent Features** - การจัดการ rendering ที่ดีขึ้น

### ทำไมต้องเรียน React?
- ได้รับความนิยมสูงสุดในวงการ Frontend
- Community ใหญ่และ ecosystem แข็งแกร่ง
- Job opportunities มากมาย

---

## Slide 3: Environment Setup
### การติดตั้ง Node.js และ npm
```bash
# ตรวจสอบ version
node --version
npm --version
```

### สร้าง React App ด้วย Vite (2025 Recommended)
```bash
# สร้างโปรเจค
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
```

### โครงสร้างโปรเจค
```
my-react-app/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
└── vite.config.js
```

---

## Slide 4: JSX Syntax Basics
### JSX คืออะไร?
JSX (JavaScript XML) เป็น syntax extension ของ JavaScript ที่ช่วยให้เขียน HTML-like code ใน JavaScript

### JSX Rules
```jsx
// ✅ ถูกต้อง - ต้องมี parent element
function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <p>Welcome to React</p>
    </div>
  );
}

// ✅ หรือใช้ Fragment
function App() {
  return (
    <>
      <h1>Hello World</h1>
      <p>Welcome to React</p>
    </>
  );
}
```

### JSX vs HTML Differences
```jsx
// HTML attributes กลายเป็น camelCase
<div className="container">  {/* ไม่ใช่ class */}
<label htmlFor="name">     {/* ไม่ใช่ for */}
<input onChange={handleChange} /> {/* ไม่ใช่ onchange */}
```

---

## Slide 5: JavaScript in JSX
### การใช้ JavaScript Expression
```jsx
function Greeting() {
  const name = "React";
  const age = 10;
  
  return (
    <div>
      <h1>Hello {name}!</h1>
      <p>React is {age} years old</p>
      <p>Next year: {age + 1}</p>
      <p>{age >= 18 ? "Adult" : "Young"}</p>
    </div>
  );
}
```

### การใช้ Arrays และ Objects
```jsx
function UserInfo() {
  const user = {
    name: "John Doe",
    email: "john@example.com"
  };
  
  const hobbies = ["Reading", "Gaming", "Coding"];
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Slide 6: Your First React Component
### Function Component
```jsx
// components/Welcome.jsx
function Welcome() {
  return (
    <div>
      <h1>Welcome to React!</h1>
      <p>This is my first component</p>
    </div>
  );
}

export default Welcome;
```

### การใช้ Component
```jsx
// App.jsx
import Welcome from './components/Welcome';

function App() {
  return (
    <div className="App">
      <Welcome />
      <Welcome />  {/* สามารถใช้ซ้ำได้ */}
    </div>
  );
}
```

### **ผลลัพธ์:**
หน้าเว็บจะแสดง "Welcome to React!" สองครั้ง

---

## Slide 7: Understanding Props
### Props คืออะไร?
Props (Properties) เป็นข้อมูลที่ส่งจาก parent component ไป child component

### การส่ง Props
```jsx
// Parent Component
function App() {
  return (
    <div>
      <UserCard name="John Doe" age={25} city="Bangkok" />
      <UserCard name="Jane Smith" age={30} city="Chiang Mai" />
    </div>
  );
}
```

### การรับ Props
```jsx
// Child Component
function UserCard(props) {
  return (
    <div className="user-card">
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>City: {props.city}</p>
    </div>
  );
}
```

### **ผลลัพธ์:**
แสดงการ์ดผู้ใช้ 2 ใบ พร้อมข้อมูลที่แตกต่างกัน

---

## Slide 8: Props Destructuring
### ES6 Destructuring
```jsx
// แทนที่จะใช้ props.name, props.age
function UserCard({ name, age, city }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>City: {city}</p>
    </div>
  );
}
```

### Default Props
```jsx
function UserCard({ name, age = 0, city = "Unknown" }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>City: {city}</p>
    </div>
  );
}

// Usage
<UserCard name="John" />  // age = 0, city = "Unknown"
```

### Props Validation (Optional)
```jsx
import PropTypes from 'prop-types';

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  city: PropTypes.string
};
```

---

## Slide 9: Introduction to React Hooks
### Hooks คืออะไร?
Hooks เป็นฟังก์ชันพิเศษที่ช่วยให้ Function Components สามารถใช้ state และ lifecycle features ได้

### Rules of Hooks
1. เรียกใช้ Hooks ที่ top level เท่านั้น (ไม่ใช่ใน loop, condition, nested function)
2. เรียกใช้ Hooks ใน React Functions เท่านั้น

### Built-in Hooks ที่สำคัญ
- `useState` - จัดการ state
- `useEffect` - จัดการ side effects
- `useContext` - ใช้ Context API
- `useReducer` - จัดการ complex state
- `useMemo` - optimization
- `useCallback` - optimization

---

## Slide 10: useState Hook - Basics
### การใช้ useState
```jsx
import { useState } from 'react';

function Counter() {
  // [currentValue, setterFunction] = useState(initialValue)
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrease
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}
```

### **ผลลัพธ์:**
แสดงตัวนับที่สามารถเพิ่ม ลด และรีเซ็ตได้

---

## Slide 11: useState with Different Data Types
### String State
```jsx
function NameInput() {
  const [name, setName] = useState('');
  
  return (
    <div>
      <input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello, {name}!</p>
    </div>
  );
}
```

### Boolean State
```jsx
function ToggleExample() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'} Message
      </button>
      {isVisible && <p>This message can be toggled!</p>}
    </div>
  );
}
```

---

## Slide 12: useState with Objects and Arrays
### Object State
```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });
  
  const updateUser = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,  // spread existing properties
      [field]: value // update specific field
    }));
  };
  
  return (
    <div>
      <input 
        placeholder="Name"
        onChange={(e) => updateUser('name', e.target.value)}
      />
      <input 
        placeholder="Email"
        onChange={(e) => updateUser('email', e.target.value)}
      />
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

---

## Slide 13: useState with Arrays
### Array State Management
```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };
  
  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };
  
  return (
    <div>
      <input 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Slide 14: Event Handling in React
### Basic Event Handling
```jsx
function EventExample() {
  const [message, setMessage] = useState('');
  
  const handleClick = () => {
    setMessage('Button was clicked!');
  };
  
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault(); // ป้องกัน page reload
    alert(`Submitted: ${message}`);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={handleClick}>
        Click Me
      </button>
      <input onChange={handleInputChange} />
      <button type="submit">Submit</button>
      <p>{message}</p>
    </form>
  );
}
```

---

## Slide 15: Event Object and Synthetic Events
### Understanding Event Object
```jsx
function EventDetails() {
  const handleEvent = (event) => {
    console.log('Event type:', event.type);
    console.log('Target element:', event.target);
    console.log('Key pressed:', event.key);
  };
  
  return (
    <div>
      <button onClick={handleEvent}>Click</button>
      <input onKeyDown={handleEvent} placeholder="Type something" />
      <select onChange={handleEvent}>
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </select>
    </div>
  );
}
```

### Passing Arguments to Event Handlers
```jsx
function ButtonList() {
  const handleButtonClick = (buttonName, event) => {
    console.log(`${buttonName} was clicked`);
  };
  
  return (
    <div>
      <button onClick={(e) => handleButtonClick('Home', e)}>Home</button>
      <button onClick={(e) => handleButtonClick('About', e)}>About</button>
      <button onClick={(e) => handleButtonClick('Contact', e)}>Contact</button>
    </div>
  );
}
```

---

## Slide 16: useEffect Hook - Introduction
### useEffect คืออะไร?
useEffect ใช้สำหรับจัดการ side effects เช่น API calls, subscriptions, การอัพเดท DOM

### Basic useEffect
```jsx
import { useState, useEffect } from 'react';

function LifecycleExample() {
  const [count, setCount] = useState(0);
  
  // รัน after every render
  useEffect(() => {
    document.title = `Count: ${count}`;
    console.log('Effect ran');
  });
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### **ผลลัพธ์:**
Title ของ browser tab จะเปลี่ยนตาม count

---

## Slide 17: useEffect Dependencies
### useEffect with Empty Dependencies
```jsx
function MountExample() {
  const [data, setData] = useState(null);
  
  // รันแค่ครั้งเดียวตอน component mount
  useEffect(() => {
    console.log('Component mounted');
    // Simulate API call
    setTimeout(() => {
      setData('Data loaded!');
    }, 2000);
  }, []); // Empty dependency array
  
  return (
    <div>
      {data ? <p>{data}</p> : <p>Loading...</p>}
    </div>
  );
}
```

### useEffect with Specific Dependencies
```jsx
function WatchExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // รันเมื่อ count เปลี่ยนเท่านั้น
  useEffect(() => {
    console.log(`Count changed to: ${count}`);
  }, [count]);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <input onChange={(e) => setName(e.target.value)} />
    </div>
  );
}
```

---

## Slide 18: useEffect Cleanup
### Cleanup Function
```jsx
function TimerExample() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    // Cleanup function
    return () => {
      clearInterval(interval);
      console.log('Timer cleaned up');
    };
  }, []);
  
  return <div>Timer: {seconds} seconds</div>;
}
```

### Window Event Listeners
```jsx
function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return <div>Size: {windowSize.width} x {windowSize.height}</div>;
}
```

---

## Slide 19: Fetching Data with useEffect
### API Call Example
```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name} - {user.email}</li>
      ))}
    </ul>
  );
}
```

---

## Slide 20: useContext Hook - Introduction
### Context คืออะไร?
Context API ช่วยแชร์ข้อมูลระหว่าง components โดยไม่ต้องส่ง props ผ่านทุกระดับ

### Creating Context
```jsx
// contexts/ThemeContext.js
import { createContext, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

---

## Slide 21: Using Context
### App Structure with Context
```jsx
// App.jsx
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Content from './components/Content';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <Content />
      </div>
    </ThemeProvider>
  );
}
```

### Consuming Context
```jsx
// components/Header.jsx
import { useTheme } from '../contexts/ThemeContext';

function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={`header ${theme}`}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
}
```

---

## Slide 22: Component Composition
### Composition vs Inheritance
React ใช้ composition pattern แทน inheritance

### Children Prop
```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// Usage
function App() {
  return (
    <Card title="User Info">
      <p>Name: John Doe</p>
      <p>Email: john@example.com</p>
      <button>Edit Profile</button>
    </Card>
  );
}
```

### Render Props Pattern
```jsx
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  return render({ data, loading });
}

// Usage
<DataFetcher 
  url="/api/users" 
  render={({ data, loading }) => 
    loading ? <div>Loading...</div> : <UserList users={data} />
  } 
/>
```

---

## Slide 23: Conditional Rendering
### If/Else with Ternary
```jsx
function UserStatus({ isLoggedIn, user }) {
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Welcome back, {user.name}!</h2>
          <button>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Please log in</h2>
          <button>Login</button>
        </div>
      )}
    </div>
  );
}
```

### Logical AND (&&)
```jsx
function Notifications({ notifications }) {
  return (
    <div>
      <h2>Dashboard</h2>
      {notifications.length > 0 && (
        <div className="notifications">
          <h3>You have {notifications.length} notifications</h3>
          <ul>
            {notifications.map(note => (
              <li key={note.id}>{note.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

---

## Slide 24: Lists and Keys
### Rendering Lists
```jsx
function ProductList({ products }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
```

### Why Keys Matter
```jsx
// ❌ Bad - using index as key
{items.map((item, index) => (
  <Item key={index} data={item} />
))}

// ✅ Good - using unique id
{items.map(item => (
  <Item key={item.id} data={item} />
))}

// ✅ Good - using unique combination
{items.map(item => (
  <Item key={`${item.category}-${item.id}`} data={item} />
))}
```

---

## Slide 25: Forms in React
### Controlled Components
```jsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: 'general'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Process form data
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        required
      />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="general">General</option>
        <option value="support">Support</option>
        <option value="sales">Sales</option>
      </select>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your Message"
      />
      <button type="submit">Send Message</button>
    </form>
  );
}
```

---

## Slide 26: Form Validation
### Basic Validation
```jsx
function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form is valid!', formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      {errors.username && <span className="error">{errors.username}</span>}
      
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <span className="error">{errors.email}</span>}
      
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

---

## Slide 27: Component Design Patterns
### Container/Presentational Pattern
```jsx
// Presentational Component
function UserListView({ users, onUserSelect, loading }) {
  if (loading) return <div>Loading users...</div>;
  
  return (
    <div className="user-list">
      {users.map(user => (
        <div 
          key={user.id} 
          className="user-item"
          onClick={() => onUserSelect(user)}
        >
          <img src={user.avatar} alt={user.name} />
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

// Container Component
function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  
  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);
  
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Navigate or show user details
  };
  
  return (
    <UserListView 
      users={users}
      loading={loading}
      onUserSelect={handleUserSelect}
    />
  );
}
```

---

## Slide 28: Higher-Order Components (HOC)
### Creating HOC
```jsx
// HOC for adding loading state
function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    if (props.loading) {
      return <div className="loading">Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}

// Usage
const UserListWithLoading = withLoading(UserList);

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  return (
    <UserListWithLoading 
      users={users}
      loading={loading}
    />
  );
}
```

### Authentication HOC
```jsx
function withAuth(WrappedComponent) {
  return function WithAuthComponent(props) {
    const { isAuthenticated } = useContext(AuthContext);
    
    if (!isAuthenticated) {
      return <div>Please log in to access this page</div>;
    }
    
    return <WrappedComponent {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

---

## Slide 29: Custom Hooks
### Creating Custom Hooks
```jsx
// hooks/useCounter.js
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Usage in component
function CounterApp() {
  const { count, increment, decrement, reset } = useCounter(10);
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Custom Hook for API
```jsx
// hooks/useFetch.js
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

---

## Slide 30: Performance Optimization Basics
### React.memo
```jsx
// Memoized component - re-renders only when props change
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data, onUpdate }) {
  console.log('ExpensiveComponent rendered');
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
          <button onClick={() => onUpdate(item.id)}>Update</button>
        </div>
      ))}
    </div>
  );
});

// Parent component
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ]);
  
  const handleUpdate = useCallback((id) => {
    console.log('Update user:', id);
  }, []);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveComponent data={users} onUpdate={handleUpdate} />
    </div>
  );
}
```

### useMemo and useCallback
```jsx
function OptimizedComponent({ items, filter }) {
  // Expensive calculation - only recalculate when items or filter change
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => item.category === filter);
  }, [items, filter]);
  
  // Stable function reference
  const handleItemClick = useCallback((itemId) => {
    console.log('Item clicked:', itemId);
  }, []);
  
  return (
    <div>
      {filteredItems.map(item => (
        <ItemCard 
          key={item.id} 
          item={item} 
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
}
```

---

## Slide 31: Error Handling
### Error Boundaries (Class Component)
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong!</h2>
          <details>
            {this.state.error && this.state.error.toString()}
          </details>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <MainContent />
      <Footer />
    </ErrorBoundary>
  );
}
```

### Error Handling in Components
```jsx
function DataComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!data) return <div>No data available</div>;
  
  return <div>{/* Render data */}</div>;
}
```

---

## Slide 32: Project Structure Best Practices
### Recommended Folder Structure
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components (Button, Modal, etc.)
│   ├── forms/          # Form-related components
│   └── layout/         # Layout components (Header, Footer, etc.)
├── pages/              # Page components
├── hooks/              # Custom hooks
├── contexts/           # React contexts
├── services/           # API calls and external services
├── utils/              # Helper functions
├── styles/             # CSS/SCSS files
├── assets/             # Images, icons, etc.
└── constants/          # App constants
```

### Component Organization
```jsx
// components/UserCard/index.js
export { default } from './UserCard';

// components/UserCard/UserCard.jsx
import React from 'react';
import './UserCard.styles.css';

function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="user-card">
      {/* Component JSX */}
    </div>
  );
}

export default UserCard;

// components/UserCard/UserCard.styles.css
.user-card {
  /* Component styles */
}
```

---

## Slide 33: Practical Example - Todo App
### Complete Todo Application
```jsx
import React, { useState, useEffect } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Load todos from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);
  
  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  
  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      
      <div className="todo-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      
      <div className="todo-filters">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All ({todos.length})
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active ({todos.filter(t => !t.completed).length})
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed ({todos.filter(t => t.completed).length})
        </button>
      </div>
      
      <div className="todo-list">
        {filteredTodos.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className="todo-text">{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
      
      {filteredTodos.length === 0 && (
        <p className="no-todos">No todos found</p>
      )}
    </div>
  );
}

export default TodoApp;
```

---

## Slide 34: Lab Activities Overview
### Lab Session 1: Basic Components (1 hour)
**เป้าหมาย:** สร้าง React components พื้นฐาน
- สร้าง Welcome component
- สร้าง UserCard component ที่รับ props
- สร้าง ProductList component
- ฝึกใช้ JSX และ props

### Lab Session 2: State Management (1 hour)
**เป้าหมาย:** ฝึกใช้ useState และ event handling
- สร้าง Counter component
- สร้าง Form component พร้อม validation
- สร้าง Toggle component
- ฝึกจัดการ different data types

### Lab Session 3: Effects and Context (1 hour)
**เป้าหมาย:** ฝึกใช้ useEffect และ Context API
- สร้าง Timer component
- Fetch data จาก API
- สร้าง Theme Context
- สร้าง Custom Hook

### **ผลลัพธ์ที่คาดหวัง:**
นักศึกษาสามารถสร้าง functional React application ได้

---

## Slide 35: Summary and Next Steps
### สิ่งที่เรียนรู้วันนี้
✅ **React Fundamentals**
- JSX syntax และ components
- Props และ component composition
- State management ด้วย useState

✅ **React Hooks**
- useState สำหรับ state management
- useEffect สำหรับ side effects
- useContext สำหรับ global state
- Custom hooks

✅ **Best Practices**
- Component design patterns
- Error handling
- Performance optimization basics
- Project structure

### Next Steps สำหรับการเรียนรู้ต่อ
1. **Advanced Hooks** - useReducer, useMemo, useCallback
2. **Routing** - React Router DOM
3. **State Management** - Redux, Zustand
4. **Testing** - Jest, React Testing Library
5. **Build Tools** - Vite, Webpack
6. **Deployment** - Netlify, Vercel

### แหล่งข้อมูลเพิ่มเติม
- [React Official Documentation](https://react.dev)
- [React Beta Docs](https://beta.reactjs.org)
- [Create React App](https://create-react-app.dev)
- [Vite](https://vitejs.dev)

### **การบ้าน:**
สร้าง Personal Portfolio Website ด้วย React ที่มี:
- Header component
- About section
- Projects list
- Contact form
- Theme switcher