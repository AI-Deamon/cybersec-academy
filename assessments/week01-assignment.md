# Week 1 Assignment — "The Website Story" (Portfolio Piece #1)
**Module 1 · culminates Days 1-4 · due end of Week 1**
**Type:** Guided (Week 1 of the 4-week difficulty progression)
**Status:** 🧊 **PRODUCTION READY v1.0 — FROZEN** (per ADD §16 Freeze Rule; do not refine without post-teaching evidence)
**Standard:** Academy Design Document v1.2 — Weekly Portfolio Assignments (ADD §12)

> This is the template/standard for all weekly assignments. Weeks 2-4 follow the same six-part shape (Scenario · Objectives · Tasks · Deliverables · Rubric · Reflection) with rising independence.

---

## Scenario
You are a new security analyst. Your manager asks: *"When I type `example.com` in my browser and press Enter, what actually happens — and is it safe?"* Write a clear explanation a non-technical colleague could follow, and prove you can observe it safely on your own machine.

## Objectives
1. Connect the layers learned in Week 1 into one coherent story (ethics → bits → programs → network).
2. Demonstrate safe, authorized use of system and network tools.
3. Produce a portfolio artifact showing both understanding and hands-on skill.

## Tasks (guided)
1. **The Story (written, ~400 words):** Explain opening `example.com` using all five layers, in order:
   - **Ethics** — why you only test systems you're authorized to (Day 1).
   - **Bits/Bytes** — the page and its data are just bytes (Day 1).
   - **How Programs Run** — the browser is a process using CPU/RAM/OS (Day 2).
   - **Network** — packets, IP/MAC/port, and DNS resolve the name (Day 3).
   - **TCP** — the reliable connection is established before data flows (Day 4).
2. **System observation:** Open Task Manager (Windows) or `htop` (Linux/macOS). Screenshot the browser process; note its **PID** and **memory** usage.
3. **Network observation (required — DevTools):** Open browser DevTools → Network, load `example.com`, and identify (a) the **first request / DNS** resolution and (b) the **HTTPS / port 443** connection. Screenshot with those lines highlighted. *(This uses tools you already have — no Wireshark install required.)*
4. **Network observation (optional bonus — Wireshark):** *Only if you want to explore.* Install Wireshark, capture while loading `example.com`, and find the **DNS query/response** and the **SYN/SYN-ACK/ACK** to port 443. Screenshot. This is optional — it gives you a head start before Day 13.
5. **Reflection:** Answer the three questions below.

## Deliverables
- A 1-page written "Website Story" (Task 1).
- A screenshot set (browser process + DevTools Network showing DNS/HTTPS) with brief captions. (Optional Wireshark bonus screenshots welcome.)
- Combined into a single PDF/portfolio entry titled **"Week 1 — The Website Story."**

## Rubric
| Criterion | Excellent (3) | Adequate (2) | Needs work (1) |
|-----------|---------------|--------------|----------------|
| Layer integration | Explains all 5 layers coherently, in order | Missing one layer or out of order | Cannot connect layers |
| Safe tool use | Authorized, scoped; ethics documented | Minor scope ambiguity | Tested an unauthorized target |
| System observation | Correct PID/memory, labeled | Partial | Missing |
| Network observation | Found DNS + HTTPS 443, highlighted | Found one | Neither |
| Communication | Clear, readable by non-technical person | Some jargon | Unclear |

**Portfolio bar:** a submission scoring 12-15 is portfolio-quality and may be shared (anonymized) as a sample.

## Reflection questions
1. Which layer was hardest to explain, and why?
2. What surprised you when you watched the traffic in Wireshark?
3. How did the Day 1 ethics rule shape what you chose to test?

---

## Session 5 In-Class Structure (the reinforcement WORKSHOP)
Follow the official 5-session cadence (ADD §12). Run Day 5 as a **workshop**, not a lecture:
1. **Review (20–30 min):** recap the week's key ideas (ethics → bits → programs → network → TCP/DNS) — what each concept was and why it matters. Use the **signature page-load diagram** as the spine.
2. **Q&A (20 min):** students ask questions; clear up any confusion *before* the weekend.
3. **Assignment briefing (15 min):** walk the scenario, objectives, deliverables, and rubric. Show the portfolio PDF example so students know the bar. Note the optional Wireshark bonus.
4. **Guided in-class work (remaining time):** students start the assignment with you available to help. They leave class with a clear plan and no confusion about what's expected.
- **Weekend:** no classes (Sat/Sun). Students **complete** the assignment at their own pace.
- **Submission:** due **before Day 6** (next Monday's Session 1). Week 2 starts fresh.

## Progression marker
- **Week 1 = Guided (this document).** Week 2 = Less guided · Week 3 = Scenario-based · Week 4 = Mini-capstone. Full specs in the Course Design Document, "Weekly Assessment Structure."
