import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

from app.main import app
from app.db.session import Base, get_db
from app.models.models import User, Session, Interaction, Product, UserSegment

# Test database setup
TEST_DATABASE_URL = "sqlite:///./test_api.db"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

def create_test_data():
    """Create test data in the database."""
    db = TestingSessionLocal()
    try:
        # Create test user
        user = User(
            pseudo_id="test_api_user",
            device_type="mobile",
            traffic_source="organic",
            location={"city": "Test City", "country": "Testland"}
        )
        db.add(user)
        db.flush()
        db.commit()
        db.refresh(user)
        
        # Create test product
        product = Product(
            id="P9999",
            name="API Test Product",
            category="Electronics",
            price=199.99,
            rating=4.5,
            review_count=150,
            is_active=True,
            attributes={"brand": "TestBrand"}
        )
        db.add(product)
        db.commit()
        
        # Create test session
        session = Session(
            user_id=user.id,
            session_id="test_api_session",
            start_time="2023-01-01T12:00:00",
            engagement_type="viewer",
            session_metadata={"device": "mobile"}
        )
        db.add(session)
        db.commit()
        
        # Create test interaction
        interaction = Interaction(
            user_id=user.id,
            session_id=session.id,
            event_name="view",
            item_id=product.id,
            item_category=product.category,
            timestamp="2023-01-01T12:05:00",
            value=0,
            metadata={"device": "mobile"}
        )
        db.add(interaction)
        
        # Create user segment
        segment = UserSegment(
            user_id=user.id,
            segment_name="test_segment",
            score=0.9,
            segment_metadata={"reason": "test data"}
        )
        db.add(segment)
        
        db.commit()
        return user.id, product.id, session.id, segment.id
        
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

def test_health_check():
    """Test the health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}
    print("\n✓ Health check passed")

def test_get_recommendations():
    """Test the recommendations endpoint."""
    user_id, product_id, session_id, segment_id = create_test_data()
    
    response = client.post(
        "/api/v1/recommendations/recommendations",
        json={
            "user_id": user_id,
            "context": {"device_type": "mobile", "time_of_day": 14}
        }
    )
    
    assert response.status_code == 200
    recommendations = response.json()
    assert isinstance(recommendations, list)
    print("✓ Recommendations endpoint test passed")

def test_get_landing_page():
    """Test the landing page endpoint."""
    user_id, product_id, session_id, segment_id = create_test_data()
    
    response = client.get(f"/api/v1/recommendations/landing-page/{user_id}")
    
    assert response.status_code == 200
    layout = response.json()
    assert "hero_banner" in layout
    assert "product_sections" in layout
    assert "cta_buttons" in layout
    print("✓ Landing page endpoint test passed")

def test_get_user_segments():
    """Test the user segments endpoint."""
    user_id, product_id, session_id, segment_id = create_test_data()
    
    response = client.get(f"/api/v1/recommendations/segments/{user_id}")
    
    assert response.status_code == 200
    segments = response.json()
    assert isinstance(segments, list)
    print("✓ User segments endpoint test passed")

if __name__ == "__main__":
    print("\nRunning API endpoint tests...")
    test_health_check()
    test_get_recommendations()
    test_get_landing_page()
    test_get_user_segments()
    
    # Clean up test database
    Base.metadata.drop_all(bind=engine)
    if os.path.exists("./test_api.db"):
        os.remove("./test_api.db")
