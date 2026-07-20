# Cybersecurity Academy Design Document — Version 1.0 (Approved)

*The master reference (the "constitution") for every course, lesson, and lab in the Academy.*
*Foundational Course: "Practical Cyber Security: From First Principles."*

---

## 1. Target Audience
Beginners with **no prior security background** — students, career-switchers, curious IT newcomers. Basic computer literacy only; every technical layer is taught in-course.

## 2. Prerequisites
- Can use a computer, install software, follow copy-paste terminal commands.
- No networking / OS / scripting / security knowledge required.
- A laptop able to run a local Linux VM / Docker.

## 3. Learning Outcomes (approved wording)
> By the end of the course, students will **understand how modern computer systems work, how attackers think, how common security weaknesses arise, and how to safely analyze and defend systems using industry-standard tools and best practices.**
>
> *By-product:* enough cross-domain exposure to **choose a specialization** with confidence.

## 4. Teaching Philosophy — the "Layer" System
The foundational course is **one continuous story**, peeling a system back layer by layer:
**Computer → Network → OS → Programming → Security Fundamentals → Tools → Offense → Defense → Modern Domains → Capstone → Career Roadmap.**

Core principles:
- **First principles before exploits** — never a vulnerability before the mechanism it abuses.
- **One mental model throughout:** *"Where is the untrusted input, and what does the system do with it?"*
- **Attack + defend, always** — every offensive lesson is paired with its defensive fix.
- **Ethics first, reinforced always** (Day 1; see §5).
- **Soft skills woven in** (see §8).
- **Fixed template per class** (§9) = repeatable, low-load, professional.

### The Four Context Questions (every lesson must answer these)
Before any slide is built, the Teaching Guide answers:
1. **Why am I learning this?**
2. **How does this connect to the previous lesson?**
3. **Where will I use this in cybersecurity?**
4. **What problem will I be able to solve after today's class?**

## 5. Ethics, Legal Boundaries & Responsible Disclosure — Day 1 (not Day 12)
Before any tool is touched, students learn:
- What **ethical hacking** is vs. what is **illegal**.
- Why **authorization** is non-negotiable; the "no permission = don't" rule.
- **Responsible disclosure** and professional responsibility.
- Reinforced in every module via a 2-minute "ethics check" on each offensive topic.

## 6. Course Structure — Four Story Modules (20 days)
**Module 1 — Building the Foundation** (how the machine and the wire work)
| Day | Topic |
|-----|-------|
| 1 | Cyber ethics, authorization & the Academy mental model + what's inside a computer (bits, bytes) |
| 2 | How programs run — CPU, memory, processes, kernel vs user space |
| 3 | What a network is — packets, IP, the "postal system" analogy |
| 4 | TCP/UDP, DNS, how a web page actually loads |
| 5 | HTTP/HTTPS & TLS — request/response, where trust lives |

**Module 2 — Understanding the Operating System**
| Day | Topic |
|-----|-------|
| 6 | What an OS does; Linux vs Windows; the shell |
| 7 | Linux fundamentals — filesystem, permissions, users, CLI |
| 8 | Windows fundamentals — PowerShell/CMD, users, services, registry |
| 9 | Python basics — why scripting matters to security |
| 10 | Bash/Python automation — solve a real security task |

**Module 3 — Thinking Like a Security Professional**
| Day | Topic |
|-----|-------|
| 11 | CIA triad, threats/vulns/risk, the "untrusted input" model |
| 12 | Lab setup & methodology (safe, isolated) |
| 13 | Networking tools — Wireshark, Nmap (recon the layers learned) |
| 14 | Vulnerability scanning — read & triage a scan |
| 15 | WEEK 3 PORTFOLIO ASSIGNMENT (workshop — consolidate D11-14: methodology + recon + scan + triage into a posture review) |

**Module 4 — Applying Cybersecurity in the Real World**
| Day | Topic |
|-----|-------|
| 16 | Web Security Fundamentals — HTTP vulns, OWASP framework (attack + defend) |
| 17 | Network Security Fundamentals — attacks + defenses on the wire |
| 18 | Cloud Security + Secure Coding + Defensive Security |
| 19 | Incident Response + Monitoring + Blue Team basics |
| 20 | WEEK 4 PORTFOLIO ASSIGNMENT (capstone workshop — integrate course; career roadmap + reflection) |

