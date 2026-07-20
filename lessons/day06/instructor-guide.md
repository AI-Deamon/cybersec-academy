# Day 6 — Instructor Guide (PRIVATE — source of truth)
**Course:** Practical Cyber Security: From First Principles
**Module 2 — Understanding the Operating System · Day 6 of 20 · Week 2, Session 1**
**Standard:** Academy Design Document v1.2 (Complete) · Phase 3 lesson-doc standard
**Version:** 1.0

---

## 1. Lesson Overview
- **Title:** The Operating System — Linux vs Windows, and the Shell
- **Duration:** 90 minutes
- **Type:** Foundation — who controls the computer (the question Week 2 answers)
- **Position in journey:** Day 6 of 20, first day of Week 2. Week 1 = "how computers communicate." Week 2 = "how operating systems manage computers." Today: the OS is the referee between programs and hardware, and the shell is how we talk to it.
- **Week cadence (official):** four 5-session weeks (Mon–Fri). Days 1–4 teach new concepts; Day 5 (Day 10 here) is a reinforcement/workshop session. See ADD §12.
- **Companion files:** student-guide.md · lab-guide.md · quiz.md · references.md · rubric.md · version-history.md

## 2. Teaching Guide (Four Context Questions)
**Why am I learning this?**
Because the OS is the layer that *enforces* security: users, permissions, processes, files, and the boundary between "allowed" and "not allowed" all live here. Almost every attack and defense is really an OS story. If you don't understand the OS, you can't understand privilege, malware, or hardening.

**How does this connect to the previous lessons?**
- Day 2: a program runs in RAM under the CPU — but *who decides* it can run, and *what* it can touch? The OS.
- Day 3-4: packets arrive at the machine — but *which program* receives them, and *with what rights*? The OS.
- The OS is the "manager" of the Restaurant from Day 2.

**Where will I use this in cybersecurity?**
Linux/Windows fundamentals, privilege escalation (Day 16+), incident response (Day 19), cloud security (Day 18), hardening, malware analysis. The OS is where most real work happens.

**What problem will I be able to solve after today's class?**
Explain what an OS *is* (referee between programs and hardware), name the key difference between Linux and Windows for security, and use a shell to run a few safe commands — the first step toward administering a system.

**Concept 1 — What an OS is (first principles):**
The **OS** is the software that sits between applications and the hardware. It decides: who may run what, what each program may read/write, which device gets the CPU next, and how files are stored. Without an OS, every program would have to talk to the disk/keyboard/network directly — chaos. It is the **referee**.

