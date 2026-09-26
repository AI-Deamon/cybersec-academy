---
marp: true
theme: dark-monospace
paginate: true
title: "Day 3 — Networks I: How Machines Find Each Other"
footer: "Practical Cyber Security (v2) · Week 1 · Day 3"
---

<!-- _class: lead -->

# Networks I
## Day 3 — How one machine finds another and gets a message there

**Week 1 · Building the foundation**

<!--
RUN SHEET (~90 min). Hands-on is INTERLEAVED — four short "do it now" beats, ~15 min total.
00:00 Journey check + traceroute hook (projector)         5
00:05 The problem (the roadmap)                            2
00:07 IP — the street address                              6
00:13 DO: find your IP + gateway                           5
00:18 DHCP — where that number came from (live diagram)    2
00:20 Private vs public IP                                 3
00:23 NAT — one public address for the house               7
00:30 MAC — the local label                                6
00:36 DO: find your MAC                                    3
00:39 Ports + client/server                                8
00:47 DO: what's listening on your machine                 6
00:53 A packet, put together                               4
00:57 The 4-layer model                                    4
01:01 The journey + DO: ping/traceroute                    9
01:10 Attack <-> defence (ARP spoof, scanning, sniffing)   8
01:18 What a firewall actually does (live diagram)         2
01:20 Wrap + homework                                      6
CUT FIRST IF SHORT: firewall slide -> one sentence; DHCP slide -> one sentence; 4-layer
slide -> one sentence; ARP-spoof detail (keep the name); the ping "do it now".
NEVER CUT: the three addresses (IP/MAC/port), NAT, at least two "do it now" beats.
LIVE DIAGRAMS (folder archify/ — open every file in its own browser tab BEFORE class; each has
view buttons that step through the story, and a light/dark toggle for the projector):
  01-three-addresses.html    -> "The problem" slide, again on the Port slide (client/server view)
  02-packet-journey-nat.html -> NAT slide
  03-packet-layers.html      -> "A packet, put together" + "The 4-layer model"
  04-dhcp-lease.html         -> DHCP slide
  05-firewall-decision.html  -> firewall slide
ONE ANALOGY (sanctioned extension of the kitchen): the POSTAL / DELIVERY system — the kitchen
now orders supplies and ships out orders. Parcel=packet, street address=IP, next-leg label=MAC,
department name=port, sorting office=router, front desk=NAT. Phone calls arrive tomorrow (TCP).
-->

---

## Where we are

- **Day 1:** the field and the law.  **Day 2:** inside one machine.
- **Today:** your machine stops being alone — how it *finds* another machine and gets a
  message there.
- **Tomorrow:** the *rules* of those conversations — TCP, DNS, how a web page loads.

<!--
Learning Journey Check — one line each. Yesterday / Today / Tomorrow.
-->

---

## Hook — the hidden hops

Run on the projector:  `traceroute example.com`  (Windows: `tracert`)

Every line is a **different machine**, owned by someone else, that your message passed through.

You typed one address. A dozen strangers' routers moved it for you. How?

