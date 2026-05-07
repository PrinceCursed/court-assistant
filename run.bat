@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Запуск Court Assistant (режим разработки)...
call npm run dev
