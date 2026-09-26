---
marp: true
theme: dark-monospace
paginate: true
title: "Day 8 — Windows: Same Questions, Different Machine"
footer: "Practical Cyber Security (v2) · Week 2 · Day 8"
---

<!-- _class: lead -->

# Windows
## Day 8 — Same question — *who can do what* — different machinery

**Week 2 · Understanding the operating system**

<!--
RUN SHEET (~85 min). Hands-on INTERLEAVED. Most students are ON Windows — native for them.
00:00 Journey check + hook (whoami /all)                       4
00:04 Same question, different answers (the mapping)           4
00:08 Accounts, groups, SIDs                                   7
00:15 DO: who am I                                             5
00:20 Admin vs standard + UAC                                  7
00:27 NTFS permissions / ACLs                                  7
00:34 DO: read an ACL with icacls                              5
00:39 The registry                                            7
00:46 DO: peek at a Run key                                    4
00:50 Services & Scheduled Tasks                               5
00:55 PowerShell — the real interface (not cmd+colours)        7
01:02 DO: a 3-line PowerShell pipeline                         5
01:07 Active Directory — one slide                             4
01:11 Attack <-> defence                                       6
01:17 Wrap + artifact + homework                               4
CUT FIRST IF SHORT: the SID detail; Scheduled Tasks (name it, "= Windows cron"); the AD slide
to two sentences.
NEVER CUT: the Linux->Windows mapping, admin/UAC, ACLs, "PowerShell pipes objects", the
Run-key persistence idea, the artifact.
ANALOGY (kitchen / key cabinet from Day 7): same key cabinet, labels written in a more detailed
system — ID badges (tokens/SIDs), a full guest-list per door (ACL), UAC = "show the badge again
for the big doors", the registry = the master binder of every setting, AD = one HR department
issuing badges for every building in the company.
NON-WINDOWS STUDENTS: pair with a Windows neighbour, use the shared Windows box (RDP), or
follow on the projector. Every command here is read-only.
-->

---

## Where we are

- **Yesterday:** Linux — `rwx` for owner/group/other, `root`, `sudo`.
- **Today:** Windows asks the **exact same question** — *who can do what* — with more
  machinery: accounts, tokens, ACLs, the registry, and Active Directory.
- **Tomorrow:** scripting — making the machine do the repetitive work.

<!--
Learning Journey Check. Frame today as TRANSLATION, not a whole new world. Every Windows idea
maps to something they learned yesterday.
-->

---

## Hook — your identity, in detail

```
PS C:\> whoami /all
```

Your username, your **SID**, every **group** you're in, and every **privilege** your session
holds. Windows tracks all of this on a token it attaches to everything you run.

<!--
Run it. It's a wall of output — point at the three sections: User, Groups, Privileges.
"Linux had uid + groups. Windows has all this, on a token, checked on every action."
-->

---

## Same question, different answers

| Linux (yesterday) | Windows (today) |
|---|---|
| user + uid | account + **SID** |
| group | group |
| `rwx` for u/g/o | an **ACL** — a list of "who can do what" entries |
| `root` (uid 0) | **Administrators**, and **SYSTEM** (even higher) |
| `sudo` | **UAC** consent / **Run as administrator** |
| `/etc/*` config files | the **registry** |
| `cron` | **Scheduled Tasks** |
| `systemd` services | **Services** |
| `ps`, `kill` | `Get-Process`, `Stop-Process` |

<!--
This slide is the map for the whole lesson. Keep it up / refer back. The right column is just
"the Windows word for a thing you already understand."
-->

---

## Accounts, groups, SIDs

- **Local accounts** live on this one machine. **Administrators** = the powerful group.
- **SYSTEM** — a built-in account **more powerful than Administrator**; the OS itself and many
  services run as SYSTEM. Attackers want SYSTEM.
- A **SID** (`S-1-5-21-...`) is the *real* identity. Usernames are just friendly labels on top
  — rename the account, the SID stays.

```
Get-LocalUser
Get-LocalGroupMember Administrators
```

<!--
The SYSTEM > Administrator point surprises people and matters: "get admin" is often a
stepping stone to "get SYSTEM". SIDs matter because permissions are stored against SIDs, not
names — deleting and recreating "Alice" gives a new SID and none of the old access.
CUT SID detail first if short.
-->

---

## Do it now — who am I

