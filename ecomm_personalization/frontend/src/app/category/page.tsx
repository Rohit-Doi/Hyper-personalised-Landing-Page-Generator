"use client";
import Link from 'next/link';

const categories = [
  { name: 'Men', image: '/men/565d6e38-6df1-479c-89cc-5ba6f9eb683f1669377676866Sherwani1.jpg', href: '/category/men' },
  { name: 'Women', image: '/women/584e3bfb-0f4f-408f-89b1-4b5a04b710c51695970415815KALINIWomenBlueEthnicMotifsYokeDesignRegularKurtawithTrouser1.jpg', href: '/category/women' },
  { name: 'Accessories', image: '/accessories/4b513d17-916f-4004-94ae-b92c0cfe9c881702721174153Organisers1.jpg', href: '/category/accessories' },
  { name: 'Collections', image: '/collections/2020-men-fashion.jpg', href: '/collections' },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[#fcf8f8] p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#1b0e0e]">Categories</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <Link key={i} href={cat.href} className="flex flex-col items-center gap-3 pb-3 group">
              <div
                className="w-full h-40 bg-center bg-no-repeat bg-cover rounded-lg group-hover:scale-105 transition-transform"
                style={{ backgroundImage: `url('${cat.image}')` }}
              ></div>
              <p className="text-[#1b0e0e] text-lg font-medium leading-normal">{cat.name}</p>
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