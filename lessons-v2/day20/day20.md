---
marp: true
theme: dark-monospace
paginate: true
title: "Day 20 — Careers, Specialization, and the Capstone"
footer: "Practical Cyber Security (v2) · Week 4 · Day 20"
---

<!-- _class: lead -->

# Which door?
## Day 20 — Careers, specialization, your roadmap — and the capstone

**Week 4 · Applying it, and choosing a direction**

<!--
RUN SHEET (~85 min). Light on new content — reflection, choosing, the capstone brief.
00:00 Journey check — the whole arc + look at your repo        5
00:05 The map of the field (Red / Blue / wings)                6
00:11 Red team roles — the actual day                          8
00:19 Blue team roles — the actual day                         8
00:27 The wings                                                6
00:33 DO: skills self-assessment                               8
00:41 The Indian market — the honest version                   8
00:49 Certs — the ladder, and what they're worth               6
00:55 DO: "which door and why" + next 3 steps + pitches       10
01:05 Finalise the portfolio repo                              6
01:11 CAPSTONE BRIEF                                           10
01:21 Final recap — the course in 3 lines                      4
CUT FIRST IF SHORT: the wings slide to 3 min; pitches to 2 volunteers.
NEVER CUT: the self-assessment DO, "which door + 3 steps" DO, the portfolio finalisation, the
capstone brief.
ANALOGY (kitchen): you've now trained at every station — the line (offense), the pass and the
security office (defense), front-of-house and the books (GRC), supplier relations (cloud), the
new equipment (AI). Which station do you want to run? Your repo is your reference from the head chef.
-->

---

## 20 days ago → today

- **Day 1:** "what is a bit?"
- **Today:** you've built a scanner, run the pentest lifecycle, exploited web apps, escalated
  privileges, prompt-injected an LLM, and reconstructed an intrusion from logs.

**Open your repo.** That list of artifacts *is* the picture of the field. Now: which door?

<!--
Journey Check - the final one. Have them literally scroll their repo: scanner.py, the
engagement journal, web-vulns.md, attack-chain.md, ai-attacks.md, timeline.md, ir-runbook.md.
"You didn't learn ABOUT security. You did it. That's the difference on a CV."
-->

---

## The map of the field

```
      BUILD / BREAK                DEFEND / RESPOND
   ┌──────────────────┐        ┌──────────────────┐
   │  RED             │        │  BLUE            │
   │  pentest, red    │        │  SOC, IR/DFIR,   │
   │  team, AppSec,   │  <-->  │  detection eng,  │
   │  bug bounty,     │        │  threat intel,   │
   │  exploit dev     │        │  security eng    │
   └──────────────────┘        └──────────────────┘
        THE WINGS:  GRC · cloud security · AI security · architecture · product security
```

Not a hierarchy — **different temperaments.** Most careers move between them over time.

<!--
Purple team = red + blue working together. "Full stack" security people exist. Nobody is
locked in by their first job.
-->

---

## Red team — what the day actually looks like

| Role | The day | Fits you if... |
|---|---|---|
| **Penetration tester** | scoped engagements, then **a lot of report writing** | you like puzzles + can write clearly |
| **Red teamer** | long, stealthy ops; testing whether Blue notices | patient, methodical, senior |
| **AppSec engineer** | code review, threat modelling, working *with* developers | you like code and people |
| **Bug bounty hunter** | self-employed, feast-or-famine, pick your targets | disciplined, self-motivated, OK with uncertainty |
| **Exploit dev / vuln researcher** | deep, slow, niche — reverse engineering, fuzzing | you love going *very* deep on one thing |

<!--
The surprise for students: pentesting is ~40% writing. The report is the product (Day 12).
AppSec is the fastest-growing and most dev-adjacent - good for CS students.
-->

---

## Blue team — what the day actually looks like

| Role | The day | Fits you if... |
|---|---|---|
| **SOC analyst (L1→L3)** | triage alerts, investigate, escalate — **the biggest entry door** (L1 often shift work) | calm under repetition; want a foot in the door |
| **Incident responder / DFIR** | called in when it's bad; forensics; high pressure, high impact | thrive in a crisis, love the puzzle of "what happened" |
| **Detection engineer** | write & tune the rules — coding + attacker knowledge | you like building; Red curiosity + Blue goals |
| **Threat intel analyst** | research adversaries; write reports briefings act on | strong reading + writing; connect dots |
| **Security engineer** | build the defensive infrastructure (often best-paid) | dev/ops skills + security |

<!--
SOC L1 is where most people start in India - high volume of openings, gets you experience.
"Detection engineer" is the sweet spot for someone who enjoyed BOTH the Red days and Day 19.
-->

---

## The wings

- **GRC / security analyst** — risk, audits, frameworks (ISO 27001, SOC 2), policy. Less
  hands-on, lots of communication. **Stable, in demand, often undervalued by students.**
- **Cloud security engineer** — IAM, config, infrastructure-as-code scanning (Day 17). **Hot.**
- **AI / ML security** — securing models and LLM apps; red-teaming AI (Day 18). New, growing.
- **Security architect** — designs the whole defensive picture. Senior.
- **Product security** — secures *your company's* product (the AppSec of a product team).

<!--
Tell them plainly: GRC is a real, well-paid, less-gatekept path that suits people who are
organised and communicate well but don't love the terminal. It's not "lesser".
CUT to 3 min if behind.
-->

