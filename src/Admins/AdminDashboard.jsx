import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchUserCount();
    fetchProductCount();
    fetchOrderCount();
    generateDummySalesData();
  }, []);

  const fetchUserCount = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users');
      setUserCount(res.data.length);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchProductCount = async () => {
    try {
      const res = await axios.get('http://localhost:5000/products');
      setProductCount(res.data.length);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const fetchOrderCount = async () => {
    try {
      const res = await axios.get('http://localhost:5000/orders');
      setOrderCount(res.data.length);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  // Dummy sales data
  const generateDummySalesData = () => {
    const data = [
      { month: 'Jan', sales: 2400 },
      { month: 'Feb', sales: 1398 },
      { month: 'Mar', sales: 9800 },
      { month: 'Apr', sales: 3908 },
      { month: 'May', sales: 4800 },
      { month: 'Jun', sales: 3800 },
      { month: 'Jul', sales: 4300 },
      { month: 'Aug', sales: 5400 },
      { month: 'Sep', sales: 6000 },
      { month: 'Oct', sales: 7200 },
      { month: 'Nov', sales: 8500 },
      { month: 'Dec', sales: 9000 },
    ];
    setSalesData(data);
  };

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Dashboard Overview</h1>

     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium text-gray-700">Users</h3>
          <p className="text-4xl font-bold text-blue-500">{userCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium text-gray-700">Products</h3>
          <p className="text-4xl font-bold text-green-500">{productCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium text-gray-700">Orders</h3>
          <p className="text-4xl font-bold text-red-500">{orderCount}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Sales Graph</h2>
      <div className="bg-white p-4 rounded-xl shadow-md mb-10">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/admin/products" className="bg-green-600 text-white text-center py-4 rounded-lg hover:bg-green-700">
          Manage Products
        </Link>
        <Link to="/admin/manage/order" className="bg-red-600 text-white text-center py-4 rounded-lg hover:bg-red-700">
          Manage Orders
        </Link>
        <Link to="/admin/user/manage" className="bg-blue-600 text-white text-center py-4 rounded-lg hover:bg-blue-700">
          Manage Users
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
