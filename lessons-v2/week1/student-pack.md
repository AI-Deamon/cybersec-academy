# Week 1 — Student Pack

*Practical Cyber Security (v2) · Week 1: Building the foundation*

This one document covers all of Week 1: a recap per day, key terms, the in-class worksheets,
your daily homework, and the weekend assignment. Keep it open during class.

**Your course repo:** create one private Git repo (GitHub or GitLab) this week. Every class you
add three things — today's attack, today's defence, today's artifact. By Day 20 it's your
portfolio.

---

## Day 1 — What is this, where did it come from, and where's the line?

### Recap
- **Security** = a system doing what it should *while someone actively tries to make it do
  otherwise*. The attacker needs one open door; the defender must close them all.
- **Hacking** = understanding a system better than the person who built it. It's a skill, and
  it's neutral. The word began as a compliment at MIT in the 1960s.
- **Hacker vs cracker; white / grey / black hat.** The same technical action is lawful or
  criminal depending on **authorization**, not skill. Grey hat ("I wasn't being malicious") is
  still illegal.
- **Five events:** Morris Worm (1988), Kevin Mitnick (1990s), L0pht at the US Senate (1998),
  Stuxnet (2010), WannaCry/NotPetya (2017).
- **CIA triad** — Confidentiality, Integrity, Availability. Every incident is one or more of
  these failing.
- **The law (India):** IT Act §43 (civil — unauthorized access, no intent needed) and §66
  (criminal — dishonest/fraudulent access, up to 3 years / ₹5 lakh).
- **The rule:** *No scope, no test.*

### Key terms
`asymmetry` · `hacker` · `cracker` · `white/grey/black hat` · `confidentiality` · `integrity` ·
`availability` · `authorization` · `scope` · `bug bounty` · `VDP` · `IT Act §43` · `IT Act §66`

### In-class worksheet — breach analysis
Your pair gets one breach card. Fill in:

| | |
|---|---|
| Breach | |
| CIA pillar(s) that failed | |
| The weakness, in one sentence | |
| Attacker: authorized, or committing a crime? | |

### Homework (due start of Day 2)
1. Create your GitHub/GitLab account and the course repo.
2. `README.md` — two short paragraphs: **why** you're taking this course, and the sentence
   *"I will only test systems I am authorized to test."*
3. Read and **sign** the Authorization Pledge (below). Bring the signed copy.

### Authorization Pledge
> I understand that accessing or testing computer systems without authorization is unlawful
> under the Information Technology Act, 2000, regardless of intent or outcome. I will only test
> systems I am authorized to test — my own isolated lab, or systems for which I hold explicit
> written permission or a valid bug-bounty scope. I will report vulnerabilities responsibly and
> will not use anything taught in this course to cause harm.

Name: __________________  Roll no: __________  Signature: __________  Date: ______

---

## Day 2 — *(to be added)*
## Day 3 — *(to be added)*
## Day 4 — *(to be added)*
## Day 5 — *(to be added)*

---

## Weekend Assignment — Week 1

*Briefed at the end of Day 5. Submit one PDF before Monday (start of Day 6).*

### Part A — Integrate
Write the story of **what happens, end to end, when you log in to a website** — from pressing a
key to the server checking your password over an encrypted connection. Use the concepts from
Days 1–5 (data, how a program runs, packets, TCP/DNS/HTTP, TLS). One to two pages, your own
words, a diagram encouraged.

### Part B — R&D stretch (research something we did *not* cover)
Pick **one**:
- Explain **DNS-over-HTTPS (DoH)**: what problem it solves, and one reason it's controversial.
- Find **one real CVE** in a DNS server or a TLS library. In 3–4 sentences: what broke, and
  what an attacker could do.

### Part C — Hands-on evidence
Screenshots / command output from your own machine:
- your IP, MAC and default gateway;
- a `ping` and a `traceroute` to any public site;
- one web request viewed in your browser's DevTools → Network tab (show the request headers).

### Part D — Reflection
3–4 sentences: what clicked this week, and what's still fuzzy.

### Marking checklist (10 marks)
- [ ] Part A covers all five layers data → TLS, in the student's own words (3)
- [ ] Part A is coherent as a single story, not disconnected facts (1)
- [ ] Part B shows real research beyond class, correctly explained (2)
- [ ] Part C — all three pieces of evidence present and legible (2)
- [ ] Part D — a genuine reflection, not filler (1)
- [ ] Submitted as one PDF, on time (1)
