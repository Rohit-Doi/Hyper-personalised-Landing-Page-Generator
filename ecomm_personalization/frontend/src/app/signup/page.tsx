"use client";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function SignupPage() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      router.push('/account');
    }
  }, [user, router]);

  // Placeholder for email/password signup logic
  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Email/password signup is not implemented. Please use Google signup.');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcf8f8]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e92932]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcf8f8] p-4" style={{ fontFamily: 'Plus Jakarta Sans, Noto Sans, sans-serif' }}>
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-xl border border-[#f3e7e8]">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-[#1b0e0e] tracking-tight">Sign up for StyleHub</h2>
          <p className="mt-2 text-sm text-[#994d51]">Create your account to get started</p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={signInWithGoogle}
            className="group relative w-full flex justify-center py-3 px-4 border border-[#e7d0d1] rounded-lg shadow-sm text-base font-bold text-[#1b0e0e] bg-[#f3e7e8] hover:bg-[#e92932] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e92932] transition-all duration-200"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FcGoogle className="h-5 w-5" />
            </span>
            Sign up with Google
          </button>
          <form onSubmit={handleEmailSignup} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 border border-[#e7d0d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e92932]"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-[#e7d0d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e92932]"
            />
            <select
              value={ageGroup}
              onChange={e => setAgeGroup(e.target.value)}
              className="w-full px-4 py-3 border border-[#e7d0d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e92932]"
              required
            >
              <option value="">Select Age Group</option>
              <option value="18-24">18-24</option>
              <option value="25-34">25-34</option>
              <option value="35-44">35-44</option>
              <option value="45-54">45-54</option>
              <option value="55+">55+</option>
            </select>
            <select
              value={gender}
              onChange={e => setGender(e.target.value)}
              className="w-full px-4 py-3 border border-[#e7d0d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e92932]"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full px-4 py-3 border border-[#e7d0d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e92932]"
            />
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
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-[#e92932] hover:bg-[#c8232c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e92932] transition-colors duration-200"
            >
              Sign up
            </button>
          </form>
        </div>
        <div className="mt-4 text-center">
          <span className="text-[#994d51]">Already have an account? </span>
          <a href="/login" className="text-[#e92932] font-bold hover:underline">Log in</a>
        </div>
      </div>
    </div>
  );
} 