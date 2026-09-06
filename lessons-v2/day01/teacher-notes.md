# Day 1 — Teacher Notes

**Teach from:** `day01.md` (deck, with speaker notes on every slide).
**This file:** the things that don't fit on a slide — background for shaky topics, the demo
runbook, answer keys, and the cut-list. Read this the night before as step 3 of the prep routine.

---

## Must-teach vs. cut-if-short

**Never cut:**
- The authorization line ("no damage + good intent is still illegal").
- §43 vs §66 (civil vs criminal).
- The repo setup — students must leave with a repo.
- The three-line recap.

**Cut in this order if you're behind:**
1. The phreaking slide's Woz/Jobs detail (keep one sentence: "the mindset predates computers").
2. Drill goes from 3 headlines to 2 (keep #1 Confidentiality and #3 Availability).
3. "The rhythm" slide — fold into the recap.
4. One of the five historical events (drop Stuxnet before Mitnick — Mitnick is the point).

---

## Background for the topics people get shaky on

### The hacker-culture history (if a student pushes for detail)
- **TMRC / MIT AI Lab, 1959–70s.** "Hack" started as MIT slang for a clever prank or an elegant
  technical trick. The AI Lab crowd (around the PDP-1, later PDP-10) built the culture: open
  code, meritocracy of skill, distrust of gatekeeping.
- **The "hacker ethic"** — named by journalist Steven Levy in *Hackers: Heroes of the Computer
  Revolution* (1984): access to computers should be unlimited, all information should be free,
  mistrust authority, judge by skill not credentials, you can create art and beauty with a
  computer.
- **Phreaking:** exploring the analog phone network. The AT&T long-distance system used
  in-band signalling — a 2600 Hz tone told the switch "this line is idle" while you stayed
  connected, so the next digits you sent were billed as a new (free) call. John Draper found a
  toy whistle from Cap'n Crunch cereal produced 2600 Hz. "Blue boxes" generated the full tone
  set. Wozniak built and sold them at Berkeley; Jobs handled sales. The hacker magazine *2600*
  is named after the tone.
- **The word split:** by ~1983–85 (the film *WarGames*, the arrest of "the 414s") mass media
  fixed "hacker = intruder." Purists proposed "cracker" for the malicious sense. RFC 1392 (1993)
  even documented both. Popular usage never adopted "cracker"; the security industry uses
  "threat actor," "adversary," or the hat colours instead.

### Hat colours — the precise version
- **White hat:** acts only with authorization (contract, employment, bug-bounty scope, own lab).
- **Black hat:** unauthorized and malicious (theft, extortion, sabotage, espionage).
- **Grey hat:** unauthorized but claims non-malicious intent — e.g. scanning a company without
  permission then emailing them the results. **Still a §43 contravention in India**, and often
  a §66 risk if any "dishonest/fraudulent" element is argued. Tell students plainly: grey hat
  is a legal category that gets people arrested.

### The five events — dates and one anchoring fact each
| Event | Anchor fact |
|-------|-------------|
| Morris Worm, Nov 1988 | ~6,000 machines (~10% of the then-internet); Robert Morris = first person convicted under the US Computer Fraud and Abuse Act. |
| Kevin Mitnick, arrested 1995 | Primarily **social engineering**, not exotic exploits. Served ~5 years. Ran a security consultancy (Mitnick Security) afterward until his death in 2023. |
| L0pht Senate testimony, May 1998 | Seven hackers testified to the US Senate; the "30 minutes to take down the internet" line referred to BGP weaknesses. Members later founded @stake. |
| Stuxnet, discovered 2010 | Targeted Siemens PLCs controlling uranium centrifuges at Natanz, Iran. First widely-recognised state cyber-weapon causing physical damage. |
| WannaCry, May 2017 | Used **EternalBlue** (an SMB exploit leaked from the NSA). Hit ~200k machines in 150 countries; crippled parts of the UK NHS. NotPetya (June 2017) followed, ~$10bn damage. |

### IT Act, 2000 — how to explain it without over-claiming
- **§43** — civil liability. If you access / download / damage / disrupt a computer "without
  permission of the owner," you're liable to pay **compensation** to the affected party. Intent
  is **not** required. Adjudicating officer handles claims up to ₹5 crore.
- **§43A** — a body corporate that is negligent with "sensitive personal data" owes
  compensation. (Context for later data-protection discussion.)
- **§66** — if a §43 act is done **dishonestly or fraudulently** (terms borrowed from the IPC),
  it becomes a **criminal** offence: up to **3 years** imprisonment and/or up to **₹5 lakh**.
- **§66C** — identity theft (fraudulent use of another's password, e-signature, unique ID).
- **§66F** — cyber-terrorism (life imprisonment possible).
- **§65** — tampering with computer source code required to be kept by law.
- Keep the framing at: *"unauthorized access alone already carries legal consequences; do it
  dishonestly and it's a crime."* Full legal analysis is out of scope — point them to the
  student-pack links.

---

## Demo runbook — the trailer ("watch this")

**Goal:** show a plaintext credential captured off the wire in under 60 seconds. No explanation
of mechanism (that's Day 4).

**Pre-flight (do this the night before, per prep routine step 4):**
1. Target server reachable on the class network with a plain-HTTP login page
   (`http://<target>/login`). If the central lab isn't up yet, run a throwaway locally:
   ```
   # any minimal HTTP login form works; example with a one-file Flask app in assets/
   python3 assets/trailer_login.py      # serves http://0.0.0.0:8000/login
   ```
2. Identify your capture interface: `ip -br addr` (Linux) / `ifconfig` (mac).
3. Test the capture:
   ```
   sudo tcpdump -i <iface> -A -s0 'tcp port 8000 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)'
   ```
   Then submit the login in a browser; confirm you see `username=` and `password=` in the dump.
4. **Record a 60-second screen capture of the working demo → `assets/trailer-demo.mp4`.**
   This is the fallback. If anything is off on the day, play the recording and narrate.

**On the day:**
- Terminal 1 (large font): `sudo tcpdump -i <iface> -A -s0 'tcp port 8000'`
- Browser: go to `http://<target>:8000/login`, enter `student` / `hunter2`, submit.
- Terminal 1: scroll to the `POST /login` request, highlight `username=student&password=hunter2`.
- Script: *"I never touched their computer. I watched the wire. That's the whole field in one
  move. In 20 days you do this yourself — and you'll know exactly why HTTPS makes it stop
  working."*
- Do **not** take questions on "how" — say "Day 4" and move on.

**Common failure modes:**
| Symptom | Fix |
|---------|-----|
| No packets | wrong interface; re-run `ip -br addr`, try the one with the class IP |
| Permission denied | need `sudo`; on mac add your user to `access_bpf` or use `sudo` |
| HTTPS redirect | the page must be plain HTTP — disable any HSTS/redirect on the target |
| Corporate network blocks tcpdump | use the recording; don't fight it live |

---

## Pair activity — model answers

Cards: `assets/breach-cards.pdf`. Each pair gets one.

| Breach | Pillar(s) | Weakness (one sentence) | Authorized / crime |
|--------|-----------|-------------------------|--------------------|
| **Equifax, 2017** | Confidentiality | An unpatched known vulnerability in a public web app (Apache Struts) let attackers pull ~147M records. | Crime |
| **Large UPI/Aadhaar-linked data exposure** | Confidentiality | Personal data reachable through an unauthenticated API / misconfigured endpoint. | Depends: researchers who *reported* it acted in good faith but usually without authorization (grey); anyone harvesting/selling the data = crime. Use this one to discuss the grey zone. |
| **College result-portal defacement** | Integrity (+ Availability if taken down) | Weak admin credentials / unpatched CMS allowed content to be rewritten. | Crime |
| **WannaCry, 2017** | Availability (+ Integrity — files encrypted) | Unpatched SMBv1 (EternalBlue); no network segmentation; no offline backups. | Crime |

**Steer the discussion:**
- Students conflate "data was accessed" with "confidentiality, full stop." Push: what was the
  *harm*? Equifax = disclosure (C). Order tampering = the *change* (I).
- The UPI/Aadhaar card is deliberately the ambiguous one — use it to reinforce that "I was just
  reporting it" is not authorization.

---

## Exit check (last 2 min, verbal or on paper)

1. A pentester with a signed contract and a researcher scanning a company uninvited use the
   same tool. What's different? — *Authorization. One is lawful, one is a §43 contravention.*
2. Ransomware encrypts a hospital's files. Which CIA pillars failed? — *Integrity (files
   changed) and Availability (can't use them).*
3. Complete the rule: "No scope, ______." — *no test.*

---

## FAQ students ask on Day 1

- **"Can I get in trouble just for learning this?"** No. Learning, reading, and practising in
  your own isolated lab is fine. The line is touching systems you don't own or have permission
  for.
- **"Is using Kali Linux illegal?"** No. The tools are legal to own and run. Pointing them at
  someone else's systems without permission is the offence.
- **"What about bug bounties?"** Legal *if* you stay strictly inside the program's published
  scope and rules. Out-of-scope testing is not covered.
- **"My college portal has an obvious bug — can I report it?"** Not by testing it. Report the
  behaviour you noticed to the administrator; don't probe further without written permission.
- **"Do I need to be good at maths / competitive programming?"** No. You need curiosity and
  persistence. Some roles use scripting (we cover the basics in Week 2).
