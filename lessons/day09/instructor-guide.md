# Day 9 — Instructor Guide (PRIVATE — source of truth)
**Course:** Practical Cyber Security: From First Principles
**Module 2 — Understanding the Operating System · Day 9 of 20 · Week 2, Session 4**
**Standard:** Academy Design Document v1.2 (Complete) · Phase 3 lesson-doc standard
**Version:** 1.0

---

## 1. Lesson Overview
- **Title:** Python for Security — Scripts that Talk to the Operating System
- **Duration:** 90 minutes
- **Type:** Foundation — "a program uses the OS" lens of the Week 2 OS signature diagram
- **Position in journey:** Day 9 of 20, fourth day of Week 2. Day 6 = what an OS is; Day 7 = Linux lens; Day 8 = Windows lens. Today = a **program (Python) is itself an Employee/Process** that the Manager (OS) runs, and it reads/writes files *through* the permission checks from Days 7-8. Day 10 = the Week 2 workshop/assignment (script a small OS task). Module 3 (Day 11+) shifts to security thinking.
- **Companion files:** student-guide.md · lab-guide.md · quiz.md · references.md · rubric.md · version-history.md

## 2. Teaching Guide (Four Context Questions)
**Why am I learning this?**
Because in security you automate: parse 10,000 log lines, check 500 files for weak permissions, rename 1,000 alerts. Doing that by hand is impossible. Python is the lingua franca of security automation — and understanding that a script is just another Process the OS controls closes the loop on "who is in charge."

**How does this connect to the previous lessons?**
- Day 6: an Employee (Process) runs under the Manager (OS). Today, a **Python script IS that Employee** — when you run `python script.py`, the OS creates a Process that runs as *you* (your permissions).
- Days 7-8: the OS checks permissions on every file action. A script's file reads/writes are checked *exactly* the same way — the script has no special power; it's bound by your key cabinet.
- Same OS signature diagram; today's lens: **a Process (Python) → OS → permissions → Disk**.

**Where will I use this in cybersecurity?**
Log parsing, file/malware triage, scanning automation, IOC extraction, SOAR playbooks, secure-coding review (Day 15), and the Day 10 workshop. The untrusted-input lens (Day 11) later explains why scripts must validate input.

**What problem will I be able to solve after today's class?**
Write a tiny safe Python script that lists files in a folder and reads a file you own — understanding that the OS enforces permissions on the script just like on you. Foundation for automation without fear.

**Concept 1 — A script is a Process (first principles):**
When you run `python script.py`, the OS (Manager) creates an **Employee = a Process** that executes your code. That Process runs **as you** — same `whoami`, same permissions. A script is not magic; it's just you, automated. This is the literal Week 2 diagram: User → Shell → OS → (your Python Process) → Disk.

**Concept 2 — Python talks to the OS through the OS (not around it):**
To list or read files, Python calls OS functions (`os.listdir`, `open`). The OS performs the permission check on each call — same key cabinet as Days 7-8. If *you* can't open a file, your *script* can't either. Permission is enforced on the Process, not waived for code.

**Concept 3 — Why Python for security (the payoff):**
- Reads/writes files, parses text, loops over data — the daily grind of security work.
- Huge standard library + security ecosystem (later: `requests` for web, `socket` for network, log parsers).
- Cross-platform: same script logic on Linux (Bash-born) and Windows (PowerShell-born) — it sits *above* both shells.

**Concept 4 — Safe first script (concept-before-tool, read-only):**
We write a script that only **reads** — lists a folder, prints each filename, and reads one file you own. No writing, no deleting, no network. The "hello world" of security automation is *observation*, not action.

**Concept 5 — The untrusted-input seed (deferred, but planted):**
A script that reads user/file input can be fooled (path tricks, bad data). We *plant* the question — "what if the data a script reads isn't what it expects?" — and answer it on Day 11 (untrusted input) and Day 15 (secure coding). Today we only observe safely.

**Concept 6 — Security bridge:**
- A script runs with *your* privilege — so a malicious script is as dangerous as you are. **Run only code you understand** (Day 1 ethics + this fact).
- Automation multiplies both good and harm: a safe script checks 500 files for weak permissions; a bad one deletes them. Least privilege applies to scripts too.
- This is the practical payoff of Days 6-8: now you can *make the OS check permissions at scale*.

## 2b. Topic Connections & Examples (the "why it links" layer)
**Connection A — Same diagram, "program" lens:** OS signature diagram (User→Shell→OS→CPU/RAM/Disk). Today: the User runs `python`, which spawns a Process (Employee); that Process's file actions hit the OS permission check (key cabinet) before touching Disk. Same picture, new actor.

**Connection B — Forward links:**
- → **Day 10 (Week 2 assignment / reinforcement):** students connect the week into one explainer, do a safe `chmod` on Linux, read an ACL on Windows, and write a read-only Python script that flags world-readable files — the OS signature diagram across all three lenses. Run as a workshop (review → Q&A → briefing → guided work), submitted before Day 11.
- → **Day 11 (untrusted input):** why scripts must validate what they read.
- → **Day 15 (secure coding):** writing safe code; reviewing a script for flaws.
- → **Day 19 (IR):** parse logs with Python to find IOCs.
- → **Day 14/16:** automation around scanning/privilege checks.

