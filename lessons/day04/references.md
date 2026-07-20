# Day 4 — Reference Sheet
*Keep this for the whole course.*

- **TCP:** reliable, connection-oriented. **Three-way handshake:** SYN → SYN-ACK → ACK. (FIN = close.) Re-sends lost packets, guarantees order.
- **UDP:** connectionless, "fire and forget." Fast, no guarantees. Used for DNS, video/voice, gaming.
- **Ports (common):** 80 = HTTP (unencrypted web) · 443 = HTTPS (encrypted web) · 53 = DNS · 22 = SSH.
- **DNS:** translates name → IP (distributed: resolver → root → TLD → authoritative).
- **Page load (7 steps):** type URL → DNS resolve → TCP handshake to :443 → HTTP GET (in TLS) → HTML response (encrypted) → fetch assets → render.
- **TLS bridge:** encrypts the *content* of steps 4–5; the destination IP (envelope address) stays visible to routers.
- **Failure points:** DNS spoofing (wrong IP) · unencrypted HTTP (eavesdropping) · open ports (attack surface).
- **Tools used today:** `ping` · `nslookup` / `dig` (DNS) · browser DevTools → Network (watch requests). **Wireshark is introduced on Day 13** — the same DNS query and handshake you saw today, but captured on the wire.
- **Commands:** `ping <target>` · `nslookup` / `dig <domain>` · DevTools (F12) → Network.

## Further reading
- "How DNS works" — Cloudflare Learning / howdns.works (cartoon explainer).
- "TCP three-way handshake" — any networking primer.
- Note: TLS/certificates deepened in Web Security (Day 16).
