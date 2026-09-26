# Day 8 — Teacher Notes

**Teach from:** `day08.md` (deck + speaker notes).
**This file:** environment, cut-list, background, demo runbook, checkpoint, exit check, FAQ.
**Frame the whole day as translation, not a new world** — every Windows concept maps to a
Linux one from Day 7. The mapping table is the spine; keep it visible.

---

## Environment

Most students are on Windows — for them this is the one native-hands-on day. Everything in the
deck is **read-only** (`whoami`, `Get-*`, `icacls` with no `/grant`, `Get-ItemProperty`).

- **macOS / Linux students:** pair with a Windows neighbour, RDP into the shared Windows box
  (one account each), or follow on the projector. They should still build the artifact table.
- **Windows students:** open **PowerShell** (not `cmd`, not "PowerShell ISE"). `Windows
  Terminal` is nicest. No admin needed for anything today.

---

## The analogy — same key cabinet, more detailed labels

Day 7 key cabinet, extended:
- **token / SID** = an ID badge the OS clips to everything you run
- **ACL** = a full guest-list on each door (not just a 3-slot label)
- **UAC** = "show the badge again for the big doors"
- **registry** = the master binder of every setting in the building
- **Active Directory** = one HR department issuing badges for every building in the company

No new analogy.

---

## Must-teach vs. cut-if-short

