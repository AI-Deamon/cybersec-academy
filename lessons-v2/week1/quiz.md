# Week 1 — Formative Quiz

*10 questions. Self-check — not graded for marks, but the Week-1 assignment assumes you know
this. Paste into your LMS / a Google Form for auto-grading, or self-mark against the key.*

---

**1.** Which best describes the asymmetry between attacker and defender?
- A. The attacker has more money
- B. The attacker needs one way in; the defender must cover every way in
- C. The defender always knows more about the system
- D. There is no asymmetry — it's a fair fight

**2.** Ransomware encrypts a hospital's files and also copies them out first. Which CIA
pillars failed?
- A. Confidentiality only
- B. Availability only
- C. Integrity and Availability
- D. Confidentiality, Integrity, and Availability

**3.** Under India's IT Act, accessing a computer system without authorization **and with no
damage caused**:
- A. is completely legal
- B. can still carry civil liability under §43
- C. is only an offence if you're a foreign national
- D. is only an offence if you profit from it

**4.** A "grey hat" tests a company's website without permission but with no malicious intent.
This is:
- A. legal, because intent matters most
- B. legal, because no damage was done
- C. still unlawful (no authorization)
- D. legal only if they report the bug

**5.** What is the difference between a **program** and a **process**?
- A. Nothing — the words are interchangeable
- B. A program is a file on disk; a process is that program loaded into RAM and running
- C. A program runs in the kernel; a process runs in user space
- D. A process is compiled; a program is interpreted

**6.** Which changes at every hop as a packet crosses the internet?
- A. The source IP address
- B. The destination IP address
- C. The MAC addresses
- D. The port numbers

**7.** Your laptop shows IP `192.168.1.7` but `whatsmyip.com` shows `203.0.113.9`. Why?
- A. The website is wrong
- B. Your laptop has two network cards
- C. NAT — the router presents one public IP for the whole network
- D. Your ISP changed your IP mid-session

**8.** Put these in the order they happen when you load `https://example.com`:
`TLS handshake` · `DNS lookup` · `HTTP request` · `TCP handshake`
- A. DNS → TCP → TLS → HTTP
- B. TCP → DNS → TLS → HTTP
- C. DNS → TLS → TCP → HTTP
- D. HTTP → DNS → TCP → TLS

**9.** A phishing site has a valid padlock (HTTPS). What does the padlock guarantee?
- A. The site is run by a legitimate business
- B. The site is free of vulnerabilities
- C. Only that the connection to that server is private and unmodified
- D. That your data is safe after it's stored

**10.** How should a website store user passwords?
- A. In plain text, in a protected database
- B. Encrypted with a key kept on the server
- C. As a fast hash (e.g. SHA-256) of the password
- D. As a salted, slow hash (bcrypt / Argon2)

---

## ANSWER KEY

1: B · 2: D · 3: B · 4: C · 5: B · 6: C · 7: C · 8: A · 9: C · 10: D

**One-line rationale for the tricky ones:**
- **3** — §43 is civil and needs no intent; §66 (criminal) needs dishonest/fraudulent intent.
- **8** — you must resolve the name, open the connection, secure it, *then* send the request.
- **9** — the padlock is about the pipe, not the business behind it. Most phishing is HTTPS.
- **10** — "encrypted" is reversible and the key is right there; a fast hash falls to GPU
  cracking; salt + a slow KDF is the answer.
