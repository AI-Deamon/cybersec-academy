# Week 1 — Combined Take-Home Assessment
## "Network Detective Challenge + Home Lab Security Audit"

**Due:** End of Week 1 (before Day 5 test)
**Time estimate:** 5–7 hours across the weekend (Saturday + Sunday)
**What you need:** Your own laptop/PC, Wireshark (free), internet connection, this document

> **Note:** This assessment combines two Week-1 take-home assignments — the **Network Detective Challenge** (capture/analyze traffic, subnetting, and cross-day synthesis) and the **Home Lab Security Audit** (audit your own machine and home network). Do **all parts**. They build on each other: you capture traffic, then turn the same investigative lens on your own environment.

---

## The Big Picture

Over the past 4 days you learned:
- **Day 1:** What cybersecurity is — CIA Triad, AAA, threats vs vulnerabilities vs risks
- **Day 2:** Networking basics — OSI model, TCP/IP, IP addressing, ports, protocols
- **Day 3:** Common protocols — HTTP/HTTPS, FTP/SFTP, SSH, SMTP, DNS, ICMP + subnetting
- **Day 4:** Linux & Windows security — permissions, users, hardening, event logs

Now it is time to **combine all of that into one real-world mini-project**. The first half is about **capturing and analyzing** traffic; the second half is about **understanding your own environment** — the machine you use every day. A security professional who does not understand their own system cannot protect anyone else's.

This assessment has **7 parts plus a bonus**. Do them in order — each one makes the next feel more real.

---

## Part 1 — Capture & Analyze HTTP Traffic (Day 2 + Day 3 skills)

### What to do

1. **Install Wireshark** (if not already): https://www.wireshark.org/download.html
2. **Open Wireshark** and start capturing on your active network interface (Wi-Fi or Ethernet).
3. **While capturing**, open a browser and visit **3 different websites**:
   - One that uses **HTTP** (try `http://neverssl.com` — it deliberately uses HTTP)
   - One that uses **HTTPS** (try `https://www.google.com`)
   - One of your choice (any site you normally use)
4. **Stop the capture** after about 60 seconds of browsing.
5. **Apply the display filter** `http` in Wireshark — this shows only HTTP traffic.
6. **Also try** the filter `dns` to see DNS queries.
7. **Also try** the filter `tcp.port == 443` to see HTTPS traffic.

### What to write about (answer in your own words)

For each of the 3 websites, answer:

| Question | Your answer |
|----------|------------|
| What website did you visit? | |
| HTTP or HTTPS? How can you tell from the capture? | |
| What IP address did your computer connect to? | |
| What was the destination port? (80 or 443?) | |
| For HTTP sites: what information is visible in the packet? (URL path, headers, any credentials?) | |
| For HTTPS sites: what information is visible vs hidden? | |
| What DNS queries did you see before the connection? | |

### Key concepts to connect

- **CIA Triad:** When you visited the HTTP site, which part of CIA was violated? (Hint: no encryption = no **Confidentiality**)
- **AAA:** If the HTTP site had a login page, which AAA function would be exposed? (Hint: **Authentication** credentials in clear text)
- **Subnetting:** You'll pin down your own network's IP range and subnet mask in **Part 2** and practise splitting networks in **Part 5** — keep those results handy, they connect back to what you saw on the wire here.

### Where to get help / sources

- Wireshark official docs: https://www.wireshark.org/docs/
- Wireshark 101 tutorial: https://www.youtube.com/watch?v=TkCSr30UojM
- How to filter HTTP traffic: In Wireshark, type `http` in the display filter bar
- Understanding HTTP vs HTTPS in Wireshark: https://www.wireshark.org/docs/wsug_html_chunked/ChWorkDisplayFilterSection.html

---

## Part 2 — Your Machine's Network Identity (30 min)

### Step 1: Gather your network information

**On Windows:** Open Command Prompt and run:
```
ipconfig /all
```
**On Linux/Mac:** Open Terminal and run:
```
ifconfig
```
or
```
ip a
```

### Step 2: Record the following

| Item | Your value |
|------|-----------|
| Your computer's hostname | |
| Your IPv4 address | |
| Your subnet mask | |
| Your default gateway (router IP) | |
| Your DNS server(s) | |
| Your MAC address | |
| Are you on Wi-Fi or Ethernet? | |

