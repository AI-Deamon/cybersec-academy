# Course Improvement Plan — Evidence-Based, July 2026
**Trigger:** 18 student responses collected 28/07/2026, after Day 7 was taught.
**Governance:** ADD §16 Freeze Rule. Every item below is tagged with its permission basis.
**Status:** Proposed. Owner approval required before any lesson file changes.

---

## 1. What the evidence actually says

| Measure | Result | Read |
|---|---|---|
| Teaching effectiveness | **4.11 / 5** (8×5, 4×4, 6×3) | Good, but a third of the class sits at 3 |
| Clarity of explanations | **4.11 / 5** (7×5, 6×4, 5×3) | Same shape |
| Coursework & assignments | **4.06 / 5** (5×5, 9×4, 4×3) | **Weakest area** |
| Quizzes & assessments | **4.33 / 5** (9×5, 6×4, 3×3) | Strongest area |
| Pace | 14 "just right", 2 too slow, 2 too fast | **No pace change indicated** |
| Assessments reflect teaching | 12 Yes, **6 Somewhat**, 0 No | A third feel a gap |

**No student rated anything 1 or 2.** The course is working. This is an optimisation, not a rescue.

### The one dominant theme
Counting open-text responses, **more practical / hands-on / real-world work** appears in at least 7 of 18 — by a wide margin the most repeated request. Verbatim:

> "still more practical" · "more practical sessions" · "hands on practical session" · "penetration testing skills, tools" · "With real world examples" · "More real world examples and practical applications" ×2 · "little want to slow and more pratical session" · "More hand-on activities and interactive sessions would make it even better"

### Secondary themes
| Theme | Count | Note |
|---|---|---|
| Topic requests: networking / OSI / TCP-IP | 3 | Taught Days 3–4; **they want it deeper, not new** — a retention signal |
| Topic requests: Wireshark | 2 | Already scheduled Day 13 — a **communication** gap, not a content gap |
| Topic requests: Linux commands | 2 | Day 7 was that day; asked for more depth |
| Practice questions + feedback after quizzes | 3 | Cheap, high-impact fix |
| Audio/voice clarity | 1 | Specific and actionable |
| Some Tamil explanation | 1 | Comprehension aid |
| Show scores on assessments | 1 | Same fix as "feedback after quizzes" |

### The critical inference
Students asking for **Wireshark, penetration testing, and networking depth** are asking for **Days 13, 14, 16 and 17 — which are already built and already scheduled.** They don't know what's coming. That is not a curriculum problem; it's a **roadmap-visibility** problem, and it's the cheapest fix in this document.

---

## 2. Your stated goal, written down

From your brief:

> Students should finish with a clear picture of what cyber security is, and a clear goal about which direction to choose — **Blue Team, Red Team**, or another path — with every necessary basic covered to take the next step.

**Gap analysis against the current course:** the ADD requires a "Career Connection" per lesson, and the content genuinely supports both tracks (Days 16–17 lean Red, Days 18–19 lean Blue). But **nothing in the course makes the fork explicit and personal.** A student finishes Day 20 knowing a lot and still not knowing which door they're standing in front of.

This is addressed by items **R1–R3** below and is, in my view, the highest-value change in this plan — because it's the difference between the course meeting your stated goal and merely being good.

---

## 3. Freeze Rule assessment (ADD §16) — read before approving anything

Week 1 (Days 1–4) is `🧊 FROZEN`. The rule permits content change **only after teaching AND only where students actually struggled.**

**Honest reading of the evidence:** the survey shows students wanting **more**, not students **failing to understand**. Those are different things, and the freeze exists precisely to stop "students want more" becoming an excuse for endless expansion.

Therefore, split into three buckets:

| Bucket | Permitted? | What goes here |
|---|---|---|
| **Delivery changes** (demo guides, how you present, roadmap visibility, feedback loops) | ✅ **Always permitted** — not content | Most of this plan |
| **Correctness fixes** (a lab step that cannot work on the stated platform) | ✅ Permitted while frozen, per ADD §16 | W-1 below |
| **New content / added depth in Weeks 1–2** | ⚠️ **Weak evidence.** Recommend **deferring** to the next cohort | Listed in §7, not scheduled |

