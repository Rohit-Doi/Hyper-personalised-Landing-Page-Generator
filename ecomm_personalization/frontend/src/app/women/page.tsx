"use client";
import Image from "next/image";

const womenProducts = [
  {
    id: "1",
    name: "Blue Ethnic Motifs Kurta Set",
    price: 59.99,
    image: "/women/584e3bfb-0f4f-408f-89b1-4b5a04b710c51695970415815KALINIWomenBlueEthnicMotifsYokeDesignRegularKurtawithTrouser1.jpg",
  },
  {
    id: "2",
    name: "Party Dress",
    price: 69.99,
    image: "/women/myntra-online-shopping-for-women-party-4.png",
  },
  {
    id: "3",
    name: "Designer Wear Dress",
    price: 74.99,
    image: "/women/designers-wear-dress-photography-for-myntra.jpeg",
  },
  {
    id: "4",
    name: "Pink Embroidered Maxi Dress",
    price: 64.99,
    image: "/women/6bee1566-ae33-4405-966b-5c45f637bb051649049087439-Sangria-Women-Pink-Embroidered-Net-A-Line-Maxi-Dress-4341649-1.jpg",
  },
  {
    id: "5",
    name: "Floral Printed Dress",
    price: 54.99,
    image: "/women/bb058407-d64c-43dd-a8ae-ac6cba92c7641735308885503-OCTICS-Floral-Printed-Fit--Flare-Dress-1081735308884799-1.jpg",
  },
  {
    id: "6",
    name: "Women's Outfit March 2024",
    price: 79.99,
    image: "/women/181phceo_womens-outfit_625x300_06_March_24.webp",
  },
  {
    id: "7",
    name: "Yellow Ethnic Motifs Kurta Set",
    price: 69.99,
    image: "/women/7e0b1821-d427-4799-a630-82fb816a51c71698223340513FIORRAWomenYellowEthnicMotifsPrintedRegularKurtawithPalazzos1.avif",
  },
  {
    id: "8",
    name: "All About You Women Dress",
    price: 89.99,
    image: "/women/4e12b4b4-1bee-453e-8178-0cabe187c53e1718972514834-all-about-you-Women-Dresses-8061718972514315-1.jpg",
  },
];

export default function WomenPage() {
  return (
    <main className="min-h-screen bg-[#fcf8f8] p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#1b0e0e]">Women's Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {womenProducts.map((product) => (
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