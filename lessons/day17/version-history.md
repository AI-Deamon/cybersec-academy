# Day 17 — Version History

- **v1.0** — Initial lesson built from Course Design Document (Phase 2) + ADD §17 standard. Second day of Module 4 (Application). Applies the Day 16 attack+defend pattern to the **network layer**, reusing the Day 3 "postal system" analogy and Day 13 wire concepts: sniffing (C in transit — the Day 13 risk made real), MITM (C/I; fix TLS + access control), spoofing/ARP (forged identity; fix managed switches), DoS (A; fix rate-limit/scale). Defense toolkit: TLS + firewall + **segmentation** (the Day 12 range principle generalized — limits lateral movement, previews Day 19 IR) + IDS (previews Day 19 Blue) + 802.1X. Bridges: Day 12 range = segmentation in miniature; HTTPS ≠ full net-sec (no A, no access control); network+web(D16)+OS(Wk2) = defense in depth. In-range lab (observe shared-segment visibility; map firewall/segmentation rule + blast radius; threat→CIA→defense table). Includes quiz, references, rubric, four "So What" closer (ADD §17). Follows Day-1 7-file template + Week-1 patterns. Second day of Week 4.

## How to update
Append a new line after each review cycle or cohort:
- **v1.x** – <what changed and why>
- **v2.0** – Major redesign after N student batches
