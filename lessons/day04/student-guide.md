# Day 4 — Student Guide
**Course:** Practical Cyber Security: From First Principles · Module 1 · Day 4 of 20

---

## Why this matters
Today everything from Days 1–3 *pays off*. When you type a URL and a page appears, that's ethics + bits + a program + a network + the rules (TCP/DNS) all working together. This is the foundation for web security, network security, and incident response — and it's exactly the story your Week 1 assignment asks you to tell.

## How today connects (keep this in mind)
- **Yesterday → Today:** Day 3 gave you raw packets with addresses. Today you learn the *rules* that turn those packets into a web page: a handshake to start, names instead of numbers (DNS), and an encrypted envelope (TLS).
- **Forward:** Day 5 = Week 1 reinforcement/assignment (explain this page load + observe DNS/HTTPS via DevTools; Wireshark optional) · Day 13 (watch the handshake in Wireshark) · Day 15 (alter the request with Burp) · Day 16–17 (DNS spoofing, MITM, port scan) · Day 19 (weird DNS = incident).
- **Ethics:** we only resolve/scan targets we're allowed to (Day 1 rule).

---

## The big ideas

### 1. Two ways to talk — TCP vs UDP
- **TCP** = reliable, connection-oriented. A **three-way handshake** agrees to talk first; packets are numbered and re-sent if lost; order guaranteed. Like a **phone call** (dial → answer → talk → hang up).
- **UDP** = connectionless, "fire and forget." No handshake, no guarantees — fast, but packets can drop. Used for DNS, video/voice, gaming (speed > perfection).

### 2. The three-way handshake (TCP)
1. **SYN** — "Hello, can we talk?"
2. **SYN-ACK** — "Yes, and I hear you. Can we?"
3. **ACK** — "Yes, let's go." → connection open, data flows.

### 3. Ports = service windows (from Day 3)
Logical numbers identifying a service: **80** = HTTP (unencrypted web), **443** = HTTPS (encrypted web), **53** = DNS, **22** = SSH. The handshake targets a port.

### 4. DNS = the address book
You remember `example.com`; the machine needs `93.184.216.34`. **DNS** translates the name → IP (your computer asks a resolver, which asks up the chain). Like looking up a contact to get their number.

### 5. How a web page loads (the 7 steps)
1. You type `example.com` and press Enter.
2. Browser asks **DNS** → `93.184.216.34`.
3. Browser opens **TCP** to that IP on **port 443** — three-way handshake.
4. Browser sends an **HTTP GET** *inside the TLS-encrypted channel*.
5. Server replies with **HTML** (encrypted in transit).
6. Browser decrypts, parses, fetches images/CSS/JS.
7. Page rendered.
- **TLS bridge:** steps 4–5 are encrypted — eavesdroppers see *where* you went, not *what* you sent. You'll observe this in Friday's assignment.

### 6. Where it breaks (security bridge)
- **DNS lies** (spoofing) → you reach an impostor.
- **Unencrypted HTTP** → anyone on the path reads your data.
- **Open ports** → exposed services = attack surface.

> **Signature diagram:** the 7-step page load above is the *signature diagram* of the course. You'll see the **same picture** on Day 13 (as captured packets), Day 16 (where it breaks), and Day 19 (where it's anomalous). Recognize it — it's your friend all term.

---

## Worksheet (fill in during class)
1. TCP is ______ and uses a ______ handshake. UDP is ______ ("fire and forget").
2. The three handshake steps are: ______, ______, ______.
3. DNS turns a ______ into an ______.
4. Port 443 = ______ (encrypted web); port 53 = ______; port 22 = ______.
5. In step 4 of the page load, the request travels inside a ______ (encrypted) channel.
6. Name one way the page-load can be attacked: ______.

## Homework (due Day 5 — bring to the assignment workshop)
Write the **7-step story of loading `example.com`** in your own words (use the worksheet). In step 2, write the actual IP you get from `nslookup example.com`. This is the backbone of Friday's assignment workshop.

**Lab (no Wireshark today):** `ping` a target, `nslookup`/`dig` a domain, and open browser **DevTools → Network** to watch a page's requests load. Wireshark is introduced on **Day 13** — for now, the browser already shows you the concept.

*(Lab steps are in lab-guide.md. Quiz is in quiz.md. Reference sheet is in references.md.)*

---

## PPT Outline (blueprint for Phase 4)
*Phase 4 turns this into the actual deck. Every deck opens with "Why are we learning this?" Full speaker notes live in instructor-guide.md.*

**Slide 1 — Title:** "Day 4: TCP/UDP, DNS & How a Web Page Loads" · Academy logo · course name.
**Slide 2 — Why are we learning this?** (required): the payoff of Days 1–3; where used (web/net sec, IR, Wireshark). Diagram: the 7-step load condensed.
**Slide 3 — Learning Journey Check:** "Yesterday: raw packets. Today: the rules that make a page. Tomorrow: Friday integration."
**Slide 4 — Two ways to talk:** TCP (phone call) vs UDP (shout across the room). Diagram: reliable vs fire-and-forget.
**Slide 5 — TCP three-way handshake:** SYN → SYN-ACK → ACK; FIN = hang up. Diagram: phone call.
**Slide 6 — Ports:** service windows (80/443/53/22). Diagram: building with labelled flats.
**Slide 7 — DNS:** name → IP; the directory. Diagram: lookup chain.
**Slide 8 — The 7-step page load:** the big diagram (type → DNS → handshake → GET → HTML → render). Diagram: **use the signature diagram** (`diagrams/page-load-signature.md`) — keep it identical everywhere.
**Slide 9 — TLS bridge:** steps 4–5 encrypted; you'll see it in DevTools today / Wireshark Day 13. Diagram: sealed envelope.
**Slide 10 — Soft-Skills Moment:** reading a trace; ask "is this encrypted, and do I trust the name?"
**Slide 11 — How Today Connects:** integrate D1–D4; this is the SIGNATURE diagram (recurs D5/D13/D16/D19); forward links. Diagram: central "page load," arrows radiating.
**Slide 12 — Curiosity Question (close):** "If DNS can be tricked into giving the wrong address, how do you know the site is really who it claims?" → "Certificates + TLS — you'll see them Friday and in Web Security (Day 16)."
**Slide 13 — Lab Preview & Quiz:** ping, nslookup/dig, browser DevTools Network tab; then the exit quiz. (No Wireshark today — that's Day 13.)
