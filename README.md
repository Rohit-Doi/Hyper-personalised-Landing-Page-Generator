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

HPLPGA/
├── ecomm_personalization/
│ ├── backend/
│ │ ├── alembic/
│ │ │ ├── env.py
│ │ │ ├── README
│ │ │ ├── script.py.mako
│ │ │ └── versions/
│ │ │ └── d4d5b5ad4f4d_initial_migration.py
│ │ ├── alembic.ini
│ │ ├── app/
│ │ │ ├── init.py
│ │ │ ├── api/
│ │ │ │ ├── personalize/
│ │ │ │ │ └── route.py
│ │ │ │ └── v1/
│ │ │ │ ├── api.py
│ │ │ │ └── endpoints/
│ │ │ │ ├── products.py
│ │ │ │ └── recommendations.py
│ │ │ ├── core/
│ │ │ │ └── config.py
│ │ │ ├── data_processed/ # (keep only if you store processed data, not raw datasets)
│ │ │ ├── db/
│ │ │ ├── main.py
│ │ │ ├── models/
│ │ │ ├── schemas/
│ │ │ └── services/
│ │ ├── Dockerfile
│ │ ├── docker-compose.yml
│ │ ├── README.md
│ │ ├── requirements.txt
│ │ └── tests/
│ │ ├── conftest.py
│ │ ├── recommendation/
│ │ │ ├── init.py
│ │ │ ├── test_cold_start_strategy.py
│ │ │ └── test_personalization_engine.py
│ │ ├── test_api_endpoints.py
│ │ ├── test_data_processor.py
│ │ ├── test_recommendation_service.py
│ │ └── test_recommendations.py
│ └── frontend/
│ ├── components/
│ ├── jest.config.js
│ ├── jest.setup.js
│ ├── lib/
│ ├── next.config.js
│ ├── package.json
│ ├── postcss.config.js
│ ├── public/
│ │ ├── accessories/
│ │ ├── collections/
│ │ ├── men/
│ │ ├── women/
│ │ └── site.webmanifest
│ ├── src/
│ │ ├── app/
│ │ ├── components/
│ │ ├── config.ts
│ │ ├── context/
│ │ ├── data/
│ │ ├── hooks/
│ │ ├── lib/
│ │ └── types/
│ ├── tailwind.config.js
│ ├── tsconfig.json
│ └── README.md
├── .gitignore
├── LICENSE
└── README.md

```

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Rohit-Doi/Hyper-personalised-Landing-Page-Generator
cd Hyper-personalized-Landing-Page-Generator
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

🛠️ Windows: Resolving "Filename too long" Errors When Cloning
Why does this happen?
Windows has a default limitation where file paths (including folder names) cannot exceed 260 characters. Some files in this repository may exceed this limit, causing errors like:
```text
error: unable to create file ...: Filename too long
fatal: unable to checkout working tree
```
How to Fix
1. Enable Long Path Support in Windows
A. Using the Registry Editor (works on all Windows editions):
Press <kbd>Win</kbd> + <kbd>R</kbd>, type regedit, and press Enter.
Navigate to:
```
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem
```
Find the entry named LongPathsEnabled.
If it doesn’t exist, right-click and create a new DWORD (32-bit) Value named LongPathsEnabled.
Double-click it and set its value to 1.
Restart your computer.
<br>
B. Using Group Policy Editor (if available):
Press <kbd>Win</kbd> + <kbd>R</kbd>, type gpedit.msc, and press Enter.
Go to:
```
Local Computer Policy > Computer Configuration > Administrative Templates > System > Filesystem
```
Double-click Enable Win32 long paths and set it to Enabled.
Restart your computer.
<br>
3. Tell Git to Allow Long Paths
Open a terminal and run:
```bash
git config --system core.longpaths true
```
or (if you don’t have admin rights):
```bash
git config --global core.longpaths true
```
3. Clone to a Short Directory Path
To further reduce the risk, clone the repository to a directory with a very short path, such as:
```text
C:\repo
```
If you follow these steps, you should be able to clone and use this repository on Windows without path length issues.


## License
See [LICENSE](LICENSE) for details.











