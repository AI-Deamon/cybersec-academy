---
marp: true
theme: academy
paginate: true
title: "Deep Dive -- Transport, Internet & Network Access"
footer: "Practical Cyber Security: From First Principles -- Networking Block -- Deep Dive"
---

<!-- _class: lead -->

# Deep Dive
## Transport · Internet · Network Access

Header by header, one login request, all the way down to bits.

**Practical Cyber Security: From First Principles** -- Networking Block

---

## Where we are now

```text
Completed already:
- DHCP   -> host got IP, mask, gateway, DNS server
- DNS    -> name resolved: example.com = 93.184.216.34
- App    -> HTTP request built: POST /login  (100 bytes)

Today - the remaining 3 layers, header by header:
- Transport   -> wraps data in a SEGMENT
- Internet    -> wraps segment in a PACKET
- Net Access  -> wraps packet in a FRAME, sends BITS
```

<div class="callout remember"><span class="label">Remember</span>Every layer ADDS a header. Every name change (data, segment, packet, frame, bits) marks one wrap.</div>

---

## Our running example: one login

Everything today traces THIS exchange:

```text
Your laptop                192.168.1.10     MAC 3C:97:0E:52:1A:7F
Default gateway            192.168.1.1      MAC A4:2B:B0:D9:44:E1
Web server (example.com)   93.184.216.34    port 80
Your ephemeral port        51522

Action: submit login form
  POST /login   username=bhaskar&password=secret123   (100 bytes)
```

Watch how these 100 bytes grow as they descend the stack.

---

## The PDU roadmap: five names, four wraps

```text
        YOUR DATA DESCENDS                    NAMES IT PICKS UP

 L7  Application   [ POST /login ... ]      DATA
                      |
 L4  Transport     [TCP hdr | data]         SEGMENT   (UDP = DATAGRAM)
                      |
 L3  Internet      [IP hdr | segment]       PACKET
                      |
 L2  Net Access    [Eth hdr | packet | FCS] FRAME
                      |
 L1  Physical      01011010 10110010 ...    BITS
```

Receiving host does the reverse: strips frame, then packet, then segment.

<div class="callout definition"><span class="label">Definition</span>PDU = Protocol Data Unit. The official name of the data at each layer.</div>

---

## Meet the headers: four envelopes around your login

```text
[ ETH HDR ][    IP HDR    ][   TCP HDR   ][ DATA: POST /login ]
   14 B         20 B             20 B             100 B
   MACs      IPs,TTL,Proto   ports,seq,flags    the actual form

Each layer wraps the one below it as opaque payload.
Ethernet cannot read ports. TCP cannot read MACs.
```

| Header | Size | Star fields | Question it answers |
|--------|------|-------------|---------------------|
| Ethernet | 14 B | Dst MAC · Src MAC · EtherType | who is the NEXT receiver on this wire? |
| IP | 20 B | Src/Dst IP · TTL · Protocol | which HOST end-to-end? still alive? |
| TCP | 20 B | Ports · Seq/Ack · Flags · Window | which PROCESS? conversation state? |
| UDP | 8 B | Ports · Length · Checksum | which process? (fast, no state) |

<div class="callout remember"><span class="label">Remember</span>Receiver unwraps in reverse: FCS check -> strip Eth -> read IP -> read TCP -> deliver bytes to app.</div>

---

<!-- _class: lead -->

# Layer 4
## TRANSPORT
### *Segments, ports, TCP, UDP*

---

## What Transport actually does

IP delivers to a HOST. Transport delivers to a PROCESS.

```text
IP address  = which computer?      192.168.1.10
Port number = which program?       browser : 51522
                                   web srvr:    80
```

Jobs at this layer:

- split app data into pieces -> segments
- pick reliable (`TCP`) or fast (`UDP`)
- track every conversation separately (ports)
- recover loss when needed

> Browser + mail + game all share ONE cable because ports keep them apart.

---

## TCP header: the full map (20 bytes)

```text
 0                   15 16                              31
+----------------------+--------------------------------+
|   Source Port 51522  |  Destination Port    80        |  4B
+----------------------+--------------------------------+
|        Sequence Number  42 (relative 0)               |  4B
+-------------------------------------------------------+
|     Acknowledgment Number  0                          |  4B
+----------+-----------+--------------+-----------------+
| Offset 5 | Reserved  |U|A|P|R|S|F|  Window  64240       |  4B
+----------+-----------+--------------+-----------------+
|   Checksum 0x8f3c   |   Urgent Pointer 0             |  4B
+----------------------+--------------------------------+
   Flags: U=URG A=ACK P=PSH R=RST S=SYN F=FIN
```

