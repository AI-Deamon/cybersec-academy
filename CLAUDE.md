# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

This is a **curriculum-authoring repository**, not a software project. It holds the content
for a 20-day beginner course, "Practical Cyber Security: From First Principles." Everything
is Markdown (lessons, assessments, design docs) plus generated decks. There is no application
code, no build/lint/test suite, and no package manager.

## Governing documents (read these before changing anything)

The repo is run like a spec-driven project. Two documents are the source of authority; treat
them the way you'd treat a framework's core contracts:

- **`Academy-Design-Document-v1.0.md` (the "ADD" / constitution)** — defines the teaching
  philosophy, the fixed class template, the 7-file lesson standard, the assessment cadence,
  and the change-governance rules. Cross-references in lesson files (e.g. "ADD §12", "§16")
  point here.
- **`Course-Design-Document-20day.md`** — the 20-day blueprint (what each day covers).

Presentation authority lives in **`Presentation-Design-Standard-v1.0.md`** (typography,
color, slide order, deck production workflow) and **`Visual-Asset-Library-v1.0.md`**
(reusable diagrams/icons). No deck is built or edited without these.

## The Freeze Rule — the single most important constraint (ADD §16)

Each completed week is marked `🧊 FROZEN — Production Ready v1.0` in its `version-history.md`.
For frozen content:

- **Do NOT add new content, examples, depth, or "improvements" on the strength of a good
  idea.** The freeze is an explicit anti-perfectionism guardrail.
- Content changes are permitted **only after the material has been taught AND students
  actually struggled** with that specific part.
- **Correctness fixes are the exception and ARE allowed while frozen** — e.g. an internal
  contradiction such as a rubric that grades a step the lab no longer contains. Fixing a
  self-contradiction is not a "refinement." When in doubt whether a change is a correctness
  fix vs. a new idea, ask the user.
- Week 1 (days 1–4 + the Week 1 assignment) is currently frozen.

Any content change, however small, appends an entry to that day's `version-history.md`
stating what changed and why (and, for frozen content, why it was freeze-permitted).

## Lesson structure (the 7-file standard, ADD §10)

Each teaching day is a folder `lessons/dayNN/` containing exactly seven files:

| File | Role |
|------|------|
| `instructor-guide.md` | **PRIVATE, and the single source of truth.** Full teaching layer + Lab Solution + answer keys. When two files disagree, this one wins. |
| `student-guide.md` | Student narrative + the **PPT Outline** (the blueprint decks are built from) + worksheet + homework. |
| `lab-guide.md` | Hands-on lab steps, checkpoint, troubleshooting. |
| `quiz.md` | Formative quiz with answer key. |
| `references.md` | Reference sheet / further reading. |
| `rubric.md` | Instructor-side assessment rubric. |
| `version-history.md` | Change log + freeze status. |

The **Student Learning Package** = the student-facing subset (`student-guide` + `lab-guide`
+ `quiz` + `references`). Everything downstream (decks, NotebookLM sources) is *derived* from
this — so a redesign regenerates the derived artifact; it never rewrites the lesson.

**Day numbering has intentional gaps.** `lessons/` has days 1–4, 6–9, 11–14, 16–19. Days
**5, 10, 15, 20** are the end-of-week assignment/workshop days — they live in
`assessments/weekNN-assignment.md`, not in `lessons/`.

## Cross-lesson consistency rules

These are what make 20 days read as one course; preserve them when editing:

- **One extended analogy, never new ones.** A single metaphor (Restaurant → Postal system →
  Phone call → OS-as-restaurant) is stretched across days. Extend it; don't invent parallel
  analogies.
- **Signature diagrams are drawn once and reused identically.** Canonical copies live in
  `diagrams/` — `page-load-signature.md` (the 7-step page load, Week 1) and `os-signature.md`
  (the OS stack, Week 2). They recur across days with only the *annotation/lens* changing;
  keep layout, colors, and step numbers identical everywhere, and reference the file rather
  than redrawing.
- Every lesson answers the **Four Context Questions** (Why / How it connects / Where used /
  What problem it solves) and opens with a **Learning Journey Check** ("Yesterday… Today…
  Tomorrow…"). Offensive topics pair with a defensive fix; ethics is reinforced throughout.
- Pedagogy note that recurs: **teach the concept first, then introduce the tool that makes it
  visible.** (This is why Wireshark is deferred to Day 13 and Week 1 labs use `ping` /
  `nslookup` / browser DevTools instead.)

## Presentation / deck production (Phase 5)

- Decks are authored as **Marp Markdown** (`.md`) as the source of truth, rendered to HTML for
  review and exported to PPTX for teaching. Live examples: `decks/day01.md` → `decks/day01.html`
  + `decks/day01.pptx`.
- **PPTX is delivery-only and is never hand-edited** — regenerate it from the `.md` source.
- The Marp theme is `templates/academy-theme.css`. Every deck reuses the frozen master
  skeleton + Visual Asset Library rather than starting blank.
- Ignore `decks/~$*.pptx` files — those are PowerPoint lock files, not content.

## NotebookLM integration

`notebooks/` holds per-day source docs (`dayNN-source.md`, plus `_TEMPLATE.md`) that are fed
to Google NotebookLM to generate study guides, quizzes, and audio overviews. See
`notebooks/README.md`. Key rule: **only student-facing content is ingested** — never the
private `instructor-guide.md` or `rubric.md`, to avoid leaking answers. The NotebookLM MCP is
configured in `opencode.json`; `install-notebooklm.ps1` sets up the local MCP server.
