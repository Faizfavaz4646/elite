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
      const res = await axios.get(`http://localhost:10000/users/${currentUserId}`);
      setWishlist(res.data.wishlist || []);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      toast.error('Failed to fetch wishlist');
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const res = await axios.get(`http://localhost:10000/users/${currentUserId}`);
      const user = res.data;
      const updatedWishlist = user.wishlist.filter((item) => item.productId !== productId);

      await axios.put(`http://localhost:10000/users/${currentUserId}`, {
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
    <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-24">

      <h2 className="text-2xl font-bold text-center mt-10 mb-6">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600 mb-10">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10 w-full max-w-6xl">
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
                className="absolute bottom-3 right-2 text-red-600 px-6 py-2 rounded hover:bg-red-200"
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
