# Course Design Document — "Practical Cyber Security: From First Principles"
*Phase 2 deliverable. Built on Academy Design Document v1.0 (Approved). 20-day foundational course.*

> **Document status:** ✅ **COMPLETE** · **Week 1 FROZEN as Production Ready v1.0** (per ADD §16 Freeze Rule). Do not alter Week 1 content without post-teaching student evidence. See the "Status — documents complete" note at the end of this file.

This document is the **20-day blueprint**: per-class learning objectives, labs, and homework, structured by the fixed class template (ADD §9) and the Four Context Questions (ADD §4). Lesson *production* (full Instructor + Student packages) happens in Phase 3, one day at a time.

---

## Learning Journey Map (shown to students on Day 1)

```
MODULE 1: BUILDING THE FOUNDATION          MODULE 3: THINKING LIKE A PRO
Day 1  Ethics + Bits/Bytes                 Day 11 CIA / Risk / Untrusted-Input
Day 2  How Programs Run                     Day 12 Lab Setup & Methodology
Day 3  What is a Network                    Day 13 Wireshark + Nmap
Day 4  TCP/UDP/DNS/Page Load               Day 14 Vulnerability Scanning
Day 5  WEEK 1 ASSIGNMENT (portfolio)        Day 15 WEEK 3 PORTFOLIO ASSIGNMENT (workshop)
                                              |
MODULE 2: UNDERSTANDING THE OS             MODULE 4: APPLYING IN THE REAL WORLD
Day 6  OS / Linux vs Windows / Shell        Day 16 Web Security (OWASP)
Day 7  Linux Fundamentals                   Day 17 Network Security
Day 8  Windows Fundamentals                 Day 18 Cloud + Secure Coding + Defense
Day 9  Python Basics                        Day 19 Incident Response + Blue Team
Day 10 Bash/Python Automation               Day 20 WEEK 4 PORTFOLIO (capstone, workshop)
```

Each class opens with the Journey Check: *"Yesterday we learned… Today we're here… Tomorrow we'll build on…"*

---

# MODULE 1 — BUILDING THE FOUNDATION

## Day 1 — Cyber Ethics + What's Inside a Computer
**Four Questions**
- *Why:* A moral/legal compass before any tool; data is the atom of everything we analyse.
- *Connect:* The very first step of the journey; every later layer is built on "data" and "rules."
- *Use:* Every security role requires authorization awareness; bits/bytes underpin all analysis.
- *Solve:* Tell ethical from illegal testing; explain how all data is just 1s and 0s.
**Objectives:** Define ethical hacking vs. illegality; state the authorization rule; explain bits/bytes/encoding; articulate the Academy mental model.
**Lab:** Sign the ethics pledge; convert a word to binary by hand; inspect a file's hex dump in a hex editor.
**Homework:** Read the ethics pledge; write one sentence: "I will only test systems I am authorized to test."

## Day 2 — How Programs Run
**Four Questions**
- *Why:* Vulnerabilities are bugs in how code executes; you must know CPU/memory/processes.
- *Connect:* Yesterday's "data" now becomes "instructions the CPU runs."
- *Use:* Malware analysis, exploit development, DFIR memory forensics.
- *Solve:* Explain how a program crash can become arbitrary code execution.
**Objectives:** Explain CPU/registers/memory/processes/kernel-vs-user; describe how a program loads; relate to security.
**Lab:** Open htop/Task Manager; identify a process PID and memory use; safely end a harmless process.
**Homework:** Draw the path from source code → binary → running process in memory.

## Day 3 — What Is a Network
**Four Questions**
- *Why:* Systems talk over networks; most attacks cross the wire.
- *Connect:* The standalone computer (D1–2) now connects to others.
- *Use:* Network security, pentest, SOC, IR.
- *Solve:* Explain how two machines find each other and send data.
**Objectives:** Define packet/IP/MAC; explain the "postal system" analogy; draw a simple LAN.
**Lab:** `ping` a site; run `traceroute`; identify your own IP and MAC.
**Homework:** Diagram your home network: device → router → ISP.

