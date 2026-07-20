# Day 17 — Quiz (exit, 4 questions)
*Formative only — reinforces, doesn't punish.*

1. **Sniffing on a shared network primarily breaks:**
   a) Availability
   b) Confidentiality in transit (C)
   c) Integrity of the OS
   d) The firewall
   **Answer: b**

2. **The best defense against sniffing/MITM on the wire is:**
   a) A longer password
   b) Encryption (TLS) so intercepted content is unreadable
   c) A faster router
   d) Disabling Wi-Fi
   **Answer: b**

3. **Network segmentation (the Day 12 range idea generalized) primarily:**
   a) Encrypts traffic
   b) Limits blast radius / lateral movement between zones
   c) Blocks all external access
   d) Speeds up the network
   **Answer: b**

4. **Denial of Service (DoS) attacks which CIA property?**
   a) Confidentiality
   b) Integrity
   c) Availability (A)
   d) All of them equally
   **Answer: c**

---

## Optional extension (discussion)
5. Why isn't "HTTPS everywhere" a complete network-security solution?
   **Model answer:** TLS protects content in transit (C/I) but not Availability (DoS) or network access control (who's on the segment, spoofing entry). Firewalls, segmentation, and IDS still matter.
