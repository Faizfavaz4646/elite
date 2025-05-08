import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaShoppingCart, FaCartPlus } from 'react-icons/fa';

function ProductListing({ selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  console.log("wishlist",wishlist)
  const [cart, setCart] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser?.id;
  console.log("curren",currentUserId)
  useEffect(() => {
    fetchProducts();
    if (currentUserId) {
      fetchCart();
    }
  }, [currentUserId]);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/products");
    setProducts(res.data);
  };




  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/cart?userId=${userId}`);
      console.log("Fetched Cart:", res.data);
      setCart(res.data);
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  };

  const toggleWishlist = async (product) => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${currentUserId}`);
      const user = res.data;
      const existing = user.wishlist.find(w => w.productId === product.id);

      let updatedWishlist;
      if (existing) {
        updatedWishlist = user.wishlist.filter(w => w.productId !== product.id);
      } else {
        updatedWishlist = [
          ...user.wishlist,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            rating: product.rating
          }
        ];
      }

      await axios.put(`http://localhost:5000/users/${currentUserId}`, {
        ...user,
        wishlist: updatedWishlist
      });

      setWishlist(updatedWishlist);
      alert("Item added to wishlist")
    } catch (err) {
      console.error("Error updating wishlist:", err);
    }
  };  


    const fetchUserWishlist = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${currentUserId}`);
        setWishlist(res.data.wishlist || []);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };
    
    useEffect(() => {
      if (currentUserId) {
        fetchUserWishlist();
      }
    }, [currentUserId]);


  const toggleCart = async (product) => {
    try {
      const existing = cart.find(c => c.productId === product.id);
      if (existing) {
        await axios.delete(`http://localhost:5000/cart/${existing.id}`);
      } else {
        await axios.post(`http://localhost:5000/cart`, {
          userId,
          productId: product.id,
          quantity: 1,
          ...product
        });
      }
      fetchCart();
    } catch (error) {
      console.error("Error toggling cart", error);
    }
  };
  const filtered = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {selectedCategory ? `${selectedCategory} Products` : "All Products"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map(product => {
          const isWishlisted = wishlist.some(w => w.productId === product.id);
          const isInCart = cart.some(c => c.productId === product.id);

          return (
            <div key={product.id} className="border p-4 rounded relative shadow hover:shadow-lg transition">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />
                <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-gray-800 font-bold">{product.price}</p>
                <div className="text-yellow-500">{'★'.repeat(product.rating)}</div>
              </Link>

              {/* Wishlist Icon */}
              <button
                onClick={()=>toggleWishlist(product)}
                className="absolute top-3 right-3 text-xl"
              >
                {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </button>

              {/* Cart Icon */}
              <button
                onClick={() => toggleCart(product)}
                className="absolute bottom-3 right-3 text-xl"
              >
                {isInCart ? <FaShoppingCart className="text-green-600" /> : <FaCartPlus />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductListing;
