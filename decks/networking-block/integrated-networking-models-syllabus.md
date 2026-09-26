# Integrated Networking Models Syllabus

This redesign teaches `OSI` and `TCP/IP` as one operational stack.

- `DNS` and `DHCP` are already completed and should be treated as prior knowledge.
- The remaining course should move layer by layer, showing how both models describe the same traffic differently.
- Every lesson should pair theory with a live packet capture so students can see the layer on the wire.

## Teaching Frame

Use this unified mapping in every class:

| Unified teaching layer | OSI view | TCP/IP view | What students should see |
| --- | --- | --- | --- |
| Application | Layers 7, 6, 5 | Application | Requests, responses, names, encryption context, session behavior |
| Transport | Layer 4 | Transport | Ports, TCP handshake, reliability, UDP vs TCP |
| Internet | Layer 3 | Internet | IP addressing, routing, TTL, ICMP |
| Network Access | Layer 2 | Link / Network Access | Frames, MAC addresses, ARP, switching, local delivery |
| Physical | Layer 1 | Usually folded into network access | Signals, media, speed, duplex, errors below packet level |

## Already Completed Foundation

These topics are done and should be referenced, not retaught from scratch:

### DHCP in the unified model

- `OSI`: mostly Application-layer protocol that supports lower-layer configuration
- `TCP/IP`: Application protocol used to obtain Layer 3 settings
- Student takeaway: before higher-layer communication starts, the host must obtain an IP address, gateway, and DNS server

### DNS in the unified model

- `OSI`: Application-layer naming service
- `TCP/IP`: Application protocol that supports all upper-layer communication
- Student takeaway: the browser cannot start transport-layer communication until a name becomes an IP address

Use both of these as recurring prerequisites in later lessons:

- DHCP prepares the host for network participation
- DNS prepares the destination for transport-layer communication

## Redesigned Sequence

## Lesson 1: The Unified Stack and Encapsulation

### Theory

Open by correcting the common teaching mistake: `OSI` and `TCP/IP` are not rival systems to memorize separately. They are two views of the same communication process.

Teach these points together:

- `OSI` is a conceptual model with finer separation
- `TCP/IP` is the deployed protocol architecture used on real networks
- Encapsulation is the main idea that unifies both models:
  - application data
  - transport segment
  - IP packet
  - link-layer frame
  - bits on the medium
- Decapsulation is what happens on the receiving host in the reverse order

Students should leave this lesson understanding:

- why one action in a browser creates activity at multiple layers
- why Wireshark usually shows evidence for Layers 2 through 7 but not the true electrical or radio signals of Layer 1
- why the same packet can be explained using both models at once

### Practical demonstration

Generate one simple web request with a known destination such as `http://neverssl.com`.

Use:

- `Wireshark`
- `curl`
- browser

Demo flow:

1. Start a blank Wireshark capture
2. Visit one site
3. Stop the capture
4. Identify DNS, TCP, HTTP, ARP, and Ethernet evidence
5. Build a board view that labels each captured event with both its OSI and TCP/IP placement

Suggested filters:

- `dns`
- `tcp`
- `http`
- `arp`

## Lesson 2: Application Layer as One Combined Story

### Theory

Teach `OSI Layers 7, 6, and 5` together as `TCP/IP Application`.

This is where students usually get confused, so be explicit:

- `OSI Application` explains the service the user or program wants
- `OSI Presentation` explains how data is encoded, compressed, or encrypted
- `OSI Session` explains how communication state is established and maintained
- `TCP/IP` collapses all three into a single Application layer

Use real examples:

- `HTTP` and `HTTPS` as application protocols
- `TLS` as presentation/session behavior in OSI language
- `DNS` as naming support already completed
- `DHCP` as configuration support already completed

Core theoretical outcomes:

- students can explain why `HTTPS` is still an application-layer interaction even though it uses transport below it
- students can distinguish application content from transport delivery
- students can describe what OSI gains by separating presentation and session concepts even though TCP/IP does not

### Practical demonstration

Capture a plain `HTTP` request and an `HTTPS` request.

Demo flow:

