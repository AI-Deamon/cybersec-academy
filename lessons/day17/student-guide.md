# Day 17 — Student Guide
**Course:** Practical Cyber Security: From First Principles · Module 4 · Day 17 of 20

---

## Why this matters
The network is the shared road every packet travels (Day 3) — and if that road isn't guarded, confidentiality and availability break no matter how secure the app or OS is. Network security is the *perimeter and the internal fences*. Understanding it lets you both attack a weak network and defend a real one — the same attack+defend thinking you used on the web layer (Day 16), now on the wire.

## How today connects (keep this in mind)
- **Day 3 (postal system) + Day 13 (the wire):** the "road" and "packets" you learned are what's attacked here. Sniffing = reading mail on the road; spoofing = forging the return address.
- **Day 11 CIA:** sniffing = **C** in transit; MITM tampering = **I**; DoS flooding = **A**. Each network attack maps to a letter.
- **Day 12 range:** "isolate your lab" generalizes into **network segmentation** — the core network defense. Attacks today are *in the range* (authorized + isolated).
- **Day 16 pattern:** same attack+defense, different layer — security thinking is *recurring*.
- **Forward:** Day 18 (cloud networking) · Day 19 (IR/monitoring) · Day 20 (capstone).
- **Ethics:** demonstrate attacks only in the range (Day 1/12).

---

## The big ideas

### 1. The network is a shared road (Day 3 reborn)
Packets travel a shared medium. On a shared/broadcast segment, anyone present can *see* passing packets — which is why Day 13's Wireshark worked. Defenders assume the road is observable and protect the *contents* (encryption) and the *destinations* (segmentation).

### 2. Sniffing & MITM (the Day 13 risk made real)
- **Sniffing:** capturing traffic on a segment (what Wireshark did Day 13). Harmless for your own; a breach when an attacker does it on a shared network — **C** in transit.
- **MITM:** an attacker positions *on the path* (rogue Wi-Fi, ARP spoofing) and reads/alters traffic → **C** and **I**. Defense: **TLS (Day 4/13)** so intercepted content is unreadable + **access controls** (keep strangers off the segment).
Key: encryption is the real fix for sniffing/MITM — the reason Day 4 taught HTTPS and Day 13 showed plaintext HTTP leaking.

### 3. Spoofing & trust on the wire
Attackers forge source addresses (IP/MAC/ARP) to impersonate a trusted host. **ARP spoofing** poisons the "address book" so traffic routes through the attacker (enables MITM). Defense: **dynamic ARP inspection / port security** on managed switches; never trust a flat network.

### 4. Denial of Service — breaking Availability
Flooding a target exhausts its resources → **A** breaks (service unavailable). Defense: **rate-limiting, scrubbing, redundancy**. DoS is the purest "A" attack — a reminder that availability is a security property (Day 11).

### 5. The defenses (the recurring toolkit)
- **Encryption (TLS)** → defeats sniffing/MITM (C/I).
- **Firewall** → controls *who may talk to what* (Day 12 "lock the doors" at network scale).
- **Segmentation / isolation** → the Day 12 range principle generalized: split the network so a breach in one zone can't reach another (limits lateral movement). The modern core defense; previews Day 19 IR.
- **IDS / monitoring** → watch the wire for attack signatures (previews Day 19 Blue Team).
- **Access control / 802.1X** → keep untrusted devices off the segment (defeats spoofing/MITM entry).

### 6. Security bridge
- The Day 12 range *is* segmentation in miniature — you already practiced the most important network defense.
- Network + web (Day 16) + OS (Week 2) = **defense in depth**: an attacker needs all weak; a defender needs any one strong enough.

---

## Worksheet (fill in during class)
1. On a shared segment, traffic is ______ (observable) — that's why sniffing works.
2. Sniffing/MITM break ______ and ______ (CIA letters); the fix is ______ (TLS).
3. ARP spoofing poisons the ______ book so traffic routes through the attacker.
4. DoS breaks ______ (CIA letter) by exhausting resources.
5. Segmentation = the Day 12 ______ idea generalized; it limits ______ movement.
6. A firewall controls ______ may talk to what; it does NOT encrypt content.

## Homework (due Day 18)
Draw a simple network with: an outside internet, a firewall, two internal segments (e.g., "staff" and "server"), and label where TLS, the firewall rule, and segmentation each protect something. Bring to Day 18.

*(Lab steps in lab-guide.md. Quiz in quiz.md. Reference sheet in references.md.)*

---

## The four "So What?" questions (ADD §17 standard)
1. **What did I learn?** That the network is a shared, observable road, and that sniffing/MITM/spoofing/DoS each break a CIA property — with matching defenses (TLS, firewall, segmentation, IDS).
2. **What can I now do?** Reason about a network's attack surface and name the defense for each network threat; see the Day 12 range as segmentation in miniature.
3. **Where is this used professionally?** Network Security Engineers, SOC Analysts, Pentesters, Cloud Network Engineers, and IR Analysts secure and test networks daily.
4. **What am I building toward?** Day 18 (cloud networking = same ideas), Day 19 (detecting/containing these via IDS/segmentation), and the capstone — where network findings join web/cloud into one report.

---

## PPT Outline (blueprint for Phase 4)
**Slide 1 — Title:** "Day 17: Network Security — Attacks & Defenses on the Wire" · Academy logo.
**Slide 2 — Why are we learning this?** The shared road must be guarded; C and A break at the network. Diagram: road + packets.
**Slide 3 — Learning Journey Check:** "Day 3 built the road; Day 13 watched packets; today we attack/defend it — in the range."
**Slide 4 — Shared road + sniffing:** reading mail in transit (C). Diagram: letters on a road.
**Slide 5 — MITM + TLS fix:** intercept at sorting office; encryption locks the envelope. Diagram: interceptor.
**Slide 6 — Spoofing/ARP:** forged address / poisoned book. Diagram: fake return label.
**Slide 7 — DoS:** flooded mailbox (A). Diagram: mailbox overflow.
**Slide 8 — Defenses:** TLS + firewall + segmentation + IDS. Diagram: toolbox.
**Slide 9 — Segmentation = Day 12 range generalized:** fences between yards. Diagram: fenced yards.
**Slide 10 — Soft-Skills Moment:** "what's the blast radius if this segment breaks?"
**Slide 11 — How Today Connects:** → D18 cloud → D19 IR → D20 capstone. Diagram: hub.
**Slide 12 — Curiosity Question:** "If the network is shared and observable, what's the one control that protects secrets on it?" → encryption (TLS) + access control.
**Slide 13 — Lab Preview & Quiz:** in-range observe + firewall/segmentation; exit quiz.
