import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const server = await createServer({ root, appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  const { validateTask } = await server.ssrLoadModule('/src/components/TaskForm.jsx');
  const html = renderToStaticMarkup(createElement(App));
  const cards = (html.match(/class="task-card"/g) || []).length;
  const summaryCards = (html.match(/class="summary-card"/g) || []).length;
  if (cards !== 3 || summaryCards !== 4) throw new Error(`unexpected initial render: tasks=${cards}, summary=${summaryCards}`);
  if (Object.keys(validateTask({ title: '', category: '', priority: 'normal' })).length !== 2) throw new Error('invalid task must return 2 field errors');
  if (Object.keys(validateTask({ title: 'ฝึก React', category: 'coding', priority: 'normal' })).length !== 0) throw new Error('valid task must return no errors');
  console.log('Pre-LAB 04 SSR/validation smoke: PASS');
} finally {
  await server.close();
}

