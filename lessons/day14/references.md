# Day 14 — Reference Sheet
*Keep — vuln management is a recurring defender task.*

- **Scanner:** identifies known weaknesses (CVEs, misconfig) against a DB; does **not** exploit. Ports (Day 13) → services → vulns.
- **Triage:** CIA impact + exposure → Fix now / Schedule / Accept-note. Risk order, not raw severity.
- **Validate:** false positives exist; confirm (version/mitigating control) before acting.
- **Attack+defend:** same scan data; keep results private (roadmap for attackers).
- **Range only (Day 12):** scan your own target.

## Further reading
- CVE/CVSS basics; Nuclei/OpenVAS usage (per ADD tool list).
- Day 15: why the code behind a web finding is flawed (untrusted input).
- Day 16: an attacker *exploiting* what today you only identified.
