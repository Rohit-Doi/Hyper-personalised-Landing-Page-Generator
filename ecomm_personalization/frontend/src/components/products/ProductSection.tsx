'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CarouselArrow } from '../ui/CarouselArrow';
import type { ProductCardProps } from './ProductCard';

// Dynamically import ProductCard with no SSR
const ProductCard = dynamic(() => import('./ProductCard'), {
  ssr: false,
});

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: any[];
}

export const ProductSection = ({ title, subtitle, products }: ProductSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  // Calculate number of visible cards based on viewport width
  useEffect(() => {
    // Skip on server-side
    if (typeof window === 'undefined') return;

    const calcSlidesToShow = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSlidesToShow(4);
      } else if (width >= 768) {
        setSlidesToShow(3);
      } else if (width >= 640) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
      // When slidesToShow changes, ensure currentSlide is within bounds
      setCurrentSlide(prev => Math.min(prev, Math.max(products.length - 1, 0)));
    };

    // Only run on client side
    if (typeof window !== 'undefined') {
      calcSlidesToShow();
      window.addEventListener('resize', calcSlidesToShow);
      return () => window.removeEventListener('resize', calcSlidesToShow);
    }
  }, [products.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const maxIndex = Math.max(products.length - slidesToShow, 0);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const maxIndex = Math.max(products.length - slidesToShow, 0);
      return prev === 0 ? maxIndex : prev - 1;
    });
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-500">{subtitle}</p>}
          </div>
          <Link href="#" className="text-pink-600 hover:text-pink-700 font-medium flex items-center">
            View all
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  <ProductCard 
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    imageUrl={product.imageUrl}
                    brand={product.brand}
                    discount={product.discount}
                    isNew={product.isNew}
                    isTrending={product.isTrending}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Hide arrows if all items are visible */}
          {products.length > slidesToShow && (
            <>
              <CarouselArrow direction="left" onClick={prevSlide} />
              <CarouselArrow direction="right" onClick={nextSlide} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};
