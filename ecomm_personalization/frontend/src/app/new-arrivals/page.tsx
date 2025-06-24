"use client";
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

const newArrivals = [
  {
    id: '1',
    name: 'Spring Floral Dress',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    name: 'Modern Denim Jacket',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    name: 'Lightweight Sneakers',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
];

export default function NewArrivalsPage() {
  return (
    <main className="min-h-screen bg-[#fcf8f8] p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#1b0e0e]">New Arrivals</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <div className="mt-8 flex gap-4">
          <Link href="/" className="text-[#e92932] font-bold hover:underline">Back to Home</Link>
          <Link href="/products" className="text-[#e92932] font-bold hover:underline">View All Products</Link>
        </div>
      </div>
    </main>
  );
} 