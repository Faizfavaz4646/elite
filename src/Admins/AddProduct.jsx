import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      await axios.post('http://localhost:10000/products', {
        name,
        price,
        image,
        category,
      });
      navigate('/admin/products');
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Error adding product');
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto border shadow-xl">
        <div className='bg-blue-500 p-2 mb-5 rounded'>
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white mt-6">Add New Product</h1></div>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
       
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="p-3 border rounded w-full"
          required
        />
         
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Product Price"
          className="p-3 border rounded w-full"
          required
        />
    
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className="p-3 border rounded w-full"
        />

        {/* Category Dropdown */}
         
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border rounded w-full"
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

        {/* Image Preview */}
        {image && (
          <div className="mt-2">
            <p className="text-sm mb-1">Image Preview:</p>
            <img
              src={image}
              alt="Preview"
              className="h-32 w-32 object-cover rounded border"
              onError={(e) => (e.target.style.display = 'none')}
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full sm:w-auto "
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
