# Day 11 — Teacher Notes

**Teach from:** `day11.md` (deck + speaker notes).
**This file:** cut-list, background, the two exercise answer keys, demo runbook, checkpoint,
exit check, FAQ.

**Week 3 opens.** Frame the week: the attacker's process is *boring and repeatable* — which is
why it can be found (Days 12–15) and defended (Week 4). Today = the enemy catalogue.

---

## The analogy — the ways a thief gets into the restaurant (kitchen)

- talks past the host → phishing / social engineering
- uses a copied key → stolen / reused credentials
- the back door nobody fixed → unpatched vulnerability
- a window left open → misconfiguration
- a poisoned delivery → supply chain
- jams the phone lines so no orders come in → DoS / DDoS
- **malware** = what they carry in or leave behind (a bug, a listening device, a copied ledger)

---

## Must-teach vs. cut-if-short

**Never cut:**
- **The short list** (phishing, weak/stolen creds, unpatched, misconfig, supply chain).
- Phishing anatomy + the **dissection exercise**.
- The malware taxonomy **by behaviour** (delivery ≠ payload) — the "malware = virus" trap.
- The **6-ways-in table** (the artifact).
- **Dwell time** (you won't catch it at the door).

**Cut in this order if behind:**
1. MITM/DoS/supply-chain slide → 3 min (MITM & DoS are Day 3–4 callbacks).
2. The HIBP "do it now" → tell them to do it as homework.
3. Credential-attack sub-types → keep spray vs stuffing, drop brute force detail.
4. Social-engineering "types" table → keep phishing + BEC, drop the rest.

---

## Background

### "The boring five" — sourcing
Year on year, breach reports (Verizon DBIR, M-Trends, IBM Cost of a Data Breach) show the same
top initial-access vectors: **stolen/compromised credentials, phishing, exploited
vulnerabilities, and misconfiguration**, with supply chain rising. Exact percentages shift
annually — teach the *shape* ("most breaches are one of a short list, not a zero-day"), don't
quote a number you can't cite live.

### Phishing / social engineering
- **Cialdini's influence levers** underlie it: authority, scarcity/urgency, social proof,
  liking/familiarity, reciprocity, commitment.
- **BEC** (business email compromise): no malware, no link — just a convincing email asking
  for a wire transfer or a change of payment details. Consistently one of the highest
  *financial*-loss categories. Often uses a genuinely compromised mailbox (so it passes
  SPF/DKIM).
- **Email auth stack:** **SPF** (which servers may send for a domain), **DKIM** (a signature
  proving the message wasn't altered and came from the domain), **DMARC** (what to do when
  SPF/DKIM fail + reporting). Defeats *domain spoofing*, not *lookalike domains* or a
  compromised real account.
- Training works best as *"report" muscle memory + no blame*, not "gotcha" tests that shame people.

### Credential attacks
- **Brute force** — many guesses, one account. Noisy; lockouts stop it.
- **Password spray** — one common password (`Winter2025!`), many accounts. Stays under
  per-account lockout thresholds. Very common against Microsoft 365 / VPN portals.
- **Credential stuffing** — automated replay of `user:pass` pairs from prior breaches.
  Works because of **reuse**. Bot-driven, high volume.
- **Infostealers** (RedLine, Lumma, etc.) harvest saved browser passwords, **cookies/session
  tokens** (which bypass MFA — you're already "logged in"), and crypto wallets. Stealer logs
  are sold in bulk.
- **Control that actually scales: MFA** — ideally phishing-resistant (passkeys / FIDO2), since
  push-approval and OTP can be phished or fatigued.

### Malware taxonomy — notes
- **Delivery** (how it arrives): phishing attachment/link, drive-by exploit, malicious
  update/supply chain, USB, exposed service.
- **Payload / behaviour** (the deck table). One dropper can fetch any payload; families blur
  (a "trojan" that installs a "RAT" that deploys "ransomware").
- **Ransomware** now almost always **exfiltrates first** ("double extortion") — so it's a
  confidentiality breach even if you have backups.
- **Rootkit / bootkit** — persistence + stealth at OS/kernel/firmware level; the reason
  "reimage, don't clean" is the IR default.
- **Living-off-the-land** (Day 8 LOLBins) blurs "malware" vs "misuse of built-ins" — often no
  file for AV to catch; detection shifts to *behaviour*.

### C2 (command and control) and beacons
After a foothold, malware "phones home" to a C2 server for instructions. A **beacon** is a
regular check-in (e.g. every 30–60 s, sometimes jittered). Tell-tale on the network:
- periodic connections to the **same destination**, **small and similar in size**
- a domain/IP with **no legitimate reason** to be contacted (newly registered, odd TLD,
  hosting-provider IP with no website)
- often HTTPS on an odd port, or DNS/ICMP tunnelling to blend in
Occasional large transfers = payload download (inbound) or **exfiltration** (outbound).

### MITM / DoS / supply chain
- MITM: ARP spoof (Day 3), rogue Wi-Fi, on-path ISP, malicious proxy. E2E encryption + cert
  checks defeat it.
- DoS types: volumetric (bandwidth), protocol (SYN flood, connection table), application
  (expensive endpoints). **Amplification/reflection**: spoof the victim's IP to a service
  (DNS, NTP, memcached) that replies with far more data.
- Supply chain: **SolarWinds (2020)** — malicious code in a signed Orion update, ~18,000
  downloads; **xz/liblzma (2024)** — a backdoor almost merged into a core Linux library via
  social engineering of the maintainer; **npm/PyPI** typosquats and dependency confusion.

---

## `phish-sample.txt` — answer key

1. **Display name** "IT Support - YourCompany" vs **From** `it-suppport@yourc0mpany-helpdesk.com`
   — misspelled "suppport", `yourc0mpany` (zero), not the real domain.
2. Link text "Verify My Account Now" → actually `http://account-verify.yourcompany.review/...`
   — `.review` TLD, `yourcompany.review` is **not** `yourcompany.com` (it's a subdomain of
   `yourcompany.review`, an attacker domain). Plain HTTP.
3. Urgency/fear: "URGENT", "deactivated in 24 hours", "permanent loss of all emails", "FULL",
   "unrecognised device".
4. The ask: click the link and enter your credentials on the fake login page.
5. Header tells: `Return-Path` and `Received: from mail-247send.ru` (Russian mailer, unrelated
   to the company); `Reply-To` differs from `From` (`secure-mailbox.info`); `Message-ID`
   domain is `247send.ru`; sending IP `45.155.205.86` is not a company mail server.
6. The 1×1 `<img>` from `45.155.205.86/o.gif?u=ravi.k` is a **tracking pixel** — it tells the
   attacker the email was opened and by whom.

## `conn-log.txt` — answer key

1. **`cdn-telemetry-sync.top` / 193.42.61.10 : 8443** — contacted roughly **every 60 seconds**,
   ~620 bytes out / ~210 bytes in each time. Regular + small + identical = a **C2 beacon**.
   The name mimics a CDN; `.top` is a cheap TLD; port 8443 is unusual.
2. **08:03:20** — 4.88 MB **inbound** from the C2 host = a **payload download** (a second-stage
   tool / ransomware binary).
3. **08:06:14** — 91 MB **outbound** to `45.90.58.7:21` (**FTP**, cleartext) = **data
   exfiltration** to a drop server.
4. Normal browsing: `github.com`, `google.com`, `cdn.jsdelivr.net`, `fonts.gstatic.com` —
   known domains, varied sizes, no rhythm.

*Forward-ref: on Day 13 they see this exact shape live in Wireshark; on Day 19 they build the
timeline and IOCs from it.*

---

## Demo runbook

### Hook — the phish on the projector
Show the deck's phish (or `phish-sample.txt` rendered). 60-second "what's wrong" shout-out.

### Optional instructor demo — real malware traffic in Wireshark
If you want the live version: open a teaching pcap from **malware-traffic-analysis.net** in
Wireshark on the **projector** (do NOT have students download malware pcaps or run samples).
Show: Statistics → Conversations (spot the repeat destination), follow an HTTP stream (the
beacon / the download). Students do the paper version with `conn-log.txt`. **Students install
Wireshark on Day 13, not today.**

### HIBP
`haveibeenpwned.com` — email only, never a password. Reputable (Troy Hunt). If the class
network blocks it, it's fine as homework.

### Failure modes
| Symptom | Fix |
|---|---|
| students want to "try phishing" someone | hard no — that's unauthorized (Day 1); we only *analyse* |
| a student pastes a password into HIBP's "Pwned Passwords" box | that page k-anonymises with a hash prefix, but still — tell them to use the **email** search only |
| network blocks HIBP | homework |
| "is `conn-log.txt` a real format?" | it's simplified; real equivalents are Zeek `conn.log`, firewall logs, EDR network telemetry — same idea |

---

## Checkpoint (by end of class)

Each student can:
- [ ] name the "boring five" initial-access vectors
- [ ] point to 3 tells in a phishing email (sender, link, urgency)
- [ ] explain why "my password is strong" doesn't stop credential stuffing
- [ ] separate malware **delivery** from **payload**, and give an example of each
- [ ] describe what a C2 beacon looks like on the network

---

## Exit check (last 2 min)

1. A phish delivers a file that gives the attacker a remote shell. Name the delivery and the
   payload. — *Delivery = phishing; payload = a RAT (or trojan/dropper → RAT).*
2. Your password is 20 random characters. A site you used it on is breached. Are you safe? —
   *No — credential stuffing replays it elsewhere. Reuse + no MFA = exposed.*
3. Roughly how long are attackers typically inside before detection? — *Weeks to months; often
   found by an outside party.*

---

## FAQ

- **"Isn't antivirus enough?"** No — modern threats use living-off-the-land, fileless
  techniques, and stolen credentials that AV can't see. Defence is layered (EDR + MFA +
  patching + backups + monitoring).
- **"If ransomware hits, just restore from backup?"** Helps with availability, but the data
  was likely **stolen first** (double extortion) and your backups may be targeted too — hence
  *offline/immutable* backups.
- **"How do I report a phish?"** Use your mail client's report button; don't click, don't
  reply, don't forward it around. In a company: report to security, they'll sweep for others.
- **"Can I practise phishing to learn?"** Only in an authorised lab against accounts you own,
  or a sanctioned exercise. Never a real person without written authorisation.
- **"Why do attackers bother with old techniques?"** Because they still work — unpatched
  systems and reused passwords are everywhere. Effort follows success.
