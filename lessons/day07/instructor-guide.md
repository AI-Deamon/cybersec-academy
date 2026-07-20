# Day 7 — Instructor Guide (PRIVATE — source of truth)
**Course:** Practical Cyber Security: From First Principles
**Module 2 — Understanding the Operating System · Day 7 of 20 · Week 2, Session 2**
**Standard:** Academy Design Document v1.2 (Complete) · Phase 3 lesson-doc standard
**Version:** 1.0

---

## 1. Lesson Overview
- **Title:** Linux Fundamentals — the Shell, Files, Permissions, Users
- **Duration:** 90 minutes
- **Type:** Foundation — Linux lens of the Week 2 OS signature diagram
- **Position in journey:** Day 7 of 20, second day of Week 2. Day 6 = "what is an OS + one metaphor." Today = the **Linux side** of that same picture: Bash, the filesystem tree, permission bits, users/groups. Day 8 = Windows side; Day 9-10 = scripting & automation (Day 10 = workshop).
- **Companion files:** student-guide.md · lab-guide.md · quiz.md · references.md · rubric.md · version-history.md

## 2. Teaching Guide (Four Context Questions)
**Why am I learning this?**
Because most security tooling, servers, and cloud run on Linux, and Linux's permission model is the clearest example of "who may do what" — the exact question that decides every attack and defense. If you can read Linux permissions, you can reason about privilege anywhere.

**How does this connect to the previous lessons?**
- Day 6: the OS = Manager, Shell = walkie-talkie, Permissions = key cabinet. Today we open the key cabinet and see *how Linux labels keys*.
- The same OS signature diagram (User→Shell→OS→CPU/RAM/Disk) — today's lens is **Linux Bash + permission bits**.

**Where will I use this in cybersecurity?**
Linux hardening, privilege escalation (Day 16), incident response forensics (Day 19), cloud/container security (Day 18), malware analysis. The permission model is everywhere.

**What problem will I be able to solve after today's class?**
Read a Linux permission string (`rwxr-xr--`), explain what a user vs group vs other may do, list users, and change a file's mode with `chmod` on own files — the practical foundation of least-privilege.

**Concept 1 — The filesystem is a tree (first principles):**
Linux stores everything under one root `/` (like one big filing cabinet). Folders branch like a tree: `/home/you`, `/etc`, `/var/log`. Paths are addresses. No drive letters (no C:\) — just one tree.

**Concept 2 — The shell (Bash) — the walkie-talkie in detail:**
`whoami` (who am I) · `pwd` (where am I) · `ls -l` (list with details) · `cd` (move) · `cat` (read a file) · `less` (read long file). Today we add `-l` to *see* permissions.

**Concept 3 — Permissions, the key cabinet made visible (the core of today):**
Every file/folder has 3 sets of rights for 3 roles:
- **Roles:** **u**ser (owner), **g**roup, **o**ther (everyone else).
- **Rights:** **r**ead, **w**rite, e**x**ecute.
- Shown as `rwxr-xr--` → owner: rwx (read/write/execute); group: r-x (read/execute); other: r-- (read only).
- For folders, **x** = "can enter" (cd). For files, **x** = "can run as a program."
- A worked example: `drwxr-xr--` means a folder the owner can use fully, the group can enter+read, others can only read. That's the key cabinet, written down.

