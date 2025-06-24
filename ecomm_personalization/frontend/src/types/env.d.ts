namespace NodeJS {
  export interface ProcessEnv {
    // Node.js
    NODE_ENV: 'development' | 'production' | 'test';
    
    // Next.js
    NEXT_PUBLIC_APP_ENV: 'development' | 'staging' | 'production';
    NEXT_PUBLIC_API_BASE_URL: string;
    
    // Feature Flags
    NEXT_PUBLIC_ENABLE_PERSONALIZATION?: 'true' | 'false';
    NEXT_PUBLIC_ENABLE_ANALYTICS?: 'true' | 'false';
    
    // Analytics
    NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
    
    // Authentication
    NEXT_PUBLIC_AUTH0_DOMAIN?: string;
    NEXT_PUBLIC_AUTH0_CLIENT_ID?: string;
    NEXT_PUBLIC_AUTH0_AUDIENCE?: string;
    
    // Other environment variables
    [key: `NEXT_PUBLIC_${string}`]: string | undefined;
  }
}
