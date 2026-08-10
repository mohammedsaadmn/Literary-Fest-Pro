# LiteraryFest-Pro

A modern MERN stack application featuring real-time auction management, Socket.IO live bidding synchronization, team points management, and interactive event displays.

## 📁 Repository Structure

```
Literary-Fest-Pro/
├── client/                  # React + Vite Frontend
│   ├── src/                 # React components, pages, and hooks
│   ├── package.json         # Frontend dependencies and scripts
│   └── vite.config.js       # Vite configuration
├── server/                  # Node.js + Express Backend
│   ├── app.js               # Express server & Socket.IO entry point
│   ├── config/              # MongoDB database configuration
│   ├── controllers/         # API controllers
│   ├── models/              # Mongoose data models
│   ├── routes/              # Express API routes
│   └── package.json         # Backend dependencies and scripts
└── .gitignore               # Root Git ignore configuration
```

## 🚀 Deployment Overview

- **Backend Service**: Deployed on [Render](https://render.com) (`https://auction-0v6l.onrender.com`)
  - **Root Directory**: `server`
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`
- **Frontend App**: Deployed on [Vercel](https://vercel.com)
  - **Root Directory**: `client`
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`
  - **Environment Variable**: `VITE_API_URL=https://auction-0v6l.onrender.com`

## 🛠️ Local Development

### 1. Backend Setup
```bash
cd server
npm install
npm run dev
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
