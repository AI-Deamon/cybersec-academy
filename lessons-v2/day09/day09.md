---
marp: true
theme: dark-monospace
paginate: true
title: "Day 9 — Scripting for Security"
footer: "Practical Cyber Security (v2) · Week 2 · Day 9"
---

<!-- _class: lead -->

# Scripting for security
## Day 9 — Bash to glue, Python for logic — and you build a scanner

**Week 2 · Understanding the operating system**

<!--
RUN SHEET (~85 min). This is a BUILD day — hands-on is most of it.
00:00 Journey check + hook (sweep.sh running)                 4
00:04 Why script + the 5 building blocks                      7
00:11 Bash: your first script                                 8
00:19 DO: write a 5-line Bash script                          7
00:26 Bash: the ping sweep, line by line                      7
00:33 DO: run + adapt sweep.sh                                8
00:41 Python: the same 5 blocks                               9
00:50 DO: build scanner.py (socket port check)               11
01:01 Bash vs Python — when to use which                      4
01:05 Reading code you didn't write (the LLM trap)            6
01:11 Attack <-> defence                                      5
01:16 Wrap + artifact + homework                              4
CUT FIRST IF SHORT: the "first Bash script" DO (demo it instead); the bash-vs-python slide.
NEVER CUT: the 5 building blocks, building scanner.py, the "read the code" exercise, the artifact.
ANALOGY (kitchen): a script = a recipe card the kitchen follows without you standing there.
Bash = quick notes to the line cooks. Python = a proper recipe with measurements and "if" logic.
ETHICS: the scanner targets ONLY localhost / your own lab subnet / the class lab. No scope, no scan.
PREREQ: Python 3 installed (set up as Day 8 homework); Linux shell from Day 6.
-->

---

## Where we are

- **This week:** Linux, Windows — you've been typing commands **one at a time**.
- **Today:** write them down **once**, run them **forever**. Bash and Python.
- **You'll leave with a scanner** you use for real in Week 3.
- **Tomorrow:** security thinking — the vocabulary that ties Weeks 1–2 to attack and defence.

<!--
Journey Check. Frame: today is a skill multiplier. Everything slow you did this week becomes
one command you keep.
-->

---

## Hook — 60 lines of typing → one command

```
$ ./sweep.sh 10.0.0
10.0.0.1 up
10.0.0.14 up
10.0.0.23 up
```

That's a `ping` to 254 addresses, done in 8 seconds, that you never have to type again.

<!--
Run the provided sweep.sh against the class lab subnet. Don't explain it yet — that's 3 slides away.
"By the end of class this file is yours and you understand every line."
-->

---

## Why script — and the 5 building blocks

**If you do it twice, script it.** Attackers automate everything; defenders automate the
response. Same skill.

Every language has the **same 5 pieces**:

1. **variables** — remember a value
2. **conditionals** — `if` this, do that
3. **loops** — do this for each of those
4. **run commands / read-write data** — talk to the system
5. **functions** — name a chunk of steps, reuse it

<!--
This is the whole lesson's frame. Bash and Python are just two spellings of these 5 ideas.
Don't teach "a language" — teach the 5 blocks, twice.
-->

---

## Bash — your first script

```bash
#!/bin/bash                        # 1. shebang: "run me with bash"
target="scanme.local"              # 2. variable  (no spaces around =)
count=$(ls | wc -l)                # 3. $(...) = run a command, capture output

for name in alice bob carol; do    # 4. loop over a list
  echo "hello $name"
done

if [ "$count" -gt 5 ]; then        # 5. conditional
  echo "lots of files"
fi
```

`chmod +x script.sh` (Day 7!) then `./script.sh`. Exit code: `echo $?` — **0 = success**.

<!--
Gotchas to say out loud: NO spaces around `=`. `$var` to read, `var=` to set. `[ ... ]` needs
spaces inside. `$(...)` is the modern command substitution.
Exit codes: every command returns one; 0 = ok, non-zero = failed. Scripts chain on this.
-->

---

## Do it now — a 5-line Bash script

```bash
#!/bin/bash
for f in /etc/passwd /etc/hosts /etc/nonexistent; do
  if [ -f "$f" ]; then
    echo "$f exists"
  else
    echo "$f MISSING"
  fi
done
```

Save as `check.sh`, `chmod +x`, run it. Then change the file list.

<!--
7 min. `-f` = "is a regular file". Everyone should get this running. Common errors: forgot
chmod +x; forgot ./ ; CRLF line endings on Windows (dos2unix / save as LF).
CUT this DO first if short — demo it on the projector instead.
-->

---

## Bash — the ping sweep, line by line

```bash
#!/bin/bash
subnet="$1"                              # first argument, e.g. 10.0.0
for i in $(seq 1 254); do                # loop 1..254
  ping -c1 -W1 "$subnet.$i" &>/dev/null \
    && echo "$subnet.$i up"              # && = only if ping succeeded
done
```

- `$1` — the argument you pass (`./sweep.sh 10.0.0`)
- `seq 1 254` — generates the numbers
- `ping -c1 -W1` — one packet, wait 1 second
- `&>/dev/null` — throw away ping's output; `&&` — run the echo only on success

<!--
This IS the hook script. Walk every token. The `&&` chaining on exit codes is the key idea.
Note it's serial (slow-ish); a `&` after the ping backgrounds each = parallel = fast — mention,
optional.
-->

