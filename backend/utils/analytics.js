// Analytics utility functions

function calculateOverallStats(attempts) {
  if (!attempts || attempts.length === 0) {
    return {
      totalAttempts: 0,
      averageScore: 0,
      bestScore: 0,
      totalTimeSpent: 0,
      topicsAttempted: 0
    };
  }

  const totalAttempts = attempts.length;
  const averageScore = attempts.reduce((sum, a) => sum + (a.score / a.total_questions) * 100, 0) / totalAttempts;
  const bestScore = Math.max(...attempts.map(a => (a.score / a.total_questions) * 100));
  const totalTimeSpent = attempts.reduce((sum, a) => sum + (a.time_taken || 0), 0);
  const topicsAttempted = new Set(attempts.map(a => a.topic)).size;

  return {
    totalAttempts,
    averageScore: Math.round(averageScore),
    bestScore: Math.round(bestScore),
    totalTimeSpent,
    topicsAttempted
  };
}

function calculateTopicBreakdown(attempts) {
  const topicMap = {};

  attempts.forEach(attempt => {
    if (!topicMap[attempt.topic]) {
      topicMap[attempt.topic] = {
        topic: attempt.topic,
        attempts: 0,
        totalScore: 0,
        totalQuestions: 0
      };
    }
    topicMap[attempt.topic].attempts++;
    topicMap[attempt.topic].totalScore += attempt.score;
    topicMap[attempt.topic].totalQuestions += attempt.total_questions;
  });

  return Object.values(topicMap).map(t => ({
    ...t,
    averageScore: Math.round((t.totalScore / t.totalQuestions) * 100),
    accuracy: `${Math.round((t.totalScore / t.totalQuestions) * 100)}%`
  }));
}

function calculateProgressTrend(attempts) {
  // Group by date
  const dateMap = {};
  attempts.forEach(attempt => {
    const date = new Date(attempt.created_at).toLocaleDateString();
    if (!dateMap[date]) {
      dateMap[date] = { date, scores: [], count: 0 };
    }
    dateMap[date].scores.push((attempt.score / attempt.total_questions) * 100);
    dateMap[date].count++;
  });

  return Object.values(dateMap)
    .map(d => ({
      date: d.date,
      averageScore: Math.round(d.scores.reduce((a, b) => a + b, 0) / d.scores.length),
      attempts: d.count
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-30); // Last 30 days
}

function identifyWeakAreas(attempts) {
  const topicData = calculateTopicBreakdown(attempts);
  return topicData
    .filter(t => t.averageScore < 60)
    .sort((a, b) => a.averageScore - b.averageScore)
    .map(t => ({
      topic: t.topic,
      averageScore: t.averageScore,
      attempts: t.attempts,
      priority: t.averageScore < 40 ? "Critical" : "Needs Improvement"
    }));
}

function generateReport(attempts, userId) {
  const stats = calculateOverallStats(attempts);
  const topicBreakdown = calculateTopicBreakdown(attempts);
  const progressTrend = calculateProgressTrend(attempts);
  const weakAreas = identifyWeakAreas(attempts);

  const performanceLevel =
    stats.averageScore >= 80 ? "Excellent" :
    stats.averageScore >= 65 ? "Good" :
    stats.averageScore >= 50 ? "Average" : "Needs Improvement";

  return {
    userId,
    generatedAt: new Date().toISOString(),
    summary: stats,
    performanceLevel,
    topicBreakdown,
    progressTrend,
    weakAreas,
    recommendations: generateRecommendations(stats, weakAreas)
  };
}

function generateRecommendations(stats, weakAreas) {
  const recommendations = [];

  if (stats.totalAttempts < 5) {
    recommendations.push("Take more quizzes to get better analytics and insights.");
  }

  if (stats.averageScore < 50) {
    recommendations.push("Focus on understanding fundamentals before attempting more quizzes.");
  }

  weakAreas.forEach(area => {
    recommendations.push(`Spend extra time on ${area.topic} — your current average is ${area.averageScore}%.`);
  });

  if (stats.averageScore >= 70) {
    recommendations.push("Great performance! Try harder difficulty levels to further improve.");
  }

  return recommendations;
}

module.exports = {
  calculateOverallStats,
  calculateTopicBreakdown,
  calculateProgressTrend,
  identifyWeakAreas,
  generateReport
};
