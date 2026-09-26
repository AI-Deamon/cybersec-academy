# Day 9 — Explain + Demo Walkthrough
**Python Basics — a script is a Process wearing your badge**

Built to `prep/DEMO-GUIDE-STANDARD.md`. **Say** / **Do** / **Expect** / failure class (A=environment, B=permission, C=state, D=typo).

---

## Header

| | |
|---|---|
| **Runs on** | **WSL (Ubuntu).** Linux side. Day 8 was the Windows window — say out loud that you're switching back. |
| **Privilege** | Standard user. **Do not run as root** — the Slide 7 PermissionError demo depends on you being unprivileged. |
| **Setup** | Font 20+. Work in `~/day9demo` (Linux home — **never `/mnt/c`**, see standing WSL truth). Editor: `nano` is fine and less intimidating than `vim` for beginners. |
| **Metaphor thread** | Restaurant → Computer. A script is just **another employee (Process)** who clocks in wearing *your* badge. No new metaphor. |
| **Timing** | 20 min demo |

---

## Pre-flight (the day before)

```bash
bash prep/verify/day09-check.sh
```
All `[OK]`, exit 0. Then the rehearsal table:

| # | Command | Expected | ✓ |
|---|---|---|---|
| 1 | `python3 --version` | `Python 3.x.x` | ☐ |
| 2 | `whoami` | your username — **not `root`** | ☐ |
| 3 | `python3 whoami_script.py` | your username + `/home/you/day9demo` | ☐ |
| 4 | `python3 list_files.py` | the filenames in the folder | ☐ |
| 5 | `python3 denied.py` | `PermissionError: [Errno 13] ... '/etc/shadow'` | ☐ |
| 6 | `python3 permission_hunter.py` | 3 files listed, `leaky.txt` flagged as RISK | ☐ |
| 7 | `bash cleanup.sh` then re-run verify | clean, repeatable | ☐ |
| 8 | Connection Script lines aloud | didn't need to read | ☐ |

**Scheduled failure to rehearse:** row 5. If it *doesn't* fail, you're root — see Playbook B1. That is the single most likely thing to go wrong today.

---

## Before Slide 1 — Opening Hook (2 min)

**Say:** "Yesterday I closed the Linux window and we spent the day in PowerShell — ACLs, the local roster, Active Directory. Today we come back to Linux, and we stop *typing* commands one at a time.

Here's the actual reason. Yesterday I wrote eight lines of PowerShell that walked a set of folders and asked one question of each: *does 'Everyone' have Full Control?* Imagine doing that by hand across five thousand files. You wouldn't. You'd write it down once and let the machine repeat it.

That's what today is. Python isn't a new subject — it's the thing that lets everything you already know **scale**."

**Do — establish which window you're in:**
```bash
whoami
pwd
```
**Expect:** bare lowercase username, no backslash. Path like `/home/you`.
**Failure class:** A if you see a `machine\name` format — you're in PowerShell, not WSL.

**Say:** "Linux window. Bare username, no backslash, forward-slash path. Yesterday's window looked different. Always know which machine you're talking to — that's a habit, not a detail."

---

## Slide — Setup
**Do:**
```bash
mkdir -p ~/day9demo && cd ~/day9demo && pwd
```
**Expect:** `/home/you/day9demo`

**Say (say this, it matters on your setup):** "I'm working in my Linux home folder, not in the Windows drive. If I worked under `/mnt/c`, Linux permissions there are a translation, not the truth — and today's whole point is watching real permissions apply to a script. Right tool, right place."

---

## Slide — Concept: a script is a Process

**Say:** "Day 2, I told you a program becomes a **process** when it runs, and every process runs *as someone*. Day 7 and 8 you saw the OS enforce that. Today: a Python script is nothing more exotic than another process. It clocks in wearing **your** badge. It gets your rights — not more, not less.

That one sentence is worth the whole session, because it's why scripting is safe to learn *and* why malicious scripts are dangerous. A script can't do anything you couldn't do. But it can do everything you *can* do, thousands of times, in a second."

**Do — write it live, don't paste:**
```bash
nano whoami_script.py
```
Type in front of them:
```python
import os, getpass

print("I am running as :", getpass.getuser())
print("I am running in :", os.getcwd())
```
`Ctrl+O`, `Enter`, `Ctrl+X`. Then:
```bash
python3 whoami_script.py
```
**Expect:**
```
I am running as : yourname
I am running in : /home/yourname/day9demo
```
**Failure class:** D (indentation/typo) — see Playbook D1.

**Say:** "Four lines. And look at the answer — it printed *my* name, because the script is me. It didn't get its own identity. Compare to Day 7: when `bug` ran a command, the command was `bug`. Same rule, no exceptions for scripts.

`import` at the top means 'borrow a toolbox someone already built.' `os` is the toolbox for talking to the operating system. That's the entire concept of a library."

---

## Slide — Loops: doing one thing many times

**Say:** "This is the idea that makes automation possible, and it's genuinely simple: *do this, for each of those.*"

