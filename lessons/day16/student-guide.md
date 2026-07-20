# Day 16 — Student Guide
**Course:** Practical Cyber Security: From First Principles · Module 4 · Day 16 of 20

---

## Why this matters
The web is the most common attack surface, and nearly every web breach traces to one root cause you already know: **trusted input**. Today that root cause becomes a real exploit (SQL injection, XSS), you watch it through Burp, and you learn the defensive fix (parameterized queries / output encoding). This is where "think like a pro" turns into "see like an attacker, build like a defender."

## How today connects (keep this in mind)
- **Day 9 seed + Day 11 habit → Today:** "is this input trusted?" is THE question. SQLi = untrusted input built into a DB query; XSS = untrusted input echoed into a page. Today we *demonstrate* both and *fix* both.
- **Day 5 HTTP/TLS + Day 13 Wireshark:** the request/response model and traffic-watching make Burp meaningful. HTTPS means we intercept at the app (Burp as proxy), not the wire.
- **Day 11 CIA:** injection breaks **I** (+**C**); XSS breaks **C**. Each vuln maps to a letter.
- **Day 12 range:** Juice Shop runs *in your range* — you may attack it because it's authorized + isolated.
- **Forward:** Day 17 (network) · Day 18 (cloud + secure coding) · Day 19 (IR) · Day 20 (capstone).
- **Ethics:** attack **only** the range's Juice Shop (Day 1/12).

---

## The big ideas

### 1. Untrusted input, made concrete (the payoff of Days 9/11)
Any value a web app gets from a user (form, URL param, cookie, header) is **untrusted**. If used *without* validating/encoding/parameterizing, the user's data becomes *instructions*:
- **SQL Injection (SQLi):** untrusted input concatenated into a SQL query → user text becomes SQL (e.g., `' OR '1'='1'`). Breaks **I** (+**C**). Fix: **parameterized queries** (DB separates code from data) + validation.
- **Cross-Site Scripting (XSS):** untrusted input echoed into a page without encoding → user text becomes JS in a victim's browser. Breaks **C**. Fix: **output encoding** + CSP.

### 2. Burp & DevTools — see (and safely change) the request
- **DevTools Network** (Day 4) shows the request your browser sent.
- **Burp Suite** is a **proxy** between browser and server; it lets you **intercept/replay/modify** a request — the clean way to test "what if this param is malicious?" In the range, you use it to *demonstrate* flaws, not attack real sites.
Burp = Wireshark's app-layer cousin (one app, with edit power).

### 3. OWASP Top 10 as a map
The industry's shared list of critical web risks. Treat it as a **map**: each item = an untrusted-input / misconfig class, each maps to CIA, each has a defense. Headline ones: Injection, Broken Access Control, XSS, Security Misconfiguration, etc. Learn to *categorize* a finding, not recite CVEs.

### 4. Attack + defense, always
SQLi: attack `' OR '1'='1` → defense parameterized query. XSS: attack `<script>` → defense encode output. Every OWASP item gets both sides.

### 5. The secure-coding fix (answers Day 15's "rewrite securely")
Vulnerable: `query = "SELECT * FROM users WHERE name='" + field + "'"`.
Secure: a **parameterized / prepared statement** — the DB never treats the user value as code.
Vulnerable echo vs **encoded** output — same mindset (treat input as data). This connects to DevSecOps (Day 18/20).

### 6. Security bridge
- Untrusted input is the **single root cause** behind most of the OWASP list — so the one Day 11 habit prevents most of it. The through-line of the whole course.
- Seeing it exploited (in range) + seeing the fix = "concept before tool" clicks into "I can do this."

---

## Worksheet (fill in during class)
1. Untrusted input = any value from a ______ the app acts on without checking.
2. SQLi happens when untrusted input is built into a ______ query; fix = ______ queries.
3. XSS happens when untrusted input is echoed without ______; fix = output ______.
4. HTTPS protects data in ______ (Day 13), NOT against SQLi/XSS (different layer).
5. Burp is a ______ between browser and server; used in the ______ only.
6. OWASP Top 10 is a ______ of common web risks, each mapping to ______.

## Homework (due Day 17)
For 3 OWASP categories (e.g., Injection, XSS, Broken Access Control), write one sentence attack + one sentence defense. Bring to Day 17.

*(Lab steps in lab-guide.md. Quiz in quiz.md. Reference sheet in references.md.)*

---

## The four "So What?" questions (ADD §17 standard)
1. **What did I learn?** That nearly every web breach starts with trusted input — SQLi and XSS are untrusted input used as instructions — and that each maps to a CIA break with a specific fix.
2. **What can I now do?** Demonstrate SQLi/XSS in the range (Juice Shop), explain the OWASP Top 10 as a map, and state the defensive fix (parameterize / encode).
3. **Where is this used professionally?** AppSec Engineers, Pentesters, Secure-Code Reviewers, Bug-Bounty hunters, and DevSecOps teams live in this layer daily.
4. **What am I building toward?** Day 17 (network attacks), Day 18 (cloud + secure coding in production), Day 19 (detecting web attacks), and the capstone — where web findings join network/cloud into one report.

---

## PPT Outline (blueprint for Phase 4)
**Slide 1 — Title:** "Day 16: Web Security Fundamentals — OWASP" · Academy logo.
**Slide 2 — Why are we learning this?** Web = top attack surface; root cause = trusted input. Diagram: lock + web.
**Slide 3 — Learning Journey Check:** "Day 11 named the untrusted-input habit; today it becomes an exploit — and a fix."
**Slide 4 — Untrusted input → SQLi:** stranger's note as data not instructions. Diagram: note→chef.
**Slide 5 — SQLi demo + fix:** vulnerable vs parameterized query. Diagram: code/data split.
**Slide 6 — XSS:** echoed input → script; fix = encode. Diagram: script in page.
**Slide 7 — Burp & DevTools:** proxy between browser/server, in range. Diagram: proxy.
**Slide 8 — OWASP Top 10 as a map:** categories → CIA → defense. Diagram: map.
**Slide 9 — Attack + defense:** SQLi/XSS both sides. Diagram: mirror.
**Slide 10 — Secure-coding fix:** rewrite vulnerable → secure (Day 15 deferred). Diagram: before/after.
**Slide 11 — Soft-Skills Moment:** "where does this value come from, is it checked?"
**Slide 12 — How Today Connects:** → D17 network → D18 cloud → D19 IR → D20 capstone. Diagram: hub.
**Slide 13 — Curiosity Question:** "If most breaches start with trusted input, what's the one habit that prevents most of them?" → treat all input as guilty until validated (Day 11).
**Slide 14 — Lab Preview & Quiz:** in-range Juice Shop SQLi/XSS; exit quiz.
