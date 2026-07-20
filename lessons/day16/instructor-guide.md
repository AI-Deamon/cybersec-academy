# Day 16 — Instructor Guide (PRIVATE — source of truth)
**Course:** Practical Cyber Security: From First Principles
**Module 4 — Applying Cybersecurity in the Real World · Day 16 of 20 · Week 4, Session 1**
**Standard:** Academy Design Document v1.3 (Complete) · Phase 3 lesson-doc standard · Career-Connection/So-What standard (ADD §17)
**Version:** 1.0

---

## 1. Lesson Overview
- **Title:** Web Security Fundamentals — Untrusted Input, OWASP, Attack + Defense
- **Duration:** 90 minutes
- **Type:** Application — the first "real attack surface" day; opens Week 4
- **Position in journey:** Day 16 of 20, first day of Week 4 (Module 4 — applying it all). It **opens with the Burp/DevTools + secure-coding intro** moved here from Day 15 (where interception tools belong with web-app attack+defense). The untrusted-input seed from Day 9 and the named habit from Day 11 now pay off: SQL injection / XSS are *what happens when input is trusted*. Then OWASP Top 10 attack + defense. Days 17-20 apply the same attack+defend pattern to network, cloud, IR, capstone.
- **Companion files:** student-guide.md · lab-guide.md · quiz.md · references.md · rubric.md · version-history.md

## 2. Teaching Guide (Four Context Questions)
**Why am I learning this?**
Because the web is the most common attack surface, and nearly every web breach traces back to one root cause you already know: **trusted input**. Today you see that root cause become a real exploit (SQLi/XSS), watch it through Burp, and learn the defensive fix (parameterized queries / output encoding). This is where "think like a pro" turns into "see like an attacker, build like a defender."

**How does this connect to the previous lessons?**
- **Day 9 seed + Day 11 named habit → Today:** "is this input trusted?" is THE question. SQLi = untrusted input built into a DB query without checking; XSS = untrusted input echoed into a page without encoding. Today we *demonstrate* both and *fix* both.
- **Day 5 HTTP/TLS + Day 13 Wireshark:** the request/response model and the ability to watch traffic make Burp's interception meaningful. HTTPS means we intercept at the app (Burp as proxy), not the wire.
- **Day 11 CIA:** injection breaks **I** (data changed/accessed unauthorized) and often **C**; XSS can lead to session/C theft. Each vuln maps to a CIA letter.
- **Day 12 range:** Juice Shop runs *in your range*; you may attack it because it's authorized + isolated.

**Where will I use this in cybersecurity?**
AppSec, pentesting, secure code review, bug bounty, DevSecOps, SOC (detecting web attacks). OWASP Top 10 is the industry's shared vocabulary for web risk.

**What problem will I be able to solve after today's class?**
Explain how SQLi and XSS happen from untrusted input, demonstrate one in the range (Juice Shop), and state the defensive fix. Read the OWASP Top 10 well enough to map any web finding to a category + CIA break + defense.

**Concept 1 — Untrusted input, made concrete (the payoff of Days 9/11).**
Every value a web app receives from a user (form field, URL param, cookie, header) is **untrusted**. If the app uses that value *without validating/encoding/parameterizing*, it lets the user's data become *instructions*. Two classic results:
- **SQL Injection (SQLi):** untrusted input is concatenated into a SQL query → the user's text becomes SQL commands (e.g., `' OR '1'='1`). Breaks **I** (and **C** via data theft). Fix: **parameterized queries** (the DB distinguishes code from data) + input validation.
- **Cross-Site Scripting (XSS):** untrusted input is echoed into a page without encoding → the user's text becomes HTML/JS that runs in a victim's browser. Breaks **C** (session theft) and can lead to **I**. Fix: **output encoding** + Content-Security-Policy.

**Concept 2 — Burp & DevTools: see (and safely change) the request (tool, after concept).**
- **DevTools Network** (Day 4 intro) shows the request/response your browser sent.
- **Burp Suite** sits as a **proxy** between browser and server; it lets you **intercept and replay/modify** a request — the clean way to test "what happens if this parameter is malicious?" In the range, you use it to *demonstrate* SQLi/XSS, not to attack real sites.
This is Wireshark's application-layer cousin: Wireshark = all packets; Burp = HTTP to one app, with edit power.

