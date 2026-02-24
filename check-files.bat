@echo off
cd /d c:\Users\ACER\Desktop\portfolio
"C:\Program Files\Git\cmd\git.exe" log --oneline -5
echo.
echo Files in repo:
"C:\Program Files\Git\cmd\git.exe" ls-files
