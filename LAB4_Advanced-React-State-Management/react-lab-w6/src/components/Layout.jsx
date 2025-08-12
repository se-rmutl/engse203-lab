import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';

export function Layout() {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const { user, login, logout } = useAuth();

  const navLinkStyle = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    textDecoration: isActive ? 'underline' : 'none',
  });

  return (
    <div>
      <header className="bg-white shadow-md">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <div className="space-x-6">
            <NavLink to="/" style={navLinkStyle}>Home (Lab Topics)</NavLink>
            <NavLink to="/products" style={navLinkStyle}>Products</NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Cart: ({totalQuantity})</span>
            {user ? (
              <div className="flex items-center gap-2">
                <span>Welcome, {user.name}!</span>
                <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Logout</button>
              </div>
            ) : (
              <button onClick={() => login('Somsak')} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">Login</button>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-4 mt-4">
        <Outlet />
      </main>
    </div>
  );
}