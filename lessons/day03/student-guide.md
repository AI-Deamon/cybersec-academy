# Day 3 — Student Guide
**Course:** Practical Cyber Security: From First Principles · Module 1 · Day 3 of 20

---

## Why this matters
Almost every attack travels across a network. To understand phishing, man-in-the-middle, scanning, or ransomware spreading, you first need to know how two machines find and talk to each other.

## How today connects (keep this in mind)
- **Yesterday → Today:** Day 2 = one machine running a program in its own memory. Today = connecting machines so programs *talk across* them. We extend the Restaurant analogy: now there are many kitchens, passing orders to each other.
- **Forward:** Day 4 (the conversation rules: TCP, ports, DNS) · **Day 5 = Week 1 portfolio assignment** (seals the "envelope" — observe HTTPS/TLS in DevTools; Wireshark optional) · Day 13 (Wireshark/Nmap let you *see* these packets) · Day 16–17 (eavesdropping, MITM, DoS become real attacks) · Day 19 (spotting bad "letters" in IR).
- **Ethics:** we only ping/trace our own lab and allowed targets (Day 1 rule).

---

## The big ideas

### 1. What a network is
A **network** = two or more devices connected so they can exchange data. Data isn't sent as one blob — it's chopped into small labeled chunks called **packets**, each addressed to where it's going (like letters in the post).

### 2. Addresses — who is talking to whom
- **IP address** = a machine's network "street address" (e.g., `192.168.1.10`).
- **MAC address** = the device's permanent factory ID on the local wire (like a passport — used only on the local segment).
- **Port** = which "service window" on that machine — e.g., 80 for web, 22 for remote access (like a flat number at the address).

### 3. The postal system (our extended analogy)
| Real thing | Postal role |
|-----------|-------------|
| Network | a food court of many kitchens |
| IP address | the kitchen's street address |
| MAC address | the kitchen's ID badge (local only) |
| Port | which service window (web / remote) |
| Packet | an order ticket with "from / to" written on it |
| Router | the runner / post office that forwards by address |

### 4. Why this matters to security — three failures
When data travels, three things can go wrong:
1. **Eavesdropping** — someone reads the letter in transit (sniffing). Postcards (HTTP) vs sealed envelopes (HTTPS).
2. **Impersonation / MITM** — someone pretends to be the destination or sender (a fake runner swaps tickets).
3. **Disruption (DoS)** — someone floods the system so letters can't get through.

We'll exploit and defend these in Days 13, 16–17, and 19.

---

## Worksheet (fill in during class)
1. A network is two or more ______ connected to exchange data.
2. Data is sent as small addressed chunks called ______.
3. IP address = the machine's ______ (street address / serial number).
4. MAC address = the device's ______ (street address / factory ID on the local wire).
5. Port 80 is typically the ______ service; port 22 is ______.
6. Name the three network failures: ______, ______, ______.
7. HTTPS hides the *contents* of a letter, but does it hide the destination IP? Yes / No — why? ___________________.

## Homework (due Day 4)
1. Run `ipconfig` (Windows) or `ip a` (Linux/Mac) on your machine. Write down your IP address and MAC address.
2. `ping` your home router (usually `192.168.1.1` or `192.168.0.1`) and paste 2 lines of the output. What do the times tell you?
3. In one paragraph, explain the postal analogy to a friend: what is the letter, the address, the post office, and the envelope-sealing (foreshadow TLS)?

*(Lab steps are in lab-guide.md. Quiz is in quiz.md. Reference sheet is in references.md.)*

---

## PPT Outline (blueprint for Phase 4)
*Phase 4 turns this into the actual deck. Every deck opens with "Why are we learning this?" Full speaker notes live in instructor-guide.md.*

**Slide 1 — Title:** "Day 3: What Is a Network?" · Academy logo · course name.
**Slide 2 — Why are we learning this?** (required): Why it matters (most attacks cross a network) · Where used (netsec, pentest, SOC, IR) · Which careers (network security, SOC analyst, pentester). Diagram: shield + network nodes.
**Slide 3 — Learning Journey Check:** "Yesterday: one machine. Today: machines talking. Tomorrow: the conversation rules."
**Slide 4 — What is a network:** devices exchanging data; packets = addressed chunks. Diagram: two computers + arrows.
**Slide 5 — Addresses:** IP (street address), MAC (ID badge), Port (service window). Diagram: building with flats.
**Slide 6 — Postal system analogy:** letter=packet, post office=router, address=IP, badge=MAC, flat=port. Diagram: postal flow.
**Slide 7 — Packet & header:** a ticket with from/to written on it. Diagram: packet anatomy.
**Slide 8 — Three network failures:** eavesdropping / impersonation(MITM) / disruption(DoS). Diagram: where each happens on the postal map.
**Slide 9 — Soft-Skills Moment:** reading network diagrams; always ask "who can see this?"
**Slide 10 — How Today Connects:** extend Restaurant→food court; forward links D4/D5/D13/D16-17/D19. Diagram: central "network," arrows radiating.
**Slide 11 — Curiosity Question (close):** "If every packet has a 'to' address written on it, who on the path can read where it's going — and what stops them reading what's inside?" → "We'll seal the envelope in the Week 1 assignment (Day 5), where you'll watch HTTPS/TLS in Wireshark."
**Slide 12 — Lab Preview & Quiz:** find your IP/MAC, ping, traceroute; then the exit quiz.
