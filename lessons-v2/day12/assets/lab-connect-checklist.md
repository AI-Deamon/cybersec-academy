# Lab connect checklist — Day 12 (the gate)

**Goal:** by the end of Day 12 you can reach the lab targets from Kali and you've snapshotted.
Nobody starts Day 13 without this.

Fill in the real values (your instructor gives you `<LAB_HOST>` and any VPN/credentials):

```
LAB_HOST   = ____________________
VPN / net  = ____________________   (if the lab is behind a VPN)
Kali login = ____________________   (shared Kali only)
```

## Path A — your own Kali VM (preferred)

1. [ ] VM boots, you're logged in, `ip a` shows an address.
2. [ ] On the lab network / VPN connected (if required).
3. [ ] `ping -c3 <LAB_HOST>`  → replies  *(if ICMP is blocked, skip to step 4)*
4. [ ] `curl -I http://<LAB_HOST>:8080`  → an HTTP response (200 / 302 / 401 all fine)
5. [ ] Browser: `http://<LAB_HOST>:8080` (DVWA) and `:3000` (Juice Shop) load
6. [ ] `python3 scanner.py <LAB_HOST>`  → lists open ports
7. [ ] **VM → Snapshot** ("day12-clean") so you can always roll back
8. [ ] Record target details in your Engagement Journal, Phase 1

## Path B — shared class Kali (fallback for weak/locked laptops)

1. [ ] `ssh <you>@<shared-kali-host>`  (password / key from the instructor)
2. [ ] `curl -I http://<LAB_HOST>:8080`  → an HTTP response
3. [ ] `python3 ~/scanner.py <LAB_HOST>`  → open ports
4. [ ] Your home directory on the shared box is yours — keep your journal there and `git push`
5. [ ] Tell the instructor you're on Path B so your own VM gets fixed in office hours

## If nothing works

- Note exactly where it fails (VM won't boot / no network / can't reach `<LAB_HOST>` /
  targets don't load) and tell the instructor. This is a Day 13 fix — you are not behind.
