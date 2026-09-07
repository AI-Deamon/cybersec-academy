# Week 1 — Student Pack

*Practical Cyber Security (v2) · Week 1: Building the foundation*

> **Formative quiz:** `week1/quiz.md` — 10 questions, self-check. Do it before the weekend assignment.

This one document covers all of Week 1: a recap per day, key terms, the in-class worksheets,
your daily homework, and the weekend assignment. Keep it open during class.

**Your course repo:** create one private Git repo (GitHub or GitLab) this week. Every class you
add three things — today's attack, today's defence, today's artifact. By Day 20 it's your
portfolio.

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

**1. Set up your course repo** (step by step):
   1. Create a free account at github.com **or** gitlab.com (turn on 2-factor auth).
   2. Create a **private** repository named `cybersec-course`.
   3. On your laptop, install Git: Windows → https://git-scm.com/download/win ·
      Linux → `sudo apt install git` · macOS → `xcode-select --install`.
   4. `git clone <your repo URL>` then `cd cybersec-course`.
   5. Create `README.md` (see item 2), then:
      `git add . && git commit -m "day 1" && git push`
   6. Structure to build over the course: `README.md`, `day01/`, `day02/`, … one folder per day.
   *Stuck? Bring your laptop to the start of Day 2 — we'll fix it in the first 5 minutes.*

**2. Write `README.md`** — two short paragraphs: **why** you're taking this course, and the
   sentence *"I will only test systems I am authorized to test."* Start a "Today I learned" list.

**3. Read and sign the Authorization Pledge** (below). Bring the signed copy to Day 2.

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
1. Draw the **source code → executable → running process** pipeline yourself; label where CPU,
   RAM and disk each come in.
2. One paragraph: **what is the difference between a program and a process?**
3. Commit both to your repo; update your README's "today I learned" list.

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
1. Draw your home network: each device → wifi/switch → router → ISP. Label every private IP,
   the gateway, and the router's public IP.
2. Two sentences: **why does `whatsmyip.com` show a different address than `ipconfig` / `ip a`?**
3. Commit both; update your "today I learned" list.

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
1. Write the **7-step story** of loading `example.com`, keypress → rendered page, in your own
   words. *(This becomes Part A of the weekend assignment.)*
2. From your DevTools login: screenshot the request line + headers, **credentials blurred**.
3. One sentence: **what does the padlock guarantee, and what does it not?**

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

### Homework
Finish the **Week 1 weekend assignment** (below). Also add the **5-primitives table** to your
repo: symmetric encryption · asymmetric encryption · hash · salted-slow-hash (passwords) ·
signature/certificate — with one real use of each.

---

## Weekend Assignment — Week 1

*Briefed at the end of Day 5. Submit one PDF before Monday (start of Day 6).*

### Part A — Integrate
Write the story of **what happens, end to end, when you log in to a website** — from pressing a
key to the server checking your password over an encrypted connection. Use the concepts from
Days 1–5 (data, how a program runs, packets, TCP/DNS/HTTP, TLS). One to two pages, your own
words, a diagram encouraged.

### Part B — R&D stretch (research something we did *not* cover)
Pick **one**:
- Explain **DNS-over-HTTPS (DoH)**: what problem it solves, and one reason it's controversial.
- Find **one real CVE** in a DNS server or a TLS library. In 3–4 sentences: what broke, and
  what an attacker could do.

### Part C — Hands-on evidence
Screenshots / command output from your own machine:
- your IP, MAC and default gateway;
- a `ping` and a `traceroute` to any public site;
- one web request viewed in your browser's DevTools → Network tab (show the request headers).

### Part D — Reflection
3–4 sentences: what clicked this week, and what's still fuzzy.

### Marking checklist (10 marks)
- [ ] Part A covers all five layers data → TLS, in the student's own words (3)
- [ ] Part A is coherent as a single story, not disconnected facts (1)
- [ ] Part B shows real research beyond class, correctly explained (2)
- [ ] Part C — all three pieces of evidence present and legible (2)
- [ ] Part D — a genuine reflection, not filler (1)
- [ ] Submitted as one PDF, on time (1)
