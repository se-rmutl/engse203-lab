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

  const filteredTasks =
    statusFilter === 'all'
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  function handleAddTask(taskData) {
    const newTask = {
      id: `TASK-${Date.now()}`,
      ...taskData,
      status: 'todo',
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  function handleDeleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  return (
    <>
      <AppHeader
        title="Study Task Board"
        subtitle="ฝึก React mental model ก่อนประยุกต์กับ Campus Service Request"
      />

      <main className="container page-content">
        <SummaryPanel summary={summary} />

        <div className="workspace-grid">
          <TaskForm onAddTask={handleAddTask} />

          <section className="panel" aria-labelledby="task-list-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow dark">TASKS</p>
                <h2 id="task-list-title">รายการฝึกของฉัน</h2>
              </div>
              <FilterBar
                value={statusFilter}
                onFilterChange={setStatusFilter}
              />
            </div>

            <TaskList
              tasks={filteredTasks}
              onDeleteTask={handleDeleteTask}
            />
          </section>
        </div>
      </main>
    </>
  );
}

export default App;

