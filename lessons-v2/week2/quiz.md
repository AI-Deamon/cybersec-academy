# Week 2 — Formative Quiz

*10 questions. The Week-2 assignment (harden a machine + a weak-settings script) assumes this.*

---

**1.** On Linux, `-rwxr-xr--` on a file means:
- A. everyone can read, write, and execute it
- B. owner: read/write/execute · group: read/execute · others: read only
- C. owner: read only · group: read/write · others: nothing
- D. only root can access it

**2.** `chmod 777 config.php` is offered as a fix for a "permission denied" error. It is:
- A. the correct fix
- B. fine as a temporary measure
- C. a vulnerability — it lets any user or compromised process read and rewrite the file
- D. only a problem on internet-facing servers

**3.** The difference between `root` and `sudo`:
- A. they are the same thing
- B. `root` is the master account (checks skipped); `sudo` runs one command as root, gated by
  your password and logged
- C. `sudo` is more powerful than `root`
- D. `root` is for Ubuntu, `sudo` is for Debian

**4.** `find` vs `grep`:
- A. `find` searches text inside files; `grep` locates files by name
- B. `find` locates files (by name/type/size); `grep` searches for text inside files
- C. they do the same thing
- D. `grep` only works on log files

**5.** On Windows, which account is **more** powerful than a member of the Administrators
group?
- A. Guest
- B. the current user
- C. `NT AUTHORITY\SYSTEM`
- D. none — Administrator is the top

**6.** "PowerShell is just `cmd` with colours." This is:
- A. true
- B. false — PowerShell pipes **objects** (filter/sort on properties, no text parsing) and is
  a primary attacker tool
- C. true, but PowerShell is faster
- D. false — `cmd` is actually more powerful

**7.** In `for i in $(seq 1 254); do ping -c1 -W1 "$sub.$i"; done`, what does `$(seq 1 254)`
produce?
- A. a random number between 1 and 254
- B. the numbers 1 to 254, which the loop iterates over
- C. the file `seq` in the current directory
- D. an error — `seq` is not a real command

**8.** Your Python port-scanner calls `s.connect((host, port))` and the port is **closed**.
What happens?
- A. it returns silently and reports "open"
- B. it hangs forever
- C. it raises `OSError`, which your `except` catches → report "closed"
- D. it crashes the whole script

**9.** "We have 300 open vulnerabilities." Why is that not the number that matters?
- A. it's actually a good sign
- B. risk = likelihood × impact — you act on the few that are high-likelihood **and**
  high-impact, not the raw count
- C. 300 is too low to worry about
- D. vulnerability count is the only real security metric

**10.** In "a user types a search term and the app runs a database query," where is the trust
boundary?
- A. between the user's keyboard and the browser
- B. between the browser and the network
- C. between the user's input and the database query (where injection lives)
- D. there is no trust boundary

---

## ANSWER KEY

1: B · 2: C · 3: B · 4: B · 5: C · 6: B · 7: B · 8: C · 9: B · 10: C

**Rationale:**
- **2** — if something "needs 777", the real problem is wrong *ownership*, not permissions.
- **5** — "get local admin" is usually a stepping stone to "get SYSTEM".
- **8** — a closed port sends RST → `ConnectionRefusedError` (a subclass of `OSError`); a
  filtered port times out.
- **10** — every injection (SQLi, command injection) is untrusted input crossing into
  something powerful without a check at that boundary.
