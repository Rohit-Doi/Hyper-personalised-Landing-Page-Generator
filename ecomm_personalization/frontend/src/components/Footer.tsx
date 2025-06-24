import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#1b0e0e] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/size-guide" className="text-gray-300 hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link href="/track-order" className="text-gray-300 hover:text-white transition-colors">Track Order</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-bold">About Us</h3>
            <ul className="space-y-2">
              <li><Link href="/our-story" className="text-gray-300 hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/sustainability" className="text-gray-300 hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/press" className="text-gray-300 hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-bold">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/shipping-policy" className="text-gray-300 hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/return-policy" className="text-gray-300 hover:text-white transition-colors">Return Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-bold">Connect With Us</h3>
            <div className="mb-6 flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2c1f1f] text-white transition-colors hover:bg-[#e92932]">
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2c1f1f] text-white transition-colors hover:bg-[#e92932]">
                <FaTwitter className="h-4 w-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2c1f1f] text-white transition-colors hover:bg-[#e92932]">
                <FaInstagram className="h-4 w-4" />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2c1f1f] text-white transition-colors hover:bg-[#e92932]">
                <FaPinterestP className="h-4 w-4" />
              </a>
            </div>
            <p className="text-sm text-gray-400">
              Sign up for exclusive offers, original stories, events and more.
            </p>
          </div>
        </div>
        
        <div className="mt-12 border-t border-[#2c1f1f] pt-8 text-center text-sm text-gray-400">
          <p>© {currentYear} StyleHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
