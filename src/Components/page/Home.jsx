import { useEffect, useState } from 'react';
import MiniCategoryNav from '../MiniCategoryNav';
import ImageSlider from '../ImageSlider';
import ProductListing from '../productlist/ProductListing';

import EliteElevenGoldenEmblem from '../../assets/images/Elite Eleven Golden Emblem.png';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setSelectedCategory(null);
    window.scrollTo(0, 0);
  }, []);

  return (
   <main className="bg-white">
  {/* HERO SECTION */}
  <section className="text-center py-20 px-4 bg-white shadow-md rounded">
    {/* Larger Logo */}
    <img
      src={EliteElevenGoldenEmblem}
      alt="Elite Eleven Logo"
      className="mx-auto w-52 md:w-64 h-auto mb-6"
    />

    {/* Catchy Tagline */}
    <p className="text-gray-700 text-lg md:text-xl font-semibold mb-2">
      Your one-stop shop for all football gear!
    </p>

    {/* Bold Heading */}
    <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide">
      Play like a <span className="text-yellow-600">Pro</span>!
    </h1>
  </section>

  {/* Remaining Content */}
  <ImageSlider />
  <MiniCategoryNav onCategorySelect={setSelectedCategory} />
  <ProductListing selectedCategory={selectedCategory} />
  
</main>

  );
}

export default Home;
