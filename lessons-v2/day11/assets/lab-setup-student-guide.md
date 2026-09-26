# Build Your Own Pentest Lab — Student Setup Guide

*Day 11 homework / in-class setup · You need this lab for the Reconnaissance, Port Scanning
and Vulnerability Assessment sessions (Days 12–15).*

By the end of this guide you have, **inside your own laptop**, a small practice network:

- an **attacker box** (Ubuntu with `nmap`, `nikto`, `gobuster`, `searchsploit` …), and
- **three separate target machines, each with its own IP address** — like three real computers
  on a network — that you find and scan **by IP**, not as `localhost`.

**Time:** 45–60 min, mostly downloads (~3 GB). Do it on good Wi-Fi, not five minutes before
class. **Needs:** Windows 11 (or Windows 10 22H2), 8 GB RAM, 25 GB free disk, virtualization
enabled in BIOS/UEFI. Linux users: skip Step 1, run the rest as is. Mac users: ask your
instructor for the VM route — this guide is for Windows/Linux.

---

## Before you start — how to use this guide

**You do not need to learn Linux or containers first.** This guide is copy-and-paste: every
grey box is a command; run them **in order** and check the result after each step.

- **What you should already know (Days 3–4):** what an IP address is, what a port is. That's it.
- **Pasting into the Ubuntu terminal:** copy a command, then **right-click** in the window (or
  press **Ctrl+Shift+V**). Ctrl+V does not work there.
- **`sudo`** means "run as administrator". The first time it asks for your **Ubuntu password**.
  When you type it, **nothing appears on screen** — that is normal. Type it and press Enter.
- **Long boxes:** paste the whole box at once, including the lines that start with `#` (those are
  just comments).
- **Where each command runs:** the **Ubuntu terminal**, unless a box says **PowerShell**. If a
  command says "command not found", check you're in the right one.
- **Stuck?** Don't guess — screenshot the **whole error** and see *Troubleshooting* at the end.
  The targets are disposable; you can't break anything permanent.
- **Diagram:** the picture of what you're building is `archify/01-lab-architecture.html` — your
  instructor shows it in class. Open it if you get lost.

---

## Rules first — read before you install anything

1. **Only scan what you own or were told to scan.** Here that means the three lab machines you
   build below. Never the college network at large, never a website, never a neighbour
   (Day 1: authorization and the law).
2. **These targets are deliberately hackable.** They live on a private network **inside your
   laptop** and nothing is forwarded to your real network. Keep it that way — never expose them
   to Wi-Fi or the internet.
3. **Every scan you run is visible in logs.** Keep evidence of what you ran and why (your
   Engagement Journal).

---

## What you're building

Your laptop will have **three different networks at once**. That's the point:

```
 Your Windows laptop ......................... 192.168.x.x   (your real Wi-Fi/LAN address)
 │
 └── WSL2 Ubuntu (your attacker box) ......... 172.x.x.x     (WSL's own address)
       │
       │   private lab network  10.89.1.0/24   (exists only inside your laptop)
       │
       ├── 10.89.1.10   Metasploitable 2   ← a full vulnerable server (FTP, SSH, SMB, MySQL …)
       ├── 10.89.1.20   DVWA               ← vulnerable web app (port 80)
       └── 10.89.1.30   Juice Shop         ← vulnerable web app (port 3000)

       10.89.1.1 = the lab network's gateway (that's your Ubuntu box itself — not a target)
```

| Target | IP | Port | What it teaches |
|---|---|---|---|
| **Metasploitable 2** | `10.89.1.10` | 21, 22, 23, 25, 80, 3306, 5432 … | network scanning, service versions → CVEs |
| **DVWA** | `10.89.1.20` | 80 | web recon, `nikto`, `gobuster`, later SQLi/XSS |
| **Juice Shop** | `10.89.1.30` | 3000 | fingerprinting and mapping a modern web app |

**How a scan travels** (the second diagram, `archify/02-scan-traffic.html`): your Ubuntu box
sends a probe to a target's IP; the target answers (or doesn't); the answer tells you what's
open and what's running. Nothing leaves your laptop.

Each target is a **container**: a tiny sandbox machine that gets its own IP on the lab
network, runs its own services on their **real** port numbers, and can be deleted and rebuilt
in seconds. From your attacker box it behaves like a separate computer.

---

