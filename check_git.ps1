$paths = @(
    "C:\Program Files\Git\cmd\git.exe",
    "C:\Program Files (x86)\Git\cmd\git.exe",
    "C:\Users\Mr\AppData\Local\Programs\Git\cmd\git.exe",
    "C:\Users\Mr\scoop\apps\git\current\bin\git.exe",
    "C:\ProgramData\chocolatey\bin\git.exe"
)

foreach ($p in $paths) {
    if (Test-Path $p) {
        Write-Host "FOUND: $p"
    } else {
        Write-Host "NOT FOUND: $p"
    }
}

$ghDesktop = Get-ChildItem -Path "C:\Users\Mr\AppData\Local\GitHubDesktop" -Filter "git.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
if ($ghDesktop) {
    Write-Host "FOUND GITHUB DESKTOP GIT: $($ghDesktop.FullName)"
}
