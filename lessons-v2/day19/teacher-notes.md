# Day 19 — Teacher Notes

**Teach from:** `day19.md` (deck + speaker notes).
**This file:** cut-list, background, the log-analysis answer key, the tabletop facilitation
guide, checkpoint, exit check, FAQ.

**The defensive payoff of the whole course.** Every attack from Days 11–18 shows up here as a
tell. Point back across the course constantly.

---

## The analogy — the security office (kitchen)

The SOC = the security office watching the camera feeds and the door logs. **Detection** =
noticing the back door opened at 3am. **Incident response** = the practiced routine: confirm
it's real → lock the affected room (not the whole building) → find the way in and close it →
check nothing's left behind → restock → debrief. **"Pull the plug"** = torching the building:
you lose the footage and tip off the intruder.

---

## Must-teach vs. cut-if-short

**Never cut:**
- **Logs are ground truth** + the source list.
- **IOC vs TTP** (the Pyramid of Pain — detect behaviours, not just artifacts).
- **The IR lifecycle** (Prepare → Detect → Contain → Eradicate → Recover → Learn).
- The **log-analysis DO** (IOCs + timeline + first containment step).
- **"Contain ≠ pull the plug."**

**Cut in this order if behind:**
1. AD event-IDs slide → 2 min ("Windows logs a numbered event for every security action; know
   4625 failed logon and 4688 process creation").
2. The tabletop → 10 min, first 3 stages only.
3. SIEM slide → 3 min (collect → search → alert; a SIEM without rules is just storage).
4. The Pyramid diagram → keep IOC-vs-TTP, drop the drawing.

---

## Background

### Log sources (what a SOC ingests)
- **Auth:** Linux `/var/log/auth.log` (`sshd`, `sudo`, `su`, PAM); Windows Security event log;
  IdP logs (Okta/Entra); VPN; RADIUS.
- **Endpoint:** EDR (CrowdStrike/Defender/SentinelOne) — process trees, command lines, file &
  registry writes, network per process; Sysmon on Windows (a free, rich event source: process
  creation w/ hashes, network connections, image loads).
- **Network:** firewall allow/deny; **NetFlow/IPFIX** (who talked to whom, how much); DNS
  query logs; web proxy; Zeek/Suricata; NDR.
- **Application:** web server access/error; WAF; database audit; app-specific audit trails.
- **Cloud:** AWS CloudTrail (every API call), GuardDuty; Azure Activity + Sign-in logs; GCP
  Cloud Audit Logs; SaaS admin/audit logs (Google Workspace, M365).
- **Retention** is a Prepare decision — 90 days hot, a year+ cold is typical; regulated
  industries longer.

### SIEM / detection
- Pipeline: collect (agents/forwarders/APIs) → parse & normalise (a common schema like ECS or
  OCSF) → enrich (GeoIP, threat intel, asset/user context) → store & index → **detection
  rules** → alerts → **case management** → dashboards & hunting.
- Products: **Splunk**, **Microsoft Sentinel**, **Elastic Security**, **Wazuh** (free/OSS),
  Chronicle, QRadar. Log shippers: Fluent Bit, Vector, Winlogbeat, the Elastic Agent.
- **Sigma** — a vendor-neutral detection-rule format ("detection as code"); converts to
  Splunk/Elastic/Sentinel queries.
- **SOAR** — automates response playbooks (enrich an alert, isolate a host, disable a user)
  from the SIEM.
- Reality check: **alert fatigue** is the #1 SOC problem — most alerts are false/benign; tuning
  and prioritisation is the craft. A SIEM you bought and didn't tune = expensive storage.

### IOC vs TTP — the Pyramid of Pain (David Bianco)
Bottom (easy for attacker to change, low value to you) → top (hard to change, high value):
**hash values → IP addresses → domain names → network/host artifacts → tools → TTPs**.
Blocking a hash stops one sample; detecting "a web-server process spawned a shell" (a TTP)
stops the whole class of intrusion. Mature SOCs write behaviour-based detections mapped to
**MITRE ATT&CK** techniques.

### Windows security event IDs (the SOC shortlist)
| ID | Meaning | Attack it reveals |
|---|---|---|
| 4624 | logon success (check Logon Type: 3=network, 10=RDP) | lateral movement, off-hours logons |
| 4625 | **failed logon** | brute force, password spray |
| 4672 | special privileges assigned at logon (admin) | privileged account use |
| 4688 | **process creation** (+ command line if audited) | execution, LOLBins, recon |
| 4720 / 4726 | account created / deleted | rogue account creation |
| 4728 / 4732 / 4756 | member added to a (global/local/universal) group | privilege escalation |
| 4698 | scheduled task created | persistence |
| 7045 (System log) | service installed | persistence, PsExec |
| 4104 (PowerShell Operational) | script block logging — the actual script text | fileless / obfuscated PowerShell |
| 4768 / 4769 / 4771 | Kerberos TGT / service ticket / pre-auth failed | Kerberoasting (4769 w/ RC4), AS-REP roasting |
| 1102 | the audit log was cleared | anti-forensics |
Linux equivalents live in `auth.log`, `syslog`, `audit.log` (auditd), and Sysmon-for-Linux.

### The IR lifecycle (NIST SP 800-61r2 / SANS "PICERL")
- **Preparation** — policy, the IR plan, an on-call rota, tooling, comms templates, legal &
  insurer contacts, tabletop exercises, and — critically — **logging + backups**.
- **Detection & Analysis** — validate the alert (true positive?), scope it (how many hosts /
  accounts / data), build the **timeline**, determine severity, declare an incident.
- **Containment** — short-term (isolate) then long-term (rebuild segment). Preserve evidence.
- **Eradication** — remove malware/backdoors/accounts, patch the entry point, **rotate every
  credential the attacker could have touched**.
- **Recovery** — restore from known-good backups, rebuild (don't clean), heightened
  monitoring, staged return to production.
- **Post-incident / lessons learned** — a blameless review within ~2 weeks: what happened,
  what worked, what would have caught it sooner, action items with owners.
It's a **loop** — findings feed Preparation.

### Chain of custody (the basics)
Document every action: who, what, when, where, why. Hash evidence at collection (`sha256sum`)
and store the hash separately. Keep original media read-only; work on copies. Matters for
prosecution, insurance claims, and regulatory reporting.

### Containment nuance
- **Network isolation** (VLAN quarantine, EDR "contain host", switch port shutdown) keeps the
  box running so you can capture **memory** (volatile: processes, network state, injected
  code, keys) and disk before shutdown.
- **Full power-off** is justified when: ransomware is *actively* encrypting and isolation
  isn't fast enough; or destruction is imminent. Even then, isolate first if you can.
- Disable the account (don't delete — you lose audit linkage). Block C2 at DNS + firewall.
- **Don't** log into the compromised host with Domain Admin — you just handed the attacker
  those creds.

---

## `assets/logs/` — answer key

**IOCs:**
| Type | Value |
|---|---|
| Attacker IP | `203.0.113.66` |
| Exfil / C2 host | `198.51.100.23` |
| Compromised account | `deploy` (a service/deploy account with SSH password auth + sudo) |
| Web shell | `/var/www/html/uploads/shell.php` (uploaded via `upload.php`, which has no file-type check) |
| Persistence | `/etc/cron.d/apache-cache` → runs `/tmp/.sync` every 10 min as root |
| Tool dropped | `/tmp/ls.tgz` / `/tmp/.sync` (from `203.0.113.66:8000`) |
| Data exfiltrated | ~1.4 GB to `198.51.100.23:443`, 03:05–03:26 |

**Timeline:**
| Time | Event | Evidence | ATT&CK |
|---|---|---|---|
| 02:14–02:18 | SSH brute force against `deploy` (7+ failures) | auth.log | Credential Access — Brute Force (T1110) |
| 02:19:44 | **successful** SSH login as `deploy` from `203.0.113.66` | auth.log | Initial Access — Valid Accounts (T1078) |
| 02:20:02 | `sudo apt-get install netcat` | auth.log | Resource Development / tooling |
| 02:21:07 | web shell uploaded via `POST /uploads/upload.php` | web-access.log; network-notes (apache2→sh→wget) | Persistence — Web Shell (T1505.003) |
| 02:23–02:25 | commands via `shell.php?cmd=` (`id`, `whoami`, `cat /etc/passwd`) | web-access.log | Discovery |
| 02:27 | `wget` of `ls.tgz` to `/tmp` | web-access.log; network-notes | Ingress Tool Transfer (T1105) |
| 02:32–02:33 | `sudo cp` a script into `/etc/cron.d/apache-cache`; `/tmp/.sync` created | auth.log; network-notes | Persistence — Cron (T1053.003) |
| 02:39–02:53 | internal port scan of `10.0.2.0/24` (~4,000 conns) | web-access.log (`shell.php?cmd=nmap...`); network-notes | Discovery — Network Service Scanning (T1046) |
| 02:55 | web server connects to internal MySQL `10.0.2.20:3306` | network-notes | Lateral Movement / Collection |
| 03:05–03:26 | ~1.4 GB outbound to `198.51.100.23:443` | network-notes | Exfiltration Over C2 / Web (T1041) |
| 03:12 | `/tmp/.sync` beacons to `198.51.100.23` every 10 min | network-notes | Command and Control (T1071) |
| 03:29 | attacker SSH session closed | auth.log | — |
| 06:41 / 08:02 | the *real* `deploy` user (publickey from `10.0.2.9`) + normal web traffic | auth.log; web-access.log | benign — don't flag these |

**Root cause:** `upload.php` accepts any file type (no validation) → a `.php` web shell in a
web-served directory; **and** the `deploy` account allowed SSH **password** auth with a weak
password and broad `sudo`. Either alone is bad; together = full compromise.
**One fix that prevents it:** disable SSH password auth (keys only) + restrict `upload.php` to
image types stored outside the web root. (MFA on SSH / fail2ban would also have broken the
brute force.)

**Best first containment step:** **network-isolate `10.0.2.15`** (EDR contain / quarantine
VLAN / shut the switch port) — keeps it running so IR can capture memory and disk, stops the
exfil and the internal scan, and doesn't tip the attacker as hard as a shutdown. Immediately
after: disable `deploy`, block `203.0.113.66` and `198.51.100.23` at the firewall + DNS,
preserve logs. **Not** yet: power it off, or start deleting files.

---

## Ransomware tabletop — facilitation

Read each stage, then go round the room / teams: **now what? who do we call? what do we NOT
do?** ~3 min per stage. There are no scored answers — you're rehearsing the sequence and the
calm.

| Stage | What good teams say |
|---|---|
| 3 users can't open files | treat as a possible incident, not a helpdesk ticket; check for a common factor (share, patch, user group); preserve one affected machine |
| a share is hit + a ransom note | **declare an incident**; convene the IR team; isolate the affected segment/share; identify patient zero; **check backups — are there offline/immutable copies?** |
| 400 GB "exfiltrated" + backups encrypted | engage **legal + comms + insurer + law enforcement/CERT**; assume data loss (breach notification obligations); do **not** pay reflexively (no guarantee, may fund crime, may be sanctioned); scope the exfil from network logs |
| journalist emails | **only comms/legal respond**; no one else talks; prepare a holding statement; this is why you have a comms plan (Prepare) |

The lesson: every good move traces back to **Preparation** — the plan, the contacts, the
offline backups, the practice. Teams that flounder are missing a Prepare item.

---

## Demo runbook

### Log-analysis DO
- Hand out `assets/logs/` (3 short text files) + `timeline-template.md`.
- Coach with `grep`: `grep "Failed password" auth.log | wc -l`, `grep 203.0.113.66 *`,
  `grep "cmd=" web-access.log`.
- Push them to **separate benign from malicious** — the 06:41 publickey login and the
  198.51.100.7 web traffic are normal; flagging them is a false positive.
- The deliverable is IOCs + an ordered timeline + one containment step with a reason.

### Failure modes
| Symptom | Fix |
|---|---|
| students flag the real `deploy` login (06:41) as the attack | "what's different?" — publickey vs password, internal IP `10.0.2.9`, morning not 2am |
| "there's no smoking gun" | there rarely is one line — it's the *sequence*: failures → success → child shell → cron → scan → exfil |
| tabletop goes quiet | call on a team directly: "you're the on-call analyst, it's 09:25, what's your first action?" |
| debate about paying the ransom | park the ethics, focus on process: who decides, what info do they need |

---

## Checkpoint (by end of class)

Each student can:
- [ ] name 4 log sources and one thing each reveals
- [ ] explain IOC vs TTP and why detecting TTPs is more valuable
- [ ] list the IR lifecycle phases in order
- [ ] from a log set: extract the IOCs and put the events in order
- [ ] say why "pull the plug" is usually the wrong first move

---

## Exit check (last 2 min)

1. An attacker changes their C2 IP after each victim. Which is more durable to detect — the IP
   (an IOC) or "the malware beacons every 10 minutes" (a TTP)? — *The TTP — they can't easily
   change how they operate.*
2. You confirm a server is compromised and actively beaconing. First move? — *Network-isolate
   it (keep it running), then disable the account and block C2 — not power-off.*
3. Which IR phase determines whether the other five go well? — *Preparation.*

---

## FAQ

- **"Isn't detection just buying a good tool?"** The tool is 20%. The 80% is the analyst, the
  tuned rules, the log coverage, and the practiced process.
- **"How do SOCs cope with millions of events?"** Normalisation + correlation + prioritisation.
  Rules and ML surface the ~dozens worth a human look; the rest is searchable if needed.
- **"Should we always preserve evidence over speed?"** No — it's a deliberate trade-off. If
  data is being destroyed *now*, stopping it wins. Otherwise, isolate and preserve.
- **"Do small companies really do IR?"** They should have a one-page plan and a retainer with
  an IR firm. Most don't — and then the incident costs 10× more.
- **"Blue team vs Red team — which pays more / is better?"** Both are solid careers; SOC roles
  are the biggest entry point (Day 20). Do the one whose day-to-day you'd enjoy.
