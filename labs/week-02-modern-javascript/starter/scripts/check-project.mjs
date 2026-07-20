import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const requiredFiles = [
  "index.html",
  "vite.config.js",
  "package.json",
  "src/api.js",
  "src/main.js",
  "src/ui.js",
  "src/utils.js",
  "src/style.css",
  "public/data/learning-tasks.json",
];

const missing = requiredFiles.filter((file) => !existsSync(file));
const errors = [];

if (missing.length > 0) {
  errors.push(`Missing required files:\n${missing.map((file) => `- ${file}`).join("\n")}`);
}

function read(relativePath) {
  return readFileSync(join(process.cwd(), relativePath), "utf8");
}

if (missing.length === 0) {
  const packageJson = JSON.parse(read("package.json"));
  const requiredScripts = ["dev", "build", "preview", "check"];
  const missingScripts = requiredScripts.filter((name) => !packageJson.scripts?.[name]);

  if (missingScripts.length > 0) {
    errors.push(`Missing npm scripts: ${missingScripts.join(", ")}`);
  }

  const api = read("src/api.js");
  const main = read("src/main.js");
  const ui = read("src/ui.js");
  const utils = read("src/utils.js");
  const index = read("index.html");
  const viteConfig = read("vite.config.js");

  const evidenceChecks = [
    ["api.js exports async function", /export\s+async\s+function\s+fetchLearningTasks/],
    ["api.js uses fetch", /\bfetch\s*\(/],
    ["api.js checks response.ok", /response\.ok/],
    ["main.js imports api module", /from\s+["']\.\/api\.js["']/],
    ["main.js uses try/catch", /\btry\s*{[\s\S]*\bcatch\s*\(/],
    ["main.js reads simulateError", /simulateError/],
    ["ui.js exports render function", /export\s+function\s+render/],
    ["utils.js exports function", /export\s+function|export\s+const/],
    ["index.html uses type=module", /type=["']module["']/],
    ["vite.config.js builds to dist", /outDir\s*:\s*["']dist["']/],
  ];

  const combined = { api, main, ui, utils, index, viteConfig };
  for (const [label, pattern] of evidenceChecks) {
    const source = label.startsWith("api") ? combined.api
      : label.startsWith("main") ? combined.main
      : label.startsWith("ui") ? combined.ui
      : label.startsWith("utils") ? combined.utils
      : label.startsWith("index") ? combined.index
      : combined.viteConfig;

    if (!pattern.test(source)) {
      errors.push(`Evidence not found: ${label}`);
    }
  }

  try {
    const tasks = JSON.parse(read("public/data/learning-tasks.json"));
    if (!Array.isArray(tasks) || tasks.length < 5) {
      errors.push("learning-tasks.json must contain an array with at least 5 tasks.");
    }
  } catch {
    errors.push("learning-tasks.json is not valid JSON.");
  }
}

if (errors.length > 0) {
  console.error("LAB 02 project check failed:\n");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("LAB 02 project structure and required evidence check passed.");
console.log("Reminder: this checker does not replace manual review of behavior, Git workflow, README, and GitHub Pages.");