**Never cut:**
- The Linux → Windows mapping table.
- Admin vs standard + UAC (= Day 7's "don't live as root").
- ACLs — "a list of who-can-do-what entries, more detailed than `rwx`".
- "PowerShell pipes **objects**, not text" + it's the primary attacker tool.
- Run keys = persistence.
- The artifact (Linux ↔ Windows table).

**Cut in this order if behind:**
1. SID detail → "the real identity behind the username; permissions are stored against it."
2. Scheduled Tasks → one line ("= Windows cron").
3. The AD slide → two sentences ("central login + policy for a whole company; the Domain
   Controller is the crown jewel; Week 4").
4. The `whoami /priv` part of the first "do it now".

---

## Background for topics people get shaky on

### Accounts, SIDs, SYSTEM
- **SID** format: `S-1-5-21-<domain>-<RID>`. Well-known RIDs: `500` = built-in Administrator,
  `501` = Guest, `512` = Domain Admins. `S-1-5-18` = **LocalSystem**, `S-1-5-19` = LocalService,
  `S-1-5-20` = NetworkService, `S-1-5-32-544` = built-in Administrators group.
- **SYSTEM (LocalSystem)** has full machine authority and is used by the kernel and core
  services. It's *more* than Administrator (which is "a very powerful user"; SYSTEM is "the
  machine itself"). Post-exploit path is often: user → local admin → SYSTEM → (domain).
- Permissions bind to **SIDs**, not names. Recreating a same-named account = a new SID = no
  inherited access. This trips people up in real incident cleanup.

### Tokens & privileges
- Every process carries an **access token**: the user SID, group SIDs, and a list of
  **privileges** (e.g. `SeDebugPrivilege` = open any process; `SeBackupPrivilege` /
  `SeRestorePrivilege` = read/write any file bypassing ACLs; `SeImpersonatePrivilege` = act
  as another token — the basis of "potato" privilege-escalation attacks).
- `whoami /priv` shows them; most are **Disabled** until a program enables one it holds.
- **Integrity levels** (Low/Medium/High/System) are a second axis — a Low-integrity process
  (sandboxed browser tab) can't write a Medium-integrity object even with ACL permission.
  Mention only if asked.

### UAC
- On an admin account, you get a **filtered** (standard) token by default and the **full**
  token only after consent. `whoami /groups` shows the Administrators group as "Group used
  for deny only" when you're not elevated.
- Microsoft explicitly says UAC is **not a security boundary** — it's a convenience/consent
  feature. "UAC bypasses" are common and generally not treated as vulnerabilities by MS.

### NTFS ACLs
- ACL = ordered list of ACEs. Each ACE: trustee SID + type (Allow/Deny) + access mask +
  inheritance flags. **Deny ACEs are evaluated first.**
- `icacls` letters: `F` full, `M` modify, `RX` read & execute, `R` read, `W` write, `D` delete;
  `(I)` inherited, `(OI)(CI)` object/container inherit, `(IO)` inherit-only.
- Common weakness: a directory where `BUILTIN\Users` or `Everyone` has `(M)` or `(F)` on a
  path a privileged service loads from → local privilege escalation (mirror of Day 7's
  writable-cron-script).

### The registry
- **Hives:** `HKLM` (machine), `HKCU` (current user), `HKU` (all loaded user hives), `HKCR`
  (file associations, a merged view), `HKCC` (current hardware profile).
- On disk: `C:\Windows\System32\config\*` (SYSTEM, SOFTWARE, SAM, SECURITY) and per-user
  `NTUSER.DAT`. The **SAM** hive holds local password hashes (SYSTEM-only) — the Windows
  equivalent of `/etc/shadow`.
- **Autostart / persistence keys** (ASEPs): `...\CurrentVersion\Run` and `RunOnce` (HKLM &
  HKCU), `Winlogon\Shell` / `Userinit`, `Image File Execution Options` (debugger hijack),
  services under `HKLM\SYSTEM\CurrentControlSet\Services`. Sysinternals **Autoruns** shows
  all ~50 locations at once.

### PowerShell
- Object pipeline: cmdlets emit .NET objects; `Where-Object`, `Sort-Object`, `Select-Object`,
  `ForEach-Object` operate on properties. `Get-Member` shows an object's properties/methods.
- Offensive relevance: in-memory execution (`IEX (New-Object Net.WebClient).DownloadString(...)`),
  no file on disk, everything scriptable, and pre-v5 almost no logging.
- Defensive: **Script Block Logging** (event 4104), **Module Logging**, **Transcription**,
  **Constrained Language Mode**, **AMSI** (antimalware scan interface hooks script content),
  execution policy (a speed bump, not a control).

### Active Directory (one slide's worth + Q&A)
- A **domain** = a boundary of administration; a **Domain Controller** hosts AD and
  authenticates logons (Kerberos / NTLM). **Group Policy** pushes settings to all members.
- **Domain Admins** effectively own every machine in the domain.
- Attacks (Week 4): Kerberoasting, AS-REP roasting, pass-the-hash, DCSync, Golden Ticket,
  abusing ACL misconfigurations in AD itself. Don't teach today — just "one foothold →
  whole company, and that's why it's a Week-4 topic."

---

## Demo runbook

### Hook
`whoami /all` — a wall of text. Point at the three headers: **USER INFORMATION** (name + SID),
**GROUP INFORMATION**, **PRIVILEGES INFORMATION**. "Linux was uid + groups. This is the same,
much more detailed, and it's on a token attached to every process you run."

### The four "do it now" beats — expected output
| Beat | Commands | Expected |
|---|---|---|
| who am i | `whoami`, `whoami /priv`, `whoami /groups`, `Get-LocalUser` | privileges mostly "Disabled"; groups list; local accounts incl. disabled `Administrator`/`Guest` |
| ACL | `icacls C:\Windows\System32\drivers\etc\hosts` ; `icacls $HOME` | hosts: `BUILTIN\Users:(I)(RX)`, `BUILTIN\Administrators:(I)(F)`, `NT AUTHORITY\SYSTEM:(I)(F)` |
| Run key | `Get-ItemProperty 'HKCU:\...\Run'` and the HKLM one | a few entries (GPU tool, updater, chat app) or empty |
| PowerShell | `Get-Process \| Sort-Object WS -Descending \| Select -First 5 Name,Id,WS` | top-5 by memory, as a table |

### Failure modes
| Symptom | Fix |
|---|---|
| student opened `cmd`, not PowerShell | `Get-*` cmdlets fail — have them run `powershell` or open Windows Terminal → PowerShell tab |
| `Get-LocalUser` "not recognized" | very old Windows / PowerShell 4 — use `net user`; note it |
| `icacls $HOME` errors | use `icacls .` or `icacls $env:USERPROFILE` |
| execution policy blocks a saved `.ps1` | today is all one-liners; if needed: `powershell -ExecutionPolicy Bypass -File x.ps1` |
| corporate laptop: everything is locked / domain-managed | actually a great live example — `whoami /groups` will show domain groups, `gpresult /r` shows pushed policy. Use it. |
| non-Windows student | shared Windows box via RDP, or pair, or projector |

---

## Checkpoint (by end of class)

Each student can:
- [ ] give the Windows equivalent of `sudo`, `/etc/*`, `cron`, and `rwx`
- [ ] say why SYSTEM is more powerful than Administrator
- [ ] read an `icacls` line and say who can modify the file
- [ ] explain why PowerShell is not "cmd with colours" (objects) and why attackers love it
- [ ] name one Windows persistence location

---

## Exit check (last 2 min)

1. Windows word for `sudo`? For `/etc/*`? — *UAC / "Run as administrator"; the registry.*
2. You have local Administrator. Is that the top of the machine? — *No — SYSTEM is higher;
   admin is usually a stepping stone to SYSTEM.*
3. `Get-Service | Where-Object Status -eq 'Running'` — why doesn't this need any text parsing?
   — *`Get-Service` emits service objects; `Where-Object` filters on the `Status` property
   directly.*

---

## FAQ

- **"Is the registry dangerous to open?"** Reading is completely safe. *Editing* the wrong key
  can break Windows — so today we only read (`Get-ItemProperty`, `reg query`).
- **"Why does Windows have both `cmd` and PowerShell?"** `cmd` is the old text shell (kept for
  compatibility); PowerShell is the modern object shell and the one to learn.
- **"Do I need a Windows Server / domain to learn AD?"** Not for this course — we only need the
  concept now. Week 4 uses a small lab domain.
- **"macOS — where does it fit?"** Unix underneath (like Linux, Day 6–7) with its own GUI
  permission layer (TCC) on top. Not covered separately; the Linux model transfers.
- **"What's `NT AUTHORITY\SYSTEM` I keep seeing?"** The machine-identity account — the most
  powerful local principal. Services and the OS run as it.
