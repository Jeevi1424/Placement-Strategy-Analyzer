# Quick Start Guide

Get the Placement Strategy Analyzer running in 5 minutes!

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- A modern web browser

## Installation Steps

### 1. Backend Setup (2 minutes)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

You should see:
```
🚀 Backend server running on http://localhost:3000
📊 API endpoints available at http://localhost:3000/api
```

### 2. Frontend Setup (2 minutes)

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

Browser will automatically open at `http://localhost:3001`

### 3. First Time Usage (1 minute)

1. **Sign Up**
   - Enter your name, email, and password
   - Click "Sign Up"

2. **Take Your First Quiz**
   - Click "Take Quiz" in sidebar
   - Choose a category (DSA recommended)
   - Answer 10 questions
   - Submit and view results

3. **Explore AI Learning**
   - Click "AI Learning" in sidebar
   - Set your learning preferences
   - Enter a topic like "Binary Search"
   - Click "Generate Content"
   - Explore all 4 tabs!

## Verify Installation

### Check Backend
Open `http://localhost:3000/api/health` in browser.
Should see: `{"status":"OK","message":"Placement Analyzer API is running"}`

### Check Frontend
Open `http://localhost:3001`
Should see the login page.

## Common Issues

### Port Already in Use

**Backend (Port 3000):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Frontend (Port 3001):**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Database Issues

The SQLite database is created automatically. If you encounter issues:

```bash
# Delete the database file
cd backend
rm placement.db

# Restart the server (database will be recreated)
npm start
```

## Quick Feature Tour

### 1. Dashboard (30 seconds)
- View your readiness score
- Check category statistics
- See weak areas

### 2. Quiz System (2 minutes)
- Take a quick 10-question quiz
- See adaptive difficulty in action
- Track your score

### 3. AI Learning (3 minutes)
- Set learning preferences
- Generate content for "Stack"
- Explore explanation, code, visual, and audio tabs
- Check recommendations

### 4. Analytics (1 minute)
- View performance trends
- Check recent attempts
- Track improvement

## Next Steps

1. **Read the User Guide**: `USER_GUIDE.md` for detailed usage
2. **Explore Features**: `FEATURES.md` for technical details
3. **Take More Quizzes**: Build your performance history
4. **Learn Topics**: Use AI learning for weak areas
5. **Track Progress**: Monitor your readiness score

## Development Mode

For development with auto-reload:

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## Production Deployment

### Backend
```bash
cd backend
npm start
```

### Frontend
Build static files:
```bash
cd frontend
npm run build
```

Deploy the frontend folder to any static hosting service (Netlify, Vercel, etc.)

## Environment Variables

Backend `.env` file (already configured):
```env
PORT=3000
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=development
```

**Important**: Change `JWT_SECRET` in production!

## Testing the API

Use curl or Postman:

```bash
# Health check
curl http://localhost:3000/api/health

# Sign up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## File Structure Overview

```
placement-strategy-analyzer/
├── backend/              # API server (port 3000)
│   ├── config/          # Database setup
│   ├── routes/          # API endpoints
│   ├── utils/           # Business logic
│   └── server.js        # Entry point
├── frontend/            # Web app (port 3001)
│   ├── index.html       # Main page
│   ├── app.js           # Application logic
│   └── styles.css       # Styling
├── QUICKSTART.md        # This file
├── USER_GUIDE.md        # Detailed usage guide
├── FEATURES.md          # Technical documentation
└── README.md            # Project overview
```

## Support

- **Setup Issues**: Check this guide
- **Usage Questions**: Read USER_GUIDE.md
- **Technical Details**: See FEATURES.md
- **API Reference**: Check backend/README.md

## Success Checklist

- [ ] Backend running on port 3000
- [ ] Frontend running on port 3001
- [ ] Can sign up and login
- [ ] Can take a quiz
- [ ] Can view dashboard
- [ ] Can generate AI learning content
- [ ] Can see analytics

If all checked, you're ready to go! 🎉

---

**Time to First Quiz**: ~5 minutes
**Time to Master Platform**: ~30 minutes

Happy learning! 🚀
