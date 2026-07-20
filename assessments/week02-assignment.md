# Week 2 Assignment — "Before the Laptop Leaves the Building" (Portfolio Piece #2)
**Module 2 · culminates Days 6-9 · due end of Week 2**
**Type:** Less guided (Week 2 of the 4-week difficulty progression)
**Status:** 🔶 IN PROGRESS — Week 2 (approved with revisions per owner educator review; not yet frozen — Week 2 not taught)
**Standard:** Academy Design Document — Weekly Portfolio Assignments (ADD §12) + Career Connection standard (ADD §17)

> This follows the same six-part shape as Week 1 (`assessments/week01-assignment.md`): **Scenario · Objectives · Tasks · Deliverables · Rubric · Reflection** — but with **rising independence**. Week 1 held your hand (heavy hints). Week 2 gives the *goal and success criteria*; **you choose the commands and approach**. That is the planned difficulty progression (Guided → Less guided → Scenario → Mini-capstone).

> **Signature diagram reuse:** this assignment uses the Week 2 OS signature diagram (`diagrams/os-signature.md`) — User → Shell → OS → CPU/RAM/Disk — across all three lenses you learned: Linux (Bash + `rwx`), Windows (PowerShell + ACL), and Python (a Process the OS checks). Same picture, three angles, one portfolio piece.

---

## Scenario
"A new employee has joined your company. Before they receive their laptop, your manager asks you to **verify the system follows least-privilege principles** and report back in plain language. Show that you understand *who controls the machine* (the OS), demonstrate a **safe permission change** on a system you control, and write a **small read-only Python script** that lists files and shows which ones you can read. Explain it all so a non-technical manager understands why it matters."

This is a real onboarding/hardening task any system administrator or junior security analyst performs — concrete, not abstract.

## Objectives
1. Connect the Week 2 story into one coherent explanation: OS concept (unified metaphor) → Linux permissions / Windows ACLs → Python automation.
2. Demonstrate a **safe, correct permission change** on **at least one** platform you control (Linux or Windows); **bonus** for demonstrating both.
3. Write a **read-only Python script** that lists files in a folder and prints whether each is readable.
4. Produce a single portfolio PDF a non-technical manager could follow.
5. Reflect on what you learned and **where this is used professionally** (Career Connection).

## Tasks (Less guided — you choose the commands)
> Goal and success criteria are given; the exact commands are yours to pick (you learned them on Days 6-9). Screenshots required as evidence.
> **Platform rule:** Complete **at least one** of Task 2 (Linux) or Task 3 (Windows) using your own machine/lab. **Bonus:** demonstrate both.

**Task 1 — "Who controls this machine?" explainer (written, ~1 page).**
Using the **one unified Restaurant→Computer metaphor** (Restaurant=Computer, Manager=OS, Chef=CPU, Kitchen counter=RAM, Pantry=Storage, Employees=Processes, Walkie-talkie=Shell, Key cabinet=Permissions), explain: what an OS is, why permissions matter, and how a Python script is just "you, automated" (a Process with your badge). Plain language — imagine the manager reading it.

**Task 2 — Linux: a safe permission change (hands-on + screenshot).** *(one platform required)*
Create a file you own. Set a *sensible* permission with `chmod` (e.g., `644` for a data file or `755` for a script) and **explain why `777` is avoided**. Screenshot `ls -l` showing the result. Show the OS signature diagram (Linux lens) and label where your change sits.

**Task 3 — Windows: read & explain an ACL (hands-on + screenshot).** *(one platform required)*
Using **read-only** PowerShell (`Get-Acl` on a file you own), show one **principal→rights** entry and explain it in the key-cabinet terms from Day 8. If you have no Windows machine, use the lab VM and state that. Screenshot the `Get-Acl` output. (No permission changes — read only, per Day 8 safety.)

**Task 4 — Python: list files and show what's readable (hands-on + screenshot).**
Write a **read-only, standard-library-only** Python script that lists every file in a folder and prints **whether each one is readable** (e.g., attempt `open(f, 'r')` and report success/failure, or read the permission bits on Linux). Run it on your own folder. Screenshot the output. This is the automation payoff of Day 9 — *observing*, not changing. (Later, in secure coding/automation, you can extend this into full permission auditing.)

**Task 5 — Reflection (the four "So What" questions):**
- **What did I learn?** How does the OS enforce "who may do what," and how do Linux, Windows, and Python all rely on that same check?
- **What can I now do?** (e.g., set a safe permission, read an ACL, write a read-only script that observes the filesystem).
- **Where is this used professionally?** See the **Career Connection** section — which role fits this task?
- **What am I building toward?** How does this connect to secure coding (Day 15), incident response (Day 19), and the capstone?
- *(Least-privilege prompt)* If you had to harden this laptop for real, what is the *one* change you'd make first, and why?

