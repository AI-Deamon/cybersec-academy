# Day 11 — Explain + Demo Walkthrough
**CIA Triad · Threats / Vulnerabilities / Risk · The Untrusted-Input Model**

Built to `prep/DEMO-GUIDE-STANDARD.md`. **Say** / **Do** / **Expect** / failure class (A=environment, B=permission, C=state, D=typo).

---

## ⚠️ Read this first — why this day needs a demo guide at all

Day 11 is the most **abstract** day in the course. The lab is explicitly a paper exercise ("this lab builds judgment, not muscle"), and the instructor guide's demos are whiteboard talk.

That is a real risk. In your student survey the single loudest, most repeated request was **more practical, hands-on, real-world work** — and a paper-only session right after two hands-on OS days is exactly where a student writes "3/5" and "pace too slow."

**This guide does not change what Day 11 teaches.** The concepts, the CIA triad, the risk model, the untrusted-input question — all unchanged. What it adds is *visible proof* for each abstract idea: two small, safe, self-contained scripts that make integrity and untrusted input something students **watch happen** rather than something they're told about. Judgment is still the goal; the demo is how the judgment gets earned.

---

## Header

| | |
|---|---|
| **Runs on** | **WSL (Ubuntu).** Python 3 with the standard library only — `sqlite3` and `hashlib` are built in. **Nothing to install.** |
| **Network** | **None.** Everything is in-memory. No server, no internet, no target. This matters: you are teaching attack *concepts* on Day 11 and the ethics rule is still in force. |
| **Privilege** | Standard user. No `sudo` anywhere today. |
| **Setup** | Font 20+. Work in `~/day11demo`. Have the paper worksheet ready to hand out immediately after. |
| **Metaphor thread** | Restaurant → Computer, continued. CIA = *the safe* (Confidentiality), *the recipe book* (Integrity), *the doors being open* (Availability). **No new metaphors.** |
| **Timing** | 20 min demo, inside segment F/G |

---

## Pre-flight (the day before)

```bash
bash prep/verify/day11-check.sh
```

| # | Command | Expected | ✓ |
|---|---|---|---|
| 1 | `python3 -c "import sqlite3, hashlib; print('ok')"` | `ok` | ☐ |
| 2 | `python3 integrity_demo.py` | two lines, **completely different** hashes | ☐ |
| 3 | `python3 login_demo.py` | attacker query returns **all three users incl. admin** | ☐ |
| 4 | `python3 login_fixed.py` | attacker query returns **`[]`** | ☐ |
| 5 | Say the `' OR '1'='1` line aloud without looking | fluent | ☐ |
| 6 | `rm -rf ~/day11demo` then re-run verify | clean | ☐ |

**Rehearse saying the injection string out loud.** `' OR '1'='1` is awkward to say — practise it: *"quote, space, O-R, space, one, equals, one"*. Fumbling it live undercuts the moment.

---

## Before Slide 1 — Opening Hook (2 min)

**Say:** "Ten days. Let's name what you can now actually do. You know what a computer is made of, how programs become processes, how a network moves them, and how two different operating systems decide *who may do what*. That's real. Most people never learn it.

But here's the thing — **not one of those days told you what 'secure' means.** You've been learning the machine. Today we learn the judgment: what are we actually protecting, how do we decide what's worth worrying about, and what is the single question that catches most attacks before they exist.

Fair warning: today is the most thinking-heavy day of the twenty. So I'm not going to just tell you these ideas — I'm going to show you two of them running, on this screen, in the next twenty minutes."

---

## Slide — The CIA Triad

**Say:** "Three letters, and they are the whole definition of security. Everything else in this course is a technique for defending one of them.

**C — Confidentiality.** Only the right people can *read* it.
**I — Integrity.** Only the right people can *change* it, and you can *tell* if someone did.
**A — Availability.** The right people can actually *get to it* when they need it.

Take your email. Confidentiality: only you read your mail. Integrity: only you send mail as you. Availability: you can log in. Now — which letter breaks if your password leaks?" *(C.)* "If someone forges your address?" *(I.)* "If the server's down?" *(A.)*

