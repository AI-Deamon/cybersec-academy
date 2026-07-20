---
marp: true
theme: academy
paginate: true
title: Day 1 — Cyber Ethics + What's Inside a Computer
footer: "Practical Cyber Security: From First Principles · Day 1 · Module 1"
---

<!-- _class: lead -->

# Day 1
## Cyber Ethics + What's Inside a Computer

**Practical Cyber Security: From First Principles** · Module 1 · Day 1 of 20

---

## Why are we learning this?

Before any tool, you need **two things**:

- **A moral & legal compass** — so "learning" never slides into "crime."
- **That all digital data is just 1s and 0s** — the floor every later lesson stands on.

> Where used: *every* security role — you cannot defend what you cannot describe.
> Careers: malware analyst · forensics · SOC · pentester · cloud security.

<div class="callout remember"><span class="label">Remember</span>Today = a compass, and the atoms of data.</div>

---

## The 20-Day Learning Journey

```text
MODULE 1 · FOUNDATION        MODULE 3 · THINK LIKE A PRO
[Day 1] Ethics + Bits ◀ YOU  Day 11  CIA / Risk / Untrusted-Input
 Day 2  How Programs Run      Day 12  Lab Setup & Methodology
 Day 3  What is a Network     Day 13  Wireshark + Nmap
 Day 4  Web Page Loads        Day 14  Vulnerability Scanning
                             Day 15  WEEK 3 WORKSHOP
MODULE 2 · THE OS            MODULE 4 · APPLY
 Day 5  WEEK 1 WORKSHOP       Day 16  Web Security (OWASP)
 Day 6  OS Fundamentals       Day 17  Network Security
 Day 7  Linux Fundamentals    Day 18  Cloud + Secure Coding
 Day 8  Windows Fundamentals  Day 19  Incident Response + Blue Team
 Day 9  Python for Security   Day 20  WEEK 4 CAPSTONE
 Day 10 WEEK 2 WORKSHOP
```

Today is the first step of a 20-day path — every later day builds on these two ideas.

---

## Ethics: Authorized vs Illegal

<div class="two-col">
<div class="col author">

### ✅ Authorized (ethical)
- Testing **with permission, in writing**
- Inside **agreed scope**
- Reporting what you find

</div>
<div class="col illegal">

### ⛔ Illegal
- Systems you're **not authorized** for
- "Just to learn" is **not** a defense
- Intent doesn't make it legal

</div>
</div>

> **The rule we live by: No permission = don't.**
> *Locksmith vs burglar* — same skill, different permission. Permission is the only difference.

<div class="callout warning"><span class="label">Warning</span>Unauthorized access is a crime in most jurisdictions, regardless of intent. This applies to every offensive day in this course.</div>

---

## Responsible Disclosure

Finding a flaw in a system you *were* authorized to test?

1. **Report it privately** through the agreed channel — don't publish.
2. Give the owner time to fix before any public detail.
3. **Bug-bounty programs = written permission** to test within scope.

<div class="callout tip"><span class="label">Pro Tip</span>The professional move is always: find → report → help fix. Never exploit beyond what the scope allows.</div>

---

## Bits & Bytes

A **bit** is a single switch: `0` or `1` — the smallest piece of information a computer knows.

A **byte** = **8 bits** = 256 possible patterns = enough for one text character.

<div class="diagram">

```text
[1][0][1][0][0][0][0][1]   ← 8 switches
    = 65 in decimal
    = 'A'  (one byte = one character)
```

</div>

> Bits are a row of light switches: 8 switches → 256 patterns, one pattern per letter. That's how a whole book becomes switches.

---

## Encoding (ASCII / UTF-8)

Text is **encoded** — a number stands for a character:

- `'A'` → **65** → binary `01000001`
- UTF-8 extends this to **every world language**

<div class="callout definition"><span class="label">Definition</span><strong>Encoding ≠ Encryption.</strong> Encoding is a public, reversible mapping (A = 65). Encryption hides meaning with a secret key. Both work on bytes — but only encryption keeps a secret.</div>

---

## See it: the Hex Dump

`xxd hello.txt` shows the raw bytes of a file:

```text
$ xxd hello.txt
00000000: 4869 0a                        Hi.
```

- `48` = decimal 72 = **'H'**
- `69` = decimal 105 = **'i'**

<div class="callout remember"><span class="label">Remember</span>A photo, a password, a virus — all of it is bytes like these. "Analysing malware" means reading bytes.</div>

---

## Soft-Skills Moment

Security work is mostly **reading and writing**, not just running tools.

**Structured notes** (use this all course):
- **Objective** — what am I trying to learn/do?
- **Key point** — the one thing I'll remember.
- **One question** — what's still unclear?

<div class="callout tip"><span class="label">Pro Tip</span>Reading the docs is a superpower. The best analysts write things down.</div>

---

## How Today Connects

The **same byte** can be a love letter *or* malware.

- Bits say **what** data is. Ethics says **whether you may touch it.**

```text
        [ byte: 01000001 ]
         ╱        │        ╲
   love letter   malware    anything
        │            │
   safe (ethics ✅)  dangerous (ethics ⛔)
```

**Forward:** Day 2 (CPU runs bits) → Day 4 (page loads, TLS) → Day 5 (Week 1 portfolio) → Day 13 (Wireshark shows bytes) → Day 15 (Burp changes them). Ethics → Day 12 (your always-authorized lab).

---

## Lab Preview & Exit Quiz

**Lab (in your authorized range):** sign the ethics pledge · convert your initial to binary · `xxd` your own name.

**Exit quiz (4 questions):**
1. State the course's ethics rule in one sentence.
2. Ethical hacking requires: permission / profit / scope / writing? (pick all)
3. `'A'` in ASCII = ___ decimal = ___ binary.
4. Encoding is the same as encryption. **True / False — and why?**

<div class="callout remember"><span class="label">Remember</span>Today you left with a compass and the atoms of data. Everything from here is built on both.</div>
