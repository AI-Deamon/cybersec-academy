# Day 8 — Explain + Demo Walkthrough
**Windows Fundamentals — PowerShell, ACLs, Users & Active Directory**

Built to `prep/DEMO-GUIDE-STANDARD.md`. **Say** = what you explain on screen. **Do** = commands you run live. Every `Do` block carries an **Expect** line and a **failure class** (A=environment, B=permission, C=state, D=typo).

---

## Header

| | |
|---|---|
| **Runs on** | **Windows host — PowerShell.** *Not* WSL. This is the one day you deliberately leave WSL behind. |
| **Second window** | Keep a **WSL terminal open beside PowerShell** all session. This is today's best visual. |
| **Privilege** | Standard user is enough for everything except the optional `New-LocalUser` beat. Do **not** run PowerShell as Admin by default — you're teaching least privilege; model it. |
| **Setup** | PowerShell font size 20+. Clear history. Close unrelated windows (your ACLs are on screen — no personal folders visible). |
| **Metaphor thread** | Restaurant → Computer. Manager = OS · Walkie-talkie = Shell (**PowerShell** today) · Key cabinet = Permissions (**ACL** today). **No new metaphors.** |
| **Timing** | 20 min total demo (per instructor-guide §3 segment G) |

---

## Pre-flight (do this the day before)

**1. Run the verify script:**
```powershell
powershell -ExecutionPolicy Bypass -File .\prep\verify\day08-check.ps1
```
Every line must read `[OK]`. If any `[FAIL]`, fix it before class — the script tells you how.

**2. Rehearsal checklist — tick every row:**

| # | Command | Expected output | ✓ |
|---|---|---|---|
| 1 | `whoami` | `machinename\yourname` — lowercase, **backslash** in the middle | ☐ |
| 2 | `Get-LocalUser` | Table with Name / Enabled / Description. Includes `Administrator` (likely Enabled=False) and `Guest` | ☐ |
| 3 | `Get-ChildItem $HOME\Documents` | Directory listing, no error | ☐ |
| 4 | `Get-Acl $HOME\Documents \| Format-List` | Path, Owner, Group, **Access** block with several `principal Allow rights` lines | ☐ |
| 5 | `(Get-Acl $HOME\Documents).Access \| Select IdentityReference,FileSystemRights,AccessControlType` | Clean 3-column table — **this is the money shot, it must be readable** | ☐ |
| 6 | `Get-Acl C:\Windows\System32\config\SAM` | **Access denied** — this failure is intentional and is the lesson | ☐ |
| 7 | `Get-Service \| Select -First 5` | 5 services with Status/Name/DisplayName | ☐ |
| 8 | In WSL window: `whoami` | Your Linux username, **no backslash** — different answer, same question | ☐ |
| 9 | Say the three Connection Script lines aloud | Didn't need to read them | ☐ |

**3. Deliberately break one thing:** run row 6 and read your Failure Playbook line for it out loud. That failure is scheduled — you should sound calm and pleased, because it proves the day's point.

---

## Before Slide 1 — Opening Hook (2 min, deck not advanced)

**Say:** "Seven days of lap. Day 1: it's all bits, and touching data you don't own is an ethics problem before it's a technical one. Day 2: bits become processes, and every process runs *as someone*. Days 3 and 4: processes talk over a network. Day 5: you wrote that whole story yourself. Day 6: I opened the machine and showed you a Manager, a walkie-talkie, and a key cabinet. Day 7: we opened that cabinet in Linux — `rwx`, `chmod`, and I created a user in front of you and watched the OS block him.

Today: **same cabinet, different label.** Most of the world's desktops and almost every company's identity system run Windows. So the question doesn't change — *who may do what* — but the dialect does."

**Do — the visual that sets up the whole day.** Put PowerShell and your WSL terminal side by side. In each, type:
```
whoami
```
*(Expect: PowerShell gives `machine\name` with a backslash. WSL gives a bare lowercase name. Failure class: A if either window isn't open — that's a setup miss, not a demo miss.)*

