---
marp: true
theme: dark-monospace
paginate: true
title: "Day 13 — Recon & Scanning"
footer: "Practical Cyber Security (v2) · Week 3 · Day 13"
---

<!-- _class: lead -->

# Recon & scanning
## Day 13 — Map the target — passive first, then Nmap (and watch it on the wire)

**Week 3 · The penetration testing lifecycle · phases 2–3**

<!--
RUN SHEET (~85 min). Wireshark gets installed today.
00:00 Journey check + hook (what's public about a domain)      4
00:04 Passive vs active                                        4
00:08 Passive recon — OSINT sources                           10
00:18 DO: passive recon on a permitted domain                  8
00:26 Active scanning — the idea                               5
00:31 Nmap — the one tool worth learning well                 12
00:43 DO: nmap the lab + watch it in Wireshark               18
01:01 From scan output to an asset list                        6
01:07 Attack <-> defence                                       6
01:13 Wrap + artifact + homework                               4
CUT FIRST IF SHORT: OS detection / timing detail on the Nmap slide; the "from output to asset
list" slide to a 2-min demo.
NEVER CUT: passive-before-active, the OSINT sources, nmap -sV -sC + reading output, the
Wireshark watch, the service inventory artifact.
ANALOGY (kitchen / health inspector): recon = walk the outside first — read the sign, check
public records, look in the windows, note the delivery schedule — before touching anything.
Scanning = walk up and try every door handle (and the neighbours hear you rattling them).
ETHICS: passive recon only on the instructor-permitted domain. Active scans only on <LAB_HOST>
(in the ROE) or scanme.nmap.org (the Nmap project explicitly allows scanning it).
-->

---

## Where we are

- **Day 12:** Phase 1 done — scope, ROE, lab access.
- **Today:** Phases **2 (recon)** and **3 (scanning)** — build a map of the target.
- **You can't attack what you haven't mapped.** And you can't defend what you don't know you have.

<!--
Journey Check. The service inventory you build today is the input to Days 14-16.
-->

---

## Hook — what does the internet already know?

*(on the projector, 2 minutes, one domain)*

```
dig example.com   ;  dig example.com MX  ;  dig example.com TXT  ;  dig example.com NS
```
+ open **crt.sh/?q=example.com** — every TLS certificate ever issued for it, revealing
subdomains and internal hostnames.

You haven't "hacked" anything. This is all **public record.**

<!--
`dig <domain> ANY` used to dump everything but most resolvers now refuse it (RFC 8482) — ask
for the record types you want. TXT = SPF (sending IPs) + verification records; NS/MX = the DNS
and mail providers.
crt.sh (Certificate Transparency logs) is the single most useful passive source — it leaks
hostnames like dev.example.com, vpn.example.com, jira.internal.example.com that the org never
advertised. Do this live.
-->

---

## Passive vs active

| | Passive | Active |
|---|---|---|
| Packets to the target? | **no** (or indistinguishable from normal use) | **yes** |
| Detectable? | not really | **yes — always** |
| Sources | public records, search engines, third parties | scans, probes, logins |

**Rule: exhaust passive first.** Every active packet is evidence, and noise a defender can
hear.

<!--
Passive keeps you invisible and (for public data) generally legal to gather. Active is where
scope and authorization matter — you're now touching someone's system.
-->

---

## Passive recon — where the information lives

| Source | What it gives you |
|---|---|
| **DNS** (`dig` A/MX/NS/TXT) | hosts, mail servers, SPF/DKIM records, cloud providers |
| **Certificate Transparency** (crt.sh) | subdomains & internal hostnames from every issued cert |
| **Search dorks** (`site:` `filetype:` `inurl:`) | exposed docs, admin pages, error messages |
| **The org's site + job posts** | the tech stack they run ("must know Django, PostgreSQL, AWS") |
| **LinkedIn / staff pages** | names → email format → phishing & password-spray targets |
| **Shodan / Censys** | their internet-exposed devices and open services |
| **GitHub / GitLab** | leaked keys, configs, internal URLs in commit history |
| **Breach data** (HIBP) | which staff creds have leaked before |

<!--
The mindset: an attacker builds a picture of the org — its people, its tech, its exposure —
before sending a single packet. Job ads are goldmines for the tech stack.
-->

---

## Do it now — passive recon on `<PERMITTED_DOMAIN>`

Instructor gives you **one** domain. Passive tools only — **no `nmap`, no logins**:

1. `dig <domain> ANY` and `dig <domain> MX` and `dig <domain> TXT`
2. **crt.sh** — list every subdomain you can find
3. `curl -s https://<domain> | grep -i -E "generator|powered by"` — tech hints
4. `https://<domain>/robots.txt` — what do they not want indexed?
5. One Google dork: `site:<domain> filetype:pdf`

Write a 5-line profile into your Engagement Journal (Phase 2).

<!--
8 min. Use a domain you control or one that's clearly OK (the college's public site, or
example.com). This is passive - it does not need to be in the pentest scope, but keep it
sane and don't enumerate people aggressively.
-->

---

## Active scanning — the idea

Now we touch the target. The sequence:

1. **Host discovery** — which addresses are alive?
2. **Port scan** — which ports are open (a service is listening)?
3. **Service / version detection** — *what* is listening, and which version?
4. **Enumeration** — dig into each service for detail (users, shares, endpoints, config)

Each step narrows the next. Loud by design — you're rattling every door.

