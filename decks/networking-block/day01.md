---
marp: true
theme: academy
paginate: true
title: "Day 1 -- The Invisible Handshake"
footer: "Practical Cyber Security: From First Principles -- Networking Block -- Day 1"
---

<!-- _class: lead -->

# Day 1
## The Invisible Handshake

**Practical Cyber Security: From First Principles** -- Networking Block

---

## Why are we learning this?

Every attack, every breach, every hack starts with **one thing: a connection.**

- If you can't trace the first 3 seconds, you can't defend or attack
- **Used in:** SOC monitoring, network security, pentesting, incident response
- **Careers:** SOC Analyst, Network Security Engineer, Pentester, IR Analyst

<div class="callout remember"><span class="label">Remember</span>Today we trace what happens in the 3 seconds between clicking "Connect" and being online.</div>

---

## Learning Journey

```text
Yesterday:  OS + Python (Week 2 complete)
Today:      Connection + IP + Identity + First packets
Tomorrow:   We type a name and see DNS (Day 2)
```

---

## The 3 Seconds

When you click **Connect** on a Wi-Fi network:

```text
+------------------+     +------------------+     +------------------+
| 1. AUTHENTICATION|     | 2. ASSOCIATION   |     | 3. DHCP          |
|                  | --> |                  | --> |                  |
| Prove you know   |     | Join the network |     | Get an IP,       |
| the Wi-Fi        |     | (get a slot on   |     | gateway, DNS     |
| password         |     | the access point)|     | server           |
+------------------+     +------------------+     +------------------+
```

**DHCP = Dynamic Host Configuration Protocol** -- your laptop asks, router answers.

---

## DHCP: What You Get

Your router hands you everything automatically:

```text
+-------------------------------+-------------------------------+
| WHAT                          | EXAMPLE                       |
+-------------------------------+-------------------------------+
| IP Address                    | 192.168.1.105                 |
| Subnet Mask                   | 255.255.255.0                 |
| Default Gateway               | 192.168.1.1  (your router)    |
| DNS Server                    | 192.168.1.1  (or 8.8.8.8)    |
| Lease Time                    | 24 hours (borrowed, not yours)|
+-------------------------------+-------------------------------+
```

> **You didn't choose any of this.** The network decided for you.

---

## DEMO: ipconfig / ip a

```bash
# Windows
ipconfig /all

# Linux / macOS
ip a
```

**Walk through:**
- **IPv4 Address** -- your temporary street address
- **Physical Address** (MAC) -- your permanent hardware ID
- **Default Gateway** -- your door to the internet
- **DNS Servers** -- the phone book you were told to use
- **DHCP Enabled** -- Yes (confirming DHCP assigned all of this)

---

## IP vs MAC vs Gateway

```text
+------------------+------------------+------------------+
| IP ADDRESS       | MAC ADDRESS      | DEFAULT GATEWAY  |
+------------------+------------------+------------------+
| Temporary        | Permanent        | Your door to     |
| street address   | factory serial   | the internet     |
|                  | number           |                  |
| Changes per      | Same everywhere  | Usually your     |
| network          |                  | router           |
+------------------+------------------+------------------+
```

> **Hotel room** (IP) vs **Passport** (MAC) vs **Front desk** (Gateway)

---

## DEMO: Ping -- First Contact

```bash
ping 8.8.8.8
```

```text
Reply from 8.8.8.8: bytes=32 time=14ms TTL=116
Reply from 8.8.8.8: bytes=32 time=12ms TTL=116
Reply from 8.8.8.8: bytes=32 time=15ms TTL=116
```

- **time=14ms** -- round-trip in 14 milliseconds
- **TTL=116** -- Time To Live (each router decrements by 1)
- **Reply** -- the packet made it to Google and came back

> Every line = a round trip through 5-10 routers on the internet.

---

## DEMO: Traceroute -- The Path

```bash
# Windows
tracert 8.8.8.8

# Linux / macOS
traceroute 8.8.8.8
```

```text
 1    <1ms    192.168.1.1      -- Your router (post office #1)
 2     8ms    10.0.0.1         -- ISP router (post office #2)
 3    12ms    72.14.236.73     -- Backbone router
 ...
10    14ms    8.8.8.8          -- Google (destination)
```

> Each line = a router that touched your packet. A chain of post offices.

---

## DNS: The Phone Book

You're connected. But your laptop needs to turn **names into numbers.**

```bash
nslookup google.com
```

```text
Server:   192.168.1.1
Address:  192.168.1.1#53

Non-authoritative answer:
Name:     google.com
Address:  142.250.x.x
```

- **Server** = the DNS server your DHCP gave you
- **Address** = the IP your router looked up for you
- **You didn't ask for this DNS server** -- the network decided

---

## ATTACK: Evil Twin / Rogue DHCP

```text
                    INTERNET
                       ^
                       |
                 [Real Router]
                       |
    +------+      [Real Wi-Fi]      +------+
    | YOU  |                         | YOU  |
    +------+      [Fake Wi-Fi]      +------+  <-- Attacker
                       |                    sets up evil twin
                 [Attacker's     Attacker runs rogue DHCP:
                  Laptop]        "I'm the gateway, use my DNS"
                       |
                    All traffic flows through attacker
```

**What the attacker can do:**
- See every DNS query you make
- Read unencrypted (HTTP) traffic
- Redirect you to fake login pages
- Inject malware into downloads

---

## DEFENSE: Evil Twin

<div class="two-col">
<div class="col author">

### Protect Yourself
- **Verify** the network name with staff
- **Use WPA3** (not open networks)
- **Use a VPN** on public Wi-Fi
- **Check for HTTPS** on every site

</div>
<div class="col illegal">

### Why It Works
- VPN encrypts ALL traffic (even on fake Wi-Fi)
- HTTPS protects web content
- WPA3 prevents unauthorized APs
- Name verification catches the fake

</div>
</div>

<div class="callout warning"><span class="label">Warning</span>Your phone warns you about "open networks" because anyone between you and the internet can see your traffic.</div>

---

## Summary

<div class="callout remember"><span class="label">Remember</span>

1. **Connection = DHCP + identity** -- you get IP, gateway, DNS automatically
2. **IP is temporary, MAC is permanent** -- hotel room vs passport
3. **First connection can be intercepted** -- evil twin, rogue DHCP

</div>

---

## Tomorrow

> "Today we connected. Tomorrow we type a name -- **google.com** -- and trace what happens before the page even starts loading. The name-to-number translation is where the next layer of attacks lives."

**Prepare:** Run `nslookup google.com` and write down the IP you get.
