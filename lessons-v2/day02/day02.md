---
marp: true
theme: dark-monospace
paginate: true
title: "Day 2 — Inside the Box: How a Program Actually Runs"
footer: "Practical Cyber Security (v2) · Week 1 · Day 2"
---

<!-- _class: lead -->

# Inside the box
## Day 2 — Hardware, the OS, and how a program actually runs

**Week 1 · Building the foundation**

<!--
RUN SHEET (90 min):
00:00 Journey check + hook
00:05 The hardware that matters: CPU / RAM / disk
00:20 Program vs process
00:35 Source code -> running process
00:50 The OS as referee (isolation, user vs kernel)
00:58 Why a bug can become control (the seed)
01:05 Hands-on: your own machine
01:20 Wrap + homework
CUT FIRST IF SHORT: the "interpreted languages" sub-point; the segfault demo (keep the htop part).
NEVER CUT: program vs process, OS isolation, the "bug becomes control" seed, the hands-on.
-->

---

## Where we are

- **Yesterday:** what cyber security is, where it came from, and the law.
- **Today:** open the box. What's actually inside the machine we're securing?
- **Tomorrow:** connect boxes together — networks.

> Every attack, at the bottom, is one of these parts being pushed to do something it shouldn't.

<!--
The "Learning Journey Check" — do this every day. Yesterday / Today / Tomorrow, one line each.
It stops students feeling lost in the sequence.
-->

---

## Hook — "one program"?

Open **Task Manager** (Windows) / run **`htop`** (Linux) on the projector.

Scroll. There are **hundreds** of things running.

You opened *one* browser. Where did the other 300 come from?

<!--
Let it sit. Sort by memory. Point at how many entries there are.
The answer — processes, and the OS juggling them — is the whole lesson. Don't answer yet.
-->

---

<!-- _class: lead -->

# The three parts that matter

CPU · RAM · Disk

<!--
There's more in a computer (GPU, network card, buses) but for security reasoning these three
are what you need. Keep it to three.
-->

---

## CPU — does the work

- Executes machine instructions **one at a time**, billions per second.
- It does exactly what the current instruction says. No judgement, no context.
- "What instruction do I run next?" is tracked by a pointer the CPU keeps.

<!--
The CPU is dumb and fast and obedient. That obedience is why "if I can change what instruction
comes next, I control the machine" (slide later).
The "next instruction" pointer is the instruction pointer / program counter. Name it lightly.
-->

---

## RAM — the working desk

- **Fast, small, volatile** — wiped the instant power is lost.
- Holds what's being worked on **right now**: running programs and their data.
- The CPU can only work on things that are in RAM.

## Disk (SSD/HDD) — the filing cabinet

- **Slow, large, permanent** — survives power-off.
- Holds files: your programs, documents, the OS itself, when they're *not* running.

<!--
MISCONCEPTION TO KILL: "RAM and storage are the same thing." They are not.
"8 GB of RAM" is not "8 GB of files." Closing a laptop lid vs shutting down: RAM contents
are what you lose on shutdown.
Analogy we reuse: kitchen. CPU = chef. RAM = the counter you're actively working on.
Disk = the pantry. You fetch ingredients from the pantry to the counter to cook.
-->

---

## Program vs process — the key distinction

| | **Program** | **Process** |
|---|---|---|
| What | A **file on disk** | That program **loaded into RAM and running** |
| Analogy | The recipe, written down | The chef actually cooking it |
| How many | One `chrome.exe` | 3 windows = 3+ processes, each with its own RAM |
| Identity | a filename | a **PID** (process ID) — its badge number |

<!--
This is the single most important distinction of the day. Say it three ways.
A program does nothing. It's inert text on disk. It only "does" anything when the OS turns it
into a process. Killing a process doesn't delete the program. Deleting the program doesn't
stop a running process.
MISCONCEPTION: "I closed the window so the program stopped." Sometimes the process keeps
running in the background. Show one in Task Manager.
-->

---

## From what you write to what runs

```
  source code            machine code            a process
  (you write this)  -->   (CPU understands   -->  (running in RAM,
  print("hi")             this) an executable      doing the work)
                          file on disk
       |                        |                       |
    human-readable          compiler made it        OS loaded it
```

<!--
Step through it:
1. You write source code — English-ish, for humans.
2. A COMPILER translates it into machine code — raw CPU instructions — and writes an
   executable file to disk (e.g. a .exe, or an ELF binary on Linux).
3. You run it: the OS reads that file, copies it into RAM, lays out its memory, points the
   CPU at the first instruction. Now it's a process.
Interpreted languages (Python, JavaScript): there's no compile-to-exe step you see — the
Python interpreter is itself a running process that reads your script line by line.
CUT the interpreted-languages point first if short.
-->

---

## What a process's memory looks like

A process gets its own private region of RAM, laid out in parts:

- **Code** — the instructions (usually read-only)
- **Data** — fixed values the program knows about
- **Heap** — memory it asks for while running (grows as needed)
- **Stack** — scratch space for the function running right now, incl. **"where to go back to"**

