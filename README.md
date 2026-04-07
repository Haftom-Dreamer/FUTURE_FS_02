# Mini CRM (Client Lead Management System)

A simple, yet functional Client Lead Management System (Mini CRM) designed to help agencies, freelancers, and startups manage their website leads securely and effectively.

## 🚀 Features
- **Secure Admin Dashboard:** JWT-protected backend login logic and React frontend context management.
- **Lead Tracking:** View Name, Email, Source, Status, and Date for all imported website leads.
- **Lead Management:** Update the status pipeline (`New` → `Contacted` → `Converted`) and append follow-up notes.
- **Zero-Config Database:** Seamlessly utilizes `mongodb-memory-server` to provide an out-of-the-box working database fallback without needing a native MongoDB configuration!
- **Premium Interface:** High-quality Vanilla CSS styling featuring glassmorphism elements, dark mode aesthetics, and robust layout.

## 🛠️ Technology Stack
### Frontend
- React.js (Vite)
- React Router DOM
- Vanilla CSS 
- Axios & Lucide React (Icons)

### Backend
- Node.js & Express.js
- Mongoose (MongoDB) 
- JSON Web Token (JWT) Authentication
- CORS & Dotenv

## 💻 Getting Started
To get this application running locally, open two separate terminal instances. 
*(Ensure you are using Node.js v20+)*

### 1. Start the Backend API
The backend runs an Express server on port `5000` and configures the in-memory database instance automatically.
```bash
cd backend
npm install
node server.js
```

### 2. Start the Frontend Dashboard
The frontend UI powers the dashboard using Vite.
```bash
cd frontend
npm install
npm run dev
```

### 3. Access the System
Open your browser and navigate to `http://localhost:5173/login`. Log into the system using the auto-generated admin credentials:
- **Email:** `admin@minicrm.com`
- **Password:** `password123`


