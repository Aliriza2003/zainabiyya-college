$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$desktopPath = [Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktopPath "Zainabiyya System.lnk"
$indexPath = Join-Path $scriptDir "index.html"
$iconPath = Join-Path $scriptDir "logo.ico"

# Browser Detection
$browserExe = $null

$candidates = @(
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    "$env:LOCALAPPDATA\Microsoft\Edge\Application\msedge.exe"
)

foreach ($path in $candidates) {
    if (Test-Path $path) {
        $browserExe = $path
        break
    }
}

if (-not $browserExe) {
    Write-Host "[ERROR] Neither Google Chrome nor Microsoft Edge was found on this PC!" -ForegroundColor Red
    Write-Host "Please install Chrome or Edge to run the standalone app."
    Read-Host "Press Enter to exit"
    exit 1
}

# Create Shortcut
try {
    $wshShell = New-Object -ComObject WScript.Shell
    $shortcut = $wshShell.CreateShortcut($shortcutPath)
    $shortcut.TargetPath = $browserExe
    $fileUrl = $indexPath.Replace("\", "/")
    $shortcut.Arguments = "--app=""file:///$fileUrl"""
    if (Test-Path $iconPath) {
        $shortcut.IconLocation = $iconPath
    }
    $shortcut.WorkingDirectory = $scriptDir
    $shortcut.Description = "Zainabiyya Ladies College Administrative Portal"
    $shortcut.Save()

    Write-Host ""
    Write-Host "===================================================" -ForegroundColor Green
    Write-Host "[SUCCESS] Zainabiyya System Desktop Shortcut Created!" -ForegroundColor Green
    Write-Host "Location: $shortcutPath" -ForegroundColor Cyan
    Write-Host "Browser:  $browserExe" -ForegroundColor Yellow
    Write-Host "===================================================" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "[ERROR] Failed to create shortcut: $_" -ForegroundColor Red
}
