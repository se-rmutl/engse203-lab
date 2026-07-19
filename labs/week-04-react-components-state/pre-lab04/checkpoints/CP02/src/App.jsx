import AppHeader from './components/AppHeader.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import TaskList from './components/TaskList.jsx';
import { initialTasks } from './data/initialTasks.js';

function App() {
  const summary = {
    total: initialTasks.length,
    todo: initialTasks.filter((task) => task.status === 'todo').length,
    doing: initialTasks.filter((task) => task.status === 'doing').length,
    done: initialTasks.filter((task) => task.status === 'done').length,
  };

  return (
    <>
      <AppHeader title="Study Task Board" subtitle="CP02 — Props, map และ stable key" />
      <main className="container page-content">
        <SummaryPanel summary={summary} />
        <section className="panel">
          <h2>รายการฝึกของฉัน</h2>
          <TaskList tasks={initialTasks} />
        </section>
      </main>
    </>
  );
}

export default App;

