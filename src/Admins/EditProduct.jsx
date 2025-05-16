import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products/${id}`);
        const product = res.data;
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setStock(product.stock || 1);
      } catch (err) {
        setError('Failed to fetch product');
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (price <= 0) {
      setError('Price must be a positive number');
      return;
    }

    const imagePattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (image && !imagePattern.test(image)) {
      setError('Please enter a valid image URL');
      return;
    }

    if (!category) {
      setError('Please select a category');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/products/${id}`, {
        name,
        price,
        image,
        category,
        stock: Number(stock),
      });
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Error updating product');
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 md:px-10 lg:px-20 max-w-3xl mx-auto">
      <div className="bg-blue-100 py-4 px-4 rounded">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black text-center">
          Edit Product
        </h1>
      </div>

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-b px-4 py-6 sm:px-8 sm:py-10 space-y-6 border"
      >
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            className="w-full p-3 border rounded outline-blue-400"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Product Price"
            className="w-full p-3 border rounded outline-blue-400"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Product Stock"
            className="w-full p-3 border rounded outline-blue-400"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
            className="w-full p-3 border rounded outline-blue-400"
          />
        </div>

        {image && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
            <img
              src={image}
              alt="Preview"
              className="h-32 w-32 sm:h-40 sm:w-40 object-cover rounded border"
              onError={(e) => (e.target.style.display = 'none')}
            />
          </div>
        )}

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border rounded outline-blue-400"
            required
          >
            <option value="">Select Category</option>
            <option value="Shoes">Boots</option>
            <option value="Jerseys">Jerseys</option>
            <option value="Balls">Balls</option>
            <option value="Shin pads">Shin pads</option>
            <option value="Gloves">Gloves</option>
            <option value="Socks">Socks</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-semibold transition duration-200"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
