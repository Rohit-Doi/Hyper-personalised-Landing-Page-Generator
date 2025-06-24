import axios, { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { featuredProducts, newArrivals, BaseProduct } from '@/data/products';
import { categories } from '@/data/categories';

// Types

type DeviceType = 'mobile' | 'tablet' | 'desktop';
type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
type UserSegment = 'new' | 'returning' | 'frequent' | 'loyal' | 'champion';
type UserIntent = 'browsing' | 'researching' | 'purchasing' | 'reordering';

interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface LocationData {
  country: string;
  region: string;
  city: string;
  timezone: string;
  coordinates?: Coordinates;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  discount?: number;
  tags?: string[];
  popularity?: number;
}

interface UserContext {
  deviceType: DeviceType;
  timeOfDay: TimeOfDay;
  location: LocationData | null;
  referrer: string | null;
  isNewUser: boolean;
  sessionId: string;
  userId: string | null;
  userSegment?: UserSegment;
  userIntent?: UserIntent;
  lastInteraction?: number; // timestamp
  sessionStart?: number; // timestamp
  pagesViewed?: string[];
  itemsInCart?: string[]; // product IDs
  pastPurchases?: string[]; // product IDs
  viewedProducts?: string[]; // product IDs
  searchQueries?: string[];
  preferredCategories?: string[];
  preferredPriceRange?: {
    min: number;
    max: number;
  };
}

interface PersonalizationOptions {
  refresh?: boolean;
  maxRecommendations?: number;
  preferredCategories?: string[];
  excludeViewed?: boolean;
  excludePurchased?: boolean;
  priceRange?: {
    min?: number;
    max?: number;
  };
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'popularity' | 'rating' | 'newest';
  [key: string]: any;
}

interface PersonalizationRequest {
  contentType: string;
  context: UserContext;
  userId: string | null;
  options?: PersonalizationOptions;
}

interface PersonalizationResponse {
  success: boolean;
  data: {
    recommendations: Product[];
    sections: {
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
      personalizedRecommendations?: {
        title: string;
        products: Product[];
      };
      trendingProducts?: {
        title: string;
        products: Product[];
      };
      recentlyViewed?: {
        title: string;
        products: Product[];
      };
    };
    metadata: {
      recommendationId: string;
      recommendationType: 'personalized' | 'trending' | 'popular' | 'similar' | 'fallback';
      modelVersion: string;
      generatedAt: string;
      contextUsed: Partial<UserContext>;
    };
  };
  context: any;
  timestamp: string;
}

// Simple logger
const logger = {
  info: (message: string, ...args: any[]) => console.log(`[INFO] ${message}`, ...args),
  error: (message: string, ...args: any[]) => console.error(`[ERROR] ${message}`, ...args),
  warn: (message: string, ...args: any[]) => console.warn(`[WARN] ${message}`, ...args),
  debug: (message: string, ...args: any[]) => console.debug(`[DEBUG] ${message}`, ...args),
};

// Convert BaseProduct to Product interface
const toProduct = (product: BaseProduct): Product => ({
  ...product,
  category: product.category,
  inStock: product.inStock ?? true,
  tags: product.tags || [],
  popularity: (product.rating * Math.log10(product.reviewCount + 1)) / 5 // Calculate popularity score
});

// Combine all available products
const ALL_PRODUCTS: Product[] = [
  ...featuredProducts.map(toProduct),
  ...newArrivals.map(toProduct)
];

// Helper function to get a random subset of products
function getRandomProducts(products: Product[], count: number): Product[] {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Helper function to get products by category
function getProductsByCategory(products: Product[], category: string): Product[] {
  return products.filter(product => 
    product.category?.toLowerCase() === category.toLowerCase()
  );
}

// Helper function to get similar products
function getSimilarProducts(productId: string, count: number = 4): Product[] {
  // In a real app, this would use a more sophisticated algorithm
  // For now, we'll just return random products from the same category
  const product = ALL_PRODUCTS.find(p => p.id === productId);
  if (!product) return getRandomProducts(ALL_PRODUCTS, count);
  
  const sameCategory = ALL_PRODUCTS.filter(
    p => p.id !== productId && p.category === product.category
  );
  
  return sameCategory.length >= count 
    ? sameCategory.slice(0, count) 
    : [...sameCategory, ...getRandomProducts(ALL_PRODUCTS, count - sameCategory.length)];
}

class PersonalizationService {
  private static instance: PersonalizationService;
  private userId: string | null = null;
  private sessionId: string;
  private deviceType: DeviceType = 'desktop';
  private timeOfDay: TimeOfDay = 'afternoon';
  private location: LocationData | null = null;
  private referrer: string | null = null;
  private isNewUser: boolean = true;
  private apiBaseUrl: string;
  private userContext: UserContext;
  private products: Product[] = [];
  private userSegments: Record<string, any> = {};
  private recommendations: Record<string, any> = {};
  private lastInteraction: number = Date.now();
  private sessionStart: number = Date.now();
  private pagesViewed: string[] = [];
  private itemsInCart: string[] = [];
  private pastPurchases: string[] = [];
  private viewedProducts: string[] = [];
  private searchQueries: string[] = [];
  private preferredCategories: string[] = [];
  private preferredPriceRange: { min: number; max: number } | null = null;

  private constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    this.userContext = this.getDefaultContext();
    this.products = ALL_PRODUCTS;
    this.initialize();
  }

  private getDefaultContext(): UserContext {
    const preferredPriceRange = this.preferredPriceRange 
      ? { 
          min: this.preferredPriceRange.min, 
          max: this.preferredPriceRange.max 
        } 
      : undefined;

    return {
      deviceType: this.deviceType,
      timeOfDay: this.timeOfDay,
      location: this.location,
      referrer: this.referrer,
      isNewUser: this.isNewUser,
      sessionId: this.sessionId,
      userId: this.userId,
      userSegment: 'new',
      userIntent: 'browsing',
      lastInteraction: this.lastInteraction,
      sessionStart: this.sessionStart,
      pagesViewed: this.pagesViewed,
      itemsInCart: this.itemsInCart,
      pastPurchases: this.pastPurchases,
      viewedProducts: this.viewedProducts,
      searchQueries: this.searchQueries,
      preferredCategories: this.preferredCategories,
      preferredPriceRange: preferredPriceRange
    };
  }

  public static getInstance(): PersonalizationService {
    if (!PersonalizationService.instance) {
      PersonalizationService.instance = new PersonalizationService();
    }
    return PersonalizationService.instance;
  }

  private getOrCreateSessionId(): string {
    if (typeof window === 'undefined') return uuidv4();
    
    try {
      let sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = uuidv4();
        localStorage.setItem('sessionId', sessionId);
      }
      return sessionId;
    } catch (e) {
      console.warn('Failed to access localStorage:', e);
      return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }

  private async initialize(): Promise<void> {
    // Run all detection methods in parallel
    await Promise.all([
      this.detectDeviceType(),
      this.detectTimeOfDay(),
      this.detectLocation(),
      this.detectReferrer(),
      this.loadUserData()
    ]);

    // Update context with detected values
    this.updateContext({
      deviceType: this.deviceType,
      timeOfDay: this.timeOfDay,
      location: this.location,
      referrer: this.referrer,
      isNewUser: this.isNewUser
    });
  }

  private detectDeviceType(): void {
    if (typeof window === 'undefined') return;
    
    const userAgent = window.navigator.userAgent.toLowerCase();
    
    if (/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
      this.deviceType = 'mobile';
    } else if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      this.deviceType = 'tablet';
    } else {
      this.deviceType = 'desktop';
    }
  }

  private detectTimeOfDay(): void {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.timeOfDay = 'morning';
    } else if (hour < 17) {
      this.timeOfDay = 'afternoon';
    } else if (hour < 21) {
      this.timeOfDay = 'evening';
    } else {
      this.timeOfDay = 'night';
    }
  }

  private async detectLocation(): Promise<void> {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      this.location = {
        country: 'Unknown',
        region: 'Unknown',
        city: 'Unknown',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      // In a real app, you would reverse geocode these coordinates
      this.location = {
        country: 'Unknown',
        region: 'Unknown',
        city: 'Unknown',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        coordinates: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        }
      };
    } catch (error) {
      console.warn('Could not get geolocation:', error);
      this.location = {
        country: 'Unknown',
        region: 'Unknown',
        city: 'Unknown',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
    }
  }

  private detectReferrer(): void {
    if (typeof document !== 'undefined') {
      this.referrer = document.referrer || 'direct';
    } else {
      this.referrer = 'direct';
    }
  }

  private loadUserData(): void {
    if (typeof window === 'undefined') {
      this.userId = `server_${uuidv4()}`;
      this.isNewUser = true;
      return;
    }

    try {
      // Check for existing user ID in localStorage
      const savedUserId = localStorage.getItem('userId');
      if (savedUserId) {
        this.userId = savedUserId;
        this.isNewUser = false;
        
        // Load user preferences
        const userData = localStorage.getItem(`user_${savedUserId}`);
        if (userData) {
          try {
            const parsedData = JSON.parse(userData);
            if (parsedData.preferredCategories) {
              this.preferredCategories = parsedData.preferredCategories;
            }
            if (parsedData.viewedProducts) {
              this.viewedProducts = parsedData.viewedProducts;
            }
          } catch (e) {
            console.warn('Failed to parse user data:', e);
          }
        }
      } else {
        // Generate new anonymous user ID
        this.userId = `anon_${uuidv4()}`;
        try {
          localStorage.setItem('userId', this.userId);
        } catch (e) {
          console.warn('Failed to save userId to localStorage:', e);
        }
        this.isNewUser = true;
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      this.userId = `anon_${uuidv4()}`;
      this.isNewUser = true;
    }
  }

  // Update user context with new data
  public updateContext(updates: Partial<UserContext>): void {
    this.userContext = {
      ...this.userContext,
      ...updates,
      lastInteraction: Date.now()
    };
  }

  // Track user events - implementation kept at line 606

  // Get personalized recommendations - implementation kept at line 576

  // Get recommendations for a product
  public async getProductRecommendations(
    productId: string,
    options: PersonalizationOptions = {}
  ): Promise<Product[]> {
    // For now, always use client-side recommendations
    console.log('Using client-side recommendations...');
    return this.getSimilarProducts(productId, options.maxRecommendations || 4);
    
    // Uncomment this code when backend is ready
    /*
    try {
      // First try to get recommendations from the backend
      if (this.apiBaseUrl) {
        const response = await axios.get<Product[]>(`${this.apiBaseUrl}/recommendations/product/${productId}`, {
          params: { ...options }
        });
        return response.data;
      }
      
      // Fallback to client-side recommendations if backend is not available
      return this.getSimilarProducts(productId, options.maxRecommendations || 4);
    } catch (error) {
      console.error('Error getting product recommendations:', error);
      // Fallback to client-side recommendations on error
      return this.getSimilarProducts(productId, options.maxRecommendations || 4);
    }
    */
  }

  // Get similar products based on a product ID
  private getSimilarProducts(productId: string, count: number = 4): Product[] {
    // Find the target product
    const targetProduct = this.products.find(p => p.id === productId);
    if (!targetProduct) {
      return [];
    }

    // Get products from the same category, excluding the target product
    const similarProducts = this.products.filter(
      p => p.id !== productId && p.category === targetProduct.category
    );

    // Sort by relevance (in a real app, this would be more sophisticated)
    const sortedProducts = [...similarProducts].sort((a, b) => {
      // Simple sorting by rating (highest first), then price (lowest first)
      const ratingDiff = (b.rating || 0) - (a.rating || 0);
      if (ratingDiff !== 0) return ratingDiff;
      return (a.price || 0) - (b.price || 0);
    });

    // Return the requested number of products
    return sortedProducts.slice(0, count);
  }

  // Track user events - for now just log to console
  public async trackEvent(eventName: string, eventData: Record<string, any> = {}): Promise<void> {
    if (typeof window === 'undefined') return;
    
    const eventPayload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      userId: this.userId,
      sessionId: this.sessionId,
      context: this.getContext(),
      data: eventData,
    };
    
    // Just log the event for now
    console.log(`[Event] ${eventName}:`, eventPayload);
    
    // Uncomment this code when backend is ready
    /*
    try {
      // Send event to the server
      await axios.post(
        `${this.apiBaseUrl}/track`,
        eventPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error tracking event:', error);
    }
    */
    // Don't throw to prevent breaking the application flow 
  }

  // Get the current user context
  public getContext(): UserContext {
    return {
      deviceType: this.deviceType,
      timeOfDay: this.timeOfDay,
      location: this.location,
      referrer: this.referrer,
      isNewUser: this.isNewUser,
      sessionId: this.sessionId,
      userId: this.userId,
      userSegment: this.userContext.userSegment,
      userIntent: this.userContext.userIntent,
      lastInteraction: this.userContext.lastInteraction,
      sessionStart: this.userContext.sessionStart,
      pagesViewed: this.userContext.pagesViewed,
      itemsInCart: this.userContext.itemsInCart,
      pastPurchases: this.userContext.pastPurchases,
      viewedProducts: this.userContext.viewedProducts,
      searchQueries: this.userContext.searchQueries,
      preferredCategories: this.userContext.preferredCategories,
      preferredPriceRange: this.userContext.preferredPriceRange
    };
  }
}

export const personalizationService = PersonalizationService.getInstance();
