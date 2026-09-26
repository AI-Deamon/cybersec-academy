# Week 4 — Formative Quiz

*10 questions. The capstone assumes this. This is also good self-check before you choose a direction.*

---

**1.** What is the one pattern behind SQLi, XSS, IDOR, and SSRF?
- A. they all need a login
- B. they all only affect old software
- C. untrusted input reached something powerful without a check at the trust boundary
- D. they are all fixed by a WAF

**2.** The structural fix for SQL injection is:
- A. a blocklist of `'`, `--`, and `;`
- B. escaping every quote
- C. parameterized queries / prepared statements — the query template and the values travel
  separately
- D. a Web Application Firewall

**3.** An app checks that you're **logged in** before showing `/invoice?id=42`, but changing
it to `id=41` shows someone else's invoice. What's missing?
- A. HTTPS
- B. a server-side **authorization** check that the logged-in user owns invoice 41
- C. a stronger password policy
- D. input validation

**4.** After an attacker gets a shell as a low-privilege user, "privilege escalation" usually
comes from:
- A. brute-forcing the root password
- B. something powerful (a SUID binary, a sudo rule, a root-run script) trusting something the
  attacker controls
- C. a kernel exploit, always
- D. social engineering the admin

**5.** In the cloud shared-responsibility model, which is **always** the customer's job?
- A. patching the hypervisor
- B. physical data-centre security
- C. identity/access configuration and the data itself
- D. the network backbone

**6.** An S3 bucket policy contains `"Principal": "*"`. Who can read it?
- A. only the bucket owner
- B. only authenticated AWS accounts
- C. anyone on the internet, with no credentials
- D. only users in the same AWS region

**7.** Why can't prompt injection be "patched" the way SQL injection was?
- A. LLM vendors haven't tried
- B. an LLM has no separation between its instructions and its data — they share one text
  channel by design
- C. it only affects paid models
- D. it will be fixed in the next model version

**8.** Which is the more dangerous form of prompt injection?
- A. a user typing "ignore your rules" into the chat box (direct)
- B. a hidden instruction planted in a document the model reads, when the model has tools it
  can be told to misuse (indirect)
- C. asking the model to write a poem
- D. they are equally dangerous

**9.** An attacker changes their C2 IP after every victim. Which is more durable to detect —
the IP address (an IOC) or "the malware beacons every ~10 minutes" (a TTP)?
- A. the IP — it's a hard fact
- B. the TTP — the attacker can't easily change *how* they operate
- C. neither is detectable
- D. the IP, because TTPs aren't logged

**10.** You confirm a server is compromised and actively beaconing out. Your **first** move
is:
- A. pull the power cable
- B. delete the malware files
- C. network-isolate the host (keep it running for memory/evidence), then disable the account
  and block the C2
- D. reboot it

---

## ANSWER KEY

1: C · 2: C · 3: B · 4: B · 5: C · 6: C · 7: B · 8: B · 9: B · 10: C

**Rationale:**
- **1** — this is the through-line of the whole course.
- **4** — the same pattern as every access-control failure: a trusted thing relying on
  something you can influence.
- **7** — system prompt, user turn, and retrieved documents are all concatenated into one
  token stream; "instructions" are just text the model weights heavily, and better text can
  outweigh them.
- **10** — "isolate, don't obliterate." Power-off destroys volatile evidence and tips the
  attacker; it's justified only when data is being destroyed *right now*.
