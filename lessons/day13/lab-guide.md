# Day 13 — Lab Guide
**Goal:** Inside your Day 12 range, (1) capture live traffic and identify the DNS query + TCP handshake (the Day 4 story, visible), and (2) scan your range target to list its open ports.

**Prerequisites:** Your safe range (Day 12) running — an attacker box + a target VM on isolated networking. Wireshark and Nmap installed on the attacker box. **Only target your own range host.**

---

## Task 1 — Capture the Day 4 story (Wireshark) (10 min)
1. On the attacker box, open Wireshark and start capture on the range interface (the one reaching your target — NOT your real internet).
2. From the attacker box, browse or `curl` your **range target** (e.g., its IP or a local hostname).
3. Stop capture. Apply filter `dns` → you should see the **DNS query** ("A? <target>") and its answer.
4. Apply filter `tcp.flags.syn==1` → you should see the **TCP handshake**: SYN → SYN-ACK → ACK.
5. Note: this is Day 4 steps 2-5, happening on screen.

## Task 2 — Map the attack surface (Nmap) (6 min)
1. Run `nmap <range-target-IP>` (your own target only).
2. Read the output: which ports are **open** (service listening)? Example: `22/tcp open ssh`, `80/tcp open http`.
3. Write each open port + its service. Each is a "door" — a defender would lock unneeded ones (least privilege for services).

## Task 3 — (Optional) See confidentiality-in-transit (4 min)
If your range target serves **plaintext HTTP**, capture a request in Wireshark and confirm the `GET /` line is readable. This shows why Day 4 taught HTTPS (no TLS = C broken in transit). **Do not** do this against any real/site external host.

---

## ✅ Checkpoint (show instructor before leaving)
- [ ] Captured traffic to your range target only
- [ ] Identified the DNS query + TCP handshake (SYN/SYN-ACK/ACK)
- [ ] Ran Nmap on your target and listed open ports

## Troubleshooting
- *No packets in Wireshark:* you're capturing the wrong interface — pick the one with range traffic (not "any"/Wi-Fi to the internet). Ask the instructor.
- *Nmap finds nothing:* confirm the target IP is correct and reachable from the attacker box (ping it first, in-range only).
- *Wrong target by accident:* stop immediately; re-confirm you're using the range IP (Day 12 scope). Never scan outside the range.

> ⚠️ **Ethics + scope (Day 1/12):** these tools run **only on your range target**. Scanning or capturing anything outside it is unauthorized. The range is what makes this legal.
