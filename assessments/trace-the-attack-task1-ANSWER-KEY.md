# Trace the Attack · Task 1 — TCP/IP Knowledge Check — Answer Key

**PRIVATE — instructor only. Do not share with students or include in any student-facing document.**
**Pairs with:** `trace-the-attack-task1-tcpip-quiz.md`

---

| Q | Answer | Note |
|---|--------|------|
| 1 | **B** | App → Transport → Internet → Network Access |
| 2 | Segment = **Transport**, Packet = **Internet**, Frame = **Network Access**, Bits = **Physical / on the wire** | The PDU roadmap |
| 3 | **C — 158** | 100 + 20 (TCP) + 20 (IP) + 18 (Eth hdr 14 + FCS 4) = 158 |
| 4 | **False** | Ethernet reads MACs only; ports live in the TCP/UDP header, which Ethernet treats as opaque payload |
| 5 | **B** | Unwrap in reverse: strip Ethernet → read IP → read TCP → deliver bytes to the app |
| 6 | Each layer wraps the data from the layer above in its own header, treating everything above as opaque payload | |
| 7 | **B** | IP = which host; port = which process |
| 8 | **B** | Subnet math says the destination is remote → send to the default gateway |
| 9 | TTL is a hop counter set by the sender; every router decrements it by 1; at 0 the router drops the packet and sends back an ICMP "Time Exceeded" (this is how traceroute works) | |
| 10 | **C** | Protocol 6 = TCP (17 = UDP, 1 = ICMP) |
| 11 | **False** | IP addresses survive end-to-end (except deliberate NAT at a boundary) |
| 12 | **True** | Each hop rewrites a brand-new frame with new src/dst MACs; "IP survives, MAC dies at every hop" |
| 13 | **C** | ICMP, Internet layer — it has no ports and rides directly on IP |
| 14 | **B** | SYN → SYN,ACK → ACK |
| 15 | Sequence = the byte number of the data **I am sending**; Acknowledgment = the next byte number **I expect to receive** (i.e. everything before it arrived) | Both count bytes |
| 16 | **B** | SYN-ACK back = open port with a listener; RST back = closed |
| 17 | **C — RST** | FIN is the polite close; RST is the abort |
| 18 | **B** | One request / one reply; no need for connection setup or reliability overhead |
| 19 | Any two: reliable/guaranteed delivery, ordering (sequence numbers), acknowledgments, retransmission of lost data, flow control (window size), connection setup/teardown | |
| 20 | **True** | Multiplexing — the 4-tuple (src IP, src port, dst IP, dst port) keeps every conversation distinct |

**Scoring:** 20 questions, 1 point each. Short-answer (Q2, Q6, Q9, Q15, Q19) — full point for the key idea, half for a partial answer. Pass mark: 14/20.
