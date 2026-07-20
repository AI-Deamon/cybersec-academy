# Day 9 — Reference Sheet
*Keep for the course.*

- **Script = Process:** `python script.py` spawns an Employee that runs as you (same `whoami`, same permissions).
- **Python ↔ OS:** `os.listdir` / `open` call the OS; permission checks apply to the script like any Process.
- **Why Python:** cross-platform, parses text, automates the daily grind; sits above Bash/PowerShell.
- **Safe first script (stdlib only):** `import os` · `os.getcwd()` · `os.listdir('.')` · `open('file').read()` (read-only).
- **Untrusted-input seed:** scripts must validate what they read — answered Day 11/15.
- **Least privilege for scripts:** a script runs with your rights; run only code you understand.

## Further reading
- `python3` + the official Python tutorial (first pages).
- Day 10 workshop: script a small OS task. Day 11: untrusted input. Day 15: secure coding.
