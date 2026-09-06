---
marp: true
theme: dark-monospace
paginate: true
title: "Day 14 — Vulnerability Assessment"
footer: "Practical Cyber Security (v2) · Week 3 · Day 14"
---

<!-- _class: lead -->

# Vulnerability assessment
## Day 14 — Scanners find candidates. You decide what matters.

**Week 3 · The penetration testing lifecycle · phase 3 (vuln) → phase 6 (report)**

<!--
RUN SHEET (~85 min).
00:00 Journey check + hook (two 9.8s, one matters)             4
00:04 The pipeline                                             5
00:09 CVE & the NVD                                            7
00:16 CVSS — reading the vector                               10
00:26 DO: decode 2 CVSS vectors                                5
00:31 "Is there a public exploit?"                             7
00:38 DO: run a vuln scanner on the lab                       16
00:54 From scan output to a ranked findings list               9
01:03 The report trap + writing a finding                      6
01:09 Attack <-> defence                                       4
01:13 Wrap + artifact + homework                               4
CUT FIRST IF SHORT: CVSS Scope/temporal detail; the report-writing slide to "a finding =
title + severity + evidence + repro + impact + fix".
NEVER CUT: the pipeline, CVSS AV/PR/UI basics, the exploitability question (KEV/Exploit-DB),
the ranked findings table, "more findings != better report".
ANALOGY (kitchen / inspector): the scanner = a junior who flags EVERYTHING on the checklist
("extinguisher expired! chipped plate! walk-in 1 degree warm!"). The assessor = the senior
who says "the expired extinguisher by the fryer could kill someone; the plate is a note."
ETHICS: scan only <LAB_HOST> (in the ROE). Metasploitable2 is the target.
-->

---

## Where we are

- **Day 13:** what's running, and which version — the service inventory.
- **Today:** which of those versions can actually **hurt** you, and how to **rank** them.
- **The skill today is triage, not scanning.** Anyone can run a scanner.

<!--
Journey Check. This is the pivot from "I found things" to "here's what to fix first" — the
part a client actually pays for.
-->

---

## Hook — two findings, both CVSS 9.8

- **A:** an unauthenticated RCE in a web framework — on a server reachable from the internet,
  running your login page.
- **B:** the same CVSS 9.8 — on a test box, on an isolated network, powered off most of the time.

Same score. **A is a P1 emergency. B is a backlog ticket.** Why?

<!--
The number is the same; the RISK is not. CVSS has no idea where the box is, whether it's
exposed, whether anyone's exploiting it, or what's behind it. That context is your job.
-->

---

## The pipeline

```
service + version  (Day 13)
   -> known CVEs        (the scanner / NVD)
   -> CVSS + is it exploitable?   (CVSS vector, Exploit-DB, KEV, EPSS)
   -> business context   (exposed? sensitive data? compensating controls?)
   -> a RANKED fix list  (P1 / P2 / P3)
```

The scanner does the first two steps. **You do the last three** — and that's the value.

<!--
Put this on the board. Every finding walks this path. A scanner that stops at step 2 gives you
a list; you turn it into a plan.
-->

---

## CVE & the NVD

- **CVE** — a unique ID for **one specific vulnerability**: `CVE-2021-44228` (that's Log4Shell).
  Assigned by MITRE / CNAs. The CVE record is just "this exists, here's a description".
- **NVD** (National Vulnerability Database, US NIST) — enriches each CVE with **affected
  versions**, a **CVSS score**, and **references** (advisories, patches, exploits).
- **CPE** — the structured product string: `cpe:2.3:a:apache:log4j:2.14.1`.

Look one up: search the CVE ID at **nvd.nist.gov** or the vendor's advisory.

<!--
Your Day 13 banner ("Apache httpd 2.4.49") -> search "Apache 2.4.49 CVE" -> CVE-2021-41773
(path traversal -> RCE). That lookup is the everyday move.
Vendor advisories are often more accurate than NVD on "are WE affected" (config matters).
-->

---

## CVSS — read the vector, not just the number

Base score **0–10**. The **vector string** tells you how it's exploited:

| Metric | Values | Means |
|---|---|---|
| **AV** Attack Vector | **N**etwork / **A**djacent / **L**ocal / **P**hysical | how close must the attacker be? |
| **AC** Attack Complexity | Low / High | how reliable is it? |
| **PR** Privileges Required | None / Low / High | do they need an account already? |
| **UI** User Interaction | None / Required | must a victim click something? |
| **C/I/A** Impact | None / Low / High | what do they break? |

`AV:N/AC:L/PR:N/UI:N` = remote, easy, no creds, no click = **as bad as it gets**.

<!--
Bands: 0.1-3.9 Low, 4.0-6.9 Medium, 7.0-8.9 High, 9.0-10.0 Critical.
The number is a rough triage aid. It is NOT risk: no exposure, no "exploited in the wild", no
asset value. Temporal/Environmental metrics exist to add some of that — most people ignore them.
CUT Scope + temporal detail first if short.
-->

---

## Do it now — decode two vectors

Translate to plain English. Which is worse for an **internet-facing** server?

```
1)  CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H     (score 9.8)
2)  CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H     (score 7.8)
```

<!--
5 min.
1) Network, low complexity, no privileges, no user interaction, full C/I/A impact -> a remote
   unauthenticated attacker fully owns it. Critical everywhere.
2) LOCAL access, needs some privileges already -> the attacker must ALREADY be on the box with
   an account. That's a privilege-escalation bug (Day 7). Bad, but not the front-door
   emergency #1 is. For an internet-facing box, #1 is the fire.
