export const STORAGE_KEY = 'engse203-campus-requests-v1';
export const SCHEMA_VERSION = 1;

const priorities = new Set(['normal', 'urgent']);
const statuses = new Set(['pending', 'in-progress', 'completed']);

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidRequest(request) {
  return Boolean(
    request
      && isNonEmptyString(request.id)
      && request.id.startsWith('REQ-')
      && typeof request.requesterName === 'string'
      && request.requesterName.trim().length >= 2
      && isNonEmptyString(request.requestType)
      && isNonEmptyString(request.location)
      && typeof request.details === 'string'
      && request.details.trim().length >= 10
      && priorities.has(request.priority)
      && statuses.has(request.status),
  );
}

function validateRequests(requests) {
  if (!Array.isArray(requests) || !requests.every(isValidRequest)) return false;
  return new Set(requests.map((request) => request.id)).size === requests.length;
}

export function readStoredRequests() {
  const rawValue = localStorage.getItem(STORAGE_KEY);
  if (rawValue === null) return { status: 'missing' };

  try {
    const envelope = JSON.parse(rawValue);
    if (
      !envelope
      || envelope.schemaVersion !== SCHEMA_VERSION
      || !validateRequests(envelope.requests)
    ) {
      return { status: 'invalid', reason: 'รูปแบบหรือเวอร์ชันข้อมูลไม่ถูกต้อง' };
    }

    return { status: 'valid', requests: structuredClone(envelope.requests) };
  } catch {
    return { status: 'invalid', reason: 'ข้อมูลที่บันทึกไว้ไม่ใช่ JSON ที่อ่านได้' };
  }
}

export function writeStoredRequests(requests) {
  if (!validateRequests(requests)) {
    throw new Error('ไม่สามารถบันทึกข้อมูลคำร้องที่ไม่ตรง schema ได้');
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    schemaVersion: SCHEMA_VERSION,
    updatedAt: new Date().toISOString(),
    requests: structuredClone(requests),
  }));
}

export function clearStoredRequests() {
  localStorage.removeItem(STORAGE_KEY);
}
