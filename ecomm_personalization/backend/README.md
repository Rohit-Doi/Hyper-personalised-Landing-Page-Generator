# E-commerce Personalization Backend

This is the backend service for the E-commerce Personalization System, built with FastAPI, SQLAlchemy, and PostgreSQL/SQLite.

## Features

- User segmentation and behavior tracking
- Product catalog management
- Personalized recommendations
- Analytics and reporting
- RESTful API endpoints

## Prerequisites

- Python 3.9+
- PostgreSQL (or SQLite for development)
- pip (Python package manager)

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecomm_personalization/backend
   ```

2. **Create and activate a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```env
   # Database
   DATABASE_URL=sqlite:///./ecommerce.db
   # or for PostgreSQL:
   # DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce

   # App Settings
   DEBUG=True
   SECRET_KEY=your-secret-key
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

5. **Initialize the database**
   ```bash
   python -m scripts.init_db
   ```

6. **Run database migrations**
   ```bash
   alembic upgrade head
   ```

7. **Seed the database with sample data**
   ```bash
   python -m scripts.seed_data
   ```

## Running the Application

### Development

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### Production

For production, use a production-ready ASGI server like Uvicorn with Gunicorn:

```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
```

## API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Project Structure

```
backend/
├── alembic/               # Database migrations
├── app/
│   ├── api/               # API routes
│   ├── core/              # Core functionality
│   ├── db/                # Database session and connection
│   ├── models/            # SQLAlchemy models
│   ├── schemas/           # Pydantic models
│   ├── services/          # Business logic
│   ├── tests/             # Test files
│   ├── utils/             # Utility functions
│   ├── main.py            # FastAPI application
│   └── config.py          # Application configuration
├── scripts/               # Utility scripts
├── tests/                 # Test files
├── .env.example          # Example environment variables
├── .gitignore
├── alembic.ini           # Alembic configuration
├── requirements.txt       # Project dependencies
└── README.md             # This file
```

## Development Workflow

1. **Create a new migration**
   ```bash
   alembic revision --autogenerate -m "description of changes"
   ```

2. **Run tests**
   ```bash
   pytest
   ```

3. **Format code**
   ```bash
   black .
   isort .
   ```

4. **Check type hints**
   ```bash
   mypy .
   ```

## Deployment

### Docker

1. Build the Docker image:
   ```bash
   docker build -t ecomm-personalization .
   ```

2. Run the container:
   ```bash
   docker run -d --name ecomm-personalization -p 8000:8000 ecomm-personalization
   ```

### Kubernetes

Example Kubernetes deployment files are provided in the `k8s/` directory.

## License

[Your License Here]
