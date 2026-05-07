@echo off
chcp 65001 >nul
echo ============================================
echo    Court Assistant — Установка
echo ============================================
echo.
cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ОШИБКА] Node.js не найден. Установите Node.js 20+ с https://nodejs.org
    pause
    exit /b 1
)

echo [1/2] Установка зависимостей...
call npm install
if %errorlevel% neq 0 (
    echo [ОШИБКА] Не удалось установить зависимости
    pause
    exit /b 1
)

echo.
echo [2/2] Установка завершена!
echo.
echo Для запуска используйте: run.bat
echo Для сборки .exe используйте: build.bat
echo.
pause
