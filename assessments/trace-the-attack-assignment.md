# Trace the Attack — Combined Assignment
## TCP/IP Model · Cyber Kill Chain · Malware Profile · Hacksplaining Hands-On

**Status:** 🔶 IN PROGRESS — Tasks 1–4 complete and combined below; Task 5 (Reflection + Career Connection) not yet drafted.
**Type:** standalone assessment — not tied to a `weekNN-assignment.md` slot. TCP/IP coverage ties to the standalone Networking Block mini-course (`decks/networking-block/`); Kill Chain and Malware coverage tie to the *Malwares & Cyber Attacks* deck (`decks/malwares-and-attacks.md`).
**Standard:** follows the same six-part assignment shape as `week01-assignment.md` (Scenario · Objectives · Tasks · Deliverables · Rubric · Reflection).

> This document merges the four standalone task files — `trace-the-attack-task1-tcpip-quiz.md`, `task2-killchain.md`, `task3-malware-profile.md`, `task4-hacksplaining.md` — into one submittable assignment. Each task below keeps its own deliverables and rubric; a combined submission checklist and scoring rollup close out the document. The four source files remain the place to edit any one task individually — re-merge here after editing them.
>
> **This is a student-facing document — it intentionally contains no answer keys.** Task 1's answer key lives separately in `trace-the-attack-task1-ANSWER-KEY.md` (instructor-only); Tasks 2–4 are open-ended research/analysis with no single correct answer, graded by rubric instead.

---

## Scenario

You are a junior SOC analyst. Your team lead hands you one real-world breach and says: *"Show me you understand how this attack actually worked — from the wire up."* You must (a) explain how data moves across a network using the **TCP/IP model**, (b) walk the chosen attack through the **cyber kill chain**, naming a defense that breaks each stage, (c) **profile the malware** the attackers used, and (d) build hands-on familiarity by completing **10 attack lessons on Hacksplaining**, with screenshot evidence. Assemble it into one portfolio document a non-technical manager could follow.

## Objectives

1. Explain the **4 layers of the TCP/IP model** and encapsulation in plain language; trace one request through the stack.
2. Map a **real attack to every stage of the cyber kill chain** and name one defensive control per stage.
3. Classify the major **malware types** by behavior, propagation, goal, and defense.
4. Demonstrate hands-on engagement with **10 distinct attack types** via Hacksplaining, evidenced by screenshots + short write-ups.
5. Produce a single portfolio artifact (adds to the running portfolio set).

> **Important — Tasks 2 and 3 share one breach.** Pick your breach in Task 2 and use that **same breach** for Task 3's malware profile. The assignment is designed to tell one connected story, not four disconnected exercises.

---

## How to Answer This Assignment

1. **Get a copy you can write in.** Either:
   - **Edit the Markdown directly** — open this file (or `trace-the-attack-assignment.md`) in a Markdown-friendly editor (VS Code, Typora, Obsidian, or even Notepad) and type your answers into it, **or**
   - **Copy it into Google Docs / Microsoft Word** — paste the whole document in, then fill in your answers under each heading. Headings and tables paste in roughly correctly; clean up spacing as needed.
2. **Answer in place — don't delete the questions.** Write your answer directly under each question, or inside the blank table cells provided (the `|   |` gaps in each table). Leave the question/prompt text where it is so a grader can follow along.
3. **Keep every task in order** — Task 1 through Task 4, in the sequence they appear in this document, followed by your Task 4 screenshots.
4. **For Task 4's screenshots:** either paste each screenshot directly under its row in the evidence table, or number all 10 to match the table's "Screenshot ref" column and attach them together as a labeled appendix at the end of your document.
5. **Answer key note:** Task 1's answer key is intentionally not in this document (it's private, instructor-only) — just answer the 20 questions as best you can; you'll get feedback separately.

## How to Submit (as a PDF)

1. Once all 4 tasks are filled in, turn your document into a single PDF:
   - **From Google Docs:** File → Download → PDF Document (.pdf)
   - **From Microsoft Word:** File → Save As (or Export) → PDF
   - **From a Markdown file:** open it in a Markdown editor with a preview (VS Code, Typora, Obsidian) and use its "Export to PDF" option, or "Print" → "Save as PDF." A free online Markdown-to-PDF converter works too if you don't have one of these installed.
