@echo off
echo ===================================================
echo Zainabiyya System Installer for New Computers
echo ===================================================
echo.

set "SCRIPT_DIR=%~dp0"
set URL_PATH=%SCRIPT_DIR:\=/%
set "SHORTCUT_PATH=%USERPROFILE%\Desktop\Zainabiyya System.lnk"
set "CHROME_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME_PATH%" set "CHROME_PATH=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"

if not exist "%CHROME_PATH%" (
    echo [ERROR] Google Chrome is not found on this PC! 
    echo Please install Chrome and try again.
    pause
    exit /b
)

echo Creating standalone shortcut on Desktop...

set "VBS_PATH=%TEMP%\CreateShortcut.vbs"
echo Set oWS = WScript.CreateObject("WScript.Shell") > "%VBS_PATH%"
echo sLinkFile = "%SHORTCUT_PATH%" >> "%VBS_PATH%"
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%VBS_PATH%"
echo oLink.TargetPath = "%CHROME_PATH%" >> "%VBS_PATH%"
echo oLink.Arguments = "--app=""file:///%URL_PATH%index.html""" >> "%VBS_PATH%"
echo oLink.IconLocation = "%SCRIPT_DIR%logo.ico" >> "%VBS_PATH%"
echo oLink.Save >> "%VBS_PATH%"

cscript /nologo "%VBS_PATH%"
del "%VBS_PATH%"

echo.
echo [SUCCESS] Shortcut successfully created! 
echo You can now use Zainabiyya System from the Desktop.
echo.
pause
