---
marp: true
theme: academy
paginate: true
title: "Day 4 -- Routing the Packet"
footer: "Practical Cyber Security: From First Principles -- Networking Block -- Day 4"
---

<!-- _class: lead -->

# Day 4
## Routing the Packet

**Practical Cyber Security: From First Principles** -- Networking Block

---

## Learning journey

```text
Completed: DHCP and DNS
Day 2: Application layer in a unified model
Day 3: Transport layer
Today: Internet layer
Tomorrow: Local delivery + full trace
```

---

## Why are we learning this?

Transport gets data ready for a host. The `Internet` layer gets it to the right host.

- `OSI Network layer` = `TCP/IP Internet layer`
- This layer chooses path, addressing, and forwarding logic
- Without it, transport has nowhere to send its segment

<div class="callout remember"><span class="label">Remember</span>Transport asks "which process?" Internet asks "which host?"</div>

---

## What this layer does

- uses logical addressing with `IP`
- decides whether the destination is local or remote
- sends remote traffic to the `default gateway`
- allows routers to forward packets across networks
- carries diagnostics such as `ICMP`

Tie-back to completed lessons:

- `DHCP` gave the host its IP, subnet mask, and gateway
- `DNS` gave the host the destination IP

---

## Local vs remote destination

```text
If destination is in your subnet:
-> send directly on the local network

If destination is outside your subnet:
-> send to default gateway
-> router forwards it onward
```

This is where students should finally connect:

- address
- subnet
- gateway
- route

---

## IP header concepts to teach

- source IP
- destination IP
- TTL
- protocol field
- fragmentation concept

Keep the explanation operational:

- source IP tells who sent it
- destination IP tells who should receive it
- TTL prevents endless looping
- protocol field tells IP what sits above it, such as `TCP`, `UDP`, or `ICMP`

---

## ICMP: control and diagnostics

`ICMP` is not "web traffic."

It is used for:

- `ping`
- error reporting
- parts of `traceroute` / `tracert`

This makes it one of the best ways to teach the Internet layer with live evidence.

---

## DEMO: Ping capture

```text
1. Open Wireshark
2. Start capture
3. Run: ping 8.8.8.8
4. Filter: icmp
```

What students should see:

- Echo request
- Echo reply
- source and destination IP addresses

Questions:

- Which side started the exchange?
- Which addresses changed?
- Which layer is actually being demonstrated here?

---

## DEMO: Traceroute and TTL

```text
1. Start a new capture
2. Run: tracert 8.8.8.8
3. Filter: icmp or ip
4. Inspect TTL-related behavior
```

What students should see:

- multiple hops
- replies from intermediate devices
- evidence that routing is hop by hop, not one magic jump

> `Traceroute` teaches routing better than a static diagram ever will.

---

## Mapping the full story so far

```text
DHCP already prepared the host
DNS already found the destination
Transport already chose TCP or UDP
Internet now decides where packets must go
```

This reinforces sequence:

1. get local configuration
2. resolve destination
3. create transport conversation
4. deliver toward the right host

---

## Security angle

- spoofed IP traffic complicates attribution
- unusual TTL patterns can reveal scans or deception
- ICMP misuse can support reconnaissance
- weak segmentation exposes too much of the internal network

---

## Day 4 close

1. `OSI Network` and `TCP/IP Internet` describe the same packet-delivery layer
2. This layer uses `IP`, routes, gateways, and `ICMP`
3. `Ping` and `tracert` turn routing into something students can observe
4. DHCP and DNS are prerequisites, but the Internet layer is what turns that setup into host-to-host reachability

**Tomorrow:** we finish with local delivery, `ARP`, frames, the physical boundary, and one end-to-end trace of the whole stack.
