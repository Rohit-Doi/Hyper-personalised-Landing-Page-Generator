"use client";
import Image from "next/image";

const collectionsProducts = [
  {
    id: "1",
    name: "2020 Men Fashion",
    price: 69.99,
    image: "/collections/2020-men-fashion.jpg",
  },
  {
    id: "2",
    name: "Summer Men's Fashion",
    price: 74.99,
    image: "/collections/Summer_mens_fashion.jpg.jpg",
  },
  {
    id: "3",
    name: "Trends Polo",
    price: 59.99,
    image: "/collections/26012020_TRENDS_02_Polo.webp",
  },
  {
    id: "4",
    name: "Featured Collection",
    price: 79.99,
    image: "/collections/Featured-image-69.webp",
  },
  {
    id: "5",
    name: "Spring Fashion Trends",
    price: 89.99,
    image: "/collections/spring-fashion-trends-florals.jpg",
  },
  {
    id: "6",
    name: "Housewives Collection",
    price: 99.99,
    image: "/collections/ss25comps_housewives.avif",
  },
  {
    id: "7",
    name: "RTW Collection",
    price: 109.99,
    image: "/collections/holding-rtw.webp",
  },
  {
    id: "8",
    name: "Collage Holding",
    price: 119.99,
    image: "/collections/Collage Holding (1).webp",
  },
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-[#fcf8f8] p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#1b0e0e]">Collections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {collectionsProducts.map((product) => (
          <div key={product.id} className="flex flex-col items-center bg-white rounded-lg shadow p-4">
            <img src={product.image} alt={product.name} width={240} height={320} className="rounded-lg object-cover mb-4" />
            <p className="text-lg font-bold text-[#1b0e0e]">{product.name}</p>
            <p className="text-[#994d51]">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
