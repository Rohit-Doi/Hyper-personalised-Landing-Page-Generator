'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Product } from '@/lib/personalization';
import { personalizationService } from '@/lib/personalization';

// Dynamically import ProductSection with no SSR
const ProductSection = dynamic(
  () => import('./ProductSection').then(mod => mod.ProductSection),
  { ssr: false }
);

interface PersonalizedProductSectionProps {
  title: string;
  productIds?: string[];
  maxProducts?: number;
}

export function PersonalizedProductSection({ 
  title, 
  productIds = [],
  maxProducts = 8 
}: PersonalizedProductSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let recommendedProducts: Product[] = [];
        
        if (productIds.length > 0) {
          // Get recommendations for specific products
          const recommendations = await Promise.all(
            productIds.map(id => 
              personalizationService.getProductRecommendations(id, { maxRecommendations: 1 })
            )
          );
          recommendedProducts = recommendations.flat();
        } else {
          // Get general recommendations
          recommendedProducts = await personalizationService.getProductRecommendations(
            'default', 
            { maxRecommendations: maxProducts }
          );
        }

        // Remove duplicates and limit to maxProducts
        const uniqueProducts = Array.from(new Map(
          recommendedProducts.map(p => [p.id, p])
        ).values()).slice(0, maxProducts);

        setProducts(uniqueProducts);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('Failed to load recommendations. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [productIds, maxProducts]);

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="animate-pulse h-8 w-48 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg aspect-square"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (products.length === 0) {
    return null; // Don't render anything if no products
  }

  return (
    <ProductSection 
      title={title}
      products={products}
    />
  );
}