1. Start Wireshark
2. Visit `http://neverssl.com`
3. Visit `https://example.com`
4. Compare the captures

What to inspect:

- `HTTP GET` request headers in plain text
- `HTTP 200 OK` response
- `TLS Client Hello`
- `TLS Server Hello`
- visible metadata even when payload is encrypted

Suggested filters:

- `http`
- `tls`
- `tcp.port == 80`
- `tcp.port == 443`

Tool extensions:

- `Follow TCP Stream`
- browser dev tools for headers and timing comparison

## Lesson 3: Transport Layer

### Theory

Teach the Transport layer as the cleanest overlap between the models:

- `OSI Layer 4` maps directly to `TCP/IP Transport`

Explain:

- end-to-end delivery between processes
- source and destination ports
- multiplexing many conversations on one host
- segmentation and reassembly
- reliability, sequencing, acknowledgments
- flow control
- retransmission
- connection-oriented `TCP` versus connectionless `UDP`

Tie back to completed work:

- `DNS` often uses `UDP`
- web browsing commonly uses `TCP`

Core theoretical outcomes:

- students can explain why ports exist separately from IP addresses
- students can describe the TCP three-way handshake
- students can justify when `UDP` is preferred over `TCP`

### Practical demonstration

Run two captures:

- DNS lookup to show `UDP`
- web request to show `TCP`

Demo flow:

1. Capture a DNS query and note UDP port 53
2. Capture a visit to `http://neverssl.com`
3. isolate the TCP handshake
4. inspect sequence and acknowledgment numbers
5. if possible, show a retransmission by briefly disrupting the connection

Suggested filters:

- `udp`
- `tcp`
- `tcp.flags.syn == 1`
- `tcp.analysis.retransmission`

Tool extensions:

- `netstat -ano`
- `ss -tuna` on Linux if available

## Lesson 4: Internet Layer

### Theory

Teach `OSI Network` and `TCP/IP Internet` as the layer responsible for host-to-host delivery across networks.

Explain:

- logical addressing with IP
- local vs remote destination logic
- subnet masks and default gateway
- routing decisions
- hop-by-hop forwarding
- `TTL` / hop limit
- `ICMP` as a control and diagnostic protocol
- fragmentation as a concept, even if students do not see it often

Tie back to completed work:

- DHCP provided the IP address, mask, and gateway
- DNS provided the destination IP needed by this layer

Core theoretical outcomes:

- students can explain the difference between a `port` and an `IP address`
- students can explain why a packet goes to the gateway when the destination is off-network
- students can interpret `TTL` and `ICMP` at a basic troubleshooting level

### Practical demonstration

Use:

- `ping`
- `tracert` or `traceroute`
- Wireshark

Demo flow:

1. `ping` a local device and then a remote host
2. capture `ICMP` packets
3. run `tracert 8.8.8.8` or another known target
4. inspect the changing hop behavior
5. inspect packet IP headers in Wireshark

Suggested filters:

- `icmp`
- `ip`
- `ipv6`

What to highlight:

- source and destination IP addresses
- TTL values
- echo request and echo reply
- intermediate path visibility in traceroute

## Lesson 5: Network Access Layer

### Theory

Teach `OSI Data Link` alongside `TCP/IP Link / Network Access`.

Explain:

- frames, not packets
- local delivery on the same LAN
- source and destination MAC addresses
- broadcast versus unicast
- switching
- ARP as the bridge between Layer 3 addressing and Layer 2 delivery
- VLANs if they are in scope for the class

This lesson is where the unified approach becomes powerful:

- IP answers "where is the host?"
- MAC answers "which device on this local segment gets the frame next?"

Core theoretical outcomes:

- students can explain why local communication still needs MAC addresses even when IP addresses are known
- students can explain ARP as a local-resolution protocol
- students can distinguish frame-level delivery from packet-level routing

### Practical demonstration

Use:

- `arp -a`
- Wireshark
- local ping to gateway or another LAN host

Demo flow:

1. clear ARP cache if safe in the lab environment
2. start Wireshark
3. ping the gateway
4. inspect the ARP request and ARP reply
5. inspect the following Ethernet frames

