# Day 13 — Student Guide
**Course:** Practical Cyber Security: From First Principles · Module 3 · Day 13 of 20

---

## Why this matters
Everything you learned about networks (Day 3-4) and the OS (Week 2) is **invisible** until you can see it. Wireshark and Nmap are the two foundational recon tools: they turn "I think the network does X" into "I can see the network does X." That visibility is the first step of both attack (mapping) and defense (monitoring) — and today you use them *only inside the safe range* you built on Day 12.

## How today connects (keep this in mind)
- **Day 4 → Today (the deferral pays off):** on Day 4 we told the *story* of DNS, the TCP handshake, TLS, and HTTP — and we deliberately did **NOT** open Wireshark. You needed the concept first. Today you **capture that exact DNS query and TCP handshake on the wire.** This is the day we promised.
- **Day 11 CIA → Today:** Nmap probing open ports = probing **Availability** exposure (attack surface). Wireshark sniffing traffic = observing **Confidentiality in transit**. Inside the isolated range, real Impact = zero.
- **Day 12 range → Today:** every packet you capture and every port you scan is on *your own* target in the range. Authorization + isolation make it legal and safe.
- **Forward:** Day 14 (vuln scanning) · Day 15 (Burp) · Day 16 (web attacks) · Day 17 (network defense) · Day 19 (monitoring/IR).
- **Ethics:** scan/capture **only your range target**. Never a real host (Day 1/12).

---

## The big ideas

### 1. Wireshark — a microscope for the wire
A network is packets flying between computers. Wireshark captures and displays them so you can read: the DNS query, the TCP handshake, the TLS exchange, the HTTP request. It's the **Day 4 story made visible**. Reading packets = seeing confidentiality-in-transit and the protocols you were taught abstractly.

### 2. Nmap — "what's listening here?"
Every service (web, SSH, file share) listens on a **port**. Nmap probes a target and reports **open** (a service is listening) / closed / filtered ports. Open ports = the **attack surface** = availability exposure (the "V" in Day 11 risk).

### 3. Recon is the first step of BOTH sides
- **Defender:** "I scan my own network to find forgotten open ports and close them." (Reduce attack surface.)
- **Attacker:** "I scan the target to find an open port running old software." (Find a way in.)
Same command. Ethics (Day 1/12) decides the side; the range keeps you legal.

### 4. Confidentiality on the wire (CIA in action)
Without TLS, HTTP is readable by anyone on the path — a **confidentiality failure in transit**. That's exactly why Day 4 taught HTTPS. In the range you can demonstrate this safely (capture a plaintext HTTP request to your own target).

### 5. Scope discipline (from Day 12)
Scan/capture **only your range target**. The methodology — scope → authorize → isolate → recon — is why today is safe.

### 6. Security bridge
- Seeing is believing: you *watch* DNS and the handshake happen — that cements Week 1.
- Recon → exposure → risk: open ports feed risk's "V"; sniffable traffic feeds "C". The tools make the Day 11 mental model tangible.

---

## Worksheet (fill in during class)
1. Wireshark captures ______ so you can read them (e.g., DNS, TCP, HTTP).
2. The TCP handshake is ______ / ______ / ______ (three packets).
3. Nmap reports ports as open / ______ / filtered.
4. An open port = a ______ (door/service) = ______ exposure (CIA letter).
5. Sniffing unencrypted HTTP shows a confidentiality failure in ______ (transit/store).
6. We only run these tools on our ______ target (authorized + isolated).

## Homework (due Day 14)
In your range, write down: (a) the DNS query you observed, (b) the three TCP handshake packets, (c) the open ports Nmap found on your target. Bring to Day 14 — it's the input to vulnerability scanning.

*(Lab steps in lab-guide.md. Quiz in quiz.md. Reference sheet in references.md.)*

---

## The four "So What?" questions (ADD §17 standard)
1. **What did I learn?** That networks are visible packets — DNS, the TCP handshake, and open ports can be captured and listed, turning the Day 4 story into something I can see.
2. **What can I now do?** Capture traffic in my range and identify the DNS query + TCP handshake; scan a host and list its open ports — knowing what each exposes.
3. **Where is this used professionally?** SOC Analyst, Network Security Engineer, Pentester, and IR Analyst use Wireshark/Nmap daily to monitor, map, and investigate.
4. **What am I building toward?** Day 14 (find weaknesses on those open ports), Day 15 (intercept app traffic), and the capstone — where recon becomes the first step of every assessment.

---

## PPT Outline (blueprint for Phase 4)
**Slide 1 — Title:** "Day 13: Wireshark & Nmap — Recon the Layers" · Academy logo.
**Slide 2 — Why are we learning this?** Make the invisible visible; first step of attack + defense; only in the range. Diagram: eye over wire.
**Slide 3 — Learning Journey Check:** "Day 4 told the story; Day 12 built the safe place; today we watch it happen — in the range."
**Slide 4 — Wireshark:** microscope for the wire; capture DNS/TCP/HTTP. Diagram: packets flowing + magnifier.
**Slide 5 — Day 4 on the wire:** filter dns + tcp.flags → see the query + handshake. Diagram: page-load signature diagram, "packets on the wire" view.
**Slide 6 — Nmap:** "what's listening?" open/closed/filtered ports. Diagram: building with doors.
**Slide 7 — Recon both sides:** defender locks doors; attacker enters. Diagram: two arrows.
**Slide 8 — C on the wire:** no TLS = readable; why Day 4 taught HTTPS. Diagram: open envelope.
**Slide 9 — Scope discipline:** only your range target (Day 12). Diagram: guardrails.
**Slide 10 — Soft-Skills Moment:** read tool output critically; "am I authorized?"
**Slide 11 — How Today Connects:** → D14 vuln scan → D15 Burp → D16 attack → D19 monitoring. Diagram: hub.
**Slide 12 — Curiosity Question:** "If every packet is visible on the wire, what protects secrets in transit?" → TLS (Day 4) + encryption. And: only capture what you're authorized to (Day 12).
**Slide 13 — Lab Preview & Quiz:** in-range capture + scan; exit quiz.