**My recommendation, and it's a deliberate pushback:** you chose "unfreeze where students struggled." I'd narrow that. The evidence supports **changing how you deliver Week 1**, and a **correctness fix**, but it does *not* clearly show students struggled with Week 1 *content*. Adding material now risks exactly the perfectionism spiral §16 was written to prevent — and it would slow the pace that 14 of 18 students say is already right. **Change delivery now; hold content changes until you have a second cohort's evidence.** Items below reflect that.

---

## 4. Actions — scheduled

### P — Practical (the dominant theme)

**P-1 · Every day gets a demo guide with a hands-on payoff.** ✅ Delivery
Done for Days 8, 9, 11. The pattern: each session ends with a *small real security task performed live*, not just concept talk.
- Day 8 → hunt `Everyone: FullControl` in ACLs (8 lines of PowerShell)
- Day 9 → `permission_hunter.py` finds a world-writable file (a miniature vulnerability scanner)
- Day 11 → live SQL injection **and its fix**
Each is explicitly labelled to students as "this is the actual job."
*Remaining: Days 12, 13, 14, 16, 17, 18, 19.*

**P-2 · Name the career move out loud, every day.** ✅ Delivery
Every demo guide now carries a mandatory **Connection Script** with a `Career:` line — "this specific skill is what a *<role>* does on a Tuesday." Costs 15 seconds; directly serves your stated goal.

**P-3 · Show the attack, then always show the fix.** ✅ Delivery
Formalised in the demo standard. Day 11 demonstrates it (injection → parameterised query). Satisfies both "real-world examples" and the ADD's offensive/defensive pairing rule. **Never show an attack without its fix in the same session.**

---

### R — Roadmap visibility (cheapest, highest ROI)

**R-1 · A 60-second "you are here" map at the start of every session.** ✅ Delivery
Students asked for Wireshark and pen-testing that are *already scheduled*. Fix by saying, every day:
> "Day N of 20. Behind us: X. Today: Y. **Coming: Wireshark on Day 13, vulnerability scanning on Day 14, web attacks on Day 16.**"

Name the exciting future days out loud, by number. This converts "we're not doing the cool stuff" into "the cool stuff has a date."

**R-2 · Publish the 20-day map to students now.** ✅ Delivery · *do this before Day 8*
The `Learning Journey Map` already exists in the CDD. Students have apparently not internalised it. Send it as a one-page image/PDF, and pin it.

**R-3 · Add a Red/Blue fork briefing — Day 19, 10 minutes.** ⚠️ Content-adjacent, Week 4 **not yet taught → design feedback, permitted**
Day 19 already covers Blue Team/IR. Add an explicit fork:
- **Red** (offensive): pen tester, red teamer → built on Days 12–14, 16–17
- **Blue** (defensive): SOC analyst, IR, threat hunter → built on Days 18–19
- **Shared floor:** everything in Weeks 1–2
- Map each back to specific days they have already completed, so the choice feels earned rather than announced.
This is the single item that most directly delivers your stated goal. Add to Day 19 `instructor-guide.md` §2b and the Day 20 capstone briefing.

---

### Q — Quizzes & feedback (3 requests + the "Somewhat" third)

**Q-1 · Return quiz scores with a short review pass.** ✅ Delivery
Three students explicitly asked. 6 of 18 said assessments only "somewhat" reflect teaching — the most likely cause is that they never see *which* answers were wrong. Spend 5 minutes at the start of the next session on the 2 most-missed questions.

**Q-2 · Add 3–5 extra practice questions per day — as a separate optional file.** ✅ Delivery
`lessons/dayNN/practice.md`. **Deliberately NOT in `quiz.md`** — that would be a content change to graded material. A separate optional practice file is additive, ungraded, and doesn't touch frozen assessment content.

**Q-3 · State the source of every quiz question aloud.** ✅ Delivery · *directly targets the "Somewhat" 6*
When reviewing: "Question 3 came from the Day 7 demo where `bug` was refused." Makes the teaching↔assessment link explicit rather than assumed.

---

### D — Delivery mechanics

**D-1 · Audio check before every session.** ✅ Delivery
One student reported unclear voice — likely more affected but only one said so. Add to the pre-flight: 30-second recording, play it back. If you use a headset mic, check position; if laptop mic, consider a cheap USB mic. **Cheapest possible fix to a course-wide comprehension risk.**

