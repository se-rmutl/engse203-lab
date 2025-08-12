import { Link } from 'react-router-dom';

const products = [
    {id: 'p1', name: 'Gaming Laptop'}, 
    {id: 'p2', name: 'Mechanical Keyboard'},
    {id: 'p3', name: 'Wireless Mouse'}
];

export function ProductListPage() {
  return (
    <div>
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <p className="mb-4">หัวข้อนี้ใช้สำหรับทดสอบ React Router</p>
        <div className="bg-white p-4 rounded-lg shadow">
            <ul className="list-disc list-inside space-y-2">
            {products.map(p => (
                <li key={p.id}>
                    <Link to={`/products/${p.id}`} className="text-blue-600 hover:underline text-lg">
                        {p.name}
                    </Link>
                </li>
            ))}
            </ul>
        </div>
        <div className="mt-4 p-3 bg-amber-100 border-l-4 border-amber-500 rounded-r-lg text-sm">
            <b>โจทย์:</b> แก้ไข Path ใน <code>&lt;Link&gt;</code> ให้ถูกต้อง เพื่อให้สามารถนำทางไปยังหน้ารายละเอียดสินค้าได้
        </div>
    </div>
  );
}
