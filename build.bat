@echo off
chcp 65001 >nul
echo ============================================
echo    Court Assistant — Сборка .exe
echo ============================================
echo.
cd /d "%~dp0"

echo [1/2] Компиляция проекта...
call npm run build:win
if %errorlevel% neq 0 (
    echo [ОШИБКА] Сборка завершилась с ошибкой
    pause
    exit /b 1
)

echo.
echo [2/2] Сборка завершена!
echo Установщик находится в папке: release\
echo.
pause
