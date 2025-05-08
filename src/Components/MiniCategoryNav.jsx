import React from 'react';
import { Shirt, Footprints, Circle, Hand, Droplet, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Boots", icon: Footprints },
  { name: "Jerseys", icon: Shirt },
  { name: "Balls", icon: Circle },
  { name: "Gloves", icon: Hand },
  { name: "Socks", icon: Droplet },
  { name: "Shin pads", icon: Shield },
];

function MiniCategoryNav() {
  return (
    <div className="bg-white py-4 shadow-sm sticky top-[70px] z-20">
      <div className="max-w-6xl mx-auto flex justify-center gap-4 flex-wrap">
        {categories.map(({ name, icon: Icon }) => (
          <Link
            key={name}
            to={`/category/${name}`}
            className="flex items-center font-bold text-sm md:text-base px-4 py-2 bg-yellow-100 hover:bg-yellow-300 text-gray-800 rounded-full shadow transition"
          >
            <Icon size={16} className="mr-2" />
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MiniCategoryNav;
