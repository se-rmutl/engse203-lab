import TaskCard from './TaskCard.jsx';

function TaskList({ tasks, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state" role="status">
        ไม่มีงานในสถานะนี้ ลองเลือกตัวกรองอื่นหรือเพิ่มงานใหม่
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;

