export async function fetchLearningTasks({ simulateError = false } = {}) {
  if (simulateError) {
    throw new Error("Simulated error: data source is unavailable");
  }

  // Vite BASE_URL is a public *path* such as /engse203-lab02-solution/.
  // Pass the resulting path directly to fetch; URL() requires an absolute base URL.
  const url = `${import.meta.env.BASE_URL}data/learning-tasks.json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Unable to load tasks (HTTP ${response.status})`);
  }

  const tasks = await response.json();

  if (!Array.isArray(tasks)) {
    throw new Error("The data source returned an invalid task collection");
  }

  return tasks;
}
