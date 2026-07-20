# NotebookLM Source Prep — Reusable Template (per day)

**Purpose:** turn any day's 7-file lesson package into ONE clean NotebookLM source doc.
**Output:** `notebooks/dayNN-source.md` (+ optionally the deck `decks/dayNN.*`).
**Rule:** merge only the *student-facing* content (student-guide + references + quiz + lab). Keep answers in (NotebookLM generates its own quiz, but the key helps it stay accurate). Drop the instructor-guide (private) and rubric unless you want a separate "instructor notebook."

---

## Build steps (repeat for each day)
1. Read `lessons/dayNN/student-guide.md`, `references.md`, `quiz.md`, `lab-guide.md`.
2. Create `notebooks/dayNN-source.md` using the structure below.
3. Paste content faithfully; convert the "why / connect / concepts / reference / lab / worksheet / homework / quiz" into the single doc.
4. Append the "Suggested NotebookLM prompts" block (customized to the day's topic).
5. (Optional) also add `decks/dayNN.md` / `.pptx` to the same notebook as a second source for richer Q&A.

## Document structure (copy this skeleton)
```markdown
# Day NN — NotebookLM Source: "<Topic>"

**Course:** Practical Cyber Security: From First Principles · Module X · Day NN of 20
**Prepared for:** NotebookLM study notebook (source document)
**Companion files:** lessons/dayNN/ · decks/dayNN.*

> One-paragraph note: this is the NotebookLM source for Day NN, merging the
> Student Guide + Reference Sheet + Quiz so NotebookLM can ground its
> study guide / audio / FAQ / quiz in this day only.

## Why this matters
<from student-guide "Why this matters">

## How today connects
<from student-guide "How today connects" — keep the journey links>

## The big ideas
<concepts, with the day's analogy/diagram described in words>

## Reference sheet
<paste references.md>

## Lab (hands-on, in-range only)
<paste lab-guide.md condensed>

## Worksheet / Homework
<paste from student-guide>

## Quiz (formative — answer key included)
<paste quiz.md with answers>

## Suggested NotebookLM prompts for this day
<3-5 prompts tailored to the topic>
```

## Per-day prompt patterns (reusable)
- Audio overview: "Generate a 5-minute audio overview of Day NN explaining <topic> using the <analogy>."
- Study guide: "Create a study guide with the key definitions and the <signature diagram> explained."
- Quiz: "Make a 10-question multiple-choice quiz from this Day NN material, with an answer key."
- Plain-language: "Explain <hard concept> in plain language for a total beginner."
- Lab help: "Based on this source, what lab commands should I practice and why are they safe in-range?"

## Naming / folder convention
- Source docs: `notebooks/dayNN-source.md`
- One notebook per day, OR one notebook per week (add day01..day05 sources together for Week 1).
- The `notebooks/` folder is the single home for all NotebookLM sources.
