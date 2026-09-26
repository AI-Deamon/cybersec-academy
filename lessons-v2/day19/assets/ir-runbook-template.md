# IR runbook — compromised web server (small company)

*Day 19 artifact. 2-3 bullets per phase. This is what you'd want ready BEFORE an incident.*

## 0. Prepare (done in advance)
- [ ] Who can authorise disconnecting a production server? (name + backup)
- [ ] Contacts: management, legal, comms, the hosting provider, cyber-insurer, local law enforcement / CERT
- [ ] Offline/immutable backups exist and are tested
- [ ] Logging on and retained (auth, web, network, endpoint) for ≥ 90 days
- [ ] This runbook is printed / offline-accessible (the network may be down)

## 1. Detect & analyse
-
-
-

## 2. Contain  (isolate, don't obliterate)
-
-
-

## 3. Eradicate
-
-
-

## 4. Recover
-
-
-

## 5. Lessons learned
-
-
-

---

## Do-NOT list (during an incident)
- Do **not** pull the plug reflexively (volatile evidence; tips off the attacker)
- Do **not** log in to the compromised box with a privileged account (credential exposure)
- Do **not** talk to press / customers without comms + legal
- Do **not** pay a ransom without management, legal, insurer, and law-enforcement input
- Do **not** "clean" and return to service — rebuild from known-good, rotate all credentials
