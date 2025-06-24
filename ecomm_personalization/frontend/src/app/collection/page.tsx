"use client";
import Link from 'next/link';

const collections = [
  { name: 'Spring Collection', image: '/collections/2020-men-fashion.jpg', href: '/category/spring' },
  { name: 'Summer Collection', image: '/collections/Summer_mens_fashion.jpg.jpg', href: '/category/summer' },
  { name: 'Autumn Collection', image: '/collections/26012020_TRENDS_02_Polo.webp', href: '/category/autumn' },
  { name: 'Winter Collection', image: '/collections/Featured-image-69.webp', href: '/category/winter' },
];

export default function CollectionPage() {
  return (
    <main className="min-h-screen bg-[#fcf8f8] p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#1b0e0e]">Collections</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {collections.map((col, i) => (
            <Link key={i} href={col.href} className="flex flex-col items-center gap-3 pb-3 group">
              <div
                className="w-full h-40 bg-center bg-no-repeat bg-cover rounded-lg group-hover:scale-105 transition-transform"
                style={{ backgroundImage: `url('${col.image}')` }}
              ></div>
              <p className="text-[#1b0e0e] text-lg font-medium leading-normal">{col.name}</p>
            </Link>
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