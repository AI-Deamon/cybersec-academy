# Trace the Attack · Task 1 — TCP/IP Knowledge Check

**Type:** Formative quiz (counts toward the *Trace the Attack* assignment)
**Format:** 20 questions — multiple choice, true/false, and short answer
**Coverage:** the TCP/IP model, encapsulation, IP, and TCP/UDP (Networking Block, Days 1–5 + the Deep Dive)
**Time:** ~25 minutes · closed-book
**How to answer:** write the letter (MCQ), "True/False" + one sentence why (T/F), or 1–3 sentences (short answer).

---

## Section A — The model & encapsulation (Q1–Q6)

**Q1.** The TCP/IP model has four layers. Which list is in the correct order, **top (application) to bottom (wire)**?
A. Application → Internet → Transport → Network Access
B. Application → Transport → Internet → Network Access
C. Transport → Application → Internet → Network Access
D. Network Access → Internet → Transport → Application

**Q2.** As your data moves **down** the stack, each layer wraps it in a header. Match the unit name to the layer that produces it:

| Unit | Layer |
|------|-------|
| Segment | ? |
| Packet | ? |
| Frame | ? |
| Bits | ? |

**Q3.** A login form is 100 bytes of application data. After the TCP header (20 B), the IP header (20 B), and the Ethernet header + FCS (18 B) are added, how many bytes is the **frame** (excluding the preamble)?
A. 100  B. 138  C. 158  D. 1500

**Q4.** True/False: The Ethernet layer can read the destination **port number** to decide where to deliver the frame.

**Q5.** On the **receiving** host, in what order are the headers removed?
A. TCP → IP → Ethernet
B. Ethernet → IP → TCP
C. IP → Ethernet → TCP
D. All at once

**Q6.** Short answer: In one sentence, what does "encapsulation" mean in networking?

---

## Section B — The Internet layer / IP (Q7–Q13)

**Q7.** What is the job of the **IP address** vs the **port number**?
A. IP picks the network cable; port picks the country
B. IP identifies which host; port identifies which process/program on that host
C. IP identifies the program; port identifies the host
D. They are two names for the same thing

**Q8.** Your laptop is `192.168.1.10` with mask `255.255.255.0`. You send traffic to `93.184.216.34`. Where does the frame get sent first?
A. Directly to `93.184.216.34`
B. To the default gateway (`192.168.1.1`)
C. To the DNS server
D. Broadcast to the whole subnet

**Q9.** What does the **TTL** field do, and what happens when it reaches 0?

**Q10.** In the IPv4 header, the **Protocol** field holds the value `6`. What does that tell the receiving host?
A. The payload is a UDP datagram
B. The payload is an ICMP message
C. The payload is a TCP segment
D. The packet has 6 hops left

**Q11.** True/False: As a packet is routed across the internet, its **source and destination IP addresses** normally change at every router hop.

**Q12.** True/False: As a packet is routed across the internet, its **source and destination MAC addresses** change at every hop.

**Q13.** Which protocol does `ping` and `traceroute` rely on, and which layer is it part of?
A. TCP — Transport
B. UDP — Transport
C. ICMP — Internet
D. ARP — Network Access

---

## Section C — The Transport layer / TCP & UDP (Q14–Q20)

**Q14.** Put the TCP three-way handshake in order:
1. `ACK`  2. `SYN`  3. `SYN, ACK`
A. 1 → 2 → 3  B. 2 → 3 → 1  C. 3 → 2 → 1  D. 2 → 1 → 3

**Q15.** In TCP, what is the difference between the **Sequence** number and the **Acknowledgment** number?

**Q16.** A port scanner sends a bare `SYN` to port 22 and gets a `SYN, ACK` back. What does that mean?
A. The port is closed
B. The port is open and a service is listening
C. The host is offline
D. The firewall dropped the packet

**Q17.** Which TCP flag means "abort this connection immediately, something is wrong"?
A. `FIN`  B. `PSH`  C. `RST`  D. `URG`

**Q18.** Why is **DNS** usually carried over **UDP** instead of TCP?
A. DNS needs guaranteed delivery and ordering
B. One small question, one small answer — the overhead of a handshake isn't worth it
C. UDP encrypts the query
D. TCP cannot use port 53

**Q19.** The UDP header is 8 bytes; the TCP header is at least 20 bytes. Name **two** things TCP provides that UDP does not.

**Q20.** True/False: A single computer can hold many TCP conversations open at the same time over one network cable, because each conversation is kept separate by its **port numbers** (specifically the source/destination port pair).

---

**Scoring:** 20 questions, 1 point each. Short-answer (Q2, Q6, Q9, Q15, Q19) — full point for the key idea, half for a partial answer. Pass mark: 14/20. *(Answer key: instructor-only, see `trace-the-attack-task1-ANSWER-KEY.md` — not included in this document.)*