**Connection C — Backward link:** Day 6's "Employee = Process" becomes concrete — *you* make an Employee by running a script. Days 7-8's permission checks now apply to your script automatically.

**Concrete Examples:**
- *Script = automated you:* telling a reliable junior chef (your script) to "list the pantry and read the recipe card" — the Manager (OS) still checks the key cabinet for each step. The junior has your badge.
- *Permission follows the Process:* if you can't open `/etc/shadow`, neither can your script — same key cabinet.
- *Real story:* defenders use Python to scan thousands of files for `777`/over-permissive ACLs (the Day 7/8 "key in the door") — turning the concept into an automated guard. Attackers use scripts too (ransomware is a script with bad intent) — which is why "run only code you understand."
- *Bridge line (say twice):* "A script is just you, automated — same badge, same key cabinet. That's why automation is powerful and why you never run code you don't understand."

## 3. Timing Guide (90 min)
| Segment | Time | Activity |
|---------|------|----------|
| A. Learning Objectives | 3 min | State the 3 goals |
| B. Learning Journey Check | 4 min | "Days 7-8: the OS checks permissions. Today: your script is a Process the OS checks the same way." |
| C. Review | 3 min | Recall Day 6 Employee=Process; Days 7-8 permission checks |
| D. Soft-Skills Moment | 12 min | Reading a short script; always ask "what privilege does this code run with, and what does it touch?" |
| E. New Concepts | 30 min | script=Process, Python↔OS, why Python, safe read-only script, untrusted-input seed |
| F. Diagram & Real-World | 10 min | OS signature diagram (program lens); script=automated-you; defender log-scan story |
| G. Live Demo / Lab | 20 min | write + run a read-only Python script (list files, read one own file) |
| H. Quiz / Assignment | 8 min | Exit quiz + preview Day 10 workshop |
| **Total** | **90** | |

## 4. Analogies
**ONE unified metaphor (no new ones):** Restaurant = Computer · Manager = OS · Chef = CPU · Kitchen counter = RAM · Pantry = Storage/Disk · Employees = Processes · Walkie-talkie = Shell · Key cabinet = Permissions. Today: when you run `python`, you hire a **junior chef (a new Employee/Process)** who carries *your* badge and must pass the Manager's key-cabinet check on every pantry visit. The junior is reliable but has exactly your rights — no master key.

## 5. Common Misconceptions
- *"A script can do things I can't."* No — it runs as you; the OS checks its permissions identically. It can't open what you can't.
- *"Python is only for developers."* It's the default security-automation language; a little goes a long way (observation first).
- *"Running a .py file is safe because it's 'just a script'."* A script runs with your privilege — a malicious one is as dangerous as you are. Run only code you understand.
- *"Automation makes security optional."* Automation *does* security at scale — but the logic (what to check) is still your judgment. Garbage logic = garbage at scale.
- *"You need to install anything heavy."* Python 3 is often preinstalled; we use the standard library only (no pip installs) for the lab.

## 6. Demo Script
**Demo 1 — Script = Process (5 min):** run a 3-line script that prints `whoami` + `os.getcwd()`. Show it reports *your* identity and folder — "your script wears your badge."
**Demo 2 — List + read, safely (10 min):** show a script using `os.listdir('.')` to print filenames, then `open('notes.txt').read()` to print one file the student owns. Emphasize: read-only, in the student's own folder.
**Demo 3 — Permission follows the Process (3 min):** try `open('/etc/shadow')` (or a protected file) in the script → PermissionError, same as if they typed it. "Same key cabinet. The script gets no special pass."
**Demo 4 — Bridge (2 min):** "Defenders script this to scan 500 files for weak permissions. Attackers script too — so you run only code you understand."

## 7. Lab Solution (answers instructors should see)
- Task 1: wrote a script that imports `os` and prints `os.getcwd()` (or `whoami` via `os`/`subprocess` optional) — confirmed it shows their folder/identity.
- Task 2: used `os.listdir('.')` to print filenames in their own folder.
- Task 3: used `open('myfile.txt').read()` to print a file they own; no writes/deletes.
- Concept Q: stated a script runs as the user (same permissions); the OS checks the script's file actions like any process; only run understood code.

## 8. FAQ
- **Q: Do I need to be a programmer?** No — today is observation-only; you'll read/modify a tiny script. Comfort grows by Day 10.
- **Q: Why Python and not Bash/PowerShell?** Those are shells; Python sits above them, cross-platform, great for logic/parsing. They complement, not replace.
- **Q: Is the lab safe?** Yes — standard library only, read-only, in your own folder. No network, no writes, no deletes.
- **Q: What if Python isn't installed?** Check `python3 --version`; most systems have it. A lab VM (from Day 7) works too. Ask the instructor.

## 9. Examples Bank (reusable across cohorts)
- Script = junior chef with your badge; Manager checks the key cabinet per pantry visit.
- Permission follows the Process: script can't open what you can't.
- Defender script scans 500 files for weak perms; attacker script (ransomware) is the dark twin — run only understood code.
- Bridge line: "A script is just you, automated — same badge, same key cabinet."
- Python (safe, stdlib): `os.listdir` · `open` (read) · `os.getcwd` · `print`.

> **Assessment:** see rubric.md (separate file, per the 7-file standard).
