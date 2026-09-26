# Deep Dive Session -- Live Demo Playbook
**Your script for today. Every filter, every click, every spoken line.**

> The cure for stalling: never improvise in front of Wireshark. Follow this sheet.
> Each demo = SETUP -> DO -> YOU WILL SEE -> SAY THIS -> IF IT FAILS.

---

## 0. Pre-class checklist (do 15 min before students walk in)

```text
[ ] Wireshark open, capture STARTED on the right interface
    (right one = the packet counter in the status bar keeps moving)
[ ] Admin Command Prompt open (for arp -d *)
[ ] Browser: fresh window, NO other tabs, homepage blank
[ ] Test once NOW: ping 8.8.8.8 works
[ ] arp -d *        (flush cache so ARP happens LIVE during class)
[ ] ipconfig /all   (note YOUR gateway + DNS server values on paper)
[ ] Deck open at slide "Master timeline" as your map
[ ] Backup ready: deck's evidence slides are your canned capture
```

**Golden rule:** if a demo dies, you lose NOTHING -- say *"let's look at the capture we saved earlier"* and switch to the deck slide. Students never know.

---

## DEMO A -- Baseline: who am I? (5 min)

**DO:**
```text
ipconfig /all
arp -a
```

**YOU WILL SEE:** IPv4, mask, gateway, DNS servers; then MAC table.

**SAY THIS:**
> "Before any magic: this machine already knows three numbers. Its own IP -- given by DHCP. Its gateway -- the exit door. Its DNS server -- the phone book. Watch how every single packet today uses these."

Point at the screen: **"This IPv4 is our sender all session. This gateway IP is who ARP will hunt for."**

**IF FAILS:** impossible. This always works. Slow down and read values aloud.

---

## DEMO B -- DNS recap (2 min, quick)

**DO:**
```text
nslookup example.com
```
Wireshark filter: `dns`

**YOU WILL SEE:** UDP 53 -> answer with A record.

**SAY THIS:**
> "One UDP datagram out, one back. No handshake -- DNS trusts the network. That was Day 1-2. Today we go DEEPER than this."

---

## DEMO C -- ARP: finding the gateway (5 min)

**SETUP:** you flushed ARP pre-class (`arp -d *`). If not: `arp -d *` now.

**DO:**
```text
ping 192.168.1.1      <- YOUR gateway from Demo A
```
Wireshark filter: `arp`

**YOU WILL SEE:**
```text
Who has 192.168.1.1? Tell 192.168.1.10     <- broadcast ff:ff:ff:ff:ff:ff
192.168.1.1 is at a4:2b:b0:d9:44:e1        <- unicast reply
```
Then run `arp -a` again -- entry now exists.

**SAY THIS:**
> "The laptop SHOUTS to everyone on the segment: who owns this IP? Only the gateway answers. Now watch -- every internet-bound frame from now on is addressed to THAT MAC, never to the website's MAC. Websites have no MACs here. Only your gateway does."

**IF FAILS:** no ARP visible = cache wasn't flushed or ping answered from cache. Run `arp -d *`, ping again. Still nothing? Say "already resolved" and show `arp -a` output instead.

---

## DEMO D -- TCP handshake + plaintext login (10 min) ★ MAIN EVENT

**SETUP:** Wireshark filter box EMPTY. Capture running.

**DO:**
1. In browser visit: `http://testphp.vulnweb.com/login.php` (public practice site, plain HTTP, has a login form)
2. Type test credentials: user `demo@example.com` password `pass123`
3. Click login.
4. Wireshark filter: `tcp.flags.syn == 1` -- shows ONLY SYN and SYN-ACK rows

**YOU WILL SEE:**
```text
SYN       Seq=0 Win=64240
SYN, ACK  Seq=0 Ack=1
(filter hides the final ACK -- mention it exists)
```

5. Clear filter. Find the POST row (filter `http`).
6. Right-click it -> **Follow -> TCP Stream**. Red = client, blue = server.

**YOU WILL SEE in the stream:**
```text
POST /login.php HTTP/1.1
... uname=demo%40example.com&pass=pass123
```

**SAY THIS (the money moment):**
> "There is the password. Not hacked. Not stolen. Just UNENCRYPTED. Three packets shook hands, and everything after traveled in readable text. THIS is why HTTPS exists -- same TCP, but the payload becomes noise."

Then: **"Now find the flags."** Click the SYN packet, expand *Transmission Control Protocol*, read aloud: Source Port, Destination Port 80, Sequence 0, Flags SYN. Point at Window size.

**IF FAILS:**
- Site down/slow -> use `http://neverssl.com` (GET instead of POST; still shows handshake + readable HTML)
- Nothing appears -> wrong interface (check moving counter), or browser used cached page (Ctrl+F5)
- HTTPS took over -> check URL bar says http:// not https://