> Offense and defense are folded **into each domain day** (how it works → how it breaks → how to defend), matching the application → infrastructure → cloud → defense → integration flow.

## 7. Tool List (defaults flagged ⚙️)
Docker + local Linux VM · Linux/Windows CLIs · Python 3 · **Wireshark** · **Nmap** · ⚙️ **Nuclei** (vs OpenVAS) · **Burp Community** + DevTools · ⚙️ local **cloud misconfig lab container** (vs real free-tier) · **OWASP Juice Shop**.

## 8. Soft-Skills Slot (10–15 min every class)
Reserved in each session for professional habits:
- Writing clear notes · Reading documentation · Thinking critically · Debugging systematically · Communicating technical findings.
Taught *through* the labs, not as separate lectures.

## 9. Fixed Class-Session Template (the reusable system)
> **A. Learning Objectives** (3–5 measurable: "By the end, you can…")
> **B. Learning Journey Check** — "Yesterday we learned… Today we're here… Tomorrow we'll build on…"
> **C. Review** (recall questions from prior class)
> **D. Soft-Skills Moment** (10–15 min — notes / docs / debugging / communication)
> **E. New Concepts** (first principles + one central analogy)
> **F. Diagram & Real-World Example** (one clear diagram + one breach story)
> **G. Live Demo / Lab** (students replicate; **Defender Fix** step on vuln topics; **Ethics Check** on offensive topics)
> **H. Quiz / Assignment** (3–5 Q + one applied task)
> **I. Reference Resources**

## 10. The Lesson Documentation Standard (Phase 3)
The course content is built in **three separable layers** so it stays reusable across in-person, recorded (YouTube), and LMS delivery:
- **Knowledge** — the subject matter, embedded in both guides.
- **Teaching** — the Instructor Guide (how to teach it; private).
- **Presentation** — the polished deck, authored in **Markdown (Marp)** as the source of truth and *exported to PPTX* in Phase 4/5 *from* the Student Learning Content (via the Presentation Design System + Visual Asset Library).

This separation means: if you later redesign your slides, **you don't rewrite the lesson** — you create a new presentation from the same learning package.

Every day ships as **7 files** (stored under `lessons/dayNN/`), per the Phase 3 spec:
1. **instructor-guide.md** (PRIVATE) — the *teaching* layer. Overview, Four Context Questions, Teaching Guide, Topic Connections & Examples, Timing, Analogies, Misconceptions, Demo Script, Lab Solution, FAQ, Examples Bank.
2. **student-guide.md** — the *student learning content* (narrative). Includes the **PPT Outline** (slide sequence + diagram cues + speaker notes) as the blueprint Phase 4 builds from, plus the Worksheet and Homework.
3. **lab-guide.md** — step-by-step hands-on lab, prerequisites, checkpoint, troubleshooting.
4. **quiz.md** — formative assessment with answer key.
5. **references.md** — reference sheet / further reading.
6. **rubric.md** — instructor-side assessment rubric.
7. **version-history.md** — change log (v1.0, v1.1, … v2.0 after cohorts).

**Student Learning Package (Content)** = the student-facing subset: `student-guide` + `lab-guide` + `quiz` + `references`. Collectively this is the "Student Learning Package" — the content blueprint for the presentation. The PPT is just one *component* of it; Phase 4 turns the PPT Outline inside `student-guide` into a polished deck (authored in Markdown/Marp, exported to PPTX — icons, animations, diagrams, screenshots, branding).

Each lesson also applies, by default: the Four Context Questions (§4), the Learning Journey Check (§9B, "Yesterday/Today/Tomorrow"), the soft-skills slot (§8), and the Topic Connections layer (explicit links backward + forward).

## 11. Learning Journey Map
- **Day 1:** students see the full 20-day roadmap (the four modules visualised).
- **Every class opening:** highlight position — "Yesterday we learned this. Today we're here. Tomorrow we'll build on this."
- Goal: every lesson carries context, which improves retention.

