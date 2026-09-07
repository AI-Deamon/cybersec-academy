---
marp: true
theme: dark-monospace
paginate: true
title: "Day 4 — How a Web Page Actually Loads (keystone)"
footer: "Practical Cyber Security (v2) · Week 1 · Day 4"
---

<!-- _class: lead -->

# How a web page actually loads
## Day 4 — DNS · TCP · TLS · HTTP — the whole chain

**Week 1 · Building the foundation · the keystone day**

<!--
RUN SHEET (~84 min). THIS IS A TWO-PART DAY — it carries ~2 days of material. Treat it as such:

  PART 1 — the chain (DNS -> TCP -> TLS).           target: DONE by minute 40.
  PART 2 — HTTP + the attacks + DevTools.
  >>> MID-POINT GATE at minute 40: if TLS isn't finished, you are behind.
      Recovery: skip the netcat "do it now" and the render slide, compress HTTP request+response
      to ONE slide, go straight to the chain diagram -> attack<->defence (table only) -> DevTools.
      HTTP-by-hand and the full attack detail become homework/reading. DO NOT cut DevTools.

00:00 Journey check + hook (curl -v on the projector)          4   ┐
00:04 The chain — the 7 steps (the day's map)                  3   │
00:07 Step 1: DNS — names to numbers                           7   │ PART 1
00:14 DO: dig / nslookup                                       4   │ (DNS+TCP+TLS,
00:18 Step 2: TCP — the reliable phone call                    8   │  done by :40)
00:26 DO: watch the handshake in curl -v                       3   │
00:29 Step 3: TLS — locking the line + what it does NOT give   9   ┘
00:38 Step 4: HTTP — request slide + response slide           11   ┐
00:49 DO: hand-craft an HTTP request (netcat / ps1)            6   │ PART 2
00:55 Steps 5-6 render (1 line) + the chain diagram            3   │ (HTTP + attacks
00:58 Attack <-> defence                                       9   │  + DevTools)
01:07 DO: DevTools -> Network on a real login                  6   │
01:13 Wrap + homework                                          5   ┘
CUT FIRST IF SHORT: the render/repeat slide (say one sentence); the UDP line; the netcat "do
it now" (do a full read of curl -v instead); the "look-alike site" attack row.
NEVER CUT: the DNS->TCP->TLS->HTTP order, what TLS does NOT give, the chain diagram, DevTools.
ANALOGY (sanctioned): the PHONE CALL. DNS = asking the operator / directory for the number.
TCP handshake = "hello?… hello.… ok, go ahead." TLS = switching to a scrambler both ends share.
HTTP = the actual conversation.
-->

---

## Where we are

- **Day 3:** three addresses, packets, routing — how a message *gets there*.
- **Today:** the **rules** those packets follow to hold a conversation — and the full story of
  loading a web page. *(This story is Part A of your weekend assignment.)*
- **Tomorrow:** the locks on that conversation — cryptography.

<!--
Learning Journey Check. Flag loudly that today's "7-step story" is the assignment — they should
take notes with that in mind.
-->

---

## Hook — one command, every step

On the projector:  `curl -v https://example.com`

```
*   Trying <server-ip>:443...
* Connected to example.com (<server-ip>) port 443
* TLS handshake, ... (elided)
* SSL certificate verify ok.
> GET / HTTP/1.1
> Host: example.com
< HTTP/1.1 200 OK
```

Every line is a step. By the end of class you can name all of them.

<!--
The real output is longer; this is trimmed for the slide. The IP you see won't match any
number on a slide — sites move — so don't read a specific IP aloud.
Don't decode it yet. Just: "name lookup, then connect, then a lock, then a request, then a
reply." Those are the four sections of today.
-->


<!--
Don't decode it yet. Just: "name lookup, then connect, then a lock, then a request, then a
reply." Those are the four sections of today.
-->

---

## The chain — what "loading a page" really is

1. you **type the URL** and press Enter
2. **DNS** — turn `example.com` into an IP address
3. **TCP** — open a reliable connection to that IP on a port
4. **TLS** — lock the connection so nobody can read or tamper with it
5. **HTTP** — send the request, get the response
6. the browser **reads & renders** the response (HTML)
7. it **repeats** 2–6 for every image, script, stylesheet

<!--
This slide is the map for the whole day AND the shape of the assignment (7 steps). Put them on
the board and tick them off as you go. Every web attack later "lives" on one of these steps.
-->

---

## Step 1 — DNS: names to numbers

You remember `github.com`. Routers need `140.82.112.3`. **DNS** is the phone book.

Your device asks a **resolver**, which walks the tree:

```
  root servers   ->  "ask the .com servers"
  .com servers   ->  "ask github.com's servers"
  github's servers -> "140.82.112.3"
```

Answers are **cached** at every level for minutes–hours, so most lookups are instant.

<!--
Analogy: asking the operator for a number. First time it's a few hops; after that everyone
who asked recently has it memorised (cache).
Keep it to: resolver -> root -> TLD -> authoritative -> answer, plus caching. No record-type
zoo (A, AAAA, MX, TXT) beyond naming A = "name to IPv4".
-->

---

## Do it now — look up some names

```
dig github.com            (Windows: nslookup github.com)
dig +short example.com
dig +short google.com      run it 2-3 times
```

- The **A record** is the IPv4 answer (your numbers won't match anyone's slide — that's fine).
- Run `dig +short google.com` a few times — you may get **different IPs** each time (big sites
  answer from many servers).

<!--
2-3 min. On Windows nslookup output is chattier — the "Non-authoritative answer" is the cached
one. Point out TTL in `dig` full output = how long the answer may be cached.
-->

---

## Step 2 — TCP: the reliable phone call

IP just fires packets and hopes. **TCP** builds a reliable, ordered *connection* on top.

It opens with a **3-way handshake**:

```
  you  ── SYN ──────────▶  server     "can we talk?"
  you  ◀──── SYN-ACK ───   server     "yes — can you hear me?"
  you  ── ACK ──────────▶  server     "yes. go."
```

Then every chunk is numbered and acknowledged; lost chunks are re-sent.

<!--
Analogy: "hello?… hello, I can hear you.… great, go ahead." Only after that do you talk.
Contrast UDP in one line: no handshake, no re-sends — "shout it and hope." Used for DNS, video
calls, games, where speed beats perfection. CUT the UDP line first if short.
-->

---

## Do it now — see the handshake

`curl -v https://example.com` again — read the top two lines:

```
*   Trying <ip>:443...
* Connected to example.com (<ip>) port 443
```

"Connected" = the 3-way handshake just completed. Everything after happens *inside* that
connection.

<!--
1-2 min. If you ran Wireshark you'd see the literal SYN / SYN-ACK / ACK — that's Day 13. For
now curl's "Connected" line is the marker.
-->

---

## Step 3 — TLS: locking the line

After TCP connects, before any real data: a **TLS handshake**. It gives you three things:

| Guarantee | Meaning |
|---|---|
| **Confidentiality** | anyone watching the wire sees scrambled bytes |
| **Integrity** | if anything is altered in transit, both ends detect it |
| **Identity** | the server proves who it is with a **certificate** signed by a trusted authority |

The padlock = "these three hold for this connection."

<!--
Analogy: both ends switch on a scrambler only they can un-scramble; and the server shows ID
before you trust it. Certificate detail is Day 5 — today just "a trusted third party vouched
for this name."
-->

---

## What TLS does **not** give you

- **Not** "this site is honest." A phishing site gets a padlock in 2 minutes, free.
- **Not** "this server is secure." The app behind it can still be full of holes (Week 4).
- **Not** "your data is safe after it arrives." TLS protects the *pipe*, not the database.

**The padlock means the pipe is private — nothing more.**

<!--
THIS is the Day 4 trap and it's important. Students equate padlock = trustworthy. Say it twice.
Most phishing today is HTTPS. TLS answers "is anyone listening / tampering / is this the right
server" — never "should I trust this business."
-->

---

## Step 4 — HTTP: the actual request

Inside the locked connection, it's just **text**:

```
GET /login HTTP/1.1              <- method, path, version
Host: example.com               <- headers...
User-Agent: Firefox/123
Cookie: session=a1b2c3
                                <- blank line, then optional body
```

Methods: **GET** (fetch), **POST** (submit), also PUT/DELETE. The **path** is what you want.

<!--
It really is plain text — that's why hand-crafting it (next "do it now") works.
The Cookie header is the one to flag: it's how the server knows "this is the same logged-in
person" across requests. Remember it for the attack slide.
-->

---

## Step 4 — ...and the response

```
HTTP/1.1 200 OK                 <- status code
Content-Type: text/html
Set-Cookie: session=a1b2c3      <- server hands you a session
                                <- blank line
<!doctype html><html>...        <- the body: the page
```

Status codes: **2xx** ok · **3xx** go elsewhere · **4xx** you messed up (404, 403) ·
**5xx** the server messed up.

<!--
`Set-Cookie` on the response is the server saying "wear this badge on every future request."
That badge = the session. Whoever holds it IS you, to the server. Attack slide.
-->

---

## Do it now — be the browser

```
printf 'GET / HTTP/1.1\r\nHost: example.com\r\nConnection: close\r\n\r\n' \
  | ncat example.com 80
```

You just sent an HTTP request **by hand** and got the raw response. No browser. It's only text.

<!--
5 min. Windows: install ncat (part of Nmap) or use PowerShell:
  $c=[Net.Sockets.TcpClient]::new('example.com',80); ... (script in assets/http_by_hand.ps1)
This must be plain HTTP (port 80) — over 443 you'd get TLS binary garbage, which is the point:
"see? without the lock it's readable; with it, it's not."
Expected: a 200 or a 301 redirect to https. Reading a redirect is a fine outcome.
-->

---

## Steps 5–6 — read, then repeat

The browser parses the HTML, finds it needs `style.css`, `app.js`, `logo.png`...

**...and runs the whole chain again for each one.** One "page load" = dozens of these.

<!--
30 seconds. Just so "7 steps" doesn't feel too clean — a real page is the chain, fanned out.
CUT this slide first if short.
-->

---

## The whole chain — your assignment

<div class="callout remember"><span class="label">Write this up</span>
The 7-step story of loading <code>example.com</code> — from keypress to rendered page — in your
own words. DNS → TCP → TLS → HTTP request → response → render → repeat. This is <strong>Part A
of the weekend assignment.</strong></div>

<!--
Point at the board where the 6 steps have been ticked off all lesson. Tell them tonight's
homework is the first draft of this; Friday's briefing turns it into the full assignment.
-->

---

## Attack ↔ Defence

| Attack | What it is | Defence |
|---|---|---|
| **DNS spoofing** | feed you a wrong IP → you connect to the attacker's server | DNSSEC (signed answers), DNS-over-HTTPS |
| **MITM on plain HTTP** | on-path attacker reads/rewrites everything (Day 1!) | HTTPS everywhere; **HSTS** (browser refuses plain HTTP) |
| **Session cookie theft** | steal the `Cookie` value → become the logged-in user, no password | `Secure` + `HttpOnly` flags; short sessions; re-auth for sensitive actions |
| **Look-alike site** | `githiub.com` with a real padlock | you check the name; the padlock never vouches for honesty |

<!--
Tie together: the Day 1 sniff = MITM on plain HTTP. The cookie theft one lands hardest —
"the password isn't the crown jewel; the session is." forward-ref Day 16 (web attacks).
-->

---

## Do it now — watch a real login

Open a site you have an account on → **DevTools (F12) → Network** → log in.

Find the login request:
- Is it **HTTPS**? What **method** (POST)?
- Look at the **request headers** — find the `Cookie`, the `Host`.
- Look at the **response** — a `Set-Cookie`? A redirect (3xx)?

<!--
6 min, the payoff of the whole day — every concept, live, on a site they use.
Tell them NOT to paste passwords into the class chat / screenshots for homework — blur creds.
Chrome & Firefox both: F12 -> Network, tick "Preserve log", then log in.
-->

---

## Today's attack / defence / artifact

- **Attack:** get on the path (DNS spoof / MITM) and read or rewrite an unencrypted
  conversation — or steal the session cookie and skip the password entirely.
- **Defence:** HTTPS everywhere + HSTS; `Secure`/`HttpOnly` cookies; DNSSEC/DoH; check the name.
- **Artifact:** the 7-step "how example.com loads" story (draft) — Part A of the assignment.

---

## Homework

1. Write the **7-step story** of loading `example.com`, keypress → rendered page, in your own
   words. (This becomes Part A of the weekend assignment.)
2. From your DevTools login: screenshot the request line + headers with **credentials blurred**.
3. One sentence: **what does the padlock guarantee, and what does it not?**

<!--
Due start of Day 5. Day 5 (Friday) briefs the full weekend assignment.
-->

---

<!-- _class: lead -->

## Recap

1. **DNS → TCP → TLS → HTTP.** Name lookup, open the line, lock the line, have the conversation.
2. **The padlock means the pipe is private — not that the site is safe.**
3. **The session cookie is as good as your password** — whoever holds it is you.

<!--
Say the three lines. Tomorrow: how the lock actually works — hashing, keys, certificates —
and you'll crack a password hash yourself.
-->
