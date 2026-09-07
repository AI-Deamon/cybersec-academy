# Week 2 — Student Pack

*Practical Cyber Security (v2) · Week 2: Understanding the operating system*

> **Formative quiz:** `week2/quiz.md` — 10 questions, self-check. Do it before the weekend assignment.

The lens all week: **"who can do what"** — the access-control question at the centre of security.
Keep this open in class. Same course repo — an attack, a defence, and an artifact every day.

**Prerequisite:** you need a **Linux shell** every day this week. Set one up before Day 6:
- **Windows:** `wsl --install` then install Ubuntu (best option).
- **A provided VM:** import the class Ubuntu/Kali image.
- **The class Linux box:** SSH in with your account (fallback for any laptop).
- *Not* Git Bash — too limited.

---

## Day 6 — Linux I: files, the tree, and the shell

### Recap
- A **file** is a named sequence of bytes. In Linux, **"everything is a file"** (documents,
  devices, directories). **No extension needed** — content decides type (`file <name>`).
- **One tree from `/`.** Key branches: `/bin` (programs), `/etc` (config, plain text),
  `/home/you` (`~`), `/var/log` (logs), `/tmp` (scratch, wiped on reboot), `/root` (admin home).
- **Paths** are addresses. **Absolute** starts at `/`; **relative** starts from where you are.
  `.` = here, `..` = up one, `~` = home.
- The **shell** is a program: reads a line → runs the command → shows output → waits. Commands
  are programs on disk (`which ls`). Look things up with `man` / `--help`. **Tab completes names.**
- **Reading:** `cat` (short files), `less` (long — `q` quits, `/` searches), `head`/`tail`
  (`tail -f` follows a live log), `wc -l` (count lines).
- **Finding:** `find` locates *files* (by name/type/size); `grep` finds *text inside* files
  (`-i` ignore case, `-r` recursive). **find = which file · grep = what's in it.**
- **Pipes:** `|` feeds one command's output into the next. `>` / `>>` write / append to a file.
  Tiny tools + pipes = the Unix way. `cut -d: -f1` = split on `:`, take field 1.

### Key terms
`file` · `filesystem` · `/` (root) · `/etc` · `/home` · `/var/log` · `/tmp` · `path` ·
`absolute / relative` · `.` `..` `~` · `shell` · `bash` · `prompt` · `PATH` · `man` ·
`cat` · `less` · `head` · `tail` · `wc` · `find` · `grep` · `cut` · `sort` · `pipe |` ·
`redirect > >>` · `tab completion`

### In class — the four "do it now" beats
1. `pwd`, `ls -la`, `cd /etc`, `cd` — get oriented.
2. `cat /etc/os-release`, `less /etc/services`, `wc -l /etc/passwd` — read real files.
3. `find /etc -name "*ssh*"`, `grep -i port /etc/ssh/sshd_config` — find + grep.
4. `cat /etc/passwd | grep -c bash`, `cat /etc/passwd | cut -d: -f1 | sort` — build a one-liner.

### Homework (due start of Day 7)
1. Finish `linux-cheatsheet.md` — **15 commands**, one line each. Commit it. (Template shared.)
2. Scavenger hunt — write the command *and* the answer:
   - How many accounts have `/bin/bash` as their shell?
   - What is the largest file under `/var/log`?
   - Which line of `/etc/ssh/sshd_config` mentions `Port`? *(no sshd_config? use any file in `/etc` and say which.)*
3. Confirm your Linux shell still works — you need it tomorrow.

### Marking checklist (Day 6 homework, 5 marks)
- [ ] cheat-sheet committed, 15 commands, each with a correct one-line description (2)
- [ ] scavenger hunt: all three answered with the command shown (2)
- [ ] answers are actually correct for the student's own system (1)

---

## Day 7 — Linux II: who can do what

### Recap
- **The permission triple:** `-rwxr-xr--` = type, then **r w x** for **u**ser (owner),
  **g**roup, **o**ther. `r` = read / list · `w` = change / add-remove · `x` = execute a file /
  enter a directory.
- **Numeric:** `r=4 w=2 x=1`, add per audience → `644` = `rw-r--r--`, `755` = `rwxr-xr-x`,
  `600` = `rw-------`.
- **`chmod`** changes the bits on files **you own** (symbolic `u+x` / `go-w`, or numeric).
  **`chown`** changes the owner — root only.