## Day 4 — TCP/UDP, DNS, and How a Web Page Loads
**Four Questions**
- *Why:* The "conversation rules" define what is even possible to attack.
- *Connect:* Yesterday's packets now gain structure (ports, sessions, names).
- *Use:* Web pentest, network analysis, protocol work.
- *Solve:* Explain step-by-step what happens when you type a URL.
**Objectives:** Explain TCP handshake, UDP, ports, DNS resolution; trace a full page load. Include a one-line TLS bridge: *the page is delivered encrypted over HTTPS (TLS)* — full TLS detail is observed in the Week 1 assignment's Wireshark task.
**Lab:** `nslookup`/`dig` a domain; observe a request in browser DevTools → Network (no Wireshark yet — that's Day 13).
**Homework:** Write the 7-step story of loading example.com.

## Day 5 — WEEK 1 PORTFOLIO ASSIGNMENT (not a lecture)
Per the Weekly Assessment Structure (ADD §12), Day 5 integrates Days 1-4 into one portfolio piece.
- **Scenario:** "When I type example.com and press Enter, what actually happens — and is it safe?"
- **Objectives:** connect ethics→bits→programs→network→TCP into one story; demonstrate safe tool use; produce a portfolio PDF.
- **Tasks (guided):** (1) write the 5-layer "Website Story"; (2) screenshot the browser process in Task Manager/`htop` (PID+memory); (3) observe DNS + HTTPS/443 via **browser DevTools** (Wireshark is an *optional bonus*); (4) reflection.
- **Deliverables:** written story + screenshots → one portfolio PDF "Week 1 — The Website Story."
- **Rubric & Reflection:** see `assessments/week01-assignment.md`.
- **TLS coverage:** taught via the Day 4 bridge + the assignment's HTTPS-in-DevTools observation (Wireshark is an optional bonus). Concept is covered, not dropped.
- **Session 5 in-class flow (the reinforcement WORKSHOP):** (1) **Review** the week's key ideas (20–30 min); (2) **Q&A** — students ask questions (20 min); (3) **Assignment briefing** — walk the scenario, objectives, deliverables, and rubric (15 min); (4) **Guided in-class work** — students start the assignment with the instructor available (remaining time). The assignment is then **completed over the weekend (no classes Sat/Sun)** and **submitted before Day 6** (next Monday); Week 2 starts fresh. Day 5 is explicitly a *workshop*, not a lecture. (Week 2's Day 10 workshop follows the same flow and submits before Day 11; spec at `assessments/week02-assignment.md`.)

**Per-module checkpoint (after Day 5):** draw the full "how a web page loads" pipeline from bytes (Day 1) through TLS (Day 4 bridge) — the same pipeline the assignment asks students to explain.

# MODULE 2 — UNDERSTANDING THE OPERATING SYSTEM

## Day 6 — What an OS Does; Linux vs Windows; the Shell
**Four Questions**
- *Why:* The OS is the layer attackers target and defenders harden.
- *Connect:* Programs (D2) run on an OS (today) over a network (D3–5).
- *Use:* Sysadmin, SOC, IR, pentest.
- *Solve:* Explain the OS's role between hardware and applications.
**Objectives:** Explain OS duties; compare Linux vs Windows; describe what a shell is.
**Lab:** Open a shell on both (or in VMs); run `uname` and `ver`; compare outputs.
**Homework:** One paragraph — which OS would you harden first and why.

## Day 7 — Linux Fundamentals
**Four Questions**
- *Why:* Linux runs most servers and cloud; a core skill.
- *Connect:* The shell (D6) now does real work.
- *Use:* Cloud, servers, pentest, SOC.
- *Solve:* Navigate, read, and control a Linux system via CLI.
**Objectives:** Use filesystem paths, `ls`/`cd`/`cat`/`grep`, `chmod`/`chown`, users/`sudo`.
**Lab:** Create users; set file permissions; deliberately break then fix perms; find a file with `grep`.
**Homework:** Build a cheat-sheet of 10 Linux commands with a one-line purpose each.

