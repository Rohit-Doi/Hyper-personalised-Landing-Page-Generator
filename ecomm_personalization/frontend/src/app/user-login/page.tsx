"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: Implement actual login logic here
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    alert('Email/password login is not implemented. Please use Google login.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcf8f8] p-4" style={{ fontFamily: 'Plus Jakarta Sans, Noto Sans, sans-serif' }}>
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-xl border border-[#f3e7e8]">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-[#1b0e0e] tracking-tight">Log in to StyleHub</h2>
          <p className="mt-2 text-sm text-[#994d51]">Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-[#e7d0d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e92932]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-[#e7d0d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e92932]"
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-[#e92932] hover:bg-[#c8232c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e92932] transition-colors duration-200"
          >
            Log in
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-[#994d51]">Don't have an account? </span>
          <a href="/signup" className="text-[#e92932] font-bold hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
} 