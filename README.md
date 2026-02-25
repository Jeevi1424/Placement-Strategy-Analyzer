# Placement Strategy Analyzer

A full-stack AI-powered web application that helps students prepare for campus placements through adaptive quizzes, personalized learning, performance tracking, and intelligent weak area detection.

## 🚀 Features

### Core Features
- **User Authentication**: Secure signup/login with JWT tokens
- **Smart Quiz System**: DSA, Aptitude, and Core CS categories with 10 MCQs each
- **Adaptive Difficulty**: Quiz difficulty adjusts based on performance (Easy/Medium/Hard)
- **Weak Area Detection**: Rule-based intelligence identifies areas needing improvement
- **Performance Analytics**: Track progress with charts and detailed statistics
- **Company Readiness Score**: Get personalized recommendations for placement preparation

### 🤖 AI-Powered Learning Features (NEW!)

1. **Personalized Explanations** 
   - Content adapted to individual learning styles (Visual, Auditory, Reading/Writing, Kinesthetic)
   - Difficulty automatically adjusts based on quiz performance
   - Topic-specific explanations for DSA, Aptitude, and Core CS

2. **Python Code Generator**
   - Executable, well-commented code examples
   - Multiple difficulty levels (Easy, Medium, Hard)
   - Real-world implementations with test cases
   - Covers algorithms, data structures, and problem-solving patterns

3. **Visual Learning Aids**
   - Interactive flowcharts and diagrams
   - Step-by-step algorithm visualizations
   - Infographics with key concepts
   - Comparison charts and concept maps

4. **Audio Lessons**
   - Comprehensive audio scripts for verbal learning
   - Topic explanations in conversational format
   - 3-5 minute lessons for each concept
   - Supports text-to-speech integration

5. **Adaptive Content Delivery**
   - Learns from user preferences and quiz performance
   - Recommends topics based on weak areas
   - Tracks learning history
   - Adjusts content complexity automatically

### Modern UI/UX
- Responsive design with professional placement theme
- Sidebar navigation
- Card-based dashboard layout
- Interactive charts and visualizations

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express.js
- SQLite3 Database
- JWT Authentication
- bcryptjs for password hashing
- AI-powered content generation engines

**Frontend:**
- Vanilla JavaScript (no framework dependencies)
- HTML5 + CSS3
- Chart.js for analytics
- Responsive design with modern UI patterns

## 📁 Project Structure

```
placement-strategy-analyzer/
├── backend/                 # Backend API server
│   ├── config/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── frontend/                # Frontend web application
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   └── package.json
└── README.md               # This file
```

## 🚀 Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment (optional):
```bash
# Edit .env file if needed
# Default JWT_SECRET is provided for development
```

4. Start backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

Backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start frontend server:
```bash
npm start
# or for development:
npm run dev
```

Frontend will run on `http://localhost:3001`

### Access Application

Open your browser and go to `http://localhost:3001`

## 📊 System Intelligence

### Weak Area Detection Rules
- **DSA**: Accuracy < 60% → High Risk
- **Aptitude**: Accuracy < 65% → Needs Improvement
- **Core CS**: Accuracy < 50% → Critical Weak Area

### Adaptive Difficulty Logic
- Score > 80% → Difficulty increases
- Score < 50% → Difficulty decreases
- Otherwise → Difficulty remains same

### Company Readiness Criteria
**Product-Based Companies**: DSA > 75% AND Aptitude > 70% AND Core CS > 65%
**Service-Based Companies**: Focus on improving weak areas first

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Quiz System
- `GET /api/quiz/questions/:category` - Get quiz questions
- `POST /api/quiz/submit` - Submit quiz answers

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard data
- `GET /api/analytics/performance-trend` - Get performance trend

### AI Learning (NEW!)
- `GET /api/learning/preferences` - Get user learning preferences
- `POST /api/learning/preferences` - Update learning preferences
- `POST /api/learning/content` - Generate personalized learning content
- `GET /api/learning/history` - Get learning history
- `GET /api/learning/recommendations` - Get topic recommendations

## 🎯 Question Bank

- **90 Total Questions** (30 per category)
- **3 Difficulty Levels** per category (Easy/Medium/Hard)
- **Categories**: DSA, Aptitude, Core CS
- **Logic-based calculations** (no dummy data)

## 🎓 Learning Content

- **Personalized Explanations**: Adapted to 4 learning styles
- **Python Code Examples**: 50+ executable code samples
- **Visual Aids**: Flowcharts, diagrams, and infographics
- **Audio Scripts**: Comprehensive verbal explanations
- **Adaptive Delivery**: Content adjusts to user performance

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcryptjs
- CORS protection
- Input validation
- SQL injection prevention

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Professional placement theme
- Accessible UI components

## 📈 Production Ready

- Modular code structure
- Error handling
- Database persistence
- Environment configuration
- Comprehensive documentation

## 📄 License

MIT

---

**Note**: Make sure to run both backend (port 3000) and frontend (port 3001) servers for the complete application to work.

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get running in 5 minutes
- **[User Guide](USER_GUIDE.md)** - Complete usage instructions
- **[Features Documentation](FEATURES.md)** - Technical details of AI features
- **[Summary](SUMMARY.md)** - Comprehensive feature overview
- **[Changelog](CHANGELOG.md)** - Version history and updates

## 🎓 Example Usage

### 1. Taking a Quiz
```
Login → Take Quiz → Select DSA → Answer 10 questions → Submit → View Results
```

### 2. AI Learning
```
Login → AI Learning → Set Preferences → Enter "Binary Search" → Generate Content → Explore Tabs
```

### 3. Tracking Progress
```
Login → Dashboard → View Readiness Score → Check Weak Areas → Follow Recommendations
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📄 License

MIT

## 🌟 Star This Project

If you find this helpful, please give it a star! ⭐

