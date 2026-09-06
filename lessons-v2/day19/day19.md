---
marp: true
theme: dark-monospace
paginate: true
title: "Day 19 — Blue Team: Detection & Incident Response"
footer: "Practical Cyber Security (v2) · Week 4 · Day 19"
---

<!-- _class: lead -->

# Blue team
## Day 19 — See it fast, respond calmly — the defender's whole job

**Week 4 · Applying it, and choosing a direction**

<!--
RUN SHEET (~85 min). Two DOs: log analysis, then a tabletop.
00:00 Journey check + hook (the attack chain, in the logs)     4
00:04 Prevention fails — so what's the job                     4
00:08 Logs are ground truth                                    7
00:15 SIEM — the concept                                       5
00:20 IOCs vs TTPs (the Pyramid of Pain)                       6
00:26 Windows / AD event IDs a SOC watches                     4
00:30 The IR lifecycle                                         6
00:36 DO: analyse the log set -> IOCs + timeline              22
00:58 Containment done right (the trap)                        5
01:03 DO: 15-min ransomware tabletop                          15
01:18 Wrap + artifact + homework                               4
CUT FIRST IF SHORT: the AD event-IDs slide to 2 min; the tabletop to 10 min.
NEVER CUT: logs-as-ground-truth, IOC vs TTP, the IR lifecycle, the log-analysis DO,
"contain != pull the plug".
ANALOGY (kitchen): the SOC = the security office watching the camera feeds and the door logs.
Detection = noticing the back door opened at 3am. IR = the practiced response: confirm it's
real, lock the affected room (not the whole building), find the way in and close it, check
nothing's left behind, restock, debrief. "Pull the plug" = torching the building - you lose
the footage and tip off the intruder.
-->

---

## Where we are

- **Every day this course** paired an attack with a defence.
- **Today is the defence** — the whole thing, as a job: the SOC, detection, incident response.
- You take the **Day 17 attack chain** and **catch it.**
- Tomorrow: your career path — including whether *this* is it.

<!--
Journey Check. This is the defensive payoff of the entire course. Every attack you learned
shows up here as something to detect.
-->

---

## Hook — the attacker was loud

*(show the Day 17 attack chain)*

Every step left a trace:

```
brute force -> failed logins in auth.log
foothold    -> a shell process spawned by the web server
priv-esc    -> sudo to a shell
persistence -> a new cron entry
recon       -> a burst of internal connections
exfil       -> a large outbound transfer to a new IP
```

**A defender who's *looking* sees all of it. Today you look.**

<!--
The framing: attackers aren't invisible - they're just usually unwatched. The Blue team's job
is to watch the right things and know what "wrong" looks like.
-->

---

## Prevention fails — so what's the job?

**Assume breach** (Day 10). Prevention will miss something. So the Blue team:

1. **Detect** fast — the sooner you see it, the less damage.
2. **Respond** calmly — a practiced process, not panic.
3. **Learn** — every incident makes the next one easier to catch.

Metrics: **MTTD** (mean time to detect), **MTTR** (mean time to respond).

<!--
This reframes "we got breached" from "we failed" to "prevention did its job for the 99, this
is the 1, now execute the plan". That mindset shift is half of being good at Blue.
-->

---

## Logs are ground truth

| Source | Tells you |
|---|---|
| **Authentication** | logins, failed logins, `sudo`, new accounts, MFA prompts |
| **Endpoint / EDR** | process creation, command lines, file writes, network connections per process |
| **Network** | firewall allow/deny, DNS queries, netflow (who talked to whom), proxy |
| **Application** | web access & error logs, DB queries, app audit trails |
| **Cloud** | API calls (CloudTrail), console logins, resource changes |

**If it isn't logged, it didn't happen — to you.** Log *before* you need it.

<!--
The recurring failure in real incidents: "we don't have logs for that time period / that
system / that action". Logging + retention is a Prepare-phase decision.
-->

---

## SIEM — the concept

