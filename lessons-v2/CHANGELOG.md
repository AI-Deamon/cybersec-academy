# Changelog — Practical Cyber Security (v2)

Fresh 20-day course line. Design: `docs/superpowers/specs/2026-09-06-20day-course-redesign-design.md`.
This is a clean-sheet rebuild — it does **not** modify the frozen v1 under `lessons/`.

Per-day artifacts: `dayNN/dayNN.md` (+ `.pptx`) · `dayNN/teacher-notes.md` · `dayNN/assets/`.
Per-week: `weekN/student-pack.md`. Topic-specific PDF handouts added only when a topic warrants a keeper reference.

---

## 2026-09-06

- **Design doc** committed (`2026-09-06-20day-course-redesign-design.md`): 20-day map, deep
  per-day plan, lab architecture, night-before prep routine, teaching standards, weekly
  assignment standard.
- **Day 1 built** — `day01/day01.md` (deck + speaker notes), `day01/teacher-notes.md`,
  `day01/handout.md` (Authorization & the Law one-pager, → PDF).
- **Week 1 student pack started** — `week1/student-pack.md` with the Day 1 section and the
  Week 1 weekend assignment.
- Structure decision: lean per-day set (deck + teacher-notes + assets), weekly student pack,
  no per-day quiz/rubric/version-history files (exit check lives in teacher-notes; grading is
  weekly; this changelog replaces per-day version history).
- **Day 2 built** — `day02/day02.md` (deck + speaker notes: CPU/RAM/disk, program vs process,
  source→process pipeline, the OS as referee, user/kernel mode, the "bug becomes control"
  seed, hands-on with htop/Task Manager), `day02/teacher-notes.md`, `day02/assets/crash.py`
  (segfault-containment demo). Week 1 student pack: Day 2 section added.
- **Days 1 & 2 reviewed (expert + teacher lens) and fixes applied:**
  - Day 1: course repo setup moved from in-class to homework (step-by-step in the student
    pack); "five events" trimmed to three told as stories (Morris, Mitnick, WannaCry); new
    60-second "where this leads" slide (Red/Blue/wings + demand) for early motivation;
    trailer defaults to the recording on Day 1; run sheet rebuilt with ~5 min slack.
  - Day 2: enforced the one-analogy rule (kitchen only — the bank analogy for user/kernel
    mode is gone); moved "why a bug becomes control" to right after program-vs-process and
    gave it ~12 min; cut the code/data/heap/stack slide (return-address idea now inline on
    the overflow slide); `crash.py` is instructor-only on the Linux projector (Windows
    surfaces it as a catchable OSError).
  - Design doc: "files" moved from Day 2 to Day 6 (§5/§6); §11 rewritten as the production
    process incl. the per-day review pass.
