# Day 1 — Instructor Guide (PRIVATE — source of truth)
**Course:** Practical Cyber Security: From First Principles
**Module 1 — Building the Foundation · Day 1 of 20**
**Standard:** Academy Design Document v1.0 (Approved) · Phase 3 lesson-doc standard
**Version:** 1.1

---

## 1. Lesson Overview
- **Title:** Cyber Ethics + What's Inside a Computer
- **Duration:** 90 minutes
- **Type:** Foundation / framing + first technical concept
- **Position in journey:** The very first step. Establishes the moral/legal compass AND the "data is the atom of everything" idea that every later layer builds on.
- **Week cadence (official):** the course runs four 5-session weeks (Mon–Fri). Days 1–4 of each week teach new concepts; Day 5 is a reinforcement session (review + assignment briefing + guided planning). Assignments are completed over the weekend and submitted before the next Monday. See ADD §12.
- **Companion files:** student-guide.md · lab-guide.md · quiz.md · references.md · rubric.md · version-history.md

## 2. Teaching Guide (Four Context Questions)
**Why am I learning this?**
Because before we touch a single tool, you need a moral and legal compass. Ethical hacking is only "ethical" when it's authorized. And you need to understand that *all* digital data — passwords, photos, malware — is ultimately just 1s and 0s. That idea resurfaces in every module.

**How does this connect to the previous lesson?**
There is no previous lesson — this is Day 1. The connection we make is *forward*: today's ethics rule governs everything in Days 2–20, and today's "bits/bytes" idea is what D2 (CPU/memory) and D5 (HTTP/TLS) manipulate.

**Where will I use this in cybersecurity?**
Every role. You cannot be a pentester, SOC analyst, or IR responder without understanding authorization. And binary/hex literacy underpins malware analysis, forensics, network captures, and password cracking.

**What problem will I be able to solve after today's class?**
You'll be able to (a) tell legal authorized testing from illegal hacking, and (b) explain how any digital information is represented as binary, and convert simple text to binary/hex.

**Concept 1 — Ethics & Authorization (first principles):**
- Ethical hacking = security testing performed *with* permission, in writing, within agreed scope.
- Illegal hacking = accessing systems you are not authorized for, regardless of intent ("I was just curious" is not a defense).
- The rule we live by: **No permission = don't.**
- Responsible disclosure: if you find a flaw in a system you *did* get permission to test, report it through the agreed channel — don't publish it.

**Concept 2 — Bits, Bytes & Encoding (first principles):**
- A **bit** is a single switch: 0 or 1. The smallest unit of information a computer knows.
- A **byte** = 8 bits = 256 values (0–255) = one text character.
- Text is encoded: ASCII maps 'A' → 65 → binary `01000001`. UTF-8 extends this to all world languages.
- Why it matters: files, packets, and passwords are all just bytes. "Cracking a password" or "analysing malware" = manipulating bytes.

## 2b. Topic Connections & Examples (the "why it links" layer)
**Connection A — Ethics ↔ Bits (the two Day-1 topics are not separate):**
The *same* byte that is your harmless "Hi" file is, in another context, a stolen password or malware. **What makes data good or bad is not the bits themselves but *authorization* and *intent*.** Ethics governs *whether* you may touch the bytes; bits explain *what* the bytes are. Both return in every module.

**Connection B — Forward links to later days (plant these seeds today):**
- Bits → **Day 2** (CPU/memory run those bits as instructions) → **Day 4** (a web page loads, encrypted by TLS in transit) → **Day 5** (Week 1 portfolio assignment integrating Days 1-4) → **Day 13** (Wireshark shows those bits on the wire) → **Day 15** (Burp lets you alter those bits in a request).
- Ethics → **Day 12** (lab setup = your always-authorized sandbox) → every offensive day (the 2-minute "ethics check" before any exploit).

**Connection C — Backward/context link:** Today is Day 1, so the only link is *forward*. State this out loud so students feel the journey start.

**Concrete Examples to use in class:**
- *Ethics 1:* A researcher found a flaw, kept probing past scope, crossed into unauthorized access, and faced charges. Lesson: scope is a hard wall.
- *Ethics 2:* Practicing on your own lab VM = safe. Scanning a neighbour's Wi-Fi because "it's nearby" = illegal. Same tool, different permission.
- *Bits 1:* "Hi" = bytes `48 69` (hex) = `01001000 01101001` (binary) — the literal on-disk representation.
- *Bits 2:* A 1 MB file = 1,048,576 bytes = 8,388,608 bits. Feel the scale.
- *Encoding:* 'é' in UTF-8 = 2 bytes (`c3 a9`), not 1. Breaks "1 char = 1 byte" (relevant to AppSec input handling later).

