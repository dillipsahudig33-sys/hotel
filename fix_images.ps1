$Owner  = "dillipsahudig33-sys"
$Repo   = "hotel"
$Branch = "main"
$Root   = "c:\Users\Mr\website"

Write-Host ""
Write-Host "  HOTEL SPANDAN - Fix Image Paths" -ForegroundColor Cyan
Write-Host "  Uploading: vercel.json + src/main.js" -ForegroundColor Cyan
Write-Host ""

$Token = Read-Host "Paste your GitHub Token (ghp_...) and press Enter"
$Token = $Token.Trim()
if (-not $Token) { Write-Host "Aborting." -ForegroundColor Red; exit 1 }

$headers = @{
    "Authorization" = "Bearer $Token"
    "Accept"        = "application/vnd.github+json"
    "User-Agent"    = "Hotel-Spandan-Uploader"
}

function Upload-File($relPath) {
    $filePath = Join-Path $Root $relPath.Replace("/", "\")
    $bytes    = [System.IO.File]::ReadAllBytes($filePath)
    $b64      = [Convert]::ToBase64String($bytes)
    $url      = "https://api.github.com/repos/$Owner/$Repo/contents/$relPath"

    $sha = $null
    try {
        $ex  = Invoke-RestMethod -Uri "${url}?ref=$Branch" -Headers $headers -Method Get -ErrorAction Stop
        $sha = $ex.sha
        Write-Host "  Found existing: $relPath (SHA $($sha.Substring(0,7))...)" -ForegroundColor DarkGray
    } catch {
        Write-Host "  New file: $relPath" -ForegroundColor DarkGray
    }

    $body = @{ message = "fix: update $relPath"; content = $b64; branch = $Branch }
    if ($sha) { $body["sha"] = $sha }

    try {
        Invoke-RestMethod -Uri $url -Headers $headers -Method Put -Body ($body | ConvertTo-Json) -ContentType "application/json" | Out-Null
        Write-Host "  [OK] $relPath uploaded!" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "  [FAIL] ${relPath}: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

$ok1 = Upload-File "vercel.json"
$ok2 = Upload-File "src/main.js"

Write-Host ""
if ($ok1 -and $ok2) {
    Write-Host "  SUCCESS! Vercel will redeploy in ~1 minute." -ForegroundColor Green
    Write-Host "  Live site: https://hotel-spandan.vercel.app" -ForegroundColor Cyan
} else {
    Write-Host "  Some uploads failed. Check your token has 'repo' permission." -ForegroundColor Yellow
}
Write-Host ""
