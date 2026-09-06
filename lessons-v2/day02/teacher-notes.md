# Day 2 — Teacher Notes

**Teach from:** `day02.md` (deck + speaker notes).
**This file:** cut-list, background for shaky topics, the demo runbook, hands-on checkpoints,
exit check, FAQ.

---

## Must-teach vs. cut-if-short

**One analogy all lesson — the kitchen.** chef = CPU · counter = RAM · pantry = disk · head
chef on the pass = OS · walk-in freezer / dry store = kernel mode · calling out an order = a
system call. Do **not** introduce a second analogy (an earlier draft used a bank for
user/kernel mode — it's gone; keep it gone).

**Structure note:** "why a bug becomes control" is now taught **right after source→process**,
while the room is fresh — not at the end. Give it ~12 min. The old process-memory-layout slide
(code/data/heap/stack) was cut; the return-address idea is explained inline on the overflow
slide.

**Never cut:**
- Program vs process (the core distinction — say it three ways).
- The "why a bug becomes control" seed (~12 min, taught fresh).
- The OS as referee: scheduling, memory isolation, hardware guard.
- The hands-on steps 1–3.
- The three-line recap.

**Cut in this order if behind:**
1. The "interpreted languages" sub-point on the source→process slide.
2. The "referee is a defence, too" slide → fold its two bullets into the recap.
3. The built-in-defences table → name just DEP/NX and ASLR out loud.
4. Instructor crash demo → play `assets/crash-demo.mp4` instead (or skip).

---

## Background for topics people get shaky on

### CPU: the "next instruction" pointer
The CPU has a register — the **instruction pointer** (x86: `RIP`/`EIP`) a.k.a. program counter —
holding the address of the next instruction to execute. After each instruction it advances
(or jumps, for branches/calls/returns). Every control-flow-hijack attack is ultimately "get a
value the attacker chose into that register." You don't need to say "RIP" to the class; you do
need to be able to answer "how does the CPU know what's next?" → "a pointer it keeps; normally
it just moves forward."

### Program vs process — the precise version
- **Program / executable:** a file (Windows PE `.exe`, Linux ELF, macOS Mach-O) containing
  machine code + data + metadata telling the loader how to lay it out.
- **Process:** an OS bookkeeping object — a private virtual address space, one or more threads,
  open file handles, a PID, an owning user, a priority. Created by the OS loader from a program.
- Same program → many independent processes. One process can also run code from many programs
  (shared libraries / DLLs).
- **Virtual memory:** each process *thinks* it has the whole address space to itself; the OS +
  CPU's MMU map that to real RAM and keep processes apart. This is the mechanism behind
  "isolation."

### Compiled vs interpreted (if a student pushes)
- **Compiled** (C, C++, Rust, Go): source → machine code ahead of time → an executable that the
  CPU runs directly.
- **Interpreted** (Python, Ruby, classic JS): a running interpreter process reads your source
  (or bytecode) and does what it says. Your `.py` file is data to the `python3` process.
- **JIT** (Java, C#, modern JS): compiled to bytecode, then to machine code at runtime. Don't
  raise this unless asked.

### User mode / kernel mode / system calls
- CPUs have privilege levels (x86 "rings"; practically ring 3 = user, ring 0 = kernel).
- User code cannot execute privileged instructions or touch device memory. To do I/O it makes
  a **system call** — a controlled doorway into the kernel (`read`, `write`, `open`, `execve`,
  `socket`, …). The kernel validates the request, does the work, returns.
- Security relevance: malware in user mode is limited to what that user can do. Kernel-mode
  malware (rootkits) can hide from everything. Privilege escalation = user → kernel/root.

### The memory-corruption seed — the honest version
A classic **stack buffer overflow**: a function allocates a fixed-size buffer on the stack and
copies attacker-controlled input into it without checking length. The overflow writes past the
buffer, over the saved **return address**. When the function returns, the CPU loads that
address into the instruction pointer and jumps there — into code the attacker placed (or, with
DEP, into existing code chunks stitched together: "ROP"). Modern mitigations:
- **Stack canary / stack protector:** a random value placed between locals and the return
  address; checked before return; mismatch → abort.
- **DEP / NX:** pages are writable **or** executable, not both — attacker's injected data
  can't be executed as code.
- **ASLR:** base addresses of stack, heap, libraries, executable are randomised each run —
  attacker can't hardcode a target address.
- **CFI, shadow stacks:** newer; control-flow must match the compiler's expectations.
You are **not** teaching exploitation today. The single takeaway: *a "just a crash" bug and
"remote code execution" are usually the same bug at different levels of attacker effort.*

---

## Demo runbook

### Demo 1 — "one program is hundreds of processes" (hook, 2 min)
- Linux: `htop` (install first: `sudo apt install htop`). Windows: Ctrl+Shift+Esc → Task
  Manager → **Details** tab.
- Sort by memory (htop: `F6` → `PERCENT_MEM`; Task Manager: click the Memory column).
- Point at the count. Point at multiple entries for the browser. "One click. Hundreds of
  processes. The OS is juggling all of them on a handful of CPU cores."

### Demo 2 — memory grows (part of hands-on, 2 min)
- Note the browser's main process memory. Open ~10 tabs (news sites). Re-check. It climbed.
  "That's the heap — memory the process asked the OS for while running."

### Demo 3 — start / find / kill a process (hands-on, 3 min)
- Terminal: `sleep 300 &` (Linux/mac) or `timeout /t 300` in a new window (Windows).
- Find it: `ps aux | grep sleep` / Task Manager.
- Kill it: `kill <PID>` / right-click → End task.
- "You created a process, the OS gave it a PID, you ended it. The program (`sleep`) is still
  on disk, untouched."

### Demo 4 — the OS contains a crash (INSTRUCTOR ONLY, projector, 2 min)
- Run on the **Linux projector machine**, not by students: `python3 assets/crash.py`
- Output ends with `Segmentation fault` and the process is gone.
- On Windows, `ctypes.string_at(0)` often raises a catchable `OSError` instead of a hard
  segfault — that's why students don't run this; it's an instructor demo on Linux.
- "It tried to touch memory it wasn't allowed to. The OS killed **just that process**. The
  machine is fine. That containment is the referee doing its job."
- **Pre-flight:** run it the night before on the projector machine and screen-record → 
  `assets/crash-demo.mp4` (fallback, or use instead of running live).

### Failure modes
| Symptom | Fix |
|---|---|
| `htop` not installed | `sudo apt install -y htop`, or use `top` (built in) |
| Windows Task Manager shows no PID column | View is on "Processes" tab — switch to **Details** |
| `crash.py` prints a Python traceback instead of dying | very old Python/OS; skip — just describe it |
| students can't kill a process ("Operation not permitted") | it's owned by another user/root; pick one they started |

---

## Hands-on checkpoint (what "done" looks like)

Each student can:
- [ ] name their browser's PID and roughly how much RAM it's using
- [ ] state what made the memory number go up (heap / more tabs)
- [ ] start a process from the terminal and kill it by PID
- [ ] say, in one sentence, what the OS did when `crash.py` misbehaved

---

## Exit check (last 2 min)

1. I delete `game.exe` from the disk while the game is running. Does the game stop? — *No —
   the process is already in RAM; the disk file is just where it was loaded from.*
2. Which is wiped when you shut down: RAM or disk? — *RAM.*
3. Why is "the program crashed" something a security person cares about? — *A crash often means
   memory got corrupted by input; the same flaw can frequently be turned into running the
   attacker's code.*

---

## FAQ

- **"Is more RAM the same as more storage?"** No. RAM is the temporary working area for running
  programs; storage (SSD/HDD) is where files live permanently. They're different hardware with
  different sizes and speeds.
- **"If I close the window, is the program gone?"** The window closing usually ends the
  process, but not always — some keep running in the background (show one). And the program
  file on disk is never affected.
- **"Do I need to learn assembly / how the CPU works in detail?"** Not for this course. You
  need the model: CPU runs instructions in order, a pointer says which is next, data and
  instructions share RAM. That's enough to understand exploitation later.
- **"Is Python not 'real' code because it's interpreted?"** It's real code. The difference is
  *when* the translation to machine instructions happens and *what* does it — not whether it
  "counts."
- **"Can one process really not read another's memory?"** By default the OS prevents it. There
  are attacks and debugging tools that cross that line with privileges — we'll see some later.
