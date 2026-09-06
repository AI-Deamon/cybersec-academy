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
- **Day 8 built + reviewed + fixes applied** — `day08/day08.md` (deck + speaker notes): framed
  as translation of Day 7 via a Linux→Windows mapping table; accounts/SIDs/SYSTEM; admin vs
  standard + UAC; NTFS ACLs (`icacls`); the registry as config store + persistence spot (Run
  keys); Services & Scheduled Tasks; **PowerShell pipes objects, not text** + it's the #1
  attacker tool; Active Directory in one slide; attack↔defence (persistence, LOLBins, LSASS
  credential theft, reused local-admin passwords, unlogged PowerShell ↔ no daily admin,
  AppLocker/WDAC, EDR, LAPS, Script Block Logging). `day08/teacher-notes.md` (SID/token/
  privilege/ACL/registry/PowerShell/AD background, the non-Windows-student options, demo
  runbook, FAQ). Hands-on interleaved (4 beats), all read-only.
  Review fixes: §6 Day 8 "Do"/analogy/environment aligned; SYSTEM > Administrator noted as a
  second trap.
- **`week2/student-pack.md`** — Day 7 and Day 8 sections + marking checklists.
- **Day 9 built + reviewed + fixes applied** — `day09/day09.md` (deck + speaker notes): a
  BUILD day. Frame = the **5 building blocks** every language shares, shown in Bash and
  Python (not a language tutorial). Bash first script → the `sweep.sh` ping sweep line by
  line → **`scanner.py` built live** (socket connect → open/closed) → Bash-vs-Python → the
  **"read the code you didn't write"** exercise (`ai_snippet.py`) → attack↔defence (automation
  is symmetric: spray/scan/exfil vs parse/detect/contain). `day09/teacher-notes.md` (Bash +
  Python essentials, the `ai_snippet.py` answer key, ping-flag portability, demo runbook for
  the live build, FAQ). `day09/assets/`: `sweep.sh`, `scanner.py`, `ai_snippet.py` (buggy —
  hardcoded external target + no timeout + leaked sockets + bare except), `hosts.txt`.
  Ethics stated: scan **only** localhost / own machine / class lab.
  Review fixes: `requests` flagged as non-stdlib (needs pip); §6 Day 9 reworked around the
  5-blocks frame; host-from-file moved to homework to protect the live build.
- **Day 10 built + reviewed + fixes applied** — `day10/day10.md` (deck + speaker notes): the
  security-thinking lens. Precise vocabulary (asset/vuln/threat/actor/exploit/risk); **risk =
  likelihood × impact, not vuln count** (the trap); threat actors & motivation; attack surface
  & trust boundaries + **the untrusted-input question**; defender's principles; threat
  modelling (4 questions + STRIDE + control types); an 18-min class threat-model exercise —
  then the **Week 2 assignment brief**. `day10/teacher-notes.md` (control taxonomies, risk
  treatment, STRIDE↔CIA, the "rank these" + worked threat-model answer keys, assignment guide).
  `day10/assets/`: `threat-model-template.md`, `weak-settings-checklist.md`.
  Review fixes: run sheet acknowledges this is a concepts day (mitigation = don't lecture,
  the exercise is the centre); added control-type taxonomy to the deck; fixed a `find`
  precedence bug in the checklist; §6 Day 10 aligned.
- **Week 2 (Days 6–10) complete** — deck + teacher-notes each; `week2/student-pack.md` has all
  five day sections and the full 4-part Week 2 weekend assignment + 15-mark checklist.
- **Day 11 built + reviewed + fixes applied** — Week 3 opens. `day11/day11.md` (deck + speaker
  notes): the "boring five" initial-access routes; social engineering & phishing (psychology +
  anatomy + SPF/DKIM/DMARC + MFA); credential attacks (brute force / spray / stuffing; reuse;
  infostealers steal MFA-bypassing cookies); malware **by behaviour not "virus"** (delivery ≠
  payload); the C2 beacon pattern; MITM/DoS/DDoS/supply chain; the **6-ways-in table**
  (indicator + control each) as the artifact; dwell time. `day11/teacher-notes.md` (DBIR-shape
  sourcing caveat, phishing/cred/malware/C2 background, both exercise answer keys, demo
  runbook). `day11/assets/`: `phish-sample.txt` (defanged, full headers), `conn-log.txt`
  (beacon + download + exfil to spot).
  Review fixes: softened the dwell-time claim to "the shape, not a stat"; Wireshark is
  instructor-projector today (students install Day 13) — students analyse a connection log;
  §6 Day 11 aligned.
