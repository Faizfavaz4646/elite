import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const { search } = useLocation();

  const query = new URLSearchParams(search).get('query');

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = async (q) => {
    try {
      const res = await axios.get(`http://localhost:5000/products?q=${q}`);
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Search Results for "{query}"</h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded p-4 shadow">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2" />
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-gray-600">₹{product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
