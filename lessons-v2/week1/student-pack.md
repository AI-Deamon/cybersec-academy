# Week 1 — Student Pack

*Practical Cyber Security (v2) · Week 1: Building the foundation*

This one document covers all of Week 1: a recap per day, key terms, the in-class worksheets,
your daily homework, and the weekend assignment. Keep it open during class.

**Your course repo:** create one private Git repo (GitHub or GitLab) this week. Every class you
add three things — today's attack, today's defence, today's artifact. By Day 20 it's your
portfolio.

---

## Day 1 — What is this, where did it come from, and where's the line?

### Recap
- **Security** = a system doing what it should *while someone actively tries to make it do
  otherwise*. The attacker needs one open door; the defender must close them all.
- **Hacking** = understanding a system better than the person who built it. It's a skill, and
  it's neutral. The word began as a compliment at MIT in the 1960s.
- **Hacker vs cracker; white / grey / black hat.** The same technical action is lawful or
  criminal depending on **authorization**, not skill. Grey hat ("I wasn't being malicious") is
  still illegal.
- **Five events:** Morris Worm (1988), Kevin Mitnick (1990s), L0pht at the US Senate (1998),
  Stuxnet (2010), WannaCry/NotPetya (2017).
- **CIA triad** — Confidentiality, Integrity, Availability. Every incident is one or more of
  these failing.
- **The law (India):** IT Act §43 (civil — unauthorized access, no intent needed) and §66
  (criminal — dishonest/fraudulent access, up to 3 years / ₹5 lakh).
- **The rule:** *No scope, no test.*

### Key terms
`asymmetry` · `hacker` · `cracker` · `white/grey/black hat` · `confidentiality` · `integrity` ·
`availability` · `authorization` · `scope` · `bug bounty` · `VDP` · `IT Act §43` · `IT Act §66`

### In-class worksheet — breach analysis
Your pair gets one breach card. Fill in:

| | |
|---|---|
| Breach | |
| CIA pillar(s) that failed | |
| The weakness, in one sentence | |
| Attacker: authorized, or committing a crime? | |

### Homework (due start of Day 2)
1. Create your GitHub/GitLab account and the course repo.
2. `README.md` — two short paragraphs: **why** you're taking this course, and the sentence
   *"I will only test systems I am authorized to test."*
3. Read and **sign** the Authorization Pledge (below). Bring the signed copy.

### Authorization Pledge
> I understand that accessing or testing computer systems without authorization is unlawful
> under the Information Technology Act, 2000, regardless of intent or outcome. I will only test
> systems I am authorized to test — my own isolated lab, or systems for which I hold explicit
> written permission or a valid bug-bounty scope. I will report vulnerabilities responsibly and
> will not use anything taught in this course to cause harm.

Name: __________________  Roll no: __________  Signature: __________  Date: ______

---

## Day 2 — Inside the box: how a program actually runs

### Recap
- **Three parts that matter:** **CPU** (runs machine instructions one at a time, billions/sec,
  obediently), **RAM** (fast, small, wiped on power-off — holds what's running now), **disk**
  (slow, large, permanent — holds files when they're not running).
- **Program vs process:** a *program* is a file on disk; a *process* is that program loaded
  into RAM and running. One program → many processes. A process has a **PID**.
- **Source → running:** you write source code → a compiler turns it into machine code (an
  executable on disk) → the OS loads it into RAM and points the CPU at it → it's a process.
  (Interpreted languages: the interpreter is the running process reading your script.)
- **The OS is the referee:** it schedules the CPU between processes, gives each its own private
  RAM (and stops one process reading another's), and guards access to hardware.
- **User mode vs kernel mode:** your code runs with limits (user mode) and asks the OS kernel
  for privileged things (files, network) via **system calls**.
- **Why a bug can become control:** instructions and data share the same RAM. If attacker input
  can overwrite the stored value that tells the CPU *what to run next*, the attacker picks the
  next instruction. A "crash bug" and "attacker runs their code" are often the same flaw.
- **Defences (named):** process isolation, DEP/NX, ASLR, stack canaries, running as a limited user.

### Key terms
`CPU` · `RAM` · `disk / storage` · `volatile` · `machine code` · `compiler` · `executable` ·
`program` · `process` · `PID` · `heap` · `stack` · `return address` · `operating system` ·
`scheduling` · `memory isolation` · `user mode` · `kernel mode` · `system call` ·
`memory corruption` · `DEP/NX` · `ASLR` · `stack canary`

### Hands-on (in class)
Using `htop` (Linux) or Task Manager → Details (Windows):
1. Sort by memory; find your browser; note its **PID** and RAM.
2. Open ~10 tabs; watch the memory number climb.
3. In a terminal, start a process (`sleep 300` / `timeout /t 300`), find it, **kill it by PID**.
4. *(optional)* run `crash.py` and watch the OS kill just that one misbehaving process.

### Homework (due start of Day 3)
1. Draw the **source code → executable → running process** pipeline yourself; label where CPU,
   RAM and disk each come in.
2. One paragraph: **what is the difference between a program and a process?**
3. Commit both to your repo; update your README's "today I learned" list.

---

## Day 3 — *(to be added)*
## Day 4 — *(to be added)*
## Day 5 — *(to be added)*

---

## Weekend Assignment — Week 1

*Briefed at the end of Day 5. Submit one PDF before Monday (start of Day 6).*

### Part A — Integrate
Write the story of **what happens, end to end, when you log in to a website** — from pressing a
key to the server checking your password over an encrypted connection. Use the concepts from
Days 1–5 (data, how a program runs, packets, TCP/DNS/HTTP, TLS). One to two pages, your own
words, a diagram encouraged.

### Part B — R&D stretch (research something we did *not* cover)
Pick **one**:
- Explain **DNS-over-HTTPS (DoH)**: what problem it solves, and one reason it's controversial.
- Find **one real CVE** in a DNS server or a TLS library. In 3–4 sentences: what broke, and
  what an attacker could do.

### Part C — Hands-on evidence
Screenshots / command output from your own machine:
- your IP, MAC and default gateway;
- a `ping` and a `traceroute` to any public site;
- one web request viewed in your browser's DevTools → Network tab (show the request headers).

### Part D — Reflection
3–4 sentences: what clicked this week, and what's still fuzzy.

### Marking checklist (10 marks)
- [ ] Part A covers all five layers data → TLS, in the student's own words (3)
- [ ] Part A is coherent as a single story, not disconnected facts (1)
- [ ] Part B shows real research beyond class, correctly explained (2)
- [ ] Part C — all three pieces of evidence present and legible (2)
- [ ] Part D — a genuine reflection, not filler (1)
- [ ] Submitted as one PDF, on time (1)
