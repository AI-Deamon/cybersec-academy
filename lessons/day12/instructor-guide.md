# Day 12 — Instructor Guide (PRIVATE — source of truth)
**Course:** Practical Cyber Security: From First Principles
**Module 3 — Thinking Like a Pro · Day 12 of 20 · Week 3, Session 2**
**Standard:** Academy Design Document v1.2 (Complete) · Phase 3 lesson-doc standard
**Version:** 1.0

---

## 1. Lesson Overview
- **Title:** The Safe Range — Lab Setup & Testing Methodology
- **Duration:** 90 minutes
- **Type:** Foundation — *how* to test legally and cleanly (the rules before the tools)
- **Position in journey:** Day 12 of 20, second day of Week 3. Day 11 = the mental model (CIA/risk/untrusted input). Today = the **safe environment + methodology** to *exercise* that model hands-on. Days 13-15 are the tools (Wireshark/Nmap, vuln scanning, Burp). Day 16+ are attacks/defense. The lab you build today is reused all next week.
- **Companion files:** student-guide.md · lab-guide.md · quiz.md · references.md · rubric.md · version-history.md

## 2. Teaching Guide (Four Context Questions)
**Why am I learning this?**
Because the difference between a security professional and a criminal is **authorization and isolation**. You must know how to stand up a *safe* place to practice — one you own or are explicitly allowed to test — so that every later lab (scanning, intercepting, exploiting) happens where it can do no harm. Methodology (rules + repeatable process) is what makes the work trustworthy and legal.

**How does this connect to the previous lessons?**
- Day 1 ethics: "only test what you're allowed to." Today we make that concrete: a **range** (a lab you own) is the allowed place.
- Day 11 CIA/risk: a lab is where you can *safely* probe Availability (scanning) and Confidentiality (intercepting) without real impact — because it's isolated and authorized.
- The untrusted-input habit (Day 11) applies to your *own* tooling too: only run code/scripts you understand, in the range.

**Where will I use this in cybersecurity?**
Penetration testing, red/blue team, lab-based training, CTFs, secure-dev test environments, IR rehearsal. Every hands-on security job starts by defining the authorized scope.

**What problem will I be able to solve after today's class?**
Stand up a safe, isolated practice lab (a local VM or isolated network you control) and follow a repeatable test methodology (define scope → get authorization → isolate → test → document → restore) so that all future labs are legal, contained, and reproducible.

**Concept 1 — Authorization & isolation (first principles, the legal core):**
- **Authorization:** you may only test systems you *own* or have *written permission* to test. No exceptions. Testing a system you don't have rights to is a crime (Computer Misuse Act / CFAA-type laws worldwide), regardless of intent.
- **Isolation:** the lab must be *separated* from production and the real internet so a mistake can't escape. A local VM (VirtualBox/Vagging) or an offline lab network is isolated by design.
- Together: authorization says "you may"; isolation says "if something goes wrong, it stays here."

**Concept 2 — The range (your safe playground):**
A **range** = a practice environment you control: vulnerable-by-design VMs (e.g., a purposely-vulnerable target) on an isolated network, plus your attacker machine. You build it once, reuse it for Days 13-15 (and later). The OS signature diagram still applies: your attacker box is just another computer running processes; the target is another. Same rules.

**Concept 3 — The testing methodology (repeatable process):**
A simple, professional loop:
1. **Define scope** — what's in/out (IPs, apps, rules of engagement).
2. **Get authorization** — written permission (even for your own lab, the habit matters).
3. **Isolate** — keep it off production/internet.
4. **Recon** — what's running? (Day 13 Nmap).
5. **Test** — within scope, carefully.
6. **Document** — what you did, what you found (evidence).
7. **Restore** — return the lab to a clean state.
This is the backbone of every pro engagement; students learn the shape now, fill it with tools later.

**Concept 4 — Rules of engagement & evidence (the professional habit):**
- Stay *in* scope. If something unexpected appears, stop and re-confirm authorization.
- Capture evidence (screenshots, command output) — you'll need it for the report and to prove you stayed legal.
- Never exfiltrate, never deface, never pivot outside the range.
- "Authorized, isolated, documented, in-scope" = the four guardrails.

**Concept 5 — Tool caution (concept-before-tool):**
We are *setting up* today, not wielding. Wireshark/Nmap/Burp arrive Days 13-15. The methodology you learn today is what makes those tools safe to use. A tool without methodology is just amplified recklessness.

**Concept 6 — Security bridge:**
- A safe range is itself a **defense** lesson: it models how orgs should isolate sensitive systems (network segmentation = the same isolation idea).
- The methodology mirrors **incident response** later (define → contain → evidence → restore). Good testing and good defending share a spine.

## 2b. Topic Connections & Examples (the "why it links" layer)
**Connection A — Ethics made operational:** Day 1 said "only test what's allowed." Today that becomes *build the allowed place* (range) + *prove you stayed in it* (documentation). The abstract rule gets a concrete home.

**Connection B — Forward links:**
- → **Day 13 (Wireshark/Nmap):** first tools used *inside* the range you build today.
- → **Day 14 (Vuln Scanning):** scan the range for weaknesses (the "V" in risk).
- → **Day 15 (Burp + Secure Coding):** intercept traffic *to your own target* in the range.
- → **Day 19 (IR):** the document/restore steps mirror IR handling.
- → **Day 16-18:** attacks practiced *only* in the range.

