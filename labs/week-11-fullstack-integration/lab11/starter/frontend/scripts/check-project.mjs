/**
 * ENGSE203 LAB05 — Public Project Checker
 *
 * v2.0.0 — รองรับการสอนแบบ 2 คาบ (5A / 5B)
 *
 * การใช้งาน
 *   npm run check                    ตรวจทั้งหมด (ใช้ตอนส่งงาน)
 *   npm run check -- --session=1     ตรวจเฉพาะงานของคาบ 5A
 *   npm run check -- --session=2     ตรวจทั้งหมด (เหมือนไม่ใส่ flag)
 *
 * checker นี้ตรวจ 3 ระดับ
 *   1. STATIC   — ไฟล์, dependency, โครงสร้างและ contract ที่อ่านได้จาก source
 *   2. TODO     — ไม่มี TODO ที่ยังไม่ได้ทำหลงเหลือในไฟล์ที่ควรเสร็จแล้ว
 *   3. RUNTIME  — เรียก Service/Storage จริงพร้อม localStorage และ fetch จำลอง
 *
 * checker ตรวจ contract เท่านั้น ไม่ได้บอกวิธีทำ และไม่แทน TC-L5-01–24
 * ที่ต้องทดสอบด้วยตนเองใน browser
 */

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

const root = process.cwd();

/* ------------------------------------------------------------------ */
/* Session flag                                                        */
/* ------------------------------------------------------------------ */

const sessionArgument = process.argv.find((argument) => argument.startsWith('--session='));
const session = sessionArgument ? Number(sessionArgument.slice('--session='.length)) : 0;

if (![0, 1, 2].includes(session)) {
  console.error('ค่า --session ต้องเป็น 1 หรือ 2 เท่านั้น (ไม่ใส่ = ตรวจทั้งหมด)');
  process.exit(2);
}

/** true เมื่อ checker ต้องตรวจงานของคาบ 5B ด้วย */
const includeSessionB = session !== 1;

const sessionLabel = session === 1 ? 'คาบ 5A (Read Path)'
  : session === 2 ? 'คาบ 5B (Write Path) + ทั้งหมด'
    : 'ทั้งหมด';

/* ------------------------------------------------------------------ */
/* Check registry                                                      */
/* ------------------------------------------------------------------ */

const checks = [];

/**
 * บันทึกผลการตรวจหนึ่งรายการ
 * @param {boolean} ok       ผ่านหรือไม่
 * @param {string}  id       requirement id เช่น 'R02'
 * @param {string}  message  ข้อความที่ผู้เรียนเห็น
 * @param {1|2}     phase    1 = ตรวจตั้งแต่คาบ 5A · 2 = ตรวจเมื่อถึงคาบ 5B
 */
function record(ok, id, message, phase = 1) {
  if (phase === 2 && !includeSessionB) {
    checks.push({ skipped: true, id, message });
    return;
  }
  checks.push({ ok: Boolean(ok), id, message });
}

/** ข้ามการตรวจของคาบ 5B โดยไม่ต้องคำนวณเงื่อนไข */
function skipInSessionA(phase) {
  return phase === 2 && !includeSessionB;
}

/* ------------------------------------------------------------------ */
/* Source helpers                                                      */
/* ------------------------------------------------------------------ */

async function text(file) {
  return readFile(path.join(root, file), 'utf8');
}

async function exists(file) {
  try {
    await readFile(path.join(root, file));
    return true;
  } catch {
    return false;
  }
}

/**
 * ลบคอมเมนต์ออกจาก source ก่อนตรวจด้วย regex
 *
 * เหตุผล: คำสำคัญอย่าง Outlet, useParams, useNavigate และ response.ok
 * ปรากฏอยู่ในคอมเมนต์ TODO ของ starter ถ้าไม่ลบก่อน checker จะรายงานว่า
 * ผ่านทั้งที่ยังไม่มีโค้ดจริง
 *
 * ครอบคลุมทั้ง block comment (รวมคอมเมนต์ในรูปแบบที่ใช้ใน JSX) และ line
 * comment โดยไม่ตัด // ที่อยู่หลังเครื่องหมาย : เพื่อไม่ให้ URL ใน string เสียหาย
 */
