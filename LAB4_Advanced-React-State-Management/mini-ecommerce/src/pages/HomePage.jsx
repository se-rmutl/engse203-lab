import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="text-center p-10 bg-white rounded-lg shadow">
      <h1 className="text-4xl font-bold mb-4">Welcome to Mini E-commerce</h1>
      <p className="text-lg text-gray-600 mb-6">This is a lab project for ENGSE203 to practice advanced React concepts.</p>
      <Link to="/products" className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
        Go to Products
      </Link>
    </div>
  );
}
