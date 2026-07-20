# Day 14 — Quiz (exit, 4 questions)
*Formative only — reinforces, doesn't punish.*

1. **A vulnerability scanner:**
   a) Exploits the target
   b) Identifies known weaknesses (does not exploit)
   c) Only scans ports
   d) Encrypts the host
   **Answer: b**

2. **The chain from Day 13 to Day 14 is:**
   a) Port → service → known vulnerability
   b) Virus → patch → reboot
   c) Packet → handshake → DNS
   d) User → password → login
   **Answer: a**

3. **Triage is ordered by:**
   a) The raw number of findings
   b) Risk (CIA impact + exposure), not just raw severity
   c) Alphabetical order
   d) Which finding appears first
   **Answer: b**

4. **A "vulnerable" result that is actually safe is a:**
   a) False negative
   b) False positive — validate before acting
   c) Critical bug
   d) Exploit
   **Answer: b**

---

## Optional extension (discussion)
5. Why might a "critical" finding on an isolated, unused service rank *below* a "medium" finding on a public, sensitive one?
   **Model answer:** risk = threat × vulnerability × impact × exposure. The medium-on-public is more reachable and impactful in practice, so it's the higher risk despite lower severity — triage follows risk, not the scanner's severity label.
