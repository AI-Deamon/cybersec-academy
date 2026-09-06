# Week 4 — Student Pack

*Practical Cyber Security (v2) · Week 4: Applying it, and choosing a direction*

The week you take what you can do and turn it into a direction — Red, Blue, or a wing. Same
course repo. Same lab, same ROE. **Test only the lab targets or your own machines.**

---

## Day 16 — Web exploitation

### Recap
- **Every web bug is the same bug:** untrusted input reached something powerful (a query, the
  page's HTML/JS, an auth check, a server-side request) because it wasn't checked at the
  **trust boundary** (Day 10).
- **OWASP Top 10** = the categories that actually cause breaches, refreshed ~every 4 years.
- **SQL Injection:** input is glued into a query string, so `'` breaks out and the rest is
  run as SQL. Login bypass (`' OR '1'='1' -- `), UNION extract
  (`' UNION SELECT user,password FROM users -- `), blind (true/false or time-based).
  **Fix: parameterized queries** — the query template and the values travel separately.
- **XSS:** input is put into the page and the browser runs it. **Reflected** (one victim, via
  a link) · **Stored** (saved, hits every viewer — worse) · **DOM** (client JS mishandles
  input). Real impact: **steal the session cookie** → become that user. **Fix:** context-aware
  **output encoding** + a **Content-Security-Policy** + **HttpOnly** cookies.
- **Broken Access Control / IDOR:** the app checks *authentication* (logged in?) but not
  *authorization* (allowed *this* record?). Change `id=1001` → `1002`. **Fix:** a server-side
  ownership check on **every** request.
- **Broken auth/session:** no lockout, weak/reusable tokens, session not killed on logout.
  **Fix:** MFA, rate-limit, random tokens, `Secure`/`HttpOnly`/`SameSite`, invalidate on logout.
- **SSRF:** you give the app a URL, it fetches it server-side → point it at `localhost` or the
  cloud metadata service. **Fix:** destination allowlist, block internal ranges.
- **Filtering `'` / `<` / `script` does NOT fix injection or XSS.** The fix is structural
  (parameterize / encode), which makes it *impossible*, not *harder*. A **WAF** is a layer,
  not the fix.

### Key terms
`OWASP Top 10` · `SQL injection` · `parameterized query / prepared statement` · `UNION` ·
`blind SQLi` · `XSS (reflected / stored / DOM)` · `output encoding` · `CSP` · `HttpOnly` ·
`IDOR` · `authentication vs authorization` · `broken access control` · `session fixation` ·
`SSRF` · `cloud metadata` · `WAF` · `Burp Suite`

### In class — the 3 beats
1. **SQLi** in DVWA — login bypass + `UNION SELECT user,password FROM users`; then bump DVWA to
   *Medium* and see filtering isn't the fix.
2. **Stored XSS** — `<script>alert(document.cookie)</script>` in a saved field; reload → it fires.
3. **IDOR** in Juice Shop — change `/rest/basket/<id>` in the API call → another user's basket.

### Homework (due start of Day 17)
1. Complete `day16/web-vulns.md` — the **find / prove / fix** table for **all 5** vuln classes,
   each with your own proof screenshot from the lab. Commit it.
2. Write the **one-line code fix** for SQLi (parameterized query) and XSS (output encoding) in
   any language.
3. `assets/vuln-code.md` — rewrite both vulnerable snippets safely.
4. Add the key terms above to your glossary.

### Marking checklist (Day 16 homework, 6 marks)
- [ ] find/prove/fix table: all 5 classes, each with a **valid** find + prove + structural fix (3)
- [ ] proof screenshots present for at least SQLi, XSS, IDOR (2)
- [ ] `vuln-code.md` both snippets rewritten correctly (parameterize / encode) (1)

---

## Day 17 — *(to be added)*
## Day 18 — *(to be added)*
## Day 19 — *(to be added)*
## Day 20 — *(to be added)*

---

## Weekend Assignment — Week 4 (the capstone)

*Briefed at the end of Day 20. A cross-domain find-and-fix (web + infra) + an IR scenario walk-through
+ your career roadmap ("which door and why" + the next 3 steps). Full spec added on Day 20.*
