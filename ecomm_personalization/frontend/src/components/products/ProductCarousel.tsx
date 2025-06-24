'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import ProductCard, { ProductCardProps } from './ProductCard';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: ProductCardProps[];
  showViewAll?: boolean;
  viewAllLink?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  products,
  showViewAll = true,
  viewAllLink = '#',
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
      
      // Check again after images load
      const images = container.querySelectorAll('img');
      const imageLoadPromises = Array.from(images).map(img => 
        img.complete ? Promise.resolve() : new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        })
      );
      
      Promise.all(imageLoadPromises).then(checkScrollPosition);
      
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
          </div>
          {showViewAll && (
            <a
              href={viewAllLink}
              className="text-sm font-medium text-pink-600 hover:text-pink-700"
            >
              View all
            </a>
          )}
        </div>

        <div className="relative">
          {showLeftButton && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Previous"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
          
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide py-2 -mx-4 px-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-64">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
          
          {showRightButton && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Next"
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
