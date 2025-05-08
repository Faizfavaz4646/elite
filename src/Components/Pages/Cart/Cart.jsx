import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = 1; // simulate logged-in user

  useEffect(() => {
    axios.get(`http://localhost:5000/cart?userId=${userId}`)
      .then(res => setCartItems(res.data))
      .catch(err => console.error("Error fetching cart:", err));
  }, []);

  const handleRemove = async (id) => {
    await axios.delete(`http://localhost:5000/cart/${id}`);
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = async (item, type) => {
    const updatedQty = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
    if (updatedQty < 1) return;

    const updatedItem = { ...item, quantity: updatedQty };
    await axios.put(`http://localhost:5000/cart/${item.id}`, updatedItem);

    setCartItems(cartItems.map(ci => ci.id === item.id ? updatedItem : ci));
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid gap-6 pt-20">
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">Your cart is empty.</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-md flex flex-col md:flex-row items-center md:items-start p-5 gap-6">
            <img
              src={item.image}
              alt={item.name}
              className="w-full md:w-48 h-48 object-contain rounded border"
            />

            <div className="flex flex-col justify-between w-full">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.category}</p>
                <div className="text-yellow-500 mt-2">
                  {'★'.repeat(Math.floor(item.rating))} <span className="text-sm text-gray-400">({item.reviewCount} reviews)</span>
                </div>
                <p className="text-lg font-bold text-green-600 mt-2">{item.price}</p>
              </div>

              <div className="flex items-center mt-4 gap-4 flex-wrap">
                <div className="flex items-center gap-2 border px-3 py-1 rounded">
                  <button onClick={() => updateQuantity(item, 'dec')} className="text-xl font-bold">−</button>
                  <span className="text-md">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item, 'inc')} className="text-xl font-bold">+</button>
                </div>

                <button onClick={() => handleRemove(item.id)} className="text-red-600 hover:underline">
                  Remove
                </button>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition ml-auto">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
