# Presentation Design Standard v1.0
*Phase 3.5 deliverable — the Academy Presentation Design System.*
**For:** every deck produced in Phase 4 (and every future course at this academy).
**Status:** ✅ APPROVED (owner-endorsed, 2026-07-18). Governs all presentation production.
**Rule:** No deck is built before this standard exists. Every deck — lecture or workshop, Day 1 or Day N — follows it.

---

## 0. Purpose & Philosophy
We produce **20–30 decks**. Without one visual system, we would redesign slides every day. This standard makes every deck look like it came from the same professional academy.

Design principles (non-negotiable):
1. **Clarity over decoration.** A slide explains one idea. If it needs a paragraph, it's two slides.
2. **Consistency beats cleverness.** Same fonts, colors, boxes, callouts, and slide order on every deck.
3. **Concept before chrome.** Diagrams carry the lesson; styling only serves them.
4. **Calm motion.** Animation exists to *reveal*, never to *perform*.
5. **Brand recall.** The academy logo + a consistent title bar make every slide instantly identifiable as ours.

---

## 1. Typography
| Role | Font | Size (lecture) | Notes |
|------|------|---------------|-------|
| Title | Montserrat SemiBold (or system Sans-Serif Bold) | 32–40pt | One line; sentence case. |
| Subtitle | Montserrat Regular | 18–22pt | Under title; grey. |
| Section header (on-slide) | Montserrat SemiBold | 24pt | Left-aligned. |
| Body | Open Sans / Segoe UI / system Sans | 16–18pt | Line spacing 1.15; max ~2 lines per bullet. |
| Bullet secondary | same as Body | 14pt | Indented; grey. |
| Code / terminal | **JetBrains Mono / Consolas / Courier New** | 14pt | Monospace only; see §4. |
| Caption (image/diagram) | Body font | 12pt | Italic; grey. |

Rules:
- **No more than 2 font families** on a deck (one sans for everything, one mono for code).
- Titles sentence case, not ALL CAPS (except short kickers like "DAY 13").
- Minimum body size 14pt (legibility from the back of a room).

---

## 2. Colors
Defined as named tokens (use these, not hex guesses):

| Token | Name | Hex | Use |
|-------|------|-----|-----|
| `--bg` | Background | `#0F172A` (dark) / `#FFFFFF` (light) | Slide canvas. **Pick ONE master theme per deck** (see §8). |
| `--primary` | Primary (brand) | `#2563EB` (blue) | Titles' accent rule, key shapes, logo. |
| `--secondary` | Secondary | `#0EA5E9` (sky) | Supporting shapes, secondary arrows. |
| `--accent` | Accent (highlight) | `#F59E0B` (amber) | Callouts, "remember" highlights, key term underline. |
| `--warning` | Warning | `#EF4444` (red) | Danger, "do not", attack side. |
| `--success` | Success | `#22C55E` (green) | Defense side, "done", pass. |
| `--text` | Text | `#E2E8F0` (on dark) / `#1E293B` (on light) | Body. |
| `--muted` | Muted text | `#94A3B8` | Captions, secondary bullets. |
| `--surface` | Surface (cards/boxes) | `#1E293B` (dark) / `#F1F5F9` (light) | Box fills. |

Convention for attack+defend diagrams (recurs all 20 days):
- **Attack side = `--warning` (red).** Defend side = `--success` (green).** This mapping is fixed across the academy.

---

## 3. Diagram Style
Diagrams are the backbone of the course (signature diagrams recur across days). Rules:
- **Boxes:** rounded rectangle, 2px border in `--primary` or `--secondary`; fill `--surface`; text 14–16pt. Min internal padding 8px.
- **Arrows:** straight or 90° elbow; 2px `--muted` or `--text`; arrowhead filled. Use `--accent` only to highlight *the one* arrow the slide is about.
- **Icons:** flat, single-color (line icons), 24–48px, in `--primary` or `--muted`. No 3D / skeuomorphic. Source: a single consistent icon set (e.g., Lucide / Feather style).
- **Spacing:** 24px grid between elements; generous whitespace; never let a diagram touch slide edges (<32px margin).
- **Consistency:** the same concept uses the **same shape** everywhere (e.g., the "web page load" pipeline, the "OS stack", the "IR loop" keep identical box/arrow style day to day). See `diagrams/` canonical copies.
- **Labels:** every box/arrow labeled; no unexplained symbols.

