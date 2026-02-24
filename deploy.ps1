# Portfolio Deployment Script for Dhiraj Kumar P
# GitHub: https://github.com/Dhiraj-0

$GitPath = "C:\Program Files\Git\cmd"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Portfolio Deployment Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git exists
$gitExe = Join-Path $GitPath "git.exe"
if (-not (Test-Path $gitExe)) {
    Write-Host "Git not found at: $gitExe" -ForegroundColor Red
    Write-Host "Please ensure Git is installed." -ForegroundColor Yellow
    exit 1
}

# Set PATH for this session
$env:PATH = "$GitPath;$env:PATH"

# Configure Git user (required for commits)
Write-Host "[Setting up Git identity...]" -ForegroundColor Yellow
& git config --global user.email "dhiraj@example.com"
& git config --global user.name "Dhiraj Kumar"

Write-Host "[1/5] Checking Git..." -ForegroundColor Green
& git --version
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "[2/5] Initializing Git repository..." -ForegroundColor Green
& git init
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "[3/5] Adding files..." -ForegroundColor Green
& git add .
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "[4/5] Creating commit..." -ForegroundColor Green
& git commit -m "Initial portfolio deployment"
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "[5/5] Connecting to GitHub and pushing..." -ForegroundColor Green
$githubUser = "Dhiraj-0"

& git remote add origin "https://github.com/$githubUser/portfolio.git"
& git branch -M main
& git push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Push failed. Please check your GitHub credentials." -ForegroundColor Red
    Write-Host "Create an empty repository at: https://github.com/new" -ForegroundColor Yellow
    Write-Host "Repository name: portfolio" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Deployment Successful! 🎉" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps to make your site live:" -ForegroundColor Yellow
Write-Host "1. Go to: https://github.com/Dhiraj-0/portfolio/settings/pages" -ForegroundColor White
Write-Host "2. Under 'Build and deployment':" -ForegroundColor White
Write-Host "   - Source: Deploy from a branch" -ForegroundColor White
Write-Host "   - Branch: main" -ForegroundColor White
Write-Host "   - Folder: / (root)" -ForegroundColor White
Write-Host "3. Click Save" -ForegroundColor White
Write-Host ""
Write-Host "Your site will be live at:" -ForegroundColor Cyan
Write-Host "https://Dhiraj-0.github.io/portfolio" -ForegroundColor Green
Write-Host ""
