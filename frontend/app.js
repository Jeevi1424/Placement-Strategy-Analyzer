// ═══════════════════════════════════════════
// PLACEMENT STRATEGY ANALYZER PRO - App.js
// ═══════════════════════════════════════════

// ─── API URL: auto-detect local vs production ───
// Replace PASTE_YOUR_RENDER_URL_HERE with your actual Render backend URL after deploying
const PROD_API = 'PASTE_YOUR_RENDER_URL_HERE/api';
const API = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:' || window.location.hostname === '')
  ? 'http://localhost:5000/api'
  : PROD_API;
let token = localStorage.getItem('psa_token');
let currentUser = JSON.parse(localStorage.getItem('psa_user') || 'null');
let currentQuiz = { topic:'', questions:[], answers:{}, currentIndex:0, startTime:null, timerInterval:null };
let charts = {};
let xpPoints = parseInt(localStorage.getItem('psa_xp') || '0');
let streak = parseInt(localStorage.getItem('psa_streak') || '0');

// ─── INIT ────────────────────────────────────
window.onload = () => {
  setTimeout(() => {
    document.getElementById('loading-screen').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('loading-screen').style.display = 'none';
      if (token && currentUser) showApp();
      else showAuth();
    }, 400);
  }, 2000);

  initParticles();
};

function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: ['#667eea','#f093fb','#4facfe','#43e97b'] },
        shape: { type: 'circle' },
        opacity: { value: 0.4, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.1 } },
        size: { value: 2, random: true },
        line_linked: { enable: true, distance: 150, color: '#667eea', opacity: 0.15, width: 1 },
        move: { enable: true, speed: 0.8, direction: 'none', random: true, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 3 } }
      }
    });
  }
}

// ─── AUTH ─────────────────────────────────────
function showAuth() {
  document.getElementById('auth-screen').classList.add('active');
  document.getElementById('app-screen').classList.remove('active');
}
function showApp() {
  document.getElementById('auth-screen').classList.remove('active');
  document.getElementById('app-screen').classList.add('active');
  const name = currentUser?.username || 'User';
  document.getElementById('sidebar-username').textContent = name;
  const av = name[0].toUpperCase();
  document.getElementById('sidebar-avatar').textContent = av;
  document.getElementById('topbar-avatar').textContent = av;
  document.getElementById('welcome-name').textContent = name;
  document.getElementById('sidebar-streak').textContent = `🔥 ${streak} day streak`;
  updateXPBar();
  loadDashboard();
}

function switchAuthTab(tab) {
  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-register').classList.toggle('active', tab === 'register');
  document.getElementById('tab-slider').classList.toggle('right', tab === 'register');
  document.getElementById('login-form').classList.toggle('hidden', tab !== 'login');
  document.getElementById('register-form').classList.toggle('hidden', tab !== 'register');
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');
  errEl.textContent = '';
  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) { errEl.textContent = data.error || 'Login failed'; return; }
    token = data.token; currentUser = data.user;
    localStorage.setItem('psa_token', token);
    localStorage.setItem('psa_user', JSON.stringify(currentUser));
    showApp();
  } catch { errEl.textContent = 'Cannot connect to server. Make sure backend is running on port 5000.'; }
}

async function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById('reg-username').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const errEl = document.getElementById('register-error');
  errEl.textContent = '';
  if (password.length < 6) { errEl.textContent = 'Password must be at least 6 characters'; return; }
  try {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    if (!res.ok) { errEl.textContent = data.error || 'Registration failed'; return; }
    token = data.token; currentUser = data.user;
    localStorage.setItem('psa_token', token);
    localStorage.setItem('psa_user', JSON.stringify(currentUser));
    showAchievement('Welcome aboard!', 'Your journey to placement success begins now 🚀');
    showApp();
  } catch { errEl.textContent = 'Cannot connect to server.'; }
}

function logout() {
  token = null; currentUser = null;
  localStorage.removeItem('psa_token'); localStorage.removeItem('psa_user');
  showAuth();
}

// ─── NAVIGATION ──────────────────────────────
function showSection(section, linkEl) {
  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const el = document.getElementById(`section-${section}`);
  if (el) el.classList.add('active');
  if (linkEl) linkEl.classList.add('active');
  const titles = { dashboard:'Dashboard', quiz:'Quiz Arena', analytics:'Analytics', learning:'AI Learning', code:'Code Arena', interview:'Interview Prep', roadmap:'Roadmap', leaderboard:'Leaderboard' };
  document.getElementById('section-title').textContent = titles[section] || section;
  if (section === 'dashboard') loadDashboard();
  if (section === 'analytics') loadAnalytics();
  if (section === 'quiz') loadTopics();
}

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  sb.style.width = sb.style.width === '60px' ? 'var(--sidebar-w)' : '60px';
}
function toggleNotif() {
  const p = document.getElementById('notif-panel');
  p.style.display = p.style.display === 'none' ? 'block' : 'none';
}

