'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { personalizationService } from '@/lib/personalization';
import ProductRecommendations from '@/components/recommendations/ProductRecommendations';

export default function Home() {
  // Track page view when component mounts
  useEffect(() => {
    const trackPageView = async () => {
      try {
        await personalizationService.trackEvent('page_view', {
          page_title: 'Home',
          page_path: '/',
          page_location: typeof window !== 'undefined' ? window.location.href : '',
        });
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    trackPageView();
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col bg-[#fcf8f8] overflow-x-hidden" style={{ fontFamily: 'Plus Jakarta Sans, Noto Sans, sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header Hero Banner */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-start justify-end px-4 pb-10 @[480px]:px-10"
                  style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=960&q=80)' }}
                >
                  <div className="flex flex-col gap-2 text-left">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                      Welcome to StyleHub
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      Discover curated collections tailored just for you. Explore the latest trends and exclusive offers.
                    </h2>
                  </div>
                  <Link href="/products">
                    <button
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#e92932] text-[#fcf8f8] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                    >
                      <span className="truncate">Shop Now</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {/* Featured Collections */}
            <h2 className="text-[#1b0e0e] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Featured Collections</h2>
            <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-stretch p-4 gap-3">
                {[
                  {
                    title: "Women's New Arrivals",
                    image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=600&q=80',
                    href: '/category/women',
                  },
                  {
                    title: "Men's Best Sellers",
                    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
                    href: '/category/men',
                  },
                  {
                    title: 'Trending Accessories',
                    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
                    href: '/category/accessories',
                  },
                  {
                    title: 'Sale',
                    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
                    href: '/category/sale',
                  },
                  {
                    title: 'Collection',
                    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
                    href: '/collection',
                  },
                ].map((col, i) => (
                  <Link key={i} href={col.href} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex flex-col"
                      style={{ backgroundImage: `url('${col.image}')` }}
                    ></div>
                    <p className="text-[#1b0e0e] text-base font-medium leading-normal">{col.title}</p>
                  </Link>
                ))}
              </div>
            </div>
            {/* Recommended For You */}
            <ProductRecommendations title="Recommended For You" maxItems={4} context={{ section: 'home' }} className="p-4" />
            {/* Shop By Category */}
            <h2 className="text-[#1b0e0e] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Shop By Category</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {[
                {
                  name: 'Dresses',
                  image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
                  href: '/category/dresses',
                },
                {
                  name: 'Tops',
                  image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
                  href: '/category/tops',
                },
                {
                  name: 'Bottoms',
                  image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
                  href: '/category/bottoms',
                },
                {
                  name: 'Shoes',
                  image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
                  href: '/category/shoes',
                },
                {
                  name: 'Accessories',
                  image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
                  href: '/category/accessories',
                },
              ].map((cat, i) => (
                <Link key={i} href={cat.href} className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                    style={{ backgroundImage: `url('${cat.image}')` }}
                  ></div>
                  <p className="text-[#1b0e0e] text-base font-medium leading-normal">{cat.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
