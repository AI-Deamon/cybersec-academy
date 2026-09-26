# Week 1 Assignment — "The Website Story" (Portfolio Piece #1)
**Module 1 · culminates Days 1-4 · due end of Week 1**
**Type:** Guided (Week 1 of the 4-week difficulty progression)
**Status:** 🧊 **PRODUCTION READY v1.1 — FROZEN** (per ADD §16 Freeze Rule; do not refine without post-teaching evidence)
**Standard:** Academy Design Document v1.2 — Weekly Portfolio Assignments (ADD §12)

> This is the template/standard for all weekly assignments. Weeks 2-4 follow the same six-part shape (Scenario · Objectives · Tasks · Deliverables · Rubric · Reflection) with rising independence.

---

## Scenario
You are a new security analyst. Your manager asks two questions: *"When I type `example.com` in my browser and press Enter, (1) what actually happens — and (2) is it safe?"* Write a clear explanation a non-technical colleague could follow, prove you can observe it safely on your own machine, and answer **both** of the manager's questions.

## Objectives
1. Connect the layers learned in Week 1 into one coherent story (ethics → bits → programs → network → the rules).
2. Demonstrate safe, authorized use of system and network tools.
3. Identify where this everyday page-load could be attacked, and name a defense for each — the week's "attack + defend" payoff.
4. Produce a portfolio artifact showing both understanding and hands-on skill.

## Day-by-day coverage map
This assignment is designed to integrate **all four Week-1 lecture days** (ADD §12). Every day appears in both the written story and the hands-on tasks:

| Day | Concept | Where it appears in this assignment |
|-----|---------|-------------------------------------|
| **Day 1** | Ethics/authorization + bits & bytes | Story layers *Ethics* & *Bits*; Reflection Q3 (ethics) |
| **Day 2** | How programs run — process, CPU/RAM/OS | Story layer *Programs*; **Task 2** (browser PID + memory) |
| **Day 3** | Network — packets, IP/MAC/port, the 3 failures | Story layer *Network* + the "is it safe?" synthesis; **Task 3** (first request / DNS) |
| **Day 4** | TCP/UDP, DNS, the 7-step page load, TLS | Story spine (the 7 steps) + layer *Rules*; **Task 3** (HTTPS / port 443) |

## Tasks (guided)
1. **The Story (written, ~400–500 words):** Explain opening `example.com` by walking the **7-step page-load signature diagram** from Day 4 (`diagrams/page-load-signature.md`) as your spine — the same 7 steps you drafted for Day 4 homework. As you walk the steps, weave in every Week-1 layer, then finish by answering the manager's second question, *"is it safe?"*
   - **Ethics (Day 1)** — you only load a site you're authorized to test; state the "no permission = don't" rule.
   - **Bits/Bytes (Day 1)** — the page, the request, and the reply are all just bytes.
   - **How Programs Run (Day 2)** — the browser is a *process* using CPU/RAM, asking the OS to do the work (a user-space program requesting network/disk from the kernel).
   - **Network (Day 3)** — the request is chopped into *packets* addressed by IP/MAC/port and forwarded hop-by-hop (the postal system). Name the three things that can go wrong on the wire: **eavesdropping, MITM, DoS**.
   - **The rules — TCP/DNS/TLS (Day 4)** — DNS turns the name into an IP; a TCP three-way handshake opens the connection to **port 443**; the HTTP request/response rides inside a **TLS-encrypted envelope** (contents hidden, destination IP still visible to routers).
   - **"Is it safe?" (synthesis, 3–4 sentences)** — name at least **two** realistic places this page-load could be attacked and the defense for each, e.g.: unencrypted HTTP → eavesdropping (defense: HTTPS/TLS) · DNS spoofing → you reach an impostor (defense: verify the name / certificate) · an open port → extra attack surface.
2. **System observation (Day 2):** Open Task Manager (Windows) or `htop` (Linux/macOS). Screenshot the browser process; note its **PID** and **memory** usage.
3. **Network observation (required — DevTools) (Days 3–4):** Open browser DevTools → Network, load `example.com`, and identify (a) the **first request / DNS** resolution and (b) the **HTTPS / port 443** connection. Screenshot with those lines highlighted. *(This uses tools you already have — no Wireshark install required.)*
4. **Network observation (optional bonus — Wireshark):** *Only if you want to explore.* Install Wireshark, capture while loading `example.com`, and find the **DNS query/response** and the **SYN/SYN-ACK/ACK** to port 443. Screenshot. This is optional — it gives you a head start before Day 13.
5. **Reflection:** Answer the three questions below.