<!--
Let the output scroll. Point at 3-4 hops. "You don't own any of these. They forwarded your
packet because that's the deal that makes the internet work."
Some hops show * * * — "that one chose not to answer; the packet still went through."
Don't explain traceroute's mechanism yet (it's a Day 4 TTL thing) — just "these are real
machines in the path."
-->

---

## The problem

Billions of machines. You want to reach **exactly one**. No central phone book.

Three things solve it — an **address** (IP), a **local label** (MAC), a **"who there"** number
(port). We'll meet each one *and find it on your own laptop*.

<!--
Keep this to ~2 min. It's the roadmap for the next section. Then straight into IP.
LIVE DIAGRAM: archify/01-three-addresses.html, view "Three jobs" — one pass, 30 seconds, just
so they have seen the three labels side by side before we take them one at a time.
-->

---

## IP address — the street address

- Every machine on a network has an **IP address**: e.g. `142.250.183.206`.
- Four numbers, each 0–255 (that's **IPv4**). Newer **IPv6** looks like
  `2404:6800:4003:c00::66` — same job, far more addresses.
- It says *where on the network* a machine is — the street address on a parcel.
- Routers use it to decide **which direction to forward** your packet — every hop, end to end.

<!--
No subnetting, no binary today. The model: "IP = where you are, used for routing, unchanged
the whole journey." IPv6 = one sentence, don't let them panic at the long ones.
-->

---

## Do it now — find your address

```
Linux:    ip a           |  mac: ifconfig      |  Windows: ipconfig /all
```

Find three things and write them down:

1. your **IPv4 address** (like `192.168.1.7`)
2. your **default gateway** (the router — like `192.168.1.1`)
3. keep the window open — we need your MAC in a minute

<!--
90 seconds. Walk the room. Almost everyone: 192.168.x.x or 10.x.x.x, gateway usually .1 or .254.
Ask two students to call theirs out — note they're similar/identical. That's the slide after
next. First: "who typed that number in?" Nobody. Next slide.
-->

---

## Where did that number come from? — DHCP

You didn't type `192.168.1.7`. Your laptop **asked for it** the moment it joined the wifi:

1. **Discover** — "anyone? I need an address" *(shouted to everyone on the network)*
2. **Offer** — the router: "take `192.168.1.7`?"
3. **Request** — "yes, I'll take it"
4. **Ack** — "yours for 24 h — and here's your **gateway** and **DNS server** too"

It's a **lease**, not ownership. Rejoin tomorrow and you may get a different one.

<!--
LIVE DIAGRAM: archify/04-dhcp-lease.html — click through the 3 views (~2 min).
The point: nobody configured your laptop. The router's DHCP service handed out the IP, the
gateway (.1) AND the DNS server in one go — that is why "find your gateway" just worked.
169.254.x.x = DISCOVER got no answer (broken wifi, not a broken laptop).
Security hook for later: a rogue DHCP server on the LAN can hand out a lying gateway — same
family as ARP spoofing on the attack slide.
CUT to one sentence if short: "the router leased you that address automatically."
-->

---

## Private vs public IP

| | Range (IPv4) | Where it works |
|---|---|---|
| **Private** | `10.x.x.x` · `172.16–31.x.x` · `192.168.x.x` | inside your home/office only — reused everywhere |
| **Public** | everything else | unique on the whole internet |

Your laptop right now almost certainly has a **private** IP like `192.168.1.7`.

<!--
Analogy: private IP = "flat 3, second floor" — meaningless without the building. Millions of
homes have a 192.168.1.7. Public IP = the building's actual street address, unique globally.
This sets up NAT on the next slide.
-->

---

## NAT — one public address for the whole house

Your home has **one public IP** (on the router, from your ISP). Every device behind it has a
**private** IP.

The router does **NAT** — Network Address Translation:

- outgoing: rewrites your private IP → the one public IP, remembers which device asked
- incoming: matches the reply back to the right device

<!--
This is why whatsmyip.com shows a different address than `ipconfig` — the site sees the
router's public IP; ipconfig shows your laptop's private one. THAT is the Day 3 "trap" —
call it out explicitly, it's the homework question.
Analogy: the whole household sends mail via one front-desk address; the front desk (router)
keeps a log so replies get to the right person.
LIVE DIAGRAM: archify/02-packet-journey-nat.html — 3 views: inside the home / NAT boundary /
reply returns. Use the "Reply returns" view to answer "how does the reply find MY laptop?"
Security note for later: NAT accidentally hides internal devices — not a firewall, but it
means the internet can't directly address your laptop.
-->

---

## MAC address — the local delivery label

- Burned into the network card: `a4:83:e7:2c:19:0f` (6 bytes).
- Used **only on your local network** — the single hop between two directly-connected devices.
- Every hop, the MAC labels are **rewritten**; the IP addresses stay the same end to end.

**IP = the whole journey. MAC = the next handoff.**

<!--
Analogy: the parcel's street address (IP) never changes. At each sorting office they slap on a
new "put on truck 7 / hand to postie Ravi" label (MAC) for the next leg.
ARP = how a device learns "which MAC has IP 192.168.1.1" — one line now, matters at the attack slide.
MISCONCEPTION: "my MAC identifies me on the internet." No — stripped at the first hop. Websites never see it.
-->

---

## Do it now — find your MAC

Same window (`ip a` / `ipconfig /all`): find the **physical / hardware address**, six pairs
like `a4:83:e7:2c:19:0f`.

That label is used for exactly **one hop** — laptop ↔ your router. It never reaches the website.

<!--
30 seconds. On `ip a` it's the "link/ether" line. Windows: "Physical Address".
Point out the first half identifies the maker (Intel/Apple/etc.) — the OUI.
-->

---

## Port — which program gets the message

One machine, one IP — but many programs want the network (browser, mail, video call).

A **port number** (0–65535) says *which program*. One side **asks** (client, random high
port), the other **answers** (server, a known port):

| Port | Service |  | Port | Service |
|---|---|---|---|---|
| 80 | HTTP (web) | | 22 | SSH (remote shell) |
| 443 | HTTPS (encrypted web) | | 53 | DNS |
| 21 | FTP (file transfer, plain text) | | 25 | SMTP (sending mail) |
| 3389 | RDP (Windows remote desktop) | | 3306 | MySQL (a database) |

<!--
Analogy: IP gets the parcel to the building; the port is the department name on it.
Rows 3-4 are for RECOGNITION only — don't explain them. Students meet FTP/SSH properly on
Day 13 when Nmap finds them; RDP/MySQL are "things that should never face the internet."
LIVE DIAGRAM: archify/01-three-addresses.html, view "Client and server" — the browser's
random source port vs the server's fixed 443. 30 seconds.
CLIENT/SERVER (a must-land): the client opens the conversation and picks a random source port
so it can match the reply; the server sits listening on a fixed, known port. "Listening on a
port" = a process (Day 2! it has a PID) told the OS "give me anything arriving for port 80."
-->

---

## Do it now — what's listening on *your* machine

```
Linux:  sudo ss -tlnp     |     Windows:  netstat -ano | findstr LISTENING
```

Your laptop is running network services you never started on purpose. Pick one line — which
**port**, and can you guess the **program**?

<!--
2-3 min incl. discussion. Common: :53 (DNS stub), :631 (printing/CUPS), sometimes :22, :5353
(mDNS). Windows shows lots — map a PID to a name via Task Manager.
The point: every open port is a door. Attackers scan for exactly these (forward-ref Day 13).
Needs sudo/admin for the program-name column.
-->

---

## A packet, put together

```
  [ MAC: to router | from me ]          <- rewritten every hop
    [ IP: to 142.250.183.206 | from 192.168.1.7 ]   <- unchanged end to end
      [ Port: to 443 | from 51514 ]     <- which program at each end
        [ ...your actual data... ]
```

Each layer **wraps** the one inside it. Routers read the IP part; the destination machine
reads the port; the program reads the data.

<!--
This is the "envelopes inside envelopes" idea. Draw it as nested boxes on the board.
The source port (51514) is a random high number your OS picks so it can match the reply.
Don't say "encapsulation" unless asked — but that's the word.
LIVE DIAGRAM: archify/03-packet-layers.html, view 1 "Wrap the message" — same numbers as this
slide (51514 -> 443). Leave the tab open; views 2 and 3 belong to the next slide.
-->

---

## The 4-layer model

| Layer | Job | Example |
|---|---|---|
| **Application** | the actual conversation | HTTP, DNS, SSH |
| **Transport** | which program, reliable or not | TCP, UDP (Day 4) |
| **Internet** | routing across networks | IP |
| **Link** | the single local hop | MAC, wifi, ethernet |

You'll also see a **7-layer (OSI)** version — same idea, more boxes. We use these four.

<!--
Per the course standard: teach the 4-layer model, mention OSI-7 once, move on.
Map it back to the packet slide: each row = one of the envelopes.
LIVE DIAGRAM: archify/03-packet-layers.html, views 2 "At a router" (MAC swapped, IP kept) and
3 "Deliver to process" (port -> OS -> the PID from Day 2). Then read the "Class check" card
aloud — those three questions ARE the exit check.
CUT-TO-ONE-SENTENCE if short: "messages are built in layers — link, internet, transport,
application — each wrapping the next; we'll meet transport tomorrow."
-->

---

## The journey of one packet

```
 your laptop ─ wifi ─ home router ─ ISP ─ ... ─ ─ ─ ─ server
   192.168.1.7        (NAT here)   many routers, each forwarding
                                   toward the destination IP
```

Each router looks at the destination IP, consults its table, sends it one hop closer.
No router knows the whole path — just "next hop this way."

<!--
Callback to the traceroute hook: every line you saw was one of those forwarding routers.
"Hop by hop, best effort" — nobody guarantees delivery at this layer (that's TCP's job, Day 4).
-->

---

## Attack ↔ Defence

| Attack | What it is | Defence |
|---|---|---|
| **ARP spoofing** | lie on the LAN: "I'm the router" → all local traffic flows through you | switched networks + dynamic ARP inspection; don't trust the LAN — use TLS/VPN |
| **Port scanning** | knock on every port to find running services | close unused ports; host firewall; network segmentation |
| **Sniffing** (Day 1!) | read traffic on a network you're on | encryption end to end (HTTPS) — so sniffing yields gibberish |

<!--
Tie it together: the Day 1 trailer worked because attacker + victim were on the SAME LAN and
the login was plain HTTP. ARP spoofing is how you'd get in the middle even on a switch.
The fix that actually scales isn't "secure the LAN perfectly" — it's "assume the network is
hostile and encrypt anyway." That's the whole reason for tomorrow's HTTPS lesson.
"Host firewall" in the port-scanning row — next slide makes that concrete.
-->

---

## What a firewall actually does

A firewall is a **rule list**. For every packet it reads only the *envelope* — source IP,
destination IP, destination **port**, protocol — and walks the list top to bottom:

```
  allow  port 22   from 192.168.1.0/24     <- first match wins
  allow  port 443  from anywhere
  deny   everything else                   <- always the last line
```

Match an **allow** → the packet reaches the listening program.
Match nothing → **dropped, silently**. The scanner gets no reply at all.

<!--
LIVE DIAGRAM: archify/05-firewall-decision.html — 3 views: arrives / allowed / dropped (~2 min).
This is the "host firewall" from the port-scanning row made concrete. It does NOT read your
data and does NOT know whether the data is malicious — it only decides which doors open for
whom. NAT is not a firewall (teacher notes). "Filtered" in Nmap on Day 13 = this DROP branch.
CUT to one sentence if short: "a firewall is a list of which ports open for which addresses;
everything else is dropped silently."
-->

---

## Wi-Fi — the network you don't control

Being **on the same Wi-Fi** is exactly the Day 1 threat model.

| | Risk |
|---|---|
| **Open / "guest" Wi-Fi** | no encryption on the air — anyone nearby can capture everything |
| **WPA2 (a shared password)** | anyone with the password can often decrypt *others'* traffic |
| **Evil twin** | a fake AP with the same name as a real one — you connect, they're the router |
| **WPA3** | fixes the shared-password decryption problem; use it where you can |

**Defence:** WPA3 · a separate guest network · **and, because you can't trust any Wi-Fi you
don't run: HTTPS everywhere + a VPN on untrusted networks.**

<!--
This closes the loop on the Day 1 trailer (a Wi-Fi sniff). The point for students: "coffee
shop Wi-Fi" is not a safe place to log into anything over plain HTTP, and even WPA2 home Wi-Fi
isn't private from a housemate who has the password. WPA3's SAE handshake gives per-session
keys. Enterprise Wi-Fi (802.1X / WPA2-Enterprise) is per-user — name it, don't detail it.
CUT to 2 min if behind — the one line to keep: "you can't trust Wi-Fi you don't run; encrypt anyway."
-->

---

## Do it now — measure the distance

```
ping <your gateway>        then      ping 1.1.1.1
traceroute 1.1.1.1     (Windows: tracert 1.1.1.1)
```

- Gateway: ~1–3 ms (next room). `1.1.1.1`: ~20–60 ms and **5–15 hops** away.
- Those hops are the same kind of routers you saw in the opening `traceroute`.

<!--
3-4 min. ping to 1.1.1.1 may be blocked on locked-down wifi — note it, move on, the web still
works because that's TCP not ICMP.
This is the fourth and last "do it now". Total hands-on across the lesson ~15 min, interleaved.
-->

---

## Today's attack / defence / artifact

- **Attack:** be a machine on the same network → sniff, or ARP-spoof your way into the middle.
- **Defence:** encrypt end to end so being on the path doesn't help; segment networks; close
  unused ports.
- **Artifact:** a diagram of your own home network — every device, its **private IP**, the
  router, the router's **public IP**, the path to the ISP.

<!--
Three lines into the repo.
-->

---

## Homework

1. Draw your home network: each device → wifi/switch → router → ISP. Label every private IP,
   the gateway, and the router's public IP.
2. Answer in two sentences: **why does `whatsmyip.com` show a different address than
   `ipconfig` / `ip a`?**
3. Commit both; update your "today I learned" list.

<!--
Due start of Day 4. Checklist grading in the week-1 student pack.
-->

---

<!-- _class: lead -->

## Recap

1. **Three addresses:** IP = where you are (whole journey) · MAC = the next local hop · port = which program.
2. **NAT** — your whole house shares one public IP; your laptop's address is private.
3. **Assume the network is hostile.** Being on the path is enough to sniff — encryption is the real defence.

<!--
Say the three lines. Then: tomorrow we give these packets rules — TCP's handshake, DNS turning
names into IPs, and the full story of loading a web page.
-->