-->

---

## The question that changes everything: is there a public exploit?

| Source | Tells you |
|---|---|
| **CISA KEV** (Known Exploited Vulnerabilities) | it is being exploited **right now** — patch first |
| **Exploit-DB** / `searchsploit` | working exploit code exists and is public |
| **Metasploit** module | point-and-click exploitation exists |
| **GitHub** PoC | someone published proof-of-concept |
| **EPSS** | a probability (0–1) it'll be exploited in the next 30 days |

A **CVSS 7.5 on KEV with a Metasploit module** outranks a **CVSS 9.8 with no known exploit.**

<!--
KEV is the single best free prioritisation list — CISA only adds things with confirmed
in-the-wild exploitation. `searchsploit apache 2.4.49` on Kali is the everyday check.
"No public exploit yet" doesn't mean safe — it means less urgent than the ones that do.
-->

---

## Do it now — scan the lab

Against `<LAB_HOST>` (Metasploitable2 — in the ROE):

```
nmap --script vuln <LAB_HOST>          # built in, no install
searchsploit vsftpd 2.3.4             # is there public exploit code?
```

- Read the output. What CVEs does it name?
- Which findings look **real**, which look like **false positives** (guesses from a banner)?

<!--
16 min. `--script vuln` runs NSE vuln-category scripts — decent, noisy, and it WILL produce
false positives (it often flags things based on version alone without confirming). That's the
lesson: the scanner is a candidate generator.
If Nuclei is installed: `nuclei -u http://<LAB_HOST>` for the web side. OpenVAS is heavier -
optional, instructor demo.
No lab? assets/sample-vulnscan.txt.
-->

---

## From scan output to a ranked list

For each candidate finding:

| Finding | CVE | CVSS | Public exploit? | On KEV? | Exposed? | **Priority** |
|---|---|---|---|---|---|---|
| vsftpd 2.3.4 backdoor | CVE-2011-2523 | 9.8 | **yes (Metasploit)** | no | yes (port 21) | **P1** |
| Apache 2.4.x mod_status info leak | CVE-... | 5.3 | partial | no | yes | P3 |
| Samba old version | CVE-... | 8.1 | some | no | internal only | P2 |

- **False positives** → verify manually or drop them (with a note).
- **Executive summary** = your P1s, in one paragraph.

<!--
This table is the artifact and the seed of the Week 3 assignment. The columns after "CVSS"
are what a scanner can't do for you.
Priority is a judgement: CVSS + exploit availability + exposure + what's behind it.
-->

---

## The report trap

> **More findings is not a better report.**

A 90-page dump with 200 "informational" items **buries** the 3 that matter. The client stops
reading.

A good report leads with **the 3 things to fix this week**, each as:

**title · severity (CVSS + context) · evidence · steps to reproduce · impact · remediation**

<!--
The Day 14 trap. Junior testers pad reports to look thorough. Senior testers make the client's
decision easy: "fix these 3 now, these 5 this month, the rest is hygiene."
CUT this slide to the "a finding = ..." line if short.
-->

---

## Attack ↔ Defence

| Attack | Defence |
|---|---|
| banner → CVE → grab the Metasploit module | **vulnerability management**: inventory → scan → prioritise → patch/mitigate → verify |
| target what's on **KEV** (known to work) | patch **SLAs** by severity; KEV items first |
| exploit before the patch window closes | **compensating controls** when you can't patch now (WAF rule, network isolation, disable the feature) |
| chain two "medium" bugs into a critical | don't dismiss mediums in combination |

<!--
Real orgs can't patch everything instantly - the discipline is a *program*: know what you
have, scan regularly, fix by risk, and verify the fix landed. KEV gives you the "do these
first" list for free.
-->

---

## Today's attack / defence / artifact

- **Attack:** the version tells you the CVE; KEV / Exploit-DB tells you if it's a live weapon.
- **Defence:** a vulnerability-management *program* — and KEV as your priority list.
- **Artifact:** a **ranked findings table** for `<LAB_HOST>` (finding / CVE / CVSS / exploit? /
  exposure / priority / fix) in your Engagement Journal — **the seed of the Week 3 assignment.**

---

## Homework

1. Build the **ranked findings table** for `<LAB_HOST>` — at least **5 findings**, each walked
   through the full pipeline (CVE → CVSS → exploit? → context → priority → fix). Commit it.
2. Pick your **top finding**. Look it up on nvd.nist.gov and check CISA KEV. Write 4 sentences:
   what it is, how it's exploited, is it on KEV, and the fix.
3. Mark any **false positives** from your scan and say how you'd verify them.
4. Add `CVE`, `NVD`, `CVSS vector`, `AV:N`, `KEV`, `EPSS`, `searchsploit`, `false positive`,
   `compensating control` to your glossary.

<!--
Due start of Day 15 (the practice day). This table becomes Week 3 assignment Part A.
-->

---

<!-- _class: lead -->

## Recap

1. **Pipeline:** version → CVE → CVSS + is-it-exploitable → business context → ranked list.
2. **CVSS is a triage aid, not risk.** KEV ("exploited right now") beats a high score with no exploit.
3. **A wall of findings is a failed report.** Lead with the 3 that matter.

<!--
Say the three lines. Tomorrow: the practice day - you run the whole lifecycle end to end
(recon -> scan -> vuln -> proof) on a fresh target, coached, and write it up. Plus the Week 3
assignment brief.
-->
