const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── CORS ───────────────────────────────────
// Allow all origins in production (Netlify frontend URL is set via env)
const allowedOrigins = [
  'http://localhost:3001',
  'http://127.0.0.1:3001',
  'http://localhost:5500',
  process.env.FRONTEND_URL,  // set this on Render to your Netlify URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'production') {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── DATABASE ────────────────────────────────
const { getDatabase } = require('./config/database');
getDatabase();

// ─── ROUTES ──────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/learning', require('./routes/learning'));

// ─── HEALTH CHECK ────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Placement Strategy Analyzer API',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    env: process.env.NODE_ENV || 'development'
  });
});

app.get('/', (req, res) => {
  res.json({
    message: '🚀 Placement Strategy Analyzer API v2.0',
    status: 'running',
    endpoints: ['/api/health', '/api/auth', '/api/quiz', '/api/analytics', '/api/learning']
  });
});

// ─── ERROR HANDLER ───────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Placement Strategy Analyzer Backend v2.0`);
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Health: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
