# Day 9 — Lab Guide
**Goal:** Write and run a tiny, safe, read-only Python script that lists files and reads one you own — proving a script is a Process bound by your permissions.

**Prerequisites:** Python 3 (check `python3 --version` or `python --version`). Standard library only. Run in your own folder. Read-only.

---

## Task 1 — A script wears your badge (6 min)
1. Create `whoami_script.py` in your home/working folder with:
   ```python
   import os
   print("I am running in:", os.getcwd())
   ```
2. Run: `python3 whoami_script.py` (or `python whoami_script.py`).
3. Note it printed *your* folder — the script runs as you.

## Task 2 — List the pantry (7 min)
1. Add to the script:
   ```python
   files = os.listdir('.')
   for name in files:
       print(name)
   ```
2. Run it. It prints every filename in your folder — observation only.

## Task 3 — Read one recipe card (7 min)
1. Create a file you own, e.g. `myfile.txt` with any text.
2. Add:
   ```python
   with open('myfile.txt') as f:
       print(f.read())
   ```
3. Run it. It prints the file's contents. **Read-only** — no writes/deletes.

---

## ✅ Checkpoint (show instructor before leaving)
- [ ] Script printed your working folder (runs as you)
- [ ] Script listed files with `os.listdir`
- [ ] Script read a file you own with `open` — no writes/deletes/network

## Troubleshooting
- *"python3: command not found":* try `python` instead; or use the lab VM from Day 7 (has Python). Ask the instructor.
- *PermissionError on open:* you tried a file you can't read — the OS is checking the script like any Process. Use a file you own.
- *IndentationError:* Python cares about spaces — keep blocks aligned. The instructor can help.

> ⚠️ **Safety rule (Day 1):** standard library only, read-only, in your own folder. Never run a script you don't understand, and never paste code from the internet without reading it.
