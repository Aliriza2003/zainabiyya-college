Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("C:\Users\USER\Desktop\database\logo.png.png")
$bmp = New-Object System.Drawing.Bitmap 256, 256
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, 256, 256)
$bmp.Save("C:\Users\USER\Desktop\database\logo_256.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
$img.Dispose()

$pngBytes = [System.IO.File]::ReadAllBytes("C:\Users\USER\Desktop\database\logo_256.png")
$size = $pngBytes.Length
$fs = [System.IO.File]::Create("C:\Users\USER\Desktop\database\logo.ico")

$fs.WriteByte(0); $fs.WriteByte(0)
$fs.WriteByte(1); $fs.WriteByte(0)
$fs.WriteByte(1); $fs.WriteByte(0)

$fs.WriteByte(0); $fs.WriteByte(0)
$fs.WriteByte(0); $fs.WriteByte(0)
$fs.WriteByte(1); $fs.WriteByte(0)
$fs.WriteByte(32); $fs.WriteByte(0)

$fs.WriteByte([byte]($size -band 255))
$fs.WriteByte([byte](($size -shr 8) -band 255))
$fs.WriteByte([byte](($size -shr 16) -band 255))
$fs.WriteByte([byte](($size -shr 24) -band 255))

$fs.WriteByte(22); $fs.WriteByte(0); $fs.WriteByte(0); $fs.WriteByte(0)

$fs.Write($pngBytes, 0, $size)
$fs.Close()

$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut("C:\Users\USER\Desktop\Zainabiyya System.lnk")
$Shortcut.TargetPath = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
$Shortcut.Arguments = "--app=""file:///C:/Users/USER/Desktop/database/index.html"""
$Shortcut.IconLocation = "C:\Users\USER\Desktop\database\logo.ico"
$Shortcut.Save()

[System.Runtime.InteropServices.Marshal]::ReleaseComObject($Shortcut) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($WshShell) | Out-Null
Write-Output 'Done'
