#!/usr/bin/env node
/**
 * ENGSE203 Week 11 — Checker
 * ตรวจว่าระบบ full-stack พร้อมใช้จริง: config · health · error · build
 */
import { readFile } from 'node:fs/promises';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ── supertest อยู่ใน devDependencies ของ api/ — หาได้ทั้งจาก root และจาก api/ ──
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
async function loadSupertest() {
  try { return (await import('supertest')).default; }
  catch {
    const req = createRequire(path.join(ROOT, 'api', 'package.json'));
    return (await import(pathToFileURL(req.resolve('supertest')).href)).default;
  }
}

// ── ใช้ฐานข้อมูลชั่วคราว — checker ไม่เขียนข้อมูลทดสอบลง campus.db ที่ต้อง commit ──
import { tmpdir } from 'node:os';
import { rmSync as rmCheckDb } from 'node:fs';
const CHECK_DB = path.join(tmpdir(), `engse203-check-${process.pid}.db`);
if (!process.env.DB_FILE) process.env.DB_FILE = CHECK_DB;
// ⚠ checker ใช้ฐานข้อมูลในเครื่องเสมอ — ไม่เขียนข้อมูลทดสอบขึ้น Turso (Challenge ⭐⭐)
delete process.env.TURSO_DATABASE_URL;
delete process.env.TURSO_AUTH_TOKEN;
process.on('exit', () => { try { rmCheckDb(CHECK_DB, { force: true }); } catch {} });

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const INCLASS = process.argv.includes('--inclass');
const results = [];
const rec = (id, scope, name, ok, detail = '') => results.push({ id, scope, name, ok, detail });
const read = async (p) => { try { return await readFile(path.join(ROOT, p), 'utf8'); } catch { return ''; } };
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
const has = (s, ...f) => f.every((x) => new RegExp(x, 'i').test(s));

// ── CP35 · โครงระบบ 3 ชั้นครบ ──
rec('CP35', 'inclass', 'มีชั้น API (api/src/app.js)', existsSync(path.join(ROOT, 'api/src/app.js')));
rec('CP35', 'inclass', 'มีชั้น frontend (frontend/src)', existsSync(path.join(ROOT, 'frontend/src')));
rec('CP35', 'inclass', 'มีชั้นฐานข้อมูล (api/data/schema.sql)', existsSync(path.join(ROOT, 'api/data/schema.sql')));

// ── CP36 · config รวมศูนย์ ──
const cfg = strip(await read('api/src/config.js'));
rec('CP36', 'inclass', 'มี config.js รวม env ไว้ที่เดียว', cfg.length > 0);
rec('CP36', 'inclass', 'config อ่าน NODE_ENV', has(cfg, 'NODE_ENV'));
rec('CP36', 'inclass', 'config อ่าน PORT จาก env', has(cfg, 'process\\.env\\.PORT'));
rec('CP36', 'inclass', 'config มี isProd แยก dev/production', has(cfg, 'isProd'));
// ตรวจว่า app.js ไม่ hardcode port/cors
const app = strip(await read('api/src/app.js'));
rec('CP36', 'takehome', 'app.js ใช้ config ไม่ hardcode', has(app, 'config\\.') && !has(app, "origin:\\s*'http"));

// ── CP37 · health check ──
const health = strip(await read('api/src/routes/healthRoutes.js'));
rec('CP37', 'inclass', 'มี healthRoutes.js', health.length > 0);
rec('CP37', 'inclass', 'app.js ผูก /api/health', has(app, "/api/health"));
rec('CP37', 'inclass', 'health คืนสถานะฐานข้อมูล', has(health, 'database|getDbStatus|connected'));
const svc = strip(await read('api/src/services/requestService.js'));
rec('CP37', 'inclass', 'service มี getDbStatus()', has(svc, 'getDbStatus'));

// ── CP38 · error handling + logging ──
const errH = strip(await read('api/src/middleware/errorHandler.js'));
rec('CP38', 'takehome', 'มี errorHandler รวมศูนย์', has(errH, 'errorHandler'));
rec('CP38', 'takehome', 'มี notFound handler', has(errH, 'notFound'));
rec('CP38', 'takehome', 'ใช้ morgan logging', has(app, 'morgan'));
rec('CP38', 'takehome', 'logging แยก dev/production', has(app, "isProd.*combined|combined.*dev|isProd\\s*\\?"));

// ── CP39 · production build ──
rec('CP39', 'inclass', 'app.js เสิร์ฟ static ตอน production', has(app, 'static') && has(app, 'staticDir|dist'));
rec('CP39', 'takehome', 'config มี staticDir', has(cfg, 'staticDir|STATIC_DIR'));

