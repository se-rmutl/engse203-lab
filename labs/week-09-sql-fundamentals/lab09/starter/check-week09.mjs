#!/usr/bin/env node
/**
 * ENGSE203 Week 09 — Checker
 * ตรวจฐานข้อมูลและไฟล์ SQL ที่นักศึกษาสร้าง
 *
 * ใช้:  node check-week09.mjs
 *      node check-week09.mjs --inclass    (เฉพาะ CP17–CP21 ที่ทำในห้อง)
 */
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const INCLASS = process.argv.includes('--inclass');
const results = [];
const rec = (id, scope, name, ok, detail = '') => results.push({ id, scope, name, ok, detail });

const read = (p) => { try { return readFileSync(path.join(ROOT, p), 'utf8'); } catch { return ''; } };
/** ลบคอมเมนต์ SQL ก่อนตรวจ เพื่อไม่ให้ตัวอย่างในคอมเมนต์ถูกนับว่าทำแล้ว */
const strip = (s) => s.replace(/--[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
const has = (s, ...frags) => frags.every((f) => new RegExp(f, 'i').test(s));

// ── โหลดฐานข้อมูล ──
let db = null;
const DB_FILE = 'campus.db';
if (existsSync(path.join(ROOT, DB_FILE))) {
  try { db = new DatabaseSync(path.join(ROOT, DB_FILE)); db.exec('PRAGMA foreign_keys = ON'); }
  catch (e) { console.log(`\n❌ เปิด ${DB_FILE} ไม่ได้: ${e.message}\n`); }
}
const all = (sql) => { try { return db.prepare(sql).all(); } catch { return null; } };
const one = (sql) => { try { return db.prepare(sql).get(); } catch { return null; } };

// ══ โครงสร้างไฟล์ ══
rec('FILE', 'inclass', `มีไฟล์ ${DB_FILE}`, !!db, 'ยังไม่ได้สร้างฐานข้อมูล');
rec('FILE', 'takehome', 'มีไฟล์ schema.sql', existsSync(path.join(ROOT, 'schema.sql')));

const sql = strip(read('schema.sql'));

// ══ CP18–CP19 · ออกแบบและสร้างตาราง ══
// บันทึกทุกรายการเสมอ เพื่อให้ตัวหารคงที่ไม่ว่าจะมีฐานข้อมูลหรือไม่
const tables = db ? (all("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'") ?? []).map((r) => r.name) : [];
const ucols  = db ? (all('PRAGMA table_info(users)') ?? []).map((c) => c.name) : [];
const rcolsI = db ? (all('PRAGMA table_info(requests)') ?? []) : [];
const rcols  = rcolsI.map((c) => c.name);
const fks    = db ? (all('PRAGMA foreign_key_list(requests)') ?? []) : [];
const nu     = db ? (one('SELECT COUNT(*) c FROM users')?.c ?? 0) : 0;
const nr     = db ? (one('SELECT COUNT(*) c FROM requests')?.c ?? 0) : 0;
const NODB   = 'ยังไม่มีฐานข้อมูล';

rec('CP19', 'inclass', 'มีตาราง users', tables.includes('users'),
  db ? `พบตาราง: ${tables.join(', ') || 'ไม่มีเลย'}` : NODB);
rec('CP19', 'inclass', 'มีตาราง requests', tables.includes('requests'), db ? '' : NODB);
rec('CP19', 'inclass', 'users มีคอลัมน์ id, name, department',
  ['id', 'name', 'department'].every((c) => ucols.includes(c)), db ? `พบ: ${ucols.join(', ')}` : NODB);
rec('CP19', 'inclass', 'requests มีคอลัมน์ครบตามที่ออกแบบ',
  ['id', 'requester_id', 'request_type', 'location', 'details', 'priority', 'status'].every((c) => rcols.includes(c)),
  db ? `พบ: ${rcols.join(', ')}` : NODB);
rec('CP18', 'inclass', 'ทั้งสองตารางมี Primary Key',
  db && (all('PRAGMA table_info(users)') ?? []).some((c) => c.pk === 1) && rcolsI.some((c) => c.pk === 1),
  db ? '' : NODB);
rec('CP18', 'inclass', 'requests มี Foreign Key ชี้ไป users',
  fks.some((f) => f.table === 'users'),
  db ? 'นี่คือจุดสำคัญที่สุดของการแยก 2 ตาราง' : NODB);
rec('CP19', 'takehome', 'requests มีคอลัมน์ NOT NULL อย่างน้อย 5 คอลัมน์',
  rcolsI.filter((c) => c.notnull === 1).length >= 5,
  db ? `พบ ${rcolsI.filter((c) => c.notnull === 1).length}` : NODB);
rec('CP19', 'inclass', 'มีข้อมูลใน users อย่างน้อย 4 คน', nu >= 4, db ? `พบ ${nu}` : NODB);
rec('CP19', 'inclass', 'มีข้อมูลใน requests อย่างน้อย 5 รายการ', nr >= 5, db ? `พบ ${nr}` : NODB);
rec('CP22', 'takehome', 'เพิ่มข้อมูลเองแล้ว — requests อย่างน้อย 8 รายการ', nr >= 8, db ? `พบ ${nr}` : NODB);

const joined = db ? all('SELECT r.id, u.name FROM requests r JOIN users u ON u.id = r.requester_id') : null;
rec('CP21', 'inclass', 'JOIN ระหว่าง requests กับ users ทำงานได้',
  Array.isArray(joined) && joined.length > 0,
  db ? 'ถ้าไม่ผ่านแปลว่า requester_id ไม่ตรงกับ users.id' : NODB);

const orphan = db ? (one(`SELECT COUNT(*) c FROM requests r
  LEFT JOIN users u ON u.id = r.requester_id WHERE u.id IS NULL`)?.c ?? -1) : -1;
rec('CP21', 'inclass', 'ไม่มีคำร้องที่ชี้ไปผู้ใช้ที่ไม่มีจริง', orphan === 0,
  db ? `พบ ${orphan} รายการ` : NODB);

const rejects = (s2) => { if (!db) return false; try { db.prepare(s2).run(); return false; } catch { return true; } };
rec('CP25', 'takehome', 'Foreign Key ปฏิเสธ requester_id ที่ไม่มีจริง',
  rejects(`INSERT INTO requests (id,requester_id,request_type,location,details)
           VALUES ('__T1__',99999,'แจ้งซ่อม','x','ทดสอบระบบยาวพอ')`), db ? '' : NODB);
rec('CP25', 'takehome', 'ปฏิเสธ id ที่ซ้ำกับของเดิม',
  rejects(`INSERT INTO requests (id,requester_id,request_type,location,details)
           SELECT id, requester_id, request_type, location, details FROM requests LIMIT 1`), db ? '' : NODB);
if (db) { try { db.prepare("DELETE FROM requests WHERE id LIKE '__T%__'").run(); } catch { /* ไม่เป็นไร */ } }

// ══ CP23 · schema.sql รันใหม่ได้ ══
rec('CP23', 'takehome', 'schema.sql มี CREATE TABLE ทั้งสองตาราง',
  has(sql, 'create\\s+table.*users', 'create\\s+table.*requests'));
rec('CP23', 'takehome', 'schema.sql มี FOREIGN KEY หรือ REFERENCES',
  has(sql, 'foreign\\s+key|references'));
rec('CP23', 'takehome', 'schema.sql รันซ้ำได้ (มี DROP TABLE IF EXISTS)',
  has(sql, 'drop\\s+table\\s+if\\s+exists'), 'ไม่งั้นรันครั้งที่สองจะ error');
rec('CP23', 'takehome', 'schema.sql มี INSERT ข้อมูลตั้งต้น', has(sql, 'insert\\s+into'));

// ตรวจว่า schema.sql รันได้จริง — สำคัญกว่าการอ่านข้อความ
if (sql.trim()) {
  try {
    const t = new DatabaseSync(':memory:');
    t.exec('PRAGMA foreign_keys = ON');
    t.exec(readFileSync(path.join(ROOT, 'schema.sql'), 'utf8'));
    const n = t.prepare("SELECT COUNT(*) c FROM sqlite_master WHERE type='table'").get().c;
    rec('CP23', 'takehome', 'schema.sql รันจริงแล้วสร้างฐานข้อมูลได้', n >= 2, `สร้างได้ ${n} ตาราง`);
  } catch (e) {
    rec('CP23', 'takehome', 'schema.sql รันจริงแล้วสร้างฐานข้อมูลได้', false, e.message.slice(0, 70));
  }
} else {
  rec('CP23', 'takehome', 'schema.sql รันจริงแล้วสร้างฐานข้อมูลได้', false, 'ไม่มีไฟล์');
}

// ══ CP24 · เอกสาร ══
const doc = read('DATA_MODEL.md');
rec('CP24', 'takehome', 'มีไฟล์ DATA_MODEL.md', doc.length > 0);
rec('CP24', 'takehome', 'อธิบายเหตุผลที่แยก users ออกจาก requests',
  /แยก|ตาราง|foreign key/i.test(doc) && doc.length > 400, `ความยาว ${doc.length} ตัวอักษร`);

// ══ CP22 · ไฟล์คำสั่ง query ══
const qs = strip(read('queries.sql'));
rec('CP22', 'takehome', 'มีไฟล์ queries.sql', qs.length > 0);
const qcount = (qs.match(/select/gi) ?? []).length;
rec('CP22', 'takehome', 'queries.sql มีคำสั่ง SELECT อย่างน้อย 8 ข้อ', qcount >= 8, `พบ ${qcount}`);
rec('CP22', 'takehome', 'queries.sql มีการใช้ JOIN', has(qs, 'join'));
rec('CP22', 'takehome', 'queries.sql มีการใช้ WHERE และ ORDER BY', has(qs, 'where') && has(qs, 'order\\s+by'));

// ══ ⭐ Challenge ══
rec('CHAL', 'challenge', '⭐ ใช้ GROUP BY สรุปข้อมูล', has(qs, 'group\\s+by'));
rec('CHAL', 'challenge', '⭐ ใช้ฟังก์ชันรวม (COUNT/SUM/AVG)', has(qs, 'count\\s*\\(|sum\\s*\\(|avg\\s*\\('));
rec('CHAL', 'challenge', '⭐ สร้าง INDEX เพื่อให้ค้นเร็วขึ้น', has(sql + qs, 'create\\s+index'));

// ── รายงานผล ──
const shown = INCLASS ? results.filter((r) => r.scope === 'inclass') : results;
console.log('');
for (const r of shown) console.log(`${r.ok ? '✅' : '[TODO]'} ${r.id} ${r.name}${r.detail && !r.ok ? ' — ' + r.detail : ''}`);

const grp = (s) => results.filter((r) => r.scope === s);
const p = (a) => a.filter((x) => x.ok).length;
const ic = grp('inclass'), th = grp('takehome'), ch = grp('challenge');
console.log('\n' + '─'.repeat(58));
console.log(`🏫 ในห้อง (CP17–CP21)   ผ่าน ${p(ic)}/${ic.length} รายการ`);
if (!INCLASS) {
  console.log(`🏠 ที่บ้าน (CP22–CP25)   ผ่าน ${p(th)}/${th.length} รายการ`);
  console.log(`⭐ Challenge            ผ่าน ${p(ch)}/${ch.length} รายการ`);
  console.log('─'.repeat(58));
  console.log(`ผ่าน ${p(results)}/${results.length} รายการ`);
}
console.log('\nหมายเหตุ: checker ตรวจโครงสร้างและข้อมูลได้ แต่ตรวจไม่ได้ว่าคุณเข้าใจหรือไม่');
console.log('ผู้สอนจะสุ่มถามให้เขียน query สดจากฐานข้อมูลของคุณเอง');
