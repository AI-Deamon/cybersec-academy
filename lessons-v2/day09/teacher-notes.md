# Day 9 — Teacher Notes

**Teach from:** `day09.md` (deck + speaker notes).
**This file:** environment, cut-list, background, demo runbook, the `ai_snippet.py` answer key,
checkpoint, exit check, FAQ.

**This is a BUILD day.** The two things that matter are `sweep.sh` (adapted) and `scanner.py`
(built live). Keep the *language teaching* to the 5-blocks minimum — do not drift into "here
is Bash" / "here is Python" tutorials. If you're behind, cut the first-Bash "do it now" and
the Bash-vs-Python slide; never cut the two builds or the read-the-code exercise.

---

## Environment / prerequisites

- **Linux shell** (Day 6) — for Bash.
- **Python 3** — check with `python3 --version` (Linux/WSL/mac usually have it; Windows-native:
  `python` from the Microsoft Store or python.org, tick "Add to PATH"). This was Day 8
  homework; fix stragglers in the first 5 minutes — pair them up so nobody is stuck.
- **Ethics, stated out loud before the first scan:** `sweep.sh` and `scanner.py` target
  **only** `127.0.0.1`, the student's own machine, or the **class lab**. Scanning anything
  else is the "no scope, no test" line from Day 1. Say it; mean it.

---

## The analogy — the recipe card (kitchen)

- **a script** = a recipe card the kitchen follows without you standing over them
- **Bash** = quick notes to the line cooks — "do this, then that, for each of these"
- **Python** = a proper written recipe — measurements, and "if the sauce is thin, add flour"

---

## Must-teach vs. cut-if-short

**Never cut:**
- The **5 building blocks** (variables, `if`, `for`, run/IO, functions) — the frame for everything.
- Building **`scanner.py`** live (the socket port check).
- The **"read the code you didn't write"** exercise (`ai_snippet.py`).
- The artifact (both scripts committed with a usage comment).

**Cut in this order if behind:**
1. The first-Bash "do it now" (`check.sh`) → demo it on the projector instead.
2. The Bash-vs-Python slide → keep only the one-liner ("Bash to call tools, Python to build one").
3. The `sweep.sh` "count" adaptation → just run it as-is.
4. Half the Python-blocks slide (dicts) → variables/list/for/if/def is enough.

---

## Background

### Bash essentials (what students trip on)
- `var=value` — **no spaces** around `=`. Read with `$var` or `${var}`.
- `$(command)` — run it, substitute its output. (Old backtick form still seen; prefer `$(...)`.)
- `[ ... ]` (aka `test`) — **spaces required** inside. `-f` file exists, `-d` dir, `-z` empty
  string, `-n` non-empty, `-gt`/`-lt`/`-eq` numeric, `=`/`!=` string.
- **Exit codes:** every command returns 0–255; `0` = success. `$?` holds the last one.
  `A && B` runs B only if A succeeded; `A || B` runs B only if A failed.
- `$1 $2 ...` = positional arguments; `$#` = count; `$@` = all of them.
- **Quoting:** `"$var"` almost always (preserves spaces, prevents glob surprises).
- Loops: `for x in a b c; do ...; done` · `for i in $(seq 1 10)` · `while read line; do ...; done < file`.
- Shebang `#!/bin/bash` + `chmod +x` (Day 7) + `./script.sh`. Without `./` the shell won't find
  it (current dir not on PATH).

### `ping` flag portability
`ping -c1 -W1` is **Linux**. macOS `ping` uses `-t` for the give-up timeout and measures `-W`
in **milliseconds**; Windows `ping -n 1 -w 1000`. The class works in the Linux shell, so the
scripts assume Linux. A student running natively on macOS: `ping -c1 -t1`.

### Python essentials
- **Indentation defines blocks** — 4 spaces, consistent, no tabs-mixed-with-spaces. No `{}`,
  no `end`, no `;`.
- Types they need today: `int`, `str`, `list` `[...]`, `dict` `{k: v}`, `bool`.
- `f"text {expr}"` — f-string. `==` compares, `=` assigns. `%` is modulo.
- `def name(args):` … `return`. A function with no `return` returns `None`.
- `open("file")` → iterate lines: `for line in open("hosts.txt"): line.strip()`.
- `if __name__ == "__main__":` — "run this only when executed directly, not when imported."
- **stdlib for us:** `socket` (raw TCP), `subprocess` (run commands), `sys` (argv), `os`,
  `ipaddress`. **`requests` is NOT stdlib** — `pip install requests` (or use
  `urllib.request` which is built in).

