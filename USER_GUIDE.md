# Placement Strategy Analyzer - User Guide

## Getting Started

### 1. Registration & Login

1. Open the application at `http://localhost:3001`
2. Click "Sign up" if you're a new user
3. Enter your name, email, and password
4. Click "Sign Up" to create your account
5. You'll be automatically logged in

### 2. Dashboard Overview

After login, you'll see your dashboard with:
- **Company Readiness Score**: Overall preparation level
- **Category Statistics**: Performance in DSA, Aptitude, Core CS
- **Weak Areas**: Topics needing improvement
- **Quick Actions**: Navigate to quizzes or learning

## Taking Quizzes

### Step 1: Select Category

1. Click "Take Quiz" in the sidebar
2. Choose from three categories:
   - **DSA**: Data Structures & Algorithms
   - **Aptitude**: Quantitative & Logical Reasoning
   - **CoreCS**: Operating Systems, DBMS, Networks

### Step 2: Answer Questions

1. Read each question carefully
2. Click on your chosen option
3. Selected option will be highlighted
4. Timer shows elapsed time
5. You can change answers before submitting

### Step 3: Submit & Review

1. Click "Submit Quiz" when done
2. View your results:
   - Score (correct/total)
   - Accuracy percentage
   - Time taken
   - Next difficulty level
3. Click "Take Another Quiz" to continue

### Adaptive Difficulty

- Score **> 80%**: Next quiz will be harder
- Score **< 50%**: Next quiz will be easier
- Otherwise: Difficulty stays the same

## AI-Powered Learning

### Setting Your Learning Preferences

1. Click "AI Learning" in the sidebar
2. Configure your preferences:

#### Learning Style
- **Visual**: Best for those who learn through diagrams and charts
- **Auditory**: Best for those who learn by listening
- **Reading/Writing**: Best for those who prefer text
- **Kinesthetic**: Best for hands-on learners

#### Preferred Difficulty
- **Easy**: Fundamental concepts
- **Medium**: Intermediate topics
- **Hard**: Advanced concepts

#### Content Types
- Enable/disable audio lessons
- Enable/disable visual aids
- Enable/disable code examples

3. Click "Save Preferences"

### Learning a Topic

#### Step 1: Choose Topic

1. Select category (DSA, Aptitude, CoreCS)
2. Enter topic name:
   - DSA: "Binary Search", "Stack", "Queue", "Trees"
   - Aptitude: "Percentage", "Profit & Loss", "Time & Work"
   - CoreCS: "Process Scheduling", "Memory Management"
3. Click "Generate Content"

#### Step 2: Explore Content

The system generates personalized content in 4 tabs:

##### 📖 Explanation Tab
- Personalized explanation based on your learning style
- Adapted to your performance level
- Clear, concise explanations

##### 💻 Code Tab
- Executable Python code examples
- Comprehensive comments
- Test cases included
- Copy and run locally

##### 📊 Visual Tab
- Flowcharts showing algorithm flow
- Infographics with key concepts
- Step-by-step visualizations
- Comparison charts

##### 🎧 Audio Tab
- Audio lesson script
- 3-5 minute verbal explanation
- Read aloud or use text-to-speech
- Perfect for learning on-the-go

### Understanding Adaptive Content

The system adapts content based on:

1. **Your Quiz Performance**
   - High accuracy (>80%): Advanced content
   - Medium accuracy (60-80%): Intermediate content
   - Low accuracy (<60%): Fundamental content

2. **Your Learning Style**
   - Visual: More diagrams and charts
   - Auditory: Conversational explanations
   - Reading: Detailed text descriptions
   - Kinesthetic: Practice problems and exercises

3. **Your Progress**
   - Topics you've studied
   - Time spent learning
   - Improvement trends

### Following Recommendations

1. Scroll to "Recommended Topics" section
2. System suggests topics based on weak areas
3. Priority levels:
   - **High**: Accuracy < 50% (urgent)
   - **Medium**: Accuracy 50-70% (important)
   - **Low**: Accuracy > 70% (advanced topics)
