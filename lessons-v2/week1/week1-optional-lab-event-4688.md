# Optional Lab — Investigating Process Creation with Windows Event ID 4688

*Practical Cyber Security (v2) · Week 1 · Day 2 extension*

> **Optional.** Not required and not graded. Windows + administrator rights only — skip it if
> you're on Linux/macOS or don't have admin rights on your machine. If you do it, commit your
> screenshot and sentence to your repo (`day02/`) and mention it in your README.

**Why bother.** Day 2 says the OS creates a *process* every time a program runs, and gives each
one a PID. This lab shows that the OS also **writes that fact down** — the same record a SOC
analyst reads during an incident to answer "what was launched, and by whom?"

---

## Worked example (Notepad) — for reference only, don't submit this one

1. Command Prompt / PowerShell, opened as **Administrator** (right-click → "Run as
   administrator"): `auditpol /set /subcategory:"Process Creation" /success:enable` → should
   print "The command was successfully executed." ("Access is denied" means you're not
   elevated — reopen as admin.)
2. If Notepad is already open, **close it completely first** — you need a fresh launch *after*
   auditing was turned on, or there's nothing to find.
3. Open Notepad. Task Manager → Details → `notepad.exe` → PID **8420** (decimal).
4. Open Event Viewer: press Win, type `eventvwr`, Enter — accept the UAC prompt if it appears
   (admin is needed to read the Security log).
5. Windows Logs → **Security** → right-click → **Filter Current Log...** → type `4688` in the
   Event ID box → OK.
6. Newest events are at the top by default — open the one right after you launched Notepad.
7. Under **Process Information**: "New Process Name" = `notepad.exe`, "New Process ID" =
   `0x20E4` (hex). **Read "New Process ID," not "Creator Process ID"** (Creator is the parent
   that launched Notepad, e.g. `explorer.exe` — not Notepad itself).
8. Convert `0x20E4` to decimal: Windows Calculator → menu → **Programmer** mode → type `20E4`
   with Hex selected → switch to Dec → reads **8420**, matching Task Manager.

## Your task — pick a DIFFERENT program that runs as a single process

Calculator, Paint, Notepad++, VS Code — anything except Notepad. Avoid Chrome/Edge/most
browsers: they launch several processes at once, making it hard to tell which PID is "the" one.

1. Close it first if already open, then open it fresh. Task Manager → Details tab → note its
   **PID** (decimal).
2. Find its matching Event ID 4688 entry in Event Viewer (same steps as above).
3. Confirm "New Process Name" matches, and convert "New Process ID" (hex) to decimal — it
   should equal the PID from Task Manager.
4. Screenshot the event, and write one sentence: what does this prove about how the OS keeps a
   record of every process it creates?
5. **Security question:** in two sentences, how could a defender use this log during an
   investigation — for example, to spot a program that should never have been launched?

## If no 4688 events show up at all

Run `auditpol /get /subcategory:"Process Creation"` to confirm "Success" is enabled. If it is,
but the log stays empty, you're likely on a school/managed laptop where Group Policy overrides
this setting — try your own machine instead.
