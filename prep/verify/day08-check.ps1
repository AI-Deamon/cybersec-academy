<#
  Day 8 pre-flight check  -  Windows Fundamentals (PowerShell / ACLs)
  Run the DAY BEFORE class, on the Windows host (NOT in WSL).

      powershell -ExecutionPolicy Bypass -File .\prep\verify\day08-check.ps1

  READ-ONLY. This script changes nothing except one temp file it creates
  and deletes in your own Documents folder.
  Exit code 0 = ready to teach. Non-zero = fix something first.
#>

$script:fails = 0
$script:warns = 0

function OK    ($m) { Write-Host "[OK]   $m" -ForegroundColor Green }
function FAIL  ($m, $fix) { Write-Host "[FAIL] $m" -ForegroundColor Red; Write-Host "       -> $fix" -ForegroundColor Yellow; $script:fails++ }
function WARN  ($m, $note) { Write-Host "[WARN] $m" -ForegroundColor DarkYellow; Write-Host "       -> $note" -ForegroundColor Gray; $script:warns++ }
function Head  ($m) { Write-Host "`n=== $m ===" -ForegroundColor Cyan }

Write-Host "Day 8 pre-flight - Windows Fundamentals" -ForegroundColor White
Write-Host "Demo machine: Windows host, PowerShell" -ForegroundColor Gray

# ---------------------------------------------------------------- 1. Platform
Head "1. Platform"

if ($PSVersionTable.PSVersion.Major -ge 5) {
    OK "PowerShell $($PSVersionTable.PSVersion) (>= 5 required)"
} else {
    FAIL "PowerShell $($PSVersionTable.PSVersion) is too old" "Install Windows PowerShell 5.1 or PowerShell 7"
}

if ($env:WSL_DISTRO_NAME) {
    FAIL "You are running INSIDE WSL ($env:WSL_DISTRO_NAME)" "Day 8 demos must run on the Windows host. Open Windows PowerShell instead."
} else {
    OK "Running on Windows host (not WSL) - correct for Day 8"
}

# ------------------------------------------------- 2. Least privilege posture
Head "2. Least-privilege posture (you should NOT be admin)"

$isAdmin = ([Security.Principal.WindowsPrincipal] `
            [Security.Principal.WindowsIdentity]::GetCurrent()
           ).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if ($isAdmin) {
    FAIL "This PowerShell IS elevated (Administrator)" "Close it and open a NORMAL PowerShell. Slide 10 demo depends on IsInRole returning False, and you are teaching least privilege - model it."
} else {
    OK "Running as standard user - Slide 10 demo will return False as intended"
}

# ------------------------------------------------------------- 3. Core cmdlets
Head "3. Core cmdlets used in the demo"

foreach ($c in 'whoami','Get-Location','Get-ChildItem','Get-Acl','Get-Service','Get-Content') {
    if (Get-Command $c -ErrorAction SilentlyContinue) { OK "$c available" }
    else { FAIL "$c NOT available" "Core cmdlet missing - your PowerShell install is broken" }
}

if (Get-Command Get-LocalUser -ErrorAction SilentlyContinue) {
    OK "Get-LocalUser available (Slide 6 works as written)"
} else {
    WARN "Get-LocalUser NOT available on this build" "Use the fallback 'net user' on Slide 6. See Failure Playbook row A1 - you have a scripted line for this, so it is safe."
}

if (Get-Command Get-LocalGroupMember -ErrorAction SilentlyContinue) {
    OK "Get-LocalGroupMember available (optional Slide 6 beat)"
} else {
    WARN "Get-LocalGroupMember unavailable" "Optional beat - use 'net localgroup Administrators' or skip"
}

# ------------------------------------------------------------------- 4. Rosters
Head "4. Account roster (Slide 6 content)"

try {
    $users = Get-LocalUser -ErrorAction Stop
    OK "Roster readable - $($users.Count) local accounts"

    $adminAcct = $users | Where-Object Name -eq 'Administrator'
    if ($adminAcct) {
        if (-not $adminAcct.Enabled) {
            OK "Built-in Administrator is DISABLED - your 'least privilege ships by default' line lands"
        } else {
            WARN "Built-in Administrator is ENABLED on this machine" "Your Slide 6 script says it ships disabled. Adjust what you say, or better: use it - 'on this machine it is on, and that is a finding.'"
        }
    } else {
        WARN "No account literally named 'Administrator'" "Localised Windows may rename it. Check the list and adapt your Slide 6 pointing."
    }

    $guest = $users | Where-Object Name -eq 'Guest'
    if ($guest -and -not $guest.Enabled) { OK "Guest account disabled (supports the same point)" }
} catch {
    WARN "Could not enumerate local users" "Fall back to 'net user' on Slide 6"
}

# --------------------------------------------------------------- 5. ACL demo
Head "5. ACL demo path (Slide 7 - the critical one)"

$docs = Join-Path $HOME 'Documents'
if (Test-Path $docs) {
    OK "Demo path exists: $docs"
    try {
        $acl = Get-Acl $docs -ErrorAction Stop
        $n = @($acl.Access).Count
        if ($n -gt 0) {
            OK "Get-Acl returns $n access entries - the money-shot table will have rows"
        } else {
            FAIL "Get-Acl returned zero entries" "Pick a different folder for the Slide 7 demo"
        }
    } catch {
        FAIL "Get-Acl failed on your own Documents folder" "Unexpected. Pick another folder you own and update Slide 7."
    }
} else {
    FAIL "$docs does not exist" "Edit Slide 7 to use a folder you do own (e.g. `$HOME\Desktop)"
}

