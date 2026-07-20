# Day 17 — Instructor Guide (PRIVATE — source of truth)
**Course:** Practical Cyber Security: From First Principles
**Module 4 — Applying Cybersecurity in the Real World · Day 17 of 20 · Week 4, Session 2**
**Standard:** Academy Design Document v1.3 (Complete) · Phase 3 lesson-doc standard · Career-Connection/So-What standard (ADD §17)
**Version:** 1.0

---

## 1. Lesson Overview
- **Title:** Network Security Fundamentals — Attacks & Defenses on the Wire
- **Duration:** 90 minutes
- **Type:** Application — attack+defend at the network layer
- **Position in journey:** Day 17 of 20, second day of Week 4. Day 16 applied attack+defend to the web/app layer (untrusted input). Today applies the **same pattern to the network layer**: what breaks on the wire, and how defenders contain it. Reuses the Day 3 "postal system" analogy and Day 13 wire concepts. Days 18-20 continue the application module (cloud, IR, capstone).
- **Companion files:** student-guide.md · lab-guide.md · quiz.md · references.md · rubric.md · version-history.md

## 2. Teaching Guide (Four Context Questions)
**Why am I learning this?**
Because the network is the shared road every packet travels (Day 3) — and if that road isn't guarded, confidentiality and availability break regardless of how secure the app or OS is. Network security is the *perimeter and the internal fences*; understanding it lets you both attack a weak network and defend a real one.

**How does this connect to the previous lessons?**
- **Day 3 (postal system) + Day 13 (the wire):** the "road" and the "packets" you learned are exactly what's attacked here. Sniffing = reading mail on the road; spoofing = forging the return address.
- **Day 11 CIA:** sniffing = **C** (in transit); DoS/flooding = **A**; MITM tampering = **I**. Each network attack maps to a CIA letter.
- **Day 12 range:** the "isolate your lab" idea generalizes into **network segmentation** — the core network defense. And attacks demonstrated today are *in the range* (authorized + isolated).
- **Day 16 pattern:** same attack+defense structure, different layer — reinforcing that security thinking is *recurring*, not topic-specific.

**Where will I use this in cybersecurity?**
Firewall/network engineering, SOC monitoring, pentest (internal), cloud networking, IR (lateral movement analysis). Every environment has a network to secure.

**What problem will I be able to solve after today's class?**
Explain how sniffing, spoofing, and MITM break CIA on the wire, and name the defenses (encryption, firewall, segmentation, IDS/monitoring) that contain each. Reason about a network the way you reasoned about a web app on Day 16.

**Concept 1 — The network is a shared road (Day 3 reborn).**
Packets travel a shared medium (the "postal system"). On a shared/broadcast segment, anyone on that segment can *see* passing packets (sniffing) — which is why Day 13's Wireshark worked. Defenders assume the road is observable and protect the *contents* (encryption) and the *destinations* (segmentation).

