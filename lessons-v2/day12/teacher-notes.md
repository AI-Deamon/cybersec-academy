# Day 12 — Teacher Notes

**Teach from:** `day12.md` (deck + speaker notes).
**This file:** the lab-gate logistics (read first), cut-list, background, checkpoint, exit
check, FAQ.

**Today has one hard requirement: every student's lab is reachable, and they know how to
reset it.** Everything else can slip; that cannot. Most students already built their lab as
**Day 11 homework** (`day11/assets/lab-setup-student-guide.md` — WSL2 + Podman, three targets
with their own IPs: Metasploitable2 `10.89.1.10`, DVWA `10.89.1.20`, Juice Shop `10.89.1.30`),
so today's 18 minutes is mostly a VERIFY pass, not a first-time build. Budget the time anyway —
stragglers and incompatible laptops (Mac/ARM can't run WSL2) still need the full slot on the
shared-Kali fallback.

---

## Lab-gate logistics

**Before class:**
- Have the shared-Kali fallback ready regardless: one account per student, `scanner.py` in each
  home dir, `<LAB_HOST>` and any VPN/creds on the board. Some students *will* need it — Mac/ARM
  laptops can't run WSL2, and some Day 11 installs won't have finished.
- Hand out `assets/lab-connect-checklist.md` (Path A = own Day-11 lab, Path B = shared Kali).

**During the DO:**
- Path A (most students): a quick `~/lab.sh status` + `nmap` pass. Circulate for laptops where
  the containers didn't survive a reboot (`~/lab.sh up` fixes it) or WSL memory was capped too
  low over the weekend.
- **Any student not verified by the end of class → Path B (shared Kali) for now.** They are
  not behind; fix their own lab in office hours before Day 14 (Day 13 is survivable on shared
  Kali).
- **No VM snapshot today** — the targets are containers, not a VM. The equivalent reset (say
  it explicitly, it's new): `sudo podman rm -f <name>` then re-run that target's one build
  command from the Day 11 guide. Have students actually locate that command now, so they're
  not hunting for it mid-exploit on Day 17.

**"Day 12 is the gate" (design doc §7)** — track who's connected on a list. Don't let it slide.

---

## The analogy — the hired health inspector (kitchen)

A pentester = a health inspector you *hired* and gave *written permission* to try to break in,
who then hands you a report with photos and fixes. Does everything a burglar does. The only
difference is the signed authorization. Phases = the inspector's checklist: agree what's in
scope and when → walk the outside, note the doors (recon) → check which are unlocked (scan) →
open one to prove it (exploit) → see how far inside you get (post-exploit) → write it up.

---

## Must-teach vs. cut-if-short

**Never cut:**
- The **6 phases** and what "done" means for each.
- Phase 1: **scope / ROE / signed authorization** ("no scope, no test" as a checklist).
- The **lab connect** (the gate).
- Setting up the **Engagement Journal**.

**Cut in this order if behind:**
1. Kill chain / ATT&CK slide → 3 min, one line ("defenders have the same map; every step you
   take, they can see").
2. The ROE "do it now" → a 5-minute fill of in-scope / out-of-scope / forbidden only.
3. The pentest-vs-redteam-vs-bounty table → keep pentest vs vuln-scan only.
4. The reporting-mindset detail → keep "a finding = risk + evidence + repro + fix".

---

## Background

### The lifecycle — names you'll hear
- **PTES** (Penetration Testing Execution Standard): pre-engagement, intel gathering, threat
  modelling, vuln analysis, exploitation, post-exploitation, reporting.
- **OSSTMM**, **NIST SP 800-115**, **OWASP WSTG** (web-specific) — all the same shape.
- The 6 phases in the deck are the common denominator. Don't drill the taxonomy; drill the flow.

### Phase-by-phase "done"
| Phase | Done when you have... |
|---|---|
| 1 Pre-engagement | a signed ROE + authorization; scope agreed in writing |
| 2 Recon | a target profile — what exists, tech guesses, public exposure |
| 3 Scanning/enum | a service inventory — host, port, service, version |
| 4 Exploitation | proof a specific vuln is real (a shell, extracted data, a bypass) |
| 5 Post-exploitation | the impact mapped — what an attacker reaches from that foothold |
| 6 Reporting | the report delivered and walked through with the client |

### Types of security testing (for the table)
- **Vulnerability assessment/scan** — automated, broad, "what known issues exist?". Output = a
  prioritised list. (Day 14.)
- **Penetration test** — scoped, manual + tools, "can these issues actually be exploited, and
  what's the impact?". Output = a report with proven findings.
- **Red team** — objective-driven ("get domain admin" / "access the payroll DB"), stealthy,
  weeks-long, and it **tests the blue team's detection and response**, not just the tech.
- **Purple team** — red and blue working together, live, to improve detection.
- **Bug bounty** — continuous, crowd-sourced, pay-per-finding, within a published scope.

### Scope & ROE — what actually goes in one
- **Scope:** IP ranges, domains, URLs, apps, accounts provided, physical sites, cloud tenants —
  and an explicit **out-of-scope** list (third parties, shared infra, production during
  business hours...).
- **ROE:** test window (dates + hours), allowed techniques, **explicitly forbidden**
  (DoS/DDoS, destructive actions, data exfiltration limits, no touching out-of-scope), social
  engineering yes/no, physical yes/no, evidence handling & data retention, escalation path,
  "stop conditions" (if you find a real breach, if a system becomes unstable), and emergency
  **contacts** on both sides available during the window.
- **Authorization letter:** signed by someone with authority to grant it (a CISO, an owner —
  not a random manager for systems they don't own). Names the systems and dates. The tester
  **carries it** during the engagement.
- Third-party hosting (AWS, etc.): most cloud providers now allow customer pentesting of your
  own resources without prior approval, but you still can't test another tenant.

### Reporting
- **Executive summary** (risk posture, top 3–5 issues, business impact) + **technical detail**
  (per finding: title, severity, CVSS if used, evidence, reproduction, impact, remediation,
  references) + **methodology & scope** + **appendices** (full scan output).
- Severity: usually CVSS (Day 14) plus business context. "Critical on an internal test box" ≠
  "critical on the internet-facing login".
- Retest: a good engagement includes verifying the fixes later.

### Kill chain / MITRE ATT&CK
- **Lockheed Martin Cyber Kill Chain (2011):** Reconnaissance → Weaponization → Delivery →
  Exploitation → Installation → Command & Control → Actions on Objectives. Linear, attacker-centric.
- **MITRE ATT&CK:** a living matrix of **Tactics** (columns — the adversary's goal: Initial
  Access, Execution, Persistence, Privilege Escalation, ... Exfiltration, Impact) and
  **Techniques** (the specific methods, with IDs like `T1566` phishing, `T1046` network
  service discovery). Built from observed real-world intrusions. SOC teams map alerts to it;
  pentesters map their actions to it; it's the shared vocabulary.
- The teaching point: **offense and defense are one map, read from opposite ends.**

---

## Checkpoint (by end of class)

Each student:
- [ ] can name the 6 phases in order and what "done" looks like for two of them
- [ ] can state why the out-of-scope list matters as much as the in-scope list
- [ ] has a completed (or near-complete) mock ROE
- [ ] **has verified their lab and knows the container reset command** (or is on Path B and logged as such)
- [ ] has the Engagement Journal created with Phase 1 filled

---

## Exit check (last 2 min)

1. What's the one thing that makes a pentester's port scan legal and an attacker's illegal? —
   *Signed authorization within an agreed scope (the ROE).*
2. Which phase's output is the input to Exploitation? — *Scanning & enumeration — the service
   inventory tells you what to try.*
3. You finish testing and found 5 issues but wrote nothing down. What did the client get? —
   *Nothing usable — the report is the product; unreproducible findings don't count.*

---

## FAQ

- **"Is a pentest the same as a red team?"** No. Pentest = scoped, find-and-report as many
  issues as possible. Red team = one objective, stay hidden, test whether defenders catch you.
- **"Do I need the authorization letter if my manager said it's fine?"** Yes, in writing,
  signed by someone who owns the systems. Verbal is not protection.
- **"What if I break the target?"** In this lab: `podman rm -f` and rebuild from the Day 11
  guide — under a minute, no VM snapshot needed. In real life: stop, document, call the
  contact — it's in the ROE.
- **"Can I test my own website / home lab?"** Yes — you own it. Anything you don't own needs
  written permission or a bug-bounty scope.
- **"Why start the report now?"** Because you forget details fast, and the journal doubles as
  proof of what you did and when (which the blue team needs for their timeline).
