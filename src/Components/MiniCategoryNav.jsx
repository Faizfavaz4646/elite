import React from 'react';
import { Shirt, Footprints, Circle, Hand, Droplet, Shield } from 'lucide-react';

const categories = [
  { name: 'Boots', icon: Footprints },
  { name: 'Jerseys', icon: Shirt },
  { name: 'Balls', icon: Circle },
  { name: 'Gloves', icon: Hand },
  { name: 'Socks', icon: Droplet },
  { name: 'Shin pads', icon: Shield },
];

function MiniCategoryNav({ onCategorySelect }) {
  return (
    <div className="bg-white py-4 shadow-sm sticky top-[70px] z-20">
      <div className="max-w-6xl mx-auto flex justify-center flex-wrap gap-3">
        {categories.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => onCategorySelect(name)}
            className="flex items-center px-4 py-2 bg-yellow-100 hover:bg-yellow-300 rounded-full shadow"
          >
            <Icon size={16} className="mr-2" />
            {name}
          </button>
        ))}
        <button
          onClick={() => onCategorySelect(null)}
          className="px-4 py-2 bg-yellow-100 hover:bg-yellow-300 rounded-full shadow"
        >
          All Products
        </button>
      </div>
    </div>
  );
}

export default MiniCategoryNav;
