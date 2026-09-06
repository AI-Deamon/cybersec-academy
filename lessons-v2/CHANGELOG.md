# Changelog — Practical Cyber Security (v2)

Fresh 20-day course line. Design: `docs/superpowers/specs/2026-09-06-20day-course-redesign-design.md`.
This is a clean-sheet rebuild — it does **not** modify the frozen v1 under `lessons/`.

Per-day artifacts: `dayNN/dayNN.md` (+ `.pptx`) · `dayNN/teacher-notes.md` · `dayNN/assets/`.
Per-week: `weekN/student-pack.md`. Topic-specific PDF handouts added only when a topic warrants a keeper reference.

---

## 2026-09-06

- **Design doc** committed (`2026-09-06-20day-course-redesign-design.md`): 20-day map, deep
  per-day plan, lab architecture, night-before prep routine, teaching standards, weekly
  assignment standard.
- **Day 1 built** — `day01/day01.md` (deck + speaker notes), `day01/teacher-notes.md`,
  `day01/handout.md` (Authorization & the Law one-pager, → PDF).
- **Week 1 student pack started** — `week1/student-pack.md` with the Day 1 section and the
  Week 1 weekend assignment.
- Structure decision: lean per-day set (deck + teacher-notes + assets), weekly student pack,
  no per-day quiz/rubric/version-history files (exit check lives in teacher-notes; grading is
  weekly; this changelog replaces per-day version history).
- **Day 2 built** — `day02/day02.md` (deck + speaker notes: CPU/RAM/disk, program vs process,
  source→process pipeline, the OS as referee, user/kernel mode, the "bug becomes control"
  seed, hands-on with htop/Task Manager), `day02/teacher-notes.md`, `day02/assets/crash.py`
  (segfault-containment demo). Week 1 student pack: Day 2 section added.
- **Days 1 & 2 reviewed (expert + teacher lens) and fixes applied:**
  - Day 1: course repo setup moved from in-class to homework (step-by-step in the student
    pack); "five events" trimmed to three told as stories (Morris, Mitnick, WannaCry); new
    60-second "where this leads" slide (Red/Blue/wings + demand) for early motivation;
    trailer defaults to the recording on Day 1; run sheet rebuilt with ~5 min slack.
  - Day 2: enforced the one-analogy rule (kitchen only — the bank analogy for user/kernel
    mode is gone); moved "why a bug becomes control" to right after program-vs-process and
    gave it ~12 min; cut the code/data/heap/stack slide (return-address idea now inline on
    the overflow slide); `crash.py` is instructor-only on the Linux projector (Windows
    surfaces it as a catchable OSError).
  - Design doc: "files" moved from Day 2 to Day 6 (§5/§6); §11 rewritten as the production
    process incl. the per-day review pass.
- **Day 3 built + reviewed + fixes applied** — `day03/day03.md` (deck + speaker notes:
  IP/MAC/port, private vs public IP + NAT, the packet as nested envelopes, the 4-layer model,
  routing, attack↔defence ARP-spoof/scanning/sniffing), `day03/teacher-notes.md`.
  Review fixes: hands-on **interleaved** as four short "do it now" beats instead of one block
  at the end (≈52 min of addressing theory otherwise loses beginners); added the missing
  client/server must-land; sanctioned the kitchen→postal→phone analogy arc in design doc §9.
- **Day 4 built + reviewed + fixes applied** — `day04/day04.md` (deck + speaker notes: the
  DNS→TCP→TLS→HTTP chain, DNS resolution, the 3-way handshake, what TLS does and does NOT
  give, HTTP request/response/status codes, the session cookie, attack↔defence DNS-spoof /
  MITM / cookie theft / look-alike), `day04/teacher-notes.md`, `day04/assets/http_by_hand.ps1`
  (Windows "HTTP by hand"). Keystone day; hands-on interleaved (dig / curl -v / netcat / DevTools).
  Review fixes: removed hardcoded stale IPs (example.com/github.com moved); chain aligned to
  **7 steps** to match the assignment; run sheet retimed to ~84 min with an explicit
  "this day runs hot — pick cuts in advance" warning; softened an unsourced phishing-HTTPS stat.
- **Day 5 built + reviewed + fixes applied** — `day05/day05.md` (deck + speaker notes: the 3
  jobs of crypto, symmetric vs asymmetric + key exchange, hashing ≠ encryption + avalanche,
  password storage done right, signatures + the 4-step TLS handshake, attack↔defence + "don't
  roll your own") + the **Week 1 assignment brief** as the final block. `day05/teacher-notes.md`.
  `day05/assets/`: `crack.py` (stdlib dictionary attack — MD5 falls instantly, salted+slow
  pbkdf2 grinds the whole list and misses), `make_targets.py`, `wordlist.txt`, `hashes.txt`.
  Review fixes: crypto analogy sanctioned in §9 (postal extension — locks/seals); crack
  exercise uses stdlib pbkdf2 as the "slow hash" so there's no install (real hashcat/john on
  the class Kali); "no Python yet?" fallback to projector/Kali noted.
- **Week 1 (Days 1–5) complete** — deck + teacher-notes for each, `week1/student-pack.md` with
  all five day sections and the 4-part weekend assignment + checklist rubric.
- **Day 6 built + reviewed + fixes applied** — Week 2 opens. `day06/day06.md` (deck + speaker
  notes: what a file is, the filesystem tree + paths, the shell demystified, reading files
  (`cat`/`less`/`head`/`tail`/`wc`), `find` vs `grep`, pipes & redirection, attack↔defence =
  "post-shell an intruder maps the box with exactly these commands"). `day06/teacher-notes.md`
  with the **Linux-shell prerequisite** (WSL / VM / class box, set up as Day 5 homework),
  `day06/assets/linux-cheatsheet-template.md`. Hands-on interleaved (4 beats).
  Review fixes: design doc §7 now states Days 6–10 need a plain Linux shell *before* the Day 12
  target lab; §6 Day 6 aligned; kitchen analogy reaffirmed for the OS week.
- **`week2/student-pack.md` started** — Day 6 section + Day 6 marking checklist + the Week 2
  prerequisite; Week 2 assignment placeholder.
- **Day 7 built + reviewed + fixes applied** — `day07/day07.md` (deck + speaker notes: the
  permission triple + reading `rwx`; owner/group/other; `chmod` symbolic & numeric + `chown`;
  `/etc/passwd`/`/etc/shadow`/`/etc/group`; root vs `sudo`; processes/services run *as a
  user*; `cron`; **privilege escalation as a concept** — SUID / writable trusted script /
  sudo misconfig / PATH hijack, each with its fix; attack↔defence incl. the `chmod 777` trap).
  `day07/teacher-notes.md` (key-cabinet analogy, permission-bit + priv-esc background, demo
  runbook incl. "student is root" recovery, checkpoint, FAQ). Hands-on interleaved (4 beats).
  Review fixes: §9 adds "permissions = the key cabinet" to the kitchen analogy; §6 Day 7 "Do"
  corrected (cron is taught, not a hands-on beat; priv-esc concept-only, hands-on is Day 17);
  added RHEL sudo-log path + the "hook didn't deny → you're root" teachable moment.
