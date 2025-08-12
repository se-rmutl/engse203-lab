import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Layout() {
  const items = useSelector(state => state.cart.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinkStyle = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? '#2563eb' : '#1f2937',
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <NavLink to="/" className="text-xl font-bold text-gray-800">Mini E-commerce</NavLink>
          <div className="space-x-6">
            <NavLink to="/" style={navLinkStyle}>Home</NavLink>
            <NavLink to="/products" style={navLinkStyle}>Products</NavLink>
            <NavLink to="/cart" style={navLinkStyle}>Cart ({totalItems})</NavLink>
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-4 mt-4">
        <Outlet />
      </main>
    </div>
  );
}