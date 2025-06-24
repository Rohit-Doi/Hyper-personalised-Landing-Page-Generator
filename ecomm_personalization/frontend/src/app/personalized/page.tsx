'use client';

import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { analytics } from '@/lib/analytics';
import ProductRecommendations from '@/components/recommendations/ProductRecommendations';

export default function PersonalizedPage() {
  const { user, isAuthenticated } = useUser();
  
  // Track page view
  useEffect(() => {
    if (!user?.id) return;
    
    const trackPageView = async () => {
      try {
        await analytics.trackEvent({
          userId: user.id,
          eventType: 'page_view',
          properties: {
            page: 'personalized',
            title: 'Personalized Recommendations',
          },
        });
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };
    
    trackPageView();
  }, [user?.id]);
  
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Personalized Recommendations</h1>
          <p className="text-gray-600 mb-6">
            Sign in to see personalized product recommendations just for you.
          </p>
          <button
            onClick={() => {
              // In a real app, this would open a sign-in modal or redirect
              alert('Please sign in to view personalized recommendations');
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">
        Recommended for You, {user?.name || 'Valued Customer'}
      </h1>
      
      {/* Personalized Product Recommendations */}
      <section className="mb-12">
        <ProductRecommendations 
          title="Based on Your Interests"
          maxItems={4}
          context={{
            section: 'personalized',
            strategy: 'user_preferences',
          }}
        />
      </section>
      
      {/* Trending Now */}
      <section className="mb-12">
        <ProductRecommendations 
          title="Trending Now"
          maxItems={4}
          context={{
            section: 'trending',
            strategy: 'trending',
          }}
        />
      </section>
      
      {/* Based on Your Recent Views */}
      <section className="mb-12">
        <ProductRecommendations 
          title="Recently Viewed"
          maxItems={4}
          context={{
            section: 'recent_views',
            strategy: 'recently_viewed',
          }}
        />
      </section>
      
      {/* Similar to Your Favorites */}
      <section className="mb-12">
        <ProductRecommendations 
          title="Similar to Your Favorites"
          maxItems={4}
          context={{
            section: 'similar_to_favorites',
            strategy: 'similar_items',
          }}
        />
      </section>
    </div>
  );
}