### Step 3: Answer these questions

1. **What is your network's IP range?** (Hint: if you are `192.168.1.105/24`, your range is `192.168.1.0 – 192.168.1.255`)
2. **How many devices could potentially be on your network?** (Hint: how many usable host addresses in your subnet?)
3. **Is your DNS server your router or an external service?** (Example: `8.8.8.8` is Google, `192.168.1.1` is your router)
4. **Why does the MAC address matter?** (Hint: it is a Layer 2 identifier — it is visible even before IP communication)

---

## Part 3 — What Is Listening on Your Machine? (30 min)

### Step 1: Check open ports

**On Windows:**
```
netstat -an
```
**On Linux/Mac:**
```
ss -tlnp
```

### Step 2: Record what you find

| Local Address | Port | State | What service do you think this is? |
|--------------|------|-------|----------------------------------|
| 0.0.0.0 | | LISTENING | |
| 0.0.0.0 | | LISTENING | |
| 127.0.0.1 | | LISTENING | |
| | | | (add more rows as needed) |

### Step 3: Answer these questions

1. **How many ports are in LISTENING state?**
2. **Are any of these ports from the "Common Ports" list in your cheat sheet?** (Port 22, 80, 443, 3389, etc.)
3. **Is port 3389 (RDP) open?** If yes, what does that mean for security?
4. **Is port 23 (Telnet) open?** If yes, why is that a problem?
5. **What is the difference between `0.0.0.0:PORT` and `127.0.0.1:PORT`?** (Hint: which one is accessible from the network vs only from your own machine?)

### Step 4: Check running processes

**On Windows:**
```
tasklist
```
**On Linux/Mac:**
```
ps aux
```

List the **top 10 processes** you see. Identify any you do not recognize. (Google them — are they legitimate or suspicious?)

---

## Part 4 — Scan Your Home Network (30 min)

### Step 1: Find your network range

From Part 2, you know your IP and subnet mask. Calculate your network range.

Example: If your IP is `192.168.1.105` and subnet mask is `255.255.255.0`:
- Network: `192.168.1.0/24`
- Range: `192.168.1.1` to `192.168.1.254`

### Step 2: Ping sweep your network

**On Windows (PowerShell):**
```powershell
1..254 | ForEach-Object { ping -n 1 -w 100 192.168.1.$_ | Select-String "Reply from" }
```
**On Linux/Mac (Terminal):**
```bash
for i in {1..254}; do ping -c 1 -W 1 192.168.1.$i | grep "bytes from"; done
```

> **Note:** Replace `192.168.1` with YOUR network prefix. This scan is safe — ping only checks if a host responds.

### Step 3: Record what you find

| IP Address | Responds to ping? | Device type (if you know) |
|-----------|-----------------|--------------------------|
| 192.168.1.1 | Yes | Router/Gateway |
| | | |
| | | |
| | | | (add rows for all devices you find)

### Step 4: Answer these questions

