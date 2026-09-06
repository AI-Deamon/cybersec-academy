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

## Day 7 — *(to be added)*
## Day 8 — *(to be added)*
## Day 9 — *(to be added)*
## Day 10 — *(to be added)*

---

## Weekend Assignment — Week 2

*Briefed at the end of Day 10. Full spec added then. Theme: harden a machine — users,
permissions, and a script that flags weak settings; R&D one privilege-escalation technique.*
