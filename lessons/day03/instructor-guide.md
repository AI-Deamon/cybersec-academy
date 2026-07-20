# Day 3 — Instructor Guide (PRIVATE — source of truth)
**Course:** Practical Cyber Security: From First Principles
**Module 1 — Building the Foundation · Day 3 of 20**
**Standard:** Academy Design Document v1.0 (Approved) · Phase 3 lesson-doc standard
**Version:** 1.0

---

## 1. Lesson Overview
- **Title:** What Is a Network?
- **Duration:** 90 minutes
- **Type:** Foundation — how separate machines find and talk to each other
- **Position in journey:** Day 3 of 20. Yesterday a program ran *inside one machine*; today we connect machines. Networks are where most attacks actually travel, so this is the start of the "wire" half of our mental model.
- **Companion files:** student-guide.md · lab-guide.md · quiz.md · references.md · rubric.md · version-history.md

## 2. Teaching Guide (Four Context Questions)
**Why am I learning this?**
Because almost every attack crosses a network. To understand phishing, MITM, scanning, or ransomware spreading, you must first know how two machines locate and send data to each other.

**How does this connect to the previous lesson?**
Day 2: one machine runs a program in its own memory. Today: that machine connects to others so programs can *talk across* machines. We extend the Restaurant analogy — now there are multiple kitchens, and they send orders to each other.

**Where will I use this in cybersecurity?**
Network security, pentesting (recon/scanning), SOC monitoring, incident response. Wireshark (Day 13) and Network Security (Day 17) build directly on today.

**What problem will I be able to solve after today's class?**
Explain, in plain terms, how two computers on a network find each other (addresses) and send data (packets) — and name the three things that can go wrong (someone listens in, someone impersonates, someone floods).

**Concept 1 — What a network is (first principles):**
- A **network** = two or more devices connected so they can exchange data.
- **Packets** = data is not sent as one giant blob; it's chopped into small labeled chunks, each addressed to the destination, like letters in the post.

**Concept 2 — Addresses: who is talking to whom:**
- **IP address** = a machine's network "street address" (e.g., `192.168.1.10`). Like a home address.
- **MAC address** = the device's permanent factory "serial number" on the local wire. Like a passport — used only on the local segment.
- **Port** = which "apartment door" (service) on that machine — e.g., 80 for web, 22 for remote shell. Like a flat number at the address.

**Concept 3 — The postal system analogy (extends Restaurant):**
- IP = street address. Packet = a letter. Router = the postal sorting office that reads the address and forwards the letter. The letter always has "from" and "to" written on it.

**Concept 4 — Why this matters to security (the bridge):**
Three classic failures when data travels:
1. **Eavesdropping** — someone reads the letter in transit (sniffing).
2. **Impersonation / MITM** — someone pretends to be the destination (or the sender).
3. **Disruption** — someone floods the system so letters can't get through (DoS).
We'll exploit/defend these in Days 13, 16–17, 19.

## 2b. Topic Connections & Examples (the "why it links" layer)
**Connection A — Restaurant extended:** Day 2 had one kitchen. Today, multiple kitchens in a food court, each with an address, passing orders (packets) via a runner (router). The order ticket has "from kitchen / to kitchen" written on it — that's the packet header.

**Connection B — Forward links:**
- → **Day 4:** adds the rules of the conversation (TCP handshake, ports, DNS) — today's packets get structure and names.
- → **Day 5:** HTTPS/TLS encrypts the letter so eavesdroppers can't read it (fixes failure #1) — students observe this in the Week 1 portfolio assignment via browser DevTools (Wireshark is an optional bonus).
- → **Day 13 (Wireshark/Nmap):** you'll *see* these packets and addresses on the wire.
- → **Day 16–17 (Web/Net security):** eavesdropping, MITM, DoS become concrete attacks.
- → **Day 19 (IR):** spotting malicious traffic = spotting bad "letters."

**Connection C — Backward link:** Day 2's program-in-memory now *sends/receives* packets; the bytes Day 1 taught about are the contents of these letters.

**Concrete Examples:**
- *Postal system:* A letter from your house (IP) to a shop (IP), handed to the post office (router), delivered. If you write the wrong address, it goes nowhere — that's a misconfigured network.
- *Packet = letter:* Email isn't sent whole; it's split into envelopes, each routed independently, reassembled at the other end.
- *Port = apartment:* Same building (IP) has many flats (ports); port 80 = "web flat," port 22 = "remote-access flat."
- *Eavesdropping:* A nosy neighbour reading postcards (HTTP) vs sealed envelopes (HTTPS).
- *MITM:* A fake postman intercepts and re-sends letters, changing the contents.