```
whoami
whoami /priv          the privileges your token holds
whoami /groups        every group -> every bit of access you inherit
Get-LocalUser         accounts on this machine
```

<!--
5 min. `whoami /priv` — most are "Disabled" until a program needs them. SeDebugPrivilege,
SeBackupPrivilege etc. are the dangerous ones (can read any process / any file) — note, don't dwell.
-->

---

## Admin vs standard, and UAC

- A **standard user** cannot change system-wide settings or other users' files.
- An **administrator** can — but **UAC** (User Account Control) makes you **confirm** first
  (the darkened "Do you want to allow…?" prompt).
- Even an admin runs with a *split token*: standard rights by default, admin rights only after
  the UAC prompt.

**Least privilege (again):** use a standard account day to day; elevate only when you must.

<!--
Same lesson as Day 7's "don't live as root". UAC is not a security boundary Microsoft
guarantees, but it stops silent privilege use and casual mistakes.
Malware's goal: run something with admin WITHOUT triggering UAC ("UAC bypass") — name it.
-->

---

## NTFS permissions — the ACL

Every file and folder carries an **ACL**: an ordered list of **ACE**s (Access Control Entries).

Each ACE = **a SID + allow/deny + what** (Read, Write, Modify, Full Control, ...).

- Far more granular than Linux's 9 bits — per-user, per-group, allow *or* deny.
- **Inheritance:** child files/folders get the parent's ACL unless broken.

```
icacls C:\Windows\System32\drivers\etc\hosts
icacls .
```

<!--
`icacls` output codes: (F) full, (M) modify, (RX) read+execute, (R) read, (W) write; (I) =
inherited. `BUILTIN\Users:(RX)` etc.
The `hosts` file is a nice example — Users can read, only Administrators can write (it's a
tampering target — Day 4 DNS).
-->

---

## Do it now — read an ACL

```
icacls C:\Windows\System32\drivers\etc\hosts
icacls $HOME
```

Who can **read** it? Who can **modify** it? What is **inherited** (`(I)`) vs set directly?

<!--
5 min. On the hosts file: everyone reads, only admins/SYSTEM modify. On their home folder:
themselves + SYSTEM + Administrators, full control, inherited.
Contrast out loud with yesterday's `ls -l` — same information, more detail.
-->

---

## The registry

A single hierarchical **settings database** for the whole system.

- **HKLM** (`HKEY_LOCAL_MACHINE`) — machine-wide settings.
- **HKCU** (`HKEY_CURRENT_USER`) — your settings.
- Windows stores config here; **so does malware.**
- **Run keys** — `...\CurrentVersion\Run` — list programs to launch at login. A classic
  **persistence** trick: add yourself here, you start every time the user logs in.

<!--
Analogy: the master binder of every setting in the building. `regedit` is the GUI;
`Get-ItemProperty` / `reg query` on the CLI.
"Persistence" = how an attacker survives a reboot. Run keys, Services, Scheduled Tasks are the
top 3 — all things we're covering today. That's not a coincidence.
-->

---

## Do it now — peek at a Run key

```
Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'
Get-ItemProperty 'HKLM:\Software\Microsoft\Windows\CurrentVersion\Run'
```

Whatever's listed here runs automatically at login. On a clean machine: maybe your GPU tool,
a messaging app. On a compromised one: something you don't recognise.

<!--
4 min. Read-only. If a student sees something odd, that's a teachable moment, not necessarily
malware (lots of legit software uses Run keys). "Investigate, don't panic" — Day 19.
-->

---

## Services & Scheduled Tasks

- **Services** — background programs the system manages (`Get-Service`). Each runs **as an
  account**: LocalSystem, NetworkService, or a specific user.
- **Scheduled Tasks** — "Windows `cron`": run X at a time / at login / on an event.

Both are: **persistence** spots **and** **privilege** spots — exactly like Linux services and
`cron` yesterday. A service running as SYSTEM with a weak file ACL = local privilege escalation.

<!--
Deliberate callback to Day 7. The pattern is identical across OSes: "a powerful background
thing that trusts a file/path you can write = you inherit its power."
CUT to one line if short: "Scheduled Tasks = Windows cron; Services = Windows daemons; both
run as an account and both are persistence spots."
-->

---

## PowerShell — the real interface

**Not** "cmd with colours." PowerShell pipes **objects**, not text:

