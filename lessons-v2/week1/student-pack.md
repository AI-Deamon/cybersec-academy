# Week 1 — Student Pack

*Practical Cyber Security (v2) · Week 1: Building the foundation*

> **Formative quiz:** `week1/quiz.md` — 10 questions, self-check. Do it before the weekend assignment.

This one document covers all of Week 1: a recap per day, key terms, the in-class worksheets,
your daily homework, and the weekend assignment. Keep it open during class.

**Your course repo:** create one private Git repo (GitHub or GitLab) this week. Every class you
add three things — today's attack, today's defence, today's artifact. By Day 20 it's your
portfolio.

### How the week fits together
Each day answers one question. The weekend assignment puts all five answers into one story.

| Day | The question | The path |
|---|---|---|
| **1** | What are we protecting, and what's the line we don't cross? | CIA → threats → authorization |
| **2** | What is actually running on the machine? | program → executable → process → CPU/RAM → OS |
| **3** | How does the machine talk to others? | IP → MAC → gateway → router (NAT) → ISP → Internet |
| **4** | How does a web request work? | DNS → TCP → TLS → HTTP → server |
| **5** | How is information protected? | encryption → hashing → passwords → certificates → signatures |
| **Weekend** | Can you follow one login end to end — and say where it can fail? | integrate → threat-model → prove it |

