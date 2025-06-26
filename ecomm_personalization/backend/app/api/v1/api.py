from fastapi import APIRouter

from .endpoints import recommendations, products, profile

api_router = APIRouter()

# Include all endpoint routers here
api_router.include_router(recommendations.router, prefix="/recommendations", tags=["recommendations"])
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(profile.router, prefix="/profile", tags=["profile"])
