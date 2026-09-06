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
RUN SHEET (~86 min planned):
00:00 Journey check + hook (htop on the projector)        5
00:05 The hardware that matters: CPU / RAM / disk        13
00:18 Program vs process                                 10
00:28 Source code -> running process                      7
00:35 WHY A BUG BECOMES CONTROL (the peak — teach fresh) 12
00:47 The OS as referee + user/kernel + isolation        14
01:01 Hands-on: your own machine                         18
01:19 Wrap + homework                                     5
CUT FIRST IF SHORT: the "interpreted languages" sub-point; the "referee is a defence" slide
(fold into recap). Instructor-only crash demo can be dropped for the recording.
NEVER CUT: program vs process, the "bug becomes control" seed, the hands-on steps 1-3.
ONE ANALOGY all lesson: kitchen — chef=CPU, counter=RAM, pantry=disk, head chef on the pass=OS,
walk-in freezer=kernel mode. Do not introduce a second analogy.
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

<!-- _class: lead -->

## Why a bug can become control

The one idea that makes every exploit later make sense.

<!--
This is the intellectual peak of the lesson — teach it now, while the room is fresh, not at
the end. Budget ~12 minutes. Slow right down.
-->

---

## Instructions and data live in the same RAM

When a function runs, the CPU saves **"where to go back to when I'm done"** onto the stack —
an address, sitting in RAM right next to that function's other scratch data.

Now: a program copies your input into a box sized for 20 characters. You send **5,000**.

The overflow spills past the box and **overwrites "where to go back to."** When the function
ends, the CPU jumps to whatever address is now there — one the **attacker** chose.

<!--
Draw it: a row of boxes on the board. [ input box (20) ][ ...other stuff... ][ where-to-go-back ].
Scribble the input box overflowing rightward into "where-to-go-back".
We are NOT exploiting anything today. The takeaway is one sentence, say it twice:
"a crash bug and 'the attacker runs their code' are usually the SAME bug — that's why
memory-safety bugs are treated as critical."
This is a "buffer overflow". They'll hear the term; they don't need more than this today.
-->

---

## Built-in defences (named, not deep)

| Defence | One line |
|---|---|
| **Stack canary** | a known value guards "where to go back to" — if it changed, abort |
| **DEP / NX** | data areas are marked "not executable" — your input can't run as code |
| **ASLR** | shuffle where things sit in memory each run, so addresses can't be predicted |

Compilers and the OS add these automatically. We come back to them in Week 4.

<!--
One line each. The point isn't the mechanism — it's that defence is layered and already built
in. Don't let a keen student pull you into ROP/bypasses; "Week 4".
-->

---

## The OS — the referee

One CPU (a few cores). Hundreds of processes. Something has to manage it:

- **Scheduling** — who gets the CPU, for how long (milliseconds each — it *feels* simultaneous)
- **Memory** — hands each process its own slice; **stops process A reading process B's memory**
- **Access** — decides what each process may touch (files, devices, network)

<!--
Extend the kitchen: the OS is the head chef running the pass — deciding who cooks what, when,
and keeping each cook at their own station.
This referee role is why the OS is the layer attackers most want to control and defenders most
want to harden — Week 2 is all about it.
-->

---

## Two floors: user mode and kernel mode

- **Kernel mode:** the OS core. Full, direct access to hardware.
- **User mode:** your programs. Limited. Can't touch hardware directly.
- A process asks the kernel for things — open a file, send a packet — via a **system call**.

<!--
Stay in the kitchen: line cooks (user mode) can't walk into the walk-in freezer / dry store
(kernel mode) — they call out an order to the person who can (a system call). One analogy all
lesson: chef=CPU, counter=RAM, pantry=disk, head chef on the pass=OS, freezer=kernel.
Why it matters: attacker code stuck in user mode is limited to what that user can do.
-->

---

## The referee is a defence, too

- **Process isolation** — the OS keeps each process's memory private from the others.
- **User mode** — attacker code lands with an ordinary user's limits, not full hardware access.

Getting from user mode to kernel/admin is **privilege escalation** — a topic of its own (Day 7, Day 17).

<!--
Ties the OS section back to the "defences" idea. Isolation + least privilege are the two
biggest structural defences and both come from the OS. Forward-ref privilege escalation.
-->

---

## Hands-on (15 min)

On your machine — `htop` (Linux) or Task Manager → Details (Windows):

1. Sort by memory. Find your browser. Note its **PID** and **RAM used**.
2. Open 10 new tabs. Watch the number change. (Heap growing.)
3. In a terminal: start a process (`sleep 300` / `timeout 300`), find it, **kill it by PID**.

Then watch the projector: the instructor runs a program that misbehaves — and the OS kills
**just that one process**, machine unharmed. The referee, doing its job.

<!--
Students do steps 1-3 (all three, everyone). Step 4 is INSTRUCTOR-ONLY on the Linux projector
machine — `python3 assets/crash.py` reads address 0 and segfaults cleanly on Linux; on Windows
it often surfaces as a catchable OSError, so don't have students run it.
Pre-flight the night before and record assets/crash-demo.mp4 as the fallback.
Windows students: Task Manager -> Details tab shows PID; right-click -> End task.
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
