@echo off
echo ========================================
echo    RECRUTIX - Quick Start
echo ========================================
echo.

REM Start Backend
echo [1/2] Starting Backend...
cd /d "%~dp0backend"
start "Recrutix Backend" cmd /k "call venv\Scripts\activate && uvicorn app.main:app --reload --port 8000"

REM Wait a bit
timeout /t 3 /nobreak >nul

REM Start Frontend
echo [2/2] Starting Frontend...
cd /d "%~dp0frontend"
start "Recrutix Frontend" cmd /k "npm run dev"

REM Wait and open browser
timeout /t 5 /nobreak >nul
start http://localhost:5173

echo.
echo ========================================
echo   RECRUTIX Started Successfully!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:8000
echo ========================================
echo.
echo Close the terminal windows to stop.
pause