2. **Name the file** `TraceTheAttack_YourName.pdf` (e.g. `TraceTheAttack_JaneDoe.pdf`).
3. **Check it before you submit:** open the PDF and confirm all 4 tasks are present, every table is actually filled in (no leftover blank placeholder rows), and all 10 Hacksplaining screenshots are visible and legible.
4. **Submit it individually.** This is an individual assignment — each student submits their own PDF, even if you discussed a breach or Hacksplaining lessons with classmates. *(Instructor — fill in the actual submission channel for this course: LMS upload, email address, or shared-drive link; not yet set — see "Still Open" at the end of this document.)*

---

# Task 1 — TCP/IP Knowledge Check

**Type:** Formative quiz (counts toward the *Trace the Attack* assignment)
**Format:** 20 questions — multiple choice, true/false, and short answer
**Coverage:** the TCP/IP model, encapsulation, IP, and TCP/UDP (Networking Block, Days 1–5 + the Deep Dive)
**Time:** ~25 minutes · closed-book
**How to answer:** write the letter (MCQ), "True/False" + one sentence why (T/F), or 1–3 sentences (short answer).

## Section A — The model & encapsulation (Q1–Q6)

**Q1.** The TCP/IP model has four layers. Which list is in the correct order, **top (application) to bottom (wire)**?
A. Application → Internet → Transport → Network Access
B. Application → Transport → Internet → Network Access
C. Transport → Application → Internet → Network Access
D. Network Access → Internet → Transport → Application

**Q2.** As your data moves **down** the stack, each layer wraps it in a header. Match the unit name to the layer that produces it:

| Unit | Layer |
|------|-------|
| Segment | ? |
| Packet | ? |
| Frame | ? |
| Bits | ? |

**Q3.** A login form is 100 bytes of application data. After the TCP header (20 B), the IP header (20 B), and the Ethernet header + FCS (18 B) are added, how many bytes is the **frame** (excluding the preamble)?
A. 100  B. 138  C. 158  D. 1500

**Q4.** True/False: The Ethernet layer can read the destination **port number** to decide where to deliver the frame.

**Q5.** On the **receiving** host, in what order are the headers removed?
A. TCP → IP → Ethernet
B. Ethernet → IP → TCP
C. IP → Ethernet → TCP
D. All at once

**Q6.** Short answer: In one sentence, what does "encapsulation" mean in networking?

---

## Section B — The Internet layer / IP (Q7–Q13)

**Q7.** What is the job of the **IP address** vs the **port number**?
A. IP picks the network cable; port picks the country
B. IP identifies which host; port identifies which process/program on that host
C. IP identifies the program; port identifies the host
D. They are two names for the same thing

**Q8.** Your laptop is `192.168.1.10` with mask `255.255.255.0`. You send traffic to `93.184.216.34`. Where does the frame get sent first?
A. Directly to `93.184.216.34`
B. To the default gateway (`192.168.1.1`)
C. To the DNS server
D. Broadcast to the whole subnet

**Q9.** What does the **TTL** field do, and what happens when it reaches 0?

**Q10.** In the IPv4 header, the **Protocol** field holds the value `6`. What does that tell the receiving host?
A. The payload is a UDP datagram
B. The payload is an ICMP message
C. The payload is a TCP segment
D. The packet has 6 hops left

**Q11.** True/False: As a packet is routed across the internet, its **source and destination IP addresses** normally change at every router hop.

**Q12.** True/False: As a packet is routed across the internet, its **source and destination MAC addresses** change at every hop.

**Q13.** Which protocol does `ping` and `traceroute` rely on, and which layer is it part of?
A. TCP — Transport
B. UDP — Transport
C. ICMP — Internet
D. ARP — Network Access

---

## Section C — The Transport layer / TCP & UDP (Q14–Q20)

**Q14.** Put the TCP three-way handshake in order:
1. `ACK`  2. `SYN`  3. `SYN, ACK`
A. 1 → 2 → 3  B. 2 → 3 → 1  C. 3 → 2 → 1  D. 2 → 1 → 3

**Q15.** In TCP, what is the difference between the **Sequence** number and the **Acknowledgment** number?

**Q16.** A port scanner sends a bare `SYN` to port 22 and gets a `SYN, ACK` back. What does that mean?
A. The port is closed
B. The port is open and a service is listening
C. The host is offline
D. The firewall dropped the packet

