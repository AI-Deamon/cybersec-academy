# Day 14 — Teacher Notes

**Teach from:** `day14.md` (deck + speaker notes).
**This file:** cut-list, background, the two answer keys, demo runbook, checkpoint, exit
check, FAQ.

**The whole day is one message: the scanner is a candidate generator; triage is the human
skill and the thing a client pays for.** If a student leaves able to run `nmap --script vuln`
but not to rank the output, the day failed.

---

## The analogy — junior vs senior inspector (kitchen)

The **scanner** = a junior who runs the checklist and flags *everything* ("extinguisher
expired! chipped plate! walk-in's a degree warm!"). The **assessor** = the senior inspector
who says "the expired extinguisher next to the fryer is the one that could kill someone
tonight; the chipped plate is a note for next visit." Same observations, ranked by what
actually matters.

---

## Must-teach vs. cut-if-short

**Never cut:**
- The **pipeline** (version → CVE → CVSS + exploitable? → context → ranked list).
- CVSS **AV / PR / UI** basics — enough to read a vector.
- **The exploitability question** — KEV, Exploit-DB / `searchsploit`, "does a Metasploit
  module exist?".
- Building the **ranked findings table**.
- "**More findings ≠ better report**" — lead with the P1s.

**Cut in this order if behind:**
1. CVSS **Scope** and Temporal/Environmental metrics → mention they exist, move on.
2. EPSS → keep KEV, drop the probability score detail.
3. The report-writing slide → one line: "a finding = title + severity + evidence + repro +
   impact + fix".
4. CPE string detail.

---

## Background

### CVE / NVD / advisories
- **CVE** (Common Vulnerabilities and Exposures) — run by MITRE, funded by CISA. A CVE record
  = an ID + a short description + references. IDs: `CVE-YYYY-NNNNN`.
- **CNAs** (CVE Numbering Authorities) — vendors (Microsoft, Apache, Google...) and coordinators
  who can assign CVEs for their own products.
- **NVD** — NIST's enrichment layer: CVSS score(s), CPE list of affected products/versions,
  CWE (weakness type), reference tags (Exploit, Patch, Vendor Advisory, Third Party Advisory).
- **The vendor advisory is often more precise** on "are *we* affected" — NVD may say "all
  versions < X" while the vendor says "only if feature Y is enabled".
- Other feeds: GitHub Security Advisories (GHSA, great for libraries/npm/pip), OSV
  (open-source), distro trackers (Debian/Ubuntu/Red Hat — they backport fixes, so "Apache
  2.4.29-1ubuntu4.14" may be patched even though "2.4.29" looks old — **check the distro
  package version, not just upstream**).

### CVSS v3.1 — the base vector
`CVSS:3.1/AV:_/AC:_/PR:_/UI:_/S:_/C:_/I:_/A:_`
- **AV** Attack Vector: **N**etwork (remote, over the internet), **A**djacent (same LAN/VLAN),
  **L**ocal (needs local access/a shell), **P**hysical.
- **AC** Attack Complexity: **L**ow (works reliably), **H**igh (needs a race/specific config).
- **PR** Privileges Required: **N**one, **L**ow (a normal user), **H**igh (admin).
- **UI** User Interaction: **N**one, **R**equired (a victim must click/open something).
- **S** Scope: **U**nchanged, **C**hanged (the bug lets you affect components beyond the
  vulnerable one — e.g. a hypervisor escape). Scope:C pushes scores up.
- **C/I/A**: **N**one / **L**ow / **H**igh impact on confidentiality / integrity / availability.
- Bands: 0.0 None · 0.1–3.9 Low · 4.0–6.9 Medium · 7.0–8.9 High · 9.0–10.0 Critical.
- **`AV:N/AC:L/PR:N/UI:N` + high C/I/A = the "unauthenticated remote code execution" shape** —
  the worst, and what "Critical" usually means.
- **Temporal** (exploit maturity, remediation level) and **Environmental** (your asset value,
  your mitigations) metrics exist to turn the base score toward *your* risk — almost nobody
  fills them in, which is why you do the context step by hand.
- CVSS v4.0 exists (2023) with a cleaner model; v3.1 is still what most feeds report.

### Exploitability — the sources
- **CISA KEV** (Known Exploited Vulnerabilities catalogue) — CISA only adds a CVE when there's
  *confirmed* in-the-wild exploitation. US federal agencies have deadlines to patch KEV items.
  **The best free "patch these first" list.** ~1,200+ entries.
- **EPSS** (Exploit Prediction Scoring System, FIRST.org) — a daily-updated probability
  (0–1) that a CVE will be exploited in the next 30 days, from real-world signals. Use it to
  rank the long tail that isn't on KEV.
- **Exploit-DB** — archive of public exploit code. **`searchsploit <term>`** is the offline
  copy on Kali. `searchsploit -m <id>` copies an exploit locally.
- **Metasploit** — `msfconsole` → `search <cve/product>`. A module = point-and-click
  exploitation, which massively raises real-world risk.
- **GitHub / Nuclei templates** — PoCs and detection templates published fast after disclosure.
- **The priority inversion to teach:** `CVSS 7.5 + on KEV + Metasploit module` is a bigger
  emergency than `CVSS 9.8 + no known exploit + not exposed`.

### Scanners — what they are and their limits
- **`nmap --script vuln`** — NSE vuln-category scripts. Free, built in, noisy. Many checks are
  **version-only inferences** → **false positives**. Some (`ftp-vsftpd-backdoor`,
  `smb-vuln-*`) actually test.
- **Nuclei** — fast, template-driven, great for web + known CVEs; community templates updated
  constantly. `nuclei -u http://<host>`.
- **OpenVAS / Greenbone** — full network vuln scanner (like Nessus). Heavy to run; produces
  authenticated + unauthenticated findings with CVSS. Optional instructor demo.
- **Nessus / Qualys / Rapid7** — the commercial standard in industry; same idea, better
  coverage and reporting.
- **Every scanner produces false positives and false negatives.** A finding based purely on a
  banner ("you run Apache 2.4.49 therefore CVE-2021-41773") is a *candidate* until you confirm
  it (config-dependent, or the distro backported the fix).

### Vulnerability management (the defensive program)
Inventory (you can't scan what you don't know you have) → scan regularly (authenticated where
possible) → **prioritise** (CVSS + KEV + EPSS + asset context) → remediate (patch, or a
**compensating control**: WAF rule, network segmentation, disable the feature, tighten config)
→ **verify** the fix → report the trend. Patch **SLAs** by severity (e.g. Critical/KEV in
days, High in weeks). This is a continuous loop, not a once-a-year event.

---

## `sample-vulnscan.txt` — answer key

| # | Finding | CVE | CVSS | Public exploit | KEV | Exposed | Priority | Fix |
|---|---|---|---|---|---|---|---|---|
| 1 | Apache 2.4.49 path traversal → RCE | CVE-2021-41773 | 7.5 (RCE variant higher) | **yes** (PoC + Metasploit) | **YES** (verified) | internet-facing :80 | **P1** | patch Apache to ≥ 2.4.51; disable `mod_cgi`; `require all denied` on `/` |
| 2 | Samba "username map script" RCE | CVE-2007-2447 | ~6 | **yes** (Metasploit) | *students check KEV* | 445 reachable externally | **P1** | patch Samba; never expose 139/445 to the internet |
| 3 | vsftpd 2.3.4 backdoor | CVE-2011-2523 | 9.8 | **yes** (Metasploit) | *students check KEV* | :21 internet-facing | **P1** | replace the backdoored build; disable/remove FTP; use SFTP |
| 4 | MySQL anonymous account, no password | (misconfig, no CVE) | — | trivial | — | 3306 reachable externally | **P1** | set a password / remove anon; bind to localhost; firewall 3306 |
| 5 | Slowloris DoS | CVE-2007-6750 | 7.5 (A only) | yes (tools) | no | :80 | **P2** | `mod_reqtimeout` / `mod_qos`; a reverse proxy / WAF absorbs it |
| 6 | Apache `/server-status` exposed | (misconfig) | ~5.3 | n/a | — | :80 | **P3** | restrict `/server-status` to localhost |

- **False-positive risk:** the `http-vuln-cve2021-41773` script says "LIKELY VULNERABLE
  (mod_cgi enabled?)" — confirm by actually running the path-traversal request, or check
  `httpd -M | grep cgi`. The Slowloris check is also version/behaviour-inferred.
- **Misconfigs, not CVEs:** the MySQL anon account, the exposed `/server-status`, and
  exposing SMB/MySQL to the internet at all.
- **Exec summary:** "Four issues allow full remote compromise of an internet-facing server,
  all with public exploit code — the Apache path-traversal RCE is on CISA's actively-exploited
  list — plus a backdoored FTP daemon, a Samba RCE, and an unauthenticated MySQL account. Any
  one gives an attacker code execution or database access today. Patch Apache and Samba,
  remove FTP, lock down MySQL, and take SMB/MySQL off internet exposure — this week."

---

## Demo runbook

### Hook
State the two CVSS-9.8 findings (deck). Let them argue. Land: "the score didn't change; the
risk did — because of *where the box is*."

### The DO — scan the lab
1. `nmap --script vuln -sV <LAB_HOST>` (Metasploitable2 lights up — vsftpd backdoor, Samba,
   old Apache, etc.).
2. `searchsploit vsftpd 2.3.4` — one line, a Metasploit module. `searchsploit samba 3.0.20`.
3. Walk one finding fully on the projector: banner → NVD lookup → CVSS vector → `searchsploit`
   → KEV check (cisa.gov/known-exploited-vulnerabilities-catalog) → priority.
4. Point at a false positive in the `--script vuln` output.

### Failure modes
| Symptom | Fix |
|---|---|
| `--script vuln` is slow | scope to specific ports: `-p 21,22,80,139,445,3306,8080` |
| `searchsploit` not found | `sudo apt install exploitdb`; or search exploit-db.com in a browser |
| NVD / KEV blocked on campus wifi | use the offline `searchsploit` + `assets/sample-vulnscan.txt`; NVD lookups as homework |
| student wants to *run* the exploit | not today — Day 15 (practice) and Day 16-17 (exploitation). Today we assess and rank. |
| Nuclei huge output | `nuclei -u http://<host> -severity critical,high` |

---

## Checkpoint (by end of class)

Each student can:
- [ ] walk a finding through the pipeline (version → CVE → CVSS → exploit? → context → priority)
- [ ] read `AV:N/AC:L/PR:N/UI:N` and say what kind of attacker that implies
- [ ] name where to check if a public exploit exists (KEV, searchsploit, Metasploit)
- [ ] explain why a lower CVSS on KEV can outrank a higher CVSS that isn't
- [ ] point to a false positive in scanner output and say how to confirm it

---

## Exit check (last 2 min)

1. Two findings: CVSS 9.8 (no public exploit, internal box) vs CVSS 7.5 (on KEV,
   internet-facing). Which first? — *The 7.5 — it's being exploited now and it's reachable.*
2. What does `PR:N` in a CVSS vector mean? — *No privileges required — the attacker needs no
   account on the system.*
3. Your scanner reports 240 findings. What does the client need from you? — *A short ranked
   list — the 3–5 that matter now — not the 240.*

---

## FAQ

- **"Is a high CVSS always urgent?"** No. CVSS ignores exposure, exploitation status, and what
  the asset is worth. Combine it with KEV/EPSS and context.
- **"My scanner says vulnerable but the box is patched."** Likely a version-only guess, or the
  distro backported the fix (the package version is patched even if the upstream version
  string looks old). Verify.
- **"No CVE — so it's safe?"** No — misconfigurations, default credentials, weak permissions,
  and zero-days have no CVE (or none yet). Chained "medium" bugs can equal a critical.
- **"Nessus vs OpenVAS vs Nuclei?"** Nessus/Qualys = the commercial standard, best coverage.
  OpenVAS = free, capable, heavy. Nuclei = fast, template-based, brilliant for web + fresh CVEs.
- **"How often should you scan?"** Continuously / weekly for external, at least monthly
  internal, and always after a major change. Plus watch KEV daily.