- **`week3/student-pack.md` started** — Day 11 section + checklist; lab-safety note; Week 3
  assignment placeholder.
- **Day 12 built + reviewed + fixes applied** — `day12/day12.md` (deck + speaker notes): the
  penetration testing lifecycle spine. Pentest vs vuln-scan vs red-team vs bounty; the **6
  phases** + what "done" means for each; **Phase 1 as a document** — scope (in *and* out),
  ROE, signed authorization ("no scope, no test" as a checklist); the reporting mindset (a
  finding = risk + evidence + repro + fix); the **Engagement Journal**; the Blue-team mirror
  (Cyber Kill Chain / MITRE ATT&CK — "one map, opposite ends"); the **lab-connect gate**.
  `day12/teacher-notes.md` (lab-gate logistics, PTES/OSSTMM/NIST names, phase "done"
  criteria, ROE contents, ATT&CK detail, FAQ). `day12/assets/`: `roe-template.md` (a real
  ROE, `<LAB_HOST>` placeholders), `engagement-journal-template.md` (6-phase, becomes the
  Day 15 report), `lab-connect-checklist.md` (Path A own-VM / Path B shared-Kali).
  Review fixes: §6 Day 12 flags the lab host as a blocking pre-req (design §11 open item) and
  notes the "Northwind Traders" naming reuse; Wireshark stays Day 13.
- **`week3/student-pack.md`** — Day 12 section + marking checklist.
- **Day 13 built + reviewed + fixes applied** — `day13/day13.md` (deck + speaker notes):
  recon & scanning (lifecycle phases 2–3). Passive-before-active + why; OSINT sources (DNS,
  Certificate Transparency / crt.sh, dorks, job ads, LinkedIn, Shodan, GitHub, HIBP, Wayback);
  the active sequence; **Nmap in depth** (`-sn`, states open/closed/filtered, `-sV`, `-sC`,
  `-p-`/`--top-ports`, `-Pn`, `-T`, `-oA`); turning scan output into a **service inventory**;
  **watch the scan in Wireshark** (SYN burst / SYN-ACK vs RST / `-sV` probes — the Blue-team
  bridge); attack↔defence (enumeration ↔ IDS signatures, anomaly detection, honeypots,
  attack-surface reduction). `day13/teacher-notes.md` (full OSINT + Nmap reference, the
  on-the-wire packet breakdown, both answer keys, demo runbook). `day13/assets/`:
  `passive-recon-worksheet.md`, `sample-nmap.txt` (with answer key in teacher-notes).
  Ethics: passive only on the permitted domain; active only on `<LAB_HOST>` or `scanme.nmap.org`.
  Review fixes: `dig ANY` → per-record-type queries (ANY is refused by most resolvers now);
  §6 Day 13 aligned.
- **`week3/student-pack.md`** — Day 13 section + marking checklist.
- **Day 14 built + reviewed + fixes applied** — `day14/day14.md` (deck + speaker notes):
  vulnerability assessment — *triage is the skill, not scanning*. The pipeline (version → CVE
  → CVSS + exploitable? → business context → ranked list); CVE/NVD/CPE + vendor advisories +
  distro backports; **reading a CVSS vector** (AV/AC/PR/UI/C/I/A) and why the number isn't
  risk; **the exploitability question** (CISA KEV > searchsploit/Exploit-DB/Metasploit >
  EPSS > a bare score) with the priority-inversion example; running `nmap --script vuln` +
  `searchsploit` and spotting false positives; **scan → ranked findings table**; the report
  trap ("more findings ≠ better report"); vuln-management program + compensating controls.
  `day14/teacher-notes.md` (CVE/NVD/CVSS/KEV/EPSS/scanner background, both answer keys, demo
  runbook). `day14/assets/`: `sample-vulnscan.txt` (Metasploitable-style output, answer key
  in teacher-notes), `findings-table-template.md` (= Week 3 assignment Part A).
  Review fixes: stopped asserting KEV membership in the exercise for CVEs I can't verify live
  (students check KEV themselves); §6 Day 14 aligned.
