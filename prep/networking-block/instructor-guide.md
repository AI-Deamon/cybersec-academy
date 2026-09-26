# Networking Block -- Instructor Guide
**5-day story-driven networking deep-dive**
**~84 min/day | Own machines, shared network | Wireshark + Nmap + tcpdump + CLI**

> This is your teaching script. Each day follows one story beat:
> "What actually happens when you ___?" Each beat is paired with a live tool demo.
> Students see the concept, then immediately see it on their own machine.

---

## How to use this guide

- **Bold text** = what you say out loud (exact words or close paraphrase)
- `Code blocks` = commands to type during the demo
- **[DEMO]** markers = pause the story, switch to screen share, run the command
- **[ATTACK STORY]** markers = the real-world breach narrative for that day
- Times are approximate -- adjust based on class energy

---
# DAY 1 -- "The Invisible Handshake"
**What happens when you connect to Wi-Fi?**

## Opening (2 min)

**"Every attack, every breach, every hack you've ever heard of started with one thing: a connection. Today we trace what actually happens in the 3 seconds between you clicking 'Connect' and your laptop being ready to browse. By the end, you'll see that even this simple step has invisible layers -- and each one can be attacked."**

## Beat 1 -- The Plug-In (15 min)

**Story:** "You open your laptop. You see a list of Wi-Fi networks. You click your home network. Type the password. Click Connect. Three seconds later, you're online. But what actually happened?"

Three things happened in those 3 seconds:
1. **Authentication** -- your laptop proved it knows the Wi-Fi password
2. **Association** -- your laptop joined the network (got a slot on the wireless access point)
3. **DHCP** -- your laptop asked for an address and got one

**DHCP = Dynamic Host Configuration Protocol.** Your laptop shouts: "Hey, I'm new here, can I have an IP?" A server (usually your router) responds: "Here -- use this IP, this gateway, this DNS server, and this lease time."

**[DEMO -- ipconfig]**
```
ipconfig /all          # Windows
ip a                   # Linux/Mac
```

Walk through the output:
- **IPv4 Address** -- your temporary street address on this network (e.g., 192.168.1.105)
- **Subnet Mask** -- defines your local neighborhood (e.g., 255.255.255.0 = "everyone starting with 192.168.1 is local")
- **Default Gateway** -- your door to the internet (e.g., 192.168.1.1 = your router)
- **DNS Server** -- the phone book your laptop was told to use
- **DHCP Enabled** -- Yes (confirming DHCP assigned all of this)
- **Lease Obtained / Expires** -- this address is borrowed, not permanent

**Key point:** "Everything here was handed to you automatically. You didn't choose your DNS server. You didn't choose your gateway. The network decided for you."

## Beat 2 -- Your Identity (10 min)

**Story:** "So you have an IP address. But what IS an IP address?"

- **IP address** = your temporary street address on THIS network. Changes when you move to a different network (home, coffee shop, office = different IP each time).
- **MAC address** = your hardware's permanent serial number. Baked into the network card at the factory. Stays the same everywhere.
- **Default Gateway** = your router. The door between your local network and the internet. Every packet destined for the outside world goes through this door.

**[DEMO -- show both addresses]**
```
ipconfig /all          # Windows -- look for "Physical Address"
ip link show           # Linux -- look for "link/ether"
```

**"Your IP is like a hotel room number -- you get it when you check in, and it changes when you check out. Your MAC is like your passport -- it's yours forever, wherever you go."**

## Beat 3 -- First Contact (10 min)

**Story:** "Now you're connected. You have an IP. Let's send our first packet to the outside world."

**[DEMO -- ping]**
```
ping 8.8.8.8
```

Walk through the output:
- "Reply from 8.8.8.8" -- the packet made it to Google's DNS server and came back
- "time=14ms" -- round-trip time. 14 milliseconds there and back.
- "TTL=116" -- Time To Live. Each router decrements this by 1. When it hits 0, the packet dies. Prevents infinite loops.

