import { access, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const componentNames = ['AppHeader', 'SummaryPanel', 'RequestForm', 'FilterBar', 'RequestList', 'RequestCard'];
const requiredFiles = [
  'src/App.jsx',
  'src/data/initialRequests.js',
  ...componentNames.map((name) => `src/components/${name}.jsx`),
  'src/styles.css',
  'vite.config.js',
  'README.md',
];
const failures = [];

for (const file of requiredFiles) {
  try { await access(join(root, file)); }
  catch { failures.push(`missing file: ${file}`); }
}

const sourcePaths = ['src/App.jsx', ...componentNames.map((name) => `src/components/${name}.jsx`)];
const source = (await Promise.all(sourcePaths.map((file) => readFile(join(root, file), 'utf8').catch(() => '')))).join('\n');
const viteConfig = await readFile(join(root, 'vite.config.js'), 'utf8').catch(() => '');
const readme = await readFile(join(root, 'README.md'), 'utf8').catch(() => '');

const patterns = [
  ['requests useState', /\[\s*requests\s*,\s*setRequests\s*\]\s*=\s*useState/],
  ['filter useState', /\[\s*statusFilter\s*,\s*setStatusFilter\s*\]\s*=\s*useState/],
  ['controlled form state', /\[\s*formData\s*,\s*setFormData\s*\]\s*=\s*useState/],
  ['onChange', /onChange=\{/],
  ['onSubmit', /onSubmit=\{/],
  ['onClick', /onClick=\{/],
  ['list map', /requests\.map\s*\(/],
  ['stable request key', /key=\{request\.id\}/],
  ['immutable add', /\[\s*newRequest\s*,\s*\.\.\./],
  ['immutable delete', /\.filter\s*\(/],
  ['empty conditional', /requests\.length\s*===\s*0/],
  ['aria invalid', /aria-invalid(?:=|['"]?\s*:)/],
  ['feedback status', /role=["']status["']/],
];

for (const [label, pattern] of patterns) {
  if (!pattern.test(source)) failures.push(`missing implementation: ${label}`);
}

if (/document\.querySelector|innerHTML|\.push\s*\(|\.splice\s*\(/.test(source)) {
  failures.push('forbidden DOM mutation or mutable array update found');
}
if (/STUDENT-ID/.test(viteConfig)) failures.push('replace STUDENT-ID in vite.config.js');
if (!/base:\s*['"]\.\/['"]/.test(viteConfig)) failures.push("Vite base must be './' for the unified Pages Hub");
if (/outDir:\s*['"]docs['"]/.test(viteConfig)) failures.push('do not write Vite build directly to repository docs/');
if (/TODO/.test(readme)) failures.push('complete README TODO items and test evidence');

try {
  const files = await readdir(join(root, 'src/components'));
  if (files.filter((name) => name.endsWith('.jsx')).length < 6) failures.push('need at least 6 child component files');
} catch { /* already reported */ }

if (failures.length) {
  console.error('LAB 4 verifier: NOT READY');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('LAB 4 verifier: PASS — run manual TC-01–TC-12 and record evidence in README');
