
import { useParams } from 'react-router-dom';
import { useProducts } from '../ProductContext';

const CategoryWiseProducts = () => {
  const { category } = useParams(); // Get category from URL
  const { products } = useProducts();

  const filtered = category === 'all'
    ? products
    : products.filter(p => p.category.toLowerCase() === category.toLowerCase());

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 capitalize">{category} Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-24">
  {filtered.map(item => (
    <div key={item.id} className="border p-2 rounded shadow hover:shadow-xl transition text-sm">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-full h-32 object-contain rounded" // reduced height from h-40 to h-32
      />
      <h3 className="font-semibold mt-2 text-sm">{item.name}</h3>
      <p className="text-gray-700">₹{item.price}</p>
    </div>
  ))}
</div>

    </div>
  );
};

export default CategoryWiseProducts;
