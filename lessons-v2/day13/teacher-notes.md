# Day 13 — Teacher Notes

**Teach from:** `day13.md` (deck + speaker notes).
**This file:** ethics/scope, cut-list, background, the two answer keys, demo runbook, checkpoint,
exit check, FAQ.

**Wireshark gets installed today.** Do it as the first step of the big DO so latecomers aren't
stuck. Kali has it preinstalled; students on the shared Kali already have it.

---

## Ethics & scope — say this before the tools come out

- **Passive recon:** use only the domain the instructor names (something you clearly may look
  at — the college's public site, `example.com`, or a domain a student owns). Don't
  aggressively enumerate *people*.
- **Active scanning:** only `<LAB_HOST>` (it's in the signed ROE from Day 12) **or**
  `scanme.nmap.org` (the Nmap project explicitly authorises scanning that host for learning —
  be gentle, one scan). **Nothing else.** Unauthorized port scanning has been treated as an
  offence in multiple jurisdictions and always violates "no scope, no test".

---

## The analogy — the inspector walks the outside first (kitchen)

Recon = the health inspector reads the sign, checks the council's public records, looks
through the windows, notes when deliveries arrive — **before touching a door**. Scanning =
then they walk up and try every handle to see which are locked — and anyone watching hears
them rattling every door.

---

## Must-teach vs. cut-if-short

**Never cut:**
- **Passive before active**, and *why* (invisible + generally legal vs. detectable + scoped).
- The OSINT sources (DNS, crt.sh, search dorks, Shodan, job ads, GitHub).
- `nmap -sV -sC -oA` and **reading the output**.
- **The Wireshark watch** — the blue-team bridge.
- The **service inventory** artifact.

**Cut in this order if behind:**
1. OS detection / NSE-category / timing detail on the Nmap slide.
2. The "from output to asset list" slide → 2-min live demo of filling one row.
3. The passive-recon DO → 5 min, just `dig` + crt.sh.
4. Shodan / GitHub from the OSINT table (keep DNS, crt.sh, dorks, job ads).

---

## Background

### Passive / OSINT — the useful sources, in order of value
- **Certificate Transparency** (crt.sh, censys) — every publicly-trusted cert is logged. The
  best single source of hostnames the org never advertised (`vpn.`, `dev.`, `mail.`,
  `citrix.`, `owa.`).
- **DNS** — `dig`/`host`/`nslookup`. A, AAAA, CNAME (who they alias to → cloud/CDN), MX (mail
  provider), NS (DNS provider), TXT (SPF lists sending IPs; `google-site-verification`,
  `_dmarc`). `dig axfr` (zone transfer) occasionally still works on a misconfigured server —
  dumps *every* record.
- **Search dorks** — `site:`, `-site:`, `inurl:`, `intitle:`, `filetype:`, `cache:`. Finds
  login portals, uploaded spreadsheets, stack traces, `.env` files.
- **The org's own content** — job ads ("experience with Fortinet, Splunk, ServiceNow"),
  engineering blog, status page, `/humans.txt`, conference talks.
- **People** — LinkedIn, the team page → the **email naming convention** (`first.last@`,
  `flast@`) → a target list for phishing (Day 11) or password spray.
- **Shodan / Censys / ZoomEye** — search engines for internet-connected devices. Filters:
  `hostname:`, `org:`, `port:`, `ssl:`, `product:`. Shows exposed RDP, databases, ICS, old
  webservers with banners.
- **Code** — GitHub/GitLab search, `trufflehog`/`gitleaks` on a repo, commit history (secrets
  removed from HEAD are still in history), public gists, Docker Hub images.
- **Breach data** — HIBP (which staff appear in breaches), and paste sites.
- **WHOIS / RDAP** — registrant, dates, name servers (privacy-redacted for most now).
- **The Wayback Machine** — old versions of the site with endpoints/params since removed.

### Active scanning
- **Host discovery** (`-sn` / "ping scan"): ARP on the local net, ICMP echo + TCP SYN to
  80/443 + TCP ACK + ICMP timestamp elsewhere. `-Pn` = skip discovery, treat all as up (for
  hosts that don't answer pings).
- **Port states:** `open` (a service accepted), `closed` (RST received — reachable, nothing
  listening), `filtered` (no response / ICMP unreachable — a firewall), `open|filtered`
  (UDP ambiguity), `unfiltered` (ACK scan: reachable, state unknown).
- **Scan types:** `-sS` SYN/"half-open" (default as root — fast, never completes the
  handshake), `-sT` full connect (default as non-root — uses the OS, logged as a real
  connection), `-sU` UDP (slow, needed for DNS/SNMP/DHCP), `-sA` ACK (maps firewall rules).
  Stealth scans (`-sF`, `-sN`, `-sX`) are mostly historical.
- **Depth:** default = top 1000 TCP. `-p-` = all 65535. `--top-ports N`. `-p 80,443,8080` or
  `-p 1-1024`.
- **`-sV`** — sends probes and matches responses against `nmap-service-probes`; `--version-intensity 0-9`.
- **`-sC`** = `--script=default` — runs the "default" category of **NSE** (Nmap Scripting
  Engine): safe, useful checks (titles, anon FTP, SMB OS, TLS config, common
  misconfigurations). Other categories: `safe`, `vuln`, `auth`, `brute`, `discovery`,
  `exploit` (don't run `exploit`/`brute` casually).
- **`-O`** OS fingerprinting (TCP/IP stack quirks). **`-A`** = `-sV -sC -O --traceroute`.
- **Timing:** `-T0` paranoid … `-T3` default … `-T5` insane. `-T4` is the practical default on
  a good link; `-T1/-T2` for evasion (huge time cost).
- **Output:** `-oN` normal, `-oX` XML, `-oG` grepable, `-oA base` = all three. Feed the XML to
  other tools.

### Reading a scan into an asset list — the skill
For each open port ask: **what is it, which version, is that version current, is it something
that shouldn't be exposed, does `-sC` flag anything?** Old versions and "why is *that* here?"
services float to the top. That prioritised list is Day 14's input.

### What a scan looks like on the wire (for the Wireshark watch)
- A default TCP SYN scan = one SYN per port, hundreds in a second or two, all from your IP,
  sequential or randomised destination ports.
- Open port → `SYN, ACK` back, then your host sends `RST` (SYN scan never completes).
- Closed port → `RST, ACK` back.
- Filtered → nothing, or an ICMP type 3.
- `-sV` then opens real connections to the open ports and sends protocol-specific probe
  strings (`GET / HTTP/1.0`, `HELP`, TLS ClientHello...) — visible as readable payloads.
- An IDS (Snort/Suricata) fires on the rate and the pattern instantly.

---

## `sample-nmap.txt` — answer key

| Host | Port | Service | Version | Worth a look? |
|---|---|---|---|---|
| northwind-srv | 21 | ftp | **vsftpd 2.3.4** | YES — this exact version shipped with a backdoor (CVE-2011-2523); also **anonymous login allowed** + a readable `notes.txt` |
| | 22 | ssh | OpenSSH 7.2p2 (Ubuntu 16.04) | old-ish; enumerate users / check for weak creds later |
| | 80 | http | Apache 2.4.29 | staff portal — web testing target (Day 15/16) |
| | 139/445 | smb | Samba 4.7.6 | enumerate shares/users (`enum4linux`, `smbclient -L`) |
| | 631 | ipp | CUPS 2.2 | printing service exposed — shouldn't be internet-facing |
| | 3306 | mysql | MySQL 5.7.33 | DB exposed on the network — should be localhost-only |
| | 8080 | http | Tomcat 9.0.30 | check `/manager` — default creds are a classic |
| | 9200 | http | Elasticsearch 6.8.0 | data store exposed; 401 now, but ES has a history of open clusters |

**Three to investigate first:** vsftpd 2.3.4 (known backdoor + anon FTP), Tomcat 8080 (manager
app / default creds), MySQL 3306 exposed (shouldn't be reachable at all).
**Misconfiguration (not an old version):** anonymous FTP allowed; MySQL and CUPS exposed on
the network; the "potentially OPEN proxy" note on Tomcat.

---

## `passive-recon-worksheet.md` — what "good" looks like
A completed worksheet names: the mail + DNS providers, 3+ subdomains from crt.sh (with a note
on any that look internal), a framework/CMS guess from headers, one interesting `robots.txt`
path or dork hit, and a 5-line profile in the Journal. It does **not** contain any `nmap` /
login / active output.

---

## Demo runbook

### Hook — crt.sh + dig (2 min, projector)
`dig example.com ANY` then `crt.sh/?q=example.com`. Point at a subdomain the main site never
links to. "Public record. Zero packets to them from us in a way they'd notice."

### The big DO — nmap + Wireshark
1. `sudo apt install -y wireshark` (say "yes" to non-root capture; add user to `wireshark`
   group; for today `sudo wireshark` is fine if the group change needs a re-login).
2. Wireshark → capture on the active interface → filter `ip.addr == <LAB_HOST>`.
3. Terminal: `nmap -sV -sC <LAB_HOST>` (add `-Pn` if the host ignores pings).
4. Narrate the capture: the SYN burst, SYN-ACK vs RST, then the `-sV` probe payloads.
5. `nmap -sV -sC -oA week3/scan-lab <LAB_HOST>` to save.

### Failure modes
| Symptom | Fix |
|---|---|
| Wireshark shows no packets | wrong interface; or needs root — `sudo wireshark`, or finish the group-add + re-login |
| `nmap` "Note: Host seems down" | add `-Pn` |
| scan is very slow | `-T4`; or `--top-ports 100` for the demo, full scan as homework |
| student wants to scan a real site "just to try" | hard no — `<LAB_HOST>` or `scanme.nmap.org` only |
| crt.sh blocked on the campus network | use `curl -s "https://crt.sh/?q=%25.example.com&output=json"` or the Wayback/DNS parts only |
| no lab access | `scanme.nmap.org` for the scan+Wireshark; `sample-nmap.txt` for the asset-list skill |

---

## Checkpoint (by end of class)

Each student can:
- [ ] name 4 passive sources and what each yields
- [ ] explain why passive comes before active
- [ ] run `nmap -sV -sC -oA` and read the output
- [ ] point to the port scan in a Wireshark capture and say which packets mean "open"
- [ ] convert scan output into a service-inventory table

---

## Exit check (last 2 min)

1. You need the tech stack of a company. Name two passive ways to get it. — *Job ads / their
   site's HTTP headers / crt.sh subdomain names / GitHub.*
2. `nmap` says port 8443 is `filtered`. What does that mean? — *No useful response — a
   firewall is dropping the probe; can't tell if anything's listening.*
3. Why can a SOC spot a port scan almost immediately? — *Hundreds of connection attempts from
   one source in seconds — an obvious rate/pattern anomaly; IDS signatures match it.*

---

## FAQ

- **"Is scanning illegal?"** Unauthorized scanning of systems you don't own has been
  prosecuted and always breaks "no scope, no test". In scope (a signed ROE) or on
  `scanme.nmap.org`, it's fine.
- **"Is passive recon always legal?"** Gathering public information is generally fine;
  aggressive automated enumeration, or using leaked/stolen data, can cross legal and ethical
  lines. Keep it to public sources and don't harass people.
- **"Why `-sV -sC` every time?"** Versions tell you what might be vulnerable (Day 14); default
  scripts catch common misconfigurations for free.
- **"Nmap vs `masscan` / `rustscan`?"** `masscan`/`rustscan` find open ports faster on huge
  ranges; you still hand the results to `nmap -sV -sC` for detail. Learn Nmap first.
- **"Can attackers scan without being seen?"** Only very slowly, from many IPs, accepting they
  might still be caught. Stealth trades away enormous amounts of time.
