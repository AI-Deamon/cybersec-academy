# Day 14 — Lab Guide
**Goal:** Inside your Day 12 range, run a vulnerability scanner against your target (the one Nmap mapped on Day 13) and **triage the findings by CIA + risk** — producing a fix-order list.

**Prerequisites:** Your safe range running (attacker box + target VM). A vuln scanner provisioned (Nuclei or OpenVAS per the ADD tool list). **Only scan your own range target.**

---

## Task 1 — Scan the range target (8 min)
1. Confirm the target IP = your Day 12/13 range target (not any real/external host).
2. Run the scanner against that IP (e.g., `nuclei -u http://<target>` or OpenVAS against the host).
3. Let it finish. You should see a findings list — these are the "broken things behind the doors" Nmap found.

## Task 2 — Map two findings to CIA + risk (8 min)
For at least two findings, write:
- CIA impact: which property is at risk (C/I/A)?
- Threat: is a public exploit known / how reachable?
- Vulnerability: what's weak (EOL version, weak config)?
- Impact: how bad if exploited?
- Rough risk: High / Medium / Low.
This is Day 11's formula on real output.

## Task 3 — Triage order (6 min)
Sort your findings into: **Fix now / Schedule / Accept-note.**
- Justify at least one decision where **risk**, not raw severity, drove the order (e.g., a medium on a public service outranks a critical on an isolated one).
- Note: if you got zero findings, that's a valid result — write "target clean / confirm scanner reached it."

---

## ✅ Checkpoint (show instructor before leaving)
- [ ] Scanned your range target only (confirmed IP)
- [ ] Mapped ≥2 findings to CIA + risk
- [ ] Produced a triage order (Fix now / Schedule / Accept-note) with a risk-based justification

## Troubleshooting
- *No findings:* confirm the target IP is reachable from the attacker box and the scanner is pointed at the right service (e.g., `http://` for web). A clean scan is fine — document it.
- *Scanner errors:* check it's installed/updated; ask the instructor which tool is provisioned.
- *Wrong target:* stop immediately; re-confirm the range IP (Day 12 scope). Never scan outside the range.

> ⚠️ **Ethics + scope (Day 1/12):** scan **only your range target**. A vulnerability scanner *identifies*, it does not exploit — but scanning outside your authorized range is still unauthorized. Keep scan output in the range (it's sensitive).
