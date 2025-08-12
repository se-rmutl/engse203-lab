import React, { memo } from 'react';
import { Link } from 'react-router-dom';

// TODO 5: ใช้ React.memo กับ Component (เฉลย)
const ProductCard = memo(function ProductCard({ product, onAddToCart }) {
  return (
    <div className="border rounded-lg p-4 flex flex-col bg-white shadow hover:shadow-xl transition-shadow duration-300">
      <Link to={`/products/${product.id}`} className="flex-grow flex flex-col">
        <div className="flex-grow flex items-center justify-center">
            <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
        </div>
        <div>
            <h2 className="text-lg font-semibold text-gray-800 truncate h-14">{product.title}</h2>
            <p className="text-xl font-bold text-blue-600 mt-2">${product.price}</p>
        </div>
      </Link>
      <button 
        onClick={() => onAddToCart(product)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full"
      >
        Add to Cart
      </button>
    </div>
  );
});

export default ProductCard;