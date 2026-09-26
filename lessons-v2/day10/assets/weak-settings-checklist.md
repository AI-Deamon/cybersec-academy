# Weak-settings checklist — for the Week 2 assignment script

Your Part A script (Bash or Python) should **check for and report** these on a Linux machine.
It only needs to *report* — not fix. Run it as your normal user; note what needs `sudo` to see.

| # | What to check | How (a hint) | Why it's weak |
|---|---------------|--------------|---------------|
| 1 | World-writable files in `/home` and `/etc` | `find /home /etc -type f -perm -o+w 2>/dev/null` | anyone can modify them |
| 2 | World-writable **directories** outside `/tmp` | `find / -xdev -type d -perm -o+w 2>/dev/null` (filter out `/tmp`, `/var/tmp`) | anyone can drop/replace files |
| 3 | SUID binaries not on a known-good list | `find / -perm -4000 -type f 2>/dev/null` vs an allowlist you define | extra SUID = privilege-escalation surface (Day 7) |
| 4 | Files with **no owner** (orphaned uid/gid) | `find / -xdev \( -nouser -o -nogroup \) 2>/dev/null` | left behind by deleted users; unclear who controls them |
| 5 | Readable "secret-looking" files | `find /home /etc -type f \( -name "*.pem" -o -name "id_rsa" -o -name "*.key" -o -name ".env" \) -perm -o+r` | private keys / creds readable by others |
| 6 | `/etc/shadow` not `640`/`600` | `stat -c '%a %n' /etc/shadow` | password hashes should be tightly locked |
| 7 | Accounts with an empty password field | `sudo awk -F: '($2==""){print $1}' /etc/shadow` | login with no password |
| 8 | Users with `uid 0` other than `root` | `awk -F: '($3==0){print $1}' /etc/passwd` | a hidden second superuser |

**Output format** — keep it readable, e.g.:

```
[WEAK]  world-writable file: /home/alice/notes.txt (rw-rw-rw-)
[WEAK]  unexpected SUID: /usr/local/bin/backup
[ ok ]  /etc/shadow is 640
3 issue(s) found
```

For the assignment you need at least **checks 1, 3, and 5** working, plus your before/after fix
of 3 real weak settings you introduce or find.
