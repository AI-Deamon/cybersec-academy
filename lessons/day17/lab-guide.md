# Day 17 — Lab Guide
**Goal:** Inside your Day 12 range, (1) observe that traffic on a shared segment is visible (the sniffing concept from Day 13), and (2) reason about firewall + segmentation rules that contain network attacks. Concepts demonstrated safely; no attacks outside the range.

**Prerequisites:** Your safe range running (attacker box + target on isolated networking). Wireshark available. **Only observe your own range traffic.**

---

## Task 1 — Observe the shared road (sniffing concept) (10 min)
1. In the range, capture traffic between your boxes with Wireshark (as on Day 13).
2. Confirm: on the shared segment, you can see packets passing — that's *why* sniffing works.
3. If any captured traffic is plaintext (e.g., HTTP), note it is readable by anyone on that segment = **C in transit**. The fix is TLS (Day 4/13). (No external capture.)

## Task 2 — Map a firewall / segmentation rule (8 min)
1. Look at your range's networking (host-only/NAT, no route to prod). That *is* a segmentation rule.
2. Write one firewall-style rule in plain language, e.g., "Only allow port 443 from outside; block all other inbound." Explain: it controls *who may talk to what*.
3. Explain how segmentation limits **blast radius**: if the lab segment is breached, it can't reach the production segment.

## Task 3 — Threat → CIA → defense (6 min)
For sniffing, MITM, spoofing, and DoS, write:
- CIA letter broken
- The matching defense (TLS / firewall / segmentation+access-control / rate-limiting)
This is the attack+defend table for the network layer.

---

## ✅ Checkpoint (show instructor before leaving)
- [ ] Observed range traffic is visible on the segment (sniffing concept)
- [ ] Wrote/explained a firewall + segmentation rule and its blast-radius limit
- [ ] Mapped the 4 threats to CIA + defense

## Troubleshooting
- *Can't see peer traffic in Wireshark:* on some isolated setups traffic stays host-local; that's fine — note "segmentation already limits visibility" and move on. Ask the instructor.
- *Want a real MITM demo:* keep it conceptual/range-only; an actual ARP-spoof needs specific lab support — ask before attempting.
- *Wrong target:* observe only your range. Never capture outside it (Day 12 scope).

> ⚠️ **Ethics + scope (Day 1/12):** observe **only your range**. Sniffing others' traffic without permission is unauthorized. The point is to *understand* the threat and the defense, not to attack anything real.
