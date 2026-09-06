# Day 20 — Teacher Notes

**Teach from:** `day20.md` (deck + speaker notes).
**This file:** cut-list, framing notes, the capstone brief guide, the "definition of success"
check, FAQ.

**The last day.** Light on new content, heavy on reflection and decision. Your job: help each
student leave with (1) a chosen (or narrowed) direction, (2) 3 concrete next steps, (3) a
portfolio README drafted, (4) the capstone understood. Keep energy up — this is the pay-off.

---

## The analogy — you've worked every station (kitchen)

Twenty days ago they'd never held a knife. Now they've worked the line (offense), the pass and
the security office (defense), front-of-house and the books (GRC), supplier relations (cloud),
and the new equipment (AI). Today's question: **which station do you want to run?** The repo
is their reference letter from the head chef.

---

## Framing notes (say these)

- **This is not a permanent choice.** Red↔Blue movement is normal and common. Detection
  engineers used to be pentesters; AppSec people came from dev. Nobody is locked in.
- **"Still deciding" is a valid answer today** — as long as the *next step* is concrete.
- **GRC is real security.** Say it explicitly — students undervalue it because it's not the
  terminal. It's stable, paid, and in demand.
- **Certs are a filter, not a qualification.** They get the CV past HR. The portfolio +
  interview get the job. Don't let anyone leave thinking they need OSCP to start.
- **CISSP is not a fresher cert** (it needs ~5 years experience). Security+ is the realistic first.
- **The Indian fresher reality:** many "junior" roles ask for experience. The way through is
  the portfolio (they have one), a cert, and being able to talk through a project. Internships
  from month 2.

---

## Must-teach vs. cut-if-short

**Never cut:**
- The **skills self-assessment** DO (the compass).
- The **"which door + why + 3 steps"** DO + a few pitches.
- **Finalising the portfolio README.**
- The **capstone brief**.

**Cut in this order if behind:**
1. The wings slide → 3 min (name them, stress GRC is real).
2. Pitches → 2 volunteers instead of 4.
3. The Red/Blue role tables → hit 2 rows each, point them at `roles-reference.md` for the rest.
4. The market slide → the 3 bullets (SOC volume / portfolio breaks the catch-22 / internships).

---

## The two DOs

### Skills self-assessment (`assets/skills-self-assessment.md`)
8 min, silent, honest. Then: "look at your highest cluster — offense rows, defense rows, or
the communication rows. That's a nudge toward your door." Not a verdict — a signal.

### "Which door + 3 steps" (`assets/roadmap-template.md`)
10 min: write the door, the *why* (tied to what they enjoyed these 20 days), and 3 **concrete**
next steps (a named cert, a named learning path, a named project). Then 3–4 60-second pitches.
Push back on vague: "get better at hacking" → "which HTB path, finished by when?"

---

## Portfolio README

6 min — get them to at least draft it from `assets/portfolio-readme-template.md`. A clean repo
with 8+ real artifacts (scanner, engagement journal, findings table, web-vulns, attack chain,
AI attacks, IR runbook + timeline, threat model) is a genuinely strong fresher portfolio.
Tell them: **pin it, make it public or share-ready, add the "what I learned" paragraph and the
roadmap.** This outlives the course certificate.

---

## Capstone brief — guide

Full spec + checklist: `week4/student-pack.md`. Walk each part ~2 min.

- **A — Cross-domain engagement** (Weeks 3–4): on the capstone target, the full lifecycle →
  **one clean web finding** + **one infra/service finding**, each find→prove→fix, in their
  Week-3 report format. ~4 pages.
- **B — Incident writeup** (Day 19): from provided incident logs → timeline + IOCs + a 5-step
  response + the one root-cause fix.
- **C — Career roadmap** (today): "which door and why" (1 page) + a 6-month plan + the
  finalised portfolio README.
- **D — Final reflection:** the four "so what" — *what surprised me · what was hardest · what
  I'm best at · what's next* — plus a self-assessment against the course objectives.
- **Submit:** one PDF + the repo link. Biggest single piece; start this weekend.
- Students who did all four weekly assignments already have ~80% of A–C.

---

## Definition of success — the course's own bar

By the end, a student should be able to:
1. Explain what cyber security is, and the ethics/legal line, without prompting.
2. Reason about an attack using CIA + the untrusted-input lens.
3. Operate Linux and Windows at a basic level and write a small tool.
4. Run the pentest lifecycle on a lab target and write a findings report.
5. Reconstruct an intrusion from logs and outline an IR response.
6. Name a personal direction (Red / Blue / a wing) with a concrete next step.

The capstone is marked against this list. It's "can you do the basics, and do you know where
you're going" — **not** "are you an expert".

---

## Closing (say something like this)

"Twenty days ago most of you asked what a bit was. Today you've got a repo with a scanner you
wrote, a pentest report, a web app you broke and fixed, an intrusion you reconstructed from
logs, and an LLM you talked into leaking a secret. You didn't learn *about* security — you
*did* it. You know what the field is, what you can do, and which door you're walking toward.
That was the whole point. Now go build — and keep adding to the repo."

---

## FAQ

- **"I still don't know which door."** Fine. Pick the one you'd *try first* and take one step
  (a TryHackMe path is free). You'll know within a month.
- **"Do I need a degree?"** It helps in India for the HR filter and campus placements, but the
  portfolio + certs route works for non-CS and dropouts too. This field cares about proof.
- **"Which cert first, realistically?"** Security+ if you're Blue/undecided; eJPT if you're
  sure it's Red and money's tight; a cloud associate security cert if it's cloud.
- **"Is AI going to kill entry-level security jobs?"** (Day 18) It changes them. SOC L1 tasks
  get automated; the analyst who uses AI well moves up faster; and securing AI is a new job.
- **"Bug bounty full-time?"** Build the skill and the portfolio with it; don't quit anything
  for it until you've had consistent income for a year.
- **"How do I keep learning after this?"** The roadmap. One cert, one path, one project,
  one community — and keep the repo alive.
