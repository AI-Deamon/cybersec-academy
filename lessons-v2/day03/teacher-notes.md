# Day 3 — Teacher Notes

**Teach from:** `day03.md` (deck + speaker notes).
**This file:** cut-list, background for shaky topics, the demo runbook, hands-on checkpoints,
exit check, FAQ.

---

## The analogy — a sanctioned extension

Day 2 = the kitchen (one computer). Day 3 = **the postal / delivery system** — the same
kitchen now *orders supplies and ships out orders*. This is a deliberate extension of the one
world, not a new metaphor. Map:

| Networking | Postal |
|---|---|
| packet | a parcel |
| IP address | the street address (whole journey) |
| MAC address | "load on truck 7 / hand to postie Ravi" — the next-leg label |
| port | the department or person's name on the parcel |
| router | a sorting office — reads the address, sends it one leg closer |
| NAT | a building's front desk: one street address for everyone inside, keeps a log so replies get routed internally |

Do **not** introduce a fourth analogy (phone calls come in tomorrow for TCP — that's the next
sanctioned step).

---

## Structure — hands-on is interleaved

There is **no single hands-on block**. Four short "do it now" beats sit inside the teaching,
~15 min total: (1) find your IP + gateway, after the IP slide; (2) find your MAC, after the
MAC slide; (3) `ss`/`netstat` listeners, after the ports slide; (4) ping + traceroute, after
the journey slide. This keeps energy up through ~50 min of otherwise-dense addressing theory.

## Must-teach vs. cut-if-short