- Every file has one **owner user** + one **owner group**. `id` = who you are. `/etc/passwd` =
  accounts, `/etc/group` = groups, `/etc/shadow` = password hashes (root-only, `$6$`/`$y$` =
  salted + slow, cf. Day 5).
- **root** = uid 0 = master key, permission checks skipped. **Don't log in as root.**
- **`sudo <cmd>`** = run one command as root — password-gated and **logged**. `sudo -l` = what
  you're allowed.
- Processes and services each **run as a user**; that user's power = the blast radius if the
  program is compromised. `ps aux`, `kill`, `systemctl`.
- **`cron`** = scheduled jobs (`crontab -e`; five time fields). System cron often runs as root.
- **Privilege escalation** = a low-priv user finding where root *gave something away*: a
  needless **SUID** binary, a **writable script** root trusts, a loose **`sudo`** rule, a
  hijackable **PATH**. Each fixed by least privilege.

### Key terms
`rwx` · `owner / group / other` · `chmod` · `chown` · `umask` · `644 / 755 / 600` ·
`/etc/passwd` · `/etc/shadow` · `/etc/group` · `uid / gid` · `root (uid 0)` · `sudo` ·
`sudo -l` · `su` · `SUID` · `sticky bit` · `ps` · `kill` · `systemctl` · `cron` ·
`privilege escalation` · `least privilege`

### In class — the "do it now" beats
1. `ls -l /etc/passwd /etc/shadow`, `ls -ld /tmp`, `id` — read the labels.
2. `chmod 000 mine.txt` (locked out even as owner) → `chmod 600` (back); `chmod +x run.sh`.
3. `cat /etc/shadow` (denied) vs `sudo cat /etc/shadow`; `sudo -l`.
4. `find / -perm -4000 -type f 2>/dev/null` — the SUID programs.

### Homework (due start of Day 8)
1. **Artifact:** "3 ways a low-privilege Linux user could become root, and the fix for each" —
   your own words. Commit it.
2. Create `secret.txt` readable by **only you**. Show the `ls -l` line and the `chmod` used.
3. Run the SUID `find`. Pick one result; one sentence on why it legitimately needs SUID.
4. Add `chmod`, `chown`, `sudo`, `id`, `ps`, `kill`, `systemctl`, `crontab` to your cheat-sheet.

### Marking checklist (Day 7 homework, 6 marks)
- [ ] artifact: 3 distinct priv-esc paths, each with a correct fix, in the student's words (3)
- [ ] `secret.txt` set to owner-only, with the correct `chmod` shown (`600` or `400`) (1)
- [ ] a SUID program named with a correct reason it needs SUID (1)
- [ ] cheat-sheet updated with the new commands (1)

---

## Day 8 — Windows: same questions, different machine

### Recap — the mapping (Linux → Windows)
| Linux | Windows |
|---|---|
| user + uid | account + **SID** |
| `rwx` for u/g/o | an **ACL** — a list of "who can do what" entries (more detailed) |
| `root` | **Administrators**, and **SYSTEM** (higher still) |
| `sudo` | **UAC** consent / "Run as administrator" |
| `/etc/*` config | the **registry** (HKLM = machine, HKCU = you) |
| `cron` | **Scheduled Tasks** |
| `systemd` services | **Services** |
| `ps` / `kill` | `Get-Process` / `Stop-Process` |

- **SID** = the real identity; usernames are labels on top. Permissions bind to SIDs.
- **SYSTEM > Administrator.** Don't run as admin day-to-day; **UAC** is a consent prompt, not
  a hard security boundary.
- **NTFS ACL** = ordered list of ACEs (SID + allow/deny + Read/Write/Modify/Full);
  child items **inherit** the parent's ACL. Read one with `icacls`.
- **Registry** = one settings database for the whole system. Windows *and* malware store
  config there. **Run keys** (`...\CurrentVersion\Run`) auto-start programs at login → a
  classic **persistence** trick (with Services and Scheduled Tasks).
- **PowerShell is not "cmd with colours"** — it pipes **objects** (filter/sort on properties,
  no text parsing). It's also the **#1 attacker tool** on Windows (built in, powerful,
  historically unlogged).
- **Active Directory** = central login + policy for a whole organisation; machines join a
  **domain**; a **Domain Controller** authenticates you. Attacking AD = Week 4.

### Key terms
`account / SID` · `Administrators` · `SYSTEM` · `access token` · `privilege` (`whoami /priv`) ·
`UAC` · `standard vs admin` · `NTFS ACL / ACE` · `inheritance` · `icacls` · `registry` ·
`HKLM / HKCU` · `Run key` · `persistence` · `Service` · `Scheduled Task` · `PowerShell` ·
`object pipeline` · `LOLBins` · `LSASS` · `LAPS` · `Active Directory / domain / Domain Controller`

