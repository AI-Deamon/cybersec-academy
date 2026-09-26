# Networking Block -- PPT Plan
**Slide-by-slide deck plan for Days 1-5**

> Follows Presentation-Design-Standard-v1.0.md (Marp, academy-theme.css).
> Each deck = ~12-15 slides. Source format: Marp Markdown (.md).
> Export: HTML (review) + PPTX (teaching).

---

## General Notes

- **Theme:** academy (dark background, --primary blue accent)
- **Font:** Montserrat (headings), Open Sans (body), Consolas (code)
- **Colors:** Attack = red (--warning), Defend = green (--success)
- **Each deck opens with:** Title, Why Learn This?, Learning Journey Check
- **Each deck closes with:** Summary (3 takeaways), Assignment preview
- **Diagrams:** Use consistent box/arrow style from Visual Asset Library
- **Code blocks:** Minimal, captioned, relevant lines only
- **Animations:** Fade only, reveal-on-click for multi-step diagrams

---

# DAY 1 DECK -- "The Invisible Handshake"
**14 slides | ~84 min**

| # | Slide | Content | Visual |
|---|-------|---------|--------|
| 1 | **Title** | "Day 1: The Invisible Handshake" + "What happens when you connect to Wi-Fi?" · Academy logo · Module 3 | -- |
| 2 | **Why learn this?** | Every attack starts with a connection. If you can't trace the first 3 seconds, you can't defend or attack. Used in: SOC, pentest, netsec, IR. | Shield + network nodes icon |
| 3 | **Learning Journey** | "Yesterday: OS and Python. Today: we trace what happens when you connect. Tomorrow: we type a name and see DNS." | Journey map arrow |
| 4 | **The 3 seconds** | When you click Connect: 1) Authentication (Wi-Fi password), 2) Association (join the network), 3) DHCP (get an IP) | 3-step flow diagram |
| 5 | **DHCP explained** | Your laptop shouts "I'm new!" Router responds: IP, Gateway, DNS, Lease. Everything handed to you automatically. | Router -> Laptop with labeled arrows |
| 6 | **DEMO: ipconfig** | `ipconfig /all` -- walk through IPv4, Subnet, Gateway, DNS, DHCP, Lease. "You didn't choose any of this." | Code block + annotated output |
| 7 | **IP vs MAC** | IP = hotel room (temporary). MAC = passport (permanent). Gateway = door to internet. | Building analogy diagram |
| 8 | **DEMO: ping** | `ping 8.8.8.8` -- show round-trip, TTL. "Your packet crossed 5-10 routers in 14ms." | Code block + annotated output |
| 9 | **DEMO: traceroute** | `tracert 8.8.8.8` -- show each hop as a "post office". "Each line is a router that touched your packet." | Chain of post offices diagram |
| 10 | **DNS intro** | You're connected. But your laptop needs to turn names into numbers. `nslookup google.com` -- the phone book. | nslookup output |
| 11 | **ATTACK: Evil Twin** | Attacker sets up fake Wi-Fi. Rogue DHCP hands themselves as gateway. All traffic flows through attacker. | Attack diagram (red arrows) |
| 12 | **Defense** | Verify network name. Use WPA3. Never trust public Wi-Fi without VPN. HTTPS helps but isn't enough. | Defense diagram (green shields) |
| 13 | **Summary** | 3 takeaways: (1) Connection = DHCP + identity, (2) IP is temporary, MAC is permanent, (3) First connection can be intercepted. | Remember callout |
| 14 | **Tomorrow** | "Tomorrow we type google.com and trace what happens before the page loads. DNS is where the next attacks live." | Preview icon |

---

# DAY 2 DECK -- "The Address Book"
**14 slides | ~84 min**

