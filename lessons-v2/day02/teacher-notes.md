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

## Bonus homework — process tracking in Event Viewer (Windows, admin only)

Optional stretch item on the homework list. Ties the day's **PID** straight into a real audit
log, and previews Day 19 (memory/log forensics) and general DFIR/SOC work — "process tracking"
is a real Windows audit category, not a made-up term.

**Steps to give students:**
1. Open an **admin** Command Prompt / PowerShell and run:
   `auditpol /set /subcategory:"Process Creation" /success:enable`
   (`auditpol` works on Home edition too — no need for `secpol.msc`, which Home lacks.)
2. Open a program you don't normally have running (Notepad or Calculator is fine).
3. Task Manager → **Details** tab → note that program's **PID** (decimal).
4. Open Event Viewer (`eventvwr.msc`) → **Windows Logs → Security**.
5. Right-click the log → **Filter Current Log** → Event ID **4688** ("A new process has been
   created").
6. Find the most recent 4688 event for that program. Check "New Process Name" matches, and
   convert "New Process ID" (shown in **hex**) to decimal — it should match the Task Manager PID.
7. Screenshot the event detail pane and write one sentence: *what does this event prove about
   how the OS keeps a record of every process it creates?*

**Why this is optional, not required:** it needs local admin rights (many school/shared laptops
don't have this), it's Windows-only (no clean Linux/macOS equivalent to assign in parallel —
closest is `auditd`/`ausearch -m execve` or macOS `log show --predicate 'eventMessage contains
"exec"'`, which are a bigger lift), and it's a second concept (auditing/logging) layered on an
already-full day. Don't let it become required homework or eat class time.

**Common snags (walk through these before setting students loose):**
- **Hex vs. decimal PID confusion** — Event Viewer shows PIDs in hex (`0x...`), Task Manager in
  decimal. Windows Calculator → menu → **Programmer** mode converts hex→dec directly; no need
  for `certutil` or anything else.
- **"New Process ID" vs. "Creator Process ID"** — the event lists both. "New Process ID" is the
  program they launched; "Creator Process ID" is the *parent* that launched it (usually
  `explorer.exe`). Students will grab the wrong one if not warned explicitly.
- **Stale event / no fresh launch** — if the program was already running before they enabled
  auditing, there's no 4688 for that launch. They must close it fully and reopen it *after*
  running `auditpol`.
- **Multi-process apps** — Chrome/Edge/most browsers spawn several processes per launch (GPU
  process, renderer per tab, etc.), producing several near-simultaneous 4688 events. Steer
  students toward single-process apps (Notepad, Calculator, Paint, VS Code) to avoid this.
- **UAC prompt on Event Viewer** — `eventvwr.msc` requires elevation to read the Security log;
  a UAC prompt is expected, not an error.
- **Empty log despite auditpol succeeding** — `auditpol /get /subcategory:"Process Creation"`
  should show "Success" enabled. If it does but no events appear, the machine is likely
  domain/Group-Policy-managed (common on school-owned laptops) and GPO is silently overriding
  the local setting on refresh. Tell those students to try their own personal machine, or just
  skip the bonus — don't spend class time fighting a managed device.

**Worked example to show in class (use Notepad — then send students off to track a *different*
program):**
1. Admin PowerShell: `auditpol /set /subcategory:"Process Creation" /success:enable` →
   "The command was successfully executed."
2. Open **Notepad**.
3. Task Manager → Details → `notepad.exe` → PID **8420** (decimal, example value).
4. Event Viewer → Windows Logs → Security → Filter Current Log → Event ID **4688**.
5. Open the matching event. Details pane shows:
   - New Process Name: `C:\Windows\System32\notepad.exe`
   - New Process ID: `0x20E4`
6. Convert `0x20E4` → decimal: **8420**. Matches the Task Manager PID. Confirmed — the OS logged
   the exact moment that process was created, with the exact same ID Task Manager shows.

**Tell students explicitly: don't submit Notepad — pick a different program** (Calculator,
Paint, Chrome, VLC, Spotify, a game, anything else installed). The point is that each student
does the PID lookup and hex conversion themselves on a process of their own choosing, not that
they reproduce this exact walkthrough.

---

## Bonus homework — explore and set up WSL (Windows)

Optional stretch item, separate from the Event Viewer task. Two payoffs: (1) it's a live,
touchable example of today's "kernel" idea — WSL2 runs a **real Linux kernel** in a lightweight
managed VM, side by side with the Windows kernel, on the same hardware; (2) practically, the
course keeps giving paired commands (`htop`/Task Manager, `ip a`/`ipconfig`, `dig`/`nslookup`,
`ncat`/PowerShell script) — this is what lets Windows students actually run the Linux side
instead of only reading it.

**Not the same thing as** the Kali/VirtualBox attacker VM used later for Days 12–20 labs — see
`LAB-SETUP.md` §"WSL2 as the attacker": WSL2 can't cleanly reach an isolated VirtualBox lab
network, so it's unsupported there. This bonus task is only about getting comfortable with a
Linux shell early; it doesn't replace the later attacker VM.

**Steps to give students:**
1. Open PowerShell **as Administrator** → `wsl --install` (installs WSL2 + Ubuntu by default).
   Restart if prompted.
2. After restart, Ubuntu finishes installing and launches automatically — create a UNIX
   username and password when asked (separate from their Windows login; the password won't
   show characters as they type, that's normal).
3. Verify it worked — Windows side: `wsl --status`; inside Ubuntu: `uname -a` (should print
   `Linux ... microsoft-standard-WSL2 ...`).
4. Inside Ubuntu: `sudo apt update && sudo apt install -y htop` then run `htop`. Compare it
   side by side with Windows Task Manager — same idea (processes, PID, memory), a completely
   separate kernel managing it.
5. One-sentence check: *is the Ubuntu you just opened a separate physical computer, a separate
   virtual machine, or something else?* (Answer: a real, lightweight Linux kernel running in a
   managed VM under Hyper-V — same hardware, a second, isolated kernel.)

**Common snags:**
- **`wsl --install` fails / "WSL2 requires an update"** — needs Windows 10 version 2004+ (Build
  19041+) or Windows 11. Very old Windows 10 installs will need a manual kernel update first
  (`wsl --update`) or are out of luck.
- **Virtualization disabled in BIOS** — same failure mode as VirtualBox in `LAB-SETUP.md`;
  enable Intel VT-x / AMD-SVM in BIOS/UEFI.
- **Corporate/managed laptop blocks it** — WSL and Hyper-V can be disabled by Group Policy on
  school/work devices, same pattern as the Event Viewer bonus. Skip it there; it's optional.
- **No internet in Ubuntu** — usually a DNS issue after a VPN was active during install; `wsl
  --shutdown` then reopen Ubuntu often fixes it.

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
