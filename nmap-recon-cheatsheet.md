# Nmap & Recon Cheat Sheet

Lab target addresses (scan from WSL):

- **Metasploitable** → `TARGET=localhost` (or container IP `10.88.0.8` for a more "remote" feel)
- **DVWA** → `TARGET=localhost` + `-p 8081`
- **OWASP Juice Shop** → `TARGET=localhost` + `-p 3000`
- **External host** → `TARGET=IP-or-hostname`

## Money commands (use these first)

```
# Metasploitable (full) — all 8 lab services
nmap -sV -sC -p- -T4 -oA msf_scan localhost

# DVWA — single port
nmap -sV -sC -p 8081 localhost

# Juice Shop — single port
nmap -sV -sC -p 3000 localhost

# Ultra-thorough lab sweep
nmap -A -p- -T4 --script vuln localhost

# External host
nmap -sV -sC -p- -T4 -oA ext_scan <external-ip>
```

## Full command list

| Category | Command | Notes |
|---|---|---|
| Host discovery | `nmap -sn 192.168.1.0/24` | find live hosts on your LAN |
| Top 1000 | `nmap --top-ports 1000 TARGET` | fast |
| Specific ports | `nmap -p 80,443,8080 TARGET` | comma-separated |
| Port range | `nmap -p 80-443 TARGET` | range |
| All 65535 | `nmap -p- TARGET` | slow, thorough |
| SYN scan | `sudo nmap -sS TARGET` | stealthy, needs root |
| TCP connect | `nmap -sT TARGET` | full handshake, no root |
| UDP top 20 | `nmap -sU --top-ports 20 TARGET` | DNS/SNMP/DHCP |
| ACK scan | `nmap -sA TARGET` | detects stateful firewalls |
| Service versions | `nmap -sV TARGET` | Apache/OpenSSH versions |
| Aggressive versions | `nmap -sV --version-intensity 9 TARGET` | slower, more accurate |
| OS detection | `nmap -O TARGET` | OS fingerprinting |
| OS guessing | `nmap -O --osscan-guess TARGET` | aggressive |
| Default scripts | `nmap -sC TARGET` | banners, misconfigs |
| Vuln scripts | `nmap --script vuln TARGET` | vulnerability detection |
| Specific script | `nmap --script smb-enum-shares TARGET` | SMB shares |
| HTTP scripts | `nmap --script "http-*" TARGET` | all HTTP scripts |
| All-in-one | `nmap -A -T4 TARGET` | -sV -sC -O + traceroute |
| Save normal | `nmap TARGET -oN output.txt` | human-readable |
| Save XML | `nmap TARGET -oX output.xml` | machine-readable |
| Save greppable | `nmap TARGET -oG output.gnmap` | one line per host |
| Save all formats | `nmap TARGET -oA scan_name` | .nmap, .xml, .gnmap |
| Timing T3 | `nmap -T3 TARGET` | normal (default) |
| Timing T4 | `nmap -T4 TARGET` | aggressive, good for lab |
| Timing T5 | `nmap -T5 TARGET` | insane, risky |
| Min rate | `nmap --min-rate 100 TARGET` | ≥100 pkt/s |
| Max rate | `nmap --max-rate 50 TARGET` | ≤50 pkt/s, IDS bypass |
| Reasons | `nmap --reason TARGET` | why each port state |
| Verbose | `nmap -v TARGET` / `nmap -vv TARGET` | more detail |
| Traceroute | `nmap --traceroute TARGET` | network path |

## Per-lab-target commands

```
# Metasploitable specific services
nmap -sV -p 21,22,23,25,80,3306,5900,5433 localhost
nmap --script vuln -p 21,22,80 localhost

# SMB on Metasploitable (445 isn't published — scan the container IP)
nmap -p 445 --script smb-enum-shares 10.88.0.8
enum4linux -a 10.88.0.8
smbclient -L //10.88.0.8 -N

# Web recon per app
curl -I http://localhost          # Metasploitable web
curl -I http://localhost:8081     # DVWA
curl -I http://localhost:3000     # Juice Shop
whatweb http://localhost:8081
nikto -h http://localhost:8081
wafw00f http://localhost:3000

# Directory brute force (DVWA example)
gobuster dir -u http://localhost:8081 -w /usr/share/wordlists/dirb/common.txt
ffuf -u http://localhost:8081/FUZZ -w /usr/share/wordlists/dirb/common.txt
```

## Additional recon tools

### DNS & domain enumeration
```
host example.com
host -t MX example.com
host -t NS example.com
nslookup example.com
nslookup -type=MX example.com
dig example.com +short
dig example.com MX
dig -x 8.8.8.8                    # reverse lookup
dig axfr @ns1.example.com example.com   # zone transfer
dnsrecon -d example.com
dnsrecon -d example.com -t axfr
dnsenum --dnsserver 8.8.8.8 example.com
```

### Network path & connectivity
```
traceroute TARGET
mtr TARGET
ping -c 4 TARGET
```

### Web reconnaissance
```
curl -I http://TARGET
curl -v http://TARGET 2>&1 | head -30
curl -A "Mozilla/5.0" http://TARGET
curl -u admin:password http://TARGET
wget -O - http://TARGET 2>/dev/null | head -50
whatweb http://TARGET
whatweb -a 3 http://TARGET
nikto -h http://TARGET
nikto -h http://TARGET -o report.html
```

### WAF detection
```
wafw00f http://TARGET
```

### Directory & file brute-forcing
```
gobuster dir -u http://TARGET -w /usr/share/wordlists/dirb/common.txt
gobuster dir -u http://TARGET -w wordlist.txt -x .php,.txt,.bak
ffuf -u http://TARGET/FUZZ -w /usr/share/wordlists/dirb/common.txt
ffuf -u http://TARGET/FUZZ.php -w wordlist.txt
```

### Subdomain enumeration
```
sublist3r -d example.com
amass enum -d example.com
assetfinder --subs-only example.com
```

### SMB/Windows enumeration
```
enum4linux -a TARGET
enum4linux -U TARGET
enum4linux -S TARGET
smbclient -L //TARGET -N
smbclient -L //TARGET -U username%password
```

### Mass scanning
```
masscan 192.168.1.0/24 -p 80,443,22
masscan 192.168.1.0/24 -p 0-65535 --rate 1000
```

### Active banner grabbing
```
nc -zv TARGET 80
nc -zv TARGET 80-443
amap -bqq TARGET 80
```

### OSINT & passive recon
```
whois example.com
shodan host TARGET
theHarvester -d example.com -b google
theHarvester -d example.com -b all
```
