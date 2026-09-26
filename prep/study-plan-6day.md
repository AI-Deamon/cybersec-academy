# 6-Day Study Plan: Computer Fundamentals + Networking

**Goal:** Build solid foundations before diving into cybersecurity tools and techniques.

---

## Overview

| Day | Topics | Time |
|-----|--------|------|
| **Day 1** | CPU, RAM, Storage, Processes, Kernel vs User mode | 4-5 hrs |
| **Day 2** | Binary, Hex, ASCII, Encoding basics | 4-5 hrs |
| **Day 3** | Networks, Packets, IP & MAC addresses | 4-5 hrs |
| **Day 4** | DNS, Ports, TCP vs UDP, TCP handshake | 4-5 hrs |
| **Day 5** | Web page load journey, HTTPS/TLS intro | 4-5 hrs |
| **Day 6** | Review + Practice labs (ping, nslookup, Wireshark intro) | 4-5 hrs |

---

## Daily Structure

```
Theory:    60% (notes, diagrams, examples)
Practice:  30% (hands-on commands, observation)
Review:    10% (flashcards, quiz yourself)
```

---

## Day 1 — Computer Basics

### What to Learn
- CPU cycles, registers, clock speed
- RAM vs Storage (volatile vs persistent)
- How a program loads and runs
- PID, memory allocation
- Kernel mode vs User mode

### Key Concepts

**CPU (Central Processing Unit)**
- Executes instructions one by one
- Clock speed = how many cycles per second (GHz)
- Registers = tiny, fast storage inside CPU

**RAM (Random Access Memory)**
- Temporary workspace for running programs
- Fast but volatile (lost when power off)
- Measured in GB

**Storage (HDD/SSD)**
- Permanent data storage
- Slower than RAM but retains data

**How a Program Runs**
```
Program on disk → Loaded into RAM → CPU executes instructions
```

**Process**
- A running instance of a program
- Has a PID (Process ID)
- Uses memory, CPU time, file handles

**Kernel vs User Mode**
| Mode | What It Can Do |
|------|----------------|
| Kernel | Full hardware access, manage memory, run any instruction |
| User | Restricted access, must ask kernel via system calls |

### Practice
- Open Task Manager (Windows) or `htop` (Linux)
- Identify running processes, PIDs, memory usage
- Note which processes run as SYSTEM vs your user

---

## Day 2 — Data Representation

### What to Learn
- Bits and bytes
- Binary ↔ Decimal conversion
- Hexadecimal notation
- ASCII table
- Why encoding matters in security

### Key Concepts

**Bit**
- Smallest unit: 0 or 1

**Byte**
- 8 bits = 1 byte
- Can represent 0-255 (256 values)

**Binary ↔ Decimal**
```
Binary  Decimal
0000    0
0001    1
0010    2
0011    3
1000    8
1111    15
```

**Hexadecimal (Base 16)**
- Uses 0-9 and A-F
- 2 hex digits = 1 byte
- Common in security: MAC addresses, hashes, memory addresses

```
Hex     Binary      Decimal
0x0A    00001010    10
0xFF    11111111    255
```

**ASCII**
- Maps numbers to characters
- Example: A = 65 (decimal) = 0x41 (hex)

**Why This Matters**
- Hashes are displayed in hex
- URLs use hex encoding (%20 = space)
- File signatures (magic bytes) in hex

### Practice
- Convert 5 numbers between binary, decimal, hex
- Look up ASCII table
- Find hex values in a hash (e.g., MD5, SHA-256)

---

## Day 3 — Networking Fundamentals

### What to Learn
- What is a network (LAN, WAN, Internet)
- Packets: header + payload
- IPv4 address structure
- MAC address & why it matters
- Subnet mask basics

### Key Concepts

**Network Types**
| Type | Range | Example |
|------|-------|---------|
| PAN | Few meters | Bluetooth |
| LAN | Building | Home network |
| WAN | Cities/Countries | Internet |

**Packet**
- Unit of data sent over a network
- Contains: header (source, destination, etc.) + payload (actual data)

**IPv4 Address**
- 32-bit number, written as 4 octets: 192.168.1.1
- Each octet: 0-255
- Unique identifier on a network

**MAC Address**
- 48-bit hardware address burned into NIC
- Written as: AA:BB:CC:DD:EE:FF
- Used for local (same network) delivery

**Subnet Mask**
- Determines which part of IP is network vs host
- Common: 255.255.255.0 (/24)
- First 3 octets = network, last = host

**How Devices Find Each Other**
```
Same network? → Use MAC address (ARP)
Different network? → Use IP address (routed)
```

### Practice
- Run `ipconfig` (Windows) or `ifconfig`/`ip a` (Linux)
- Find your IP, MAC, subnet mask
- Ping another device on your network

