# Day 4 — Teacher Notes

**Teach from:** `day04.md` (deck + speaker notes).
**This file:** cut-list, background, demo runbook, checkpoint, exit check, FAQ.
**Day 4 is the keystone** — Weeks 3–4 web attacks all sit on this chain. If one Week-1 day is
worth over-preparing, it's this one.

**This day runs hot.** It carries close to two days of material (DNS + TCP + TLS + HTTP +
attacks + four hands-on beats). The run sheet fits ~84 min *only if every section stays
disciplined*. In the prep routine (step 2, time-box) **pick your cuts in advance, on paper** —
do not decide live. The must-teach spine is: the DNS→TCP→TLS→HTTP order, what TLS does **not**
give, the chain diagram, and the DevTools beat. Everything else is negotiable.

---

## The analogy — the phone call (sanctioned, from §9)

Day 2 kitchen → Day 3 postal → **Day 4 phone call**. Map:

| Concept | Phone call |
|---|---|
| DNS | asking the operator / directory for the number |
| TCP 3-way handshake | "hello?" … "hello, I can hear you" … "great, go ahead" |
| TLS handshake | both sides switch on a scrambler only they can undo; the other party shows ID first |
| HTTP request/response | the actual conversation |
| UDP | shouting a message down the hall without checking anyone caught it |

Don't add a new analogy. TLS certificate detail is Day 5 — today it's just "a trusted third
party vouched for this name."

---

## Must-teach vs. cut-if-short

