# Day 11 — Student Guide
**Course:** Practical Cyber Security: From First Principles · Module 3 · Day 11 of 20

---

## Why this matters
Every security conversation — a breach report, a pentest finding, a "should we build this?" decision — uses the same vocabulary. If you can't name *what* you're protecting (CIA) and *how* you decide what matters (risk), you can't reason about security. And one habit — *question every input* — prevents most real-world flaws.

## How today connects (keep this in mind)
- **Yesterday (end of Week 2) → Today:** Weeks 1-2 = how the machine/OS works. Week 3 = is it *safe*? Today: the vocabulary to judge that.
- **Back link:** Days 6-8 permissions were the *mechanism*; CIA is the *goal* they serve. Day 9's "untrusted input" seed becomes the named habit today.
- **Forward:** Day 12 (safe lab to test this) · Day 13 (Wireshark/Nmap) · Day 14 (vuln scanning) · Day 15 (Burp + secure coding) · Day 16-19 (every attack = a CIA break).
- **Ethics:** the untrusted-input habit is also how we *avoid* harming systems we test (Day 1 rule).

---

## The big ideas

### 1. CIA — the three things we protect
- **C — Confidentiality:** only the right people can *see* it. Broken by a leak.
- **I — Integrity:** only the right people can *change* it, without silent tampering. Broken by modification/ransomware.
- **A — Availability:** the right people can *use* it when needed. Broken by an outage/DoS.
Think: sealed envelope (C) · signed paper (I) · open door (A). Every control protects at least one.

### 2. Risk — how we decide what to fix first
**Risk ≈ Threat × Vulnerability × Impact:**
- **Threat** = who/what could harm you.
- **Vulnerability** = the weakness.
- **Impact** = how bad if it happens.
We spend effort where risk is highest. Four responses: **accept · mitigate · transfer · avoid.**
Example: public login + no rate-limit → password spraying → account takeover. High risk → mitigate (rate-limit/MFA).

### 3. The untrusted-input question (THE habit)
> *"Is any data this system acts on coming from somewhere it shouldn't automatically trust — and is the system checking it?"*

This one question prevents most flaws: SQL injection, XSS, path traversal, and the Day 9 seed (a script trusting file content). **Rule: treat all input as guilty until validated.** This is the spine of Module 4 and Day 15.

### 4. Map the course so far to CIA
- Days 6-8 permissions → enforce **C** (not world-readable) and **I** (not world-writable).
- Day 9 `PermissionError` → the OS enforcing **C/I** on a Process.
- Weak `777` / "Everyone: Full Control" → **C and I broken.**
CIA isn't new vocabulary — it's the *why* behind what you already learned.

### 5. Attack vs defense, always
For every idea, know both sides: the control (defense) and the attack it stops. CIA/risk is the scoreboard both play by.

### 6. Security bridge
- **CIA** = the language to say what's wrong ("this is a confidentiality failure").
- **Risk** = the priority ("fix the high-impact exposed one first").
- **Untrusted input** = the habit ("check it before you use it").
Together they turn "I used a tool" into "I think like security."

---

## Worksheet (fill in during class)
1. CIA = ______ / ______ / ______. A data leak breaks ______.
2. Availability is broken by a ______ (e.g., outage/DoS).
3. Risk ≈ ______ × ______ × ______.
4. The four risk responses: accept / ______ / transfer / ______.
5. The untrusted-input question: "Is any data the system acts on coming from somewhere it shouldn't ______, and is it being ______?"
6. A login form field is ______ input — building a DB query from it without checking = ______ (foreshadowed Day 15/16).

## Homework (due Day 12)
Pick a real app you use (email, bank, social). In 5 lines, state one C, one I, and one A property it must protect, and name one untrusted input it receives. Safe thinking only — no testing.

*(Lab steps in lab-guide.md. Quiz in quiz.md. Reference sheet in references.md.)*

---

## PPT Outline (blueprint for Phase 4)
**Slide 1 — Title:** "Day 11: How Security Pros Think — CIA, Risk, Untrusted Input" · Academy logo.
**Slide 2 — Why are we learning this?** The vocabulary of every security conversation; the habit that prevents most flaws. Diagram: brain + shield.
**Slide 3 — Learning Journey Check:** "Weeks 1-2: how it works. Week 3: is it safe? Today: the vocabulary."
**Slide 4 — CIA:** C/I/A defined; sealed envelope + signed paper + open door. Diagram: triangle.
**Slide 5 — CIA on a bank app:** leak=C, wiring bug=I, outage=A. Diagram: app with 3 labels.
**Slide 6 — Risk:** threat × vuln × impact; 4 responses. Diagram: scale.
**Slide 7 — Risk example:** sticky-note password → mitigate. Diagram: note + lock.
**Slide 8 — The untrusted-input question:** treat input as guilty until validated. Diagram: stranger's note.
**Slide 9 — Map the course to CIA:** permissions → C/I; weak 777 → C/I broken. Diagram: OS signature diagram with CIA overlay.
**Slide 10 — Soft-Skills Moment:** read any headline through CIA + risk; ask "what's the untrusted input?"
**Slide 11 — How Today Connects:** vocab for Days 12-19; every attack = CIA break. Diagram: hub.
**Slide 12 — Curiosity Question:** "If every flaw starts with trusted input, what's the one question to ask about any system?" → "Is this input trusted? Check it."
**Slide 13 — Lab Preview & Quiz:** classify scenarios; spot untrusted input; exit quiz.
