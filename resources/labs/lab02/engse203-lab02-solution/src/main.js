import "./style.css";
import { fetchLearningTasks } from "./api.js";
import { filterTasks, getStats } from "./utils.js";
import { renderStats, renderTasks, setMessage } from "./ui.js";

const elements = {
  message: document.querySelector("#app-message"),
  stats: document.querySelector("#stats"),
  taskList: document.querySelector("#task-list"),
  search: document.querySelector("#search"),
  status: document.querySelector("#status-filter"),
};

const state = {
  tasks: [],
  query: "",
  status: "all",
};

function render() {
  const visibleTasks = filterTasks(state.tasks, {
    query: state.query,
    status: state.status,
  });

  renderStats(elements.stats, getStats(state.tasks));
  renderTasks(elements.taskList, visibleTasks);
}

async function loadDashboard() {
  try {
    setMessage(elements.message, "loading", "กำลังโหลดข้อมูล...");
    const params = new URLSearchParams(window.location.search);

    state.tasks = await fetchLearningTasks({
      simulateError: params.get("simulateError") === "1",
    });

    render();
    setMessage(elements.message, "success", `โหลดข้อมูล ${state.tasks.length} รายการแล้ว`);
  } catch (error) {
    console.error("Unable to load dashboard:", error);
    elements.stats.innerHTML = "";
    elements.taskList.innerHTML = "";
    setMessage(
      elements.message,
      "error",
      `ไม่สามารถโหลดข้อมูลได้: ${error.message}`,
    );
  } finally {
    console.info("Learning Dashboard load attempt finished.");
  }
}

elements.search.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});

elements.status.addEventListener("change", (event) => {
  state.status = event.target.value;
  render();
});

loadDashboard();
