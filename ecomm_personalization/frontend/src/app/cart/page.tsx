"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
};

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  const removeFromCart = (id: string) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleCheckout = () => {
    router.push('/payment');
  };

  if (cart.length === 0) {
    return <div className="min-h-screen flex items-center justify-center bg-[#fcf8f8] text-[#994d51] text-xl">Your bag is empty.</div>;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link href="/" className="flex items-center text-gray-600 hover:text-[#e92932] transition-colors">
              <FiArrowLeft className="mr-2" />
              Continue Shopping
            </Link>
            <h1 className="mt-4 text-2xl font-bold text-[#1b0e0e]">Your Bag</h1>
          </div>

          <div className="flex flex-col gap-6">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-6 bg-white rounded-lg p-4 shadow">
                <div className="w-24 h-32 bg-center bg-cover rounded-lg" style={{ backgroundImage: `url('${item.image}')` }}></div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-[#1b0e0e]">{item.name}</p>
                  <p className="text-[#994d51]">${item.price.toFixed(2)}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="px-4 py-2 bg-[#e92932] text-white rounded-lg font-bold">Remove</button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button onClick={handleCheckout} className="px-8 py-3 bg-[#e92932] text-white rounded-lg font-bold text-lg">Checkout</button>
          </div>

          {cart.length > 0 && (
            <div className="mt-8">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                <h2 className="mb-4 text-lg font-bold">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
