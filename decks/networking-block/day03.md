---
marp: true
theme: academy
paginate: true
title: "Day 3 -- Transport in Motion"
footer: "Practical Cyber Security: From First Principles -- Networking Block -- Day 3"
---

<!-- _class: lead -->

# Day 3
## Transport in Motion

**Practical Cyber Security: From First Principles** -- Networking Block

---

## Learning journey

```text
Completed: DHCP and DNS
Yesterday: Unified models + Application layer
Today:     Transport layer in both models
Tomorrow:  Internet layer and routing decisions
```

---

## Why are we learning this?

Applications do not talk directly to the network. They hand data to `Transport`.

- `OSI Layer 4` = `TCP/IP Transport`
- This is the cleanest one-to-one mapping in both models
- If students understand this layer, they stop confusing ports, IPs, and protocols

<div class="callout remember"><span class="label">Remember</span>Application says what to send. Transport decides how the conversation behaves.</div>

---

## What the Transport layer does

- identifies the process with `ports`
- splits data into manageable pieces
- keeps conversations separate
- adds reliability when needed
- decides between `TCP` and `UDP`

```text
IP address = which host?
Port       = which process on that host?
```

---

## TCP: reliable conversation

```text
YOUR HOST                      SERVER
   |                              |
   |--------- SYN --------------->|
   |<------ SYN-ACK --------------|
   |--------- ACK --------------->|
   |========= DATA FLOWS ========|
```

TCP provides:

- ordering
- acknowledgments
- retransmission
- flow control

> TCP is the "make sure it arrives correctly" option.

---

## UDP: fast, minimal, no handshake

UDP does much less:

- no connection setup
- no built-in reliability
- no sequence tracking in the TCP sense

Good fits:

- `DNS`
- streaming
- voice and real-time apps

> Fast and lightweight, but the application must tolerate loss or handle recovery itself.

---

## DEMO: UDP with DNS

```text
1. Start Wireshark
2. Run: nslookup example.com
3. Filter: udp
4. Inspect source port -> destination port 53
```

What students should see:

- one request
- one response
- no three-way handshake

Tie-back:

- the class already learned DNS
- now they see it as a `Transport` choice, not only an application protocol

---

## DEMO: TCP handshake

```text
1. Start a fresh capture
2. Visit: http://neverssl.com
3. Filter: tcp.flags.syn == 1
4. Identify SYN, SYN-ACK, ACK
```

What students should see:

```text
Client -> Server   [SYN]
Server -> Client   [SYN, ACK]
Client -> Server   [ACK]
```

> Three packets before the application request becomes usable.

---

## DEMO: reliability in the capture

After the handshake:

- clear the filter
- use `tcp`
- inspect sequence and acknowledgment numbers
- if available, show retransmissions with `tcp.analysis.retransmission`

Questions to ask:

- Which packet proves receipt?
- Which numbers increase as data is sent?
- What changes when a packet is lost?

---

## Unified comparison

```text
HTTP / DNS / TLS       -> Application
TCP / UDP              -> Transport
IP                     -> Internet / Network
Ethernet / Wi-Fi / ARP -> Network Access / Data Link
```

This is the logic students should repeat:

- Application creates the content
- Transport manages the conversation

---

## Security angle

- weak transport visibility hides scanning and beaconing
- open TCP services increase attack surface
- UDP-heavy protocols are often abused for spoofing or amplification
- resets, retransmissions, and unusual port use are strong detection clues

---

## Day 3 close

1. `OSI Layer 4` and `TCP/IP Transport` are essentially the same teaching target
2. `TCP` = reliable conversation
3. `UDP` = lightweight message delivery
4. Wireshark makes transport behavior visible through ports, flags, sequence numbers, and retransmissions

**Tomorrow:** we move down to `IP`, routing, `ICMP`, and how packets cross networks.