**Concept 3 — OWASP Top 10 as a map (not a memorization list).**
The OWASP Top 10 is the industry's shared list of the most critical web risks. Today we frame it as a **map**: each item = an untrusted-input / misconfiguration class, each maps to CIA, each has a defense. We cover the headline ones (Injection, Broken Access Control, XSS, Security Misconfiguration, etc.) at a level where students can *categorize* a finding, not recite CVEs.

**Concept 4 — Attack + defense, always (the standing rule, now with teeth).**
For SQLi: attack = inject `' OR '1'='1`; defense = parameterized query. For XSS: attack = `<script>`; defense = encode output. Every OWASP item gets both sides. Students leave able to say not just "this is broken" but "here's the fix."

**Concept 5 — The secure-coding intro (answers Day 15's deferred "rewrite securely").**
Show the *vulnerable* snippet (string-built query) and the *secure* one (parameterized / prepared statement), and the *vulnerable* echo vs *encoded* output. This is the practical payoff of "treat input as guilty until validated" — and it connects to DevSecOps (Day 18/20).

**Concept 6 — Security bridge.**
- Untrusted input is the **single root cause** behind most of the OWASP list — so the one Day 11 habit prevents most of it. That's the through-line of the whole course.
- Seeing it exploited (in range) + seeing the fix = the moment "concept before tool" clicks into "I can do this."

## 2b. Topic Connections & Examples (the "why it links" layer)
**Connection A — The untrusted-input spine:** Day 9 planted "a script trusting file content"; Day 11 named "treat all input as guilty"; Day 14's scan findings were often untrusted-input bugs; **Today** they become *exploits + fixes*. One idea, four appearances, now resolved.

**Connection B — Forward links:**
- → **Day 17 (Network Security):** attack+defense on the wire (same pattern, different layer).
- → **Day 18 (Cloud + Secure Coding):** misconfig + the secure-coding fix in production/cloud.
- → **Day 19 (IR/Monitoring):** detecting web attacks (WAF logs, SQLi signatures).
- → **Day 20 (Capstone):** integrate web + network + cloud findings into one report.

**Connection C — Backward link:** Day 5 (HTTP request/response), Day 11 (CIA + untrusted input), Day 12 (range authorization), Day 13 (Burp's wire cousin, Wireshark), Day 15 (consolidation — now we add the app-layer attack). 

**Concrete Examples:**
- *SQLi on Juice Shop:* a login field accepts `' OR '1'='1` → bypasses auth (I/C break). Fix: parameterized query.
- *XSS on Juice Shop:* a review field accepts `<script>` → runs in another user's browser (C break). Fix: output encoding.
- *Burp:* intercept the login request, change the param to the payload, replay → see the bypass. In range only.
- *Bridge line (say twice):* "Every web breach you've read about started with trusted input. Today you cause one — safely, in your range — and you fix it. That's the whole game."

## 3. Timing Guide (90 min)
| Segment | Time | Activity |
|---------|------|----------|
| A. Learning Objectives | 3 min | State the 3 goals |
| B. Learning Journey Check | 4 min | "Day 11 named the untrusted-input habit; today it becomes an exploit — and a fix." |
| C. Review | 3 min | Recall Day 11 untrusted input + Day 5 HTTP + Day 13 Burp/Wireshark distinction |
| D. Soft-Skills Moment | 12 min | Reading code for trust boundaries; always ask "where does this value come from, and is it checked?" |
| E. New Concepts | 30 min | untrusted input→SQLi/XSS, Burp/DevTools (after concept), OWASP map, attack+defense, secure-coding fix |
| F. Diagram & Real-World | 10 min | untrusted-input → exploit chain; OWASP map w/ CIA; vulnerable vs secure snippet |
| G. Live Demo / Lab | 20 min | in-range Juice Shop: demonstrate SQLi login bypass + XSS; show parameterized-query fix |
| H. Quiz / Assignment | 8 min | Exit quiz + preview Day 17 |
| **Total** | **90** | |

## 4. Analogies
**REUSE the Day 11 "stranger's note" picture for untrusted input; add one for the fix:**
- Untrusted input = a **note from a stranger** handed to the chef; if the chef reads it as *recipe instructions* (SQLi) or *menu text to post* (XSS), the stranger controls the kitchen. Fix = the chef treats the note as *data only* (parameterized / encoded), never as instructions.
- OWASP Top 10 = a **map of the 10 most common kitchen accidents** — know them, and you prevent most disasters.
- (Restaurant metaphor, Week 2: the stranger's note is an order slip that bypasses the Manager's checks — exactly the OS-permission lesson, now at the app layer.)

## 5. Common Misconceptions
- *"SQLi only matters for login forms."* It affects any query built from untrusted input (search, comments, API params).
- *"HTTPS prevents SQLi/XSS."* TLS protects data *in transit* (C on the wire, Day 13); it does nothing about a vulnerable query or echoed input. Different layer.
- *"Encoding and parameterizing are the same."* Parameterization separates code/data in the DB query (SQLi fix); encoding separates text/markup in the page (XSS fix). Related mindset, different mechanism.
- *"Burp is for hacking."* It's a *testing* proxy — in your range it demonstrates flaws so you can fix them; using it on unauthorized sites is illegal (Day 12).
- *"Memorize the OWASP Top 10."* Understand the *pattern* (untrusted input / misconfig → CIA break → defense); the list is a map, not a recitation.

## 6. Demo Script
**Demo 1 — Untrusted input → SQLi (8 min):** show the vulnerable query `query = "SELECT * FROM users WHERE name='" + field + "'"`; inject `' OR '1'='1`; show auth bypass. Then show the **parameterized** version and explain code/data separation. CIA: I/C.
**Demo 2 — XSS (5 min):** show untrusted input echoed into a page → `<script>` runs; show **output encoding** as the fix. CIA: C.
**Demo 3 — Burp in the range (7 min):** proxy the browser through Burp to Juice Shop; intercept the login request; modify the param to the payload; replay → demonstrate the bypass safely. Emphasize: range only.

## 7. Lab Solution (answers instructors should see)
- Task 1: identified an untrusted input point in Juice Shop (e.g., login/comment field); explained it's user-controlled.
- Task 2: demonstrated SQLi login bypass in range (e.g., `' OR '1'='1`) — or clearly described it if the lab image differs; stated the parameterized-query fix.
- Task 3: demonstrated/stated XSS (script in a field) + the output-encoding fix.
- Concept Q: stated untrusted input is the root cause; SQLi→parameterize, XSS→encode; Burp used in range only; OWASP = a map of web risks.

## 8. FAQ
- **Q: Will I break Juice Shop?** No — it's purposely vulnerable *by design* in your range; that's the point. Reset it after (Day 12 restore step).
- **Q: Do I need to install Burp?** It's in the ADD tool list; the instructor provisions it in the range. DevTools (browser) is built in.
- **Q: Is this illegal?** Only if done outside your authorized range. Today is 100% in-range (Day 12).
- **Q: How is this different from Day 13's Wireshark?** Wireshark = all packets on the wire (network layer); Burp = HTTP to one app, with edit/replay (application layer). Different layers, different jobs.

## 9. Examples Bank (reusable across cohorts)
- Untrusted input = stranger's note the chef must treat as data, not instructions.
- SQLi → parameterize (code/data separation); XSS → encode output.
- HTTPS ≠ injection protection (different layer — Day 13 C-in-transit vs app-layer C/I).
- Burp = app-layer proxy in range; Wireshark = wire-level.
- OWASP Top 10 = map of the 10 common kitchen accidents.
- Bridge line: "Every web breach started with trusted input. Today you cause one — safely — and fix it."

> **Assessment:** see rubric.md (separate file, per the 7-file standard).
> **Career note (ADD §17):** AppSec Engineer, Pentester, Secure-Code Reviewer, Bug-Bounty, DevSecOps. The four "So What" questions close the student guide.
