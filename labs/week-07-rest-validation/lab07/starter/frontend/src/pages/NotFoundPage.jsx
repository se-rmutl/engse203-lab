import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="state-card" data-testid="page-not-found">
      <p className="eyebrow dark">404 · ROUTE NOT FOUND</p><h1>ไม่พบหน้าที่ต้องการ</h1><p>URL นี้ไม่ตรงกับ route ของ LAB05</p><Link className="button primary inline" to="/">กลับ Dashboard</Link>
    </section>
  );
}

export default NotFoundPage;