**Concept 2 — The unified Restaurant metaphor (the academy's ONE metaphor):**
We extend the Day-2 Restaurant into a single consistent metaphor for the whole academy:
- **Restaurant = the Computer** (the whole building)
- **Manager = the Operating System** (runs the building, enforces the rules)
- **Chef = the CPU** (does the cooking / computing)
- **Kitchen counter = RAM** (the active workspace)
- **Pantry = Storage / Disk** (ingredients kept long-term)
- **Employees = Processes** (the workers actually on shift)
- **Walkie-talkie = the Shell** (how we give the manager direct commands)
- **Key cabinet = Permissions** (who may enter which room)
A **User** is an identity on the staff roster; when that person is working, they are an **Employee = a Process**. The manager (OS) checks the key cabinet (permissions) before letting any employee into a room. This one picture is reused every day in Week 2; the **Week 2 signature diagram** (`diagrams/os-signature.md`) shows the same stack (User → Shell → OS → CPU/RAM/Disk).

**Concept 3 — Linux vs Windows (the security-relevant difference):**
- **Linux:** open-source, permission model is explicit and ubiquitous; most servers, cloud, and security tooling run on it; the shell (Bash) is first-class. Security work leans Linux-heavy.
- **Windows:** dominant on desktops/enterprises; Active Directory, Group Policy; PowerShell is its powerful shell. Different permission model (ACLs, tokens) but same *idea*.
- Key point: **both have users, permissions, processes, files** — the concepts transfer; only the commands differ.

**Concept 4 — The shell (command line) — the manager's walkie-talkie:**
A **shell** is a text interface to the OS. You type commands; the OS executes them. It's faster and more precise than clicking. In security, the shell is where automation, forensics, and attacks happen — so we learn it early but safely.
- Linux shell: **Bash** (`ls`, `pwd`, `whoami`, `id`, `cd`).
- Windows shell: **PowerShell** / **CMD** (`dir`, `whoami`, `cd`).

**Concept 5 — Users, permissions, and "who am I?" (the security seed):**
Every command runs *as a user*. `whoami` shows your identity; `id` shows your groups/permissions. **Privilege** = what you're allowed to do. Most breaches are about *gaining more privilege than you should have*. This is the seed for Day 7-8 (Linux/Windows internals) and Day 16 (privilege escalation). Leave students with the open question — *"If the operating system controls permissions, how do attackers sometimes become administrators?"* — we answer that on Day 16, not today.

**Concept 6 — Security bridge:**
- If the OS's permission checks are weak or misconfigured → an attacker runs as admin (total control). That's why "least privilege" matters.
- Malware is just a program the OS runs — unless permissions/AV stop it. The OS is both the battleground and the defensive wall.

## 2b. Topic Connections & Examples (the "why it links" layer)
**Connection A — Restaurant/Manager extended:** Day 2 introduced the manager loosely; today we name the manager's tools (roster=users, key cabinet=permissions, walkie-talkie=shell). This becomes the lens for all of Module 2.

**Connection B — Forward links:**
- → **Day 7 (Linux Fundamentals):** go deep on the Linux shell, file permissions (`chmod`), users/groups.
- → **Day 8 (Windows Fundamentals):** same concepts in Windows (PowerShell, ACLs, users).
- → **Day 9-10 (Python / Bash automation):** script the shell; Day 10 = Week 2 workshop/assignment (administer a user/permission change on both OSes).
- → **Day 16+ (privilege escalation):** abusing the permission model we meet today.
- → **Day 19 (IR):** the OS logs (`/var/log`, Event Log) are where incidents are found.

**Connection C — Backward link:** Day 2's process-in-RAM is *created and controlled* by the OS; Day 3-4's incoming packets are delivered to a process the OS owns. The OS is the missing "who controls it" answer.

**Concrete Examples:**
- *Referee:* at a sports match, the referee (OS) enforces the rules so players (programs) don't chaos; without one, anyone does anything.
- *Walkie-talkie = shell:* a manager's assistant who relays your exact instructions to the kitchen — fast, but you'd better say it right.
- *whoami:* like showing your staff badge before you're allowed into the storage room.
- *Real story:* the 2017 Equifax breach was worsened by an unpatched Linux component — the OS layer failing to be maintained. The OS is where neglect becomes breach.
- *Bridge line (say twice):* "Week 1 was about machines talking. Week 2 is about who's in charge of each machine — and in security, the OS is where every fight is won or lost."

## 3. Timing Guide (90 min)
| Segment | Time | Activity |
|---------|------|----------|
| A. Learning Objectives | 3 min | State the 3 goals |
| B. Learning Journey Check | 4 min | "Last week: machines talk. This week: who controls the machine. Today: the OS + shell." |
| C. Review | 3 min | Recall Day 2: program runs in RAM; but who lets it? (the OS) |
| D. Soft-Skills Moment | 12 min | Reading a permissions model; always ask "as WHICH user is this running?" |
| E. New Concepts | 30 min | OS as referee; manager analogy; Linux vs Windows; shell; users/permissions |
| F. Diagram & Real-World | 10 min | OS layers diagram; Equifax story |
| G. Live Demo / Lab | 20 min | safe shell commands (whoami/id/ls/pwd) on the student's own machine |
| H. Quiz / Assignment | 8 min | Exit quiz + preview Week 2 path |
| **Total** | **90** | |

## 4. Analogies
**Use the ONE unified metaphor (do not invent new ones):**
Restaurant = Computer · Manager = OS · Chef = CPU · Kitchen counter = RAM · Pantry = Storage · Employees = Processes · Walkie-talkie = Shell · Key cabinet = Permissions. (Users = identities on the staff roster; an Employee on shift = a Process.) This is the *same* Restaurant from Day 2 — we are promoting the manager to the main character of Module 2, not changing the story. The **Week 2 signature diagram** (`diagrams/os-signature.md`) is the visual form of this metaphor and is reused on Days 6–10.

## 5. Common Misconceptions
- *"Linux is safer than Windows, period."* Not automatically — safety depends on configuration. Linux is more *transparent* and common in security, but misconfigured Linux is just as exploitable.
- *"The command line is only for experts."* It's just a different UI; a few commands get you far. We start safe.
- *"The shell is dangerous."* It's powerful, so we only run read-only/own-machine commands in class.
- *"Permissions are just a padlock."* They're a *policy* the OS enforces on every operation; understanding "as which user" is the real skill.
- *"An OS and a kernel are the same."* The kernel is the core of the OS (the manager's brain); the OS includes the kernel + services + shell + UI.

## 6. Demo Script
**Demo 1 — Who am I? (6 min):** run `whoami` (both OSes) and `id` (Linux). Show the username and groups. "Every command you run wears this identity badge."
**Demo 2 — Look around (7 min):** `pwd` + `ls` (Linux) / `cd` + `dir` (Windows). Show the filesystem as "shelving." Emphasize read-only browsing — no changes.
**Demo 3 — Two worlds (4 min):** show the same idea in Bash vs PowerShell side by side (e.g., `ls` vs `dir`, `whoami` both). "Different words, same job — that's why we learn concepts, not just commands."
**Demo 4 — Bridge (3 min):** on the OS-layers diagram, circle "permissions" and say: "When an attacker 'gets admin,' they've convinced the OS to give them the master key. That's Day 16."

## 7. Lab Solution (answers instructors should see)
- Task 1: ran `whoami`/`id`; reported their username + (Linux) primary group.
- Task 2: ran `pwd`/`ls` (or `cd`/`dir`); listed the current directory contents, no changes made.
- Task 3: explained in own words one Linux vs Windows difference (e.g., Bash vs PowerShell; permission model).
- Concept Q: stated that every command runs *as a user*, and privilege = what that user may do.

## 8. FAQ
- **Q: Which should I learn, Linux or Windows?** Both — but start with Linux for security (most tooling is Linux-based). Day 7-8 cover both.
- **Q: Is it safe to use the shell in class?** Yes — we only run read-only commands on your own machine.
- **Q: What's a "kernel"?** The OS's core that talks directly to hardware (the manager's brain). The rest of the OS wraps around it.
- **Q: Why does privilege matter so much?** Because most attacks aim to *do more than they're allowed to* — gaining privilege is the attacker's goal.

## 9. Examples Bank (reusable across cohorts)
- Referee = OS; walkie-talkie = shell; staff roster = users; key cabinet = permissions.
- `whoami` = showing your badge; `ls`/`dir` = reading the shelving.
- Linux (Bash) vs Windows (PowerShell): same concepts, different words.
- Equifax (2017) = unmaintained OS-layer component → breach.
- Bridge line: "Week 2 is about who's in charge of the machine — and the OS is where every fight is won or lost."

> **Assessment:** see rubric.md (separate file, per the 7-file standard).
