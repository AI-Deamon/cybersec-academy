# Day 7 — Lab Guide
**Goal:** Read Linux permissions and safely change the execute bit on a file you own.

**Prerequisites:** A Linux machine/VM/lab (or WSL/Git Bash on Windows). Read-only except `chmod` on files you own.

---

## Task 1 — See the tree (5 min)
1. Run: `pwd` — note your location.
2. Run: `ls -l` in your home folder. Look at the permission column (the `rwx...` string) and the owner/group columns.

## Task 2 — Read the key cabinet (8 min)
1. Pick one file from `ls -l`. Its line looks like:
   `drwxr-xr--  you  staff  4096  notes.txt`
2. Decode it in your sheet:
   - First letter `d` = folder (or `-` = file)
   - Next 3 = **owner** rights
   - Middle 3 = **group** rights
   - Last 3 = **other** rights
3. Write one sentence: "Owner can ___; group can ___; others can ___."

## Task 3 — Change your own key (7 min)
1. Create a file you own: `touch try.sh`
2. Run: `chmod +x try.sh`
3. Run: `ls -l try.sh` — confirm an `x` now appears in the owner triple.
4. ✅ You changed a key you own; the OS allowed it because you're the owner.

---

## ✅ Checkpoint (show instructor before leaving)
- [ ] Ran `ls -l` and identified owner/group + 3 permission triples
- [ ] Decoded a permission string correctly
- [ ] `chmod +x` on a self-owned file; confirmed `x` appears; no system files touched

## Troubleshooting
- *Permission denied on chmod:* you tried to change a file you don't own — the OS is working. Use a file in your home folder.
- *No Linux?* Use WSL (Windows) or a free browser-based Linux (e.g., overthewire / a lab VM). Ask the instructor.
- *Confused by `rwxr-xr--`:* read it in 3s: owner | group | other. The dashes are "not allowed."

> ⚠️ **Safety rule (Day 1):** never `chmod 777` anything, and never `chown`/edit system files. Only change permissions on files you own, in your home folder.