**Never cut:**
- The three addresses: IP (whole journey) vs MAC (next hop) vs port (which program).
- NAT + private/public IP (it's the homework question and the "trap").
- At least two of the four "do it now" beats — the IP one and the `ss`/`netstat` one.
- The client/server point (client picks a random source port, server listens on a known one).
- The "assume the network is hostile → encrypt" line — it's the bridge to Day 4.

**Cut in this order if behind:**
1. The 4-layer model slide → one sentence ("messages are built in layers, each wrapping the
   next; we meet transport tomorrow").
2. ARP-spoofing detail → keep the name and "lie on the LAN to get in the middle."
3. The ping/traceroute "do it now" — slow/blocked on some networks.
4. The packet "envelopes" slide → describe verbally over the journey slide.

---

## Background for topics people get shaky on

### IPv4 addressing (enough to answer questions, not to teach)
- 32 bits, written as four 8-bit numbers (0–255). ~4.3 billion total — which ran out, hence
  NAT and IPv6.
- **Private ranges (RFC 1918):** `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`. Not routed
  on the internet; every home reuses them.
- **Other special ones you might get asked about:** `127.0.0.1` = localhost (this machine
  itself); `169.254.x.x` = "no DHCP, I made one up" (link-local, usually means broken wifi);
  `0.0.0.0` = "any address" (used when a service listens on all interfaces).
- **Subnet mask / CIDR** (`/24`): the split between "network part" and "host part." You do
  **not** teach subnetting today. If asked: "it's how a device knows which addresses are local
  vs. need the router — we don't need the maths for this course."

### DHCP (will come up in the hands-on)
Your laptop didn't choose its IP — the router's **DHCP** service leased it one when you joined
the network, along with the gateway and DNS server addresses. One sentence is enough.

### MAC / ARP
- MAC = 48 bits, first 3 bytes identify the manufacturer (OUI). Meant to be globally unique;
  can be changed in software (`macchanger`, or built-in "private/random MAC" on phones).
- **ARP** = Address Resolution Protocol. "Who has 192.168.1.1? Tell me your MAC." Replies are
  cached, **unauthenticated**, and last-writer-wins → that's the vulnerability.
- MAC never leaves the local segment. The web server you talk to sees your router's public IP
  and nothing about your MAC.

### NAT vs firewall (don't conflate)
NAT makes inbound connections *not just work* (there's no mapping until you initiate one), so
it *feels* protective. It is **not** a firewall — it does no filtering of what you asked for,
and it doesn't protect outbound or already-established flows. Say this if a student claims
"NAT keeps me safe."

### Ports
- 0–1023 = "well-known" (need admin to bind on Unix). 1024–49151 registered. 49152–65535 =
  ephemeral (what your OS picks as the *source* port for outbound connections).
- "Open port" = a program is listening. "Closed" = nothing listening. "Filtered" = a firewall
  ate the probe (Day 13).

### The 4-layer vs 7-layer thing
The model in the deck is the TCP/IP model (RFC 1122): Link, Internet, Transport, Application.
OSI adds Presentation and Session (rarely used in practice) and splits Link into Physical +
Data Link. Teach 4, name 7, move on — per the course standard. Don't run the "which layer is
X" quiz game; it's a time sink with low payoff for beginners.

---

## Demo runbook

### Demo — traceroute (hook, 2 min)
- Linux/mac: `traceroute example.com` · Windows: `tracert example.com`
- **Pre-flight:** run it the night before on the class network. On some campus/corporate
  networks ICMP/UDP traceroute is filtered and you get rows of `* * *` — if so, try
  `tracert -d 1.1.1.1` or just use the recording.
- Record `assets/traceroute-demo.mp4` as the fallback.
- Point at 3–4 named hops: "different machine, different owner, forwarded your packet anyway."

### Hands-on commands — expected output
| Command | What they should see |
|---|---|
| `ip a` / `ipconfig /all` | an IPv4 like `192.168.1.7`, a MAC, a "default gateway" like `192.168.1.1` |
| `ping <gateway>` | replies, <5 ms |
| `ping 1.1.1.1` | replies, ~20–60 ms (or timeout on locked-down wifi — note it and move on) |
| `traceroute 1.1.1.1` | 5–15 hops; first hop = the gateway |
| `ss -tlnp` / `netstat -ano` | a handful of listeners — often `:53` (DNS stub), `:631` (printing), maybe `:22` |

### Failure modes
| Symptom | Fix |
|---|---|
| `ip` not found (older Linux) | `ifconfig`, or `sudo apt install iproute2` |
| `ss -tlnp` shows no program names | needs `sudo` for the `-p` (process) column |
| ping to 1.1.1.1 fails but web works | ICMP blocked on the network — expected, not a student error |
| Windows `netstat -ano` is a wall of text | add `| findstr LISTENING`; map PID via Task Manager |
| everyone has the same private IP | correct and intentional — that's the private-range point |

---

## Checkpoint (by end of the four "do it now" beats)

Each student can:
- [ ] state their laptop's private IP, its MAC, and the gateway IP
- [ ] name one program listening on a port on their own machine
- [ ] explain why ping to the gateway is faster than ping to `1.1.1.1`
- [ ] say why `whatsmyip` shows a different address than `ipconfig`

---

## Exit check (last 2 min)

1. Which changes at every hop — the IP addresses or the MAC addresses? — *MAC. IP stays end
   to end.*
2. Your friend in another city also has `192.168.1.7`. How is that possible? — *It's a private
   address; it only has meaning inside each local network. NAT lets both share their
   building's one public IP.*
3. The Day 1 sniffing demo — why did being on the same wifi let the instructor read the
   password? — *Traffic on a shared network is visible to others on it, and the login was
   plain HTTP (unencrypted). HTTPS would have made it unreadable.*

---

## FAQ

- **"Is my IP address permanent?"** Usually not. Home ISPs rotate your public IP; your private
  IP is re-leased by DHCP and can change when you rejoin the network.
- **"Can someone find my location from my IP?"** Roughly — city/ISP level, from public
  databases. Not your street address. And they see your *router's* public IP, not your
  laptop's.
- **"Is hiding my MAC address useful for privacy?"** On public wifi, yes a little — phones now
  randomise it per network to stop tracking. It never reaches websites regardless.
- **"Why 65535 ports?"** The port field in the packet is 16 bits → 2¹⁶ values.
- **"Do I need to memorise port numbers?"** Know 80/443 (web), 22 (SSH), 53 (DNS). The rest
  you look up.
- **"What's the difference between a router and a switch?"** Switch = moves frames within one
  local network using MAC. Router = moves packets *between* networks using IP. Your home box
  is both plus wifi plus NAT plus DHCP in one unit.
