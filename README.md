# Essence - Luxury Perfume Authentication System

A production-grade, fullstack authentication system featuring a Next.js (App Router) frontend and a FastAPI backend with a MySQL database.

## Architecture

* **Frontend:** Next.js (React), TailwindCSS, React Hook Form, Zod
* **Backend:** FastAPI, SQLModel, PyJWT, Passlib (bcrypt)
* **Database:** MySQL
* **DevOps:** Docker, Docker Compose

## Quick Start (Docker)

1. **Clone the repository.**
2. **Start the services using Docker Compose:**
   ```bash
   docker-compose up -d --build
   ```
3. **Access the application:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

## Local Development Setup

### Backend (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Testing

### Backend Tests (pytest)
```bash
cd backend
pytest tests/
```

### Frontend Tests (Jest)
```bash
cd frontend
npm test
```

## Security Implementation
- **Password Hashing:** Passlib with bcrypt.
- **JWT Authentication:** Stateful token issuance.
- **Form Validation:** Comprehensive frontend validations using Zod.
- **Backend Validation:** Pydantic strict schemas.