**Q17.** Which TCP flag means "abort this connection immediately, something is wrong"?
A. `FIN`  B. `PSH`  C. `RST`  D. `URG`

**Q18.** Why is **DNS** usually carried over **UDP** instead of TCP?
A. DNS needs guaranteed delivery and ordering
B. One small question, one small answer — the overhead of a handshake isn't worth it
C. UDP encrypts the query
D. TCP cannot use port 53

**Q19.** The UDP header is 8 bytes; the TCP header is at least 20 bytes. Name **two** things TCP provides that UDP does not.

**Q20.** True/False: A single computer can hold many TCP conversations open at the same time over one network cable, because each conversation is kept separate by its **port numbers** (specifically the source/destination port pair).

---

**Scoring:** 20 questions, 1 point each. Short-answer (Q2, Q6, Q9, Q15, Q19) — full point for the key idea, half for a partial answer. Pass mark: 14/20.

---

# Task 2 — Break the Chain

**Type:** Research + analysis (counts toward the *Trace the Attack* assignment)
**Model used:** the 6-stage kill chain from the *Malwares & Cyber Attacks* deck —
`Recon → Delivery → Exploit → Install → C2 → Actions`
**Time:** ~3–4 hours · open-book, cited
**Deliverable:** one filled table + two short written sections (below), added to your *Trace the Attack* portfolio document.

> *(For reference: the original Lockheed Martin model has 7 stages — it adds "Weaponization" between Recon and Delivery. This course uses the 6-stage version. If your source describes weaponization, fold it into either Recon or Delivery and say which.)*

## Scenario

You are a junior analyst on a threat-intelligence team. Your lead hands you one real, public breach and says:

> *"Don't just tell me the story — everyone can Google the story. Show me the chain. For every link, tell me one specific thing the victim could have done to break it right there. Then tell me the earliest point they could have stopped the whole thing — and what that would have cost them."*

That write-up is this task.

## Objectives

1. Map a real attack to every stage of the 6-stage kill chain, using cited evidence.
2. For each stage, name **one specific defensive control** that would have broken the chain at that point.
3. Identify which CIA property each stage threatened.
4. Judge — and defend — the **earliest realistic** point the attack could have been stopped.
5. Reason about **defense in depth**: what catches the attack if your first control fails.

## Step 1 — Pick ONE breach

Choose one. Two vetted starting sources are listed for each — you must find and cite **at least one more** of your own.

| Breach | Year | Why it's a good chain to study | Starter sources |
|--------|------|-------------------------------|-----------------|
| **Target** | 2013 | Textbook chain — starts at a third-party HVAC vendor, ends at 40M card numbers. The US Senate report is literally a kill-chain analysis. | US Senate Commerce Committee, *"A 'Kill Chain' Analysis of the 2013 Target Data Breach"* (2014); Krebs on Security, "Target" tag |
| **WannaCry** | 2017 | Worm — no phishing needed. Shows Exploit + self-propagation, and a kill switch as an accidental C2 control. | CISA Alert **AA17-132A**; Wikipedia, "WannaCry ransomware attack" |
| **NotPetya** | 2017 | Supply-chain Delivery (a hijacked Ukrainian tax-software update), then destructive Actions. | Andy Greenberg, *Wired*, "The Untold Story of NotPetya" (2018); CISA Alert **TA17-181A** |
| **SolarWinds (SUNBURST)** | 2020 | Supply-chain Delivery at scale — malicious code signed into a real Orion update. Long, quiet C2. | CISA Emergency Directive **21-01**; Mandiant/FireEye, "Highly Evasive Attacker… SUNBURST Backdoor" |
| **Colonial Pipeline** | 2021 | Simple entry (one leaked VPN password, no MFA), huge Actions impact (fuel shortage). | CISA/FBI Joint Advisory on **DarkSide** ransomware; US congressional testimony of the Colonial Pipeline CEO (2021) |
| **Change Healthcare** | 2024 | Recent. One portal without MFA → ALPHV/BlackCat ransomware → national prescription outage. Already covered as a case study in the course's *Malwares & Cyber Attacks* deck. | US HHS breach reporting; UnitedHealth Group CEO testimony to Congress (2024) |

**Ethics note:** these are publicly documented breaches. You are doing **defensive analysis** of what already happened — the same "attack + defend" thinking used all through the course. Do not attempt any technique described.

## Step 2 — Fill the chain table

