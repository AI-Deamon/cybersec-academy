# The Networking Story -- One-Page Reference
**The full connection flow from power button to page load**

> Print this as a poster or handout. Students keep it as a reference
> throughout the networking block and beyond.

---

## THE CONNECTION STORY

```
+------------------+     +------------------+     +------------------+
|  1. POWER ON     |     |  2. DHCP         |     |  3. IDENTITY     |
|                  | --> |                  | --> |                  |
|  You connect     |     |  Router assigns: |     |  IP = street     |
|  to Wi-Fi        |     |  - IP address    |     |  MAC = passport  |
|                  |     |  - Gateway       |     |  Gateway = door  |
|                  |     |  - DNS server    |     |                  |
+------------------+     +------------------+     +------------------+
                                                           |
                                                           v
+------------------+     +------------------+     +------------------+
|  6. RESPONSE     |     |  5. HTTP/HTTPS   |     |  4. DNS          |
|                  | <-- |                  | <-- |                  |
|  Server sends    |     |  Browser sends   |     |  "google.com" = |
|  HTML page       |     |  GET request     |     |  142.250.x.x    |
|                  |     |  (plain or       |     |                  |
|                  |     |   encrypted)     |     |  Chain: cache -> |
+------------------+     +------------------+     |  router -> ISP   |
        |                  +------------------+     |  -> root -> auth |
        v                  |  5b. TLS Lock    |     +------------------+
+------------------+       |                  |
|  7. RENDER       |       |  HTTPS encrypts  |
|                  |       |  the content     |
|  Browser parses  |       |  (WHERE visible, |
|  HTML, CSS, JS   |       |   WHAT hidden)   |
|  Page appears    |       |                  |
+------------------+       +------------------+
```

---

## THE 7 STEPS (detailed)

```
Step 1: You type "google.com" and press Enter
   |
   v
Step 2: DNS Lookup
   Your PC --> DNS Server: "What's the IP for google.com?"
   DNS Server --> Your PC: "142.250.x.x"
   [Tool: nslookup google.com]
   [Wireshark filter: dns]
   |
   v
Step 3: TCP Three-Way Handshake
   Your PC --> Server: SYN ("Hello, can we talk?")
   Server --> Your PC: SYN-ACK ("Yes, can we?")
   Your PC --> Server: ACK ("Let's go.")
   [Wireshark filter: tcp.flags.syn==1]
   |
   v
Step 4: HTTP Request (inside TLS if HTTPS)
   Your PC --> Server: GET / HTTP/1.1
                     Host: google.com
                     User-Agent: Mozilla/5.0 ...
   [Wireshark filter: http]
   |
   v
Step 5: Server Response
   Server --> Your PC: HTTP/1.1 200 OK
                     Content-Type: text/html
                     [HTML content]
   |
   v
Step 6: Browser Fetches Resources
   Your PC --> Server: GET /style.css
   Your PC --> Server: GET /script.js
   Your PC --> Server: GET /logo.png
   (each follows the same pattern)
   |
   v
Step 7: Page Renders
   Browser parses HTML, applies CSS, runs JS
   Page appears on screen
```

---

## TOOL MAP (what to use when)

```
+---------------------------+---------------------------+
|  QUESTION                 |  TOOL                     |
+---------------------------+---------------------------+
|  "What's my IP?"          |  ipconfig / ip a          |
|  "Can I reach the internet?"|  ping 8.8.8.8           |
|  "What path did I take?"  |  tracert / traceroute     |
|  "What's the IP for X?"   |  nslookup / dig           |
|  "What packets are flying?"|  Wireshark               |
|  "What's on this network?"|  nmap 192.168.1.0/24      |
|  "Who's on the local net?"|  arp -a                   |
|  "Quick CLI capture?"     |  tcpdump                  |
+---------------------------+---------------------------+
```

---

## WIRESHARK FILTER CHEAT SHEET

```
+---------------------------+---------------------------+
|  FILTER                   |  SHOWS                    |
+---------------------------+---------------------------+
|  dns                      |  DNS queries/responses    |
|  tcp.flags.syn==1         |  TCP SYN packets          |
|  http                     |  HTTP requests/responses  |
|  http.request.method==POST|  HTTP POST (forms)        |
|  tls                      |  TLS handshake            |
|  port 53                  |  DNS traffic              |
|  port 80                  |  HTTP traffic             |
|  port 443                 |  HTTPS/TLS traffic        |
|  host 8.8.8.8             |  Traffic to/from 8.8.8.8  |
+---------------------------+---------------------------+
```

---

## ATTACK CHAIN (how breaches happen)

```
EVIL TWIN          DNS SPOOF          MITM              CREDENTIAL THEFT
    |                  |                 |                     |
Fake Wi-Fi     -->  Fake DNS      -->  Intercepts     -->  Captures
AP appears         server answers       all traffic         password
                   wrong IPs           flows through        in plaintext
    |                  |                 |                     |
    v                  v                 v                     v
DEFENSE:            DEFENSE:           DEFENSE:           DEFENSE:
Verify SSID         Use trusted        HTTPS/TLS          HTTPS + MFA
Use VPN             DNS (1.1.1.1)      encrypts           encrypts
WPA3                DNS-over-HTTPS     content            form data
```

---

## DEFENSE CHAIN (layer by layer)

```
LAYER               ATTACK              DEFENSE
-----------------------------------------------------------
Connection          Evil Twin           WPA3, VPN, verify SSID
DHCP                Rogue DHCP          Static IP, VPN
DNS                 Cache poisoning     Trusted DNS, DoH, DNSSEC
TCP                 SYN flood/DoS       Rate limiting, firewalls
HTTP                Eavesdropping       HTTPS everywhere
TLS                 Certificate fraud   CA validation, pinning
Application         SQL injection       Input validation, WAF
Session             Cookie theft        Secure flags, MFA
-----------------------------------------------------------
```

---

## QUICK REFERENCE: PORTS

```
PORT    SERVICE    RISK IF OPEN
------------------------------------
22      SSH        Brute-force login
53      DNS        Spoofing/redirection
80      HTTP       Unencrypted traffic
443     HTTPS      Generally safe
3389    RDP        Remote brute-force
445     SMB        EternalBlue, lateral movement
------------------------------------
```

---
