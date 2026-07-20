# Day 2 — Instructor Guide (PRIVATE — source of truth)
**Course:** Practical Cyber Security: From First Principles
**Module 1 — Building the Foundation · Day 2 of 20**
**Standard:** Academy Design Document v1.0 (Approved) · Phase 3 lesson-doc standard
**Version:** 1.0

---

## 1. Lesson Overview
- **Title:** How Programs Run
- **Duration:** 90 minutes
- **Type:** Foundation — how the machine executes code (the mechanism attacks abuse)
- **Position in journey:** Day 2 of 20. Yesterday's "data = bits" becomes today's "those bits are instructions the CPU runs." This is the foundation for every exploit and defense later.
- **Companion files:** student-guide.md · lab-guide.md · quiz.md · references.md · rubric.md · version-history.md

## 2. Teaching Guide (Four Context Questions)
**Why am I learning this?**
Because every vulnerability is a bug in *how code executes*. To understand an exploit (like a crash that lets an attacker run their own code), you must first know what "normal execution" looks like: CPU, memory, processes, and privilege levels.

**How does this connect to the previous lesson?**
Day 1 taught that everything is bits/bytes. Today those same bytes become **instructions** the CPU runs. "Hi" was data; a program is data that *does something*. The bit-level idea graduates into machine code.

**Where will I use this in cybersecurity?**
Malware analysis (what a malicious process does), exploit development (buffer overflows, RCE), and DFIR memory forensics (what was in RAM when a machine was hacked). All three assume you know how programs load and run.

**What problem will I be able to solve after today's class?**
Explain, in plain terms, how source code becomes a running process in memory — and how a program crash can turn into arbitrary code execution (the root of many serious bugs).

**Concept 1 — The CPU and execution (first principles):**
- The **CPU** is the brain: it fetches one instruction at a time and executes it, billions of times per second.
- **Registers** are tiny, ultra-fast storage *inside* the CPU holding what's being worked on right now (like the chef's hands).
- **RAM (memory)** is the workspace where the running program and its data live. Disk is long-term storage; RAM is the live countertop.

**The one analogy we reuse all course (the Restaurant):**
- **Source code** = the recipe written by the chef.
- **Compiler** = the translator that converts the recipe into machine language.
- **Binary (executable)** = the printed recipe the CPU can actually read.
- **CPU** = the chef who follows it, one step at a time.
- **RAM** = the countertop (live workspace).
- **Disk** = the pantry (long-term storage).
- **Operating System** = the restaurant manager who prepares the kitchen, loads the recipe onto the countertop, and keeps chefs (processes) in their own stations.

This single analogy carries us through the course — we'll keep adding to it rather than inventing new ones.

**Concept 2 — Processes and isolation:**
- A **process** is a running program with its own isolated slice of memory. Processes generally can't see each other's memory.
- The **OS** creates, schedules, and isolates processes; it also loads the program from disk into RAM before the CPU runs it.

**Concept 3 — Kernel vs user space (privilege):**
- Modern CPUs enforce **privilege levels**. **Kernel mode** = "god mode" (can touch anything: hardware, other processes). **User mode** = sandboxed (restricted; must ask the kernel for risky operations).
- Programs normally run in user mode. **Privilege escalation** = tricking the system into gaining kernel-level power.

**Concept 4 — Why this matters to security (the bridge):**
- A **buffer overflow**: a program writes more data than a buffer (memory slot) can hold; the extra bytes spill into neighboring memory and can overwrite a "return address," hijacking execution to attacker code. This is how a *crash becomes code execution*.
- Bugs break the isolation and privilege boundaries we just described — that's the whole game.

## 2b. Topic Connections & Examples (the "why it links" layer)
**Connection A — Data ↔ Code (the Day-1 bridge):** Yesterday, bits were *data* ("Hi"). Today, the same bits are *instructions* (`01010110` might mean "add two numbers"). A file is just bytes; whether those bytes are a love letter or a program depends on what the CPU is told to do with them. This is why "don't run untrusted code" matters — and why Day 1's ethics rule applies to code, not just data.

**Connection B — Forward links:**
- → **Day 4/5:** those program bytes are sent over the network as a page load (TLS encrypts them in transit, tying back to Day 1 bits); **Day 5** is the Week 1 portfolio assignment that asks you to explain opening a website using CPU, RAM, OS, DNS, and TCP — exactly today's model.
- → **Day 6–8 (OS):** processes, users, and permissions are exactly what the OS manages — we go deeper there.
- → **Day 13 (Wireshark):** network traffic is bytes the remote program sends/receives.
- → **Day 16–17 (Web/Net security) & beyond:** buffer overflows, RCE, and privilege escalation are concrete vulnerabilities built on today's model. When we "exploit" later, we are abusing what you learn today.
- → **Day 19 (IR/DFIR):** memory forensics looks at exactly these running processes and RAM.

**Connection C — Backward link:** Day 1 bits/bytes are the raw material; today we give those bytes *meaning as code*.

**Concrete Examples to use in class:**
- *CPU as chef:* A chef follows a recipe (program) one step at a time, very fast. RAM = the countertop (workspace). Disk = the pantry (storage). Registers = the chef's hands.
- *End-to-end restaurant analogy (reuse all course):* Source code = recipe the chef wrote · Compiler = translator to machine language · Binary = the printed recipe the CPU reads · CPU = the chef · RAM = countertop · Disk = pantry · OS = the manager who preps the kitchen and loads the recipe. One analogy, extended — don't introduce a new one.
- *Process isolation:* Two chefs in separate kitchens (processes) can't mess with each other's countertops — unless a bug knocks down the wall (memory corruption).
- *Kernel vs user:* A restaurant manager (kernel) can go anywhere; a line cook (user program) is restricted to their station and must ask the manager for anything risky.
- *Buffer overflow:* Too many plates on a counter spill onto the neighbor's counter and ruin their order — that "spill" is the overflow overwriting adjacent memory.
- *Real bug:* The classic "ping of death" or a simple off-by-one array write that crashes an app — show that a crash is just the program losing control of its own memory.