One row per stage. Be specific — "better security" is not a control; "enforce MFA on all remote-access accounts" is.

| Stage | What the attacker actually did (with your cited source) | Control that would have broken the chain **here** | CIA property threatened |
|-------|--------------------------------------------------------|--------------------------------------------------|------------------------|
| **1. Recon** — find and study the target | | | |
| **2. Delivery** — get the attack to the target | | | |
| **3. Exploit** — trigger the weakness | | | |
| **4. Install** — gain a persistent foothold | | | |
| **5. C2** — the foothold phones home for instructions | | | |
| **6. Actions** — what the attacker came to do (steal / encrypt / destroy) | | | |

Rules:
- Every "what happened" cell needs an inline source (e.g. *(Senate report, p.4)* or *(CISA AA17-132A)*).
- If a stage is genuinely unknown from public reporting, write **"Not publicly documented"** and say what you'd expect based on the other stages — don't invent details.
- Each control must be a real, named practice (MFA, network segmentation, application allow-listing, egress filtering, EDR, patch SLA, email attachment sandboxing, least privilege, offline backups, etc.).

## Step 3 — Earliest stopping point (4–6 sentences)

Of the six stages, which is the **earliest realistic point** this specific breach could have been stopped? Name the stage and control, then defend the choice — including a brief cost comparison: what would that control have cost the victim to have in place, versus what the breach actually cost them? (Earliest is the primary test; cost is your supporting evidence, not a separate requirement — the earliest stage and the cheapest control won't always be the same thing, and if they aren't here, say so and explain which one wins the trade-off.)

## Step 4 — Defense in depth (4–6 sentences)

Pick the **Delivery or Exploit** stage. Assume your control there *failed* (the phish got clicked, the exploit landed). Walk forward: which of your **later** controls would still have caught the attack, and at which stage would the damage have been contained? This is the argument for layered defense — one control failing shouldn't mean game over.

## Task 2 Deliverables

- The completed 6-row chain table, with ≥3 distinct cited sources total.
- Step 3 — earliest stopping point.
- Step 4 — defense-in-depth walk-forward.
- A short **Sources** list (3+ entries: title, author/publisher, year, URL).

## Task 2 Rubric

| Criterion | Strong (3) | Adequate (2) | Needs work (1) |
|-----------|-----------|--------------|----------------|
| Stage mapping | All 6 stages correctly identified; actions match the sources | 1–2 stages misplaced or thin | Story retold, not mapped to stages |
| Controls | Every stage has a specific, named, realistic control that truly breaks the chain there | Some controls vague or misplaced | Generic ("be more secure") or missing |
| Evidence | ≥3 distinct credible sources; claims cited inline; no invented details | 2 sources or weak citation | Uncited, or fabricated specifics |
| CIA mapping | Correct property per stage, briefly justified | Mostly correct | Missing or wrong |
| Earliest stopping point (Step 3) | Clear choice, defended with cost reasoning | Choice made, weak reasoning | Missing or unsupported |
| Defense in depth (Step 4) | Concrete walk-forward; names which later control catches it and where damage stops | Partial | Missing |

**Pass mark:** 12/18. A submission scoring 16–18 is portfolio-quality.

**Bonus (+2):** Add a 7th row for **"Weaponization"** (the Lockheed stage this course folds away) and explain where it sits in your breach and why the 6-stage model merges it.

---

# Task 3 — Malware Profile

**Type:** Research + analysis (counts toward the *Trace the Attack* assignment)
**Builds on:** the breach you chose in Task 2 — use the **same breach**, do not switch.
**Reference taxonomy:** the malware types and defense framing from the *Malwares & Cyber Attacks* deck (`decks/malwares-and-attacks.md`) — reuse those type names and definitions rather than inventing new ones.
**Time:** ~1.5–2 hours · open-book, cited
**Deliverable:** a short written profile + a comparison table, added to your Trace the Attack portfolio document.

## Scenario

Your lead reads your Task 2 kill-chain table and pushes back:

> *"Good — you told me Delivery dropped something and Install gave the attacker a foothold. But what WAS it? 'Malware' isn't an answer I can act on. Was it a worm that's going to keep spreading on its own? A RAT giving them live hands-on-keyboard access? Fileless, so our antivirus never saw a file to flag? Tell me what we're actually dealing with — and tell me generally, too, so I can brief the team on the categories, not just this one case."*