Every field has a job. Next slides: the ones that matter most.

---

## Sequence & Acknowledgment: the memory of a conversation

```text
First bytes sent:      Seq = 0        "my data starts at 0"
Sent 100 bytes:        next Seq = 101 "everything before 101 arrived"

Receiver answers:      Ack = 101      "I have bytes 0..100, send 101+"
```

Why security cares:

- every byte is NUMBERED -> nothing lost, duplicated, or reordered silently
- random initial sequence numbers (ISN) prevent session prediction
- attackers who GUESS seq numbers can inject data into your session

<div class="callout remember"><span class="label">Remember</span>Seq = what I am sending. Ack = what I have received. Both count BYTES.</div>

---

## TCP flags: six switches that define behavior

| Flag | Name | Meaning | Seen when |
|------|------|---------|-----------|
| SYN | synchronize | start conversation, sync seq numbers | connection open |
| ACK | acknowledge | seq info is valid | almost every packet |
| FIN | finish | polite close, my side is done | normal disconnect |
| RST | reset | abort NOW, something is wrong | refused port, crash |
| PSH | push | deliver to app immediately | interactive data |
| URG | urgent | pointer to priority bytes | rare, legacy |

```text
Scanners read flag COMBINATIONS:
  SYN only          -> "port open?" probe
  RST back          -> port closed
  SYN-ACK back      -> port OPEN (found a service!)
```

---

## The 3-way handshake with real numbers

```text
LAPTOP 192.168.1.10                 SERVER 93.184.216.34
    |                                        |
    |-- SYN  Seq=0 Win=64240 --------------->|  "ready?"
    |<- SYN-ACK Seq=0 Ack=1 Win=65535 -------|  "ready, your turn"
    |-- ACK  Seq=1 Ack=1 ------------------->|  "confirmed"
    |===== DATA: POST /login Seq=1 =======>|
```

Step by step:

1. client picks random ISN, offers it
2. server confirms `client ISN + 1`, offers its own
3. client confirms `server ISN + 1` -> conversation is LIVE

> Three packets BEFORE a single byte of the login form moves.

---

## Window size: flow control in one field

```text
Window = 64240   means: "you may send me up to 64 KB
                         before waiting for my Ack"
```

- receiver shrinks window under load -> sender slows down
- window reaches 0 -> sender must STOP (zero-window pause)
- full buffer = missing Acks = retransmissions

Wireshark view of OUR capture:

```text
[TCP Window Update]  93.184.216.34 -> 192.168.1.10  Win=29440
[TCP ZeroWindow]     only appears when server drowns
```

---

## UDP: the 8-byte alternative

```text
TCP header 20+ bytes          UDP header exactly 8 bytes
order, acks, window           NONE of it
+----------------------------+++----------------+
| Src 5353 | Dst 53 | Len | Cksum |  <- that's ALL
```

| Choose TCP for | Choose UDP for |
|----------------|----------------|
| login, pages, files | DNS query (one ask, one answer) |
| anything you cannot lose | streaming, voice, games |

Our example uses BOTH:

- DNS lookup earlier today = UDP datagram, no handshake
- login POST right now = TCP segment, fully tracked

---

## Segment anatomy: our login becomes a SEGMENT

```text
        APPLICATION DATA (100 B)
  "POST /login username=bhaskar&password=secret123"
                    |
                    v  Transport wraps it
+--------------------------------------------------+
| TCP HEADER (20 B)                                |
|  Src 51522 | Dst 80 | Seq=1 | Ack=1              |
|  Flags=PSH,ACK | Win=64240                       |
+--------------------------------------------------+
| PAYLOAD: the 100-byte login form                 |
+--------------------------------------------------+
        = SEGMENT, total 120 bytes
```

<div class="callout remember"><span class="label">Remember</span>From this moment the unit is called a SEGMENT. UDP version would be a DATAGRAM.</div>

---

## Evidence: handshake in Wireshark

