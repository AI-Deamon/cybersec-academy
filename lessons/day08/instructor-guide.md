# Day 8 — Instructor Guide (PRIVATE — source of truth)
**Course:** Practical Cyber Security: From First Principles
**Module 2 — Understanding the Operating System · Day 8 of 20 · Week 2, Session 3**
**Standard:** Academy Design Document v1.2 (Complete) · Phase 3 lesson-doc standard
**Version:** 1.0

---

## 1. Lesson Overview
- **Title:** Windows Fundamentals — PowerShell, Permissions (ACLs), Users & Active Directory
- **Duration:** 90 minutes
- **Type:** Foundation — Windows lens of the Week 2 OS signature diagram
- **Position in journey:** Day 8 of 20, third day of Week 2. Day 6 = what an OS is; Day 7 = Linux lens. Today = the **Windows lens** of the same picture (User→Shell→OS→CPU/RAM/Disk): PowerShell, ACLs, users/groups, Active Directory. Day 9-10 = scripting/automation (Day 10 = workshop).
- **Companion files:** student-guide.md · lab-guide.md · quiz.md · references.md · rubric.md · version-history.md

## 2. Teaching Guide (Four Context Questions)
**Why am I learning this?**
Because most desktops and enterprises run Windows, and Windows is where attacks like ransomware and credential theft actually land. Understanding PowerShell, ACLs, and Active Directory is how you reason about Windows privilege and defense — the same "who may do what" question as Linux, just expressed differently.

**How does this connect to the previous lessons?**
- Day 6: OS = Manager, Shell = walkie-talkie, Permissions = key cabinet. Day 7 opened the cabinet as Linux `rwx`. Today we open the *same* cabinet as a Windows **ACL** — different label, same lock.
- Same OS signature diagram; today's lens is **PowerShell + ACLs + AD**.

**Where will I use this in cybersecurity?**
Windows hardening, Active Directory security, ransomware defense, privilege escalation (Day 16), incident response (Day 19, Windows Event Log), enterprise/cloud identity (Day 18).

**What problem will I be able to solve after today's class?**
Read a Windows permission (ACL) conceptually, name the difference between a local user and a domain (AD) account, explain why "standard user + UAC" is the Windows form of least privilege, and run safe read-only PowerShell.

