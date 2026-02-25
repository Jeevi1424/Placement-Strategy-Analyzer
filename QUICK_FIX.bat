@echo off
echo ========================================
echo QUICK FIX - Starting Backend Server
echo ========================================

echo Killing any existing Node processes...
taskkill /F /IM node.exe >nul 2>&1

echo Starting backend server...
cd backend
start "Backend Server" cmd /k "node server-simple.js"

echo Waiting 3 seconds...
timeout /t 3 /nobreak >nul

echo Testing backend connection...
curl -s http://localhost:3000/api/health

echo.
echo ========================================
echo Backend should now be running!
echo Open browser to: http://localhost:3001
echo ========================================
pause