function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1 ');
}

/** อ่านไฟล์แล้วลบคอมเมนต์ให้เลย — ใช้กับการตรวจ regex ทุกจุด */
async function code(file) {
  return stripComments(await text(file));
}

async function walk(directory) {
  const entries = await readdir(path.join(root, directory), { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relative = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(relative));
    else if (/\.(js|jsx)$/.test(entry.name)) files.push(relative);
  }
  return files;
}

/* ------------------------------------------------------------------ */
/* 1. Required files                                                   */
/* ------------------------------------------------------------------ */

const requiredFiles = [
  'public/data/initialRequests.json', 'src/main.jsx', 'src/App.jsx', 'src/styles.css',
  'src/pages/AppLayout.jsx', 'src/pages/DashboardPage.jsx', 'src/pages/NewRequestPage.jsx',
  'src/pages/RequestDetailPage.jsx', 'src/pages/AboutPage.jsx', 'src/pages/NotFoundPage.jsx',
  'src/services/requestService.js', 'src/services/requestStorage.js',
  'src/components/LoadingState.jsx', 'src/components/ErrorState.jsx',
  'src/components/RequestForm.jsx', 'src/components/RequestList.jsx',
  'vite.config.js', 'package.json', 'package-lock.json', 'README.md',
];

for (const file of requiredFiles) {
  record(await exists(file), 'FILES', file);
}

/* ------------------------------------------------------------------ */
/* 2. Dependency และ build contract                                    */
/* ------------------------------------------------------------------ */

const packageJson = JSON.parse(await text('package.json'));
record(packageJson.dependencies?.['react-router-dom'] === '7.18.2', 'DEPS', 'react-router-dom ต้องเป็น 7.18.2');
record(packageJson.engines?.node === '>=22.12.0', 'DEPS', 'Node.js engine >=22.12.0');
record(packageJson.scripts?.check === 'node scripts/check-project.mjs', 'SCRIPTS', 'npm run check');