**Concept 1 — Windows is the same OS idea, different dialect (first principles):**
Windows does the same job as Linux: it manages users, permissions, processes, and files. The *concepts* are identical — only the **words and storage** differ. Drives (`C:\`) instead of one `/` tree; **ACLs** instead of `rwx` triples; **PowerShell** instead of Bash. Teach "two OSes solving the same problems in different ways" (owner's framing from Day 6).

**Concept 2 — The shell: PowerShell (the walkie-talkie, Windows edition):**
- `whoami` (who am I — same word as Linux!) · `Get-LocalUser` (list accounts) · `Get-Acl` (read permissions on a file/folder) · `Get-ChildItem` (list, like `ls`).
- PowerShell is object-based (not just text) — powerful for automation (Day 9). We use read-only commands today.

**Concept 3 — Permissions = ACLs (the key cabinet, Windows label):**
- An **ACL (Access Control List)** is the list of "who may do what" attached to a file/folder — the same key cabinet as Linux `rwx`, just stored as a *list* of entries instead of a 3-triple string.
- Each entry: **principal** (user/group) + **rights** (Read, Write, Execute/Full). `Get-Acl` shows it.
- Concept bridge: Linux `rwxr-xr--` = "3 roles × 3 rights." Windows ACL = "a list of role→rights pairs." Same lock, different label. (We read, we don't edit — `icacls` changes need care; show only.)

**Concept 4 — Users, groups, and Active Directory (the staff roster, enterprise edition):**
- **Local user** = an account on one machine (the local staff roster).
- **Active Directory (AD)** = a *domain* roster shared across many machines — one identity logs into the whole company. This is how enterprises manage "who is employed where."
- **Groups** bundle users for shared access (e.g., `Administrators`). AD adds domain groups.
- **Administrator** = the master key (like `root`). **Standard user** = normal badge.

**Concept 5 — UAC & least privilege (the Windows form of "don't live as root"):**
- **UAC (User Account Control)** = the prompt that asks "allow admin?" — Windows's version of `sudo`. It keeps you as a standard user until a task needs admin.
- **Least privilege** in Windows: work as a standard user; only elevate (UAC) when needed. Living as Administrator = same danger as living as `root`. Ransomware loves Admin accounts.

**Concept 6 — Security bridge:**
- Mis-set ACLs (a share "Everyone: Full Control") = key left in the door — exactly the Windows version of Linux `777`.
- **AD is the crown jewel:** if an attacker controls AD, they control the identity of the whole company. Securing AD (strong groups, least privilege, no shared admin accounts) is enterprise security's backbone.
- Connects to Day 6/7 privilege seed; Day 16 shows Windows privilege escalation (e.g., token abuse, weak AD configs).

## 2b. Topic Connections & Examples (the "why it links" layer)
**Connection A — Same diagram, Windows lens:** OS signature diagram (User→Shell→OS→CPU/RAM/Disk). Today: User = a Windows/AD identity; Shell = **PowerShell**; OS permission check = **ACL**; Disk = `C:\` tree. Same picture as Day 7, different annotation.

**Connection B — Forward links:**
- → **Day 9 (Python):** a script runs as a Windows process using these ACLs.
- → **Day 10 (workshop):** administer a user/permission change on Windows (and Linux).
- → **Day 16 (privilege escalation):** Windows token/AD abuse.
- → **Day 18 (cloud/AD):** identity = the new perimeter.
- → **Day 19 (IR):** Windows Event Log (needs read rights) for evidence.

**Connection C — Backward link:** Day 6 named the key cabinet; Day 7 opened it as `rwx`; today opens it as an ACL. One cabinet, two labels. The metaphor stays consistent.

**Concrete Examples:**
- *ACL = key cabinet list:* a folder's ACL is like a sign-in sheet — "Alice: read, Bob: read/write, Everyone: no." Same idea as `rwxr-xr--`, just written as a list.
- *AD = company-wide staff roster:* one badge opens every door in the building, vs a local user's badge that opens only one room.
- *Real story:* the 2021 **Colonial Pipeline** ransomware spread via a single compromised AD/service account with too much access — the crown jewel fell because privilege wasn't least.
- *Bridge line (say twice):* "Linux `777` and Windows 'Everyone: Full Control' are the same mistake in two dialects. Least privilege is the fix in both."

## 3. Timing Guide (90 min)
| Segment | Time | Activity |
|---------|------|----------|
| A. Learning Objectives | 3 min | State the 3 goals |
| B. Learning Journey Check | 4 min | "Day 7 opened the cabinet as rwx. Today: the same cabinet, Windows ACL label." |
| C. Review | 3 min | Recall Day 6 unified metaphor + Day 7 permission concept |
| D. Soft-Skills Moment | 12 min | Reading an ACL / AD group; always ask "as WHICH identity, with WHICH rights?" |
| E. New Concepts | 30 min | PowerShell, ACLs, users/groups/AD, UAC & least privilege |
| F. Diagram & Real-World | 10 min | OS signature diagram (Windows lens); ACL worked example; Colonial story |
| G. Live Demo / Lab | 20 min | safe read-only PowerShell (whoami/Get-LocalUser/Get-Acl) |
| H. Quiz / Assignment | 8 min | Exit quiz + preview Day 9 |
| **Total** | **90** | |

## 4. Analogies
**ONE unified metaphor (no new ones):** Restaurant = Computer · Manager = OS · Chef = CPU · Kitchen counter = RAM · Pantry = Storage/Disk (`C:\` tree) · Employees = Processes · Walkie-talkie = Shell (**PowerShell**) · Key cabinet = Permissions (**ACL**). Today we read the *Windows label* on the same cabinet. AD = a company-wide staff roster (one badge, many rooms) vs a local user's single-room badge.

## 5. Common Misconceptions
- *"Windows has no permissions like Linux."* It does — they're **ACLs** (a list instead of a 3-triple string). Same concept.
- *"Administrator is fine to use daily."* Admin = master key; ransomware and mistakes love it. Use a standard account + UAC, like `sudo`.
- *"Active Directory is just a login server."* AD is the enterprise identity + access backbone — compromise it and you compromise the company.
- *"PowerShell is only for Windows admins."* It's the automation/forensics/attack surface too — we learn it safely, read-only first.
- *"Linux and Windows permissions are unrelated."* Same lock ("who may do what"); different label (rwx vs ACL). Day 7 + today prove it.

## 6. Demo Script
**Demo 1 — Same words, different world (5 min):** `whoami` in PowerShell (same command as Linux). Show it returns `DOMAIN\user` or `DESKTOP\user` — identity carries a "which building" tag (local vs domain).
**Demo 2 — Read the key cabinet (Windows) (8 min):** `Get-Acl C:\Users\You\somefile.txt` (read-only). Show the Access list: principal → rights. "This is `rwx` written as a list. Same lock."
**Demo 3 — The roster (5 min):** `Get-LocalUser` lists local accounts; briefly contrast with `AD` domain accounts (mention, don't connect to a real domain). "Local badge vs company badge."
**Demo 4 — Bridge (2 min):** "If a share is 'Everyone: Full Control,' that's Windows `777`. Day 16 shows what an attacker does with it."

## 7. Lab Solution (answers instructors should see)
- Task 1: ran `whoami`; reported identity (noted local vs domain if shown).
- Task 2: ran `Get-LocalUser`; listed accounts (read-only).
- Task 3: ran `Get-Acl` on a file they own; identified at least one principal→rights entry.
- Concept Q: explained ACL = list of who-may-do-what, same concept as Linux `rwx`; stated why standard user + UAC = least privilege.

## 8. FAQ
- **Q: Is PowerShell dangerous?** It's powerful; we run only read-only cmdlets on our own machine today.
- **Q: Do I need a domain/AD to learn?** No — `Get-LocalUser` works on any Windows box; AD is explained conceptually.
- **Q: ACL vs rwx — which is "better"?** Neither; both express "who may do what." Learn the concept, and either label is readable.
- **Q: Why UAC if I'm already an admin?** UAC keeps you as standard until a task needs admin — limits blast radius, like `sudo`.

## 9. Examples Bank (reusable across cohorts)
- ACL = key-cabinet sign-in sheet (Alice: read, Bob: read/write). Same as `rwxr-xr--`, written as a list.
- AD = company-wide badge (one identity, many rooms) vs local user's single-room badge.
- `777` (Linux) ≡ "Everyone: Full Control" (Windows) — same mistake, two dialects.
- Bridge line: "Least privilege is the fix in both."
- Windows cmdlets: `whoami` · `Get-LocalUser` · `Get-Acl` · `Get-ChildItem`.

> **Assessment:** see rubric.md (separate file, per the 7-file standard).
