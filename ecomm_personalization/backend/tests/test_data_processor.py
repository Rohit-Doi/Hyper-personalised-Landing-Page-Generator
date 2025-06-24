import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import pandas as pd
import os

from app.models.models import Base, User, Session, Interaction, UserSegment, Product
from app.services.data_processor import DataProcessor

# Test database setup
TEST_DATABASE_URL = "sqlite:///./test_data_processor.db"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)

def create_test_data():
    """Create test data in the database."""
    db = TestingSessionLocal()
    try:
        # Create test user
        user = User(
            pseudo_id="test_user_1",
            device_type="mobile",
            traffic_source="organic",
            location={"city": "Test City", "country": "Testland"}
        )
        db.add(user)
        db.flush()
        db.commit()
        db.refresh(user)
        
        # Create test session
        session = Session(
            user_id=user.id,
            session_id="test_session_1",
            start_time=pd.Timestamp.utcnow(),
            engagement_type="viewer",
            session_metadata={"device": "mobile", "traffic_source": "organic"}
        )
        db.add(session)
        db.flush()
        db.commit()
        db.refresh(session)
        
        # Create test product
        product = Product(
            id="P1001",
            name="Test Product",
            category="Electronics",
            price=99.99,
            rating=4.5,
            review_count=100,
            is_active=True,
            attributes={"brand": "TestBrand", "color": "Black"}
        )
        db.add(product)
        db.commit()
        
        # Create test interaction
        interaction = Interaction(
            user_id=user.id,
            session_id=session.id,
            event_name="view",
            item_id=product.id,
            item_category=product.category,
            timestamp=pd.Timestamp.utcnow(),
            value=0,
            interaction_metadata={"device": "mobile"}
        )
        db.add(interaction)
        db.commit()
        
        # Create user segment
        segment = UserSegment(
            user_id=user.id,
            segment_name="test_segment",
            score=0.85,
            segment_metadata={"reason": "test"}
        )
        db.add(segment)
        db.commit()
        
        return user.id, session.id, product.id, segment.id
        
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

def test_data_processor():
    """Test the DataProcessor class."""
    db = TestingSessionLocal()
    try:
        # Create test data
        user_id, session_id, product_id, segment_id = create_test_data()
        
        # Initialize data processor
        processor = DataProcessor(db)
        
        # Test loading raw data
        raw_data = processor.load_raw_data()
        assert 'interactions' in raw_data
        assert 'sessions' in raw_data
        assert 'users' in raw_data
        
        # Test joining datasets
        joined_data = processor.join_datasets(raw_data)
        assert not joined_data.empty
        assert 'user_id' in joined_data.columns
        assert 'session_id' in joined_data.columns
        assert 'event_name' in joined_data.columns
        
        # Test creating user segments
        user_segments = processor.create_user_segments(joined_data)
        assert not user_segments.empty
        assert 'user_id' in user_segments.columns
        assert 'segment' in user_segments.columns
        
        # Test saving processed data
        test_output_dir = "./test_output"
        if not os.path.exists(test_output_dir):
            os.makedirs(test_output_dir)
        
        processor.processed_data = joined_data
        processor.save_processed_data(test_output_dir)
        
        # Verify files were created
        assert os.path.exists(os.path.join(test_output_dir, "processed_data.parquet"))
        
        # Clean up
        if os.path.exists(test_output_dir):
            for file in os.listdir(test_output_dir):
                os.remove(os.path.join(test_output_dir, file))
            os.rmdir(test_output_dir)
            
        print("\n✓ Data processor tests passed!")
        return True
        
    except Exception as e:
        print(f"Error in test_data_processor: {e}")
        return False
    finally:
        db.close()
        # Clean up test database
        Base.metadata.drop_all(bind=engine)
        if os.path.exists("./test_data_processor.db"):
            os.remove("./test_data_processor.db")

if __name__ == "__main__":
    test_data_processor()
