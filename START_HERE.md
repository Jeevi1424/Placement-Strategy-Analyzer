# 🚀 START HERE - Complete Setup Guide

## ✅ Step 1: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend  
```bash
cd frontend
npm install
```

## ✅ Step 2: Start Backend Server

Open Terminal/Command Prompt #1:

```bash
cd backend
npm start
```

**You should see:**
```
🚀 Backend server running on http://localhost:3000
📊 API endpoints available at http://localhost:3000/api
```

**Keep this terminal open!**

## ✅ Step 3: Start Frontend Server

Open NEW Terminal/Command Prompt #2:

```bash
cd frontend
npm start
```

**Browser will automatically open at:** `http://localhost:3001`

**Keep this terminal open too!**

## ✅ Step 4: Test the Application

1. **Sign Up**
   - Enter name, email, password
   - Click "Sign Up"

2. **Take a Quiz** (Optional - to build performance data)
   - Click "Take Quiz"
   - Select "DSA"
   - Answer 10 questions
   - Submit

3. **Test AI Learning** (Main Feature!)
   - Click "AI Learning" in sidebar
   - Set your learning preferences
   - Enter topic: **"Binary Search"**
   - Click "Generate Content"
   - Explore all 4 tabs:
     - 📖 **Explanation** - 10+ lines definition
     - 💻 **Code** - Python examples
     - 📊 **Visual** - Colorful diagrams
     - 🎧 **Audio** - Click Play button

## 🎯 Topics That Work

Try these topics for best results:

### DSA
- Binary Search
- Stack
- Queue
- Linked List
- Trees
- Sorting

### Aptitude
- Percentage
- Profit and Loss
- Time and Work

### Core CS
- Process Scheduling
- Memory Management

## 🐛 Troubleshooting

### Problem: Port Already in Use

**Kill Port 3000 (Backend):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Kill Port 3001 (Frontend):**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

### Problem: npm install fails

```bash
# Clear cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules

# Reinstall
npm install
```

### Problem: Nothing shows in AI Learning

1. Check backend terminal - should show no errors
2. Check browser console (F12) - look for errors
3. Make sure you're logged in
4. Try refreshing the page
5. Try a different topic like "Stack"

### Problem: Audio not playing

1. Make sure browser allows audio
2. Check volume settings
3. Try clicking Play button again
4. Some browsers need user interaction first

## 📝 Quick Test Checklist

- [ ] Backend running on port 3000
- [ ] Frontend running on port 3001
- [ ] Can sign up / login
- [ ] Can take a quiz
- [ ] Can see dashboard
- [ ] Can click "AI Learning"
- [ ] Can set preferences
- [ ] Can enter "Binary Search"
- [ ] Can click "Generate Content"
- [ ] Can see Explanation tab (10+ lines)
- [ ] Can see Code tab (Python code)
- [ ] Can see Visual tab (diagrams)
- [ ] Can click Play on Audio tab

## 🎉 Success!

If all checkboxes are checked, you're ready to use the full AI-powered learning platform!

## 📚 Next Steps

1. Read [USER_GUIDE.md](USER_GUIDE.md) for detailed usage
2. Check [FEATURES.md](FEATURES.md) for technical details
3. Explore different topics and learning styles
4. Take quizzes to build performance data
5. Follow recommendations for weak areas

---

**Need Help?** Check the documentation files or review the code comments.
