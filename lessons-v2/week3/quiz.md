# Week 3 — Formative Quiz

*10 questions. The Week-3 assignment (a solo mini-engagement + a deep CVE explainer) assumes this.*

---

**1.** Most real breaches start with which of the following?
- A. a novel zero-day exploit
- B. one of a short list: phishing, stolen/weak credentials, an unpatched service, a misconfig
- C. a nation-state supercomputer
- D. physical break-in

**2.** Your password is 20 random characters. A different site you used it on is breached.
Are you safe?
- A. yes — the password is strong
- B. yes — the other site's breach doesn't affect you
- C. no — **credential stuffing** replays the pair elsewhere; reuse + no MFA = exposed
- D. only at risk if the other site stored it in plain text

**3.** "Malware" and "virus" mean the same thing.
- A. true
- B. false — a virus is one small category; modern crime is ransomware, infostealers, RATs.
  Also: **delivery ≠ payload**.
- C. true, but "virus" is the technical term
- D. false — malware is only for Windows

**4.** On the network, a **C2 beacon** looks like:
- A. one large download
- B. random traffic to many different hosts
- C. periodic, small, near-identical connections to one destination that has no legitimate
  reason to be contacted
- D. encrypted traffic to a well-known CDN

**5.** What single thing makes a penetration tester's port scan lawful and an attacker's
unlawful?
- A. the tools used
- B. the time of day
- C. signed authorization within an agreed scope (the ROE)
- D. whether damage was caused

**6.** Which phase's output is the **input** to Exploitation?
- A. Reporting
- B. Scanning & enumeration (the service inventory tells you what to try)
- C. Pre-engagement
- D. Post-exploitation

**7.** `nmap` reports a port as `filtered`. This means:
- A. the port is open
- B. the port is closed
- C. no useful response came back — a firewall is dropping the probe
- D. the service crashed

**8.** Two findings: CVSS 9.8 (no public exploit, on an isolated internal box) vs CVSS 7.5
(on CISA KEV, internet-facing). Which do you fix first?
- A. the 9.8 — always fix the higher score first
- B. the 7.5 — it's being exploited in the wild **and** it's reachable
- C. neither — wait for more data
- D. both are equal priority

**9.** A vulnerability scanner reports "you run Apache 2.4.49, therefore you are vulnerable to
CVE-2021-41773." Before you report it as confirmed, you should:
- A. nothing — the scanner is authoritative
- B. verify it (the check may be version-only; the distro may have backported the fix)
- C. immediately exploit it
- D. raise it to Critical regardless

**10.** In a report, what does a finding need **besides** "I found it"?
- A. a dramatic screenshot
- B. the CVE number only
- C. evidence, steps to reproduce, impact, and a remediation
- D. the attacker's real name

---

## ANSWER KEY

1: B · 2: C · 3: B · 4: C · 5: C · 6: B · 7: C · 8: B · 9: B · 10: C

**Rationale:**
- **4** — the *rhythm* is the tell; the destination often has an odd TLD / a hosting-provider IP.
- **8** — CISA KEV ("known exploited") + reachable beats a bare high score. This is the
  priority inversion from Day 14.
- **9** — a banner-only finding is a *candidate*. Ubuntu/Debian backport security fixes, so the
  package version can be patched even when the upstream version string looks old.