**Concept 4 — Users and groups (the staff roster + shifts):**
- A **user** is an identity (on the staff roster). `whoami` shows yours.
- A **group** bundles users so they share access (e.g., the `sudo` group may administer).
- `/etc/passwd` lists accounts; `/etc/group` lists groups. (We look, we don't edit.)
- **root** = the master key (admin). `sudo` = "do this as root" — powerful, logged. Least privilege = don't live as root.

**Concept 5 — chmod/chown (changing the keys — carefully):**
- `chmod` changes permission bits **on your own files** (e.g., `chmod +x script.sh` makes it runnable).
- `chown` changes owner (needs root — we only *explain*, not run, to stay safe).
- Rule: you may only change what you own. The OS enforces this — exactly the manager checking the key cabinet.

**Concept 6 — Security bridge:**
- Mis-set permissions (`/etc/shadow` world-readable, a script `777`) = a key left in the door. Attackers *hunt for* overly-permissive files.
- **Least privilege** in practice: give each file the minimum rights its job needs. `chmod` is how you enforce it.
- This is the concrete half of Day 6's "privilege" seed; Day 16 shows how attackers *escape* it.

## 2b. Topic Connections & Examples (the "why it links" layer)
**Connection A — Same diagram, Linux lens:** the OS signature diagram (User→Shell→OS→CPU/RAM/Disk). Today: the User is a Linux account; the Shell is **Bash**; the OS's permission check is **rwx bits**; the Disk holds the tree at `/`.

**Connection B — Forward links:**
- → **Day 8 (Windows):** same ideas as ACLs/tokens; contrast Bash with PowerShell.
- → **Day 9 (Python):** a script is a Process that opens files using these permissions.
- → **Day 10 (workshop):** administer a user/permission change on Linux (and Windows).
- → **Day 16 (privilege escalation):** abuse of weak `rwx` / `sudo` misconfig.
- → **Day 19 (IR):** read `/var/log` (needs r) for evidence.

**Connection C — Backward link:** Day 6 named the key cabinet; today we open it. The metaphor stays consistent — no new analogy.

**Concrete Examples:**
- *Key cabinet:* a file's `rwxr-xr--` is like a door labelled "Owner: full · Group: enter+look · Others: look only."
- *Group:* a kitchen "line cooks" group that may enter the prep room; others can't.
- *Real story:* the 2018 **Django `DEBUG` / exposed admin** and countless **world-writable config** incidents are "keys left in the door." The fix is correct `chmod`.
- *Bridge line (say twice):* "On Day 6 the key cabinet was abstract. Today you can read the labels. On Day 16, you'll see who picks the lock."

## 3. Timing Guide (90 min)
| Segment | Time | Activity |
|---------|------|----------|
| A. Learning Objectives | 3 min | State the 3 goals |
| B. Learning Journey Check | 4 min | "Day 6: OS = Manager. Today: we open the key cabinet — Linux permissions." |
| C. Review | 3 min | Recall Day 6 unified metaphor (Manager/Shell/Key cabinet) |
| D. Soft-Skills Moment | 12 min | Reading an `ls -l` line; always ask "as WHICH user, with WHICH rights?" |
| E. New Concepts | 30 min | filesystem tree, Bash, rwx bits, users/groups, chmod (own files) |
| F. Diagram & Real-World | 10 min | OS signature diagram (Linux lens); permission string worked example |
| G. Live Demo / Lab | 20 min | `ls -l`, read a permission string, `chmod` on a file you own |
| H. Quiz / Assignment | 8 min | Exit quiz + preview Day 8 |
| **Total** | **90** | |

## 4. Analogies
**ONE unified metaphor (no new ones):** Restaurant = Computer · Manager = OS · Chef = CPU · Kitchen counter = RAM · Pantry = Storage/Disk (the tree at `/`) · Employees = Processes · Walkie-talkie = Shell (Bash) · Key cabinet = Permissions (the `rwx` bits). Today we *read the labels on the key cabinet* and learn how the Manager (OS) consults them.

## 5. Common Misconceptions
- *"777 means 'make it work' — just use it."* `777` = everyone can read/write/execute = key left in the door. Never a fix; a vulnerability.
- *"Execute (x) on a file means 'run it now'."* It means "this file *may* be run as a program." Setting it doesn't run anything.
- *"root is just 'admin', use it freely."* root = master key; living as root violates least privilege and is how small mistakes become disasters.
- *"Permissions are only for files."* Folders use them too — `x` = enter, `r` = list.
- *"chmod needs root."* No — you can `chmod` files you *own*. `chown` (changing owner) needs root.

## 6. Demo Script
**Demo 1 — The tree (5 min):** `pwd` then `ls -l /` (read-only) to show the single root and top folders.
**Demo 2 — Read the key cabinet (8 min):** `ls -l` on a folder; walk a line: `drwxr-xr--  you  staff  ... notes.txt`. Decode: `d`=folder, `rwx`=owner, `r-x`=group, `r--`=other. "That's the key cabinet, written down."
**Demo 3 — Change your own key (5 min):** create `try.sh` in home; `chmod +x try.sh`; `ls -l` shows the `x` added. "You changed a key you own — the OS allowed it because you're the owner."
**Demo 4 — Bridge (2 min):** "If a file is `777`, everyone holds a key. Attackers look for exactly that. Day 16 shows what they do next."

## 7. Lab Solution (answers instructors should see)
- Task 1: ran `ls -l` in home; identified owner/group and the 3 permission triples for a file.
- Task 2: decoded a sample string (e.g., `rwxr-xr--`) correctly into owner/group/other rights.
- Task 3: `chmod +x` on a self-owned file; confirmed `x` appears; no system files changed.
- Concept Q: explained least privilege and why `777` is bad.

## 8. FAQ
- **Q: Do I need to memorize rwx?** Learn to *read* it; `chmod` uses it. Patterns (755, 644) become familiar fast.
- **Q: What's /etc/passwd — is it safe to open?** Yes, read-only; it lists accounts (not passwords — those are in `/etc/shadow`, root-only). We look, we don't edit.
- **Q: Why not just use root?** Least privilege — a mistake as root can break or expose the system. Use `sudo` for the rare admin task.
- **Q: chmod vs chown?** `chmod` = change rights on what you own; `chown` = change owner (root only).

## 9. Examples Bank (reusable across cohorts)
- Key cabinet = `rwx` bits; group = "line cooks" who share a room.
- `777` = key left in the door; `755` = owner full, others enter+read (typical for a program).
- `/` = one filing cabinet; no C:\ drive letters.
- Bridge line: "Day 6 the cabinet was abstract; today you read the labels; Day 16 you see who picks the lock."
- Linux commands: `whoami` · `pwd` · `ls -l` · `cd` · `cat` · `chmod` (own files).

> **Assessment:** see rubric.md (separate file, per the 7-file standard).