This task answers both halves: the specific malware in your breach, and the general landscape it belongs to.

## Objectives

1. Correctly identify and classify the malware used in your Task 2 breach.
2. Describe its behavior, propagation, attacker goal, detection method, and defense.
3. Tie the malware back to the specific kill-chain stage(s) it operated in (Install / C2 / Actions).
4. Build a 5-row comparison table across malware **types** — showing you understand the categories, not just the one instance.

## Step 1 — Identify and classify

- Name the specific malware/family used in your Task 2 breach, if publicly attributed (e.g. "ALPHV/BlackCat" for Change Healthcare, "SUNBURST" for SolarWinds, "WannaCry"). If it's **not** publicly attributed, write "not publicly attributed" and classify from the *behavior* described in your sources instead — don't invent a name.
- Classify it against the deck's taxonomy: **Virus · Worm · Trojan (incl. RAT) · Ransomware · Infostealer · Spyware · Rootkit · Fileless · Botnet.**
- Real malware often blends types (e.g. a worm that drops ransomware, like WannaCry). If yours does, name **all** the types that apply and say which was primary.

## Step 2 — Profile it (written, ~200–300 words, cited)

Cover all five, with at least one inline citation:

| Element | What to answer |
|---------|-----------------|
| **Behavior** | What does it actually do once running? |
| **Propagation** | How did it spread or get in? (tie to your Task 2 Delivery/Exploit rows) |
| **Attacker goal** | Data theft, extortion, espionage, disruption, access-for-resale? |
| **Detection** | How would a defender actually spot this — signature, behavioral/EDR, network telemetry? |
| **Defense** | The single most effective control against *this specific* malware |

## Step 3 — Comparison table (5 rows, general — not just your breach)

Fill in the **5 blank rows** below with 5 *different* types from the taxonomy. The top row is a worked example showing the expected level of detail — it does **not** count toward your 5; leave it as-is and add your own 5 below it. Use the deck as your reference, but write each cell in your own words rather than copying its phrasing.

| Type | Needs a host file? | Self-spreads? | Primary goal | Primary defense |
|------|--------------------|-----------------|--------------|-----------------|
| *(worked example — not one of your 5)* Ransomware | No | No (needs a delivery method) | Extort payment via encryption | Offline/air-gapped backups |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |

## Task 3 Deliverables

- Step 1 — classification, with justification.
- Step 2 — profile write-up (200–300 words, ≥1 citation).
- Step 3 — comparison table, 5 filled rows (plus the worked example, unchanged).
- A short **Sources** list (≥2 entries: title, author/publisher, year, URL) — may overlap with Task 2's sources where the same reporting covers both.

## Task 3 Rubric

| Criterion | Strong (3) | Adequate (2) | Needs work (1) |
|-----------|-----------|--------------|----------------|
| Classification | Correct type(s) identified; blended types recognized and justified | Mostly correct, weak justification | Misclassified or unjustified |
| Profile depth | All 5 elements covered accurately, tied to the breach | 1 element thin or missing | Generic / could describe any malware |
| Kill-chain tie-in | Clearly connects the malware to the specific stage(s) from Task 2 | Tie-in present but vague | Missing |
| Comparison table | 5 filled rows (excl. example), accurate, distinct types, own words | 3–4 rows or some inaccuracy | <3 rows or copied definitions |
| Evidence | ≥2 credible cited sources | 1 source | Uncited |

**Pass mark:** 9/15. A submission scoring 13–15 is portfolio-quality.

---

# Task 4 — Hacksplaining Hands-On

