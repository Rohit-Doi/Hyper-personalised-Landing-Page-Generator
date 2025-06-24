'use client';

import { useEffect, useState } from 'react';
import { personalizationService } from '@/lib/personalization';
import ProductCard from './ProductCard';
import Link from 'next/link';
import Image from 'next/image';

interface PersonalizedContent {
  heroBanner?: {
    title: string;
    subtitle?: string;
    ctaText: string;
    ctaLink: string;
    imageUrl: string;
  };
  featuredCategories?: Array<{
    id: string;
    name: string;
    imageUrl: string;
    slug: string;
  }>;
  recommendedProducts?: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    category?: string;
  }>;
  personalizationContext?: Record<string, any>;
}

export default function PersonalizedLanding() {
  const [content, setContent] = useState<PersonalizedContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonalizedContent = async () => {
      try {
        setIsLoading(true);
        const data = await personalizationService.getPersonalizedContent('landing');
        setContent(data);
      } catch (err) {
        console.error('Error fetching personalized content:', err);
        setError('Failed to load personalized content. Showing default content instead.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPersonalizedContent();

    // Track page view
    personalizationService.trackEvent('page_view', {
      page_title: 'Personalized Landing',
      page_path: '/',
      page_location: window.location.href,
    });
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              {error}
            </p>
          </div>
        </div>
        {content && <RenderContent content={content} />}
      </div>
    );
  }

  return content ? <RenderContent content={content} /> : <DefaultContent />;
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      {/* Hero Banner Skeleton */}
      <div className="h-64 bg-gray-200 rounded-lg"></div>
      
      {/* Categories Skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-48 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
      
      {/* Products Skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-48 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DefaultContent() {
  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
        <div className="relative z-20 max-w-3xl p-8 md:p-16 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-xl mb-8">Discover amazing products tailored just for you</p>
          <Link 
            href="/products" 
            className="inline-block bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            onClick={() => personalizationService.trackEvent('cta_click', { cta_type: 'hero', cta_text: 'Shop Now' })}
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { id: 'electronics', name: 'Electronics', image: '/images/electronics.jpg' },
            { id: 'clothing', name: 'Clothing', image: '/images/clothing.jpg' },
            { id: 'home', name: 'Home & Living', image: '/images/home.jpg' },
            { id: 'beauty', name: 'Beauty', image: '/images/beauty.jpg' },
          ].map((category) => (
            <Link 
              key={category.id} 
              href={`/category/${category.id}`}
              className="group block"
              onClick={() => personalizationService.trackEvent('category_click', { category_id: category.id, category_name: category.name })}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="aspect-square bg-gray-100 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RenderContent({ content }: { content: PersonalizedContent }) {
  const { heroBanner, featuredCategories = [], recommendedProducts = [] } = content;

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      {heroBanner && (
        <div 
          className="relative bg-cover bg-center rounded-lg overflow-hidden min-h-[400px] flex items-center"
          style={{
            backgroundImage: `url(${heroBanner.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
          <div className="relative z-20 max-w-3xl p-8 md:p-16 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{heroBanner.title}</h1>
            {heroBanner.subtitle && (
              <p className="text-xl mb-8">{heroBanner.subtitle}</p>
            )}
            <Link 
              href={heroBanner.ctaLink}
              className="inline-block bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              onClick={() => personalizationService.trackEvent('cta_click', { 
                cta_type: 'hero', 
                cta_text: heroBanner.ctaText,
                cta_link: heroBanner.ctaLink
              })}
            >
              {heroBanner.ctaText}
            </Link>
          </div>
        </div>
      )}

      {/* Featured Categories */}
      {featuredCategories.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Featured Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <Link 
                key={category.id} 
                href={`/category/${category.slug || category.id}`}
                className="group block"
                onClick={() => personalizationService.trackEvent('category_click', { 
                  category_id: category.id, 
                  category_name: category.name 
                })}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Recommended For You</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => personalizationService.trackEvent('product_click', { 
                  product_id: product.id,
                  product_name: product.name,
                  position: recommendedProducts.findIndex(p => p.id === product.id)
                })}
              >
                <ProductCard 
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
