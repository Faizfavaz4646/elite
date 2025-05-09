import React, { useEffect, useState } from 'react';
import MiniCategoryNav from '../MiniCategoryNav';
import ImageSlider from '../ImageSlider';
import ProductListing from '../Productlist/ProductListing';
import Footer from '../Footer';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Reset selected category and scroll to top on mount
  useEffect(() => {
    setSelectedCategory(null);
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <section className="bg-yellow-100 text-center py-16 my-16">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-yellow-600">Soccer City</span>
        </h2>
        <p className="font-bold text-lg text-gray-700">Your one-stop shop for all football gear!</p>
        <h3 className="text-2xl font-extrabold">
          Play like a <span className="text-yellow-600">pro</span>!
        </h3>
      </section>

      {/* Image banner/slider first */}
      <ImageSlider />

      {/* Category filter navigation */}
      <MiniCategoryNav onCategorySelect={setSelectedCategory} />

      {/* Product list filtered by category */}
      <ProductListing selectedCategory={selectedCategory} />

      {/* Page footer */}
      <Footer />
    </main>
  );
}

export default Home;