## Step 1 — WSL2 + Ubuntu

Open **PowerShell** (normal, not Administrator) and run:

```powershell
wsl --install -d Ubuntu-24.04
```

Wait for it to finish (a few minutes). **Reboot if asked**, then open **Ubuntu 24.04** from the
Start menu. The first time, it asks you to **create a username and password** — pick
something you'll remember; you'll type this password whenever you use `sudo`. Then, back in
PowerShell, confirm it's WSL **version 2** (the VERSION column should say `2`):

```powershell
wsl -l -v
```

**Memory limit (recommended on 8 GB PCs).** By default WSL can take half your RAM. In
PowerShell, open the settings file (Notepad will ask to create it — click **Yes**):

```powershell
notepad $env:USERPROFILE\.wslconfig
```

Paste this, save, and close Notepad:

```ini
[wsl2]
memory=5GB
swap=2GB
```

Then, still in PowerShell: `wsl --shutdown`. Now open **Ubuntu 24.04** from the Start menu again.

> Everything from here on is typed **inside the Ubuntu terminal**.

---

## Step 2 — The attacker toolbox

```bash
sudo apt update
sudo apt install -y nmap nikto sqlmap curl wget netcat-openbsd dnsutils whois git
```

Two more tools. If either says `Unable to locate package`, **skip it** — you won't need it for the
first scans:

```bash
sudo apt install -y gobuster
sudo apt install -y ffuf
```

Install **searchsploit** (the offline exploit database — used in Vulnerability Assessment):

```bash
sudo git clone --depth 1 https://gitlab.com/exploit-database/exploitdb /opt/exploitdb
sudo ln -sf /opt/exploitdb/searchsploit /usr/local/bin/searchsploit
```

(This downloads a few hundred MB — be patient. If it says the folder already exists, you've done
it before; carry on.)

Check:

```bash
nmap --version | head -1
searchsploit vsftpd 2.3.4        # should list a "Backdoor Command Execution" entry
```

> Metasploit, ZAP, Nessus and Burp are **not needed yet** — they come in the Exploitation
> days. Don't install them now; they eat RAM.

---

## Step 3 — Podman (creates the target machines)

```bash
sudo apt install -y podman iptables
podman --version
```

> Podman is Docker-compatible. If you already use Docker, replace `podman` with `docker` in the
> commands below (they work the same).

---

## Step 4 — Create the lab network and the three targets

We run everything with `sudo` so each target can join the private lab network with its own IP.

**4a. The lab network** (a private network with a known address range):

```bash
sudo podman network create --subnet 10.89.1.0/24 labnet
```

**4b. Metasploitable 2 → `10.89.1.10`**

```bash
# the image's default command exits when run in the background, so we wrap it
sudo podman run -d --name msf2 --restart always \
  --network labnet --ip 10.89.1.10 --hostname metasploitable \
  docker.io/tleemcjr/metasploitable2 \
  sh -c '/bin/services.sh; exec tail -f /dev/null'
```

**4c. DVWA → `10.89.1.20`**

```bash
sudo podman run -d --name dvwa --restart always \
  --network labnet --ip 10.89.1.20 --hostname dvwa \
  docker.io/vulnerables/web-dvwa:latest
```

**4d. Juice Shop → `10.89.1.30`**

```bash
sudo podman run -d --name juiceshop --restart always \
  --network labnet --ip 10.89.1.30 --hostname juiceshop \
  docker.io/bkimminich/juice-shop:latest
```

> Notice there is **no `-p 8080:80`** anywhere. We are *not* mapping ports onto your laptop.
> Each target is reached at **its own IP and its real port** — exactly how you would find a
> server on a real network.

**4e. A one-command start/stop for the lab.** After a reboot or `wsl --shutdown` the targets
may be stopped. Save this once:

```bash
cat > ~/lab.sh <<'EOF'
#!/usr/bin/env bash
case "$1" in
  up)     sudo podman start msf2 dvwa juiceshop ;;
  down)   sudo podman stop msf2 dvwa juiceshop ;;
  status) sudo podman ps -a --format '{{.Names}}\t{{.Status}}' ;;
  *)      echo "usage: ~/lab.sh up | down | status" ;;
esac
EOF
chmod +x ~/lab.sh
```

Use `~/lab.sh up` before class and `~/lab.sh down` when you're done (frees RAM).

