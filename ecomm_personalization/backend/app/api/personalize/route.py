from fastapi import APIRouter, HTTPException, Request, Depends
from pydantic import BaseModel
from typing import Dict, Any, Optional, List
import json
import logging
from datetime import datetime

# Import our services
from services.recommendation_engine import RecommendationEngine
from services.data_processor import DataProcessor

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize router
router = APIRouter()

# Initialize services
recommendation_engine = RecommendationEngine()
data_processor = DataProcessor()

# Mock data - in a real app, this would come from your database
MOCK_PRODUCTS = [
    {
        "id": "p1",
        "name": "Wireless Earbuds",
        "price": 99.99,
        "image": "/images/products/earbuds.jpg",
        "category": "electronics",
        "popularity": 0.85,
        "is_mobile_friendly": True,
        "popularity_morning": 0.7,
        "popularity_evening": 0.9
    },
    {
        "id": "p2",
        "name": "Smart Watch",
        "price": 249.99,
        "image": "/images/products/smartwatch.jpg",
        "category": "electronics",
        "popularity": 0.92,
        "is_mobile_friendly": True,
        "popularity_morning": 0.8,
        "popularity_evening": 0.95
    },
    {
        "id": "p3",
        "name": "Running Shoes",
        "price": 129.99,
        "image": "/images/products/shoes.jpg",
        "category": "sports",
        "popularity": 0.78,
        "is_mobile_friendly": True,
        "popularity_morning": 0.9,
        "popularity_evening": 0.6
    }
]

# Mock user profiles - in a real app, this would come from your database
MOCK_USER_PROFILES = [
    {
        "user_id": "u1",
        "total_sessions": 5,
        "total_duration_seconds": 3600,
        "avg_session_duration": 720,
        "total_page_views": 42,
        "total_product_views": 15,
        "total_add_to_cart": 3,
        "total_purchases": 1,
        "conversion_rate": 0.2,
        "unique_products_viewed": 8,
        "unique_categories_viewed": 3,
        "primary_device": "mobile",
        "top_categories": ["electronics", "sports", "fashion"],
        "products_viewed": ["p1", "p2", "p3"],
        "categories": ["electronics", "sports"]
    },
    {
        "user_id": "u2",
        "total_sessions": 12,
        "total_duration_seconds": 5400,
        "avg_session_duration": 450,
        "total_page_views": 87,
        "total_product_views": 32,
        "total_add_to_cart": 8,
        "total_purchases": 4,
        "conversion_rate": 0.33,
        "unique_products_viewed": 15,
        "unique_categories_viewed": 5,
        "primary_device": "desktop",
        "top_categories": ["home", "electronics", "beauty"],
        "products_viewed": ["p1", "p2"],
        "categories": ["electronics", "home"]
    }
]

# Train the recommendation engine with mock data
recommendation_engine.train(MOCK_USER_PROFILES, MOCK_PRODUCTS)

class PersonalizationRequest(BaseModel):
    contentType: str
    context: Dict[str, Any]
    userId: Optional[str] = None
    options: Optional[Dict[str, Any]] = None

@router.post("/api/personalize")
async def get_personalized_content(
    request: Request,
    data: PersonalizationRequest
):
    try:
        logger.info(f"Received personalization request: {data}")
        
        # Get user ID from request or generate a new one
        user_id = data.userId or request.headers.get("x-user-id") or f"anon_{request.client.host}"
        
        # Get recommendation type based on content type
        recommendation_type = data.contentType
        
        # Prepare context for recommendation engine
        context = {
            "user_id": user_id,
            "device_type": data.context.get("deviceType"),
            "time_of_day": data.context.get("timeOfDay"),
            "location": data.context.get("location", {}).get("country"),
            "referrer": data.context.get("referrer"),
            "is_new_user": data.context.get("isNewUser", True),
            "session_id": data.context.get("sessionId")
        }
        
        # Get recommendations
        recommendations = recommendation_engine.get_recommendations(
            user_id=user_id if user_id.startswith("u") else None,
            context=context,
            n_recommendations=8
        )
        
        # Generate response based on content type
        response = {
            "timestamp": datetime.utcnow().isoformat(),
            "recommendation_type": recommendations["recommendation_type"],
            "explanation": recommendations["explanation"],
            "content": {
                "heroBanner": {
                    "title": "Welcome to Our Store",
                    "subtitle": "Discover amazing products tailored just for you",
                    "ctaText": "Shop Now",
                    "ctaLink": "/products",
                    "imageUrl": "/images/hero-banner.jpg"
                },
                "featuredCategories": [
                    {
                        "id": "electronics",
                        "name": "Electronics",
                        "imageUrl": "/images/categories/electronics.jpg",
                        "slug": "electronics"
                    },
                    {
                        "id": "fashion",
                        "name": "Fashion",
                        "imageUrl": "/images/categories/fashion.jpg",
                        "slug": "fashion"
                    },
                    {
                        "id": "home",
                        "name": "Home & Living",
                        "imageUrl": "/images/categories/home.jpg",
                        "slug": "home"
                    },
                    {
                        "id": "beauty",
                        "name": "Beauty",
                        "imageUrl": "/images/categories/beauty.jpg",
                        "slug": "beauty"
                    }
                ],
                "recommendedProducts": recommendations.get("recommended_products", [])
            },
            "context": context
        }
        
        # Add personalized greeting for logged-in users
        if user_id.startswith("u"):
            user_profile = next((u for u in MOCK_USER_PROFILES if u["user_id"] == user_id), None)
            if user_profile:
                top_category = user_profile.get("top_categories", [""])[0]
                if top_category:
                    response["content"]["heroBanner"]["subtitle"] = f"Discover amazing {top_category} deals just for you"
        
        # Log the response
        logger.info(f"Generated personalized content for user {user_id}")
        
        return response
        
    except Exception as e:
        logger.error(f"Error generating personalized content: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

# Analytics endpoint for tracking user events
@router.post("/api/analytics/track")
async def track_event(request: Request):
    try:
        event_data = await request.json()
        logger.info(f"Tracking event: {json.dumps(event_data, indent=2)}")
        
        # In a real app, you would:
        # 1. Validate the event data
        # 2. Store it in your analytics database
        # 3. Update user profiles in real-time
        # 4. Trigger any relevant automations
        
        return {"status": "success", "message": "Event tracked successfully"}
        
    except Exception as e:
        logger.error(f"Error tracking event: {str(e)}", exc_info=True)
        raise HTTPException(status_code=400, detail=str(e))
