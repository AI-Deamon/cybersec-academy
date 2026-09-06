# Day 4 "do it now" — send an HTTP request by hand, Windows / PowerShell version.
# (On Linux/mac just use:  printf 'GET / HTTP/1.1\r\nHost: example.com\r\nConnection: close\r\n\r\n' | ncat example.com 80 )
#
# Usage:   powershell -ExecutionPolicy Bypass -File http_by_hand.ps1 example.com
#
# Point: an HTTP request is plain text. This talks to port 80 (no TLS) so the whole
# exchange is human-readable — which is exactly why plain HTTP is unsafe on a hostile network.

param([string]$Host = "example.com")

$client = [System.Net.Sockets.TcpClient]::new($Host, 80)
$stream = $client.GetStream()
$writer = [System.IO.StreamWriter]::new($stream)
$reader = [System.IO.StreamReader]::new($stream)

# The request — note the blank line (\r\n\r\n) that ends the headers.
$writer.Write("GET / HTTP/1.1`r`n")
$writer.Write("Host: $Host`r`n")
$writer.Write("User-Agent: day4-by-hand`r`n")
$writer.Write("Connection: close`r`n")
$writer.Write("`r`n")
$writer.Flush()

Write-Host "----- RAW RESPONSE -----" -ForegroundColor Cyan
$reader.ReadToEnd()

$client.Close()