## Deliverables
A single PDF/portfolio entry titled **"Week 2 — Before the Laptop Leaves the Building"**, containing:
- The Task 1 explainer (plain-language, metaphor-based).
- Screenshot set: **at least one** platform's evidence (Linux `ls -l` after `chmod` **or** Windows `Get-Acl`); **bonus** = both. Plus the Python output (Task 4) — each with a one-line caption.
- The Task 5 reflection (four "So What" questions answered).
- The **Career Connection** section.
Assembled into one document (the same portfolio format as Week 1, so the collection grows week by week).

## Rubric
| Criterion | Excellent (3) | Adequate (2) | Needs work (1) |
|-----------|---------------|--------------|----------------|
| **OS concept (Task 1)** | Clear unified-metaphor explainer; script=Process understood | Explainer present, metaphor thin | Confused |
| **Platform task (Task 2/3 — at least one required)** | Sensible `chmod` OR correct `Get-Acl` read; explains it | Done with help | Wrong perm / unsafe |
| **Bonus: both platforms** | Demonstrates + explains both Linux and Windows | — | — |
| **Python script (Task 4)** | Read-only stdlib; lists files + states readability correctly | Runs, minor logic gap | Unsafe / off-goal |
| **Reflection (Task 5)** | All four "So What" answered; least-privilege insight | Partial | Missing |
| **Career Connection** | Names a fitting role + explains why | Names a role | Missing |
| **Portfolio PDF** | Clean, captioned, manager-readable | Acceptable | Sloppy |

**Scoring guidance:** core (OS + 1 platform + Python + reflection + career + PDF) 18–21 strong; 12–17 on track; ≤11 revisit. Bonus points awarded for demonstrating both platforms.
**Definition-of-Success check (ADD §13):** can the student explain the OS in their own words, perform the tasks without step-by-step hand-holding, connect least privilege across the week, and name a career that performs this task?

## Reflection (course-level)
- This is the **second** of four weekly portfolio pieces. Week 3 will be *scenario-based* (a realistic brief, you choose tools); Week 4 a *mini-capstone* (open-ended, integrates the course).
- The OS signature diagram (`diagrams/os-signature.md`) appeared in Days 6, 7, 8, 9 and this assignment — if it feels familiar, that's the point.
- **Career alignment (new standard, ADD §17):** from Week 2 onward every weekly assignment ends with a Career Connection section, and every lesson/lab surfaces the four "So What" questions, so students connect classroom work to a cybersecurity career.

---

## Career Connection
**Which cybersecurity role would perform a task like this?**
Pick the one(s) that fit and explain in 2–3 sentences why:
- **System Administrator** — owns workstation configuration, permissions, and onboarding hardening.
- **IT Support** — prepares and verifies employee machines before handover.
- **SOC Analyst** — reviews configurations for risky permission exposure.
- **Blue Team Engineer** — hardens security baselines across the fleet.
- **DevSecOps Engineer** — automates permission/configuration checks inside delivery pipelines.

You're not just learning OS permissions — you're practicing the *exact* verification a SysAdmin or IT Support does on day one of a new hire's onboarding. That is a real, employable task, and it's what this assignment simulates.

---

## Session 5 In-Class Structure (the reinforcement WORKSHOP)
Follow the official 5-session cadence (ADD §12). Run Day 10 as a **workshop**, not a lecture:
1. **Review (20–30 min):** recap Week 2's key ideas — OS = Manager, the key cabinet (Linux `rwx` / Windows ACL), Users/groups/AD, and "a script is you, automated." Use the OS signature diagram and show all three lenses on one slide.
2. **Q&A (20 min):** students ask questions — especially around `chmod` vs ACL, and why `777`/"Everyone: Full Control" are the same mistake.
3. **Assignment briefing (15 min):** walk the scenario, objectives, the tasks (stressing **"complete at least one platform; bonus for both"**), deliverables, rubric, **and the new Career Connection section**. Show the Week 1 portfolio PDF as the format example so students know the bar. Stress: **Less guided — you choose the commands.**
4. **Guided in-class work (remaining time):** students start Tasks 1-2 with the instructor available. The assignment is then **completed over the weekend (no classes Sat/Sun)** and **submitted before Day 11** (next Monday); Week 3 (security thinking) starts fresh.

> Day 10 is explicitly a *workshop*, not a lecture — same cadence as Day 5.
