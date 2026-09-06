# 5 web vulns — find / prove / fix

*Day 16 artifact. One row per vuln class. Attach YOUR OWN screenshot of the proof from the lab.*
*Lab targets only (DVWA / Juice Shop on `<LAB_HOST>`, per the ROE).*

---

## 1. SQL Injection

| | |
|---|---|
| **Where** (app + field/param) | |
| **Find** — what told you it was injectable | (a `'` caused an error / different result) |
| **Prove** — the payload + what it got you | |
| **Evidence** | `screenshots/sqli-*.png` |
| **Fix** — one line | parameterized query: `db.execute("... WHERE x = ?", [x])` |

## 2. Cross-Site Scripting (XSS)

| | |
|---|---|
| **Type** (reflected / stored / DOM) | |
| **Where** | |
| **Find** — did `<b>test</b>` render bold? | |
| **Prove** — the payload; who it would hit | |
| **Evidence** | `screenshots/xss-*.png` |
| **Fix** | context-aware output encoding + CSP header + `HttpOnly` cookie |

## 3. Broken Access Control / IDOR

| | |
|---|---|
| **Where** — the ID/path/field you changed | |
| **Find** | (changed `id=1001` → `1002` and it loaded) |
| **Prove** — whose data you saw/changed | |
| **Evidence** | `screenshots/idor-*.png` |
| **Fix** | server-side check: does this user own this object? — on every request |

## 4. Broken Authentication / Session

| | |
|---|---|
| **The weakness** (no lockout / weak token / session not killed on logout / ...) | |
| **Find / Prove** | |
| **Evidence** | `screenshots/auth-*.png` |
| **Fix** | MFA + lockout/rate-limit + random tokens + `Secure`/`HttpOnly`/`SameSite` + invalidate on logout |

## 5. SSRF (or another Top-10 you found)

| | |
|---|---|
| **Where** — the URL/host field the app fetches | |
| **Find / Prove** — where you pointed it | |
| **Evidence** | `screenshots/ssrf-*.png` |
| **Fix** | destination allowlist; block internal IP ranges; no raw user URLs |

---

## The one pattern

All five: **untrusted input reached something powerful because it wasn't checked at the trust
boundary.** The fix is always structural (parameterize / encode / authorize / allowlist) — not
a blocklist of "bad" characters.
