import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaRegHeart, FaShoppingCart, FaCartPlus } from 'react-icons/fa';
import { useWishlist } from '../../WishlistContext';
import { toast } from 'react-toastify';
import { useCart } from '../../CartContext';
import { useSearch } from '../SearchContext' 

function ProductListing({ selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const { wishlist, refreshWishlist } = useWishlist();
  const { refreshCart } = useCart();
  const { searchQuery } = useSearch(); //  Using search from context
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser?.id;

  useEffect(() => {
    fetchProducts();
    if (currentUserId) fetchCart();
  }, [currentUserId]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Error fetching products');
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${currentUserId}`);
      setCart(res.data.cart || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Error fetching cart');
    }
  };

  const toggleWishlist = async (product) => {
    if (!currentUserId) {
      toast.info("Please log in to manage your wishlist");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/users/${currentUserId}`);
      const user = res.data;
      const exists = user.wishlist?.some(w => w.productId === product.id);

      const updatedWishlist = exists
        ? user.wishlist.filter(w => w.productId !== product.id)
        : [
            ...user.wishlist,
            {
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              category: product.category,
              rating: product.rating,
              stock: product.stock,
            },
          ];

      await axios.patch(`http://localhost:5000/users/${currentUserId}`, {
        wishlist: updatedWishlist,
      });

      refreshWishlist();
      toast.success(exists ? 'Removed from wishlist' : 'Added to wishlist');
    } catch (err) {
      console.error('Error updating wishlist:', err);
      toast.error('Error updating wishlist');
    }
  };

  const toggleCart = async (product) => {
    if (!currentUserId) {
      toast.info("Please log in to manage your cart");
      return;
    }

    if (product.stock <= 0) {
      toast.warning("Out of stock");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/users/${currentUserId}`);
      const user = res.data;
      const userCart = user.cart || [];
      const existing = userCart.find(item => item.productId === product.id);

      let updatedCart;
      if (existing) {
        updatedCart = userCart.filter(item => item.productId !== product.id);
        toast.info('Removed from cart');
      } else {
        updatedCart = [
          ...userCart,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            rating: product.rating,
            stock: product.stock,
          },
        ];
        toast.success('Added to cart');
      }

      await axios.patch(`http://localhost:5000/users/${currentUserId}`, {
        cart: updatedCart,
      });

      setCart(updatedCart);
      refreshCart();
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Error updating cart');
    }
  };

  // 🔥 Search + Category Filter
  const filtered = products.filter(p => {
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(product => {
          const isWishlisted = wishlist.some(w => w.productId === product.id);
          const isInCart = cart.some(c => c.productId === product.id);
          const outOfStock = product.stock <= 0;

          return (
            <div
              key={product.id}
              className="border p-4 rounded relative shadow hover:shadow-lg transition"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain"
                />
                <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-green-800 font-bold">₹ {product.price}</p>
                <p className={`text-sm ${outOfStock ? 'text-red-600' : 'text-gray-600'}`}>
                  {outOfStock ? 'Out of Stock' : `In Stock: ${product.stock}`}
                </p>
                <div className="text-yellow-500">{'★'.repeat(product.rating)}</div>
              </Link>

              {/* Wishlist Icon */}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-3 right-3 text-xl"
              >
                {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </button>

              {/* Cart Icon */}
              <button
                onClick={() => toggleCart(product)}
                className="absolute bottom-3 right-3 text-xl"
                disabled={outOfStock}
                title={outOfStock ? 'Out of Stock' : ''}
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
