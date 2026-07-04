const defaultCode = {
  basics: `const course = "ENGSE203";
const week = 2;
let completedTasks = 1;

completedTasks += 1;

const message = \`${'${course}'} · Week ${'${week}'}\\nทำเสร็จแล้ว ${'${completedTasks}'} งาน\`;
console.log(message);`,
  arrays: `const tasks = [
  { title: "ES Modules", status: "todo", minutes: 40 },
  { title: "async/await", status: "doing", minutes: 60 },
  { title: "GitHub Pages", status: "done", minutes: 30 },
];

const activeTasks = tasks
  .filter(({ status }) => status !== "done")
  .map(({ title, ...task }) => ({ ...task, title: title.trim() }));

const totalMinutes = activeTasks
  .reduce((sum, { minutes }) => sum + minutes, 0);

console.log(activeTasks);
console.log(\`Active: ${'${activeTasks.length}'} | ${'${totalMinutes}'} min\`);`,
  async: `async function loadDashboard(shouldFail = false) {
  showState("Loading", "กำลังโหลด learning tasks...");

  try {
    const response = await fakeFetchTasks({ shouldFail });
    if (!response.ok) throw new Error(\`HTTP ${'${response.status}'}\`);

    const tasks = await response.json();
    showState("Success", \`โหลดข้อมูล ${'${tasks.length}'} รายการแล้ว\`);
    console.log(tasks.map(({ title }) => title));
  } catch (error) {
    showState("Error", \`ไม่สามารถโหลดข้อมูล: ${'${error.message}'}\`);
  } finally {
    showState("Finally", "ซ่อน loading indicator");
  }
}

loadDashboard(false);`,
  free: ``,
};

const exerciseCode = {
  "basics-try-2": `const studentName = "Aom";
let score = 8;
const passScore = 10;

// 1) เพิ่มคะแนนอีก 2 คะแนน
// 2) สร้าง result ด้วย template literal
// 3) console.log(result);`,
  "arrays-try-2": `const tasks = [
  { title: "ES Modules", status: "todo", minutes: 40 },
  { title: "async/await", status: "doing", minutes: 60 },
  { title: "GitHub Pages", status: "done", minutes: 30 },
];

// 1) หา task ที่ status เป็น "todo"
// 2) destructuring ค่า title และข้อมูลที่เหลือ
// 3) สร้าง startedTask ใหม่ด้วย spread โดย status เป็น "doing"
// 4) console.log(nextTask.status) และ console.log(startedTask.status)`,
  "async-try-2": `async function showTodoCount() {
  showState("Loading", "กำลังอ่านข้อมูล...");

  try {
    const response = await fakeFetchTasks();
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);

    const tasks = await response.json();
    // 1) สร้าง todoCount จาก tasks
    // 2) แสดง Success พร้อมจำนวน To do
    // 3) console.log จำนวน To do
  } catch (error) {
    showState("Error", \`ไม่สามารถโหลดข้อมูล: \${error.message}\`);
  } finally {
    showState("Finally", "ซ่อน loading indicator");
  }
}

showTodoCount();`,
};

const activeFrames = new Map();
const completionKey = "engse203-week02-sandbox-completed";

