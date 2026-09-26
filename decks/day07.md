---
marp: true
theme: academy
paginate: true
title: Day 7 — Linux Fundamentals
footer: "Practical Cyber Security: From First Principles · Day 7 · Module 2"
---

<!-- _class: lead -->

# Day 7
## Linux Fundamentals — The Shell, Files, Permissions, Users

**Practical Cyber Security: From First Principles** · Module 2 · Day 7 of 20

---

## Why are we learning this?

Linux runs **most servers, clouds, and security tools** — and Linux shows its permission model in plain sight.

Learning to *read* `rwxr-xr--` is learning to read **"who may do what"** — the question behind every attack and defense.

> Where used: Linux hardening · privilege escalation · incident response · cloud/container security
> Careers: SOC analyst · pentester · cloud security · forensics

<div class="callout remember"><span class="label">Remember</span>Today you open the key cabinet from Day 6 — on the Linux side.</div>

---

## The 20-Day Learning Journey

```text
MODULE 1 · FOUNDATION        MODULE 3 · THINK LIKE A PRO
 Day 1  Ethics + Bits        Day 11  CIA / Risk / Untrusted-Input
 Day 2  How Programs Run     Day 12  Lab Setup & Methodology
 Day 3  What is a Network    Day 13  Wireshark + Nmap
 Day 4  Web Page Loads       Day 14  Vulnerability Scanning
                             Day 15  WEEK 3 WORKSHOP
MODULE 2 · THE OS            MODULE 4 · APPLY
 Day 5  WEEK 1 WORKSHOP      Day 16  Web Security (OWASP)
 Day 6  OS Fundamentals      Day 17  Network Security
[Day 7] Linux Fundamentals ◀ YOU  Day 18  Cloud + Secure Coding
 Day 8  Windows Fundamentals Day 19  Incident Response + Blue Team
 Day 9  Python for Security  Day 20  WEEK 4 CAPSTONE
 Day 10 WEEK 2 WORKSHOP
```

Yesterday: OS = Manager, Shell = walkie-talkie, Permissions = key cabinet.
**Today: we open the key cabinet — Linux permissions.**

---

## One filesystem, one tree

Linux keeps everything under a **single root `/`** — one big filing cabinet.

No `C:\` drive letters — just branches like `/home/you`, `/etc`, `/var/log`.

<div class="diagram">

```text
        /                        ← root (top of the tree)
       / \
   home    etc                  /etc/passwd (accounts)
     |        \                /var/log (logs)
   you      var
   /  \        \
 notes  scripts  log
```

</div>

> A **path** is an address: `/home/you/notes.txt` tells the OS exactly where to look.

---

## Bash refresher — the walkie-talkie in detail

The shell gives you commands to navigate and inspect:

| Command | What it does |
|---------|-------------|
| `whoami` | Who am I? (your user identity) |
| `pwd` | Where am I? (current directory) |
| `ls -l` | List files **with permission details** |
| `cd` | Move to a directory |
| `cat` | Read a file's contents |

<div class="callout definition"><span class="label">Definition</span><code>ls -l</code> is new today — the <code>-l</code> flag reveals the <strong>key cabinet</strong>: owner, group, and the rwx permission string.</div>

---

## Permissions decoded — the key cabinet, written down

Every file and folder has **3 roles × 3 rights**:

```text
  rwx      r-x      r──
  ────     ────     ────
 owner    group    other
```

<div class="diagram">

```text
  rwxr-xr--
  │││ │││ │││
  │││ │││ └┘└── other:  r-- (read only)
  │││ └┘└────── group:  r-x (read, execute/enter)
  └┘└────────── owner:  rwx (read, write, execute)
```

</div>

<div class="callout remember"><span class="label">Remember</span>For a <strong>folder</strong>, x = can enter (cd). For a <strong>file</strong>, x = can run as a program. The dashes mean "not allowed."</div>

---

## The OS signature diagram — Linux lens

```text
        User   (you — on the Linux staff roster)
          │    whoami → shows your identity
          ▼
        Shell   (Bash — the walkie-talkie)
          │     ls -l · chmod · cat · cd
          ▼
   Operating System   (the Manager — checks the Key Cabinet)
          │     permission bits: rwx r-x r--
     ┌────┴────────┬──────────┐
     ▼             ▼          ▼
   CPU            RAM        Disk
  (Chef)     (Kitchen    (Pantry /
             counter)   Storage at /)