---

## DEMO E -- Ports are real: netstat (4 min)

**DO:** while the page is still relevant:
```text
netstat -ano | findstr :80
```

**YOU WILL SEE:** lines like `TCP 192.168.1.10:51522 93.184.216.34:80 ESTABLISHED`

**SAY THIS:**
> "Match it. Same source port you saw in Wireshark. Same destination. Your laptop runs THOUSANDS of conversations; ports are how one cable carries them all without mixing. IP finds the house, port finds the person inside."

---

## DEMO F -- ICMP + TTL: routing made visible (6 min)

**DO:**
```text
ping 8.8.8.8          (capture filter: icmp)
tracert 8.8.8.8       (fresh capture, filter: icmp)
```

**YOU WILL SEE:**
- Echo request/reply pairs (type 8 / type 0)
- During tracert: type 11 "Time exceeded" from routers 1,2,3...

**SAY THIS:**
> "Ping = ICMP type 8 asking 'are you alive', type 0 answering. Tracert is sneakier: it sends packets with TTL=1,2,3... Each router that kills a packet confesses itself in an ICMP type 11. You are literally watching TTL count down hop by hop."
>
> Expand the IP header on any row: **"TTL started at 128 -- Windows default. Linux machines start at 64. That's a fingerprint."**

**IF FAILS:** some networks block ICMP. Fall back to tracert to your gateway only (always works): `tracert 192.168.1.1`.

---

## DEMO G -- Full trace narration (10 min) ★ THE PAYOFF

**SETUP:** clear ALL filters. Scroll to top of capture. Ctrl+K mark, or just remember the row number where you start.

**DO:** browse ONE site once (neverssl.com). Stop. Now narrate top-to-bottom WITHOUT touching anything:

**SAY THIS (pointing line by line):**
> "Row by row, the whole story:
> 1-2. **DNS** -- got the number. *(Day 2)*
> 3-4. **ARP** -- found the gateway's MAC. *(today)*
> 5-7. **TCP handshake** -- SYN, SYN-ACK, ACK. Conversation opened. *(today)*
> 8. **HTTP GET** -- the request, wrapped: data->segment->packet->frame.
> 9+. **TCP ACKs + HTTP response** -- the page comes home in segments.
> Every row you can now name its PDU: segment, packet, or frame."

**Close with:**
> "Yesterday I showed you tools. Today you can READ traffic. Pick any row -- tell me the layer, the PDU, and one header field. Go."

*(Let THEM classify 3-4 rows. That's your assessment moment.)*

---

## Student question bank (answers ready, no freezing)

| They ask | You answer |
|----------|------------|
| Why so much TLS/UDP junk in my capture? | Background apps: telemetry, updates, sync. Real analysts filter first, read second. |
| Is reading passwords legal? | Only on systems you OWN or explicit lab targets like vulnweb.com. Doing this elsewhere is a crime -- that's exactly why HTTPS everywhere matters. |
| Why TTL 128 vs 64? | OS defaults: Windows 128, Linux/macOS 64. Free fingerprinting trick. |
| Can two apps share port 80? | Server-side yes (different client IPs). Client-side each connection gets a unique ephemeral port (49152-65535). |
| What if a packet is lost? | No ACK arrives before timeout -> TCP retransmits. Filter: `tcp.analysis.retransmission`. UDP just shrugs. |
| Why does Wireshark show Seq=0 when real numbers are huge? | Relative sequence numbers -- Wireshark subtracts the ISN for readability. Disable in preferences to see raw. |
| Where did the MAC go after the gateway? | Rewritten EVERY hop. IP stays end-to-end; MAC lives one segment only. |
| Can Wireshark see my friend's phone traffic? | Only broadcast/your-segment frames, and modern Wi-Fi encrypts per-station. Switches don't gossip. |

---

## Timing map (84 min)

```text
0-05   Deck intro + PDU roadmap + headers overview
05-35  TRANSPORT section      (Demo D inside: ~10 min)
35-60  INTERNET section       (Demo F inside: ~6 min)
60-75  NETWORK ACCESS section (Demo C inside: ~5 min)
75-84  Capstone + Master timeline + DEMO G narration + drill
```

Demos B and E are flex-fillers if a section runs short.

---

## Rehearsal routine (30 min alone before class -- non-negotiable)

1. **Run every demo once, silently** (10 min) -- muscle memory for clicks
2. **Narrate out loud, once per layer** (10 min) -- hear yourself say the lines; awkward ones get rewritten in your words
3. **Break something on purpose**: wrong interface, bad filter, dead site -- recover using the IF FAILS boxes (5 min)
4. **Screenshot your best captures** (5 min) -- paste into the deck's two "(live-capture screenshot slot)" placeholders in the PPTX

After rehearsal, you will not stall. You will be the one pointing at fields before students even ask.
