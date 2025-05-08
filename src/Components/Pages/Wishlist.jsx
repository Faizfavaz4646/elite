import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const currentUserId = 1; // Simulated logged-in user

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/wishlist?userId=${currentUserId}`);
      setWishlist(response.data);
    } catch (error) {
      console.error("Error fetching wishlist", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const productToRemove = wishlist.find((item) => item.id === productId);
      if (productToRemove) {
        await axios.delete(`http://localhost:5000/wishlist/${productToRemove.id}`);
        fetchWishlist();
      }
    } catch (error) {
      console.error("Error removing from wishlist", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Your Wishlist</h2>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
            >
              <Link to={`/product/${item.productId}`}>
                <img
                  src={item.image}
                  alt={item.name || 'Product'}
                   className="w-full h-48 object-cover-rounded"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold break-words">{item.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{item.category}</p>
                  <p className="text-xl font-bold text-gray-800 mt-2">{item.price}</p>
                </div>
              </Link>

              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-3 right-3 bg-white text-red-500 border border-red-200 hover:bg-red-50 rounded-full px-3 py-1 text-sm shadow-sm transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600 mt-10">Your wishlist is empty</p>
      )}
    </div>
  );
}

export default Wishlist;