**Say (the part people skip):** "And notice they fight each other. The most confidential server in the world is one that's switched off and encased in concrete — perfect C, zero A. Every security decision you will ever make is a trade between these three. There is no 'just make it secure.'"

### Do — make Integrity visible (4 min)

**Say:** "Confidentiality and Availability are easy to picture — locked, or switched off. Integrity is the slippery one, so let's watch it."

```bash
mkdir -p ~/day11demo && cd ~/day11demo
nano integrity_demo.py
```
```python
import hashlib

original = "Transfer 100 USD to Bob"
tampered = "Transfer 900 USD to Bob"

for label, msg in (("original", original), ("tampered", tampered)):
    digest = hashlib.sha256(msg.encode()).hexdigest()
    print(f"{label:9} | {msg:26} | sha256={digest[:16]}")
```
```bash
python3 integrity_demo.py
```
**Expect (verified):**
```
original  | Transfer 100 USD to Bob    | sha256=4f82e51e40901388
tampered  | Transfer 900 USD to Bob    | sha256=e0f22aa5323b617b
```
**Failure class:** D (indentation/quotes).

**Say — point at the two hashes:** "One character changed. A `1` became a `9`. Look at the fingerprints — not *similar*, **completely different.** Nothing about the second hash hints that it's nearly the same message.

That's integrity, mechanically. A hash is a fingerprint of content. Store the fingerprint, and later you can prove whether one character moved. You cannot *prevent* tampering this way — but you can always **detect** it, and detection is what integrity actually means.

This is why downloads publish a checksum. It's why Day 19's evidence handling depends on hashing — if you can't prove a log file wasn't edited, it isn't evidence. Same three lines you just watched."

---

## Slide — Threat, Vulnerability, Risk

**Say:** "Three words people use interchangeably and shouldn't. Get these straight and you can talk to a security team.

**Threat** — who or what might hurt you. Ransomware crew. A careless employee. A flood.
**Vulnerability** — the weakness they'd use. Unpatched server. Password on a sticky note. Server in the basement.
**Risk** — what you actually get when those meet, weighted by how bad it'd be. Roughly: *likelihood × impact.*

The reason this matters: **a threat with no matching vulnerability is not a risk.** Ransomware crews exist whether or not you're vulnerable to them. You don't get to remove threats — you only get to remove vulnerabilities. That's where all your effort goes."

**Say — the four responses, on a real example:** "Password on a sticky note. Threat: anyone walking past. Vulnerability: it's written down. Impact: full account takeover. That's high risk. Four things you may do, and only four:

**Mitigate** — password manager, MFA. Reduce it.
**Transfer** — insurance, or an outsourced provider. Someone else carries it.
**Avoid** — stop doing the risky thing entirely.
**Accept** — decide it's small enough and *write down that you decided.*

Accept is a legitimate professional answer. Ignoring is not. The difference is the writing down."

---

## Slide — The Untrusted-Input Question — **the main event, 10 min**

**Say (before typing):** "This is the most valuable single idea in the course, and I want to prove that claim rather than assert it.

Here it is: **any data that came from outside your program is untrusted until you check it.** That's it. Typed in a box, arrived over the network, read from a file somebody else can write to — untrusted.

Most of the famous attack names you've heard — SQL injection, cross-site scripting, path traversal — are all one mistake: a program *trusted input it should have checked.* Different clothing, same mistake. Watch."

### Do — part 1: the vulnerable login