# ------------------------------------------- 6. The scheduled failure (SAM)
Head "6. Scheduled failure - SAM must DENY you"

$sam = 'C:\Windows\System32\config\SAM'
if (Test-Path $sam -ErrorAction SilentlyContinue) {
    try {
        Get-Acl $sam -ErrorAction Stop | Out-Null
        WARN "You CAN read the SAM ACL - the Slide 7 denial will NOT happen" "This normally means you are elevated. Re-run as a standard user. If it still succeeds, substitute another protected path and re-test."
    } catch {
        OK "SAM access DENIED - your best demo moment will fire correctly"
    }
} else {
    WARN "SAM path not visible" "Substitute another protected path, e.g. C:\Windows\System32\config\SYSTEM, and re-test"
}

# -------------------------------------------------- 7. Inheritance demo file
Head "7. Inheritance demo (Slide 8)"

$tmp = Join-Path $docs 'day8demo.txt'
try {
    New-Item -Path $tmp -ItemType File -Force -ErrorAction Stop | Out-Null
    $inh = @((Get-Acl $tmp).Access).Count
    OK "Created test file, inherited $inh ACL entries - Slide 8 will work"
    Remove-Item $tmp -Force -ErrorAction SilentlyContinue
    if (-not (Test-Path $tmp)) { OK "Cleanup verified - demo is repeatable" }
    else { WARN "Test file not removed" "Delete $tmp manually" }
} catch {
    FAIL "Cannot create a file in your Documents folder" "Slide 8 will not work. Choose another writable folder and update the guide."
}

# ------------------------------------------ 8. WSL side-by-side (opening hook)
Head "8. WSL availability (opening hook needs BOTH windows)"

$wsl = Get-Command wsl.exe -ErrorAction SilentlyContinue
if ($wsl) {
    try {
        $who = (& wsl.exe -e whoami 2>$null | Select-Object -First 1)
        if ($who) {
            OK "WSL reachable - Linux identity is '$who'"
            OK "Side-by-side hook will work: PowerShell gives 'machine\name', WSL gives '$who'"
        } else {
            WARN "wsl.exe present but returned no user" "Start your distro once manually, then re-run this check"
        }
    } catch {
        WARN "Could not query WSL" "Open your WSL terminal manually before class"
    }
} else {
    FAIL "wsl.exe not found" "The opening side-by-side hook is the highest-value 2 minutes of Day 8. Fix WSL, or drop the hook and open Slide 2 instead."
}

# ------------------------------------------------------------------ Verdict
Head "Verdict"
if ($script:fails -eq 0 -and $script:warns -eq 0) {
    Write-Host "READY TO TEACH - all checks green." -ForegroundColor Green
    exit 0
} elseif ($script:fails -eq 0) {
    Write-Host "READY, WITH $($script:warns) WARNING(S)." -ForegroundColor DarkYellow
    Write-Host "Each warning has a scripted fallback in the Failure Playbook. You can teach." -ForegroundColor Gray
    exit 0
} else {
    Write-Host "$($script:fails) FAILURE(S), $($script:warns) warning(s). Fix the failures before class." -ForegroundColor Red
    exit 1
}