<!--
Keep this light — no diagrams of stack frames yet. The one part that matters for the security
seed: the stack holds RETURN ADDRESSES — "when this function finishes, jump back to here."
That's data. Sitting in the same RAM as everything else. Remember that for two slides' time.
-->

---

## The OS — the referee

One CPU (a few cores). Hundreds of processes. Someone has to manage it:

- **Scheduling** — who gets the CPU, for how long (milliseconds each — it *feels* simultaneous)
- **Memory** — hands each process its own slice; **stops process A reading process B's memory**
- **Access** — decides what each process is allowed to touch (files, devices, network)

<!--
Isolation is a security property: a bug or malware in one process shouldn't be able to read
your password manager's memory. (Shouldn't. Attacks on this exist — later.)
This referee role is why the OS is the layer attackers most want to control and defenders
most want to harden — Week 2 is all about it.
-->

---

## Two floors: user mode and kernel mode

- **Kernel mode (upstairs):** the OS core. Full, direct access to hardware.
- **User mode (downstairs):** your programs. Limited. Can't touch hardware directly.
- A process asks the kernel for things — open a file, send a packet — via a **system call**.

<!--
Analogy: a bank. Customers (user mode) fill in a slip and hand it to a teller. Only staff
(kernel mode) go into the vault. A system call is the slip.
Why it matters: if attacker code is stuck in user mode it's limited. "Privilege escalation"
(Day 7, Day 17) is the attacker trying to get from downstairs to upstairs.
-->

---

## Why a bug can become control

<!-- _class: lead -->

The seed for the whole course.

<!--
Slow down here. This is the "aha" that makes exploitation make sense later.
-->

---

## Instructions and data share the same RAM

The CPU blindly runs "the next instruction." The stack holds **return addresses** — data that
says *which instruction comes next* when a function ends.

**If attacker-controlled input can overflow into that return address...**

...the attacker chooses what the CPU runs next. That's **memory corruption → code execution.**

<!--
Concrete-but-gentle: a program reads your name into a box sized for 20 characters. You send
5,000 characters. The extra spills past the box and overwrites the "where to go back to"
value on the stack. When the function returns, the CPU jumps to an address the attacker put
there.
We are NOT exploiting anything today. The point is: a "crash bug" and "attacker runs their
code" are the same underlying flaw. That's why memory-safety bugs are treated as critical.
-->

---

## The defences (named, not deep)

| Defence | One line |
|---|---|
| **Process isolation** | the OS keeps each process's memory private |
| **DEP / NX** | mark data areas "not executable" — data can't be run as code |
| **ASLR** | randomise where things sit in memory so the attacker can't predict addresses |
| **Stack canaries** | put a known value before the return address; if it changed, abort |
| **User mode** | attacker code lands with limited privileges, not full hardware access |

<!--
One line each. Students don't need depth now — they need to know defence is layered and
built into the OS and compiler. We come back to these when we actually do exploitation (W4).
-->

---

## Hands-on (15 min)

On your machine — `htop` (Linux) or Task Manager → Details (Windows):

1. Sort by memory. Find your browser. Note its **PID** and **RAM used**.
2. Open 10 new tabs. Watch the number change. (Heap growing.)
3. In a terminal: start a process (`sleep 300` / `timeout 300`), find it, **kill it by PID**.
4. *(Optional)* run `assets/crash.py` — watch the OS immediately kill a misbehaving process.

<!--
Everyone should get through steps 1-3. Step 4 is the segfault demo — cut it if time is tight.
crash.py does `ctypes.string_at(0)` — a read from address 0, which the OS forbids -> instant kill.
Point: the OS caught it and contained it. That containment is the referee doing its job.
Walk the room. Windows users: Task Manager -> Details tab shows PID; right-click -> End task.
-->

---

## Today's attack / defence / artifact

- **Attack:** feed a program more input than it expects → overwrite the "what runs next" value → run attacker code.
- **Defence:** OS process isolation, DEP/NX, ASLR, stack canaries, running as a limited user.
- **Artifact:** the `source → compiled → loaded → running process` diagram, in your repo.

<!--
The daily ritual. Three lines into the repo before they leave.
-->

---

## Homework

1. Draw the **source code → executable → running process** pipeline yourself. Label where
   the CPU, RAM and disk each come in.
2. One paragraph: **what is the difference between a program and a process?**
3. Add both to your repo. Update your README's "today I learned" list.

<!--
Due start of Day 3. Checklist grading in the week-1 student pack.
-->

---

<!-- _class: lead -->

## Recap

1. **Program = a file on disk. Process = that file running in RAM.** The OS turns one into the other.
2. **The OS is the referee** — it schedules the CPU, isolates memory, and guards the hardware.
3. **A crash bug and "attacker runs their code" are the same flaw** — input overwriting what the CPU does next.

<!--
Say these verbatim, then dismiss.
Tomorrow: your machine stops being alone — how two computers find each other and talk. Networks.
-->
