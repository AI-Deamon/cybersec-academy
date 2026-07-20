# Day 13 — Reference Sheet
*Keep — these two tools show up in almost every security role.*

- **Wireshark:** packet capture/analyzer. Start capture on the right interface; filter `dns`, `tcp.flags.syn==1`, `http`. Shows the Day 4 story live.
- **Nmap:** port scanner. `nmap <target>` → open/closed/filtered ports. Open = service listening = attack surface.
- **CIA lens:** Wireshark → Confidentiality in transit; Nmap → Availability exposure (attack surface).
- **Recon is symmetric:** defenders and attackers both map; ethics decide the side.
- **Range only (Day 12):** capture/scan your own target. Never outside the range.

## Further reading
- Wireshark "dns"/"tcp" filters; Nmap default/syn scans.
- Day 14: find weaknesses on the open ports you found today.
- Day 15: Burp intercepts app-layer HTTP (Wireshark's application cousin).
