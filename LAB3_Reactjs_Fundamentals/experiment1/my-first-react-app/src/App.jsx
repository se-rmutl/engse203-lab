import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>🎉 สวัสดี React.js!</h1>
          <p>นี่คือแอปพลิเคชัน React แรกของฉัน</p>
          <p>ปัจจุบันเวลา: {new Date().toLocaleString('th-TH')}</p>
        </header>
      </div>
    </>
  )
}

export default App