---

## Step 5 — Check everything works (do not skip)

**First, wait 2 minutes** — DVWA needs about a minute after it starts, Juice Shop about 30
seconds, and Metasploitable a little too. Then run these one at a time:

```bash
~/lab.sh status                                   # all three "Up"
ping -c 2 10.89.1.10                              # replies
sudo nmap -sn 10.89.1.0/24                        # finds .1 .10 .20 .30
nmap -sV -Pn -p 21,22,23,25,80,3306,5432 10.89.1.10
```

`sudo nmap -sn` must list **four hosts up**: `10.89.1.10`, `.20`, `.30` and the gateway `.1`.
The `-sV` scan must show **real service versions**, like this:

```
PORT     STATE SERVICE    VERSION
21/tcp   open  ftp        vsftpd 2.3.4
22/tcp   open  ssh        OpenSSH 4.7p1 Debian 8ubuntu1 (protocol 2.0)
23/tcp   open  telnet     Linux telnetd
25/tcp   open  smtp       Postfix smtpd
80/tcp   open  http       Apache httpd 2.2.8 ((Ubuntu) DAV/2)
3306/tcp open  mysql      MySQL 5.0.51a-3ubuntu5
5432/tcp open  postgresql PostgreSQL DB 8.3.0 - 8.3.7
```

Those version strings are the point of the next classes: **version → known CVE → is there a
public exploit?** (`vsftpd 2.3.4` is a famous one.)

Now check the two web apps by IP:

```bash
nmap -sV -Pn -p 80 10.89.1.20        # Apache httpd 2.4.25 (Debian)
curl -sI http://10.89.1.20/  | head -3   # HTTP/1.1 302 Found  ... Server: Apache/2.4.25
curl -sI http://10.89.1.30:3000/ | head -3   # HTTP/1.1 200 OK
```

**Setup checklist — tick all before class:**

```
☐  Ubuntu 24.04 opens in WSL 2
☐  nmap, nikto, gobuster, searchsploit all run
☐  ~/lab.sh status shows msf2, dvwa, juiceshop all Up
☐  sudo nmap -sn 10.89.1.0/24 finds four hosts
☐  nmap -sV on 10.89.1.10 shows vsftpd 2.3.4 on port 21
☐  I have a screenshot of that nmap output
```

---

## Step 6 — See your three networks (2-minute exercise)

Answer these in your Engagement Journal — it makes "separate IP" concrete:

```bash
ip -4 addr show eth0          # WSL's own address (172.x.x.x)
ip -4 route get 10.89.1.20    # how does traffic to DVWA leave? via which interface?
```

