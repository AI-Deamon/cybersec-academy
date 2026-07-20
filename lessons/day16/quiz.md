# Day 16 — Quiz (exit, 4 questions)
*Formative only — reinforces, doesn't punish.*

1. **SQL injection is best prevented by:**
   a) HTTPS
   b) Parameterized (prepared) queries that separate code from data
   c) A longer password
   d) Disabling the database
   **Answer: b**

2. **XSS happens when:**
   a) A server is down
   b) Untrusted input is echoed into a page without encoding, becoming script
   c) A port is open
   d) TLS is enabled
   **Answer: b**

3. **HTTPS (TLS) protects against:**
   a) SQL injection and XSS
   b) Eavesdropping in transit (C on the wire, Day 13) — NOT app-layer injection
   c) Weak passwords
   d) Open ports
   **Answer: b**

4. **Burp Suite, used in today's lab, is:**
   a) An exploit that breaks sites
   b) A proxy to intercept/modify HTTP in your authorized range, for testing
   c) A firewall
   d) A database
   **Answer: b**

---

## Optional extension (discussion)
5. Why doesn't HTTPS stop SQLi or XSS?
   **Model answer:** TLS protects data *in transit* (confidentiality on the wire, Day 13). SQLi/XSS are *application-layer* flaws in how the app handles input — a different layer entirely. Encryption can't fix a query that trusts user input.
