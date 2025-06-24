import React from 'react';
import { useRecommendations, type Product } from '@/hooks/useRecommendations';
import { useUser } from '@/context/UserContext';
import { analytics } from '@/lib/analytics';

interface ProductRecommendationsProps {
  title?: string;
  maxItems?: number;
  context?: Record<string, any>;
  className?: string;
}

export const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  title = 'Recommended for You',
  maxItems = 4,
  context = {},
  className = '',
}) => {
  const { user, isAuthenticated } = useUser();
  
  // Build user context for recommendations
  const userContext = {
    demographics: user?.profile || {},
    preferences: user?.preferences || {},
    geography: user?.profile?.location || '',
    ...context,
  };

  // Only fetch recommendations if user is authenticated
  const { data, isLoading, error } = useRecommendations({
    userId: user?.id || 'anonymous',
    context: userContext,
  });

  const handleProductClick = (product: Product) => {
    if (!user) return;
    
    analytics.clickItem(
      user.id,
      product.id,
      product.category,
      {
        name: product.name,
        price: product.price,
        position: data?.products?.indexOf(product) || 0,
      }
    );
  };

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(maxItems)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 rounded-lg h-64" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading recommendations:', error);
    return null; // Or show a fallback UI
  }

  const products = data?.products?.slice(0, maxItems) || [];
  
  if (products.length === 0) {
    return null; // Don't render anything if no products
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div 
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <div className="aspect-square bg-gray-100 relative">
              <img
                src={product.imageUrl || product.image || '/placeholder-product.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback image if the main image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-product.jpg';
                }}
              />
              {product.isNew && (
                <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  New
                </span>
              )}
              {product.discount && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  -{product.discount}%
                </span>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm line-clamp-2 h-10">
                {product.name}
              </h3>
              <div className="flex items-center mt-1">
                {product.rating !== undefined && (
                  <div className="flex items-center text-yellow-500 mr-2">
                    <span className="text-xs">★</span>
                    <span className="text-xs ml-0.5">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                )}
                {product.reviewCount !== undefined && (
                  <span className="text-gray-500 text-xs">
                    ({product.reviewCount})
                  </span>
                )}
              </div>
              <div className="mt-2">
                <span className="font-semibold">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
