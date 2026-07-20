# Day 11 — Instructor Guide (PRIVATE — source of truth)
**Course:** Practical Cyber Security: From First Principles
**Module 3 — Thinking Like a Pro · Day 11 of 20 · Week 3, Session 1**
**Standard:** Academy Design Document v1.2 (Complete) · Phase 3 lesson-doc standard
**Version:** 1.0

---

## 1. Lesson Overview
- **Title:** How Security Professionals Think — CIA, Risk, and the Untrusted-Input Question
- **Duration:** 90 minutes
- **Type:** Foundation — the mental model every later attack/defense maps to
- **Position in journey:** Day 11 of 20, first day of Week 3 (Module 3). Weeks 1-2 = "how computers & the OS work." Week 3 = "how security people think." Today is the vocabulary: **CIA** (what we protect), **risk** (how we decide), and the **untrusted-input question** (the habit that prevents most bugs/breaches). Days 12-15 apply it (lab setup, Wireshark/Nmap, vuln scanning, Burp/secure coding). Day 16+ are attacks/defense.
- **Companion files:** student-guide.md · lab-guide.md · quiz.md · references.md · rubric.md · version-history.md

## 2. Teaching Guide (Four Context Questions)
**Why am I learning this?**
Because every security conversation — a breach report, a pentest finding, a control decision — uses this vocabulary. If you can't name *what* you're protecting (CIA) and *how* you decide what matters (risk), you can't reason about security at all. And the untrusted-input question is the single habit that prevents the majority of real-world flaws.

**How does this connect to the previous lessons?**
- Days 6-8: permissions decide "who may do what." CIA names *why* that matters — confidentiality (who sees it), integrity (who changes it), availability (who can use it).
- Day 9 seed: a script that reads input can be fooled. Today we name that: **all input is untrusted** until proven otherwise. This is the root of injection, XSS, path traversal — the attacks of Module 4.
- Week 1-2 were "how the machine works." Week 3 is "how to judge whether it's safe." Same restaurant — now we ask if it's *secure*.

