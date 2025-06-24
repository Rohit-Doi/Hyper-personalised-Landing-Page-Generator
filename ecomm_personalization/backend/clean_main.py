from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from app.core.config import settings

app = FastAPI(
    title="E-Commerce Personalization API",
    description="AI-powered e-commerce personalization system",
    version="1.0.0"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/recommendations")
async def get_recommendations(user_id: int):
    # Mock recommendations for testing
    return {
        "recommendations": [
            {"id": 1, "name": "Test Product 1", "score": 0.95},
            {"id": 2, "name": "Test Product 2", "score": 0.92},
            {"id": 3, "name": "Test Product 3", "score": 0.89},
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("clean_main:app", host="0.0.0.0", port=8000, reload=True)
