# Attack chain — initial access → data, with detection opportunities

*Day 17 artifact. Fill the "what a defender could see" column — that's the bridge to Day 19.*

| # | Attacker step | Concretely (your lab / a realistic scenario) | What a defender could see |
|---|---------------|---------------------------------------------|----------------------------|
| 1 | **Initial access** | phishing / a web RCE / a stolen credential | email gateway alert; a new external login; a web-shell request in the access log |
| 2 | **Foothold (low priv)** | a shell as `www-data` / `devuser` | a shell process spawned by the web server; outbound to a new IP (reverse shell / C2 beacon) |
| 3 | **Privilege escalation** | `sudo -l` → `sudo find ... -exec /bin/sh` → root | `sudo` invoking a shell; a process re-parented to uid 0; (Windows: event 4104 / 4688) |
| 4 | **Persistence** | add a cron job / an SSH key / a service | a new cron entry / service (file-integrity monitoring); a new `authorized_keys` line |
| 5 | **Discovery** | `nmap` the internal net; read `/etc/passwd`, AD | a burst of internal connections (scan); LDAP queries from a workstation |
| 6 | **Lateral movement** | pass-the-hash / reused SSH key to the next box | SMB/WinRM/SSH auth from an unusual source; a workstation authenticating to a server it never talks to |
| 7 | **Privilege (domain)** | Domain Admin / the DB admin account | a rare high-priv account used from a new host; Kerberos anomalies |
| 8 | **Collection** | dump the database / a file share | very large / unusual read volume; access to data this account never touched before |
| 9 | **Exfiltration** | upload to an external host (FTP / HTTPS / DNS) | large outbound transfer; connection to a new external domain; DNS tunnelling volume |

## Your notes
- The step in **your** lab run where you actually got root: __________
- The one detection you think would be **easiest** to build: __________
- The one you think an attacker could most easily **evade**: __________