// ⭐ 2 ข้อนี้กันบั๊กที่ "จำลองในเครื่องผ่าน แต่ขึ้น cloud แล้วพัง"
// (ก) หน้าแรก / ตอน production ต้องเป็นหน้าเว็บ ไม่ใช่ JSON ของ API
const prodRoot = (() => {
  if (!existsSync(path.join(ROOT, 'frontend/dist/index.html'))) return { ok: false, detail: 'ยังไม่ได้ build frontend' };
  const script = `
    const { createApp } = await import('./api/src/app.js');
    const svc = await import('./api/src/services/requestService.js');
    const { createRequire } = await import('node:module');
    const { pathToFileURL } = await import('node:url');
    let request;
    try { request = (await import('supertest')).default; }
    catch { const r = createRequire(process.cwd() + '/api/package.json');
            request = (await import(pathToFileURL(r.resolve('supertest')).href)).default; }
    await svc.loadSeed();
    const r = await request(createApp()).get('/');
    console.log(JSON.stringify({ status: r.status, html: /id="root"/.test(r.text || '') }));`;
  const out = spawnSync(process.execPath, ['--disable-warning=ExperimentalWarning', '--input-type=module', '-e', script],
    { cwd: ROOT, env: { ...process.env, NODE_ENV: 'production' }, encoding: 'utf8' });
  try {
    const j = JSON.parse(out.stdout.trim().split('\n').pop());
    return { ok: j.status === 200 && j.html, detail: j.html ? '' : 'GET / ได้ JSON แทนหน้าเว็บ — ย้าย route ต้อนรับไปไว้ที่ /api' };
  } catch { return { ok: false, detail: 'รันโหมด production ไม่ได้' }; }
})();
rec('CP39', 'inclass', 'production: เปิด / แล้วได้หน้าเว็บ (ไม่ใช่ JSON)', prodRoot.ok, prodRoot.detail);

// (ข) bundle ต้องไม่ฝัง localhost — ไม่งั้นเบราว์เซอร์ผู้ใช้จะยิงไปหาเครื่องตัวเอง
const distAssets = path.join(ROOT, 'frontend/dist/assets');
const bundleHasLocalhost = existsSync(distAssets) &&
  readdirSync(distAssets).filter((f) => f.endsWith('.js'))
    .some((f) => readFileSync(path.join(distAssets, f), 'utf8').includes('localhost:3001'));
rec('CP39', 'inclass', 'bundle production ไม่ฝัง localhost:3001 (ใช้ path สัมพัทธ์)',
  existsSync(distAssets) && !bundleHasLocalhost,
  !existsSync(distAssets) ? 'ยังไม่ได้ build' : 'bundle มี localhost:3001 — เพิ่ม frontend/.env.production');
const fpkg = await read('frontend/package.json');
rec('CP39', 'takehome', 'frontend มี build script', has(fpkg, '"build"'));
rec('CP39', 'takehome', 'frontend build แล้ว (มี dist/)', existsSync(path.join(ROOT, 'frontend/dist/index.html')));

// ── พฤติกรรมจริง ──
let app0 = null, request = null;
try {
  const svcMod = await import('./api/src/services/requestService.js');
  const appMod = await import('./api/src/app.js');
  request = await loadSupertest();
  await svcMod.loadSeed();
  app0 = appMod.createApp();
} catch (e) { console.log(`\n[!] เปิด API ไม่ได้: ${e.message}\n`); }

const safe = async (fn) => { try { return await fn(); } catch (e) { return { status: 0, body: {}, _e: e.message }; } };
if (app0) {
  let r = await safe(() => request(app0).get('/api/health'));
  rec('CP37', 'inclass', 'GET /api/health ตอบ 200 + status ok',
    r.status === 200 && r.body?.status === 'ok', `ได้ ${r.status}`);
  rec('CP37', 'inclass', 'health บอก env และ database', !!r.body?.env && !!r.body?.database, '');
  r = await safe(() => request(app0).get('/api/requests'));
  rec('CP35', 'inclass', 'ระบบยังคืนข้อมูลได้ (integration ไม่พัง)',
    r.status === 200 && Array.isArray(r.body) && r.body.length > 0, `ได้ ${r.status}`);
  r = await safe(() => request(app0).get('/api/nope'));
  rec('CP38', 'takehome', 'route ที่ไม่มี → 404 (notFound ทำงาน)', r.status === 404, `ได้ ${r.status}`);
} else {
  // ⚠ บันทึกครบทุกข้อเหมือนกรณีเปิดได้ — ตัวหารต้องคงที่เสมอ
  rec('CP37','inclass','GET /api/health ตอบ 200 + status ok',false,'เปิด API ไม่ได้');
  rec('CP37','inclass','health บอก env และ database',false,'เปิด API ไม่ได้');
  rec('CP35','inclass','ระบบยังคืนข้อมูลได้ (integration ไม่พัง)',false,'เปิด API ไม่ได้');
  rec('CP38','takehome','route ที่ไม่มี → 404 (notFound ทำงาน)',false,'เปิด API ไม่ได้');
}

