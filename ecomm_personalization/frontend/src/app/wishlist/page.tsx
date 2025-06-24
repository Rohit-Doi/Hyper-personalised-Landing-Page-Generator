"use client";
import Link from 'next/link';

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-[#fcf8f8] p-8">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8 text-[#1b0e0e]">Your Wishlist</h1>
        <p className="text-lg text-[#994d51] mb-8">You have no items in your wishlist yet.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="text-[#e92932] font-bold hover:underline">Back to Home</Link>
          <Link href="/products" className="text-[#e92932] font-bold hover:underline">View All Products</Link>
        </div>
      </div>
    </main>
  );
} 