Suggested filters:

- `arp`
- `eth`
- `vlan`

What to highlight:

- broadcast ARP request
- unicast ARP reply
- Ethernet source and destination MAC addresses
- how the host learns the gateway MAC before sending off-network traffic

## Lesson 6: Physical Layer and the Limits of Packet Capture

### Theory

Teach `OSI Physical` as the one layer students cannot fully observe in Wireshark.

Explain:

- bits on the medium
- copper, fiber, and wireless transmission
- signaling, modulation, and clocking in simplified language
- bandwidth, duplex, and link speed
- packet loss caused by physical issues
- why Wireshark starts after the NIC has already interpreted the signal into frames

Core theoretical outcomes:

- students understand the boundary between packet capture and physical troubleshooting
- students can name problems that occur below Layer 2
- students can connect weak signal or bad cabling to transport-layer symptoms such as retransmissions

### Practical demonstration

Use tools other than Wireshark:

- adapter status panels
- switch port counters
- `ipconfig /all`
- NIC advanced properties
- wireless signal information
- Linux `ethtool` if available

Demo flow:

1. show negotiated speed and duplex
2. compare a healthy link and a degraded link if lab equipment allows
3. correlate poor physical conditions with packet symptoms such as retries or dropped performance

Suggested supporting evidence:

- Wireshark retransmissions
- interface error counters
- changing signal strength on Wi-Fi

## Lesson 7: End-to-End Trace Lab

### Theory

This capstone lesson replays one complete user action across the entire unified stack:

- local host prepared by DHCP
- destination resolved by DNS
- TCP or UDP selected at transport
- IP handles path selection
- ARP resolves local next hop
- Ethernet frames carry the packet
- physical medium transmits the bits
- application receives and renders the response

This is the lesson where students stop seeing layers as boxes and start seeing them as a chain of dependencies.

### Practical demonstration

Run one narrated capture from idle state to page load.

Demo flow:

1. start Wireshark with no filter
2. load one known site
3. narrate the packet sequence in order
4. pause after each stage and classify it by:
   - unified teaching layer
   - OSI name
   - TCP/IP name
   - security relevance

Suggested classification prompts:

- Which event is application-layer behavior?
- Which event is transport setup?
- Which event is Internet-layer routing?
- Which event is link-layer local delivery?
- Which event cannot be fully seen in Wireshark?

## Suggested Remaining Teaching Plan

Since `DNS` and `DHCP` are completed, a practical remaining sequence is:

1. `Unified stack overview + encapsulation`
2. `Application layer: HTTP, HTTPS, TLS, session behavior`
3. `Transport layer: TCP and UDP`
4. `Internet layer: IP, ICMP, routing`
5. `Network access layer: Ethernet, MAC, ARP`
6. `Physical layer: media and signal limits`
7. `End-to-end full trace lab`

## Reusable Class Template

For every future networking lesson, use the same rhythm:

1. State the unified layer
2. Map it to both `OSI` and `TCP/IP`
3. Explain the theory
4. Generate live traffic
5. Capture and filter it
6. Interpret what the layer is doing
7. Connect the layer to one attack and one defense

## Security Anchors Per Layer

| Layer | Example attack | Example defense |
| --- | --- | --- |
| Application | credential theft over HTTP, malicious content | HTTPS, secure headers, input validation |
| Transport | session hijacking, reset abuse | TLS, hardened service exposure, monitoring |
| Internet | spoofing, routing abuse | filtering, segmentation, routing controls |
| Network Access | ARP spoofing, sniffing on shared media | static ARP where appropriate, switch security, WPA2/WPA3 |
| Physical | cable tampering, rogue AP, signal degradation | physical security, AP hardening, link monitoring |

## Instructor Notes

- Do not reopen separate `OSI day` and `TCP/IP day` tracks. Keep the models merged in every explanation.
- Treat `DNS` and `DHCP` as anchor examples when discussing Application and Internet dependencies.
- Prefer one repeated workflow in every class: generate traffic, capture it, classify it, explain it.
- Use `neverssl.com` for plaintext demonstrations and a normal HTTPS site for encrypted traffic comparison.
