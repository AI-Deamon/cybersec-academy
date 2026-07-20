# Day 2 — Student Guide
**Course:** Practical Cyber Security: From First Principles · Module 1 · Day 2 of 20

---

## Why this matters
Every security vulnerability is a bug in **how code runs**. To understand an exploit — like a crash that lets an attacker run their own code — you first need to know what "normal" looks like: the CPU, memory, processes, and the privilege walls the OS builds.

## How today connects (keep this in mind)
- **Yesterday → Today:** Day 1 said everything is bits. Today those *same bits become instructions* the CPU runs. "Hi" was data; a program is data that *does something*.
- **Forward:** Day 4 a page loads (TLS encrypts those bytes in transit) · **Day 5 = Week 1 portfolio assignment** (explain opening a website via CPU/RAM/OS/DNS/TCP) · Day 6–8 (OS manages these processes) · Day 13 (Wireshark shows the bytes on the wire) · Day 16+ (buffer overflows & privilege escalation) · Day 19 (memory forensics).
- **Ethics:** we study crashes and exploits *only inside our own lab* (Day 1 rule).

---

## The big ideas

### 1. The CPU and execution
- The **CPU** is the brain. It fetches one instruction at a time and runs it — billions of times per second.
- **Registers** are tiny, ultra-fast storage *inside* the CPU holding what's being worked on right now (like a chef's hands).
- **RAM (memory)** is the live workspace where a running program and its data sit. **Disk** is long-term storage (the pantry).

> CPU = a chef following a recipe, one step at a time, extremely fast. RAM = the countertop. Disk = the pantry. Registers = the chef's hands.

**The one analogy we reuse all course (the Restaurant):**
| Real thing | Restaurant role |
|-----------|----------------|
| Source code | the recipe the chef wrote |
| Compiler | the translator to machine language |
| Binary / executable | the printed recipe the CPU reads |
| CPU | the chef |
| Registers | the chef's hands |
| RAM | the countertop (workspace) |
| Disk | the pantry (storage) |
| Operating System | the manager who preps the kitchen & loads the recipe |
| Process | a chef in their own kitchen (isolated) |
| Kernel vs user | manager (anywhere) vs line cook (asks for risky moves) |

We'll keep extending this one analogy instead of inventing new ones.

### 2. Processes and isolation
- A **process** is a running program with its **own isolated memory**. Processes normally can't see each other's memory — that isolation stops one buggy app from crashing another.

> A process is like a chef in their own kitchen. Two chefs can't mess with each other's countertops — unless a bug knocks down the wall.

### 3. Kernel vs user space (privilege)
- CPUs enforce **privilege levels**. **Kernel mode** = "god mode" (can touch hardware and other processes). **User mode** = sandboxed (restricted; must ask the kernel for risky things).
- Normal programs run in user mode. **Privilege escalation** = tricking the system into gaining kernel power.

> Kernel = restaurant manager (can go anywhere). User program = line cook (stuck at their station, must ask the manager for risky moves). This boundary is enforced by the CPU hardware itself.

### 4. Why this matters to security
- A **buffer overflow**: a program writes more data than a memory slot can hold; the extra bytes spill into neighboring memory and can overwrite a "return address," hijacking execution to attacker code. **This is how a crash becomes code execution.**
- Every serious bug you'll meet later breaks one of the boundaries above: isolation (processes) or privilege (user→kernel).

> Buffer overflow = too many plates on a counter spilling onto the neighbor's counter and ruining their order.

---

## Worksheet (fill in during class)
1. The CPU runs instructions from ______ (RAM / disk).
2. A running program with its own memory space is called a ______.
3. Kernel mode is like a ______; user mode is like a ______.
4. True/False: Programs run directly from the hard drive. ______
5. A buffer overflow can overwrite a ______ address, hijacking where the program goes next.
6. Privilege escalation means moving from ______ mode to ______ mode.
7. One reason a program crash can become dangerous: ___________________________________________.

## Homework (due Day 3)
1. Draw the path: **source code → compiler → binary (machine code) → OS loads into RAM → CPU executes.** Label each step in one sentence each.
2. Open Task Manager (Windows) or Activity Monitor / `htop` (Mac/Linux). List the three processes using the most memory, with their PID and memory value.
3. In one paragraph: explain, as if to a non-technical friend, how "a crash can let an attacker run their own code" using the plates-spilling analogy.

*(Lab steps are in lab-guide.md. Quiz is in quiz.md. Reference sheet is in references.md.)*

---

## PPT Outline (blueprint for Phase 4)
*Phase 4 turns this into the actual deck. Every deck opens with "Why are we learning this?" Full speaker notes live in instructor-guide.md.*

**Slide 1 — Title:** "Day 2: How Programs Run" · Academy logo · course name.
**Slide 2 — Why are we learning this?** (required): Why it matters (every vuln is a bug in how code runs) · Where used (malware analysis, exploit dev, DFIR) · Which careers (red team, malware analyst, IR, AppSec). Diagram: shield + bug icon + careers map.
**Slide 3 — Learning Journey Check:** "Yesterday: bits. Today: those bits as running code. Tomorrow: networks."
**Slide 4 — The CPU:** fetches/executes one instruction at a time; billions/sec. Diagram: CPU chip with arrows.
**Slide 5 — RAM vs Disk vs Registers:** countertop vs pantry vs hands. Diagram: kitchen analogy.
**Slide 6 — Processes & Isolation:** own memory space; can't see neighbors. Diagram: two separate kitchens.
**Slide 7 — Kernel vs User:** privilege boundary, hardware-enforced. Diagram: manager vs line cook.
**Slide 8 — How a Program Starts (pipeline):** source code → compiler → executable → OS → RAM → CPU. Diagram: the 6-step flow mapped to the Restaurant analogy. "You'll use this mental model all course."
**Slide 9 — Why it matters: Buffer Overflow:** spill-over analogy; crash→code execution. Diagram: memory slots with overflow arrow. Close with: "When programs lose control of their memory, attackers may gain control of the program." (conceptual only — no stack/assembly).
**Slide 9 — Soft-Skills Moment:** read error messages; debug systematically (reproduce → isolate → hypothesis → test).
**Slide 10 — How Today Connects:** data↔code bridge; forward links D5/D6-8/D13/D16/D19. Diagram: central "program in RAM," arrows radiating.
**Slide 11 — Curiosity Question (close):** "If processes can't normally access each other's memory, how does malware steal passwords?" → "We'll answer that later in the course." Leaves anticipation.
**Slide 12 — Lab Preview & Quiz:** view processes, find PID/memory, safely end your own; then the exit quiz.
