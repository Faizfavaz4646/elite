import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/orders');
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/orders/${id}`);
      setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 bg-blue-100 p-3 rounded-lg text-center">
        Manage Orders
      </h1>

      {/* Table view for medium and larger screens */}
      <div className="hidden md:block">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.user || 'N/A'}</td>
                <td className="py-3 px-4">₹ {order.total}</td>
                <td className="py-3 px-4">{order.status || 'Pending'}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for small screens */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white shadow-md rounded-lg p-4 border">
            <p><span className="font-semibold text-gray-700">Order ID:</span> {order.id}</p>
            <p><span className="font-semibold text-gray-700">User:</span> {order.user || 'N/A'}</p>
            <p><span className="font-semibold text-gray-700">Total:</span> ₹ {order.total}</p>
            <p><span className="font-semibold text-gray-700">Status:</span> {order.status || 'Pending'}</p>
            <div className="mt-3">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                onClick={() => handleDelete(order.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminManageOrders;
