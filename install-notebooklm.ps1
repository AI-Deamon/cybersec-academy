# NotebookLM MCP Installer for Claude Desktop
# Run as Administrator: Set-ExecutionPolicy Bypass -Scope Process -Force; .\install-notebooklm.ps1

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " NotebookLM MCP Installer for Claude" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get Python path
$pythonPath = Get-Command python -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source
if (-not $pythonPath) {
    $pythonPath = Get-Command python3 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source
}
if (-not $pythonPath) {
    Write-Host "[ERROR] Python not found. Install Python 3.10+ from https://python.org" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Python found: $pythonPath" -ForegroundColor Green

# Get Python version
$pyVersion = & $pythonPath --version 2>&1
Write-Host "[OK] Version: $pyVersion" -ForegroundColor Green

# Install notebooklm-py
Write-Host ""
Write-Host "[...] Installing notebooklm-py..." -ForegroundColor Yellow
& $pythonPath -m pip install "notebooklm-py[mcp]" --quiet 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to install notebooklm-py" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] notebooklm-py installed" -ForegroundColor Green

# Find and patch fastmcp
Write-Host ""
Write-Host "[...] Patching fastmcp..." -ForegroundColor Yellow
$pipShow = & $pythonPath -m pip show fastmcp 2>&1
if ($pipShow -match "Location:\s+(.+)") {
    $sitePackages = $Matches[1].Trim()
    $skillsDir = Join-Path $sitePackages "fastmcp\server\providers\skills"
    $claudeProvider = Join-Path $skillsDir "claude_provider.py"
    
    if (-not (Test-Path $skillsDir)) {
        New-Item -ItemType Directory -Path $skillsDir -Force | Out-Null
    }
    
    if (-not (Test-Path $claudeProvider)) {
        @'
from __future__ import annotations
from fastmcp.server.providers.skills.directory_provider import SkillsDirectoryProvider

class ClaudeSkillsProvider(SkillsDirectoryProvider):
    def __init__(self, reload: bool = False) -> None:
        from pathlib import Path
        root = Path.home() / ".claude" / "skills"
        super().__init__(roots=[root], reload=reload, main_file_name="SKILL.md", supporting_files="template")
'@ | Out-File -FilePath $claudeProvider -Encoding UTF8
        Write-Host "[OK] fastmcp patched" -ForegroundColor Green
    } else {
        Write-Host "[OK] fastmcp already patched" -ForegroundColor Green
    }
} else {
    Write-Host "[WARN] Could not find fastmcp location, skipping patch" -ForegroundColor Yellow
}

# Login to NotebookLM
Write-Host ""
Write-Host "[...] Opening browser for Google login..." -ForegroundColor Yellow
Write-Host "    Sign in with your Google account when the browser opens." -ForegroundColor Cyan
& $pythonPath -m notebooklm login

# Update Claude Desktop config
Write-Host ""
Write-Host "[...] Updating Claude Desktop config..." -ForegroundColor Yellow

$claudeConfigPath = "$env:APPDATA\Claude\claude_desktop_config.json"
if (-not (Test-Path $claudeConfigPath)) {
    # Try Windows Store path
    $claudeConfigPath = "$env:LOCALAPPDATA\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json"
}

if (Test-Path $claudeConfigPath) {
    $config = Get-Content $claudeConfigPath -Raw | ConvertFrom-Json
    
    if (-not $config.mcpServers) {
        $config | Add-Member -NotePropertyName "mcpServers" -NotePropertyValue @{}
    }
    
    if (-not $config.mcpServers.notebooklm) {
        $config.mcpServers | Add-Member -NotePropertyName "notebooklm" -NotePropertyValue @{
            command = $pythonPath
            args = @("-m", "notebooklm.mcp")
        }
        $config | ConvertTo-Json -Depth 10 | Set-Content $claudeConfigPath -Encoding UTF8
        Write-Host "[OK] Claude Desktop config updated" -ForegroundColor Green
    } else {
        Write-Host "[OK] NotebookLM already in config" -ForegroundColor Green
    }
} else {
    Write-Host "[WARN] Claude Desktop config not found. Add manually:" -ForegroundColor Yellow
    Write-Host @"
{
  "mcpServers": {
    "notebooklm": {
      "command": "$pythonPath",
      "args": ["-m", "notebooklm.mcp"]
    }
  }
}
"@
}

# Done
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "1. Restart Claude Desktop" -ForegroundColor Cyan
Write-Host "2. Ask Claude to list your notebooks" -ForegroundColor Cyan
Write-Host ""