**Say:** "One laptop. Two operating systems running at the same time. Same command, same question — *who am I* — two different answers, in two different dialects. That's the whole of today in one screen. Everything you learned yesterday still applies; only the words change."

---

## Slide 1 — Title
**Say:** "Module 2, Day 8. The Windows lens."

## Slide 2 — Same OS idea, different dialect
**Say:** "Windows does exactly the same job as Linux: manages users, permissions, processes, files. The *concepts* are identical. Three things get renamed. One tree `/` becomes drive letters like `C:\`. The `rwx` triple becomes an **ACL** — an Access Control List. Bash becomes **PowerShell**. That's it. If you understood yesterday, you already understand today; you're learning vocabulary, not theory."

**Say (say this explicitly — it's the anti-panic line):** "Don't try to memorise two systems. Memorise the *question* — who may do what — and then read whichever label the machine puts in front of you."

## Slide 3 — The Windows tree
**Say:** "Linux had one root, `/`. Windows has drives — `C:\`, `D:\`. Your stuff lives under `C:\Users\<you>`. Same idea as `/home/you`; different address format."

**Do:**
```powershell
Get-Location
Get-ChildItem $HOME
```
**Expect:** current path like `C:\Users\yourname`, then Desktop/Documents/Downloads etc.
**Failure class:** D only (typo). This cannot fail otherwise.

**Say:** "There's my address in the Windows tree, and there's my folder. Compare to yesterday's `pwd` and `ls`."

## Slide 4 — PowerShell: the walkie-talkie, Windows edition
**Say:** "Yesterday's five Bash commands have Windows twins. `whoami` is literally the same word. `pwd` becomes `Get-Location`. `ls` becomes `Get-ChildItem`. `cat` becomes `Get-Content`. Notice the pattern — **Verb-Noun**. PowerShell commands are almost readable English, which is why they're long. Get. Child. Item. It's telling you what it does."

**Do:**
```powershell
Get-Command -Verb Get -Noun LocalUser
```
**Expect:** one row showing `Get-LocalUser`, a Cmdlet, from module `Microsoft.PowerShell.LocalAccounts`.
**Failure class:** A — see Playbook row A2 if this returns nothing.

**Say:** "And PowerShell will tell you about itself. That's a real skill — you don't memorise commands, you learn how to ask the machine what commands exist."

## Slide 5 — The OS signature diagram (Windows lens)
**Say:** "Same diagram as Day 6 and Day 7 — User, Shell, OS, Disk. I'm changing only the labels: User is now a Windows or Active Directory identity. Shell is PowerShell. The permission check is an ACL. The disk is the `C:\` tree. Nothing new. Third time you've seen this picture, and that's deliberate."

## Slide 6 — The staff roster, Windows edition
**Say:** "Yesterday the roster was `/etc/passwd`. Windows keeps it in a database, and you read it with a command."

**Do:**
```powershell
Get-LocalUser
```
**Expect:** table with Name, Enabled, Description. `Administrator` present and usually `Enabled: False`. `Guest` present and disabled. Your own account `Enabled: True`.
**Failure class:** A — if `Get-LocalUser` is not recognised, see Playbook A1.

**Say — point at `Administrator` on screen:** "Look at this. The most powerful account on this machine — the master key, Windows's `root` — ships **disabled by default**. Microsoft turned it off on purpose. That's least privilege built into the product. And look at `Guest` — also off. Every account that's switched off is an attack surface that doesn't exist."

**Do — optional, only if you have Admin and time:**
```powershell
Get-LocalGroupMember -Group "Administrators"
```
**Expect:** the accounts holding the master key on this machine.
**Failure class:** B — may need elevation; if it fails, that *is* the lesson: "reading who holds the master key is itself a privileged action."

## Slide 7 — Decoding the key cabinet: the ACL — **main demo, 8 min**

**Say (before typing):** "Yesterday, `ls -l` gave us ten characters — `drwxr-xr--` — and we read it left to right: owner, group, other. Windows does not do that. Windows gives you a **list**. One line per person or group, saying exactly what they may do. More verbose, more precise, same idea. Watch."

**Do — step 1, the raw view:**
```powershell
Get-Acl $HOME\Documents | Format-List
```
**Expect:** Path, Owner (your account), Group, and an `Access` block — several lines each like `BUILTIN\Administrators Allow FullControl`.
**Failure class:** D (bad path). Use `$HOME` — never type a literal path, it's the most common live typo.

**Say:** "That's the whole cabinet dumped out. It's noisy. Let me clean it up — and this next command is one you'll actually use as a defender."

**Do — step 2, the readable view (THE money shot):**
```powershell
(Get-Acl $HOME\Documents).Access |
  Select-Object IdentityReference, FileSystemRights, AccessControlType
```
**Expect:** clean 3-column table. Rows for `NT AUTHORITY\SYSTEM`, `BUILTIN\Administrators`, and your own user — mostly `FullControl` / `Allow`.
**Failure class:** D. If output is a jumbled list instead of a table, the console is too narrow — widen the window, don't panic.

**Say — read one row aloud, pointing:** "Read this as a sentence. *This identity — is allowed — these rights.* That's it. `IdentityReference` is the who. `FileSystemRights` is the what. `AccessControlType` is Allow or Deny.

Now put it next to yesterday. Linux said `rwxr-xr--`: three roles, three rights, fixed. Windows says: here's a list, as long as it needs to be, any identity, any combination of rights. Linux is compact. Windows is precise. **Same lock, different label** — and if you can read one, you can read the other."

**Do — step 3, the scheduled failure (this is the best moment of the day):**
```powershell
Get-Acl C:\Windows\System32\config\SAM
```
**Expect: ACCESS DENIED.** This is supposed to fail.
**Failure class:** B — permission. Which is the point.

**Say — and be pleased about it:** "Denied. And that is the correct answer.

That file is the SAM database — where Windows stores the local account information. I'm a standard user, so the OS refused me before I got anywhere near it. Nobody had to write special code for that; the ACL on that file simply doesn't list me.

This is exactly what happened yesterday when `bug` tried to read `/etc/shadow` and got blocked. **Two operating systems. Two dialects. Same refusal, protecting the same kind of secret.** If you remember one thing from today, remember that these two moments were the same moment."

## Slide 8 — Rights in reality
**Say:** "Linux `rwx` had three letters. Windows has a longer menu — Read, Write, ReadAndExecute, Modify, FullControl. `FullControl` is the dangerous one: it includes the ability to *change the permissions themselves*. That's the bit people miss. If I can change the ACL, I can give myself anything, so FullControl isn't 'a lot of access' — it's 'all access, permanently, and I can extend it.'"

**Do — see it on a real file:**
```powershell
New-Item -Path $HOME\Documents\day8demo.txt -ItemType File -Force | Out-Null
(Get-Acl $HOME\Documents\day8demo.txt).Access |
  Select-Object IdentityReference, FileSystemRights
```
**Expect:** the new file's ACL, **inherited** from the Documents folder.
**Failure class:** C — if the file exists from a previous rehearsal, `-Force` handles it silently.

**Say:** "I never set permissions on that file. It was born with them — **inherited** from the folder above it. That's a Windows behaviour with no clean Linux equivalent, and it matters: change a folder's ACL and you may have just changed a thousand files underneath it without realising. That's how real-world Windows misconfigurations spread."

## Slide 9 — Users, groups, and Active Directory
**Say:** "Everything so far was *this machine*. `Get-LocalUser` — local. Now scale it up.

A company has 5,000 laptops. Nobody creates 5,000 accounts on 5,000 machines. Instead there's one central roster — **Active Directory** — and your one identity logs you into any machine in the company. One badge, every door.

Which means: **AD is the crown jewel.** If an attacker owns AD, they don't own a laptop, they own the company's entire concept of identity. Every door at once."

**Do — show the local/domain tell:**
```powershell
whoami
$env:USERDOMAIN
$env:COMPUTERNAME
```
**Expect:** on a home machine, `USERDOMAIN` and `COMPUTERNAME` will be **the same** — that's the tell that you're local, not domain-joined.
**Failure class:** none — both outcomes teach.

**Say:** "On my machine the domain and the computer name are identical. That's how you know this box is standalone — it's its own little world. In a company they'd differ: computer `LAPTOP-4471`, domain `CONTOSO`. That one-line difference is 'am I in a building, or am I a building.'"

## Slide 10 — UAC and least privilege
**Say:** "Yesterday: don't live as root; borrow it with `sudo`, and it gets logged. Windows says the same thing with a pop-up. **UAC** — that dialog that dims your screen and asks 'do you want to allow this app to make changes' — is Windows's `sudo`. You work as a standard user; you elevate only for the task that needs it.

And the reason isn't tidiness. Ransomware inherits the rights of whoever ran it. If you're browsing the web as Administrator, then anything that gets in is Administrator. Same laptop, same click, wildly different blast radius."

**Do — prove you're not Admin right now:**
```powershell
([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
```
**Expect:** `False` — and you want False.
**Failure class:** A — if this returns `True`, you opened PowerShell as Admin. Close it and reopen normally; you're teaching least privilege, so model it.

**Say:** "False. I've been running this entire demo as an ordinary user. Everything you've seen — reading rosters, reading ACLs — needed no special power. And the one thing that *did*, the SAM file, correctly told me no."

## Slide 11 — Keys left in the door (the bridge)
**Say:** "Yesterday I set a file to `777` and said every account on the machine now holds a key. Windows has an exact equivalent, and you will see it in the wild: a shared folder whose ACL contains **`Everyone — FullControl`**.

Same mistake. Different dialect. `chmod 777` on Linux, `Everyone: Full Control` on Windows — attackers scan for both, because both mean 'walk in.'"

**Do — search for the misconfiguration (read-only, defender's move):**
```powershell
Get-ChildItem $HOME\Documents -Directory -ErrorAction SilentlyContinue |
  ForEach-Object {
    $acl = Get-Acl $_.FullName
    $bad = $acl.Access | Where-Object {
      $_.IdentityReference -match 'Everyone' -and $_.FileSystemRights -match 'FullControl'
    }
    if ($bad) { "RISK: $($_.FullName)" }
  }
"Scan complete."
```
**Expect:** most likely **no RISK lines**, then `Scan complete.` — a clean result.
**Failure class:** A if `Scan complete.` never prints (paste got truncated) — retype rather than debug live.

**Say:** "Nothing found — good. But look at what I just did, because this is the actual job. I didn't attack anything. I walked a set of folders, read each ACL, and asked one question: *does 'Everyone' hold Full Control?* That is a real defensive control, in about eight lines. On Day 9 you'll write the same kind of loop in Python, and by Day 14 a scanner does it across a whole network. It's the same idea scaled up. You already understand the idea."

## Slide 12 — The forensic habit
**Say:** "Same question as yesterday, and it will be the same question on Day 20: **as WHICH identity, with WHICH rights?** Ask it before you run something, not after something breaks. Linux answers with `whoami` and `ls -l`. Windows answers with `whoami` and `Get-Acl`. Two dialects, one habit."

**Do — cleanup, on camera:**
```powershell
Remove-Item $HOME\Documents\day8demo.txt -Force -ErrorAction SilentlyContinue
Test-Path $HOME\Documents\day8demo.txt
```
**Expect:** `False`.

**Say:** "Gone. Same instinct as yesterday's `userdel` — you don't leave demo objects lying around, because on a real system that's exactly the forgotten file with the wrong permissions that somebody finds later."

## Slide 13 — Hand off to the lab
**Say:** "Three tasks, and you've watched me do a bigger version of each. `whoami` to find your identity and notice the local-versus-domain tag. `Get-LocalUser` to read the roster. `Get-Acl` on a folder you own, and find one principal-to-rights line — then write me one sentence: *ACL is the Windows twin of `rwx`.*

Read-only, on your own machine. Never `icacls /grant`, never `net user /add`. Go."

---

## Failure Playbook — read the SAY column aloud when it happens

| Symptom | Class | Why | **What you SAY** | Fix |
|---|---|---|---|---|
| **A1** `Get-LocalUser` — "not recognized" | A | Windows Home older builds, or PowerShell 5 module missing | "Interesting — this machine doesn't ship that command. That's a real thing: not every Windows is the same Windows, and part of the job is knowing your target's version. Here's the older way." | `net user` (works everywhere) |
| **A2** `Get-Command` returns nothing | A | LocalAccounts module unavailable | "Module's not here. Same fallback." | `net user`, `net localgroup` |
| **B1** `Get-Acl` on SAM/System32 → **Access denied** | B | **Intentional.** ACL doesn't list you | "Denied — and that's the correct answer. Exactly what happened to `bug` at `/etc/shadow` yesterday. Same refusal, different OS." | None. This is the lesson. |
| **B2** `Get-LocalGroupMember` → access denied | B | Reading privileged-group membership needs elevation | "Even *asking* who holds the master key is a privileged question. That's good design." | Skip, or elevate deliberately and narrate the UAC prompt |
| **A3** ACL output is an unreadable wall | A | Console too narrow | "Let me widen this — readability is part of the job." | Maximise window; add `\| Format-Table -AutoSize` |
| **C1** `day8demo.txt` already exists | C | Previous rehearsal not cleaned | "Left over from my rehearsal — which is exactly why I clean up on camera at the end." | `-Force` handles it |
| **A4** IsInRole returns `True` | A | You launched PowerShell as Admin | "I've made the mistake I'm warning you about — I opened this as Administrator. Let me fix it, because I shouldn't be here." | Close, reopen as normal user. **Genuinely good teaching moment.** |
| **A5** WSL window shows a Windows path / wrong prompt | A | You typed in the wrong window | "Wrong window — and honestly, that's the Day 8 hazard in one move. Two OSes on one screen." | Click the right window; say which one you're in each time |
| **A6** `Get-Acl` on a `/mnt/c` path in WSL | A | WSL fakes permissions on Windows drives | "Never judge Windows permissions from inside WSL — it shows you a translation, not the truth. Use PowerShell for Windows, WSL for Linux." | Use PowerShell |
| **D1** Long pasted block silently truncated | D | Terminal paste limit | "Paste got cut — let me retype it." | Retype; don't debug live |

---

## The Connection Script — say all three out loud

- **Backward:** "Yesterday `bug` was refused at `/etc/shadow`. Today I was refused at the SAM file. Same refusal, same reason, two dialects."
- **Forward:** "On Day 16, privilege escalation is entirely about finding the ACL somebody set wrong. On Day 19, reading the Windows Event Log for evidence needs exactly these rights."
- **Career:** "Reading ACLs and hunting for `Everyone: FullControl` is what a **Windows/AD security analyst** does on a Tuesday. If AD interests you, that's a **Blue Team / Identity** track — and it's one of the most in-demand niches in the field."

---

## Timing budget

| Segment | Min | Cut order |
|---|---|---|
| Opening side-by-side hook | 2 | **Never cut** — highest value per second today |
| Slides 3–6 (tree, PowerShell, roster) | 5 | Cut `Get-Command` beat first |
| **Slide 7 — ACL + SAM denial** | **8** | **Never cut.** This is the day. |
| Slide 8 inheritance | 2 | Cut second |
| Slide 9 AD / domain tell | 2 | Keep — sets up Day 18 |
| Slide 10 UAC / IsInRole | 2 | Cut third |
| Slide 11 Everyone-FullControl scan | 3 | Keep if at all possible — it's the practical/career beat students asked for |
| Cleanup | 1 | **Never cut** |

**If you have 10 minutes instead of 20:** opening hook → `Get-LocalUser` → ACL readable view → SAM denial → cleanup. That's still a complete lesson.
