import sys
from pathlib import Path

# Add the backend directory to Python path
backend_dir = str(Path(__file__).parent.absolute())
if backend_dir not in sys.path:
    sys.path.append(backend_dir)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import settings from clean config
from app.core.config_clean import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="AI-powered e-commerce personalization system",
    version="1.0.0"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the E-Commerce Personalization API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("run_temp:app", host="0.0.0.0", port=8000, reload=True)
