# Ranked findings — <host>

*Day 14 artifact + Week 3 assignment Part A. One row per candidate finding, ranked by priority.*

## Triage table

| # | Finding | CVE | CVSS (base) | Public exploit? | On CISA KEV? | Exposed / context | Priority | Fix |
|---|---------|-----|-------------|-----------------|--------------|-------------------|----------|-----|
| 1 | | | | | | | P1 | |
| 2 | | | | | | | P2 | |
| 3 | | | | | | | P3 | |

**Priority = f(CVSS, exploit availability, exposure, sensitivity of what's behind it).**
Not just CVSS.

## False positives / needs verification

| Finding | Why it might be wrong | How I'd confirm |
|---------|-----------------------|-----------------|
| | scanner guessed from version banner only | try the actual exploit / check config / vendor advisory |

## Executive summary (P1s only, one paragraph)

> _______________________________________________________________________
> _______________________________________________________________________

## Finding detail (repeat per P1/P2)

- **Title:**
- **Severity:** CVSS <n> (<vector>) — adjusted for context: <higher/lower> because <...>
- **Evidence:** (scan output line, screenshot file, `searchsploit` result)
- **Steps to reproduce:**
- **Impact:** (what an attacker gains)
- **Remediation:** (patch to version X / disable feature / network-isolate / config change)
- **References:** (NVD link, vendor advisory, KEV)
