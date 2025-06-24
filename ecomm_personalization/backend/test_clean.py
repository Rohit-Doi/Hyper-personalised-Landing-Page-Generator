import sys
from pathlib import Path

# Add the backend directory to Python path
backend_dir = str(Path(__file__).parent.absolute())
if backend_dir not in sys.path:
    sys.path.append(backend_dir)

print("Testing clean imports...")

try:
    print("Importing clean config...")
    from app.core.config_clean import settings
    print("Successfully imported clean settings")
    
    print("\nImporting clean recommendation schema...")
    from app.schemas.recommendation_clean import RecommendationRequest
    print("Successfully imported clean recommendation schema")
    
    print("\nAll clean imports successful!")
    
except Exception as e:
    print(f"Error: {e}")
    raise