**Every homework follows the same pattern:** **Learn** (class) → **Do** (build or draw it) →
**Investigate** (look at the real thing) → **Secure** (answer the day's security question) →
**Evidence** (prove it on your machine) → **Commit** (push to your repo). Each day also ends
with one **Real job** question — where would you meet this in a real security job? Two or three
sentences is plenty.

---

## Day 1 — What is this, where did it come from, and where's the line?

### Recap
- **Security** = a system doing what it should *while someone actively tries to make it do
  otherwise*. The attacker needs one open door; the defender must close them all.
- **Hacking** = understanding a system better than the person who built it. It's a skill, and
  it's neutral. The word began as a compliment at MIT in the 1960s.
- **Hacker vs cracker; white / grey / black hat.** The same technical action is lawful or
  criminal depending on **authorization**, not skill. Grey hat ("I wasn't being malicious") is
  still illegal.
- **Five events:** Morris Worm (1988), Kevin Mitnick (1990s), L0pht at the US Senate (1998),
  Stuxnet (2010), WannaCry/NotPetya (2017).
- **CIA triad** — Confidentiality, Integrity, Availability. Every incident is one or more of
  these failing.
- **The law (India):** IT Act §43 (civil — unauthorized access, no intent needed) and §66
  (criminal — dishonest/fraudulent access, up to 3 years / ₹5 lakh).
- **The rule:** *No scope, no test.*

### Key terms
`asymmetry` · `hacker` · `cracker` · `white/grey/black hat` · `confidentiality` · `integrity` ·
`availability` · `authorization` · `scope` · `bug bounty` · `VDP` · `IT Act §43` · `IT Act §66`

### In-class worksheet — breach analysis
Your pair gets one breach card. Fill in:

| | |
|---|---|
| Breach | |
| CIA pillar(s) that failed | |
| The weakness, in one sentence | |
| Attacker: authorized, or committing a crime? | |

### Homework (due start of Day 2)

> **Security question:** What could go wrong if this asset is compromised?

**1. Do — set up your course repo** (step by step):
   1. Create a free account at github.com **or** gitlab.com (turn on 2-factor auth).
   2. Create a **private** repository named `cybersec-course`.
   3. On your laptop, install Git: Windows → https://git-scm.com/download/win ·
      Linux → `sudo apt install git` · macOS → `xcode-select --install`.
   4. `git clone <your repo URL>` then `cd cybersec-course`.
   5. Create `README.md` (see item 3), then:
      `git add . && git commit -m "day 1" && git push`
   6. Structure to build over the course: `README.md`, `day01/`, `day02/`, … one folder per day.
   *Stuck? Bring your laptop to the start of Day 2 — we'll fix it in the first 5 minutes.*

**2. Investigate — pick one asset of your own** (your email account, your phone, your college
   login — something real). In `day01/asset.md`, fill in:

   | Asset | Which CIA pillar matters most, and why? | If it were compromised, what could go wrong? |
   |---|---|---|
   | | | |

**3. Secure — write `README.md`.** Two short paragraphs: **why** you're taking this course, and
   the sentence *"I will only test systems I am authorized to test."* Start a "Today I learned"
   list. Then read and sign the Authorization Pledge (below) and bring it to Day 2.

**4. Evidence** — the signed pledge, plus your repo showing its first commit **including `day01/asset.md`** (`git add . && git commit -m "day 1" && git push`).

**5. Real job** — Why does a penetration tester need written scope before touching anything?

### Authorization Pledge
> I understand that accessing or testing computer systems without authorization is unlawful
> under the Information Technology Act, 2000, regardless of intent or outcome. I will only test
> systems I am authorized to test — my own isolated lab, or systems for which I hold explicit
> written permission or a valid bug-bounty scope. I will report vulnerabilities responsibly and
> will not use anything taught in this course to cause harm.

Name: __________________  Roll no: __________  Signature: __________  Date: ______

---

## Day 2 — Inside the box: how a program actually runs

### Recap
- **Three parts that matter:** **CPU** (runs machine instructions one at a time, billions/sec,
  obediently), **RAM** (fast, small, wiped on power-off — holds what's running now), **disk**
  (slow, large, permanent — holds files when they're not running).
- **Program vs process:** a *program* is a file on disk; a *process* is that program loaded
  into RAM and running. One program → many processes. A process has a **PID**.
- **Source → running:** you write source code → a compiler turns it into machine code (an
  executable on disk) → the OS loads it into RAM and points the CPU at it → it's a process.
  (Interpreted languages: the interpreter is the running process reading your script.)
- **The OS is the referee:** it schedules the CPU between processes, gives each its own private
  RAM (and stops one process reading another's), and guards access to hardware.
- **User mode vs kernel mode:** your code runs with limits (user mode) and asks the OS kernel
  for privileged things (files, network) via **system calls**.
- **Why a bug can become control:** instructions and data share the same RAM. If attacker input
  can overwrite the stored value that tells the CPU *what to run next*, the attacker picks the
  next instruction. A "crash bug" and "attacker runs their code" are often the same flaw.
- **Defences (named):** process isolation, DEP/NX, ASLR, stack canaries, running as a limited user.

### Key terms
`CPU` · `RAM` · `disk / storage` · `volatile` · `machine code` · `compiler` · `executable` ·
`program` · `process` · `PID` · `heap` · `stack` · `return address` · `operating system` ·
`scheduling` · `memory isolation` · `user mode` · `kernel mode` · `system call` ·
`memory corruption` · `DEP/NX` · `ASLR` · `stack canary`

### Hands-on (in class)
Using `htop` (Linux) or Task Manager → Details (Windows):
1. Sort by memory; find your browser; note its **PID** and RAM.
2. Open ~10 tabs; watch the memory number climb.
3. In a terminal, start a process (`sleep 300` / `timeout /t 300`), find it, **kill it by PID**.

Then watch the projector: the instructor runs a misbehaving program and the OS kills only that
one process — the machine is unharmed.

### Homework (due start of Day 3)

> **Security question:** How could an attacker abuse a running process?

1. **Do** — draw the **source code → executable → running process** pipeline yourself; label
   where CPU, RAM and disk each come in.
2. **Do** — one paragraph: **what is the difference between a program and a process?**
3. **Investigate** — Task Manager → Details (Windows) or `htop` (Linux). Browsers run as *many* processes, so pick **one** browser process (e.g. one `chrome.exe`) and note its **PID** and **memory**. Then open ten tabs and note what happens to the memory (of that process or of the browser in total — say which).
4. **Secure** — 2–3 sentences answering the security question. Use class ideas: a process runs
   with the permissions of whoever started it; instructions and data share the same RAM.
5. **Evidence** — a screenshot of the browser process with its PID and memory visible.
6. **Commit** — everything above into `day02/`, and update your README's "today I learned" list.
7. **Real job** — How could a SOC analyst use process information during an incident
   investigation?

**Optional extras (not graded):**
- *Process tracking in Event Viewer (Windows, admin)* → see the separate handout
  **`week1/week1-optional-lab-event-4688`**.
- *WSL setup* → below.

**Optional — explore and set up WSL (Windows Subsystem for Linux):**
   A real Linux kernel running next to your Windows kernel, on the same machine — the live
   version of today's "kernel" idea. It also lets you actually run the Linux commands used all
   course (`htop`, `ip a`, `dig`, …) instead of only reading the Windows equivalent.

   1. Open PowerShell **as Administrator** → `wsl --install`. Restart if prompted.
   2. After restart, Ubuntu launches automatically and finishes installing — create a UNIX
      username and password (separate from your Windows login; typed password won't show
      characters, that's normal).
   3. Check it worked: on Windows, `wsl --status`; inside Ubuntu, `uname -a` (should mention
      `microsoft-standard-WSL2`).
   4. Inside Ubuntu: `sudo apt update && sudo apt install -y htop`, then run `htop`. Compare it
      side by side with Task Manager — same idea, completely separate kernel.
   5. One sentence: is the Ubuntu you just opened a separate physical computer, a separate
      virtual machine, or something else?

   *(Not the same as the Kali attacker VM you'll use later for Days 12–20 labs — WSL2 isn't
   used there; see `LAB-SETUP.md`. This is just to get comfortable with Linux early.)*

---

## Day 3 — Networks I: how machines find each other

### Recap
- **Three addresses do the work:**
  - **IP** (e.g. `192.168.1.7`) — *where you are* on the network; used for routing; unchanged
    the whole journey. IPv4 = four numbers 0–255; IPv6 is the long one.
  - **MAC** (e.g. `a4:83:e7:2c:19:0f`) — the label for **one local hop only**; rewritten at
    every hop; never reaches the website.
  - **Port** (0–65535) — *which program* on that machine. Client picks a random source port;
    server listens on a known one (80 HTTP, 443 HTTPS, 22 SSH, 53 DNS).
- **Private vs public IP:** your laptop has a **private** IP (`10.x` / `172.16–31.x` /
  `192.168.x`) that only means something on your local network. Your house has **one public
  IP** on the router.
- **NAT:** the router swaps your private IP for the one public IP on the way out and matches
  replies back on the way in. *That's why `whatsmyip.com` ≠ `ipconfig`.*
- **A packet is envelopes inside envelopes:** MAC wraps IP wraps port wraps your data. The
  **4-layer model**: Link · Internet · Transport · Application. (OSI-7 is the same idea with
  more boxes.)
- **Routing:** each router reads the destination IP and forwards one hop closer; none knows
  the whole path.
- **Security:** anyone *on* your network can see your traffic (Day 1 demo). ARP spoofing lets
  an attacker get in the middle even on a switch. The real defence isn't a perfect LAN — it's
  **encrypt end to end** so being on the path is useless.

### Key terms
`IP address` · `IPv4 / IPv6` · `private / public IP` · `NAT` · `default gateway` · `DHCP` ·
`MAC address` · `ARP` · `port` · `client / server` · `packet` · `router` · `switch` ·
`4-layer model` · `ARP spoofing` · `port scanning` · `sniffing`

### In class — the four "do it now" beats
1. `ip a` / `ipconfig /all` → your IPv4 + default gateway.
2. same window → your MAC (physical / hardware address).
3. `sudo ss -tlnp` / `netstat -ano | findstr LISTENING` → a program listening on your machine.
4. `ping <gateway>` vs `ping 1.1.1.1`, then `traceroute 1.1.1.1` → local vs. far, count the hops.

### Homework (due start of Day 4)

> **Security question:** Where could an attacker intercept or redirect traffic?

**1. Do — draw your home network** in this shape, using your own devices and real values:

```text
Your laptop      MAC: ______   Private IP: ______
      |
      |  local hop — the MAC address is used here
      v
Wi-Fi router     Default gateway: ______   NAT happens here
      |
      |  Public IP: ______
      v
ISP  →  Internet  →  Web server
```

Add every other device on your network (phone, TV, …) with its private IP — if you can't find one, write "unknown" (the router's device list often shows them). *On a hostel, college or mobile-hotspot network you may be behind an extra layer of NAT, so the router's public IP may not match what a "what's my IP" site shows — draw what you can and note it.* *Hint: `ip a` /
`ipconfig /all` gives your IP, MAC and gateway; a "what's my IP" site shows the router's public IP.*

**2. Investigate — answer these four questions in your own words:**
1. Why does the laptop need a **MAC address** on the local network?
2. Why does **your laptop** need a **default gateway**? What would break without it?
3. **Where does NAT happen**, and what does it change?
4. Does the **web server see your laptop's private IP**? Explain.

Then two sentences: **why does `whatsmyip.com` show a different address than `ipconfig` / `ip a`?**

**3. Secure** — 2–3 sentences answering the security question. Use class ideas: anyone on your
local network can see your traffic, and ARP spoofing can put an attacker in the middle even on
a switch. What is the real defence?

**4. Evidence** — screenshot your `ip a` / `ipconfig /all` output (IP, MAC, gateway) and a `ping` and `traceroute` (Windows: `tracert`) to a public site. *(These also count for Part C of the weekend assignment.)*

**5. Commit** — into `day03/`, and update your "today I learned" list.

**6. Real job** — Why would a security engineer care whether an address is private or public?

---

## Day 4 — How a web page actually loads (keystone)

### Recap — the chain
1. You **type the URL**.
2. **DNS** turns `example.com` into an IP (your resolver walks root → `.com` → the domain's
   own servers; answers are cached with a TTL).
3. **TCP** opens a reliable connection — the **3-way handshake**: `SYN` → `SYN-ACK` → `ACK`.
   (UDP = no handshake, no re-sends — used for DNS, video, games.)
4. **TLS** locks the connection. It gives **confidentiality** (nobody can read it),
   **integrity** (nobody can change it undetected), and **identity** (the server proves its
   name with a certificate signed by a trusted authority).
5. **HTTP** — plain text inside the lock:
   - request: `GET /login HTTP/1.1` + headers (`Host`, `Cookie`, `User-Agent`) + optional body
   - response: `HTTP/1.1 200 OK` + headers (`Set-Cookie`, `Content-Type`) + the body (HTML)
   - status codes: **2xx** ok · **3xx** redirect · **4xx** your fault (404, 403) · **5xx** server fault
6. The browser **renders** the HTML.
7. It **repeats 2–6** for every image, script, and stylesheet.

### What the padlock does NOT mean
- **Not** "this site is honest" — phishing sites get a free padlock in minutes.
- **Not** "this server/app is secure."
- **Not** "your data is safe once it's stored."
- It only means: **the pipe to this server is private and unmodified.**

### Security
- **DNS spoofing** → wrong IP → attacker's server. Fix: DNSSEC, DNS-over-HTTPS.
- **MITM on plain HTTP** (the Day 1 demo) → read/rewrite everything. Fix: HTTPS + **HSTS**.
- **Session-cookie theft** → present the `Cookie` value and you *are* the logged-in user, no
  password. Fix: `Secure` + `HttpOnly` cookies, short sessions.

### Key terms
`DNS` · `resolver` · `A record` · `TTL` · `TCP` · `3-way handshake` · `SYN/ACK` · `UDP` ·
`TLS` · `certificate` · `Certificate Authority` · `HTTP` · `GET / POST` · `header` · `status code` ·
`cookie` · `Set-Cookie` · `session` · `HSTS` · `MITM` · `DNS spoofing`

### In class — the four "do it now" beats
1. `dig <domain>` / `nslookup` — the A record, run it twice.
2. `curl -v https://example.com` — find the "Connected" line (handshake done).
3. `printf 'GET / HTTP/1.1\r\nHost: example.com\r\nConnection: close\r\n\r\n' | ncat example.com 80`
   (Windows: `assets/http_by_hand.ps1`) — an HTTP request by hand.
4. **DevTools → Network**, log in to a personal account, inspect the request/response headers
   (find the `Cookie` and `Set-Cookie`). *Blur credentials in any screenshot.*

### Homework (due start of Day 5)

> **Security question:** What can an attacker learn from an HTTP request?

**1. Do — write the 7-step story** of loading `example.com`, keypress → rendered page, in your
own words. *(The 7 steps from class: type the URL → DNS → TCP → TLS → HTTP → render → repeat for every image/script. Part A of the weekend assignment extends this into a full login story, so do it properly now.)*

**2. Investigate — dissect one real request.** In DevTools → Network, log in to an account **you own** (a throwaway one is ideal — never someone else's) and pick the login request. Tips: tick **Preserve log** so the request survives the page redirect, and try the **Fetch/XHR** filter if you can't spot it. Fill in this table from what you see:

| Field | What you found |
|---|---|
| HTTP method | |
| URL | |
| `Host` | |
| `User-Agent` | |
| `Content-Type` | |
| `Cookie` | *(blur the value)* |
| `Authorization` header | *(if present — blur the value; write "not present" otherwise)* |
| Status code | |
| Response headers worth noting | *(e.g. `Set-Cookie`, `Content-Type`)* |
| HTTP or HTTPS? | |

Then answer: your browser can see every field above. **Which of them would be hidden from someone watching your Wi-Fi (because of TLS), and what could that person still see?**

**3. Secure** — 2–3 sentences answering the security question, and one more: **what does the
padlock guarantee, and what does it not?**

**4. Evidence** — a screenshot of the request line + headers, with **credentials blurred**.
Never submit a screenshot showing a real password or token.

**5. Commit** — into `day04/`, and update your "today I learned" list.

**6. Real job** — Why does a penetration tester inspect HTTP headers?

---

## Day 5 — Cryptography: locks, seals, and signatures

### Recap — three jobs
| Job | Question | Tool |
|---|---|---|
| **Secrecy** | can anyone else read this? | **encryption** |
| **Tamper-evidence** | has this been changed? | **hashing** |
| **Identity** | who really sent / owns this? | **signatures & certificates** |

- **Symmetric encryption** — one shared key, fast, used for the data. Problem: getting the key
  to both sides safely.
- **Asymmetric (public-key)** — public key locks *to* you, private key unlocks. Solves key
  exchange. Slow, so it's used only to agree a symmetric key, then switch.
- **Hashing** — any input → fixed-size fingerprint. **One-way, no key — not encryption.**
  Change one bit → the whole hash changes (avalanche). MD5 and SHA-1 are broken; use SHA-256+.
- **Passwords:** never plaintext, never "encrypted". Store `slow_hash(password + unique salt)`
  — bcrypt / scrypt / Argon2. *If a site can email you your password, it's doing it wrong.*
- **Signature** — sign with your private key, anyone verifies with your public key. Proves
  origin + integrity.
- **Certificate** — a Certificate Authority's signature on "this public key belongs to
  `example.com`". Your browser trusts ~150 root CAs; every cert chains to one.
- **TLS handshake, 4 steps:** hello → server sends its certificate → both sides agree a
  symmetric key (asymmetric maths) → switch to fast symmetric encryption.
- **Don't roll your own crypto.** Compose vetted library primitives.

### Background — what cryptography is

Cryptography is the mathematical practice of scrambling readable data into an unreadable format,
so that information stays secure across networks and devices.

**The four goals**

| Goal | What it means | In class we called it |
|---|---|---|
| **Confidentiality** | Keeps data private: only authorized users with the decryption key can read it. | secrecy |
| **Integrity** | Ensures data has not been altered or tampered with in storage or in transit. | tamper-evidence |
| **Authentication** | Verifies the true identity of users, systems or devices. | identity |
| **Non-repudiation** | Proves a specific party sent a message or signed a transaction, so they cannot deny it later. | signatures |

**The three main types**
- **Symmetric cryptography** — one secret key both locks (encrypts) and unlocks (decrypts) the
  data. Fast and efficient for bulk data. Example: **AES**.
- **Asymmetric cryptography** — a mathematically linked *pair* of keys: a public key encrypts, the
  private key decrypts. Example: **RSA**. *(Signing runs the other way round: the private key
  signs, the public key verifies.)*
- **Hash functions** — turn data into a fixed-size, unique digital fingerprint, so any change is
  detectable. A hash is one-way and has no key, so it is not "scrambling" you can undo. Hashes
  are used for password storage, but a plain hash is not enough: sites store a **salted, slow**
  hash (bcrypt / Argon2), as in class.

**Where you already meet it**
- **Secure web browsing** — SSL/TLS secures HTTPS traffic in online banking and shopping.
- **End-to-end encryption** — messaging tools like WhatsApp protect private conversations from
  being intercepted.
- **Password hashing** — websites store password hashes instead of plain text, to protect user
  accounts.

### Key terms
`plaintext / ciphertext` · `key` · `symmetric` · `asymmetric / public-key` · `AES` · `RSA` ·
`hash` · `SHA-256` · `MD5 (broken)` · `avalanche` · `salt` · `slow hash / KDF` ·
`bcrypt / Argon2` · `rainbow table` · `digital signature` · `certificate` · `Certificate Authority` ·
`chain of trust`

### In class — the "do it now" beats
1. Browser padlock → certificate details: issuer, validity, the chain to a root CA.
2. `sha256sum msg.txt` (Windows: `Get-FileHash`), change one letter, hash again — totally different.
3. `python3 crack.py <hash> wordlist.txt` — 3 MD5s fall in milliseconds; one misses; the
   salted+slow one grinds the whole list and finds nothing.

### Homework (due with the weekend assignment)

> **Security question:** Which cryptographic primitive protects which security property?

**1. Do — build the 5-primitives table** in `day05/primitives.md`. Use your own words; a definition copied from a website earns nothing. In the *Security problem it solves* column use the four goals from the background above (confidentiality, integrity, authentication, non-repudiation) — or name the specific attack it stops.

| Primitive | What it does | Security problem it solves | One real use |
|---|---|---|---|
| Symmetric encryption | | | |
| Asymmetric encryption | | | |
| Hash | | | |
| Salted slow hash (passwords) | | | |
| Signature / certificate | | | |

**2. Investigate** — two things from class, on your own machine:
1. Browser padlock → certificate details: who issued it, when does it expire, what is the chain
   up to a root CA?
2. Hash a short text file (`sha256sum` / `Get-FileHash`), change **one letter**, hash again.

**3. Secure** — 2–3 sentences: **why must a website never store your password as plaintext or
"encrypted", and what should it store instead?**

**4. Evidence** — a screenshot of the certificate chain, and of the two different hashes.

**5. Commit** — into `day05/`, and update your "today I learned" list.

**6. Real job** — Why does a security engineer need to tell hashing and encryption apart?

Then finish the **Week 1 weekend assignment** (below).

---

## Weekend Assignment — Week 1

*Briefed at the end of Day 5. Submit one PDF before Monday (start of Day 6).*

This is the integration exercise: everything from Days 1–5, in one investigation.

### Part A — Integrate: one login, end to end
Explain **what happens when you log in to a website**, from pressing a key to the server
checking your password. Your story **must cover these eleven stages, in this order**:

```text
 1. Keyboard input
        ↓
 2. Application / process        (the browser is a running process — Day 2)
        ↓
 3. DNS resolution
        ↓
 4. TCP connection
        ↓
 5. TLS handshake
        ↓
 6. HTTP request                 (the login POST)
        ↓
 7. Router / NAT / Internet      (see the note below)
        ↓
 8. Web server
        ↓
 9. Authentication               (how does the server check your password?)
        ↓
10. HTTP response
        ↓
11. Browser renders the page
```

> *Note on stage 7:* your packets pass through the router (and NAT) from stage 3 onward, not
> only at stage 7. Use stage 7 to explain what the router and NAT do to those packets on their
> way out and back.

**For each stage, write (a) what happens and (b) at least one security consideration** — one or two sentences each is enough, in your own words. Aim for about two pages, plus a diagram (the diagram can replace some of the words).

### Part B — R&D stretch (research something we did *not* cover)
Pick **one**:
- Explain **DNS-over-HTTPS (DoH)**: what problem it solves, and one reason it's controversial.
- Find **one real CVE** in a DNS server or a TLS library (search cve.org or nvd.nist.gov, e.g. for "BIND" or "OpenSSL") and give its ID. In 3–4 sentences: what broke, and
  what could an attacker do?

### Part C — Hands-on evidence
Screenshots or command output from your own machine. You can reuse your Day 3 and Day 4 screenshots, but they must appear in the PDF:
- your IP, MAC and default gateway;
- a `ping` and a `traceroute` (Windows: `tracert`) to any public site;
- one web request viewed in your browser's DevTools → Network tab (show the request headers).

### Part D — Reflection
3–4 sentences: what clicked this week, and what's still fuzzy.

### Part E — Think like an attacker
Take the login scenario from Part A and pick **three different places** where it could be
attacked. For each, fill in one row:

| Attack point | Possible attack | Security control |
|---|---|---|
| *(example)* DNS | DNS spoofing sends you to an impostor | DNSSEC / secure DNS |
| | | |
| | | |
| | | |

The three attack points must be from **different stages** of your Part A story. Don't copy the example — DNS spoofing is already used, so pick other attack points.

### Marking checklist (10 marks)
- [ ] **Technical accuracy** — Part A is technically correct and in the student's own words (2)
- [ ] **End-to-end explanation** — all eleven stages present, in order, one coherent story (2)
- [ ] **Security analysis** — security considerations in Part A + a sound threat model in Part E (2)
- [ ] **R&D / research** — Part B shows real research beyond class, correctly explained (2)
- [ ] **Hands-on evidence** — Part C: all three pieces present and legible (1)
- [ ] **Reflection** — Part D: genuine, not filler (1)

*Not submitted as one PDF, or late? The student should talk to the instructor before the deadline.*