| # | Slide | Content | Visual |
|---|-------|---------|--------|
| 1 | **Title** | "Day 2: The Address Book" + "What happens when you type google.com?" · Academy logo | -- |
| 2 | **Why learn this?** | DNS translates every name to a number. If DNS lies, every site you visit goes to the wrong place. Used in: netsec, web security, IR, pentest. | Phone book icon |
| 3 | **Learning Journey** | "Yesterday: connection + IP. Today: names to numbers. Tomorrow: the actual conversation (HTTP/HTTPS)." | Journey map arrow |
| 4 | **The problem** | You type "google.com". Your machine needs an IP. DNS = the phone book that translates names to numbers. | Name -> DNS -> IP diagram |
| 5 | **DEMO: nslookup** | `nslookup google.com` -- show the answer. "This happens for EVERY name you type." | Code block |
| 6 | **The chain** | Browser cache -> OS cache -> Router -> ISP -> Root -> TLD -> Authoritative. 7 steps to find an IP. | Chain diagram (7 boxes) |
| 7 | **DEMO: chain** | `nslookup google.com 8.8.8.8` vs `1.1.1.1` vs default. "Same answer, different paths." | Code block |
| 8 | **Record types** | A = name->IP, MX = mail, CNAME = alias, NS = name server. "Each serves a different purpose." | Table: Record type, use, example |
| 9 | **DEMO: Wireshark DNS** | Capture DNS query on the wire. Filter: `dns`. Show query + response packets. "This is Day 1 made visible." | Wireshark screenshot |
| 10 | **TTL & caching** | TTL = how long to cache. 300s = 5 min, 86400 = 24h. "Poisoned + long TTL = fake answer for a full day." | TTL diagram |
| 11 | **ATTACK: Kaminsky** | 2008: DNS cache poisoning. Race condition. Forged responses beat real ones. UDP = first answer wins. | Race condition diagram (red) |
| 12 | **The fix** | Source port randomization. DNSSEC. DoH/DoT. "DNS was designed for trusted networks." | Defense chain (green) |
| 13 | **Summary** | 3 takeaways: (1) DNS = name->IP phone book, (2) Chain of resolvers, each can be poisoned, (3) UDP = no verification = race condition. | Remember callout |
| 14 | **Tomorrow** | "Tomorrow you send data through the connection. HTTP vs HTTPS. You'll see plaintext passwords on the wire." | Preview icon |

---

# DAY 3 DECK -- "The Conversation"
**15 slides | ~84 min**

| # | Slide | Content | Visual |
|---|-------|---------|--------|
| 1 | **Title** | "Day 3: The Conversation" + "What happens when you click a link and log in?" · Academy logo | -- |
| 2 | **Why learn this?** | The difference between HTTP and HTTPS is the difference between a postcard and a sealed envelope. This is where Equifax lost 147M records. | Postcard vs envelope icon |
| 3 | **Learning Journey** | "Yesterday: DNS (names to numbers). Today: the actual conversation. Tomorrow: who else can see it?" | Journey map arrow |
| 4 | **TCP handshake** | SYN -> SYN-ACK -> ACK. "The phone call before data flows." Three packets, before any content. | 3-step handshake diagram |
| 5 | **DEMO: Wireshark handshake** | Filter: `tcp.flags.syn==1`. Visit neverssl.com. Show SYN, SYN-ACK, ACK packets. | Wireshark screenshot |
| 6 | **HTTP = postcard** | GET / HTTP/1.1, Host, User-Agent -- all readable. "Anyone on the path can read it." | HTTP request (readable text) |
| 7 | **DEMO: Wireshark HTTP** | Filter: `http`. Follow TCP stream. Show readable request + response. | Wireshark screenshot |
| 8 | **The login** | POST request sends form data. In HTTP: `username=test&password=secret123` -- visible to everyone. | POST body (red highlight on password) |
| 9 | **DEMO: HTTP POST** | Submit fake credentials on neverssl.com. Show POST in Wireshark. "There it is. Your password, in plain text." | Wireshark screenshot |
| 10 | **HTTPS = sealed envelope** | TLS handshake: ClientHello -> ServerHello -> Certificate -> Key Exchange -> Finished. After this, everything encrypted. | TLS handshake diagram |
| 11 | **DEMO: Wireshark TLS** | Filter: `tls`. Visit https://google.com. Show TLS packets. "You can see WHERE, not WHAT." | Wireshark screenshot |
| 12 | **What TLS hides** | Hides: content. Doesn't hide: destination IP, timing, packet sizes. "This is metadata." | Table: visible vs hidden |
| 13 | **ATTACK: Equifax** | 2017: Unpatched Struts + unencrypted internal traffic. 76 days undetected. 147M records. $1.4B cost. | Timeline (red) |
| 14 | **Summary** | 3 takeaways: (1) TCP handshake before data, (2) HTTP = plaintext, HTTPS = encrypted, (3) Equifax = unpatched + unencrypted = total compromise. | Remember callout |
| 15 | **Tomorrow** | "Tomorrow: what can OTHER people see on the same network? Nmap, tcpdump, and Firesheep." | Preview icon |