// ─── XP & GAMIFICATION ───────────────────────
function addXP(amount) {
  xpPoints += amount;
  localStorage.setItem('psa_xp', xpPoints);
  updateXPBar();
}
function updateXPBar() {
  const level = Math.floor(xpPoints / 100);
  const pct = (xpPoints % 100);
  document.getElementById('xp-fill').style.width = pct + '%';
  document.getElementById('xp-val').textContent = xpPoints;
}
function updateScoreRing(pct) {
  const circumference = 100;
  const fill = (pct / 100) * circumference;
  const el = document.getElementById('score-ring-fill');
  if (el) { el.style.strokeDasharray = `${fill} ${circumference}`; }
  const txt = document.getElementById('score-ring-text');
  if (txt) txt.textContent = pct + '%';
}
function showAchievement(title, desc) {
  const toast = document.getElementById('achievement-toast');
  document.getElementById('toast-title').textContent = title;
  document.getElementById('toast-desc').textContent = desc;
  toast.style.display = 'flex';
  setTimeout(() => { toast.style.display = 'none'; }, 4000);
}

// ─── DASHBOARD ────────────────────────────────
async function loadDashboard() {
  try {
    const res = await authFetch(`${API}/analytics/dashboard`);
    const data = await res.json();
    document.getElementById('stat-attempts').textContent = data.stats.totalAttempts;
    document.getElementById('stat-avg').textContent = data.stats.averageScore + '%';
    document.getElementById('stat-best').textContent = data.stats.bestScore + '%';
    document.getElementById('stat-topics').textContent = data.stats.topicsAttempted;
    document.getElementById('stat-time').textContent = Math.round((data.stats.totalTimeSpent || 0) / 60) + 'm';
    document.getElementById('stat-streak').textContent = streak;
    updateScoreRing(data.stats.averageScore || 0);
    renderWeakAreas(data.weakAreas);
    renderDashboardCharts(data.charts);
  } catch(e) { console.error('Dashboard error:', e); }
}

function renderWeakAreas(areas) {
  const el = document.getElementById('weak-areas-list');
  if (!areas || areas.length === 0) {
    el.innerHTML = '<p class="empty-state">🎯 No weak areas yet — take some quizzes!</p>'; return;
  }
  el.innerHTML = areas.map(a => `
    <div class="wa-item">
      <span class="wa-name">${a.topic}</span>
      <div class="wa-bar"><div class="wa-fill" style="width:${a.averageScore || 0}%"></div></div>
      <span class="wa-pct">${a.averageScore || 0}%</span>
      <span class="wa-badge">${a.priority || 'Weak'}</span>
    </div>
  `).join('');
}