## 3. Timing Guide (90 min)
| Segment | Time | Activity |
|---------|------|----------|
| A. Learning Objectives | 3 min | State the 3 goals |
| B. Learning Journey Check | 4 min | Show full 20-day map; "Today is the first step" |
| C. Review | 0 min | (None — Day 1) |
| D. Soft-Skills Moment | 12 min | How to take good notes + read documentation |
| E. New Concepts | 28 min | Ethics (12) + Bits/Bytes (16) with analogy |
| F. Diagram & Real-World | 10 min | "Postal system" of authorization; ASCII table diagram |
| G. Live Demo / Lab | 25 min | Ethics pledge; binary conversion; hex dump |
| H. Quiz / Assignment | 8 min | Exit quiz + homework handout |
| **Total** | **90** | |

## 4. Analogies
- **Ethics/Authorization → "A locksmith with a warrant":** A locksmith can open any lock, but only the ones they're *authorized* to. Same skill, different legality based on permission. A locksmith who opens houses for fun is a burglar.
- **Bits/Bytes → "A row of light switches":** Each bit is one switch (on=1, off=0). Eight switches in a row show 256 patterns. One pattern = one letter.
- **Encoding → "Morse code for machines":** Morse maps letters to dots/dashes; ASCII maps letters to bit patterns. Same information, different representation.

## 5. Common Misconceptions
- *"If I'm not doing it for money, it's not illegal."* Wrong — unauthorized access is illegal regardless of motive.
- *"It's fine if the system is publicly accessible."* Wrong — public ≠ authorized to test. Bug-bounty programs exist to grant permission.
- *"Hacking means binary/math genius."* Wrong — binary is simple counting in base-2.
- *"A byte is the same as a bit."* Wrong — 1 byte = 8 bits.
- *"Encoding = encryption."* Wrong — encoding is representation; encryption hides meaning (covered D5 TLS).

## 6. Demo Script
**Demo 1 — Ethics pledge (5 min):** Project the one-line pledge; read aloud; explain "in writing" removes ambiguity; have each student sign (printed or shared doc). Collect as the class's first artifact.

**Demo 2 — Text to binary (8 min):** Type `A`; show ASCII 65; convert via powers of two (64+1 → `01000001`); do `B`=66=`01000010` to show the +1 pattern.

**Demo 3 — Hex dump (7 min):** Create `hello.txt` with "Hi"; run `xxd hello.txt`; point out `48 69` = 'H' 'i' (72, 105 decimal); show hex = 4 bits per digit. Tie back: "Malware is just bytes like this."

**Demo 4 — Lab walkthrough (5 min):** narrate the steps in lab-guide.md.

## 7. Lab Solution (answers instructors should see)
- Task 1: signed pledge. Task 2: first letter → ASCII → 8-bit binary (e.g., 'J'=74=`01001010`). Task 3: hex bytes of name.txt match ASCII (e.g., first byte `4A`='J'). Confirms understanding.

## 8. FAQ
- **Q: Found a vuln on a site by accident?** Stop testing, document, report via responsible-disclosure/bug-bounty channel. Never keep probing.
- **Q: Is practicing on my own home router illegal?** Usually your own equipment is fine, but check ISP terms. The Academy lab (D12) is always safe.
- **Q: Memorize the ASCII table?** No — understand the principle; you'll always have a table/tool.
- **Q: Why learn binary if tools do it?** So you understand what tools show. A SOC analyst seeing `0x90` and knowing it's a NOP sled understands an exploit.
- **Q: Test a friend's website?** Only with explicit written permission covering scope.

## 9. Examples Bank (reusable across cohorts)
- Ethics: authorized-lab vs neighbour-Wi-Fi; researcher-charged-after-scope-creep.
- Bits: "Hi" = `48 69` hex = `01001000 01101001` binary; 1 MB = 8,388,608 bits.
- Encoding: 'é' = 2 UTF-8 bytes `c3 a9`.
- Bridge line (say twice): "The bits don't care if they're a love letter or a virus — *you* decide, with permission."

> **Assessment:** see rubric.md (separate file, per the 7-file standard).
