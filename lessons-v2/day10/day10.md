---
marp: true
theme: dark-monospace
paginate: true
title: "Day 10 — Security Thinking"
footer: "Practical Cyber Security (v2) · Week 2 · Day 10"
---

<!-- _class: lead -->

# Security thinking
## Day 10 — The lens for everything that comes next

**Week 2 · Understanding the operating system · + Week 2 assignment brief**

<!--
RUN SHEET (~84 min). This is a CONCEPTS day — the design's "cap theory ~20 min" bends here,
so the mitigation is: every concept slide is its bullets and nothing more, the "rank" DO
breaks it up, and the 18-min threat-model exercise is the real centre. Don't lecture.
00:00 Journey check + hook (attack this app)                   4
00:04 The vocabulary, precisely                                7
00:11 Risk = likelihood x impact                               5
00:16 DO: rank 4 findings on the grid                          5
00:21 Threat actors & motivation                               4
00:25 Attack surface & trust boundaries                        5
00:30 The defender's principles (name the 5, move on)          4
00:34 Threat modelling — the method (4 Qs + STRIDE)            6
00:40 DO: threat-model an app together                        18
00:58 Wrap + artifact                                          3
01:01 WEEK 2 ASSIGNMENT BRIEF                                  17
01:18 Recap                                                    3
CUT FIRST IF SHORT: the "rank 4 findings" DO (do 2); the threat-actors slide to the table only.
NEVER CUT: threat/vuln/risk/exploit definitions; the untrusted-input question; the threat-model
exercise; the assignment brief.
ANALOGY (kitchen): threat modelling = a health-and-safety walkthrough of the kitchen — what's
valuable, who'd want to harm it, where are the ways in, what's the cheapest control at each.
-->

---

## Where we are

- **Weeks 1–2:** the machine, the network, the web, crypto, Linux, Windows, scripting.
- **Today:** the *thinking* that turns "I can operate a system" into "I can predict what an
  attacker will do to it." **This lens is the rest of the course.**
- **Next week:** we start using it — the penetration testing lifecycle.

<!--
Journey Check. Say it plainly: today is less hands-on, more "how to think". But it's the day
that makes Weeks 3-4 make sense.
-->

---

## Hook — attack this

A college **result portal**: students log in, view marks, download a PDF.

**60 seconds with your neighbour: name three ways someone could attack it.**

<!--
Take 4-5 answers. You'll get: guess passwords, see someone else's marks by changing the URL,
fake a login page, take it down before results day, SQL injection, insider changes a grade.
"You just did threat modelling. Today we make it systematic."
-->

---

## The vocabulary — say these precisely

| Term | Means |
|---|---|
| **Asset** | something worth protecting (data, a service, a reputation) |
| **Vulnerability** | a weakness — a bug, a misconfig, an untrained user |
| **Threat** | a possible bad event that could exploit a vulnerability |
| **Threat actor** | *who* would do it (and why) |
| **Exploit** | the actual technique/code that uses a vulnerability |
| **Risk** | the *chance* of a threat landing × the *damage* if it does |

<!--
The distinction that matters: a vulnerability with no threat that can reach it, or no asset
behind it, is not meaningful risk. And a tiny vulnerability on a critical asset can be top
priority. Risk is the thing you actually manage — not the raw bug count.
-->

---

## Risk = likelihood × impact

You **cannot fix everything.** So you rank.

```
            LOW impact        HIGH impact
HIGH  |   fix soon-ish    |   FIX NOW        |
prob  |                   |                  |
------+-------------------+------------------+
LOW   |   accept / log    |   plan a fix     |
prob  |                   |   (don't ignore) |
```

**Trap:** "we have 400 vulnerabilities" is not the useful number. *"We have 3 that are
high-likelihood and high-impact"* is.

<!--
This is the Day 10 trap, spelled out. Vuln count != risk. Where a finding sits on this grid
decides whether you drop everything or write it in a backlog.
Day 14 (vulnerability assessment) is this grid applied to scanner output.
-->

---

## Do it now — rank these

Place each on the grid (high/low likelihood × high/low impact):

1. The admin password is `admin123`, and the login page is on the internet.
2. A rarely-used internal tool logs verbosely, including some usernames.
3. The database backup is world-readable — on a server only staff can reach.
4. The result PDF filenames are sequential: `/pdf/1001`, `/pdf/1002`, ...

<!--
5 min. Rough answers: 1 = HIGH/HIGH (fix now). 2 = LOW/LOW (log it). 3 = LOW-likelihood but
HIGH-impact (plan a fix; depends how trusted "staff" are). 4 = HIGH/HIGH if marks are
sensitive (trivial to enumerate). Argue #3 and #4 — that's the point.
-->

---

## Threat actors — who, and why

