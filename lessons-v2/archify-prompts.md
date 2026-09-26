# Archify diagram prompts — all days

Ready-to-run prompts for building the course's live diagrams with the `archify` skill.
Days 3 and 4 are already built (9 diagrams) — this file covers the rest.

**How to run one:** invoke the `archify` skill and paste a single prompt block below. Each
block is self-contained. After it builds, wire it into the deck (a `LIVE DIAGRAMS` line in the
run-sheet speaker notes + the `teacher-notes.md` "Live diagrams" table), rebuild the deck
(`npx marp dayNN/dayNN.md --theme-set templates/dark-monospace-theme.css -o dayNN/dayNN.html`
and again with `--pptx`), and append a line to `lessons-v2/CHANGELOG.md`.

**Shared house style (every prompt assumes this):** output to `lessons-v2/dayNN/archify/`,
files `NN-slug.<type>.json` + `.html`. `schema_version 1`, `quality_profile: showcase`,
`animation: trace`, 3–4 `views`, exactly two cards — one content card + one amber **"Class
check"** card whose 3 questions match that day's exit check. Custom `meta.legend` labels in
plain student words (never the default "policy / PII / async batch"). Dataflow `viewBox` 1068
wide; sequence diagrams use `column_fit: spread` and a `viewBox` tall enough that every message
sits inside the timeline. Sublabels ≤ ~21 characters. Validate `--quality showcase` (require
9/9, 0 errors), then `deliver`, then `visual-check`. If unsure of the diagram type, run
`archify guide "<scenario>"` first. Keep the course's one running analogy
(kitchen → postal → phone call → OS-as-restaurant); don't invent new metaphors.

★ = the day's anchor diagram (build first).

---

## Day 1 — What security is, and the line

### ★ 01-cia-triad (dataflow)
Build `lessons-v2/day01/archify/01-cia-triad.dataflow.json` + `.html`, house style.
Title "The CIA Triad: Three Things We Protect". Show one protected asset fanning out to three
pillars, each with the failure it prevents: **Confidentiality** (secrecy — breach/leak),
**Integrity** (trust — tampering/forgery), **Availability** (uptime — outage/ransomware). Make
clear a control can help one pillar while hurting another (e.g. heavy encryption vs
availability). Views: one per pillar. Class-check: "Which pillar fails when a database is
leaked but unchanged?"; "Which fails in a ransomware lockout?"; "Name a control that trades one
pillar for another."

### 02-authorization-line (workflow)
Build `lessons-v2/day01/archify/02-authorization-line.workflow.json` + `.html`, house style.
Title "The Line: Authorized or Not". Same technical action (e.g. a port scan) entering a
decision: **do you have written authorization + is it in scope?** → yes = legitimate security
work; no = illegal under the IT Act 2000, regardless of intent or skill. Show that the *action*
is identical on both branches — only permission differs. Class-check: "What single thing moves
an action from legal to illegal?"; "Does good intent make an unauthorized scan legal?"; "Where
is the scope defined?"

---

## Day 2 — Hardware, the OS, how a program runs

### ★ 01-source-to-process (dataflow)
Build `lessons-v2/day02/archify/01-source-to-process.dataflow.json` + `.html`, house style.
Title "From Code You Write to a Process That Runs". Stages: **source** (the text you write) →
**compiler/interpreter** → **binary on disk** (a file, doing nothing) → **loaded into RAM** →
**process** (running, has a PID). Emphasize the disk→RAM step is where a file *becomes* a live
process. Views: write / build / load / run. Class-check: "What's the difference between a
program and a process?"; "Where does a PID first exist?"; "A binary sitting on disk — is it a
process?"

### 02-user-kernel-mode (architecture)
Build `lessons-v2/day02/archify/02-user-kernel-mode.architecture.json` + `.html`, house style.
Title "Two Floors: User Mode and Kernel Mode". A security boundary between **user mode** (apps,
limited) and **kernel mode** (the OS, full hardware access). Show a syscall as the only
sanctioned crossing (an app asking the OS to touch hardware/files/network). Note this boundary
is itself a defence. Class-check: "Why can't an app touch hardware directly?"; "What is a
syscall?"; "Why is the user/kernel split a security feature, not just tidiness?"

---

## Day 5 — Cryptography (locks, seals, signatures)

