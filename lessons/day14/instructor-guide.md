# Day 14 — Instructor Guide (PRIVATE — source of truth)
**Course:** Practical Cyber Security: From First Principles
**Module 3 — Thinking Like a Pro · Day 14 of 20 · Week 3, Session 4**
**Standard:** Academy Design Document v1.3 (Complete) · Phase 3 lesson-doc standard · Career-Connection/So-What standard (ADD §17)
**Version:** 1.0

---

## 1. Lesson Overview
- **Title:** Vulnerability Scanning — Read & Triage a Scan
- **Duration:** 90 minutes
- **Type:** Foundation + hands-on tool day (inside the Day 12 range)
- **Position in journey:** Day 14 of 20, fourth (final new-concept) day of Week 3. Day 11 = mental model (CIA/risk). Day 12 = range + methodology. Day 13 = recon (Wireshark/Nmap found open ports). Today = take those open ports and run a **vulnerability scanner** against the range target, then **triage the findings by risk**. Day 15 = Burp + secure coding. Day 16+ = attacks/defense. The Week 3 assignment (Day 15 workshop) will draw on all of this.
- **Companion files:** student-guide.md · lab-guide.md · quiz.md · references.md · rubric.md · version-history.md

## 2. Teaching Guide (Four Context Questions)
**Why am I learning this?**
Because a scanner alone is noise — 500 findings, no judgment. The *skill* is reading that output and deciding what matters (Day 11 risk). Vulnerability scanning + triage is the daily work of defenders, and it's how you turn "open ports exist" (Day 13) into "this specific service is dangerously out of date."

**How does this connect to the previous lessons?**
- **Day 13 → Today:** Nmap showed *open doors* (ports). A vuln scanner walks through those doors and checks *what's broken inside* (outdated software, weak config). Ports = where to look; vulns = what's wrong.
- **Day 11 CIA/risk → Today:** each finding maps to a CIA break (e.g., outdated TLS = C; writable config = I; exposed admin panel = A) and a **risk** (threat × vulnerability × impact). Triage = applying Day 11's risk formula to real output.
- **Day 12 range:** the scanner runs **only on your range target**. Scanning real systems without permission is the unauthorized-access line (Day 1/12).

**Where will I use this in cybersecurity?**
Defender vuln-management programs, pentest reporting, compliance scans, patch prioritization, SOC alert enrichment. It's one of the most common recurring security tasks.

**What problem will I be able to solve after today's class?**
Run a vuln scanner against your range target, read its findings, and **triage** them — separate the "fix this week" from the "note and move on" — using CIA + risk. That's the defender's core loop.

