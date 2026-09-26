# Build Your Own Pentest Lab — Installation Guide

*This document covers **installation only** — getting the lab running on your laptop. How to
use any of these tools, and what to try against the lab, is taught in class. There are no scan
commands or attack instructions in this document.*

**Time:** 45–60 min, mostly downloads (~3 GB). Do it on good Wi-Fi, not five minutes before
class. **Needs:** Windows 11 (or Windows 10 22H2), 8 GB RAM, 25 GB free disk, virtualization
enabled in BIOS/UEFI. Linux users: skip Step 1, run the rest as is. Mac users: ask your
instructor for the VM route — this guide is for Windows/Linux.

---

## Before you start — how to use this guide

**You do not need to learn Linux or containers first.** This guide is copy-and-paste: every
grey box is a command; run them **in order** and check the result after each step.

- **Pasting into the Ubuntu terminal:** copy a command, then **right-click** in the window (or
  press **Ctrl+Shift+V**). Ctrl+V does not work there.
- **`sudo`** means "run as administrator". The first time it asks for your **Ubuntu password**.
  When you type it, **nothing appears on screen** — that is normal. Type it and press Enter.
- **Long boxes:** paste the whole box at once, including the lines that start with `#` (those
  are just comments).
- **Where each command runs:** the **Ubuntu terminal**, unless a box says **PowerShell**. If a
  command says "command not found", check you're in the right one.
- **Stuck?** Don't guess — screenshot the **whole error** and see *Troubleshooting* at the end.

---

## Keep the lab isolated

This lab runs on a **private network that exists only inside your own laptop**. Keep it that
way — never forward it to your Wi-Fi, a shared network, or the internet. Nothing in this guide
does that; the *Optional* section near the end explains the one exception and how it's still
kept private.

---

## What you're installing

Three separate machines, each with its own address, on a private network inside your laptop:

| Machine | Address | It is… |
|---|---|---|
| **Attacker box** (Ubuntu on WSL2) | `172.x.x.x` | where your tools run |
| **Metasploitable 2** | `10.89.1.10` | a training server |
| **DVWA** | `10.89.1.20` | a training web application |
| **Juice Shop** | `10.89.1.30` | a training web application |

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

## Step 2 — Install the toolbox

These are the tool **names** your instructor will show you how to use in class. Installing them
now is just setup — nothing here runs any of them against anything.

```bash
sudo apt update
sudo apt install -y nmap nikto sqlmap curl wget netcat-openbsd dnsutils whois git
```

Two more tools. If either says `Unable to locate package`, **skip it**:

```bash
sudo apt install -y gobuster
sudo apt install -y ffuf
```

Install **searchsploit** (an offline exploit reference, used in a later class):

```bash
sudo git clone --depth 1 https://gitlab.com/exploit-database/exploitdb /opt/exploitdb
sudo ln -sf /opt/exploitdb/searchsploit /usr/local/bin/searchsploit
```

(This downloads a few hundred MB — be patient. If it says the folder already exists, you've
done it before; carry on.)

Confirm they're installed (this only checks the program exists — it does not run it against
anything):

```bash
command -v nmap nikto sqlmap searchsploit
```

Each line should print a file path. A missing one means its `apt install` step above didn't
succeed — scroll up and re-run that line.

---

## Step 3 — Install Podman

Podman is what creates and runs the three target machines.

```bash
sudo apt install -y podman iptables
podman --version
```

> Podman is Docker-compatible. If you already use Docker, replace `podman` with `docker` in the
> commands below (they work the same).

---

## Step 4 — Create the lab network and the three targets

**4a. The lab network** (a private network with a known address range):

```bash
sudo podman network create --subnet 10.89.1.0/24 labnet
```

**4b. Metasploitable 2 → `10.89.1.10`**

