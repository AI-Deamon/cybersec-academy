---
marp: true
theme: dark-monospace
paginate: true
title: "Day 6 — Linux I: Files, the Tree, and the Shell"
footer: "Practical Cyber Security (v2) · Week 2 · Day 6"
---

<!-- _class: lead -->

# Linux I
## Day 6 — Files, the filesystem tree, and moving around the shell

**Week 2 · Understanding the operating system**

<!--
RUN SHEET (~85 min). Hands-on INTERLEAVED — this is a skills day, keep them typing.
00:00 Journey check + hook (fast tour of a shell)              4
00:04 Why Linux                                                4
00:08 What a file actually is                                  5
00:13 The filesystem tree + paths                              7
00:20 DO: pwd / ls / cd — get oriented                         6
00:26 The shell — what it actually is                          6
00:32 Reading files: cat / less / head / tail / wc             7
00:39 DO: read real files                                      6
00:45 Finding things: find and grep                            8
00:53 DO: find + grep                                          6
00:59 Pipes & redirection — the superpower                     9
01:08 DO: build a one-liner                                    6
01:14 Attack <-> defence                                       5
01:19 Wrap + cheat-sheet + homework                            5
CUT FIRST IF SHORT: head/tail detail; the redirection ( > >> ) half of the pipes slide.
NEVER CUT: paths (absolute/relative, . .. ~), pwd/ls/cd, grep, pipes, the cheat-sheet artifact.
ANALOGY (kitchen — we're back inside one computer): the filesystem = the whole building's
storage as one tree from the front door `/`. The shell = the order pad you write instructions on.
PREREQ: every student must be at a Linux shell — WSL / a provided VM / the class Linux box.
This was set up as Day 5 homework; fix stragglers in the first 5 minutes.
-->

---

## Where we are

- **Week 1:** the machine, the network, the web, crypto.
- **Week 2:** the **operating system** — the referee that decides *who can do what*.
- **Today:** Linux — getting comfortable moving around and reading.
- **Tomorrow:** Linux permissions — the "who can do what" itself.

<!--
Learning Journey Check. Callback to Day 2: "the OS as referee" — this week we go and meet it.
-->

---

## Hook — this is where the work happens

Every hands-on thing in Weeks 3–4 — recon, scanning, exploitation — happens **here**:

```
user@lab:~$ whoami
user@lab:~$ ls
user@lab:~$ cat notes.txt
```

Today: you stop being scared of the black window.

<!--
Type a few commands live, fast, no explanation. Just show it's not mystical — it's a program
waiting for you to tell it what to do. Reassure: "by Friday this feels normal."
-->

---

## Why Linux

- Most **servers**, **cloud**, and **containers** run Linux.
- Almost every **security tool** is built for it first.
- It's **free and open** — you can see and change everything.
- The **shell** is the real interface — faster and scriptable (Day 9).

<!--
Not a Linux-vs-Windows fight (Windows is Day 8). Just: this is where the industry lives, so
this is where we work.
-->

---

## What a file actually is

A **file** is just a **named sequence of bytes** stored on disk.

- In Linux, **"everything is a file"** — your documents, your keyboard, your disk, even
  directories are represented as files.
- **No extension required.** `report` and `report.txt` are equally valid. A file's *type* comes
  from its **content**, not its name (`file report` tells you what it really is).

<!--
This is the "files" concept deferred from Day 2. Keep it short.
The "everything is a file" idea matters later: reading /dev/... , /proc/... is how you inspect
a running system. Don't go deep now — just plant it.
Windows contrast (one line): Windows leans on extensions (.exe, .docx) to decide what a file is.
-->

---

## The filesystem tree

One root: **`/`**. Everything hangs off it.

```
/
├── bin    core programs (ls, cat, ...)
├── etc    system config (text files!)
├── home   users' folders   -> /home/you
├── var    changing data — logs live in /var/log
├── tmp    scratch space, wiped on reboot
└── root   the admin's home
```

**Paths** = addresses. Absolute starts at `/`. Relative starts from where you are.
`.` = here · `..` = up one · `~` = your home.

<!--
Analogy: the whole building's storage as one tree from the front door. /etc = the binder room
(all config, as plain text — a recurring theme). /var/log = the logbook shelf.
Draw the tree on the board and leave it up.
-->

---

## Do it now — get oriented

```
pwd              where am I?          (print working directory)
ls               what's here?
ls -l            ... with details
ls -a            ... including hidden (dot) files
cd /etc          go somewhere absolute
cd ..            up one
cd               (or cd ~)  home
```

<!--
6 min. Walk the room. Everyone should be able to say where they are and get home from anywhere.
Common confusion: `cd` with no argument goes home; hidden files start with `.`
-->

---

## The shell — what it actually is

A **program** that: reads a line → finds the command → runs it → shows the output → waits for
the next line.

```
user@host:~/notes$ ls -l
└┬─┘ └┬─┘ └──┬──┘ └─┬─┘
 you host  where   what you typed
```

- Commands are **programs on disk** — `which ls` shows you where `ls` lives.
- Stuck? `man ls` or `ls --help`.

<!--
Demystify: the shell (bash / zsh) is just another program (Day 2: a process with a PID). The
"magic words" are executable files in /bin, /usr/bin. `which` proves it.
Teach `man` / `--help` now — per the course standard, we don't memorise flags, we look them up.
-->

---

## Reading files

| Command | Use it for |
|---|---|
| `cat file` | dump a short file to the screen |
| `less file` | page through a long file (`q` to quit, `/` to search) |
| `head -n 20 file` | first 20 lines |
| `tail -n 20 file` | last 20 lines · `tail -f` follows a live log |
| `wc -l file` | count lines |

<!--
`less` is the one to push — safe for huge files, searchable. `cat` a 2 GB log = bad day.
`tail -f /var/log/...` (follow) is a preview of Day 19 (watching logs live).
CUT head/tail detail first if short.
-->

---

## Do it now — read real files

```
cat /etc/os-release            which Linux is this?
less /etc/services             ports <-> names (Day 3!) — press q to quit
wc -l /etc/passwd              how many accounts?
head -n 5 /etc/passwd          look at the format
```

<!--
6 min. /etc/services is a nice callback to Day 3 ports. /etc/passwd format preview for Day 7.
Nobody breaks anything — all read-only.
-->

---

## Finding things — `find` vs `grep`

- **`find`** — locate **files** by name, type, size, age:
  ```
  find /etc -name "*.conf"
  find . -type f -size +1M
  ```
- **`grep`** — search **inside** files for **text**:
  ```
  grep "PermitRootLogin" /etc/ssh/sshd_config
  grep -r "password" .        (recursive)
  grep -i "error" app.log     (case-insensitive)
  ```

**find = which file. grep = what's in it.**

<!--
This is the distinction students blur. `find` walks the tree matching metadata; `grep` reads
contents matching a pattern. Both are everyday tools for the rest of the course.
`grep -r` and `-i` are the two flags worth knowing.
-->

---

## Do it now — find + grep

```
find /etc -name "*ssh*"                 where's the ssh config?
grep -i "port" /etc/ssh/sshd_config     what port is sshd set to?
grep bash /etc/passwd                   which accounts use the bash shell?
```

<!--
6 min. If /etc/ssh/sshd_config doesn't exist (no ssh server installed), use
/etc/ssh/ssh_config or any file in /etc. The point is the tool, not the specific file.
-->

---

## Pipes & redirection — the superpower

**`|`** — feed one program's output straight into the next:

```
cat /etc/passwd | grep bash | wc -l      how many bash users?
ls -l /etc | sort -k5 -n | tail          the biggest files in /etc
history | grep ssh                        every ssh command I've run
```

**`>`** write output to a file (overwrite) · **`>>`** append · small tools, combined, do big jobs.

<!--
THE big idea of Unix: many tiny sharp tools + a pipe. Each program does one thing; you compose.
This is also how attackers and defenders both work — chains of small commands.
CUT the > >> half first if short — the pipe is the must-teach.
-->

---

## Do it now — build a one-liner

Answer a question with a pipe:

```
cat /etc/passwd | grep -c bash          count bash-shell accounts
ls /usr/bin | wc -l                     how many programs are installed?
cat /etc/passwd | cut -d: -f1 | sort    every username, alphabetical
```

<!--
6 min. Let them try their own combos. `cut -d: -f1` = "split on colon, take field 1" — nice
to introduce here, used again Day 7 and Day 9.
-->

---

## Attack ↔ Defence

| Attack | Defence |
|---|---|
| `grep -r` for `password` / API keys left in files | never store secrets in plain files; use a secrets manager |
| read your shell **history** for typed passwords | don't type secrets as arguments; `history -c`; use env/prompts |
| `find / -name "*.conf"` / world-readable secrets to map a system | least privilege on files (**tomorrow**); `/etc` readable but not writable |
| `tail -f` logs an admin left readable | restrict `/var/log`; ship logs off the box |

<!--
Everything an attacker does after getting a shell starts with exactly today's commands —
ls, cat, grep, find — to understand where they landed. That's why we learn them first.
Forward-ref Day 7 (permissions) and Day 13 (post-shell enumeration).
-->

---

## Today's attack / defence / artifact

- **Attack:** a shell + `ls`/`cat`/`grep`/`find` is how an intruder maps a machine they just landed on.
- **Defence:** least privilege on files (Day 7), no secrets in files or shell history, logs shipped off-box.
- **Artifact:** your `linux-cheatsheet.md` — 15 commands, one line each. Start it now.

---

## Homework

1. Finish `linux-cheatsheet.md` — **15 commands**, one line of what each does. Commit it.
2. Scavenger hunt (write the command + the answer):
   - How many user accounts have `/bin/bash` as their shell?
   - What is the largest file under `/var/log`?
   - Which line of `/etc/ssh/sshd_config` mentions `Port`?
3. Make sure your Linux shell still works — you need it every day this week.

<!--
Due start of Day 7. Checklist grading in the week-2 student pack.
-->

---

<!-- _class: lead -->

## Recap

1. **One tree from `/`.** Paths are addresses: `.` here, `..` up, `~` home.
2. **The shell is just a program** running other programs — `man` and `--help` are your friends.
3. **Tiny tools + pipes.** `grep` finds text, `find` finds files, `|` chains them.

<!--
Say the three lines. Tomorrow: the permission bits on every one of those files — who may read,
write, and run them. The "who can do what" at the centre of security.
-->
