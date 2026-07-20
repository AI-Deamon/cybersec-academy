# Day 4 — Instructor Guide (PRIVATE — source of truth)
**Course:** Practical Cyber Security: From First Principles
**Module 1 — Building the Foundation · Day 4 of 20**
**Standard:** Academy Design Document v1.0/v1.2 (Approved) · Phase 3 lesson-doc standard
**Version:** 1.0

---

## 1. Lesson Overview
- **Title:** TCP/UDP, DNS, and How a Web Page Loads
- **Duration:** 90 minutes
- **Type:** Foundation — the "conversation rules" that turn Day 3's raw packets into a working web page
- **Position in journey:** Day 4 of 20. Days 1-3 built the layers (ethics/bits → program → network). Today we add the rules that make those layers *produce* something a human uses: a web page. This is the last new-concept day of Week 1; Day 5 is the reinforcement/assignment session.
- **Week cadence (official):** the course runs four 5-session weeks (Mon–Fri). Days 1–4 teach new concepts; Day 5 is a reinforcement session (review + assignment briefing + guided planning). The Week 1 assignment asks students to explain exactly today's page-load story. See ADD §12.
- **Companion files:** student-guide.md · lab-guide.md · quiz.md · references.md · rubric.md · version-history.md

## 2. Teaching Guide (Four Context Questions)
**Why am I learning this?**
Because this is the moment everything before today *pays off*. When you type a URL and a page appears, that's ethics (you're authorized), bits (the response is bytes), a program (your browser), a network (packets travel), and TCP/DNS (the rules) all working together. Understanding it is the foundation for web security, network security, and incident response.

**How does this connect to the previous lessons?**
- Day 1: the page and its request are just bytes.
- Day 2: the browser is a process using CPU/RAM/OS.
- Day 3: packets, IP/MAC/port carry raw data between machines.
- Today: TCP gives those packets order and reliability, DNS gives them *names*, and together they produce the page.

**Where will I use this in cybersecurity?**
Web security (Day 16), network security / MITM (Day 17), Wireshark traffic analysis (Day 13), vulnerability scanning (Day 14), incident response (Day 19). Almost every attack rides on this conversation.

**What problem will I be able to solve after today's class?**
Explain, step by step, what happens when you type a URL — and name where things can go wrong (DNS lies, HTTP is unencrypted, ports left open).

**Concept 1 — Two ways to talk: TCP vs UDP (first principles):**
- **TCP** = a *reliable, connection-oriented* conversation. Before data flows, the two sides agree to talk (handshake); every packet is numbered and re-sent if lost; order is guaranteed. Like a **phone call**: you dial, they answer, you both say hi, then you talk, then you hang up.
- **UDP** = *connectionless, "fire and forget."* No handshake, no guarantees — just send the data and hope. Faster, but packets can be lost or arrive out of order. Used where speed matters more than perfection (DNS lookups, video/voice calls, gaming).

**Concept 2 — The three-way handshake (TCP):**
1. **SYN** — "Hello, can we talk?" (client → server)
2. **SYN-ACK** — "Yes, and I hear you. Can we talk?" (server → client)
3. **ACK** — "Yes, let's go." (client → server)
Now the connection exists and data flows. (Hang-up = FIN/FIN-ACK, like saying goodbye.)

**Concept 3 — Ports (service windows, from Day 3):**
A port is a logical number identifying a service on a machine. Today's useful ones: 80 = HTTP (web, unencrypted), 443 = HTTPS (web, encrypted), 53 = DNS, 22 = SSH (remote access). The TCP handshake targets a specific port.

**Concept 4 — DNS (the address book):**
Humans remember names (`example.com`); machines need numbers (IP). **DNS** translates the name into the IP. Roughly: your computer asks a resolver "what's the IP for example.com?", which asks up the chain (root → TLD → authoritative) until it gets the answer. Like looking up a contact in your phone to get their number.