**Concept 2 — Sniffing & MITM (the Day 13 risk made real).**
- **Sniffing:** capturing traffic on a segment (what Wireshark did on Day 13). Harmless to observe your own; a breach when an attacker does it on a shared network — **C** in transit (exactly Day 13's lesson).
- **MITM (Man-in-the-Middle):** an attacker positions themselves *on the path* (e.g., rogue Wi-Fi, ARP spoofing) and reads/alters traffic → **C** and **I**. Defense: **encryption (TLS, Day 4/13)** so intercepted content is unreadable, plus **network access controls** (don't let strangers on the segment).
Key point: encryption is the real fix for sniffing/MITM — which is the whole reason Day 4 taught HTTPS and Day 13 showed plaintext HTTP leaking.

**Concept 3 — Spoofing & trust on the wire.**
Attackers forge source addresses (IP/MAC/ARP) to impersonate a trusted host or hide their origin. **ARP spoofing** poisons the "address book" so traffic routes through the attacker (enables MITM). Defense: **dynamic ARP inspection / port security** on managed switches, and not trusting a flat network.

**Concept 4 — Denial of Service — breaking Availability.**
Flooding a target with traffic exhausts its resources → **A** breaks (the service is unavailable). Defense: **rate-limiting, scrubbing, redundancy/scaling**. DoS is the purest "A" attack — a reminder that availability is a security property (Day 11).

**Concept 5 — The defenses (the recurring toolkit).**
- **Encryption (TLS)** → defeats sniffing/MITM (C/I).
- **Firewall** → controls *who may talk to what* (the Day 12 "lock the doors" idea at network scale).
- **Segmentation / isolation** → the Day 12 range principle generalized: split the network so a breach in one zone can't reach another (limits lateral movement). This is *the* modern network defense and directly previews Day 19 IR (containing incidents).
- **IDS / monitoring** → watch the wire for attack signatures (previews Day 19 Blue Team).
- **Access control / 802.1X** → keep untrusted devices off the segment (defeats spoofing/MITM entry).

**Concept 6 — Security bridge.**
- The Day 12 range *is* segmentation in miniature — students already practiced the most important network defense without naming it.
- Network security + web security + OS security are **layers of the same onion**: an attacker needs all of them weak; a defender needs any one strong *enough*. Day 16 (app) + today (network) + Week 2 (OS) = the defense-in-depth story.

## 2b. Topic Connections & Examples (the "why it links" layer)
**Connection A — Postal system → attacks:** Day 3's "letters on a shared road." Sniffing = reading letters in transit; spoofing = forging the return address; MITM = intercepting at the sorting office; DoS = flooding the mailbox. The same analogy, now with villains.

**Connection B — Forward links:**
- → **Day 18 (Cloud):** network security in cloud (security groups, VPC segmentation = the same segmentation).
- → **Day 19 (IR/Monitoring):** detecting these attacks via IDS/logs; containing via segmentation.
- → **Day 20 (Capstone):** network findings join web/cloud into one report.
- → loops back to **Day 12** (segmentation) and **Day 4/13** (TLS defeats sniffing).

**Connection C — Backward link:** Day 3 (postal system), Day 4 (TLS/HTTPS), Day 11 (CIA — C/I/A), Day 12 (isolation = segmentation), Day 13 (Wireshark = sniffing), Day 16 (attack+defend pattern). Today synthesizes them at the network layer.

**Concrete Examples:**
- *Sniffing:* Day 13 captured plaintext HTTP — that's exactly what an attacker on a coffee-shop Wi-Fi sees. TLS (Day 4) is the fix.
- *MITM:* rogue "Free Wi-Fi" hotspot intercepts your login → encryption + not joining untrusted networks stops it.
- *ARP spoof:* attacker poisons the LAN address book → traffic flows through them → managed switches (DAI) stop it.
- *DoS:* a flood of requests takes a site down (A broken) → rate-limiting/scaling.
- *Bridge line (say twice):* "The network is a shared road. Sniffing reads the mail; spoofing forges the address; segmentation builds fences so a breach stays in one yard. TLS locks the envelope; the firewall locks the gate."

## 3. Timing Guide (90 min)
| Segment | Time | Activity |
|---------|------|----------|
| A. Learning Objectives | 3 min | State the 3 goals |
| B. Learning Journey Check | 4 min | "Day 3 built the road; Day 13 watched packets; today we attack and defend that road — in the range." |
| C. Review | 3 min | Recall Day 3 postal system, Day 4 TLS, Day 11 CIA, Day 13 Wireshark, Day 16 attack+defend |
| D. Soft-Skills Moment | 12 min | Reasoning about a network as layers; always ask "what's the blast radius if this segment breaks?" |
| E. New Concepts | 30 min | shared road, sniffing/MITM, spoofing, DoS, the defense toolkit (TLS/firewall/segmentation/IDS) |
| F. Diagram & Real-World | 10 min | postal-system-attacks picture; CIA map; segmentation diagram |
| G. Live Demo / Lab | 20 min | in-range: observe traffic (sniffing concept); show a firewall/segmentation rule; optionally ARP-spoof demo if range permits |
| H. Quiz / Assignment | 8 min | Exit quiz + preview Day 18 |
| **Total** | **90** | |

## 4. Analogies
**REUSE the Day 3 postal system; add the "fence" picture for segmentation:**
- Sniffing = **reading letters in transit** on a shared road.
- Spoofing = **forging the return address**.
- MITM = **intercepting at the sorting office**.
- DoS = **flooding the mailbox** so real mail can't arrive.
- Segmentation = **fences between yards** — a fire in one yard can't spread (the Day 12 range idea, generalized).
- (Restaurant metaphor, Week 2: the network is the *delivery road* between restaurants; a rogue courier (MITM) intercepts orders; fences (segmentation) keep one kitchen's breach from reaching another.)

## 5. Common Misconceptions
- *"HTTPS means the network is safe."* HTTPS protects *content in transit* (C) but not availability (DoS) or access control (who's on the network). Network security is broader.
- *"Sniffing requires hacking."* On a shared/broadcast segment, capturing is trivial (Day 13 proved it) — which is why encryption matters, not "don't get hacked."
- *"A firewall solves everything."* Firewalls control *reachability*; they don't encrypt content (TLS does) or stop an insider already inside the segment (segmentation does).
- *"Internal networks are trusted."* Assume breach — segment internally (Day 12/19). Flat internal networks are a top cause of breach spread.
- *"DoS is just annoying."* It's a real security failure (Availability, Day 11) with physical/economic harm (e.g., hospital systems).

## 6. Demo Script
**Demo 1 — Sniffing concept (7 min):** reuse Day 13 — capture traffic in the range; show that without TLS the content is readable (C in transit). "An attacker on a shared network does exactly this." Fix: TLS.
**Demo 2 — Segmentation/firewall (8 min):** show the range's isolated networking as a diagram; explain a firewall rule ("only port 443 from outside") and a segmentation rule ("lab net can't reach prod net"). "This is the Day 12 range idea at network scale."
**Demo 3 — MITM/spoof (optional, 5 min):** if the range supports it, show ARP-spoof positioning (conceptually) → traffic rerouting; then the defense (managed switch / don't join untrusted networks). Keep it conceptual if tooling is fragile.

## 7. Lab Solution (answers instructors should see)
- Task 1: explained that on a shared segment, traffic is observable (sniffing) — tied to Day 13 Wireshark; stated TLS as the fix.
- Task 2: described/observed a firewall or segmentation rule (e.g., range isolation) and explained it limits blast radius.
- Task 3: mapped sniffing/MITM/spoofing/DoS to CIA (C/I/A) and named the matching defense for each.
- Concept Q: stated network = shared road; attacks map to CIA; defenses = TLS + firewall + segmentation + IDS; Day 12 range = segmentation in miniature.

## 8. FAQ
- **Q: Is sniffing illegal?** Observing your own range traffic (Day 13) is fine. Capturing others' traffic on a network you lack permission for is unauthorized (Day 12). Context = authorization.
- **Q: Do I need a hacked router to show MITM?** No — we show the *concept* and the *defense*; an actual MITM demo is optional and range-only.
- **Q: How is this different from Day 16?** Day 16 = application layer (input → app). Day 17 = network layer (packets on the wire). Same attack+defend thinking, different layer — that's the point.
- **Q: What's the single most important defense?** Segmentation + encryption together: TLS locks the envelope, segmentation limits how far a breach spreads. Both are recurring themes into Day 19.

## 9. Examples Bank (reusable across cohorts)
- Network = shared road; sniffing = reading mail; spoofing = forged address; MITM = intercept at sorting office; DoS = flooded mailbox.
- TLS defeats sniffing/MITM (C/I); firewall = gate; segmentation = fences; IDS = watchtower.
- Day 12 range = segmentation in miniature.
- HTTPS ≠ full network security (no A, no access control).
- Bridge line: "TLS locks the envelope; the firewall locks the gate; segmentation builds the fence."
- Attack+defend at network layer = same pattern as Day 16.

> **Assessment:** see rubric.md (separate file, per the 7-file standard).
> **Career note (ADD §17):** Network Security Engineer, SOC Analyst, Pentester, Cloud Network Engineer, IR Analyst. The four "So What" questions close the student guide.
