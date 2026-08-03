# Cyber Security Academy — Full Lab Setup Guide

> Everything you need to install the lab (targets + tools) on your own machine.
> This mirrors the classroom lab: Windows 11 + WSL2 (Ubuntu 24.04) + Podman containers.
> Estimated time: 60–90 minutes. Recommended: **8 GB RAM**.

---

## Contents

1. [What you will install](#1-what-you-will-install)
2. [Foundation: WSL2 + Ubuntu + Podman](#2-foundation-wsl2--ubuntu-2404--podman)
3. [Install the scanning tools (apt)](#3-install-the-scanning-tools-apt)
4. [Install Metasploit Framework + database](#4-install-metasploit-framework--database)
5. [Install searchsploit](#5-install-searchsploit)
6. [Install the lab targets (containers)](#6-install-the-lab-targets-containers)
7. [Install OWASP Juice Shop (Node.js)](#7-install-owasp-juice-shop-nodejs)
8. [Install OWASP ZAP (container, CLI scans)](#8-install-owasp-zap-container-cli-scans)
9. [Install Nessus](#9-install-nessus)
10. [Install Burp Pro](#10-install-burp-pro-windows)
11. [Share the lab on your LAN (optional, for hosting)](#11-share-the-lab-on-your-lan-optional)
12. [Verify everything works](#12-verify-everything-works)

---

## 1. What you will install

**Targets (what you attack):**
| Target | Address | Port(s) |
|---|---|---|
| OWASP Juice Shop | `http://localhost:3000` | 3000 |
| DVWA | `http://localhost:8081` | 8081 |
| Metasploitable 2 | `http://localhost:80` | 21,22,23,25,80,3306,5900,5433 |
| Nessus (scanner GUI) | `https://localhost:8834` | 8834 |

**Tools (what you attack with):**
`nmap`, `nikto`, `whatweb`, `gobuster`, `ffuf`, `masscan`, `sqlmap`, `searchsploit`, `Metasploit`, `ZAP`, `Nessus`, `Burp Pro`, plus `curl`, `nc`, `smbclient`, `dnsutils`, `whois`.

---

## 2. Foundation: WSL2 + Ubuntu 24.04 + Podman

On Windows 11, open **PowerShell (as normal user)** and run:

```powershell
# 1. Install WSL2 + Ubuntu 24.04
wsl --install -d Ubuntu-24.04
# Reboot when asked.

# 2. Confirm WSL2 is in use
wsl -l -v

# 3. Open the Ubuntu terminal, then install Podman (containers)
sudo apt-get update
sudo apt-get install -y podman
```

> **Why Podman instead of Docker?** It is drop-in compatible with Docker commands and needs no daemon. If you already have Docker, the same `docker run ...` commands work.
>
> **Memory tip (important):** on an 8 GB PC, WSL2 gets only ~50% RAM by default, and Nessus needs a lot. Create `C:\Users\<you>\.wslconfig` with:
> ```ini
> [wsl2]
> memory=5GB
> swap=2GB
> ```
> Then run `wsl --shutdown` and open Ubuntu again.

---

## 3. Install the scanning tools (apt)

Inside Ubuntu (WSL) run one block:

```bash
sudo apt-get update
sudo apt-get install -y \
  nmap netcat-openbsd curl wget \
  gobuster masscan traceroute mtr \
  dnsutils whois smbclient \
  nikto whatweb wafw00f ffuf \
  dnsrecon dnsenum sublist3r \
  sqlmap
```

Verify:

```bash
nmap --version | head -1
nikto -Version | head -1
sqlmap --version
```

---

## 4. Install Metasploit Framework + database

```bash
# 1. Official Rapid7 installer
curl -fsSL https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb -o /tmp/msfinstall
chmod +x /tmp/msfinstall
sudo /tmp/msfinstall

# 2. Database (Metasploit uses PostgreSQL)
sudo apt-get install -y postgresql
sudo service postgresql start

# 3. Create the DB user + database manually
sudo -u postgres psql -c "CREATE USER msf WITH PASSWORD 'msfpass';"
sudo -u postgres psql -c "CREATE DATABASE msf OWNER msf;"

# 4. Point Metasploit at it (as your normal WSL user, not root)
mkdir -p ~/.msf4
cat > ~/.msf4/database.yml <<'EOF'
production:
  adapter: postgresql
  database: msf
  username: msf
  password: msfpass
  host: 127.0.0.1
  port: 5432
  pool: 5
  timeout: 5
EOF

# 5. Verify
msfconsole -v
msfconsole -q -x 'db_status; exit'   # should say "Connected to msf"
```

---

## 5. Install searchsploit

```bash
sudo apt-get install -y git
sudo git clone https://gitlab.com/exploit-database/exploitdb /opt/exploitdb
sudo ln -s /opt/exploitdb/searchsploit /usr/local/bin/searchsploit

searchsploit vsftpd 2.3.4    # test: should list the backdoor exploit
```

---

## 6. Install the lab targets (containers)

```bash
# ---- DVWA (Dam Vulnerable Web Application) ----
podman run -d --name dvwa --restart=always -p 8081:80 docker.io/citizenstig/dvwa

# ---- Metasploitable 2 ----
podman run -d --name msf2 --restart=always \
  -p 21:21 -p 22:22 -p 23:23 -p 25:25 -p 80:80 \
  -p 3306:3306 -p 5900:5900 -p 5433:5432 \
  docker.io/tleemcjr/metasploitable2 \
  sh -c "/bin/services.sh && tail -f /dev/null"
```

**Why the weird `sh -c "... tail -f /dev/null"`?** The Metasploitable image's default command only stays alive when it has an interactive terminal (TTY). Running it without a TTY (scripted / scheduled) makes it exit and crash-loop. Appending `tail -f /dev/null` keeps the first process alive so all the vulnerable services keep running.

Verify (give them ~30 s to boot):

```bash
podman ps --format '{{.Names}} | {{.Status}}'
curl -s -o /dev/null -w 'DVWA -> %{http_code}\n' http://localhost:8081/login.php
curl -s -o /dev/null -w 'Metasploitable -> %{http_code}\n' http://localhost:80/
```

---

## 7. Install OWASP Juice Shop (Node.js)

On **Windows** (or WSL):

```powershell
# 1. Install Node.js LTS from https://nodejs.org  (v22 or later)
node --version

# 2. Download and install
git clone --depth 1 https://github.com/juice-shop/juice-shop.git
cd juice-shop
npm install
npm start          # serves http://localhost:3000
```

> To keep it running after you log off, create a Windows **Scheduled Task** that runs `node build/app` in the juice-shop folder (hidden) at logon.

---

## 8. Install OWASP ZAP (container, CLI scans)

```bash
podman pull docker.io/zaproxy/zap-stable
mkdir -p /opt/zap-wrk && sudo chown 1000:1000 /opt/zap-wrk

# Run a baseline scan (example: DVWA)
podman run --rm -v /opt/zap-wrk:/zap/wrk docker.io/zaproxy/zap-stable \
  zap-baseline.py -t http://localhost:8081 -r zap-dvwa.html

# Report is written to /opt/zap-wrk/zap-dvwa.html
```

Available scan scripts (inside the image): `zap-baseline.py`, `zap-full-scan.py`, `zap-api-scan.py`.
On 2.16 and earlier the names were `zap-baseline-scan.py` etc.

> **ZAP GUI?** If you have the RAM, download the standalone installer from https://www.zaproxy.org and install it on Windows for the point-and-click interface. The container version above is headless and scriptable.

---

## 9. Install Nessus

```bash
podman pull docker.io/tenable/nessus:latest-ubuntu

# Cap memory so it can't OOM your whole WSL VM
podman run -d --name nessus --memory 2g --memory-swap 2g --restart=always \
  -p 8834:8834 docker.io/tenable/nessus:latest-ubuntu
```

Then in your browser:

1. Open **https://localhost:8834** (browser warns about the self-signed cert — accept it).
2. Choose product **Nessus Professional**.
3. Get a free **Nessus Essentials** activation code at https://www.tenable.com/products/nessus/activation-code (register with an email).
4. Paste the code, create an admin user.
5. First start downloads/compiles plugins — **10–20 minutes**, be patient.

> Offline activation (no internet on the scanner): run `sudo podman exec nessus /opt/nessus/sbin/nessuscli fetch --challenge`, paste the challenge code + your activation code at `https://plugins.nessus.org/v2/offline.php`, then load the returned license with:
> ```bash
> sudo podman exec nessus /opt/nessus/sbin/nessuscli fetch --register-offline <license-file>
> ```

---

## 10. Install Burp Pro (Windows)

1. Download from https://portswigger.net (you need a licensed account).
2. Run the installer, then start Burp.
3. Default proxy listens on `127.0.0.1:8080`. Configure your browser to use it (or use Burp's embedded browser).
4. Point the browser at any lab target and intercept traffic.

---

## 11. Share the lab on your LAN (optional)

Only needed if you are the **host** and want students/other devices to reach the targets by your machine's LAN IP (e.g. `192.168.1.111`).

**Why this exists:** WSL2 uses NAT, so container ports are only visible inside WSL. Two steps make them reachable on the LAN: (1) a Windows firewall allow rule, (2) a `netsh` port proxy that forwards a Windows port → the WSL IP (which changes each boot).

Run once **as Administrator** (PowerShell):

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\pitta\Downloads\setup-lab-network.ps1
```

What that script does:

```powershell
$ports = 21,22,23,25,80,3306,5900,5433,8081,8834
# 1. Allow inbound TCP on every lab port
foreach ($p in $ports) {
  netsh advfirewall firewall add rule name="Cybersec-Lab TCP $p" dir=in action=allow protocol=TCP localport=$p
}
# 2. Forward Windows port -> WSL IP (get current WSL IP first!)
$wslIp = (wsl -d Ubuntu-24.04 hostname -I).Trim().Split(' ')[0]
foreach ($p in $ports) {
  netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=$p connectaddress=$wslIp connectport=$p
}
```

Because the WSL IP can change after a reboot, the script also installs a **logon scheduled task** that re-runs the port proxy automatically.

> Juice Shop (port 3000) runs natively on Windows, so it is already LAN-reachable — it only needs the firewall rule, no port proxy.

---

## 12. Verify everything works

```bash
# Containers running
podman ps --format '{{.Names}} | {{.Status}}'

# Web apps answer
curl -s -o /dev/null -w 'Juice Shop   -> %{http_code}\n' http://localhost:3000/
curl -s -o /dev/null -w 'DVWA         -> %{http_code}\n' http://localhost:8081/login.php
curl -s -o /dev/null -w 'Metasploitable-> %{http_code}\n' http://localhost:80/

# Service scan sees the real versions
nmap -sV -p 21,22,80,3306 localhost
```

From another device on the LAN, replace `localhost` with the host machine's IP (e.g. `192.168.1.111`).

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Container shows `Created` but never runs / crash-loops | `podman rm -f <name>` then re-create using the exact `run` command above (Metasploitable needs the `tail -f` trick). |
| WSL feels out of memory / VM dies | Check `.wslconfig` memory setting; cap Nessus with `--memory 2g`. |
| `podman run ... zap-baseline.py` not found | In ZAP 2.17 the script is `zap-baseline.py` (no `-scan`). |
| Nessus page won't load after 20 min | Give it more time on first boot; check `podman logs nessus`. |
| Students can't reach the lab | Host must have run `setup-lab-network.ps1` as admin; verify with `netsh interface portproxy show all`. |
| `msfdb init` says "run as non-root" | Use the manual `CREATE USER` / `database.yml` steps in section 4. |

---

## Legal note for students

Everything here is for the **academy lab**. Scanning anything outside your own lab machines without written authorization is illegal in most countries, and every scan you run is visible in network logs.