### In class — the "do it now" beats
1. `whoami`, `whoami /priv`, `whoami /groups`, `Get-LocalUser`.
2. `icacls C:\Windows\System32\drivers\etc\hosts` and `icacls $HOME`.
3. `Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'` (and the HKLM one).
4. `Get-Process | Sort-Object WS -Descending | Select-Object -First 5 Name, Id, WS`.

*Not on Windows? Pair with a neighbour, RDP the shared Windows box, or follow the projector —
and note which you used.*

### Homework (due start of Day 9)
1. **Artifact:** the **Linux ↔ Windows command table** — ≥ 5 rows, real commands both sides. Commit it.
2. `whoami /priv` + `/groups` — are you an administrator, and how can you tell? (2 sentences)
3. List what auto-starts from both Run keys; flag anything you can't identify (**don't delete**).
4. Add `whoami`, `Get-LocalUser`, `Get-Process`, `Get-Service`, `icacls`, `Get-ItemProperty` to your cheat-sheet.

### Marking checklist (Day 8 homework, 5 marks)
- [ ] Linux↔Windows table: ≥ 5 rows, correct commands on both sides (2)
- [ ] admin/standard answer correct with a valid reason (e.g. Administrators group, `whoami /groups`) (1)
- [ ] Run-key contents listed (1)
- [ ] cheat-sheet updated (1)

---

## Day 9 — Scripting for security

### Recap
- **If you do it twice, script it.** Attackers automate everything; defenders automate the
  response. Same skill, opposite direction.
- **Every language has the same 5 building blocks:** variables · conditionals (`if`) · loops
  (`for`) · run commands / read-write data · functions.
- **Bash:** `#!/bin/bash` shebang + `chmod +x` + `./script.sh`; `var="x"` (no spaces), read
  with `$var`; `$(command)` captures output; `for x in a b c; do ... done`; `if [ -f "$f" ];
  then ... fi`; exit code in `$?` (**0 = success**); `A && B` = run B only if A succeeded;
  `$1` = first argument.
- **Python:** **indentation** defines blocks (4 spaces, no braces); lists `[...]`, dicts
  `{k: v}`; `for x in items:` / `if cond:`; `def name(args): return ...`; `f"{x}"` strings;
  `open("file")` to read lines. `socket` and `subprocess` are built in; `requests` needs
  `pip install requests`.
- **Bash to *call* tools; Python to *build* one.** (Bash ≈ a saved pipe; Python once it has
  real logic or you'll reuse it.)
- **You own what you run.** Generate code with an LLM if you like — then read *every line*.
  "It works" ≠ correct, safe, or scoped.

### Ethics
`sweep.sh` and `scanner.py` are pointed at **`127.0.0.1`, your own machine, or the class lab —
nothing else.** Scanning networks you don't own is illegal (Day 1: "no scope, no test").

### Key terms
`script` · `shebang` · `variable` · `$(...)` · `for` / `if` · `exit code` · `$?` · `&&` ·
`$1` · `chmod +x` · `indentation` · `list` / `dict` · `def` · `f-string` · `import` ·
`socket` · `subprocess` · `settimeout` · `try / except / finally`

### In class — the builds
1. `check.sh` — a Bash loop that reports which files in a list exist.
2. `sweep.sh <subnet>` — ping `.1`–`.254`, print live hosts + a count. Run it, then adapt it.
3. **`scanner.py`** — build it live: `is_open(host, port)` with a socket + timeout, looped over
   a port list. Run against `127.0.0.1`, then the class lab host.
4. Read `assets/ai_snippet.py` — what does it do, what's wrong with it?

### Homework (due start of Day 10)
1. Commit **`scanner.py`** and **`sweep.sh`**, each with a `# usage:` comment at the top.
2. Extend `scanner.py`: read target host(s) from `hosts.txt` instead of hardcoding
   `127.0.0.1`.
3. Read `assets/ai_snippet.py`; 2–3 sentences on what it does and what's wrong (there's more
   than one problem).
4. Add `for`, `if`, `def`, `import`, `socket`, `$(...)`, `chmod +x` to your cheat-sheet.

