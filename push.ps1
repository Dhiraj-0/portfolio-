# Push to GitHub
$GitPath = "C:\Program Files\Git\cmd"
$env:PATH = "$GitPath;$env:PATH"

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan

$githubUser = "Dhiraj-0"

# Check if remote exists, if not add it
$remote = git remote get-url origin 2>$null
if ($remote -ne "https://github.com/$githubUser/portfolio.git") {
    git remote remove origin 2>$null
    git remote add origin "https://github.com/$githubUser/portfolio.git"
}

git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Successfully Pushed to GitHub! 🎉" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
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
} else {
    Write-Host "Push failed!" -ForegroundColor Red
}
