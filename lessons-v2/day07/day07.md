---
marp: true
theme: dark-monospace
paginate: true
title: "Day 7 — Linux II: Who Can Do What"
footer: "Practical Cyber Security (v2) · Week 2 · Day 7"
---

<!-- _class: lead -->

# Linux II
## Day 7 — Permissions, users, sudo — *who can do what*

**Week 2 · Understanding the operating system**

<!--
RUN SHEET (~85 min). Hands-on INTERLEAVED — skills day.
00:00 Journey check + hook (why can't I write /etc/passwd?)    4
00:04 The permission triple                                    8
00:12 DO: read permissions                                     5
00:17 Owner / group / everyone else                            6
00:23 chmod / chown                                            8
00:31 DO: break perms, then fix them                           7
00:38 root and sudo                                            8
00:46 DO: sudo -l, sudo vs no-sudo                             4
00:50 Processes & services (quick recall of Day 2)             6
00:56 cron — scheduled jobs                                    5
01:01 Privilege escalation — the crack in the model            9
01:10 Attack <-> defence                                       5
01:15 Wrap + artifact + homework                               5
CUT FIRST IF SHORT: the cron slide (name it, one line); the processes/services slide (Day 2 recall).
NEVER CUT: reading rwx, chmod (symbolic + numeric), root vs sudo, the priv-esc concept, the artifact.
ANALOGY (kitchen): permissions = the KEY CABINET. Every file/door has labels for owner / group /
everyone saying who may look (r), change (w), enter or run (x). root = the master key.
sudo = "borrow the master key for one job — and it's written in the logbook."
NO real exploitation today — priv-esc is a CONCEPT here; the hands-on version is Day 17.
-->

---

## Where we are

- **Yesterday:** moving around Linux, reading files.
- **Today:** the labels on every one of those files — **who may read it, change it, run it** —
  and how you become someone more powerful (`sudo`).
- **Tomorrow:** the same questions on Windows.

<!--
Learning Journey Check. This is THE access-control day. The whole week's lens — "who can do
what" — is literally on screen today as rwx bits.
-->

---

## Hook — why can't I do this?

```
user@lab:~$ echo "hacker:x:0:0" >> /etc/passwd
bash: /etc/passwd: Permission denied
```

You *can* read `/etc/passwd` (yesterday). You **can't** write it. Something checked and said no.

That "something" is what today is about.

<!--
Run it live — the denial is the point. "Yesterday cat worked. Now >> fails. Same file. What
changed? Nothing — you were always only allowed to read it. Today you can see the rule."
-->

---

## The permission triple

```
-rwxr-xr--   1  alice  devs   ...  report.sh
│└┬┘└┬┘└┬┘        │     │
│ u   g  o        owner group
│
└ type:  - file   d directory   l link
```

Three sets of **r w x**, for three audiences:

- **u** — the **owner**
- **g** — members of the file's **group**
- **o** — **everyone else**

<!--
Read it left to right. First char = type. Then user's rwx, group's rwx, other's rwx.
r = read contents / list a directory
w = change contents / add-remove files in a directory
x = execute (a file) / enter + traverse (a directory)  <- the dir case surprises people
So `-rwxr-xr--` = owner: read+write+run · group: read+run · others: read only.
-->

---

## Do it now — read the labels

```
ls -l ~                 your own files
ls -l /etc/passwd       -rw-r--r--  root root   (everyone reads, only root writes)
ls -l /etc/shadow       ----------  or  -rw-r-----  root shadow   (you can't even read it)
ls -ld /tmp             drwxrwxrwt   (world-writable — the 't' is the sticky bit)
```

Decode three of them **out loud** with the person next to you.

<!--
5 min. /etc/shadow (password hashes) being unreadable to you is the payoff of the hook.
/tmp being drwxrwxrwt: anyone can create files, but the sticky bit 't' means you can only
delete your OWN. Note it, don't dwell.
-->

---

## Owner, group, everyone else

- Every file has **one owner user** and **one owner group**.
- **`id`** shows who you are: your uid, your gid, every group you're in.
- **`/etc/passwd`** — the account list (username, uid, home, shell). Readable by all.
- **`/etc/group`** — which users are in which group.
- Groups are how you grant shared access without making everything world-readable.

<!--
`id` output: uid=1000(alice) gid=1000(alice) groups=1000(alice),27(sudo),... — the `sudo`
group membership is what lets alice use sudo at all. Preview.
/etc/passwd fields are colon-separated (Day 6 `cut -d:`): name:x:uid:gid:comment:home:shell.
The `x` = "password is in /etc/shadow".
-->

---

## Changing the labels — `chmod` / `chown`

**`chmod`** — change permission bits (on files **you own**):

```
chmod u+x script.sh        symbolic: give the owner execute
chmod go-w notes.txt       remove write from group + others
chmod 644 notes.txt        numeric: rw- r-- r--
chmod 755 script.sh        numeric: rwx r-x r-x
```

Numeric: **r = 4, w = 2, x = 1**, add them per audience. `7 = rwx`, `6 = rw-`, `5 = r-x`.

**`chown`** — change the owner. Needs **root**.

<!--
Symbolic for quick edits, numeric for setting a whole mode. Make them do 644 and 755 by hand:
"read-write for me, read for everyone" and "everyone can run it, only I can edit it".
chown needs root because otherwise you could give your files away to frame someone, or grab
someone else's.
-->

---

## Do it now — break it, then fix it

```
echo secret > mine.txt
chmod 000 mine.txt        remove ALL permissions
cat mine.txt              -> Permission denied  (even though you own it!)
chmod 600 mine.txt        rw for you only
cat mine.txt              -> works again

echo 'echo hi' > run.sh ; ./run.sh      -> Permission denied
chmod +x run.sh ; ./run.sh              -> hi
```

<!--
7 min. Two lessons: (1) even the owner is bound by the bits — the OS doesn't make an exception.
(2) a script needs +x to run; setting +x doesn't run it, it just permits it (Day 2 misconception).
-->

---

## root and `sudo`

- **root** = uid 0 = the **master key**. The permission checks are *skipped* for root.
- **Don't log in as root.** One typo as root breaks the system; every program you run has
  full power.
- **`sudo <command>`** = run just that one command as root — **password-gated** and **logged**
  (`/var/log/auth.log`).
- **`sudo -l`** = "what am I allowed to run with sudo?"

<!--
The `#` prompt = root, `$` = normal user (Day 6). Least privilege in practice: you spend your
day as a normal user and borrow power for the 3 commands that need it.
Analogy: the master key lives in the manager's office; you sign the logbook, take it for one
job, bring it back.
-->

---

## Do it now — with and without sudo

```
cat /etc/shadow            -> Permission denied
sudo cat /etc/shadow       -> (password) -> the password hashes
sudo -l                    -> what sudo lets you do
```

<!--
4 min. On a PERSONAL VM students have sudo. On the shared class box they may not —
then this is an instructor demo on the projector.
Point at a /etc/shadow line: user:$6$salt$hash:... — the $6$ = SHA-512 crypt. Callback to Day 5
(salted + slow). This is the file `hashcat` targets after a breach.
-->

---

## Processes & services (recall Day 2)

- A **process** is a running program (Day 2) — here: `ps aux`, `top`/`htop`, `kill <pid>`.
- Every process runs **as some user** — and inherits that user's permissions.
- A **service** (daemon) is a background process the system manages: `systemctl status ssh`,
  `sudo systemctl restart ssh`.
- Good services run as a **dedicated low-privilege user**, not root — so a bug in the service
  isn't a bug with root.

<!--
Quick — this is recall, not new. The one new security idea: "runs as which user?" decides how
bad a compromise of that program is. Web server running as root = very bad.
CUT to one line if short: "processes and services each run AS a user; that user's power is
their power."
-->

---

## `cron` — jobs that run on a schedule

```
crontab -e            edit YOUR scheduled jobs
crontab -l            list them

# m h dom mon dow   command
  0 2 *   *   *     /home/alice/backup.sh      # 02:00 every day
```

`/etc/crontab` and `/etc/cron.d/*` hold **system** jobs — often run **as root**, unattended.

<!--
Five time fields: minute, hour, day-of-month, month, day-of-week. `*` = every.
The security angle (next slide): if root's cron runs a script that YOU can edit, you just got
root to run your code. Note it here, land it next slide.
CUT FIRST IF SHORT — name cron, one example, move on.
-->

---

## Privilege escalation — the crack in the model

Attacker lands as a **low-privilege user** (Day 13). Goal: **become root**. They hunt for a
mistake in "who can do what":

| The crack | How they find it | The fix |
|---|---|---|
| a **SUID** program (runs as its owner, often root) | `find / -perm -4000 2>/dev/null` | remove SUID you don't need; audit the rest |
| a script **root's cron** runs that **you can write** | `ls -l` on cron scripts; look for `w` | root-owned, non-writable scripts only |
| **`sudo -l`** allows a command that can spawn a shell | read `sudo -l` output | tight sudoers, no shell-capable binaries, no wildcards |
| a privileged script calls a command **by name**, and your **PATH** comes first | read the script | absolute paths; sanitize `PATH` in the script |

<!--
CONCEPT ONLY today — we don't exploit anything. Day 17 is the hands-on version.
The unifying idea: root gave something away — an over-powerful binary, a writable file it
trusts, a too-broad sudo rule. Every one is a least-privilege failure.
`2>/dev/null` throws away the "permission denied" noise (Day 6).
-->

---

## Do it now — look for SUID

```
find / -perm -4000 -type f 2>/dev/null
```

You'll see `sudo`, `passwd`, `mount`, `ping`... — programs that legitimately need to act as
root for one job. An attacker checks this list for **anything unusual**.

<!--
2-3 min (folds into the priv-esc block). passwd is SUID-root so a normal user can update their
own hash in /etc/shadow (which only root can write). That's the legitimate use of SUID.
"Unusual" = a copy of bash, vim, find, python with the SUID bit = instant root. GTFOBins is
the reference (don't teach it, just name it).
-->

---

## Attack ↔ Defence

| Attack | Defence |
|---|---|
| **`chmod 777`** everywhere ("just make it work") | correct least-privilege modes; a good `umask` |
| **SUID abuse** — an over-powered binary runs as root | minimise SUID; audit `find / -perm -4000` |
| **Writable script** that root/cron executes | root-owned, `644`/`755`, never group/other-writable |
| **`sudo` misconfig** — NOPASSWD on a shell-capable command | least-privilege sudoers; review regularly |
| **Living as root** | daily driver = normal user; `sudo` per task; services as dedicated users |

<!--
`chmod 777` is the Day 7 trap — say it plainly: it is never a fix, it is a vulnerability you
just created. If something "needs 777", the real problem is wrong ownership.
-->

---

## Today's attack / defence / artifact

- **Attack:** land as a normal user, then find where root gave something away — a SUID binary,
  a writable trusted script, a loose `sudo` rule.
- **Defence:** least privilege everywhere — minimal permissions, minimal SUID, tight sudoers,
  services as their own low-priv users.
- **Artifact:** **"3 ways a low-privilege Linux user could become root, and the fix for each."**

---

## Homework

1. Write the artifact: **3 privilege-escalation paths + the fix for each**, in your own words.
   Commit it.
2. On your VM: create `secret.txt`, set it so **only you** can read it. Show the `ls -l` line
   and the `chmod` you used.
3. Run `find / -perm -4000 -type f 2>/dev/null`. Pick one SUID program and, in one sentence,
   say why it legitimately needs to be SUID.
4. Add `chmod`, `chown`, `sudo`, `id`, `ps`, `kill`, `systemctl`, `crontab` to your cheat-sheet.

<!--
Due start of Day 8. Checklist grading in the week-2 student pack.
-->

---

<!-- _class: lead -->

## Recap

1. **Every file: `rwx` for owner / group / others.** The OS checks it for *everyone*, including the owner.
2. **root skips the checks. `sudo` borrows root for one logged command.** Live as a normal user.
3. **Privilege escalation = finding where root gave something away.** Least privilege closes those gaps.

<!--
Say the three lines. Tomorrow: Windows asks the same "who can do what" — with different words
(tokens, ACLs, the registry) and Active Directory tying many machines together.
-->
