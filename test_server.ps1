$urls = @(
    "http://localhost:5173/",
    "http://192.168.1.7:5173/",
    "http://192.168.1.7:5173/src/style.css",
    "http://192.168.1.7:5173/src/main.js",
    "http://192.168.1.7:5173/public/images/royal-pakhala-thali.jpg"
)

foreach ($u in $urls) {
    try {
        $res = Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 5
        Write-Host "[OK 200] $u - $($res.Headers['Content-Type']) ($($res.RawContentLength) bytes)"
    } catch {
        Write-Host "[ERROR] $u - $($_.Exception.Message)"
    }
}