### ★ 01-three-jobs (dataflow)
Build `lessons-v2/day05/archify/01-three-jobs.dataflow.json` + `.html`, house style.
Title "Three Jobs of Cryptography". Three parallel lanes from a plain message:
**Encryption** → secrecy (only the key-holder reads it); **Hashing** → tamper-evidence (any
change is detectable); **Signatures** → authenticity (proves who sent it + integrity). Make
clear these are different jobs, often combined. Class-check: "Which job hides content?"; "Which
proves a file wasn't changed?"; "Which proves who sent it?"

### 02-key-exchange (sequence)
Build `lessons-v2/day05/archify/02-key-exchange.sequence.json` + `.html`, house style.
Title "Symmetric vs Asymmetric: Solving Key Exchange". Two participants. Show the symmetric
problem (both need the same secret key — how do you share it safely?) then the asymmetric fix
(public key encrypts, only the private key decrypts; so a public key can travel in the open).
Class-check: "Why is a shared secret key hard to distribute?"; "Which key is safe to publish?";
"Which key must never leave its owner?"

### 03-tls-handshake (sequence)
Build `lessons-v2/day05/archify/03-tls-handshake.sequence.json` + `.html`, house style.
Title "The TLS Handshake — Now With the Certificate Check". Client ↔ server: client hello →
server hello + **certificate** → client verifies the cert was **signed by a trusted CA** →
session key agreed → encrypted traffic. This is the Day 4 padlock, opened up now that
signatures are taught. Class-check: "What does the certificate prove?"; "Who vouches for it?";
"What happens if the signature doesn't verify?"

---

## Day 6 — Files, the tree, the shell

### ★ 01-pipeline (dataflow)
Build `lessons-v2/day06/archify/01-pipeline.dataflow.json` + `.html`, house style.
Title "A Shell Pipeline: Data Down the Assembly Line". Stages showing one one-liner, data
transforming at each stage: `cat access.log` → `grep 404` (filter) → `sort` → `uniq -c` →
`head` (top few). Each arrow shows the data shrinking/changing. Emphasize each tool does one
job; the pipe (`|`) hands output to the next. Class-check: "What does `|` actually pass?"; "Why
chain small tools instead of one big one?"; "Which stage does the filtering?"

### 02-find-vs-grep (dataflow)
Build `lessons-v2/day06/archify/02-find-vs-grep.dataflow.json` + `.html`, house style.
Title "find vs grep: Names vs Contents". Side-by-side: **find** walks the directory tree
matching file *names/attributes*; **grep** scans *inside* files matching *content lines*.
Same starting folder, different question answered. Class-check: "You know part of a filename —
which tool?"; "You know a phrase inside an unknown file — which tool?"; "What does each one
actually search?"

---

## Day 7 — Permissions, users, sudo

### ★ 01-suid-escalation (workflow)
Build `lessons-v2/day07/archify/01-suid-escalation.workflow.json` + `.html`, house style.
Title "Privilege Escalation via SUID". A normal user runs a **SUID-root** binary → the binary
executes *as root* → if that binary can be abused (spawns a shell, reads any file), the user
now has root. Contrast with the intended, safe use. This is the crack in "who can do what".
Class-check: "What does the SUID bit change about execution?"; "Why is a SUID shell so
dangerous?"; "How would you find SUID files?"

### 02-permission-check (dataflow)
Build `lessons-v2/day07/archify/02-permission-check.dataflow.json` + `.html`, house style.
Title "How Linux Decides: Owner, Group, Other". A process requests a file → the kernel checks:
are you the **owner**? else in the **group**? else **other** — and applies that class's **rwx**
bits → allow or deny. First matching class wins (owner bits apply even if group is broader).
Class-check: "If you're the owner but owner-bits say no, do group bits save you?"; "What three
classes are checked, in order?"; "What are the three permission bits?"

---

## Day 8 — Windows: who can do what

### ★ 01-access-check (dataflow)
Build `lessons-v2/day08/archify/01-access-check.dataflow.json` + `.html`, house style.
Title "Windows Access Check: Token Meets ACL". A process carries an **access token** (user SID
+ group SIDs) → asks for a resource → Windows walks the resource's **NTFS ACL** (ordered ACEs)
→ **deny** ACEs win, else first matching **allow** grants → access allowed/denied. Mirror the
Day 3 firewall diagram's shape on purpose. Class-check: "What's in an access token?"; "Do deny
or allow entries win?"; "Where do the SIDs come from?"

