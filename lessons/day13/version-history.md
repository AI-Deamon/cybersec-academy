# Day 13 — Version History

- **v1.0** — Initial lesson built from Course Design Document (Phase 2) + ADD §17 standard. First hands-on tool day, used *inside the Day 12 range*. Deliberately **defers Wireshark from Day 4**: students already understand TCP/DNS conceptually, so today they *capture* the actual DNS query + TCP handshake (the Day 4 "how a web page loads" story made visible on the wire) — reusing `diagrams/page-load-signature.md` from the "packets on the wire" perspective. Nmap introduced as port/service mapper = attack-surface (Availability) exposure. Attack+defend framed throughout (defender maps & locks; attacker maps & enters — same command, ethics decide). Connects Day 11 CIA (Wireshark→Confidentiality-in-transit; Nmap→Availability exposure) and Day 12 range rules (scope only your target). Includes an in-range lab (capture DNS+handshake; Nmap the target; optional plaintext-HTTP C demo), quiz, references, rubric, and the four "So What" closer (ADD §17). Follows Day-1 7-file template + Week-1 patterns. Third day of Week 3.

## How to update
Append a new line after each review cycle or cohort:
- **v1.x** – <what changed and why>
- **v2.0** – Major redesign after N student batches