```

**Today's lens:** Bash + permission bits (rwx) + `/etc/passwd` + `chmod`

<div class="callout tip"><span class="label">Pro Tip</span>The Manager only lets an Employee (Process) into a room if the Key Cabinet (permissions) says yes. Same diagram as Day 6 — now you can read the labels.</div>

---

## Users and groups — the staff roster

<div class="two-col">
<div class="col author">

### Users & Identity
- `whoami` — shows your identity
- `/etc/passwd` — lists all accounts (read-only)
- **root** = the master key (admin)
- `sudo` = "do this as root" (logged)

</div>
<div class="col">

### Groups — shared access
- `/etc/group` — lists groups
- A **group** bundles users who share access (e.g., `sudo` group may administer)
- `ls -l` shows your user **and** your group

</div>
</div>

<div class="callout warning"><span class="label">Warning</span>Root = master key. Living as root violates <strong>least privilege</strong>. Use <code>sudo</code> only when needed — it logs every admin action.</div>

---

## chmod — changing your own keys

`chmod` changes permission bits **on files you own**:

```bash
$ touch try.sh          # create a file you own
$ chmod +x try.sh       # add execute permission
$ ls -l try.sh          # confirm x appears in owner triple
-rwx------ 1 you you 0 Jul 28 10:00 try.sh
```

<div class="callout definition"><span class="label">Definition</span><strong>chmod vs chown:</strong> <code>chmod</code> = change rights on what you own (no root needed). <code>chown</code> = change owner (requires root). You may only change what you own — the OS enforces this.</div>

> **Rule:** you own it → you control its keys. You don't own it → the Manager checks the cabinet and says no.

---

## Security bridge — keys left in the door

<div class="two-col">
<div class="col illegal">

### ⛔ Over-permissive (bad)
- `chmod 777 file` = **everyone** can read, write, execute
- A key left in the door — attackers **hunt for exactly this**
- World-readable secrets = data breach waiting to happen

</div>
<div class="col author">

### ✅ Least privilege (good)
- Give each file the **minimum rights** its job needs
- `chmod 755` for a script (owner full, others read+execute)
- `chmod 644` for a config (owner read+write, others read)

</div>
</div>

<div class="callout remember"><span class="label">Remember</span><code>chmod</code> is how you enforce least privilege. On Day 16, you'll see who picks the lock when permissions are wrong.</div>

---

## Soft-Skills Moment

Security work means **reading carefully** — before you run anything, always ask:

<div class="callout tip"><span class="label">Pro Tip</span>"As <strong>WHICH user</strong>, with <strong>WHICH rights</strong>, am I doing this?" — this one question catches most permission mistakes before they happen.</div>

**Checklist before any action:**
1. `whoami` — which identity am I using?
2. `ls -l` — what do I currently have permission to do?
3. `chmod` — am I changing something I **own**?

<div class="callout definition"><span class="label">Definition</span>Reading <code>ls -l</code> is like reading a lease agreement before entering a room. The best analysts check permissions <em>before</em> they need to.</div>

---

## How Today Connects

The **same OS diagram** — today through the Linux lens:

```text
  Day 6: OS = Manager · Shell = walkie-talkie · Permissions = key cabinet (abstract)
  Day 7: ← YOU ARE HERE → rwx bits visible · chmod on own files
  Day 8: Windows lens (ACLs, PowerShell)
  Day 10: Workshop — admin a user/permission change
  Day 16: Privilege escalation — attackers escape the key cabinet
  Day 19: IR — read /var/log (needs r) for evidence
```

**Backward link:** Day 6 named the key cabinet; today you read the labels.

**Forward:** Day 8 (Windows side) → Day 10 (workshop) → Day 16 (who picks the lock) → Day 19 (forensic reading).

<div class="callout remember"><span class="label">Remember</span>On Day 6 the key cabinet was abstract. Today you can read the labels. On Day 16, you'll see who picks the lock.</div>

---

## Curiosity Question

<div class="callout tip"><span class="label">Pro Tip</span>If a file is <code>777</code>, everyone holds a key — what stops an attacker from walking in?</div>

**Answer:** nothing technical — that's the problem. The fix is **correct permissions** (`chmod`) and **least privilege**. Day 16 shows exactly what attackers do with `777` files.

---

## Lab Preview & Exit Quiz

**Lab (in your range):**
1. `pwd` + `ls -l` — identify owner/group + 3 permission triples
2. Decode a permission string into a sentence
3. `touch try.sh` → `chmod +x try.sh` → confirm `x` appears

**Exit quiz (4 questions):**
1. In `rwxr-xr--`, what can the "other" role do?
2. On Linux, the filesystem root is written as: `C:\` / `/` / `HOME:` / `\root`?
3. `chmod +x script.sh` does what (if you own it)?
4. Why is `chmod 777 file` a security risk?

<div class="callout remember"><span class="label">Remember</span>Today you left with the key cabinet open. You can now read who may do what — and that's the foundation of every defense.</div>
