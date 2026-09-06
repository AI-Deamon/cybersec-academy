# Week 4 — Student Pack

*Practical Cyber Security (v2) · Week 4: Applying it, and choosing a direction*

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

## Day 19 — *(to be added)*
## Day 20 — *(to be added)*

---

## Weekend Assignment — Week 4 (the capstone)

*Briefed at the end of Day 20. A cross-domain find-and-fix (web + infra) + an IR scenario walk-through
+ your career roadmap ("which door and why" + the next 3 steps). Full spec added on Day 20.*