4. Click on topic tags to learn them

### Tracking Learning History

1. View "Learning History" section
2. See all topics you've studied
3. Check when you learned each topic
4. Review difficulty and learning style used

## Performance Analytics

### Performance Trend Chart

1. Click "Analytics" in the sidebar
2. View line chart showing:
   - Accuracy over time
   - Separate lines for each category
   - Trend analysis

### Recent Attempts Table

- Lists your last 10 quiz attempts
- Shows category, accuracy, and date
- Track improvement over time

## Understanding Your Readiness Score

### Company Readiness Criteria

#### Product-Based Companies
Requirements:
- DSA accuracy > 75%
- Aptitude accuracy > 70%
- Core CS accuracy > 65%

Status: "Ready for Product-Based Companies"

#### Service-Based Companies
If you don't meet product-based criteria:
- Status: "Focus on Service-Based Companies First"
- Recommendation: Improve weak areas

### Weak Area Detection

System automatically detects:

1. **High Risk** (DSA < 60%)
   - Critical priority
   - Focus immediately
   - Red warning indicator

2. **Needs Improvement** (Aptitude < 65%)
   - Medium priority
   - Regular practice needed
   - Orange warning indicator

3. **Critical Weak Area** (Core CS < 50%)
   - Highest priority
   - Urgent attention required
   - Red warning indicator

## Tips for Success

### Quiz Strategy

1. **Start with Easy**: Build confidence first
2. **Practice Regularly**: Take quizzes daily
3. **Review Mistakes**: Learn from incorrect answers
4. **Time Management**: Balance speed and accuracy
5. **Focus on Weak Areas**: Use recommendations

### Learning Strategy

1. **Set Preferences Early**: Accurate settings improve content
2. **Explore All Tabs**: Different formats reinforce learning
3. **Practice Code**: Run examples locally
4. **Use Audio for Review**: Listen during commute
5. **Follow Recommendations**: System knows your weak spots
6. **Track Progress**: Review history regularly

### Preparation Timeline

#### Week 1-2: Foundation
- Take initial quizzes in all categories
- Identify weak areas
- Set learning preferences
- Study fundamental topics

#### Week 3-4: Improvement
- Focus on weak areas
- Take quizzes at higher difficulty
- Practice code examples
- Review visual aids

#### Week 5-6: Mastery
- Take advanced quizzes
- Study complex topics
- Achieve 75%+ accuracy
- Prepare for interviews

## Troubleshooting

### Content Not Loading
- Check if backend server is running (port 3000)
- Verify you're logged in
- Check browser console for errors

### Preferences Not Saving
- Ensure you're logged in
- Check network connection
- Try refreshing the page

### Quiz Not Submitting
- Answer all questions
- Check network connection
- Verify backend is running

### Charts Not Displaying
- Take at least one quiz first
- Refresh the page
- Check if Chart.js is loaded

## Keyboard Shortcuts

- **Tab**: Navigate between options
- **Enter**: Submit forms
- **Esc**: Close modals
- **Arrow Keys**: Navigate quiz options

## Mobile Usage

The application is fully responsive:
- Sidebar collapses on mobile
- Touch-friendly buttons
- Optimized layouts
- Swipe gestures supported

## Privacy & Data

- All data stored locally in SQLite
- Passwords hashed with bcrypt
- JWT tokens for authentication
- No data shared with third parties

## Support

For issues or questions:
1. Check this user guide
2. Review FEATURES.md for technical details
3. Check README.md for setup instructions
4. Review code comments for implementation details

## Best Practices Summary

✅ **DO:**
- Set accurate learning preferences
- Take quizzes regularly
- Follow recommendations
- Practice code examples
- Review weak areas
- Track your progress

❌ **DON'T:**
- Skip preference setup
- Ignore recommendations
- Rush through quizzes
- Neglect weak areas
- Forget to review history

---

Good luck with your placement preparation! 🚀
