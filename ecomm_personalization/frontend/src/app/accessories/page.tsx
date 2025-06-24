"use client";
import Image from "next/image";

const accessoriesProducts = [
  {
    id: "1",
    name: "Organisers Set",
    price: 19.99,
    image: "/accessories/4b513d17-916f-4004-94ae-b92c0cfe9c881702721174153Organisers1.jpg",
  },
  {
    id: "2",
    name: "Quilted Velvet Lunch Bag",
    price: 24.99,
    image: "/accessories/cdc0d04b-dea8-44cb-8d3b-76ef62be7e6a1668840596500-Nestasia-Quilted-Velvet-Lunch-Bag-6281668840596114-1.jpg",
  },
  {
    id: "3",
    name: "Protective Trolley Bag Cover",
    price: 29.99,
    image: "/accessories/32d88eab-4455-4ac3-8269-828b20448bb81718099082354-Cortina-Turquoise-Printed-Protective-Large-Trolley-Bag-Cover-1.jpg",
  },
  {
    id: "4",
    name: "Saree Accessories",
    price: 14.99,
    image: "/accessories/d0edd3df-cf9d-4aa7-9829-497ef54f8fd21707823963409SareeAccessories4.jpg",
  },
  {
    id: "5",
    name: "Accessory Gift Set",
    price: 34.99,
    image: "/accessories/4316ad76-2dda-4d8e-94a3-764929dec78b1716967777514AccessoryGiftSet1.jpg",
  },
  {
    id: "6",
    name: "Gold Plated Mathapatti",
    price: 44.99,
    image: "/accessories/170d82d0-e87b-4980-a2cc-5df5b729f9bb1666000180739-Fida-Gold-Plated-White-Kundan-Studded--Pearl-Beaded-Mathapat-1.jpg",
  },
  {
    id: "7",
    name: "Handheld Bag",
    price: 39.99,
    image: "/accessories/b23bde38-812f-44f5-9797-1e96c92a95031712815355985-ASTRID-Cream-Coloured--Black-Striped-Handheld-Bag-1871712815-1.jpg",
  },
  {
    id: "8",
    name: "Hairband",
    price: 9.99,
    image: "/accessories/c765422e-a9b5-41c0-a22d-5512a3d129bd1720168439531VOGUEHAIRACCESSORIESWomenHairband1.jpg",
  },
];

export default function AccessoriesPage() {
  return (
    <main className="min-h-screen bg-[#fcf8f8] p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#1b0e0e]">Accessories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {accessoriesProducts.map((product) => (
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