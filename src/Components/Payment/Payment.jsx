
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState('cod');
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get(`http://localhost:5000/cart?userId=${userId}`)
      .then(res => {
        setCartItems(res.data);
        const totalPrice = res.data.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(totalPrice);
      });
  }, []);

  const handleOrder = () => {
    const orderData = {
      userId,
      items: cartItems,
      total,
      paymentMethod: selectedMethod,
      date: new Date().toISOString(),
    };

    axios.post('http://localhost:5000/orders', orderData).then(() => {
      axios.all(cartItems.map(item => axios.delete(`http://localhost:5000/cart/${item.id}`)))
        .then(() => {
          navigate('/orders');
        });
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10 mt-20 border ">
      <h2 className="text-2xl font-bold mb-6">Confirm Your Order</h2>

      {cartItems.map(item => (
        <div key={item.id} className="flex items-center justify-between p-4 border rounded mb-4">
          <div className="flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
          </div>
          <p className="text-lg font-bold">${item.price * item.quantity}</p>
        </div>
      ))}

      <div className="mb-6">
        <h3 className="font-semibold text-lg">Payment Method:</h3>
        <div className="mt-2 space-y-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" value="cod" checked={selectedMethod === 'cod'} onChange={() => setSelectedMethod('cod')} />
            Cash on Delivery <span className="text-sm text-red-500">(Extra $12 delivery charge applies)</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" value="card" onChange={() => setSelectedMethod('card')} />
            Credit/Debit Card (Coming soon)
          </label>
        </div>
      </div>

      <div className="flex justify-between items-center text-xl font-bold">
        <span>Total:</span>
        <span>${selectedMethod === 'cod' ? total + 12 : total}</span>
      </div>

      <button onClick={handleOrder} className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
        Place Order
      </button>
    </div>
  );
}

export default Payment;