function formatValue(value) {
  if (typeof value === "string") return value;
  if (typeof value === "undefined") return "undefined";
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function writeOutput(id, message, append = false) {
  const output = document.querySelector(`#output-${id}`);
  if (!output) return;
  output.textContent = append ? `${output.textContent}\n${message}` : message;
}

function clearAsyncTimeline() {
  const timeline = document.querySelector("#async-state-log");
  if (!timeline) return;
  timeline.innerHTML = '<span class="empty-state">กำลังรอผลลัพธ์จากโค้ด...</span>';
}

function addAsyncState(state, message) {
  const timeline = document.querySelector("#async-state-log");
  if (!timeline) return;
  const empty = timeline.querySelector(".empty-state");
  if (empty) empty.remove();
  const item = document.createElement("div");
  item.className = "state-event";
  item.dataset.state = state;
  const name = document.createElement("b");
  name.textContent = state;
  const detail = document.createElement("span");
  detail.textContent = message;
  item.append(name, detail);
  timeline.append(item);
}

function buildRunnerDocument(id, code) {
  const escapedCode = code.replace(/<\/script/gi, "<\\/script");
  return `<!doctype html>
<html><head><meta charset="utf-8"></head><body>
<script>
(() => {
  const sandboxId = ${JSON.stringify(id)};
  const emit = (payload) => parent.postMessage({ source: "engse203-sandbox", id: sandboxId, ...payload }, "*");
  const format = (value) => {
    if (typeof value === "string") return value;
    if (typeof value === "undefined") return "undefined";
    try { return JSON.stringify(value, null, 2); } catch { return String(value); }
  };
  const forward = (level, args) => emit({ type: "console", level, message: args.map(format).join(" ") });
  window.console = {
    log: (...args) => forward("log", args),
    info: (...args) => forward("info", args),
    warn: (...args) => forward("warn", args),
    error: (...args) => forward("error", args),
    table: (value) => forward("table", [value])
  };
  window.addEventListener("error", (event) => emit({ type: "runtime-error", message: event.message || "Unknown error" }));
  window.addEventListener("unhandledrejection", (event) => emit({ type: "runtime-error", message: event.reason?.message || String(event.reason) }));

  const mockTasks = [
    { title: "ES Modules", status: "todo" },
    { title: "async/await", status: "doing" },
    { title: "GitHub Pages", status: "done" }
  ];
  window.fakeFetchTasks = ({ shouldFail = false } = {}) => new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({ ok: false, status: 503, json: async () => ({ message: "Service unavailable" }) });
        return;
      }
      resolve({ ok: true, status: 200, json: async () => mockTasks });
    }, 550);
  });
  window.showState = (state, message) => emit({ type: "state", state, message: String(message) });
  emit({ type: "ready" });

  try {
${escapedCode}
  } catch (error) {
    emit({ type: "runtime-error", message: error?.message || String(error) });
  }
})();
<\/script></body></html>`;
}

function runCode(id) {
  const editor = document.querySelector(`#editor-${id}`);
  if (!editor) return;

  if (!editor.value.trim()) {
    writeOutput(id, "ยังไม่มีโค้ด — ลองพิมพ์ console.log('Hello ENGSE203') แล้วกด Run code");
    return;
  }

  if (activeFrames.has(id)) activeFrames.get(id).remove();
  writeOutput(id, "▶ Running...");
  if (id === "async") clearAsyncTimeline();

  const frame = document.createElement("iframe");
  frame.setAttribute("sandbox", "allow-scripts");
  frame.setAttribute("title", "Isolated JavaScript runner");
  frame.style.display = "none";
  frame.srcdoc = buildRunnerDocument(id, editor.value);
  document.body.append(frame);
  activeFrames.set(id, frame);

  window.setTimeout(() => {
    if (activeFrames.get(id) === frame) {
      frame.remove();
      activeFrames.delete(id);
    }
  }, 4500);
}

function updateProgress() {
  const completed = JSON.parse(localStorage.getItem(completionKey) || "[]");
  const count = completed.length;
  document.querySelector("#progress-count").textContent = `${count} / 3`;
  document.querySelector("#progress-bar").style.width = `${(count / 3) * 100}%`;
  document.querySelectorAll("[data-complete]").forEach((button) => {
    const done = completed.includes(button.dataset.complete);
    button.classList.toggle("is-complete", done);
    button.textContent = done
      ? "✓ ทำบทเรียนนี้แล้ว · กดเพื่อยกเลิก"
      : `✓ ทำบทเรียนที่ ${button.dataset.complete.replace("lesson-", "")} แล้ว`;
  });
}

function toggleCompletion(lessonId) {
  const completed = JSON.parse(localStorage.getItem(completionKey) || "[]");
  const next = completed.includes(lessonId)
    ? completed.filter((item) => item !== lessonId)
    : [...completed, lessonId];
  localStorage.setItem(completionKey, JSON.stringify(next));
  updateProgress();
}

window.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || data.source !== "engse203-sandbox") return;

  if (data.type === "ready") {
    writeOutput(data.id, "");
    return;
  }

  if (data.type === "console") {
    const prefix = data.level === "error" ? "✖" : data.level === "warn" ? "⚠" : "›";
    const current = document.querySelector(`#output-${data.id}`)?.textContent;
    writeOutput(data.id, `${prefix} ${data.message}`, Boolean(current));
  }

  if (data.type === "runtime-error") {
    const current = document.querySelector(`#output-${data.id}`)?.textContent;
    writeOutput(data.id, `✖ Error: ${data.message}`, Boolean(current));
  }

  if (data.type === "state" && data.id === "async") {
    addAsyncState(data.state, data.message);
  }
});

document.querySelectorAll(".run-code").forEach((button) => {
  button.addEventListener("click", () => runCode(button.dataset.target));
});

document.querySelectorAll(".reset-code").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.target;
    document.querySelector(`#editor-${id}`).value = defaultCode[id];
    writeOutput(
      id,
      id === "free"
        ? "ล้าง Editor และ Output แล้ว — พิมพ์โค้ดใหม่ได้ทันที"
        : "รีเซ็ตโค้ดแล้ว — กด Run code อีกครั้ง",
    );
    if (id === "async") clearAsyncTimeline();
  });
});

document.querySelectorAll(".load-try-code").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.target;
    const code = exerciseCode[button.dataset.code];
    const editor = document.querySelector(`#editor-${id}`);
    if (!editor || !code) return;

    editor.value = code;
    writeOutput(id, "โหลดโจทย์แล้ว — เติม TODO ให้ครบ แล้วกด Run code");
    if (id === "async") clearAsyncTimeline();
    document.querySelector(`[data-playground="${id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => editor.focus(), 300);
  });
});

document.querySelectorAll("[data-complete]").forEach((button) => {
  button.addEventListener("click", () => toggleCompletion(button.dataset.complete));
});

document.querySelector("#reset-progress").addEventListener("click", () => {
  localStorage.removeItem(completionKey);
  updateProgress();
});

document.querySelectorAll(".quiz-answer").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = document.querySelector(`#answer-${button.dataset.answer}`);
    const visible = !answer.hidden;
    answer.hidden = visible;
    button.textContent = visible ? "เปิดเฉลย" : "ซ่อนเฉลย";
  });
});

updateProgress();
