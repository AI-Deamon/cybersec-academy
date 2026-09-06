# Week 2 — Student Pack

*Practical Cyber Security (v2) · Week 2: Understanding the operating system*

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

## Day 8 — *(to be added)*
## Day 9 — *(to be added)*
## Day 10 — *(to be added)*

---

## Weekend Assignment — Week 2

*Briefed at the end of Day 10. Full spec added then. Theme: harden a machine — users,
permissions, and a script that flags weak settings; R&D one privilege-escalation technique.*