## 12. Assessment Strategy
- **Per class (formative):** quiz or applied assignment (3–5 Q + 1 hands-on task).
- **Per module:** checkpoint lab confirming the layer "sticks."
- **Capstone (Day 20):** applied cross-domain project + **simple final quiz** + **career-roadmap reflection**.
- **No high-stakes memorization exams** — demonstrable skill and self-awareness of fit.

### Weekly Portfolio Assignments (the Day-5-of-each-week standard)
To reinforce learning and build professional samples, **Day 5 of every week is a portfolio assignment, not a lecture.** It integrates the four lecture days of that week into one deliverable students keep.

Every weekly assignment ships with: **Scenario · Objectives · Tasks · Deliverables · Rubric · Reflection questions.** Deliverables are portfolio artifacts (e.g., a written analysis + screenshots compiled into a PDF).

**From Week 2 onward, every weekly assignment also ends with a Career Connection section** (ADD §17) asking which cybersecurity role would perform a task like this — so students connect classroom work to a real career. (Week 1 is exempt: it is frozen as Production Ready v1.0.)

**The 5-session week cadence (official class rhythm):**
The course runs as **four 5-session weeks (Monday–Friday)**. Sessions 1–4 of each week introduce new concepts; **Session 5 is a dedicated reinforcement session** — no new material.
- **Sessions 1–4:** new concepts, labs, quizzes (one day at a time).
- **Session 5 (the reinforcement class):** (1) **Review** the week's key ideas; (2) **Assignment briefing** — explain the scenario, objectives, deliverables, and rubric; (3) **Guided planning time** in class so students start the assignment with support.
- **Weekend (Saturday–Sunday):** no classes; students **complete the assignment** at their own pace.
- **Submission:** due **before the next week's Session 1** (Monday). Each week then starts fresh.

**Difficulty progression across the 4 weeks:**
- **Week 1 — Guided:** step-by-step tasks with heavy hints (e.g., explain how opening a website uses CPU, RAM, OS, DNS, TCP; observe it in Task Manager/`htop` + browser DevTools; Wireshark is an optional bonus).
- **Week 2 — Less guided:** same structure, fewer hints; student chooses commands/approach.
- **Week 3 — Scenario-based:** a realistic brief; student decides tools and method.
- **Week 4 — Mini-capstone:** an open-ended challenge integrating the whole course (the existing Day 20 capstone + career roadmap).

See the Course Design Document for each week's scenario and the `assessments/` folder for the full Week 1 template.

## 13. Definition of Success
The course has succeeded when:
1. Students can **explain concepts in their own words**.
2. Students can **perform the lab without step-by-step instructions**.
3. Students can **troubleshoot** when something doesn't work.
4. Students can **explain both the attack and the defense**.
5. Students leave **excited about a cybersecurity specialization**.

## 14. The Academy Vision & Project Phases
This Design Document is the **standard** for a growing Academy. Every future course reuses §9 (template), §10 (package split), and the same design language, lab format, quiz style, and slide structure.

Planned tracks: Linux for Cybersecurity · Network Security · Web Application Security · Active Directory · Cloud Security · SOC Analyst · Malware Analysis · DevSecOps. Students who finish one course already know *how to learn the next*.

### Phases of the project (6-phase workflow)
1. **Academy Design Document** (the constitution) — ✅ Version 1.3 Approved
2. **Course Design Document** (the 20-day blueprint) — ✅ Approved
3. **Lesson Documentation** — ✅ COMPLETE. For each of the 20 days, the 7-file lesson package: **Instructor Guide** + **Student Learning Content** (student-guide, lab-guide, quiz, references) + **rubric** + **version-history**. Instructor-guide is the single source of truth.
4. **Presentation Design System** — ✅ COMPLETE. `Presentation-Design-Standard-v1.0.md` (typography, color, diagram, code, callout, animation, slide order) + `Visual-Asset-Library-v1.0.md` (reusable signature diagrams, icons, symbols, legends). **No deck is built before these exist.**
5. **Presentation Production** — build decks with **Markdown (Marp) as the source of truth**, rendered to HTML for review and **exported to PPTX** for teaching (one source: version-controllable, diff-able, AI-editable; PPTX is delivery-only). Workflow: (a) build the **Academy Master Template** once; (b) build **Day 1** to validate template + assets; (c) **freeze Template v1.0**; (d) generate the remaining decks day-by-day, reusing the frozen template + the Visual Asset Library. The deck always opens with "Why are we learning this?". Every slide is *derived* from the Student Learning Package, so a redesign regenerates the deck — never rewrites the lesson.
6. **Review & Polish** — full pass across all 20 days + decks; update version histories; refine against the Definition of Success (§13); then deliver and collect cohort feedback for the next iteration.