## Deliverables
> **Scaffold:** use **`week01-worksheet.md`** to plan and draft every part below — when the worksheet is filled, this assignment is done.

- A 1-page written "Website Story" (Task 1) that **follows the 7 steps** and **ends with the short "is it safe?" section**.
- A screenshot set (browser process + DevTools Network showing DNS/HTTPS) with brief captions. (Optional Wireshark bonus screenshots welcome.)
- Combined into a single PDF/portfolio entry titled **"Week 1 — The Website Story."**

## Rubric
| Criterion | Excellent (3) | Adequate (2) | Needs work (1) |
|-----------|---------------|--------------|----------------|
| Layer integration | All 4 days present; story follows the 7 steps in order | Missing one day/layer or out of order | Cannot connect the layers |
| Safe tool use | Authorized, scoped; ethics documented | Minor scope ambiguity | Tested an unauthorized target |
| System observation (Day 2) | Correct PID/memory, labeled | Partial | Missing |
| Network observation (Days 3–4) | Found DNS + HTTPS 443, highlighted | Found one | Neither |
| Security awareness — "is it safe?" | Names ≥2 realistic attack points, each with a defense | Names one | None |
| Communication | Clear, readable by a non-technical person | Some jargon | Unclear |

**Portfolio bar:** a submission scoring **15-18** is portfolio-quality and may be shared (anonymized) as a sample.

## Reflection questions
1. Which layer or step was hardest to explain, and why?
2. What surprised you when you watched the requests load in DevTools (or in Wireshark, if you tried the optional bonus)?
3. How did the Day 1 ethics rule shape what you chose to test — and which of the "is it safe?" risks would worry you most in real life?

---

## Session 5 In-Class Structure (the reinforcement WORKSHOP)
Follow the official 5-session cadence (ADD §12). Run Day 5 as a **workshop**, not a lecture:
1. **Review (20–30 min):** recap the week's key ideas (ethics → bits → programs → network → TCP/DNS) — what each concept was and why it matters. Use the **signature page-load diagram** as the spine; point out that the assignment's Story follows those same 7 steps.
2. **Q&A (20 min):** students ask questions; clear up any confusion *before* the weekend.
3. **Assignment briefing (15 min):** walk the scenario, objectives, deliverables, and rubric — including the new **"is it safe?"** security synthesis. Show the portfolio PDF example so students know the bar. Note the optional Wireshark bonus.
4. **Guided in-class work (remaining time):** students start the assignment with you available to help. They leave class with a clear plan and no confusion about what's expected.
- **Weekend:** no classes (Sat/Sun). Students **complete** the assignment at their own pace.
- **Submission:** due **before Day 6** (next Monday's Session 1). Week 2 starts fresh.

## Progression marker
- **Week 1 = Guided (this document).** Week 2 = Less guided · Week 3 = Scenario-based · Week 4 = Mini-capstone. Full specs in the Course Design Document, "Weekly Assessment Structure."

---

## Revision note
*(Assessments have no separate `version-history.md`; changes are logged here.)*
- **v1.1 (2026-07-20) — owner-directed coverage-completeness pass (freeze-permitted alignment).** Made the four-day integration explicit (added the **Day-by-day coverage map**), anchored Task 1 on the **7-step page-load signature diagram** (Day 4 / course signature), and added the scenario's own **"is it safe?"** security synthesis (Day 3 failures + Day 4 break points) as a task step, an objective, and a rubric row — so the deliverable now answers **both** manager questions. Also added a student-fillable companion, **`week01-worksheet.md`** (scaffolds every task 1:1; adds structure, not new requirements). Six-part shape and Guided difficulty unchanged; no new tools introduced; portfolio bar rescaled to 15-18 for the added rubric row.
- **v1.0** — Initial frozen template (ADD §12 / §16); Wireshark deferred to Day 13 (DevTools-primary, Wireshark optional bonus).
