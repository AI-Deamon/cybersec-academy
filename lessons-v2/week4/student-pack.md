# Week 4 — Student Pack

*Practical Cyber Security (v2) · Week 4: Applying it, and choosing a direction*

> **Formative quiz:** `week4/quiz.md` — 10 questions, self-check. Do it before the weekend assignment.

The week you take what you can do and turn it into a direction — Red, Blue, or a wing. Same
course repo. Same lab, same ROE. **Test only the lab targets or your own machines.**

---

## Day 16 — Web exploitation

### Recap
- **Every web bug is the same bug:** untrusted input reached something powerful (a query, the
  page's HTML/JS, an auth check, a server-side request) because it wasn't checked at the
  **trust boundary** (Day 10).
- **OWASP Top 10** = the categories that actually cause breaches, refreshed ~every 4 years.
- **SQL Injection:** input is glued into a query string, so `'` breaks out and the rest is
  run as SQL. Login bypass (`' OR '1'='1' -- `), UNION extract
  (`' UNION SELECT user,password FROM users -- `), blind (true/false or time-based).
  **Fix: parameterized queries** — the query template and the values travel separately.
- **XSS:** input is put into the page and the browser runs it. **Reflected** (one victim, via
  a link) · **Stored** (saved, hits every viewer — worse) · **DOM** (client JS mishandles
  input). Real impact: **steal the session cookie** → become that user. **Fix:** context-aware
  **output encoding** + a **Content-Security-Policy** + **HttpOnly** cookies.
- **Broken Access Control / IDOR:** the app checks *authentication* (logged in?) but not
  *authorization* (allowed *this* record?). Change `id=1001` → `1002`. **Fix:** a server-side
  ownership check on **every** request.
- **Broken auth/session:** no lockout, weak/reusable tokens, session not killed on logout.
  **Fix:** MFA, rate-limit, random tokens, `Secure`/`HttpOnly`/`SameSite`, invalidate on logout.
- **SSRF:** you give the app a URL, it fetches it server-side → point it at `localhost` or the
  cloud metadata service. **Fix:** destination allowlist, block internal ranges.
- **Filtering `'` / `<` / `script` does NOT fix injection or XSS.** The fix is structural
  (parameterize / encode), which makes it *impossible*, not *harder*. A **WAF** is a layer,
  not the fix.

### Key terms
`OWASP Top 10` · `SQL injection` · `parameterized query / prepared statement` · `UNION` ·
`blind SQLi` · `XSS (reflected / stored / DOM)` · `output encoding` · `CSP` · `HttpOnly` ·
`IDOR` · `authentication vs authorization` · `broken access control` · `session fixation` ·
`SSRF` · `cloud metadata` · `WAF` · `Burp Suite`

### In class — the 3 beats
1. **SQLi** in DVWA — login bypass + `UNION SELECT user,password FROM users`; then bump DVWA to
   *Medium* and see filtering isn't the fix.
2. **Stored XSS** — `<script>alert(document.cookie)</script>` in a saved field; reload → it fires.
3. **IDOR** in Juice Shop — change `/rest/basket/<id>` in the API call → another user's basket.

### Homework (due start of Day 17)
1. Complete `day16/web-vulns.md` — the **find / prove / fix** table for **all 5** vuln classes,
   each with your own proof screenshot from the lab. Commit it.
2. Write the **one-line code fix** for SQLi (parameterized query) and XSS (output encoding) in
   any language.
3. `assets/vuln-code.md` — rewrite both vulnerable snippets safely.
4. Add the key terms above to your glossary.

### Marking checklist (Day 16 homework, 6 marks)
- [ ] find/prove/fix table: all 5 classes, each with a **valid** find + prove + structural fix (3)
- [ ] proof screenshots present for at least SQLi, XSS, IDOR (2)
- [ ] `vuln-code.md` both snippets rewritten correctly (parameterize / encode) (1)

---

## Day 17 — After the break-in: post-exploitation + infra & cloud

### Recap
- **A shell is the start, not the end.** Post-exploitation goals: **escalate** privileges →
  **persist** → **discover** → move **laterally** → collect creds & data → **exfiltrate** — quietly.
- **Privilege escalation** — you land limited, you want root/SYSTEM. The pattern: *something
  powerful trusts something you control.*
  - Linux: SUID binaries, `sudo` misconfig (any editor/`find`/interpreter = root shell),
    writable cron/service, kernel exploits, capabilities.
  - Windows: unquoted service paths, weak service permissions, token impersonation, stored creds.
  - Tools that hunt the path: `linpeas` / `winPEAS`.
- **Persistence** = a way back in that survives reboot (cron, a service, an SSH key, a Run key).
- **Lateral movement** = reuse creds/hashes/keys to hop to the next box (pass-the-hash, reused
  local-admin passwords → LAPS).
- **Pivoting** = route your traffic *through* the compromised host to reach networks you can't
  touch directly (SSH tunnel, MSF route). **One foothold → the whole internal network.**
- **Every attacker step is a detection opportunity** (new process, service created, unusual
  `sudo`, SMB auth from a workstation, large outbound). That's the Red→Blue bridge (Day 19).
- **Infrastructure:** **segmentation** (the workstation LAN must not reach the database — a
  flat network = one foothold owns everything) · default-deny firewalls incl. **egress** ·
  IDS/IPS · VPN (encrypts + authenticates, but a stolen VPN cred = inside) · bastion hosts.
- **Cloud — shared responsibility:** the provider secures *the cloud* (hardware, hypervisor,
  backbone); **you** secure *what's in it* — your **data**, your **access config (IAM)**, your
  patching, your firewall rules. **Always yours: identity, data, configuration.**
- **Two classic cloud failures:** a **public storage bucket** (`Principal: "*"`), and
  **over-broad IAM** (`Action: "*"`) — which an **SSRF → metadata endpoint** (Day 16) turns
  into full account takeover. Fix both with **least privilege** — same lesson as `chmod 777`.

### Key terms
`shell (reverse / bind)` · `meterpreter` · `privilege escalation` · `linpeas / winPEAS` ·
`persistence` · `lateral movement` · `pass-the-hash` · `pivoting` · `SSH tunnel` ·
`segmentation` · `zero trust` · `egress filtering` · `bastion / jump host` ·
`shared responsibility` · `IAM` · `least-privilege policy` · `S3 Block Public Access` ·
`IMDS / instance metadata` · `IMDSv2`

### In class — the 2 beats
1. Guided Metasploit on `<LAB_HOST>` (Metasploitable2): shell → `linpeas` / `sudo -l` /
   `find / -perm -4000` → one escalation path → **root** → screenshot the chain.
2. Read `assets/bad-policy.json` + `assets/bad-bucket-policy.json` — say what each allows,
   spot the `"*"`, rewrite least-privilege.

### Homework (due start of Day 18)
1. `day17/attack-chain.md` — the full chain (foothold → priv-esc → persistence → lateral →
   data → exfil) with **one detection opportunity per step** (`assets/attack-chain-template.md`).
2. Engagement Journal Phase 5: your priv-esc chain on Metasploitable2 (start user → flaw →
   command → root) + screenshot.
3. Commit your least-privilege rewrites of both policy files.
4. Add the key terms above to your glossary.

### Marking checklist (Day 17 homework, 6 marks)
- [ ] attack-chain diagram: all steps, ≥ 5 detection opportunities that are actually plausible (3)
- [ ] priv-esc chain in the Journal with a screenshot proving `uid=0` (2)
- [ ] both policies rewritten to least privilege (correct removal of the `"*"` over-grant) (1)

---

## Day 18 — AI & cyber security

### Recap
- **The core problem:** an LLM has **no boundary between instructions and data** — the system
  prompt, your message, and any document/email/web-page it processes are one text channel it
  continues. So **untrusted text anywhere in the context can redirect the model.** (Day 10's
  question, with everything in the same channel — which is why it's *hard, not a bug to patch*.)
- **AI as a target:**
  - **Prompt injection — direct** (you type the malicious instruction) vs **indirect** (an
    attacker plants it in content the model reads: a web page, email, PDF, résumé, code
    comment, a doc in a knowledge base). **Indirect + tools is the real threat** — the model
    can be told to send email, run code, exfil data.
  - **Jailbreaks** (bypass safety), **model/data poisoning**, **improper output handling**
    (the model's output used unsanitised → XSS/SQLi/RCE — Day 16, new source), **excessive
    agency**, **system-prompt leakage**, **supply chain** (a backdoored model/dataset).
- **AI as a weapon:** phishing at scale (perfect grammar, personalised, any language — kills
  "spot the typos"), **deepfake voice/video** (the $25M video-call fraud), malware assistance,
  faster recon. *Lowers the skill floor, raises the speed and volume.*
- **AI as a defender's tool:** SOC copilots (triage, summarise, write detection queries),
  anomaly detection, code review, log analysis. "AI security engineer" is a real, growing role.
- **Governance:** **shadow AI** — staff pasting code / customer data / secrets into public
  chatbots is the #1 real AI risk today. Fixes: an approved tool + a clear policy + DLP +
  **human-in-the-loop** for consequential actions + logging.
- **Mitigating prompt injection — no perfect fix**, defend in depth: all model input is
  untrusted · separate instructions from data · filter output & never run it as code ·
  **least-privilege tools** · human confirmation · guardrail models.

### Key terms
`context window` · `prompt injection (direct / indirect)` · `jailbreak` · `system prompt` ·
`RAG` · `improper output handling` · `excessive agency` · `model poisoning` ·
`system-prompt leakage` · `OWASP LLM Top 10` · `deepfake` · `shadow AI` · `human in the loop` ·
`guardrail model` · `NIST AI RMF` · `MITRE ATLAS`

### In class
1. **Gandalf** (gandalf.lakera.ai) — get the password from as many levels as you can, **log
   which technique beat which level**.
2. Design the mitigations — `assets/indirect-injection-demo.md`: rewrite an email-assistant so
   an indirect-injection exfil fails at **two** layers.

### Homework (due start of Day 19)
1. `day18/ai-attacks.md` — **3 AI attacks** (from Gandalf + the LLM Top 10), each with what it
   is, an example, and one mitigation. Plus your Gandalf technique log. Commit it.
2. Write a **4-sentence AI-use policy** for a small company (what staff may / may not paste
   into public AI tools, and why).
3. Add the key terms above to your glossary.

### Marking checklist (Day 18 homework, 5 marks)
- [ ] 3 AI attacks, each with a valid example **and** a real mitigation (3)
- [ ] Gandalf technique log — at least 3 levels with the technique named (1)
- [ ] AI-use policy — concrete about what not to paste, with a reason (1)

---

## Day 19 — Blue team: detection & incident response

### Recap
- **Prevention fails — so the job is detect fast + respond calmly + learn.** Assume breach.
  Metrics: **MTTD** (mean time to detect), **MTTR** (mean time to respond).
- **Logs are ground truth.** Sources: **authentication** (logins, failed logins, `sudo`, new
  accounts) · **endpoint / EDR** (process creation, command lines, file writes) · **network**
  (firewall, DNS, netflow, proxy) · **application** (web access/error, DB audit) · **cloud**
  (CloudTrail). *If it isn't logged, it didn't happen — to you.*
- **SIEM** = collect logs everywhere → normalise → store (searchable) → alert on rules →
  dashboards. Splunk / Sentinel / Elastic / Wazuh. **A SIEM with no tuned rules is just
  expensive storage**; alert fatigue is the #1 SOC problem.
- **IOC vs TTP:** an **IOC** is a specific artifact (IP, hash, domain, filename) — cheap to
  block, trivial to change. A **TTP** is the behaviour ("creates a scheduled task for
  persistence") — harder to detect, but the attacker **can't easily change how they operate**.
  Mature SOCs detect **TTPs** (the Pyramid of Pain).
- **Windows event IDs a SOC watches:** 4625 (failed logon), 4688 (process creation), 4720
  (user created), 7045 (service installed), 4104 (PowerShell script), 4769 (Kerberos —
  Kerberoasting). *Know they exist; look them up.*
- **IR lifecycle:** **Prepare** (the plan, tools, contacts, logging, backups, practice — 90%
  of success) → **Detect & Analyse** → **Contain** → **Eradicate** → **Recover** → **Lessons
  learned**. It's a loop.
- **Containment ≠ pull the plug.** Yanking power destroys volatile evidence (memory, running
  processes) and tips the attacker. Better: **network-isolate** the host (keep it running),
  **disable** the account, **block** the C2, **preserve** evidence (chain of custody).
  Power-off only when data is being destroyed *right now*.

### Key terms
`assume breach` · `MTTD / MTTR` · `log sources` · `EDR` · `Sysmon` · `SIEM` · `Sigma` ·
`SOAR` · `alert fatigue` · `IOC` · `TTP` · `Pyramid of Pain` · `MITRE ATT&CK` · `event 4625` ·
`event 4688` · `IR lifecycle` · `containment` · `network isolation` · `eradication` ·
`chain of custody` · `tabletop`

### In class — the 2 beats
1. **Analyse `assets/logs/`** (auth.log + web-access.log + network-notes.txt): extract the
   IOCs, build the **timeline** (`timeline-template.md`), decide the **first containment step**
   and why.
2. **Ransomware tabletop** — the scenario read in 4 stages; at each: what now, who do we call,
   what do we NOT do.

### Homework (due start of Day 20)
1. Finish the **incident timeline** — every event, timestamped, IOCs listed. Commit `day19/timeline.md`.
2. Write a **5-step IR runbook** for a compromised web server (`ir-runbook-template.md`) —
   detect → contain → eradicate → recover → learn, 2–3 bullets each. Commit `day19/ir-runbook.md`.
3. From the tabletop: 3 sentences on what your team would do **differently** with more preparation.
4. Add the key terms above to your glossary.

### Marking checklist (Day 19 homework, 6 marks)
- [ ] timeline: events in correct order, timestamped, with evidence cited; the benign entries
      (the 06:41 publickey login, normal web traffic) **not** flagged as attack (3)
- [ ] all 7 IOCs identified (attacker IP, exfil host, account, web shell, persistence, tool, data volume) (2)
- [ ] IR runbook: 5 phases, each with plausible actions; the "do NOT pull the plug" nuance present (1)

---

## Day 20 — Careers, specialization, and the capstone

### Recap
- **You now know enough to choose a direction.** The map: **Red** (pentest, red team, AppSec,
  bug bounty, exploit dev) · **Blue** (SOC, IR/DFIR, detection engineering, threat intel,
  security engineering) · **the wings** (GRC, cloud security, AI/ML security, architecture,
  product security). Not a hierarchy — different temperaments. **Most careers move between them.**
- **What the days actually look like** — see `assets/roles-reference.md`. Key notes:
  pentesting is ~40% report writing; **SOC L1 is the biggest entry door in India** (MSSPs and
  GCCs); **GRC is real, stable, paid security** for organised communicators; detection
  engineering suits people who liked *both* the Red days and Day 19.
- **The Indian fresher reality:** many "junior" roles ask for 2 years of experience. What
  breaks that: **(1) a visible portfolio** (your repo), **(2) one relevant cert**, **(3) being
  able to talk through a project** in the interview. Apply for internships from month 2.
- **Certs are an HR filter, not a qualification.** Blue: **Security+** → BTL1 → CySA+. Red:
  **eJPT** → PNPT/CPTS → **OSCP**. Cloud: the provider's associate security cert. **CISSP
  needs ~5 years' experience — not a fresher cert.** Don't collect certs — pick one for your
  door and go deep. Free/cheap: TryHackMe, HTB, PortSwigger Web Academy, OWASP.
- **Your portfolio repo > this course's certificate.** Finalise it: a README listing every
  artifact, pinned, share-ready, with a "what I learned" paragraph and your roadmap.

### The whole course, in three lines
1. **Everything is untrusted input** until it's checked at the boundary.
2. **Least privilege + assume breach** — the two ideas behind almost every control.
3. **You learn security by doing it** — and you have a repo full of proof.

### In class
1. **Skills self-assessment** (`assets/skills-self-assessment.md`) — rate 1–5; your highest
   cluster is a signal toward a door.
2. **"Which door + why + 3 next steps"** (`assets/roadmap-template.md`) + a 60-second pitch.
3. Draft your **portfolio README** (`assets/portfolio-readme-template.md`).

---

## The Capstone (final assignment)

*Submit **one PDF + your repo link**. The biggest single piece — start this weekend. Only your
assigned capstone target. Snapshot first.*

### Part A — Cross-domain engagement
On the capstone target, run the full lifecycle and deliver **two** proven findings — **one web
vulnerability** (SQLi / XSS / IDOR / …) **and one infrastructure / service finding** (an
exploitable service, a misconfiguration, a privilege-escalation path). For each:
**find → prove (captioned screenshot + numbered steps) → fix.** Use your Week-3 report format.
~4 pages: scope → service inventory → ranked findings → the two proven findings → remediation.

### Part B — Incident writeup
From the provided incident logs (`capstone/incident-logs/`): the **timeline** (every event,
timestamped, with evidence), the **IOCs**, a **5-step IR response** (detect → contain →
eradicate → recover → learn), and **the one root-cause fix** that would have prevented it.

### Part C — Career roadmap + portfolio
- **"Which door and why"** — 1 page, tied to what you actually enjoyed in the course.
- A **6-month plan** — a named cert, a named learning path, **2 projects**, **1 community**.
- Your **finalised portfolio README** (committed to the repo root).

### Part D — Final reflection
- The four "so what": **what surprised me · what was hardest · what I'm best at · what's next.**
- A **self-assessment** against the course objectives (`assets/skills-self-assessment.md`).

### Marking checklist (25 marks)
- [ ] A — web finding: proven with captioned evidence + numbered reproduction + a correct structural fix (4)
- [ ] A — infra/service finding: proven + reproduction + fix (4)
- [ ] A — scope, service inventory, and a ranked findings table, all from real work (3)
- [ ] B — incident timeline: correct order, evidence cited, benign events not flagged (3)
- [ ] B — IOCs complete; 5-step response is plausible; root-cause fix is correct (3)
- [ ] C — "which door" reasoned and tied to the course; 6-month plan is concrete (a named cert/path/projects) (3)
- [ ] C — portfolio README committed, lists the artifacts, share-ready (2)
- [ ] D — four "so what" answered honestly + a real self-assessment (2)
- [ ] submitted as one PDF + a working repo link, on time (1)