**Collect** logs from everywhere → **normalise** → **store** (searchable) → **alert** on rules
→ **dashboard**.

- Splunk · Microsoft Sentinel · Elastic · Wazuh (free).
- It's a giant searchable haystack **plus tripwires**.
- The analyst **writes detection rules**, **investigates alerts**, and **hunts** for what the
  rules missed.

<!--
"We bought a SIEM" != "we have detection". A SIEM with no tuned rules is expensive storage.
The value is the analyst + the rules + the tuning.
Detection-as-code: Sigma is a vendor-neutral rule format.
-->

---

## IOCs vs TTPs — the Pyramid of Pain

- **IOC** (Indicator of Compromise) — a specific artifact: an **IP**, a **file hash**, a
  **domain**, a filename, a registry key. Cheap to block. **Trivial for the attacker to change.**
- **TTP** (Tactic / Technique / Procedure — MITRE ATT&CK, Day 12) — the **behaviour**:
  *"creates a scheduled task for persistence"*, *"dumps LSASS"*. Hard to detect — but the
  attacker **can't easily change how they operate.**

```
  TTPs         <- most painful for the attacker to change (detect these)
  Tools
  Network/Host artifacts
  Domain names
  IP addresses
  Hash values  <- easiest for the attacker to change (least valuable)
```

<!--
David Bianco's Pyramid of Pain. Blocking a hash stops today's sample; detecting "process X
spawned a shell" stops the whole technique. Mature SOCs move UP the pyramid.
-->

---

## Windows / AD event IDs a SOC watches

| Event ID | Meaning |
|---|---|
| **4624 / 4625** | logon success / **failed logon** (brute force, spray) |
| **4672** | logon with admin privileges |
| **4688** | a process was created (+ command line) |
| **4720 / 4728 / 4732** | user created / added to a group |
| **7045** | a service was installed (persistence) |
| **4104** | PowerShell script block (what the script actually did) |
| **4768 / 4769** | Kerberos TGT / service ticket (Kerberoasting shows here) |

<!--
These are the ones on a SOC dashboard. You don't memorise them - you know "there IS an event
for logons, for new services, for process creation" and you look them up.
CUT to 2 min: "Windows logs a numbered event for every security-relevant action; 4625 failed
logon and 4688 process creation are the two to know".
-->

---

## The incident response lifecycle

```
 PREPARE  ->  DETECT & ANALYSE  ->  CONTAIN  ->  ERADICATE  ->  RECOVER  ->  LESSONS LEARNED
    ^                                                                              |
    +------------------------------------------------------------------------------+
```

- **Prepare** — the plan, the tools, the contacts, the logging, the practice. **90% of success.**
- **Detect & Analyse** — is it real? what's the scope? build the timeline.
- **Contain** — stop the spread (without destroying evidence — next slide).
- **Eradicate** — remove the foothold, close the entry, rotate credentials.
- **Recover** — restore from known-good, monitor closely.
- **Lessons learned** — what would have caught it sooner? Update the plan.

<!--
NIST SP 800-61 / SANS PICERL. It's a LOOP. "Prepare" is where you win or lose - the incident
is not the time to figure out who has authority to disconnect a server.
-->

---

## Do it now — analyse the intrusion

You're the on-call analyst. `assets/logs/` has `auth.log`, `web-access.log`, and
`network-notes.txt` from one server.

1. **Find the IOCs** — attacker IP(s), the account used, files dropped, the C2/exfil host.
2. **Build the timeline** — order the events (`assets/timeline-template.md`).
3. **Write the ONE containment step you'd do first** — and why.

<!--
22 min. Work in pairs. The bundle contains: SSH brute force -> a successful login as a service
account -> wget of a webshell -> a cron persistence entry -> an internal port scan -> a large
exfil to an external IP. `grep` + a text editor is all they need.
Answer key + the full timeline in teacher-notes.
-->

---

## Containment done right

> **Trap: "contain = pull the plug."**

Yanking power **destroys volatile evidence** (memory, running processes, network state) and can
**tip off** an attacker who's watching.

