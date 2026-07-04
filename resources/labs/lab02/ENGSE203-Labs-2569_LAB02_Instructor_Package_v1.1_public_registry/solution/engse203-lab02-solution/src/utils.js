export const STATUS_LABELS = {
  todo: "To do",
  doing: "In progress",
  done: "Done",
};

export function getStatusLabel(status) {
  return STATUS_LABELS[status] ?? "Unknown";
}

export function filterTasks(tasks, { query = "", status = "all" } = {}) {
  const normalizedQuery = query.trim().toLowerCase();

  return tasks
    .filter((task) => status === "all" || task.status === status)
    .filter(({ title, topic, tags = [] }) => {
      const searchableText = [title, topic, ...tags].join(" ").toLowerCase();
      return searchableText.includes(normalizedQuery);
    })
    .sort((first, second) => first.week - second.week);
}

export function getStats(tasks) {
  return tasks.reduce(
    (stats, { status }) => ({
      ...stats,
      total: stats.total + 1,
      [status]: (stats[status] ?? 0) + 1,
    }),
    { total: 0, todo: 0, doing: 0, done: 0 },
  );
}
