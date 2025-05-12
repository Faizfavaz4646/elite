import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../WishlistContext';
import { toast } from 'react-toastify';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser?.id;
  const { refreshWishlist } = useWishlist();

  useEffect(() => {
    if (currentUserId) fetchWishlist();
  }, [currentUserId]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${currentUserId}`);
      setWishlist(res.data.wishlist || []);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      toast.error('Failed to fetch wishlist');
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${currentUserId}`);
      const user = res.data;
      const updatedWishlist = user.wishlist.filter((item) => item.productId !== productId);

      await axios.put(`http://localhost:5000/users/${currentUserId}`, {
        ...user,
        wishlist: updatedWishlist,
      });

      refreshWishlist();
      setWishlist(updatedWishlist);
      toast.info('Item removed from wishlist');
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      toast.error('Error removing item from wishlist');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mt-15 mb-6">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.productId}
              className="border p-4 rounded shadow relative bg-white"
            >
              <Link to={`/product/${item.productId}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-contain"
                />
                <h3 className="mt-2 font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="font-bold text-gray-800">₹ {item.price}</p>
              </Link>
              <button
                onClick={() => removeFromWishlist(item.productId)}
                className="absolute top-2 right-2 text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