---

## 4. Code Blocks
- **Background:** `--surface` (dark card on light decks, slightly darker on dark decks). 1px border `--muted`.
- **Highlight color:** the *relevant* token in `--accent` (amber) or `--warning` (red for the malicious payload, e.g., `' OR '1'='1'`).
- **Terminal screenshots:** crop tight, keep only the meaningful lines; 1px border; caption beneath ("*Wireshark — plaintext HTTP leaked*").
- **Font:** mono (§1). Show *minimal* snippets — a few lines, not full terminals.
- **Never** put code in a body-text bullet; always a dedicated code block.

---

## 5. Callout Boxes
Four standard callouts. Same shape (left accent bar + icon), different color:

| Callout | Color | Icon | Use |
|---------|-------|------|-----|
| **Definition** | `--primary` | book/info | Define a term precisely. |
| **Remember** | `--accent` | star/bell | The one thing to walk away with. |
| **Warning** | `--warning` | triangle | "Do not / illegal / risk." (ethics, scope — used with Day 1/12 discipline.) |
| **Pro Tip** | `--success` | lightbulb | Practical shortcut / real-world habit. |

Rules: max 3 callouts per slide; never stack two of the same type; text ≤ 2 lines.

---

## 6. Animation Rules
- **Minimal.** Reveal-on-click for multi-step diagrams only.
- **Fade only** (200–300ms). Allowed: Appear / Fade / Wipe (subtle).
- **Never:** spinning, flying text, bouncing, 3D flips, sound effects, auto-advancing.
- Build order: title → concept → diagram (step by step) → example → callout.
- A slide must be fully readable if all animations are disabled.

---

## 7. Image Rules
- **Where:** diagrams (§3) are preferred over photos. Photos only for real-world context (e.g., a data-center photo for cloud day, a SOC photo for IR day).
- **Maximum:** ≤1 photo per slide; ≤3 photos per deck unless a gallery slide.
- **Caption:** mandatory italic `--muted` caption under every image.
- **Source:** royalty-free / owned; attribute if required. No memes, no cluttered screenshots (crop per §4).
- **Style:** consistent filter (slight desaturation) so photos match the calm deck tone.

---

## 8. Slide Order (standardized)
**Every lecture deck follows this order** (workshop decks are a short subset — see §9):

```
1.  Title              — "Day NN: <Topic>" · academy logo · module tag
2.  Why learn this?    — the motivation slide (opens every deck)
3.  Learning Journey   — "Yesterday… Today… Tomorrow…" journey check
4.  Roadmap            — today's objectives (3 bullets)
5.  Core concept       — the mental model (diagram-first)
6.  Diagram            — the signature/visual for the day
7.  Real-world example — concrete, named scenario
8.  Demo               — what the instructor shows
9.  Lab                — what the student does (in range)
10. Summary            — 3 takeaways (Remember callout)
11. Assignment         — homework / portfolio task + Career Connection cue
```

Notes:
- Slides 2 and 3 are **mandatory on every lecture deck** — they encode the "why before how" philosophy.
- The PPT Outline inside each `student-guide.md` already lists the day's slides; this order is the template it was written against.

---

## 9. Workshop Decks (Days 5 / 10 / 15 / 20)
Shorter assignment-briefing decks — **10–15 slides**, not 35–45:
```
1.  Title (workshop)
2.  Week recap (what we covered)
3.  Why this assignment (validation, not new material)
4.  Scenario (the brief)
5.  Objectives
6.  Tasks overview (map to rubric)
7.  Deliverables
8.  Rubric (how you'll be assessed)
9.  Career Connection cue
10. In-class plan (remaining time)
11. Q&A / start
```
No core-concept or demo slides — students already learned the material; the workshop *applies* it.