and in **PowerShell**: `ipconfig` (your laptop's real address, 192.168.x.x or similar).
*Three addresses, one laptop.* Which one would a real attacker on the internet see? Which one
can the lab targets see?

---

## Step 7 — Scan your lab (what the next classes use)

Run these from the **Ubuntu terminal**. Each block maps to one class.

### Class: Reconnaissance — what's there?

```bash
sudo nmap -sn 10.89.1.0/24            # host discovery: which machines are alive? (sudo = ARP, fast + reliable)
nmap -p 80 --script http-title,http-server-header 10.89.1.20   # what web app / server is this?
curl -I http://10.89.1.30:3000        # read the HTTP headers by hand
```

### Class: Port scanning — what's open?

```bash
nmap 10.89.1.10                       # default top-1000 ports
nmap -p- -T4 10.89.1.10               # ALL 65,535 ports (slower — the thorough one)
nmap -sV -p 80,3000 10.89.1.20 10.89.1.30    # two targets in one go, with versions
```

Compare `nmap 10.89.1.10` with `nmap -sV 10.89.1.10`: the first says a port is open, the second
says **what is running on it** — and only the second gives you something to look up.

> **Tools are not always right.** Run `nmap -sV -p 3000 10.89.1.30` — Juice Shop often shows up as
> `ppp?` (nmap can't identify it). `curl -I` shows it's a normal web server. When a scanner
> says "unknown", check by hand.

### Class: Vulnerability assessment — what's wrong with it?

```bash
nmap -sV --script vuln -Pn 10.89.1.10   # takes several minutes — go make tea
nikto -h http://10.89.1.20              # web-server checks against DVWA
searchsploit vsftpd 2.3.4               # is there public exploit code for this version?
```

A scanner gives you a long list of *leads*, not findings. Your job is to check each one and
rank them (the "four moves" from class).

### The defender's view

After a scan, look at the target's own log — you'll see *you*:

```bash
sudo podman exec dvwa tail -n 20 /var/log/apache2/access.log
```

Look for your address and user agents like `Nmap Scripting Engine` or `Nikto`.

---

## Optional — open the targets in your Windows browser

The lab network exists only inside WSL, so a Windows browser can't reach `10.89.1.20` by default.
Command-line tools (everything above) don't need this. **You only need it later** — e.g. DVWA's
first-time setup and the web-attack days.

Open **PowerShell as Administrator**, find WSL's address, then add a route to the lab network
through it:

```powershell
wsl -d Ubuntu-24.04 hostname -I                 # note the FIRST address, e.g. 172.20.205.206
route add 10.89.1.0 mask 255.255.255.0 172.20.205.206
```

Then browse to `http://10.89.1.20` (DVWA) and `http://10.89.1.30:3000` (Juice Shop).

- **DVWA first use:** log in `admin` / `password`, click **Create / Reset Database** at the bottom,
  log in again.
- WSL's address **changes after a reboot** — run `route delete 10.89.1.0`, then repeat the two
  commands. The route is not permanent, so it also disappears on reboot by itself.
- This is a *route on your own laptop only*. It does not expose the targets to anyone else.

> *Instructor: this route step is untested — the lab machine used to build this guide could not
> elevate. Dry-run it once before class. If it fails on a student's PC, they can carry on with
> every command-line exercise.*

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `wsl --install` says virtualization is off | Enable **Intel VT-x / AMD-V (SVM)** in BIOS/UEFI. Also turn on *Virtual Machine Platform* in "Turn Windows features on or off". |
| `sudo nmap -sn` shows no targets | The targets are still starting (DVWA ~60 s). Run `~/lab.sh status`, wait, retry. |
| Target shows `Exited` after a reboot | `~/lab.sh up` |
| `nmap` says *Host seems down* | Add `-Pn`. |
| `podman network create` / `run --network labnet` fails with an **iptables** or **nftables** error | Make sure `iptables` is installed (Step 3). If it still fails on your WSL kernel: `sudo mkdir -p /etc/containers && printf '[network]\nfirewall_driver = "none"\n' \| sudo tee /etc/containers/containers.conf`, then retry. |
| `Error: subnet 10.89.1.0/24 already used` / network conflict | Another network uses that range. Check with `sudo podman network ls`; `sudo podman network rm labnet` and recreate (Step 4a), then re-create the targets. |
| `msf2` keeps restarting (`sudo podman inspect msf2 --format '{{.RestartCount}}'` above 0) | You left off the `sh -c '… tail -f /dev/null'` wrapper. `sudo podman rm -f msf2` and redo 4b exactly. |
| `10.89.1.x` doesn't answer from **Windows** | Expected — the lab network is inside WSL. Scan from the Ubuntu terminal (or see the optional route step). |
| WSL is eating my RAM / PC is slow | Check `.wslconfig` (Step 1). `~/lab.sh down` and `wsl --shutdown` when not using the lab. |
| `nmap: command not found` / `sudo: command not found` | You're in PowerShell. Open the **Ubuntu 24.04** app instead. |
| `apt install` says `Unable to locate package X` | Run `sudo apt update` first. If it's only `gobuster` or `ffuf`, skip it for now. |
| A `podman run` fails to pull the image | Check your internet; copy the image name exactly, starting `docker.io/`. |
| Something is really broken | `sudo podman rm -f msf2 dvwa juiceshop`, then redo 4b–4d. The targets are disposable — that's the design. |

---

## Optional — later days

Metasploit, OWASP ZAP, Nessus and Burp are needed in the Exploitation days. Install steps are in
`lab-setup-guide.md` at the repo root (skip its Metasploitable, DVWA and Juice Shop sections —
the versions in *this* guide are the ones the course uses). Your instructor will tell you when.

---

*Verified on a working instructor lab (Podman 5.7, WSL2): all three targets get their own IP on
`10.89.1.0/24`, are found by `sudo nmap -sn`, and scan by IP with real service versions. Not tested
end to end: the Windows-browser route (needs Administrator) and the Ubuntu 24.04 install path —
dry-run both once before the class.*
