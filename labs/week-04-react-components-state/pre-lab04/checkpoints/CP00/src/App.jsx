import { initialTasks } from './data/initialTasks.js';

function App() {
  return (
    <>
      <header className="hero">
        <div className="container">
          <p className="eyebrow">ENGSE203 • PRE-LAB 04 • CP00</p>
          <h1>Study Task Board</h1>
          <p>แก้ข้อความนี้แล้วบันทึก เพื่อเห็น First React Success ผ่าน HMR</p>
        </div>
      </header>

      <main className="container page-content">
        <section className="panel">
          <h2>Starter พร้อมแล้ว</h2>
          <p>มีข้อมูลเริ่มต้น {initialTasks.length} รายการ</p>
          <p>เปิด README หลักแล้วทำ CP01–CP07 ตามลำดับ</p>
        </section>
      </main>
    </>
  );
}

export default App;

