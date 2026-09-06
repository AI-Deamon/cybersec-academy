# Day 6 — Teacher Notes

**Teach from:** `day06.md` (deck + speaker notes).
**This file:** the environment prerequisite (read first), cut-list, background, demo runbook,
checkpoint, exit check, FAQ.

---

## PREREQUISITE — every student needs a Linux shell (from Day 6 on)

Days 6–10 all happen at a Linux shell. This is **separate from, and earlier than, the Day 12
target lab.** Set it up as Day 5 homework; expect to fix stragglers in the first 5 minutes of
Day 6.

Acceptable environments, easiest first:
- **Windows:** WSL2 (`wsl --install`, then Ubuntu) — free, native, best option.
- **A provided VM:** the class Ubuntu/Kali `.ova` (one image, no build).
- **The class Linux box:** one SSH account per student — the fallback for weak laptops /
  locked-down machines. A Chromebook can use this.
- **Not** Git Bash on Windows — too limited (`find`/`grep` behave oddly, no `/etc`).

If a student has nothing working by the start of Day 6, put them on the class box for the day
and sort the VM/WSL after.

---

## The analogy — still the kitchen

We're back inside one computer, so it's the kitchen again:
- **filesystem** = the whole building's storage laid out as one tree from the front door `/`
- **`/etc`** = the binder room — every setting, as plain text
- **`/var/log`** = the logbook shelf
- **the shell** = the order pad you write instructions on; each command is a staff member who
  does one job

---

## Must-teach vs. cut-if-short

**Never cut:**
- Paths: absolute vs relative, `.` `..` `~`.
- `pwd` / `ls` / `cd` (the orientation "do it now").
- `grep` (finds text) and `find` (finds files) and the difference.
- The pipe `|`.
- Starting the `linux-cheatsheet.md` artifact.

**Cut in this order if behind:**
1. `head` / `tail` detail → mention `tail -f` for logs and move on.
2. The `>` / `>>` redirection half of the pipes slide (the pipe itself is the point).
3. The "what a file is" slide → one sentence ("a named blob of bytes; no extension needed").
4. The find+grep "do it now" → fold into the pipe "do it now".

---

## Background for topics people get shaky on

### "Everything is a file"
Regular files, directories, symlinks, device nodes (`/dev/sda`, `/dev/null`), pipes, sockets,
and the synthetic `/proc` and `/sys` trees (kernel/process state as readable files) all present
the same `read`/`write` interface. Consequence for security: you inspect a live system by
*reading files* — `/proc/<pid>/cmdline`, `/proc/net/tcp`, `/etc/*`. Don't teach this today;
know it for questions.

### The filesystem hierarchy (FHS) — the ones that matter
| Path | What |
|---|---|
| `/bin`, `/usr/bin` | executables (commands) |
| `/etc` | system configuration — **plain text**, readable by all, writable by root |
| `/home/<user>` | a user's files; `~` expands to the current user's |
| `/root` | root's home (not `/`) |
| `/var` | variable data; `/var/log` = logs, `/var/www` = web content |
| `/tmp` | world-writable scratch; cleared on reboot; a classic place attackers drop tools |
| `/proc`, `/sys` | live kernel/process info as virtual files |
| `/dev` | device files |
| `/opt`, `/srv` | third-party / service data |

### Paths
- Absolute: begins with `/` — unambiguous from anywhere.
- Relative: resolved from `pwd`. `./script` runs a script *in the current dir* (the `.` is
  required — the current dir is not on `PATH`, for safety).
- `~` = `$HOME`; `~user` = that user's home.
- Tab-completion: press Tab to complete names — teach this, it prevents typos and teaches the tree.

### The shell
- The prompt is set by `$PS1`. `user@host:~$` — `$` = normal user, `#` = root (a useful tell).
- Word-splitting, glob(`*`, `?`, `[..]`), quoting (`"..."` keeps spaces, `'...'` is literal).
  Keep globbing to "`*` means any characters" today.
- `PATH` is the list of directories searched for a command; `which` / `type` show the result.
- `man` sections: `man 1 passwd` (command) vs `man 5 passwd` (file format) — mention only if asked.

