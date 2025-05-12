import React from 'react';
import { Facebook, Instagram, Twitter } from "lucide-react";
import EliteElevenGoldenEmblem from "../assets/images/Elite Eleven Golden Emblem.png";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-10 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 pb-10">
        <div className="text-center md:text-left">
          <img 
            src={EliteElevenGoldenEmblem} 
            className="mx-auto md:mx-0 w-24 md:w-32 h-auto mb-2 rounded" 
            alt="Elite Eleven Emblem"
          />
          <p className="text-sm">Your one-stop shop for all football gear. Play like a pro!</p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm">
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Categories</h2>
          <ul className="space-y-1 text-sm">
            <li>Boots</li>
            <li>Jerseys</li>
            <li>Gloves</li>
            <li>Balls</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Connect</h2>
          <div className="flex space-x-4 mb-2">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
          </div>
          <p className="text-sm">Email: <a href="mailto:support@KickOff.com">support@EliteEleven.com</a></p>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-gray-700 py-4 text-center text-sm px-4">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
          <div className="flex gap-4 mb-2 md:mb-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
          <p>&copy; {new Date().getFullYear()} EliteEleven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
