# Day 6 — Student Guide
**Course:** Practical Cyber Security: From First Principles · Module 2 · Day 6 of 20

---

## Why this matters
Last week was about machines talking. This week answers a different question: **who controls each machine?** The answer is the **operating system (OS)** — and in security, the OS is where almost every fight is won or lost: attacks try to get more control than they should; defenses try to stop them.

## How today connects (keep this in mind)
- **Yesterday (end of Week 1) → Today:** Week 1 ended with a web page loading. But *which program* received that page, and *with what rights*? The OS. It's the missing "who's in charge" layer.
- **Forward:** Day 7 (Linux deep dive) · Day 8 (Windows deep dive) · Day 9-10 (automation; Day 10 = Week 2 workshop) · Day 16 (privilege escalation) · Day 19 (OS logs in IR).
- **Ethics:** we only run safe, read-only shell commands on our own machine (Day 1 rule).

---

## The big ideas

### 1. What an OS is
The **OS** sits between applications and hardware. It decides *who may run what, what each program may touch, and what gets the CPU next*. Think of it as the **referee** — without it, every program would fight over the disk, keyboard, and network.

### 2. The unified Restaurant metaphor (one metaphor for the whole academy)
- **Restaurant = the Computer** · **Manager = the OS** · **Chef = the CPU** · **Kitchen counter = RAM** · **Pantry = Storage** · **Employees = Processes** · **Walkie-talkie = the Shell** · **Key cabinet = Permissions**.
- A **User** is an identity on the staff roster; when working, they're an **Employee = a Process**. The manager (OS) checks the key cabinet before letting anyone in.
- **Signature diagram:** the OS stack (User → Shell → OS → CPU/RAM/Disk) at `diagrams/os-signature.md` is reused on Days 6–10 — the backbone of Week 2, just like the page-load diagram was for Week 1.

### 3. Linux vs Windows (the security-relevant part)
Both have users, permissions, processes, and files — the *concepts* are the same; only the commands differ.
- **Linux:** open-source, explicit permission model, dominant in servers/cloud/security tooling; shell = **Bash**.
- **Windows:** dominant on desktops/enterprises; Active Directory, Group Policy; shell = **PowerShell / CMD**.
Lesson: learn the *concepts*; the OS is just a dialect.

### 4. The shell (command line)
A **shell** is a text interface to the OS. You type; it executes. Faster and more precise than clicking — and where most security work happens.
- Linux: `whoami`, `id`, `pwd`, `ls`, `cd`
- Windows: `whoami`, `dir`, `cd`

### 5. Users, permissions, and "who am I?"
Every command runs **as a user**. `whoami` shows your identity; `id` (Linux) shows your groups. **Privilege** = what you're allowed to do. Most breaches are about *gaining more privilege than you should*. This seeds Days 7-8 and 16.

### 6. Security bridge
Weak or misconfigured permissions → attacker runs as admin (total control). That's why **least privilege** matters. Malware is just a program the OS runs — unless permissions/AV stop it. The OS is both battleground and wall.

---

## Worksheet (fill in during class)
1. The OS is the ______ between applications and hardware.
2. In our analogy, the OS = the restaurant ______; the shell = the manager's ______.
3. Permissions = the key ______ (who may enter which room).
4. Linux shell = ______; Windows shell = ______ / CMD.
5. Every command runs as a ______. `whoami` shows your ______.
6. Most breaches are about gaining more ______ than you should have.

## Homework (due Day 7)
Open a shell on your own machine (Terminal / PowerShell). Run `whoami` and `pwd` (Linux) or `whoami` and `cd` (Windows). Write down what each printed. Safe and read-only.

*(Lab steps are in lab-guide.md. Quiz is in quiz.md. Reference sheet is in references.md.)*

---

## PPT Outline (blueprint for Phase 4)
*Phase 4 turns this into the actual deck. Every deck opens with "Why are we learning this?" Full speaker notes live in instructor-guide.md.*

**Slide 1 — Title:** "Day 6: The Operating System — Linux vs Windows & the Shell" · Academy logo.
**Slide 2 — Why are we learning this?** (required): the OS enforces all security (users/permissions/processes); where attacks & defenses live. Diagram: shield over a computer.
**Slide 3 — Learning Journey Check:** "Last week: machines talk. This week: who controls the machine. Today: the OS + shell."
**Slide 4 — What is an OS:** referee between apps and hardware. Diagram: apps ↔ OS ↔ hardware.
**Slide 5 — Restaurant manager extended:** roster=users, key cabinet=permissions, walkie-talkie=shell. Diagram: kitchen with labelled manager tools.
**Slide 6 — Linux vs Windows:** concepts identical, commands differ. Diagram: two "dialects" side by side.
**Slide 7 — The shell:** text interface; Bash vs PowerShell. Diagram: walkie-talkie.
**Slide 8 — Users & privilege:** whoami/id; privilege = what you may do. Diagram: badge.
**Slide 9 — Security bridge:** weak permissions → admin; least privilege; malware is just a program. Diagram: key cabinet with a broken lock.
**Slide 10 — Soft-Skills Moment:** always ask "as WHICH user is this running?"
**Slide 11 — How Today Connects:** extends D2 manager; forward D7/D8/D10/D16/D19. Diagram: central "OS," arrows radiating.
**Slide 12 — Curiosity Question (close):** "If the operating system controls permissions, how do attackers sometimes become administrators?" → (defer to Day 16 — privilege escalation).
**Slide 13 — Lab Preview & Quiz:** safe shell commands; then the exit quiz.
