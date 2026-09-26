# Wireshark Capture Guide
**Step-by-step capture instructions for the networking block**

> This guide is your click-by-click reference for each Wireshark demo.
> Follow these steps during class. Students see your screen; you narrate.

---

## Setup (before Day 2)

### Install Wireshark
- Download from https://www.wireshark.org/download.html
- Install with default options (include Npcap for Windows)
- On macOS: install from DMG, grant permissions in System Preferences > Security
- On Linux: `sudo apt install wireshark` then `sudo usermod -aG wireshark $USER` (log out/in)

### Verify it works
1. Open Wireshark
2. You should see a list of network interfaces (Wi-Fi, Ethernet, Loopback)
3. Click on your active interface (Wi-Fi icon usually shows activity)
4. Click the blue shark fin to start capture
5. Open a browser, visit any site
6. You should see packets flowing
7. Stop capture (red square)

If you see packets, you're ready.

---

## Day 2 Demo: DNS Capture

### Goal
Show students what a DNS query looks like as a network packet.

### Steps
1. Open Wireshark
2. Click on your **Wi-Fi** interface (the one with the activity graph)
3. Click the **blue shark fin** (Start capture)
4. **Immediately** go to the filter bar and type: `dns`
   - The screen will go blank -- that's normal. We're only showing DNS packets.
5. Open your browser
6. Type `http://neverssl.com` in the address bar and press Enter
7. You should see 1-2 DNS packets appear:
   - **Query**: "Standard query A neverssl.com"
   - **Response**: "Standard query response A 216.154.192.100"
8. Click the **red square** (Stop capture)

### What to point out
- **Source IP** = your machine's IP (from Day 1)
- **Destination IP** = your DNS server (from `ipconfig`)
- **Protocol** = UDP (DNS uses UDP by default)
- **Destination Port** = 53 (DNS port)
- **Info column** = the query name and the resolved IP

### Optional: show TTL
- Click on the DNS response packet
- Expand the "Domain Name System (response)" section in the packet details
- Look for "Time to live" -- that's the caching duration

### Common issues
- **No DNS packets appear**: Make sure you typed `dns` in the filter bar BEFORE navigating. If you navigated first, the DNS was already cached. Clear your DNS cache (`ipconfig /flushdns` on Windows) and try again.
- **Wrong interface**: If you see packets on Loopback but not Wi-Fi, you clicked the wrong interface. Stop, go back, and click Wi-Fi.

---

## Day 3 Demo: TCP Handshake

### Goal
Show the three-way handshake (SYN, SYN-ACK, ACK).

### Steps
1. Open Wireshark
2. Start capture on Wi-Fi
3. In the filter bar, type: `tcp.flags.syn==1`
   - This filters to only SYN packets (the start of handshakes)
4. Open browser, visit `http://neverssl.com`
5. You should see:
   - **SYN** -- your IP to 216.154.192.100:80 (Flags: Syn)
   - **SYN-ACK** -- 216.154.192.100:80 to your IP (Flags: Syn, Ack)
   - **ACK** -- your IP to 216.154.192.100:80 (Flags: Ack)
6. Stop capture

### What to point out
- Three packets, in order: SYN, SYN-ACK, ACK
- The **Flags** column shows which flag is set
- The **Seq** and **Ack** numbers increment (showing the handshake progression)
- This happens BEFORE any HTTP data flows

### Common issues
- **Multiple SYN packets**: Other devices on the network are also connecting to things. Focus on the ones to/from your IP and the target IP.
- **SYN but no SYN-ACK**: The server might be slow to respond. Wait a few seconds.

---

## Day 3 Demo: HTTP Request (plaintext)

### Goal
Show that HTTP requests are readable in plain text.

### Steps
1. Start a new capture (or remove the TCP filter)
2. Filter: `http`
3. Visit `http://neverssl.com`
4. You should see HTTP packets:
   - **GET / HTTP/1.1** -- your request
   - **HTTP/1.1 200 OK** -- server's response
5. **Right-click** on the GET packet
6. Select **Follow > TCP Stream**
7. A new window opens showing the full conversation in plain text

### What to point out
- The request shows: `GET / HTTP/1.1`, `Host: neverssl.com`, `User-Agent: ...`
- The response shows: `HTTP/1.1 200 OK`, followed by HTML content
- **Everything is readable** -- this is plaintext HTTP

### Common issues
- **No HTTP packets**: neverssl.com might have switched to HTTPS. Check the URL bar -- make sure it says `http://` not `https://`. If it's HTTPS, try `http://httpforever.com` instead.
- **HTTP/2 packets**: Some sites use HTTP/2. Filter with `http2` instead, or use `http or http2`.

---

## Day 3 Demo: HTTP POST (credentials in plaintext)

### Goal
Show that form submissions (like login) are readable over HTTP.

### Steps
1. Keep the capture running
2. Go to `http://neverssl.com` (or any HTTP site with a form)
3. If there's no form, you can submit a search or comment
4. Type fake credentials: username = `test`, password = `fakepassword123`
5. Submit the form
6. In Wireshark, filter: `http.request.method == "POST"`
7. You should see the POST packet
8. Right-click > Follow > TCP Stream
9. Look for: `username=test&password=fakepassword123`

### What to point out
- The form data is RIGHT THERE in plain text
- Anyone on the network can read it
- This is why HTTP login forms are dangerous

