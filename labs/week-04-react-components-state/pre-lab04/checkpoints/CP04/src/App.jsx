import { useState } from 'react';
import AppHeader from './components/AppHeader.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import TaskForm from './components/TaskForm.jsx';
import FilterBar from './components/FilterBar.jsx';
import TaskList from './components/TaskList.jsx';
import { initialTasks } from './data/initialTasks.js';

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [statusFilter, setStatusFilter] = useState('all');
  const summary = {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === 'todo').length,
    doing: tasks.filter((task) => task.status === 'doing').length,
    done: tasks.filter((task) => task.status === 'done').length,
  };
  const filteredTasks = statusFilter === 'all' ? tasks : tasks.filter((task) => task.status === statusFilter);

  function handleAddTask(taskData) {
    const newTask = { id: `TASK-${Date.now()}`, ...taskData, status: 'todo' };
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  return (
    <>
      <AppHeader title="Study Task Board" subtitle="CP04 — Controlled Form, validation และ add" />
      <main className="container page-content">
        <SummaryPanel summary={summary} />
        <div className="workspace-grid">
          <TaskForm onAddTask={handleAddTask} />
          <section className="panel">
            <FilterBar value={statusFilter} onFilterChange={setStatusFilter} />
            <TaskList tasks={filteredTasks} />
          </section>
        </div>
      </main>
    </>
  );
}

export default App;

