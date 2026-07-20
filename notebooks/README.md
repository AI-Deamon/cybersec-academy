# NotebookLM Integration — How to Use These Sources

## What's here
- `notebooks/day03-source.md` — the first prepared NotebookLM source (Day 3).
- `notebooks/_TEMPLATE.md` — reusable prep template for all 20 days.
- More `dayNN-source.md` files get added as we prepare each day.

## Two ways to load these into NotebookLM

### Option A — Manual (works today, no MCP)
1. Open NotebookLM (notebooklm.google.com) → **New notebook**.
2. **Source → Upload file** → select `notebooks/day03-source.md` (and optionally `decks/day03.pptx`).
3. Use the "Suggested NotebookLM prompts" at the bottom of each source doc, or the patterns in `_TEMPLATE.md`.
4. Generate: **Audio Overview**, **Study Guide**, **FAQ**, **Quiz**.

### Option B — Automated (once a NotebookLM MCP is connected)
There is currently **no NotebookLM MCP tool wired into this agent's toolset**. When one is connected, the intended flow is:
- For each day: read `lessons/dayNN/*` → write `notebooks/dayNN-source.md` (this prep) → call the MCP to create/update a notebook and add the source file.
- The `_TEMPLATE.md` defines the exact source shape the MCP should ingest.

## Why prepare sources separately (not just point NotebookLM at the repo)
- The 7-file packages mix private instructor content with student content; NotebookLM should ingest **student-facing** material only (cleaner study notebook, no leaked answers/rubrics).
- Merging into one doc per day keeps each notebook **scoped to one day** (or one week), so generated quizzes/audio stay on-topic.
- The source docs are plain markdown → trivially diff-able and regenerable if a lesson is revised (Freeze Rule: regenerate after teaching, not before).

## Status
- Day 3 source: ✅ prepared.
- Days 1, 2, 4-20: ⏳ to prepare (one `_TEMPLATE.md` run each).
- Recommendation: prepare sources week-by-week alongside (or after) the Phase 4 deck for that week, so the deck + notebook stay in sync.
