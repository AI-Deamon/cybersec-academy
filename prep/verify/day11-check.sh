#!/usr/bin/env bash
# Day 11 pre-flight check — CIA Triad / Risk / Untrusted Input
# Run the DAY BEFORE class, inside WSL:
#     bash prep/verify/day11-check.sh
# READ-ONLY. No network. No files written outside a /tmp scratch dir.
# Exit 0 = ready to teach.

fails=0; warns=0
ok()   { printf '\033[32m[OK]\033[0m   %s\n' "$1"; }
fail() { printf '\033[31m[FAIL]\033[0m %s\n       -> %s\n' "$1" "$2"; fails=$((fails+1)); }
warn() { printf '\033[33m[WARN]\033[0m %s\n       -> %s\n' "$1" "$2"; warns=$((warns+1)); }
head_() { printf '\n\033[36m=== %s ===\033[0m\n' "$1"; }

echo "Day 11 pre-flight — CIA / Risk / Untrusted Input"
echo "Demo machine: WSL (Ubuntu). No network required."

# ---------------------------------------------------------------- 1. Python
head_ "1. Python + required stdlib modules"
if command -v python3 >/dev/null 2>&1; then
  ok "$(python3 --version 2>&1) available"
else
  fail "python3 not found" "sudo apt update && sudo apt install -y python3   (do this NOW)"
fi

for m in sqlite3 hashlib; do
  if python3 -c "import $m" >/dev/null 2>&1; then
    ok "module '$m' importable"
  else
    if [ "$m" = "sqlite3" ]; then
      fail "module 'sqlite3' missing" "The injection demo cannot run. Fix: sudo apt install -y libsqlite3-dev then reinstall python3. Fallback: whiteboard the two queries (Playbook A2)."
    else
      fail "module '$m' missing" "Standard library incomplete: sudo apt install --reinstall python3"
    fi
  fi
done

if python3 -c "import sys; sys.exit(0 if sys.version_info >= (3,6) else 1)" 2>/dev/null; then
  ok "Python >= 3.6 — f-strings in integrity_demo.py will work"
else
  warn "Python < 3.6" "Replace the f-string in integrity_demo.py with plain print() arguments"
fi

# --------------------------------------------- 2. Integrity demo dry run
head_ "2. Integrity demo — hashes must differ completely"
int_out=$(python3 - <<'PY' 2>&1
import hashlib
a = hashlib.sha256(b"Transfer 100 USD to Bob").hexdigest()[:16]
b = hashlib.sha256(b"Transfer 900 USD to Bob").hexdigest()[:16]
print(a, b, "DIFFERENT" if a != b else "SAME")
PY
)
if echo "$int_out" | grep -q "DIFFERENT"; then
  ok "Hashes differ as expected ($(echo "$int_out" | awk '{print $1" vs "$2}'))"
else
  fail "Integrity demo did not behave: $int_out" "Test hashlib manually before class"
fi

# ------------------------------- 3. THE critical one: injection must work
head_ "3. SQL injection demo — attack MUST return all 3 users"
inj_out=$(python3 - <<'PY' 2>&1
import sqlite3
db = sqlite3.connect(":memory:")
db.executescript("""
CREATE TABLE users (name TEXT, role TEXT);
INSERT INTO users VALUES ('alice','user'), ('bob','user'), ('admin','ADMIN');
""")
def login_UNSAFE(name):
    return db.execute("SELECT name, role FROM users WHERE name = '" + name + "'").fetchall()
normal = login_UNSAFE("alice")
attack = login_UNSAFE("' OR '1'='1")
print(f"NORMAL={len(normal)} ATTACK={len(attack)} ADMIN={'yes' if any(r[1]=='ADMIN' for r in attack) else 'no'}")
PY
)
if echo "$inj_out" | grep -q "NORMAL=1 ATTACK=3 ADMIN=yes"; then
  ok "Injection demo verified — attacker sees all 3 rows including ADMIN"
else
  fail "Injection demo returned: $inj_out" "Expected 'NORMAL=1 ATTACK=3 ADMIN=yes'. Your main teaching moment will not land. Test manually."
fi

# ----------------------------------- 4. The fix must actually block it
head_ "4. Parameterised fix — attack MUST return zero rows"
fix_out=$(python3 - <<'PY' 2>&1
import sqlite3
db = sqlite3.connect(":memory:")
db.executescript("""
CREATE TABLE users (name TEXT, role TEXT);
INSERT INTO users VALUES ('alice','user'), ('bob','user'), ('admin','ADMIN');
""")
def login_SAFE(name):
    return db.execute("SELECT name, role FROM users WHERE name = ?", (name,)).fetchall()
print(f"NORMAL={len(login_SAFE('alice'))} ATTACK={len(login_SAFE(chr(39)+' OR '+chr(39)+'1'+chr(39)+'='+chr(39)+'1'))}")
PY
)
if echo "$fix_out" | grep -q "NORMAL=1 ATTACK=0"; then
  ok "Fix verified — parameterised query blocks the attack (0 rows)"
else
  fail "Fix demo returned: $fix_out" "Expected 'NORMAL=1 ATTACK=0'. Never show the attack without a working fix."
fi

# ------------------------------------------------- 5. Safety confirmations
head_ "5. Safety posture"
ok "Databases are in-memory (:memory:) — nothing written to disk"
ok "No network calls in any Day 11 demo"
if [ "$(whoami)" = "root" ]; then
  warn "Running as root" "Not required today and not modelled behaviour. Prefer a normal user."
else
  ok "Running as normal user '$(whoami)' — no sudo needed today"
fi

# ------------------------------------------------------- 6. Leftover state
head_ "6. Leftover state"
if [ -d "$HOME/day11demo" ]; then
  warn "~/day11demo exists from a previous rehearsal" "rm -rf ~/day11demo before class (Playbook C1)"
else
  ok "No leftover ~/day11demo — clean start"
fi

# --------------------------------------------------- 7. Paper lab reminder
head_ "7. Non-technical prerequisites"
echo "  [ ] Printed / shared worksheet ready (Task 1 five scenarios, Task 2 risk, Task 3 untrusted input)"
echo "  [ ] You can say  ' OR '1'='1  aloud fluently"
echo "  [ ] You have the Day 12 answer ready for 'can I try this on a real site?'  -> Playbook B1"

# ------------------------------------------------------------------ Verdict
head_ "Verdict"
if [ "$fails" -eq 0 ] && [ "$warns" -eq 0 ]; then
  printf '\033[32mREADY TO TEACH — all checks green.\033[0m\n'; exit 0
elif [ "$fails" -eq 0 ]; then
  printf '\033[33mREADY, WITH %s WARNING(S).\033[0m\n' "$warns"
  echo "Each has a scripted fallback in the Failure Playbook."; exit 0
else
  printf '\033[31m%s FAILURE(S), %s warning(s). Fix before class.\033[0m\n' "$fails" "$warns"; exit 1
fi
