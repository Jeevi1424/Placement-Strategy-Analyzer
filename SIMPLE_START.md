# 🚀 SIMPLE START GUIDE

## Method 1: Using Batch Files (Easiest for Windows)

### Step 1: Start Backend
1. Double-click `start-backend.bat`
2. Wait for message: "Backend server running on http://localhost:3000"
3. **Keep this window open!**

### Step 2: Start Frontend
1. Double-click `start-frontend.bat`
2. Browser will open automatically
3. **Keep this window open too!**

---

## Method 2: Using Command Prompt

### Step 1: Start Backend
Open Command Prompt and run:
```cmd
cd backend
npm install
npm start
```

Wait for: `🚀 Backend server running on http://localhost:3000`

**Keep this window open!**

### Step 2: Start Frontend
Open **NEW** Command Prompt and run:
```cmd
cd frontend
npm install
npm start
```

Browser opens at: `http://localhost:3001`

**Keep this window open too!**

---

## ⚠️ Important Notes

1. **You need TWO terminal windows open** - one for backend, one for frontend
2. **Don't close either window** while using the app
3. **Backend MUST start first** before frontend
4. **Wait for success message** before starting the next server

---

## 🐛 If You See Errors

### Error: "Port 3000 is already in use"

Open Command Prompt as Administrator:
```cmd
netstat -ano | findstr :3000
taskkill /PID <NUMBER> /F
```

Replace `<NUMBER>` with the PID shown.

### Error: "npm is not recognized"

You need to install Node.js:
1. Go to https://nodejs.org
2. Download and install LTS version
3. Restart computer
4. Try again

### Error: "Cannot find module"

```cmd
cd backend
rmdir /s /q node_modules
npm install

cd ../frontend
rmdir /s /q node_modules
npm install
```

---

## ✅ How to Know It's Working

### Backend Terminal Should Show:
```
🚀 Backend server running on http://localhost:3000
📊 API endpoints available at http://localhost:3000/api
```

### Frontend Terminal Should Show:
```
Compiled successfully!
Local: http://localhost:3001
```

### Browser Should:
- Open automatically to http://localhost:3001
- Show the login page
- No error messages

---

## 🎯 Test the App

1. **Sign Up** with any email and password
2. **Login** with same credentials
3. Click **"AI Learning"** in sidebar
4. Enter **"Binary Search"**
5. Click **"Generate Content"**
6. Check all 4 tabs work

---

## 🆘 Still Having Issues?

1. Make sure Node.js is installed: `node --version`
2. Make sure npm is installed: `npm --version`
3. Check if ports are free: `netstat -ano | findstr :3000`
4. Try restarting your computer
5. Check antivirus isn't blocking Node.js

---

**Need more help?** Take a screenshot of the error and check the error message carefully.