**Connection C — Backward link:** Day 11 CIA — scanning probes Availability; intercepting observes Confidentiality; doing it in an isolated range keeps real Impact at zero. The range is where you can *safely* exercise the Day 11 model.

**Concrete Examples:**
- *Authorization:* testing your own VM = fine; testing "a friend's website to help them" = NOT fine without written permission. Intent doesn't legalize it.
- *Isolation:* a VM on NAT/host-only networking can't reach the real LAN — a crash or scan stays inside the box.
- *Methodology:* a real pentest report always opens with "Scope & Authorization" — because that's what makes the rest legal.
- *Bridge line (say twice):* "Authorization says you may; isolation says if it breaks, it stays here. Those two words are the whole difference between a pro and a criminal."

## 3. Timing Guide (90 min)
| Segment | Time | Activity |
|---------|------|----------|
| A. Learning Objectives | 3 min | State the 3 goals |
| B. Learning Journey Check | 4 min | "Day 11: how to think. Today: where & how to practice safely." |
| C. Review | 3 min | Recall Day 1 ethics + Day 11 CIA/risk (safe place to exercise) |
| D. Soft-Skills Moment | 12 min | Reading a scope/authorization statement; always ask "am I authorized, and is this isolated?" |
| E. New Concepts | 30 min | authorization/isolation, the range, 7-step methodology, RoE/evidence, tool caution |
| F. Diagram & Real-World | 10 min | range topology; methodology loop; "authorized/isolated/documented/in-scope" guardrails |
| G. Live Demo / Lab | 20 min | stand up the safe lab (local VM / isolated network) — no attacks |
| H. Quiz / Assignment | 8 min | Exit quiz + preview Day 13 |
| **Total** | **90** | |

## 4. Analogies
**Use the ONE unified metaphor where natural, plus one new simple picture for the range:**
- Range = a **locked training gym you own**: you can swing bats as hard as you like (test freely) because the gym is separate from the street (isolated) and it's yours (authorized). The street (production/internet) is off-limits.
- Methodology loop = a **pre-flight checklist** a pilot runs before every flight — same steps, every time, so nothing is forgotten and it's reproducible.
- (The Restaurant metaphor still applies to the machines themselves: each VM is a Computer with its Manager/OS; same diagram.)

## 5. Common Misconceptions
- *"It's okay if I'm just learning / meant no harm."* Harmless intent is not a legal defense — authorization is required. The range removes the temptation entirely.
- *"I'll just test a real site to see if it's vulnerable."* That's unauthorized access — a crime. Use your range.
- *"Virtual machines are hard to set up."* A ready-made lab image (or a single VM) is quick; we keep it minimal on Day 12.
- *"Methodology is bureaucracy."* It's what makes results trustworthy and legal — and what lets you repeat a test or hand it to a teammate.
- *"Isolation doesn't matter for learning."* It's exactly when learning that mistakes happen; isolation contains them.

## 6. Demo Script
**Demo 1 — Authorization in one line (5 min):** show a one-paragraph "Scope & Authorization" statement for the class lab (target IPs, allowed actions, dates). "This paper is what makes everything we do legal."
**Demo 2 — Build the range (10 min):** on the instructor machine, show launching a local vulnerable VM on host-only networking; confirm the attacker box can reach it but it has no route to the real internet. "Authorized (ours) + isolated (host-only) = safe."
**Demo 3 — Methodology walk-through (5 min):** trace the 7 steps on the whiteboard with the range as the example. Emphasize step 6 (document) and 7 (restore).

## 7. Lab Solution (answers instructors should see)
- Task 1: started/identified their safe lab (local VM or isolated network) they own or are authorized to use.
- Task 2: wrote a one-line scope statement (what they may test, where) — the authorization habit.
- Task 3: confirmed isolation (e.g., host-only/NAT, no production reach) — or described how they'd isolate.
- Concept Q: stated authorization + isolation are the difference between pro and criminal; methodology = repeatable, documented, in-scope testing.

## 8. FAQ
- **Q: Do I need a powerful computer for a VM?** A lightweight Linux VM (1-2 GB RAM) is enough for Days 13-15. Many labs also offer browser-based ranges — ask the instructor.
- **Q: Can I use a cloud free-tier instead?** Only with explicit permission and proper isolation; a local VM is simpler and safer for learning. (Cloud misconfig is a later topic, Day 18.)
- **Q: What if I don't have a vulnerable target?** We use purposely-vulnerable images in the range; never attack real systems. The instructor provides the target.
- **Q: Is documentation really needed for practice?** Yes — it builds the report-writing habit and proves you stayed legal/in-scope. It's a skill, not red tape.

## 9. Examples Bank (reusable across cohorts)
- Range = locked training gym you own (authorized + isolated).
- Methodology = pre-flight checklist (repeatable, reproducible).
- Authorization + isolation = the whole difference between pro and criminal.
- Scope statement opens every real pentest report.
- Bridge line: "Authorized says you may; isolated says if it breaks, it stays here."

> **Assessment:** see rubric.md (separate file, per the 7-file standard).
