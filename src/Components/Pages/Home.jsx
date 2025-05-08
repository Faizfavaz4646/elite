import React from 'react';
import MiniCategoryNav from '../MiniCategoryNav';
import ImageSlider from '../ImageSlider';
import Footer from "../Footer";
import ProductListing from '../Productlist/ProductListing';


function Home() {
  return (
    <div>
        <section className="bg-yellow-100 text-center py-16 my-16">
  <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
    Welcome to <span className="text-yellow-600">Soccer City</span>
  </h2>
  <p className=" font-bold text-lg text-gray-700">
    Your one-stop shop for all football gear!!
  </p>
  <h3 className='text-2xl font-extrabold '>Play like a <span className='text-yellow-600'>pro</span>..!</h3>
</section>
    <MiniCategoryNav />
    <ImageSlider />
    <ProductListing />
    <Footer /> 

    </div>
  )
}

export default Home;