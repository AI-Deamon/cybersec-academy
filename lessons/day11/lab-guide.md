# Day 11 — Lab Guide
**Goal:** Practice the Day 11 mental model on paper — classify scenarios by CIA, estimate risk, and spot untrusted input. No tools, no systems touched.

**Prerequisites:** None (this is a thinking lab). Pen + the worksheet, or a shared doc.

---

## Task 1 — Classify by CIA (10 min)
For each scenario, write which CIA property is broken (C / I / A):
1. An attacker downloads the full customer database. → ______
2. A bug silently changes order amounts in the database. → ______
3. A DDoS takes the shop offline during a sale. → ______
4. Someone forges "from: boss@company" on an email. → ______
5. A backup tape is wiped by a flood. → ______

## Task 2 — Estimate risk + response (8 min)
For ONE scenario above, write:
- Threat (who/what): ______
- Vulnerability (weakness): ______
- Impact (how bad): ______
- Response you'd pick (accept/mitigate/transfer/avoid): ______

## Task 3 — Spot the untrusted input (8 min)
For each, name the untrusted input and the check that should happen:
1. A website shows a comment exactly as typed. → input: ______ ; check: ______
2. A program opens a file whose name comes from user input. → input: ______ ; check: ______
3. An API trusts a "user ID" sent by the browser. → input: ______ ; check: ______

---

## ✅ Checkpoint (show instructor before leaving)
- [ ] Classified all 5 scenarios into C/I/A
- [ ] Wrote a threat/vuln/impact + response for one
- [ ] Named untrusted input + check for all 3 Task-3 items

## Note
This lab builds judgment, not muscle. Days 12-15 give you safe systems to *exercise* it. The untrusted-input answers (XSS, path traversal, IDOR) are taught on Days 15-16 — today you just *spot* that input is involved.

> ⚠️ **Ethics (Day 1):** classify and reason only. Do not test any of these against real systems.
