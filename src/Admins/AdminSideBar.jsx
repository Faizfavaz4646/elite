import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const AdminSideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session
    navigate("/login"); // Redirect to login
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 sm:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white bg-gray-800 p-2 rounded focus:outline-none"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#2e3a59] text-white p-6 z-40 transform transition-transform duration-300 ease-in-out sm:static sm:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
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

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 min-h-screen p-4 sm:ml-64 pt-16 sm:pt-4">
        <Outlet />
      </main>
    </>
  );
};

export default AdminSideBar;
