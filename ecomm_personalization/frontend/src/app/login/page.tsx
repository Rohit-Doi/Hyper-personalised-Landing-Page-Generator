'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

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
          <h2 className="mt-2 text-3xl font-extrabold text-[#1b0e0e] tracking-tight">Sign in to StyleHub</h2>
          <p className="mt-2 text-sm text-[#994d51]">Sign in to your account to continue</p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={signInWithGoogle}
            className="group relative w-full flex justify-center py-3 px-4 border border-[#e7d0d1] rounded-lg shadow-sm text-base font-bold text-[#1b0e0e] bg-[#f3e7e8] hover:bg-[#e92932] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e92932] transition-all duration-200"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FcGoogle className="h-5 w-5" />
            </span>
            Continue with Google
          </button>
          <button
            onClick={() => router.push('/user-login')}
            className="w-full flex justify-center py-3 px-4 border border-[#e7d0d1] rounded-lg shadow-sm text-base font-bold text-[#1b0e0e] bg-white hover:bg-[#f3e7e8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e92932] transition-all duration-200 mt-2"
          >
            Login with Email
          </button>
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e7d0d1]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[#994d51]">Or continue as guest</span>
            </div>
          </div>
          <button
            onClick={() => router.push('/')}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-[#e92932] hover:bg-[#c8232c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e92932] transition-colors duration-200"
          >
            Continue as Guest
          </button>
          <div className="mt-4 text-center">
            <span className="text-[#994d51]">Don't have an account? </span>
            <a href="/signup" className="text-[#e92932] font-bold hover:underline">Sign up</a>
          </div>
        </div>
        <div className="mt-6 text-center text-sm">
          <p className="text-[#994d51]">
            By continuing, you agree to our{' '}
            <a href="/terms" className="font-medium text-[#e92932] hover:underline">Terms of Service</a>{' '}
            and{' '}
            <a href="/privacy" className="font-medium text-[#e92932] hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
