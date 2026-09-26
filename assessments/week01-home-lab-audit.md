# Week 1 — Assignment 2: "Build Your Home Lab & Security Audit"

**Due:** Alongside the Weekend Assignment  
**Time estimate:** 2–3 hours  
**What you need:** Your own laptop/PC, this document, internet

---

## Why This Assignment Exists

The first assignment was about **capturing and analyzing** traffic. This one is about **understanding your own environment** — the machine you use every day. A security professional who does not understand their own system cannot protect anyone else's.

You will:
1. Audit your own computer's network configuration
2. Check what is running and listening on your machine
3. Analyze your own network topology
4. Write a mini security assessment of your home network

---

## Task 1 — Your Machine's Network Identity (30 min)

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

## Task 2 — What Is Listening on Your Machine? (30 min)

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

## Task 3 — Scan Your Home Network (30 min)

### Step 1: Find your network range

From Task 1, you know your IP and subnet mask. Calculate your network range.

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

## Task 4 — Your Home Network Security Assessment (30 min)

Write a **mini security assessment** of your own home network. Use everything you learned this week. Write in your own words. Minimum 300 words.

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

## Task 5 — Bonus: Protocol Journal (optional, +10 bonus points)

For **one full day**, keep a protocol journal. Every time you use the internet, write down:

| Time | What I did | Protocol used | Port | Encrypted? | What would an attacker see? |
|------|-----------|--------------|------|-----------|---------------------------|
| 09:00 | Checked email | IMAP | 993 | ✅ | Nothing — encrypted |
| 09:15 | Visited news site | HTTPS | 443 | ✅ | Only domain via DNS |
| 09:30 | Logged into forum | HTTP | 80 | ❌ | Username + password! |

Fill in at least **10 entries**. This exercise teaches you to think like a security analyst in your daily life.

---

## How to Submit

Create a document with:
1. **Task 1:** Your network information table + answers
2. **Task 2:** Your port scan table + answers + process list
3. **Task 3:** Your ping sweep results + answers
4. **Task 4:** Your written security assessment (300+ words)
5. **Task 5 (bonus):** Your protocol journal (10+ entries)

Name it: `Week1_HomeLab_Audit_YourName.md` (or .txt or .pdf)

---

## Grading Rubric

| Criteria | Points | Your score |
|----------|--------|------------|
| Task 1: Network identity recorded correctly | /15 | |
| Task 1: Subnetting questions answered | /10 | |
| Task 2: Port scan completed and analyzed | /15 | |
| Task 2: Process identification | /5 | |
| Task 3: Ping sweep completed | /10 | |
| Task 3: Security reasoning about flat networks | /10 | |
| Task 4: Written assessment quality (300+ words) | /20 | |
| Task 4: CIA + AAA connections accurate | /10 | |
| Task 4: 5 practical recommendations | /5 | |
| **Bonus:** Protocol journal (10+ entries) | **+10** | |
| **Total** | **/100 (+10 bonus)** | |

---

## Sources to Use

| What you need | Where to look |
|--------------|---------------|
| `ipconfig` / `ifconfig` help | Day 2 notes, cheat sheet Section 1 |
| `netstat` / `ss` help | Cheat sheet Section 1 + 2 |
| Port numbers reference | Cheat sheet Section 5 |
| CIA + AAA definitions | Day 1 notes |
| Subnetting help | Day 3 notes, cheat sheet Section 5 |
| Ping sweep commands | This assignment, Task 3 |
| OSI model | Cheat sheet Section 5 |

---

## Tips

- **Do this assignment on your HOME network**, not a public Wi-Fi. You are auditing your own environment.
- **Take screenshots** of your `ipconfig`, `netstat`, and ping sweep output. Include them as evidence.
- **Be honest** in your assessment. If your Wi-Fi has no password, write that down. That IS the finding.
- **The best security assessments are the ones that make you uncomfortable.** If you find something risky, that means you learned something.
