# Day 9 — Version History

- **v1.0** — Initial lesson built from Course Design Document (Phase 2). The **"program interacts with the OS" lens** of the Week 2 OS signature diagram (User→Shell→OS→CPU/RAM/Disk): a Python script is an Employee/Process the OS spawns that runs as the user (same permissions), Python calls the OS (`os.listdir`/`open`) and is permission-checked identically to a person, why Python for security automation (cross-platform, parses, scales), a safe read-only first script (stdlib only; list + read own file; no writes/deletes/network), the untrusted-input seed (planted → Day 11/15), and the security bridge (script runs with your privilege; run only understood code; least privilege at scale). Uses the ONE unified Restaurant→Computer metaphor (script = junior chef with your badge). Includes safe read-only Python lab, quiz, references, rubric. Follows Day-1 7-file template + Week-1 patterns. Fourth/day-final new-concept day of Week 2; Day 10 = workshop/assignment.

## How to update
Append a new line after each review cycle or cohort:
- **v1.x** – <what changed and why>
- **v2.0** – Major redesign after N student batches
