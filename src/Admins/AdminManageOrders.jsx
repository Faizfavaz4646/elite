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
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Manage Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
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
                <td className="py-3 px-4">${order.total}</td>
                <td className="py-3 px-4">{order.status || 'Pending'}</td>
                <td className="py-3 px-4 space-x-2">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded" onClick={() => handleDelete(order.id)}>
                    Delete
                  </button>
                  {/* Add status update options here if needed */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageOrders;