- **`week3/student-pack.md`** — Day 14 section + marking checklist.
- **Day 15 built + reviewed** — `day15/day15.md` (deck + speaker notes): the **practice day**
  — instructor talks ~20 min, circulates for the rest. The one-page playbook → a worked
  mini-example (nmap → vsftpd 2.3.4 → Metasploit → `id` = proof) → a **coached team run**
  (assigned mixed targets, goal = one proven finding: shell / extracted data / bypass —
  checkpoints at 15/30/40 min) → each student writes a **2-page mini report** → the **Week 3
  assignment brief**. `day15/teacher-notes.md` (session shape, **easy-win module list per
  target** for stuck teams — Metasploitable2 / DVWA / Juice Shop, coaching notes for common
  blockers, write-up bar, assignment guide). `day15/assets/`: `one-page-playbook.md`,
  `mini-report-template.md`.
  Safety: exploitation is coached and limited to one proof; assigned target only; snapshot
  first; deep exploitation is Days 16–17.
- **Week 3 (Days 11–15) complete** — decks + teacher-notes each; `week3/student-pack.md` has
  all five day sections + the full 4-part Week 3 weekend assignment (solo mini-engagement +
  deep CVE explainer) + 15-mark checklist.
- **Day 16 built + reviewed + fixes applied** — Week 4 opens. `day16/day16.md` (deck + speaker
  notes): the most hands-on day. The web-app model + tools (DevTools / Burp 2-min version);
  the OWASP Top 10 2021 shape; **injection/SQLi** (concat mechanism → data becomes code;
  login bypass, UNION, blind; **fix = parameterized queries, not filtering**); **XSS**
  (reflected/stored/DOM; steals the session cookie; fix = output encoding + CSP + HttpOnly);
  **broken access control / IDOR** (authn ≠ authz; fix = server-side authorization per
  request); broken auth/session + SSRF (→ cloud metadata, feeds Day 17); the one pattern
  (untrusted input → powerful sink, no boundary check) + "a WAF is a layer, the code is the
  fix"; the **"blocklist doesn't fix injection"** trap. `day16/teacher-notes.md` (SQLi/XSS/
  IDOR/auth/SSRF background, the `vuln-code.md` answer key, per-target demo runbook for
  DVWA/Juice Shop, FAQ). `day16/assets/`: `vuln-code.md` (secure-coding intro — 2 snippets to
  fix), `web-vulns-template.md` (the find/prove/fix artifact).
  Review fixes: added a 3-min IDOR "try it now" (design §6 calls for it hands-on); noted the
  OWASP 2025 revision in progress; §6 Day 16 aligned + Burp/secure-coding intro folded in.
