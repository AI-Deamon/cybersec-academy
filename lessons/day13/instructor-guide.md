# Day 13 — Instructor Guide (PRIVATE — source of truth)
**Course:** Practical Cyber Security: From First Principles
**Module 3 — Thinking Like a Pro · Day 13 of 20 · Week 3, Session 3**
**Standard:** Academy Design Document v1.3 (Complete) · Phase 3 lesson-doc standard · Career-Connection/So-What standard (ADD §17)
**Version:** 1.0

---

## 1. Lesson Overview
- **Title:** Networking Tools — Wireshark & Nmap (Recon the Layers)
- **Duration:** 90 minutes
- **Type:** Foundation + first hands-on tool day (inside the Day 12 range)
- **Position in journey:** Day 13 of 20, third day of Week 3. Day 11 = mental model (CIA/risk/untrusted input). Day 12 = safe range + methodology. Today = the **first tools**, used *only inside the range*. Wireshark makes the Day-4 "how a web page loads" story *visible on the wire* (the deferral pays off); Nmap maps the attack surface (availability exposure). Day 14 = vuln scanning; Day 15 = Burp; Day 16+ = attacks/defense.
- **Companion files:** student-guide.md · lab-guide.md · quiz.md · references.md · rubric.md · version-history.md

## 2. Teaching Guide (Four Context Questions)
**Why am I learning this?**
Because everything you've learned about networks (Day 3-4) and the OS (Week 2) is invisible until you can *see* it. Wireshark and Nmap are the two foundational recon tools — they turn "I think the network does X" into "I can see the network does X." That visibility is the first step of both attack (mapping) and defense (monitoring).

**How does this connect to the previous lessons?**
- **Day 4 (deferred!):** on Day 4 we described DNS, the TCP handshake, TLS, and HTTP as a *story*. We explicitly did NOT open Wireshark then — you needed the concept first. Today we capture that exact DNS query and TCP handshake on the wire. This is the promised payoff.
- **Day 11 CIA/risk:** Nmap probing open ports = probing **Availability** exposure (attack surface = vulnerability). Wireshark sniffing traffic = observing **Confidentiality in transit**. Doing both *inside the isolated range* keeps real Impact at zero.
- **Day 12 range:** every packet you capture and every port you scan today is on *your own* target in the range. Authorization + isolation make it legal and safe.

**Where will I use this in cybersecurity?**
Network troubleshooting, pentest recon, SOC monitoring, IR packet analysis, detecting exfiltration, validating firewall rules. Wireshark + Nmap are on nearly every security job description.