---

## Day 4 — Ports, Protocols, TCP/UDP

### What to Learn
- DNS: domain → IP resolution
- Port numbers: 0-65535
- TCP: reliable, connection-oriented
- UDP: fast, connectionless
- TCP 3-way handshake

### Key Concepts

**DNS (Domain Name System)**
- Translates domain names to IP addresses
- Example: google.com → 142.250.80.46
- Like a phone book for the internet

**Port Numbers**
- Identify specific services/applications
- Range: 0-65535

| Port | Service |
|------|---------|
| 22 | SSH |
| 53 | DNS |
| 80 | HTTP |
| 443 | HTTPS |
| 3389 | RDP |

**TCP (Transmission Control Protocol)**
- Reliable delivery
- Ordered packets
- Error checking
- Slower than UDP
- Use when: accuracy matters (web, email, file transfer)

**UDP (User Datagram Protocol)**
- Fast, no connection setup
- No guaranteed delivery
- Use when: speed matters (gaming, video streaming, DNS queries)

**TCP 3-Way Handshake**
```
Client → Server:  SYN (let's connect)
Server → Client:  SYN-ACK (okay, let's connect)
Client → Server:  ACK (connected!)
```

### Practice
- Run `nslookup google.com` — see DNS resolution
- Run `netstat -an` — see active connections and ports
- Identify which ports are listening on your machine

---

## Day 5 — How a Web Page Loads

### What to Learn
- Full journey: URL → DNS → IP → TCP handshake → HTTP request → response
- HTTP methods (GET, POST)
- Status codes (200, 404, 500)
- HTTPS = HTTP + TLS
- TLS handshake overview

### Key Concepts

**7-Step Web Page Load**
```
1. User types URL in browser
2. Browser checks cache for DNS
3. DNS lookup: domain → IP address
4. TCP handshake: SYN → SYN-ACK → ACK
5. TLS handshake (if HTTPS): encryption keys exchanged
6. HTTP request sent (GET /index.html)
7. Server responds with HTML → browser renders
```

**HTTP Methods**
| Method | Purpose |
|--------|---------|
| GET | Retrieve data |
| POST | Send data |
| PUT | Update data |
| DELETE | Remove data |

**Status Codes**
| Code | Meaning |
|------|---------|
| 200 | OK |
| 301 | Moved permanently |
| 404 | Not found |
| 500 | Server error |

**HTTPS/TLS**
- HTTP + encryption (TLS)
- Prevents eavesdropping and tampering
- Uses certificates to verify server identity

### Practice
- Open browser DevTools → Network tab
- Visit a website and observe:
  - DNS lookup time
  - TCP handshake
  - HTTP request/response
  - Status codes

---

## Day 6 — Review & Practice Labs

### Morning: Theory Review
- Flashcard review of all key terms
- Draw full packet flow diagram from memory
- Quiz yourself on binary/hex conversions

### Afternoon: Hands-On Labs

**Lab 1: Basic Network Commands**
```bash
# Test connectivity
ping google.com

# Trace route
tracert google.com  (Windows)
traceroute google.com  (Linux)

# DNS lookup
nslookup google.com
```

**Lab 2: Observe Your Network**
```bash
# View network interfaces
ipconfig /all  (Windows)
ip a  (Linux)

# View active connections
netstat -an

# View listening ports
netstat -tlnp  (Linux)
```

**Lab 3: Wireshark Intro (Optional)**
- Download and install Wireshark
- Start capture
- Browse to a website
- Filter by DNS or HTTP
- Observe packets

---

## Key Terms Cheat Sheet

| Term | Definition |
|------|------------|
| CPU | Executes program instructions |
| RAM | Temporary working memory |
| Process | Running instance of a program |
| Kernel | Core OS with full hardware access |
| Binary | Base-2 number system (0,1) |
| Hex | Base-16 number system (0-9, A-F) |
| Packet | Unit of data on a network |
| IP Address | Logical network identifier |
| MAC Address | Hardware-burned NIC identifier |
| DNS | Domain name to IP resolver |
| Port | Identifies a specific service |
| TCP | Reliable, connection-oriented protocol |
| UDP | Fast, connectionless protocol |
| TLS | Encryption layer for secure communication |

---

## Success Criteria

By end of Day 6, you should be able to:
- [ ] Explain CPU, RAM, Storage and how they work together
- [ ] Convert between binary, decimal, and hexadecimal
- [ ] Describe what a packet is and how IP/MAC addresses work
- [ ] Explain DNS resolution and common port numbers
- [ ] Describe TCP vs UDP and the 3-way handshake
- [ ] Trace the full journey of loading a web page
- [ ] Use basic network commands (ping, nslookup, netstat)

---

*Created: 2026-08-17*
*Status: Ready to start*