## Day 8 — Windows Fundamentals
**Four Questions**
- *Why:* Most desktops and Active Directory environments are Windows.
- *Connect:* Counterpart to D7 — same concepts, different tools.
- *Use:* Blue team, IR, AD security.
- *Solve:* Manage a Windows system via CLI; understand users/services.
**Objectives:** Use PowerShell/CMD basics; explain users/groups/services/registry.
**Lab:** `Get-Process`, `Get-Service`; create a user; view a registry key.
**Homework:** Compare a Linux vs Windows command for the same 3 tasks.

## Day 9 — Python Basics
**Four Questions**
- *Why:* Scripting automates security work; you must write, not just click.
- *Connect:* OS skills (D7–8) now become programmable.
- *Use:* Automation, tooling, exploit, analysis.
- *Solve:* Write a small script that performs a useful task.
**Objectives:** Use variables, loops, conditionals, functions, file reading in Python.
**Lab:** Write a script that reads a file and prints lines containing a keyword.
**Homework:** Modify the script to count matches.

## Day 10 — WEEK 2 PORTFOLIO ASSIGNMENT (not a lecture)
**Four Questions**
- *Why:* Combine OS + scripting into one coherent, reportable outcome.
- *Connect:* D6–D9 converge into "who controls the machine" + safe automation.
- *Use:* Hardening, reporting, junior analyst weekly task.
- *Solve:* Harden a shared workstation and report it; flag weak permissions with a script.
**Objectives:** Connect the Week 2 story (OS concept → Linux `rwx` → Windows ACL → Python Process) into one explainer; demonstrate a safe `chmod` on Linux and read an ACL on Windows; write a read-only Python script that flags world-readable files; produce a portfolio PDF.
**Type:** Less guided (Week 2 of the 4-week progression) — goal + success criteria given; student chooses commands.
**Homework:** Complete the assignment over the weekend; submit before Day 11.
**Full spec:** `assessments/week02-assignment.md` (six-part shape, rising independence from Week 1).

---

# MODULE 3 — THINKING LIKE A SECURITY PROFESSIONAL

## Day 11 — CIA Triad, Threats/Vulns/Risk, Untrusted-Input Model
**Four Questions**
- *Why:* The vocabulary of security thinking.
- *Connect:* All tech layers (D1–10) now viewed through a security lens.
- *Use:* Every role.
- *Solve:* Explain any incident using CIA + risk; apply the untrusted-input question.
**Objectives:** Define CIA; threats/vulns/risk; state the mental-model question.
**Lab:** Take 3 news breaches; map each to a CIA pillar + root cause.
**Homework:** Write the untrusted-input analysis of one app you use daily.

## Day 12 — Lab Setup & Methodology
**Four Questions**
- *Why:* A safe, isolated environment before any testing.
- *Connect:* Ethics (D1) becomes operational safety.
- *Use:* All hands-on work from here.
- *Solve:* Stand up an isolated lab you fully control.
**Objectives:** Install Docker + Linux VM; start Juice Shop; explain scope/authorization.
**Lab:** `docker run` Juice Shop; confirm reachable only on localhost; take a snapshot.
**Homework:** Document your lab topology in one diagram.

## Day 13 — Wireshark & Nmap
**Four Questions**
- *Why:* See the wire and map what is exposed.
- *Connect:* Network theory (D3–5) becomes active recon.
- *Use:* Network pentest, SOC, IR.
- *Solve:* Capture traffic and discover live hosts/services.
**Objectives:** Capture with Wireshark; run Nmap host/port scan on your lab; read output.
**Lab:** Wireshark filter for DNS; Nmap your lab VM; list open ports.
**Homework:** Explain one Nmap flag's effect; write a safe-scan checklist.

## Day 14 — Vulnerability Scanning
**Four Questions**
- *Why:* Find known weaknesses fast, then triage.
- *Connect:* Nmap (D13) → deeper vulnerability identification.
- *Use:* Vulnerability management, pentest, GRC.
- *Solve:* Run a scan and tell what is urgent vs noise.
**Objectives:** Run Nuclei/OpenVAS on the lab; interpret severity; prioritize.
**Lab:** Scan Juice Shop; categorize findings by severity; pick the top 3.
**Homework:** Write a one-page triage of the top findings.

