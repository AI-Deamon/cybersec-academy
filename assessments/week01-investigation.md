# Week 1 Supplementary Assignment — "Know Your Machine, Know the Rules"
**Module 1 · supplementary take-home · due alongside the Portfolio Piece**
**Type:** Semi-guided (Week 1 of the 4-week difficulty progression)
**Standard:** Academy Design Document v1.3 — Weekly Portfolio Assignments (ADD §12)
**Companion to:** `week01-assignment.md` (the "Website Story" portfolio piece)

> This assignment complements the portfolio piece. It covers the full foundation of Week 1: the security concepts that frame everything (CIA, AAA, ethics, threat actors), the hardware and operating system inside your machine, and a live network investigation. Complete both assignments.

---

## Scenario

You have just been hired as a junior security analyst. On your first day, your manager says two things:

1. *"Before you touch anyone else's systems, I need to know you understand the rules. What does it mean to test ethically? What are you actually protecting?"*
2. *"Now show me you understand the machine you're working with. What's inside it? What's running on it? What is it doing on the network — and where could someone attack it?"*

Answer both questions. This assignment is your proof.

---

# PART A — FOUNDATIONS (concepts, ethics, and vocabulary)

*Complete Part A before moving to the hands-on tasks in Part B. These concepts frame everything you will do in this course.*

---

## Task 1 — What Are You Protecting? (CIA Triad + AAA)

Every security decision protects something. The **CIA Triad** defines what; **AAA** defines how.

### CIA Triad

| Pillar | Definition | Real-world example |
|--------|-----------|-------------------|
| **Confidentiality** | Keeping data secret from unauthorized people | A password database is encrypted so stolen files are useless |
| **Integrity** | Making sure data hasn't been tampered with | A bank transfer shows the amount you actually sent, not an attacker's modification |
| **Availability** | Making sure systems and data are accessible when needed | A hospital's patient records system stays online during a ransomware attack |

**Answer:** You visit `http://neverssl.com` and type a username and password. Which part of the CIA Triad is violated? Explain in 2–3 sentences.

### AAA Framework

| Function | Definition | Real-world example |
|----------|-----------|-------------------|
| **Authentication** | Proving you are who you claim to be | Logging in with a password, fingerprint, or security key |
| **Authorization** | Determining what an authenticated user is allowed to do | A student can view grades but cannot change them |
| **Accounting** | Recording what a user did and when | A server log shows who logged in, when, and from where |

**Answer:** On the HTTP site from the question above, an attacker captures your traffic. Which part of AAA breaks first — and why?

### Assets — What You Are Protecting

Security does not protect abstract "things." It protects specific categories of assets:

| Category | Examples | Why it matters |
|----------|----------|---------------|
| **People & Identities** | Employees, students, customers, accounts, credentials | Stolen credentials are the #1 attack vector |
| **Data & Devices** | Records, laptops, servers, phones, USB drives | Data is the target; devices are the containers |
| **Applications, Networks & Services** | Portals, email, payment systems, Wi-Fi, DNS | Each is an entry point an attacker can target |
| **Business Operations, Trust & Reputation** | Uptime, customer confidence, regulatory compliance | A breach costs more than just data — it costs trust |

**Answer:** Pick one asset from each category. For each, name one realistic way it could be attacked and one way to protect it.

---

## Task 2 — The Threat Landscape (Vocabulary + Threat Actors)

### Core Vocabulary

| Term | Definition | Example |
|------|-----------|---------|
| **Vulnerability** | A weakness that could be exploited | An unpatched web server, a weak password, an open port |
| **Threat Actor** | Someone capable of causing harm | A hacker, a disgruntled employee, a government agency |
| **Exploit** | A method that takes advantage of a vulnerability | A script that crashes a server by sending malformed input |
| **Incident** | Harm that actually or potentially occurs | Data leaked, system taken offline, credentials stolen |
| **Risk** | The likelihood and impact of a threat exploiting a vulnerability | High likelihood + high impact = critical risk |

**Answer:** For each of the following scenarios, identify the **vulnerability**, the **threat actor**, the **exploit**, and the **incident**:

1. A student guesses a teacher's password and reads exam answers.
2. A company's website goes down for 3 hours during a product launch.
3. An employee plugs in an infected USB drive and malware spreads to the file server.

