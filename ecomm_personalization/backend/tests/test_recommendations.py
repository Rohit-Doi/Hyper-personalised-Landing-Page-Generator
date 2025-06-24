import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.db.session import Base, get_db
from app.core.config import settings
from app.services.enhanced_recommendation_service import EnhancedRecommendationService

# Test database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create test database
Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_enhanced_recommendation_service():
    # Setup test database session
    db = TestingSessionLocal()
    
    # Initialize service
    service = EnhancedRecommendationService(db)
    
    # Test with empty database (should handle gracefully)
    recommendations = service.get_personalized_recommendations(
        user_id=1,
        context={"device_type": "mobile", "time_of_day": 14}
    )
    assert isinstance(recommendations, list)
    
    # Test landing page layout
    layout = service.get_landing_page_layout(
        user_id=1,
        context={"device_type": "mobile", "time_of_day": 14}
    )
    assert "hero_banner" in layout
    assert "product_sections" in layout
    assert "cta_buttons" in layout
    
    db.close()

# Add more test cases as needed
