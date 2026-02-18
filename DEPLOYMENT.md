# SmartChoice Deployment Guide

This guide covers deploying SmartChoice on Render.

## Prerequisites

1. GitHub account with access to the repository
2. Render account (free tier works)

## Deployment Options

### Option 1: One-Click Deploy (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" and select "Blueprint"
3. Connect your GitHub repository
4. Render will detect `render.yaml` and show the services to deploy
5. Click "Apply" to deploy all services

**Note**: Update the environment variables in render.yaml before deploying:
- `MONGODB_URI`: Your MongoDB connection string
- `REDIS_URL`: Your Redis connection string  
- `FRONTEND_URL`: Your frontend URL (update after deployment)

### Option 2: Manual Deploy

#### Step 1: Create MongoDB Database
1. Go to https://dashboard.render.com/new/mongo-db
2. Name: `smartchoice-db`
3. Region: Oregon (or your preferred region)
4. Click "Create Database"

#### Step 2: Create Redis Cache
1. Go to https://dashboard.render.com/new/redis
2. Name: `smartchoice-cache`
3. Region: Oregon
4. Plan: Free
5. Click "Create Redis"

#### Step 3: Deploy Backend
1. Go to https://dashboard.render.com/new/web-service
2. Connect your GitHub repository
3. Configure:
   - Name: `smartchoice-backend`
   - Region: Oregon
   - Runtime: Node
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && npm run start`
4. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `MONGODB_URI`: (from your MongoDB)
   - `REDIS_URL`: (from your Redis)
   - `JWT_SECRET`: (generate a secure string)
   - `FRONTEND_URL`: (will be your frontend URL)
5. Click "Create Web Service"

#### Step 4: Deploy Frontend
1. Go to https://dashboard.render.com/new/static-site
2. Connect your GitHub repository
3. Configure:
   - Name: `smartchoice-frontend`
   - Region: Oregon
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/build`
4. Add Environment Variables:
   - `REACT_APP_API_URL`: `https://smartchoice-backend.onrender.com/api`
5. Click "Create Static Site"

## Local Development with Docker

To test the deployment locally:

```bash
# Start all services
docker-compose up --build

# Services will be available at:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:5000
# - MongoDB: localhost:27017
# - Redis: localhost:6379
```

## Environment Variables

### Backend (.env)
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your-mongodb-uri
REDIS_URL=your-redis-url
JWT_SECRET=your-secret
FRONTEND_URL=https://your-frontend.onrender.com
```

### Frontend
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

## Post-Deployment

1. Update `FRONTEND_URL` in backend to your actual frontend URL
2. Run seed script to populate database (if needed):
   ```bash
   # From your local machine or via Render's shell
   npm run seed
   ```
3. Test the API health endpoint: `https://smartchoice-backend.onrender.com/api/health`

## Troubleshooting

- **CORS errors**: Ensure `FRONTEND_URL` matches your frontend URL exactly
- **MongoDB connection errors**: Check that your MongoDB is running and URI is correct
- **Build failures**: Check that all dependencies are in package.json
- **Static files not loading**: Ensure frontend build completed successfully

