# Day 16 — Reference Sheet
*Keep — web is the #1 attack surface.*

- **Root cause:** untrusted input. SQLi = input into a query; XSS = input into a page.
- **Fixes:** SQLi → parameterized/prepared queries (+validation); XSS → output encoding (+CSP).
- **HTTPS ≠ injection protection** (different layer — Day 13 C-in-transit vs app-layer C/I).
- **Burp:** app-layer proxy (intercept/modify HTTP) in your range; Wireshark = wire-level.
- **OWASP Top 10:** a *map* of web risks → each maps to CIA + a defense. Learn to categorize.
- **Range only (Day 12):** attack Juice Shop only; reset after.

## Further reading
- OWASP Top 10 (latest). Juice Shop walkthroughs. Parameterized-query examples in your language.
- Day 17: same attack+defend pattern on the network. Day 18: secure coding in cloud/production.