## 3. Timing Guide (90 min)
| Segment | Time | Activity |
|---------|------|----------|
| A. Learning Objectives | 3 min | State the 3 goals |
| B. Learning Journey Check | 4 min | "Yesterday: one machine. Today: machines talking. Tomorrow: the conversation rules." |
| C. Review | 3 min | Recall: what is a process? (Day 2) |
| D. Soft-Skills Moment | 12 min | Reading network diagrams & asking "who can see this?" |
| E. New Concepts | 28 min | network/packets, IP/MAC/port, postal analogy, 3 failures |
| F. Diagram & Real-World | 10 min | postal-system diagram; packet-with-header drawing; breach story |
| G. Live Demo / Lab | 25 min | ping + find own IP/MAC; traceroute; observe a packet path |
| H. Quiz / Assignment | 5 min | Exit quiz + homework handout |
| **Total** | **90** | |

## 4. Analogies
**The Restaurant + Postal system (EXTEND the one analogy):**
- Network = a food court of many kitchens.
- IP address = the kitchen's street address.
- MAC = the kitchen's permanent ID badge (used only inside the food court).
- Port = which service window (web / remote-access).
- Packet = an order ticket with "from/to" written on it.
- Router = the runner/post office that reads the address and forwards the ticket.
- Eavesdropping = reading someone's order ticket in passing. MITM = a fake runner swapping tickets. DoS = flooding the runner with fake tickets.

## 5. Common Misconceptions
- *"The internet and a network are the same."* A network is any connected group; the internet is one huge network of networks.
- *"IP and MAC are the same thing."* IP is the address used to route across networks (can change); MAC is the fixed hardware ID used only on the local link.
- *"A port is a physical hole."* No — a port is a logical number identifying a service; many "ports" exist on one physical network card.
- *"Data is sent all at once."* It's split into packets that may take different paths and reassemble.
- *"If I use HTTPS the address is hidden."* HTTPS hides the *contents*, not the destination IP — the post office still sees the address on the envelope.

## 6. Demo Script
**Demo 1 — Find your address (8 min):** Show `ipconfig` (Win) / `ifconfig` or `ip a` (Linux/Mac). Point at IPv4 address and MAC (Physical Address). "This is your kitchen's street address and ID badge."
**Demo 2 — Ping (7 min):** `ping 8.8.8.8` (or the router). Explain each reply = a letter that came back. "You just sent a packet and got an answer."
**Demo 3 — Traceroute (7 min):** `tracert 8.8.8.8` (Win) / `traceroute 8.8.8.8` (Linux/Mac). Show the hops — "each line is a post office the letter passed through."
**Demo 4 — The 3 failures (3 min):** On the postal diagram, circle where eavesdropping / MITM / DoS happen; note TLS fixes eavesdropping (students observe HTTPS in the Week 1 assignment's Wireshark task).

## 7. Lab Solution (answers instructors should see)
- Task 1: ran `ipconfig`/`ip a`; reported own IP + MAC.
- Task 2: `ping` a target (router or 8.8.8.8); saw replies (round-trip times).
- Task 3: `traceroute` showed ≥1 hop (likely the router, then ISP); described it as "post offices the packet passed."
- Concept Q: named the 3 network failures (eavesdrop / impersonation-MITM / flooding-DoS) in their own words.

## 8. FAQ
- **Q: Do I need to memorize IP addressing / subnets now?** No — just the *idea* of an address that routes packets. Subnets come later if needed.
- **Q: Why two addresses (IP and MAC)?** IP routes across the whole network; MAC identifies the actual device on the final local link. Both needed.
- **Q: Is ping safe to run?** Yes, on your own network / allowed targets (Day 1 rule). Pinging random external hosts can be impolite or blocked; keep to lab/known addresses.
- **Q: What's the difference between a router and a switch?** Roughly: a switch connects devices on one local network (uses MAC); a router connects networks and routes by IP. We'll keep it simple today.

## 9. Examples Bank (reusable across cohorts)
- Postal system: letter = packet; post office = router; address = IP; badge = MAC; flat = port.
- Packet = order ticket with from/to header.
- Eavesdropping = reading postcards (HTTP) vs sealed envelopes (HTTPS).
- MITM = fake runner swapping tickets.
- DoS = flooding the runner with fake tickets.
- Real story: a large retailer breach began with network eavesdropping on an unencrypted segment; TLS (observed in the Week 1 assignment) is the fix.
- Bridge line (say twice): "Yesterday a program talked to itself in memory. Today programs talk to other machines — and every letter they send can be read, faked, or blocked."

> **Assessment:** see rubric.md (separate file, per the 7-file standard).
