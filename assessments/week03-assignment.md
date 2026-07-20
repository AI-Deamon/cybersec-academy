# Week 3 Assignment — "The Lab Security Posture Review" (Portfolio Piece #3)
**Module 3 · culminates Days 11-14 · due end of Week 3**
**Type:** Scenario-based (Week 3 of the 4-week difficulty progression)
**Status:** 🔶 IN PROGRESS — Week 3 (standard approved; not yet frozen — Week 3 not taught)
**Standard:** Academy Design Document — Weekly Portfolio Assignments (ADD §12) + Career Connection (ADD §17)

> This follows the same six-part shape as Weeks 1-2: **Scenario · Objectives · Tasks · Deliverables · Rubric · Reflection** — but with **rising independence**. Week 1 = Guided (heavy hints). Week 2 = Less guided (you choose commands). Week 3 = **Scenario-based**: a realistic brief; *you decide the tools and method*. Week 4 = Mini-capstone (open-ended, integrates the course).

> **Module 3 consolidation (signature of this assignment):** it reuses the Day 12 methodology (scope→authorize→isolate→recon→test→document→restore) and the Day 13/14 tools (Wireshark/Nmap + vuln scanner) **inside the range**, all framed by Day 11 CIA/risk. It turns the whole "think like a pro" week into one deliverable — a security posture review.

---

## Scenario
"Your manager asks you to produce a **security posture review of the training lab network** before the next student cohort uses it. The lab is your own safe range (Day 12). Assess it end-to-end using the professional methodology, and deliver a short report: what you tested, what you found, and what to fix first — **ordered by risk**."

This mirrors a real junior-analyst / security-assessment task: scope, test safely, triage, report.

## Objectives
1. Apply the Day 12 **7-step methodology** end-to-end (scope → authorize → isolate → recon → test → document → restore) on your range.
2. **Recon** the target (Day 13) and **scan** for weaknesses (Day 14).
3. **Triage** findings by Day 11 risk (CIA impact + exposure) into a prioritized fix list.
4. Produce a professional **posture-review report** (portfolio PDF).
5. Reflect via the four "So What" questions and complete the **Career Connection**.

## Tasks (Scenario-based — you choose tools/method within the range)
> Goal + success criteria are given; you decide the exact approach using the Week 3 toolkit. Evidence (screenshots/output) required.
> **Range rule (Day 12):** every action stays on your own range target. No real/external systems.

**Task 1 — Scope & authorize (written, ~½ page).**
Write the Scope & Authorization statement for your range assessment: target, what you will test, that it is yours/authorized, and how it is isolated. This is methodology steps 1-3.

**Task 2 — Recon the target (hands-on + screenshot).**
Use **Nmap** (Day 13) on your range target; list the **open ports** and name the services. Screenshot the output.

**Task 3 — Scan for weaknesses (hands-on + screenshot).**
Use the **vulnerability scanner** (Day 14) on the same target; capture the findings. Screenshot.

**Task 4 — Triage by risk (written).**
For your **top 3 findings**, state the **CIA impact** + a rough **risk** (threat × vulnerability × impact), then produce a **Fix-now / Schedule / Accept-note** ordered list. Justify at least one decision where **risk**, not raw severity, drove the order.

**Task 5 — Reflection (the four "So What" questions):**
- **What did I learn?** How the methodology + recon→scan→triage chain fits together.
- **What can I now do?** Assess a small network's posture, safely, in the range.
- **Where is this used professionally?** See the **Career Connection** section.
- **What am I building toward?** Day 16 (web security), Day 19 (IR), the capstone report.
- *(Surprise prompt):* What surprised you about triaging real output vs the textbook?

## Deliverables
A single PDF/portfolio entry titled **"Week 3 — The Lab Security Posture Review"**, containing:
- Task 1 scope statement.
- Screenshot set: Nmap (Task 2) + vuln scan (Task 3), each captioned.
- Task 4 triage (risk-ordered fix list).
- Task 5 reflection (four "So What" answered).
- The **Career Connection** section.
Assembled in the same portfolio format as Weeks 1-2, so the collection grows week by week.

## Rubric
| Criterion | Excellent (3) | Adequate (2) | Needs work (1) |
|-----------|---------------|--------------|----------------|
| **Methodology (Task 1)** | Clear scope + auth + isolation statement | Present | Missing |
| **Recon (Task 2)** | Nmap on range target; correct ports/services named | Minor help | Wrong target |
| **Scan (Task 3)** | Vuln scan in range; findings captured | Minor help | Off-range |
| **Triage (Task 4)** | CIA + risk; risk-ordered; justified reorder | Partial | No triage |
| **Reflection (Task 5)** | All four "So What" + surprise insight | Partial | Missing |
| **Career Connection** | Names a fitting role + explains why | Names a role | Missing |
| **Portfolio PDF** | Clean, report-style, manager-readable | Acceptable | Sloppy |

**Scoring guidance:** core (methodology + recon + scan + triage + reflection + career + PDF) 18–21 strong; 12–17 on track; ≤11 revisit.
**Definition-of-Success check (ADD §13):** can the student run the full methodology unaided, triage by risk, and produce a professional posture report?

## Reflection (course-level)
- This is the **third** of four weekly portfolio pieces. Week 4 will be a *mini-capstone* (open-ended, integrates the whole course).
- This assignment consolidates Module 3 — methodology + recon + scanning + risk into one report. The Day 12 range is what made it safe to do hands-on.
- **Career alignment (ADD §17):** from Week 2 onward every weekly assignment ends with a Career Connection section.

---

## Career Connection
**Which cybersecurity role would perform a task like this?**
Pick the one(s) that fit and explain in 2–3 sentences why:
- **Security Analyst / SOC Analyst** — monitors and assesses posture continuously.
- **Penetration Tester** — runs authorized assessments end-to-end.
- **Vulnerability Management Analyst** — owns scan triage and patch prioritization.
- **GRC / IT Compliance** — reports risk to management in business terms.
- **IT Security Engineer** — remediates the findings.

You just ran the exact loop these roles run weekly: **scope → test → triage → report**. That is real, employable, repeatable work — and it's what this assignment simulates.

---

## Session 5 In-Class Structure (the reinforcement WORKSHOP)
Follow the official 5-session cadence (ADD §12). Run Day 15 as a **workshop**, not a lecture:
1. **Review (20–30 min):** recap Module 3 — CIA/risk (Day 11), methodology + range (Day 12), Wireshark/Nmap (Day 13), vuln scanning/triage (Day 14). Show how they chain into one assessment.
2. **Q&A (20 min):** questions on methodology, triage nuance, tool use in range.
3. **Assignment briefing (15 min):** walk the scenario, objectives, the tasks (emphasize **scenario-based: you choose tools/method**), deliverables, rubric, and the **Career Connection** section. Show the Week 1/2 portfolio PDFs as format examples.
4. **Guided in-class work (remaining time):** students start Tasks 1-2 with the instructor available. The assignment is then **completed over the weekend (no classes Sat/Sun)** and **submitted before Day 16** (next Monday); Week 4 (application) starts fresh.

> Day 15 is explicitly a *workshop*, not a lecture — same cadence as Days 5 and 10.
> **Note on tool placement:** the "Web/app tools — Burp, DevTools, secure-coding intro" originally slated for Day 15 is delivered at the **start of Day 16 (Web Security Fundamentals)**, where interception tools belong with web-app attack + defense. Day 15 stays a pure consolidation workshop.
