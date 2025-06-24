// Types for products

export interface ProductImage {
  url: string;
  alt?: string;
  isPrimary?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  sku: string;
  stock: number;
  color?: string;
  size?: string;
  image?: string;
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title?: string;
  comment?: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  currency?: string;
  sku: string;
  stock: number;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
  images: string[];
  thumbnails?: string[];
  categories: string[];
  tags?: string[];
  brand?: string;
  variants?: ProductVariant[];
  specifications?: ProductSpecification[];
  reviews?: ProductReview[];
  relatedProducts?: string[];
  createdAt: string;
  updatedAt: string;
  // Additional fields for personalization
  viewCount?: number;
  purchaseCount?: number;
  wishlistCount?: number;
  metadata?: Record<string, any>;
}

export interface ProductFilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'popularity' | 'rating';
  page?: number;
  limit?: number;
  searchQuery?: string;
}

export interface ProductRecommendationOptions {
  userId: string;
  currentProductId?: string;
  category?: string;
  limit?: number;
  includeSimilar?: boolean;
  includeTrending?: boolean;
  includePersonalized?: boolean;
}

// Mock data for development
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    slug: 'classic-white-tshirt',
    description: 'A classic white t-shirt made from 100% organic cotton. Perfect for any casual occasion.',
    shortDescription: 'Classic fit white t-shirt',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    currency: 'USD',
    sku: 'TS-WHITE-001',
    stock: 50,
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
      'https://images.unsplash.com/photo-1581655358543-82b657209f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1586363104862-616a0b0a3b4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    ],
    categories: ['T-Shirts', 'Men', 'New Arrivals'],
    tags: ['best-seller', 'summer-collection', 'organic'],
    brand: 'FashionCo',
    variants: [
      { id: '1-1', name: 'XS', price: 29.99, sku: 'TS-WHITE-001-XS', stock: 10 },
      { id: '1-2', name: 'S', price: 29.99, sku: 'TS-WHITE-001-S', stock: 15 },
      { id: '1-3', name: 'M', price: 29.99, sku: 'TS-WHITE-001-M', stock: 20 },
      { id: '1-4', name: 'L', price: 29.99, sku: 'TS-WHITE-001-L', stock: 5 },
      { id: '1-5', name: 'XL', price: 29.99, sku: 'TS-WHITE-001-XL', stock: 0 },
    ],
    specifications: [
      { name: 'Material', value: '100% Organic Cotton' },
      { name: 'Fit', value: 'Regular' },
      { name: 'Sleeve', value: 'Short Sleeve' },
      { name: 'Neck', value: 'Crew Neck' },
      { name: 'Style', value: 'Casual' },
      { name: 'Occasion', value: 'Everyday' },
      { name: 'Care', value: 'Machine wash cold, Tumble dry low' },
    ],
    relatedProducts: ['2', '3', '4'],
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-06-20T14:25:00Z',
  },
  // Add more mock products as needed
];

// API Functions
export const getProductById = async (id: string): Promise<Product> => {
  // In a real app, this would be an API call
  const product = mockProducts.find(p => p.id === id);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  return product;
};

export const getProducts = async (options: ProductFilterOptions = {}): Promise<{ products: Product[]; total: number }> => {
  // In a real app, this would be an API call with query parameters
  let filteredProducts = [...mockProducts];
  
  // Apply filters
  if (options.category) {
    filteredProducts = filteredProducts.filter(p => 
      p.categories.some(cat => cat.toLowerCase().includes(options.category!.toLowerCase()))
    );
  }
  
  if (options.minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= options.minPrice!);
  }
  
  if (options.maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= options.maxPrice!);
  }
  
  if (options.sizes && options.sizes.length > 0) {
    filteredProducts = filteredProducts.filter(p => 
      p.variants?.some(v => options.sizes!.includes(v.name))
    );
  }
  
  // Apply sorting
  if (options.sortBy) {
    switch (options.sortBy) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popularity':
        filteredProducts.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
        break;
      case 'newest':
      default:
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
  }
  
  // Apply pagination
  const page = options.page || 1;
  const limit = options.limit || 12;
  const startIndex = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit);
  
  return {
    products: paginatedProducts,
    total: filteredProducts.length,
  };
};

export const getRecommendedProducts = async (
  options: ProductRecommendationOptions
): Promise<Product[]> => {
  const { userId, currentProductId, category, limit = 4 } = options;
  
  try {
    // In a real app, this would be an API call to your recommendation service
    // For now, we'll return some mock recommendations
    
    // Filter out the current product
    let recommendations = mockProducts.filter(p => p.id !== currentProductId);
    
    // Filter by category if specified
    if (category) {
      recommendations = recommendations.filter(p => 
        p.categories.some(cat => 
          cat.toLowerCase().includes(category.toLowerCase())
        )
      );
    }
    
    // Sort by popularity (in a real app, this would be based on the recommendation score)
    recommendations.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    // Return the top N recommendations
    return recommendations.slice(0, limit);
    
  } catch (error) {
    console.error('Error fetching recommended products:', error);
    return [];
  }
};

export const searchProducts = async (query: string, options: Omit<ProductFilterOptions, 'searchQuery'> = {}): Promise<{ products: Product[]; total: number }> => {
  // In a real app, this would be an API call to your search service
  const searchTerm = query.toLowerCase();
  
  let results = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    product.brand?.toLowerCase().includes(searchTerm)
  );
  
  // Apply additional filters
  if (options.category) {
    results = results.filter(p => 
      p.categories.some(cat => cat.toLowerCase().includes(options.category!.toLowerCase()))
    );
  }
  
  // Apply pagination
  const page = options.page || 1;
  const limit = options.limit || 12;
  const startIndex = (page - 1) * limit;
  
  return {
    products: results.slice(startIndex, startIndex + limit),
    total: results.length,
  };
};

export const getRelatedProducts = async (productId: string, limit: number = 4): Promise<Product[]> => {
  // In a real app, this would be an API call
  const product = await getProductById(productId);
  if (!product.relatedProducts || product.relatedProducts.length === 0) {
    // Fallback: return products from the same category
    const category = product.categories[0];
    const { products } = await getProducts({ category, limit });
    return products;
  }
  
  // Get related products by ID
  const relatedProducts = await Promise.all(
    product.relatedProducts
      .filter((id): id is string => id !== productId)
      .slice(0, limit)
      .map(id => getProductById(id).catch(() => null))
  );
  
  return relatedProducts.filter((p): p is Product => p !== null);
};