### Threat Actors — Who Is Attacking?

| Actor | Motivation | Skill Level | Example |
|-------|-----------|-------------|---------|
| **Script Kiddies** | Curiosity, bragging rights | Low — uses tools others built | A teenager running a DDoS tool from a tutorial |
| **Hacktivists** | Social or political cause | Varies | Anonymous defacing a government website |
| **Insiders** | Malicious, negligent, or compromised | Varies — they already have access | An employee leaking customer data, clicking a phishing link |
| **Cybercriminal Groups** | Financial gain | High — organized, well-funded | Ransomware gangs encrypting hospital systems for payment |
| **State-Linked Actors** | Espionage, long-term access | Very high — government-backed | APT groups stealing defense contractor blueprints |

**Answer:** Which threat actor type do you think is the **most dangerous** to a typical company, and why? Which is the **hardest to defend against**? Explain in 3–4 sentences.

---

## Task 3 — Legal Ethics (The Rules of the Road)

Cybersecurity has strict rules. Breaking them — even "by accident" — can mean criminal charges. These four rules are non-negotiable:

### Rule 1: No Authorization, No Testing
Never access, scan, or test a system without **written permission** from the owner. "I didn't know" is not a legal defense.

### Rule 2: Stay in Scope
Only work within what was **explicitly authorized**. If you are authorized to test `example.com`, you do not touch `example.org`. If you are authorized to test the web app, you do not scan the database.

### Rule 3: Protect Privacy
Access to a system does not mean unrestricted use of data. If you see personal records during a test, you do not copy, share, or retain them. Treat every piece of data as if it were your own.

### Rule 4: Document Everything
Record every action you take and preserve evidence carefully. If something goes wrong, your documentation is your protection. If something goes right, it is your proof.

**Answer:** For each scenario, identify which rule is being broken and what the consequence could be:

1. A friend asks you to "just quickly check" if their company's Wi-Fi is secure. You run a port scan without asking their IT department.
2. During an authorized penetration test, you discover a database of customer credit cards. You save a copy "for reference."
3. You are authorized to test a web application, but you also probe the company's email server "just to see what's there."
4. You perform a security test but don't write anything down. Two weeks later, the company asks what you did.

---

# PART B — HANDS-ON INVESTIGATION (hardware, OS, network)

*Now that you understand the concepts and rules, investigate your own machine. Every task in Part B should reference the concepts from Part A where relevant.*

---

## Task 4 — Set Up Your Lab Environment (WSL2)

Before you can investigate a Linux environment, you need one. Set up **WSL2** (Windows Subsystem for Linux) on your machine.

### Step 1: Install WSL2

Open **PowerShell as Administrator** and run:

```powershell
wsl --install
```

Restart your PC when prompted. Ubuntu will finish installing automatically.

### Step 2: Verify the installation

Open **Ubuntu** from the Start menu. Create a username and password when asked.

Check it works:
```bash
wsl --list --verbose
```

You should see Ubuntu listed with `VERSION 2`.

### Step 3: Update the system

```bash
sudo apt update && sudo apt upgrade -y
```

### Step 4: Install useful tools

```bash
sudo apt install -y htop net-tools dnsutils curl wget
```

| Tool | What it does |
|------|-------------|
| `htop` | Interactive process viewer (better than `top`) |
| `net-tools` | Provides `ifconfig`, `netstat`, `arp` |
| `dnsutils` | Provides `nslookup`, `dig` |
| `curl` / `wget` | Command-line web requests |

**Checkpoint:** Run `uname -a` in your Ubuntu terminal. Screenshot the output — this proves your Linux environment is working.

---

## Task 5 — What's Inside Your Machine? (Hardware)

Every attack starts with hardware. Understand what you're protecting.

**What to do:** Investigate your own machine's hardware. Find the following:

| Component | What to find out | How to check |
|-----------|-----------------|--------------|
| **CPU** | Model name, number of cores, clock speed | Task Manager → Performance → CPU (Windows) · `lscpu` (WSL2/Linux) · About This Mac (macOS) |
| **RAM** | Total installed, how much is currently in use | Task Manager → Performance → Memory (Windows) · `free -h` (WSL2/Linux) · About This Mac (macOS) |
| **Storage** | Type (SSD or HDD), total capacity, free space | Task Manager → Performance → Disk (Windows) · `lsblk` + `df -h` (WSL2/Linux) · About This Mac → Storage (macOS) |
| **NIC** | Wi-Fi or Ethernet? MAC address? | `ipconfig /all` (Windows) · `ip a` (WSL2/Linux) · System Preferences → Network (macOS) |

