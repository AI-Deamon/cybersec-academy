# Day 17 — Reference Sheet
*Keep — the network is the shared road.*

- **Shared road:** on a broadcast segment, traffic is observable (sniffing). Fix: TLS.
- **Sniffing/MITM** → C/I; fix = TLS + access control (no untrusted networks).
- **Spoofing/ARP** → forged identity; fix = managed switches (DAI), no flat trust.
- **DoS** → A (resource exhaustion); fix = rate-limit/scrub/scale.
- **Defenses:** TLS (encrypt) + firewall (gate) + segmentation (fences) + IDS (watchtower) + 802.1X (keep strangers off).
- **Day 12 range = segmentation in miniature.** HTTPS ≠ full net-sec (no A, no access control).

## Further reading
- TLS, firewalls, VLANs/segmentation, IDS/IPS, ARP spoofing basics.
- Day 18: same ideas in cloud (security groups, VPC). Day 19: detect/contain via monitoring.
