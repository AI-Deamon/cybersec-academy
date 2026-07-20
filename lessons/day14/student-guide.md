# Day 14 — Student Guide
**Course:** Practical Cyber Security: From First Principles · Module 3 · Day 14 of 20

---

## Why this matters
A scanner alone is **noise** — 500 findings, no judgment. The real skill is reading that output and deciding what matters (Day 11 risk). Vulnerability scanning + triage is the daily work of defenders, and it turns "open ports exist" (Day 13) into "this specific service is dangerously out of date." Today you run a scanner against your *range target only* and triage by CIA + risk.

## How today connects (keep this in mind)
- **Day 13 → Today:** Nmap showed *open doors* (ports). A vuln scanner walks through and checks *what's broken inside* (outdated software, weak config). Ports = where to look; vulns = what's wrong.
- **Day 11 CIA/risk → Today:** each finding maps to a CIA break and a **risk** (threat × vulnerability × impact). Triage = applying Day 11's formula to real output.
- **Day 12 range → Today:** the scanner runs **only on your range target**. Scanning real systems without permission crosses the unauthorized-access line (Day 1/12).
- **Forward:** Day 15 (Burp + secure coding) · Day 16 (web attacks) · Day 17 (network defense) · Day 19 (IR) · Day 20 (capstone reporting).
- **Ethics:** scan **only your range target**. The scan output is sensitive — keep it in the range (Day 12).

---

## The big ideas

### 1. What a vulnerability scanner does
It compares what it finds (software versions, configs, services) against a database of *known weaknesses* (CVEs, misconfigurations) and reports matches. It **identifies**, it does **not exploit**. Think: "is this door not just open, but also broken?" (Distinct from an exploit framework, which *uses* the weakness — not today.)

### 2. Ports → services → vulnerabilities (the chain)
Day 13 found port 80 open (a web server). The scanner fingerprints *which* server/version, then checks it for known flaws. So: **open port → identified service → known vulnerability.** That's why recon (Day 13) precedes scanning.

### 3. Triage by risk (the real skill — Day 11 applied)
Raw output is overwhelming. For each finding ask:
- **CIA impact:** which property is at risk (C/I/A)?
- **Severity:** how bad if exploited (impact)?
- **Exposure:** is it reachable (threat × vulnerability)?
Sort into **Fix now / Schedule / Accept-note**. This is Day 11's risk formula, operational — where *you* add value a scanner can't.

### 4. False positives & validation
Scanners err: **false positive** ("vulnerable" but it isn't), **false negative** (missed). A pro **validates** key findings before acting (confirm the version, check for a mitigating control). Never remediate blind — that's the "document + verify" half of Day 12's methodology.

### 5. Attack vs defense, always
- **Defender:** scans own assets, triages, patches by risk (what we do today, in the range).
- **Attacker:** uses the *same* scan data to pick the easiest entry. (Why scan results stay private — they're a roadmap for the enemy.)
Symmetry is why authorization + the range matter.

### 6. Security bridge
- Scanning is **continuous** (real programs scan weekly) — today plants that habit.
- Triage = the junction of Module 3: Day 11 (risk) + Day 12 (methodology) + Day 13 (recon) converge here. "Thinking like a pro" pays off in this one task.

---

## Worksheet (fill in during class)
1. A vulnerability scanner ______ weaknesses; it does not ______ them.
2. The chain: open ______ → identified ______ → known ______.
3. Triage sorts findings into Fix now / ______ / Accept-note.
4. Risk order uses CIA impact + ______ (exposure), not just raw severity.
5. A "vulnerable" but actually-safe result is a ______ positive — validate before acting.
6. We scan only our ______ target (Day 12 scope).

## Homework (due Day 15)
In your range, write a 5-line triage note for your scan: list your top finding, its CIA impact, a rough risk, and whether you'd Fix now / Schedule / Accept-note. Bring it to Day 15.

*(Lab steps in lab-guide.md. Quiz in quiz.md. Reference sheet in references.md.)*

---

## The four "So What?" questions (ADD §17 standard)
1. **What did I learn?** That a scanner identifies weaknesses behind the open ports Nmap found, and that *triage by risk* — not the raw count — is what makes the output useful.
2. **What can I now do?** Run a vuln scanner against my range target, map findings to CIA, and produce a risk-ordered fix list (Fix now / Schedule / Accept-note), validating before acting.
3. **Where is this used professionally?** Vulnerability Management Analysts, Pentesters, SOC/Blue Team, and Compliance/IT-GRC teams triage scans every week to prioritize patching.
4. **What am I building toward?** Day 15 (why the code is flawed), Day 16 (an attacker exploiting what I only identified), Day 17 (hardening), and the capstone report — where scan+triage is the defender's core loop.

---

## PPT Outline (blueprint for Phase 4)
**Slide 1 — Title:** "Day 14: Vulnerability Scanning — Read & Triage" · Academy logo.
**Slide 2 — Why are we learning this?** A scanner is noise; risk makes it signal. Defender's daily work; only in the range. Diagram: funnel.
**Slide 3 — Learning Journey Check:** "Day 13 found the doors; today we check what's broken behind them — and decide what matters."
**Slide 4 — What a scanner does:** identifies (not exploits) known weaknesses. Diagram: inspector.
**Slide 5 — Ports → services → vulns:** the Day 13→14 chain. Diagram: door→room→crack.
**Slide 6 — Triage by risk:** CIA impact + exposure; Fix now/Schedule/Accept. Diagram: ordered list.
**Slide 7 — Risk > raw severity:** critical-on-isolated vs medium-on-public. Diagram: scale.
**Slide 8 — Validate & false positives:** confirm before acting; output is sensitive. Diagram: checklist.
**Slide 9 — Attack + defense:** same scan data, two sides; keep results private. Diagram: mirror.
**Slide 10 — Soft-Skills Moment:** read reports critically; "is this validated, what's the risk order?"
**Slide 11 — How Today Connects:** → D15 code flaws → D16 exploit → D17 harden → D19 IR. Diagram: hub.
**Slide 12 — Curiosity Question:** "If a scanner finds 500 issues, how do you fix the right one first?" → triage by risk, not count.
**Slide 13 — Lab Preview & Quiz:** in-range scan + triage; exit quiz.