```text
No. Time     Source           Destination      Protocol Info
  6 0.000000 192.168.1.10     93.184.216.34    TCP  51522->80 [SYN] Seq=0 Win=64240
  7 0.045000 93.184.216.34    192.168.1.10     TCP  80->51522 [SYN,ACK] Seq=0 Ack=1
  8 0.045100 192.168.1.10     93.184.216.34    TCP  51522->80 [ACK] Seq=1 Ack=1
  9 0.046200 192.168.1.10     93.184.216.34    HTTP POST /login
```

Detail pane for packet 6 -- expand Transmission Control Protocol:

```text
Source Port:          51522
Destination Port:     80
Sequence Number:      0    (relative)
Acknowledgment:       0
Flags:                0x002 (SYN)
Window size value:    64240
```

*(live-capture screenshot slot)*

---

## <span class="attack">ATTACK</span> / <span class="defend">DEFEND</span>: Transport

<div class="two-col">

<div class="col">

### <span class="attack">ATTACK</span>

- **SYN flood**: thousands of SYNs, never finish handshake -> server half-open queue fills -> real users locked out
- **Port scan**: SYN probes map every open door
- **Session hijack**: guess/inject with correct Seq numbers

</div>

<div class="col author">

### <span class="defend">DEFEND</span>

- **SYN cookies**: build state from the Ack itself, no memory wasted
- Rate-limit new connections per source
- Watch for scan pattern: many SYNs, zero data
- Random ISNs (modern OS default)

</div>

</div>

---

<!-- _class: lead -->

# Layer 3
## INTERNET
### *Packets, IP addresses, routing*

---

## What Internet actually does

Transport asked "which process?" Internet asks "which HOST, and how do I get there?"

```text
Is 93.184.216.34 inside MY subnet 192.168.1.0/24?
   NO  -> hand packet to DEFAULT GATEWAY 192.168.1.1
   YES -> deliver directly on the LAN
```

Jobs at this layer:

- logical addressing (`IP`)
- local-vs-remote decision (subnet math)
- routing hop by hop across networks
- diagnostics (`ICMP`)

> Gateway = the exit door of your network. Someone else routes from there.

---

## IPv4 header: the full map (20 bytes)

```text
 0        3 4    7 8            15 16                     31
+----------+------+--------------+-------------------------+
| Ver=4    |IHL=5 |  TOS 0x00    |   Total Length  160     | 4B
+----------+------+--------------+------------+------------+
|        Identification  0x1a2b            |Fl| FragOff 0 | 4B
+------------+-------------+---------------+------------+
|  TTL 128   | Protocol 6  | Header Checksum 0xb4e1     | 4B
+------------+-------------+----------------------------+
|        Source IP       192.168.1.10                     | 4B
+---------------------------------------------------------+
|        Destination IP  93.184.216.34                    | 4B
+---------------------------------------------------------+
```

Four fields carry the whole story: **TTL, Protocol, Source, Destination.**

---

## TTL: the packet's death clock

```text
Sender sets TTL=128 (Windows default)
Every router that forwards DECREMENTS by 1
TTL hits 0 -> router drops packet, sends ICMP "Time Exceeded"
```

Our packet crossing town:

```text
tracert 93.184.216.34
  1   1 ms   192.168.1.1      (gateway, TTL hit 0 first)
  2   9 ms   10.20.30.1       (ISP edge)
  3  12 ms   72.14.x.x        (backbone)
 ...
```

Security use: TTL rarely changes between packets from one OS.

- sudden TTL jump on one "session" -> possible spoofed injection
- firewalls compare TTL fingerprints

---

## Protocol field: the demux key UPWARD

```text
Protocol = 6   -> payload is a TCP segment
Protocol = 17  -> payload is a UDP datagram
Protocol = 1   -> payload is ICMP
```

This single byte tells the receiving IP: *who upstairs gets this?*

```text
FRAME [ Eth | IP(Proto=6) | TCP | login ]  -> hand to TCP stack
FRAME [ Eth | IP(Proto=17)| UDP | dns   ]  -> hand to UDP stack
```

Ports did demux INSIDE transport (which process).
Protocol does demux INTO transport (which layer-4 protocol).

<div class="callout remember"><span class="label">Remember</span>Two demux keys: Protocol picks the transport, Port picks the program.</div>

---

## Subnet math: the decision EVERY packet makes

```text
My IP:      192.168.1.10      Mask: 255.255.255.0
Target:     93.184.216.34

AND both with the mask:
  mine:   192.168.1.10  AND mask = 192.168.1.0
  target: 93.184.216.34 AND mask = 93.184.216.0

Equal?  NO  -> REMOTE -> send to gateway 192.168.1.1
```

