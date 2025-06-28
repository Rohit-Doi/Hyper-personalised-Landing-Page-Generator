# Hyper-personalised-Landing-Page-Generator

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

## Prerequisites

### Windows Users: Resolving "Filename too long" Errors

If you encounter errors like `error: unable to create file ...: Filename too long` when cloning on Windows, follow these steps:

#### 1. Enable Long Path Support in Windows

**A. Using the Registry Editor (works on all Windows editions):**
1. Press `Win + R`, type `regedit`, and press Enter.
2. Navigate to:  
   `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem`
3. Find the entry named `LongPathsEnabled`.  
   - If it doesn't exist, right-click and create a new `DWORD (32-bit) Value` named `LongPathsEnabled`.
4. Double-click it and set its value to `1`.
5. Restart your computer.

**B. Using Group Policy Editor (if available):**
1. Press `Win + R`, type `gpedit.msc`, and press Enter.
2. Go to:  
   `Local Computer Policy > Computer Configuration > Administrative Templates > System > Filesystem`
3. Double-click **Enable Win32 long paths** and set it to **Enabled**.
4. Restart your computer.

#### 2. Tell Git to Allow Long Paths

Open a terminal and run:

```sh
git config --system core.longpaths true
```
or (if you don't have admin rights):

```sh
git config --global core.longpaths true
```

#### 3. Clone to a Short Directory Path

To further reduce the risk, clone the repository to a directory with a very short path, such as:

```
C:\repo
```

### Required Dependencies

This project uses Firebase for authentication. The `firebase` package is included in the frontend dependencies and will be installed automatically when you run `npm install`.

## Folder Structure
```
HPLPG/
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
git clone https://github.com/Rohit-Doi/HPLPG
cd HPLPG
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
cd ecomm_personalization/frontend
npm install
```

**Optional: Verify setup**
```bash
node verify-setup.js
```

**Firebase Configuration:**
- Create a `.env.local` file with your Firebase credentials for Google login:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**To run the frontend:**
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
Windows has a default limitation where file paths (including folder names) cannot exceed 260 characters. 

Some files in this repository may exceed this limit, causing errors like:

```text
error: unable to create file ...: Filename too long
fatal: unable to checkout working tree
```
<br>
How to Fix
1. Enable Long Path Support in Windows
<br>

A. Using the Registry Editor (works on all Windows editions):

1.Press <kbd>Win</kbd> + <kbd>R</kbd>, type regedit, and press Enter.

<br>
2. Navigate to:
```
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem
```
<br>
3. Find the entry named LongPathsEnabled.
If it doesn’t exist, right-click and create a new DWORD (32-bit) Value named LongPathsEnabled.

<br>
4. Double-click it and set its value to 1.

<br>
5.Restart your computer.

<br>
B. Using Group Policy Editor (if available):

1. Press <kbd>Win</kbd> + <kbd>R</kbd>, type gpedit.msc, and press Enter.
 
<br>
2. Go to:
```
Local Computer Policy > Computer Configuration > Administrative Templates > System > Filesystem
```

<br>
3.Double-click Enable Win32 long paths and set it to Enabled.
<br>

4. Restart your computer.
<br>


2. Tell Git to Allow Long Paths
<br>
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











