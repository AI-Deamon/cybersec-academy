# Day 1 pair activity — breach cards

Print one card per pair (cut along the lines). Model answers are in `../teacher-notes.md`.
Each pair fills: (1) which CIA pillar(s) failed, (2) the weakness in one sentence,
(3) was the attacker authorized or committing a crime?

---

## Card A — Equifax (2017)

Equifax, a US credit-reporting company, was breached in 2017. Attackers accessed the personal
records of roughly **147 million people** — names, dates of birth, Social Security numbers,
some driver's licence and credit-card numbers.

The entry point: a **known vulnerability in a public-facing web application** (Apache Struts)
for which a patch had been available for months but was not applied. Attackers moved through
internal systems undetected for about 76 days.

---

## Card B — Large data exposure via an open API

A widely-used Indian digital service was found to expose personal data (names, phone numbers,
identifiers linked to a national ID system) through an **API endpoint that did not properly
check who was asking**. Anyone who could construct the right request could pull records that
should have required authentication.

Security researchers discovered it and **notified the operator and the press**. There was
public debate about whether the researchers should have tested it at all.

---

## Card C — College result-portal defacement

A university's student result portal was altered overnight: the front page was replaced with
the attacker's message, and for several hours students could not check their marks.

Investigation found the portal ran an **out-of-date content-management system with a default
administrator password** that had never been changed.

---

## Card D — WannaCry (2017)

In May 2017 the **WannaCry** ransomware spread to about 200,000 computers across 150 countries
in two days. Infected machines had their files **encrypted** and displayed a ransom demand;
many organisations — including parts of the UK's National Health Service — could not use their
systems, and appointments and operations were cancelled.

WannaCry spread automatically using **EternalBlue**, an exploit for an old, unpatched Windows
file-sharing protocol (SMBv1). Microsoft had released a patch two months earlier. Many victims
had no recent offline backups.
