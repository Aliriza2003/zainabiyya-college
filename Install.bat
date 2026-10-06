@echo off
title Zainabiyya System Installer
echo ===================================================
echo Zainabiyya Master System Installer
echo ===================================================
echo.
echo Installing desktop shortcut...

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Install.ps1"

echo.
pause