### 02-uac-elevation (sequence)
Build `lessons-v2/day08/archify/02-uac-elevation.sequence.json` + `.html`, house style.
Title "UAC: Two Tokens for One Admin". An admin logs in and gets a **filtered (standard)
token** for normal use; an action needing admin triggers the **UAC consent prompt** →
on approval, the **elevated token** is used just for that process. Class-check: "Why does an
admin run with a standard token by default?"; "What does clicking 'Yes' on UAC hand over?"; "Is
the whole session elevated, or just that process?"

---

## Day 9 — Scripting a scanner

### ★ 01-ping-sweep (workflow)
Build `lessons-v2/day09/archify/01-ping-sweep.workflow.json` + `.html`, house style.
Title "A Ping Sweep: One Loop, Many Hosts". A loop over an IP range → for each host: **ping** →
branch **reply / no reply** → collect the live hosts into a list. Show the loop-back edge. This
is `sweep.sh` as a picture. Class-check: "What's the repeated step?"; "What decides if a host
goes on the list?"; "What does the loop produce at the end?"

### 02-five-blocks (dataflow)
Build `lessons-v2/day09/archify/02-five-blocks.dataflow.json` + `.html`, house style.
Title "The 5 Building Blocks — Bash and Python". Show the five (variables, input/output,
conditionals, loops, functions) once, mapped across a Bash column and a Python column so
students see the *same ideas*, different syntax. Class-check: "Name the five blocks."; "Is a
loop a different idea in Bash vs Python?"; "When would you reach for Python over Bash?"

---

## Day 10 — Threat modelling

### ★ 01-trust-boundaries (architecture)
Build `lessons-v2/day10/archify/01-trust-boundaries.architecture.json` + `.html`, house style.
Title "Attack Surface & Trust Boundaries". A simple web app (browser → web server → app → DB)
with **trust boundaries** drawn where data crosses from less-trusted to more-trusted (internet
→ server, app → DB). Every boundary crossing is an entry point / attack surface. Class-check:
"What is a trust boundary?"; "Where's the attack surface in this app?"; "Why does data crossing
a boundary need validating?"

### 02-threat-model-method (workflow)
Build `lessons-v2/day10/archify/02-threat-model-method.workflow.json` + `.html`, house style.
Title "Threat Modelling: The Method". Steps: **decompose the system** → **find entry points /
assets** → **enumerate threats** → **rank by risk (likelihood × impact)** → **pick
mitigations**. A repeatable loop, not a one-off. Class-check: "What comes before listing
threats?"; "How is risk scored here?"; "What's the output of the process?"

---

## Day 11 — How attackers get in

### ★ 01-email-auth (dataflow)
Build `lessons-v2/day11/archify/01-email-auth.dataflow.json` + `.html`, house style.
Title "SPF · DKIM · DMARC: Checking an Inbound Email". A receiving mail server runs an inbound
message through three checks: **SPF** (did it come from an IP the domain authorized?), **DKIM**
(is the signature valid / untampered?), **DMARC** (do SPF/DKIM align with the From domain, and
what to do on fail?). End: deliver / quarantine / reject. Note what it does NOT stop:
look-alike domains and hacked-but-legit mailboxes. Class-check: "Which check verifies the
sending IP?"; "Which verifies the message wasn't tampered?"; "Does passing all three mean the
mail is safe?"

### 02-phish-anatomy (dataflow)
Build `lessons-v2/day11/archify/02-phish-anatomy.dataflow.json` + `.html`, house style.
Title "Anatomy of a Phish". One phishing email broken into the parts that lie: **display name**
vs real address, **look-alike domain**, **urgency/pretext**, **the link** (hover ≠ text),
**the ask** (creds / payment / attachment). Class-check: "Where does the real sender hide?";
"Why hover the link before clicking?"; "What's the emotional lever?"

### 03-c2-beacon (sequence)
Build `lessons-v2/day11/archify/03-c2-beacon.sequence.json` + `.html`, house style.
Title "A C2 Beacon: Calling Home". An infected host ↔ attacker's C2 server: on a timer the
implant **beacons out** (looks like normal outbound web traffic) → C2 replies with a **task** →
host runs it → returns results → sleeps → repeats. Emphasize outbound-initiated (beats inbound
firewalls) and the regular interval as a detection signal. Class-check: "Why beacon outbound
instead of the attacker connecting in?"; "What makes the timing detectable?"; "Why does it look
like web traffic?"

---

## Day 12 — The pentest lifecycle

