'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">LUXE</h3>
            <p className="text-gray-400">Premium fashion destination inspired by global luxury trends.</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">SHOP</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-white">New Arrivals</Link></li>
              <li><Link href="#" className="hover:text-white">Best Sellers</Link></li>
              <li><Link href="#" className="hover:text-white">Collections</Link></li>
              <li><Link href="#" className="hover:text-white">Lookbook</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">HELP</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-white">Shipping</Link></li>
              <li><Link href="#" className="hover:text-white">Returns</Link></li>
              <li><Link href="#" className="hover:text-white">Size Guide</Link></li>
              <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">NEWSLETTER</h4>
            <p className="text-gray-400 mb-4">Subscribe for exclusive offers and updates</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 text-white px-4 py-2 w-full rounded-l focus:outline-none"
              />
              <button className="bg-black text-white px-4 py-2 rounded-r hover:bg-gray-800">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p> 2025 LUXE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Export default with no SSR to prevent hydration issues
const DynamicFooter = dynamic(() => Promise.resolve(Footer), {
  ssr: false,
});

export default DynamicFooter;