**What problem will I be able to solve after today's class?**
Capture live traffic and *identify* the DNS lookup and TCP handshake for a web request (proving Day 4's story is real), and scan a host to *list its open ports* (knowing what services — and thus what attack surface — are exposed). Both only in the range.

**Concept 1 — Wireshark: a microscope for the wire (concept before tool).**
A network is packets flying between computers. Wireshark captures and displays those packets so you can read them: the DNS query ("where is example.com?"), the TCP handshake (SYN/SYN-ACK/ACK), the TLS exchange, the HTTP request. It is the **Day 4 story made visible**. Reading packets = seeing confidentiality-in-transit and the protocols you were taught abstractly.

**Concept 2 — Nmap: "what's listening here?" (concept before tool).**
Every service (web server, SSH, file share) listens on a **port**. Nmap sends probes to a target and reports which ports are **open** (a service is listening), closed, or filtered. Open ports = the **attack surface** = availability exposure. A defender uses Nmap to *know their own exposure*; an attacker uses it to *map a victim*. Same tool, two sides (attack+defend).

**Concept 3 — Recon is the first step of both sides (attack+defend, always).**
- **Defender:** "I'll scan my own network to find forgotten open ports and close them." (Reduce attack surface.)
- **Attacker:** "I'll scan the target to find an open port running old software." (Find a way in.)
Both start with the *same* Nmap command. Ethics (Day 1/12) decides which side you're on — and the range keeps you on the legal one.

**Concept 4 — Confidentiality on the wire (ties to Day 11 CIA).**
Wireshark shows that without TLS, HTTP is readable by anyone on the path (a confidentiality failure in transit) — which is exactly why Day 4 taught HTTPS/TLS. Sniffing unencrypted traffic = the "C" break made real. In the range you may demonstrate this safely (e.g., capture a plaintext HTTP request to your own target).

**Concept 5 — Scope discipline from Day 12.**
Reinforce: scan/capture **only your range target**. Never point Nmap at a real host; never capture traffic you're not authorized to. The methodology (scope→authorize→isolate→recon…) is why today is safe.

**Concept 6 — Security bridge.**
- Seeing is believing: students who "knew" DNS happens now *watch* it happen — that cements Week 1.
- Recon→exposure→risk: open ports (Nmap) feed the "V" in Day 11 risk; sniffable traffic (Wireshark) feeds the "C" impact. The tools make the mental model tangible.

## 2b. Topic Connections & Examples (the "why it links" layer)
**Connection A — Page-load signature diagram, now on the wire:** reuse `diagrams/page-load-signature.md` (the 7-step "how a web page loads"). On Day 4 it was a concept; today, Wireshark shows steps 2-3 (DNS) and 4-5 (TCP/TLS) as actual packets. Same diagram, "packets on the wire" perspective (its documented recurrence).

**Connection B — Forward links:**
- → **Day 14 (Vuln Scanning):** Nmap found open ports; now find *weaknesses* on them.
- → **Day 15 (Burp):** intercept *application-layer* traffic (HTTP) — Wireshark's app-layer cousin, scoped to one app.
- → **Day 16 (Web attacks):** the open port + untrusted input combine.
- → **Day 17 (Network Security):** defend the wire Wireshark exposes.
- → **Day 19 (Monitoring/Blue):** Wireshark-as-detection, not just analysis.

**Connection C — Backward link:** Day 4 (deferred Wireshark), Day 3 (packets/IP), Day 11 (CIA), Day 12 (range). The "wire" you sniff is the same postal system from Day 3.

**Concrete Examples:**
- *DNS visible:* filter `dns` in Wireshark → see "A? example.com" query and the answer. That's Day 4 step 2, on screen.
- *Handshake visible:* filter `tcp.flags.syn==1` → see SYN, SYN-ACK, ACK. That's Day 4 step 4-5.
- *Nmap:* `nmap <range-target>` → "22/tcp open ssh, 80/tcp open http" → those are the doors; each is potential entry or thing to lock.
- *Bridge line (say twice):* "Day 4 told you the story; today you watch it happen. The wire isn't magic — it's packets, and now you can read them. Only in your range."

## 3. Timing Guide (90 min)
| Segment | Time | Activity |
|---------|------|----------|
| A. Learning Objectives | 3 min | State the 3 goals |
| B. Learning Journey Check | 4 min | "Day 4 told the story; Day 12 built the safe place; today we make the story visible — in the range." |
| C. Review | 3 min | Recall Day 4 page-load steps; Day 11 CIA; Day 12 range rules |
| D. Soft-Skills Moment | 12 min | Reading tool output critically; always confirm "am I authorized, is this my range target?" |
| E. New Concepts | 30 min | Wireshark (concept), Nmap (concept), recon both sides, C on the wire, scope discipline |
| F. Diagram & Real-World | 10 min | page-load diagram "on the wire"; Nmap = attack-surface map; sniff = C-in-transit |
| G. Live Demo / Lab | 20 min | in-range: Nmap the lab target; Wireshark-capture DNS+handshake to your own target |
| H. Quiz / Assignment | 8 min | Exit quiz + preview Day 14 |
| **Total** | **90** | |

## 4. Analogies
**REUSE the page-load story (Week 1 signature diagram) and the Day 12 range picture; add one new simple picture:**
- Wireshark = a **wiretap on your own phone line** (in the range, it's your own line) — you hear every word sent. Without TLS, the words are plain; with TLS, they're scrambled.
- Nmap = walking a building and **checking which doors are unlocked** — open doors = entry points (defender locks them; attacker enters).
- (Restaurant metaphor, Week 2: the wire is the *delivery road* between restaurants; Wireshark watches the road, Nmap checks which delivery doors are open.)

## 5. Common Misconceptions
- *"Wireshark lets me hack anything."* It only shows what's on a network you can already see (your range). It's a viewer, not an exploit.
- *"Nmap is illegal."* Nmap on your own range is fine; on systems you lack permission for, it's unauthorized (Day 12). Tool ≠ crime; authorization does.
- *"I should capture on the internet."* Never. Capture only your range interface/target. Real traffic capture needs authorization (and is often illegal otherwise).
- *"TLS means Wireshark sees nothing useful."* Correct for the payload — but you still see *metadata* (domains via SNI, IPs, ports). That's a real lesson in what encryption hides vs exposes.
- *"More open ports = better."* Open ports = more attack surface. Least privilege applies to services too.

## 6. Demo Script
**Demo 1 — Wireshark captures Day 4 (10 min):** in the range, start Wireshark on the lab interface, `curl`/`browse` the range target, then filter `dns` and `tcp.flags` to show the DNS query + TCP handshake live. "This is Day 4, happening."
**Demo 2 — Nmap maps the surface (6 min):** `nmap <range-target-IP>` → show open ports (e.g., 22, 80). Explain each = a door; defender locks unneeded ones.
**Demo 3 — C on the wire (4 min):** if the range target serves plaintext HTTP, capture a request and show the readable `GET /` — "no TLS = anyone on the path reads this (C broken). That's why Day 4 taught HTTPS."

## 7. Lab Solution (answers instructors should see)
- Task 1: started Wireshark on the range interface; generated traffic to the *range* target only.
- Task 2: filtered and identified the DNS query + TCP handshake (SYN/SYN-ACK/ACK) — the Day 4 story, visible.
- Task 3: ran `nmap <range-target>` and listed open ports; explained each as a service/door.
- Concept Q: stated Wireshark = see packets (C in transit), Nmap = list open ports (availability exposure); both only in the authorized, isolated range.

## 8. FAQ
- **Q: Do I need a powerful machine?** No — Wireshark/Nmap are light; the range target is a small VM.
- **Q: Can I scan my home router "to learn"?** No — that's outside your authorized range. Use the lab target only.
- **Q: Wireshark looks overwhelming.** Start with the `dns` and `tcp` filters; you only need to read a few lines today. Depth comes later.
- **Q: What's the difference from Burp (Day 15)?** Wireshark = all packets on the wire (network layer); Burp = HTTP to one app, with the ability to *modify* requests (application layer). Different layers, different jobs.

## 9. Examples Bank (reusable across cohorts)
- Wireshark = wiretap on your own line; TLS scrambles the words.
- Nmap = checking which doors are unlocked.
- DNS query + TCP handshake visible = Day 4 on screen.
- Open port = a door = attack surface (least privilege for services).
- Bridge line: "Day 4 told you; today you watch it. Only in your range."
- Tools map to CIA: Wireshark→C-in-transit; Nmap→A-exposure.

> **Assessment:** see rubric.md (separate file, per the 7-file standard).
> **Career note (ADD §17):** SOC Analyst, Network Security Engineer, Pentester, IR Analyst all use these daily. The four "So What" questions close the student guide.
