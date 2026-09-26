# Day 7 — Slide-by-Slide Explain + Demo Walkthrough
Synced to your deck **Linux_Permissions_Blueprintday 7.pptx** (13 slides). For each slide: **Say** = what to explain while it's on screen. **Do** = terminal commands to run live, only on the slides where a demo belongs. Everything connects back to Days 1–6 and forward to Day 8/16/19 — say the connections out loud, don't just think them.

**Setup:** your own instructor demo machine/VM with `sudo`. Large terminal font. Keep the Restaurant→Computer metaphor alive throughout (Manager = OS, key cabinet = permissions).

---

## Before Slide 1 — Opening Hook (2 min, lights up, deck not advanced yet)

**Say:** "Quick lap through the course so far. Day 1: everything's bits, and touching someone else's data without permission is an ethics problem first. Day 2: bits become *processes*, and every process runs *as someone*. Day 3–4: those processes talk over a network. Day 5: you wrote that whole story yourself. Day 6: we opened the machine and I told you there's a key cabinet — permissions — deciding who's allowed to do what. I didn't open it.

Today we open it. And today's not just reading labels — I'm going to create a real user in front of you and hand them a real permission, and we'll watch the OS enforce it live."

---

## Slide 1 — Title: "Opening the Key Cabinet"
**Say:** "Module 2, Day 7. Yesterday the cabinet was closed. Today we open it — Linux permissions, start to finish."

## Slide 2 — The Architecture of Privilege
**Say:** "This is the whole session in one picture: root/user/group/other keys, and the 'who may do what' test. Point at the terminal snippet on the right — `ls -l /etc/shadow`, `chmod 755 script.sh` — that's exactly what we're about to type for real. Most servers, clouds, and security tools run Linux, so this permission model is the clearest version of privilege you'll ever see."

## Slide 3 — The Singular Root Landscape
**Say:** "Rule 1: no drive letters, everything's under one `/`. Rule 2: paths are addresses — `/home/you`, `/etc`, `/var/log`. That crossed-out Windows tree on the right is deliberate — Linux never looks like that."
**Do (quick, live):**
```
pwd
```
**Say:** "One tree, and this is exactly where I am in it right now."

## Slide 4 — The Bash Walkie-Talkie
**Say:** "Five commands, five jobs: `whoami` = identity check, `pwd` = location check, `cd` = movement, `cat` = inspect a file's contents, `ls -l` = open the key cabinet and read every label."
**Do:**
```
whoami
ls -l
```
**Say:** "There's the long listing — permissions, owner, group, all in one line, for everything in this folder."

## Slide 5 — The Linux Lens (signature diagram)
**Say:** "Same OS diagram from Day 6 — User → Shell → OS → Disk — just relabeled for Linux: your account, Bash, the rwx key cabinet, the single `/` tree. Nothing new here, just today's accent on a diagram you've already seen."

## Slide 6 — The Staff Roster
**Say:** "User = one identity, checked with `whoami`. Group = a shift team that shares access. Root = the master key — can bypass every lock — invoked temporarily and *logged* via `sudo`. The rosters live in `/etc/passwd` and `/etc/group` — we look, we never hand-edit them."
**Do:**
```
tail -5 /etc/passwd
```
**Say:** "This is the actual roster on this machine right now. Watch — in a few minutes I'm going to add a name to this list."

## Slide 7 — Decoding the Key Cabinet
**Say, pointing at each bracket left to right on `drwxr-xr--`:** "Type — file or folder. Owner — the creator, full rights. Group — the assigned team, read+execute here, no write. Other — everyone else, read only. Say it as one sentence out loud: owner full, group enter-and-look, others look-only."

## Slide 8 — The Reality of Rights
**Say:** "Same letters, different meaning by type. `r` on a file = `cat` it; on a folder = `ls` it. `w` on a file = edit/delete it; on a folder = add/remove files inside. `x` on a file = run it as a program; on a folder = `cd` into it. That folder `x` is the one people always get wrong — it doesn't mean 'run the folder,' it means 'you may enter it.'"

## Slide 9 — The Locksmith Protocol — **live demo starts here (10–12 min)**
**Say (before typing anything):** "`chmod` changes the rwx bits — but only on what you *own*. `chown` transfers ownership entirely — that needs the master key, root. Let's not just talk about this — let's actually create a person and watch both of these enforced."

**Names used below:** admin = you (`bot` in the tested run) · new hire = `bug` · shared group = `code`. Rename if you like — just stay consistent.

