# Day 8 — Student Guide
**Course:** Practical Cyber Security: From First Principles · Module 2 · Day 8 of 20

---

## Why this matters
Most desktops and enterprises run Windows — and that's where ransomware and credential theft actually land. PowerShell, ACLs, and Active Directory are how you reason about Windows privilege and defense. It's the *same* "who may do what" question as Linux, just spoken in a different dialect.

## How today connects (keep this in mind)
- **Yesterday (Day 7) → Today:** Day 7 opened the key cabinet as Linux `rwx`. Today we open the *same* cabinet as a Windows **ACL** — different label, same lock.
- **Forward:** Day 9 (Python uses these ACLs) · Day 10 (workshop: admin a user/perm change) · Day 16 (Windows privilege escalation) · Day 18 (cloud/AD identity) · Day 19 (Windows Event Log evidence).
- **Ethics:** we only run safe, read-only PowerShell on our own machine (Day 1 rule).

---

## The big ideas

### 1. Same OS, different dialect
Windows does the same job as Linux: manages users, permissions, processes, files. Concepts are identical — only the **words and storage** differ: drives (`C:\`) instead of one `/` tree; **ACLs** instead of `rwx`; **PowerShell** instead of Bash. Two OSes solving the same problems differently.

### 2. The shell: PowerShell
- `whoami` (who am I — *same word as Linux!*) · `Get-LocalUser` (list accounts) · `Get-Acl` (read permissions) · `Get-ChildItem` (list, like `ls`).
- PowerShell is object-based and automation-friendly (Day 9). Today: read-only.

### 3. Permissions = ACLs (the key cabinet, Windows label)
- An **ACL (Access Control List)** is the list of "who may do what" on a file/folder — the same key cabinet as Linux `rwx`, stored as a *list* of entries instead of a 3-triple string.
- Each entry: **principal** (user/group) + **rights** (Read, Write, Execute/Full). `Get-Acl` shows it.
- **Bridge:** Linux `rwxr-xr--` = 3 roles × 3 rights. Windows ACL = a list of role→rights pairs. Same lock, different label.

### 4. Users, groups, Active Directory
- **Local user** = an account on one machine (local staff roster).
- **Active Directory (AD)** = a *domain* roster shared across many machines — one identity logs into the whole company. The enterprise "who is employed where."
- **Groups** bundle users for shared access (e.g., `Administrators`).
- **Administrator** = master key (like `root`); **standard user** = normal badge.

### 5. UAC & least privilege (Windows form of "don't live as root")
- **UAC** = the "allow admin?" prompt — Windows's version of `sudo`. Keeps you standard until a task needs admin.
- **Least privilege:** work as a standard user; elevate only when needed. Living as Admin = same danger as `root`. Ransomware loves Admin accounts.

### 6. Security bridge
- Mis-set ACLs ("Everyone: Full Control") = key left in the door — the Windows twin of Linux `777`.
- **AD is the crown jewel:** control AD = control the company's identity. Securing AD (strong groups, least privilege) is enterprise security's backbone.
- Connects to Day 6/7 privilege seed; Day 16 shows Windows privilege escalation.

---

## Worksheet (fill in during class)
1. Windows stores files on drives like ______ (not one `/` tree).
2. The Windows shell is ______ (vs Linux Bash).
3. A Windows permission list is called an ______ (ACL) — the same "who may do what" as Linux ______.
4. `Get-Acl` ______ (reads/shows) permissions; we don't edit them today.
5. A local user vs an AD user: AD is a ______-wide roster (one badge, many rooms).
6. UAC is Windows's version of ______ (the admin prompt). Living as Admin is like living as ______.

## Homework (due Day 9)
On your own Windows machine (or a lab VM), open PowerShell and run `whoami` and `Get-LocalUser`. Write down your identity and one thing you notice. Safe and read-only. (No `C:\` system changes.)

*(Lab steps in lab-guide.md. Quiz in quiz.md. Reference sheet in references.md.)*

---

## PPT Outline (blueprint for Phase 4)
**Slide 1 — Title:** "Day 8: Windows Fundamentals" · Academy logo.
**Slide 2 — Why are we learning this?** Windows = where ransomware lands; PowerShell/ACLs/AD = Windows privilege. Diagram: key cabinet, Windows label.
**Slide 3 — Learning Journey Check:** "Day 7 opened the cabinet as rwx. Today: same cabinet, Windows ACL."
**Slide 4 — Same OS, different dialect:** concepts identical; drives/ACLs/PowerShell differ. Diagram: two dialects side by side.
**Slide 5 — PowerShell:** whoami/Get-LocalUser/Get-Acl/Get-ChildItem. Diagram: walkie-talkie (Windows).
**Slide 6 — ACLs decoded:** list of principal→rights; compare to `rwx`. **Use the OS signature diagram (diagrams/os-signature.md), Windows lens.**
**Slide 7 — Users, groups, AD:** local badge vs company badge. Diagram: roster.
**Slide 8 — UAC & least privilege:** standard user + UAC = Windows `sudo`; Admin = master key. Diagram: badge.
**Slide 9 — Security bridge:** "Everyone: Full Control" = Windows `777`; AD = crown jewel; forward Day 16. Diagram: broken lock.
**Slide 10 — Soft-Skills Moment:** always ask "as WHICH identity, with WHICH rights?"
**Slide 11 — How Today Connects:** same OS diagram, Windows lens; forward D9/D10/D16/D18/D19.
**Slide 12 — Curiosity Question:** "If AD is the company's identity, what happens when an attacker becomes an AD admin?" → Day 18/Day 16.
**Slide 13 — Lab Preview & Quiz:** read-only PowerShell; exit quiz.
