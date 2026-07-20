# Day 3 — NotebookLM Source: "What Is a Network?"

**Course:** Practical Cyber Security: From First Principles · Module 1 · Day 3 of 20
**Prepared for:** NotebookLM study notebook (source document)
**Companion files:** lessons/day03/ (full 7-file package) · decks/day03.* (Phase 4 deck)

> This single document is the **NotebookLM source** for Day 3. It merges the Student Guide, Reference Sheet, and Quiz into one clean, self-contained text so NotebookLM can generate a study guide, audio overview, FAQ, and quizzes grounded only in this day's material. Upload this file (and optionally the deck) to a "Day 3" notebook.

---

## Why this matters (opening context)
Almost every attack travels across a network. To understand phishing, man-in-the-middle, scanning, or ransomware spreading, you first need to know how two machines find and talk to each other.

## How today connects
- **Yesterday → Today:** Day 2 = one machine running a program in its own memory. Today = connecting machines so programs *talk across* them. We extend the Restaurant analogy: now there are many kitchens, passing orders to each other.
- **Forward:** Day 4 (the conversation rules: TCP, ports, DNS) · Day 5 = Week 1 portfolio assignment (seals the "envelope" — observe HTTPS/TLS in DevTools; Wireshark optional) · Day 13 (Wireshark/Nmap let you *see* these packets) · Day 16–17 (eavesdropping, MITM, DoS become real attacks) · Day 19 (spotting bad "letters" in IR).
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

## Reference sheet (keep for the course)
- **Network:** two+ devices exchanging data. **Packet:** a small addressed chunk of data.
- **IP address:** street address used to route across networks (can change). e.g., `192.168.1.10`.
- **MAC address:** factory hardware ID, used only on the local link (fixed).
- **Port:** logical service number on a machine. Common: 80 (HTTP), 443 (HTTPS), 22 (SSH), 53 (DNS).
- **Router:** forwards packets between networks by IP (the "post office"). **Switch:** connects devices on one local network (by MAC).
- **Three network failures:** eavesdropping (sniffing), impersonation/MITM, disruption/DoS (flooding).
- **Commands:** `ipconfig` / `ip a` (addresses) · `ping <target>` (reachability) · `tracert` / `traceroute <target>` (path).

## Further reading
- "How does the internet work?" — introductory explanations of packets & routing.
- Cloudflare Learning / Cisco "Internetworking Basics" — beginner-friendly.
- Note: TCP handshake, DNS, TLS come on Days 4–5.

---

## Lab (hands-on, in-range only)
**Goal:** Find your machine's network identity and send your first packets across a network.
- **Task 1 — Find your address:** `ipconfig` (Windows) / `ip a` (Linux/macOS). Record your IPv4 and MAC/Physical address.
- **Task 2 — Send a packet (ping):** `ping 8.8.8.8` (Ctrl+C to stop). Each line = a packet that left and returned; note round-trip time.
- **Task 3 — Trace the path:** `tracert 8.8.8.8` (Win) / `traceroute 8.8.8.8` (Linux/macOS). Each line = a router the packet passed through.
- **Safety (Day 1):** only ping allowed targets (your router, a known public DNS, or the lab). Don't ping random external hosts.

---

## Worksheet (consolidation)
1. A network is two or more ______ connected to exchange data.
2. Data is sent as small addressed chunks called ______.
3. IP address = the machine's ______ (street address / serial number).
4. MAC address = the device's ______ (street address / factory ID on the local wire).
5. Port 80 is typically the ______ service; port 22 is ______.
6. Name the three network failures: ______, ______, ______.
7. HTTPS hides the *contents* of a letter, but does it hide the destination IP? Yes / No — why?

## Homework
1. Run `ipconfig` / `ip a`; write down your IP and MAC.
2. `ping` your router; paste 2 lines; what do the times tell you?
3. Explain the postal analogy to a friend (letter, address, post office, envelope-sealing foreshadowing TLS).

---

## Quiz (formative — answer key included)
1. **A packet is best described as:** a) one giant file sent all at once · **b) a small, addressed chunk of data (like a letter)** · c) a type of cable · d) a password. → **Answer: b**
2. **Which identifies the device on the local wire (factory ID)?** a) IP · **b) MAC** · c) Port · d) Domain. → **Answer: b**
3. **A "port" in networking is:** a) a physical hole · **b) a logical number identifying a service (e.g., 80 = web)** · c) the same as an IP · d) a type of encryption. → **Answer: b**
4. **HTTPS primarily protects against which network failure?** a) DoS · **b) Eavesdropping (reading contents in transit)** · c) routing · d) MAC change. → **Answer: b**
5. (Extension) Why does HTTPS hide the *contents* but NOT the destination IP? → **Model answer:** TLS encrypts the payload, but the IP header must stay readable by routers to deliver the packet — so the post office still sees where it's going.

---

## Suggested NotebookLM prompts for this day
- "Generate a 5-minute audio overview of Day 3 explaining networks using the postal analogy."
- "Create a study guide with the definitions of IP, MAC, port, packet, router, and the three network failures."
- "Make a 10-question quiz from this Day 3 material, multiple choice, with answers."
- "Explain the difference between eavesdropping, MITM, and DoS in plain language for a beginner."
- "Based on this source, what lab commands should I practice and why are they safe in-range?"