```bash
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

## Step 5 — Confirm the lab is running

**First, wait 2 minutes** — DVWA needs about a minute after it starts, Juice Shop about 30
seconds, and Metasploitable a little too. Then:

```bash
~/lab.sh status                          # all three should say "Up"
ping -c 2 10.89.1.10                     # should get replies
curl -sI http://10.89.1.20/  | head -1   # should show a response line
curl -sI http://10.89.1.30:3000/ | head -1
```

**Setup checklist:**

```
☐  Ubuntu 24.04 opens in WSL 2
☐  nmap, nikto, gobuster, searchsploit all found by `command -v`
☐  ~/lab.sh status shows msf2, dvwa, juiceshop all Up
☐  ping to 10.89.1.10 gets replies
☐  both curl checks show a response line
```

---

## Optional — open the targets in your Windows browser

The lab network exists only inside WSL, so a Windows browser can't reach `10.89.1.20` by
default. You only need this for DVWA's one-time setup screen (below) and for classes that use a
browser directly.

Open **PowerShell as Administrator**, find WSL's address, then add a route to the lab network
through it:

```powershell
wsl -d Ubuntu-24.04 hostname -I                 # note the FIRST address, e.g. 172.20.205.206
route add 10.89.1.0 mask 255.255.255.0 172.20.205.206
```

Then browse to `http://10.89.1.20` (DVWA) and `http://10.89.1.30:3000` (Juice Shop).

- **DVWA one-time setup:** log in `admin` / `password`, click **Create / Reset Database** at the
  bottom, then log in again. This just initializes DVWA's database — it isn't using DVWA.
- WSL's address **changes after a reboot** — run `route delete 10.89.1.0`, then repeat the two
  commands above. The route is not permanent, so it also disappears on reboot by itself.
- This is a *route on your own laptop only*. It does not expose the targets to anyone else, and
  it does not undo the isolation described earlier.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `wsl --install` says virtualization is off | Enable **Intel VT-x / AMD-V (SVM)** in BIOS/UEFI. Also turn on *Virtual Machine Platform* in "Turn Windows features on or off". |
| `nmap: command not found` / `sudo: command not found` | You're in PowerShell. Open the **Ubuntu 24.04** app instead. |
| `apt install` says `Unable to locate package X` | Run `sudo apt update` first. If it's only `gobuster` or `ffuf`, skip it for now. |
| A `podman run` fails to pull the image | Check your internet; copy the image name exactly, starting `docker.io/`. |
| `~/lab.sh status` shows a target `Exited` | `~/lab.sh up` |
| `ping`/`curl` gets no response yet | The targets are still starting (DVWA ~60 s). Wait, `~/lab.sh status`, retry. |
| `podman network create` fails with an **iptables** or **nftables** error | Make sure `iptables` is installed (Step 3). If it still fails: `sudo mkdir -p /etc/containers && printf '[network]\nfirewall_driver = "none"\n' \| sudo tee /etc/containers/containers.conf`, then retry. |
| `Error: subnet 10.89.1.0/24 is already used...` | Another network uses that range. Check with `sudo podman network ls`; `sudo podman network rm labnet` and recreate (Step 4a), then re-create the targets. |
| `Error: network name labnet already used: network already exists` | You ran Step 4a twice — `labnet` is already there, that's fine. Skip straight to 4b. |
| `msf2` keeps restarting (`sudo podman inspect msf2 --format '{{.RestartCount}}'` above 0) | You left off the `sh -c '… tail -f /dev/null'` wrapper. `sudo podman rm -f msf2` and redo 4b exactly. |
| `10.89.1.x` doesn't answer from **Windows** | Expected — the lab network is inside WSL. Use the Ubuntu terminal, or see the optional route step. |
| WSL is eating my RAM / PC is slow | Check `.wslconfig` (Step 1). `~/lab.sh down` and `wsl --shutdown` when not using the lab. |
| Something is really broken | `sudo podman rm -f msf2 dvwa juiceshop`, then redo 4b–4d. The targets are disposable — that's the design. |

---

## Later classes

A few more tools — Metasploit, OWASP ZAP, Nessus, Burp — get installed in later classes, when
they're taught. Nothing further to do now.

---

*This is the installation-only version of the lab setup. Every command above was dry-run
2026-09-26 on a rebuilt lab — Podman 5.7, WSL2 — and matched this guide exactly. Not dry-run:
Step 1 itself on a machine with no WSL at all, and the optional Windows-browser route (needs
Administrator).*
