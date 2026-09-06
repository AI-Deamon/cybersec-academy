# Day 7 — Teacher Notes

**Teach from:** `day07.md` (deck + speaker notes).
**This file:** cut-list, background, demo runbook, checkpoint, exit check, FAQ.
This is the **access-control day** — the whole Week 2 lens ("who can do what") is literally on
screen as `rwx` bits. If a student leaves fuzzy on reading permissions, the rest of the week
wobbles.

---

## Environment note

Same Linux shell as Day 6. Two demos need **sudo**:
- On a **personal VM** (Kali/Ubuntu `.ova`), the student is in the `sudo` group — everything works.
- On the **shared class box**, students likely do **not** have sudo — run the `sudo cat
  /etc/shadow` / `sudo -l` beat as an **instructor demo on the projector** for those students.
The `chmod` / `find -perm` beats work for everyone.

---

## The analogy — the key cabinet (kitchen)

- **permissions** = labels on every door and cupboard: who may look (r), change (w), enter/run (x)
- **owner / group / others** = "the chef who owns this station" / "the line" / "everyone else"
- **root** = the master key — opens everything, checks skipped
- **sudo** = the master key lives in the manager's office; you sign the logbook, take it for
  one job, bring it back

No new analogy. Windows (Day 8) reuses "who can do what" with different vocabulary.

---

## Must-teach vs. cut-if-short

**Never cut:**
- Reading `rwx` for u/g/o (the permission triple + the "do it now").
- `chmod` — both symbolic (`u+x`, `go-w`) and numeric (644, 755).
- root vs `sudo` (master key vs borrow-and-log).
- The privilege-escalation **concept** (root gave something away).
- The artifact (3 priv-esc paths + fixes).

**Cut in this order if behind:**
1. The `cron` slide → one line: "scheduled jobs; if root runs a script you can edit, you get root."
2. The processes/services slide → one line: "each runs *as a user*; that user's power is the blast radius."
3. The sticky-bit `/tmp` detail on the "read the labels" beat.
4. The PATH-hijack row of the priv-esc table (keep SUID + writable-cron + sudo-misconfig).

---

## Background for topics people get shaky on

### The permission bits, precisely
- 12 bits: 9 for u/g/o × rwx, plus 3 special: **setuid (4000)**, **setgid (2000)**, **sticky (1000)**.
- `ls -l` first column: `[type][u rwx][g rwx][o rwx]`. Type: `-` file, `d` dir, `l` symlink,
  `c`/`b` device, `s` socket, `p` pipe.
- A SUID file shows `s` in the owner-execute slot (`-rwsr-xr-x`); SGID `s` in the group slot;
  sticky `t` in the other slot (`drwxrwxrwt`).
- **Directory semantics** (the confusing bit): `r` = list names; `w` = create/delete entries
  *in* the dir; `x` = actually use a path through the dir (`cd`, open a file inside). `w`
  without `x` on a dir is nearly useless; `x` without `r` means "you can access files you
  already know the names of but can't list them."
- **Numeric:** r=4 w=2 x=1 per audience. 644 = `rw-r--r--`, 640 = `rw-r-----`, 600 =
  `rw-------`, 755 = `rwxr-xr-x`, 700 = `rwx------`, 777 = everything for everyone (never).
- **umask** subtracts from the default (666 files / 777 dirs) at creation. Typical `022` →
  new files 644, new dirs 755. Mention only if asked.

### Users, groups, root
- **uid 0 = root**, regardless of name. The kernel special-cases uid 0: most permission checks
  return "allowed".
- `/etc/passwd`: `name:x:uid:gid:gecos:home:shell`. The `x` = "hash is in `/etc/shadow`".
  A shell of `/usr/sbin/nologin` or `/bin/false` = a service account that can't log in.
- `/etc/shadow` (root-only): `name:$id$salt$hash:lastchange:...`. `$6$` = SHA-512 crypt,
  `$y$` = yescrypt (newer). Callback to Day 5 — salted + slow.
- `/etc/group`: `groupname:x:gid:members`. Being in the `sudo` (Debian/Ubuntu) or `wheel`
  (RHEL) group is what grants sudo access.
- `su` = become another user fully (needs *their* password, or root). `sudo -i` / `sudo su` =
  become root via sudo. `sudo` is preferred: granular, logged, no shared root password.

### SUID / SGID — the legitimate use
`passwd` must edit `/etc/shadow`, which only root can write. Making `passwd` **SUID-root**
lets any user run it and have it act as root *for that one program's logic*. Same for `ping`
(raw sockets), `mount`, `sudo` itself. The risk: a SUID program with a bug, or a SUID copy of
a general-purpose tool (`bash`, `find`, `vim`, `python`), hands an attacker root. **GTFOBins**
catalogues which binaries can be abused this way — name it, don't teach it.

### Privilege escalation — the four classic local paths (concept only today)
1. **SUID abuse** — unusual SUID binary → run it in a way that spawns a root shell.
2. **Writable file a privileged process trusts** — root's cron/systemd runs
   `/opt/app/run.sh` and it's `777` → edit it, wait, get root.