**Answers:**

1. **Is your storage SSD or HDD?** Why does this matter for security? *(Hint: what happens to data when you delete a file — is it instantly gone?)*
2. **How much RAM is in use right now?** What's using most of it? List the top 3 memory consumers from your process viewer.
3. **Spectre and Meltdown** are CPU attacks that extract secrets by exploiting how CPUs speculatively execute instructions. What is the defense? *(Hint: think about updates.)*
4. **Cold boot attacks** freeze RAM to read encryption keys after a machine is powered off. What defense protects data even if RAM is physically accessed? *(Hint: think about disk encryption — BitLocker, LUKS.)*

---

## Task 6 — The Operating System in Action

The OS is the gatekeeper between hardware and applications. Observe it doing its job.

### Part A — Processes

Open your process viewer: **Task Manager** (Windows), `htop` (WSL2/Linux), or **Activity Monitor** (macOS).

- Find your **browser process**. What is its name? Its **PID**? How much **memory** is it using?
- How many total processes are running on your machine right now?
- Can you find a process you **don't recognize**? Write down its name. *(Google it — is it legitimate system software or something suspicious?)*

**Security connection:** **Process injection** hides malware inside a legitimate process. **Process hollowing** replaces a process's code with malicious code. Red flags include:
- `chrome.exe` spawning `cmd.exe`
- `word.exe` running `powershell.exe`
- An unknown process using 100% CPU

### Part B — Kernel vs User Mode

This is the most important concept for OS security.

- **Kernel Mode (Ring 0):** Full access to ALL hardware. The OS kernel runs here. Can execute ANY instruction.
- **User Mode (Rings 1-3):** Restricted access. Your applications run here. Must use **system calls** to ask the kernel for permission.

**Answer:** Your browser runs in User Mode. When it sends a network request or reads a file, it makes a system call to the kernel. Why is this boundary important for security? What would happen if a user-mode program could directly access all hardware?

### Part C — File Permissions

Permissions control who can read, modify, or execute files.

**In WSL2/Linux**, run:
```bash
ls -la ~
```

- What permissions do your files have? What do the `rwx` letters mean?
- What does `chmod 777` mean — and why is it dangerous?
- The principle of **least privilege** says a user should only have the minimum permissions needed. Find one file on your system with overly broad permissions.

**On Windows**, right-click a file → Properties → Security. Who has access? What does "Everyone: Full Control" mean?

**AAA connection:** File permissions are the **Authorization** part of AAA. They define what an authenticated user is allowed to do with specific files.

### Part D — Services and Ports

Services run in the background, waiting for network connections. Each listens on a specific port.

**In WSL2/Linux**, run:
```bash
ss -tlnp
```

**On Windows**, run:
```powershell
netstat -an | findstr LISTENING
```

Find at least **3 services** in LISTENING state:

| Service | Port number | What you think it does |
|---------|-------------|----------------------|
| | | |
| | | |
| | | |

Common ports to know:

| Port | Service | Risk if open |
|------|---------|-------------|
| 22 | SSH | Brute-force login attempts |
| 53 | DNS | DNS spoofing / redirection |
| 80 | HTTP | Unencrypted traffic, eavesdropping |
| 443 | HTTPS | Generally safe (encrypted) |
| 3389 | RDP | Remote brute-force, lateral movement |
| 3306 | MySQL | Database exposure to the network |

**Answer:** Open ports are **attack surface** — every listening port is a door an attacker could try. Did you find any ports that concern you? Why?

---

## Task 7 — Your Machine's Network Identity

Your machine has an identity on every network it joins. Find yours.

**What to do:** Use your OS's built-in tools to answer:

- What is your **IPv4 address** and **subnet mask**?
- What is your **default gateway** (the router)?
- Which **DNS server(s)** is your machine configured to use?
- What is your **MAC address**?

**Answer:** Why does the DNS server choice matter? If your ISP's DNS server is slow or untrustworthy, what could you do?

