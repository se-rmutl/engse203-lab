import { DatabaseSync } from 'node:sqlite';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Week 10 — เปลี่ยนจากอ่านไฟล์ JSON เป็นฐานข้อมูล SQLite
 *
 * ⚠ สังเกตว่า signature ของทุกฟังก์ชันเหมือน Week 07 ทุกตัว
 *   → controller ไม่ต้องแก้เลย · frontend ไม่ต้องแก้เลย
 *   นี่คือครั้งที่ 4 ที่เราเปลี่ยนแหล่งข้อมูลโดยแก้แค่ชั้นเดียว
 */

// ⚠ path ต้องอ้างจากตำแหน่งไฟล์นี้ ไม่ใช่จากที่ที่รันคำสั่ง
//   ไม่งั้น `npm run dev` (รันจาก api/) กับ checker (รันจาก root) จะหาไฟล์คนละที่
const HERE = path.dirname(fileURLToPath(import.meta.url));
const API_ROOT = path.resolve(HERE, '../..');
const DB_FILE = process.env.DB_FILE ?? path.join(API_ROOT, 'data', 'campus.db');
const SCHEMA_FILE = path.join(API_ROOT, 'data', 'schema.sql');

let db;
let driver = 'sqlite';

/**
 * ⭐⭐ Challenge Turso — เลือกฐานข้อมูลจาก env (แนวคิดเดียวกับ config ในบทที่ 3)
 *   ไม่มี TURSO_DATABASE_URL → ไฟล์ campus.db ในเครื่อง (node:sqlite) เหมือนเดิม
 *   มี TURSO_DATABASE_URL    → ต่อ Turso ผ่านเน็ต (libsql · prepare/all/get/run หน้าตาเดียวกัน)
 *
 * ⚠ ข้อมูลบน Turso ไม่หายเมื่อ Render restart — เพราะฐานข้อมูลอยู่คนละเครื่องกับ API
 *
 * ข้อควรระวัง
 *   • ใช้แพ็กเกจ `libsql` (sync) ไม่ใช่ `@libsql/client` (async — จะกระทบ controller ทั้งชุด)
 *   • dynamic import → เครื่องที่ไม่ได้ติดตั้ง libsql (checker · npm test) ยังใช้ node:sqlite ได้
 *   • libsql ต้องอยู่ใน dependencies ของ api · script build ต้องมี npm install --prefix api
 *   • URL/token อยู่ใน api/.env หรือ Environment ของ Render เท่านั้น — ไม่ใส่ใน .env.example
 */
async function openDatabase() {
  const url = process.env.TURSO_DATABASE_URL;
  if (url) {
    const { default: Database } = await import('libsql');   // โหลดเฉพาะตอนใช้ Turso
    driver = 'turso';
    return new Database(url, { authToken: process.env.TURSO_AUTH_TOKEN });
  }
  driver = 'sqlite';
  return new DatabaseSync(DB_FILE);
}

/**
 * คืนข้อมูลในรูปแบบเดียวกับที่ API เคยส่งตั้งแต่ Week 05
 * ฐานข้อมูลเก็บ requester_id (ตัวเลข) แต่ frontend ต้องการ requesterName (ชื่อ)
 * → ใช้ JOIN + AS แปลงให้ตรงกัน (นี่คือหน้าที่ของ service)
 */
const SELECT_SHAPE = `
  SELECT r.id,
         u.name          AS requesterName,
         r.request_type  AS requestType,
         r.location,
         r.details,
         r.priority,
         r.status
  FROM requests r
  JOIN users u ON u.id = r.requester_id`;

export async function loadSeed() {
  db = await openDatabase();
  db.exec('PRAGMA foreign_keys = ON');   // ⚠ ต้องเปิดทุกครั้งที่เปิดฐานข้อมูล
  // ถ้ายังไม่มีตาราง (ไฟล์ฐานข้อมูลใหม่) ให้สร้างจาก schema.sql
  const ready = db.prepare(
    "SELECT COUNT(*) c FROM sqlite_master WHERE type='table' AND name='requests'"
  ).get().c;
  if (!ready && existsSync(SCHEMA_FILE)) {
    db.exec(readFileSync(SCHEMA_FILE, 'utf8'));
  }
}


