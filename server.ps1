param(
    [int]$Port = 5173,
    [string]$Root = "c:\Users\Mr\website"
)

$csharpCode = @"
using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Collections.Generic;

public class SpandanWebServer
{
    private TcpListener _listener;
    private string _root;
    private bool _running;
    public int ActivePort { get; private set; }

    private static readonly Dictionary<string, string> _mimeTypes = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
    {
        { ".html", "text/html; charset=utf-8" },
        { ".htm", "text/html; charset=utf-8" },
        { ".css", "text/css; charset=utf-8" },
        { ".js", "application/javascript; charset=utf-8" },
        { ".mjs", "application/javascript; charset=utf-8" },
        { ".json", "application/json; charset=utf-8" },
        { ".jpg", "image/jpeg" },
        { ".jpeg", "image/jpeg" },
        { ".png", "image/png" },
        { ".gif", "image/gif" },
        { ".svg", "image/svg+xml" },
        { ".ico", "image/x-icon" },
        { ".webp", "image/webp" },
        { ".woff", "font/woff" },
        { ".woff2", "font/woff2" },
        { ".ttf", "font/ttf" },
        { ".mp4", "video/mp4" }
    };

    public SpandanWebServer(string root)
    {
        _root = root;
    }

    public bool TryStart(int port)
    {
        try
        {
            _listener = new TcpListener(IPAddress.Any, port);
            _listener.Start();
            _running = true;
            ActivePort = port;
            ThreadPool.QueueUserWorkItem(ListenLoop);
            return true;
        }
        catch
        {
            if (_listener != null)
            {
                try { _listener.Stop(); } catch {}
            }
            return false;
        }
    }

    public void Stop()
    {
        _running = false;
        if (_listener != null)
        {
            try { _listener.Stop(); } catch {}
        }
    }

    private void ListenLoop(object state)
    {
        while (_running)
        {
            try
            {
                TcpClient client = _listener.AcceptTcpClient();
                ThreadPool.QueueUserWorkItem(ProcessClient, client);
            }
            catch
            {
                if (!_running) break;
            }
        }
    }

    private void ProcessClient(object state)
    {
        TcpClient client = (TcpClient)state;
        try
        {
            using (client)
            using (NetworkStream stream = client.GetStream())
            {
                stream.ReadTimeout = 8000;
                stream.WriteTimeout = 8000;

                byte[] buffer = new byte[8192];
                int bytesRead = stream.Read(buffer, 0, buffer.Length);
                if (bytesRead <= 0) return;

                string requestText = Encoding.ASCII.GetString(buffer, 0, bytesRead);
                string[] lines = requestText.Split(new[] { "\r\n", "\n" }, StringSplitOptions.None);
                if (lines.Length == 0) return;

                string[] tokens = lines[0].Split(' ');
                if (tokens.Length < 2) return;

                string method = tokens[0].ToUpper();
                string rawUrl = tokens[1].Split('?')[0];

                if (rawUrl == "/" || string.IsNullOrEmpty(rawUrl))
                {
                    rawUrl = "/index.html";
                }

                string decoded = Uri.UnescapeDataString(rawUrl).TrimStart('/').Replace('/', Path.DirectorySeparatorChar);
                string fullPath = Path.Combine(_root, decoded);

                if (File.Exists(fullPath))
                {
                    string ext = Path.GetExtension(fullPath);
                    string mime = _mimeTypes.ContainsKey(ext) ? _mimeTypes[ext] : "application/octet-stream";
                    byte[] fileBytes = File.ReadAllBytes(fullPath);

                    string header = "HTTP/1.1 200 OK\r\n" +
                                   "Content-Type: " + mime + "\r\n" +
                                   "Content-Length: " + fileBytes.Length + "\r\n" +
                                   "Access-Control-Allow-Origin: *\r\n" +
                                   "Cache-Control: no-cache, no-store, must-revalidate\r\n" +
                                   "Connection: close\r\n\r\n";
                    byte[] headerBytes = Encoding.UTF8.GetBytes(header);
                    stream.Write(headerBytes, 0, headerBytes.Length);
                    if (method != "HEAD")
                    {
                        stream.Write(fileBytes, 0, fileBytes.Length);
                    }
                    stream.Flush();
                }
                else
                {
                    byte[] notFound = Encoding.UTF8.GetBytes("404 - Not Found: " + rawUrl);
                    string header = "HTTP/1.1 404 Not Found\r\n" +
                                   "Content-Type: text/plain; charset=utf-8\r\n" +
                                   "Content-Length: " + notFound.Length + "\r\n" +
                                   "Access-Control-Allow-Origin: *\r\n" +
                                   "Connection: close\r\n\r\n";
                    byte[] headerBytes = Encoding.UTF8.GetBytes(header);
                    stream.Write(headerBytes, 0, headerBytes.Length);
                    if (method != "HEAD")
                    {
                        stream.Write(notFound, 0, notFound.Length);
                    }
                    stream.Flush();
                }
            }
        }
        catch
        {
            // Ignore client disconnect
        }
    }
}
"@

# Compile C# class into current session if not present
if (-not ([System.Management.Automation.PSTypeName]'SpandanWebServer').Type) {
    Add-Type -TypeDefinition $csharpCode -Language CSharp
}

$server = New-Object SpandanWebServer($Root)
$portsToTry = @($Port, 3000, 8080, 8000, 5000, 5174, 5175)
$started = $false
$activePort = 5173

foreach ($p in $portsToTry) {
    if ($server.TryStart($p)) {
        $started = $true
        $activePort = $p
        break
    }
}

if (-not $started) {
    Write-Error "Could not bind server to any available port."
    exit 1
}

# Discover local LAN IP
$lanIps = @()
try {
    $lanIps = (Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue | Where-Object { 
        $_.IPAddress -notmatch '^(127\.|169\.254\.)' -and $_.InterfaceAlias -notmatch 'Virtual|vEthernet|Loopback' 
    }).IPAddress
} catch {}

if (-not $lanIps -or $lanIps.Count -eq 0) {
    $lanIps = @("192.168.1.7")
}

Write-Host "============================================================"
Write-Host " HOTEL SPANDAN - NETWORK WEB SERVER RUNNING"
Write-Host "============================================================"
Write-Host " ON THIS COMPUTER (PC):"
Write-Host "   -> http://localhost:$activePort/"
Write-Host "   -> http://127.0.0.1:$activePort/"
Write-Host ""
Write-Host " ON YOUR MOBILE PHONE (Connect phone to same Wi-Fi):"
foreach ($lip in $lanIps) {
    Write-Host "   -> http://$lip`:$activePort/"
}
Write-Host "============================================================"

while ($true) {
    Start-Sleep -Seconds 3600
}
