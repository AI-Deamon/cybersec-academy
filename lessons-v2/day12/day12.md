---
marp: true
theme: dark-monospace
paginate: true
title: "Day 12 — The Penetration Testing Lifecycle + Stand Up the Lab"
footer: "Practical Cyber Security (v2) · Week 3 · Day 12"
---

<!-- _class: lead -->

# The penetration testing lifecycle
## Day 12 — The repeatable process — and everyone gets into the lab

**Week 3 · The penetration testing lifecycle**

<!--
RUN SHEET (~85 min). The lab-connect DO is the big one and the Day 12 GATE.
00:00 Journey check + hook (burglar vs inspector)             4
00:04 What a penetration test is (and isn't)                   5
00:09 The lifecycle — the 6 phases                            10
00:19 Phase 1: scope, ROE, authorization                      10
00:29 DO: write a mock ROE for the class engagement           10
00:39 The reporting mindset                                    7
00:46 The Engagement Journal                                   4
00:50 Blue team's view — kill chain / MITRE ATT&CK             6
00:56 DO: connect to the lab (the GATE)                       18
01:14 Wrap + artifact + homework                               6
CUT FIRST IF SHORT: the kill-chain slide to 3 min; the ROE DO to a 5-min fill of 3 fields.
NEVER CUT: the 6 phases, scope/ROE/authorization, the lab connect, the Engagement Journal.
ANALOGY (kitchen): a pentester = a hired health inspector with WRITTEN permission to try to
break in, who then reports exactly how — with photos and fixes. Not a burglar. The one
difference between them is a signed piece of paper.
LAB: this is the GATE. Every student must reach the lab targets and snapshot today. Stragglers
go on the shared Kali; fix their own VM after.
-->

---

## Where we are

- **Yesterday:** the catalogue of attacks and malware.
- **Today:** the **process** — the same 6 phases every pentester (and every attacker) follows —
  and **everyone connects to the lab.**
- **This week:** we walk the phases for real — recon (13), scanning (14), a full run (15).

<!--
Journey Check. Week 3's spine: offense is a PROCESS, not improvisation. Learn the process once,
apply it forever.
-->

---

## Hook — burglar or inspector?

Both pick the lock. Both walk through your building. Both know exactly how to get in.

**The difference is one signed piece of paper.**

A penetration tester does everything an attacker does — **with written authorization**, and
then hands you the report.

<!--
Callback to Day 1 (white/grey/black hat; "no scope, no test"). Today that line becomes an
actual document you write.
-->

---

## What a penetration test is

An **authorized, simulated attack** to find and report weaknesses **before a real attacker
does.**

| | Scope | Depth | Goal |
|---|---|---|---|
| **Vuln scan** | broad | shallow, automated | list known weaknesses |
| **Penetration test** | defined | deep, manual + tools | prove impact, report fixes |
| **Red team** | goal-based | stealthy, long | test **detection & response** |
| **Bug bounty** | published scope | crowd, ongoing | pay per valid finding |

<!--
Students conflate these. A pentest is time-boxed, scoped, and its DELIVERABLE is the report.
Red team is quieter and measures whether the blue team notices. We're learning pentest.
-->

---

## The lifecycle — 6 phases

```
1 Pre-engagement   scope, rules, authorization        "done" = signed ROE
2 Reconnaissance   passive info gathering             "done" = target profile
3 Scanning & enum  active — hosts, ports, services    "done" = service inventory
4 Exploitation     prove a vulnerability is real      "done" = proof (a shell / data)
5 Post-exploitation how far can we get? what's at risk "done" = impact mapped
6 Reporting        risk + evidence + fix, per finding "done" = the report delivered
```

**Each phase feeds the next.** Recon output is the scan's input; the scan's output is what you
try to exploit.

<!--
This is the map for all of Week 3-4. Put it on the board and tick phases off across the week:
today = phase 1, Day 13 = 2-3, Day 14 = 3 (vuln side), Day 15 = 1-4, Day 16-17 = 4-5, Day 19
= the defender's mirror.
Names vary (PTES, OSSTMM, NIST) — the shape is the same.
-->

---

## Phase 1 — scope, ROE, authorization

Before **any** packet touches the target:

- **Scope** — exactly what's in (IPs, domains, apps, accounts) and what's **out**.
- **Rules of Engagement (ROE)** — allowed techniques; **no DoS**; social-engineering yes/no;
  data-handling rules; testing **hours**; emergency **contacts**.
- **Authorization letter** — signed and dated by someone who **can** authorize it. Your "get
  out of jail" document. Carry it.
- **Timing** — when to start/stop; what to do if you break something or find a live intrusion.

<!--
"No scope, no test" from Day 1 is now a checklist. The authorization letter is not optional and
not an email thread — it's a signed document naming the systems and the dates.
If a real pentest finds evidence of an ACTUAL breach, you stop and escalate immediately — that's
in the ROE.
-->

---

## Do it now — write a mock ROE

For our engagement: **"Northwind Traders"** (= the class lab).

In pairs, fill `assets/roe-template.md`:

- **In scope:** the lab target host(s) and their web apps
- **Out of scope:** everything else — the campus network, the internet, each other's laptops
- **Allowed / forbidden:** (forbidden: DoS, destroying data, touching out-of-scope)
- **Hours:** class time only
- **Contacts:** the instructor

<!--
10 min. This is a real deliverable pentesters write. Emphasise the OUT-of-scope list — that's
what keeps you legal. "Each other's laptops" being explicitly out of scope matters.
CUT to 5 min if behind: just fill in-scope / out-of-scope / forbidden.
-->

---

## The reporting mindset

**The report is the product.** An untested finding you can't reproduce is worthless.

Every finding =

- **Title** + **severity / risk** (likelihood × impact — Day 10)
- **Evidence** — screenshots, the exact request/response, output
- **Steps to reproduce** — so the engineer can see it themselves
- **Impact** — what an attacker gains
- **Remediation** — how to fix it

Two readers: the **exec** (what's the risk, what do I fix first) and the **engineer** (how).

<!--
Start the report on day one, not the night before it's due. The Engagement Journal (next slide)
IS the running draft.
A finding without reproduction steps gets dismissed as "works on my machine".
-->

---

## The Engagement Journal

One running document, **one section per phase**. You fill it **as you work** — commands you
ran, what you found, screenshots, timestamps.

By Day 15 it *is* your report.

Set it up now: `week3/engagement-journal.md` (template in `assets/`).

<!--
This mirrors the Northwind Traders "Engagement Journal" model. Non-negotiable habit: if you
did it and it's not in the journal, it didn't happen. Timestamp everything (matters for the
blue team's timeline later — Day 19).
-->

---

## Blue team's view — same steps, other lens

Defenders model the *same* process:

- **Cyber Kill Chain** (Lockheed Martin): recon → weaponize → deliver → exploit → install →
  C2 → actions on objectives.
- **MITRE ATT&CK**: a big catalogue of **tactics** (the attacker's goal at each step) and
  **techniques** (how they do it), built from real incidents.

**Every phase you run is a detection opportunity for them.** Recon shows up in logs; a scan is
loud; exploitation leaves traces. (Day 19.)

<!--
The point: offense and defense are the same map read from opposite ends. ATT&CK technique IDs
(T1566 phishing, T1046 network scanning...) are how SOC teams and pentesters talk to each other.
CUT to 3 min: "defenders have their own name for this process — the kill chain and MITRE
ATT&CK — and every step you take, they can potentially see."
-->

---

## Do it now — connect to the lab  *(the gate)*

1. Start your **Kali** (your VM, or log in to the **shared class Kali**).
2. Confirm you can reach the lab: `ping <LAB_HOST>` and open `http://<LAB_HOST>:8080` in a browser.
3. Run your Day 9 scanner: `python3 scanner.py <LAB_HOST>` — you should see open ports.
4. **Take a VM snapshot** now (so you can always roll back).
5. Note the target details in your Engagement Journal (Phase 1 section).

<!--
18 min — THE GATE. Everyone must finish this. Checklist in assets/lab-connect-checklist.md.
Stragglers: put them on the shared Kali for today, sort their own VM in office hours.
Nobody starts Day 13 without lab access.
If ICMP is blocked, `curl -I http://<LAB_HOST>:8080` or the scanner is the reachability test.
-->

---

## Today's attack / defence / artifact

- **Attack (process):** scope → recon → scan → exploit → post-exploit → report. Every time.
- **Defence:** the same map as the kill chain / ATT&CK — every attacker phase is something a
  defender can detect.
- **Artifact:** your **mock ROE** + the **Engagement Journal** (Phase 1 filled), in the repo.

---

## Homework

1. Finish the **mock ROE** (`week3/roe.md`) — complete every field. Commit it.
2. Confirm lab access from home if possible; if not, note what's blocking it (we fix it Day 13).
3. In your Engagement Journal, write the **Phase 1** section: scope, authorization (the mock
   ROE), target host(s), and your testing goal in one sentence.
4. Add `scope`, `ROE`, `rules of engagement`, `authorization letter`, `kill chain`,
   `MITRE ATT&CK`, `engagement journal` to your glossary.

<!--
Due start of Day 13.
-->

---

<!-- _class: lead -->

## Recap

1. **Offense is a process:** scope → recon → scan → exploit → post-exploit → report. Learn it once.
2. **Phase 1 is a document** — scope, ROE, signed authorization. No scope, no test.
3. **The report is the product**, and the Engagement Journal is its running draft — fill it as you go.

<!--
Say the three lines. Tomorrow: Phase 2 and the start of Phase 3 — reconnaissance and scanning.
You map the target from the outside, then knock on every door with Nmap.
-->