---

## Do it now — run + adapt `sweep.sh`

```
./sweep.sh 127.0.0            # loopback — safe, boring
./sweep.sh <your-lab-subnet>  # the class lab only
```

Then adapt it: make it also print a **count** of hosts that were up.

<!--
8 min. ETHICS, say it: only scan your own machine or the class lab. Scanning networks you
don't own is exactly the "no scope, no test" line from Day 1.
The "count" tweak: add `up=0` before the loop, `up=$((up+1))` on success, `echo "$up hosts up"` after.
-->

---

## Python — the same 5 blocks

```python
target = "scanme.local"            # variable — no $, no ;
names  = ["alice", "bob", "carol"] # a list
ports  = {"web": 80, "ssh": 22}    # a dict (key -> value)

for name in names:                 # loop — indentation matters!
    print(f"hello {name}")

if 22 in ports.values():           # conditional
    print("ssh is in the list")

def is_even(n):                    # function
    return n % 2 == 0
```

`import socket` · `import subprocess` — **built in** (network, running commands).
`import requests` — HTTP, but you install it first: `pip install requests`.

<!--
The big Python gotcha: INDENTATION defines blocks (no braces, no `end`). 4 spaces. Mixing
tabs/spaces = error.
`f"...{x}..."` = f-string (formatting). `==` compares, `=` assigns.
Don't teach classes/decorators/anything else. These 5 blocks + import.
-->

---

## Do it now — build `scanner.py`

```python
import socket

def is_open(host, port):
    s = socket.socket()
    s.settimeout(1)
    try:
        s.connect((host, port))
        return True
    except OSError:
        return False
    finally:
        s.close()

host = "127.0.0.1"
for port in [22, 80, 443, 3000, 8080]:
    state = "OPEN" if is_open(host, port) else "closed"
    print(f"{host}:{port} {state}")
```

<!--
11 min — the centrepiece. Build it up live: first the function, then the loop.
socket.connect raises OSError if refused/filtered/timeout -> that's our "closed".
Run against 127.0.0.1 (safe). Then the class lab host. NOT anything else.
This file is the Week 3 scanner — they extend it Day 13.
-->

---

## Bash or Python?

| Use **Bash** when... | Use **Python** when... |
|---|---|
| gluing existing commands together | there's real logic or branching |
| a quick one-off / throwaway | you parse or transform data |
| it's basically a saved pipe (Day 6) | you'll reuse or share it |
| ~10 lines | it's growing past ~30 lines |

Rule of thumb: **Bash to *call* tools, Python to *build* one.**

<!--
CUT FIRST IF SHORT. The rule of thumb is the keeper.
-->

---

## Reading code you didn't write

An LLM will write you a script in seconds. **That's fine — but you own what you run.**

The test: **can you explain every line?** If not, you can't tell when it's wrong, unsafe, or
doing more than you asked.

*(walk the `assets/ai_snippet.py` together — what does it do? what's the bug?)*

<!--
6 min. This is the Day 9 trap. Generated code that "works" can still: hit the wrong host,
have an off-by-one, swallow errors, or do something extra. The skill we're building is
READING, not memorising syntax.
ai_snippet.py: a plausible port scanner with a bug (e.g. range(1,1024) but never closes
sockets / wrong variable / scans a hardcoded external IP). Find it together.
-->

---

## Attack ↔ Defence — automation cuts both ways

| Attackers automate | Defenders automate |
|---|---|
| password spray / credential stuffing loops | log parsers that flag failed-login bursts |
| mass port & vuln scanners | scheduled scans of your own estate |
| data exfil scripts, C2 beacons | auto-block / auto-isolate on an alert (SOAR) |
| phishing-kit deployment | takedown + IOC-sweep scripts |

Same five building blocks. The direction is the only difference.

<!--
Reinforce the course's spine: every offensive capability has a defensive mirror. Scripting is
the clearest example — a SOC analyst and a pentester write very similar code.
-->

---

## Today's attack / defence / artifact

- **Attack:** a 20-line loop scans a whole network, sprays a password list, or beacons out —
  fast, tireless, cheap.
- **Defence:** the same 20 lines parse logs, sweep for an IOC, or auto-contain a host.
- **Artifact:** **`scanner.py` + `sweep.sh`**, committed, each with a one-line usage comment.

---

## Homework

1. Commit `scanner.py` and `sweep.sh` with a `# usage:` comment at the top of each.
2. Extend `scanner.py`: read the target host(s) from a file `hosts.txt` instead of hardcoding
   `127.0.0.1`. (Hint: `open("hosts.txt")` and a loop.)
3. Read `assets/ai_snippet.py`. Write 2–3 sentences: what does it do, and what's wrong with it?
4. Add `for`, `if`, `def`, `import`, `socket`, `$(...)`, `chmod +x` to your cheat-sheet.

<!--
Due start of Day 10. Only test against localhost / the class lab.
-->

---

<!-- _class: lead -->

## Recap

1. **Five building blocks** — variables, `if`, `for`, run/IO, functions — in every language.
2. **Bash to call tools, Python to build one.**
3. **You own what you run.** Generate code if you like — then read every line.

<!--
Say the three lines. Tomorrow: security thinking — CIA revisited, threats/vulns/risk, threat
actors, attack surface — the vocabulary that turns "I can use Linux" into "I can reason about
what an attacker would do."  + Week 2 assignment brief.
-->
