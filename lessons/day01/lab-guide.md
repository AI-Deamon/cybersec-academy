# Day 1 — Lab Guide
**Goal:** Practice the ethics rule and prove you can represent text as binary/hex.

**Prerequisites:** A computer with a text editor and (optionally) a hex viewer.
- Linux/Mac: `xxd` is built in.
- Windows: install a free hex editor (e.g., HxD).
- No lab VM needed today.

---

## Task 1 — Ethics Pledge (5 min)
1. Read the pledge: *"I will only test systems I am authorized to test, in writing, within agreed scope."*
2. Write your name and today's date on a printed copy (or in a notes file). This is your first course artifact.

## Task 2 — Convert a Letter to Binary (10 min)
1. Pick the first letter of your first name.
2. Look it up in the ASCII table (references.md) to get its decimal value.
3. Convert that decimal to 8-bit binary using powers of two: 128 64 32 16 8 4 2 1.
   - Example: 'J' = 74 → 64+8+2 → `01001010`.
4. Write the binary next to the letter.

## Task 3 — Hex Dump Your Name (10 min)
1. Create a file `name.txt` containing your first name.
2. Open it in a hex viewer:
   - Linux/Mac terminal: `xxd name.txt`
   - Windows: open in HxD.
3. Read the first two bytes in hex. Confirm they match your letter's ASCII value (references.md).
4. Note: "First byte = __ (hex) = __ (my first letter)."

---

## ✅ Checkpoint (show instructor before leaving)
- [ ] Signed ethics pledge
- [ ] First-letter → correct 8-bit binary
- [ ] Hex reading of name.txt matches ASCII

## Troubleshooting
- *xxd not found (Linux):* install `xxd` via your package manager, or use `od -A x -t x1 name.txt`.
- *Hex bytes look wrong:* check you saved the file with the exact characters (no trailing spaces/newline changes the last byte).
- *Can't find ASCII value:* references.md has A=65…Z=90, a=97…z=122.
