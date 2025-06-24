import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import pandas as pd
import os

from app.models.models import Base, User, Session, Interaction, Product, UserSegment
from app.services.enhanced_recommendation_service import EnhancedRecommendationService

# Test database setup
TEST_DATABASE_URL = "sqlite:///./test_recommendation.db"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)

def create_test_data():
    """Create test data in the database."""
    db = TestingSessionLocal()
    try:
        # Create test users
        users = []
        for i in range(3):
            user = User(
                pseudo_id=f"test_user_{i}",
                device_type=random.choice(["mobile", "desktop"]),
                traffic_source=random.choice(["organic", "paid"]),
                location={"city": f"City{i}", "country": "Testland"}
            )
            db.add(user)
            users.append(user)
        
        db.commit()
        
        # Create test products
        categories = ["Electronics", "Clothing", "Home"]
        products = []
        for i in range(10):
            product = Product(
                id=f"P{1000 + i}",
                name=f"Test Product {i}",
                category=random.choice(categories),
                price=round(random.uniform(10, 1000), 2),
                rating=round(random.uniform(3, 5), 1),
                review_count=random.randint(0, 1000),
                is_active=True,
                attributes={"brand": f"Brand{chr(65 + i % 3)}"}
            )
            db.add(product)
            products.append(product)
        
        db.commit()
        
        # Create test sessions and interactions
        for user in users:
            # Create a session
            session = Session(
                user_id=user.id,
                session_id=f"sess_{user.id}",
                start_time=pd.Timestamp.utcnow() - pd.Timedelta(days=random.randint(1, 30)),
                engagement_type=random.choice(["viewer", "cart_abandoner", "purchaser"]),
                session_metadata={"device": user.device_type, "traffic_source": user.traffic_source}
            )
            db.add(session)
            db.flush()
            
            # Create interactions
            for _ in range(3):
                product = random.choice(products)
                interaction = Interaction(
                    user_id=user.id,
                    session_id=session.id,
                    event_name=random.choice(["view", "add_to_cart"]),
                    item_id=product.id,
                    item_category=product.category,
                    timestamp=pd.Timestamp.utcnow(),
                    value=product.price if random.random() > 0.7 else 0,
                    interaction_metadata={"device": user.device_type}
                )
                db.add(interaction)
        
        # Create user segments
        for user in users:
            segment = UserSegment(
                user_id=user.id,
                segment_name=random.choice(["new_customer", "frequent_buyer", "casual"]),
                score=round(random.uniform(0.5, 1.0), 2),
                segment_metadata={"reason": "test data"}
            )
            db.add(segment)
        
        db.commit()
        return users[0].id  # Return first user ID for testing
        
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

def test_recommendation_service():
    """Test the EnhancedRecommendationService class."""
    db = TestingSessionLocal()
    try:
        # Create test data
        user_id = create_test_data()
        
        # Initialize service
        service = EnhancedRecommendationService(db)
        
        # Test getting recommendations
        print("\nTesting get_personalized_recommendations...")
        recommendations = service.get_personalized_recommendations(
            user_id=user_id,
            context={"device_type": "mobile", "time_of_day": 14}
        )
        
        assert isinstance(recommendations, list)
        print(f"✓ Got {len(recommendations)} recommendations")
        
        # Test landing page layout
        print("\nTesting get_landing_page_layout...")
        layout = service.get_landing_page_layout(
            user_id=user_id,
            context={"device_type": "mobile", "time_of_day": 14}
        )
        
        assert "hero_banner" in layout
        assert "product_sections" in layout
        assert "cta_buttons" in layout
        
        print("✓ Landing page layout generated successfully")
        return True
        
    except Exception as e:
        print(f"Error in test_recommendation_service: {e}")
        return False
    finally:
        db.close()
        # Clean up test database
        Base.metadata.drop_all(bind=engine)
        if os.path.exists("./test_recommendation.db"):
            os.remove("./test_recommendation.db")

if __name__ == "__main__":
    import random
    from datetime import datetime, timedelta
    import pandas as pd
    
    test_recommendation_service()
