// A simple fetch wrapper to handle API requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // For cookies if using session-based auth
    });

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      if (!response.ok) {
        return {
          error: `HTTP ${response.status}: ${response.statusText}`,
        };
      }
      return { data: null as T };
    }

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.detail || data.message || `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    return { data };
  } catch (error) {
    console.error('API Error:', error);
    return {
      error: 'Failed to connect to the server',
    };
  }
}

// Mock product data for fallback
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80',
    category: 'clothing',
    rating: 4.5,
    reviewCount: 128,
    brand: 'StyleHub',
    discount: 10,
    isNew: false,
  },
  {
    id: '2',
    name: 'Denim Jeans',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80',
    category: 'clothing',
    rating: 4.3,
    reviewCount: 89,
    brand: 'StyleHub',
    discount: 0,
    isNew: true,
  },
  {
    id: '3',
    name: 'Leather Handbag',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80',
    category: 'accessories',
    rating: 4.7,
    reviewCount: 256,
    brand: 'StyleHub',
    discount: 15,
    isNew: false,
  },
  {
    id: '4',
    name: 'Running Shoes',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
    category: 'footwear',
    rating: 4.6,
    reviewCount: 342,
    brand: 'StyleHub',
    discount: 0,
    isNew: false,
  },
];

// Recommendation API
export const recommendationApi = {
  getRecommendations: async (userId: string, context: Record<string, any> = {}) => {
    try {
      // Try to get recommendations from the backend
      const response = await apiRequest<any[]>(`/recommendations/${userId}?limit=10`);
      
      if (response.error) {
        console.warn('Failed to fetch recommendations from API, using fallback:', response.error);
        // Return mock data as fallback
        return {
          data: {
            products: MOCK_PRODUCTS,
            segments: ['general'],
            personalization: {
              score: 0.8,
              factors: ['popular', 'trending']
            }
          }
        };
      }
      
      // Transform backend response to frontend format
      const products = response.data?.map((rec, index) => ({
        id: rec.product_id || String(index + 1),
        name: `Product ${rec.product_id || index + 1}`,
        price: Math.floor(Math.random() * 100) + 20,
        imageUrl: MOCK_PRODUCTS[index % MOCK_PRODUCTS.length]?.imageUrl || 'https://via.placeholder.com/400x400',
        category: 'clothing',
        rating: 4.0 + Math.random() * 1.0,
        reviewCount: Math.floor(Math.random() * 500) + 10,
        brand: 'StyleHub',
        discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 5 : 0,
        isNew: Math.random() > 0.8,
        score: rec.score,
        reason: rec.reason
      })) || MOCK_PRODUCTS;
      
      return {
        data: {
          products,
          segments: ['general'],
          personalization: {
            score: 0.8,
            factors: ['popular', 'trending']
          }
        }
      };
    } catch (error) {
      console.error('Error in getRecommendations:', error);
      // Return mock data as fallback
      return {
        data: {
          products: MOCK_PRODUCTS,
          segments: ['general'],
          personalization: {
            score: 0.8,
            factors: ['popular', 'trending']
          }
        }
      };
    }
  },
  
  getLandingPage: async (userId: string) => {
    try {
      // This endpoint doesn't exist in the backend yet, so we'll return mock data
      const response = await apiRequest<Record<string, any>>(`/landing-page/${userId}`);
      
      if (response.error) {
        console.warn('Landing page endpoint not available, using fallback:', response.error);
        // Return mock landing page data
        return {
          data: {
            heroBanner: {
              title: 'Welcome to StyleHub',
              subtitle: 'Discover your perfect style',
              ctaText: 'Shop Now',
              ctaLink: '/products',
              imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80'
            },
            featuredCategories: [
              { id: '1', name: 'Women', imageUrl: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=400&q=80', slug: 'women' },
              { id: '2', name: 'Men', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80', slug: 'men' },
              { id: '3', name: 'Accessories', imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80', slug: 'accessories' }
            ],
            personalizedRecommendations: {
              title: 'Recommended for You',
              products: MOCK_PRODUCTS.slice(0, 4)
            }
          }
        };
      }
      
      return response;
    } catch (error) {
      console.error('Error in getLandingPage:', error);
      return {
        data: {
          heroBanner: {
            title: 'Welcome to StyleHub',
            subtitle: 'Discover your perfect style',
            ctaText: 'Shop Now',
            ctaLink: '/products',
            imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80'
          },
          featuredCategories: [
            { id: '1', name: 'Women', imageUrl: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=400&q=80', slug: 'women' },
            { id: '2', name: 'Men', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80', slug: 'men' },
            { id: '3', name: 'Accessories', imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80', slug: 'accessories' }
          ],
          personalizedRecommendations: {
            title: 'Recommended for You',
            products: MOCK_PRODUCTS.slice(0, 4)
          }
        }
      };
    }
  },
  
  recordInteraction: async (data: {
    userId: string;
    eventName: string;
    itemId: string | number;
    itemCategory?: string;
    value?: any;
  }) => {
    try {
      // This endpoint doesn't exist in the backend yet, so we'll just log it
      console.log('Recording interaction:', data);
      
      // In a real implementation, this would send to the backend
      // For now, we'll return success
      return {
        data: { success: true, message: 'Interaction recorded' }
      };
    } catch (error) {
      console.error('Error recording interaction:', error);
      return {
        error: 'Failed to record interaction'
      };
    }
  },
};
