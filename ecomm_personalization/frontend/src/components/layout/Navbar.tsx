'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ShoppingBag, Search, User } from 'react-feather';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Men', href: '/category/men' },
  { name: 'Women', href: '/category/women' },
  { name: 'Accessories', href: '/category/accessories' },
  { name: 'Sale', href: '/category/sale' },
  { name: 'Products', href: '/products' },
  { name: 'Categories', href: '/category' },
  { name: 'Collections', href: '/collections' },
];

function NavbarComponent() {
  const { user, userProfile, signOut } = useAuth();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f3e7e8] px-10 py-3 bg-white" style={{ fontFamily: 'Plus Jakarta Sans, Noto Sans, sans-serif' }}>
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-4 text-[#1b0e0e]">
          <div className="size-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path></svg>
          </div>
          <h2 className="text-[#1b0e0e] text-lg font-bold leading-tight tracking-[-0.015em]">StyleHub</h2>
        </Link>
        <nav className="flex items-center gap-9">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-[#1b0e0e] text-sm font-medium leading-normal hover:text-[#e92932] transition-colors ${pathname === item.href ? 'underline underline-offset-4' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex flex-1 justify-end gap-8 items-center">
        <Link href="/wishlist" className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f3e7e8] text-[#1b0e0e] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5" aria-label="Wishlist">
          <FiHeart className="text-[#1b0e0e]" size={20} />
        </Link>
        <Link href="/cart" className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f3e7e8] text-[#1b0e0e] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5" aria-label="Shopping Cart">
          <FiShoppingBag className="text-[#1b0e0e]" size={20} />
        </Link>
        {userProfile && userProfile.photoURL ? (
          <Link href="/account">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url('${userProfile.photoURL}')` }}></div>
          </Link>
        ) : (
          <Link href="/account" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f3e7e8] text-[#1b0e0e] font-bold hover:bg-[#e92932]/10 transition-colors">Account</Link>
        )}
        {!userProfile && (
          <Link href="/login" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#e92932] text-white font-bold hover:bg-[#c8232c] transition-colors">Login</Link>
        )}
      </div>
    </header>
  );
}

// Export default with no SSR to prevent hydration issues
export default dynamic(() => Promise.resolve(NavbarComponent), {
  ssr: false,
});
