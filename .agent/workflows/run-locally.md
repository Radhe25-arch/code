---
description: How to set up and run CodeArena on your local machine
---

# ⚔️ CodeArena: Local Setup Guide

Follow these steps to get your local development arena running.

## 1. Prerequisites
- **Node.js**: v18+ installed.
- **PostgreSQL**: A local instance running.
- **Git**: Installed and configured.

## 2. Environment Configuration

### Backend (`/server/.env`)
Create a `.env` file in the `server` folder:
```env
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/codearena?schema=public"
JWT_SECRET="any_long_random_string"
GOOGLE_CLIENT_ID="your_google_id"
GOOGLE_CLIENT_SECRET="your_google_secret"
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (`/client/.env`)
Create a `.env` file in the `client` folder:
```env
VITE_API_URL=http://localhost:5000/api
```

## 3. Installation & Database Setup
Run these commands from the **root** folder:

```bash
# 1. Install all dependencies for both folders
npm run install:all

# 2. Setup the database (from the server folder)
cd server
npx prisma generate
npx prisma db push

# 3. Seed the RPG items
node prisma/seed.js
cd ..
```

## 4. Launch the Arena
From the **root** folder, run:
```bash
npm run dev
```
This will launch:
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---
🛡️ **Happy Coding, Warrior!**