- **`week4/student-pack.md` started** — Day 16 section + checklist; capstone placeholder.
- **Day 17 built + reviewed + fixes applied** — `day17/day17.md` (deck + speaker notes; runs
  hot — two disciplines). Post-exploitation: what a shell is; **privilege escalation** (the
  "something powerful trusts something you control" pattern — Linux SUID/sudo/cron/caps,
  Windows unquoted-path/tokens) with a guided linpeas → root DO on Metasploitable2;
  persistence / lateral movement (pass-the-hash) / pivoting; **the attack chain with a
  detection opportunity at every step** (the Red→Blue bridge). Infrastructure: segmentation
  (flat = fatal), egress filtering, IDS/IPS, VPN as a trust grant, bastion hosts. Cloud:
  **shared responsibility** (identity + data + config are always the customer's); the two
  classic failures (public bucket `Principal:*`, over-broad IAM `Action:*` → SSRF→IMDS→creds
  takeover, Day 16 callback) with a policy-fix DO. `day17/teacher-notes.md` (full Linux +
  Windows priv-esc / persistence / lateral / pivot / infra / cloud background, both policy
  answer keys, Metasploitable2 root paths, demo runbook). `day17/assets/`: `bad-policy.json`,
  `bad-bucket-policy.json` (both with tasks; answer keys in teacher-notes),
  `attack-chain-template.md` (the artifact).
  Review fixes: added the "runs hot / pick cuts in advance" note; §6 Day 17 aligned; the
  chmod-777 ↔ cloud-least-privilege through-line made explicit.
- **`week4/student-pack.md`** — Day 17 section + marking checklist.
- **Day 18 built + reviewed + fixes applied** — `day18/day18.md` (deck + speaker notes;
  highest-engagement day). **The core idea:** an LLM has no boundary between instructions and
  data — one text channel — so prompt injection is *hard, not a bug to patch* (Day 10, all in
  one channel). AI as **target** (direct vs **indirect** prompt injection — indirect + tools
  is the real threat; jailbreaks; model poisoning; **improper output handling** = Day 16 new
  source; excessive agency; the OWASP LLM Top 10 shape); AI as **weapon** (phishing at scale,
  deepfakes — the $25M case, malware assistance); AI as **defender's tool** (SOC copilots,
  anomaly detection, code review); **governance** (shadow AI — the Samsung case,
  human-in-the-loop, logging). The mitigation-layers table ("no perfect fix"). Both traps
  (prompt injection ≠ jailbreaking; AI changes jobs, doesn't remove them). `day18/teacher-
  notes.md` (why injection is architecturally hard, direct/indirect/jailbreak background, the
  OWASP LLM Top 10 2025 list, the **Gandalf level-by-level guide**, demo runbook). `day18/
  assets/`: `ai-attacks-template.md` (the artifact + technique log), `indirect-injection-demo.md`
  (a paper email-assistant exfil scenario + "fix it at two layers" task — the no-tooling fallback).
  Do: **Gandalf** (gandalf.lakera.ai). Ethics: public CTF only; never paste real data into a public LLM.
  Review fix: aligned "improper/insecure output handling" to the 2025 OWASP name; §6 Day 18 aligned.
- **`week4/student-pack.md`** — Day 18 section + marking checklist.
- **Day 19 built + reviewed + fixes applied** — `day19/day19.md` (deck + speaker notes): the
  defensive payoff of the whole course. Prevention fails → detect/respond/learn (MTTD/MTTR);
  **logs are ground truth** (5 source types); the SIEM concept ("no tuned rules = just
  storage"; alert fatigue); **IOC vs TTP** + the Pyramid of Pain (detect behaviours); Windows/
  AD event IDs a SOC watches; the **IR lifecycle** (Prepare is 90%); containment done right
  ("isolate, don't obliterate" — the pull-the-plug trap); chain of custody. The
  "attack↔defence — the whole course, one table" payoff slide. `day19/teacher-notes.md`
  (log-source / SIEM / Pyramid / event-ID / IR-lifecycle / containment background, the full
  **log-bundle answer key** with timeline + ATT&CK mapping + root cause, tabletop facilitation
  guide). `day19/assets/`: `logs/` (auth.log + web-access.log + network-notes.txt — one
  intrusion: SSH brute force → web shell → cron persistence → internal scan → 1.4 GB exfil,
  using RFC 5737 doc IPs), `timeline-template.md`, `ir-runbook-template.md`.
  Do: analyse the log bundle → IOCs + timeline + containment step; then a 15-min ransomware
  tabletop. Review: facts verified (event IDs, NIST 800-61, Pyramid of Pain, ATT&CK IDs);
  §6 Day 19 aligned.
- **`week4/student-pack.md`** — Day 19 section + marking checklist.
- **Day 20 built + reviewed — the last lesson; the course is complete.** `day20/day20.md`
  (deck + speaker notes): the map of the field (Red / Blue / the wings — different
  temperaments, not a hierarchy); **what each role's day actually looks like** (Red: pentest
  is ~40% writing, AppSec, bug bounty, exploit dev; Blue: SOC L1 = the biggest India entry
  door, DFIR, detection engineering, threat intel, security engineering; the wings: GRC is
  *real* security, cloud security, AI/ML security); the **skills self-assessment** DO;
  **the Indian fresher market** honestly (the "2 years for a junior role" catch-22 and how the
  portfolio + a cert + BE/BTech breaks it; internships from month 2); **certs as an HR filter,
  not a qualification** (Security+ → BTL1 → CySA+; eJPT → PNPT/CPTS → OSCP; CISSP needs ~5
  years — not a fresher cert); the **"which door + why + 3 next steps"** DO + pitches;
  finalising the **portfolio repo README**; the **capstone brief**; the course in three lines
  (untrusted input · least privilege + assume breach · you learn it by doing it).
  `day20/teacher-notes.md` (framing notes to say aloud, the two DOs, the capstone guide, the
  course's Definition of Success, a closing script, FAQ). `day20/assets/`:
  `skills-self-assessment.md`, `roadmap-template.md` (6-month), `portfolio-readme-template.md`,
  `roles-reference.md` (every role — day-to-day / what to learn / the way in, India-focused).
- **Week 4 (Days 16–20) complete** — decks + teacher-notes each; `week4/student-pack.md` has
  all five day sections + the **full 4-part capstone** (cross-domain engagement + incident
  writeup + career roadmap + final reflection) + 25-mark checklist.
- **ALL 20 LESSONS BUILT + REVIEWED.** 20 Marp decks (+ `.pptx`/`.html`), 20 `teacher-notes.md`,
  4 weekly student packs with weekend assignments + rubrics, a design doc, and per-day assets.
  Open before teaching: the lab host/reachability decision (§7); the instructor's Day 1–2
  prep-routine trial (§11); governance adoption (§11).
