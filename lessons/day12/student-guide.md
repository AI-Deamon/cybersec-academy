# Day 12 — Student Guide
**Course:** Practical Cyber Security: From First Principles · Module 3 · Day 12 of 20

---

## Why this matters
The difference between a security professional and a criminal is **authorization and isolation**. Before you touch any tool, you must know how to build a *safe* place to practice — one you own or are explicitly allowed to test — so every later lab (scanning, intercepting, exploiting) does no harm. Methodology is what makes the work legal, contained, and repeatable.

## How today connects (keep this in mind)
- **Day 1 ethics → Today:** "only test what you're allowed to" becomes concrete: a **range** is the allowed place; documentation proves you stayed in it.
- **Day 11 CIA/risk → Today:** the range lets you safely probe Availability (scanning) and observe Confidentiality (intercepting) with **real Impact = zero**, because it's isolated.
- **Forward:** Day 13 (Wireshark/Nmap in the range) · Day 14 (vuln scanning) · Day 15 (Burp on your own target) · Day 16-18 (attacks, range-only) · Day 19 (IR mirrors document/restore).
- **Ethics:** only test your range. Never pivot outside it (Day 1 rule, operationalized).

---

## The big ideas

### 1. Authorization & isolation (the legal core)
- **Authorization:** test only systems you *own* or have *written permission* for. No exceptions. Unauthorized testing is a crime worldwide, regardless of intent.
- **Isolation:** keep the lab off production and the real internet, so a mistake can't escape.
- Together: authorization = "you may"; isolation = "if it breaks, it stays here."

### 2. The range (your safe playground)
A **range** = a practice environment you control: a purposely-vulnerable target VM on an isolated network, plus your attacker machine. Build it once, reuse for Days 13-15 (and later). Each VM is just a Computer with its Manager/OS — the same OS signature diagram.

### 3. The testing methodology (repeatable loop)
1. **Define scope** — what's in/out (IPs, apps, rules).
2. **Get authorization** — written permission (habit, even for your own lab).
3. **Isolate** — off production/internet.
4. **Recon** — what's running? (Day 13 Nmap)
5. **Test** — within scope, carefully.
6. **Document** — what you did/found (evidence).
7. **Restore** — clean state.
The backbone of every pro engagement.

### 4. Rules of engagement & evidence
- Stay **in scope**. Something unexpected? Stop and re-confirm authorization.
- **Capture evidence** (screenshots, output) — needed for the report and to prove legality.
- Never exfiltrate, deface, or pivot outside the range.
- Four guardrails: **authorized · isolated · documented · in-scope.**

### 5. Tool caution (concept before tool)
We *set up* today, not wield. Wireshark/Nmap/Burp arrive Days 13-15. Methodology is what makes them safe. A tool without methodology is amplified recklessness.

### 6. Security bridge
- A safe range models **network segmentation** — the same isolation orgs use to protect sensitive systems.
- The methodology mirrors **incident response** (define → contain → evidence → restore). Good testing and good defending share a spine.

---

## Worksheet (fill in during class)
1. Two words that separate a pro from a criminal: ______ and ______.
2. A ______ is a practice environment you control, reused across labs.
3. The 7-step methodology: scope → ______ → isolate → recon → test → ______ → restore.
4. Four guardrails: authorized · ______ · documented · ______.
5. Isolation means a mistake ______ (stays contained / reaches the internet).
6. Always capture ______ (screenshots/output) to prove you stayed legal/in-scope.

## Homework (due Day 13)
Write a one-paragraph **Scope & Authorization** statement for your practice range: what you may test, where it lives, and that it's yours/authorized. Bring it to Day 13 — it's your "permission slip" for the tool labs.

*(Lab steps in lab-guide.md. Quiz in quiz.md. Reference sheet in references.md.)*

---

## PPT Outline (blueprint for Phase 4)
**Slide 1 — Title:** "Day 12: The Safe Range — Lab Setup & Methodology" · Academy logo.
**Slide 2 — Why are we learning this?** Authorization + isolation = the line between pro and criminal; methodology makes work legal/repeatable. Diagram: shield + lock.
**Slide 3 — Learning Journey Check:** "Day 11: how to think. Today: where & how to practice safely."
**Slide 4 — Authorization & isolation:** you may (authorized) / if it breaks it stays (isolated). Diagram: two stamps.
**Slide 5 — The range:** your safe playground; target VM + attacker box, isolated. Diagram: two computers on a closed network.
**Slide 6 — Methodology loop:** 7 steps. Diagram: circular checklist.
**Slide 7 — RoE & evidence:** in-scope; capture proof; four guardrails. Diagram: guardrails.
**Slide 8 — Tool caution:** concept before tool; methodology makes tools safe.
**Slide 9 — Security bridge:** range = segmentation; methodology = IR spine. Diagram: mirror.
**Slide 10 — Soft-Skills Moment:** always ask "am I authorized, and is this isolated?"
**Slide 11 — How Today Connects:** enables Days 13-19 safely. Diagram: hub.
**Slide 12 — Curiosity Question:** "If a tool can scan/exploit anything, what stops you from hurting the wrong system?" → authorization + isolation + scope.
**Slide 13 — Lab Preview & Quiz:** stand up the lab; exit quiz.
