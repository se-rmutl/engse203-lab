import TaskCard from './TaskCard.jsx';

function TaskList({ tasks }) {
  if (tasks.length === 0) return <div className="empty-state">ไม่มีงานในสถานะนี้</div>;
  return <div className="task-list">{tasks.map((task) => <TaskCard key={task.id} task={task} />)}</div>;
}

export default TaskList;

