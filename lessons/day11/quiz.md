# Day 11 — Quiz (exit, 4 questions)
*Formative only — reinforces, doesn't punish.*

1. **A ransomware attack that encrypts files and demands payment primarily breaks:**
   a) Confidentiality
   b) Integrity (and Availability)
   c) Availability only
   d) None of CIA
   **Answer: b** (files changed without permission = Integrity; unusable = Availability)

2. **Risk is best described as:**
   a) A feeling of danger
   b) Threat × Vulnerability × Impact — used to prioritize what to fix
   c) The same as a vulnerability
   d) A type of firewall
   **Answer: b**

3. **The untrusted-input question asks:**
   a) Who wrote the code
   b) Is any data the system acts on coming from somewhere it shouldn't trust, and is it checked
   c) What color is the server
   d) How fast is the network
   **Answer: b**

4. **"A login form field is built directly into a database query without checking" is the seed of:**
   a) A hardware failure
   b) SQL injection (an untrusted-input flaw)
   c) A DoS
   d) A valid design
   **Answer: b**

---

## Optional extension (discussion)
5. Why does "it's internal, so it's trusted" fail as a security assumption?
   **Model answer:** after a breach, attackers move laterally inside the network; internal input is frequently abused. Validate input regardless of source (assume breach).
