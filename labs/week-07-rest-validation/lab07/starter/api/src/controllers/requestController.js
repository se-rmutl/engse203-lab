import * as service from '../services/requestService.js';

/** controller รู้จัก req/res และตัดสิน status code — แต่ไม่จัดการข้อมูลเอง */

export function listRequests(req, res) {
  const { status } = req.query;
  res.status(200).json(service.findAll({ status }));
}

export function getRequest(req, res) {
  const found = service.findById(req.params.id);
  if (!found) {
    return res.status(404).json({ error: `ไม่พบคำร้องรหัส ${req.params.id}` });
  }
  res.status(200).json(found);
}

export function createRequest(req, res) {
  const created = service.create(req.body);
  res.status(201).json(created);
}

export function updateRequestStatus(req, res) {
  const ALLOWED = ['pending', 'in-progress', 'completed'];
  const { status } = req.body ?? {};
  if (!ALLOWED.includes(status)) {
    return res.status(400).json({ error: 'สถานะต้องเป็น pending, in-progress หรือ completed' });
  }
  const updated = service.updateStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ error: `ไม่พบคำร้องรหัส ${req.params.id}` });
  }
  res.status(200).json(updated);
}

export function deleteRequest(req, res) {
  const removed = service.remove(req.params.id);
  if (!removed) {
    return res.status(404).json({ error: `ไม่พบคำร้องรหัส ${req.params.id}` });
  }
  res.status(204).end();
}
