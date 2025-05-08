import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function ProductListing() {
    const [products,setProducts]=useState([]);
    const [wishlist,setWishlist]=useState([]);
     const currentUserId =1;                    //simulated logged-in user

     useEffect(()=>{
        fetchProducts();
        fetchWishlist();

    }, []);

        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/products");
                setProducts (response.data);
            } catch (error) {
                console.error("Error fetching products",error);
            }
        };
        const fetchWishlist = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/wishlist?userId=${currentUserId}`);
                setWishlist (response.data);
            } catch (error) {
                console.error("Error fetching wishlist",error);
            }

        };
        const toggleWishlist = async (product) =>{
            const isWishlisted = wishlist.find((item)=> item.id === product.id);
            if(isWishlisted) {
                await axios.delete(`http://localhost:5000/wishlist/${isWishlisted.id}`);
            } else {
                await axios.post(`http://localhost:5000/wishlist`, {
                    ...product,
                    userId: currentUserId,

                });
            }
            fetchWishlist();      //refresh wishlist after add/remove
        };

     

  return (
    <div className='p-6'>
           <h2 className="text-3xl font-bold mb-6 text-center">Soccer City Products</h2>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6'>
        {products.map((product)=> {
            const isWishlisted =wishlist.some((item)=> item.id === product.id);
            return (
            <div key={product.id} className='relative border p-4 rounded shadow hover:shadow-xl transition'>
                <Link to={`/product/${product.id}`}>
                
                <img
                src={product.image} 
                alt={product.name}
                className='w-full h-48 object-cover-rounded'
                />
                <h3 className='text-lg font-semibold mt-4'>{product.name}</h3>
                <p className='text-gray-600'>{product.category}</p>
                <p className='text-xl font-bold text-gray-800'>{product.price}</p>
                <div className='flex items-center mt-2'>
                    <span className='text-yellow-500'>{'★'.repeat(Math.floor(product.rating))}</span>
                    <span className='text-gray-500 ml-2'>({product.reviewCount} reviews)</span>

                </div>
                </Link>
                <button
                onClick={() => toggleWishlist(product)}
                 className='absalute top-4 right-4 text-2xl'>
                    {isWishlisted ? <FaHeart className='text-red-500' />: <FaRegHeart />}
                 </button>

            </div>
            );
})}

    </div>
    </div>
  );
};

export default ProductListing;