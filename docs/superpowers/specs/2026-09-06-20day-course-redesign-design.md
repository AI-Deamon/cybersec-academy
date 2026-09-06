# Design — 20-Day "Practical Cyber Security" Full Redesign (v2, fresh)

**Date:** 2026-09-06
**Status:** DRAFT — awaiting owner review. Not yet governing. Does **not** amend the ADD or
the existing `Course-Design-Document-20day.md` until explicitly approved and adopted.
**Owner:** course instructor (166.7b11@gmail.com)
**Supersedes on adoption:** the 20-day blueprint in `Course-Design-Document-20day.md`
(a clean-sheet rebuild, not an edit of the frozen v1).

---

## 1. Why this redesign exists

The instructor's stated problems with the current run:

1. **Inconsistent delivery** — topics get forgotten mid-class; explanations vary session to session.
2. **On-demand prep** — each class is built last-minute, which is exhausting and unsustainable.
3. **Half-formed explanations** on topics the instructor doesn't know cold — the worst-feeling failure mode.
4. **Demos that fail live** — when a demo misbehaves, the instructor loses footing and the room loses the thread and their interest.

The current v1 design is not a teach-from artifact and does not solve any of the above.
This redesign delivers **three things**:

- **A) A fresh 20-day topic map** for a zero-background cohort, built from real course syllabi.
- **B) A fixed night-before prep routine** that turns a day's topic list into a confident teach-from plan with demo fallbacks.
- **C) Course-wide teaching standards** (what not to teach, the daily ritual, the weekly assignment shape, the lab architecture).

---

## 2. Audience & goal

- **Audience:** 2nd-year engineering students (Indian college), **zero background in tech or
  cyber security** assumed. Some can program, some barely — a split-level room.
- **End goal (unchanged from v1):** the student finishes with a clear picture of what cyber
  security is and a clear, personal choice of direction — **Red team, Blue team, or a wing
  (GRC / cloud / AppSec / AI security)** — with every basic covered to take the next step.
- **Evidence base:** July 2026 survey (18 responses, after Day 7). No rating below 3/5. The
  single dominant request, by a wide margin, was **more practical / hands-on / real-world work**
  (≥7 of 18). This redesign is built around that finding.

---

## 3. The fixed shell (constraints)

- **20 teaching days**, ~90 minutes each.
- **5 classes/week (Mon–Fri), 4 weeks.**
- **All 20 days teach new content** — including the former workshop days (5, 10, 15, 20),
  which now teach a relevant topic and close with a ~15-minute weekend-assignment briefing.
- **Weekly assignment** completed over the weekend, submitted before the next Monday.
- Realistic in-class budget after journey check + review + demo setup + Q&A: **~50 minutes of
  new content.** The map is topic-complete but time-tight; per-day "must-teach vs nice-to-have"
  lines are enforced by the prep routine (§8).

---

## 4. Decisions made during design

| Question | Decision | Rationale |
|---|---|---|
| Base | **Clean-sheet.** No reference to v1 content. | Owner's call; v1 not to standard. |
| Linux | **2 days** (Days 6–7). | Load-bearing for Days 11–20; one day guarantees a wobbly back half. |
| Where the Linux slot comes from | Merge Bash + Python into **one scripting day** (Day 9); fold **cloud** into infrastructure (Day 17). | Beginners won't go deep in either scripting language in 20 days; cloud *is* infrastructure security. |
| AI security | **Its own day** (Day 18). | Highest-engagement topic for this cohort; where the field is moving (ISC2 CC integrated AI across all 5 domains in 2026; OWASP LLM Top 10 exists). |
| Practice day | **Day 15** — run the full lifecycle on a target, coached. | Directly answers the survey's "more practical" signal. |
| Lab environment | **Central targets + per-student attack box** (see §7). | Laptop-based VM labs are where cohorts bleed out; centralizing targets removes ~80% of setup failures. |
| Networking model | Teach a **4-layer practical model**; mention OSI-7 once and drop it. | Rote OSI memorization is low-value for beginners. |
| Ethics/law framing | **Indian IT Act (§43, §66)** + written scope, not a generic pledge. | Concrete and locally relevant. |
| Career framing | Anchored in the **real Indian entry market** (SOC hiring volume, VAPT consultancies, bug bounty, product security). | Course goal is a real next step, not abstract awareness. |

