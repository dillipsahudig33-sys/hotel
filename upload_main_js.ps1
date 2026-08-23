# ============================================================
#   UPLOAD src/main.js to GitHub
#   Run this after making changes to fix menu images
# ============================================================

$Owner  = "dillipsahudig33-sys"
$Repo   = "hotel"
$Branch = "main"
$File   = "src/main.js"
$Root   = "c:\Users\Mr\website"

Write-Host ""
Write-Host "  ========================================" -ForegroundColor Cyan
Write-Host "   HOTEL SPANDAN - Upload src/main.js     " -ForegroundColor Cyan
Write-Host "  ========================================" -ForegroundColor Cyan
Write-Host ""

# --- Ask for token ---
$Token = Read-Host "Paste your GitHub Token (starts with ghp_...) and press Enter"
$Token = $Token.Trim()

if (-not $Token) {
    Write-Host ""
    Write-Host " No token entered. Aborting." -ForegroundColor Red
    Write-Host " Get a token at: https://github.com/settings/tokens/new" -ForegroundColor Yellow
    exit 1
}

$headers = @{
    "Authorization" = "Bearer $Token"
    "Accept"        = "application/vnd.github+json"
    "User-Agent"    = "Hotel-Spandan-Uploader"
}

# --- Upload src/main.js ---
$filePath = Join-Path $Root $File.Replace("/", "\")
$relPath  = $File   # GitHub API uses forward slashes

Write-Host ""
Write-Host " Uploading '$relPath' to GitHub..." -ForegroundColor Cyan

$bytes = [System.IO.File]::ReadAllBytes($filePath)
$b64   = [Convert]::ToBase64String($bytes)
$url   = "https://api.github.com/repos/$Owner/$Repo/contents/$relPath"

# Get existing file SHA (needed to update existing file)
$sha = $null
try {
    $existing = Invoke-RestMethod -Uri "$url?ref=$Branch" -Headers $headers -Method Get -ErrorAction Stop
    $sha = $existing.sha
    Write-Host " Found existing file (SHA: $($sha.Substring(0,7))...)" -ForegroundColor DarkGray
} catch {
    Write-Host " File not found on GitHub — will create it." -ForegroundColor Yellow
}

$body = @{
    message = "fix: correct image paths from /public/images/ to /images/ for Vite"
    content = $b64
    branch  = $Branch
}
if ($sha) { $body["sha"] = $sha }

try {
    Invoke-RestMethod -Uri $url -Headers $headers -Method Put -Body ($body | ConvertTo-Json) -ContentType "application/json" | Out-Null
    Write-Host ""
    Write-Host "  [SUCCESS] '$relPath' uploaded!" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Vercel will auto-deploy in ~1 minute." -ForegroundColor Yellow
    Write-Host "  Live site: https://hotel-spandan.vercel.app" -ForegroundColor Cyan
    Write-Host ""
} catch {
    Write-Host ""
    Write-Host "  [ERROR] Upload failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "  Make sure your token has 'repo' permission." -ForegroundColor Yellow
    Write-Host ""
}
