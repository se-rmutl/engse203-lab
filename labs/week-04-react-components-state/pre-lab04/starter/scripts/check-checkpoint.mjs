import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const requested = String(process.argv[2] || '').toUpperCase();
const checkpoints = ['CP00', 'CP01', 'CP02', 'CP03', 'CP04', 'CP05', 'CP06', 'CP07'];

if (!checkpoints.includes(requested)) {
  console.error('Usage: npm run check:cp -- CP00|CP01|CP02|CP03|CP04|CP05|CP06|CP07');
  process.exit(1);
}

async function text(file) {
  return readFile(join(root, file), 'utf8').catch(() => '');
}

async function exists(file) {
  try { await access(join(root, file)); return true; }
  catch { return false; }
}

const files = {
  app: await text('src/App.jsx'),
  header: await text('src/components/AppHeader.jsx'),
  summary: await text('src/components/SummaryPanel.jsx'),
  list: await text('src/components/TaskList.jsx'),
  card: await text('src/components/TaskCard.jsx'),
  filter: await text('src/components/FilterBar.jsx'),
  form: await text('src/components/TaskForm.jsx'),
  styles: await text('src/styles.css'),
  data: await text('src/data/initialTasks.js'),
};
const allSource = Object.values(files).join('\n');
const gates = {
  CP00: [
    ['src/App.jsx exists', await exists('src/App.jsx')],
    ['src/main.jsx exists', await exists('src/main.jsx')],
    ['initialTasks exists', /initialTasks/.test(files.data)],
    ['Study Task Board renders', /Study Task Board/.test(files.app)],
  ],
  CP01: [
    ['AppHeader.jsx exists', await exists('src/components/AppHeader.jsx')],
    ['SummaryPanel.jsx exists', await exists('src/components/SummaryPanel.jsx')],
    ['App renders AppHeader', /<AppHeader/.test(files.app)],
    ['App sends summary prop', /summary=\{summary\}/.test(files.app)],
  ],
  CP02: [
    ['TaskList.jsx exists', await exists('src/components/TaskList.jsx')],
    ['TaskCard.jsx exists', await exists('src/components/TaskCard.jsx')],
    ['list uses map()', /tasks\.map\s*\(/.test(files.list)],
    ['list uses task.id key', /key=\{task\.id\}/.test(files.list)],
    ['TaskCard receives task prop', /function TaskCard\s*\(\{\s*task/.test(files.card)],
  ],
  CP03: [
    ['tasks useState', /\[\s*tasks(?:\s*,\s*setTasks)?\s*\]\s*=\s*useState\s*\(initialTasks\)/.test(files.app)],
    ['statusFilter useState', /\[\s*statusFilter\s*,\s*setStatusFilter\s*\]\s*=\s*useState/.test(files.app)],
    ['FilterBar renders', /<FilterBar/.test(files.app)],
    ['filteredTasks is derived', /filteredTasks/.test(files.app) && /tasks\.filter/.test(files.app)],
  ],
  CP04: [
    ['TaskForm.jsx exists', await exists('src/components/TaskForm.jsx')],
    ['formData useState', /\[\s*formData\s*,\s*setFormData\s*\]\s*=\s*useState/.test(files.form)],
    ['onChange event', /onChange=\{handleChange\}/.test(files.form)],
    ['onSubmit event', /onSubmit=\{handleSubmit\}/.test(files.form)],
    ['preventDefault()', /preventDefault\s*\(\)/.test(files.form)],
    ['immutable add', /\[\s*newTask\s*,\s*\.\.\.currentTasks\s*\]/.test(files.app)],
  ],
  CP05: [
    ['delete handler exists', /handleDeleteTask/.test(files.app)],
    ['delete uses filter()', /currentTasks\.filter/.test(files.app)],
    ['delete callback reaches card', /onDeleteTask/.test(files.list) && /onDeleteTask/.test(files.card)],
    ['empty state is conditional', /tasks\.length\s*===\s*0/.test(files.list)],
  ],
  CP06: [
    ['responsive media query', /@media\s*\(min-width/.test(files.styles)],
    ['visible keyboard focus', /:focus-visible/.test(files.styles)],
    ['aria-invalid reflects errors', /aria-invalid/.test(files.form)],
    ['feedback uses role=status', /role=["']status["']/.test(files.form)],
  ],
  CP07: [
    ['all 6 child components exist', (await Promise.all(['AppHeader', 'SummaryPanel', 'TaskForm', 'FilterBar', 'TaskList', 'TaskCard'].map((name) => exists(`src/components/${name}.jsx`)))).every(Boolean)],
    ['no direct DOM mutation', !/document\.querySelector|innerHTML/.test(allSource)],
    ['no mutable array update', !/\.push\s*\(|\.splice\s*\(/.test(allSource)],
  ],
};

const targetIndex = checkpoints.indexOf(requested);
const failures = [];
for (const checkpoint of checkpoints.slice(0, targetIndex + 1)) {
  for (const [label, passed] of gates[checkpoint]) {
    if (!passed) failures.push(`${checkpoint}: ${label}`);
  }
}

if (failures.length) {
  console.error(`Checkpoint verifier ${requested}: NOT READY`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Checkpoint verifier ${requested}: PASS (cumulative CP00–${requested})`);