3. **sudo misconfiguration** — `alice ALL=(ALL) NOPASSWD: /usr/bin/vim` → `sudo vim` →
   `:!/bin/sh` → root. Any editor/pager/interpreter in a sudo rule is effectively "sudo shell".
4. **PATH / library hijack** — a privileged script calls `tar` (not `/bin/tar`); attacker
   puts a malicious `tar` earlier in `PATH`.
Day 17 does these hands-on against Metasploitable2 with `linpeas`.

### cron
- User crontab: `crontab -e`. Five fields `m h dom mon dow` then the command. `*/5` = every 5.
- System: `/etc/crontab` (has a user field), `/etc/cron.d/`, `/etc/cron.{daily,hourly}/`.
- Runs non-interactively with a minimal environment — scripts that "work in my shell" often
  fail in cron because `PATH` is tiny. That same minimal PATH is the hijack surface.

---

## Demo runbook

All safe on a personal VM. `chmod 000` / `chmod +x` only touch the student's own throwaway files.

### Hook
`echo "x" >> /etc/passwd` → `Permission denied`. That's it — the denial is the lesson.

### The four "do it now" beats
| Beat | Commands | Expected |
|---|---|---|
| read labels | `ls -l /etc/passwd /etc/shadow`, `ls -ld /tmp`, `id` | passwd `-rw-r--r--`; shadow unreadable; `/tmp` `drwxrwxrwt`; `id` shows groups incl. `sudo` |
| break/fix | `echo s > mine.txt; chmod 000 mine.txt; cat mine.txt` (denied) `; chmod 600 mine.txt; cat mine.txt` (ok) | owner still blocked at 000 |
| | `echo 'echo hi' > run.sh; ./run.sh` (denied) `; chmod +x run.sh; ./run.sh` (hi) | +x needed to run |
| sudo | `cat /etc/shadow` (denied) `; sudo cat /etc/shadow`; `sudo -l` | hashes appear with sudo; `-l` lists allowed commands |
| SUID | `find / -perm -4000 -type f 2>/dev/null` | `sudo`, `passwd`, `mount`, `su`, `ping`, `pkexec`... |

### Failure modes
| Symptom | Fix |
|---|---|
| student has no sudo (shared box) | instructor projector demo for the sudo beat |
| `find /` is slow / floods errors | the `2>/dev/null` hides errors; Ctrl-C is fine, they've seen the idea |
| `./run.sh` says "No such file or directory" with +x set | missing shebang or wrong line endings (CRLF from Windows) — `#!/bin/bash` first line, `dos2unix` |
| WSL: `/etc/shadow` exists but is tiny | WSL user accounts are minimal — fine, the permission *model* is identical |
| student did `chmod 000` on something important | it was their own throwaway file; if they hit a real file, `chmod 644` / `755` to restore, or `sudo` |
| **the hook `>> /etc/passwd` does NOT get denied** | the student is running as root (old WSL default, a bare Docker container) — turn it into the lesson: "you're living as root, which is exactly what we tell you not to do. Create and switch to a normal user: `adduser you && usermod -aG sudo you && su - you`." |
| `sudo` logs — where? | `/var/log/auth.log` on Debian/Ubuntu, `/var/log/secure` on RHEL/Fedora |

---

## Checkpoint (by end of class)

Each student can:
- [ ] read `-rwxr-xr--` aloud as owner/group/other permissions
- [ ] write the numeric mode for "owner read+write, everyone else read" (644) and set it
- [ ] explain the difference between `root` and `sudo`
- [ ] name one way a normal user could become root, and its fix

---

## Exit check (last 2 min)

1. `-rw-r--r--` on a file you own — can the person next to you (not in your group) edit it?
   — *No — "other" has `r--`, read only.*
2. Why is `chmod 777 config.php` a bad fix for a "permission denied"? — *It lets everyone
   (including a compromised web process or another user) read and rewrite it. The real fix is
   correct ownership.*
3. `sudo` vs logging in as root — one advantage of `sudo`? — *Per-command, password-gated, and
   logged; no shared root password.*

---

## FAQ

- **"If I own a file, why can `chmod 000` lock me out?"** The kernel checks the bits for
  everyone, owner included. You can always `chmod` it back because you own it — ownership lets
  you change the mode even when the mode denies access.
- **"Is being in the `sudo` group the same as being root?"** Nearly — you can become root any
  time with your own password. That's why adding someone to `sudo` is a serious grant.
- **"Why not just run everything with sudo to avoid permission errors?"** Least privilege: a
  mistake or a compromised program you ran with sudo has full power. You want the blast radius
  small by default.
- **"What's the `t` at the end of `/tmp`?"** Sticky bit — in a world-writable directory, only
  the owner of a file (or root) can delete it. Stops users deleting each other's temp files.
- **"Does Windows have all this?"** Same questions, different machinery — ACLs, tokens,
  privileges, UAC. That's tomorrow.
- **"chmod vs chown?"** `chmod` changes the permission bits (you can, on your own files).
  `chown` changes *who owns it* (root only).