// ── CP40 · README ──
const readme = await read('README.md');
rec('CP40', 'takehome', 'มี README.md', readme.length > 0);
rec('CP40', 'takehome', 'README อธิบายสถาปัตยกรรม 3 ชั้น',
  /3 ชั้น|three|frontend.*api.*database|สถาปัตยกรรม/i.test(readme) && readme.length > 600);
rec('CP40', 'takehome', 'README มีวิธีรัน (npm)', has(readme, 'npm (run|install)'));

// ── CP41 · อ่านเพิ่มเติม (ตอบคำถาม) ──
const notes = await read('DATABASE_CHOICES.md');
rec('CP41', 'takehome', 'มีบันทึกคำตอบ DATABASE_CHOICES.md', notes.length > 0);
rec('CP41', 'takehome', 'ตอบเรื่อง SQLite/NoSQL/async',
  /sqlite/i.test(notes) && /nosql|mongo/i.test(notes) && /async/i.test(notes) && notes.length > 400);

// ── CP42 · demo ──
rec('CP42', 'takehome', 'มีหลักฐานสาธิต (DEMO.md หรือลิงก์วิดีโอ)',
  existsSync(path.join(ROOT, 'DEMO.md')) || has(readme, 'youtu|drive\\.google|loom|วิดีโอ|demo'));

// ── CP43 · จำลอง production (ทาง B บังคับ) + เตรียม deploy ──
rec('CP43', 'takehome', 'frontend build แล้ว (จำลอง production ได้)', existsSync(path.join(ROOT, 'frontend/dist/index.html')));
rec('CP43', 'takehome', 'app.js เสิร์ฟ static ตอน production (พอร์ตเดียว)', has(app, 'static') && has(app, 'staticDir|dist'));
const envProd = await read('frontend/.env.production');
rec('CP43', 'takehome', 'มี frontend/.env.production (VITE_API_BASE_URL ว่าง)', /VITE_API_BASE_URL=\s*$/m.test(envProd));
const rootPkg = await read('package.json');
rec('CP43', 'takehome', 'root package.json มี script build + start (build ใช้ --include=dev)',
  has(rootPkg, '"build"') && has(rootPkg, '"start"') && has(rootPkg, 'include=dev'));
rec('CP43', 'takehome', 'มีไฟล์เตรียม deploy จริง (render.yaml — สำหรับ Challenge)',
  existsSync(path.join(ROOT, 'render.yaml')) || existsSync(path.join(ROOT, 'api/.env.example')));

// ── ⭐ Challenge ──
rec('CHAL', 'challenge', '⭐ มี deploy config จริง (render.yaml/Procfile/Dockerfile)',
  existsSync(path.join(ROOT, 'render.yaml')) || existsSync(path.join(ROOT, 'Procfile')) || existsSync(path.join(ROOT, 'Dockerfile')));
const ry = await read('render.yaml');
rec('CHAL', 'challenge', '⭐ render.yaml ตามสเปกปัจจุบัน (runtime · rootDir · healthCheckPath · NODE_VERSION)',
  has(ry, 'runtime:\\s*node') && has(ry, 'rootDir:') && has(ry, 'healthCheckPath:') && has(ry, 'NODE_VERSION'));
rec('CHAL', 'challenge', '⭐ health check บอก uptime', has(health, 'uptime'));
rec('CHAL', 'challenge', '⭐ มี CI (.github/workflows)', existsSync(path.join(ROOT, '.github/workflows')));

// ── รายงาน ──
const shown = INCLASS ? results.filter((r) => r.scope === 'inclass') : results;
console.log('');
for (const r of shown) console.log(`${r.ok ? '✅' : '[TODO]'} ${r.id} ${r.name}${r.detail && !r.ok ? ' — ' + r.detail : ''}`);
const grp = (s) => results.filter((r) => r.scope === s);
const p = (a) => a.filter((x) => x.ok).length;
const ic = grp('inclass'), th = grp('takehome'), ch = grp('challenge');
console.log('\n' + '─'.repeat(58));
console.log(`🏫 ในห้อง (CP35–CP39)   ผ่าน ${p(ic)}/${ic.length} รายการ`);
if (!INCLASS) {
  console.log(`🏠 ที่บ้าน (CP40–CP43)   ผ่าน ${p(th)}/${th.length} รายการ`);
  console.log(`⭐ Challenge            ผ่าน ${p(ch)}/${ch.length} รายการ`);
  console.log('─'.repeat(58));
  console.log(`ผ่าน ${p(results)}/${results.length} รายการ`);
}
console.log('\nหมายเหตุ: checker ตรวจว่าระบบพร้อมใช้จริง แต่ตรวจไม่ได้ว่าเข้าใจ');
console.log('ผู้สอนจะสุ่มถามให้อธิบายว่า dev ต่างจาก production อย่างไร');