| Actor | Motivation | Typical target |
|---|---|---|
| **Script kiddie** | curiosity, bragging | whatever's easy and exposed |
| **Cybercrime** | money — ransomware, fraud, data resale | anyone who'll pay / has sellable data |
| **Hacktivist** | a message | organisations they oppose |
| **Nation-state** | espionage, sabotage, influence | governments, infra, big tech, supply chains |
| **Insider** | grievance, money, coercion | their own employer (they're already inside) |

"**Who would target *this*, and why?**" changes what you defend first.

<!--
A student result portal: mostly cybercrime (creds resale) and insiders (grade changes) and
kiddies. Not nation-state. That focuses effort.
CUT to 3 min if short — the point is "match defences to realistic actors, not movie hackers".
-->

---

## Attack surface & trust boundaries

- **Attack surface** = every point an attacker can poke: inputs, forms, URLs, ports, APIs,
  file uploads, emails to staff, the front door. **Smaller is safer.**
- **Trust boundary** = a line where data moves from *less trusted* to *more trusted* — browser
  → server, user input → database, the internet → your network.

> **The question, every time:** *where does data from outside cross into somewhere powerful?*
> That's where you validate, sanitise, and check permissions.

<!--
This is THE recurring question of the whole course — the "untrusted input" lens. Every
injection (Day 16), every overflow (Day 2), every SSRF is "untrusted data reached something
powerful without being checked at the boundary".
-->

---

## The defender's principles

- **Defence in depth** — layers, so one failure isn't game over.
- **Least privilege** — every user/process/service gets the *minimum* it needs (Days 7–8).
- **Assume breach** — plan to *detect and respond*, not only to prevent (Week 4).
- **Minimise attack surface** — turn off what you don't use (Day 3 ports, Day 7 SUID).
- **Fail secure** — when something breaks, it should break *closed*, not *open*.

<!--
Each of these has already shown up: least privilege (Linux/Windows), close unused ports
(networking), assume breach (why we do IR). Today we name them as a set.
-->

---

## Threat modelling — the method

**Four questions** (do them for any system):

1. **What are we building?** — draw it: components + data flows + trust boundaries.
2. **What can go wrong?** — walk each part. Checklist: **STRIDE**
   - **S**poofing (identity) · **T**ampering (integrity) · **R**epudiation (denial of action)
   - **I**nfo disclosure (confidentiality) · **D**enial of service (availability) · **E**levation of privilege
3. **What do we do about it?** — one control per real threat. Controls are
   **preventive** (stop it), **detective** (spot it), or **corrective** (recover) — aim to
   have all three, because prevention fails.
4. **Did we do a good job?** — review.

<!--
STRIDE maps to CIA + two extras. It's a "what can go wrong" prompt so you don't miss a
category. Keep it lightweight — we're not doing a 40-page document.
Control types: also "mitigate / transfer / accept / avoid" as the risk-treatment choices —
name them if asked; "accept" is a valid documented decision for low risk.
-->

---

## Do it now — threat-model an app (together, 18 min)

Pick one: the **result portal**, a **food-delivery app**, or a **UPI payment app**.

On the board, as a class:

1. **Draw it** — user → app → database (+ any third parties). Mark the **trust boundaries**.
2. Pick **3 components / flows**. For each, name **one STRIDE threat**.
3. Give each threat **one control**.

This is your **artifact** and the seed of the weekend assignment.

<!--
18 min. You drive the drawing; students call out threats. Push for concrete: not "hacking" but
"the login form doesn't rate-limit, so an attacker sprays passwords" -> control: lockout + MFA.
Everyone writes the finished model into their repo as day10/threat-model.md.
-->

---

## Today's attack / defence / artifact

- **Attack:** an attacker does exactly this exercise on *your* system — finds the asset, the
  actor, the boundary that isn't checked.
- **Defence:** do it *first*, and to your own things. Rank by risk. Layer your controls.
- **Artifact:** the **one-page threat model** you just built — `day10/threat-model.md`.

---

<!-- _class: lead -->

# Week 2 — Weekend Assignment brief

*(full spec + checklist in your student pack)*

---

## The assignment — 4 parts

- **A — Integrate:** on your Linux VM — **threat-model it in half a page** (asset, likely
  actor, entry points), then **harden it**: create a non-root user, **find and fix 3 weak
  settings**, and write a **script** (Bash or Python — Day 9) that flags weak settings
  (world-writable files, unexpected SUID, secrets that are readable). Show before/after.
- **B — R&D stretch:** *pick one* — research **one Linux privilege-escalation technique** not
  covered in class (how it works + the fix, ~5 sentences), **or** pick **3 Windows LOLBins**
  (what each does, why defenders can't just block them).
- **C — Hands-on evidence:** the script + its output; `ls -l` before/after on the fixed files;
  `id` for the new user.
- **D — Reflection:** 3–4 sentences.

**One PDF, before Monday.**

<!--
Walk each part ~3 min. Part A is the whole week (Days 6-9) in one task. Part B is the stretch.
Emphasise: the SCRIPT is the point of Part A — it's Day 9 applied. Test only your own VM.
-->

---

<!-- _class: lead -->

## Recap

1. **Risk = likelihood × impact.** Not vulnerability count. Rank, then act.
2. **The question:** where does data from outside cross into somewhere powerful? Check it there.
3. **Threat-model first** — four questions, STRIDE as the checklist — and do it to your own things.

<!--
Say the three lines. That's Week 2 done. Monday: Week 3 — the penetration testing lifecycle.
You stop reasoning about attacks and start (safely, in the lab) doing them.
-->