**Concept 1 — What a vulnerability scanner does (concept before tool).**
A scanner compares what it finds (software versions, configs, open services) against a database of *known weaknesses* (CVEs, misconfigurations) and reports matches. It does **not** exploit — it *identifies* weakness. Think of it as an automated "is this door not just open, but also broken?" check. (Distinct from an exploit framework, which *uses* the weakness — we don't do that here, ever, except in the range later and only where explicitly authorized.)

**Concept 2 — Ports → services → vulnerabilities (the chain).**
Day 13 found port 80 open (a web server). The scanner fingerprints *which* web server and version, then checks that version for known flaws. So: **open port → identified service → known vulnerability on that service.** This is why recon (Day 13) precedes scanning (today).

**Concept 3 — Triage by risk (the real skill; Day 11 applied).**
Raw output is overwhelming. Triage asks, for each finding:
- **CIA impact:** which property is at risk (C/I/A)?
- **Severity:** how bad if exploited (impact)?
- **Exposure:** is it reachable (threat/vulnerability)? A critical flaw on an isolated, unused service may rank below a medium flaw on a public, sensitive one.
We sort into **Fix now / Schedule / Accept-note**. This is Day 11's risk formula made operational — and it's where humans add value a scanner can't.

**Concept 4 — False positives & validation (defender discipline).**
Scanners make mistakes (false positives — "vulnerable" but it isn't; false negatives — missed). A pro **validates** key findings before acting (e.g., confirm the version, check if a control mitigates it). Never remediate blind. This is the "document + verify" half of the Day 12 methodology.

**Concept 5 — Attack vs defense, always.**
- **Defender:** scans own assets, triages, patches by risk. (What we do today, in the range.)
- **Attacker:** uses the *same* scan data to pick the easiest entry. (Why keeping your scan results private matters — they're a roadmap for the enemy.)
This symmetry is why authorization + the range matter: the scan output is sensitive.

**Concept 6 — Security bridge.**
- Scanning is **continuous**, not one-time — real programs scan weekly. Today plants that habit.
- Triage = the junction of Week 3's three days: Day 11 (risk) + Day 12 (methodology) + Day 13 (recon) all converge here. The "thinking like a pro" week pays off in this single task.

## 2b. Topic Connections & Examples (the "why it links" layer)
**Connection A — The recon→scan→triage pipeline:** Day 13 (Nmap open ports) → Day 14 (scanner finds vulns on those ports → triage by risk). One continuous defender loop. The page-load and OS diagrams aren't central here; the *risk* diagram (Day 11) is.

**Connection B — Forward links:**
- → **Day 15 (Burp + secure coding):** web-specific findings; why the code is flawed (untrusted input, Day 11).
- → **Day 16 (Web attacks):** an attacker *exploiting* what today's scanner only *identified*.
- → **Day 17 (Network defense):** hardening the exposed services.
- → **Day 19 (Monitoring/IR):** a found-then-fixed vuln is evidence; a missed one is an incident.
- → **Day 18/20:** vuln management fits DevSecOps + capstone reporting.

**Connection C — Backward link:** Day 11 risk (the formula), Day 12 methodology (document/validate; range-only), Day 13 recon (the ports we scan). Today is the synthesis of Module 3's first four days.

**Concrete Examples:**
- *Port→vuln:* Day 13 found `80/tcp open http (Apache 2.2)`. Scanner flags "Apache 2.2 EOL — multiple CVEs." CIA = I/A; risk = high (public + critical). → Fix now.
- *Triage nuance:* scanner says "TLS 1.0 enabled" (medium) on a public login vs "critical RCE" on an internal, firewalled service — the medium-on-public may outrank the critical-on-isolated. Risk, not raw severity, decides.
- *False positive:* scanner claims "SSH vuln" but the host is patched; validate the version before acting.
- *Bridge line (say twice):* "A scanner gives you a list; risk gives you an order. The machine finds the weaknesses — you decide what matters. Only in your range."

## 3. Timing Guide (90 min)
| Segment | Time | Activity |
|---------|------|----------|
| A. Learning Objectives | 3 min | State the 3 goals |
| B. Learning Journey Check | 4 min | "Day 13 found the doors; today we check what's broken behind them — and decide what matters." |
| C. Review | 3 min | Recall Day 13 ports + Day 11 risk formula + Day 12 range rules |
| D. Soft-Skills Moment | 12 min | Reading a scan report critically; always ask "is this validated, and what's the risk order?" |
| E. New Concepts | 30 min | scanner purpose, ports→services→vulns, triage by risk, false positives, attack+defend |
| F. Diagram & Real-World | 10 min | recon→scan→triage pipeline; risk-ordered findings; "scan output is sensitive" |
| G. Live Demo / Lab | 20 min | in-range: scan the target; read + triage findings by CIA/risk |
| H. Quiz / Assignment | 8 min | Exit quiz + preview Day 15 |
| **Total** | **90** | |

## 4. Analogies
**REUSE Day 12's range + Day 11's risk scale; add one new simple picture:**
- Vulnerability scanner = an **automated home inspector** who walks every room (service) and lists what's broken (cracked foundations, faulty wiring) against a known list of defects. It doesn't fix anything — it reports.
- Triage = the inspector's **priority list**: "this wiring is a fire risk — fix now; that paint is peeling — schedule it." Severity + how reachable/important the room is = the order.
- (Restaurant metaphor, Week 2: the inspector checks each kitchen station the Manager runs; a broken fridge (I/A) on the main line outranks a chipped plate in storage.)

## 5. Common Misconceptions
- *"The scanner hacks the system."* No — it *identifies* weaknesses; it does not exploit. (Exploitation is later, range-only, explicitly authorized.)
- *"More findings = worse."* Count means little; *risk-ranked* findings mean everything. A 500-line report with 3 real risks beats panic.
- *"Critical severity = fix first, always."* Not necessarily — a critical on an isolated, unused service may rank below a medium on a public, sensitive one. Risk (exposure × impact), not raw severity.
- *"Believe the scanner blindly."* False positives exist; validate before acting.
- *"I can scan anything to practice."* Only your range target (Day 12). Scanning outside it is unauthorized.

## 6. Demo Script
**Demo 1 — Scan the range target (8 min):** run the scanner (e.g., Nuclei/OpenVAS) against the Day 13 target IP. Show the findings list — "these are the broken things behind the doors Nmap found."
**Demo 2 — Map one finding to CIA + risk (7 min):** pick a finding (e.g., outdated web server). State CIA impact (I/A), threat (public exploit exists), vulnerability (EOL version), impact (takeover) → risk = high → Fix now. Show the Day 11 risk formula live on real output.
**Demo 3 — Triage order (5 min):** show two findings where raw severity misleads (critical-on-isolated vs medium-on-public) and reorder by risk. Emphasize: "the machine finds; you order."

## 7. Lab Solution (answers instructors should see)
- Task 1: ran the scanner **only on the range target** (confirmed IP = Day 12 scope).
- Task 2: read the findings; picked at least 2 and stated each one's CIA impact + a rough risk (threat/vuln/impact).
- Task 3: produced a triage order (Fix now / Schedule / Accept-note) for the findings, justifying at least one reorder by risk rather than raw severity.
- Concept Q: stated scanner identifies (not exploits) weaknesses; triage uses Day 11 risk; scan only in range; validate before acting.

## 8. FAQ
- **Q: Which scanner do we use?** Per the ADD tool list, Nuclei (or OpenVAS) against the range target. The concept is tool-agnostic; ask the instructor which is provisioned.
- **Q: Will scanning break my range target?** A *vulnerability* scanner is read-only by design — it identifies, doesn't exploit. (An exploit framework would, but we don't use one today.)
- **Q: What if I get zero findings?** Either the target is patched (good!) or misconfigured — confirm the target IP and that the scanner reached it. A clean scan is a valid, reassuring result.
- **Q: How is this different from Day 13's Nmap?** Nmap = "which doors are open" (ports). Scanner = "what's broken behind the open doors" (known weaknesses on those services). Ports first, then vulns.

## 9. Examples Bank (reusable across cohorts)
- Scanner = automated home inspector (reports, doesn't fix).
- Triage = priority list (risk order, not raw severity).
- Port→service→vuln chain (Day 13 → Day 14).
- Critical-on-isolated can rank below medium-on-public (risk > severity).
- Validate before acting (false positives); scan output is sensitive (attackers want it).
- Bridge line: "A scanner gives you a list; risk gives you an order. Only in your range."

> **Assessment:** see rubric.md (separate file, per the 7-file standard).
> **Career note (ADD §17):** Vulnerability Management Analyst, Pentester, SOC/Blue Team, Compliance/IT GRC all triage scans. The four "So What" questions close the student guide.
