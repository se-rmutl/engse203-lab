import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const requiredFiles = [
  'src/App.jsx',
  'src/components/AppHeader.jsx',
  'src/components/SummaryPanel.jsx',
  'src/components/TaskForm.jsx',
  'src/components/FilterBar.jsx',
  'src/components/TaskList.jsx',
  'src/components/TaskCard.jsx',
  'src/data/initialTasks.js',
];
const failures = [];

for (const file of requiredFiles) {
  try { await access(join(root, file)); }
  catch { failures.push(`missing file: ${file}`); }
}

const sourceFiles = await Promise.all(
  requiredFiles.filter((file) => file.endsWith('.jsx')).map((file) => readFile(join(root, file), 'utf8').catch(() => '')),
);
const source = sourceFiles.join('\n');
const checks = [
  ['useState', /useState\s*\(/],
  ['controlled input', /value=\{[^}]+\}[\s\S]*onChange=\{/],
  ['submit event', /onSubmit=\{/],
  ['click event', /onClick=\{/],
  ['list rendering', /\.map\s*\(/],
  ['stable key', /key=\{task\.id\}/],
  ['immutable add', /\[\s*newTask\s*,\s*\.\.\./],
  ['immutable delete', /\.filter\s*\(/],
  ['conditional UI', /tasks\.length\s*===\s*0/],
];

for (const [label, pattern] of checks) {
  if (!pattern.test(source)) failures.push(`missing pattern: ${label}`);
}
if (/document\.querySelector|innerHTML|\.push\s*\(|\.splice\s*\(/.test(source)) {
  failures.push('found forbidden DOM mutation or mutable array update');
}

if (failures.length) {
  console.error('Pre-LAB 04 final check: NOT READY');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('Pre-LAB 04 final check: PASS — CP07 requirements found');