function renderDashboardCharts(chartData) {
  ['performance', 'distribution'].forEach(k => { if (charts[k]) { charts[k].destroy(); charts[k] = null; }});
  const perfData = (chartData?.performance?.labels?.length > 0) ? chartData.performance : {
    labels: ['No data'], datasets: [{ label: 'Score (%)', data: [0], borderColor: '#667eea', backgroundColor: 'rgba(102,126,234,0.1)', fill: true, tension: 0.4 }]
  };
  const distData = chartData?.topicDistribution;
  const perfCtx = document.getElementById('performanceChart')?.getContext('2d');
  const distCtx = document.getElementById('distributionChart')?.getContext('2d');
  if (perfCtx) {
    charts.performance = new Chart(perfCtx, {
      type: 'line', data: perfData,
      options: { responsive: true, plugins: { legend: { labels: { color: '#f0f0ff' } } },
        scales: { x: { ticks: { color: '#a0a0cc' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                  y: { ticks: { color: '#a0a0cc' }, grid: { color: 'rgba(255,255,255,0.05)' }, min:0, max:100 } } }
    });
  }
  if (distCtx && distData && distData.labels.length > 0) {
    charts.distribution = new Chart(distCtx, {
      type: 'doughnut', data: distData,
      options: { responsive: true, plugins: { legend: { labels: { color: '#f0f0ff' } } }, cutout: '65%' }
    });
  }
}

// ─── QUIZ ────────────────────────────────────
const topicMeta = {
  aptitude:        { icon:'📐', color:'rgba(102,126,234,0.3)', desc:'Percentages, ratios, time & work' },
  reasoning:       { icon:'🧠', color:'rgba(240,147,251,0.3)', desc:'Patterns, syllogisms, blood relations' },
  verbal:          { icon:'📖', color:'rgba(79,172,254,0.3)',  desc:'Vocabulary, grammar, RC' },
  technical:       { icon:'💻', color:'rgba(67,233,123,0.3)',  desc:'DSA, algorithms, complexity' },
  'cs-fundamentals':{ icon:'🖥️', color:'rgba(250,112,154,0.3)', desc:'OS, DBMS, CN, OOP' },
  hr:              { icon:'🤝', color:'rgba(161,140,209,0.3)', desc:'Behavioral, soft skills, STAR' },
  dbms:            { icon:'🗄️', color:'rgba(255,175,64,0.3)',  desc:'SQL, normalization, transactions' },
  networking:      { icon:'🌐', color:'rgba(0,201,255,0.3)',   desc:'TCP/IP, OSI, protocols' }
};

async function loadTopics() {
  try {
    const res = await fetch(`${API}/quiz/topics`);
    const data = await res.json();
    const grid = document.getElementById('topic-grid');
    grid.innerHTML = (data.topics || []).map(t => {
      const m = topicMeta[t.id] || { icon:'📝', color:'rgba(102,126,234,0.3)', desc:'' };
      return `
        <div class="topic-card-3d" style="--tc:${m.color}" onclick="startQuiz('${t.id}')">
          <span class="tc-icon">${m.icon}</span>
          <h3>${t.name}</h3>
          <p>${m.desc}</p>
          <span class="tc-count">${t.questionCount} questions</span>
          <div class="tc-glow"></div>
        </div>`;
    }).join('');
  } catch(e) { console.error('Topics error:', e); }
}

function quickStartQuiz(topic) {
  const link = document.querySelector('[data-section="quiz"]');
  showSection('quiz', link);
  setTimeout(() => startQuiz(topic), 200);
}

async function startQuiz(topic) {
  document.getElementById('quiz-home').classList.add('hidden');
  document.getElementById('quiz-active').classList.remove('hidden');
  document.getElementById('quiz-result').classList.add('hidden');
  try {
    const res = await authFetch(`${API}/quiz/questions/${topic}?count=5`);
    const data = await res.json();
    currentQuiz = { topic, questions: data.questions, answers: {}, currentIndex: 0, startTime: Date.now(), timerInterval: null };
    const m = topicMeta[topic] || { icon: '📝' };
    document.getElementById('quiz-topic-label').textContent = `${m.icon} ${topic.replace('-', ' ')}`;
    startTimer();
    renderQuestion();
  } catch(e) { console.error('Start quiz error:', e); alert('Failed to load questions. Ensure backend is running.'); backToQuizHome(); }
}

function startTimer() {
  if (currentQuiz.timerInterval) clearInterval(currentQuiz.timerInterval);
  currentQuiz.timerInterval = setInterval(() => {
    const s = Math.floor((Date.now() - currentQuiz.startTime) / 1000);
    document.getElementById('quiz-timer').textContent = `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  }, 1000);
}

function renderQuestion() {
  const { questions, currentIndex, answers } = currentQuiz;
  const q = questions[currentIndex];
  const total = questions.length;
  document.getElementById('quiz-progress').textContent = `${currentIndex+1}/${total}`;
  document.getElementById('q-number').textContent = `Q${currentIndex+1}`;
  document.getElementById('question-text').textContent = q.question;
  document.getElementById('quiz-prog-fill').style.width = `${((currentIndex+1)/total)*100}%`;
  const letters = ['A','B','C','D','E'];
  document.getElementById('options-list').innerHTML = q.options.map((opt, i) => `
    <button class="opt-btn ${answers[currentIndex] === i ? 'selected' : ''}" onclick="selectOption(${i})">
      <span class="opt-letter">${letters[i]}</span>${opt}
    </button>`).join('');
  // dots
  const dots = document.getElementById('q-dots');
  dots.innerHTML = questions.map((_, i) => `
    <div class="q-dot ${i === currentIndex ? 'active' : ''} ${answers[i] !== undefined ? 'answered' : ''}"
      onclick="jumpToQuestion(${i})"></div>`).join('');
  document.getElementById('prev-btn').style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
  document.getElementById('next-btn').classList.toggle('hidden', currentIndex === total - 1);
  document.getElementById('submit-btn').classList.toggle('hidden', currentIndex !== total - 1);
  // live score
  const correct = Object.keys(answers).filter(k => answers[k] !== undefined).length;
  document.getElementById('live-score').textContent = correct;
}

function selectOption(i) {
  currentQuiz.answers[currentQuiz.currentIndex] = i;
  renderQuestion();
}
function jumpToQuestion(i) { currentQuiz.currentIndex = i; renderQuestion(); }
function nextQuestion() { if (currentQuiz.currentIndex < currentQuiz.questions.length - 1) { currentQuiz.currentIndex++; renderQuestion(); } }
function prevQuestion() { if (currentQuiz.currentIndex > 0) { currentQuiz.currentIndex--; renderQuestion(); } }

async function submitQuiz() {
  clearInterval(currentQuiz.timerInterval);
  const timeTaken = Math.floor((Date.now() - currentQuiz.startTime) / 1000);
  const answers = currentQuiz.questions.map((q, i) => ({ questionId: q.id, selectedOption: currentQuiz.answers[i] !== undefined ? currentQuiz.answers[i] : -1 }));
  try {
    const res = await authFetch(`${API}/quiz/submit`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: currentQuiz.topic, answers, timeTaken })
    });
    const data = await res.json();
    showResult(data, timeTaken);
  } catch { alert('Failed to submit.'); }
}

function showResult(data, timeTaken) {
  document.getElementById('quiz-active').classList.add('hidden');
  document.getElementById('quiz-result').classList.remove('hidden');
  const pct = data.percentage;
  // Animate ring
  const ring = document.getElementById('result-ring-anim');
  const circum = 314;
  ring.style.strokeDasharray = `0 ${circum}`;
  setTimeout(() => { ring.style.transition = 'stroke-dasharray 1.5s ease'; ring.style.strokeDasharray = `${(pct/100)*circum} ${circum}`; }, 100);
  document.getElementById('result-pct').textContent = pct + '%';
  const msg = pct>=80 ? '🎉 Excellent!' : pct>=60 ? '👍 Good Job!' : pct>=40 ? '📚 Keep Going!' : '💪 Practice More';
  document.getElementById('result-title').textContent = msg;
  document.getElementById('result-subtitle').textContent = `You scored ${data.score} out of ${data.total} in ${currentQuiz.topic}`;
  document.getElementById('rs-correct').textContent = data.score;
  document.getElementById('rs-wrong').textContent = data.total - data.score;
  document.getElementById('rs-time').textContent = timeTaken + 's';
  const earned = pct * 2;
  document.getElementById('rs-xp').textContent = '+' + earned;
  addXP(earned);
  if (pct >= 80) showAchievement('Quiz Master! 🏆', `${pct}% score on ${currentQuiz.topic}`);
  document.getElementById('result-breakdown').innerHTML = (data.results||[]).map(r => `
    <div class="rb-item ${r.isCorrect?'correct':'wrong'}">
      <strong>${r.isCorrect?'✅':'❌'} ${r.question}</strong>
      ${!r.isCorrect ? `<div style="margin-top:0.4rem;color:var(--text-muted);font-size:0.8rem">💡 ${r.explanation}</div>`:''}
    </div>`).join('');
}

function retakeQuiz() { startQuiz(currentQuiz.topic); }
function backToQuizHome() {
  clearInterval(currentQuiz.timerInterval);
  document.getElementById('quiz-home').classList.remove('hidden');
  document.getElementById('quiz-active').classList.add('hidden');
  document.getElementById('quiz-result').classList.add('hidden');
  loadTopics();
}

// ─── ANALYTICS ───────────────────────────────
async function loadAnalytics() {
  try {
    const res = await authFetch(`${API}/analytics/dashboard`);
    const data = await res.json();
    document.getElementById('ana-attempts').textContent = data.stats.totalAttempts;
    document.getElementById('ana-avg').textContent = data.stats.averageScore + '%';
    document.getElementById('ana-best').textContent = data.stats.bestScore + '%';
    document.getElementById('ana-level').textContent = data.performanceLevel || '-';
    renderRadar(data.charts?.topicRadar);
    renderSkillGap(data.charts?.skillGap);
    renderTopicTable(data.topicBreakdown);
    renderRecommendations(data.recommendations);
  } catch(e) { console.error('Analytics error:', e); }
}

function renderRadar(radarData) {
  if (charts.radar) { charts.radar.destroy(); charts.radar = null; }
  const ctx = document.getElementById('radarChart')?.getContext('2d');
  if (!ctx) return;
  const d = (radarData && radarData.labels.length > 0) ? radarData : {
    labels: ['Aptitude','Reasoning','Verbal','Technical','CS','HR'],
    datasets: [{ label:'Score (%)', data:[0,0,0,0,0,0], backgroundColor:'rgba(102,126,234,0.2)', borderColor:'#667eea', pointBackgroundColor:'#667eea' }]
  };
  charts.radar = new Chart(ctx, { type:'radar', data:d, options:{
    responsive:true,
    scales:{ r:{ min:0, max:100, ticks:{ color:'#a0a0cc', backdropColor:'transparent', stepSize:20 }, grid:{ color:'rgba(255,255,255,0.08)' }, pointLabels:{ color:'#f0f0ff', font:{ size:11 } } } },
    plugins:{ legend:{ labels:{ color:'#f0f0ff' } } }
  }});
}

function renderSkillGap(skillGap) {
  const el = document.getElementById('skill-gap-list');
  if (!skillGap || skillGap.length === 0) { el.innerHTML = '<p class="empty-state">Take quizzes to see skill analysis</p>'; return; }
  el.innerHTML = skillGap.map(s => `
    <div class="progress-bar-wrap">
      <div class="pb-label">
        <span style="text-transform:capitalize">${s.topic}</span>
        <span style="color:${s.color}">${s.status} • ${s.currentScore}%</span>
      </div>
      <div class="pb-track"><div class="pb-fill" style="width:${s.currentScore}%;background:${s.color}"></div></div>
    </div>`).join('');
}

function renderTopicTable(breakdown) {
  const el = document.getElementById('topic-breakdown-table');
  if (!breakdown || breakdown.length === 0) { el.innerHTML = '<p class="empty-state">No data yet — take some quizzes!</p>'; return; }
  el.innerHTML = `<table class="ana-table">
    <thead><tr><th>Topic</th><th>Attempts</th><th>Avg Score</th><th>Progress</th></tr></thead>
    <tbody>${breakdown.map(t => `
      <tr>
        <td style="text-transform:capitalize;font-weight:600">${t.topic}</td>
        <td style="color:var(--text-muted)">${t.attempts}</td>
        <td style="color:var(--primary);font-weight:700">${t.averageScore}%</td>
        <td><div class="pb-track" style="width:120px"><div class="pb-fill" style="width:${t.averageScore}%"></div></div></td>
      </tr>`).join('')}
    </tbody></table>`;
}

function renderRecommendations(recs) {
  const el = document.getElementById('recommendations-list');
  if (!recs || recs.length === 0) { el.innerHTML = '<p class="empty-state">Complete more quizzes for recommendations</p>'; return; }
  const icons = ['💡','📚','🎯','⚡','🔥','🧠','✨','🚀'];
  el.innerHTML = recs.map((r,i) => `<div class="rec-item"><span>${icons[i%icons.length]}</span><span>${r}</span></div>`).join('');
}

// ─── LEARNING ────────────────────────────────
const learningData = {
  aptitude: {
    title: '📐 Quantitative Aptitude',
    modules: [
      { name:'Number Systems', content:'Master LCM, HCF, divisibility rules, prime numbers. Solve 20 problems daily.', tips:['Remember divisibility rules 2-13','Learn perfect squares up to 30','Practice Vedic math shortcuts'] },
      { name:'Percentages & Profit/Loss', content:'Percentages form the base for profit/loss, discount, and interest problems.', tips:['Memorize %-fraction equivalents','Use multiplier method','Practice successive percentage'] },
      { name:'Time, Work & Speed', content:'Work-rate problems use 1/n formula. Average speed = harmonic mean.', tips:['Use LCM method for work','Draw diagrams for speed problems'] },
      { name:'Algebra & Equations', content:'Simultaneous equations, quadratic equations, inequalities.', tips:['Practice substitution method','Learn AM-GM inequality'] }
    ]
  },
  reasoning: {
    title: '🧠 Logical Reasoning',
    modules: [
      { name:'Coding-Decoding', content:'Identify shift patterns, mirror alphabets, and position-based codes.', tips:['Write the alphabet with positions','Check +1, -1, +2 patterns first'] },
      { name:'Blood Relations', content:'Map family trees carefully. Use M/F symbols.', tips:['Always draw a family tree','Mark gender explicitly'] },
      { name:'Syllogisms', content:'Use Venn diagrams for all syllogism problems.', tips:['Draw separate diagrams for each statement','Check all conclusion combinations'] }
    ]
  },
  verbal: {
    title: '📖 Verbal Ability',
    modules: [
      { name:'Vocabulary', content:'Learn 10 new words daily. Group by root words.', tips:['Read editorials daily','Use words in sentences','Learn Latin/Greek roots'] },
      { name:'Grammar & Usage', content:'Master tenses, articles, prepositions, subject-verb agreement.', tips:['Focus on common error types','Practice sentence correction daily'] },
      { name:'Reading Comprehension', content:'Read passage actively, identify main idea, then answer questions.', tips:['Read questions before passage','Identify topic sentence','Eliminate clearly wrong options'] }
    ]
  },
  technical: {
    title: '💻 Data Structures & Algorithms',
    modules: [
      { name:'Arrays & Strings', content:'Foundation of programming. Master two-pointer, sliding window techniques.', tips:['Solve LeetCode easy problems','Understand in-place operations','Practice string manipulation'] },
      { name:'Linked Lists, Stacks & Queues', content:'Linear data structures with different access patterns.', tips:['Implement from scratch','Understand pointer manipulation','Practice reversal problems'] },
      { name:'Trees & Graphs', content:'Hierarchical and network data. BFS, DFS are essential.', tips:['Master tree traversals','Practice BFS and DFS','Learn Dijkstra\'s algorithm'] },
      { name:'Dynamic Programming', content:'Optimization technique — memoization and tabulation.', tips:['Identify overlapping subproblems','Start with simple DP problems','Master knapsack and LCS'] }
    ]
  },
  'cs-fundamentals': {
    title: '🖥️ CS Fundamentals',
    modules: [
      { name:'Operating Systems', content:'Processes, threads, scheduling, memory management, deadlocks.', tips:['Understand process vs thread','Learn page replacement algorithms','Practice scheduling problems'] },
      { name:'DBMS', content:'Normalization, SQL queries, transactions, ACID properties.', tips:['Master JOIN types','Practice nested queries','Learn normalization forms 1NF-BCNF'] },
      { name:'Computer Networks', content:'OSI model, TCP/IP, routing, protocols, security basics.', tips:['Learn all 7 OSI layers','Understand TCP vs UDP','Practice subnetting'] },
      { name:'OOP Concepts', content:'Encapsulation, inheritance, polymorphism, abstraction, SOLID principles.', tips:['Design real-world systems','Learn design patterns','Understand SOLID principles'] },
      { name:'System Design Basics', content:'Scalability, load balancing, caching, microservices.', tips:['Study common system designs','Learn CAP theorem','Understand horizontal vs vertical scaling'] }
    ]
  },
  hr: {
    title: '🤝 HR & Soft Skills',
    modules: [
      { name:'Tell Me About Yourself', content:'60-second structured pitch: education, skills, achievements, goals.', tips:['Keep it professional','Tie to job requirements','Practice out loud'] },
      { name:'STAR Method', content:'Situation-Task-Action-Result framework for behavioral questions.', tips:['Prepare 5-7 STAR stories','Be specific with numbers','Focus on your contribution'] },
      { name:'Common HR Questions', content:'Strengths/weaknesses, why this company, 5-year plan, salary expectations.', tips:['Research the company well','Be honest about weaknesses','Show growth mindset'] }
    ]
  }
};

function loadLearning(topic) {
  document.getElementById('learning-home').classList.add('hidden');
  document.getElementById('learning-detail').classList.remove('hidden');
  const d = learningData[topic];
  if (!d) { document.getElementById('learning-detail-content').innerHTML = '<p class="empty-state">Content not available</p>'; return; }
  document.getElementById('learning-detail-content').innerHTML = `
    <div class="glass-card">
      <h3>${d.title}</h3>
      ${d.modules.map((m, i) => `
        <div style="border-left:3px solid var(--primary);padding:1rem 1.5rem;margin-bottom:1rem;background:rgba(255,255,255,0.03);border-radius:0 12px 12px 0">
          <h4 style="margin-bottom:0.5rem;font-size:1rem">${i+1}. ${m.name}</h4>
          <p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:0.75rem;line-height:1.6">${m.content}</p>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
            ${m.tips.map(tip => `<span style="background:rgba(102,126,234,0.15);color:var(--primary);padding:0.2rem 0.75rem;border-radius:20px;font-size:0.78rem">💡 ${tip}</span>`).join('')}
          </div>
        </div>`).join('')}
      <div style="margin-top:1.5rem">
        <h4 style="margin-bottom:0.75rem">📅 7-Day Study Schedule</h4>
        ${['Learn concepts & theory','Solve 10 easy practice problems','Tackle medium difficulty','Solve 5 timed problems','Review mistakes thoroughly','Take a mini mock test','Full mock test & review'].map((a, i) => `
          <div style="display:flex;gap:1rem;padding:0.5rem 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:0.875rem">
            <span style="color:var(--primary);font-weight:600;width:60px;flex-shrink:0">Day ${i+1}</span>
            <span style="color:var(--text-muted)">${a}</span>
          </div>`).join('')}
      </div>
    </div>`;
}

function hideLearningDetail() {
  document.getElementById('learning-home').classList.remove('hidden');
  document.getElementById('learning-detail').classList.add('hidden');
}

async function loadAIInsights() {
  const el = document.getElementById('ai-insights-content');
  el.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted)">🤖 Analyzing your performance...</div>';
  try {
    const res = await authFetch(`${API}/learning/insights`);
    const data = await res.json();
    if (!data.insights || data.insights.length === 0) {
      el.innerHTML = `<div class="empty-state">${data.message}</div>`; return;
    }
    el.innerHTML = `
      <p style="color:var(--text-muted);margin-bottom:1rem;font-size:0.875rem">${data.message}</p>
      ${data.insights.map(ins => `
        <div style="display:flex;align-items:center;gap:1rem;padding:0.85rem;background:var(--glass);border-radius:12px;margin-bottom:0.5rem;border:1px solid var(--glass-border)">
          <span style="font-size:1.75rem">${ins.status==='Strong'?'💪':ins.status==='Average'?'📊':'📚'}</span>
          <div>
            <strong style="text-transform:capitalize">${ins.topic}</strong>
            <p style="font-size:0.78rem;color:var(--text-muted)">${ins.attempts} attempts • Avg: ${ins.averageScore}%</p>
          </div>
          <span style="margin-left:auto;padding:0.25rem 0.75rem;border-radius:20px;font-size:0.78rem;
            background:${ins.status==='Strong'?'rgba(67,233,123,0.15)':ins.status==='Average'?'rgba(250,112,154,0.15)':'rgba(252,129,129,0.15)'};
            color:${ins.status==='Strong'?'#43e97b':ins.status==='Average'?'#fa709a':'#fc8181'}">${ins.status}</span>
        </div>`).join('')}`;
  } catch { el.innerHTML = '<p class="empty-state">Could not load insights.</p>'; }
}

// ─── CODE ARENA ───────────────────────────────
async function loadCodeProblem() {
  const difficulty = document.getElementById('code-difficulty').value;
  document.getElementById('solution-view').classList.add('hidden');
  document.getElementById('code-problem-view').classList.remove('hidden');
  try {
    const res = await authFetch(`${API}/learning/code/${difficulty}`);
    const data = await res.json();
    document.getElementById('code-title').textContent = data.title;
    document.getElementById('code-diff-badge').textContent = difficulty.charAt(0).toUpperCase()+difficulty.slice(1);
    document.getElementById('code-topic-badge').textContent = data.topic || difficulty;
    document.getElementById('code-desc').textContent = data.description;
    document.getElementById('code-editor').value = data.template;
    document.getElementById('code-testcases').innerHTML = (data.testCases||[]).map(tc => `
      <div class="tc-row">
        <span style="color:var(--primary)">Input:</span> <code>${tc.input}</code>
        &nbsp;&nbsp;
        <span style="color:var(--accent3)">Expected:</span> <code>${tc.expected}</code>
      </div>`).join('');
    document.getElementById('code-problem-view').dataset.pid = data.id;
    document.getElementById('code-problem-view').dataset.diff = difficulty;
  } catch { alert('Failed to load problem. Make sure you are logged in.'); }
}

async function showSolution() {
  const pid = document.getElementById('code-problem-view').dataset.pid;
  const diff = document.getElementById('code-problem-view').dataset.diff;
  try {
    const res = await authFetch(`${API}/learning/code/${diff}/${pid}/solution`);
    const data = await res.json();
    document.getElementById('solution-view').classList.remove('hidden');
    document.getElementById('solution-code').textContent = data.solution;
    addXP(10);
  } catch { alert('Failed to load solution.'); }
}
function clearEditor() { document.getElementById('code-editor').value = ''; }

// ─── INTERVIEW PREP ───────────────────────────
const interviewQA = {
  technical: {
    title: '💻 Technical Interview Questions',
    questions: [
      { q:'What is the difference between Stack and Queue?', a:'Stack is LIFO (Last In First Out) — like a pile of plates. Queue is FIFO (First In First Out) — like a line at a counter. Stack uses push/pop, Queue uses enqueue/dequeue operations.' },
      { q:'Explain time complexity of Binary Search.', a:'Binary Search has O(log n) time complexity because each step halves the search space. Space complexity is O(1) iterative, O(log n) recursive.' },
      { q:'What is a deadlock? How to prevent it?', a:'Deadlock occurs when processes wait for each other in a circular chain. Prevention methods: ensure resource ordering, use timeouts, employ banker\'s algorithm, avoid circular wait.' },
      { q:'What are ACID properties in DBMS?', a:'Atomicity (all or nothing), Consistency (data integrity maintained), Isolation (transactions don\'t interfere), Durability (committed data persists). Essential for reliable database transactions.' },
      { q:'Explain OOP pillars.', a:'Encapsulation (data hiding), Inheritance (code reuse), Polymorphism (one interface, multiple forms), Abstraction (hide complexity). These promote modular, maintainable code.' },
      { q:'What is the difference between TCP and UDP?', a:'TCP is connection-oriented, reliable, ordered delivery with flow control. UDP is connectionless, faster, no guarantee of delivery — used for streaming, gaming, DNS.' },
      { q:'What is normalization? Explain 1NF, 2NF, 3NF.', a:'Normalization removes data redundancy. 1NF: atomic values, no repeating groups. 2NF: 1NF + no partial dependency. 3NF: 2NF + no transitive dependency.' },
      { q:'Explain the concept of Dynamic Programming.', a:'DP solves complex problems by breaking them into overlapping subproblems and storing results (memoization/tabulation). Key: identify optimal substructure and overlapping subproblems.' }
    ]
  },
  hr: {
    title: '🤝 HR Interview Questions',
    questions: [
      { q:'Tell me about yourself.', a:'Use the PRESENT-PAST-FUTURE structure: Start with current skills/role, mention relevant past experience, then connect to why you want this position. Keep it to 90 seconds. Always tie back to the role.' },
      { q:'What are your strengths?', a:'Choose 2-3 strengths relevant to the job. Back each with a specific example. Avoid generic answers like "I\'m a hard worker." Say "I\'m detail-oriented — in my last project, I caught a critical bug that saved 2 days of rework."' },
      { q:'What is your biggest weakness?', a:'Choose a real weakness that you\'re actively improving. Example: "I used to struggle with public speaking, so I joined a Toastmasters club and have since delivered 5 presentations."' },
      { q:'Why do you want to work here?', a:'Research the company thoroughly. Mention: specific products/projects you admire, company culture/values alignment, growth opportunities. Show genuine interest, not just "good salary."' },
      { q:'Where do you see yourself in 5 years?', a:'Show ambition aligned with the company\'s growth. "I aim to grow into a senior role, contributing to larger system designs, and possibly mentoring junior developers. I see this company as the right place for that journey."' },
      { q:'Describe a challenging project you worked on.', a:'Use the STAR method: Situation (context), Task (your responsibility), Action (what you did, be specific), Result (measurable outcome). Quantify the impact whenever possible.' }
    ]
  },
  'aptitude-interview': {
    title: '📐 Aptitude Round Questions',
    questions: [
      { q:'A can do a work in 10 days, B in 15 days. How long together?', a:'A\'s rate = 1/10, B\'s rate = 1/15. Combined = 1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6. So they complete in 6 days.' },
      { q:'If 12 men can complete a work in 8 days, how many men needed in 6 days?', a:'Total work = 12 × 8 = 96 man-days. Men needed = 96 / 6 = 16 men.' },
      { q:'A train 300m long passes a pole in 30 seconds. Find its speed.', a:'Speed = Distance/Time = 300/30 = 10 m/s = 10 × 18/5 = 36 km/h.' },
      { q:'Find compound interest on Rs.10000 at 10% p.a. for 2 years.', a:'CI = P[(1+r/100)^n - 1] = 10000[(1.1)^2 - 1] = 10000[1.21-1] = Rs.2100.' }
    ]
  },
  'system-design': {
    title: '🏗️ System Design Questions',
    questions: [
      { q:'Design a URL Shortener (like bit.ly).', a:'Components: API server, database (KV store like Redis + SQL), hashing service (Base62 encoding), CDN for redirection. Consider: collision handling, custom URLs, analytics, expiry. Scale: read-heavy, so cache aggressively.' },
      { q:'How would you design WhatsApp?', a:'Key components: WebSocket servers for real-time messaging, message queue (Kafka), distributed database (Cassandra for messages), media storage (S3), notification service. Use consistent hashing for server selection.' },
      { q:'Explain CAP theorem.', a:'CAP: Consistency (all nodes see same data), Availability (system always responds), Partition Tolerance (works despite network splits). You can only guarantee 2 of 3. Most distributed systems choose CP or AP.' },
      { q:'How do you handle database scaling?', a:'Vertical scaling (bigger server), Horizontal scaling (sharding — partition data across servers), Read replicas (for read-heavy loads), Caching layer (Redis/Memcached), Database indexing, Query optimization.' }
    ]
  }
};

function loadInterviewQ(type) {
  const d = interviewQA[type];
  if (!d) return;
  document.getElementById('interview-qa').classList.remove('hidden');
  document.getElementById('iqa-title').textContent = d.title;
  document.getElementById('iqa-content').innerHTML = d.questions.map((q, i) => `
    <div class="qa-item" id="qa-${i}" onclick="toggleQA(${i})">
      <div class="qa-q">
        <span>${q.q}</span><span id="qa-arrow-${i}">▼</span>
      </div>
      <div class="qa-a">${q.a}</div>
    </div>`).join('');
}
function toggleQA(i) {
  const item = document.getElementById(`qa-${i}`);
  const arrow = document.getElementById(`qa-arrow-${i}`);
  item.classList.toggle('open');
  arrow.textContent = item.classList.contains('open') ? '▲' : '▼';
}

// ─── ROADMAP ──────────────────────────────────
const companyPrep = {
  tcs: { name:'TCS', pattern:'Online test: Verbal, Quant, Reasoning, Coding (1-2 problems). Focus on aptitude basics and simple coding problems. Difficulty: Easy-Medium.', topics:['Basic Aptitude','Verbal Ability','Simple DSA','Email Writing'] },
  infosys: { name:'Infosys', pattern:'InfyTQ exam: Reasoning, Maths, Pseudocode, Data Interpretation. Strong focus on reasoning and pseudo-code questions. Difficulty: Medium.', topics:['Logical Reasoning','Pseudocode','Data Interpretation','Verbal'] },
  wipro: { name:'Wipro', pattern:'NLTH: Online assessment with Aptitude, Reasoning, Coding, Essay writing. Emphasis on logical reasoning. Difficulty: Easy-Medium.', topics:['Aptitude','Reasoning','Coding Basics','Essay Writing'] },
  amazon: { name:'Amazon', pattern:'OA: 2 DSA problems (Medium-Hard), Debugging, Work Style Survey. Focus heavily on DSA and LP (Leadership Principles) in interviews.', topics:['Advanced DSA','System Design','Leadership Principles','Dynamic Programming'] },
  google: { name:'Google', pattern:'Multiple technical rounds: DSA (Medium-Hard), System Design, Behavioral. Heavy emphasis on algorithmic thinking and clean code.', topics:['Hard DSA','System Design','Algorithms','Code Optimization'] },
  microsoft: { name:'Microsoft', pattern:'Online assessment + 4-5 interview rounds. DSA, System Design, PM-style questions. Focus on problem-solving approach.', topics:['DSA','System Design','OOP Design','Behavioral'] }
};

function loadCompanyPrep(company) {
  const d = companyPrep[company];
  if (!d) return;
  const el = document.getElementById('company-prep-detail');
  el.classList.remove('hidden');
  el.innerHTML = `
    <div class="glass-card">
      <h4 style="margin-bottom:0.75rem">🏢 ${d.name} Preparation Guide</h4>
      <p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:1rem;line-height:1.6">${d.pattern}</p>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
        ${d.topics.map(t => `<span class="badge-3d">${t}</span>`).join('')}
      </div>
    </div>`;
}

// ─── LEADERBOARD ─────────────────────────────
async function loadLeaderboard() {
  try {
    const res = await fetch(`${API}/analytics/leaderboard`);
    const data = await res.json();
    const el = document.getElementById('leaderboard-content');
    if (!data.leaderboard || data.leaderboard.length === 0) {
      el.innerHTML = '<p class="empty-state">No leaderboard data. Complete 3+ quizzes to appear here!</p>'; return;
    }
    const rankClass = i => i===0?'rank-gold':i===1?'rank-silver':i===2?'rank-bronze':'rank-default';
    const medals = ['🥇','🥈','🥉'];
    el.innerHTML = `
      <div style="margin-bottom:0.5rem;color:var(--text-muted);font-size:0.8rem;text-transform:uppercase;letter-spacing:1px;padding:0 1rem">
        <span>Rank</span>&nbsp;&nbsp;&nbsp;<span>Name</span>
        <span style="float:right">Avg Score</span>
      </div>
      ${data.leaderboard.map((u, i) => `
        <div class="lb-row">
          <div class="lb-rank ${rankClass(i)}">${medals[i] || (i+1)}</div>
          <span class="lb-name">${u.username}</span>
          <span style="color:var(--text-muted);font-size:0.8rem;margin-right:auto">${u.total_attempts} quizzes</span>
          <span class="lb-score">${u.avg_score}%</span>
        </div>`).join('')}`;
  } catch { document.getElementById('leaderboard-content').innerHTML = '<p class="empty-state">Failed to load leaderboard.</p>'; }
}

// ─── HELPERS ─────────────────────────────────
function authFetch(url, options = {}) {
  return fetch(url, { ...options, headers: { 'Authorization': `Bearer ${token}`, ...(options.headers || {}) } });
}
