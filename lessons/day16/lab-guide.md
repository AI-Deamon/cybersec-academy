# Day 16 — Lab Guide
**Goal:** Inside your Day 12 range, use the purposely-vulnerable app (OWASP Juice Shop) to **demonstrate SQL injection and XSS**, then state the defensive fix. Burp/DevTools let you see and modify the request.

**Prerequisites:** Your safe range with Juice Shop running (authorized + isolated). Burp Suite provisioned (ADD tool list). **Only attack the range's Juice Shop.**

---

## Task 1 — Find an untrusted input (5 min)
1. Open Juice Shop in the range browser. Identify a user-controlled field (e.g., the login email/password, or a review/comment box).
2. Note: anything you type there is **untrusted input** the app acts on.

## Task 2 — Demonstrate SQL injection (login bypass) (9 min)
1. Proxy the browser through Burp (instructor sets this up) — or simply use the login field directly in range.
2. In the email or password field, enter: `' OR '1'='1` (with a matching/any password, depending on the field).
3. Observe: you may bypass authentication. That's SQLi — your input became SQL, not data.
4. Write the **fix**: a parameterized/prepared query so the DB never treats your input as code.

## Task 3 — Demonstrate XSS (7 min)
1. Find a field that echoes your input back into a page (e.g., a review/comment).
2. Enter: `<script>alert('xss')</script>` (or a benign variant your instructor approves).
3. Observe: the script runs in the page context. That's XSS — untrusted input became HTML/JS.
4. Write the **fix**: output encoding (treat the value as text, never markup) + a Content-Security-Policy.

## Task 4 — (Cleanup) Restore the range (2 min)
Reset Juice Shop to its clean state (Day 12 methodology step 7 — restore). The range stays reusable for later days.

---

## ✅ Checkpoint (show instructor before leaving)
- [ ] Identified an untrusted input in Juice Shop
- [ ] Demonstrated SQLi (or clearly described it) + stated the parameterized-query fix
- [ ] Demonstrated XSS (or clearly described it) + stated the encoding fix
- [ ] Reset the lab

## Troubleshooting
- *Burp not intercepting:* confirm the browser proxy points to Burp's listener (instructor setup). DevTools alone can still show requests if proxying fails.
- *SQLi "doesn't work":* Juice Shop versions differ; the login or a search field is the usual spot — ask the instructor which field is vulnerable in your image.
- *Wrong target:* stop — you must only use the range's Juice Shop (Day 12 scope). Never test external sites.

> ⚠️ **Ethics + scope (Day 1/12):** attack **only** the range's Juice Shop. Demonstrating these flaws in your authorized lab is legal and educational; doing it anywhere else is not. Reset the lab when done.
