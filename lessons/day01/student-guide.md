# Day 1 — Student Guide
**Course:** Practical Cyber Security: From First Principles · Module 1 · Day 1 of 20

---

## Why this matters
Before we touch any tool, you need two things:
1. A **moral and legal compass** — so you never cross from "learning" into "crime."
2. An understanding that **all digital data is just 1s and 0s** — the idea every later lesson builds on.

## The two big ideas

### 1. Ethics & Authorization
- **Ethical hacking** = security testing done *with permission, in writing, within agreed scope.*
- **Illegal hacking** = accessing systems you are not authorized for — even "just to learn." Intent doesn't make it legal.
- **The rule we live by: No permission = don't.**
- If you find a flaw in a system you *were* authorized to test, report it privately through the agreed channel. That's **responsible disclosure.**

> Think of a locksmith: the same skill opens locks. A locksmith opens the ones they're *authorized* to; a burglar opens the rest. Permission is the only difference.

### 2. Bits, Bytes & Encoding
- A **bit** is a single switch: 0 or 1. The smallest piece of information a computer knows.
- A **byte** = 8 bits = 256 possible values = enough for one text character.
- Text is **encoded**: 'A' → 65 → binary `01000001`. UTF-8 extends this to every world language.
- **Everything is bytes** — your photo, a password, a virus. "Analysing malware" means looking at bytes.

> Bits are like a row of light switches: 8 switches can show 256 patterns, and one pattern stands for one letter. That's how a whole book becomes switches.

### How today connects (keep this in mind)
- The **same byte** can be a love letter *or* malware. Bits say *what* data is; ethics says *whether you may touch it.*
- **Forward:** Day 2 the CPU runs these bits · Day 4 a page loads (TLS encrypts it in transit) · **Day 5 = Week 1 portfolio assignment** integrating Days 1-4 · Day 13 Wireshark shows them · Day 15 Burp lets you change them.
- **Ethics forward:** Day 12 gives you an always-authorized lab; every offensive day starts with an "ethics check."

---

## Worksheet (fill in during class)
1. The rule we live by in this course: ___________________________.
2. Ethical hacking requires (circle all): permission / profit / scope / writing / curiosity.
3. A bit is: ___________. A byte is: ___________.
4. 'A' in ASCII decimal = _____, binary = ____________.
5. Hex `48` = decimal _____ = character _____.
6. One career that uses binary literacy: __________________.
7. Encoding is the same as encryption. True / False — and why? ____________.
8. **Connections:** In one sentence, explain how the word "Hi" on disk (bytes `48 69`) is the *same kind of thing* as a piece of malware — and what makes one safe and the other dangerous. ___________________________________________________________

## Homework (due Day 2)
1. Write and sign: "I will only test systems I am authorized to test." (extend the pledge)
2. Convert your **full first name** to binary using the ASCII table. Show your working.
3. Find one real news story about someone charged for unauthorized access. Write 3 sentences: what they did, whether they had permission, and the outcome.

*(Lab steps are in lab-guide.md. Quiz is in quiz.md. Reference sheet is in references.md.)*

---

## PPT Outline (blueprint for Phase 4)
*Phase 4 turns this into the actual deck. Every deck opens with "Why are we learning this?" Full speaker notes live in instructor-guide.md.*

**Slide 1 — Title:** "Day 1: Cyber Ethics + What's Inside a Computer" · Academy logo · course name.
**Slide 2 — Why are we learning this?** (required): Why it matters (moral/legal compass + data = 1s and 0s) · Where used (every security role) · Which careers (all — malware analyst, forensics, SOC, pentester, cloud). Diagram: judge + light-switches + map icons.
**Slide 3 — Learning Journey Map:** 20-day roadmap; Day 1 highlighted.
**Slide 4 — Ethics: Authorized vs Illegal:** rule "No permission = don't"; locksmith analogy. Two-column diagram (green authorized / red illegal).
**Slide 5 — Responsible Disclosure:** report privately through agreed channel; bug-bounty = permission to test.
**Slide 6 — Bits & Bytes:** bit = one switch; byte = 8 bits = one character. Diagram: 8 switches → 'A'.
**Slide 7 — Encoding (ASCII/UTF-8):** 'A'=65=`01000001`; encoding ≠ encryption.
**Slide 8 — See it: Hex Dump:** `xxd hello.txt` → `48 69` = 'H' 'i'. Diagram: hex-editor screenshot with bytes labeled.
**Slide 9 — Soft-Skills Moment:** structured notes (objective + key point + one question); reading docs is a superpower.
**Slide 10 — How Today Connects:** Ethics↔Bits bridge (same byte = love letter or malware); forward links D2→D5→D13→D15; ethics→D12. Diagram: central byte, arrows radiating + lock icon.
**Slide 11 — Lab Preview & Quiz:** sign pledge, convert your initial to binary, hex-dump your name; then the 4-question exit quiz.
