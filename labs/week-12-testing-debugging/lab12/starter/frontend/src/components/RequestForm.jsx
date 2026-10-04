import { useState } from 'react';

const emptyForm = {
  requesterName: '',
  requestType: '',
  location: '',
  details: '',
  priority: 'normal',
};

function validate(form) {
  const errors = {};
  if (form.requesterName.trim().length < 2) errors.requesterName = 'กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร';
  if (!form.requestType) errors.requestType = 'กรุณาเลือกประเภทคำร้อง';
  if (!form.location.trim()) errors.location = 'กรุณาระบุสถานที่';
  if (form.details.trim().length < 10) errors.details = 'กรุณากรอกรายละเอียดอย่างน้อย 10 ตัวอักษร';
  if (!['normal', 'urgent'].includes(form.priority)) errors.priority = 'กรุณาเลือกความเร่งด่วน';
  return errors;
}

function FieldError({ id, message }) {
  return <small className="error" id={id}>{message ?? ''}</small>;
}

function RequestForm({ onAddRequest }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState('idle');
  const [feedback, setFeedback] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setFeedback('กรุณาตรวจข้อมูลที่ระบุ');
      return;
    }

    try {
      setSubmitState('submitting');
      setFeedback('กำลังบันทึกคำร้อง…');
      await onAddRequest(form);
      setForm(emptyForm);
      setFeedback('บันทึกคำร้องแล้ว');
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'บันทึกคำร้องไม่สำเร็จ');
    } finally {
      setSubmitState('idle');
    }
  }

  function inputA11y(fieldName) {
    return {
      'aria-invalid': Boolean(errors[fieldName]),
      'aria-describedby': errors[fieldName] ? `${fieldName}-error` : undefined,
    };
  }

  return (
    <form data-testid="request-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="requesterName">ชื่อผู้แจ้ง</label>
        <input id="requesterName" name="requesterName" value={form.requesterName} onChange={handleChange} {...inputA11y('requesterName')} />
        <FieldError id="requesterName-error" message={errors.requesterName} />
      </div>
      <div className="field">
        <label htmlFor="requestType">ประเภทคำร้อง</label>
        <select id="requestType" name="requestType" value={form.requestType} onChange={handleChange} {...inputA11y('requestType')}>
          <option value="">-- เลือกประเภท --</option>
          <option value="แจ้งซ่อม">แจ้งซ่อม</option>
          <option value="ขอใช้ห้อง">ขอใช้ห้อง</option>
          <option value="บริการบัญชีผู้ใช้">บริการบัญชีผู้ใช้</option>
        </select>
        <FieldError id="requestType-error" message={errors.requestType} />
      </div>
      <div className="field">
        <label htmlFor="location">สถานที่</label>
        <input id="location" name="location" value={form.location} onChange={handleChange} {...inputA11y('location')} />
        <FieldError id="location-error" message={errors.location} />
      </div>
      <div className="field">
        <label htmlFor="details">รายละเอียด</label>
        <textarea id="details" name="details" rows="4" value={form.details} onChange={handleChange} {...inputA11y('details')} />
        <FieldError id="details-error" message={errors.details} />
      </div>
      <fieldset className="field">
        <legend>ความเร่งด่วน</legend>
        <label className="radio-label"><input type="radio" name="priority" value="normal" checked={form.priority === 'normal'} onChange={handleChange} /> ปกติ</label>
        <label className="radio-label"><input type="radio" name="priority" value="urgent" checked={form.priority === 'urgent'} onChange={handleChange} /> เร่งด่วน</label>
        <FieldError id="priority-error" message={errors.priority} />
      </fieldset>
      <button className="button primary" type="submit" disabled={submitState === 'submitting'}>
        {submitState === 'submitting' ? 'กำลังบันทึก…' : 'เพิ่มคำร้อง'}
      </button>
      <p className="status" role={feedback.includes('ไม่') ? 'alert' : 'status'}>{feedback}</p>
    </form>
  );
}

export default RequestForm;