### Common issues
- **No form on neverssl.com**: Use any HTTP site with a search box or form. Or just demonstrate with the GET request -- the point is that HTTP is plaintext.
- **Form uses JavaScript**: Some forms submit via AJAX. The POST might not show as a traditional form submission. Filter with `http.request.method == "POST"` or just show the TCP stream.

---

## Day 3 Demo: TLS Handshake

### Goal
Show what HTTPS/TLS looks like on the wire (encrypted, but the handshake is visible).

### Steps
1. Start a new capture
2. Filter: `tls`
3. Visit `https://google.com`
4. You should see TLS packets:
   - **ClientHello** -- your browser proposes encryption methods
   - **ServerHello** -- server picks one and sends its certificate
   - **Certificate** -- server proves its identity
   - **Key Exchange** -- they agree on a shared secret
   - **Finished** -- encrypted channel established
5. After the handshake, all subsequent data is encrypted (you can't read it)

### What to point out
- The handshake is visible, but after "Finished," everything is encrypted
- You can see the **destination IP** (WHERE you're going) but not the content (WHAT you're sending)
- This is the difference between HTTP (readable) and HTTPS (encrypted)

### Common issues
- **No TLS packets**: Make sure you visited an HTTPS site. Try `https://google.com` or `https://github.com`.
- **TLS 1.3**: Newer connections use TLS 1.3, which has fewer visible packets. That's fine -- the point is that the content is encrypted.

---

## Day 4 Demo: tcpdump Basics

### Goal
Show that CLI packet capture works the same as Wireshark, just without the GUI.

### Steps
1. Open a terminal (WSL2 on Windows, or native terminal on Linux/Mac)
2. Run: `sudo tcpdump -i wlan0 -c 20`
   - On Windows WSL2: `sudo tcpdump -i eth0 -c 20` (WSL2 uses eth0, not wlan0)
   - On macOS: `sudo tcpdump -i en0 -c 20`
3. Open a browser, visit any site
4. After 20 packets, tcpdump stops
5. Show the output: each line is a packet with source, destination, protocol, flags

### What to point out
- Same data as Wireshark, just text format
- You can see: source IP, destination IP, protocol (TCP/UDP), port numbers
- `-c 20` = capture 20 packets then stop (prevents infinite capture)
- `-w capture.pcap` = save to a file you can open in Wireshark

### Useful tcpdump filters
```
sudo tcpdump -i wlan0 port 53          # Only DNS
sudo tcpdump -i wlan0 port 80          # Only HTTP
sudo tcpdump -i wlan0 port 443         # Only HTTPS
sudo tcpdump -i wlan0 host 8.8.8.8     # Only traffic to/from 8.8.8.8
sudo tcpdump -i wlan0 -A port 80       # Show ASCII content of HTTP packets
```

### Common issues
- **Permission denied**: Use `sudo` (tcpdump needs root access)
- **No wlan0 interface**: Run `ip link show` (Linux) or `ifconfig` (macOS) to find your interface name
- **WSL2 can't capture Wi-Fi**: WSL2 doesn't have direct access to the Wi-Fi adapter. Use `eth0` for WSL2 traffic, or run tcpdump on the Windows side (install Npcap + use Wireshark's tshark)

---

## Day 5 Demo: Full Connection Trace

### Goal
Capture an entire connection from start to finish and narrate each step.

### Steps
1. Open Wireshark
2. Start capture on Wi-Fi
3. **Clear all filters** (make sure the filter bar is empty)
4. Open browser
5. Type `http://neverssl.com` and press Enter
6. As packets appear, narrate:
   - "There's the DNS query..." (filter: `dns`)
   - "There's the TCP handshake..." (filter: `tcp.flags.syn==1`)
   - "There's the HTTP GET..." (filter: `http`)
   - "There's the server response..."
7. Stop capture
8. Apply each filter in sequence to show students the layers

### What to point out
- Every step we taught this week is visible
- The connection follows the 7-step page load from Day 4
- This is the "story made visible"

---

## Filter Quick Reference

| What you want | Filter |
|--------------|--------|
| DNS traffic | `dns` |
| TCP handshakes | `tcp.flags.syn==1` |
| HTTP requests | `http` |
| HTTP POST only | `http.request.method == "POST"` |
| TLS/HTTPS | `tls` |
| Port 53 (DNS) | `port 53` |
| Port 80 (HTTP) | `port 80` |
| Port 443 (HTTPS) | `port 443` |
| Traffic to one host | `host 8.8.8.8` |
| Traffic from your IP | `ip.src == 192.168.1.105` |
| Traffic to one IP | `ip.dst == 216.154.192.100` |
| Combine filters | `dns and ip.src == 192.168.1.105` |
| Exclude something | `not port 22` |

---

## Tips for Live Demos

1. **Pre-clear DNS cache before Day 2 demo**: Run `ipconfig /flushdns` (Windows) or `sudo systemd-resolve --flush-caches` (Linux) so DNS queries appear fresh.
2. **Use a dedicated browser window**: Close other tabs to reduce noise in the capture.
3. **Filter BEFORE navigating**: Apply the filter first, then visit the site. Otherwise the DNS query is cached and won't appear.
4. **Save your best captures**: After a clean demo, File > Save As > .pcapng. You can show these later if a live demo fails.
5. **Have a backup**: If Wireshark fails during class, show a saved .pcapng file instead. The learning is the same.
6. **Keep it focused**: Don't try to show everything. Each demo has ONE goal. Stick to it.
