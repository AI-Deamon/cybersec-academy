# Cyber security roles — a reference

*Day 20 handout. Day-to-day, what to learn, and the usual way in. India-focused where it matters.*

## RED — build / break

### Penetration Tester (VAPT)
- **Day:** scoped engagements (web / network / mobile / API / cloud), then **report writing**
  (~40% of the job). Client calls. Retests.
- **Learn:** the lifecycle (this course), Burp, `nmap`, Metasploit, web (OWASP), AD basics,
  clear writing. Then eJPT → PNPT/CPTS → OSCP.
- **Way in (India):** VAPT consultancies (large and boutique), the security teams of GCCs.
  A portfolio of CTF/lab writeups + one cert.

### Red Teamer
- **Day:** long, quiet, goal-driven operations that also test whether Blue detects you.
  OPSEC, custom tooling, patience.
- **Learn:** everything a pentester knows + evasion, C2 frameworks, AD deeply, detection
  engineering (to know what you're evading). Usually 3–5+ years in first.

### Application Security (AppSec) Engineer
- **Day:** code review, threat modelling, secure-SDLC, triaging bug reports, building
  guardrails, teaching developers. Sits between security and engineering.
- **Learn:** how to code well, the OWASP Top 10 deeply, threat modelling, CI/CD, SAST/DAST.
- **Way in:** strong fit for CS/IT students — you already read code.

### Bug Bounty Hunter
- **Day:** self-directed. Pick programs, hunt, write reports, get paid per valid bug.
  Feast or famine; needs discipline.
- **Learn:** web/mobile/API depth, recon automation, reading a lot of disclosed reports.
- **Reality:** a great skill-builder and portfolio; a hard *primary* income for most.

### Exploit Developer / Vulnerability Researcher
- **Day:** deep and slow — reverse engineering, fuzzing, memory corruption, writing PoCs.
- **Learn:** C, assembly, OS internals, a debugger, fuzzing. Very niche, well-paid, small field.

---

## BLUE — defend / respond

### SOC Analyst (L1 → L2 → L3)
- **Day:** triage SIEM alerts, investigate, decide "real or noise", escalate, document.
  **L1 is often shift work** (24/7 coverage). **The single biggest entry door in India.**
- **Learn:** logs, a SIEM (Splunk/Sentinel/Elastic), the IR lifecycle, MITRE ATT&CK,
  networking, common attacks. Security+ → BTL1 → CySA+; TryHackMe "SOC Level 1".
- **Way in:** MSSPs and GCCs hire L1 analysts in volume — Bengaluru, Hyderabad, Pune, Chennai,
  Gurugram, Noida.

### Incident Responder / DFIR
- **Day:** called in when it's serious. Forensics (disk, memory, network), containment,
  eradication, the report. High pressure, high impact, sometimes travel/odd hours.
- **Learn:** forensics tooling (Volatility, Autopsy, KAPE), Windows/Linux internals, malware
  triage, the IR process. Often SOC → DFIR.

### Detection Engineer
- **Day:** write and tune detection rules (Sigma/KQL/SPL), reduce false positives, map
  coverage to ATT&CK, build automation. **Coding + attacker knowledge.**
- **Learn:** a query language, ATT&CK, how attacks actually look in logs, some Python.
- **Fit:** you enjoyed the Red days *and* Day 19.

### Threat Intelligence Analyst
- **Day:** research threat actors and campaigns, produce briefings, feed detections and
  leadership. Heavy reading and writing.
- **Learn:** OSINT, the intel cycle, ATT&CK, geopolitics, strong writing.

### Security Engineer
- **Day:** build and run the defensive infrastructure — SIEM pipelines, IAM, network security,
  automation, hardening at scale. Often the **best-paid** Blue role.
- **Learn:** solid dev + ops (cloud, IaC, CI/CD, scripting) on top of security.

---

## THE WINGS

### GRC / Security Analyst (Governance, Risk, Compliance)
- **Day:** risk assessments, audits, control mapping, policy, vendor reviews, evidence
  collection for ISO 27001 / SOC 2 / PCI / DPDP. **Communication-heavy, less terminal.**
- **Learn:** the frameworks, risk methodology, audit basics, clear writing. ISO 27001 LI/LA.
- **Reality:** stable, in demand, well-paid, and **not "lesser security"** — a real path for
  organised people who communicate well.

### Cloud Security Engineer
- **Day:** IAM design, security-group/config review, IaC scanning, CSPM, cloud IR, guardrails.
- **Learn:** one cloud deeply (its IAM, networking, logging), Terraform, the provider's
  associate security cert. **Hot market.**

### AI / ML Security
- **Day:** securing ML pipelines and LLM apps, red-teaming models, prompt-injection defence,
  AI governance. New and growing (Day 18).
- **Learn:** how models work, the OWASP LLM Top 10, MITRE ATLAS, plus AppSec fundamentals.

### Security Architect (senior)
- Designs the whole defensive picture; sets standards; reviews designs. Needs breadth + years.

### Product Security
- The AppSec of a company's *own* product team — threat modelling features, securing the SDLC,
  running the bug-bounty program.

---

## The three things that matter for a fresher (India)

1. **A visible portfolio** (a GitHub repo of real work — you have one).
2. **One relevant cert** (Security+ for Blue/general; eJPT for Red; a cloud associate for cloud).
3. **You can talk through a project** in the interview — what you did, why, what you'd do next.

Apply for **internships from month 2**. "Junior" roles that ask for 2 years — apply anyway if
the portfolio is strong.