**Never cut:**
- The order **DNS → TCP → TLS → HTTP** and what each step is for.
- **What TLS does NOT give** (honest site / secure app / safe-after-arrival) — the trap.
- The whole-chain diagram (it's the assignment).
- The DevTools "do it now".

**Cut in this order if behind:**
1. Steps 5–6 "read then repeat" slide → one sentence.
2. The UDP contrast line on the TCP slide.
3. The netcat "do it now" → just do a full read of `curl -v` instead.
4. The "look-alike site" row of the attack table (keep the other three).

---

## Background for topics people get shaky on

### DNS — the honest amount of detail
- **Recursive resolver:** usually your ISP's, or `1.1.1.1` / `8.8.8.8`. Does the legwork,
  caches results.
- **The walk:** root (`.`) → TLD (`.com`) → authoritative (the domain's own nameservers) →
  the record. Root and TLD answers are *referrals* ("ask over there"), not the final answer.
- **Caching + TTL:** every record has a time-to-live; resolvers and your OS cache until it
  expires. This is why the 2nd `dig` is instant and why DNS changes "take time to propagate."
- **Record types** — only name these if asked: `A` (name→IPv4), `AAAA` (→IPv6), `CNAME`
  (alias), `MX` (mail), `TXT` (verification/SPF). Don't teach them.
- **Why it's a security problem:** classic DNS is **unauthenticated and mostly plaintext** —
  whoever answers first, or whoever is on-path, can lie about the IP.

### TCP — enough to be right
- Handshake: SYN → SYN-ACK → ACK. Each side picks a random **initial sequence number**;
  everything after is counted from it, so bytes can be reordered and gaps detected.
- "Connection" is state held at both ends — there's no wire, just both sides agreeing to track
  the conversation. `ss -t` / `netstat` shows these as ESTABLISHED, TIME_WAIT, etc.
- **UDP:** no handshake, no ordering, no retransmit. DNS (small, one round trip), video/voice
  (a lost frame is better than a late one), games, QUIC.
- Ports recap from Day 3: the server listens on a known port; the client's source port is
  ephemeral, so the reply can be matched to the right connection.

### TLS — the shape, not the maths (maths is Day 5)
- Sits between TCP and HTTP: "HTTPS" = HTTP inside TLS inside TCP.
- Modern (TLS 1.3) handshake: client hello → server hello + **certificate** → keys agreed →
  encrypted from there. One round trip.
- The **certificate** is a signed statement: "the public key below belongs to `example.com`",
  signed by a **Certificate Authority** your browser already trusts. Day 5 covers signing.
- Gives: confidentiality, integrity, server identity. (Client identity only with mutual TLS —
  rare, don't raise it.)
- **Does not give:** a trustworthy operator, a secure application, protection of data at rest.
  Free CAs (Let's Encrypt) issue domain-validated certs in minutes — a padlock is trivial to
  get. Most phishing pages today are HTTPS (industry reporting has put it well above 80%).

### HTTP
- Request = request-line (`METHOD path HTTP/version`) + headers + blank line + optional body.
- Response = status-line (`HTTP/version code reason`) + headers + blank line + body.
- Status classes: 1xx info, 2xx success, 3xx redirect, 4xx client error, 5xx server error.
  Know 200, 301/302, 403, 404, 500.
- Headers to know: `Host` (which site, since one IP hosts many), `User-Agent`, `Cookie` /
  `Set-Cookie`, `Content-Type`, `Location` (with a 3xx), `Authorization`.
- **Stateless:** the server doesn't remember you between requests — the **cookie** is how
  "logged in" is carried. Whoever presents the session cookie is treated as that user. This is
  the hinge for the attack slide and for Day 16.

### The attacks (pair each with its fix on the slide)
- **DNS spoofing / cache poisoning:** answer with a wrong IP before the real server does, or
  poison a resolver's cache. Fix: DNSSEC (cryptographically signed records), DoH/DoT (encrypt
  the query so it can't be seen/edited on-path).
- **MITM on plain HTTP:** on-path attacker (same wifi, ARP spoof, rogue AP) reads and rewrites
  traffic. Fix: HTTPS + **HSTS** (server header telling the browser "only ever use HTTPS for
  me", so there's no plaintext first request to hijack).
- **Session hijacking:** steal the cookie via sniffing (plain HTTP), XSS (Day 16), or a
  shared machine. Fix: `Secure` (HTTPS-only), `HttpOnly` (JS can't read it), `SameSite`,
  short lifetimes, re-auth for sensitive actions.
- **Homograph / typosquat:** `paypaI.com`, `xn--` punycode domains. Fix: read the domain;
  password managers won't autofill the wrong one; the padlock is irrelevant.

---

## Demo runbook

### Hook + TCP + HTTP — `curl -v` (projector, reused 3×)
- `curl -v https://example.com`
- **Pre-flight:** confirm `curl` is present (Windows 10+ has it). Run once the night before;
  screenshot/record `assets/curl-v-demo.txt` / `.mp4`.
- Use it at three moments: the hook (don't decode), the TCP "do it now" (point at "Connected"),
  the HTTP section (point at `> GET` / `< HTTP/1.1 200`).

### `dig` / `nslookup` (student "do it now")
| Command | Expected |
|---|---|
| `dig github.com` | full output — `ANSWER SECTION` with an `A` record + TTL |
| `dig +short example.com` | just `93.184.216.34` (or current) |
| `dig +short google.com` ×3 | sometimes different IPs / order — anycast + load balancing |
| Windows `nslookup github.com` | "Non-authoritative answer" (= cached) + address |

Install: Linux `dnsutils`/`bind-utils`; Windows has `nslookup` built in (or `Resolve-DnsName`).

### HTTP by hand (student "do it now")
- Linux/mac: `printf 'GET / HTTP/1.1\r\nHost: example.com\r\nConnection: close\r\n\r\n' | ncat example.com 80`
  (`ncat` ships with Nmap; `nc` on many distros).
- Windows: `assets/http_by_hand.ps1` (pure PowerShell, no install).
- **Must be port 80.** Over 443 you get binary TLS noise — which is a fine teachable moment
  ("that's what 'encrypted' looks like"), but the readable exchange needs plain HTTP.
- Expected: `HTTP/1.1 200 OK` or `301 Moved Permanently` + `Location: https://...`. Reading a
  redirect is a good outcome — "the server is telling your browser to go do TLS."

### DevTools → Network (student "do it now", the payoff)
- Chrome/Firefox: **F12 → Network**, tick **Preserve log**, then log in to a personal account.
- Click the POST request to the login endpoint. Show: **Headers** (General: Request URL is
  https, Method POST; Request Headers: `Cookie`, `Host`; Response Headers: `Set-Cookie`,
  maybe `Location`).
- **Safety brief before they start:** don't screenshot real passwords for homework — blur the
  form fields / request body. We're looking at *headers*, not credentials.

### Failure modes
| Symptom | Fix |
|---|---|
| corporate DNS returns odd answers | expected on filtered networks; use `dig @1.1.1.1 github.com` |
| `ncat`/`nc` missing on Linux | `sudo apt install ncat` or use `/dev/tcp`: `exec 3<>/dev/tcp/example.com/80; printf ... >&3; cat <&3` |
| PowerShell script blocked | `powershell -ExecutionPolicy Bypass -File assets\http_by_hand.ps1` |
| DevTools Network empty | "Preserve log" not ticked, or they were already logged in — use an incognito window |
| school proxy does TLS interception | the cert issuer in DevTools shows the proxy, not a public CA — actually a great real-world example of "who can you trust" |

---

## Checkpoint (by end of class)

Each student can:
- [ ] put DNS, TCP, TLS, HTTP in order and say what each does
- [ ] read a raw HTTP request and name the method, path, and Host header
- [ ] state what the padlock guarantees **and** two things it does not
- [ ] point to the session cookie in their own DevTools login and explain why it matters

---

## Exit check (last 2 min)

1. Put in order: TLS handshake, DNS lookup, TCP handshake, HTTP GET. — *DNS → TCP → TLS → HTTP.*
2. A phishing site has a valid padlock. What does that padlock actually tell you? — *Only that
   the connection to that server is private and unmodified — nothing about whether the site is
   honest.*
3. An attacker copies your session cookie. What can they do? — *Act as you on that site
   without your password, until the session expires.*

---

## FAQ

- **"If DNS is so weak, why does anything work?"** Most attacks need the attacker on-path or
  able to answer faster than the real server; and DoH/DNSSEC are increasingly common. It's
  "weak by default, hardened where it matters."
- **"Is HTTP still used?"** Internally and for redirects, yes. Public sites are HTTPS; browsers
  now warn on plain HTTP forms.
- **"Does a VPN replace HTTPS?"** No. A VPN moves the trust boundary to the VPN provider; you
  still want end-to-end TLS to the actual server.
- **"Why does one site have several IPs?"** Load balancing / CDNs / anycast — many servers,
  one name.
- **"What's QUIC / HTTP/3?"** HTTP over UDP with TLS built in, fewer round trips. Same chain,
  reordered. Don't need it for this course.
- **"Can I see the SYN/SYN-ACK/ACK myself?"** Yes — in Wireshark, which is Day 13.
