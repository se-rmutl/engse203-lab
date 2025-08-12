import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: Number(quantity) }));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
        <div className="text-center p-10 bg-white rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <Link to="/products" className="text-blue-500 hover:underline">Continue Shopping</Link>
        </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-contain rounded"/>
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input 
                type="number" 
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                className="w-16 p-1 border rounded text-center"
                min="0"
              />
              <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700 font-semibold">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
        <button className="mt-4 bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}