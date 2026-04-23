$ErrorActionPreference = "Stop"

$files = @("student.html", "staff.html", "library.html")

foreach ($file in $files) {
    $content = Get-Content -Path $file -Raw -Encoding UTF8

    # 1. Remove login overlay
    # The overlay starts with <div id="loginScreen" and ends right before <!-- Top Bar -->
    # We will use regex to remove it
    $patternLogin = '(?s)<div id="loginScreen".*?<!-- Top Bar -->'
    $content = [regex]::Replace($content, $patternLogin, "<!-- Top Bar -->")

    # 2. Fix the "index.html" link to "student.html"
    $content = $content -replace 'href="index.html"', 'href="student.html"'

    # 3. Append Logout button inside the nav bar
    # Find the closing </nav> tag and insert the button right before it
    $logoutBtn = @"
            <div class="ml-auto flex items-center">
                <button onclick="logout()" class="px-5 py-2 rounded-xl font-bold text-sm transition-all text-red-500 bg-red-50 hover:bg-red-500 hover:text-white shadow-sm border border-red-100 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    Logout
                </button>
            </div>
        </nav>
"@
    $content = $content -replace '</nav>', $logoutBtn

    [IO.File]::WriteAllText((Join-Path (Get-Location) $file), $content, [System.Text.Encoding]::UTF8)
}

Write-Host "Fix completed."