### ★ 01-lifecycle (lifecycle)
Build `lessons-v2/day12/archify/01-lifecycle.lifecycle.json` + `.html`, house style.
Title "The Penetration-Test Lifecycle". Six phases: **scope/ROE** → **recon** → **scanning** →
**exploitation** → **post-exploitation** → **reporting**, with the loop back from findings to
deeper recon. Add a note lane: the blue team sees the *same* phases from the defender's side.
Class-check: "Which phase authorizes everything else?"; "What's the deliverable of the last
phase?"; "Where can the process loop back?"

---

## Day 13 — Recon and Nmap

### ★ 01-ssh-vs-ftp (sequence)
Build `lessons-v2/day13/archify/01-ssh-vs-ftp.sequence.json` + `.html`, house style.
Title "On the Wire: FTP vs SSH". Two logins captured by a sniffer on the path. **FTP (port
21)**: username and password travel as **plain text** — the sniffer reads them. **SSH (port
22)**: the same login is **encrypted** — the sniffer sees scrambled bytes. Same action, one
leaks. This is why cleartext protocols die. Class-check: "What does the sniffer read from the
FTP login?"; "What does it read from SSH?"; "Which port is which, and why prefer SSH?"

### 02-scan-to-assets (dataflow)
Build `lessons-v2/day13/archify/02-scan-to-assets.dataflow.json` + `.html`, house style.
Title "From Nmap Output to an Asset List". Stages: **Nmap scan** → **open ports** →
**service/version per port** → **an asset inventory** (host, service, version — the input to
Day 14's triage). Class-check: "What does an open port tell you?"; "Why does version matter?";
"What does the asset list feed into next?"

### 03-passive-vs-active (dataflow)
Build `lessons-v2/day13/archify/03-passive-vs-active.dataflow.json` + `.html`, house style.
Title "Passive vs Active Recon". Side-by-side: **passive** (public sources — DNS, WHOIS, search,
leaks — target never notices) vs **active** (you touch the target — scans, probes — logged and
noticed). Do passive first. Class-check: "Which recon can the target detect?"; "Name two
passive sources."; "Why go passive first?"

---

## Day 14 — Vulnerability assessment

### ★ 01-triage-pipeline (dataflow)
Build `lessons-v2/day14/archify/01-triage-pipeline.dataflow.json` + `.html`, house style.
Title "Scanner Finding to Ranked Risk". Stages: **scanner finding** → **CVE (identity in the
NVD)** → **CVSS vector (not just the number)** → **is there a public exploit? / is it
reachable?** → **ranked, prioritized list**. Show that two CVSS-9.8s can rank differently once
exploitability and exposure are weighed. Class-check: "What does a CVE give you?"; "Why read the
CVSS vector, not just the score?"; "What single question most changes priority?"

---

## Day 15 — Full lifecycle, on the clock

### ★ 01-playbook (workflow)
Build `lessons-v2/day15/archify/01-playbook.workflow.json` + `.html`, house style.
Title "The One-Page Engagement Playbook". The run-order for the timed team exercise: **confirm
scope** → **recon** → **scan** → **prioritize** → **exploit the top pick** → **capture
evidence** → **write the 2-page report**, with the "stuck? climb the ladder" escalation as a
side branch. Class-check: "What do you confirm before touching anything?"; "What do you capture
as you go?"; "What's the deliverable when the clock stops?"

---

## Day 16 — Web app security (OWASP)

### ★ 01-injection-pattern (dataflow)
Build `lessons-v2/day16/archify/01-injection-pattern.dataflow.json` + `.html`, house style.
Title "The One Pattern: Untrusted Input Reaches a Powerful Sink". Generic flow: **user input**
→ crosses a **trust boundary** → reaches a **powerful sink** (SQL engine, HTML page, OS shell,
file path) → if unsanitized, the input becomes *code/command*. Every OWASP bug is an instance.
Show the fix point: validate/parameterize at the boundary. Class-check: "What's common to SQLi,
XSS, and command injection?"; "Where's the right place to stop it?"; "What turns 'data' into
'code'?"

### 02-sqli (sequence)
Build `lessons-v2/day16/archify/02-sqli.sequence.json` + `.html`, house style.
Title "SQL Injection, Step by Step". Browser → app: input `' OR '1'='1`. App concatenates it
into a query → sends to DB → DB executes the *altered* query → returns rows it shouldn't. Then
the fix: a **parameterized query** treats it as data, DB returns nothing. Class-check: "Why does
`' OR '1'='1` return everything?"; "What did the app do wrong with the input?"; "How does
parameterizing fix it?"

### 03-stored-xss (dataflow)
Build `lessons-v2/day16/archify/03-stored-xss.dataflow.json` + `.html`, house style.
Title "Stored XSS: Your Input Runs in Someone Else's Browser". Attacker submits a comment
containing `<script>` → app **stores it unescaped** → a victim loads the page → the script runs
**in the victim's session** (steals the cookie, acts as them). Fix: output-encode on render.
Class-check: "Whose browser runs the script?"; "Where was the payload stored?"; "What does
output-encoding change?"

---

## Day 17 — Post-exploitation, network & cloud

### ★ 01-attack-chain (workflow)
Build `lessons-v2/day17/archify/01-attack-chain.workflow.json` + `.html`, house style.
Title "The Attack Chain — and Where the Defender Sees It". Two lanes. Attacker: **initial
foothold** → **privilege escalation** → **persistence** → **lateral movement** → **pivot to new
network**. Defender lane: the log/telemetry signal each step leaves. Class-check: "What's the
step after getting a foothold?"; "What is lateral movement?"; "Name one thing a defender could
catch in this chain."

### 02-shared-responsibility (architecture)
Build `lessons-v2/day17/archify/02-shared-responsibility.architecture.json` + `.html`, house
style. Title "Cloud: The Shared Responsibility Model". Split the stack into **provider-secured**
(physical, hypervisor, managed-service internals) vs **customer-secured** (IAM, config, data,
access rules) — and show the two classic customer failures: a **public storage bucket** and an
**over-permissive IAM role**. Class-check: "Who secures the data and its access — you or the
provider?"; "Name the two classic cloud own-goals."; "Is 'the cloud is secure by default'
true?"

---

## Day 18 — AI security

### ★ 01-prompt-injection (dataflow)
Build `lessons-v2/day18/archify/01-prompt-injection.dataflow.json` + `.html`, house style.
Title "Indirect Prompt Injection". Deliberately echo the Day 16 pattern. **Attacker-planted
content** (in a web page / doc / email the LLM will read) → pulled in via **RAG or a tool** →
concatenated into the **LLM's context** → the model follows the hidden instruction → a
**powerful action** (sends data, calls a tool). The bug is: untrusted content reached a
powerful capability. Class-check: "How is this the same shape as SQLi/XSS?"; "Where does the
malicious instruction enter?"; "What makes it *indirect*?"

### 02-three-lenses (dataflow)
Build `lessons-v2/day18/archify/02-three-lenses.dataflow.json` + `.html`, house style.
Title "AI: Target, Weapon, Defender's Tool". Three lanes: AI **as a target** (attacks on the
model — injection, extraction), **as a weapon** (attackers use it — better phishing, faster
malware), **as a defence** (defenders use it — triage, detection). Class-check: "Give one
example per lens."; "Is 'AI security' only about attacking models?"; "How might a defender use
AI?"

---

## Day 19 — Blue team, detection & IR

### ★ 01-ir-lifecycle (lifecycle)
Build `lessons-v2/day19/archify/01-ir-lifecycle.lifecycle.json` + `.html`, house style.
Title "The Incident Response Lifecycle". Phases: **prepare** → **detect & analyze** →
**contain** → **eradicate** → **recover** → **lessons learned**, with recovery loops (detection
can re-fire; lessons feed back into prepare). Class-check: "What phase happens *before* any
incident?"; "Why contain before eradicate?"; "Where do lessons learned go?"

### 02-logs-to-alert (dataflow)
Build `lessons-v2/day19/archify/02-logs-to-alert.dataflow.json` + `.html`, house style.
Title "Logs to Alert: What a SIEM Does". Stages: **sources emit logs** (hosts, network, apps) →
**shipped & normalized** → **SIEM correlates** against rules/IOCs → **alert** → analyst triage.
Logs are ground truth; the SIEM makes them searchable and correlatable. Class-check: "Why
centralize logs at all?"; "What does correlation add over raw logs?"; "What fires an alert?"

---

## Day 20 — Careers and the map (optional, light)

### ★ 01-field-map (architecture)
Build `lessons-v2/day20/archify/01-field-map.architecture.json` + `.html`, house style.
Title "The Map of the Field". **Red team** (offense — pentest, red team, appsec) and **blue
team** (defense — SOC, IR, threat hunting, forensics) as two hubs, plus **the wings** that serve
both (GRC, cloud security, AppSec/DevSecOps) — with lines showing where they hand off to each
other (e.g. purple teaming). Class-check: "Name one red and one blue role."; "Which specialties
serve both sides?"; "Where do red and blue actually collaborate?"
