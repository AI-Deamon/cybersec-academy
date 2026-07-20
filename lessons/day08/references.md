# Day 8 — Reference Sheet
*Keep for the course.*

- **Same OS, different dialect:** Windows = Linux job, different words. Drives (`C:\`) vs `/`; ACLs vs `rwx`; PowerShell vs Bash.
- **PowerShell basics (read-only):** `whoami` · `Get-LocalUser` · `Get-Acl` (show permissions) · `Get-ChildItem` (list).
- **ACL:** list of principal→rights on a file/folder. Same "who may do what" as Linux `rwx`, stored as a list.
- **Users/groups/AD:** local user = one machine; AD = domain-wide roster (one badge, many rooms). `Administrators` group = master key.
- **UAC:** Windows's `sudo` — keeps you standard until admin is needed. Least privilege = standard user + elevate only when required.
- **Least privilege:** "Everyone: Full Control" = Windows `777` = bad. AD compromise = company-wide identity loss.

## Further reading
- Microsoft "PowerShell basics" docs.
- Compare `Get-Acl` output to a Linux `ls -l` line — same lock, two labels.
- Day 9 covers scripting; Day 16 covers Windows privilege escalation.
