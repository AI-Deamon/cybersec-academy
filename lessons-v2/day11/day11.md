---
marp: true
theme: dark-monospace
paginate: true
title: "Day 11 — Attacks & Malware: How They Actually Get In"
footer: "Practical Cyber Security (v2) · Week 3 · Day 11"
---

<!-- _class: lead -->

# Attacks & malware
## Day 11 — How attackers actually get in — and what they leave behind

**Week 3 · The penetration testing lifecycle**

<!--
RUN SHEET (~85 min). Hands-on: phishing dissection, HIBP, a connection-log analysis.
00:00 Journey check + hook (spot the phish)                    4
00:04 The short list — how attackers get in                    5
00:09 Social engineering & phishing (#1)                       9
00:18 DO: dissect a phishing email                             8
00:26 Credential attacks                                       7
00:33 DO: check yourself on HIBP                                4
00:37 Malware families — by behaviour, not "virus"            10
00:47 DO: spot the C2 beacon in a connection log               8
00:55 MITM, DoS/DDoS, supply chain                             6
01:01 Attack <-> defence: the 6 ways in (the artifact)         6
01:07 "We'd notice" — dwell time                               4
01:11 Wrap + homework                                          4
CUT FIRST IF SHORT: MITM/DoS/supply-chain slide to 3 min (mostly callbacks); the HIBP DO.
NEVER CUT: the short list, phishing anatomy + the dissection DO, the malware behaviour taxonomy,
the 6-ways-in table, dwell time.
ANALOGY (kitchen): the ways a thief gets into the restaurant — talks past the host (phishing),
uses a copied key (stolen creds), the back door nobody fixed (unpatched), a window left open
(misconfig), a poisoned delivery (supply chain), jamming the phone lines (DoS). Malware = what
they bring in or leave behind.
-->

---

## Where we are

- **Weeks 1–2:** you understand the machine and can *reason* about attacks.
- **This week:** the attacker's actual **process**, start to finish — the pentest lifecycle.
- **Today:** the catalogue — how they really get in, and the malware they use.
- **Tomorrow:** the lifecycle framework, and we build the lab.

<!--
Journey Check. Week 3 opens. Frame: "movie hacking" is rare. Real breaches are boring and
repeatable — that's good news, because boring and repeatable can be defended.
-->

---

## Hook — spot the phish

*(email on the projector)*

```
From: IT Support <it-suppport@yourc0mpany-helpdesk.com>
Subject: [URGENT] Your account will be disabled in 24 hours

Dear User, we detected unusual activity. Verify now to avoid
suspension:  http://account-verify.yourcompany.review/login
```

**60 seconds: what's wrong? (there are at least 4 things)**

<!--
Answers: misspelled "suppport"; lookalike domain (yourc0mpany, .review TLD); manufactured
urgency + fear; the link text vs where it goes; generic "Dear User". Take shouts, then move on.
-->

---

## The short list — how attackers actually get in

Year after year, most breaches start with **one of these**:

1. **Phishing / social engineering** — trick a person
2. **Stolen or weak credentials** — reuse, breaches, guessing
3. **Unpatched vulnerability** — a known hole in exposed software
4. **Misconfiguration** — default password, open storage, permissive rule
5. **Supply chain** — compromise a vendor/update to reach everyone downstream

Not zero-days. Not movie hacking. **The boring five.**

<!--
This is the mental model for the whole week. When you assess a system (Days 12-15) or defend
one (Week 4), you're mostly working this list. Everything today is a variety of one of these.
-->

---

## Social engineering & phishing — #1

Attackers exploit **people under pressure**, using:

- **Authority** ("this is the CEO") · **Urgency** ("in 24 hours") · **Fear** ("account
  suspended") · **Reward** ("you won") · **Familiarity** (looks like a service you use)

| Type | Channel |
|---|---|
| Phishing | mass email |
| Spear phishing / whaling | targeted email (an exec) |
| Smishing / vishing | SMS / phone call |
| **BEC** (business email compromise) | "pay this invoice / change these bank details" |

<!--
Phishing works on everyone — it's not about intelligence, it's about catching someone busy,
stressed, or distracted. BEC has no malware at all — pure social engineering — and causes
enormous financial losses.
-->

---

## Anatomy of a phish

1. **Spoofed / lookalike sender** — display name "IT Support", real address is wrong
2. **A pretext** — a believable story with a deadline
3. **The hook** — a link to a **credential-harvest page**, or a malicious attachment
4. **The harvest** — a pixel-perfect copy of a real login; you type your password; it's gone

Defences: **MFA** (a stolen password isn't enough), email filtering, **SPF/DKIM/DMARC**,
a one-click **report button**, and training that isn't shaming.

<!--
MFA is the single highest-value control here — it breaks step 4.
-->

---

## Email authentication — SPF · DKIM · DMARC

The stack that makes **sender-domain spoofing** hard:

| | What it does |
|---|---|
| **SPF** | a DNS record listing which mail servers may send *for this domain*. Receiver checks the sending IP against it. |
| **DKIM** | the sending server **signs** the message; the receiver verifies the signature using a public key in DNS → proves it wasn't altered and came from the domain. |
| **DMARC** | ties SPF+DKIM to the visible `From:` domain, tells receivers what to do on failure (**none / quarantine / reject**), and **sends reports** back to the domain owner. |

**What it stops:** someone sending as `you@yourbank.com`.
**What it does NOT stop:** a **lookalike** domain (`yourbank-secure.com`) or a genuinely
**compromised** mailbox — both pass all three.

<!--
Reading a header: `Received:` chain shows the real path; `Authentication-Results:` shows
spf=pass/fail, dkim=pass/fail, dmarc=pass/fail. The Day-11 phish dissection asset asks about
exactly these fields. Most SOC L1 work is triaging reported phish — this is the check they run.
CUT to the one-line summary if behind: "SPF/DKIM/DMARC stop domain spoofing, not lookalikes or
a hacked account."
-->

---

## Do it now — dissect a phishing email

Open `assets/phish-sample.txt`. Find and write down:

1. The **display name** vs the **actual `From:` address**
2. Where the **link text** points vs the **real URL** behind it
3. The **urgency / fear** cue
4. The **ask** — what do they want you to do?
5. One header field that gives it away (`Received:`, `Reply-To:`, `Return-Path:`)

<!--
8 min. The sample is a defanged real-style phish with full headers. Walk the Received chain —
it originated somewhere unrelated to the claimed sender. Reply-To often differs from From in
BEC. This is exactly what a SOC analyst does on an alert (Day 19).
-->

---

## Credential attacks

How your password reaches an attacker:

- **Phished** (above) · **breached & reused** (you used it on a site that got hacked) ·
  **cracked** (weak hash — Day 5) · **stolen by an infostealer** (malware) · **guessed**

| Attack | What it is |
|---|---|
| **Brute force** | try many passwords against one account (loud, often locked out) |
| **Password spray** | try *one* common password against *many* accounts (quiet) |
| **Credential stuffing** | replay username+password pairs from other breaches |

**Reuse is the killer.** The control: **MFA everywhere** + a password manager + blocking known-breached passwords.

<!--
Credential stuffing is why "but my password is strong" doesn't save you — if you reused it and
the other site leaked, attackers just log in. MFA is the fix that actually scales.
-->

---

## Do it now — have you been pwned?

Go to **haveibeenpwned.com** and enter your **email address** (not a password).

- In how many known breaches does it appear?
- For any account where you **reused** that password — change it, and turn on **MFA**, today.

<!--
4 min. HIBP is Troy Hunt's breach-aggregation service — safe, reputable, no password entry.
Most students will have 2-10 hits. Make the action concrete: the reused ones are the danger.
CUT this DO first if short — but it lands hard, try to keep it.
-->

---

## Malware — classified by *behaviour*, not "virus"

| Family | What it does |
|---|---|
| **Virus** | attaches to files; spreads when they're run |
| **Worm** | spreads **by itself** across the network (Morris, WannaCry) |
| **Trojan** | pretends to be something useful |
| **Ransomware** | encrypts your files, demands payment (often steals first — "double extortion") |
| **RAT** | gives the attacker a remote-control shell |
| **Rootkit** | hides the attacker's presence from the OS |
| **Infostealer** | harvests passwords, cookies, session tokens, crypto wallets |
| **Botnet client** | enrols your machine into a rented army (DDoS, spam, mining) |

**How it gets in = the short list. What it does = this table.**

<!--
The Day 11 TRAP: "malware = virus". Virus is one small category. Modern crime is ransomware +
infostealers + RATs. Separate DELIVERY (phishing/exploit/supply chain) from PAYLOAD (this
table) — a phish can deliver any of these.
-->

---

## Do it now — spot the C2 beacon

Open `assets/conn-log.txt` — a simplified network connection log from an infected host.

- Which destination is contacted **on a regular interval**? (that rhythm = a **beacon**)
- Which connection **downloaded** a lot? Which **uploaded** a lot (exfiltration)?
- Which destinations look like normal browsing, and which don't?

<!--
8 min. The log has: normal web traffic + one host contacted every ~60s (the C2 beacon) + one
big download (the payload) + one big upload to an odd host (exfil).
On Day 13 you'll see this live in Wireshark. Today: the pattern. This is the bridge to Blue team.
-->

---

## MITM, DoS/DDoS, supply chain

- **MITM** (Day 3–4) — on-path attacker reads or rewrites traffic; fix = end-to-end encryption.
- **DoS** — exhaust a resource (bandwidth, connections, CPU) so real users can't get in.
  **DDoS** — the same, from a **botnet** of thousands. Amplification uses others' servers to
  multiply the traffic.
- **Supply chain** — compromise a trusted vendor, library, or software update; everyone who
  installs it is hit (SolarWinds 2020, the `xz` backdoor 2024). Fix = vendor vetting,
  integrity checks, least privilege for third-party code.

<!--
Mostly callbacks — keep it brisk. Supply chain is the scariest because the malicious code
arrives *signed and trusted*. CUT to 3 min if behind.
-->

---

## Attack ↔ Defence — the 6 ways in *(your artifact)*

| Way in | One indicator | One control |
|---|---|---|
| Phishing / social eng | urgency + mismatched sender/link; user reports | MFA, email auth (SPF/DKIM/DMARC), filtering, training |
| Stolen / weak creds | login from new geo, impossible travel | MFA everywhere, password manager, block breached passwords |
| Unpatched service | known-vuln version exposed to the internet | patch cadence, asset inventory, reduce exposure |
| Misconfiguration | default creds, open storage, `any-any` rule | hardening baselines, config scanning, least privilege |
| Supply chain | new outbound connections after an update | vendor vetting, SBOM, integrity verification |
| Malware (delivered by the above) | C2 beacons, odd processes, new persistence | EDR, allowlisting, egress filtering, offline backups |

<!--
This table IS the artifact. Students copy it, in their own words, to day11/ways-in.md.
Every Week-4 defence day maps back to a row here.
-->

---

## "We'd notice" — often, you don't

- **Dwell time** — from break-in to detection — varies: sometimes days, often much longer.
- A meaningful share of breaches are still first flagged by **someone outside** — a customer,
  a researcher, a payment processor, law enforcement.

**Prevention fails silently.** That's why detection and response (Week 4) is half the job.

<!--
The second Day 11 trap. The shape is what matters, not a number: attackers can be inside a
long time unnoticed, and orgs frequently learn from a third party. Reporting has improved
year on year — say "varies, often longer than you'd think", not a hard stat.
-->

---

## Today's attack / defence / artifact

- **Attack:** get a foot in via the boring five — usually a phished or reused credential — then
  deliver a payload (RAT / ransomware / infostealer) and stay quiet.
- **Defence:** MFA, patching, hardening, egress filtering, backups — and detection, because
  you won't catch it at the door every time.
- **Artifact:** `day11/ways-in.md` — the 6 ways in, one indicator + one control each, your words.

---

## Homework

1. Write `day11/ways-in.md` — the 6-ways-in table, in your own words. Commit it.
2. From your HIBP check: list (no passwords!) how many breaches your email is in, and one
   concrete action you took or will take.
3. Find one **real** recent breach in the news. In 3 sentences: which of the "boring five" was
   the initial access, and what was the impact?
4. Add `phishing`, `credential stuffing`, `password spray`, `C2 beacon`, `dwell time`,
   `RAT`, `infostealer` to your cheat-sheet / glossary.

<!--
Due start of Day 12.
-->

---

<!-- _class: lead -->

## Recap

1. **The boring five:** phishing, weak/stolen creds, unpatched, misconfig, supply chain. Most breaches are one of these.
2. **Delivery ≠ payload.** A phish can drop ransomware, a RAT, or an infostealer. "Malware" isn't "virus".
3. **You won't stop everything at the door.** Attackers go unnoticed for a while — plan to detect and respond.

<!--
Say the three lines. Tomorrow: we turn "here are the attacks" into "here is the repeatable
process an attacker (and a pentester) follows" — the lifecycle — and we stand up the lab.
-->
