import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {
  const navigate=useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const currentUserId = 1; // Simulated logged-in user

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("Error fetching product:", err));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      // First, check if the item is already in the cart for this user
      const check = await axios.get(`http://localhost:5000/cart?userId=${currentUserId}&id=${product.id}`);
      if (check.data.length > 0) {
        alert("Item already in cart");
        return;
      }

      // Add to cart
      await axios.post('http://localhost:5000/cart', {
        ...product,
        userId: currentUserId,
        quantity: 1
      });

      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleBuyNow = () => {
    alert("Redirect to payment page... (Coming Soon)");
    navigate('/payment');
  };

  if (!product) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden md:flex pt-20 py-16">

        {/* Product Image */}
        <div className="md:flex-shrink-0 w-full md:w-1/2 bg-gray-100 p-4">
          <img
            src={product.image}
            alt={product.name}
            className="h-64 w-full object-contain rounded"
          />
        </div>

        {/* Product Info */}
        <div className="p-6 flex flex-col justify-between w-full">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-500 text-sm mt-1 mb-2">{product.category}</p>

            <div className="flex items-center gap-2 text-yellow-500 mb-2">
              {'★'.repeat(Math.floor(product.rating))}
              <span className="text-gray-400 text-xs ml-2">({product.reviewCount} reviews)</span>
            </div>

            <p className="text-xl font-bold text-green-600">{product.price}</p>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