Ping your own subnet and the frame goes STRAIGHT to the host.
Ping outside it and the SAME packet goes to the gateway instead.

> One AND operation decides local delivery vs routing. That is the whole magic.

---

## ICMP: the Internet layer talking about itself

```text
Type 8 / Code 0   Echo Request      "ping"
Type 0 / Code 0   Echo Reply        "pong"
Type 11 / Code 0  TTL Exceeded      what traceroute listens for
Type 3 / Code x   Destination Unreachable
```

ICMP has NO ports. It rides directly on IP (`Protocol = 1`).

Evidence from OUR capture:

```text
No. Source         Destination    Protocol Info
22  192.168.1.10   93.184.216.34  ICMP Echo (ping) request  id=0x0001 seq=1
23  93.184.216.34  192.168.1.10   ICMP Echo (ping) reply    id=0x0001 seq=1
```

---

## Packet anatomy: our segment becomes a PACKET

```text
+--------------------------------------------------+
| IP HEADER (20 B)                                 |
|  Src 192.168.1.10 -> Dst 93.184.216.34           |
|  TTL=128  Protocol=6  ID=0x1a2b                  |
+--------------------------------------------------+
| SEGMENT (120 B): TCP hdr + login form            |
+--------------------------------------------------+
        = PACKET, total 140 bytes
```

Encapsulation so far:

```text
DATA 100 B -> SEGMENT 120 B -> PACKET 140 B
```

<div class="callout warning"><span class="label">Note</span>The IP header does NOT know about ports. It carries the segment intact.</div>

---

## <span class="attack">ATTACK</span> / <span class="defend">DEFEND</span>: Internet

<div class="two-col">

<div class="col">

### <span class="attack">ATTACK</span>

- **IP spoofing**: forge Source IP -> hide identity or blame someone else
- **ICMP recon**: ping sweeps map live hosts
- **TTL tricks**: crafted TTLs evade topology-based rules

</div>

<div class="col author">

### <span class="defend">DEFEND</span>

- Ingress filtering: drop inbound packets claiming internal IPs
- Egress filtering: your border stops spoofed OUTBOUND traffic
- Rate-limit ICMP at the firewall
- Log TTL anomalies per session

</div>

</div>

---

<!-- _class: lead -->

# Layer 2 + 1
## NETWORK ACCESS
### *Frames, MAC addresses, bits*

---

## What Network Access actually does

IP says "deliver to 93.184.216.34". On YOUR cable, that is impossible.

```text
Your NIC speaks ETHERNET, not IP.
Ethernet delivers to a MAC address ON THE LOCAL SEGMENT.

Remote destination? -> frame addressed to the GATEWAY's MAC
```

Jobs at this layer:

- wrap packets in FRAMES
- physical addressing (`MAC`)
- local delivery: NIC to NIC
- turn frames into BITS on copper, fiber, radio

> Internet chooses the destination HOST. Network access chooses the NEXT RECEIVER.

---

## Ethernet frame: byte by byte

```text
+--------+--------+--------+--------+--------+-----+--------+-----+
| Preamble+SFD      | Dst MAC           | Src MAC      |EtherType|
| 8 bytes           | 6 bytes           | 6 bytes      | 2 bytes |
+-------------------+-------------------+--------------+---------+
|                PAYLOAD: our 140-byte IP PACKET               |
+--------------------------------------------------------------+
| FCS (CRC32 checksum)  4 bytes                                |
+--------------------------------------------------------------+

OUR LOGIN FRAME:
  Dst = A4:2B:B0:D9:44:E1   (gateway! not the web server)
  Src = 3C:97:0E:52:1A:7F   (laptop)
  Type = 0x0800             (payload is IPv4)
  Total = 8 + 14 + 140 + 4  = 166 bytes on the wire
```

---

## MAC address anatomy: who made this NIC?

```text
3C:97:0E : 52:1A:7F
\_______/   \______/
   |            |
  OUI          serial
 vendor ID    device ID
 (Intel)     (burned in)

First 3 bytes identify the MANUFACTURER.
Lookup any MAC's vendor: wireshark resolves it automatically.
```

Special addresses worth memorizing:

```text
FF:FF:FF:FF:FF:FF   broadcast - EVERYONE on the segment hears it
First bit of first byte = 1   multicast group
```

MAC = permanent passport of the NIC. IP = temporary hotel room.