```
Get-Process | Where-Object CPU -gt 10 | Sort-Object CPU -Descending
```

`Get-Process` hands the next command real process *objects* — with properties you can filter
and sort directly. No text-parsing.

It's also the **#1 attacker tool on Windows**: built in, powerful, scriptable, and for years
poorly logged.

<!--
The Day 8 TRAP: "PowerShell is just a prettier cmd." No — it's an object pipeline and the
primary offensive tooling surface. `Get-Help <cmd>` / `<cmd> -?` for docs.
Modern defence: Script Block Logging, Constrained Language Mode, AMSI — name them for the
attack slide.
-->

---

## Do it now — an object pipeline

```
Get-Process |
  Sort-Object WS -Descending |
  Select-Object -First 5 Name, Id, WS
```

The top 5 processes by memory. Notice you never parsed a line of text — you sorted and
selected on **properties**.

<!--
5 min. WS = working set (RAM). Contrast with Day 6 `ps aux | sort | head` which was text
columns. Same result, different mechanism.
Let students tweak it — sort by CPU, select different columns.
-->

---

## Active Directory — one slide

Companies don't manage 5,000 laptops one by one.

**Active Directory** = a central **directory** holding every account, group, and **policy**
for the whole organisation. Machines join a **domain**; when you log in at work, a **Domain
Controller** checks you and pushes down settings (**Group Policy**).

Attacking AD — how one foothold becomes control of the whole company — is **Week 4**.

<!--
Keep it to this. The one idea: "identity and policy, centralised." A DC is the crown jewel.
CUT to two sentences if short: "AD = one central login + policy system for a whole company.
Compromising it = compromising everything. More in Week 4."
-->

---

## Attack ↔ Defence

| Attack | Defence |
|---|---|
| **Run key / Scheduled Task / Service** persistence | least privilege; monitor autoruns (Sysinternals Autoruns); EDR |
| **LOLBins** — abuse built-in tools (`certutil`, `mshta`, `powershell`) to avoid dropping malware | application allowlisting (**AppLocker / WDAC**); command-line logging |
| **Credential theft** from **LSASS** memory (e.g. mimikatz) | don't run as admin; Credential Guard; disable cached creds; EDR |
| **Reused local admin password** across machines | **LAPS** — a unique, rotated local admin password per machine |
| **Unlogged PowerShell** | Script Block Logging, Constrained Language Mode, AMSI |

<!--
LOLBins = "Living Off the Land Binaries" — using what's already installed so there's nothing
for antivirus to catch. lolbas-project.github.io is the reference (name only).
LSASS holds credentials in memory for single sign-on; dumping it is the classic post-exploit
move on Windows. Ties to Day 17.
-->

---

## Today's attack / defence / artifact

- **Attack:** land on Windows, then use the built-ins — a Run key to persist, PowerShell and
  LOLBins to operate quietly, LSASS to steal credentials, and reused admin passwords to spread.
- **Defence:** no daily admin, application allowlisting, EDR, LAPS, PowerShell logging.
- **Artifact:** a **Linux ↔ Windows command table** — 5 tasks, both sides (whoami, list users,
  view permissions, list services, list scheduled jobs).

---

## Homework

1. Build the **Linux ↔ Windows table** — at least 5 rows, real commands both sides. Commit it.
2. Run `whoami /priv` and `whoami /groups`. In two sentences: are you an administrator, and
   how can you tell?
3. Run `Get-ItemProperty` on both Run keys. List what auto-starts on your machine; flag
   anything you can't identify (don't delete anything).
4. Add `whoami`, `Get-LocalUser`, `Get-Process`, `Get-Service`, `icacls`, `Get-ItemProperty`
   to your cheat-sheet.

<!--
Due start of Day 9. Non-Windows students: use the shared Windows box or pair up; note which.
-->

---

<!-- _class: lead -->

## Recap

1. **Same question as Linux** — *who can do what* — answered with SIDs, tokens, and ACLs.
2. **SYSTEM > Administrator.** Don't run as admin; UAC is a speed bump, not a wall.
3. **PowerShell pipes objects** — and it's the primary attacker tool. Run keys, Services, and
   Scheduled Tasks are where persistence lives.

<!--
Say the three lines. Tomorrow: you stop doing this by hand — Bash and Python to automate the
repetitive parts. You'll build a small scanner.
-->
