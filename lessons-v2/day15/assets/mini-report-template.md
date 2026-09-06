# Mini engagement report — <target>

*Tester: __________   Date: __________   Authorization: class ROE (Northwind Traders lab)*

---

## 1. Summary

*(3–4 sentences: what the target is, what you found, the headline risk, and — one line — the fix.)*

> ____________________________________________________________________
> ____________________________________________________________________

## 2. Scope & method

- **In scope:** `<target>` only, class session, per the signed ROE.
- **Method:** recon → `nmap -sV -sC` → triage against CVE/exploit data → exploit one finding for proof.
- **Tools:** nmap, searchsploit, Metasploit, <others>.

## 3. Service inventory (from the scan)

| Port | Service | Version | Notes |
|------|---------|---------|-------|
| | | | |

## 4. Finding

- **Title:** ____________________________________________________
- **Severity:** CVSS ____ ( ____________ ) — adjusted to **____** for this context because ______
- **CVE / reference:** ____________________________
- **Evidence:** *(screenshot filename + one line of what it shows — e.g. `proof-id.png`: `id`
  returns `uid=0(root)` after running the module)*
- **Steps to reproduce:**
  1. ________________________________________________
  2. ________________________________________________
  3. ________________________________________________
- **Impact:** *(what an attacker gains — full host control? the customer database? another
  user's account?)*
- **Remediation:** *(patch to version X / remove the service / config change / network isolation)*

## 5. What I'd do next

*(2–3 sentences: a second finding to chase, post-exploitation to attempt, other services to enumerate.)*

> ____________________________________________________________________
