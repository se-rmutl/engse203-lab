import { useAuth } from '../../contexts/AuthContext';
import { LabTopic } from '../LabTopic';

export function ContextTopic() {
  const { user, login, logout } = useAuth();

  return (
    <LabTopic title="หัวข้อที่ 2: Context API">
        <p className="mb-4">Component นี้ดึงข้อมูล user มาจาก Context โดยตรง</p>
        {user ? (
          <div className="flex items-center gap-2">
            <p className="text-green-600 font-semibold">สถานะ: Login แล้ว (ชื่อ: {user.name})</p>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Logout from here</button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <p className="text-red-600 font-semibold">สถานะ: ยังไม่ได้ Login</p>
            <button onClick={() => login('Somsak')} className="bg-green-500 text-white px-3 py-1 rounded text-sm">Login from here</button>
          </div>
        )}
        <div className="mt-4 p-3 bg-amber-100 border-l-4 border-amber-500 rounded-r-lg text-sm">
            <b>โจทย์:</b> ทำให้ปุ่ม Login/Logout ใน Navigation Bar และใน Component นี้ทำงานเชื่อมกันโดยใช้ Context เดียวกัน
        </div>
    </LabTopic>
  );
}