<!--
Version detection (step 3) is the pivot to Day 14: "Apache 2.4.49" -> look up its CVEs.
Enumeration (step 4) is service-specific and continues all week.
-->

---

## Nmap — learn this one well

```
nmap -sn 10.0.0.0/24            host discovery only (who's up)
nmap <host>                     top 1000 TCP ports
nmap -p- <host>                 ALL 65535 ports (slower)
nmap -sV <host>                 + service/version detection
nmap -sV -sC <host>             + default NSE scripts (safe checks)
nmap -sU --top-ports 20 <host>  common UDP
nmap -sV -sC -oA scan1 <host>   save output (3 formats)
```

**Port states:** `open` (listening) · `closed` (nothing there, but reachable) · `filtered` (a
firewall ate the probe). Timing: `-T4` normal-fast, `-T1` slow-and-quiet.

<!--
`-sV -sC -oA` is the everyday combo. `-sS` (SYN) is the default when run as root; `-sT`
(full connect) otherwise. Don't drill every flag - `-sV`, `-sC`, `-p`, `-oA`, `-T` cover 95%.
`-O` (OS detection) and NSE categories are a "look it up" (Day 6 lesson: --help / man).
CUT the OS/timing detail first if short.
-->

---

## Do it now — scan the lab, watch the wire

1. Install **Wireshark** (`sudo apt install wireshark`), start a capture on your interface,
   filter: `ip.addr == <LAB_HOST>`
2. In another terminal: `nmap -sV -sC <LAB_HOST>`
3. Watch Wireshark while it runs. Find:
   - the **burst of SYN packets** — one per port (the port scan)
   - **SYN-ACK** back from open ports, **RST** from closed ones
   - the **version probes** — Nmap sending real payloads to identify services
4. Save the scan: `nmap -sV -sC -oA week3/scan-lab <LAB_HOST>`

<!--
18 min. This is THE blue-team bridge - "here is what a scan looks like from the defender's
chair". A default scan is hundreds of packets in seconds; utterly obvious in a capture or an IDS.
No lab? scanme.nmap.org is explicitly OK to scan (be gentle - one scan).
Wireshark install: the "should non-root capture?" prompt -> Yes, add your user to `wireshark`
group, log out/in (or use sudo for today).
-->

---

## From scan output to an asset list

Raw Nmap → the **service inventory** in your Engagement Journal:

| Host | Port | Proto | Service | Version | Notes / worth a look? |
|------|------|-------|---------|---------|------------------------|
| `<LAB_HOST>` | 80 | tcp | http | Apache 2.4.x | DVWA login page |
| `<LAB_HOST>` | 3000 | tcp | http | Node/Express | Juice Shop |
| `<LAB_HOST>` | 21 | tcp | ftp | vsftpd 2.3.4 | old — check CVEs (Day 14) |
| ... | | | | | |

This table is the deliverable of Phases 2–3 and the input to everything next.

<!--
The skill: not "run nmap" but "turn 200 lines of output into a prioritised list of things to
investigate". Old version numbers and unusual services rise to the top.
-->

---

## Attack ↔ Defence

| Attack | Defence |
|---|---|
| enumerate everything; **slow** scans (`-T1`) to stay under thresholds | connection-rate anomaly detection; IDS scan signatures (Snort/Suricata) |
| scan from many source IPs | correlate across sources; rate-limit per-source |
| version detection → pick an exploit (Day 14) | **attack-surface reduction** — close unused ports (Day 3), patch, minimise banners |
| — | **honeypots / deception** — fake services that only an attacker would touch |

**A scan is an early warning.** If your logs show someone mapping you, something is coming.

<!--
The two Day 13 traps, addressed: (1) "harmless" - unauthorized scanning has been prosecuted;
stay in scope. (2) "undetectable" - it is one of the loudest things you can do. A pentester
scans openly *because they're authorised*; an attacker who wants stealth pays a big speed cost.
-->

---

## Today's attack / defence / artifact

- **Attack:** build a full picture — people, tech, exposure — from public data, then scan to
  confirm what's listening and which version.
- **Defence:** know your own attack surface first; close what you don't need; watch for the
  scan, because it precedes the attack.
- **Artifact:** the **service inventory** table in your Engagement Journal (Phases 2–3),
  plus the saved `nmap -oA` output in the repo.

---

## Homework

1. Complete the **service inventory** for `<LAB_HOST>` in your Engagement Journal — every open
   port, service, and version. Commit the `nmap -oA` files too.
2. Pick the **two most interesting** findings (old version? unusual service?) and write one
   sentence each on why they're interesting.
3. Practice reading: `assets/sample-nmap.txt` — turn it into an asset-list table.
4. Add `passive vs active recon`, `OSINT`, `certificate transparency`, `Shodan`, `host
   discovery`, `-sV`, `-sC`, `filtered`, `NSE` to your glossary.

<!--
Due start of Day 14.
-->

---

<!-- _class: lead -->

## Recap

1. **Passive first.** Public records (DNS, crt.sh, search, Shodan, job ads) build the picture with zero packets.
2. **Then Nmap.** `-sV -sC -oA` — what's listening, which version, saved. Turn output into an asset list.
3. **Scanning is loud.** It's legal only in scope, and it's the defender's early warning.

<!--
Say the three lines. Tomorrow: take the versions from your inventory and turn them into a
ranked list of real weaknesses - vulnerability assessment.
-->
