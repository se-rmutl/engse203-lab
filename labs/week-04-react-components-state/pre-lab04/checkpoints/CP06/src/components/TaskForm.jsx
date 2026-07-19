import { useState } from 'react';

const initialFormData = {
  title: '',
  category: '',
  priority: 'normal',
};

function validateTask(formData) {
  const errors = {};

  if (formData.title.trim().length < 3) {
    errors.title = 'กรุณาระบุชื่องานอย่างน้อย 3 ตัวอักษร';
  }

  if (!formData.category) {
    errors.category = 'กรุณาเลือกประเภทงาน';
  }

  return errors;
}

export { validateTask };

function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setFeedback('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateTask(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFeedback('ยังเพิ่มงานไม่ได้ กรุณาตรวจข้อมูลที่ระบุ');
      return;
    }

    onAddTask({
      ...formData,
      title: formData.title.trim(),
    });
    setFormData(initialFormData);
    setFeedback('เพิ่มงานใหม่เรียบร้อยแล้ว');
  }

  return (
    <section className="panel" aria-labelledby="task-form-title">
      <p className="eyebrow dark">CONTROLLED FORM</p>
      <h2 id="task-form-title">เพิ่มงานฝึก</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="title">ชื่องาน</label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            aria-invalid={Boolean(errors.title)}
            aria-describedby="title-error"
          />
          <small className="error" id="title-error">
            {errors.title}
          </small>
        </div>

        <div className="field">
          <label htmlFor="category">ประเภท</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            aria-invalid={Boolean(errors.category)}
            aria-describedby="category-error"
          >
            <option value="">-- เลือกประเภท --</option>
            <option value="reading">อ่าน/ทบทวน</option>
            <option value="coding">เขียนโค้ด</option>
            <option value="review">ตรวจและอธิบาย</option>
          </select>
          <small className="error" id="category-error">
            {errors.category}
          </small>
        </div>

        <div className="field">
          <label htmlFor="priority">ความสำคัญ</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="normal">ปกติ</option>
            <option value="high">สำคัญ</option>
          </select>
        </div>

        <button type="submit">เพิ่มงาน</button>
        <p className="status" role="status">
          {feedback}
        </p>
      </form>
    </section>
  );
}

export default TaskForm;