## Day 15 — WEEK 3 PORTFOLIO ASSIGNMENT (not a lecture)
**Four Questions**
- *Why:* Consolidate Module 3 — methodology + recon + scanning + risk into one professional report.
- *Connect:* D11 (CIA/risk) + D12 (methodology/range) + D13 (recon) + D14 (scan/triage) converge into one assessment.
- *Use:* Security posture review — a real junior-analyst / assessment task.
- *Solve:* Scope → test safely in the range → triage by risk → report.
**Objectives:** Apply the Day 12 methodology end-to-end; recon (Nmap) + scan (vuln scanner) the range target; triage findings by Day 11 risk into a prioritized fix list; produce a posture-review report (portfolio PDF).
**Type:** Scenario-based (Week 3 of the 4-week progression) — a realistic brief; student chooses tools/method within the range.
**Homework:** Complete the assignment over the weekend; submit before Day 16.
**Full spec:** `assessments/week03-assignment.md` (six-part shape, rising independence from Weeks 1-2).
**Note:** the "Web/app tools — Burp, DevTools, secure-coding intro" originally slated here is delivered at the **start of Day 16** (Web Security Fundamentals), where interception tools belong with web-app attack + defense. Day 15 stays a pure consolidation workshop.

---

# MODULE 4 — APPLYING CYBERSECURITY IN THE REAL WORLD

## Day 16 — Web Security Fundamentals (OWASP)
**Four Questions**
- *Why:* Web is the most common attack surface.
- *Connect:* HTTP/TLS (D5) + recon/scan (D13-14) → real web vulns; Burp/DevTools + secure-coding intro delivered **here**, at the start of Day 16 (where interception tools belong with web-app attack + defense).
- *Use:* AppSec, pentest.
- *Solve:* Find & fix a common web vuln (e.g., SQLi/XSS) in the lab.
**Objectives:** Explain the OWASP Top 10 at a high level; demonstrate one injection/XSS; show the fix.
**Lab:** In Juice Shop, perform a SQLi login bypass; then apply the parameterized-query fix conceptually.
**Homework:** For 3 OWASP categories, write one sentence attack + one sentence defense.

## Day 17 — Network Security Fundamentals
**Four Questions**
- *Why:* Defend the wire once you know how it is attacked.
- *Connect:* Network recon (D13) → network defense.
- *Use:* Network security, SOC, firewall/IDPS.
- *Solve:* Explain a network attack and its control (e.g., MITM, sniffing).
**Objectives:** Explain network threats (sniffing, spoofing, MITM); defenses (segmentation, TLS, firewall).
**Lab:** Demonstrate ARP-spoof risk in lab; define a firewall rule; verify with Nmap.
**Homework:** Design simple secure network segmentation for a small office.

## Day 18 — Cloud Security + Secure Coding + Defensive Security
**Four Questions**
- *Why:* Modern systems live in the cloud; defense is built in code.
- *Connect:* OS (M2) + secure coding (D15) → cloud & defense.
- *Use:* Cloud security, DevSecOps, AppSec.
- *Solve:* Spot a cloud misconfig and a code flaw; propose the fix.
**Objectives:** Explain shared responsibility; find a misconfig in the lab container; apply a secure-coding fix.
**Lab:** In the misconfig lab, find an open storage exposure; apply least-privilege fix.
**Homework:** Write a secure-coding checklist for your language of choice.

## Day 19 — Incident Response + Monitoring + Blue Team
**Four Questions**
- *Why:* When prevention fails, detection & response matter.
- *Connect:* All attack knowledge → defending operationally.
- *Use:* SOC, IR, blue team.
- *Solve:* Follow an IR playbook on a simulated incident.
**Objectives:** Explain IR phases (identify→contain→eradicate→recover→lessons); use basic monitoring/logs.
**Lab:** Given a log with an attack, identify Indicators of Compromise; write a containment step.
**Homework:** Draft a 5-step IR plan for a small business.

