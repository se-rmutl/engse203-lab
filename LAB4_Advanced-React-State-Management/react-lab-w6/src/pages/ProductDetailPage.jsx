import { useParams, Link } from 'react-router-dom';

export function ProductDetailPage() {
  const { productId } = useParams();
  
  return (
    <div>
      <Link to="/products" className="text-blue-500 hover:underline mb-4 block">&larr; Back to Products</Link>
      <h1 className="text-3xl font-bold">Details for Product ID: {productId}</h1>
      <p className="mt-4">In a real app, you would use this ID to fetch specific product data from an API.</p>
    </div>
  );
}
