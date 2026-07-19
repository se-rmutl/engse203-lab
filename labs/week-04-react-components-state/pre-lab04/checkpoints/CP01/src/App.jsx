import AppHeader from './components/AppHeader.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
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
      <AppHeader
        title="Study Task Board"
        subtitle="CP01 — JSX, Functional Components และ Props"
      />
      <main className="container page-content">
        <SummaryPanel summary={summary} />
      </main>
    </>
  );
}

export default App;