---

## Task 8 — Capture and Analyze Live Traffic

Capture real packets flowing between your machine and the internet, then read what they reveal.

**What to do:**

1. Open **Wireshark** and start capturing on your active network interface.
2. While capturing, visit two websites:
   - One using **HTTP** (try `http://neverssl.com`)
   - One using **HTTPS** (try `https://example.com`)
3. After 30–60 seconds, stop the capture.
4. Look for: **DNS** queries, **TCP handshake** (SYN → SYN-ACK → ACK), **HTTP** (port 80) content, **HTTPS** (port 443) encryption.

| Question | HTTP site | HTTPS site |
|----------|-----------|------------|
| Website visited | | |
| IP address connected to | | |
| Destination port (80 or 443?) | | |
| DNS queries before connection | | |
| Could you read the request content? What was visible? | | |
| What was hidden / encrypted? | | |

**CIA connection:** On the HTTP site, if you had typed a username and password, which part of the CIA Triad is violated? Why?

**AAA connection:** If the HTTP site had a login page, which AAA function would be exposed in the clear text?

---

# PART C — SYNTHESIS

---

## Task 9 — Security at Every Layer

For **each layer** of your machine, name **one realistic attack** and **one defense**:

| Layer | Attack | Defense |
|-------|--------|---------|
| **CPU** | | |
| **RAM** | | |
| **Storage** | | |
| **BIOS/UEFI** | | |
| **OS (Kernel)** | | |
| **Processes** | | |
| **Permissions** | | |
| **Services/Ports** | | |
| **Network** | | |

**Answer:** Which layer do you think is the **easiest to attack** on a typical home machine? Which is the **hardest to defend**? Explain in 2–3 sentences.

---

## Task 10 — The Full Picture

Connect everything you have learned and observed. In **5–7 sentences**, trace what happens from pressing the power button to loading a website — narrate it from what you **actually saw** on your own machine, not from theory. Reference your specific screenshots and observations.

*Example: "When I powered on, my BIOS/UEFI ran POST, then loaded the bootloader from my SSD into RAM. The kernel initialized in Ring 0, and I logged in at the user screen. I opened Chrome (PID [X], [Y] MB RAM), which made a system call to send a DNS query to [Z]… I observed the SYN packet going to port 443 in Wireshark…"*

---

## Task 11 — Reflection

1. What surprised you most about what's actually running on your own machine?
2. You now have two views: the "Website Story" (portfolio) and this investigation. Which gave deeper understanding — and why?
3. If you were a security analyst auditing this machine, what are the **top 3 things** you would fix first? Why those three?
4. How did the **ethics rules** (Task 3) shape what you chose to test — and which of the security risks from Task 9 would worry you most in real life?

---

## Deliverables

Combine everything into a single document titled **"Week 1 — Know Your Machine, Know the Rules"** (PDF or Markdown):

**Part A (written):**
1. Task 1 — CIA + AAA answers + asset protection examples
2. Task 2 — Threat vocabulary scenarios + threat actor analysis
3. Task 3 — Legal ethics scenarios

**Part B (hands-on + screenshots):**
4. Task 4 — WSL2 setup checkpoint (screenshot of `uname -a`)
5. Task 5 — Hardware findings + security questions
6. Task 6 — OS observation (processes, kernel/user, permissions, services/ports)
7. Task 7 — Network identity
8. Task 8 — Traffic analysis table + 2+ screenshots (HTTP + HTTPS)

**Part C (synthesis):**
9. Task 9 — Security table (attack + defense for each layer)
10. Task 10 — Full Picture narrative (5–7 sentences)
11. Task 11 — Reflection

**Submit alongside** the "Website Story" portfolio piece (`week01-assignment.md`). Both are due before Day 6.

---

## Rubric

