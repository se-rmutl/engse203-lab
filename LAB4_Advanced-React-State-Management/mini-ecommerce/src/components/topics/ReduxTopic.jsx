import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../features/cart/cartSlice';
import { LabTopic } from '../LabTopic';

const sampleProduct = { id: 'p1', name: 'Laptop', price: 35000 };

export function ReduxTopic() {
  const { items, totalQuantity } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <LabTopic title="หัวข้อที่ 3: Redux Toolkit">
      <h3 className="text-lg font-semibold">Total Cart Items: {totalQuantity}</h3>
      <div className="my-2 space-x-2">
        <button onClick={() => dispatch(addItem(sampleProduct))} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">Add Laptop</button>
        <button onClick={() => dispatch(removeItem(sampleProduct.id))} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition">Remove Laptop</button>
      </div>
      <ul className="list-disc list-inside mt-2">
        {items.map(item => (
            <li key={item.id}>{item.name} (Quantity: {item.quantity})</li>
        ))}
      </ul>
       <div className="mt-4 p-3 bg-amber-100 border-l-4 border-amber-500 rounded-r-lg text-sm">
        <b>โจทย์:</b> เพิ่มฟังก์ชัน <code>removeItem</code> ใน <code>cartSlice.js</code> เพื่อให้ปุ่ม "Remove" ทำงานได้ถูกต้อง
      </div>
    </LabTopic>
  );
}