**Type:** Hands-on lab (counts toward the *Trace the Attack* assignment)
**Platform:** [hacksplaining.com/lessons](https://www.hacksplaining.com/lessons) — free, browser-based, sandboxed attack simulations
**Time:** ~2–3 hours (10 short lessons, ~10–15 min each)
**Deliverable:** 10 screenshots + a summary table, added to your Trace the Attack portfolio document.

## Scenario

Reading about an attack and watching one actually happen aren't the same thing. Hacksplaining runs each attack in a safe, sandboxed simulation on its own site — no live target, nothing to break. Complete 10 lessons, capture proof you did them, and explain each one in your own words.

**Ethics note:** these are sandboxed lessons on Hacksplaining's own site — no live targets, no scanning tools, no real systems. This is the same "attack + defend" analysis you've done all course: understanding the mechanism in order to defend against it, never to use it outside a sandbox you're authorized to be in.

## Objectives

1. Complete 10 distinct attack-lesson simulations and demonstrate you understand each one.
2. For each, produce evidence (screenshot) and a plain-language explanation of the mechanism.
3. Name the defense Hacksplaining recommends for each attack.

## Step 1 — Complete the 10 lessons

Complete these 10 (fixed list, so everyone's evidence is comparable):

1. SQL Injection
2. Cross-Site Scripting (XSS)
3. Cross-Site Request Forgery (CSRF)
4. Command Execution
5. Clickjacking
6. Session Fixation
7. Directory Traversal
8. Unencrypted Communication
9. Weak Password / Credential Stuffing
10. Privilege Escalation

*If one of these isn't available when you go through the lessons, swap in an alternate (Open Redirect, XXE, Denial of Service, or SSRF) — overwrite that row's **Attack** name in the table below to match what you actually completed.*

For each lesson: read the walkthrough, run the interactive simulation to completion, and **screenshot the completed lesson screen** (the one showing you finished it).

## Step 2 — Fill the evidence table

One row per lesson. Keep each summary to 2–3 sentences: what the attack does, how it works, the fix Hacksplaining recommends.

| # | Attack | Screenshot ref | How it works (2–3 sentences) | Defense |
|---|--------|-----------------|-------------------------------|---------|
| 1 | SQL Injection | | | |
| 2 | Cross-Site Scripting (XSS) | | | |
| 3 | Cross-Site Request Forgery (CSRF) | | | |
| 4 | Command Execution | | | |
| 5 | Clickjacking | | | |
| 6 | Session Fixation | | | |
| 7 | Directory Traversal | | | |
| 8 | Unencrypted Communication | | | |
| 9 | Weak Password / Credential Stuffing | | | |
| 10 | Privilege Escalation | | | |

## Task 4 Deliverables

- 10 screenshots, each numbered/captioned to match the table's "Screenshot ref" column.
- The completed 10-row evidence table above.

## Task 4 Rubric

| Criterion | Strong (3) | Adequate (2) | Needs work (1) |
|-----------|-----------|--------------|----------------|
| Completion | All 10 lessons finished, screenshots clear and match the table | 7–9 done, or a screenshot unclear | <7 done, or screenshots missing |
| Explanation quality | Every summary correctly names the mechanism in the student's own words | Some summaries thin or copied | Summaries wrong or missing |
| Defense accuracy | Every row names the correct, specific Hacksplaining-recommended fix | Some vague ("be more secure") | Missing or incorrect |

**Pass mark:** 6/9. A submission scoring 8–9 is portfolio-quality.

---

## Combined Deliverables (single portfolio document)

Assemble one document/PDF containing, in this order:

1. **Task 1** — completed quiz answers (Q1–Q20).
2. **Task 2** — chain table + Step 3 + Step 4 + Sources list.
3. **Task 3** — classification + profile write-up + comparison table + Sources list.
4. **Task 4** — 10 captioned screenshots + evidence table.
5. *(Task 5 — Reflection + Career Connection: not yet drafted; will be appended here once written.)*

See **"How to Answer This Assignment"** and **"How to Submit (as a PDF)"** at the top of this document for exactly how to fill this in and export it.

## Combined Scoring Rollup

| Task | Max points | Pass mark |
|------|------------|-----------|
| Task 1 — TCP/IP Knowledge Check | 20 | 14 |
| Task 2 — Break the Chain | 18 (+2 bonus) | 12 |
| Task 3 — Malware Profile | 15 | 9 |
| Task 4 — Hacksplaining Hands-On | 9 | 6 |
| **Total (Tasks 1–4)** | **62 (+2 bonus)** | **41** |

Full per-criterion rubrics are inline in each task's section above.

---

## Still Open

- **Task 5** (Reflection + Career Connection) — not yet drafted; add it as a fifth top-level section and extend the rollup table above once it exists.
- **Hacksplaining list** (Task 4) — currently a fixed list of 10, for grading consistency. Student's-choice is the alternative, per the original outline.
- ~~**Submission mode**~~ — **RESOLVED: individual.** Each student submits their own PDF; no group submissions.
- **Due date and submission channel** — the due date relative to the workshop day, and where students actually turn this in (LMS / email / drive link), are not yet set. See the placeholder in "How to Submit (as a PDF)," step 4.