---

## ARP: finding the gateway's MAC

IP chose gateway 192.168.1.1 -- but what is its MAC?

```text
REQUEST  (broadcast FF:FF:FF:FF:FF:FF)
  "Who has 192.168.1.1? Tell 192.168.1.10"

REPLY    (unicast to laptop)
  "192.168.1.1 is at A4:2B:B0:D9:44:E1"
```

Then the OS caches it:

```text
arp -a
Internet Address    Physical Address    Type
192.168.1.1         a4-2b-b0-d9-44-e1   dynamic
```

> ARP is the glue between L3 logic (IP) and L2 delivery (MAC). No ARP, no exit.

---

## Frame anatomy: our packet becomes a FRAME, then BITS

```text
+----------------------------------------------------+
| ETH HDR 14B: dst=gateway MAC, src=laptop, 0x0800   |
+----------------------------------------------------+
| PACKET 140B: IP hdr + TCP hdr + login form         |
+----------------------------------------------------+
| FCS 4B: CRC32 - receiver discards frame if wrong   |
+----------------------------------------------------+
   FRAME = 158 bytes  (+8B preamble on the wire)

NIC shifts it out:  01010011 10110100 00101101 ...
```

Size ladder of our ONE login:

```text
DATA 100 B -> SEGMENT 120 B -> PACKET 140 B -> FRAME 158 B -> BITS
```

MTU check: 158 << 1500, no fragmentation needed.

---

## Evidence: ARP + frame in Wireshark

```text
No. Source           Destination          Protocol Info
 3  3c:97:0e:52:1a:7f Broadcast            ARP  Who has 192.168.1.1?
 4  a4:2b:b0:d9:44:e1 3c:97:0e:52:1a:7f    ARP  192.168.1.1 is at a4:2b:b0:d9:44:e1
 5  3c:97:0e:52:1a:7f A4:2b:b0:d9:44:e1    IPv4 192.168.1.10 -> 93.184.216.34
```

Expand Ethernet II on packet 5:

```text
Destination: AsustekC_d9:44:e1 (a4:2b:b0:d9:44:e1)
Source:      Intel_52:1a:7f   (3c:97:0e:52:1a:7f)
Type:        IPv4 (0x0800)
Frame check sequence: 0x9c41e207  [correct]
```

*(live-capture screenshot slot)*

---

## <span class="attack">ATTACK</span> / <span class="defend">DEFEND</span>: Network Access

<div class="two-col">

<div class="col">

### <span class="attack">ATTACK</span>

- **ARP poisoning**: fake replies claim gateway's IP is attacker's MAC -> MITM
- **Evil twin AP**: stronger clone of real Wi-Fi
- **MAC spoofing**: impersonate a trusted NIC

</div>

<div class="col author">

### <span class="defend">DEFEND</span>

- Dynamic ARP Inspection on switches
- Static ARP entries for gateways (small networks)
- 802.1X: no port access without authentication
- WPA3 + monitor for duplicate IPs/MACs

</div>

</div>

---

## Capstone: ONE login, fully dressed

```text
LAPTOP builds:                                    SERVER receives:
  DATA     "POST /login..."  100B
  + TCP    ports,seq,flags   120B  SEGMENT
  + IP     src,dst,TTL       140B  PACKET
  + ETH    MACs,type,FCS     158B  FRAME
  = BITS   010110...

GATEWAY: strips frame, REWRITES new frame toward ISP
  (IP stays identical end-to-end, MAC changes EVERY hop)

SERVER: strips frame -> packet -> segment -> hands
  100 clean bytes to the web app on port 80
```

<div class="callout remember"><span class="label">Remember</span>IP addresses survive the journey. MAC addresses die at every hop.</div>

---

## Inside the router: what EVERY hop really does

```text
Frame arrives at gateway (dst MAC = router's own interface)
 1. FCS check            corrupt? -> silently drop
 2. Strip Ethernet hdr   out comes the bare PACKET
 3. Read dst IP          93.184.216.34 - not mine -> ROUTE
 4. TTL 128 -> 127       recompute IP checksum
 5. Routing table        which interface / next hop toward ISP?
 6. ARP if needed        learn next-hop MAC
 7. Build a BRAND-NEW frame   src=router MAC, dst=next-hop MAC
 8. Bits on the wire again
```

Home reality bonus: your gateway is also doing **NAT** --

