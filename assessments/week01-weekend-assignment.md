# Week 1 Weekend Assignment — "Network Detective Challenge"

**Due:** End of Week 1 (before Day 5 test)  
**Time estimate:** 3–4 hours across Saturday + Sunday  
**What you need:** Your own laptop/PC, Wireshark (free), internet connection, this document

---

## The Big Picture

Over the past 4 days you learned:
- **Day 1:** What cybersecurity is — CIA Triad, AAA, threats vs vulnerabilities vs risks
- **Day 2:** Networking basics — OSI model, TCP/IP, IP addressing, ports, protocols
- **Day 3:** Common protocols — HTTP/HTTPS, FTP/SFTP, SSH, SMTP, DNS, ICMP + subnetting
- **Day 4:** Linux & Windows security — permissions, users, hardening, event logs

Now it is time to **combine all of that into one real-world mini-project.**

This assignment has **3 parts**. Do all 3. They build on each other.

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
- **Subnetting:** What is the IP range of your home network? (Check with `ipconfig` on Windows or `ifconfig` on Linux) What subnet mask are you using?

### Where to get help / sources

- Wireshark official docs: https://www.wireshark.org/docs/
- Wireshark 101 tutorial: https://www.youtube.com/watch?v=TkCSr30UojM
- How to filter HTTP traffic: In Wireshark, type `http` in the display filter bar
- Understanding HTTP vs HTTPS in Wireshark: https://www.wireshark.org/docs/wsug_html_chunked/ChWorkDisplayFilterSection.html

---

## Part 2 — Subnetting Practice (Day 3 skills)

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

## Part 3 — Connect Everything: CIA + AAA Across All 4 Days (Day 1 + Day 2 + Day 3 + Day 4)

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

## How to Submit

Create a single document (text file, markdown, or PDF) with:

1. **Part 1:** Your traffic analysis table + answers + at least **2 screenshots** from Wireshark (one showing HTTP, one showing HTTPS)
2. **Part 2:** All subnetting answers with working shown
3. **Part 3:** All 4 written answers in your own words

Name it: `Week1_Weekend_Assignment_YourName.md` (or .txt or .pdf)

---

## Grading Rubric (self-grade before submitting)

| Criteria | Points | Your score |
|----------|--------|------------|
| Part 1: Traffic captured and analyzed correctly | /25 | |
| Part 1: CIA + AAA connections made | /10 | |
| Part 2: Subnetting calculations correct | /25 | |
| Part 2: Security reasoning about subnets | /10 | |
| Part 3: Own words, no copy-paste | /15 | |
| Part 3: Connections across all 4 days are accurate | /15 | |
| **Total** | **/100** | |

---

## Tips for Doing This Well

- **Do Part 1 first.** It is the most hands-on and will make the theory in Parts 2 and 3 feel real.
- **Use your notes from all 4 days.** This assignment is designed to make you go back and review everything.
- **If you get stuck on subnetting,** re-read the Day 3 notes. The `192.168.1.0/24` example is your starting point.
- **Screenshots matter.** In cybersecurity, evidence matters. Show what you captured.
- **Write like you are explaining to a friend.** If you cannot explain it simply, you do not understand it yet — go back to the notes.

---

## Sources and Where to Find Answers

| What you need | Where to look |
|--------------|---------------|
| CIA Triad definitions | Day 1 notes, `00_OVERVIEW/COURSE_SYLLABUS.md` |
| OSI Model layers | Day 2 PDF/PPTX in `day_02_networking_basics/` |
| Protocol details (HTTP, HTTPS, DNS, SSH, etc.) | Day 3 notes (`Day3_Common_Protocols.md`) |
| Subnetting explanation | Day 3 notes, section "Subnetting – The Foundation of Network Security" |
| Linux/Windows security | Day 4 PDF/PPTX in `day_04_linux_windows/` |
| Wireshark how-to | https://www.wireshark.org/docs/ |
| Course resources | `08_RESOURCES/COURSE_RESOURCES_BY_WEEK.md` |
