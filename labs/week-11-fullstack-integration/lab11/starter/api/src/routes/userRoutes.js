import { Router } from 'express';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ⭐ Challenge — endpoint สำหรับดูผู้ใช้และคำร้องของแต่ละคน
const HERE = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = process.env.DB_FILE ?? path.join(HERE, '../../data/campus.db');
const router = Router();

function db() {
  const d = new DatabaseSync(DB_FILE);
  d.exec('PRAGMA foreign_keys = ON');
  return d;
}

router.get('/', (req, res) => {
  res.json(db().prepare('SELECT id, name, department FROM users ORDER BY id').all());
});

router.get('/:id/requests', (req, res) => {
  const rows = db().prepare(
    `SELECT r.id, r.request_type AS requestType, r.status
     FROM requests r WHERE r.requester_id = ? ORDER BY r.id`
  ).all(Number(req.params.id));
  res.json(rows);
});

export default router;
