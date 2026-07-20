# Day 8 — Lab Guide
**Goal:** Use safe, read-only PowerShell to see *who you are* and *what permissions exist* on Windows.

**Prerequisites:** A Windows machine (or a lab VM). PowerShell (built in). Read-only — no system changes.

---

## Task 1 — Who am I? (users) (6 min)
1. Open **PowerShell** (not CMD is fine too, but use PowerShell).
2. Run: `whoami`
3. Note your identity. It may show `DESKTOP\You` (local) or `DOMAIN\You` (company/AD). That "which building" tag is the local-vs-domain difference.

## Task 2 — The local roster (6 min)
1. Run: `Get-LocalUser`
2. Look at the list of local accounts. (Read-only — we're just observing who is on this machine.)

## Task 3 — Read the key cabinet (Windows ACL) (8 min)
1. Run: `Get-Acl C:\Users\$env:USERNAME\Documents` (or any folder you own).
2. Find the **Access** list. Each line shows a **principal** (user/group) and its **rights** (Read, Write, etc.).
3. In your sheet, write one line: "ACL = a list of who-may-do-what — the Windows twin of Linux `rwx`."

---

## ✅ Checkpoint (show instructor before leaving)
- [ ] Ran `whoami` and noted local vs domain
- [ ] Ran `Get-LocalUser` and saw the account list
- [ ] Ran `Get-Acl` and identified a principal→rights entry
- [ ] Wrote the "ACL = Windows twin of rwx" sentence

## Troubleshooting
- *PowerShell not found:* search "PowerShell" in Start; use the blue app.
- *Access denied on Get-Acl:* you tried a folder you can't read — that's the OS working. Pick your own `Documents` folder.
- *No AD at home:* that's normal — `Get-LocalUser` is local; AD is explained conceptually in class.

> ⚠️ **Safety rule (Day 1):** only read-only cmdlets on your own machine. Never run `icacls /grant`, `net user /add`, or anything that changes accounts/permissions.