| Criterion | Strong (3) | Adequate (2) | Needs work (1) |
|-----------|-----------|--------------|----------------|
| CIA + AAA (Task 1) | All 6 defined; HTTP/CIA and HTTP/AAA answers accurate | Partial definitions; one answer weak | Missing or incorrect |
| Threat vocabulary (Task 2) | All 5 terms defined; 3 scenarios correctly analyzed | Partial definitions; 1–2 scenarios weak | Missing or incorrect |
| Threat actors (Task 2) | All 5 actors covered; reasoning is thoughtful | 3–4 actors; reasoning present | Missing or generic |
| Legal ethics (Task 3) | All 4 rules identified in every scenario; consequences explained | 3 rules caught; consequences partial | Missing or incorrect |
| WSL2 setup (Task 4) | Checkpoint screenshot present; WSL2 verified | Attempted but incomplete | Missing |
| Hardware investigation (Task 5) | All components found; security questions answered with reasoning | Most components; partial reasoning | Missing |
| OS — processes (Task 6A) | PID + memory found; red flags considered | Partial info | Missing |
| OS — kernel/user (Task 6B) | Clear explanation of security boundary | Basic definition, weak security link | Missing |
| OS — permissions (Task 6C) | Found broad permissions; AAA connection made | Partial or generic | Missing |
| OS — services/ports (Task 6D) | 3+ services with ports; risk analyzed | Fewer services; weak risk analysis | Missing |
| Network identity (Task 7) | All fields found; DNS question answered with reasoning | Most fields; partial answer | Missing |
| Traffic capture (Task 8) | Both HTTP + HTTPS; table complete; CIA + AAA connections | One protocol or incomplete | No capture |
| Screenshots (Tasks 4–8) | 4+ clear, labeled screenshots | 2–3 screenshots | None |
| Security at every layer (Task 9) | 9 layers covered; realistic attacks + defenses | 6–8 layers; some weak | Fewer than 6 |
| Full picture (Task 10) | References own observations; hardware→OS→network flow | References some; thin | Generic or missing |
| Reflection (Task 11) | Thoughtful; prioritizes fixes; connects ethics to real concern | Surface-level; weak prioritization | Missing |

**Total: /48** — This score is separate from the portfolio piece rubric.

---

## Tips

- **Do Part A first.** The concepts frame everything in Part B. You will reference CIA, AAA, and ethics in the hands-on tasks.
- **Set up WSL2 (Task 4) early** — you need it for the Linux tasks in Task 6.
- **Task 8 (traffic capture) is the most visual.** Start with the `dns` filter in Wireshark if you feel overwhelmed.
- **For the HTTP site**, `neverssl.com` deliberately uses HTTP so you can see exactly what unencrypted traffic looks like.
- **Task 9 is the security payoff.** Don't just list attacks — think about which ones are realistic on *your* machine.
- **Write Task 10 in your own voice.** It is "tell me the story of what you saw," not a theory essay.
- **Be honest in Task 11.** If something was confusing, say so.

---

## Sources

| What you need | Where to look |
|--------------|---------------|
| CIA Triad + AAA definitions | Day 1 notes |
| Threat actor types | Day 1 notes |
| Legal ethics rules | Day 1 ethics lecture |
| `ipconfig` / `ifconfig` / `ip a` | Day 3 lab notes |
| Wireshark | [wireshark.org/docs](https://www.wireshark.org/docs/) |
| DNS resolution (`nslookup` / `dig`) | Day 4 lab notes |
| Process viewer (Task Manager / `htop` / `ps`) | Day 2 lab notes |
| `netstat` / `ss` for services & ports | OS Fundamentals lecture |
| File permissions (`chmod`, Windows ACLs) | OS Fundamentals lecture |
| Kernel/User Mode | OS Fundamentals lecture (Slides 15–16) |
| Hardware components | Hardware Fundamentals lecture (Slides 4–12) |
| Memory protection (ASLR, DEP) | OS Fundamentals lecture (Slide 20) |
| WSL2 setup | Microsoft docs: [learn.microsoft.com/en-us/windows/wsl/install](https://learn.microsoft.com/en-us/windows/wsl/install) |
| The 7-step page-load story | `diagrams/page-load-signature.md` |

---

## Version note
- **v2.0** — Major expansion: added Part A (CIA, AAA, asset categories, threat vocabulary, threat actors, legal ethics), WSL2 lab setup (Task 4), and integrated security concepts throughout all hands-on tasks. Now covers the full scope of Week 1 teaching: foundational security concepts → legal ethics → hardware → OS → network → synthesis. Rubric expanded to /48. Replaces v1.0/v1.1.
- **v1.0** — Initial supplementary assignment (network observation only).