**Do:**
```bash
nano list_files.py
```
```python
import os

for name in sorted(os.listdir('.')):
    print(name)
```
```bash
python3 list_files.py
```
**Expect:** the filenames in `~/day9demo`, alphabetically.

**Say:** "`os.listdir('.')` is `ls` — it hands back a list. `for name in ...` says: take them one at a time, call it `name`, and do the indented thing.

**The indentation is not decoration.** That indent is how Python knows what's inside the loop. Other languages use curly braces; Python uses whitespace. It will bite you, and when it does, count your spaces first."

**Say (the bridge to make explicit):** "You just wrote `ls`. But you can put *anything* inside that loop — and now you're doing something `ls` can't."

---

## Slide — Reading a file, and hitting the key cabinet — **the critical beat, 6 min**

**Do — part 1, a file you own:**
```bash
echo "This is my own file." > myfile.txt
nano read_file.py
```
```python
with open('myfile.txt') as f:
    print(f.read())
```
```bash
python3 read_file.py
```
**Expect:** `This is my own file.`

**Say:** "`with open(...)` opens the file and closes it for you when the block ends — so you can't forget. Reading a file you own: works, no drama."

**Do — part 2, the scheduled failure:**
```bash
nano denied.py
```
```python
try:
    with open('/etc/shadow') as f:
        print(f.read())
except PermissionError as e:
    print("PermissionError:", e)
```
```bash
python3 denied.py
```
**Expect:**
```
PermissionError: [Errno 13] Permission denied: '/etc/shadow'
```
**Failure class:** B — intentional. **If it does NOT fail, you are root → Playbook B1.**

**Say — this is the sentence of the day:** "There it is. Errno 13, permission denied.

Now think about what just happened. On Day 7, `bug` typed `cat /etc/shadow` and got refused. Yesterday I asked for the SAM file in PowerShell and got refused. Just now, a *program* asked — and got refused in exactly the same way.

The OS does not care whether a human typed it or a script asked. It checks identity and rights, every single time. **The script gets no special pass.** That's the key cabinet from Day 6, still doing its job on Day 9.

And notice `try / except`: I *predicted* the failure and handled it. That's not defensive typing, that's the professional habit — real tools run across systems where some things will be denied, and they must keep going instead of crashing."

---

## Slide — The payoff: automating a real security check (**the practical beat — 6 min**)

**Say:** "Everything so far was warm-up. Here's the actual job.

Day 7: I set a file to `777` and told you every account on the machine now holds a key. Day 8: I hunted for the Windows twin, `Everyone: Full Control`. Both times, by hand, on a handful of files. Now we do it properly."

**Do — build the test ground first (be transparent about it):**
```bash
mkdir -p scan_demo
echo "secret=hunter2" > scan_demo/config.txt && chmod 600 scan_demo/config.txt
echo "notes"         > scan_demo/public.txt && chmod 644 scan_demo/public.txt
echo "oops"          > scan_demo/leaky.txt  && chmod 777 scan_demo/leaky.txt
ls -l scan_demo
```
**Expect:** three files, `600` / `644` / `777`.

**Say:** "Three files. One locked down, one normal, one with the mistake from Day 7 deliberately planted. I know which is bad because I put it there. Now — can I get a program to find it *without* being told?"

**Do — the hunter:**
```bash
nano permission_hunter.py
```
```python
import os, stat

TARGET = "scan_demo"
findings = 0

for name in sorted(os.listdir(TARGET)):
    path = os.path.join(TARGET, name)
    mode = os.stat(path).st_mode
    perms = stat.filemode(mode)
    octal = oct(mode & 0o777)[2:]

    world_writable = bool(mode & stat.S_IWOTH)
    flag = "  <-- RISK: world-writable" if world_writable else ""
    if world_writable:
        findings += 1
    print(f"{perms}  {octal}  {name}{flag}")

print(f"\nScanned {len(os.listdir(TARGET))} files, {findings} risk(s) found.")
```
```bash
python3 permission_hunter.py
```
**Expect (verified output):**
```
-rw-------  600  config.txt
-rwxrwxrwx  777  leaky.txt  <-- RISK: world-writable
-rw-r--r--  644  public.txt

Scanned 3 files, 1 risk(s) found.
```
**Failure class:** D (indentation). Type it slowly; the `if` inside the `for` is where people slip.

**Say — take your time here:** "Found it. And I never told it which file was bad.

Look at what the loop is doing, because this is a real security tool in miniature: for each file, ask the OS for its permission bits, then ask one question — *can anyone on this machine write to it?* That's `S_IWOTH`: the write bit, for 'other'. The last `7` in `777`.

You have now written a vulnerability scanner. A small one, but the shape is exactly right. On **Day 14** we run professional scanners across a whole network, and when you see their output I want you to remember this screen — because they are doing this, with more checks and better reporting. Same loop. Same question. Bigger list.

And the honest flip side: an attacker writes the same loop. Identical code. The only difference is what you do with the finding. That's Day 1's ethics, showing up as a practical matter — the tool doesn't decide, you do."