## 3. Timing Guide (90 min)
| Segment | Time | Activity |
|---------|------|----------|
| A. Learning Objectives | 3 min | State the 3 goals |
| B. Learning Journey Check | 4 min | "Yesterday: bits. Today: those bits as running code. Tomorrow: networks." |
| C. Review | 3 min | Quick recall: what is a byte? (from Day 1) |
| D. Soft-Skills Moment | 12 min | Reading error messages & debugging systematically |
| E. New Concepts | 30 min | CPU/registers/RAM, processes, kernel vs user, security bridge |
| F. Diagram & Real-World | 10 min | "Chef kitchen" diagram; process-tree screenshot; crash→RCE story |
| G. Live Demo / Lab | 22 min | htop/Task Manager; PID/memory; safely end own process |
| H. Quiz / Assignment | 6 min | Exit quiz + homework handout |
| **Total** | **90** | |

## 4. Analogies
**The Restaurant (ONE analogy, reused all course — extend, don't replace):**
- **Source code** = the recipe the chef wrote.
- **Compiler** = the translator that converts it to machine language.
- **Binary / executable** = the printed recipe the CPU can read.
- **CPU** = the chef, following it one step at a time, extremely fast.
- **Registers** = the chef's hands (holding only what's being used right now).
- **RAM** = the countertop (live workspace) vs **Disk** = the pantry (long-term storage).
- **OS** = the restaurant manager who preps the kitchen and loads the recipe onto the countertop.
- **Process** = a chef in their own kitchen — isolated memory; can't see neighbors'.
- **Kernel vs user** = manager (can go anywhere) vs line cook (stuck at station, must ask manager for risky moves) — privilege boundary.
- **Buffer overflow** = too many plates on a counter spilling onto the neighbor's counter — overwrite of adjacent memory.

## 5. Common Misconceptions
- *"Programs run straight from the hard drive."* Wrong — the OS loads them into RAM first; the CPU only runs from RAM.
- *"More RAM makes the CPU faster."* Wrong — RAM is workspace size; CPU speed is how fast it works. More RAM helps only if you were memory-starved.
- *"A virus is always a visible process."* Wrong — malware often hides or impersonates legit processes.
- *"Kernel/user is just a software setting."* Wrong — it's **hardware-enforced** by the CPU (protection rings). That's why it's hard to break out of.
- *"Closing a program frees memory instantly and completely."* Mostly, but OSes page/swap and some remnants can linger; not always instant.

## 6. Demo Script
**Demo 1 — Process view (8 min):** Open Task Manager (Win) or `htop` (Linux/Mac). Point at columns: PID, CPU%, Memory%. "Each row is a process — its own memory space." Sort by memory; show one process using lots.
**Demo 2 — End a safe process (6 min):** Open Notepad/Calculator. Show its PID in the manager. Right-click → End task. Confirm it closes. Emphasize: **only end processes you started; never touch system processes.** Tie to Day 1 ethics: in our lab only.
**Demo 3 — "How a Program Starts" pipeline (4 min):** Draw/show the 6-step flow (source → compiler → executable → OS → RAM → CPU). Map each step to the restaurant analogy. "You'll use this mental model for the rest of the course."
**Demo 4 — Crash → RCE concept (8 min):** Show a tiny pseudo-code buffer example:
```
buffer[3];  buffer[0]=a; buffer[1]=b; buffer[2]=c; buffer[3]=d;  // overflow! writes past end
```
Explain the "extra" write spills into adjacent memory; in real bugs it can overwrite where the program goes next. **Close with the one-line takeaway:** "When programs lose control of their memory, attackers may gain control of the program." (No stack frames or assembly — conceptual only.)

## 7. Lab Solution (answers instructors should see)
- Task 1: opened a benign app (e.g., notepad); found its PID and memory in Task Manager/`htop`.
- Task 2: ended it cleanly; confirmed it disappeared from the list.
- Task 3 (concept): described program→RAM→CPU flow and gave one reason a crash can become code execution (overwrite of return address / loss of control of execution flow). Accept any correct plain-language version.

## 8. FAQ
- **Q: Do I need to learn assembly/machine code?** Not deeply. You need the *concept* that bytes = instructions and that execution flow can be hijacked. We stay at the model level.
- **Q: Why can't processes just read each other's memory?** They can't *by design* (isolation prevents bugs in one app from crashing others). Exploits often aim to break that wall.
- **Q: Is ending a process dangerous?** Ending a process *you* started is safe. Ending a system process can crash the OS — that's why the lab restricts you to your own.
- **Q: What's the difference between a program and a process?** A program is the file on disk (static). A process is that program loaded into memory and running (dynamic). One program can have many processes.

## 9. Examples Bank (reusable across cohorts)
- Chef/countertop/pantry (CPU/RAM/disk). Registers = hands.
- Process = separate kitchen. Buffer overflow = plates spilling over.
- Kernel/user = manager vs line cook (hardware-enforced rings).
- Real: "ping of death"; off-by-one array crash; a memory forensics scenario (Day 19) where a malicious process hides in RAM.
- Bridge line (say twice): "Yesterday's bits were data. Today the same bits are commands. That's why running untrusted code is dangerous."

> **Assessment:** see rubric.md (separate file, per the 7-file standard).