### Sources consulted for the topic map
- Google Cybersecurity Professional Certificate — 8 courses
  (https://www.coursera.org/professional-certificates/google-cybersecurity)
- TryHackMe "Cyber Security 101" path — 14 modules
  (https://tryhackme.com/path/outline/cybersecurity101)
- ISC2 Certified in Cybersecurity — 5 domains
  (https://www.isc2.org/certifications/cc/cc-certification-exam-outline)
- SANS SEC301: Introduction to Cyber Security
  (https://www.sans.org/cyber-security-courses/introduction-cyber-security)
- Typical university/bootcamp beginner syllabi
  (https://www.coursereport.com/best-cyber-security-bootcamps)

They converge on the progression this map follows: **computer → network → OS/CLI → security
concepts → attack process → defense → career fork.**

---

## 5. The 20-day map

### Week 1 — How computers and networks actually work
*"Here is the machine and the network, made visible." Nothing offensive yet — build the substrate.*

| Day | Topic |
|-----|-------|
| 1 | Cyber security, ethics & law (IT Act §43/66), the CIA triad, how this course works |
| 2 | Inside a computer — hardware (CPU/RAM/disk), program vs process, the OS as referee, how a program runs (data → instructions), why a bug becomes control |
| 3 | Networks I — devices, IP & MAC, LAN/WAN, routers, packets, ports (4-layer model) |
| 4 | Networks II — TCP/UDP, DNS, HTTP/HTTPS, TLS, the full page-load chain *(keystone day)* |
| 5 | Cryptography — encryption vs hashing, symmetric vs asymmetric, TLS, certificates · **+ Week 1 brief** |

### Week 2 — Operating systems, command line, scripting
*Same lens throughout: "who can do what" — the access-control question at the center of security.*

| Day | Topic |
|-----|-------|
| 6 | Linux I — what a file is, the filesystem tree, the shell, navigating, reading, pipes & `grep` (Day 2 defers "files" here) |
| 7 | Linux II — users, groups, permissions, `sudo`, processes, services, cron |
| 8 | Windows — accounts, tokens, NTFS ACLs, services, registry, PowerShell, what AD is (1 slide) |
| 9 | Scripting for security — one Bash script + Python essentials (they build a ~20-line scanner) |
| 10 | Security thinking — threat/vuln/risk/exploit, threat actors, attack surface, defense-in-depth, least privilege, AAA · **+ Week 2 brief** |

### Week 3 — The penetration testing lifecycle
*"Here is how an attacker sizes you up and gets in — as a repeatable process." The lifecycle is the spine.*

| Day | Topic |
|-----|-------|
| 11 | Attacks & malware — phishing/social engineering, malware families, credential attacks, MITM, DoS — each with its indicator + control |
| 12 | The pentest lifecycle + stand up the lab — the 5–6 phases, scope, authorization, ROE |
| 13 | Recon & scanning — passive OSINT, then Nmap deeply, Wireshark to see the scan on the wire |
| 14 | Vulnerability assessment — service → CVE → CVSS → public exploit? → ranked list (triage is the skill) |
| 15 | Practice day — teams run recon → scan → find a vuln → get proof → write it up, coached · **+ Week 3 brief** |

### Week 4 — Post-exploitation, defense, AI, and the fork
*"What they do next, how defenders catch them, the AI frontier, and your door."*

| Day | Topic |
|-----|-------|
| 16 | Web exploitation — OWASP Top 10 shape; drill SQLi, XSS, IDOR/broken access control, broken auth — find / prove / fix |
| 17 | Post-exploitation + infrastructure & cloud — shells, privilege escalation, persistence, pivoting; then segmentation, firewalls, IDS/IPS, VPN, cloud shared responsibility & misconfig |
| 18 | AI & cyber security — AI as target (prompt injection, OWASP LLM Top 10), as weapon (deepfakes, phishing at scale), as defender's tool (SOC copilots) |
| 19 | Blue team — logs as ground truth, SIEM, detection, the incident response lifecycle, IOCs vs TTPs, a walked-through incident + a tabletop |
| 20 | Careers & specialization — Red / Blue / GRC / AppSec / Cloud / DFIR / AI-sec; the Indian market; cert ladders; portfolio · **+ capstone brief** |

---

## 6. Deep per-day plan

Each day: **one core idea · what must land · the hands-on · attack ↔ defense · the artifact · a trap to preempt.**
The artifact is committed to each student's Git repo; by Day 20 the repo **is** their portfolio.

### Week 1

**Day 1 — What security is + a short history + ethics + the trailer**
- **Core idea:** an attacker needs one way in; a defender must cover all of them (asymmetry).
- **Must land:** where "hacker" came from (MIT, 1960s — a "hack" = an ingenious, playful fix) and why the community coined "cracker" (~1985) for the malicious kind; white / black / grey hats as the bridge to the law; a 60-second "where this leads" (Red / Blue / wings, real entry-level demand); three events told as stories (1988 Morris Worm → first CFAA felony; 1990s Mitnick → social engineering, prison → consultant — skills are neutral; 2017 WannaCry → ransomware goes global). Then: CIA triad with a real example per letter; the authorization line (IT Act §43 civil / §66 criminal, written scope); "hacking = understanding a system better than the person who built it."
- **Do:** sign the scope/ethics agreement; in pairs, take a real breach and classify which of C/I/A failed and whether the actor was authorized or committing a crime. **Repo setup is homework, not a class activity** (account creation with 30 beginners blows the lesson).
- **Trailer demo:** cleartext HTTP login captured on the projector. **Day 1: play the recording** — first impression, don't gamble on a live capture. "By Day 15 you do this yourself — and you'll know why HTTPS stops it."
- **Attack ↔ Defense:** n/a — the trailer frames the whole course.
- **Artifact:** repo + README ("why I'm here" + the authorization pledge) — produced as homework, checked Day 2.
- **Trap:** "hackers are geniuses / it's illegal to even learn this." No — it's method + authorization.

**Day 2 — Inside the box: how a program runs**
- **Core idea:** a program is instructions the CPU runs in order; an exploit makes it run attacker-chosen instructions or skip a check.
- **Must land:** CPU / RAM / disk; **program vs process** (+ PID); source → executable → process; the OS as referee (scheduling, memory isolation, hardware guard); user vs kernel mode + system calls; **why a bug becomes control** — instructions and data share RAM, overflow the "where to go back" value and the attacker picks the next instruction (a crash bug and RCE are usually the same bug). Taught *right after* program-vs-process, while the room is fresh — ~12 min.
- **Do:** `htop` / Task Manager — find a process, PID, memory; watch memory grow; kill by PID. Instructor-only on the Linux projector: `crash.py` (address-0 read) → the OS contains one misbehaving process.
- **Attack ↔ Defense:** memory corruption → control-flow hijack (conceptual only) ↔ stack canary, DEP/NX, ASLR; plus OS process isolation and user-mode limits.
- **Artifact:** a diagram: source → compiled → loaded → running process (label CPU/RAM/disk).
- **One analogy:** the kitchen — chef=CPU, counter=RAM, pantry=disk, head chef on the pass=OS, walk-in freezer=kernel mode. No second analogy.
- **Trap:** "RAM and disk are the same thing" / "closing the window closes the program."

**Day 3 — Networking that matters**
- **Core idea:** machines find each other by IP, deliver on the local wire by MAC, and multiplex services by port. The rest is detail.
- **Must land:** private vs public IP + NAT; MAC is local-only; port = which service; client/server request–response; the 4-layer model.
- **Do (interleaved as four "do it now" beats, ~15 min):** `ip a` / `ipconfig` — find your IP + gateway, then your MAC; `ss -tlnp` / `netstat` — what's listening on your own box; `ping` gateway vs `1.1.1.1` + `traceroute`.
- **Attack ↔ Defense:** ARP spoofing, port scanning, sniffing (Day 1 callback) ↔ segmentation, switch port security, close unused ports, and "assume the network is hostile → encrypt end to end" (the bridge to Day 4).
- **Artifact:** a diagram of their own home network (device → router → ISP) with real addresses.
- **Analogy:** sanctioned extension of the kitchen → the postal / delivery system (see §9).
- **Trap:** "my IP is whatever whatsmyip.com says" — that's the NAT/public IP, not the laptop's.

**Day 4 — How a web page actually loads (keystone)**
- **Core idea:** a page load is a chain — **DNS → TCP → TLS → HTTP** (that order). Every web attack lives somewhere on that chain.
- **Runs hot:** ~2 days of material in one; run sheet fits ~84 min only with disciplined sections; cuts picked in advance (see `teacher-notes.md`).
- **Must land:** DNS resolution steps; TCP 3-way handshake (+ UDP contrast); HTTP method/path/headers/body + status codes; the session cookie = as good as the password; what TLS gives (confidentiality + integrity + server identity) and what it does **not** (a trustworthy server, a secure app, safety at rest).
- **Do (interleaved, 4 beats):** `dig`/`nslookup` a domain; `curl -v` and read the connect/handshake/request lines; hand-craft an HTTP GET (netcat / `http_by_hand.ps1`) against plain HTTP; **DevTools → Network on a real login** (the payoff).
- **Attack ↔ Defense:** MITM on plaintext HTTP, DNS spoofing, session-cookie theft ↔ HTTPS everywhere, HSTS, Secure/HttpOnly cookies, DoH/DNSSEC.
- **Artifact:** the 7-step "what happens when I load a site" writeup — **Week 1 assignment Part A seed.**
- **Trap:** "HTTPS means the site is safe" — it means the pipe is private.

**Day 5 — Cryptography for practitioners** *(+ Week 1 assignment brief, last ~16 min)*
- **Core idea:** crypto gives three things — secrecy (encryption), tamper-evidence (hashing/MAC), identity (signatures/certs). You compose them; you never invent them.
- **Must land:** symmetric vs asymmetric (and why asymmetric solves key exchange); hash ≠ encryption (one-way, no key); salting; a certificate = a CA's signature binding a public key to a name; TLS handshake in 4 steps.
- **Do (interleaved):** inspect a real certificate chain in the browser; `sha256sum` a file + flip one byte; **crack hashes with `crack.py`** — stdlib dictionary attack; 3 unsalted MD5s fall instantly, one misses, a salted+slow (pbkdf2) hash grinds the whole list and finds nothing. Real `hashcat`/`john` + `rockyou` live on the class Kali for the keen.
- **Attack ↔ Defense:** offline hash cracking, rainbow tables, weak ciphers, cert spoofing ↔ bcrypt/argon2 + salt, strong TLS config, cert pinning, "don't roll your own."
- **Artifact:** a table — the 5 primitives (symmetric enc / asymmetric enc / hash / salted-slow-hash / signature-cert), what each is for, one real use.
- **Analogy:** postal extension — locks and seals on the mail (see §9).
- **Trap:** "we encrypt passwords in the database" — you *hash* them, salted and slow.

### Week 2

**Day 6 — Linux I: files, the tree, moving and reading**
- **Prereq:** every student at a Linux shell (WSL / provided VM / class box) — see §7.
- **Core idea:** on Linux everything is a file, and the shell composes small tools into big results.
- **Must land:** what a file is (named bytes, no extension needed); FS hierarchy (`/`, `/etc`, `/home`, `/var/log`, `/tmp`); absolute vs relative paths (`.` `..` `~`); `ls -la`, `cd`, `cat`, `less`, `find`, `grep`; the pipe `|`; `man` / `--help`.
- **Do (interleaved, 4 beats):** orient (`pwd`/`ls`/`cd`); read real files (`cat`/`less`/`wc` on `/etc/*`); `find` + `grep` (locate the ssh config, grep a setting); build a one-liner with `|` and `cut`.
- **Attack ↔ Defense:** post-shell an intruder maps the box with exactly these commands; `grep -r` for secrets, shell history for typed passwords ↔ least privilege on files (Day 7), no secrets in files/history, logs shipped off-box.
- **Artifact:** a personal `linux-cheatsheet.md` — 15 commands, one line each (template in `assets/`).
- **Analogy:** back to the kitchen — filesystem = the building's storage as one tree from `/`; shell = the order pad.
- **Trap:** "the GUI and the terminal are different systems"; "a file needs an extension"; fear of `rm`.

**Day 7 — Linux II: who can do what**
- **Core idea:** Linux security is the permission triple (user/group/other × r/w/x) plus "become another user" (`sudo`/`su`). Privilege escalation is finding a crack in that.
- **Must land:** read `rwxr-xr--`; `chmod` (symbolic + numeric) / `chown`; `/etc/passwd` + `/etc/shadow` + groups + root (uid 0); `sudo` (borrow root for one logged command) vs living as root; processes/services each run *as a user*; `cron` = scheduled jobs. Privilege escalation is **concept only** today (hands-on is Day 17).
- **Do (interleaved, 4 beats):** read real permission lines (`ls -l /etc/passwd /etc/shadow`, `id`); break perms (`chmod 000`) then fix, and `chmod +x` a script; `sudo -l` + `sudo cat /etc/shadow` vs denied; `find / -perm -4000` for SUID. (`cron` is taught, not a hands-on beat — `crontab -e` opens an editor and eats time.)
- **Attack ↔ Defense:** `chmod 777`, SUID abuse, writable cron/trusted script, sudo misconfig, PATH hijack ↔ least-privilege modes, minimal SUID, root-owned non-writable scripts, tight sudoers, services as dedicated users.
- **Artifact:** "3 ways a low-privilege Linux user could become root, and the fix for each."
- **Analogy:** the key cabinet (kitchen extension — see §9).
- **Trap:** "`chmod 777` fixes permission errors" — it's a vulnerability, never a fix; "`+x` runs it" (no — it *permits* running).

**Day 8 — Windows: same questions, different machine**
- **Core idea:** Windows asks the same "who can do what" but answers with tokens, SIDs, ACLs, and the registry — and most orgs centralize it with Active Directory.
- **Must land:** local users/groups, UAC and admin vs standard, NTFS ACLs, services, the registry as a config store **and** a persistence spot, PowerShell as the real admin/attack surface; AD in one line (central identity + policy).
- **Do (interleaved, 4 beats):** `whoami /priv` + `/groups` + `Get-LocalUser`; `icacls` on the hosts file + `$HOME`; `Get-ItemProperty` on both Run keys; a 3-line `Get-Process | Sort-Object | Select` object pipeline.
- **Attack ↔ Defense:** Run-key/Scheduled-Task/Service persistence, LOLBins, LSASS credential theft, reused local admin passwords, unlogged PowerShell ↔ no daily admin, application allowlisting (AppLocker/WDAC), EDR, LAPS, PowerShell Script Block Logging + CLM + AMSI.
- **Artifact:** a "same task, Linux vs Windows command" table for 5 tasks.
- **Analogy:** the key cabinet again, more detailed — ID badges (tokens/SIDs), a full guest-list per door (ACL), the registry = the master settings binder, AD = one HR dept for every building.
- **Environment:** most students are on Windows (native); mac/Linux students pair / RDP the shared Windows box / follow the projector. All commands read-only.
- **Trap:** "PowerShell is CMD with colours" — it's an object pipeline and a primary attack surface. "Administrator is the top" — SYSTEM is higher.

**Day 9 — Scripting for security**
- **Core idea:** if you do it twice, script it — Bash to glue tools together, Python when there's logic or data.
- **Frame:** the **5 building blocks** every language has — variables, `if`, `for`, run/IO, functions — taught once, shown in Bash *and* Python. Not a "learn Bash / learn Python" tutorial.
- **Must land:** Bash — `var=` (no spaces), `$(...)`, `for x in list`, `if [ ... ]`, exit codes / `&&`, `$1`; Python — indentation blocks, list/dict, `for`/`if`, `def`, f-strings, `open()`, `import socket`/`subprocess` (stdlib; `requests` needs `pip`).
- **Do (build day):** run + adapt `sweep.sh` (Bash ping sweep, `$1` subnet, add a count); **build `scanner.py` live** (socket connect → open/closed over a port list); then read `ai_snippet.py` and find its bugs. Host-from-a-file is the homework extension.
- **Ethics:** `sweep.sh` / `scanner.py` target **only** localhost / own machine / the class lab — the Day 1 "no scope, no test" line, restated.
- **Attack ↔ Defense:** attackers automate (spray, scan, exfil, C2) ↔ defenders automate (log parsers, scheduled scans, auto-contain / SOAR) — same 5 blocks, opposite direction.
- **Artifact:** `scanner.py` + `sweep.sh`, committed, each with a `# usage:` comment.
- **Analogy:** the recipe card (kitchen) — Bash = notes to the line cooks, Python = a written recipe with logic.
- **Trap:** "I'll have an LLM write it" — fine, but you own what you run; the `ai_snippet.py` exercise practises reading. Also: Python indentation; forgetting `chmod +x`; `ping` flags differ on macOS.

**Day 10 — Security thinking** *(+ Week 2 assignment brief, last ~17 min)*
- **Core idea:** risk = a threat exploiting a vulnerability to cause impact. Reduce risk by removing vulns, blocking threats, or limiting impact — defense in depth.
- **A concepts day** — theory kept to bullets; the 18-min threat-model exercise + the "rank these" DO are the interactive core (the "cap theory ~20 min" rule bends here, mitigated by not lecturing).
- **Must land:** precise definitions (asset / vulnerability / threat / threat actor / exploit / risk); **risk = likelihood × impact**, not vuln count; control types (preventive/detective/corrective); least privilege, defense in depth, assume breach, minimise attack surface, fail secure; trust boundaries; **the untrusted-input question** ("where does data from outside cross into somewhere powerful?").
- **Do:** rank 4 findings on a likelihood×impact grid; then a **class threat-model** of a real app (result portal / delivery / UPI) — draw it + trust boundaries, 3 STRIDE threats, 3 controls (template in `assets/`).
- **Attack ↔ Defense:** this day is the lens for everything after it.
- **Artifact:** `day10/threat-model.md` — a one-page model of an app they use.
- **Analogy:** the kitchen health-and-safety walkthrough (assets → actors → entry points → controls).
- **Trap:** "risk = vulnerability" — a vuln with no threat or no impact is low risk; a small vuln on a critical asset is high.

### Week 3

**Day 11 — Attacks & malware: the catalogue**
- **Core idea:** almost every real breach starts with one of a short list — phishing, stolen creds, an unpatched service, a misconfig. Know the shortlist and its tells.
- **Must land:** social engineering / phishing (the #1 initial access) and its psychology; malware families (virus / worm / trojan / ransomware / RAT / rootkit / infostealer); credential attacks (spray, stuffing, cracking, phishing); MITM; DoS / DDoS; supply chain in one line. Each with an **indicator + a control.**
- **Do (interleaved, 3 beats):** dissect a defanged phishing email with full headers (`assets/phish-sample.txt`); check your **email** on Have I Been Pwned; analyse a simplified connection log (`assets/conn-log.txt`) — find the C2 beacon, the payload download, the exfil. (Wireshark is instructor-projector only today; students install it Day 13.)
- **Attack ↔ Defense:** paired all day; the 6-ways-in table IS the artifact.
- **Artifact:** `day11/ways-in.md` — "the 6 ways in — one indicator and one control for each", their words.
- **Analogy:** the ways a thief gets into the restaurant (kitchen).
- **Trap:** "malware = virus" (delivery ≠ payload) / "we'd notice if we were breached" (attackers go unnoticed for a while; often found by a third party — teach the shape, not a hard stat).

**Day 12 — The pentest lifecycle + stand up the lab**
- **Core idea:** offensive work is a repeatable process, not improvisation: scope → recon → enumerate → exploit → post-exploit → report. Same shape every engagement.
- **Must land:** the phases and what "done" looks like for each; rules of engagement, scope, authorization letter, get-out-of-jail; the reporting mindset (a finding = risk + evidence + reproduction + fix).
- **Do:** everyone connects to the lab (light Kali VM → central hosted targets) and snapshots; write a mock ROE for the class engagement.
- **Attack ↔ Defense:** defenders map this to the kill chain / MITRE ATT&CK (one slide).
- **Artifact:** an **Engagement Journal** started — one section per phase (mirrors the existing Northwind Traders model).
- **Trap:** "just start hacking" — no scope, no test.

**Day 13 — Recon & scanning**
- **Core idea:** you can't attack what you haven't mapped. Passive first (no packets to the target), then active (Nmap) — and every active packet is noise a defender can hear.
- **Must land:** OSINT sources (DNS, certificate transparency, search dorks, LinkedIn, breach data); Nmap deeply — host discovery, `-sV`, `-sC`, top-ports vs full, timing; turning output into an asset list.
- **Do:** passive recon on a permitted domain; `nmap -sV -sC` the lab targets **while running Wireshark** to see what the scan looks like on the wire (the Blue-team bridge).
- **Attack ↔ Defense:** enumeration ↔ attack-surface reduction, IDS scan signatures, honeypots.
- **Artifact:** Engagement Journal recon section — a full service inventory of the target.
- **Trap:** "a port scan is harmless / undetectable."

**Day 14 — Vulnerability assessment**
- **Core idea:** scanners find candidates; humans decide what matters. Pipeline: service + version → known CVEs → CVSS + exploitability → business context → ranked fix list.
- **Must land:** CVE / NVD, CVSS vector basics (AV/AC/PR/UI + impact), "is there a public exploit" (Exploit-DB, Metasploit, GitHub), false positives, why "critical" on an internal box ≠ "critical" on the internet.
- **Do:** run a scanner (Nuclei / OpenVAS / `nmap --script vuln`) on Metasploitable2; take 3 findings from banner → CVE → CVSS → exploit-available → priority.
- **Attack ↔ Defense:** pick the exploit ↔ vulnerability management, patch cadence, compensating controls.
- **Artifact:** a real findings table (finding / severity / evidence / fix) — **Week 3 assignment Part A seed.**
- **Trap:** "more findings = a better report" — a wall of noise is a failed report.

**Day 15 — Practice day**
- **Core idea:** put phases 1–4 together under time pressure, with coaching.
- **Do:** teams take one target (DVWA or Metasploitable2), do recon → scan → identify a vuln → get proof (a shell or extracted data), coached; then each writes it up.
- **Artifact:** a 2-page mini engagement report — the template for the Week 3 weekend assignment.
- **Friday brief:** full lifecycle report on a fresh target + R&D one CVE deep enough to explain the exploit.

### Week 4

**Day 16 — Web exploitation**
- **Core idea:** every web vuln is "untrusted input reached something powerful" — a query, the DOM, the filesystem, an auth check.
- **Must land:** the OWASP Top 10 shape, then drill: injection (SQLi), XSS (stored / reflected / DOM), broken access control / IDOR, broken auth / session, SSRF in one line. For each: how to find it, how to prove it, how to fix it (parameterized queries, output encoding + CSP, server-side authorization, secure session flags).
- **Do:** Juice Shop / DVWA — SQLi login bypass and UNION extract; stored XSS; IDOR by changing an ID; then apply/inspect the fix.
- **Attack ↔ Defense:** paired all day — show the WAF log line **and** the code fix.
- **Artifact:** "5 web vulns: find / prove / fix" with the student's own screenshots.
- **Trap:** "input validation (a blocklist) fixes injection" — no; parameterization / encoding does.

**Day 17 — Post-exploitation + infrastructure & cloud**
- **Core idea:** getting in is the start. Attackers then escalate, persist, move laterally, and reach the data — and the same access-control failures scale to networks and cloud.
- **Must land:** what a shell is; privilege escalation concept (Linux SUID/sudo, Windows tokens); persistence; lateral movement; pivoting. Then: segmentation, firewalls, IDS/IPS, VPN; cloud shared responsibility, the public-bucket misconfig, over-broad IAM.
- **Do:** a guided Metasploit session on Metasploitable2 → shell → `linpeas` → find a priv-esc path; then inspect and fix an intentionally open bucket / IAM policy.
- **Attack ↔ Defense:** paired — map each attacker step to what a SOC would see.
- **Artifact:** "attack chain: initial access → data, with the detection opportunity at each step."
- **Trap:** "we're in the cloud so the provider secures it" — shared responsibility.

**Day 18 — AI & cyber security**
- **Core idea:** AI is a new asset class with its own attack surface, a force-multiplier for attackers, and a tool for defenders — treat all three seriously.
- **Must land:** AI as **target** — prompt injection (direct + indirect), jailbreaks, training-data poisoning, model/data exfiltration, the OWASP LLM Top 10 shape; AI as **weapon** — phishing at scale, deepfake voice/video, malware assistance, faster recon; AI as **defense** — SOC copilots, anomaly detection, code review; plus governance (shadow AI, data leaking into prompts).
- **Do:** hands-on prompt injection against a deliberately vulnerable LLM app (e.g. Gandalf or a local demo) — exfiltrate the secret; then design the mitigations (input/output filtering, least-privilege tools, human in the loop).
- **Attack ↔ Defense:** paired.
- **Artifact:** "3 AI attacks I ran / understood + the mitigation for each."
- **Trap:** "prompt injection is just jailbreaking" — indirect injection via retrieved content is the dangerous one; "AI will take security jobs" — it changes them.

**Day 19 — Blue team: detection & incident response**
- **Core idea:** prevention fails; the job is to see it fast and respond calmly. Logs are ground truth; IR is a process (prepare → detect → contain → eradicate → recover → learn).
- **Must land:** log sources (auth, network, endpoint, app); the SIEM concept; detection rules; IOCs vs TTPs; the IR lifecycle; chain-of-custody basics; tabletop vs real; where AD attacks show up in logs (key event IDs, one slide).
- **Do:** given a provided log set with an intrusion — find the IOCs, build the timeline, write the containment step; then a 15-minute ransomware tabletop.
- **Attack ↔ Defense:** this is the defensive payoff for the whole course.
- **Artifact:** a 5-step IR runbook + the incident timeline the student built.
- **Trap:** "contain = pull the plug" — that destroys volatile evidence and can tip the attacker.

**Day 20 — Careers & the fork + capstone brief**
- **Core idea:** you now know enough to choose — Red (pentest / red team / AppSec), Blue (SOC / IR / DFIR / detection engineering), or a wing (GRC, cloud security, AI security, security engineering).
- **Must land:** what each role actually does day to day; the Indian market reality (SOC hiring volume, VAPT consultancies, bug bounty, product security teams); the cert ladder per path (Blue: Security+ → BTL1 → CySA+; Red: eJPT → PNPT/CPTS → OSCP); that the **portfolio (their repo) matters more than any cert at entry**.
- **Do:** self-assessment against a skills checklist; each student writes "which door and why" + the next 3 concrete steps; short pitches to the room.
- **Artifact:** the repo finalized as a portfolio README + a personal 6-month roadmap.
- **Capstone brief:** cross-domain find-and-fix (web + infra) + an IR writeup + the roadmap.

---

## 7. Lab architecture

**Principle:** students never host vulnerable targets. Centralize the fragile part.

- **Central target server** (instructor-run): DVWA (`:8080`), OWASP Juice Shop (`:3000`),
  Metasploitable2, plus the Day 18 vulnerable LLM app. Options: a campus VM, a cheap cloud VM,
  or the existing podman-in-WSL setup (see the `wsl-lab-targets` note). Reachable only from
  the class network / VPN.
- **Per-student attack box:** a lightweight Kali or Ubuntu VM (VirtualBox) with the standard
  toolset (nmap, wireshark, curl, netcat, hashcat/john, metasploit, python). One provided
  `.ova` image — no student builds it from scratch.
- **Weak-laptop fallback:** a shared class Kali on the target server, one account per student,
  reached over SSH + browser. A Chromebook / 4 GB laptop can still complete every lab.
- **Day 12 is the gate** for the *target* lab: every student must reach the vulnerable targets
  and snapshot before Week 3 continues. Students who can't are moved to the fallback that day.
- **Earlier — a plain Linux shell for Days 6–10.** Days 6–10 (Linux, scripting) need only a
  Linux shell, not the target lab. Options, easiest first: **WSL2** (Windows), the provided
  Ubuntu/Kali `.ova`, or an SSH account on the class Linux box (weak-laptop fallback). Set up
  as Day 5 homework; fix stragglers in the first 5 minutes of Day 6. Not Git Bash.

---

## 8. The night-before prep routine (Track B)

**Input:** the day's approved topic list (§6) + the lesson package.
**Output:** a one-page **Teach Card** held during class + a **demo kit**.
**Budget:** ~90 minutes, fixed steps, same every class.

1. **Lock the spine (10 min).** Write the day's 4–7 topics in teaching order. For each, write
   the **single sentence that topic must land.** If you can't write the sentence, that's a
   topic you don't know well enough — flag it for step 3.
2. **Time-box it (5 min).** Assign minutes to each topic against the 90-min template
   (journey check 5 · review 3 · new content ~50 · demo/lab 20 · wrap 10). If it doesn't fit,
   cut to **must-teach** now, on paper — not live in the room.
3. **Close your own gaps (25 min).** For each flagged topic: read **one** authoritative source
   (not five tabs). Write the 3–5 sentences you'd say and the one analogy. Say it out loud
   once. Still shaky? **Demote it to "mention + point to a resource."** A clean pointer beats a
   muddled explanation.
4. **Demo pre-flight (30 min).** Run **every** demo end to end, exactly as you'll run it in
   class, on the class machine/network. For each: record the exact commands, the expected
   output, and a **screenshot or screen recording of the working result.** That capture is the
   fallback — if the demo fails live, show the capture, narrate it, move on. A demo never
   derails the class again.
5. **Write the Teach Card (10 min).** One page: topic order + minutes · the must-land sentence
   per topic · demo commands · the "today's attack / defense / artifact" line · the 3 questions
   you'll ask the room.
6. **First and last 5 minutes, verbatim (5 min).** Write your opening (the journey check) and
   closing (the 3-line recap) **word for word.** These are where classes are won or lost and
   where instructors most often freeze.

---

## 9. Course-wide teaching standards

**Do NOT teach** (explicitly out of scope):
- OSI 7-layer memorization (teach the 4-layer model)
- Windows registry internals beyond "config store + persistence spot"
- Cryptographic math (RSA by hand, modular arithmetic)
- Compliance frameworks alphabet soup (ISO 27001 / SOC 2 / PCI) — one slide, "GRC is a career"
- Binary exploitation / reverse engineering / assembly — name it as a path, don't teach it
- Memorizing tool flags — teach `--help` and the man page

**The one sanctioned analogy — a single connected world, extended, never a parallel metaphor:**
- **Compute (Day 2):** the **kitchen** — chef=CPU, counter=RAM, pantry=disk, head chef on the
  pass=OS, walk-in freezer=kernel mode.
- **Linux permissions (Day 7):** extends the kitchen — permissions = the **key cabinet**
  (labels on every door: who may look / change / enter), root = the master key, `sudo` = sign
  the logbook and borrow it for one job.
- **Networking (Day 3):** the **postal / delivery system** — the kitchen now orders supplies
  and ships orders. parcel=packet, street address=IP, next-leg label=MAC, department name=port,
  sorting office=router, building front desk=NAT.
- **Protocols / TCP (Day 4):** the **phone call** — dialling and "hello?… hello.… go ahead"
  (the handshake), the operator/directory (DNS).
- **Cryptography (Day 5):** **locks and seals on the mail** (a postal extension) — symmetric =
  a shared-key lockbox · asymmetric = open padlocks anyone can snap shut, only your key opens ·
  hash = a tamper-evident wax seal · signature = a signet-ring stamp · certificate = a notary's
  stamped statement binding a seal to a name. The Day 4 "phone scrambler" = symmetric encryption.
- Later days extend these, never add a fifth family. When a day needs a new lens, it's a
  documented extension in that day's `teacher-notes.md`, reviewed against this list.

**Class template additions:**
- **Day 1 trailer demo** is baked into the template — every cohort gets it.
- **Every class ends with the ritual:** "Today's attack. Today's defense. Today's artifact" →
  three lines into the student's repo.
- **Pure theory capped at ~20 minutes**, always bolted to a demo or a hands-on task. On
  addressing-heavy days (e.g. Day 3) **interleave** the hands-on as short "do it now" beats
  rather than one block at the end.
- The board carries one question every day: *"If I were attacking this, where would I look?
  If I were defending it, what would I watch?"*

**Split-level cohort:**
- The **R&D stretch** in the weekly assignment (Part B) is the channel for the strong students.
- **Paired lab seats + scheduled office hours** for the students who need more time — named in
  the syllabus, not improvised.

---

## 10. Weekly assignment standard

Every Friday's class closes with a ~15-minute briefing. The weekend handout has a **fixed
4-part shape**:

- **Part A — Integrate:** one scenario that stitches the week's topics into a single deliverable.
- **Part B — R&D stretch:** 1–2 tasks that force research **beyond** what was taught — an
  adjacent tool, a real CVE, a newer technique.
- **Part C — Hands-on evidence:** screenshots / command output from doing it in the lab.
- **Part D — Reflection:** 3–4 sentences.
- **Rubric:** a **checklist** the instructor can mark in 3–4 minutes per submission (not prose).
- **Submission:** one PDF, before the next Monday.

| Week | Part A — Integrate | Part B — R&D stretch (example) |
|------|--------------------|-------------------------------|
| 1 | End-to-end: keypress → TLS when you log into a site | DNS-over-HTTPS, or one real DNS/TLS CVE |
| 2 | Harden a machine: users, permissions, a script that flags weak settings | one Linux privilege-escalation technique, or Windows LOLBins |
| 3 | Run the lifecycle on the lab target: recon → scan → triage → findings report | one CVE from your scan, deep enough to explain the exploit |
| 4 | Capstone: find-and-fix across web + infra, walk an IR scenario, pick your path | the cert / learning path for your chosen specialization |

---

## 11. Production process

**Per-day file set** (lean — replaces the v1 7-file standard for this course line):
`dayNN/dayNN.md` (Marp deck, `theme: dark-monospace`, **speaker notes on every slide**) +
`dayNN/dayNN.pptx` / `.html` (rendered) + `dayNN/teacher-notes.md` (cut-list, background for
shaky topics, demo runbook + fallback, activity answer keys, exit check, FAQ) +
`dayNN/assets/`. Per week: `weekN/student-pack.md` (daily recaps + key terms + worksheets +
the 4-part weekend assignment + checklist rubric). Topic-specific PDF handout only when a topic
deserves a keeper reference. `lessons-v2/CHANGELOG.md` replaces per-day version-history files.

**Every day gets a review pass before it's "done"** (expert + teacher lens):
1. **Timing realism** — segments sum to ≤ 90 with slack; the ~50-min real budget for new
   content after journey check / demo setup / Q&A is respected.
2. **Factual accuracy** — dates, names, law, mechanisms.
3. **The one-analogy rule** — the kitchen (or the day's designated extension of it); never a
   parallel analogy.
4. **Attack ↔ defense pairing** — no attack taught without its defense.
5. **What's missing** — scope vs. the §6 plan; misconceptions preempted; the daily
   attack/defense/artifact ritual present.
Findings get applied, and the §6 plan is corrected when the lesson diverges from it for good reason.

### Open items

1. **Owner review of this document.**
2. **Lab infrastructure decision** — which host runs the central targets (campus VM / cloud VM /
   WSL box), and who maintains it.
3. **Governance** — decide whether this adopts as `Course-Design-Document-v2` and how it
   relates to the ADD's freeze rule (new course line, nothing frozen is edited).
4. **Prep-routine trial** — the instructor runs the §8 routine for Day 1 and Day 2 and reports
   what didn't fit in 90 minutes, before the routine is locked.

### Progress

- **Day 1** built + reviewed + fixes applied (repo→homework, 3 events not 5, "where this
  leads" slide, trailer defaults to recording).
- **Day 2** built + reviewed + fixes applied (one analogy = kitchen; "why a bug becomes
  control" moved up and given 12 min; memory-layout slide cut; `crash.py` → instructor-only;
  "files" moved to Day 6 in §5/§6).
