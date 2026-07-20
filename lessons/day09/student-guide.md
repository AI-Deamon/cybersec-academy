# Day 9 — Student Guide
**Course:** Practical Cyber Security: From First Principles · Module 2 · Day 9 of 20

---

## Why this matters
In security you automate: parse 10,000 log lines, check 500 files for weak permissions, triage 1,000 alerts. By hand, impossible. Python is the lingua franca of security automation — and understanding that a script is just another Process the OS controls closes the loop on "who is in charge."

## How today connects (keep this in mind)
- **Yesterday (Day 8) → Today:** Days 7-8 — the OS checks permissions on every file action. Today, a **Python script is a Process** (an Employee) that runs *as you*, so the OS checks *its* actions with the same key cabinet. Same diagram, new actor.
- **Forward:** Day 10 = Week 2 reinforcement/assignment (workshop: harden a workstation; safe `chmod` on Linux + read an ACL on Windows + a read-only Python script that flags world-readable files) · Day 11 (untrusted input — why scripts must validate what they read) · Day 15 (secure coding) · Day 19 (parse logs for IOCs). Same OS signature diagram (`diagrams/os-signature.md`), three lenses done.
- **Ethics:** run only code you understand; read-only in your own folder (Day 1 rule).

---

## The big ideas

### 1. A script is a Process
When you run `python script.py`, the OS (Manager) hires a **new Employee = a Process** that executes your code. That Process runs **as you** — same `whoami`, same permissions. A script isn't magic; it's *you, automated*. Week 2 diagram: User → Shell → OS → (your Python Process) → Disk.

### 2. Python talks to the OS *through* the OS
To list or read files, Python calls OS functions (`os.listdir`, `open`). The OS performs the permission check on each call — the same key cabinet as Days 7-8. If *you* can't open a file, your *script* can't either. Permission is enforced on the Process, not waived for code.

### 3. Why Python for security
- Reads/writes files, parses text, loops over data — the daily grind of security.
- Huge library + security ecosystem (later: web, network, log parsers).
- Cross-platform: same logic above both Bash (Linux) and PowerShell (Windows).

### 4. Safe first script (read-only)
We write a script that only **observes** — lists a folder, prints filenames, reads one file you own. No writing, deleting, or network. The "hello world" of security automation is *watching*, not acting.

### 5. The untrusted-input seed (planted, not answered)
A script that reads input can be fooled (bad paths, bad data). We plant the question — *"what if the data a script reads isn't what it expects?"* — answered on Day 11 (untrusted input) and Day 15 (secure coding). Today we only observe safely.

### 6. Security bridge
- A script runs with **your** privilege — a malicious script is as dangerous as you are. **Run only code you understand.**
- Automation multiplies both good and harm: a safe script checks 500 files for weak permissions; a bad one deletes them. Least privilege applies to scripts too.
- Payoff of Days 6-8: now you can *make the OS check permissions at scale*.

---

## Worksheet (fill in during class)
1. Running `python script.py` makes the OS create a ______ (Employee/Process) that runs as ______.
2. A script's file reads hit the OS's ______ check — same as yours.
3. If you can't open a file, your script ______ (can / cannot) either.
4. We only write ______-only scripts today (no writes/deletes/network).
5. A malicious script is as dangerous as ______, because it runs with your privilege.
6. Automation at scale needs correct ______ — garbage logic = garbage at scale.

## Homework (due Day 10)
On your own machine, write a 5-line Python script that prints your current folder (`os.getcwd()`) and lists its files (`os.listdir('.')`). Run it. Safe and read-only. Bring it to the Day 10 workshop.

*(Lab steps in lab-guide.md. Quiz in quiz.md. Reference sheet in references.md.)*

---

## PPT Outline (blueprint for Phase 4)
**Slide 1 — Title:** "Day 9: Python for Security" · Academy logo.
**Slide 2 — Why are we learning this?** Security = automation; Python is the lingua franca; a script is a Process the OS controls. Diagram: chef with your badge.
**Slide 3 — Learning Journey Check:** "Days 7-8: OS checks permissions. Today: your script is checked the same way."
**Slide 4 — Script = Process:** running python spawns an Employee with your badge. Diagram: OS signature diagram, program lens.
**Slide 5 — Python ↔ OS:** os.listdir/open hit the key cabinet. Diagram: Manager checks each pantry visit.
**Slide 6 — Why Python:** cross-platform, parses, automates. Diagram: above Bash & PowerShell.
**Slide 7 — Safe first script:** list + read, read-only. Diagram: observing, not acting.
**Slide 8 — Untrusted-input seed:** plant the question; answer Day 11/15.
**Slide 9 — Security bridge:** script runs as you; run only understood code; least privilege at scale. Diagram: junior chef.
**Slide 10 — Soft-Skills Moment:** always ask "what privilege, what does it touch?"
**Slide 11 — How Today Connects:** same OS diagram, program lens; forward D10/D11/D15/D19.
**Slide 12 — Curiosity Question:** "If a script runs as you, what stops bad code from doing everything you can?" → Day 11 (untrusted input) + Day 1 ethics.
**Slide 13 — Lab Preview & Quiz:** write/run read-only script; exit quiz.
