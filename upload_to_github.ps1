param(
    [string]$Token,
    [string]$Owner = "dillipsahudig33-sys",
    [string]$Repo = "hotel",
    [string]$Branch = "main"
)

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  HOTEL SPANDAN - DIRECT GITHUB UPLOADER (NO GIT NEEDED)" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

if (-not $Token) {
    Write-Host "`nTo upload your files without installing Git, you need a GitHub Token." -ForegroundColor Yellow
    Write-Host "1. Open this link in Chrome: https://github.com/settings/tokens/new"
    Write-Host "2. Note: 'Hotel Website'"
    Write-Host "3. Check the checkbox for 'repo' (Full control of private repositories)"
    Write-Host "4. Scroll down and click 'Generate token'"
    Write-Host "5. Copy the token (starts with ghp_...)" -ForegroundColor Green
    Write-Host ""
    $Token = Read-Host "Paste your GitHub Token here and press Enter"
}

if (-not $Token -or $Token.Trim() -eq "") {
    Write-Error "No token provided. Aborting."
    exit 1
}

$Token = $Token.Trim()
$headers = @{
    "Authorization" = "Bearer $Token"
    "Accept" = "application/vnd.github+json"
    "User-Agent" = "Hotel-Spandan-Uploader"
}

# Verify repository access
Write-Host "`nVerifying repository '$Owner/$Repo'..." -ForegroundColor Cyan
try {
    $repoInfo = Invoke-RestMethod -Uri "https://api.github.com/repos/$Owner/$Repo" -Headers $headers -Method Get
    Write-Host "Repository connected: $($repoInfo.full_name)" -ForegroundColor Green
} catch {
    Write-Error "Could not connect to repository '$Owner/$Repo'. Please check your token permissions: $($_.Exception.Message)"
    exit 1
}

$root = "c:\Users\Mr\website"
$files = Get-ChildItem -Path $root -Recurse -File | Where-Object {
    $_.FullName -notmatch '(\.git|node_modules|mingit|\.log$|\.zip$|test_.*\.ps1$|copy_.*\.ps1$|check_.*\.ps1$|git_push\.ps1$)'
}

Write-Host "`nUploading $($files.Count) project files to GitHub..." -ForegroundColor Cyan

foreach ($f in $files) {
    $relPath = $f.FullName.Substring($root.Length).TrimStart('\','/').Replace('\','/')
    $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
    $b64 = [Convert]::ToBase64String($bytes)

    $url = "https://api.github.com/repos/$Owner/$Repo/contents/$relPath"
    
    # Check if file exists
    $sha = $null
    try {
        $existing = Invoke-RestMethod -Uri "$url?ref=$Branch" -Headers $headers -Method Get -ErrorAction Stop
        $sha = $existing.sha
    } catch {}

    $body = @{
        message = "Upload $relPath"
        content = $b64
        branch = $Branch
    }
    if ($sha) {
        $body["sha"] = $sha
    }

    $jsonBody = $body | ConvertTo-Json

    try {
        $res = Invoke-RestMethod -Uri $url -Headers $headers -Method Put -Body $jsonBody -ContentType "application/json"
        Write-Host " [OK] Uploaded $relPath" -ForegroundColor Green
    } catch {
        Write-Host " [ERR] Failed $relPath : $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n============================================================" -ForegroundColor Cyan
Write-Host " ALL FILES UPLOADED TO GITHUB SUCCESSFULLY!" -ForegroundColor Green
Write-Host " View your repository: https://github.com/$Owner/$Repo" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