**D-2 · Key terms in Tamil, once, at first use.** ✅ Delivery
One request; low cost, no downside. Say the term in English, then once in Tamil at first introduction, then stay in English. Aids retention without fragmenting the material. **Do not translate whole sessions** — the technical vocabulary must stay English for employability.

**D-3 · Don't change pace globally.** ✅ Evidence-based non-action
14 of 18 say pace is right. The 2 "too slow" and 2 "too fast" both also asked for more hands-on — which suggests the complaint is **format**, not speed. P-1 addresses it. **Resist the temptation to speed up or slow down.**

---

### W — Week 1 (frozen)

**W-1 · Verify every Week 1 and Week 2 lab step against Windows + WSL.** ✅ **Correctness fix — permitted while frozen**
Your reported problem — *"some things work, some don't"* — is most likely platform mismatch. Known hazards on your setup:
- `chmod` under `/mnt/c` silently doesn't stick → **would break any permissions lab**
- No systemd in WSL → `systemctl` fails
- `ip addr` in WSL shows a NAT'd `172.x` address, not the laptop's LAN IP → **directly affects Day 3/4 networking labs**
- GUI apps need WSLg or an X server → **affects Day 13 Wireshark**

Where a lab step cannot work as written on the stated platform, that is a **self-contradiction** and ADD §16 explicitly permits fixing it. Log each in the day's `version-history.md` as a freeze-permitted correctness fix.

**W-2 · Do NOT add content to Days 1–4 this cohort.** ⚠️ Deliberate non-action
See §3. Revisit after cohort 2.

---

## 5. Sequenced schedule

| When | Do | Effort |
|---|---|---|
| **Before Day 8** | R-2 (publish map) · D-1 (audio check) · run `day08-check.ps1` | 45 min |
| **Day 8 onward, every session** | R-1 (you-are-here) · P-2 (career line) · Q-3 (name question sources) | 2 min/session |
| **Before Day 9** | Run `day09-check.sh` · rehearse per standard | 30 min |
| **This week** | W-1 (audit Week 1–2 labs on WSL) | 2 hrs |
| **Before Day 11** | Run `day11-check.sh` | 30 min |
| **Rolling** | P-1 demo guides for Days 12, 13, 14, 16–19 | ~1 hr/day |
| **Before Day 19** | R-3 (Red/Blue fork briefing) | 1 hr |
| **After Day 20** | Re-run the survey; compare | 30 min |

---

## 6. How you'll know it worked

Re-run the same Google Form after Day 20 and compare like for like:

| Metric | Now | Target |
|---|---|---|
| Coursework/assignments | 4.06 | **≥ 4.4** |
| "Somewhat" on assessment fairness | 6 / 18 | **≤ 2 / 18** |
| Teaching effectiveness 3-ratings | 6 / 18 | **≤ 3 / 18** |
| Requests for already-scheduled topics | ~5 | **0** (R-1/R-2 should eliminate these entirely) |
| **New question to add:** "Do you know whether you're more interested in Red Team or Blue Team?" | — | **≥ 80% can answer** |

That last row is the direct test of your stated goal. Add the question to the post-course form.

---

## 7. Explicitly deferred (do not do now)

Recorded so they aren't lost, and so the freeze isn't quietly eroded:

- Deeper networking content in Days 3–4 — *wait for cohort 2 evidence*
- Extra Linux command depth in Day 7 — *wait; Day 7 scored well*
- A dedicated pen-testing day — *Days 16–17 cover it; adding a day breaks the 20-day structure*
- Rewriting `quiz.md` files — *use additive `practice.md` instead (Q-2)*
- Full Tamil delivery — *key terms only (D-2)*

---

## 8. Approval

| Item | Basis | Approve? |
|---|---|---|
| P-1 P-2 P-3 (practical + career + attack/fix) | Delivery | ☐ |
| R-1 R-2 (roadmap visibility) | Delivery | ☐ |
| R-3 (Red/Blue fork, Day 19) | Design feedback, not yet taught | ☐ |
| Q-1 Q-2 Q-3 (feedback loop) | Delivery / additive | ☐ |
| D-1 D-2 (audio, Tamil terms) | Delivery | ☐ |
| D-3 W-2 (deliberate non-actions) | Evidence-based restraint | ☐ |
| W-1 (WSL lab audit) | **Correctness fix — freeze-permitted** | ☐ |

On approval, append an entry to each affected `version-history.md` stating what changed, why, and — for frozen days — why it was freeze-permitted.