### Marking checklist (Day 9 homework, 6 marks)
- [ ] `sweep.sh` + `scanner.py` committed, each with a `# usage:` line (2)
- [ ] `scanner.py` reads hosts from `hosts.txt` and runs without error (2)
- [ ] `ai_snippet.py` critique names the hardcoded external target **and** at least one of
      (no timeout / sockets not closed / bare except) (2)

---

## Day 10 — Security thinking

### Recap
- **Vocabulary, precisely:** **asset** (worth protecting) · **vulnerability** (a weakness) ·
  **threat** (a bad event that could exploit it) · **threat actor** (who, and why) ·
  **exploit** (the technique) · **risk** (chance it lands × damage if it does).
- **Risk = likelihood × impact** — *not* the vulnerability count. You can't fix everything;
  rank on the grid and act on high/high first.
- **Threat actors:** script kiddie · cybercrime (money) · hacktivist (message) · nation-state
  (espionage/sabotage) · insider (already inside). Match your defences to the *realistic* ones.
- **Attack surface** = every point an attacker can poke (inputs, ports, APIs, people). Smaller
  is safer. **Trust boundary** = where data crosses from less-trusted to more-trusted.
- **The question, every time:** *where does data from outside cross into somewhere powerful?*
  Validate / check permissions **there**. (Overflow Day 2, SQLi/XSS Day 16, SSRF Day 17,
  prompt injection Day 18 — all the same idea.)
- **Defender's principles:** defence in depth · least privilege · assume breach · minimise
  attack surface · fail secure.
- **Controls** are preventive / detective / corrective — have all three, because prevention fails.
- **Threat modelling — 4 questions:** What are we building? What can go wrong (**STRIDE**:
  Spoofing / Tampering / Repudiation / Info disclosure / DoS / Elevation of privilege)? What
  do we do about it? Did we do a good job?

### Key terms
`asset` · `vulnerability` · `threat` · `threat actor` · `exploit` · `risk` ·
`likelihood × impact` · `attack surface` · `trust boundary` · `untrusted input` ·
`defence in depth` · `least privilege` · `assume breach` · `fail secure` ·
`preventive / detective / corrective` · `STRIDE` · `threat model`

### In class
1. Rank 4 findings on the likelihood × impact grid.
2. **Class threat-model** of a real app (result portal / delivery / UPI): draw it + trust
   boundaries → 3 STRIDE threats → 3 controls. Commit yours as `day10/threat-model.md`
   (template shared).

---

## Weekend Assignment — Week 2

*Briefed at the end of Day 10. Submit **one PDF before Monday**. Test **only your own VM**.*

### Part A — Integrate (harden your machine)
On your Linux VM:
1. **Threat-model it in half a page** — what's valuable on it, who'd realistically attack it,
   the entry points.
2. **Create a non-root user** and add it to a group; show `id`.
3. **Find and fix 3 weak settings** — e.g. a world-writable file, a `chmod 777`, a readable
   private key / `.env`. Show `ls -l` **before and after** each.
4. **Write a script** (Bash or Python — Day 9) that **reports** weak settings. Use
   `assets/weak-settings-checklist.md` (from Day 10) — at minimum, checks **1, 3, and 5**
   (world-writable files, unexpected SUID, readable secrets). It only needs to *report*.

### Part B — R&D stretch (pick one)
- **Linux:** research **one privilege-escalation technique we did *not* cover** (Linux
  capabilities, `LD_PRELOAD`, a specific GTFOBin, PwnKit / CVE-2021-4034, dirtypipe, ...).
  In ~5 sentences: how it works and how a defender stops it.
- **Windows:** pick **3 LOLBins** (`certutil`, `regsvr32`, `mshta`, `bitsadmin`, `rundll32`,
  ...). What does each legitimately do, and why can't defenders simply block them?

### Part C — Hands-on evidence
- your weak-settings script and its output;
- `ls -l` before/after for the 3 settings you fixed;
- `id` for the new non-root user.

### Part D — Reflection
3–4 sentences: what clicked this week, what's still fuzzy.

### Marking checklist (15 marks)
- [ ] Part A1 — half-page threat model of the VM: asset, actor, entry points (2)
- [ ] Part A2 — non-root user created, `id` shown (1)
- [ ] Part A3 — 3 weak settings fixed, `ls -l` before/after for each (3)
- [ ] Part A4 — script runs, reports checks 1/3/5 correctly, in the student's own code (4)
- [ ] Part B — real research beyond class, correct mechanism **and** defence (2)
- [ ] Part C — all three pieces of evidence present and legible (2)
- [ ] Part D — a genuine reflection (1)
