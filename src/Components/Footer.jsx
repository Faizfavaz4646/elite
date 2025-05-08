import React from 'react';
import { Facebook, Instagram, Twitter } from "lucide-react";


function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        <div>
            <h2 className='text-lg font-bold mb-2'>Soccer City</h2>
            <p>Your one-stop shop for all football gear. Play like a pro!</p>
        </div>
        <div>
            <h2 className="text-lg font-bold mb-2">Quick Links</h2>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Shop</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>
        <div>
            <h2 className="text-lg font-bold mb-2">Categories</h2>
            <ul>
                <li>Boots</li>
                <li>Jerseys</li>
                <li>Gloves</li>
                <li>Balls</li>
            </ul>
        </div>
        <div>
        <h2 className="text-lg font-bold mb-2">Connect</h2>
        <div className='flex space-x-4'>
        <a href="#"><Facebook size={20} /></a>
        <a href="#"><Instagram size={20} /></a>
        <a href="#"><Twitter size={20} /></a>

        </div>
        <p className="mt-2 text-sm">Email: support@soccercity.com</p>

        </div>
      <div className="flex gap-4 mt-2 md:mt-0">
        <a href="#" className="hover:underline text-sm">Privacy Policy</a>
        <a href="#" className="hover:underline text-sm">Terms</a>
       
      </div>
      <p className="text-sm">&copy; {new Date().getFullYear()} Soccer City. All rights reserved.</p>
    </div>
  </footer>
    
  
  )
}

export default Footer;