import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const AdminSideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-gray-100 sticky">
      {/* Sidebar*/}
      <aside
        className={`bg-[#2e3a59] text-white w-64 p-6 z-40 
        ${sidebarOpen ? 'block' : 'hidden'} sm:block`}
      >
        <h2 className="text-xl font-bold mb-6 border border-white p-2 rounded text-center bg-gray-700">
          Admin Panel
        </h2>
        <nav className="space-y-4">
          <Link
            to="/admin/dashboard"
            className={`block px-4 py-2 rounded ${
              isActive('/admin/dashboard') ? 'bg-gray-700' : 'hover:bg-gray-600'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/user/manage"
            className={`block px-4 py-2 rounded ${
              isActive('/admin/user/manage') ? 'bg-gray-700' : 'hover:bg-gray-600'
            }`}
          >
            Manage Users
          </Link>
          <Link
            to="/admin/manage/order"
            className={`block px-4 py-2 rounded ${
              isActive('/admin/manage/order') ? 'bg-gray-700' : 'hover:bg-gray-600'
            }`}
          >
            Manage Orders
          </Link>
          <Link
            to="/admin/products"
            className={`block px-4 py-2 rounded ${
              isActive('/admin/products') ? 'bg-gray-700' : 'hover:bg-gray-600'
            }`}
          >
            Manage Products
          </Link>
          <button
            onClick={handleLogout}
            className="block bg-red-600 hover:bg-red-700 px-4 py-2 mt-4 rounded w-full text-center"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Mobile toggle button */}
        <div className="sm:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-gray-800 text-white p-2 rounded"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Outlet renders the admin content */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminSideBar;
