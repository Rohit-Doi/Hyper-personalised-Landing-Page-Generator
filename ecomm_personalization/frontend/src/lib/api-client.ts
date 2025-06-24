// A simple fetch wrapper to handle API requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

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

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.detail || 'An error occurred',
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

// Recommendation API
export const recommendationApi = {
  getRecommendations: async (userId: string, context: Record<string, any> = {}) => {
    return apiRequest<{ products: any[] }>('/recommendations', {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        ...context,
      }),
    });
  },
  
  getLandingPage: async (userId: string) => {
    return apiRequest<Record<string, any>>(`/landing-page/${userId}`);
  },
  
  recordInteraction: async (data: {
    userId: string;
    eventName: string;
    itemId: string | number;
    itemCategory?: string;
    value?: any;
  }) => {
    return apiRequest('/interactions', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    });
  },
};
