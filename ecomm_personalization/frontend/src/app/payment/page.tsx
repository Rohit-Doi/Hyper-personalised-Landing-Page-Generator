"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [success, setSuccess] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    localStorage.removeItem('cart');
    setTimeout(() => router.push('/'), 2000);
  };

  if (success) {
    return <div className="min-h-screen flex items-center justify-center bg-[#fcf8f8] text-[#1b0e0e] text-2xl font-bold">Payment Successful! Redirecting...</div>;
  }

  return (
    <main className="min-h-screen bg-[#fcf8f8] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-[#1b0e0e]">Checkout</h1>
        <div className="flex flex-col gap-2">
          <label className="text-[#994d51] font-medium">Shipping Address</label>
          <textarea required value={address} onChange={e => setAddress(e.target.value)} className="rounded-lg border border-[#e7d0d1] px-4 py-2 text-base" rows={2} placeholder="Street address" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#994d51] font-medium">City</label>
          <input required value={city} onChange={e => setCity(e.target.value)} className="rounded-lg border border-[#e7d0d1] px-4 py-2 text-base" placeholder="City" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#994d51] font-medium">Country</label>
          <input required value={country} onChange={e => setCountry(e.target.value)} className="rounded-lg border border-[#e7d0d1] px-4 py-2 text-base" placeholder="Country" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#994d51] font-medium">Pincode</label>
          <input required value={pincode} onChange={e => setPincode(e.target.value)} className="rounded-lg border border-[#e7d0d1] px-4 py-2 text-base" placeholder="Pincode" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#994d51] font-medium">Phone</label>
          <input required value={phone} onChange={e => setPhone(e.target.value)} className="rounded-lg border border-[#e7d0d1] px-4 py-2 text-base" placeholder="Phone number" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#994d51] font-medium">Payment Method</label>
          <select required value={payment} onChange={e => setPayment(e.target.value)} className="rounded-lg border border-[#e7d0d1] px-4 py-2 text-base">
            <option value="">Select payment option</option>
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>
        <button type="submit" className="px-6 py-3 bg-[#e92932] text-white rounded-lg font-bold text-lg">Pay Now</button>
      </form>
    </main>
  );
} 