---

## 10. Master Template & Production Workflow (Phase 4: build once, then freeze)
**Source format:** every deck is authored as **Markdown (Marp)** — one `.md` file per deck. Marp renders it to HTML (for review) and exports to PPTX (for teaching). This keeps the deck in version control, diff-able, and AI-editable; **PPTX is delivery-only and never hand-edited.**

**The Academy Master Template** = one Marp theme file (`academy-theme.css`) + two layout skeletons:
- **Lecture skeleton** (§8 — the 11-slide standardized order).
- **Workshop skeleton** (§9 — 10-15 slides).
Both embed: the academy logo + "Practical Cyber Security: From First Principles" wordmark title bar, the color tokens (§2), font themes (§1), callout masters (§5), code-block style (§4), diagram grid (§3), and a footer "Day NN · Module X" + page number.

**Production order (do not skip):**
1. **Build the Master Template once** (theme + both skeletons).
2. **Build Day 1** to validate the template + the Visual Asset Library in practice.
3. **Freeze Template v1.0** — fix crowding / code-size / whitespace / projector-readability issues *here, once*. Do not keep tweaking it while producing other decks.
4. **Generate the remaining decks day-by-day**; each is a copy of the frozen skeleton + reused assets.

Every deck is *derived from* its Student Learning Package — a redesign regenerates the deck, never rewrites the lesson.

---

## 11. Quality Gate (every deck, before handoff)
- [ ] Opens with "Why learn this?" (slide 2).
- [ ] Same fonts/colors/callouts as this standard.
- [ ] Attack=red / Defend=green consistently.
- [ ] Every diagram labeled; ≥32px edge margin.
- [ ] Code in dedicated blocks, cropped, captioned.
- [ ] Animations = fade only.
- [ ] Authored in Markdown (Marp); built from the frozen master skeleton (§10), not from blank.
- [ ] Reuses assets from the Visual Asset Library (§12) — no diagram redrawn per slide.
- [ ] Passes the Definition of Success (ADD §13): explains *why*, not just *what*.

---

## 12. Visual Asset Library (draw once, reuse everywhere)
Defined in **`Visual-Asset-Library-v1.0.md`**. This is the home for every reusable visual so the academy never redraws a diagram:
- **Signature diagrams** — canonical copies live in `diagrams/` (e.g., the 7-step "How a Web Page Loads" pipeline; the OS stack). These recur across days from different perspectives; keep them *visually identical* everywhere.
- **Icons, network/cloud/OS symbols, attack/defense arrows, color-coded legends, reusable comparison tables.**
**Rule:** if a visual appears on more than one deck, it lives in the Asset Library and is embedded — never recreated per slide. This is what makes 20-30 decks look like one academy. The page-load diagram is the proof: once drawn, it is reused on Day 4 / Week-1 / Day 13 / Day 16 / Day 19 unchanged.

---

## Version History
- **v1.0** — Created as Phase 3.5 deliverable (owner-endorsed 2026-07-18). Defines typography, color tokens, diagram/code/callout/image rules, animation discipline, standardized lecture + workshop slide order, the master-template requirement, and a per-deck quality gate. Establishes that no deck is built before this standard exists. Becomes a permanent academy artifact.
- **v1.1** — Extended per owner curriculum-director review (2026-07-18): (a) added §12 **Visual Asset Library** cross-reference (paired doc `Visual-Asset-Library-v1.0.md`); (b) §10 revised to **Markdown (Marp) as the source format** with PPTX as delivery-only, plus the **build-template → Day 1 → freeze v1.0 → generate** workflow; (c) §11 quality gate updated to require Markdown source + asset reuse. Aligns the standard with the software-development-style pipeline: Markdown → HTML → review → PPTX export.
