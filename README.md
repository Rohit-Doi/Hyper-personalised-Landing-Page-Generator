# E-Commerce Personalization Platform

## Overview
A full-stack e-commerce platform with advanced personalization, built with Next.js (frontend) and Python (FastAPI) backend. Features include user-specific recommendations, cold start strategies, Google login, user clustering, and a modern UI.

## Features
- Personalized product recommendations (demographics, engagement, context)
- Cold start strategies for new users
- Google login (Firebase Auth)
- User clustering and behavioral segmentation
- Modern, responsive UI (Next.js + Tailwind CSS)
- Category, collection, sale, and product detail pages
- Cart, wishlist, and checkout flows
- Admin/test endpoints for recommendations

## Folder Structure
```
ecomm_personalization/
  backend/      # Python FastAPI backend
  frontend/     # Next.js frontend
```

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Backend Setup
```bash
cd ecomm_personalization/backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```
- Place your datasets (`dataset1_final.csv`, `dataset2_final.csv`) in the backend directory.
- To train models and build user clusters:
```bash
python -c "from data_processor import DataProcessor; dp = DataProcessor(); dp.load_data().create_user_sessions().create_user_segments().build_recommendation_model(); print('User clustering and cold start models built successfully.')"
```
- To run the backend server:
```bash
uvicorn app.main:app --reload
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
- Create a `.env.local` file with your Firebase credentials for Google login.
- To run the frontend:
```bash
npm run dev
```

### 4. Environment Variables
- Backend: (if needed, e.g., DB connection)
- Frontend: `.env.local` for Firebase Auth

### 5. Testing
- Backend: `pytest` or run test scripts in `backend/tests/`
- Frontend: `npm run test`

## Contributing
Pull requests are welcome! Please open an issue to discuss major changes.

## License
See [LICENSE](LICENSE) for details.