const viteConfig = await code('vite.config.js');
record(/base\s*:\s*['"]\.\/['"]/.test(viteConfig), 'BUILD', "Vite base: './'");

/* ------------------------------------------------------------------ */
/* 3. Router contract — ตรวจจาก "โค้ดจริง" ไม่ใช่คอมเมนต์            */
/* ------------------------------------------------------------------ */

const mainCode = await code('src/main.jsx');
record(/<\s*HashRouter[\s>]/.test(mainCode), 'R02', 'main.jsx ครอบ application ด้วย <HashRouter>');

const appCode = await code('src/App.jsx');
for (const route of ['requests/new', 'requests/:requestId', 'about', '*']) {
  record(
    appCode.includes(`path="${route}"`) || appCode.includes(`path='${route}'`),
    'R02-R05',
    `Route ${route}`,
  );
}
record(/<\s*Route\s+index/.test(appCode), 'R02', 'Dashboard index route');

const layoutCode = await code('src/pages/AppLayout.jsx');
record(/<\s*Outlet\s*\/?>/.test(layoutCode), 'R02', 'AppLayout render <Outlet /> จริง (ไม่ใช่แค่คอมเมนต์)');

const detailCode = await code('src/pages/RequestDetailPage.jsx');
record(/useParams\s*\(/.test(detailCode), 'R04', 'RequestDetailPage เรียก useParams()');

const newPageCode = await code('src/pages/NewRequestPage.jsx');
record(/useNavigate\s*\(/.test(newPageCode), 'R11', 'NewRequestPage เรียก useNavigate()', 2);

/* ------------------------------------------------------------------ */
/* 4. Service และ Storage — โครงสร้าง                                  */
/* ------------------------------------------------------------------ */

const serviceCode = await code('src/services/requestService.js');
for (const functionName of ['getRequests', 'getRequestById', 'addRequest', 'deleteRequest', 'resetRequests']) {
  record(
    new RegExp(`export\\s+async\\s+function\\s+${functionName}\\b`).test(serviceCode),
    'R07',
    `Service export ${functionName}`,
  );
}
record(/response\s*\.\s*ok/.test(serviceCode), 'R10', 'Service ตรวจ response.ok หลัง fetch');
record(
  !/import\.meta\.env/.test(serviceCode) || /import\.meta\.env\s*\?\./.test(serviceCode),
  'R10',
  'ใช้ import.meta.env?.BASE_URL แบบ optional chaining เพื่อให้ทดสอบนอก Vite ได้',
);

const storageCode = await code('src/services/requestStorage.js');
record(storageCode.includes("STORAGE_KEY = 'engse203-campus-requests-v1'"), 'R14', 'STORAGE_KEY ถูกต้อง');
record(/SCHEMA_VERSION\s*=\s*1/.test(storageCode), 'R14', 'SCHEMA_VERSION = 1');
for (const functionName of ['readStoredRequests', 'writeStoredRequests', 'clearStoredRequests']) {
  record(
    new RegExp(`export\\s+function\\s+${functionName}\\b`).test(storageCode),
    'R14',
    `Storage export ${functionName}`,
  );
}
record(
  !/localStorage\s*\.\s*clear\s*\(/.test(storageCode),
  'R14',
  'ห้ามใช้ localStorage.clear() — ลบเฉพาะ STORAGE_KEY ของ LAB05',
  2,
);

/* ------------------------------------------------------------------ */
/* 5. Boundary — fetch และ localStorage ต้องอยู่ในโมดูลเดียว          */
/* ------------------------------------------------------------------ */

const sourceFiles = await walk('src');

for (const file of sourceFiles) {
  const fileCode = stripComments(await text(file));
  if (file !== path.join('src', 'services', 'requestStorage.js')) {
    record(!/localStorage\s*\./.test(fileCode), 'R07', `${file}: ไม่มี direct localStorage access`);
  }
  if (file !== path.join('src', 'services', 'requestService.js')) {
    record(!/\bfetch\s*\(/.test(fileCode), 'R07', `${file}: ไม่มี direct fetch`);
  }
}

/* ------------------------------------------------------------------ */
/* 6. TODO ที่ยังไม่ได้ทำ                                              */
/* ------------------------------------------------------------------ */

/** ไฟล์ที่ต้องเสร็จตั้งแต่คาบ 5A */
const sessionAFiles = [
  'src/App.jsx',
  'src/pages/AppLayout.jsx',
  'src/pages/DashboardPage.jsx',
  'src/pages/RequestDetailPage.jsx',
  'src/components/AppHeader.jsx',
].map((file) => path.join(...file.split('/')));

const todoPattern = /throw\s+new\s+Error\s*\(\s*['"`]TODO/;

for (const file of sourceFiles) {
  const fileCode = stripComments(await text(file));
  const phase = sessionAFiles.includes(file) ? 1 : 2;
  record(!todoPattern.test(fileCode), 'TODO', `${file}: ไม่มี TODO ที่ยังไม่ได้ทำ`, phase);
}

/* ------------------------------------------------------------------ */
/* 7. Checker hooks                                                    */
/* ------------------------------------------------------------------ */

const allSource = (await Promise.all(sourceFiles.map(text))).join('\n');

const hooks = [
  ['app-layout', 1], ['page-dashboard', 1], ['page-new-request', 1],
  ['page-request-detail', 1], ['page-about', 1], ['page-not-found', 1],
  ['loading-state', 1], ['error-state', 1], ['empty-state', 1],
  ['request-list', 1], ['request-form', 1], ['retry-button', 1],
  ['reset-button', 2],
];

for (const [hook, phase] of hooks) {
  record(allSource.includes(`data-testid="${hook}"`), 'HOOKS', hook, phase);
}

/* ------------------------------------------------------------------ */
/* 8. Seed data                                                        */
/* ------------------------------------------------------------------ */

let seedRequests = null;
try {
  const parsed = JSON.parse(await text('public/data/initialRequests.json'));
  const valid = Array.isArray(parsed)
    && parsed.length >= 3
    && parsed.every((item) => typeof item?.id === 'string' && item.id.startsWith('REQ-'));
  if (valid) seedRequests = parsed;
  record(valid, 'DATA', 'seed JSON อ่านได้และมี REQ IDs อย่างน้อย 3 รายการ');
} catch {
  record(false, 'DATA', 'seed JSON อ่านได้และมี REQ IDs อย่างน้อย 3 รายการ');
}

/* ------------------------------------------------------------------ */
/* 9. RUNTIME — เรียก Service/Storage จริง                             */
/* ------------------------------------------------------------------ */

/*
 * ส่วนนี้คือหัวใจของ checker v2
 *
 * v1 ตรวจเพียงว่ามี export หรือไม่ ซึ่ง starter มีครบอยู่แล้ว (ฟังก์ชัน
 * throw TODO ข้างใน) ทำให้ผู้เรียนได้คะแนนเต็มโดยที่ Service ยังไม่ทำงานเลย
 *
 * v2 เรียกฟังก์ชันจริงพร้อม localStorage และ fetch จำลอง แล้วตรวจว่า
 * "ผลลัพธ์ตรง contract หรือไม่" โดยไม่บอกวิธีเขียน
 */

const fallbackSeed = [
  { id: 'REQ-001', requesterName: 'ผู้เรียน ทดสอบ', requestType: 'แจ้งซ่อม', location: 'C3-301', details: 'รายละเอียดทดสอบครบสิบตัว', priority: 'normal', status: 'pending' },
  { id: 'REQ-002', requesterName: 'ผู้สอน ทดสอบ', requestType: 'ขอใช้ห้อง', location: 'C3-302', details: 'รายละเอียดตัวอย่างลำดับสอง', priority: 'urgent', status: 'completed' },
  { id: 'REQ-003', requesterName: 'ผู้ช่วยสอน ทดสอบ', requestType: 'บริการบัญชีผู้ใช้', location: 'C3-303', details: 'รายละเอียดตัวอย่างลำดับสาม', priority: 'normal', status: 'in-progress' },
];

const runtimeSeed = seedRequests ?? fallbackSeed;

const storageValues = new Map();
globalThis.localStorage = {
  getItem: (key) => (storageValues.has(key) ? storageValues.get(key) : null),
  setItem: (key, value) => storageValues.set(key, String(value)),
  removeItem: (key) => storageValues.delete(key),
};
globalThis.__ENGSE203_SKIP_DELAY__ = true;
globalThis.fetch = async () => ({ ok: true, json: async () => structuredClone(runtimeSeed) });

let storageModule = null;
let serviceModule = null;
let importError = '';

try {
  storageModule = await import(pathToFileURL(path.join(root, 'src/services/requestStorage.js')).href);
  serviceModule = await import(pathToFileURL(path.join(root, 'src/services/requestService.js')).href);
} catch (error) {
  importError = error instanceof Error ? error.message : String(error);
}

record(Boolean(storageModule && serviceModule), 'RUNTIME', `import Service/Storage ได้${importError ? ` — ${shorten(importError)}` : ''}`);

function shorten(message) {
  const oneLine = String(message).replace(/\s+/g, ' ').trim();
  return oneLine.length > 90 ? `${oneLine.slice(0, 90)}…` : oneLine;
}

function assert(condition, detail) {
  if (!condition) throw new Error(detail ?? 'ผลลัพธ์ไม่ตรง contract');
}

/**
 * รันการตรวจเชิงพฤติกรรมหนึ่งรายการ
 * ถ้าโค้ดผู้เรียน throw (เช่น TODO ที่ยังไม่ทำ) จะถูกจับและรายงานเป็น TODO
 * ไม่ทำให้ checker ล้มทั้งตัว
 */
async function behaviour(id, message, run, phase = 1) {
  if (skipInSessionA(phase)) {
    checks.push({ skipped: true, id, message });
    return;
  }
  if (!storageModule || !serviceModule) {
    record(false, id, `${message} — ยัง import โมดูลไม่ได้`, phase);
    return;
  }
  try {
    await run();
    record(true, id, message, phase);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    record(false, id, `${message} — ${shorten(reason)}`, phase);
  }
}

const seedCount = runtimeSeed.length;

/* --- คาบ 5A: read path --------------------------------------------- */

await behaviour('R10', 'getRequests() คืนรายการคำร้องเมื่อโหลดสำเร็จ', async () => {
  const result = await serviceModule.getRequests();
  assert(Array.isArray(result), 'ต้องคืน array');
  assert(result.length === seedCount, `ต้องได้ ${seedCount} รายการจาก seed แต่ได้ ${result.length}`);
});

await behaviour('R09', "getRequests({scenario:'empty'}) คืน array ว่าง", async () => {
  const result = await serviceModule.getRequests({ scenario: 'empty' });
  assert(Array.isArray(result) && result.length === 0, 'ต้องคืน array ว่าง');
});

await behaviour('R09', "getRequests({scenario:'error'}) ต้อง reject", async () => {
  let rejected = false;
  try {
    await serviceModule.getRequests({ scenario: 'error' });
  } catch {
    rejected = true;
  }
  assert(rejected, 'ต้อง throw เพื่อให้ UI แสดง ErrorState');
});

await behaviour('R04', 'getRequestById() คืนคำร้องที่ ID ตรงกัน', async () => {
  const list = await serviceModule.getRequests();
  const target = list[0];
  const found = await serviceModule.getRequestById(target.id);
  assert(found && found.id === target.id, 'ต้องคืนคำร้องที่ ID ตรงกัน');
});

await behaviour('R04', 'getRequestById() คืน null เมื่อไม่พบ resource', async () => {
  const missing = await serviceModule.getRequestById('REQ-ไม่มีจริง-999');
  assert(missing === null, 'ต้องคืน null ไม่ใช่ throw หรือ undefined');
});

/* --- คาบ 5B: write path และ storage --------------------------------- */

await behaviour('R14', 'readStoredRequests() คืน status "missing" เมื่อยังไม่มีข้อมูล', async () => {
  storageValues.clear();
  const result = storageModule.readStoredRequests();
  assert(result?.status === 'missing', `ได้ status = ${result?.status}`);
}, 2);

await behaviour('R14', 'writeStoredRequests() แล้วอ่านกลับได้ status "valid"', async () => {
  storageValues.clear();
  storageModule.writeStoredRequests(structuredClone(runtimeSeed));
  const result = storageModule.readStoredRequests();
  assert(result?.status === 'valid', `ได้ status = ${result?.status}`);
  assert(result.requests?.length === seedCount, 'จำนวนรายการที่อ่านกลับไม่ตรง');
}, 2);

await behaviour('R14', 'readStoredRequests() คืน status "invalid" เมื่อ JSON เสีย', async () => {
  storageValues.clear();
  storageValues.set(storageModule.STORAGE_KEY, '{ ข้อมูลนี้ไม่ใช่ JSON');
  const result = storageModule.readStoredRequests();
  assert(result?.status === 'invalid', `ได้ status = ${result?.status} — ห้าม throw ออกไปทำให้ UI พัง`);
}, 2);

await behaviour('R14', 'readStoredRequests() คืน status "invalid" เมื่อ schemaVersion ไม่ตรง', async () => {
  storageValues.clear();
  storageValues.set(storageModule.STORAGE_KEY, JSON.stringify({ schemaVersion: 99, requests: [] }));
  const result = storageModule.readStoredRequests();
  assert(result?.status === 'invalid', `ได้ status = ${result?.status}`);
}, 2);

await behaviour('R14', 'readStoredRequests() คืน status "invalid" เมื่อมี ID ซ้ำ', async () => {
  storageValues.clear();
  const duplicated = [structuredClone(runtimeSeed[0]), structuredClone(runtimeSeed[0])];
  storageValues.set(storageModule.STORAGE_KEY, JSON.stringify({
    schemaVersion: 1,
    updatedAt: new Date().toISOString(),
    requests: duplicated,
  }));
  const result = storageModule.readStoredRequests();
  assert(result?.status === 'invalid', `ได้ status = ${result?.status}`);
}, 2);

await behaviour('R07', 'getRequests() อ่านจาก storage เมื่อมีข้อมูลที่ถูกต้องอยู่แล้ว', async () => {
  storageValues.clear();
  await serviceModule.getRequests();
  const stored = storageModule.readStoredRequests();
  assert(stored?.status === 'valid', 'หลังโหลดครั้งแรก ต้องมี envelope ที่ถูกต้องใน storage');
}, 2);

await behaviour('R14', 'ข้อมูลเสียหายต้องกู้คืนได้และแจ้ง recovery', async () => {
  storageValues.clear();
  storageValues.set(storageModule.STORAGE_KEY, '{ ข้อมูลเสีย');
  let recoveryMessage = '';
  const result = await serviceModule.getRequests({
    onRecovery: (message) => { recoveryMessage = message; },
  });
  assert(result.length === seedCount, 'ต้องกู้ข้อมูลตัวอย่างกลับมา');
  assert(recoveryMessage.length > 0, 'ต้องเรียก onRecovery เพื่อให้ UI แจ้งผู้ใช้ได้');
  assert(storageModule.readStoredRequests()?.status === 'valid', 'ต้องเขียน envelope ที่สะอาดทับ');
}, 2);

await behaviour('R11', 'addRequest() สร้างคำร้องใหม่ status pending และ ID ขึ้นต้น REQ-', async () => {
  storageValues.clear();
  await serviceModule.getRequests();
  const created = await serviceModule.addRequest({
    requesterName: 'นักศึกษา ทดสอบ',
    requestType: 'แจ้งซ่อม',
    location: 'C3-401',
    details: 'รายละเอียดสำหรับคำร้องใหม่ที่ยาวพอ',
    priority: 'urgent',
  });
  assert(typeof created?.id === 'string' && created.id.startsWith('REQ-'), 'ID ต้องขึ้นต้นด้วย REQ-');
  assert(created.status === 'pending', `status ต้องเป็น pending แต่ได้ ${created.status}`);
  const stored = storageModule.readStoredRequests();
  assert(stored?.requests?.length === seedCount + 1, 'คำร้องใหม่ต้องถูก persist');
}, 2);

await behaviour('R11', 'addRequest() ปฏิเสธข้อมูลที่ไม่ครบด้วยข้อความที่ผู้ใช้เข้าใจได้', async () => {
  storageValues.clear();
  await serviceModule.getRequests();
  let caught = null;
  try {
    await serviceModule.addRequest({ requestType: 'แจ้งซ่อม', location: 'C3-401', details: 'รายละเอียดยาวพอสมควร', priority: 'normal' });
  } catch (error) {
    caught = error;
  }
  assert(caught !== null, 'ข้อมูลที่ไม่มี requesterName ต้องถูกปฏิเสธ ไม่ใช่ผ่านไปแล้วพังทีหลัง');
  // การ crash เป็น TypeError ไม่นับว่า validate สำเร็จ — ผู้ใช้จะเห็นข้อความทางเทคนิค
  // ซึ่งขัดกับ Technical Contract §12 ที่ห้ามแสดงรายละเอียดภายในระบบใน UI
  assert(
    !(caught instanceof TypeError) && !/Cannot read propert/i.test(caught.message ?? ''),
    'ต้องตรวจข้อมูลก่อนใช้งาน แล้ว throw ข้อความที่ผู้ใช้เข้าใจได้ ไม่ใช่ปล่อยให้พังเป็น TypeError',
  );
  const stored = storageModule.readStoredRequests();
  assert(stored?.requests?.length === seedCount, 'ข้อมูลที่ไม่ผ่าน validation ต้องไม่ถูกบันทึก');
}, 2);

await behaviour('R12', 'deleteRequest() ลบถูก ID และ persist', async () => {
  storageValues.clear();
  const list = await serviceModule.getRequests();
  const targetId = list[0].id;
  const next = await serviceModule.deleteRequest(targetId);
  assert(next.length === seedCount - 1, 'จำนวนรายการต้องลดลง 1');
  assert(!next.some((request) => request.id === targetId), 'ต้องไม่มี ID ที่ลบแล้วหลงเหลือ');
  const stored = storageModule.readStoredRequests();
  assert(stored?.requests?.length === seedCount - 1, 'ผลการลบต้องถูก persist');
}, 2);

await behaviour('R13', 'resetRequests() คืนข้อมูลตัวอย่างเริ่มต้น', async () => {
  storageValues.clear();
  await serviceModule.getRequests();
  await serviceModule.deleteRequest((await serviceModule.getRequests())[0].id);
  const reset = await serviceModule.resetRequests();
  assert(reset.length === seedCount, 'ต้องคืน seed ครบทุกรายการ');
  assert(storageModule.readStoredRequests()?.requests?.length === seedCount, 'seed ที่คืนมาต้องถูก persist');
}, 2);

await behaviour('R14', 'clearStoredRequests() ลบเฉพาะคีย์ของ LAB05', async () => {
  storageValues.clear();
  storageValues.set('ข้อมูลของแอปอื่น', 'ห้ามลบ');
  await serviceModule.getRequests();
  storageModule.clearStoredRequests();
  assert(storageValues.get('ข้อมูลของแอปอื่น') === 'ห้ามลบ', 'ห้ามลบข้อมูลของ application อื่นใน origin เดียวกัน');
  assert(!storageValues.has(storageModule.STORAGE_KEY), 'ต้องลบคีย์ของ LAB05');
}, 2);

/* ------------------------------------------------------------------ */
/* 10. รายงานผล                                                        */
/* ------------------------------------------------------------------ */

for (const result of checks) {
  if (result.skipped) {
    console.log(`[SKIP] ${result.id} ${result.message}`);
    continue;
  }
  console.log(`${result.ok ? '[PASS]' : '[TODO]'} ${result.id} ${result.message}`);
}

const evaluated = checks.filter((result) => !result.skipped);
const failed = evaluated.filter((result) => !result.ok);
const skipped = checks.length - evaluated.length;

console.log(`\nENGSE203 LAB05 checker v2 — ขอบเขต: ${sessionLabel}`);
console.log(`ผ่าน ${evaluated.length - failed.length}/${evaluated.length} รายการ${skipped > 0 ? ` · ข้าม ${skipped} รายการ (ตรวจในคาบ 5B)` : ''}`);
console.log('หมายเหตุ: checker ตรวจ contract เท่านั้น ต้องทำ TC-L5 runtime/manual ใน browser ต่อ');

if (failed.length > 0) {
  console.log('\nทำ TODO ตาม Checkpoint Guide แล้วรัน npm run check อีกครั้ง');
  if (session === 0 || session === 2) {
    console.log('ถ้ากำลังอยู่ในคาบ 5A ให้ใช้: npm run check -- --session=1');
  }
  process.exitCode = 1;
}
