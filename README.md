# 🎯 Placement Strategy Analyzer Pro

AI-powered placement preparation platform with quizzes, analytics, learning plans, code practice, and interview prep.

## 🚀 Live Demo
- **Frontend:** [Netlify URL]
- **Backend API:** [Render URL]

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, Vanilla JS (deployed on Netlify)
- **Backend:** Node.js, Express.js (deployed on Render)
- **Database:** SQLite
- **Auth:** JWT

## 📦 Features
- 8 Quiz topics (Aptitude, Reasoning, Verbal, Technical, CS Fundamentals, HR, DBMS, Networking)
- AI-powered learning plans
- Real-time analytics with charts
- Code practice arena
- Interview prep Q&A
- 30-day placement roadmap
- Company-wise preparation (TCS, Infosys, Google, Amazon, etc.)
- Gamification (XP, streaks, achievements)
- Leaderboard

## 🔧 Local Development

### Backend
```bash
cd backend
npm install
npm start
# Runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3001
```

## 🌐 Deployment

### Backend → Render
1. Push to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo → select `backend` folder
4. Build: `npm install` | Start: `node server.js`
5. Add env vars: `JWT_SECRET`, `NODE_ENV=production`

### Frontend → Netlify
1. Go to [netlify.com](https://netlify.com) → New site from Git
2. Connect repo → set publish directory to `frontend`
3. Deploy!
4. Update `PROD_API` in `frontend/app.js` with your Render URL
