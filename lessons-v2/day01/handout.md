# Authorization & the Law — keep this

*Practical Cyber Security · Day 1 · one-page reference (export to PDF)*

---

## The one rule

> **No scope, no test.**
> Testing a system you do not own or have **written permission** to test is illegal —
> even with no damage, even with good intentions, even out of curiosity.

---

## Hacker vs cracker

- **Hacker (in this course)** — a skill: understanding a system better than the person who
  built it. Neutral. The word started at MIT in the 1960s as a *compliment*.
- **Cracker** — coined ~1985 for someone who breaks security maliciously (also: someone who
  breaks software licensing).
- News headlines use "hacker" to mean "criminal." The field judges by **intent + authorization**,
  not skill.

## The three hats

| Hat | Has permission? | Malicious? | Legal? |
|-----|-----------------|------------|--------|
| **White** | Yes (contract / bounty scope / own lab) | No | Yes |
| **Grey** | No | No ("just checking") | **No** |
| **Black** | No | Yes | No |

The technical action can be identical. Only the authorization changes.

---

## India — Information Technology Act, 2000

| Section | Civil / Criminal | Covers | Penalty |
|---------|------------------|--------|---------|
| **§43** | Civil | Unauthorized access, download, damage, disruption, denial of access. **No intent required.** | Compensation to the affected party |
| **§66** | Criminal | A §43 act done **dishonestly or fraudulently** | Up to **3 years** and/or **₹5 lakh** |
| **§66C** | Criminal | Identity theft (password, e-signature, unique ID) | Up to 3 years + fine |
| **§66F** | Criminal | Cyber-terrorism | Up to life imprisonment |

Other countries have equivalents: **US** — Computer Fraud and Abuse Act; **UK** — Computer
Misuse Act 1990.

---

## What counts as authorized

- A **signed engagement contract** with a written scope (targets, dates, methods, limits).
- A **bug bounty / Vulnerability Disclosure Program** — and only within its published rules.
- **Your own lab** — machines you own, network-isolated, not exposed to the internet.

Everything else — the college portal, a friend's website, a company that "probably won't mind" —
is off-limits.

---

## The CIA triad

Every security incident is one or more of these three failing:

- **Confidentiality** — *who can see this?* (leaks, sniffed passwords, stolen databases)
- **Integrity** — *is this still what it should be?* (tampering, defacement, ransomware)
- **Availability** — *can I reach it when I need it?* (DDoS, ransomware lockout, dead server, no backup)

---

## Authorization Pledge — sign and submit

> I understand that accessing or testing computer systems without authorization is unlawful
> under the Information Technology Act, 2000, regardless of intent or outcome.
>
> **I will only test systems I am authorized to test** — my own isolated lab, or systems for
> which I hold explicit written permission or a valid bug-bounty scope.
>
> I will report vulnerabilities responsibly and will not use anything taught in this course to
> cause harm.

Name: _______________________   Roll no: _______________   Signature: _______________   Date: __________

---

## Go deeper (optional)

- IT Act §43 & §66 — full text: https://www.indiacode.nic.in/handle/123456789/1999
- Steven Levy, *Hackers: Heroes of the Computer Revolution* (1984) — the culture's origin
- The Morris Worm (1988): https://en.wikipedia.org/wiki/Morris_worm
- WannaCry (2017): https://en.wikipedia.org/wiki/WannaCry_ransomware_attack
- CIA triad primer (NIST): https://csrc.nist.gov/glossary/term/confidentiality
