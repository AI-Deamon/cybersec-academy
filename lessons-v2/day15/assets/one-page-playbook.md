# One-page pentest playbook (Days 12–15)

*Print this. It's the whole lifecycle on one page.*

## 0. Before anything
- Confirm your target is **in your ROE**. Only that target.
- **Take a VM snapshot** so you can roll back.

## 1. Scope (Phase 1)
- Target: __________   Authorization: the signed ROE   Goal (1 sentence): __________

## 2. Recon (Phase 2)
- Lab target → note the host and what you expect to see.
- Real target (passive only): `dig`, crt.sh, headers, `robots.txt`, job ads.

## 3. Scan & enumerate (Phase 3)
```
nmap -sn <range>                 # who's up
nmap -sV -sC -oA run <TARGET>    # ports, versions, default scripts
nmap -p- <TARGET>                # all ports if time
# service-specific:
enum4linux <TARGET>              # SMB
nikto -h http://<TARGET>         # web quick pass
```
→ Fill the **service inventory**: host | port | service | version | notes.

## 4. Triage (Phase 3 → decide)
For each open service ask:
- exact **version**? → `searchsploit <service> <version>` / NVD
- **public exploit**? (Exploit-DB / Metasploit module / GitHub PoC)
- on **CISA KEV**?
- **reachable** from where you are? what's behind it?
→ Pick the one finding with: known CVE **+** public exploit **+** reachable.

## 5. Get proof (Phase 4) — ONE of:
- **a shell** — Metasploit module, or run a searchsploit script (`searchsploit -m <id>`)
- **extracted data** — a DB dump, `/etc/passwd`, a config file, a user's private data
- **a bypass** — log in without credentials, read another account's data (IDOR), an auth skip

Metasploit shape:
```
msfconsole -q
search <thing>
use <module>
show options
set RHOSTS <TARGET>
set LHOST <your-kali-ip>        # only for reverse shells
run
```

## 6. Evidence (feeds Phase 6)
- Screenshot the **proof** (the `id`, the data, the bypassed page) **and** the command.
- Note the **time**.
- Save `nmap -oA` output.

## Stuck? The ladder
1. Re-read the scan — exact version? `-sC` output?
2. `searchsploit` — is there anything?
3. Metasploit — read the error, it names the missing option (usually RHOSTS/RPORT/LHOST).
4. Try a different finding.
5. Ask: "target / what I tried / the error".