**Concept 5 — The full page-load walkthrough (the payoff):**
1. You type `example.com` and press Enter.
2. Browser asks **DNS** to resolve `example.com` → `93.184.216.34`.
3. Browser opens a **TCP** connection to that IP on **port 443** (HTTPS) — three-way handshake.
4. Browser sends an **HTTP GET** request *inside the TLS-encrypted channel*.
5. Server processes it and sends back the **HTML** (encrypted in transit).
6. Browser decrypts, parses HTML, and fetches images/CSS/JS (more requests).
7. Page rendered and usable.
- **TLS bridge (one line):** steps 4–5 are encrypted by **HTTPS/TLS** — so eavesdroppers on the wire see *where* you went but not *what* you sent. Students observe this in the **Week 1 assignment** via browser DevTools (Wireshark is an optional bonus). (Full TLS detail is not a standalone lecture — it's covered by this bridge + the assignment observation.)

**Concept 6 — Security bridge (where it breaks):**
- **DNS lies (spoofing/poisoning):** if DNS returns the *wrong* IP, you connect to an impostor.
- **Unencrypted HTTP:** anyone on the path reads your data (Day 3 failure #1).
- **Open ports:** an exposed service is an attack surface (port scanning, Day 13/16).

## 2b. Topic Connections & Examples (the "why it links" layer)
**Connection A — The whole course so far, in one story:** Today's 7-step page load *is* the integration the Week 1 assignment asks for — and it is the **signature diagram** of the course (canonical copy: `diagrams/page-load-signature.md`). We introduce it here; it recurs on Day 5 (assignment story), Day 13 (packets on the wire), Day 16 (where it breaks), Day 19 (where it's anomalous). Plant this explicitly: "If you understand today's 7 steps, you've basically completed half of Friday's assignment — and you'll see this exact diagram three more times this course."

**Connection B — Forward links:**
- → **Day 5 (Week 1 assignment / reinforcement):** students explain this exact page load and *see* DNS + HTTPS in Wireshark.
- → **Day 13 (Wireshark/Nmap):** you'll *watch* the SYN/SYN-ACK/ACK and the DNS query on the wire.
- → **Day 15 (Burp):** you'll *alter* the HTTP request mid-flight.
- → **Day 16–17 (Web/Net security):** DNS spoofing, MITM on the handshake, port scanning, HTTP→HTTPS downgrade.
- → **Day 19 (IR):** a weird DNS answer or a handshake to an unknown IP is an incident signal.

**Connection C — Backward link:** Day 1's bytes are today's request/response; Day 2's browser process is what *performs* today's handshake; Day 3's packets are what the handshake is made of.

**Concrete Examples:**
- *Phone call = TCP:* dialing is SYN; "hello?" is SYN-ACK; "hi, it's me" is ACK; hanging up is FIN.
- *Postcard vs registered letter:* UDP = postcard (fast, might not arrive, anyone can read it); TCP = registered letter (acknowledged, ordered).
- *Phone book = DNS:* you know the name "Joe's Pizza," the book gives the number.
- *Real story:* a major 2018 attack used **DNS hijacking** to redirect corporate email — the name resolved to the attacker's server. That's Concept 4 failing.
- *Bridge line (say twice):* "Today the raw packets from Day 3 learn the rules — a handshake to start, names instead of numbers, and an encrypted envelope. That's a web page."

## 3. Timing Guide (90 min)
| Segment | Time | Activity |
|---------|------|----------|
| A. Learning Objectives | 3 min | State the 3 goals |
| B. Learning Journey Check | 4 min | "Yesterday: raw packets. Today: the rules that make a page. Tomorrow: Friday integration." |
| C. Review | 3 min | Recall Day 3: packet, IP, MAC, port |
| D. Soft-Skills Moment | 12 min | Reading a simple network trace; always ask "is this encrypted, and do I trust the name?" |
| E. New Concepts | 30 min | TCP/UDP, handshake, ports, DNS, 7-step load, TLS bridge, security bridge |
| F. Diagram & Real-World | 10 min | 7-step page-load diagram; DNS-hijack story |
| G. Live Demo / Lab | 20 min | nslookup/dig; browser DevTools Network (no Wireshark) |
| H. Quiz / Assignment | 8 min | Exit quiz + preview Friday's assignment |
| **Total** | **90** | |

## 4. Analogies
**EXTEND the one analogy (Restaurant + Postal + now Phone):**
- Network = food court of kitchens (Day 3).
- Packet = order ticket with from/to (Day 3).
- **TCP = a phone call to place the order:** dial (SYN) → "hello?" (SYN-ACK) → "hi, I'll have the soup" (ACK + order) → hang up (FIN). Reliable, ordered.
- **UDP = shouting the order across the food court:** fast, no confirmation, might not be heard.
- **DNS = the food court directory:** you know the stall's name, the directory gives its location/number.
- **Port = the specific counter** (web counter = 443, DNS counter = 53).
- **TLS = sealing the order in an envelope** so the runner can't read it (ties to Day 3's envelope).

