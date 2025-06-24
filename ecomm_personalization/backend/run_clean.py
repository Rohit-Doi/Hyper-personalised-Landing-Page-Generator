import uvicorn
import sys
from pathlib import Path

# Add the backend directory to Python path
backend_dir = str(Path(__file__).parent.absolute())
if backend_dir not in sys.path:
    sys.path.append(backend_dir)

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="debug"
    )