**Better first moves:**
- **network-isolate** the host (keep it running — capture memory/disk)
- **disable** the compromised account; force-reset its credentials
- **block** the C2 domain/IP at the firewall + DNS
- **preserve**: document who did what and when; hash the evidence (**chain of custody**)

Speed vs. evidence is a real trade-off — **decide it deliberately**, don't default to panic.

<!--
"Isolate, don't obliterate." Ransomware actively encrypting is the one case where fast
shutdown may be right - and even then, isolate first if you can. Chain of custody matters if
it goes to court or insurance.
-->

---

## Do it now — ransomware tabletop (15 min)

I read the scenario in stages. At each stage: **what do we do now? who do we call? what do we
NOT do?**

- *Mon 09:10* — helpdesk: 3 users in Finance can't open their files.
- *09:25* — it's more than 3. A file share is affected. A `README_RESTORE.txt` appears.
- *09:40* — the note claims 400 GB was copied out. Backups from last night look encrypted too.
- *10:15* — a journalist emails asking for comment.

<!--
No right answers - practice the calm and the sequence. Push for: declare an incident, convene
the team, isolate affected segments, check backup integrity (offline copies?), engage legal +
comms + (maybe) law enforcement + insurer, DON'T pay reflexively, DON'T talk to the press
without comms. This is Prepare paying off - or not.
CUT to 10 min if behind - do the first 3 stages.
-->

---

## Attack ↔ Defence — the whole course, one table

| The attack (this course) | Where the defender catches it |
|---|---|
| phishing (D11) | mail gateway; user report; the click in proxy logs |
| brute force / spray (D11) | 4625 spikes; auth.log; impossible-travel |
| exploit / web shell (D15/16) | odd child process of the web server; a new file in web root; WAF |
| privilege escalation (D17) | `sudo` to a shell; 4672/4688; EDR |
| persistence (D17) | new cron / service (7045); file-integrity monitoring |
| lateral movement (D17) | auth from an unusual source; SMB/WinRM where there shouldn't be |
| C2 / exfil (D11/17) | beaconing pattern; large/odd outbound; DNS anomalies; egress filter |

<!--
This is the payoff slide. Every attack has a tell. The Blue team's craft is knowing the tells
and building the detections. Point back across the whole course.
-->

---

## Today's attack / defence / artifact

- **Attack:** every step of an intrusion leaves a trace in some log.
- **Defence:** collect the right logs, know what "wrong" looks like, and run a **practiced**
  IR process — detect → contain (isolate, don't obliterate) → eradicate → recover → learn.
- **Artifact:** a **5-step IR runbook** + the **incident timeline** you built from the logs
  (`day19/ir-runbook.md`, `day19/timeline.md`).

---

## Homework

1. Finish the **incident timeline** from the log set — every event, timestamped, with the IOCs
   listed. Commit `day19/timeline.md`.
2. Write a **5-step IR runbook** for a small company facing a compromised web server:
   detect → contain → eradicate → recover → learn, 2–3 bullets each. Commit `day19/ir-runbook.md`.
3. From the tabletop: 3 sentences on what your team would do **differently** with more
   preparation.
4. Add `SIEM`, `IOC`, `TTP`, `Pyramid of Pain`, `MTTD/MTTR`, `IR lifecycle`, `containment`,
   `chain of custody`, `EDR`, `4625`, `4688` to your glossary.

<!--
Due start of Day 20 (careers + capstone).
-->

---

<!-- _class: lead -->

## Recap

1. **Prevention fails; detection and response is the other half of the job.** Assume breach.
2. **Logs are ground truth** — collect them before you need them; a SIEM without tuned rules is just storage.
3. **Contain ≠ pull the plug.** Isolate, preserve evidence, run the practiced loop. Prepare is 90% of it.

<!--
Say the three lines. Tomorrow: the last day. Which of these lit you up - the Red days or the
Blue day? Careers, specialisations, the cert ladder, and the capstone brief.
-->
