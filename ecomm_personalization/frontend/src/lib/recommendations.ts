import { Product, getProductById, getProducts } from './products';
// TODO: Type userProfile properly if needed

interface RecommendationOptions {
  userId: string;
  userProfile?: any; // TODO: type this properly
  limit?: number;
  currentProductId?: string;
  context?: Record<string, any>; // Add context for demographics, engagement, etc.
}

// Get personalized recommendations based on user profile and behavior
export const getPersonalizedRecommendations = async ({
  userId,
  userProfile,
  limit = 4,
  currentProductId,
  context = {}, // Accept context
}: RecommendationOptions): Promise<Product[]> => {
  try {
    // In a real app, this would be an API call to your recommendation service
    // For now, we'll implement a simple recommendation logic
    // TODO: Forward context to backend API when available
    // Example: await recommendationApi.getRecommendations(userId, context)
    // ...
    // Get all products
    const { products } = await getProducts({});
    
    // Filter out current product if provided
    let recommendations = products.filter(p => p.id !== currentProductId);
    
    // Apply recommendation logic based on user profile data
    if (userProfile) {
      // 1. Filter by user preferences
      if (userProfile.preferences?.categories?.length) {
        recommendations = recommendations.filter(product =>
          product.categories.some(category =>
            userProfile.preferences?.categories?.includes(category)
          )
        );
      }
      
      // 2. Filter by price range if set
      if (userProfile.preferences?.priceRange) {
        const [min, max] = userProfile.preferences.priceRange;
        recommendations = recommendations.filter(
          product => product.price >= min && product.price <= max
        );
      }
      
      // 3. Sort by engagement level
      switch (userProfile.engagementLevel) {
        case 'repeat_purchaser':
          // Show new arrivals and bestsellers for repeat purchasers
          recommendations.sort((a, b) => {
            const aScore = (a.rating || 0) * 0.7 + (a.viewCount || 0) * 0.3;
            const bScore = (b.rating || 0) * 0.7 + (b.viewCount || 0) * 0.3;
            return bScore - aScore;
          });
          break;
          
        case 'frequent_viewer':
          // Show trending and popular items for frequent viewers
          recommendations.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
          break;
          
        case 'cart_abandoner':
          // Show discounted items and bestsellers for cart abandoners
          recommendations.sort((a, b) => {
            const aDiscount = a.discount || 0;
            const bDiscount = b.discount || 0;
            if (aDiscount !== bDiscount) return bDiscount - aDiscount;
            return (b.rating || 0) - (a.rating || 0);
          });
          break;
          
        default:
          // Default sorting by popularity
          recommendations.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }
    }
    
    // 4. Ensure we have enough recommendations
    if (recommendations.length < limit) {
      const moreProducts = (await getProducts({})).products
        .filter(p => !recommendations.some(r => r.id === p.id) && p.id !== currentProductId)
        .slice(0, limit - recommendations.length);
      recommendations = [...recommendations, ...moreProducts];
    }
    
    // TODO: Use context for more advanced filtering
    return recommendations.slice(0, limit);
    
  } catch (error) {
    console.error('Error getting personalized recommendations:', error);
    // Fallback to trending products
    const { products } = await getProducts({ sortBy: 'popularity', limit });
    return products;
  }
};

// Get similar products based on a product
interface SimilarProductsOptions {
  productId: string;
  limit?: number;
  excludeIds?: string[];
}

export const getSimilarProducts = async ({
  productId,
  limit = 4,
  excludeIds = [],
}: SimilarProductsOptions): Promise<Product[]> => {
  try {
    const product = await getProductById(productId);
    
    // Get products from the same category
    const { products } = await getProducts({
      category: product.categories[0],
      limit: limit * 2, // Get more to filter out excluded IDs
    });
    
    // Filter out current product and excluded IDs
    let similar = products.filter(
      p => p.id !== productId && !excludeIds.includes(p.id)
    );
    
    // If not enough similar products, get more
    if (similar.length < limit) {
      const moreProducts = (await getProducts({})).products
        .filter(
          p => 
            p.id !== productId && 
            !excludeIds.includes(p.id) && 
            !similar.some(s => s.id === p.id)
        )
        .slice(0, limit - similar.length);
      similar = [...similar, ...moreProducts];
    }
    
    return similar.slice(0, limit);
    
  } catch (error) {
    console.error('Error getting similar products:', error);
    // Fallback to trending products
    const { products } = await getProducts({ sortBy: 'popularity', limit });
    return products;
  }
};

// Get trending products
interface TrendingProductsOptions {
  limit?: number;
  category?: string;
}

export const getTrendingProducts = async ({
  limit = 4,
  category,
}: TrendingProductsOptions = {}): Promise<Product[]> => {
  try {
    const { products } = await getProducts({
      category,
      sortBy: 'popularity',
      limit,
    });
    return products;
  } catch (error) {
    console.error('Error getting trending products:', error);
    return [];
  }
};

// Get recently viewed products
interface RecentlyViewedOptions {
  productIds: string[];
  limit?: number;
  excludeId?: string;
}

export const getRecentlyViewedProducts = async ({
  productIds,
  limit = 4,
  excludeId,
}: RecentlyViewedOptions): Promise<Product[]> => {
  try {
    // Get products by IDs
    const products = await Promise.all(
      productIds
        .filter(id => id !== excludeId)
        .slice(0, limit * 2) // Get more in case some are not found
        .map(id => getProductById(id).catch(() => null))
    );
    
    // Filter out any failed fetches and duplicates
    const uniqueProducts = products
      .filter((p): p is Product => p !== null)
      .filter((p, i, arr) => arr.findIndex(prod => prod.id === p.id) === i);
    
    return uniqueProducts.slice(0, limit);
    
  } catch (error) {
    console.error('Error getting recently viewed products:', error);
    return [];
  }
};
