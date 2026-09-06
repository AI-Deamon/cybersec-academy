---
marp: true
theme: dark-monospace
paginate: true
title: "Day 1 — What Is This, Where Did It Come From, and Where's the Line?"
footer: "Practical Cyber Security (v2) · Week 1 · Day 1"
---

<!-- _class: lead -->

# Practical Cyber Security
## Day 1 — What is this, where did it come from, and where's the line?

**Week 1 · Building the foundation**

<!--
RUN SHEET (90 min):
00:00 Cold open / trailer demo
00:05 What security actually is
00:12 A short history of hackers & crackers
00:20 The CIA triad
00:38 Ethics & the law
00:58 Pair activity
01:10 How this course works
01:22 Wrap + homework
CUT FIRST IF SHORT: slide "Phreaking" detail, and drop the drill from 3 headlines to 2.
Never cut: the authorization line, §43 vs §66, the repo setup.
-->

---

<!-- _class: lead -->

# Watch this.

*(no notes — just watch)*

<!--
TRAILER DEMO. Do it live if the pre-flight passed; otherwise play assets/trailer-demo.mp4.
Setup: instructor laptop on class network. Terminal 1: sudo tcpdump -i <iface> -A 'tcp port 80'
Terminal 2 / browser: log into http://<target-server>/login with a fake user "student / hunter2".
Switch to Terminal 1, scroll to the POST, point at the cleartext username + password.
SAY: "I never touched their computer. I watched the wire. That is the whole field in one move.
In 20 days you will do this yourself — and you'll know exactly why HTTPS makes it stop working."
Do NOT explain how yet. That's Day 4.
FALLBACK: assets/trailer-demo.mp4 (60s). Narrate over it the same way.
-->

---

## What is "security"?

A system keeps doing **what it should** — while someone actively tries to make it do otherwise.

- The builder has to close **every** door.
- The attacker needs **one** open door.

That asymmetry is why this is hard, and why it's a job.

<!--
Draw the asymmetry on the board: a house with 10 doors. Defender guards all 10. Attacker tries all 10, needs 1.
This sentence must land: "security is a property of a system UNDER ATTACK — not a feature you add."
Analogy we will reuse all course: a building with doors, locks, guards, cameras, logs.
Misconception to kill now: "we'll just buy a security product and be done." No — it's a continuous process.
-->

---

## What is "hacking"?

> Understanding a system **better than the person who built it** — then using that understanding.

Not magic. Not genius. **Curiosity + patience + method.**

The method is what this course teaches. The law and ethics is the boundary around it.

<!--
Reassure the room: you do not need to be a prodigy. You need to be the person who reads the manual,
takes the thing apart, and asks "what happens if I do the unexpected thing?"
The word "hacking" in this room = the skill. Whether it's a crime depends on AUTHORIZATION — next 40 min.
-->

---

## Where the word came from

**MIT, late 1950s–60s.** The Tech Model Railroad Club, then the AI Lab.

- A **"hack"** = an ingenious, slightly playful technical solution.
- A **"hacker"** = someone compelled to know how things really work.

Originally a **compliment**. Nothing to do with crime.

<!--
Names to get right: Tech Model Railroad Club (TMRC), MIT AI Lab.
The culture: sharing code, staying up all night, elegance for its own sake.
Steven Levy's book "Hackers" (1984) codified the "hacker ethic": information wants to be free,
mistrust authority, judge people by their skill, you can make art and beauty on a computer.
-->

---

## The 1970s: phone phreaking

Before computer networks, hackers explored the **phone system**.

- **John Draper ("Captain Crunch")** — a toy whistle from a cereal box played the exact **2600 Hz** tone that gave free long-distance calls.
- Two young hobbyists built and sold "blue boxes" that did this: **Steve Wozniak and Steve Jobs** — years before Apple.

<!--
Point: the mindset predates computers. Same instinct — "the system has undocumented behaviour, let's find it."
2600 Hz later became the name of the famous hacker magazine.
CUT THIS SLIDE FIRST if running long — the Woz/Jobs detail is a nice hook but not load-bearing.
-->

---

## "Hacker" vs "cracker"

By the mid-1980s, newspapers used **"hacker"** to mean **criminal**.

The community pushed back and coined **"cracker"** (~1985) for the malicious kind.

- **Popular usage:** that fight was lost. "Hacker" = criminal in most headlines.
- **In the field:** we still make the distinction. Skill is neutral; **intent and authorization** are not.