Benefits of this order: knowledge, teaching, and presentation are separated; content is locked before presentation; decks are Markdown-sourced so they version-control and diff cleanly; PPTX is never hand-edited (regenerated from source); the Visual Asset Library means every diagram is drawn once and reused everywhere; and the same package powers in-person, YouTube, and LMS courses.

## 15. Version & Approval
- **Version:** 1.3
- **Status:** ✅ **Complete** (constitution + cadence locked; approved by owner)
- **Approved by:** Course owner (Bhasker) — [date]
- **Change policy:** future changes versioned (1.1, 1.2…) and recorded here.
- **v1.2** — Official 5-session week cadence (ADD §12 extended): four 5-session weeks (Mon–Fri); Sessions 1–4 = new concepts, Session 5 = reinforcement (Review → Assignment briefing → Guided planning); assignment completed over the weekend, submitted before the next Monday; each week starts fresh.
- **v1.3** — Curriculum-level educator review adopted: (a) **Career Connection** section added to every weekly assignment from Week 2 onward (ADD §12 + new §17); (b) the four "So What" reflection questions (What did I learn? / What can I now do? / Where is this used professionally? / What am I building toward?) adopted as a standard for lessons, assignments, and labs going forward (ADD §17). Design feedback, applied pre-teaching.

## 17. Career Connection & the Four "So What" Questions (added v1.3)
Adopted from owner curriculum-level educator review (design feedback, applied pre-teaching). The Academy now reinforces career alignment and "why" at every layer, so students finish understanding not just *what* they learned but *how it fits a cybersecurity career*.

**Every weekly assignment (Week 2 onward) ends with a Career Connection section** that asks: *Which cybersecurity role would perform a task like this?* with a short list of fitting roles and a prompt for the student to explain their pick. (Week 1 is exempt — frozen as Production Ready v1.0.) This turns each portfolio piece into a tangible career signal (e.g., Week 2 → System Administrator / IT Support / SOC Analyst / Blue Team / DevSecOps).

**The four "So What" questions are the standard reflection/closure frame** for lessons, assignments, and labs going forward:
1. **What did I learn?** (concept, in own words)
2. **What can I now do?** (demonstrable skill)
3. **Where is this used professionally?** (which role / real task)
4. **What am I building toward?** (how it connects to later days / the capstone)

When these four are answered consistently, students understand *why* each topic matters and how the course maps to a career — not just how to complete it.

## 16. Change Governance — The Freeze Rule
To stop endless pre-teaching refinement and actually finish the academy, every artifact has a **status**, and changes are gated by whether students have been taught:

- **Design feedback** (structure, analogy, cadence, clarity) → allowed **before teaching** a unit.
- **Content changes** (facts, labs, quizzes) → allowed **only after teaching**, and **only if students actually struggled** with that part.
- **Major redesigns** → only **after 3–4 student batches** have been taught and reviewed.

**Concretely:**
- ✅ **Week 1 = Production Ready v1.0 (FROZEN).** Do **not** keep improving it on the strength of new ideas. Improve it only after real student feedback shows a specific struggle.
- The same freeze applies per-week as each week is completed: mark it `Production Ready v1.0` and move on.
- This rule is the project's anti-perfectionism guardrail. It keeps momentum while preserving a clear channel for genuine, evidence-based improvement.

> Living principle: *Build → teach → gather evidence → improve.* Not *build → re-build → re-build.*