### grep / find flags worth knowing (not memorising)
- `grep`: `-i` (ignore case), `-r` (recursive), `-n` (line numbers), `-v` (invert), `-c` (count),
  `-E` (extended regex).
- `find`: `-name`, `-iname`, `-type f|d`, `-size +1M`, `-mtime -1`, `-perm` (Day 7), `-exec`.

### Pipes & redirection
- `|` connects stdout of the left to stdin of the right.
- `>` truncates then writes; `>>` appends; `2>` redirects stderr; `2>&1` merges.
- `cut -d: -f1` — delimiter `:`, field 1. Used on `/etc/passwd` today, again Day 7 & 9.
- This is the model students carry into Day 9 (scripting) — a script is often just a saved pipe.

---

## Demo runbook

All commands today are **read-only** — nothing a student runs can damage the system. Say that
out loud early; it removes the fear.

### Fast tour (hook, 90 s)
`whoami` · `pwd` · `ls` · `date` · `uname -a` · `cat /etc/os-release`. No explanation — just
rhythm. "It answers when you ask it things."

### The four "do it now" beats — expected output
| Beat | Command | Expected |
|---|---|---|
| orient | `pwd`, `ls -la`, `cd /etc`, `cd` | prompt shows the path change; `ls -a` reveals `.bashrc` etc. |
| read | `cat /etc/os-release` | `NAME="Ubuntu"` etc. |
| | `wc -l /etc/passwd` | a number (20–40 on a fresh box) |
| find/grep | `find /etc -name "*ssh*"` | `/etc/ssh/ssh_config`, maybe `sshd_config` |
| | `grep -i port /etc/ssh/sshd_config` | `#Port 22` (commented = default) |
| pipe | `cat /etc/passwd \| grep -c bash` | a small number |
| | `cat /etc/passwd \| cut -d: -f1 \| sort` | usernames A–Z |

### Failure modes
| Symptom | Fix |
|---|---|
| no `/etc/ssh/sshd_config` | no SSH server installed — use `ssh_config`, or any file in `/etc` |
| `find` prints "Permission denied" lines | normal for a non-root user under `/etc` sub-dirs — the matches still print; add `2>/dev/null` to hide the noise |
| student on WSL sees Windows drives under `/mnt/c` | fine — tell them to work in the Linux home `~`, not `/mnt/c` |
| `less` "stuck" | they don't know `q` quits — tell them once, everyone hits this |
| copy-paste of `|` from slides fails | some terminals need Ctrl+Shift+V; or type it |

---

## Checkpoint (by end of class)

Each student can:
- [ ] say where they are (`pwd`) and get to their home and to `/etc` from anywhere
- [ ] read a file two ways (`cat` for short, `less` for long) and quit `less`
- [ ] use `grep` to find a line in a file and `find` to locate a file by name
- [ ] chain two commands with `|` to answer a counting question

---

## Exit check (last 2 min)

1. `find` vs `grep` — which finds a file called `config.yml`, which finds the word "config"
   inside files? — *`find` finds the file; `grep` finds the text.*
2. What does `cat access.log | grep 404 | wc -l` tell you? — *how many lines in the log
   contain "404".*
3. You're lost in the filesystem. One command to get home? — *`cd` (or `cd ~`).*

---

## FAQ

- **"Is the terminal a different program from my file manager?"** No — same files, same
  system. The GUI file manager and `ls` are two windows onto the same tree.
- **"Do I need to memorise all these commands?"** No. Memorise ~10 (your cheat-sheet); look up
  the rest with `man` / `--help`. That's the professional workflow.
- **"Will I break something?"** Not with today's commands — they only read. The dangerous ones
  (`rm`, `chmod`, `sudo`) are tomorrow, with guardrails.
- **"Why no drive letters like `C:`?"** Linux mounts every disk *into* the one tree (e.g. at
  `/mnt` or `/media`) instead of giving each its own letter.
- **"macOS terminal — same thing?"** Very close (both Unix). A few commands differ slightly
  (`ls` colours, no `/proc`). Fine to follow along; the VM/WSL is the reference.
- **"What shell am I using?"** `echo $0` or `echo $SHELL` — usually `bash` or `zsh`. Differences
  don't matter this week.