---

# DAY 4 DECK -- "The Invisible Wire"
**15 slides | ~84 min**

| # | Slide | Content | Visual |
|---|-------|---------|--------|
| 1 | **Title** | "Day 4: The Invisible Wire" + "What can you see on the network?" · Academy logo | -- |
| 2 | **Why learn this?** | Wi-Fi is a shared medium. Everyone on the same SSID sees each other's traffic. This is where Firesheep made session hijacking trivial. | Shared wire icon |
| 3 | **Learning Journey** | "Yesterday: HTTP vs HTTPS. Today: the wire itself. Tomorrow: the full picture." | Journey map arrow |
| 4 | **Shared medium** | Wi-Fi = shared radio. Everyone on the same SSID sees each other's unencrypted traffic. | Wi-Fi broadcast diagram |
| 5 | **DEMO: raw capture** | Wireshark, no filter. Show other people's DNS/HTTP packets. "Those aren't yours." | Wireshark screenshot |
| 6 | **ARP** | Address Resolution Protocol. "Who has 192.168.1.1?" -> "That's me, MAC is AA:BB:CC:..." | ARP request/reply diagram |
| 7 | **DEMO: arp -a** | Show ARP table. "These are your neighbors on the local network." | Code block |
| 8 | **ARP spoofing** | Fake ARP replies -> "I'm the gateway" -> all traffic flows through attacker. MITM. | Attack diagram (red) |
| 9 | **DEMO: Nmap** | `nmap 192.168.1.0/24` -- show open ports on neighbors. "Every open port is a door." | Nmap output |
| 10 | **DEMO: tcpdump** | `tcpdump -i wlan0 -c 20` -- CLI capture. Same data, no GUI. "Wireshark without the chrome." | tcpdump output |
| 11 | **ATTACK: Firesheep** | 2010: Firefox extension. One-click session hijacking on open Wi-Fi. Captured HTTP cookies. Led to HTTPS everywhere. | Firesheep concept (red) |
| 12 | **Defense** | HTTPS everywhere. VPN on public Wi-Fi. WPA3. HSTS. "Firesheep didn't exploit a bug -- it exploited a design flaw." | Defense chain (green) |
| 13 | **Summary** | 3 takeaways: (1) Wi-Fi is shared, (2) ARP spoofing = MITM, (3) Firesheep = HTTP cookies in plaintext = game over. | Remember callout |
| 14 | **Tomorrow** | "Tomorrow we put it all together. Full trace, attack chain, defense chain." | Preview icon |

---

# DAY 5 DECK -- "The Full Picture"
**14 slides | ~84 min**

| # | Slide | Content | Visual |
|---|-------|---------|--------|
| 1 | **Title** | "Day 5: The Full Picture" + "Trace the entire connection end-to-end" · Academy logo | -- |
| 2 | **Why learn this?** | Real attacks chain multiple steps. Today you see the full story -- and how each layer connects. | Chain links icon |
| 3 | **Learning Journey** | "This week: DHCP -> DNS -> TCP -> HTTP -> TLS -> ARP -> Nmap. Today: all together." | Complete journey map |
| 4 | **The 7 steps, on the wire** | Map each step to Wireshark packets. Step 2 = DNS filter, Step 3 = SYN filter, Step 4 = HTTP filter. | 7-step diagram + Wireshark filters |
| 5 | **DEMO: live trace** | Capture entire connection to neverssl.com. Narrate each packet as it appears. "Watch the story happen." | Live Wireshark |
| 6 | **The attack chain** | Evil Twin -> DHCP spoof -> DNS spoof -> MITM -> SSL strip -> Credential theft -> Account takeover. | Attack chain diagram (red, 7 steps) |
| 7 | **The defense chain** | WPA3 -> VPN -> Trusted DNS -> HTTPS -> HSTS -> MFA -> Anomaly detection. | Defense chain diagram (green, 7 steps) |
| 8 | **Attack vs Defense** | Side-by-side: each attack step has a defense. "Defense must cover every layer." | Two-column comparison (red/green) |
| 9 | **Mini-challenge** | Students capture their own traffic. Answer: (1) DNS server, (2) TCP handshake, (3) HTTP vs HTTPS, (4) Read request body? | Challenge instructions |
| 10 | **Tool map** | Quick reference: ipconfig, ping, tracert, nslookup, Wireshark, Nmap, tcpdump -- what to use when. | Tool reference table |
| 11 | **Wireshark filters** | dns, tcp.flags.syn==1, http, http.request.method=="POST", tls, port 53/80/443 | Filter cheat sheet |
| 12 | **Attack stories recap** | Evil Twin (Day 1), Kaminsky (Day 2), Equifax (Day 3), Firesheep (Day 4). "Each layered on the last." | Timeline of attacks |
| 13 | **Summary** | 3 takeaways: (1) Full connection story = DHCP->DNS->TCP->HTTP->TLS, (2) Each layer has attacks and defenses, (3) Tools make the invisible visible. | Remember callout |
| 14 | **What's next** | "Next week we go deeper into the OS and start thinking like a security analyst. But the network foundation you built this week is what everything stands on." | Forward arrow |

