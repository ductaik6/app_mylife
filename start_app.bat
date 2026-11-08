@echo off
chcp 65001 >nul
title MyLife Dashboard - Local Server

echo ========================================================
echo        🚀 ĐANG KHỞI CHẠY MYLIFE LOCAL SERVER...
echo ========================================================
echo.
cd /d "%~dp0"

where python >nul 2>&1
if %ERRORLEVEL% equ 0 (
    python server.py
) else (
    echo [Thong bao] Dang mo truc tiep ung dung tren trinh duyet...
    start "" "index.html"
)
pause

