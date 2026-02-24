@echo off
echo ========================================
echo   Portfolio Deployment Script
echo ========================================
echo.

echo Step 1: Checking Git installation...
git --version
if errorlevel 1 (
    echo Git not found! Please restart your terminal or computer.
    echo Then run this script again.
    pause
    exit /b 1
)

echo.
echo Step 2: Initializing Git repository...
git init

echo.
echo Step 3: Adding files...
git add .

echo.
echo Step 4: Creating initial commit...
git commit -m "Initial portfolio deployment"

echo.
echo Step 5: Repository Setup
echo ========================
echo Please create a new repository on GitHub:
echo 1. Go to: https://github.com/new
echo 2. Name it: portfolio
echo 3. Make it Public
echo 4. Click "Create Repository"
echo.
echo Then come back and press any key...
pause > nul

echo.
echo Step 6: Enter your GitHub username:
set /p GH_USER=

echo.
echo Step 7: Connecting to GitHub and pushing...
git remote add origin https://github.com/%GH_USER%/portfolio.git
git branch -M main
git push -u origin main

echo.
echo ========================================
echo Deployment complete!
echo.
echo Next steps:
echo 1. Go to: https://github.com/%GH_USER%/portfolio
echo 2. Click Settings
echo 3. Click Pages (left menu)
echo 4. Under "Build and deployment":
echo    - Source: Deploy from a branch
echo    - Branch: main
echo    - Folder: / (root)
echo 5. Click Save
echo.
echo Your site will be live at:
echo https://%GH_USER%.github.io/portfolio
echo ========================================
pause
