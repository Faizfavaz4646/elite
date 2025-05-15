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
        <div className='bg-blue-600 p-2 rounded md:p-6 gap-6 h-3xl mb-5 text-center text-white'>    
             <h1 className="text-2xl md:text-3xl font-bold mb-6">Manage Products</h1>

        </div>
     
      <Link
        to="/admin/products/add"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6 inline-block"
      >
        + Add New Product
      </Link>
    


      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto bg-white p-4 md:p-6 rounded-xl shadow-md mt-4">
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
                <Link to={`/admin/edit-product/${product.id}`} className="inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs">Edit</Link>
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
