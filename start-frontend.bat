@echo off
echo ========================================
echo Starting Frontend Server
echo ========================================
cd frontend
echo Installing dependencies...
call npm install
echo.
echo Starting server on port 3001...
call npm start
pause
