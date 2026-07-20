# Day 7 — Reference Sheet
*Keep for the course.*

- **One tree:** everything under `/`. No drive letters. Paths are addresses (`/home/you`, `/etc`, `/var/log`).
- **Bash basics:** `whoami` · `pwd` · `ls -l` (with permissions) · `cd` · `cat` · `chmod` (own files).
- **Permissions:** roles = user / group / other; rights = read / write / execute. `rwxr-xr--` = owner full, group enter+read, other read only. Folder `x` = enter; file `x` = runnable.
- **Users/groups:** `whoami` shows you; `root` = admin (master key); `sudo` = do-as-root (logged). `/etc/passwd` lists accounts; `/etc/group` lists groups (read-only look).
- **chmod vs chown:** `chmod` changes rights on what you own; `chown` changes owner (needs root).
- **Least privilege:** give each file the minimum rights it needs. `777` = bad.

## Further reading
- `man chmod` / `man ls` for details.
- OverTheWire Bandit (later) for hands-on permission puzzles.
- Day 8 covers the Windows equivalent (ACLs / PowerShell).
