# Demo Guide Standard v1.0
**Purpose:** Every teaching day gets a `prep/dayNN-demo-guide.md` built to this standard, so that (a) you rehearse before class and know exactly what will work, (b) when something *doesn't* work you already have the explanation ready, and (c) the demo is explicitly wired to the concept and to other days.

**Origin:** Extracted from `prep/day07-demo-guide.md`, which was written after a real failure during testing (the home-directory `750` problem). That accident produced the most valuable section in the file. This standard makes that section mandatory instead of accidental.

**Governing docs:** ADD §10 (7-file standard), §16 (Freeze Rule), Presentation-Design-Standard-v1.0. A demo guide is a **derived artifact** — like a deck. It never rewrites the lesson; it operationalises `instructor-guide.md` §6 (Demo Script).

---

## The core problem this solves

Your report: *"some features some things are not working some things are working, and when some things are not working I am not clear what to explain to the students."*

That is not a preparation-effort problem. It is a **missing failure model**. You know the happy path; you don't have a pre-written answer for the unhappy path. So the fix is not "rehearse harder" — it is **write the failure down before class, with its explanation, and make the explanation teach something**.

Every failure in a security demo is either:

| Failure class | What it means | What you say |
|---|---|---|
| **A — Environment** | Your machine differs from what the command expects (WSL vs Windows, missing package, no systemd) | "This is a platform difference, and it's a real thing you'll hit at work. Here's why." |
| **B — Permission** | The OS refused you | **This is a gift.** The demo just proved the lesson. Say so out loud. |
| **C — State** | Leftovers from a previous run (user exists, port in use, file present) | "I didn't clean up last time — watch, this is why cleanup is a security habit." |
| **D — Genuine mistake** | Typo, wrong path, wrong flag | Say "I typed that wrong" plainly, fix it, move on. Do not hide it. |

**Rule: never say "hmm, that should work."** Every command in your guide is pre-labelled with its class, so you always know which of the four you're in.

---

## Required sections of every demo guide

### 1. Header block
- Which deck/slides it syncs to
- Which machine the demo runs on: **Windows host (PowerShell)** or **WSL (Ubuntu)** — state it explicitly, because you have both and switching is the #1 source of confusion
- Setup line (font size, terminal, sudo availability)
- The metaphor thread being continued (never a new metaphor — ADD cross-lesson rule)

### 2. Pre-flight verification (NEW — the part Day 7 lacked)
Two artifacts, both required:

**(a) A copy-paste verify script** at `prep/verify/dayNN-check.sh` (WSL) or `.ps1` (Windows). Run it the morning of class. It prints `[OK]` / `[FAIL]` per dependency and exits non-zero if anything is broken. It must be *read-only* — it checks, it never installs or changes anything.

**(b) A rehearsal checklist** — a table you physically tick, with **expected output** for every single command. Not "run whoami" but "run `whoami` → expect a lowercase username, no domain slash." If your actual output differs from the expected column, you've found the problem *before* 18 students are watching.

### 3. Slide-by-slide Say / Do
- **Say:** what you explain while the slide is up, in speakable sentences (not bullet notes — you should be able to read it aloud)
- **Do:** the exact commands, in a fenced block, copy-pasteable
- Each `Do` block carries an **expected result** and a **failure class label** (A/B/C/D above)

### 4. Failure Playbook (mandatory, minimum 5 entries)
A table: `Symptom → Class → Why it happens → What you SAY to students → Fix`.

The "what you SAY" column is the point. It converts a live failure from an embarrassment into a teaching beat. Write it in the words you would actually use.

