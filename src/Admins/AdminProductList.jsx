import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/products');
      setProducts(res.data);
    } catch (error) {
      setError('Error fetching products');
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      fetchProducts(); // Refresh after delete
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="bg-blue-100 p-2 rounded md:p-6 gap-6 h-3xl mb-5 text-center text-black">
        <h1 className="text-2xl md:text-3xl font-bold mb-5">Manage Products</h1>
      </div>

      <Link
        to="/admin/products/add"
        className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6 inline-block"
      >
        + Add New Product
      </Link>

      {error && <p className="text-red-600">{error}</p>}

      {/* Mobile View - Card Layout */}
      <div className="sm:hidden space-y-4 mt-4">
        {products.map((product, index) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold mb-1">#{index + 1}</p>
            <p><span className="font-semibold">Name:</span> {product.name}</p>
            <div className="flex items-center gap-2 my-2">
              <span className="font-semibold">Image:</span>
              <img
                src={product.image || 'https://via.placeholder.com/60'}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
            </div>
            <p><span className="font-semibold">Price:</span> ₹ {product.price}</p>
            <div className="mt-2 space-x-2">
              <Link
                to={`/admin/edit-product/${product.id}`}
                className="inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteProduct(product.id)}
                className="inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No products found.</p>
        )}
      </div>

      {/* Desktop / Tablet View - Table */}
      <div className="hidden sm:block overflow-x-auto bg-white p-4 md:p-6 rounded-xl shadow-md mt-4">
        <table className="min-w-full text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Image</th>
              <th className="py-2 px-3">Price</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3">{index + 1}</td>
                <td className="py-2 px-3">{product.name}</td>
                <td className="py-2 px-3">
                  <img
                    src={product.image || 'https://via.placeholder.com/60'}
                    alt={product.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-3">₹ {product.price}</td>
                <td className="py-2 px-3 space-x-2">
                  <Link
                    to={`/admin/edit-product/${product.id}`}
                    className="inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="inline-block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminProductList;
