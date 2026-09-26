# Windows cheat-sheet — <your name>

*Started Day 8. Add to it every time you meet a new command. PowerShell, not `cmd` — PowerShell
pipes objects, not text (see Day 8 recap).*

| Command | What it does | Example |
|---------|--------------|---------|
| `whoami` | who am I, right now | `whoami` |
| `whoami /priv` | what privileges does my token carry | `whoami /priv` |
| `whoami /groups` | what groups am I a member of, i.e. what access I inherit | `whoami /groups` |
| `Get-LocalUser` | list accounts on this machine | `Get-LocalUser` |
| `Get-LocalGroupMember` | list members of a local group | `Get-LocalGroupMember Administrators` |
| `icacls` | read the NTFS ACL on a file or folder — who can read/modify it | `icacls C:\Windows\System32\drivers\etc\hosts` |
| `Get-ItemProperty` | read registry key values (e.g. what auto-starts at login) | `Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'` |
| `Get-Process` | list running processes | `Get-Process \| Sort-Object WS -Descending \| Select-Object -First 5 Name, Id, WS` |
| `Get-Service` | list installed services and their state | `Get-Service` |
| `Select-Object` | pick which object properties to show | `Select-Object -First 5 Name, Id, WS` |
| `Sort-Object` | sort objects by a property | `Sort-Object WS -Descending` |
| `Where-Object` | filter objects by a condition | `Get-Process \| Where-Object CPU -gt 10` |

<!-- add your own below as you learn them (Day 9: scripting cmdlets, Day 10 as needed) -->
