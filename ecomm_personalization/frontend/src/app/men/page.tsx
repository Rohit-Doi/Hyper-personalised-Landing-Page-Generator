"use client";
import Image from "next/image";

const menProducts = [
  {
    id: "1",
    name: "Sherwani Style 1",
    price: 79.99,
    image: "/men/565d6e38-6df1-479c-89cc-5ba6f9eb683f1669377676866Sherwani1.jpg",
  },
  {
    id: "2",
    name: "Striped Resortwear Shirt",
    price: 29.99,
    image: "/men/men-regular-fit-striped-resortwear-shirt.webp",
  },
  {
    id: "3",
    name: "Kurta Pullover",
    price: 34.99,
    image: "/men/199dfc78-6ba9-4830-83ae-855427d35f551729746979193-KVETOO-Striped-Turtle-Neck-Long-Sleeves-Acrylic-Pullover-Swe-1.jpg",
  },
  {
    id: "4",
    name: "Indigo Printed Short Kurta",
    price: 39.99,
    image: "/men/402af633-1ed8-43a1-b9fd-60adb3488bf21684474558714-Men-Indigo-Printed-short-Kurta-6511684474558337-1.jpg",
  },
  {
    id: "5",
    name: "Kurta Shawl Photoshoot",
    price: 44.99,
    image: "/men/stylish-kurta-shawl-photoshoot-mens-ethnic-wear-photoshoot-traditional-dress-poses-for-man-mens-ethnic-wear-for-wedding-traditional-indian-mens-clothing-bringitonline_25.jpeg",
  },
  {
    id: "6",
    name: "Kurta Palama with Coat",
    price: 49.99,
    image: "/men/stylish-kurta-palama-with-coat-photoshoot-mens-ethnic-wear-photoshoot-traditional-dress-poses-for-man-mens-ethnic-wear-for-wedding-traditional-indian-mens-clothing-bringitonline_25.jpeg",
  },
  {
    id: "7",
    name: "Slim Fit Opaque Striped Shirt",
    price: 54.99,
    image: "/men/75ad82fa-3f84-47ca-94bb-7f2e899cb6ab1709659883713HERENOWMenSlimFitOpaqueStripedCasualShirt1.jpg",
  },
  {
    id: "8",
    name: "Formal Dress Cardigan",
    price: 59.99,
    image: "/men/myntra-online-shopping-for-mens_Formal_DressCardigan.jpg",
  },
];

export default function MenPage() {
  return (
    <main className="min-h-screen bg-[#fcf8f8] p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#1b0e0e]">Men's Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {menProducts.map((product) => (
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