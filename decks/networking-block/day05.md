---
marp: true
theme: academy
paginate: true
title: "Day 5 -- Local Delivery and the Full Trace"
footer: "Practical Cyber Security: From First Principles -- Networking Block -- Day 5"
---

<!-- _class: lead -->

# Day 5
## Local Delivery and the Full Trace

**Practical Cyber Security: From First Principles** -- Networking Block

---

## Learning journey

```text
Completed: DHCP and DNS
Day 2: Application layer
Day 3: Transport layer
Day 4: Internet layer
Today: Network access + physical boundary + full trace
```

---

## Why are we learning this?

`IP` is not enough to put a packet on the local wire.

- `OSI Data Link` + `OSI Physical`
- `TCP/IP Network Access`
- this is where packets become frames and move across the local medium

<div class="callout remember"><span class="label">Remember</span>Internet decides the destination host. Network access decides the next local receiver.</div>

---

## What this layer does

- wraps packets inside frames
- uses `MAC addresses`
- handles local delivery on a LAN or Wi-Fi segment
- supports broadcast and unicast behavior
- relies on actual media such as copper, fiber, or radio

This is also where students should see the limitation of Wireshark:

- Wireshark shows frames after the NIC interprets the signal
- it does not show raw radio waves or electrical signaling

---

## ARP: the local introduction

Before sending to the gateway, the host may need the gateway's MAC address.

```text
Host:    "Who has 192.168.1.1?"
Gateway: "I do. My MAC is AA:BB:CC:DD:EE:FF"
```

Teach this as the bridge:

- `IP` identifies the next host logically
- `ARP` finds the next receiver physically on the local segment

---

## DEMO: ARP on the wire

```text
1. Start Wireshark
2. Filter: arp
3. Ping the default gateway
4. Inspect request and reply
```

What students should see:

- ARP request as broadcast
- ARP reply as unicast
- local discovery before normal packet forwarding

Useful supporting command:

```bash
arp -a
```

---

## Ethernet / Wi-Fi frame view

After ARP resolution, inspect a normal frame.

What to highlight:

- source MAC
- destination MAC
- EtherType
- payload carrying the IP packet

Suggested filters:

- `eth`
- `arp`

> This is the point where packets become something a switch or access point can actually forward locally.

---

## Physical layer: what Wireshark cannot show

Teach this boundary clearly:

- cables
- radio signal strength
- duplex
- link speed
- interference
- damaged media

Use supporting tools:

- adapter status
- switch counters
- wireless signal indicators
- interface statistics

If the physical layer degrades, upper layers often show:

- retransmissions
- latency spikes
- dropped sessions

---

## DEMO: The full end-to-end trace

```text
1. Start Wireshark with no filter
2. Open one known site
3. Narrate the traffic in order
```

Expected sequence:

```text
1. DNS lookup        (already learned)
2. TCP handshake     (Transport)
3. HTTP or TLS       (Application)
4. IP delivery       (Internet)
5. ARP / Ethernet    (Network Access)
6. Physical medium   (explained, not fully visible)
```

Students should classify each event using both models.

---

## Unified capstone map

```text
OSI 7/6/5  -> TCP/IP Application -> HTTP, HTTPS, TLS, DNS, DHCP
OSI 4      -> TCP/IP Transport   -> TCP, UDP
OSI 3      -> TCP/IP Internet    -> IP, ICMP
OSI 2      -> TCP/IP Net Access  -> Ethernet, Wi-Fi, ARP
OSI 1      -> Physical medium    -> copper, fiber, radio
```

This is the final message of the block:

- not two separate stories
- one stack
- two naming systems

---

## Security angle

- ARP spoofing abuses local trust
- open or weak Wi-Fi exposes shared-medium risk
- poor segmentation increases lateral movement
- physical weakness can become network weakness

---

## Day 5 close

1. Network access handles local delivery with frames and MAC addresses
2. ARP connects Layer 3 logic to Layer 2 delivery
3. The physical layer matters even when packet tools cannot fully show it
4. Students should now be able to explain one browser action across the whole unified stack

**Outcome of the redesigned block:** students no longer memorize OSI and TCP/IP separately. They read live traffic layer by layer and use both models at the same time.