### socket port check — how it actually works
`socket.socket()` → default `AF_INET, SOCK_STREAM` (IPv4 TCP). `settimeout(1)` so a filtered
port fails fast instead of hanging. `connect((host, port))` completes the TCP handshake
(Day 4!) → **open**. Raises `OSError` (`ConnectionRefusedError` = closed, `timeout` = filtered
or host down) → **closed**. Always `close()` (the `finally`) so you don't leak file
descriptors — the bug in `ai_snippet.py`.

---

## `ai_snippet.py` — answer key

What it does: tries to TCP-connect to ports 1–1024 on a host and prints the ones that accept.

What's wrong (there's more than one):
1. **`target = "8.8.8.8"`** — a hardcoded **external** IP (Google's DNS). Running this scans a
   third party without authorization — illegal. **This is the headline problem.**
2. **No `settimeout`** — a filtered/dead port makes `connect()` block for the OS default
   (often 20–130 s). 1024 ports → the "quick" scanner could run for hours.
3. **Sockets never closed** — no `s.close()`; every attempt leaks a file descriptor; long runs
   hit "Too many open files".
4. **Bare `except:`** — swallows *everything*, including `KeyboardInterrupt` (can't Ctrl-C
   cleanly) and real bugs you'd want to see.
5. Minor: `target` used as a global inside `check()`; no summary; `str(p) + " is open"` where
   an f-string is clearer.

Good answer = spots #1 and at least one of #2–#4, in the student's own words.

---

## Demo runbook

### Hook — `sweep.sh`
`./sweep.sh <class-lab-subnet>` (or `127.0.0` if the lab isn't reachable). 5–8 s, prints the
live hosts + a count. Don't explain — "by the end of class this is yours."

### Build `scanner.py` live (the centrepiece, ~11 min)
1. Start with just the function `is_open(host, port)` — type it, explain `settimeout` and the
   `try/except/finally`.
2. Test it in the REPL: `python3 -c "import scanner; print(scanner.is_open('127.0.0.1', 22))"`
   — or just add the loop.
3. Add the loop over `COMMON_PORTS`, run against `127.0.0.1`.
4. Run against the **class lab host** — now they see real open ports (DVWA 8080, Juice Shop
   3000, etc. — forward-ref Day 13).

### Expected output
```
scanning 127.0.0.1 ...
done                       # (nothing listening, or ssh if enabled)

scanning <lab-host> ...
  <lab>:80    OPEN
  <lab>:3000  OPEN
  <lab>:8080  OPEN
done
```

### Failure modes
| Symptom | Fix |
|---|---|
| `python3` not found (Windows) | `python`; or install from the Store; pair for today |
| `ping` in `sweep.sh` returns nothing even for the gateway | ICMP filtered on the network — demo against the lab host, or switch the sweep to a TCP check (`nc -z` / a tiny Python loop) |
| CRLF line endings (edited on Windows) → `bash\r: not found` | `sed -i 's/\r$//' *.sh` or `dos2unix`, or set the editor to LF |
| `scanner.py` hangs | missing `settimeout` — that's literally today's lesson about reading code |
| student points `scanner.py` at a real website | stop, restate Day 1 — localhost / own machine / class lab **only** |
| `[ $count -gt 5 ]` "unary operator expected" | unquoted empty var — use `[ "$count" -gt 5 ]` |

---

## Checkpoint (by end of class)

Each student can:
- [ ] name the 5 building blocks and point to each in `scanner.py`
- [ ] run `sweep.sh` against the lab and read the output
- [ ] explain what `s.connect()` returning vs. raising means (open vs closed)
- [ ] find at least one real problem in `ai_snippet.py`
- [ ] say when they'd reach for Bash vs Python

---

## Exit check (last 2 min)

1. In `for i in $(seq 1 254)`, what does `$(seq 1 254)` produce? — *the numbers 1 to 254, which
   the loop iterates over.*
2. `scanner.py` calls `s.connect((host, port))`. Port is closed — what happens? — *it raises
   `OSError`, our `except` catches it, we report "closed".*
3. An AI writes you a scanner and it "works". Why still read every line? — *"works" doesn't mean
   correct, safe, or scoped — it could hit the wrong host, hang, or hide errors.*

---

## FAQ

- **"Do I need to be good at programming for security?"** You need to *read* code fluently and
  write ~30-line tools. Deep software engineering is a different job. This is enough.
- **"Bash or Python first, long-term?"** Learn to read both. Write Python for anything you keep.
- **"Can I use ChatGPT/Claude to write my scripts?"** Yes — and you must be able to explain and
  fix every line. The homework `ai_snippet.py` exercise is exactly this skill.
- **"Why not just use `nmap`?"** We will (Day 13). Building the tiny version first means you
  understand what `nmap` is doing and why it's fast.
- **"PowerShell scripting?"** Same 5 blocks, `$var`, `if/foreach`, `function`. Day 8 showed the
  object pipeline; you can script it the same way. We focus on Bash+Python as the portable pair.
