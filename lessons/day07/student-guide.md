# Day 7 — Student Guide
**Course:** Practical Cyber Security: From First Principles · Module 2 · Day 7 of 20

---

## Why this matters
Most servers, clouds, and security tools run on Linux — and Linux shows its permission model in plain sight. Learning to *read* `rwxr-xr--` is learning to read "who may do what," the question behind every attack and defense. Today you open the key cabinet from Day 6.

## How today connects (keep this in mind)
- **Yesterday (Day 6) → Today:** OS = Manager, Shell = walkie-talkie, Permissions = key cabinet. Today we open the cabinet and read the labels — on the **Linux** side.
- **Forward:** Day 8 (Windows lens) · Day 9 (Python uses these permissions) · Day 10 (workshop: admin a user/perm change) · Day 16 (privilege escalation) · Day 19 (read `/var/log` for evidence).
- **Ethics:** we only change permissions on files we *own*, on our own machine (Day 1 rule).

---

## The big ideas

### 1. One filesystem, one tree
Linux keeps everything under a single root `/` (one big filing cabinet). No `C:\` — just branches like `/home/you`, `/etc`, `/var/log`. A path is an address.

### 2. The shell (Bash)
`whoami` (who am I) · `pwd` (where am I) · `ls -l` (list **with permission details**) · `cd` (move) · `cat` (read a file). The `-l` is new today — it reveals the key cabinet.

### 3. Permissions — the key cabinet, written down
Every file/folder has rights for three roles:
- **u**ser (owner) · **g**roup · **o**ther (everyone else)
- rights: **r**ead · **w**rite · e**x**ecute

Example: `rwxr-xr--`
- owner: `rwx` → read, write, execute
- group: `r-x` → read, execute (enter)
- other: `r--` → read only

For a **folder**, `x` = can enter (`cd`); for a **file**, `x` = can run as a program.

### 4. Users and groups
- A **user** is an identity (on the staff roster); `whoami` shows yours.
- A **group** bundles users who share access (e.g., `sudo` may administer).
- `root` = the master key (admin). `sudo` = "do this as root" (logged). Live as a normal user; use `sudo` only when needed.

### 5. chmod — changing your own keys
- `chmod +x script.sh` makes a file you own runnable. You may only change what you *own* — the OS enforces this (the Manager checks the cabinet).
- `chown` changes the owner and needs root — we only *explain* it, not run it.

### 6. Security bridge
- Over-permissive files (`777`, world-readable secrets) = keys left in the door. Attackers hunt for these.
- **Least privilege** in practice: give each file the minimum rights its job needs. `chmod` is how you enforce it.
- This is the concrete half of Day 6's privilege seed; Day 16 shows how attackers escape it.

---

## Worksheet (fill in during class)
1. Linux stores everything under one root called ______ (no drive letters).
2. `ls -l` shows permissions as ______ roles × ______ rights.
3. In `rwxr-xr--`, the owner may ______/______/______; others may only ______.
4. For a folder, `x` means you can ______ into it.
5. `chmod +x file` makes the file ______ (if you own it).
6. `777` is dangerous because it means ______ can do everything.

## Homework (due Day 8)
On your own machine (or a Linux VM/lab), run `ls -l` in your home folder. Pick one file and write down its permission string, then decode it in one sentence (who can do what). Safe and read-only except for `chmod` on files you own.

*(Lab steps in lab-guide.md. Quiz in quiz.md. Reference sheet in references.md.)*

---

## PPT Outline (blueprint for Phase 4)
**Slide 1 — Title:** "Day 7: Linux Fundamentals" · Academy logo.
**Slide 2 — Why are we learning this?** Linux runs most security tooling; its permissions are the clearest "who may do what." Diagram: key cabinet labelled.
**Slide 3 — Learning Journey Check:** "Day 6: OS = Manager. Today: open the key cabinet (Linux)."
**Slide 4 — One tree, one root `/`:** no C:\; paths are addresses. Diagram: filing cabinet → branches.
**Slide 5 — Bash refresher:** whoami/pwd/ls -l/cd/cat. Diagram: walkie-talkie.
**Slide 6 — Permissions decoded:** u/g/o × r/w/x; `rwxr-xr--` worked example. **Use the OS signature diagram (diagrams/os-signature.md), Linux lens.**
**Slide 7 — Users & groups:** staff roster; root = master key; sudo. Diagram: badge + group.
**Slide 8 — chmod (your own keys):** `chmod +x`; you may only change what you own.
**Slide 9 — Security bridge:** `777` = key in the door; least privilege; forward Day 16. Diagram: broken lock.
**Slide 10 — Soft-Skills Moment:** always ask "as WHICH user, with WHICH rights?"
**Slide 11 — How Today Connects:** same OS diagram, Linux lens; forward D8/D10/D16/D19.
**Slide 12 — Curiosity Question:** "If a file is `777`, everyone holds a key — what stops an attacker from walking in?" → Day 16.
**Slide 13 — Lab Preview & Quiz:** `ls -l` + `chmod` on own file; exit quiz.
