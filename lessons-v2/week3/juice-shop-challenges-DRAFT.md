# Week 3 — Juice Shop challenges (DRAFT for review)

Status: DRAFT. Not yet merged into the Day 11–15 files. Source: the OWASP "Pwning Juice Shop" solutions
appendix (scraped 2026-10-05), checked against the challenge list served by the lab's own Juice Shop
(`http://10.89.1.30:3000/api/Challenges`, 116 challenges).

**Instructor-only below the student lines.** Student pages get the challenge name + the one-line task only.
Solutions stay in teacher notes. The appendix writes `localhost:3000`; in our lab use `http://10.89.1.30:3000`.

## Verification result

| Appendix title | Lab name | ★ | Category | Status |
|---|---|---|---|---|
| Let us redirect you to one of our crypto currency addresses | Outdated Allowlist | 1 | Unvalidated Redirects | OK |
| Perform a DOM XSS attack | DOM XSS | 1 | XSS | OK |
| Read our privacy policy | Privacy Policy | 1 | Miscellaneous | OK |
| Behave like any "white hat" should… | Security Policy | 2 | Security Misconfiguration | OK (lab lists it as ★2, not in the lab under its appendix name) |
| Find the carefully hidden 'Score Board' page | Score Board | 1 | Miscellaneous | OK |
| Access a confidential document | Confidential Document | 1 | Sensitive Data Exposure | OK |
| Find the endpoint that serves usage data… | Exposed Metrics | 1 | Observability Failures | OK |
| Provoke an error that is neither very gracefully… | Error Handling | 1 | Security Misconfiguration | OK |
| Inform the shop about an algorithm or library… | Weird Crypto | 2 | Cryptographic Issues | OK |
| Use a deprecated B2B interface… | Deprecated Interface | 2 | Security Misconfiguration | OK, fiddly (see Day 14) |
| Access the misplaced Infrastructure as Code files | Misplaced IaC Files | 2 | Security Misconfiguration | **DROPPED** — the appendix has no solution ("Work in progress") |

Caveat: I confirmed these exist and have the expected difficulty. I did **not** run each solution against the
lab. Do a 10-minute dry run of the 10 steps below before class (all are click-or-URL steps).

---

## Day 11 — Attacks & malware (phishing / link tricks)

**Student task (10 min, after the phishing hook):** "Find the DOM XSS" and "Outdated Allowlist". Idea to land:
*a link that starts on a trusted site can still end up somewhere else, or run code in your browser.*

**Teacher solution**
- **DOM XSS (★1):** paste `<iframe src="javascript:alert('xss')">` into the Search box, press Enter. An alert
  appears. Point out: the *search term* became code. Same family as a malicious link in a phishing email.
- **Outdated Allowlist (★1):** log in with any user → Basket → expand the Payment/Merchandise section (credit-card
  button). The donation links all go through `/redirect?to=<url>`. In DevTools open `main.js`, search
  `/redirect?to=`; three functions are only used by hidden buttons. Open one, e.g.
  `http://10.89.1.30:3000/redirect?to=https://blockchain.info/address/1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm`.
  Point out: the site's own domain bounces you to an address the attacker picks. Why phishers love this.
- **Defence (ADD rule: offensive topic pairs with a fix):** allowlist exact destinations; encode output; never
  put user input into a page as code.

## Day 12 — Lifecycle & rules of engagement

**Student task (5 min):** "Read our privacy policy" and "Security Policy". Idea: *before you touch anything,
find out what the owner allows.* Neither one is an exploit.

**Teacher solution**
- **Privacy Policy (★1):** log in → profile-picture menu → *Privacy & Security* → *Privacy Policy*
  (`/#/privacy-security/privacy-policy`). Visiting it solves it.
- **Security Policy (★2):** request `http://10.89.1.30:3000/.well-known/security.txt` (or `/security.txt`). It
  names a contact and the disclosure rules. Tie to scope/ROE: a real target publishes this file; ours is the lab,
  where scope = the lab hosts only.

## Day 13 — Recon & scanning (find, don't break)

**Student task (15 min, extends the existing bonus step):** "Score Board", "Confidential Document",
"Exposed Metrics", "Error Handling". Idea: *recon finds things nobody linked to.*

**Teacher solution**
- **Score Board (★1):** DevTools → Sources → `main.js` → pretty-print (`{}`), search `score`, find the route
  mapping, open `http://10.89.1.30:3000/#/score-board`. A *Score Board* menu item then appears — students can
  track progress from here for the rest of the course.
- **Confidential Document (★1):** About Us has a link to `/ftp/legal.md`. Trim the URL to `/ftp` (directory
  listing), then open `/ftp/acquisitions.md`. Link to Nikto/ZAP: a scanner finds `/ftp` the same way.
- **Exposed Metrics (★1):** open `http://10.89.1.30:3000/metrics` (Prometheus' default path). Monitoring data
  open to anyone.
- **Error Handling (★1):** open `/rest/qwertz` (stack trace page), or log in with a single quote `'` as the
  email. The error leaks internals. Sets up Day 16's SQL injection without teaching it yet.
- Fits the Day 13 tool map: the same findings should show in Nmap `http-enum`, Nikto, and ZAP.

## Day 14 — Vulnerability assessment (rate it, don't just find it)

**Student task (15 min):** "Weird Crypto" and "Deprecated Interface"; then write each as a finding using the
Day 14 findings-table template (title, evidence, severity, fix). Idea: *a finding is evidence + severity + fix.*

**Teacher solution**
- **Weird Crypto (★2):** `http://10.89.1.30:3000/#/contact`, submit feedback whose comment contains one of
  `z85`, `base85`, `base64`, `md5`, `hashid`. Teaching point: the app uses weak/misused crypto (unsalted MD5
  password hashes, Base64 passwords). Good severity-rating discussion: low *exploitability* here, but what is the
  *impact* if the database leaks?
- **Deprecated Interface (★2) — teacher demo or strong students only:** log in → Contact Us → *Complain?* →
  invoice upload. UI allows only PDF/ZIP; `main.js` (search `zip`) shows `allowedMimeType` also contains
  `application/xml` and `text/xml`. In the file picker enter `*.xml`, select any XML file under 100 KB, add a
  message, submit. Console shows `410 (Gone)`: "B2B customer complaints via file upload have been deprecated".
  Teaching point: the client hid an old interface instead of removing it server-side.

## Day 15 — Practice day

Open question for you (see message): replay the Day 11–14 set as a timed team run, or draw fresh challenges?
Either way: reset the Juice Shop first (`sudo podman restart juiceshop`) so every team starts at 0 on the Score
Board, and have each team submit findings in the Day 14 template, not just a solved count.

## Pitfalls to tell students

- Juice Shop wipes its solved-challenge progress on restart. Take the Score Board screenshot before closing.
- Everything runs only against `10.89.1.30:3000` (scope = our lab).
- Where Windows ZAP/Burp is used, the lab route must be present (see LAB-SETUP.md).

## Files this would touch if approved

`day11..day15/teacher-notes.md` (solutions), `week3/student-pack.md` (names + tasks only),
`day11/day11.md`..`day15/day15.md` (one slide/step each, then regenerate html/pptx),
`CHANGELOG.md` (entry), delete this draft.
