# Day 2 — Lab Guide
**Goal:** See real processes running, find a PID and memory usage, and safely end a process you started.

**Prerequisites:** A computer with Task Manager (Windows) or Activity Monitor / `htop` (macOS / Linux). No lab VM needed today.

---

## Task 1 — View Running Processes (8 min)
1. Open the process viewer:
   - **Windows:** Ctrl+Shift+Esc → Task Manager → "More details" → sort by Memory.
   - **macOS:** Activity Monitor (found in Utilities).
   - **Linux:** terminal → `htop` (or `top`).
2. Find the columns: **PID** (process ID), **CPU %**, **Memory %**.
3. Identify the process using the most memory. Write its name + PID.

## Task 2 — End a Process You Started (7 min)
1. Open a **benign** app you control — e.g., Notepad, Calculator, or a text editor.
2. In the viewer, locate that app by name and note its **PID**.
3. Right-click (or `htop`: `F9`) → **End task / SIGTERM**.
4. Confirm it disappears from the list.

> ⚠️ **Safety rule (from Day 1):** Only end processes **you** started. Never end system, "Windows Explorer," or anything you don't recognize. In our lab only.

## Task 3 — Concept Check (7 min)
In your lab sheet, answer in plain language:
- What happens between double-clicking a program and it appearing in the process list? (disk → RAM → CPU)
- Why is ending a *system* process risky? (it can crash the OS — isolation is broken)

---

## ✅ Checkpoint (show instructor before leaving)
- [ ] Identified a high-memory process (name + PID + memory)
- [ ] Opened and cleanly ended a benign app you started
- [ ] Wrote the disk→RAM→CPU flow in your own words

## Troubleshooting
- *htop not installed (Linux):* `sudo apt install htop` (or use `top`, which is built in).
- *Can't find PID column (Windows):* right-click the column header → ensure "PID" is ticked.
- *Accidentally ended the wrong thing:* if the OS still runs, reopen Task Manager; if you ended Explorer, use File → Run new task → `explorer.exe`. (Avoiding this is exactly why we only end our own apps.)
