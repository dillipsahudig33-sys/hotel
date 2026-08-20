$listener = New-Object System.Net.HttpListener
$prefixes = @(
    "http://localhost:5173/",
    "http://127.0.0.1:5173/",
    "http://192.168.1.7:5173/"
)

foreach ($p in $prefixes) {
    try {
        $listener.Prefixes.Add($p)
        Write-Host "Added prefix: $p"
    } catch {
        Write-Host "Could not add prefix $p : $($_.Exception.Message)"
    }
}

try {
    $listener.Start()
    Write-Host "Listener started successfully on:"
    foreach ($p in $listener.Prefixes) {
        Write-Host " - $p"
    }
    $listener.Stop()
} catch {
    Write-Host "Failed to start listener: $($_.Exception.Message)"
}
