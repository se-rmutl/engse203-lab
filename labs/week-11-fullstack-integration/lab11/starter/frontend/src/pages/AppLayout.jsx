import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader.jsx';

function AppLayout() {
  return (
    <div className="app-shell" data-testid="app-layout">
      <AppHeader />
      <main className="container page-content" id="main-content">
        <Outlet />
      </main>
      <footer className="site-footer"><div className="container">LAB environment · ไม่ใช้ข้อมูลส่วนบุคคลจริง</div></footer>
    </div>
  );
}

export default AppLayout;
