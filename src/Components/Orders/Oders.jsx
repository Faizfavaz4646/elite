import { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser?.id;

  useEffect(() => {
    if (currentUserId) {
      axios.get(`http://localhost:5000/orders?userId=${currentUserId}`)
        .then(res => setOrders(res.data))
        .catch(err => console.error("Error fetching orders:", err));
    }
  }, [currentUserId]);

  return (
    <div className="max-w-5xl mx-auto px-4 mt-20 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="border p-4 rounded-xl shadow mb-6">
            <div className="flex justify-between mb-2">
              <p className="text-sm text-gray-500">Order Date: {new Date(order.date).toLocaleString()}</p>
              <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {order.paymentMethod === 'Cash on Delivery' ? 'Cash on Delivery' : 'Card'}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 border rounded p-2">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm text-green-600 font-medium">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right font-bold text-xl mt-4">
              Total: ₹{order.totalAmount}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
