const form = document.querySelector('#profile-form');
const status = document.querySelector('#form-status');

const preview = {
  displayName: document.querySelector('#preview-name'),
  learningRole: document.querySelector('#preview-role'),
  learningGoal: document.querySelector('#preview-goal'),
};

function readForm() {
  // TODO 5: คืนค่า Object จาก FormData
}

function renderPreview(data) {
  // TODO 6: อัปเดต preview ทั้ง 3 ค่าโดยใช้ textContent
}

function validate(data) {
  // TODO 7: ตรวจชื่อ >= 2, role ต้องเลือก, goal >= 10
  return {};
}

function renderErrors(errors) {
  // TODO 8: แสดง error ใกล้ field และกำหนด aria-invalid
}

form.addEventListener('input', () => {
  // TODO 9: Read → Render
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // TODO 10: Read → Validate → Render errors/status
});

form.addEventListener('reset', () => {
  queueMicrotask(() => {
    // TODO 11: reset preview, errors และ status
  });
});
