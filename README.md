# Good Grounds Full-Stack Cafe Platform

This repository contains a full-stack cafe platform with an existing frontend (React + Vite + Tailwind + Three.js), a new backend (Node/Express/MongoDB), and a new admin panel.

## Project Structure

```
/frontend   # existing frontend (cloned separately)
/admin      # admin dashboard
/backend    # express api
```

## Backend Setup

1. Copy environment variables:

```bash
cp backend/.env.example backend/.env
```

2. Install dependencies and run:

```bash
cd backend
npm install
npm run dev
```

## Admin Setup

1. Copy environment variables:

```bash
cp admin/.env.example admin/.env
```

2. Install dependencies and run:

```bash
cd admin
npm install
npm run dev
```

## Frontend Setup

If the frontend is already cloned separately, configure the API URL:

```bash
cp frontend/.env.example frontend/.env
```

## Deployment Guide

### Backend (Render/Railway/Vercel)
- Set environment variables from `backend/.env.example`.
- Ensure MongoDB Atlas connection string is configured.
- Set `CORS_ORIGIN` to your deployed frontend/admin URLs.
- If deploying on Vercel, use the `/backend` project root and keep `backend/vercel.json` (serverless entry at `backend/api/index.js`).

### Frontend (Vercel)
- Set the project root to `/frontend` (or deploy the frontend repo directly).
- Build command: `npm run build`
- Output directory: `dist`
- Environment: `VITE_API_URL` -> backend URL
- Ensure SPA rewrites are enabled (see `frontend/vercel.json`).

### Admin Panel (Vercel)
- Set the project root to `/admin`.
- Build command: `npm run build`
- Output directory: `dist`
- Environment: `VITE_API_URL` -> backend URL
- Ensure SPA rewrites are enabled (see `admin/vercel.json`).

### MongoDB Atlas
- Create a cluster and user.
- Whitelist the backend host or allow all IPs during development.

## API Summary

- `POST /api/auth/login` Admin login
- `GET /api/auth/me` Admin profile
- `GET /api/menu` List menu items
- `POST /api/menu` Create menu item (admin)
- `PUT /api/menu/:id` Update menu item (admin)
- `DELETE /api/menu/:id` Delete menu item (admin)
- `GET /api/gallery` List gallery images
- `POST /api/gallery` Upload gallery image (admin)
- `DELETE /api/gallery/:id` Delete gallery image (admin)
- `POST /api/messages` Submit contact message
- `GET /api/messages` List messages (admin)
- `DELETE /api/messages/:id` Delete message (admin)
- `GET /api/settings` Get cafe settings
- `PUT /api/settings` Update cafe settings (admin)