**Where will I use this in cybersecurity?**
Everywhere: threat modeling, pentest reporting (map each finding to CIA + risk), IR (what's impacted), secure coding (untrusted input), architecture review, compliance. It's the skeleton of the profession.

**What problem will I be able to solve after today's class?**
Look at any system or incident and say: *what CIA property is at risk, how bad is it (risk), and is any input being trusted that shouldn't be?* — the three questions a security pro asks automatically.

**Concept 1 — CIA: the three things we protect (first principles):**
Security exists to protect information and systems along three axes:
- **C — Confidentiality:** only the right people can *see* it (secrecy). Broken by a data leak.
- **I — Integrity:** only the right people can *change* it, and changes aren't silent (correctness). Broken by tampering/ransomware-encrypt.
- **A — Availability:** the right people can *use* it when needed. Broken by a DoS/outage.
Mnemonic: think of a sealed envelope (C), an unaltered signature (I), and an open door (A). Every control protects at least one.

**Concept 2 — Risk: how we decide what matters (first principles):**
We can't protect everything equally. **Risk = Threat × Vulnerability × Impact** (roughly): a real danger (threat) meeting a weakness (vulnerability) causing harm (impact). We spend effort where risk is highest. "Accept / mitigate / transfer / avoid" are the four responses.
- Threat = who/what could harm you. Vulnerability = the weakness. Impact = how bad if it happens.
- Example: a public login page (exposed) with no rate-limit (vulnerability) enables password spraying (threat) → account takeover (impact). Risk is high → mitigate (rate-limit/MFA).

**Concept 3 — The untrusted-input question (THE habit):**
> *"Is any data this system acts on coming from somewhere it shouldn't automatically trust — and is the system checking it?"*

This one question prevents most flaws: SQL injection (query built from untrusted input), XSS (page built from untrusted input), path traversal (filename from untrusted input), buffer overflow (Day 2), and the Day 9 seed (a script trusting file content). **Rule of thumb: treat all input as guilty until validated.** This is the spine of Module 4 (web attacks) and Day 15 (secure coding).

**Concept 4 — Mapping the week so far to CIA (connection exercise):**
- Day 6-8 permissions → enforce **C** (file not world-readable) and **I** (not world-writable); availability is the OS staying up.
- Day 9 `PermissionError` → the OS enforcing **C/I** on a Process.
- Weak `777` / "Everyone: Full Control" → **C and I broken** (anyone reads/writes).
This shows CIA isn't new vocabulary bolted on — it's the *why* behind everything already taught.

**Concept 5 — Attack vs defense, always (course rule):**
For every concept, show both sides: a control (defense) and the attack it stops. CIA/risk are the scoring system both sides play by.

**Concept 6 — Security bridge:**
- CIA gives you the *language* to say what's wrong ("this breach is a confidentiality failure").
- Risk gives you the *priority* ("fix the high-impact, exposed one first").
- Untrusted input gives you the *habit* ("check it before you use it").
- Together: a pro can look at anything and produce a reasoned judgment. That's the leap from "I used a tool" to "I think like security."

## 2b. Topic Connections & Examples (the "why it links" layer)
**Connection A — CIA over the whole course:** the page-load diagram (Week 1) — TLS protects **C** in transit; the OS signature diagram (Week 2) — permissions protect **C/I**. CIA is the lens you put on both.

**Connection B — Forward links:**
- → **Day 12 (Lab Setup & Methodology):** a safe range to *test* CIA/risk hands-on.
- → **Day 13 (Wireshark/Nmap):** observe traffic (C in transit) and open ports (A exposure / vuln).
- → **Day 14 (Vuln Scanning):** find vulnerabilities = the "V" in risk; triage by impact.
- → **Day 15 (Burp + Secure Coding):** untrusted input made visible + how to code against it.
- → **Day 16-19:** every attack maps to a CIA break; every defense to a CIA protect.

**Connection C — Backward link:** Days 6-9 permissions were the *mechanism*; CIA is the *goal* those mechanisms serve. The untrusted-input seed (Day 9) becomes the named habit today.

**Concrete Examples:**
- *CIA on a bank app:* confidentiality = only you see your balance; integrity = only you can move money; availability = the app is up at 9am. A breach hits C; a wiring bug hits I; an outage hits A.
- *Risk on a sticky note:* threat = anyone walking by; vulnerability = password written down; impact = account takeover. Mitigate = password manager (remove vulnerability).
- *Untrusted input:* a login form field is untrusted input — if the app builds a DB query from it without checking, that's SQL injection (Day 15/16). The one question ("do we trust this?") stops it.
- *Bridge line (say twice):* "CIA is what we protect, risk is what we fix first, and 'is this input trusted?' is the habit that prevents most of the mess."

## 3. Timing Guide (90 min)
| Segment | Time | Activity |
|---------|------|----------|
| A. Learning Objectives | 3 min | State the 3 goals |
| B. Learning Journey Check | 4 min | "Weeks 1-2: how it works. Week 3: is it safe? Today: the vocabulary." |
| C. Review | 3 min | Recall Day 9 untrusted-input seed + Days 6-8 permission purpose |
| D. Soft-Skills Moment | 12 min | Reading a breach headline through CIA + risk; always ask "what's the untrusted input?" |
| E. New Concepts | 30 min | CIA, risk, untrusted-input question, mapping week→CIA, attack+defense |
| F. Diagram & Real-World | 10 min | CIA triangle; risk formula; breach mapped to CIA |
| G. Live Demo / Lab | 20 min | classify 3 mini-scenarios into CIA + spot the untrusted input (paper/whiteboard, no tool) |
| H. Quiz / Assignment | 8 min | Exit quiz + preview Day 12 |
| **Total** | **90** | |

## 4. Analogies
**REUSE the one unified metaphor where it helps, but CIA/risk get their own simple pictures (don't force the restaurant):**
- CIA = a **sealed envelope (C) + signed paper (I) + open door (A)**. Three protections, any system needs some of each.
- Risk = a **scale**: threat weight × vulnerability gap × impact size → where the pan tips, you act.
- Untrusted input = a **stranger's note**: you don't follow its instructions until you've checked who wrote it and what it says.

## 5. Common Misconceptions
- *"CIA = the CIA (agency)."* No — Confidentiality, Integrity, Availability. (Amusing, but clarify once.)
- *"Availability isn't security."* It is — a DoS that takes a hospital offline is a security failure (and people can be harmed).
- *"Risk means 'danger'."* Risk is a *calculated* measure (threat × vuln × impact) that drives *prioritization*, not just fear.
- *"Input validation is only a web thing."* It's everywhere — files, network packets, env vars, API calls. Any data the system acts on.
- *"If it's internal, it's trusted."* Assume breach — internal input is often abused (lateral movement). Validate anyway.

## 6. Demo Script
**Demo 1 — CIA on a familiar app (8 min):** take "your email account." C = only you read mail; I = only you send as you; A = you can log in. Ask: which breaks if (a) password leaks, (b) someone forges your address, (c) server is down? Map each to a letter.
**Demo 2 — Risk in one line (6 min):** sticky-note password → threat (walk-by) × vuln (written down) × impact (takeover) = high → mitigate (password manager). Show the 4 responses.
**Demo 3 — The untrusted-input question live (6 min):** show a pseudo login: `query = "SELECT * FROM users WHERE name='" + field + "'"`. Ask "where's the untrusted input?" → the field. "What if it's `' OR '1'='1`?" → that's SQL injection (Day 15/16). The one question catches it.

## 7. Lab Solution (answers instructors should see)
- Task 1: classified 3 scenarios into C/I/A correctly (e.g., leak=C, tamper=I, outage=A).
- Task 2: for each, named a plausible threat/vuln/impact and a response (mitigate/transfer/avoid/accept).
- Task 3: identified the untrusted input in a given snippet (e.g., a form field, a filename, a query param) and stated the check (validate/allow-list/escape).
- Concept Q: stated CIA = what we protect; risk = how we prioritize; untrusted-input question = the habit that prevents most flaws.

## 8. FAQ
- **Q: Do I memorize CIA letters?** Understand them — you'll use them to *classify* everything from Day 12 on.
- **Q: Is risk just guessing?** It's structured judgment (threat × vuln × impact); numbers optional, reasoning required.
- **Q: Why lead with thinking, not tools?** Because tools without judgment produce noise (a scanner with 10,000 findings and no triage). Week 3 = the judgment; Weeks 4+ = the tools that exercise it.
- **Q: Does untrusted input apply to the OS stuff from Week 2?** Yes — a script reading an untrusted file (Day 9 seed) is exactly this; validate before acting.

## 9. Examples Bank (reusable across cohorts)
- CIA = sealed envelope (C) + signed paper (I) + open door (A).
- Risk = scale: threat × vuln × impact; responses = accept/mitigate/transfer/avoid.
- Untrusted input = stranger's note — don't follow it unchecked.
- Bank app maps C/I/A cleanly; breach = C, wiring bug = I, outage = A.
- Bridge line: "CIA = what we protect; risk = what we fix first; 'is this input trusted?' = the habit."
- SQL injection = untrusted input built into a query without checking (foreshadow Day 15/16).

> **Assessment:** see rubric.md (separate file, per the 7-file standard).
