# Week 3 — Student Pack

*Practical Cyber Security (v2) · Week 3: The penetration testing lifecycle*

This week you learn the attacker's **process**, end to end, and run it (safely, in the lab)
against authorised targets. The lens: **scope → recon → enumerate → exploit → post-exploit →
report** — the same shape every engagement.

**Lab:** from Day 12 you connect to the class lab (a Kali attack box + the vulnerable targets).
Day 13 you install Wireshark. **Only ever test the lab targets or your own machines** — Day 1's
"no scope, no test" is a legal line, not a slogan.

---

## Day 11 — Attacks & malware: how they actually get in

### Recap
- **The "boring five" initial-access routes** — most breaches start with one of:
  1. **Phishing / social engineering** — trick a person
  2. **Stolen / weak credentials** — reuse, breaches, guessing
  3. **Unpatched vulnerability** — a known hole in exposed software
  4. **Misconfiguration** — default password, open storage, permissive rule
  5. **Supply chain** — compromise a vendor / update to reach everyone downstream
- **Phishing** exploits people under pressure — authority, urgency, fear, reward, familiarity.
  Tells: lookalike sender/domain, a deadline, link text ≠ real URL, a generic greeting, a
  credential-harvest page. **BEC** (business email compromise) uses no malware at all.
  Control: **MFA**, email auth (SPF/DKIM/DMARC), filtering, a report button, no-blame training.
- **Credential attacks:** brute force (many guesses, one account) · **password spray** (one
  common password, many accounts) · **credential stuffing** (replay breach `user:pass` pairs).
  **Reuse is the killer.** Infostealer malware also grabs session **cookies** — which bypass MFA.
- **Malware — by behaviour, not "virus":** virus · worm (self-spreads) · trojan · ransomware
  (encrypts + usually steals first) · RAT (remote control) · rootkit (hides) · infostealer ·
  botnet client. **Delivery ≠ payload** — a phish can drop any of these.
- **C2 beacon:** malware checks in with its control server on a regular interval — periodic,
  small, similar-sized connections to a destination with no legitimate reason to be contacted.
- **MITM** (on-path read/modify — fix: E2E encryption), **DoS/DDoS** (exhaust a resource; DDoS
  = from a botnet; amplification multiplies it), **supply chain** (SolarWinds 2020, xz 2024).
- **You won't catch everything at the door** — attackers go unnoticed for a while, and orgs
  often learn from a third party. Detection + response is half the job (Week 4).

### Key terms
`social engineering` · `phishing / spear phishing / BEC` · `SPF / DKIM / DMARC` · `MFA` ·
`brute force` · `password spray` · `credential stuffing` · `password reuse` · `infostealer` ·
`session cookie theft` · `virus / worm / trojan / ransomware / RAT / rootkit / botnet` ·
`double extortion` · `C2` · `beacon` · `dwell time` · `MITM` · `DoS / DDoS` · `amplification` ·
`supply chain attack`

### In class — the 3 beats
1. Dissect `assets/phish-sample.txt` — sender, link, urgency, the ask, a header tell.
2. `haveibeenpwned.com` — your **email** (never a password). How many breaches?
3. `assets/conn-log.txt` — find the C2 beacon, the payload download, the exfil.

### Homework (due start of Day 12)
1. Write `day11/ways-in.md` — the **6 ways in** (the boring five + malware), with **one
   indicator + one control** for each, in your own words. Commit it.
2. From your HIBP check: how many breaches (no passwords listed), and one action you took.
3. One **real** recent breach in the news — 3 sentences: which of the "boring five" was the
   initial access, and the impact.
4. Add `phishing`, `credential stuffing`, `password spray`, `C2 beacon`, `dwell time`, `RAT`,
   `infostealer` to your glossary.

### Marking checklist (Day 11 homework, 5 marks)
- [ ] `ways-in.md` — all 6, each with a valid indicator **and** control, in the student's words (3)
- [ ] HIBP result + a concrete action (1)
- [ ] real breach correctly mapped to one of the boring five (1)

---

## Day 12 — *(to be added)*
## Day 13 — *(to be added)*
## Day 14 — *(to be added)*
## Day 15 — *(to be added)*

---

## Weekend Assignment — Week 3

*Briefed at the end of Day 15. Theme: run the full lifecycle on a fresh lab target —
recon → scan → triage → a short findings report; R&D one CVE deep enough to explain the exploit.*