1. **How many devices responded to your ping sweep?**
2. **Did you find any devices you did not expect?** (A smart TV? A printer? A roommate's phone?)
3. **If an attacker got onto your Wi-Fi, how many devices could they potentially reach?** (This is why subnetting/segmentation matters — Day 3)
4. **What is the security risk of having all devices on one flat network?**

---

## Part 5 — Subnetting Practice (Day 3 skills)

### What to do

Using what you learned about subnetting in Day 3, solve these problems. **Show your working.**

#### Problem 1
Your home router gives you the network `192.168.1.0/24`.

- How many total host addresses are available in this network?
- If you split it into **4 equal subnets**, what is the new subnet mask in CIDR notation?
- What are the network addresses of all 4 subnets?
- What is the broadcast address of the **third** subnet?
- How many usable hosts per subnet after splitting?

#### Problem 2
You are a network admin for a small office. You have these departments:
- Sales: needs 30 hosts
- Engineering: needs 50 hosts
- HR: needs 10 hosts
- Servers: needs 10 hosts

You are given the network `10.0.0.0/24`.

- Design a subnetting scheme that gives each department enough addresses.
- For each department, write: network address, subnet mask (CIDR), usable host range, broadcast address.
- Which department gets the largest subnet? Why?

#### Problem 3 — Connect to Security
- **Why would a security team want to put the Servers department on a different subnet from Sales?** (Answer using CIA + AAA concepts)
- **If an attacker compromises a Sales PC, can they directly access a Server on a different subnet?** Explain why or why not.
- **What device controls traffic between subnets?** (Hint: think about Day 2 — routers/firewalls)

### Where to get help / sources

- Subnetting practice: https://www.subnettingpractice.com/
- CIDR cheat sheet: https://www.aelius.com/njh/cidr.html
- Video explanation: https://www.youtube.com/watch?v=Jyk2BjsAZb8

---

## Part 6 — Your Home Network Security Assessment (30 min)

Write a **mini security assessment** of your own home network. Use everything you learned this week — including your findings from Parts 1–5. Write in your own words. Minimum 300 words.

### Structure your assessment like this:

#### 1. Network Overview
- What is your network range?
- How many devices are connected?
- What type of devices? (laptops, phones, IoT, etc.)

#### 2. Open Ports & Services
- What ports are open on your machine?
- Which services are running?
- Are any of these unnecessary or risky?

#### 3. Protocol Security
- What protocols does your home network use? (HTTP, HTTPS, DNS, etc.)
- Are there any unencrypted protocols in use?
- What would an attacker on your Wi-Fi see?

#### 4. CIA Triad Analysis
- **Confidentiality:** What data on your network is sensitive? How is it protected (or not)?
- **Integrity:** How do you know files have not been tampered with?
- **Availability:** What happens if your router goes down? Do you have backups?

#### 5. AAA Framework Analysis
- **Authentication:** How do devices authenticate to your Wi-Fi? (WPA2? WPA3? Open?)
- **Authorization:** Who is allowed to access what on your network?
- **Accounting:** Are there logs of who connected to your network? Where?

#### 6. Recommendations
List **5 specific improvements** you could make to your home network security. Be practical.

| # | Improvement | Why it matters | How to do it |
|---|------------|----------------|-------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

---

## Part 7 — Connect Everything: CIA + AAA Across All 4 Days (Day 1 + Day 2 + Day 3 + Day 4)

This is the thinking part. Write short paragraphs (3–5 sentences each). No copy-paste — use your own words.

### Question 1 — CIA Triad in Action

Pick **one** of the protocols you studied (HTTP, FTP, SMTP, DNS, SSH, or ICMP). For that protocol:

- How does it **support** one part of the CIA Triad?
- How does it **fail** to protect one part of the CIA Triad?
- What would a security professional do to fix that weakness?

### Question 2 — AAA Framework in Action

Think about logging into a website (like Gmail or any site you use).

- **Authentication:** How does the site verify you are who you say you are?
- **Authorization:** After you log in, what are you allowed to do? What are you NOT allowed to do?
- **Accounting:** What records might the site keep about your login? Why?

Now answer: **What happens if an attacker captures your HTTP traffic from Part 1?** Which part of AAA breaks first? Why?

### Question 3 — The Full Attack Story

Imagine this scenario:

> An employee at a company uses an **unencrypted HTTP** connection to log into the internal HR portal from a coffee shop. The company's network is poorly segmented — all departments are on the same subnet `192.168.1.0/24`.

Using **everything** you learned this week, write a short attack story:

1. **What can the attacker on the coffee shop Wi-Fi see?** (Day 3 — HTTP, packet capture)
2. **What can the attacker do with those credentials?** (Day 1 — Authentication broken, CIA violated)
3. **Once inside the company network, what can the attacker reach?** (Day 3 — subnetting, no segmentation)
4. **How could the company have prevented this?** (Day 4 — hardening, Day 3 — segmentation, Day 1 — controls)

### Question 4 — Linux/Windows Connection

- On Day 4 you learned about file permissions (Linux) and Event Viewer (Windows).
- **How does the principle of least privilege** (Day 4) **connect to the AAA Authorization function** (Day 1)?
- **If an attacker gets a shell on a Linux machine, what permission-related files would they look for?** (Think: users, passwords, sudo access)
- **On Windows, where would you look in Event Viewer to spot a brute-force login attempt?**

---

## Bonus — Protocol Journal (optional, +10 bonus points)

For **one full day**, keep a protocol journal. Every time you use the internet, write down:

| Time | What I did | Protocol used | Port | Encrypted? | What would an attacker see? |
|------|-----------|--------------|------|-----------|---------------------------|
| 09:00 | Checked email | IMAP | 993 | ✅ | Nothing — encrypted |
| 09:15 | Visited news site | HTTPS | 443 | ✅ | Only domain via DNS |
| 09:30 | Logged into forum | HTTP | 80 | ❌ | Username + password! |

Fill in at least **10 entries**. This exercise teaches you to think like a security analyst in your daily life.

---

## How to Submit

Create a **single document** (text file, markdown, or PDF) with:

1. **Part 1:** Your traffic analysis table + answers + at least **2 screenshots** from Wireshark (one showing HTTP, one showing HTTPS)
2. **Part 2:** Your network information table + answers
3. **Part 3:** Your port scan table + answers + process list
4. **Part 4:** Your ping sweep results + answers
5. **Part 5:** All subnetting answers with working shown
6. **Part 6:** Your written security assessment (300+ words)
7. **Part 7:** All 4 written answers in your own words
8. **Bonus:** Your protocol journal (10+ entries)

Name it: `Week1_Combined_Assessment_YourName.md` (or .txt or .pdf)

---

## Combined Grading Rubric (self-grade before submitting)

| Criteria | Points | Your score |
|----------|--------|------------|
| Part 1: Traffic captured and analyzed correctly | /25 | |
| Part 1: CIA + AAA connections made | /10 | |
| Part 2: Network identity recorded correctly | /15 | |
| Part 2: Subnetting questions answered | /10 | |
| Part 3: Port scan completed and analyzed | /15 | |
| Part 3: Process identification | /5 | |
| Part 4: Ping sweep completed | /10 | |
| Part 4: Security reasoning about flat networks | /10 | |
| Part 5: Subnetting calculations correct | /25 | |
| Part 5: Security reasoning about subnets | /10 | |
| Part 6: Written assessment quality (300+ words) | /20 | |
| Part 6: CIA + AAA connections accurate | /10 | |
| Part 6: 5 practical recommendations | /5 | |
| Part 7: Own words, no copy-paste | /15 | |
| Part 7: Connections across all 4 days are accurate | /15 | |
| **Bonus:** Protocol journal (10+ entries) | **+10** | |
| **Total** | **/200 (+10 bonus)** | |

---

## Tips for Doing This Well

- **Do Part 1 first.** It is the most hands-on and will make the theory in the later parts feel real.
- **Do the home-lab parts (2–4, 6) on your HOME network**, not a public Wi-Fi. You are auditing your own environment.
- **Take screenshots** of your Wireshark capture, `ipconfig`, `netstat`, and ping sweep output. In cybersecurity, evidence matters — show what you captured.
- **Use your notes from all 4 days.** This assessment is designed to make you go back and review everything.
- **If you get stuck on subnetting,** re-read the Day 3 notes. The `192.168.1.0/24` example is your starting point.
- **Be honest** in your assessment. If your Wi-Fi has no password, write that down. That IS the finding. The best security assessments are the ones that make you uncomfortable.
- **Write like you are explaining to a friend.** If you cannot explain it simply, you do not understand it yet — go back to the notes.

---

## Sources and Where to Find Answers

| What you need | Where to look |
|--------------|---------------|
| CIA Triad + AAA definitions | Day 1 notes, `00_OVERVIEW/COURSE_SYLLABUS.md` |
| OSI Model layers | Day 2 PDF/PPTX in `day_02_networking_basics/`, cheat sheet Section 5 |
| `ipconfig` / `ifconfig` help | Day 2 notes, cheat sheet Section 1 |
| `netstat` / `ss` help | Cheat sheet Section 1 + 2 |
| Port numbers reference | Cheat sheet Section 5 |
| Protocol details (HTTP, HTTPS, DNS, SSH, etc.) | Day 3 notes (`Day3_Common_Protocols.md`) |
| Subnetting explanation | Day 3 notes, section "Subnetting – The Foundation of Network Security", cheat sheet Section 5 |
| Ping sweep commands | This assessment, Part 4 |
| Linux/Windows security | Day 4 PDF/PPTX in `day_04_linux_windows/` |
| Wireshark how-to | https://www.wireshark.org/docs/ |
| Course resources | `08_RESOURCES/COURSE_RESOURCES_BY_WEEK.md` |
