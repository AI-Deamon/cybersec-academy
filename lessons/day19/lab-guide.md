# Day 19 — Lab Guide
**Goal:** Inside your Day 12 range, walk a **simulated incident** through the IR lifecycle using the tools from earlier days. The incident is *simulated/in-range* — you practice response, not attack. No real exploitation or external targets.

**Scenario (simulated):** A misconfigured cloud bucket (Day 18) exposed credentials; those were used to reach a flat network segment (Day 17) and exploit a web SQLi (Day 16). Your job: respond.

---

## Task 1 — Detect & Analyze (7 min)
Using in-range artifacts/logs:
- Identify the **anomaly**: an IAM/cloud log showing unusual access (Day 18), a network scan signature (Day 17 IDS), and a web SQLi entry in app logs (Day 16).
- Note: individually each looks minor; **together** they are one incident. (This is SIEM correlation — the AI-SIEM idea.)
- State which **CIA** properties are at risk (C: data exposed; I: SQLi; A: if service disrupted).

## Task 2 — Contain (6 min)
- Apply the Day 12/17/18 "fence": **isolate the affected segment** / revoke the exposed credentials so the incident can't spread.
- Explain: segmentation (built earlier) is *why* blast radius is limited.

## Task 3 — Eradicate & Recover (5 min)
- **Eradicate:** close the misconfigured bucket (Day 18), patch the web app (Day 16 fix), rotate the leaked secrets.
- **Recover:** restore clean systems (Day 12 step 7).

## Task 4 — Lessons Learned (4 min)
- Write one sentence: which *preventable* mistake caused this? How would **Security by Design** (Day 18) have prevented it?

---

## ✅ Checkpoint (show instructor before leaving)
- [ ] Placed each stage in the correct IR phase
- [ ] Named the right tool/layer per stage (logs/IDS/SIEM, segmentation, patch/fix, restore)
- [ ] Explained how the "fence" limited blast radius + fed lessons into Security by Design

## Troubleshooting
- *Can't see the "incident":* the lab provides pre-seeded log snippets — ask the instructor where they live. Don't generate real attacks.
- *Unsure which tool:* map each IR stage to its day (Detect→D13/16/17/18; Contain→D12/17/18; Eradicate→D14/16/18; Recover→D12).
- *Wrong target:* stay in-range. Response practice only, no active attack (Day 12 scope).

> ⚠️ **Ethics + scope (Day 1/12):** the incident is simulated on authorized lab infra. You practice the *response*, never launch the *attack*. Containing a simulated incident is legal and educational.
