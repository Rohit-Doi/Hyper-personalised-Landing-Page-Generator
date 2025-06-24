'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  variant?: 'default' | 'category';
  className?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  category,
  variant = 'default',
  className = '',
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic here
    console.log('Added to cart:', { id, name, price });
  };

  return (
    <div className={`group relative ${className}`}>
      <Link 
        href={{ pathname: `/products/${id}`, query: { image } }}
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className={`relative overflow-hidden rounded-lg bg-gray-100 transition-all ${variant === 'category' ? 'aspect-square' : 'aspect-[3/4]'}`}
        >
          <Image
            src={image || '/placeholder-product.jpg'}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
            priority={false}
          />
          {variant === 'default' && (
            <button 
              onClick={handleAddToCart}
              className={`absolute right-2 top-2 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'} hover:bg-white/90`}
              aria-label="Add to cart"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </button>
          )}
        </div>
        <div className="mt-3 px-1">
          {category && (
            <p className="text-sm font-medium text-gray-500 mb-1">{category}</p>
          )}
          <h3 className="text-base font-medium text-gray-900 line-clamp-2">{name}</h3>
          <p className="mt-1 text-base font-medium text-gray-900">
            ${price.toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