---

## Do it now — skills self-assessment

Rate yourself 1–5 on `assets/skills-self-assessment.md`. Sample rows:

- read a Linux permission string and a CVSS vector
- write a ~20-line Python tool from scratch
- run the pentest lifecycle end to end and write the report
- find + prove + fix a web vuln (SQLi / XSS / IDOR)
- build an incident timeline from raw logs
- explain prompt injection and its mitigations

**Where you scored highest is a signal about your door — not a verdict.**

<!--
8 min. The clusters map to doors: scripting+lifecycle+web = Red-lean; logs+timeline+IR =
Blue-lean; "explain the risk to a non-technical person" = GRC-lean. It's a nudge, not destiny.
-->

---

## The Indian market — the honest version

- **SOC analyst** = the highest-volume entry point. MSSPs and the GCCs of global firms in
  Bengaluru, Hyderabad, Pune, Chennai, Gurugram, Noida.
- **VAPT / pentest consultancies** — many, quality varies; good for learning fast.
- **Product security** at Indian product companies and GCCs.
- **Bug bounty** — a few make a living; treat it as a skill-builder and a portfolio, not a plan.
- **The catch-22:** "2 years experience for an entry role." **Your GitHub portfolio + a cert +
  BE/BTech breaks it** — it's proof you can do the work.
- **Internships** are the other way in — apply wide, early.

<!--
Be real: freshers face a lot of "junior" roles asking for experience. The students who get
past it have (1) a visible portfolio, (2) one relevant cert, (3) they can talk through a
project in the interview. This course gave them (1). Certs and interviews are on them.
-->

---

## Certs — the ladder, and what they're worth

**Certs get you past the HR filter. The portfolio gets you through the interview.**

| Path | Entry | Mid | The one that opens doors |
|---|---|---|---|
| **Blue** | CompTIA **Security+** | Blue Team Level 1 (**BTL1**) | CySA+ / practical SOC labs |
| **Red** | **eJPT** (cheap, entry) | **PNPT** / **CPTS** (report-based) | **OSCP** (hard, expensive, respected) |
| **Cloud** | the provider's associate security cert | | |

**Don't collect certs. Pick one that matches your door, go deep, and keep the portfolio growing.**
Free / cheap: TryHackMe & HTB paths, vendor free tiers, the OWASP materials.

<!--
CISSP is a management cert and needs ~5 years experience - not a fresher cert. Security+ is
the realistic first one for most. For Red, TryHackMe/HTB + eJPT is a cheap strong start.
-->

---

## Do it now — which door, and the next 3 steps

Write it down (`assets/roadmap-template.md`):

1. **My door:** _____ (or "deciding between ___ and ___")
2. **Why:** _____ (tie it to what you actually enjoyed these 20 days)
3. **Next 3 concrete steps:** a specific **cert**, a specific **learning path**, one **project**.

**Volunteers — 60-second pitch to the room.**

<!--
10 min incl. 3-4 pitches. "Deciding between two" is a completely fine answer for now. The
point is a CONCRETE next step, not a life plan. Push back on vague ("get better at hacking")
-> "which HTB path, by when?"
-->

---

## Finalise the portfolio repo

Turn the course repo into something you'd send a recruiter:

- **README** — a short intro + a list of what's inside, with links:
  the scanner, the engagement journal / pentest reports, the threat model, the web-vulns
  find/prove/fix, the attack chain, the AI-attacks writeup, the IR runbook + timeline.
- pin it · make it public (or ready to share) · a "what I learned" paragraph · your roadmap.

**This is your evidence. It's worth more than the certificate for this course.**

<!--
6 min - get them to at least draft the README now. Template in assets/. A clean portfolio
repo with 8 real artifacts genuinely stands out for a fresher.
-->

---

<!-- _class: lead -->

# The capstone

*(full spec + checklist in your student pack)*

---

## The capstone — 4 parts

- **A — Cross-domain engagement:** on the capstone target, run the lifecycle and deliver
  **one clean web finding** *and* **one infra/service finding** — each find → prove → fix.
  (~4 pages, your report format from Week 3.)
- **B — Incident writeup:** from the provided incident logs — the **timeline + IOCs**, a
  **5-step response**, and the **one root-cause fix**.
- **C — Career roadmap:** "which door and why" (1 page) + a **6-month plan** (a cert, a
  learning path, 2 projects, 1 community) + your **finalised portfolio README**.
- **D — Final reflection:** the four "so what" questions + a self-assessment against the
  course objectives.

**Submit:** one PDF + your repo link. This is the biggest single piece — start this weekend.

<!--
Walk each part ~2 min. A = Weeks 3-4 combined. B = Day 19. C = today. D = the whole course.
It's marked against the Definition of Success - "can you do the basics, and do you know your
direction". Everyone who did the weekly assignments has 80% of this already.
-->

---

<!-- _class: lead -->

## The whole course, in three lines

1. **Everything is untrusted input** until it's checked at the boundary — that's most of offense and defense.
2. **Least privilege + assume breach** — the two ideas behind almost every control.
3. **You learn security by doing it.** You have a repo full of proof. Keep adding to it.

<!--
The final recap. Then: "you came in 20 days ago asking 'what is a bit'. You leave knowing what
the field is, what you can do, and which door you're walking toward. That was the whole point.
Go build."
-->