---

## Diagrams Needed

| Diagram | Used in | Description |
|---------|---------|-------------|
| **Connection flow** | Day 1, Day 5 | Power -> DHCP -> IP -> Gateway -> Internet |
| **DHCP handshake** | Day 1 | Discover -> Offer -> Request -> ACK |
| **IP vs MAC vs Gateway** | Day 1 | Hotel room vs passport vs door |
| **DNS chain** | Day 2 | Browser -> Cache -> Router -> ISP -> Root -> TLD -> Auth |
| **DNS record types** | Day 2 | Table: A, MX, CNAME, NS |
| **TCP handshake** | Day 3 | SYN -> SYN-ACK -> ACK |
| **HTTP vs HTTPS** | Day 3 | Postcard vs sealed envelope |
| **TLS handshake** | Day 3 | ClientHello -> ServerHello -> Cert -> Key Exchange -> Finished |
| **ARP spoofing** | Day 4 | Real gateway vs fake gateway |
| **Attack chain** | Day 5 | Evil Twin -> DHCP -> DNS -> MITM -> Credential theft |
| **Defense chain** | Day 5 | WPA3 -> VPN -> DNS -> HTTPS -> HSTS -> MFA |
| **Tool map** | Day 5 | Quick reference table |

---

## Marp Slide Structure (template)

Each deck follows this Marp structure:

```
---
marp: true
theme: academy
paginate: true
title: Day N -- <Topic>
footer: "Practical Cyber Security: From First Principles -- Day N -- Module 3"
---

<!-- _class: lead -->

# Day N
## <Topic>

**Practical Cyber Security: From First Principles** -- Module 3

---

## Why are we learning this?

<Motivation + where used + careers>

<div class="callout remember"><span class="label">Remember</span><Key takeaway></div>

---

## Learning Journey

```text
Yesterday: <prior day>
Today: <today's topic>
Tomorrow: <next day>
```

---

## <Core concept 1>

<Explanation + diagram>

---

## DEMO: <Tool>

<Code block + what to show>

---

## <Core concept 2>

<Explanation + diagram>

---

## ATTACK: <Story>

<Attack narrative + diagram (red)>

---

## DEFENSE

<Defense + diagram (green)>

---

## Summary

<div class="callout remember"><span class="label">Remember</span>
1. <Takeaway 1>
2. <Takeaway 2>
3. <Takeaway 3>
</div>

---

## Tomorrow

<Preview of next day>
```

---

## Production Order

1. **Day 1 deck** -- validate template with DHCP/ping/traceroute content
2. **Day 2 deck** -- DNS + Wireshark DNS capture
3. **Day 3 deck** -- TCP + HTTP + TLS (most Wireshark-heavy)
4. **Day 4 deck** -- ARP + Nmap + tcpdump
5. **Day 5 deck** -- synthesis + mini-challenge
6. **Export all** -- HTML (review) + PPTX (teaching)

Each deck: ~12-15 slides. Total: ~70 slides across 5 days.
