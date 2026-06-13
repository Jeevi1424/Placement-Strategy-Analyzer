// Visual content generator - generates chart data and visual representations

function generatePerformanceChart(attempts) {
  if (!attempts || attempts.length === 0) {
    return { type: 'line', labels: [], datasets: [] };
  }

  const labels = attempts.map((_, i) => `Attempt ${i + 1}`);
  const scores = attempts.map(a => Math.round((a.score / a.total_questions) * 100));

  return {
    type: 'line',
    labels,
    datasets: [{
      label: 'Score (%)',
      data: scores,
      borderColor: '#667eea',
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };
}

function generateTopicRadarChart(topicBreakdown) {
  if (!topicBreakdown || topicBreakdown.length === 0) {
    return { type: 'radar', labels: [], datasets: [] };
  }

  return {
    type: 'radar',
    labels: topicBreakdown.map(t => t.topic.charAt(0).toUpperCase() + t.topic.slice(1)),
    datasets: [{
      label: 'Average Score (%)',
      data: topicBreakdown.map(t => t.averageScore),
      backgroundColor: 'rgba(102, 126, 234, 0.2)',
      borderColor: '#667eea',
      pointBackgroundColor: '#667eea'
    }]
  };
}

function generateProgressHeatmap(attempts) {
  const heatmapData = {};

  attempts.forEach(attempt => {
    const date = new Date(attempt.created_at).toISOString().split('T')[0];
    if (!heatmapData[date]) {
      heatmapData[date] = { count: 0, totalScore: 0 };
    }
    heatmapData[date].count++;
    heatmapData[date].totalScore += (attempt.score / attempt.total_questions) * 100;
  });

  return Object.entries(heatmapData).map(([date, data]) => ({
    date,
    count: data.count,
    averageScore: Math.round(data.totalScore / data.count),
    intensity: Math.min(data.count / 5, 1) // normalized 0-1
  }));
}

function generateTopicDistributionChart(attempts) {
  const topicCounts = {};
  attempts.forEach(a => {
    topicCounts[a.topic] = (topicCounts[a.topic] || 0) + 1;
  });

  const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];

  return {
    type: 'doughnut',
    labels: Object.keys(topicCounts).map(t => t.charAt(0).toUpperCase() + t.slice(1)),
    datasets: [{
      data: Object.values(topicCounts),
      backgroundColor: colors.slice(0, Object.keys(topicCounts).length),
      borderWidth: 2
    }]
  };
}

function generateSkillGapAnalysis(topicBreakdown) {
  const targetScore = 80; // Target score for placement readiness

  return topicBreakdown.map(t => ({
    topic: t.topic,
    currentScore: t.averageScore,
    targetScore,
    gap: Math.max(0, targetScore - t.averageScore),
    status: t.averageScore >= targetScore ? 'Ready' :
            t.averageScore >= 60 ? 'Almost Ready' : 'Needs Work',
    color: t.averageScore >= targetScore ? '#43e97b' :
           t.averageScore >= 60 ? '#f093fb' : '#ff6b6b'
  }));
}

module.exports = {
  generatePerformanceChart,
  generateTopicRadarChart,
  generateProgressHeatmap,
  generateTopicDistributionChart,
  generateSkillGapAnalysis
};
