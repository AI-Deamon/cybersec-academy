# Day 13 — Quiz (exit, 4 questions)
*Formative only — reinforces, doesn't punish.*

1. **Wireshark is best described as:**
   a) A port scanner
   b) A packet capture / analyzer (a microscope for the wire)
   c) An exploit framework
   d) A firewall
   **Answer: b**

2. **The TCP handshake consists of:**
   a) GET / POST / 200
   b) SYN / SYN-ACK / ACK
   c) DNS / TLS / HTTP
   d) ping / pong / ack
   **Answer: b**

3. **An open port found by Nmap represents:**
   a) A closed door
   b) A service listening = attack-surface / Availability exposure
   c) A virus
   d) Nothing important
   **Answer: b**

4. **Capturing unencrypted HTTP traffic shows:**
   a) A confidentiality failure in transit (readable without TLS)
   b) A hardware fault
   c) An encrypted payload
   d) Nothing useful
   **Answer: a**

---

## Optional extension (discussion)
5. Why is the *same* Nmap command used by both defenders and attackers?
   **Model answer:** recon is symmetric — knowing open ports helps a defender close them and an attacker enter. Authorization/ethics (Day 12) decide which use is legal.