### 5. The Connection Script
Three lines you must say out loud during the session (ADD requires the connections; this makes sure they're spoken, not just implied):
- **Backward:** "This is <today> the same thing as <earlier day>, wearing a different label."
- **Forward:** "On Day <N> an attacker uses exactly this."
- **Career:** "This specific skill is what a <role> does on a Tuesday." ← *added per student feedback; see improvement plan*

### 6. Cleanup block
Every object you created gets destroyed on camera, with the security reasoning said out loud. Non-negotiable — it models the habit.

### 7. Timing budget
Minutes per demo segment, and a **cut line**: what you drop first if you're running late. Decide this in advance, not in the moment.

---

## The rehearsal protocol (how you "test yourself first")

Do this **the day before**, not an hour before. It takes 20–25 minutes.

| Step | Action | Pass condition |
|---|---|---|
| 1 | Run `prep/verify/dayNN-check.sh` (or `.ps1`) | Exits `0`, all `[OK]` |
| 2 | Open the demo guide. Run **every** `Do` block top to bottom, on the real demo machine | Every actual output matches the Expected column |
| 3 | Deliberately break one thing (e.g. run a command as the wrong user) and read your own Failure Playbook line aloud | You can explain it without improvising |
| 4 | Run the cleanup block | `verify` script passes again from a clean state — proves the demo is repeatable |
| 5 | Time yourself on the longest `Do` segment | Within the timing budget, or adjust the cut line |
| 6 | Say the three Connection Script lines out loud | You didn't need to read them |

**If step 2 fails on any line:** that's not a rehearsal failure, that's the rehearsal *working*. Add the symptom to the Failure Playbook with its explanation, then fix or route around it. The guide gets better every time you rehearse.

---

## Windows + WSL: the standing environment truth

You run **Windows host + WSL**. This combination causes a specific, repeating set of failures. Know these once and most of your "why isn't this working" moments disappear.

| Fact | Consequence for demos |
|---|---|
| WSL2 has **no systemd** by default on older installs | `systemctl start ...` fails. Use `service <name> start` instead, or enable systemd in `/etc/wsl.conf`. **Check this before any demo involving a service.** |
| WSL2 gets a **NAT'd virtual IP**, not your LAN IP | `ip addr` inside WSL shows something like `172.x.x.x` — *not* the address the router gave your laptop. Students comparing to their own machines get confused. Say it explicitly. |
| `localhost` forwards Windows→WSL, but **not reliably WSL→Windows** | A server started in WSL is reachable from the Windows browser; the reverse often isn't. |
| WSL can run **Windows executables** (`notepad.exe`, `ipconfig.exe`) | Genuinely useful teaching moment — but `ipconfig.exe` shows *Windows* networking, `ip addr` shows *WSL* networking. They disagree, and that's correct. |
| `/mnt/c/` is your Windows C: drive, mounted | Permissions on `/mnt/c` are **faked** — `chmod` appears to succeed but often doesn't stick. **Never demo permissions on `/mnt/c`.** This would have broken Day 7 badly. |
| WSL filesystem is fast; `/mnt/c` is slow | Keep all demo files in the Linux home or `/tmp` |
| GUI apps need WSLg (Win11) or an X server | Wireshark GUI on Day 13 — **verify early**, fall back to `tshark`/`tcpdump` CLI, or run Wireshark on the Windows host instead |
| PowerShell demos run on the **Windows host**, not in WSL | Day 8 is a Windows day. Different terminal, different window. Say which one you're in. |

**Turn this into pedagogy, not apology.** On Day 8 you will have both a WSL terminal and a PowerShell window open on the same laptop. That is the single best visual in the whole course for "two OSes solve the same problems in different dialects." Use it deliberately.

---

## File layout

```
prep/
  DEMO-GUIDE-STANDARD.md      ← this file
  day07-demo-guide.md         ← existing, retrofit to standard
  day08-demo-guide.md
  day09-demo-guide.md
  day11-demo-guide.md
  verify/
    day08-check.ps1
    day09-check.sh
    day11-check.sh
```

## Governance
A demo guide is derived from `instructor-guide.md` §6 and the deck. **Changing a demo guide is not a content change** and does not trip the Freeze Rule — you may improve demo guides freely for frozen weeks, because you are changing *how you deliver*, not *what is taught*. If a rehearsal reveals that the **lesson itself** is wrong (e.g. a lab step that cannot work on WSL), that *is* a content change: it's a correctness fix, which ADD §16 permits even while frozen — log it in that day's `version-history.md`.
