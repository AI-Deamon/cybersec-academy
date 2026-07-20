# Day 6 — Lab Guide
**Goal:** Use the shell safely on your own machine to see *who you are* and *where you are* in the filesystem.

**Prerequisites:** Your own computer (Linux, macOS, or Windows). No installs. Terminal (Linux/macOS) or PowerShell/CMD (Windows).

---

## Task 1 — Who am I? (users) (6 min)
1. Open your shell:
   - **Linux/macOS:** Terminal
   - **Windows:** PowerShell (or CMD)
2. Run: `whoami`
3. (Linux/macOS) Also run: `id` — note your username and primary group.
4. Write your identity in your lab sheet.

## Task 2 — Where am I? (filesystem) (8 min)
1. Run: `pwd` (Linux/macOS) — "print working directory."
2. Run: `ls` (Linux/macOS) or `dir` (Windows) — list the current folder's contents.
3. Look around — this is the "storage shelving" from class. **Read only — do not delete or change anything.**

## Task 3 — Two dialects (6 min)
1. Note the command differences:
   - List files: `ls` (Linux) vs `dir` (Windows)
   - Current folder: `pwd` (Linux) vs `cd` (Windows, with no args)
2. In your sheet, write one sentence: *"Both OSes do the same job; only the words differ."*

---

## ✅ Checkpoint (show instructor before leaving)
- [ ] Ran `whoami` and reported your username
- [ ] Ran `pwd`/`ls` (or `cd`/`dir`) and listed a directory — no changes made
- [ ] Wrote the "same job, different words" sentence

## Troubleshooting
- *Command not found (Windows `ls`):* use `dir` instead; or install Git Bash for a Linux-like shell.
- *Permission denied:* you tried to enter a folder you're not allowed in — that's the OS working! Try a different folder (e.g., your home directory).
- *Powershell vs CMD:* both work for `whoami`/`cd`/`dir`; PowerShell is more powerful (we use it more on Day 8).

> ⚠️ **Safety rule (Day 1):** only run these read-only commands on your own machine. Never run commands you don't understand, especially anything with `rm`/`del`/`sudo`.
