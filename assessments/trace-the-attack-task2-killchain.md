# Trace the Attack · Task 2 — Break the Chain

**Type:** Research + analysis (counts toward the *Trace the Attack* assignment)
**Model used:** the 6-stage kill chain from the *Malwares & Cyber Attacks* deck —
`Recon → Delivery → Exploit → Install → C2 → Actions`
**Time:** ~3–4 hours · open-book, cited
**Deliverable:** one filled table + two short written sections (below), added to your *Trace the Attack* portfolio document.

> *(For reference: the original Lockheed Martin model has 7 stages — it adds "Weaponization" between Recon and Delivery. This course uses the 6-stage version. If your source describes weaponization, fold it into either Recon or Delivery and say which.)*

---

## Scenario

You are a junior analyst on a threat-intelligence team. Your lead hands you one real, public breach and says:

> *"Don't just tell me the story — everyone can Google the story. Show me the chain. For every link, tell me one specific thing the victim could have done to break it right there. Then tell me the earliest point they could have stopped the whole thing — and what that would have cost them."*

That write-up is this task.

---

## Objectives

1. Map a real attack to every stage of the 6-stage kill chain, using cited evidence.
2. For each stage, name **one specific defensive control** that would have broken the chain at that point.
3. Identify which CIA property each stage threatened.
4. Judge — and defend — the **earliest realistic** point the attack could have been stopped.
5. Reason about **defense in depth**: what catches the attack if your first control fails.

---

## Step 1 — Pick ONE breach

Choose one. Two vetted starting sources are listed for each — you must find and cite **at least one more** of your own.

| Breach | Year | Why it's a good chain to study | Starter sources |
|--------|------|-------------------------------|-----------------|
| **Target** | 2013 | Textbook chain — starts at a third-party HVAC vendor, ends at 40M card numbers. The US Senate report is literally a kill-chain analysis. | US Senate Commerce Committee, *"A 'Kill Chain' Analysis of the 2013 Target Data Breach"* (2014); Krebs on Security, "Target" tag |
| **WannaCry** | 2017 | Worm — no phishing needed. Shows Exploit + self-propagation, and a kill switch as an accidental C2 control. | CISA Alert **AA17-132A**; Wikipedia, "WannaCry ransomware attack" |
| **NotPetya** | 2017 | Supply-chain Delivery (a hijacked Ukrainian tax-software update), then destructive Actions. | Andy Greenberg, *Wired*, "The Untold Story of NotPetya" (2018); CISA Alert **TA17-181A** |
| **SolarWinds (SUNBURST)** | 2020 | Supply-chain Delivery at scale — malicious code signed into a real Orion update. Long, quiet C2. | CISA Emergency Directive **21-01**; Mandiant/FireEye, "Highly Evasive Attacker… SUNBURST Backdoor" |
| **Colonial Pipeline** | 2021 | Simple entry (one leaked VPN password, no MFA), huge Actions impact (fuel shortage). | CISA/FBI Joint Advisory on **DarkSide** ransomware; US congressional testimony of the Colonial Pipeline CEO (2021) |
| **Change Healthcare** | 2024 | Recent. One portal without MFA → ALPHV/BlackCat ransomware → national prescription outage. Already covered as a case study in the course's *Malwares & Cyber Attacks* deck. | US HHS breach reporting; UnitedHealth Group CEO testimony to Congress (2024) |

**Ethics note:** these are publicly documented breaches. You are doing **defensive analysis** of what already happened — the same "attack + defend" thinking used all through the course. Do not attempt any technique described.

---

## Step 2 — Fill the chain table

One row per stage. Be specific — "better security" is not a control; "enforce MFA on all remote-access accounts" is.

| Stage | What the attacker actually did (with your cited source) | Control that would have broken the chain **here** | CIA property threatened |
|-------|--------------------------------------------------------|--------------------------------------------------|------------------------|
| **1. Recon** — find and study the target | | | |
| **2. Delivery** — get the attack to the target | | | |
| **3. Exploit** — trigger the weakness | | | |
| **4. Install** — gain a persistent foothold | | | |
| **5. C2** — the foothold phones home for instructions | | | |
| **6. Actions** — what the attacker came to do (steal / encrypt / destroy) | | | |

Rules:
- Every "what happened" cell needs an inline source (e.g. *(Senate report, p.4)* or *(CISA AA17-132A)*).
- If a stage is genuinely unknown from public reporting, write **"Not publicly documented"** and say what you'd expect based on the other stages — don't invent details.
- Each control must be a real, named practice (MFA, network segmentation, application allow-listing, egress filtering, EDR, patch SLA, email attachment sandboxing, least privilege, offline backups, etc.).

---

## Step 3 — Earliest stopping point (4–6 sentences)

Of the six stages, which is the **earliest realistic point** this specific breach could have been stopped? Name the stage and control, then defend the choice — including a brief cost comparison: what would that control have cost the victim to have in place, versus what the breach actually cost them? (Earliest is the primary test; cost is your supporting evidence, not a separate requirement — the earliest stage and the cheapest control won't always be the same thing, and if they aren't here, say so and explain which one wins the trade-off.)

## Step 4 — Defense in depth (4–6 sentences)

Pick the **Delivery or Exploit** stage. Assume your control there *failed* (the phish got clicked, the exploit landed). Walk forward: which of your **later** controls would still have caught the attack, and at which stage would the damage have been contained? This is the argument for layered defense — one control failing shouldn't mean game over.

---

## Deliverables (add to the Trace the Attack portfolio document)

- The completed 6-row chain table, with ≥3 distinct cited sources total.
- Step 3 — earliest stopping point.
- Step 4 — defense-in-depth walk-forward.
- A short **Sources** list (3+ entries: title, author/publisher, year, URL).

## Rubric

| Criterion | Strong (3) | Adequate (2) | Needs work (1) |
|-----------|-----------|--------------|----------------|
| Stage mapping | All 6 stages correctly identified; actions match the sources | 1–2 stages misplaced or thin | Story retold, not mapped to stages |
| Controls | Every stage has a specific, named, realistic control that truly breaks the chain there | Some controls vague or misplaced | Generic ("be more secure") or missing |
| Evidence | ≥3 distinct credible sources; claims cited inline; no invented details | 2 sources or weak citation | Uncited, or fabricated specifics |
| CIA mapping | Correct property per stage, briefly justified | Mostly correct | Missing or wrong |
| Earliest stopping point (Step 3) | Clear choice, defended with cost reasoning | Choice made, weak reasoning | Missing or unsupported |
| Defense in depth (Step 4) | Concrete walk-forward; names which later control catches it and where damage stops | Partial | Missing |

**Pass mark:** 12/18. A submission scoring 16–18 is portfolio-quality.

## Bonus (+2)

Add a 7th row for **"Weaponization"** (the Lockheed stage this course folds away) and explain where it sits in your breach and why the 6-stage model merges it.
