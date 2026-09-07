# SecureCorp Capstone — what changed from v1 to v2, and why

*For the instructor. The student handbook is `SecureCorp-Engagement-v2.md`.*

The v1 handbook (`../Home_lab_setup.docx`) has genuinely strong pedagogy — the consultant
framing, the Security Operations Loop, the Red→Blue role switch, "teach the goal not the
commands," the evidence discipline, the honest "detection is never complete" lesson. **v2 keeps
all of that.** It fixes three practical problems and adds one thing the design needed.

## 1. The lab is now genuinely isolated (was: on the student's home Wi-Fi)

**v1** told students to set the Metasploitable2 target to a **Bridged** adapter — putting a
machine with a root backdoor (port 1524), a backdoored vsftpd, an open distcc RCE and
world-readable NFS **onto their home Wi-Fi**, reachable by the ISP router, a housemate's
laptop, a smart TV. The ROE acknowledged the trade-off and called it acceptable. It isn't —
that's the kind of setup that turns up in an incident post-mortem.

**v2:** the default and only supported architecture is a **VirtualBox Internal Network**
(`intnet`) — all three VMs on it, **nothing bridged, nothing on a real network**. The attacker
VM gets a temporary NAT adapter for tool installation only, then it's disabled. WSL2 is
**dropped as the attacker option** (it can't reach an isolated VirtualBox network, which is the
only reason v1 went to bridged). Full build with exact commands and static-IP config:
`../../lessons-v2/LAB-SETUP.md` §3.

## 2. Wazuh is positioned by hardware reality (was: mandatory on 8 GB)

**v1** made Wazuh (manager + indexer + dashboard) a Core requirement and recommended 8 GB. The
OpenSearch indexer alone wants 2–4 GB; running it beside Metasploitable2 + the Windows host +
a browser on 8 GB is the #1 reason student labs don't work.

**v2:**
- **Core, everyone:** *manual* log analysis first — read the raw `auth.log`, correlate by
  source IP and timestamp by hand (Task 3.2). This is the SOC skill and it's *better* first
  exposure than a dashboard.
- **Challenge / Core-if-16GB / shared server:** deploy Wazuh, ingest the same logs, and
  compare its coverage to the manual analysis (Task 3.4).
- **Stretch:** one custom Wazuh rule.

Students on 8 GB do the full Core project with no SIEM install and a shared instructor Wazuh
for the comparison if they want it.

## 3. Week 3 now has something to genuinely investigate (was: "find my own six attacks")

**v1's** Week 3 asked students to investigate their own Week 2 attacks — but they did all of
it, so every investigation concluded "it was me." The "arrives after the fact, doesn't know
what happened" framing never landed.

**v2:** you run **`seed-incident.sh`** on each student's target before Week 3 (after they pass
the Week 2 gate). It plants a small, realistic intrusion the student did **not** cause —
command-injection initial access from a *different* internal IP, an SSH foothold as `msfadmin`,
a cron persistence entry, a failing C2 beacon. Details randomise per student (attacker IP,
hour, filenames) so answers can't be copied.

**Task 3.3** is now the real work: go through the logs, separate *your* activity
(`10.10.10.5`) from activity that isn't yours, build the timeline, and decide whether
SecureCorp has a genuine incident. That's the actual analyst skill.

Answer key is printed by the script when you run it. Reset with `sudo ./seed-incident.sh --clean`.

## 4. Offensive content is now a real chain (was: brute force + DVWA-at-low only)

**v1's** Week 2 was all credential brute-force plus DVWA at security *low*. A student finished
without exploiting anything — no service vuln, no shell.

**v2** adds **Task 2.3 — exploit one real service vulnerability to a shell** (vsftpd backdoor /
Samba usermap / distccd — pick one from the scan, confirm with `searchsploit`, get a shell,
prove it). Challenge tier adds privilege escalation and hash cracking with `john`. DVWA at
*medium* (Challenge) shows that filtering isn't a fix. The three brute forces stay — the
"same technique, three layers, three log footprints" comparison is still the point.

## 5. Practical fixes

| v1 gap | v2 fix |
|---|---|
| no time estimate | **~35–45 h total**, per-week breakdown (handbook §8) |
| no readiness gates | **Week 1 and Week 2 gates** — hard checklists; the Week 1 gate requires a *visible failed SSH login* before Week 3 |
| brute-force tasks fail silently on wrong usernames | Metasploitable2 accounts listed (`msfadmin`, `user`, `service`, `postgres`, `sys`) |
| no version stamp | "verified against VirtualBox 7.x / Kali 2025.x / Wazuh 4.9, <date>" |
| rubric not mapped to deliverables | **Appendix C** — every rubric line names the tasks it covers |
| `Home_lab_setup.docx` and `Home_lab_setup_1.docx` are byte-identical | delete the duplicate |
| lab outage sinks the capstone | offline fallback bundle (`capstone/offline/`) — see the 20-day course `week4/student-pack.md` |

## Files in this folder

| File | Purpose |
|---|---|
| `SecureCorp-Engagement-v2.md` | the student handbook (convert to PDF/DOCX for distribution) |
| `seed-incident.sh` | you run this on each target before Week 3 |
| `WHAT-CHANGED-v1-to-v2.md` | this file |

Lab build detail: `../../lessons-v2/LAB-SETUP.md`.

## The one decision still yours

**Is this standalone, or the capstone for the 20-day "Practical Cyber Security" course?**
v2 is written to work either way. If you pair it with the 20-day course: the terminology now
matches (Engagement Journal, the lifecycle phases, `searchsploit`, IOCs, the ROE), and this
handbook's Task 2.3 + Task 3.3 are a natural extension of Days 15–19. If it's standalone, it
stands on its own with §6 (R&D) carrying the "you research your way there" load.