```bash
nano login_demo.py
```
```python
import sqlite3

db = sqlite3.connect(":memory:")
db.executescript("""
CREATE TABLE users (name TEXT, role TEXT);
INSERT INTO users VALUES ('alice','user'), ('bob','user'), ('admin','ADMIN');
""")

def login_UNSAFE(name):
    q = "SELECT name, role FROM users WHERE name = '" + name + "'"
    print("  SQL sent :", q)
    return db.execute(q).fetchall()

print("=== Normal user types their name ===")
print("  Result   :", login_UNSAFE("alice"))
print()
print("=== Attacker types:  ' OR '1'='1 ===")
print("  Result   :", login_UNSAFE("' OR '1'='1"))
```
```bash
python3 login_demo.py
```
**Expect (verified):**
```
=== Normal user types their name ===
  SQL sent : SELECT name, role FROM users WHERE name = 'alice'
  Result   : [('alice', 'user')]

=== Attacker types:  ' OR '1'='1 ===
  SQL sent : SELECT name, role FROM users WHERE name = '' OR '1'='1'
  Result   : [('alice', 'user'), ('bob', 'user'), ('admin', 'ADMIN')]
```
**Failure class:** D. Note this database lives **in memory** — nothing is written to disk, nothing is on a network.

**Say — walk it slowly, this is the moment:** "Top half: Alice types her name, gets her own row. Exactly right.

Bottom half. The attacker didn't type a name — they typed **`' OR '1'='1`**. And look at the line that says *SQL sent*, because that's the whole lesson:

`WHERE name = '' OR '1'='1'`

The program glued the attacker's text straight into its own instruction. That closing quote ended the name early, and everything after it stopped being *data* and started being **command**. And `'1'='1'` is always true — so the condition matches every row.

Result: the entire user table. Including **admin**. No password was cracked. Nothing was brute-forced. The program was simply *asked politely*, in a language it was too trusting to distinguish from data.

That's SQL injection. It has been in the top ten web vulnerabilities for over twenty years, and it is *this*."

### Do — part 2: the fix

**Say:** "Now — how much code do you think fixes it?"

```bash
nano login_fixed.py
```
```python
import sqlite3

db = sqlite3.connect(":memory:")
db.executescript("""
CREATE TABLE users (name TEXT, role TEXT);
INSERT INTO users VALUES ('alice','user'), ('bob','user'), ('admin','ADMIN');
""")

def login_SAFE(name):
    q = "SELECT name, role FROM users WHERE name = ?"
    return db.execute(q, (name,)).fetchall()

print("Normal   :", login_SAFE("alice"))
print("Attack   :", login_SAFE("' OR '1'='1"))
```
```bash
python3 login_fixed.py
```
**Expect (verified):**
```
Normal   : [('alice', 'user')]
Attack   : []
```

**Say:** "Empty. The same attack string, and it found nothing — because now it's being treated as what it always was: **somebody's name.** There is genuinely no user called `' OR '1'='1`, so the answer is correctly nothing.

What changed? One character. A `?` instead of glued-together text. That `?` tells the database: *here comes data, and data is all it will ever be.* The instruction was written first and locked; the input can no longer reach in and rewrite it.

This is called a parameterised query, and I want you to notice the shape of the fix, because it repeats everywhere in this course: **separate the instruction from the data.** That's it. That's the pattern."

**Say — the honest framing:** "One more thing, and I mean this seriously. You just watched an attack work. That is deliberate, and it's the only responsible way to teach a defence — you cannot defend what you've never seen. But it happened in a database that existed for one second inside this laptop's memory, with three fake users, on no network.

That is the boundary. Day 1's ethics rule hasn't loosened because you know more; it matters *more* now. Understanding an attack and running one against a system you don't own are separated by exactly one decision, and that decision is yours."

---

## Slide — The forensic habit (today's version)

**Say:** "Days 6 through 9 the question was *as WHICH identity, with WHICH rights?* Today you get the second question, and you'll carry both to Day 20:

**Where did this data come from, and who checked it?**

Ask it about every input in every system you look at. When you get to Day 16 and meet OWASP's list, you'll find most of it is this question, unanswered."

### Do — cleanup
```bash
cd ~ && rm -rf ~/day11demo && echo "day11demo removed"
```

---

## Slide — Hand off to the paper lab

**Say:** "Now the worksheet — and it's paper on purpose. Today's skill is judgment, and judgment is trained by *classifying*, not by typing.

