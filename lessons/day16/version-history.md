# Day 16 — Version History

- **v1.0** — Initial lesson built from Course Design Document (Phase 2) + ADD §17 standard. First day of Module 4 (Application). **Opens with the Burp/DevTools + secure-coding intro moved here from Day 15** (where interception tools belong with web-app attack+defense). Resolves the untrusted-input seed from Day 9 and the named habit from Day 11: SQL injection (untrusted input into a query → fix: parameterized/prepared statements) and XSS (untrusted input echoed → fix: output encoding), each mapped to CIA (I/C). Covers Burp as Wireshark's app-layer cousin (proxy, range-only), OWASP Top 10 as a *map* (categorize → CIA → defense, not recitation), attack+defense for every item, and the secure-coding fix (answers Day 15's "rewrite securely"). Connects Day 5 (HTTP/TLS), Day 11 (CIA + untrusted input), Day 12 (range authorization), Day 13 (Burp/Wireshark distinction). In-range Juice Shop lab (demonstrate SQLi login bypass + XSS; reset). Includes quiz, references, rubric, and the four "So What" closer (ADD §17). Follows Day-1 7-file template + Week-1 patterns. First day of Week 4.

## How to update
Append a new line after each review cycle or cohort:
- **v1.x** – <what changed and why>
- **v2.0** – Major redesign after N student batches
