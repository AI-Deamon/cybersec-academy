# Week 4 Assignment — "Secure the Startup" (Portfolio Piece #4 + Final)
**Module 4 · culminates Days 16-19 · due end of Week 4 (final)**
**Type:** Mini-capstone (Week 4 of the 4-week difficulty progression) — open-ended, integrates the whole course
**Status:** ✅ APPROVED — Week 4 (owner-approved finale; not yet frozen — Week 4 not taught)
**Approved by owner:** Day 20 capstone workshop validated as the correct finale — it *validates* the prior 19 days rather than introducing new material (owner review, 2026-07-18).
**Standard:** Academy Design Document — Weekly Portfolio Assignments (ADD §12) + Career Connection (ADD §17)

> This follows the same six-part shape as Weeks 1-3: **Scenario · Objectives · Tasks · Deliverables · Rubric · Reflection** — now at the **open-ended** end of the progression:
> - Week 1 = Guided · Week 2 = Less guided · Week 3 = Scenario-based · **Week 4 = Mini-capstone (integrate everything).**
> The course's 4-week arc converges here: **machine (Wk1) → OS (Wk2) → think-like-pro (Wk3) → apply (Wk4).** This is the final portfolio piece — and it becomes the spine of the student's course portfolio.

---

## Scenario
"A small startup has asked you to do a **security review before a funding round**. Their environment — running entirely in your safe range (Day 12) — is a miniature of everything we covered: a **web app** (Juice Shop-style), a **small network**, and a **cloud/container deployment**. Find and fix issues across *all* layers, then present a professional report and defend it for 2 minutes."

This mirrors a real generalist/consultant engagement: scope it, test safely, fix across domains, and communicate risk to non-experts.

## Objectives
1. Apply the **Day 12 methodology** end-to-end on a multi-layer environment in the range.
2. **Find & fix** at least one issue in each of three layers: **web (Day 16), network (Day 17), cloud (Day 18).**
3. Write an **IR walkthrough (Day 19)** for the worst finding — what you'd do if it had been exploited.
4. Produce the **final portfolio piece**: an integrated report + a 2-minute defense.
5. Complete the **Career Roadmap** and the **Final Reflection** (four "So What" + self-assessment vs the Definition of Success, ADD §13).

## Tasks (open-ended — you choose tools/method within the range)
> Goal + success criteria are given; you decide the exact approach using the full toolkit (Days 1-19). Evidence (screenshots/output) required for each fix.
> **Range rule (Day 12):** every action stays on your own range target. No real/external systems.

**Task 1 — Scope & methodology (written, ~½ page).**
Write the Scope & Authorization statement for the startup review: the three environments, what you will test, that it is yours/authorized, and how it is isolated. (Day 12 steps 1-3.)

**Task 2 — Web layer (hands-on + screenshot).**
In the range web app, **find and fix one vulnerability** (e.g., SQLi/XSS — Day 16). Screenshot before/after; state the CIA break + the fix (parameterize/encode).

**Task 3 — Network layer (hands-on + screenshot).**
Use **Nmap** (Day 13) to find an **open/unnecessary port or flat segment**; propose + show a **firewall/segmentation rule** (Day 17) that limits exposure. Screenshot.

**Task 4 — Cloud layer (hands-on + screenshot).**
In the lab container (Day 18), **find and fix one misconfiguration** (open security group / public volume / hardcoded secret); map it to a CIA break + the fix. Screenshot.

**Task 5 — Incident response (written, 1 page).**
Take your worst finding (any layer). Write a 1-page IR walkthrough (Day 19): **Detect → Contain → Eradicate → Recover → Lessons Learned** — naming the tool/layer at each stage and the CIA property protected.

**Task 6 — Career Roadmap (written, 1 page).**
- Choose the specialization that fits you best from what the course covered: **Security Architect, Cloud Security Engineer, AppSec/DevSecOps Engineer, SOC Analyst, Incident Response Analyst, or Platform/SRE Security.**
- In 3-4 sentences: **why** that path, tied to specific lessons/days you enjoyed or excelled at.
- Name **2 next steps** (certification, project, or resource) to start that path.

**Task 7 — Final Reflection (the four "So What" questions):**
- **What did I learn?** The whole arc — from how machines run programs to defending modern cloud systems.
- **What can I now do?** Scope, test safely in the range, find/fix across web+network+cloud, and respond to an incident.
- **Where is this used professionally?** See the **Career Connection** section.
- **What am I building toward?** The specialization in Task 6, and (for builders) the platforms where this all runs.
- *(Self-assessment):* Rate yourself against the **Definition of Success (ADD §13)** — can you explain *why*, not just *what*?

