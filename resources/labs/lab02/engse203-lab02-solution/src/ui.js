import { getStatusLabel } from "./utils.js";

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return map[character];
  });
}

export function setMessage(element, type, text) {
  element.className = `message ${type}`;
  element.textContent = text;
}

export function renderStats(element, stats) {
  const cards = [
    ["Total", stats.total],
    ["To do", stats.todo],
    ["In progress", stats.doing],
    ["Done", stats.done],
  ];

  element.innerHTML = cards
    .map(
      ([label, count]) => `
        <article class="stat-card">
          <span>${label}</span>
          <strong>${count}</strong>
        </article>
      `,
    )
    .join("");
}

export function renderTasks(element, tasks) {
  if (tasks.length === 0) {
    element.innerHTML = `
      <article class="empty-state">
        <h2>ไม่พบรายการที่ตรงกับเงื่อนไข</h2>
        <p>ลองเปลี่ยนคำค้นหาหรือตัวกรองสถานะ</p>
      </article>
    `;
    return;
  }

  element.innerHTML = tasks
    .map(
      ({ week, title, topic, status, tags = [] }) => `
        <article class="task-card">
          <div class="task-meta">
            <span class="badge">Week ${week}</span>
            <span class="badge status-${escapeHtml(status)}">${getStatusLabel(status)}</span>
          </div>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(topic)}</p>
          <div class="tags">
            ${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
          </div>
        </article>
      `,
    )
    .join("");
}