**"Every line here is a round trip. Your packet left your machine, crossed your router, traveled through 5-10 routers on the internet, reached Google, and came back. All in 14 milliseconds."**

## Beat 4 -- The Path (10 min)

**Story:** "But which routers did it pass through? Let's trace the path."

**[DEMO -- traceroute]**
```
tracert 8.8.8.8         # Windows
traceroute 8.8.8.8      # Linux/Mac
```

Walk through each hop:
- **Hop 1** = your router (192.168.1.1) -- the first post office
- **Hops 2-10** = ISP routers, backbone routers -- each one a "post office" that reads the destination and forwards
- **Last hop** = 8.8.8.8 (Google) -- the destination

**"Each line is a router that touched your packet. Think of it as a chain of post offices, each one forwarding your letter closer to the destination."**

## Beat 5 -- The Leak (10 min)

**Story:** "You're connected. You can reach the internet. But there's one more invisible layer: DNS. Your laptop needs to turn names into numbers."

**[DEMO -- nslookup]**
```
nslookup google.com
```

Walk through the output:
- "Server: 192.168.1.1" -- the DNS server your DHCP gave you (your router)
- "Address: 192.168.1.1#53" -- port 53 = DNS service
- "Non-authoritative answer: Name: google.com, Address: 142.250.x.x" -- the IP your router looked up for you

**"You didn't ask for this DNS server. Your router handed it to you via DHCP. If someone controlled your DHCP response, they could hand you a malicious DNS server -- and every website you visit would go to their fake version instead."**

## Beat 6 -- The Attack: Evil Twin / Rogue DHCP (10 min)

**[ATTACK STORY]**

**"In 2018, security researchers demonstrated that at major tech conferences, anyone could set up a Wi-Fi access point named 'Conference_Free_WiFi' with no password. Within minutes, hundreds of devices connected automatically. The attacker was now the gateway for all those devices -- seeing every DNS query, every unencrypted request, every connection."**

This is an **Evil Twin attack**:
1. Attacker sets up a rogue access point with the same (or similar) name as a legitimate one
2. Devices connect to it (some auto-connect to known SSIDs)
3. Attacker runs a rogue DHCP server, handing themselves as the gateway
4. All traffic flows through the attacker
5. Attacker can: eavesdrop, redirect DNS, inject malware, steal credentials

