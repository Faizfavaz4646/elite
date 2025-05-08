import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import best from "../assets/images/best.jpg";
import stars from "../assets/images/stars.jpg";


// Define arrow components OUTSIDE main function
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow cursor-pointer"
      onClick={onClick}
    >
      <ChevronRight className="w-6 h-6 text-gray-800" />
    </div>
  );
};

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow cursor-pointer"
      onClick={onClick}
    >
      <ChevronLeft className="w-6 h-6 text-gray-800" />
    </div>
  );
}

function ImageSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    autoplay: true,
    arrows: true,
    swipe: false,
    draggable: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <Slider {...settings}>
        <img src={best} alt="slide1" className="w-full h-[400px] object-cover" />
        <img src={stars} alt="slide2" className="w-full h-[400px] object-cover" />
        
        
       
      </Slider>
    </div>
  );
}

export default ImageSlider;
