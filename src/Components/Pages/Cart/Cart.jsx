import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../../../CartContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser?.id;
  const { refreshCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUserId) {
      axios.get(`http://localhost:5000/users/${currentUserId}`)
        .then(res => setCartItems(res.data.cart || []))
        .catch(err => console.error("Error fetching cart:", err));
    }
  }, [currentUserId]);

  const handleBuyNow = () => {
    if (!currentUserId || cartItems.length === 0) {
      alert("Please login and add items to cart before proceeding.");
      return;
    }

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );

    navigate("/payment", {
      state: {
        cartItems,
        totalAmount,
        userId: currentUserId
      }
    });
  };

  const handleRemove = async (productId) => {
    const res = await axios.get(`http://localhost:5000/users/${currentUserId}`);
    const user = res.data;
    const updatedCart = user.cart.filter(item => item.productId !== productId);

    await axios.put(`http://localhost:5000/users/${currentUserId}`, {
      ...user,
      cart: updatedCart
    });

    toast.info("Item removed from cart");
    refreshCart();
    setCartItems(updatedCart);
  };

  const updateQuantity = async (item, type) => {
    const newQty = type === 'increment' ? item.quantity + 1 : item.quantity - 1;
    if (newQty < 1) return;

    const res = await axios.get(`http://localhost:5000/users/${currentUserId}`);
    const user = res.data;

    const updatedCart = user.cart.map(ci =>
      ci.productId === item.productId ? { ...ci, quantity: newQty } : ci
    );

    await axios.put(`http://localhost:5000/users/${currentUserId}`, {
      ...user,
      cart: updatedCart
    });

    setCartItems(updatedCart);
  };

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 grid gap-6">
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-xl mb-20">Your cart is empty.</p>
      ) : (
        cartItems.map(item => (
          <div key={item.productId} className="bg-white rounded-xl shadow-md flex flex-col md:flex-row items-center p-5 gap-6">
            <img src={item.image} alt={item.name} className="w-48 h-48 object-contain border" />
            <div className="flex flex-col w-full">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-yellow-500 mt-1">{'★'.repeat(item.rating)}</p>
              <p className="text-lg font-bold text-green-600">₹ {item.price}</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center border px-3 py-1 rounded gap-2">
                  <button onClick={() => updateQuantity(item, 'decrement')}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item, 'increment')}>+</button>
                </div>
                <button onClick={() => handleRemove(item.productId)} className="text-red-400 bg-red-200 px-2 py-1 rounded hover:bg-red-300">Remove</button>
                <button onClick={handleBuyNow} className="ml-auto bg-blue-600 text-white px-4 py-2 rounded">Buy Now</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
