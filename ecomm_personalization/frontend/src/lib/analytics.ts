import { recommendationApi } from './api-client';

// Types for tracking events
export type EventType = 
  | 'view' 
  | 'click' 
  | 'add_to_cart' 
  | 'purchase' 
  | 'search' 
  | 'login' 
  | 'signup'
  | 'page_view';

export interface EventProperties {
  [key: string]: any;
}

export interface TrackEventOptions {
  userId: string;
  eventType: EventType;
  itemId?: string | number;
  itemCategory?: string;
  properties?: EventProperties;
}

/**
 * Track user interactions and send them to the analytics service
 */
const trackEvent = async (options: TrackEventOptions) => {
  const { userId, eventType, itemId, itemCategory, properties = {} } = options;
  
  if (!userId) {
    console.warn('No user ID provided for tracking event:', eventType);
    return;
  }

  return analytics.trackEvent({
    userId,
    eventType,
    itemId,
    itemCategory,
    properties,
  });
};

// Helper functions for common event types
export const analytics = {
  trackEvent: async (options: TrackEventOptions) => {
    const { userId, eventType, itemId, itemCategory, properties = {} } = options;
    
    try {
      // Prepare the interaction data
      const interactionData: any = {
        userId,
        eventName: eventType,
        value: 1,
      };
      
      if (itemId) {
        interactionData.itemId = itemId.toString();
      }
      
      // Add optional fields if they exist
      if (itemCategory) {
        interactionData.itemCategory = itemCategory;
      }
      
      // Add properties as metadata
      if (Object.keys(properties).length > 0) {
        interactionData.metadata = {
          ...properties,
          timestamp: new Date().toISOString(),
          url: typeof window !== 'undefined' ? window.location.href : '',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        };
      }
      
      // Send interaction to the backend for personalization
      await recommendationApi.recordInteraction(interactionData);
      
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[Analytics] Tracked event:', {
          eventType,
          itemId,
          itemCategory,
          properties,
        });
      }
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  },
  viewItem: (userId: string, itemId: string | number, category?: string, properties?: EventProperties) =>
    analytics.trackEvent({
      userId,
      eventType: 'view',
      itemId,
      itemCategory: category,
      properties,
    }),
    
  clickItem: (userId: string, itemId: string | number, category?: string, properties?: EventProperties) =>
    analytics.trackEvent({
      userId,
      eventType: 'click',
      itemId,
      itemCategory: category,
      properties,
    }),
    
  addToCart: (userId: string, itemId: string | number, category?: string, quantity: number = 1, properties?: EventProperties) =>
    analytics.trackEvent({
      userId,
      eventType: 'add_to_cart',
      itemId,
      itemCategory: category,
      properties: {
        ...properties,
        quantity,
      },
    }),
    
  purchase: (userId: string, orderId: string, items: Array<{ id: string | number; quantity: number; price: number }>, total: number, properties?: EventProperties) =>
    analytics.trackEvent({
      userId,
      eventType: 'purchase',
      itemId: orderId,
      properties: {
        ...properties,
        items,
        total,
        currency: 'USD', // You might want to make this dynamic
      },
    }),
    
  search: (userId: string, query: string, resultsCount: number, properties?: EventProperties) =>
    analytics.trackEvent({
      userId,
      eventType: 'search',
      properties: {
        ...properties,
        query,
        resultsCount,
      },
    }),
    
  login: (userId: string, method: string, properties?: EventProperties) =>
    analytics.trackEvent({
      userId,
      eventType: 'login',
      properties: {
        ...properties,
        method,
      },
    }),
    
  signup: (userId: string, method: string, properties?: EventProperties) =>
    trackEvent({
      userId,
      eventType: 'signup',
      properties: {
        ...properties,
        method,
      },
    }),
};
