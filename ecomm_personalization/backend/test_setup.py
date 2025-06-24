import sys
from pathlib import Path

# Add the backend directory to Python path
backend_dir = str(Path(__file__).parent.absolute())
if backend_dir not in sys.path:
    sys.path.append(backend_dir)

print("Testing setup...")

try:
    print("Importing config...")
    from app.core.config import settings
    print(f"Successfully imported settings. Project: {settings.PROJECT_NAME}")
    
    print("\nImporting main app...")
    from app.main import app
    print("Successfully imported FastAPI app")
    
    print("\nSetup test passed successfully!")
    
except Exception as e:
    print(f"Error: {e}")
    raise