<!--
"Cracker" also means someone who breaks software copy-protection ("cracks").
You will hear both words. When someone says "hacker" ask yourself: do they mean the skill, or the crime?
This slide is the bridge into the hat colours and then the law.
-->

---

## White, black, grey

| Hat | Authorization | Legal? |
|-----|---------------|--------|
| **White** | Has written permission / a signed scope | Yes |
| **Black** | None — malicious | No |
| **Grey** | None, but not malicious ("I was just checking") | **No — still illegal** |

The same technical action can be any of the three. **Only the paperwork changes.**

<!--
HAMMER the grey-hat line. Students will be tempted to "just test" the college portal or a friend's site.
"Not malicious" is not a legal defence under the IT Act (next slides).
White hat = pentester with a contract, bug-bounty participant within program rules, your own lab.
-->

---

## Five events that shaped the profession

| Year | Event | Why it matters |
|------|-------|----------------|
| **1988** | Morris Worm | First big internet worm; first felony conviction for computer crime (US CFAA) |
| **1990s** | Kevin Mitnick | Social engineering; FBI most-wanted → **later a paid security consultant** |
| **1998** | L0pht testifies to US Senate | "We could take down the internet in 30 minutes." Hackers as experts |
| **2010** | Stuxnet | A nation-state cyber-weapon damaged Iranian centrifuges. The APT era |
| **2017** | WannaCry / NotPetya | Ransomware goes global; billions in damage; the criminal economy matures |

<!--
The Mitnick arc is the one to dwell on: the exact same skills, on the wrong side of authorization = prison;
on the right side = a career. That is the entire point of today.
Stuxnet: you don't need details, just "governments do this now, at physical-damage scale."
WannaCry: exploited a stolen NSA tool (EternalBlue); hit the UK NHS hard. Ties to Day 11 (ransomware).
-->

---

<!-- _class: lead -->

# The CIA triad

Every security incident, ever, is one or more of these three failing.

<!--
This is the vocabulary the whole course hangs on. Slow down. One slide per letter, each with a real example.
Write C - I - A vertically on the board and leave it there all lesson.
-->

---

## C — Confidentiality

**The wrong people can read it.**

- The cleartext login you saw at the start of class.
- A leaked customer database dumped online.
- A hospital's patient records emailed to the wrong address.

Question it protects against: *"who can see this?"*

<!--
Confidentiality = secrecy. Encryption (Day 5) and access control (Day 7, Day 10) are how we defend it.
-->

---

## I — Integrity

**The data was changed and you didn't notice.**

- A tampered bank balance or exam mark.
- A defaced website.
- Ransomware silently encrypting your files.

Question it protects against: *"is this still what it's supposed to be?"*

