#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";

const target = resolve(process.argv[2] ?? ".");

const requiredFiles = [
  "index.html",
  "package.json",
  "vite.config.js",
  "src/api.js",
  "src/utils.js",
  "src/ui.js",
  "src/main.js",
  "src/style.css",
  "public/data/learning-tasks.json",
  "README.md",
];

function exists(relativePath) {
  return existsSync(join(target, relativePath));
}

function read(relativePath) {
  return readFileSync(join(target, relativePath), "utf8");
}

const checks = [];

for (const file of requiredFiles) {
  checks.push({
    area: "Required file",
    item: file,
    pass: exists(file),
  });
}

if (exists("package.json")) {
  try {
    const packageJson = JSON.parse(read("package.json"));
    for (const script of ["dev", "build", "preview", "check"]) {
      checks.push({
        area: "npm script",
        item: script,
        pass: Boolean(packageJson.scripts?.[script]),
      });
    }
  } catch {
    checks.push({
      area: "package.json",
      item: "valid JSON",
      pass: false,
    });
  }
}

const patternChecks = [
  ["src/api.js", "async fetch function", /export\s+async\s+function\s+fetchLearningTasks/],
  ["src/api.js", "fetch()", /\bfetch\s*\(/],
  ["src/api.js", "response.ok", /response\.ok/],
  ["src/main.js", "api import", /from\s+["']\.\/api\.js["']/],
  ["src/main.js", "try/catch", /\btry\s*{[\s\S]*\bcatch\s*\(/],
  ["src/main.js", "simulateError", /simulateError/],
  ["src/utils.js", "exported utility", /export\s+function|export\s+const/],
  ["src/ui.js", "exported render UI", /export\s+function\s+render/],
  ["index.html", "module script", /type=["']module["']/],
  ["vite.config.js", "docs output", /outDir\s*:\s*["']docs["']/],
];

for (const [file, item, pattern] of patternChecks) {
  checks.push({
    area: file,
    item,
    pass: exists(file) && pattern.test(read(file)),
  });
}

checks.push({
  area: "Build output",
  item: "docs/index.html exists",
  pass: exists("docs/index.html"),
});

checks.push({
  area: "Build output",
  item: "docs data JSON exists",
  pass: exists("docs/data/learning-tasks.json"),
});

const width = 16;
console.log(`\nLAB 02 automated checklist: ${target}\n`);
console.log(`${"Area".padEnd(width)} | ${"Result".padEnd(5)} | Item`);
console.log(`${"-".repeat(width)}-|--------|----------------------------------------------`);

for (const check of checks) {
  console.log(
    `${check.area.slice(0, width).padEnd(width)} | ${(check.pass ? "PASS" : "FAIL").padEnd(5)} | ${check.item}`,
  );
}

const passed = checks.filter((check) => check.pass).length;
console.log(`\nPassed ${passed}/${checks.length} automated checks.`);
console.log(
  "Manual review is still required for search/filter behavior, error UI, Git branch/PR history, GitHub Pages URL, README evidence, and academic integrity.",
);

if (checks.some((check) => !check.pass)) {
  process.exitCode = 1;
}