---

## Slide — The forensic habit
**Say:** "Same question, fourth day running: **as WHICH identity, with WHICH rights?** Today it applies to code. Before you run any script — including one you copied off the internet — ask what it can reach *as you*. If you're root, the answer is everything."

**Do — cleanup, on camera:**
```bash
cd ~ && rm -rf ~/day9demo && ls ~ | grep day9demo || echo "day9demo removed"
```
**Expect:** `day9demo removed`

**Say:** "Gone — files, scripts, and the deliberately broken `777` file. Never leave a planted vulnerability lying around, even a fake one on your own machine. Same instinct as Day 7's `userdel` and Day 8's `Remove-Item`. Three days, same habit."

---

## Slide — Hand off to the lab
**Say:** "Three tasks and you've watched a bigger version of each. One: a script that prints where it's running — proving it runs as you. Two: `os.listdir` in a loop. Three: open a file you own and read it.

Standard library only. Read-only. Your own folder. And the Day 1 rule with teeth today: **never run a script you don't understand.** You can read Python now — so read it first. Go."

---

## Failure Playbook

| Symptom | Class | Why | **What you SAY** | Fix |
|---|---|---|---|---|
| **B1** `denied.py` **succeeds** and prints the shadow file | B | **You are running as root.** Biggest risk today | "Well — that worked, and it absolutely should not have. Which tells you exactly one thing: I'm running as root. Watch." → `whoami`, then re-run as normal user | `exit` to normal user; permanently: `sudo useradd -m you; ...` or set default user in `/etc/wsl.conf`. **Verify script checks this.** |
| **A1** `python3: command not found` | A | Python not installed in this distro | "Not installed here — normal on a minimal image. Note this: *never assume a tool exists on a target machine.* That's a real assessment lesson." | `sudo apt update && sudo apt install -y python3` — **do before class, not during** |
| **A2** `python --version` gives Python 2 | A | Legacy alias | "Two Pythons existed for years. Always say `python3` explicitly." | Use `python3` everywhere |
| **D1** `IndentationError` / `TabError` | D | Mixed tabs and spaces | "Python is counting my whitespace, and I've been inconsistent. This will happen to you — it's the number-one beginner error, and it's always this." | In nano use **spaces only**, 4 per level. Retype the block. |
| **D2** `SyntaxError` on the f-string line | D | Python < 3.6, or a mistyped quote | "Let me check my Python version — f-strings need 3.6+." | `python3 --version`; fall back to `print(perms, octal, name, flag)` |
| **C1** `scan_demo` already exists with old files | C | Previous rehearsal | "Left over from rehearsal — which is why cleanup is on camera." | `rm -rf ~/day9demo` and restart the block |
| **A3** `chmod 777` appears not to stick | A | **You are under `/mnt/c`** — WSL fakes permissions on Windows drives | "Look at this — I set 777 and it didn't take. That's because I'm on the Windows drive, and Linux permissions there are a polite fiction. This is a genuine WSL gotcha worth knowing." | `cd ~` — **never demo permissions on `/mnt/c`** |
| **A4** `nano: command not found` | A | Minimal image | "No nano. Fine — `vi`, or I'll write it with `cat`." | `sudo apt install -y nano`, or use `cat > file.py <<'EOF'` |
| **D3** Pasted code loses indentation | D | Terminal auto-indent in nano | "Paste mangled my indentation — I'll type it." | `nano -i` off, or type it live (better anyway — students follow) |
| **A5** Output shows Windows-style paths | A | Wrong window | "Wrong window — that's PowerShell. Today is the Linux side." | Switch windows; announce which one you're in |

---

## The Connection Script — say all three

- **Backward:** "Day 2 said every process runs as someone. Day 7 the OS refused `bug`. Day 8 it refused me at the SAM file. Today it refused my *script* — same rule, no exception for code."
- **Forward:** "Day 14, professional scanners do exactly what `permission_hunter.py` does, at network scale. Day 16, the attacker's version of this loop looks for the same mistakes."
- **Career:** "Writing small tools that check many systems for one weakness is the daily work of a **security automation / detection engineer**. If you liked this more than the theory, that's a strong signal — it's the highest-leverage skill in both Red and Blue teams, and it's the one that separates a button-clicker from an engineer."

---

## Timing budget

| Segment | Min | Cut order |
|---|---|---|
| Opening hook + window check | 2 | Never cut the window check (30s) |
| `whoami_script.py` | 3 | Never cut — establishes the core idea |
| Loop / `list_files.py` | 2 | Cut third |
| Read own file | 2 | Cut second |
| **PermissionError demo** | **3** | **Never cut** — it's the spine of Days 6–9 |
| **`permission_hunter.py`** | **6** | **Never cut** — the practical payoff students explicitly asked for |
| Cleanup | 1 | Never cut |

**If you have 10 minutes:** `whoami_script.py` → `denied.py` → `permission_hunter.py` → cleanup. Drop the loop and read-own-file beats; the hunter teaches loops anyway, in context.
