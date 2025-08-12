import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LabTopic } from '../LabTopic';

export function CustomHookTopic() {
  const [name, setName] = useLocalStorage('username', '');

  return (
    <LabTopic title="หัวข้อที่ 1: Custom Hooks">
      <input 
        className="border p-2 rounded w-full"
        value={name || ''} 
        onChange={e => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <h3 className="mt-2 text-lg">Hello, {name || 'Guest'}!</h3>
      <p className="text-sm text-gray-600">(ลองพิมพ์ชื่อแล้วรีเฟรชหน้าเว็บ ข้อมูลจะยังคงอยู่)</p>
      <div className="mt-4 p-3 bg-amber-100 border-l-4 border-amber-500 rounded-r-lg text-sm">
        <b>โจทย์:</b> แก้ไข Bug ใน <code>useLocalStorage</code> เมื่อลบชื่อจนหมดแล้วรีเฟรช ค่าจะไม่ใช่ string ว่าง
      </div>
    </LabTopic>
  );
}
