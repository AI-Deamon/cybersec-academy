# Lab connect checklist — Day 12 (the gate)

**Goal:** by the end of Day 12 your lab is reachable and you know how to reset it. Nobody starts
Day 13 without this.

## Path A — your own lab from Day 11 (preferred — most of you are already done)

Your targets: Metasploitable2 `10.89.1.10`, DVWA `10.89.1.20`, Juice Shop `10.89.1.30`.

1. [ ] Ubuntu (WSL2) opens; `~/lab.sh status` shows `msf2`, `dvwa`, `juiceshop` all **Up**
       *(stopped? `~/lab.sh up`, wait ~60 s for DVWA)*
2. [ ] `sudo nmap -sn 10.89.1.0/24` → finds all three plus the gateway `.1`
3. [ ] `nmap -sV -Pn -p 21,22,23,25,80,3306,5432 10.89.1.10` → real service versions (not "filtered")
4. [ ] `curl -sI http://10.89.1.20/` and `curl -sI http://10.89.1.30:3000/` → both answer
5. [ ] **Know your reset:** containers don't "snapshot" like a VM — they're disposable. Write down
       the one-line rebuild for each (from `assets/lab-setup-student-guide.md` Step 4) so that if a
       later exercise leaves a target broken, `sudo podman rm -f <name>` + that one command gets you
       back to clean in under a minute.
6. [ ] Record all three addresses in your Engagement Journal, Phase 1 section.

*Didn't finish Day 11's homework, or on a Mac/ARM laptop that can't run WSL2?* → **Path B.**

## Path B — shared class Kali (fallback)

Fill in the real values (your instructor gives you `<LAB_HOST>` and any VPN/credentials):

```
LAB_HOST   = ____________________
VPN / net  = ____________________   (if the lab is behind a VPN)
Kali login = ____________________
```

1. [ ] `ssh <you>@<shared-kali-host>`  (password / key from the instructor)
2. [ ] `curl -I http://<LAB_HOST>:8080`  → an HTTP response (200 / 302 / 401 all fine)
3. [ ] Browser: `http://<LAB_HOST>:8080` (DVWA) and `:3000` (Juice Shop) load
4. [ ] `python3 ~/scanner.py <LAB_HOST>`  → lists open ports
5. [ ] `nmap -sV <LAB_HOST>`  → real service versions
6. [ ] Your home directory on the shared box is yours — keep your journal there and `git push`
7. [ ] Tell the instructor you're on Path B, so your own Day-11 lab gets fixed in office hours
8. [ ] Record the target details in your Engagement Journal, Phase 1

## If nothing works

- Note exactly where it fails (WSL won't start / `podman` errors / can't reach `10.89.1.x` /
  targets don't load) and tell the instructor. This is a Day 13 fix — you are not behind. Move
  to Path B for today.
