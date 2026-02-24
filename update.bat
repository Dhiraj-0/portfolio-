@echo off
cd /d c:\Users\ACER\Desktop\portfolio
"C:\Program Files\Git\cmd\git.exe" add -A
"C:\Program Files\Git\cmd\git.exe" commit -m "Update portfolio"
"C:\Program Files\Git\cmd\git.exe" push origin main
echo.
echo Changes pushed successfully!
pause
