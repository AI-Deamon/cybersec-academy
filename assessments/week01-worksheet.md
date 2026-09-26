# Week 1 Worksheet — "The Website Story"
*Fill this in as you work. When every box is ticked, you have completed the assignment — this filled sheet is the draft you compile into your portfolio PDF.*
*Companion to `week01-assignment.md` (Portfolio Piece #1 · Guided · Days 1–4).*

**Name:** ________________________   **Date:** ____________   **Target tested:** `example.com`
**Word-count target for the Story (Part 1):** ~400–500 words.

---

## Part 0 — Ethics gate (Day 1) — do this first
- Target I am authorized to test: ________________________________________
- I am authorized because: _____________________________________________
- ☐ I confirm the rule: **"No permission = don't."** I am only testing my own machine / an allowed site.

---

## Part 1 — The Website Story
Write the story of loading `example.com` by walking the **7 steps** below (from the signature diagram). Fill the middle column *in your own words* — these lines become your ~400–500 word write-up.

| # | What happens (given) | In my own words | Layer / Day |
|---|----------------------|-----------------|-------------|
| 1 | You type `example.com` + Enter (you're authorized) | | Ethics · D1 |
| 2 | DNS resolves the name → IP address | | Network/Rules · D3–4 |
| 3 | TCP three-way handshake to port **443** (SYN / SYN-ACK / ACK) | | Rules · D4 |
| 4 | Browser sends HTTP GET **inside** the TLS-encrypted channel | | Rules · D4 |
| 5 | Server returns the HTML (encrypted in transit) | | Rules · D4 |
| 6 | Browser fetches assets (images / CSS / JS) — more requests | | Programs+Network · D2–3 |
| 7 | Page rendered & usable | | Programs · D2 |

**Layer weave-in checklist** — tick each once you've included it in the story:
- ☐ **Ethics (D1)** — you only load a site you're authorized to test.
- ☐ **Bits/bytes (D1)** — the page, request, and reply are all just bytes.
- ☐ **Programs (D2)** — the browser is a *process* using CPU/RAM and asking the OS to do the work.
- ☐ **Network (D3)** — packets addressed by IP/MAC/port (the postal system) + name the 3 failures: **eavesdropping, MITM, DoS**.
- ☐ **The rules (D4)** — DNS (name→IP), the TCP handshake, and the TLS envelope (contents hidden, destination IP still visible).

### "Is it safe?" — answer the manager's second question (Day 3 + Day 4)
Name **at least two** places this page-load could be attacked, and a defense for each:

| Attack point (where it can break) | Defense |
|-----------------------------------|---------|
| e.g. Unencrypted HTTP → eavesdropping | e.g. HTTPS / TLS |
| | |
| | |

---

## Part 2 — System observation (Day 2)
Open **Task Manager** (Windows) or **`htop`** (Linux/macOS) and find your browser process.
- Browser process name: ______________________
- **PID:** ____________   **Memory used:** ______________
- ☐ Screenshot of the process taken and captioned.

---

## Part 3 — Network observation — DevTools (Days 3–4) *(required)*
Open browser **DevTools → Network** tab, then load `example.com`.
- First request / DNS line (the HTML document): ______________________
- Resolved IP address (from the request or `nslookup`): ______________________
- Status code of the first request (e.g. 200): ____________
- ☐ **HTTPS / port 443** connection confirmed (the lock).
- ☐ Screenshot of the Network tab (DNS + HTTPS lines highlighted) taken and captioned.

---

## Part 4 — Optional bonus — Wireshark
*Only if you want to explore — this is a head start before Day 13. Not required.*
- ☐ Saw the **DNS query/response**.
- ☐ Saw the **SYN / SYN-ACK / ACK** to port 443.
- ☐ Screenshot taken.

---

## Part 5 — Reflection
1. Which layer or step was hardest to explain, and why?
   _______________________________________________________________________
2. What surprised you when you watched the requests load in DevTools (or in Wireshark, if you tried the bonus)?
   _______________________________________________________________________
3. How did the Day 1 ethics rule shape what you chose to test — and which "is it safe?" risk would worry you most in real life?
   _______________________________________________________________________

---

## Submission checklist (matches the Deliverables)
- ☐ 1-page written **"Website Story"** — follows the 7 steps **and** ends with the "is it safe?" section.
- ☐ Screenshot set (browser process + DevTools Network showing DNS/HTTPS) with brief captions.
- ☐ Everything combined into **one PDF** titled **"Week 1 — The Website Story."**
- ☐ Submitted **before Day 6** (next Monday's Session 1).

## Self-check against the rubric (optional — aim for 15–18 = portfolio-quality)
Score yourself 1–3 on each before submitting:

| Criterion | My score (1–3) |
|-----------|----------------|
| Layer integration (all 4 days, 7 steps in order) | |
| Safe tool use (authorized, ethics documented) | |
| System observation (PID/memory, labeled) | |
| Network observation (DNS + HTTPS 443) | |
| Security awareness ("is it safe?" — ≥2 attacks + defenses) | |
| Communication (clear to a non-technical reader) | |
| **Total (out of 18)** | |