**Defense:** Always verify the network name. Use WPA3. Never trust public Wi-Fi without a VPN. Check for HTTPS (but HTTPS alone doesn't prevent all attacks).

**"This is why your phone warns you about 'open networks.' It's not being paranoid -- it's telling you that anyone between you and the internet can see your traffic."**

## Transition to Day 2

**"Today we connected. Tomorrow we type a name -- google.com -- and trace what happens before the page even starts loading. The name-to-number translation is where the next layer of attacks lives."**

---
# DAY 2 -- "The Address Book"
**What happens when you type google.com?**

## Opening (2 min)

**"Yesterday you connected and got an IP. Today you type 'google.com' and press Enter. Before a single pixel appears on screen, your machine has already done something invisible: it looked up a name in a phone book. That phone book is called DNS -- and it's one of the most attacked systems on the internet."**

## Beat 1 -- The Problem (10 min)

**Story:** "You type 'google.com.' Your computer has no idea what that means. It needs a number -- an IP address. DNS is the system that translates names to numbers."

**[DEMO -- nslookup]**
```
nslookup google.com
```

- "Name: google.com" -- what you typed
- "Address: 142.250.x.x" -- the number your machine needs

**"Your computer asked a DNS server: 'What's the IP for google.com?' The server looked it up and replied: '142.250.x.x.' This happens for EVERY name you type, EVERY link you click, EVERY app that connects to the internet. DNS is the backbone of the web."**

## Beat 2 -- The Chain (10 min)

**Story:** "But who did your computer ask? And what if that server doesn't know?"

The DNS resolution chain:
1. **Your browser cache** -- "Did I already look this up recently?" (stored locally)
2. **Your OS cache** -- "Did any program on this machine already resolve this?"
3. **Your router** -- the DNS server DHCP gave you (usually your ISP's resolver)
4. **ISP resolver** -- "Let me check my cache... if not cached, I'll ask up the chain"
5. **Root servers** -- "You want .com? Ask the .com server"
6. **TLD servers** -- "You want google.com? Ask Google's authoritative server"
7. **Authoritative server** -- "google.com = 142.250.x.x" (the answer)

**[DEMO -- trace the chain]**
```
nslookup google.com 8.8.8.8        # Ask Google's DNS directly
nslookup google.com 1.1.1.1        # Ask Cloudflare's DNS
nslookup google.com                # Ask your default (router/ISP)
```

**"Same answer from three different servers. But the path to get there is different -- and each step can be intercepted or poisoned."**

## Beat 3 -- The Record Types (10 min)

**Story:** "DNS doesn't just translate names to IPs. It holds different types of records for different purposes."

**[DEMO -- query different record types]**
```
nslookup -type=A google.com         # Name to IP (the standard one)
nslookup -type=MX google.com        # Mail servers (where email goes)
nslookup -type=CNAME example.com    # Alias (example.com to www)
nslookup -type=NS google.com        # Name servers (who answers for this domain)
```

- **A record** = the IP address (most common)
- **MX record** = mail server (if you send email to user@gmail.com, MX tells you where to deliver)
- **CNAME** = alias (www.example.com might be an alias for example.com)
- **NS record** = which DNS server is authoritative for this domain

**"When you send an email, DNS tells your mail server where to deliver it. If an attacker poisons the MX record, your email goes to them instead."**

## Beat 4 -- On the Wire (15 min)

**Story:** "You've seen DNS from the command line. But what does a DNS query actually look like as a network packet? Let's capture it."

**[DEMO -- Wireshark DNS capture]**

1. Open Wireshark
2. Select your Wi-Fi interface
3. Start capture
4. In the filter bar, type: `dns`
5. Open a browser, go to any website (e.g., `http://neverssl.com`)
6. Stop capture

Walk through the packets:
- **Query packet** (blue/green): Source = your IP, Destination = DNS server IP, Info = "Standard query A neverssl.com"
- **Response packet** (same conversation): Source = DNS server, Destination = your IP, Info = "Standard query response A [IP address]"

**"This is what we taught yesterday made visible. The DNS query is a UDP packet on port 53. It goes from your machine to the DNS server and back. Wireshark shows you exactly what the command line told you -- but now you can SEE it as packets on the wire."**

## Beat 5 -- Caching and TTL (5 min)

**Story:** "Every DNS answer comes with a TTL -- Time To Live. It tells your machine how long to remember the answer before asking again."

- TTL of 300 seconds = "cache this for 5 minutes"
- TTL of 86400 = "cache this for 24 hours"
- Lower TTL = more frequent lookups = slower but fresher
- Higher TTL = fewer lookups = faster but riskier (stale data)

**"If a DNS server is poisoned and the TTL is 24 hours, the fake answer stays cached for a full day. That's why TTL matters for security."**

## Beat 6 -- The Attack: Kaminsky DNS Bug (12 min)

**[ATTACK STORY]**

**"In 2008, security researcher Dan Kaminsky discovered a flaw that broke DNS for the entire internet. Here's how it worked:"**

The attack:
1. Attacker queries a target DNS server: "What's the IP for random12345.example.com?" (a name that doesn't exist)
2. The target DNS server says "I don't know, let me ask the authoritative server"
3. While waiting, the attacker floods the target with forged DNS responses: "random12345.example.com = [attacker's IP], and by the way, so does google.com"
4. If the forged response arrives before the real one, the target caches the fake answer
5. Now the target DNS server thinks google.com = attacker's IP
6. Everyone using that DNS server gets redirected to the attacker

**"This was a race condition. The attacker's fake answers raced against the real answers. And because DNS uses UDP (no handshake, no verification), the first answer wins -- even if it's fake."**

The fix: **Source port randomization** -- DNS servers now use unpredictable source ports, making it nearly impossible to guess where to send the forged response. This was deployed across every DNS server on Earth within weeks of Kaminsky's disclosure.

**"DNS is 40 years old. It was designed when everyone on the internet trusted each other. It has no built-in authentication. Every security layer we've added (DNSSEC, DoH, DoT) is a patch on top of a protocol that was never designed to be secure."**

## Transition to Day 3

**"Today we saw how names become numbers -- and how that phone book can be poisoned. Tomorrow we actually send data through the connection. You'll type a password into a login form, and we'll see exactly what travels across the wire -- plaintext vs encrypted. That's where Equifax lost 147 million records."**

---
# DAY 3 -- "The Conversation"
**What happens when you click a link and log in?**

## Opening (2 min)

**"Yesterday you looked up a name. Today you actually talk to the server. You click a link, see a login form, type your password, and hit Submit. What actually travels across the wire? The answer depends on one thing: HTTP or HTTPS. And the difference is the difference between a postcard and a sealed envelope."**

## Beat 1 -- The Handshake (10 min)

**Story:** "Before any data flows, your machine and the server agree to talk. This is the TCP three-way handshake."

The three steps:
1. **SYN** -- "Hello, can we talk?" (your machine to server)
2. **SYN-ACK** -- "Yes, and I hear you. Can we?" (server to your machine)
3. **ACK** -- "Yes, let's go." (your machine to server)

**[DEMO -- Wireshark TCP handshake]**

1. Open Wireshark, start capture on Wi-Fi
2. Filter: `tcp.flags.syn==1`
3. Visit `http://neverssl.com` in your browser
4. Stop capture

Walk through the packets:
- **SYN** -- your machine to neverssl.com's IP on port 80
- **SYN-ACK** -- neverssl.com to your machine
- **ACK** -- your machine to neverssl.com

**"Three packets, before any data. This is the phone call: dial, answer, hello. Without this handshake, no data flows."**

## Beat 2 -- The Request: HTTP (10 min)

**Story:** "After the handshake, your browser sends an HTTP request. Let's see exactly what it says."

**[DEMO -- Wireshark HTTP request]**

1. In the same capture, clear the TCP filter
2. Filter: `http`
3. Find the GET request to neverssl.com
4. Right-click, Follow, TCP Stream

Walk through the readable request:
```
GET / HTTP/1.1
Host: neverssl.com
User-Agent: Mozilla/5.0 ...
Accept: text/html,...
Connection: keep-alive
```

**"This is plain text. Anyone on the path can read it. Your browser told the server: 'I want the home page, I'm using Firefox on Windows, I accept HTML.' All visible."**

## Beat 3 -- The Login: HTTP POST (10 min)

**Story:** "Now let's see what happens when you submit a login form over HTTP."

**[DEMO -- Wireshark HTTP POST]**

1. Keep the capture running
2. On `http://neverssl.com`, if there's a form, submit fake credentials (username: test, password: fakepassword123)
3. In Wireshark, filter: `http.request.method == "POST"`
4. Right-click the POST packet, Follow, TCP Stream

Walk through:
```
POST /login HTTP/1.1
Host: neverssl.com
Content-Type: application/x-www-form-urlencoded

username=test&password=fakepassword123
```

**"There it is. Your password, in plain text, visible to anyone capturing packets on the network. This is why HTTP login forms are dangerous -- and why HTTPS exists."**

## Beat 4 -- The Lock: HTTPS/TLS (10 min)

**Story:** "Now the same thing over HTTPS. The difference is night and day."

**[DEMO -- Wireshark TLS handshake]**

1. Start a new capture (or filter the existing one)
2. Filter: `tls`
3. Visit `https://google.com` (or any HTTPS site)
4. Find the TLS packets

Walk through:
- **ClientHello** -- your browser says "I support these encryption methods"
- **ServerHello** -- the server picks one and sends its certificate
- **Certificate** -- proves the server is who it claims to be
- **Key Exchange** -- they agree on a shared secret
- **Finished** -- encrypted channel established

**"After this handshake, everything is encrypted. You can still see the destination IP (you can see WHERE you're going), but you cannot read the content (you can't see WHAT you sent). The password is invisible."**

## Beat 5 -- What TLS Hides and Doesn't (5 min)

**"TLS encrypts the content. But it does NOT hide the destination IP. An eavesdropper can see:**
- **WHERE you're going** (destination IP, DNS query -- visible)
- **HOW MUCH data you sent** (packet sizes -- visible)
- **WHEN you connected** (timestamps -- visible)
- **WHAT you sent** (the actual content -- ENCRYPTED)"

**"This is called metadata. Even with HTTPS, your ISP knows which sites you visit. They just can't read what you sent."**

## Beat 6 -- The Attack: Equifax Breach (17 min)

**[ATTACK STORY]**

**"In March 2017, attackers exploited a vulnerability in Apache Struts, a web framework used by Equifax -- one of the three major credit reporting agencies in the US. The vulnerability had a patch available for TWO MONTHS before the breach. Equifax didn't apply it."**

Timeline:
1. **March 2017** -- Apache Struts CVE-2017-5638 published. Patch available.
2. **May 2017** -- Attackers exploit the unpatched vulnerability on Equifax's dispute portal
3. **May-July 2017** -- Attackers move laterally through Equifax's internal network. Internal traffic was UNENCRYPTED. Once inside, they could read database credentials, move between systems, and access everything.
4. **July 2017** -- Equifax discovers the breach (after a security team member noticed suspicious network traffic)
5. **September 2017** -- Public disclosure. 147 million people's data exposed.

**The lessons:**
- **Unpatched software** = open door. The Struts vulnerability was known and patched before the attack.
- **Unencrypted internal traffic** = lateral movement. Once inside, attackers read everything in plaintext.
- **76 days undetected** = monitoring failure. No alerts, no detection, no response.
- **Cost:** $1.4 billion in remediation. CEO, CIO, CISO all resigned. Equifax paid $700 million in settlements.

**"Equifax had firewalls, antivirus, and encryption on their public-facing systems. But their INTERNAL network was wide open. The attackers didn't break through the front door -- they walked in through an unpatched side entrance, then strolled through an unencrypted hallway to the vault."**

## Transition to Day 4

**"Today we saw what travels across the wire -- and what TLS protects. But what about the wire itself? Tomorrow we look at what OTHER people can see when you're on the same network. We'll use Nmap to see who's on the network, and tcpdump to capture packets from the command line. That's where Firesheep comes in."**

---
# DAY 4 -- "The Invisible Wire"
**What can you see on the network?**

## Opening (2 min)

**"You're at a coffee shop. You connect to their Wi-Fi. You're browsing, checking email, logging into things. But here's the question: who else is on this network? And what can they see? Today we find out."**

## Beat 1 -- The Shared Medium (10 min)

**Story:** "Wi-Fi is a shared radio frequency. Everyone connected to the same SSID is on the same wire. Unless traffic is encrypted at the application layer (HTTPS), other people on the network can see it."

**[DEMO -- Wireshark on shared network]**

1. Open Wireshark, start capture on Wi-Fi
2. Don't apply any filter -- just watch raw traffic
3. After 10-15 seconds, stop capture
4. Look for DNS queries, HTTP traffic, or other identifiable packets from OTHER devices

**"See that? Those DNS queries aren't yours. Those HTTP requests aren't yours. On a shared network, everyone's unencrypted traffic is visible to everyone else. This is the fundamental reality of Wi-Fi -- it's a broadcast medium."**

## Beat 2 -- ARP: The Local Introduction (10 min)

**Story:** "On your local network, devices don't use IP addresses to talk to each other -- they use MAC addresses. But how does your machine know which MAC address goes with which IP? That's ARP."

**ARP = Address Resolution Protocol.** Your machine broadcasts: "Who has 192.168.1.1?" The device with that IP replies: "That's me, and my MAC is AA:BB:CC:DD:EE:FF."

**[DEMO -- arp table]**
```
arp -a
```

Walk through the output:
- Each entry maps an IP to a MAC address
- These are your neighbors on the local network
- The router (gateway) is usually the first entry

**"ARP is how your machine finds the MAC address of the gateway. But ARP has no authentication -- anyone can reply to an ARP request, even if they're not the real device."**

## Beat 3 -- ARP Spoofing (10 min)

**Story:** "What if someone on the network sent fake ARP replies? 'Hey, I'm the gateway' -- even though they're not. Your machine would believe them, and all your traffic would flow through the attacker."

This is **ARP spoofing** (or ARP poisoning):
1. Attacker sends gratuitous ARP replies: "192.168.1.1 is at [attacker's MAC]"
2. Victim's ARP table gets updated: gateway MAC = attacker's MAC
3. Victim sends all internet traffic to the attacker
4. Attacker forwards it to the real gateway (victim doesn't notice)
5. Attacker can now read, modify, or drop all the victim's traffic

**"This is a man-in-the-middle attack. The attacker sits between you and the gateway, reading everything. It works because ARP was designed for trusted networks -- and coffee shop Wi-Fi is not a trusted network."**

## Beat 4 -- Nmap: What's Listening? (10 min)

**Story:** "Let's see who else is on this network and what services they're running."

**[DEMO -- Nmap scan]**
```
nmap 192.168.1.0/24       # Scan your local subnet
```

Walk through the output:
- Each line = a device on the network
- Open ports = services running (web server, file share, printer, etc.)
- Closed ports = nothing listening
- Filtered ports = firewall blocking

**"Every open port is a door. If you see port 80 open, there's a web server. Port 445 open? That's a file share -- potentially exploitable. Port 3389? Remote Desktop -- someone could brute-force it."**

**"This is reconnaissance. Attackers do this first -- map the network, find open doors, then try to walk through them. Defenders do the same thing -- scan their own network to find forgotten open ports and close them."**

**Note:** Only scan networks you own or have permission to scan. Scanning someone else's network without authorization is illegal.

## Beat 5 -- tcpdump: The CLI Capture (10 min)

**Story:** "Wireshark is great for visual analysis. But sometimes you need a quick capture from the command line -- maybe on a headless server, or when you need to script it."

**[DEMO -- tcpdump]**
```
tcpdump -i wlan0 -c 20                  # Capture 20 packets on Wi-Fi
tcpdump -i wlan0 port 53                # Only DNS traffic
tcpdump -i wlan0 port 80                # Only HTTP traffic
tcpdump -i wlan0 -w capture.pcap        # Save to a file (open in Wireshark later)
```

Walk through the output:
- Each line = one packet
- Source IP, Destination IP, Protocol, Flags
- `-c 20` = capture 20 packets then stop (so it doesn't run forever)
- `-w capture.pcap` = save to a file you can open in Wireshark

**"tcpdump is Wireshark without the GUI. Same data, different view. Security professionals use it on servers, in scripts, and in environments where there's no display."**

## Beat 6 -- The Attack: Firesheep (12 min)

**[ATTACK STORY]**

**"In 2010, security researcher Eric Butler released Firesheep -- a Firefox extension that made session hijacking trivial on open Wi-Fi. Here's how it worked:"**

1. You connect to open Wi-Fi at a coffee shop
2. Firesheep captures unencrypted cookies from HTTP traffic on the network
3. When someone logs into Facebook (which at the time used HTTP for the login page), Firesheep captures their session cookie
4. You click one button in Firesheep, and you're now logged in as that person
5. You can browse their Facebook, Twitter, Amazon -- anything that used HTTP cookies

**"It was a one-click attack. No technical skill required. Just install the extension, sit on open Wi-Fi, and click. That's it. You're in."**

The impact:
- Firesheep went viral -- thousands of copies downloaded in days
- It proved that HTTP session cookies on open Wi-Fi were completely insecure
- It forced major websites to adopt HTTPS everywhere
- Within 2 years, Facebook, Twitter, Google, and most major sites had moved to HTTPS by default

**"Firesheep didn't exploit a bug. It exploited a design flaw: HTTP cookies are sent in plaintext. Anyone on the same network can capture them. The fix wasn't a patch -- it was HTTPS everywhere."**

**Defense:** Always use HTTPS. Use a VPN on public Wi-Fi. Never trust open networks.

## Transition to Day 5

**"This week we traced the full connection story: DHCP, DNS, TCP, HTTP, HTTPS, ARP, Nmap, tcpdump. Tomorrow we put it all together -- one complete trace from power button to page load, and then we chain the attacks together: evil twin, DNS spoof, MITM, credential theft. The full picture."**

---
# DAY 5 -- "The Full Picture"
**Trace the entire connection end-to-end**

## Opening (2 min)

**"This week we traced every layer of a network connection. Today we put it all together -- one complete story from pressing the power button to seeing a page load. And then we chain the attacks together, because that's how real breaches happen: not one vulnerability, but a chain of them."**

## Beat 1 -- The Full Trace (15 min)

**Story:** "Let's watch the entire connection story in Wireshark, live."

**[DEMO -- Live capture, narrated]**

1. Open Wireshark, start capture on Wi-Fi
2. Clear all filters
3. Open a browser
4. Type `http://neverssl.com` and press Enter
5. As each packet appears, narrate:

- **DHCP** (if visible): "There's the DHCP offer -- your machine got an IP"
- **DNS**: "There's the DNS query -- looking up neverssl.com"
- **DNS response**: "There's the answer -- 216.154.192.100"
- **SYN**: "There's the TCP SYN -- your machine saying 'hello'"
- **SYN-ACK**: "Server responds -- 'hello back'"
- **ACK**: "Connection established"
- **GET**: "Browser sends the HTTP GET request"
- **200 OK**: "Server responds with the page"
- **Data**: "There's the HTML content"

**"Every step we taught this week -- DHCP, DNS, TCP handshake, HTTP request, response -- you just watched it happen in real time. This is the Day 4 story made visible."**

## Beat 2 -- The 7 Steps, Annotated (10 min)

**Story:** "Let's map each step to what we saw on the wire."

| Step | What happens | Wireshark evidence |
|------|-------------|-------------------|
| 1. You type a URL | Browser receives input | (no packet -- local) |
| 2. DNS lookup | Query to port 53, UDP | `dns` filter shows query + response |
| 3. TCP handshake | SYN, SYN-ACK, ACK | `tcp.flags.syn==1` shows the handshake |
| 4. HTTP request | GET / HTTP/1.1 | `http` filter shows the request |
| 5. Server response | 200 OK + HTML | Same stream, server's reply |
| 6. Browser parses | Fetches CSS/JS/images | More HTTP requests in the stream |
| 7. Page renders | (no packet -- local) | Page appears in browser |

**"Steps 1 and 7 happen on your machine. Steps 2-6 happen on the wire. Wireshark shows you steps 2-6. That's the visible part of the connection."**

## Beat 3 -- The Attack Chain (10 min)

**Story:** "Real attacks don't use just one technique. They chain multiple steps together. Let's trace a realistic attack chain."

**Attack chain: Evil Twin to Credential Theft**
1. **Evil Twin** -- Attacker sets up rogue Wi-Fi at coffee shop
2. **DHCP spoof** -- Attacker's DHCP hands themselves as gateway
3. **DNS spoof** -- Attacker's DNS server returns fake IPs for banking sites
4. **MITM** -- All traffic flows through attacker
5. **SSL stripping** -- Attacker downgrades HTTPS to HTTP (if possible)
6. **Credential theft** -- Login form submitted in plaintext, attacker captures it
7. **Account takeover** -- Attacker uses captured credentials

**"Each step enables the next. The evil twin lets you control DHCP. DHCP control lets you control DNS. DNS control lets you redirect. Redirection lets you intercept. Interception lets you steal. This is why defense must cover every layer -- one secure layer isn't enough if the others are weak."**

## Beat 4 -- The Defense Chain (10 min)

**Story:** "Every attack step has a defense. Let's map them."

| Attack step | Defense |
|------------|---------|
| Evil Twin | Verify network name, use WPA3, use VPN |
| DHCP spoof | Static IP / manual config, VPN |
| DNS spoof | Use trusted DNS (1.1.1.1), DNS-over-HTTPS |
| MITM | TLS/HTTPS, certificate pinning |
| SSL stripping | HSTS headers, browser pinning |
| Credential theft | HTTPS everywhere, MFA |
| Account takeover | MFA, anomaly detection |

**"The strongest defense is layered: VPN + HTTPS + MFA + awareness. No single tool stops everything. But together, they make each attack step significantly harder."**

## Beat 5 -- Mini-Challenge (20 min)

**Story:** "Now it's your turn. Capture your own traffic and answer four questions."

Students work independently:
1. Open Wireshark, capture on their Wi-Fi
2. Visit one website
3. Answer:
   - What DNS server did you use? (filter: `dns`)
   - Show the TCP handshake (filter: `tcp.flags.syn==1`)
   - Is this site HTTP or HTTPS? (check port 80 vs 443)
   - Can you read the request body? (follow TCP stream)

**Circulate and help students find the answers. This is the hands-on reinforcement of the entire week.**

## Wrap-Up (9 min)

**"This week we told one story: what happens when you connect, look up a name, send a request, and receive a response. Every layer has a purpose. Every layer has a vulnerability. And every layer has a defense.**

**The tools you learned this week -- ipconfig, ping, tracert, nslookup, Wireshark, Nmap, tcpdump -- are the same tools security professionals use every day. The difference is what you do with them: defend, or attack.**

**Next week we go deeper into the OS and start thinking like a security analyst. But the network foundation you built this week is what everything else stands on."**

---

## Quick Reference: Tools Used

| Day | Tools | Purpose |
|-----|-------|---------|
| 1 | `ipconfig`, `ping`, `tracert`, `nslookup` | Connection identity, connectivity, path, DNS |
| 2 | `nslookup`, Wireshark (DNS filter) | DNS resolution, DNS on the wire |
| 3 | Wireshark (TCP, HTTP, TLS filters) | Handshake, request/response, encryption |
| 4 | `arp -a`, `nmap`, `tcpdump` | Local mapping, port scanning, CLI capture |
| 5 | All combined | Full trace, attack chain, defense chain |

## Quick Reference: Wireshark Filters

| Filter | What it shows |
|--------|--------------|
| `dns` | DNS queries and responses |
| `tcp.flags.syn==1` | TCP SYN packets (handshake start) |
| `http` | HTTP requests and responses |
| `http.request.method == "POST"` | HTTP POST requests (form submissions) |
| `tls` | TLS handshake packets |
| `port 53` | DNS traffic (alternative) |
| `port 80` | HTTP traffic (alternative) |
| `port 443` | HTTPS/TLS traffic (alternative) |

## Quick Reference: Attack Stories

| Day | Attack | Year | Key lesson |
|-----|--------|------|-----------|
| 1 | Evil Twin / Rogue DHCP | Ongoing | First connection can be intercepted |
| 2 | Kaminsky DNS bug | 2008 | DNS cache poisoning breaks the phone book |
| 3 | Equifax breach | 2017 | Unpatched + unencrypted = total compromise |
| 4 | Firesheep | 2010 | HTTP cookies in plaintext = game over |
| 5 | (synthesis) | -- | Defense must cover every layer |