<!--
Integrity = trustworthiness of data. Hashing and signatures (Day 5) are the classic defence.
Note: ransomware breaks BOTH integrity (files changed) and availability (can't use them).
-->

---

## A — Availability

**You can't use it when you need it.**

- A DDoS knocking a results portal offline on results day.
- Ransomware locking a hospital out of its own systems.
- A single server with no backup, and the disk dies.

Question it protects against: *"can I get to it when it matters?"*

<!--
Availability is the one beginners forget. "Secure" also means "up and working."
Backups, redundancy, DDoS protection (Day 17), incident response (Day 19).
-->

---

## Drill — which pillar failed?

1. A company's entire user table is posted on a forum.
2. Attackers change the "ship to" address on thousands of orders.
3. A game's login servers are knocked offline for 12 hours.

<!--
Answers: 1 = Confidentiality. 2 = Integrity. 3 = Availability.
Take hands. If short on time, do only #1 and #3.
Push for WHY: #2 isn't confidentiality even though data was accessed — the harm is the CHANGE.
-->

---

<!-- _class: lead -->

# Ethics & the law

The skill is neutral. What you're **allowed** to point it at is not.

---

## The authorization line

Testing a system you do **not** own or have **written permission** to test is illegal —

**even if you cause no damage.**
**even if your intentions are good.**
**even if you were "just curious."**

<!--
This is the single most important slide of the day. Say it slowly. Repeat it.
"No damage + good intent" is exactly the grey-hat trap from earlier. It is not a defence.
-->

---

## India — the IT Act, 2000

| Section | Type | What it covers |
|---------|------|----------------|
| **§43** | **Civil** | Unauthorized access, downloading, damage, denial of service. **No intent needed.** You pay compensation. |
| **§66** | **Criminal** | Doing a §43 act **dishonestly or fraudulently** → up to **3 years** prison and/or **₹5 lakh** fine |
| §66C | Criminal | Identity theft (using someone's password, digital signature) |
| §66F | Criminal | Cyber-terrorism |

<!--
Plain English: §43 = "you touched it without permission, now pay." §66 = "you did it dishonestly, now it's a crime."
You do not need to memorise numbers — you need to know: unauthorized access alone already has legal consequences.
Sources are in the student pack. Analogous laws elsewhere: US CFAA, UK Computer Misuse Act.
-->

---

## What "authorized" actually looks like

- A **signed engagement contract** with a defined scope (what, when, how).
- A **bug bounty / VDP** program — and you stay **inside its published rules**.
- **Your own lab** — machines you own, isolated, going nowhere near the internet.

Everything else is off-limits. Including the college portal. Including your friend's website.

<!--
VDP = Vulnerability Disclosure Program. Bug bounty rules define scope precisely — out-of-scope testing
can still get you banned or reported even within a "bounty" company.
We build the lab on Day 12. Until then, no live targets, period.
-->

---

## A real example

A security researcher in India found a genuine flaw in a public system, **reported it responsibly** — and still faced police action, because he had **no prior authorization** to test.

Good intentions did not remove the legal exposure.

**The rule you leave with today: "No scope, no test."**

<!--
Keep this general — the lesson is the pattern, not naming/shaming a specific person.
There are multiple such cases (India and globally). The consistent lesson: get permission FIRST, in writing.
Responsible disclosure protects you only when you were allowed to look in the first place.
-->

---

## Pair activity (12 min)

Each pair gets one real breach. Fill the card:

1. Which CIA pillar(s) failed?
2. What was the weakness (in one sentence)?
3. Was the attacker **authorized**, or committing a **crime**?

Two pairs report out.

<!--
Cards in assets/breach-cards.pdf: Equifax 2017, a large UPI/Aadhaar-linked data exposure,
a college result-portal defacement, WannaCry 2017. Model answers in teacher-notes.md.
Walk the room. Nudge pairs who conflate "data was accessed" with "confidentiality only".
-->

---

## How this course works

**4 weeks, 20 classes:**

1. **Week 1** — the machine and the network, made visible
2. **Week 2** — operating systems, the command line, scripting
3. **Week 3** — how an attacker gets in: the pentest lifecycle
4. **Week 4** — post-exploitation, defence, AI, and choosing your path

<!--
Show them the whole arc so nobody feels lost in the "boring plumbing" of weeks 1-2.
Tell them explicitly: "the first two weeks feel less like "hacking" — that's on purpose.
You cannot attack or defend a thing you don't understand."
-->

---

## Every single class

You leave with three things, written into your **Git repo**:

- **Today's attack** — one thing an attacker could do
- **Today's defence** — how you'd stop it
- **Today's artifact** — a script, a diagram, a finding, a note

By Day 20 that repo **is** your portfolio — and it tells *you* which side you enjoyed.

<!--
Set up the repo live now (lab-guide steps in student pack). GitHub or GitLab account, one repo, a README.
This repo is graded lightly all course and heavily at the capstone. It's also what they show employers.
-->

---

## The rhythm

- **Mon–Thu:** new material, hands-on every day.
- **Friday:** new material + briefing of the **weekend assignment**.
- **Weekend assignment:** combines the week + forces you to research one thing I *didn't* teach.
- **Day 20:** you choose — Red team, Blue team, or a wing (GRC / cloud / AI security).

<!--
The weekend assignment R&D part is where strong students stretch. Everyone submits one PDF before Monday.
-->

---

## Homework for tonight

1. Create your GitHub/GitLab account and the course repo (if not done in class).
2. `README.md`: two short paragraphs — *why you're taking this course* + the sentence
   **"I will only test systems I am authorized to test."**
3. Read and **sign** the one-page authorization pledge (in the student pack / handout).

<!--
Due at the start of Day 2. Checklist grading — see rubric in the week-1 student pack.
-->

---

<!-- _class: lead -->

## Recap

1. **Hacking is a skill; authorization is the law.** Same action, different paperwork, very different outcome.
2. **CIA** — every incident is confidentiality, integrity, or availability failing.
3. **"No scope, no test."**

<!--
Say these three lines verbatim. This is the closing every day - three lines, then dismiss.
Tomorrow: what's actually inside a computer, and why a bug can become control.
-->