## Day 20 — WEEK 4 PORTFOLIO ASSIGNMENT (capstone workshop — not a lecture)
**Four Questions**
- *Why:* Integrate the whole course into one open-ended capstone; point to the future.
- *Connect:* Every prior day converges — machine (W1) → OS (W2) → think-like-pro (W3) → apply (W4) — into one project + a career map.
- *Use:* All domains; specialization choice.
- *Solve:* Complete a cross-domain find-&-fix capstone; choose a next path.
**Objectives:** Demonstrate a find-&-fix across web + network + cloud (in range); walk an IR scenario (Day 19); present career-roadmap understanding; self-assess against the Definition of Success (ADD §13).
**Type:** Mini-capstone (Week 4 of the 4-week progression) — open-ended, integrates the whole course.
**Homework/Final:** Final quiz; one-page "which specialization and why" (Career Roadmap); Final Reflection (four "So What" + self-assessment).
**Full spec:** `assessments/week04-assignment.md` (six-part shape + Career Roadmap + Final Reflection; rising independence → open-ended capstone).
**Note:** the "Career Roadmap + Final Reflection" originally listed for Day 20 is delivered here, as the capstone's closing tasks. Day 20 stays a pure consolidation/finale workshop.

---

## Per-Module Checkpoints
- After Module 1: draw the full "how a web page loads" pipeline from bytes to TLS.
- After Module 2: administer a user/permission change on both Linux and Windows.
- After Module 3: run a scan and triage the top findings with the untrusted-input lens.
- After Module 4: capstone + final quiz + career reflection (Definition of Success, ADD §13).

## Next Phase
Per the Academy Design Document v1.0 (§10, §14), the workflow is:
- ✅ **Phase 1 — Academy Design:** COMPLETE (Academy Design Document v1.3 — educational philosophy + governance).
- ✅ **Phase 2 — Course Design:** COMPLETE (Course Design Document — 20-day blueprint; Week 1 frozen).
- ✅ **Phase 3 — Lesson Documentation:** COMPLETE (all 20 days built; 7-file packages for lecture days 1-4, 6-14, 16-19; workshop assignments for Days 5/10/15/20). Instructor-guide is the source of truth; `student-guide` carries the PPT Outline.
- ⭐ **Phase 3.5 — Academy Presentation Design System:** ✅ COMPLETE. Defines `Presentation-Design-Standard-v1.0.md` (typography, color, diagram, code-block, callout, animation, image, slide-order rules) **and** `Visual-Asset-Library-v1.0.md` (reusable signature diagrams, icons, network/cloud/OS symbols, attack/defense legend). **No deck is built before these exist.**
- **Phase 4 — Presentation Production (Markdown/Marp source → PPTX):** (a) build the **Academy Master Template** once; (b) build **Day 1** to validate template + asset library; (c) **freeze Template v1.0**; (d) generate remaining decks day-by-day reusing the frozen template. Source format = **Markdown (Marp)** (Git-diffable, AI-editable); export to PPTX only for teaching. Opens with "Why are we learning this?". Lecture days = full decks (standardized 11-slide order); workshop days (5/10/15/20) = shorter assignment-briefing decks (10-15 slides).
- **Phase 5 — Review & Polish:** full pass + version-history updates against the Definition of Success (ADD §13).

Day 1 is the reference template all other days copy.

**Weekly assignments (added):** Day 5/10/15/20 are portfolio assignments per ADD §12; Week 1 template at `assessments/week01-assignment.md`. These are authored as part of Phase 3 alongside their lecture days.

**The 5-session week (official cadence):** the course runs four 5-session weeks (Mon–Fri). Sessions 1–4 teach new concepts; **Session 5 is a dedicated reinforcement class** — Review → Assignment briefing → Guided planning — after which students complete the assignment over the weekend and submit before the next Monday. Day 5/10/15/20 follow this Session-5 structure. See ADD §12 for the full rhythm.

**Status — documents complete:** Academy Design Document and Course Design Document are **Complete**. **Week 1 is FROZEN as Production Ready v1.0** (per ADD §16 Freeze Rule). Do not refine Week 1 without post-teaching student evidence.

**Version note:** updated to adopt the official 5-session week cadence (ADD §12) — Session 5 is a structured reinforcement class (Review → Briefing → Guided planning); assignment completed over the weekend, submitted before the next Monday.