/** สถานะฐานข้อมูล — ใช้โดย health check (CP37) */
export function getDbStatus() {
  try {
    if (!db) return { connected: false, reason: 'ยังไม่ได้เปิดฐานข้อมูล' };
    const n = db.prepare("SELECT COUNT(*) c FROM sqlite_master WHERE type='table'").get().c;
    return { connected: true, driver, tables: n };
  } catch (e) {
    return { connected: false, reason: e.message };
  }
}

export function findAll({ status } = {}) {
  return status
    ? db.prepare(`${SELECT_SHAPE} WHERE r.status = ? ORDER BY r.id`).all(status)
    : db.prepare(`${SELECT_SHAPE} ORDER BY r.id`).all();
}

export function findById(id) {
  return db.prepare(`${SELECT_SHAPE} WHERE r.id = ?`).get(id) ?? null;
}

/** สร้างรหัสคำร้องถัดไป เช่น REQ-006 */
function nextId() {
  // รหัสถัดไป = จำนวนคำร้องที่มีอยู่ + 1  (ปรับให้เรียบง่ายขึ้นในรุ่นนี้)
  const row = db.prepare(
    "SELECT id FROM requests WHERE id LIKE 'REQ-%' ORDER BY id DESC LIMIT 1"
  ).get();
  const n = row ? Number(String(row.id).replace('REQ-', '')) + 1 : 1;
  return `REQ-${String(n).padStart(3, '0')}`;
}

/**
 * แปลงชื่อผู้แจ้งเป็น id — ถ้ายังไม่มีในระบบก็สร้างให้อัตโนมัติ
 * frontend ส่งชื่อมา แต่ฐานข้อมูลเก็บเป็น id → service แปลงตรงนี้
 */
function resolveUserId(name) {
  const found = db.prepare('SELECT id FROM users WHERE name = ?').get(name);
  if (found) return found.id;
  const slug = Date.now().toString(36);
  return db.prepare('INSERT INTO users (name, department, email) VALUES (?, ?, ?)')
           .run(name, 'ไม่ระบุ', `user-${slug}@rmutl.ac.th`).lastInsertRowid;
}

export function create(input) {
  const id = nextId();
  // ⭐ ใช้ transaction — ถ้าสร้าง user ใหม่แล้ว insert request ล้มเหลว
  //   ให้ยกเลิกทั้งคู่ ไม่ให้เหลือ user ที่ไม่มีคำร้อง (BEGIN/COMMIT/ROLLBACK)
  db.exec('BEGIN');
  try {
    const requesterId = resolveUserId(input.requesterName.trim());
    db.prepare(
      `INSERT INTO requests (id, requester_id, request_type, location, details, priority)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(id, requesterId, input.requestType,
          input.location.trim(), input.details.trim(), input.priority ?? 'normal');
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
  return findById(id);
}

export function updateStatus(id, status) {
  const result = db.prepare('UPDATE requests SET status = ? WHERE id = ?').run(status, id);
  return result.changes ? findById(id) : null;
}

export function remove(id) {
  const target = findById(id);
  if (!target) return null;
  db.prepare('DELETE FROM requests WHERE id = ?').run(id);
  return target;
}

/** รายชื่อผู้ใช้ (ไม่ส่งอีเมลออกไป) */
export function listUsers() {
  return db.prepare('SELECT id, name, department FROM users ORDER BY id').all();
}

/** คำร้องทั้งหมดของผู้ใช้คนหนึ่ง */
export function listRequestsByUser(userId) {
  return db.prepare(
    `SELECT r.id, r.request_type AS requestType, r.status
     FROM requests r WHERE r.requester_id = ? ORDER BY r.id`
  ).all(userId);
}
