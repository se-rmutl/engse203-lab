function RequestForm({ onAddRequest }) {
  function handleSubmit(event) {
    event.preventDefault();
    // TODO LAB4-R05–R07: validate controlled state แล้วเรียก onAddRequest
    onAddRequest({});
  }

  return (
    <section className="panel" aria-labelledby="request-form-title">
      <p className="eyebrow dark">CONTROLLED FORM</p>
      <h2 id="request-form-title">สร้างคำร้องใหม่</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="requesterName">ชื่อผู้แจ้ง</label>
          <input id="requesterName" name="requesterName" />
          <small className="error" id="requesterName-error"></small>
        </div>

        <div className="field">
          <label htmlFor="requestType">ประเภทคำร้อง</label>
          <select id="requestType" name="requestType" defaultValue="">
            <option value="">-- เลือกประเภท --</option>
            <option value="แจ้งซ่อม">แจ้งซ่อม</option>
            <option value="ขอใช้ห้อง">ขอใช้ห้อง</option>
            <option value="บริการบัญชีผู้ใช้">บริการบัญชีผู้ใช้</option>
          </select>
          <small className="error" id="requestType-error"></small>
        </div>

        <div className="field">
          <label htmlFor="location">สถานที่</label>
          <input id="location" name="location" />
          <small className="error" id="location-error"></small>
        </div>

        <div className="field">
          <label htmlFor="details">รายละเอียด</label>
          <textarea id="details" name="details" rows="4"></textarea>
          <small className="error" id="details-error"></small>
        </div>

        <fieldset className="field">
          <legend>ความเร่งด่วน</legend>
          <label><input type="radio" name="priority" value="normal" defaultChecked /> ปกติ</label>
          <label><input type="radio" name="priority" value="urgent" /> เร่งด่วน</label>
          <small className="error" id="priority-error"></small>
        </fieldset>

        <button type="submit">เพิ่มคำร้อง</button>
        <p className="status" role="status">TODO: feedback</p>
      </form>
    </section>
  );
}

export default RequestForm;