Three tasks. Five scenarios, tag each C, I or A. Pick one and write its threat, vulnerability, impact, and which of the four responses you'd choose. Then three snippets — name the untrusted input and the check that's missing.

You've just watched the third one happen for real, so you know what you're looking for. Go."

---

## Failure Playbook

| Symptom | Class | Why | **What you SAY** | Fix |
|---|---|---|---|---|
| **A1** `python3: command not found` | A | Not installed | "Not installed on this box — same lesson as Day 9: never assume a tool exists." | `sudo apt install -y python3` — **before class** |
| **A2** `ModuleNotFoundError: sqlite3` | A | Rare stripped build | "This build was compiled without SQLite. Genuinely rare — let me show the SQL on the board instead; the idea doesn't need the database." | `sudo apt install -y libsqlite3-dev python3` or whiteboard the two queries |
| **D1** `IndentationError` | D | Whitespace | "Python counting my spaces again — Day 9's number-one error, still true." | Spaces only, 4 per level |
| **D2** Injection returns 1 row instead of 3 | D | The attack string got mangled — usually a smart-quote from copy-paste | "My quote character got autocorrected — and honestly that's *very* on-topic: the exact character matters, which is precisely why the parser is so easy to trick." | Retype `' OR '1'='1` by hand with plain ASCII quotes |
| **D3** `sqlite3.OperationalError: unrecognized token` | D | Quote imbalance in the f-string/concatenation | "I've broken my own SQL — which, funnily enough, is what the attacker is doing on purpose." | Retype the `login_UNSAFE` line |
| **C1** `~/day11demo` exists from rehearsal | C | Not cleaned | "Rehearsal leftovers — hence cleanup on camera." | `rm -rf ~/day11demo` |
| **A3** Hashes look similar to students at the back | A | Font too small / truncation | "Let me make that bigger — the point is that they're *nothing* alike." | Increase font; the `[:16]` slice already shortens them |
| **A4** Wrong window (PowerShell) | A | Two-terminal habit from Day 8 | "Wrong window — Day 8 hangover." | Switch to WSL |
| **B1** Student asks "can I try this on a real website?" | — | **Expected, and important** | "No — and I want to answer that properly rather than just say no. Doing this to a system you don't own is a crime in most countries, including against a site that turns out to be vulnerable. On Day 12 I give you a lab you *do* own, and then you may attack it as hard as you like. Wait four days." | Point to Day 12 |

---

## The Connection Script — say all three

- **Backward:** "Day 7 and 8: the OS decides *who may do what*. Today: even a correctly-permissioned program can be talked into misbehaving — because permission and *trust of input* are two different defences, and you need both."
- **Forward:** "Day 12 builds you a legal lab. Day 13 you'll watch traffic carrying inputs like these. Day 16 is OWASP — and you've already seen its most famous entry. Day 19, hashing shows up again as evidence integrity."
- **Career:** "Reading code and asking 'where's the unchecked input?' is what an **application security engineer** does all day. Classifying risk and choosing mitigate-versus-accept is what a **GRC / risk analyst** does. Both are Blue Team. And the person who *finds* the injection is a **penetration tester** — Red Team. Same knowledge, three jobs. Today's session is where those paths visibly separate, so pay attention to which half of this hour you enjoyed more."

---

## Timing budget

| Segment | Min | Cut order |
|---|---|---|
| Opening hook | 2 | Cut to 1 min if needed |
| CIA explanation | 4 | Never cut |
| `integrity_demo.py` | 4 | Cut second |
| Threat/Vuln/Risk + 4 responses | 4 | Never cut — it's assessed |
| **`login_demo.py` (the attack)** | **6** | **Never cut.** Highest-value 6 minutes of the day. |
| **`login_fixed.py` (the fix)** | **3** | **Never cut.** Attack without fix is malpractice. |
| Cleanup + handoff | 2 | Never cut the ethics line |

**If you have 10 minutes:** CIA verbally → `login_demo.py` → `login_fixed.py` → ethics line → worksheet. Drop the integrity demo (mention hashing returns on Day 19).
