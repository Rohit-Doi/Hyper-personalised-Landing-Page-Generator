import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recommendationApi, type ApiResponse } from '@/lib/api-client';

export interface Product {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  imageUrl: string;
  image?: string; // For API compatibility
  brand?: string;
  discount?: number;
  isNew?: boolean;
  isTrending?: boolean;
  category?: string;
  description?: string;
}

export interface RecommendationResponse {
  products: Product[];
  segments?: string[];
  personalization?: {
    score: number;
    factors: string[];
  };
}

interface RecommendationParams {
  userId?: string | number;
  context?: {
    device?: string;
    location?: string;
    [key: string]: any;
  };
}

// Get recommendations for a user
export const useRecommendations = (params: RecommendationParams) => {
  const { userId, context = {} } = params;
  
  return useQuery<RecommendationResponse, Error>({
    queryKey: ['recommendations', userId, context],
    queryFn: async () => {
      if (!userId) throw new Error('User ID is required');
      try {
        const response = await recommendationApi.getRecommendations(
          String(userId),
          context
        );
        if (response.error) {
          throw new Error(response.error);
        }
        return response.data || { products: [] };
      } catch (err: any) {
        if (err.message && err.message.includes('Not Found')) {
          // Return empty recommendations if API is not found
          return { products: [] };
        }
        throw err;
      }
    },
    enabled: !!userId, // Only run query when userId is available
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Record user interaction
export const useRecordInteraction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: {
      userId: string | number;
      eventName: string;
      itemId: string | number;
      itemCategory?: string;
      value?: any;
      metadata?: Record<string, any>;
    }) => {
      const response = await recommendationApi.recordInteraction({
        ...data,
        userId: String(data.userId),
        itemId: String(data.itemId),
      });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      return response.data;
    },
    onSuccess: () => {
      // Invalidate relevant queries when interaction is recorded
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
    },
  });
};

// Get personalized landing page
export const useLandingPage = (userId: string | number) => {
  return useQuery({
    queryKey: ['landingPage', userId],
    queryFn: async () => {
      const response = await recommendationApi.getLandingPage(String(userId));
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      return response.data || {};
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
