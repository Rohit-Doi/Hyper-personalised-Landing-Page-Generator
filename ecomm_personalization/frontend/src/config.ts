// Environment variables with defaults for development
export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
    timeout: 10000, // 10 seconds
  },
  features: {
    enablePersonalization: process.env.NEXT_PUBLIC_ENABLE_PERSONALIZATION !== 'false',
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  },
  defaults: {
    pageSize: 10,
    currency: 'USD',
    theme: {
      primaryColor: '#2563eb',
      secondaryColor: '#4f46e5',
    },
  },
} as const;

// Type for the config object
export type AppConfig = typeof config;
