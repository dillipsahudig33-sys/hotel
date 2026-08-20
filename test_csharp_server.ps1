$code = @"
using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Collections.Generic;

public class SimpleHttpServer
{
    private TcpListener _listener;
    private string _root;
    private bool _running;
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

    public SimpleHttpServer(string root, int port)
    {
        _root = root;
        _listener = new TcpListener(IPAddress.Any, port);
    }

    public void Start()
    {
        _listener.Start();
        _running = true;
        ThreadPool.QueueUserWorkItem(ListenLoop);
    }

    public void Stop()
    {
        _running = false;
        try { _listener.Stop(); } catch {}
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
                stream.ReadTimeout = 5000;
                stream.WriteTimeout = 5000;

                byte[] buffer = new byte[8192];
                int bytesRead = stream.Read(buffer, 0, buffer.Length);
                if (bytesRead <= 0) return;

                string requestText = Encoding.ASCII.GetString(buffer, 0, bytesRead);
                string[] lines = requestText.Split(new[] { "\r\n", "\n" }, StringSplitOptions.None);
                if (lines.Length == 0) return;

                string[] tokens = lines[0].Split(' ');
                if (tokens.Length < 2) return;

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
                    stream.Write(fileBytes, 0, fileBytes.Length);
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
                    stream.Write(notFound, 0, notFound.Length);
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

Add-Type -TypeDefinition $code -Language CSharp
Write-Host "C# Server Compiled Successfully!"
