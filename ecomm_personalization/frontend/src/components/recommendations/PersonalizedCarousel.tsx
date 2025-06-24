'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { useAuth } from '@/context/AuthContext';
import { getPersonalizedRecommendations } from '@/lib/recommendations';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PersonalizedCarouselProps {
  title: string;
  subtitle?: string;
  limit?: number;
  currentProductId?: string;
  className?: string;
}

export default function PersonalizedCarousel({
  title,
  subtitle,
  limit = 8,
  currentProductId,
  className = '',
}: PersonalizedCarouselProps) {
  const { user, userProfile } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isHovered, setIsHovered] = useState(false);

  // Update slides to show based on viewport width
  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width < 640) setSlidesToShow(1);
      else if (width < 768) setSlidesToShow(2);
      else if (width < 1024) setSlidesToShow(3);
      else setSlidesToShow(4);
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  // Fetch personalized recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        
        const recommendations = await getPersonalizedRecommendations({
          userId: user?.uid || 'anonymous',
          userProfile,
          limit,
          currentProductId,
        });
        
        setProducts(recommendations);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user?.uid, userProfile, limit, currentProductId]);

  // Handle navigation
  const nextSlide = () => {
    setCurrentSlide(prev => 
      Math.min(prev + 1, Math.ceil(products.length / slidesToShow) - 1)
    );
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  // Calculate visible products
  const startIdx = currentSlide * slidesToShow;
  const visibleProducts = products.slice(startIdx, startIdx + slidesToShow);
  const canGoNext = startIdx + slidesToShow < products.length;
  const canGoPrev = currentSlide > 0;

  if (loading) {
    return (
      <div className={`py-12 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="bg-gray-200 aspect-square animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return null; // Don't render if no products
  }

  return (
    <div 
      className={`relative py-12 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              disabled={!canGoPrev}
              className={`p-2 rounded-full ${canGoPrev ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'}`}
              aria-label="Previous slide"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              disabled={!canGoNext}
              className={`p-2 rounded-full ${canGoNext ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'}`}
              aria-label="Next slide"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${(currentSlide * 100) / slidesToShow}%)`,
              display: 'flex',
              width: `${(products.length / slidesToShow) * 100}%`,
            }}
          >
            {products.map((product) => (
              <div 
                key={product.id}
                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2"
                style={{
                  flex: `0 0 ${100 / slidesToShow}%`,
                  maxWidth: `${100 / slidesToShow}%`,
                }}
              >
                <Link href={`/products/${product.id}`} className="block group">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative aspect-square bg-gray-100">
                      <Image
                        src={product.images[0] || '/placeholder-product.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:opacity-90 transition-opacity duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33.33vw, 25vw"
                      />
                      {product.discount && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                          {product.discount}% OFF
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="mt-auto pt-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-gray-900">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="ml-2 text-sm text-gray-500 line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          {product.rating && (
                            <div className="flex items-center text-sm text-amber-500">
                              <span>★</span>
                              <span className="ml-1 text-gray-600">
                                {product.rating.toFixed(1)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
