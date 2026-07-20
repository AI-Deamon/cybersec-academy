# Day 12 — Lab Guide
**Goal:** Stand up a safe, isolated practice lab (the "range") and write its Scope & Authorization statement. No attacks today — setup only.

**Prerequisites:** A computer able to run a local VM (or a browser-based lab provided by the instructor). You must own or be authorized to use whatever you set up.

---

## Task 1 — Identify your safe lab (8 min)
Choose ONE of:
- **A local VM** (VirtualBox/Vagrant) running a purposely-vulnerable Linux image, on **host-only or NAT** networking (no bridge to your real LAN/internet).
- **A browser-based range** the instructor provides (already isolated).
Confirm: the target is something *you own or are explicitly allowed to use*.

## Task 2 — Write the Scope & Authorization statement (8 min)
In your notes, write one paragraph:
> "I am authorized to test [target description / IP] because it is my own lab / I have written permission. It is isolated via [host-only/NAT/browser-range], with no route to production or the internet. In-scope: recon + safe testing per the course. Out-of-scope: anything outside the range."

This is your "permission slip" for Days 13-15.

## Task 3 — Confirm isolation (6 min)
- If using a VM: verify networking is host-only/NAT (not "Bridged"). A Bridged adapter could reach your real network — avoid it for learning.
- If using the browser range: trust the instructor's isolation; note it in your statement.
- Write one line: "If something breaks in the range, it stays in the range."

---

## ✅ Checkpoint (show instructor before leaving)
- [ ] Identified a safe lab you own/are authorized to use
- [ ] Wrote a Scope & Authorization paragraph (target + isolation + in/out scope)
- [ ] Confirmed isolation (host-only/NAT or provided range)

## Troubleshooting
- *No VM software:* use the instructor's browser-based range, or a minimal Linux VM (1-2 GB RAM is enough). Ask the instructor.
- *VM won't start:* check RAM/VT-x settings; the instructor can help. Don't bridge to the real network to "fix" connectivity.
- *Unsure if authorized:* when in doubt, use only your own local VM. Never test a system you don't have rights to.

> ⚠️ **Ethics (Day 1), operationalized:** the range is the ONLY place you test. No real systems, no "just checking a friend's site," no pivoting outside the range. Authorization + isolation = the whole difference between a pro and a criminal.