**Why the file lives in `/tmp`, not a home folder:** a home directory is `750` by default (`drwxr-x---`) — only the owner's *own* group can enter it. If the demo file sits inside your home folder, a different user gets blocked at the *folder* before Linux ever checks the file's own permissions, even after a correct `chmod`/`chgrp`. `/tmp` is world-enterable (`1777`), so it isolates the lesson to the file's permissions, which is the thing you're actually teaching. (This is worth saying out loud once, briefly — it's a genuine Day-16-flavored gotcha: every directory in a path is checked, not just the final file.)

### Do — create the new hire and prove the OS enforces identity
```
sudo useradd -m bug
tail -3 /etc/passwd
ls -l /home
```
**Say:** "One command, bug is a real account on the roster, with a home folder built automatically — already permissioned so nobody else wanders in by default."

```
sudo -iu bug
whoami
cd /root
cat /etc/shadow
exit
```
**Say:** "Bug, blocked twice. Not typos — the OS checked identity before running either command. That's Day 6's key cabinet, not theoretical anymore."

### Do — chmod: give bug a specific, narrow permission
```
cd /tmp
touch test1.txt
chmod 600 test1.txt
ls -l test1.txt
sudo -u bug cat /tmp/test1.txt
```
**Say:** "`600` — only I can touch this. Denied for bug, as expected. Now watch me grant *just enough* access, not everyone's."
```
sudo groupadd code
sudo usermod -aG code bug
sudo chgrp code test1.txt
chmod 640 test1.txt
sudo -u bug cat /tmp/test1.txt
```
**Say:** "Works now — bug is specifically in `code`, and the file's group is `code`. That's `chmod` and groups doing exactly the job the slide describes: modify keys, but only for what you control."

*(`sudo -u bug` re-checks bug's groups fresh on every call — no need for a login shell here, unlike the earlier `/root` check.)*

### Do — revoke, then chown: the master-key-only move
```
chmod 600 test1.txt
sudo -u bug cat /tmp/test1.txt
```
**Say:** "One command, `chmod 600`, and bug's locked out again. Permissions aren't a one-time setting."
```
sudo chown bug test1.txt
ls -l test1.txt
sudo -u bug cat /tmp/test1.txt
```
**Say:** "This is different — I just transferred *ownership* to bug, not just access. Needed `sudo` because handing off ownership is the one move that requires the master key. Now it works because bug *owns* it outright."

---

## Slide 10 — The Paradigm of Privilege (755 vs 777)
**Say:** "755 — owner full, everyone else look-and-enter — is the boring, secure default. 777 is every role getting full control. Let's see it, not just read it."
**Do:**
```
chmod 777 test1.txt
ls -l test1.txt
```
**Say:** "`rwxrwxrwx`. Owner, group, and *every account on this machine* — read, write, execute. That's the chaotic side of this slide, live."

## Slide 11 — Keys Left in the Door
**Say:** "This is why 777 is never a fix. Attackers actively scan for exactly this — world-writable configs, world-readable `/etc/shadow`. The defense is least privilege: minimum rights for the job, enforced with `chmod`."
**Do — fix it immediately, on camera:**
```
chmod 600 test1.txt
```
**Say:** "Back to locked down. That fix took one command — there's never an excuse to leave a 777 sitting around."

## Slide 12 — The Forensic Habit
**Say:** "One question, every time you touch a system: *as WHICH user, with WHICH rights?* Ask it before you run a command, not after something breaks. And remember — if a file's 777, everyone holds a key. Day 16 is entirely about how attackers walk through that open door."

### Do — cleanup before moving to the lab
```
sudo userdel -r bug
sudo groupdel code
rm /tmp/test1.txt
```
**Say:** "Always clean up your demo accounts and files — same instinct as not leaving a key in a door."

## Slide 13 — Today's Lab Blueprint → hand off to students
**Say:** "Three phases, and you just watched me do a bigger version of all three: Phase 1, `pwd` to locate yourself. Phase 2, `ls -l` and decode a permission string. Phase 3, `touch` a file and `chmod +x` it — carve your own execute notch. One safety rule, same as I followed: never `chmod 777`, and only touch permissions on files inside your own home folder."
**Transition line:** "I created a whole new person and handed them a key. You're doing the small version — a file of your own. Go."

---

## Quick reference — commands introduced today
| Command | What it does |
|---|---|
| `whoami` / `pwd` / `ls -l` / `cd` / `cat` | Identity, location, key-cabinet view, movement, inspect |
| `useradd -m <name>` | Create a user + home folder (`sudo`) |
| `groupadd <name>` / `usermod -aG <group> <user>` | Create a group / add a user to it (`sudo`) |
| `chgrp <group> <file>` | Change a file's group label |
| `chmod <mode> <file>` | Change owner/group/other rights on a file you own |
| `chown <user> <file>` | Change who owns a file (`sudo`) |
| `userdel -r <name>` / `groupdel <name>` | Cleanup after the demo |

## Guardrails
- User-creation demo runs on your instructor machine/VM only — never a shared student login.
- Keep the demo file in `/tmp` (or another `755`/`1777` shared folder) — **not** inside anyone's home directory. Home folders are `750` by default, so a different user gets blocked at the folder itself, before your `chmod`/`chgrp` on the file is ever checked. That failure mode is real (it happened in testing) and it's confusing to debug live.
- The `777` step is shown and fixed within the same minute — never leave it standing.
- Run the Slide 12 cleanup before advancing to Slide 13, even if you're short on time.
- If `sudo groupadd code` or `sudo useradd -m bug` errors "already exists," a previous run wasn't fully cleaned up — run the Slide 12 cleanup block first, then retry.
