const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { getDatabase } = require('../config/database');
const { getLearningPlan, getWeakAreaRecommendations, generateInsights } = require('../utils/aiLearning');
const { generateAudioScript, getAvailableAudioContent } = require('../utils/audioGenerator');
const { getCodeProblem, getSolution, getAllProblems } = require('../utils/codeGenerator');

// Get personalized learning plan
router.get('/plan/:topic', authenticateToken, (req, res) => {
  const { topic } = req.params;
  const db = getDatabase();

  db.all(
    `SELECT topic, weakness_score, attempts FROM weak_areas WHERE user_id = ?`,
    [req.user.id],
    (err, weakAreas) => {
      const plan = getLearningPlan(topic, weakAreas || []);
      if (!plan) return res.status(404).json({ error: 'Topic not found' });
      res.json(plan);
    }
  );
});

// Get AI insights
router.get('/insights', authenticateToken, (req, res) => {
  const db = getDatabase();

  db.all(
    `SELECT topic, score, total_questions, created_at
     FROM quiz_attempts WHERE user_id = ?
     ORDER BY created_at DESC LIMIT 50`,
    [req.user.id],
    (err, history) => {
      if (err) return res.status(500).json({ error: 'Failed to generate insights' });
      const insights = generateInsights(history || []);
      res.json(insights);
    }
  );
});

// Get weak area recommendations
router.get('/recommendations', authenticateToken, (req, res) => {
  const db = getDatabase();

  db.all(
    `SELECT topic, weakness_score, attempts FROM weak_areas WHERE user_id = ? ORDER BY weakness_score DESC`,
    [req.user.id],
    (err, weakAreas) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch recommendations' });
      const recommendations = getWeakAreaRecommendations(weakAreas || []);
      res.json({ recommendations });
    }
  );
});

// Get audio content
router.get('/audio/:topic', (req, res) => {
  const { topic } = req.params;
  const { subtopic } = req.query;
  const audioContent = generateAudioScript(topic, subtopic);
  res.json(audioContent);
});

// Get all available audio content
router.get('/audio', (req, res) => {
  const content = getAvailableAudioContent();
  res.json({ content });
});

// Get coding problem
router.get('/code/:difficulty', authenticateToken, (req, res) => {
  const { difficulty } = req.params;
  const { topic } = req.query;
  const problem = getCodeProblem(difficulty, topic);

  if (!problem) return res.status(404).json({ error: 'No problem found' });
  res.json(problem);
});

// Get code solution
router.get('/code/:difficulty/:id/solution', authenticateToken, (req, res) => {
  const { difficulty, id } = req.params;
  const solution = getSolution(parseInt(id), difficulty);

  if (!solution) return res.status(404).json({ error: 'Solution not found' });
  res.json(solution);
});

// Get all problems
router.get('/problems', (req, res) => {
  const problems = getAllProblems();
  res.json({ problems });
});

// Update learning progress
router.post('/progress', authenticateToken, (req, res) => {
  const { topic, subtopic, progress } = req.body;
  const db = getDatabase();

  db.run(
    `INSERT INTO learning_progress (user_id, topic, subtopic, progress)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, topic) DO UPDATE SET
       progress = ?,
       last_accessed = CURRENT_TIMESTAMP`,
    [req.user.id, topic, subtopic || '', progress, progress],
    (err) => {
      if (err) return res.status(500).json({ error: 'Failed to update progress' });
      res.json({ message: 'Progress updated', topic, progress });
    }
  );
});

// Get learning progress
router.get('/progress', authenticateToken, (req, res) => {
  const db = getDatabase();

  db.all(
    `SELECT topic, subtopic, progress, last_accessed FROM learning_progress WHERE user_id = ?`,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch progress' });
      res.json({ progress: rows || [] });
    }
  );
});

module.exports = router;
