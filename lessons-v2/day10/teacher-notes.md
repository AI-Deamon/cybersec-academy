# Day 10 — Teacher Notes

**Teach from:** `day10.md` (deck + speaker notes).
**This file:** cut-list, background, the "rank these" + threat-model answer keys, the Week 2
assignment brief guide, checkpoint, exit check, FAQ.

**This is a thinking day, not a hands-on day** — the design's own warning applies: cap the
theory (~25 min) and make the **threat-model exercise** the centre (18 min). The threat-model
+ the assignment brief are the two things that must land.

---

## The analogy — the health-and-safety walkthrough (kitchen)

Threat modelling = walking the kitchen asking: what's valuable (recipe book, till, the
customers' trust), who'd want to harm it (a competitor, a sacked cook, a passing thief), where
are the ways in (back door, delivery hatch, the phone line), and what's the cheapest fix at
each. Assets → actors → entry points → controls.

---

## Must-teach vs. cut-if-short

**Never cut:**
- The precise definitions: asset / vulnerability / threat / threat actor / exploit / risk.
- **Risk = likelihood × impact** (and the trap: it's not the vuln count).
- **The untrusted-input question** — "where does data from outside cross into somewhere powerful?"
- The threat-model exercise.
- The Week 2 assignment brief.

**Cut in this order if behind:**
1. "Rank these" DO → do 2 of the 4.
2. Threat actors slide → 3 minutes, just the table.
3. The defender's-principles slide → name the 5, don't elaborate (they've all appeared before).
4. STRIDE → keep it as the six letters mapped to CIA+2; skip examples.

---

## Background

### The relationships (draw this if asked)
`threat actor` → uses an `exploit` → against a `vulnerability` → in an `asset` → causing
`impact`. `Risk` = P(that chain completes) × impact. **Controls** break the chain somewhere:
remove the vulnerability, block the actor's access, or reduce the impact (backups, isolation).

### Control taxonomies (name them; the assignment doesn't need depth)
- **By function:** *preventive* (stops it — a firewall, input validation), *detective* (spots
  it — logging, IDS), *corrective* (recovers — backups, incident response), plus *deterrent*
  and *compensating*.
- **By type:** *technical* (software/hardware), *administrative* (policy, training),
  *physical* (locks, guards).
- A good design has all functions covered — prevention *will* fail, so you need detection and
  recovery too (assume breach).

### Risk treatment — the four options
**Mitigate** (add a control), **transfer** (insurance, outsourcing), **accept** (document it,
move on — legitimate for low risk), **avoid** (don't do the risky thing). Students often think
"fix everything"; real security is choosing.

### STRIDE ↔ CIA
| STRIDE | Violates |
|---|---|
| Spoofing | Authentication |
| Tampering | Integrity |
| Repudiation | Non-repudiation |
| Information disclosure | Confidentiality |
| Denial of service | Availability |
| Elevation of privilege | Authorization |

### The untrusted-input lens — where it recurs
Day 2 (overflow: input → return address), Day 4 (a request → the app), Day 16 (SQLi: input →
the query; XSS: input → the DOM), Day 17 (SSRF: input → an internal request), Day 18 (prompt
injection: input → the model's instructions). It's the same idea every time. Plant it hard today.

---

## "Rank these" — answer key (argue, don't just grade)

| # | Finding | Likelihood | Impact | Verdict |
|---|---------|-----------|--------|---------|
| 1 | `admin123`, login on the internet | **High** (trivial, exposed) | **High** (full control) | **FIX NOW** |
| 2 | rarely-used internal tool logs usernames verbosely | Low | Low | log it / accept |
| 3 | world-readable DB backup on a staff-only server | Low-ish (needs internal access) | **High** (whole database) | plan a fix — depends how much you trust "staff" and the network |
| 4 | sequential result-PDF filenames (`/pdf/1001`...) | **High** (change one digit) | **High** if marks are sensitive | **FIX NOW** — this is IDOR (Day 16) |

The teaching points: #3 forces the "how trusted is the inside?" conversation (assume breach —
don't). #4 looks trivial but is high/high because it's *trivially* exploitable against a
*sensitive* asset.

---

## Threat-model exercise — a worked example (the result portal)

Drive the drawing; students supply the threats. A good finished model:

**Diagram:** `student browser → [login] → web app → database`; also `web app → email service`
(for OTPs). Trust boundaries: internet→app, app→db.

| Component / flow | STRIDE | Concrete threat | Control |
|---|---|---|---|
| Login form | Spoofing | password spraying — no rate limit or lockout | lockout after N tries + MFA; log + alert on bursts |
| `GET /pdf/<id>` | Info disclosure (IDOR) | change the id, read another student's marksheet | check the PDF belongs to the logged-in user (server-side authz) |
| "Download all marks" export | Denial of service | one expensive request repeated → app falls over | rate-limit; pre-generate; queue |
| Admin "edit grade" | Elevation of privilege / Repudiation | a compromised or malicious staff account changes grades with no trace | least privilege + change approval + immutable audit log |
| DB backups | Info disclosure | backup file world-readable / in web root | `600`, off the web server, encrypted at rest |

Students commit their version as `day10/threat-model.md` (template in `assets/`).

---

## Week 2 assignment brief — guide

Full spec + checklist: `week2/student-pack.md`. Walk each part ~3 min.

- **Part A** is the synthesis of Days 6–9: a half-page threat model of their own VM, then
  hardening (a non-root user, fix 3 weak settings) and — the real point — a **script** (Day 9)
  that flags weak settings. `assets/weak-settings-checklist.md` tells them exactly what to
  check; they write the script. Minimum: checks 1, 3, 5 working.
- **Part B** stretch: a priv-esc technique *not* taught (capabilities, `LD_PRELOAD`, a
  specific GTFOBin, PwnKit/CVE-2021-4034, dirtypipe...) with the fix; **or** 3 Windows LOLBins
  (`certutil`, `regsvr32`, `mshta`, `bitsadmin`, `rundll32`...) — what each does and why
  blocking them outright breaks legit Windows.
- **Part C:** the script + output, `ls -l` before/after, `id` for the new user.
- **Part D:** honest reflection.
- **One PDF before Monday.** Test **only** their own VM.

**Marking:** checklist in the student pack — should be markable in ~4 min.

---

## Checkpoint (by end of the lesson portion)

Each student can:
- [ ] define vulnerability vs threat vs risk without mixing them up
- [ ] place a finding on the likelihood × impact grid and justify it
- [ ] state the untrusted-input question and give one example from Weeks 1–2
- [ ] run the 4 threat-model questions on a simple app and produce 3 threats + 3 controls

---

## Exit check (last 2 min, before the brief)

1. "We have 300 open vulnerabilities." Why isn't that the number that matters? — *Risk is
   likelihood × impact; you act on the few that are high-likelihood **and** high-impact, not
   the raw count.*
2. Name the trust boundary in "user types a search term, the app runs a database query." —
   *user input → the database (where injection lives).*
3. Prevention fails. What two things do "assume breach" tell you to also invest in? —
   *detection and response/recovery.*

---

## FAQ

- **"Isn't threat modelling just guessing?"** It's structured guessing — the 4 questions +
  STRIDE stop you missing whole categories. It's cheaper than finding out in production.
- **"How is risk different from a vulnerability?"** A vulnerability is a weakness. Risk is
  whether that weakness is likely to be exploited and how bad it'd be. A vuln nobody can reach
  = low risk.
- **"Do professionals really use STRIDE?"** Yes (Microsoft's SDL), plus PASTA, LINDDUN
  (privacy), attack trees. STRIDE is the common starting point.
- **"Where does the untrusted-input question come back?"** Almost every attack day — SQLi/XSS
  (16), SSRF (17), prompt injection (18), and it explains the overflow from Day 2.
- **"Is 'accept the risk' just being lazy?"** No — it's a valid, documented decision for low
  risk. Spending ₹10L to fix a ₹5k problem is bad security.
