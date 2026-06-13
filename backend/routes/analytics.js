const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { getDatabase } = require('../config/database');
const {
  calculateOverallStats,
  calculateTopicBreakdown,
  calculateProgressTrend,
  identifyWeakAreas,
  generateReport
} = require('../utils/analytics');
const {
  generatePerformanceChart,
  generateTopicRadarChart,
  generateTopicDistributionChart,
  generateSkillGapAnalysis
} = require('../utils/visualGenerator');

// Get overall analytics dashboard
router.get('/dashboard', authenticateToken, (req, res) => {
  const db = getDatabase();

  db.all(
    `SELECT * FROM quiz_attempts WHERE user_id = ? ORDER BY created_at ASC`,
    [req.user.id],
    (err, attempts) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch analytics' });

      attempts = attempts || [];

      const stats = calculateOverallStats(attempts);
      const topicBreakdown = calculateTopicBreakdown(attempts);
      const progressTrend = calculateProgressTrend(attempts);
      const weakAreas = identifyWeakAreas(attempts);

      const charts = {
        performance: generatePerformanceChart(attempts.slice(-10)),
        topicRadar: generateTopicRadarChart(topicBreakdown),
        topicDistribution: generateTopicDistributionChart(attempts),
        skillGap: generateSkillGapAnalysis(topicBreakdown)
      };

      res.json({
        stats,
        topicBreakdown,
        progressTrend,
        weakAreas,
        charts,
        totalAttempts: attempts.length
      });
    }
  );
});

// Get detailed report
router.get('/report', authenticateToken, (req, res) => {
  const db = getDatabase();

  db.all(
    `SELECT * FROM quiz_attempts WHERE user_id = ? ORDER BY created_at ASC`,
    [req.user.id],
    (err, attempts) => {
      if (err) return res.status(500).json({ error: 'Failed to generate report' });

      attempts = attempts || [];
      const report = generateReport(attempts, req.user.id);
      res.json(report);
    }
  );
});

// Get topic-specific analytics
router.get('/topic/:topic', authenticateToken, (req, res) => {
  const { topic } = req.params;
  const db = getDatabase();

  db.all(
    `SELECT * FROM quiz_attempts WHERE user_id = ? AND topic = ? ORDER BY created_at ASC`,
    [req.user.id, topic],
    (err, attempts) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch topic analytics' });

      attempts = attempts || [];

      res.json({
        topic,
        attempts: attempts.length,
        stats: calculateOverallStats(attempts),
        trend: calculateProgressTrend(attempts)
      });
    }
  );
});

// Get leaderboard (top scores)
router.get('/leaderboard', (req, res) => {
  const db = getDatabase();

  db.all(
    `SELECT u.username,
            COUNT(qa.id) as total_attempts,
            ROUND(AVG(CAST(qa.score AS FLOAT) / qa.total_questions * 100), 1) as avg_score,
            MAX(CAST(qa.score AS FLOAT) / qa.total_questions * 100) as best_score
     FROM users u
     JOIN quiz_attempts qa ON u.id = qa.user_id
     GROUP BY u.id, u.username
     HAVING total_attempts >= 3
     ORDER BY avg_score DESC
     LIMIT 10`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch leaderboard' });
      res.json({ leaderboard: rows || [] });
    }
  );
});

module.exports = router;