```text
192.168.1.10:51522  becomes  <your-public-IP>:40001  on the way out
```

That is why the server never sees your private IP.

---

## The server receives: unwrapping in reverse

```text
BITS hit the server NIC
  -> NIC rebuilds FRAME, verifies FCS
     -> strip ETHERNET (dst MAC was mine)
        -> PACKET: dst IP is mine, Protocol = 6
           -> hand to TCP stack
              -> port 80 has a listener: the web app
              -> Seq numbers prove order, no gaps
              -> TCP sends ACK back for our data
                 -> strip TCP
                    -> DATA delivered: 100 clean bytes
```

The web application finally sees EXACTLY what the student typed:

```text
POST /login  username=bhaskar&password=secret123
```

<div class="callout remember"><span class="label">Remember</span>Sending wraps four times. Receiving unwraps four times. Every layer only reads its OWN header.</div>

---

## The reply: same road, opposite direction

Server answers the login:

```text
HTTP/1.1 200 OK   + welcome page (~1200 bytes)
```

Now the full stack runs BACKWARD:

```text
DATA 1200 B
  -> SEGMENTS   Src port 80 -> Dst port 51522, Seq tracked
  -> PACKETS    Src 93.184.216.34 -> Dst 192.168.1.10, TTL=64 (Linux)
  -> FRAMES     router-to-router MACs, final hop: dst = laptop MAC
  -> BITS       radio -> your Wi-Fi NIC
```

Your laptop unwraps, browser renders the page.

Round trip complete in roughly 50 ms -- and EVERY layer did its job twice.

---

## Closing politely: the 4-way goodbye

```text
LAPTOP                          SERVER
  |---- FIN, ACK --------------->|   "I'm done sending"
  |<------------------- ACK -----|   "noted"
  |<------------------ FIN, ACK -|   "me too"
  |---- ACK -------------------->|   "bye"
  connection CLOSED, ports freed
```

- `FIN` = polite close, both sides finish cleanly
- `RST` = rude abort (crash, refused port, firewall reject)

Wireshark filter to watch a full life cycle:

```text
tcp.stream eq 0     <- one whole conversation, SYN to FIN
```

---

## Master timeline: every packet of today's story

```text
 0. DHCP discover/offer/request/ack   "who am I?"          (Day 1)
 1. DNS query -> answer               example.com = 93.184.216.34
 2. ARP who-has 192.168.1.1           find gateway MAC
 3. TCP  SYN          Seq=0           open the door
 4. TCP  SYN,ACK      Ack=1           door open
 5. TCP  ACK          Seq=1 Ack=1    confirmed
 6. TCP  PSH,ACK + POST /login        the secret travels
 7. TCP  ACK                          server confirms receipt
 8. HTTP 200 OK                       segments stream back
 9. TCP  ACKs                         client confirms pages
10. FIN/ACK x4                        polite goodbye
```

Ten steps. Two models. One picture you can now read off any capture.

---

## Classification drill: name that PDU

| You see in Wireshark | Unit | Layer |
|----------------------|------|-------|
| `POST /login username=...` | Data | Application |
| `51522 -> 80 [SYN] Seq=0` | Segment | Transport |
| `192.168.1.10 -> 93.184.216.34 TTL=128 Proto=6` | Packet | Internet |
| `3c:97:0e:52:1a:7f -> a4:2b:b0:d9:44:e1 0x0800` | Frame | Network Access |
| `Who has 192.168.1.1?` | Frame (ARP) | Network Access |
| `Echo request id=1 seq=1` | Packet (ICMP) | Internet |

If you can classify ANY line above instantly, today worked.

---

## Day close

1. **Transport** = SEGMENT. Ports find the process; seq/ack give memory; flags steer the conversation; TCP tracks, UDP trusts.
2. **Internet** = PACKET. IP finds the host; TTL bounds the trip; Protocol picks the transport; subnet math picks gateway vs direct.
3. **Network Access** = FRAME -> BITS. MACs move it one hop; ARP finds the next receiver; FCS guards integrity.

**Lab next:** capture your OWN login, label every header field from today, and classify each packet by PDU name.

<!-- 
Speaker notes:
- Timing: Transport ~30min, Internet ~25min, NetAccess ~20min, capstone+drill ~9min
- Swap "(live-capture screenshot slot)" blocks with real screenshots before class if available
- Drill slide: run it as rapid-fire quiz, students shout Segment/Packet/Frame
-->