## Deliverables
A single capstone portfolio entry titled **"Week 4 — Secure the Startup"**, containing:
- Task 1 scope statement.
- Screenshot set: web fix (T2) + network rule (T3) + cloud fix (T4), each captioned.
- Task 5 IR walkthrough (1 page).
- Task 6 Career Roadmap (1 page).
- Task 7 Final Reflection (four "So What" + self-assessment).
- The **Career Connection** section.
Assembled as the final piece of the growing portfolio (Weeks 1-3 + this capstone = the complete course collection).

## Rubric
| Criterion | Excellent (3) | Adequate (2) | Needs work (1) |
|-----------|---------------|--------------|----------------|
| **Methodology (T1)** | Clear scope + auth + isolation | Present | Missing |
| **Web fix (T2)** | Found + fixed (SQLi/XSS) + CIA/fix stated | Partial | None |
| **Network fix (T3)** | Found exposure + firewall/segment rule shown | Partial | None |
| **Cloud fix (T4)** | Found misconfig + CIA/fix + screenshot | Partial | None |
| **IR walkthrough (T5)** | Full loop, tool/layer + CIA per stage | Partial | Missing |
| **Career Roadmap (T6)** | Path chosen + why (tied to days) + 2 next steps | Partial | Missing |
| **Final Reflection (T7)** | All four "So What" + honest self-assessment | Partial | Missing |
| **Career Connection** | Names fitting roles + explains why | Names a role | Missing |
| **Portfolio PDF** | Clean, integrated, defensible in 2 min | Acceptable | Sloppy |

**Scoring guidance:** core (T1-T7 + career + PDF) 24–27 strong; 16–23 on track; ≤15 revisit.
**Definition-of-Success check (ADD §13):** can the student integrate web+network+cloud findings into one report, respond to an incident, and explain *why* — not just *what*?

## Reflection (course-level)
- This is the **fourth and final** weekly portfolio piece — and the one that integrates all four weeks. Together, Weeks 1-4 are the student's course portfolio.
- The capstone proves the course's thesis: **mental models first, then tools** — a student who understands *why* can find/fix across any layer, not just run a scanner.
- **Career alignment (ADD §17):** from Week 2 onward every weekly assignment ends with a Career Connection section; the capstone adds the Career Roadmap (choosing a path).

---

## Career Connection
**Which cybersecurity role would perform a task like this capstone?**
Pick the one(s) that fit and explain in 2-3 sentences why:
- **Security Architect** — designs defense across all layers (the capstone's integrated view).
- **Cloud Security Engineer** — owns the cloud-layer findings.
- **AppSec / DevSecOps Engineer** — owns the web + secure-coding fixes.
- **SOC Analyst / Incident Response Analyst** — owns detection + the IR walkthrough.
- **Platform / SRE Security** — owns the hardening + monitoring posture.

You just acted as a **generalist security reviewer** — the exact loop these roles run: scope → test safely → find/fix across layers → respond → report. That range of work, done safely and explained clearly, is what a security career is built on.

---

## Session 5 In-Class Structure (the final reinforcement WORKSHOP)
Follow the official 5-session cadence (ADD §12). Run Day 20 as a **workshop**, not a lecture:
1. **Review (20-30 min):** recap the full arc — W1 machine, W2 OS, W3 think-like-pro (methodology/recon/scan/risk), W4 apply (web/network/cloud/IR). Show how the four weeks build into one mindset.
2. **Q&A (20 min):** questions on any layer; clarify the capstone scope and the Career Roadmap.
3. **Assignment briefing (15 min):** walk the "Secure the Startup" scenario, objectives, the seven tasks (emphasize **open-ended: you choose tools/method**), deliverables, rubric, Career Roadmap, and the **Career Connection** section. Show the Weeks 1-3 portfolio PDFs as the format to extend.
4. **Guided in-class work (remaining time):** students start Tasks 1-2 with the instructor available. The capstone is then **completed over the weekend (no classes Sat/Sun)** and **submitted before the course ends**.

> Day 20 is explicitly a *workshop*, not a lecture — same cadence as Days 5, 10, and 15. It consolidates the entire course into the final portfolio piece.
> **Note:** the "Career Roadmap + Final Reflection" originally listed for Day 20 is delivered here, as the capstone's closing tasks — exactly where it belongs. Day 20 stays a pure consolidation/finale workshop.
