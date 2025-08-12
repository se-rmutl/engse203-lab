import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);
  
  if (loading) return <div>Loading...</div>;
  if (!product) return <NotFoundPage />;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <Link to="/products" className="text-blue-500 hover:underline mb-6 block">&larr; Back to Products</Link>
      <div className="flex flex-col md:flex-row gap-8">
        <img src={product.image} alt={product.title} className="w-full md:w-1/3 h-auto object-contain rounded-lg"/>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4 capitalize">{product.category}</p>
          <p className="text-lg text-gray-800 mb-6">{product.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-blue-600">${product.price}</p>
            <button 
              onClick={() => dispatch(addItem(product))}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}