export async function fetchLearningTasks({ simulateError = false } = {}) {
  if (simulateError) {
    throw new Error("Simulated error: data source is unavailable");
  }

  const url = new URL("data/learning-tasks.json", import.meta.env.BASE_URL);
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