## 5. Common Misconceptions
- *"TCP and UDP are different kinds of IP addresses."* No — they are two *transport protocols* that ride on top of IP.
- *"UDP is broken because it drops packets."* No — it's a deliberate trade-off: speed over guarantee, fine for video/voice.
- *"DNS is just one server."* No — it's a distributed hierarchy (resolver → root → TLD → authoritative).
- *"HTTPS hides the destination."* No — it encrypts the *content*; the IP (envelope address) is still visible to routers (Day 3).
- *"Port 443 means it's secure."* Mostly, but the *protocol* (TLS) is what secures it; a port number is just a label.
- *"The handshake is slow overhead."* It's three tiny packets — negligible; the reliability it buys is worth it.
- *"I need Wireshark to understand this."* No — `ping`, `nslookup`/`dig`, and browser DevTools show the concepts today; Wireshark is introduced on Day 13 once the concepts are solid.

## 6. Demo Script
**Demo 1 — DNS resolution (6 min):** `nslookup example.com` (or `dig example.com`). Point at the ANSWER section: name → IP. "This is the directory lookup."
**Demo 2 — DevTools Network (8 min):** open the browser DevTools → Network tab, load a site, show the list of **requests** (HTML, CSS, JS, images), the **status codes**, and the **timing**. Point at the first request: "this is step 4–6 happening live — no new tool to install, the browser shows it." (Note the lock/HTTPS indicator for the TLS bridge.)
**Demo 3 — TCP handshake (concept, 4 min):** on the DevTools "Timing" or via a simple diagram, show the connection setup before the first response. "The handshake (SYN/SYN-ACK/ACK) happened before this request — you'll *watch* it in Wireshark on Day 13, once the tool isn't new anymore."
**Why no Wireshark today:** Day 4 is concept-heavy (TCP/UDP/DNS/HTTP). Per our pedagogy — *teach the concept first, then introduce the tool that makes it visible* — Wireshark is deferred to **Day 13**, where students already understand what they're looking at. The Day 4 lab uses only `ping`, `nslookup`/`dig`, and browser DevTools (no install, no overwhelm). Wireshark appears as an **optional bonus** in the Week 1 assignment for motivated students.

## 7. Lab Solution (answers instructors should see)
- Task 1: ran `ping` to a target; saw replies (round-trip time).
- Task 2: ran `nslookup`/`dig`; reported the resolved IP for the chosen domain.
- Task 3: opened DevTools → Network, loaded a site, listed ≥2 requests (HTML, JS/CSS) and noted the first request's status (200) and that it was HTTPS (lock/TLS bridge).
- Concept Q: explained the difference between TCP (reliable, handshake) and UDP (connectionless), and named DNS as name→IP.

## 8. FAQ
- **Q: Do I need to memorize port numbers?** Just the common ones (80, 443, 53, 22). The rest you look up.
- **Q: Why does DNS use UDP?** A single small query/response; speed beats reliability here, and it retries if needed.
- **Q: What's a socket?** An IP + port pair — the "address + counter" that identifies one end of a connection. We'll keep it light.
- **Q: Is the TLS bridge enough, since Day 5 isn't a TLS lecture?** Yes — students see HTTPS in browser DevTools during the assignment (Wireshark is an optional bonus), and TLS is deepened in Web Security (Day 16). We intentionally avoid a standalone crypto lecture in Week 1.

## 9. Examples Bank (reusable across cohorts)
- Phone call = TCP handshake (SYN/SYN-ACK/ACK, FIN = hang up).
- Postcard (UDP) vs registered letter (TCP).
- Phone directory = DNS.
- 7-step page load (the integration story).
- DNS hijacking story (2018 corporate email redirect).
- Three failure points: DNS lies / HTTP unencrypted / open ports.
- Bridge line: "Raw packets learn the rules — handshake, names, encrypted envelope = a web page."

> **Assessment:** see rubric.md (separate file, per the 7-file standard).
