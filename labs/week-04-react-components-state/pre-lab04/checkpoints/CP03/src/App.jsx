import { useState } from 'react';
import AppHeader from './components/AppHeader.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import FilterBar from './components/FilterBar.jsx';
import TaskList from './components/TaskList.jsx';
import { initialTasks } from './data/initialTasks.js';

function App() {
  const [tasks] = useState(initialTasks);
  const [statusFilter, setStatusFilter] = useState('all');

  const summary = {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === 'todo').length,
    doing: tasks.filter((task) => task.status === 'doing').length,
    done: tasks.filter((task) => task.status === 'done').length,
  };
  const filteredTasks = statusFilter === 'all'
    ? tasks
    : tasks.filter((task) => task.status === statusFilter);

  return (
    <>
      <AppHeader title="Study Task Board" subtitle="CP03 — State, derived data และ filter" />
      <main className="container page-content">
        <SummaryPanel summary={summary} />
        <section className="panel">
          <FilterBar value={statusFilter} onFilterChange={setStatusFilter} />
          <TaskList tasks={filteredTasks} />
        </section>
      </main>
    </>
  );
}

export default App;

