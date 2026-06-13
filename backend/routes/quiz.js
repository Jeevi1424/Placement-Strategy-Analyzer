const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { getQuestions, evaluateAnswers, getAvailableTopics } = require('../utils/quizEngine');
const { getDatabase } = require('../config/database');

// Get available topics
router.get('/topics', (req, res) => {
  const topics = getAvailableTopics();
  res.json({ topics });
});

// Get quiz questions
router.get('/questions/:topic', authenticateToken, (req, res) => {
  const { topic } = req.params;
  const count = parseInt(req.query.count) || 5;

  const questions = getQuestions(topic, count);
  res.json({ topic, questions, count: questions.length });
});

// Submit quiz answers
router.post('/submit', authenticateToken, (req, res) => {
  const { topic, answers, timeTaken } = req.body;

  if (!topic || !answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Topic and answers are required' });
  }

  const result = evaluateAnswers(topic, answers);
  const db = getDatabase();

  // Save attempt to database
  db.run(
    `INSERT INTO quiz_attempts (user_id, topic, score, total_questions, time_taken, answers)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      req.user.id,
      topic,
      result.score,
      result.total,
      timeTaken || 0,
      JSON.stringify(answers)
    ],
    function (err) {
      if (err) {
        console.error('Error saving attempt:', err);
      }

      // Update weak areas
      const accuracy = result.score / result.total;
      db.run(
        `INSERT INTO weak_areas (user_id, topic, weakness_score, attempts)
         VALUES (?, ?, ?, 1)
         ON CONFLICT(user_id) DO UPDATE SET
           weakness_score = (weakness_score * attempts + ?) / (attempts + 1),
           attempts = attempts + 1,
           last_updated = CURRENT_TIMESTAMP`,
        [req.user.id, topic, 1 - accuracy, 1 - accuracy],
        (err) => { if (err) console.error('Weak area update error:', err); }
      );
    }
  );

  res.json({
    message: 'Quiz submitted successfully',
    score: result.score,
    total: result.total,
    percentage: Math.round((result.score / result.total) * 100),
    results: result.results
  });
});

// Get quiz history
router.get('/history', authenticateToken, (req, res) => {
  const db = getDatabase();
  const limit = parseInt(req.query.limit) || 20;

  db.all(
    `SELECT id, topic, score, total_questions, time_taken, created_at
     FROM quiz_attempts
     WHERE user_id = ?
     ORDER BY created_at DESC
     LIMIT ?`,
    [req.user.id, limit],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch history' });
      res.json({ history: rows || [] });
    }
  );
});

// Get weak areas
router.get('/weak-areas', authenticateToken, (req, res) => {
  const db = getDatabase();

  db.all(
    `SELECT topic, weakness_score, attempts, last_updated
     FROM weak_areas
     WHERE user_id = ?
     ORDER BY weakness_score DESC`,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch weak areas' });
      res.json({ weakAreas: rows || [] });
    }
  );
});

module.exports = router;
