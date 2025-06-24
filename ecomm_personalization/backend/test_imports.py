import sys
from pathlib import Path

# Add the backend directory to Python path
backend_dir = str(Path(__file__).parent.absolute())
if backend_dir not in sys.path:
    sys.path.append(backend_dir)

print("Testing imports...")

try:
    print("Importing app.core.config...")
    from app.core.config import settings
    print("Successfully imported settings")
    
    print("\nImporting app.main...")
    from app import main
    print("Successfully imported main")
    
except Exception as e:
    print(f"Error: {e}")
    raise
