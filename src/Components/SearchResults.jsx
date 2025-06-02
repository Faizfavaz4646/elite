import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products on mount
  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data); // Show all by default
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  // Filter on search input
  useEffect(() => {
    const term = searchTerm.toLowerCase();

    const result = products.filter((product) =>
      product.name.toLowerCase().includes(term) ||
      product.category?.toLowerCase().includes(term) ||
      product.price.toString().includes(term)
    );

    setFiltered(result);
  }, [searchTerm, products]);

  return (
    <div className="p-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name, category, or price..."
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <div key={product.id} className="border rounded p-4 shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover mb-2"
              />
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-gray-600">₹{product.price}</p>
              <p className="text-sm text-gray-400">{product.category}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchList;
