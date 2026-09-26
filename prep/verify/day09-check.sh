#!/usr/bin/env bash
# Day 9 pre-flight check — Python Basics
# Run the DAY BEFORE class, inside WSL (Ubuntu):
#     bash prep/verify/day09-check.sh
# READ-ONLY except a scratch dir it creates and deletes in /tmp.
# Exit 0 = ready to teach.

fails=0; warns=0
ok()   { printf '\033[32m[OK]\033[0m   %s\n' "$1"; }
fail() { printf '\033[31m[FAIL]\033[0m %s\n       -> %s\n' "$1" "$2"; fails=$((fails+1)); }
warn() { printf '\033[33m[WARN]\033[0m %s\n       -> %s\n' "$1" "$2"; warns=$((warns+1)); }
head_() { printf '\n\033[36m=== %s ===\033[0m\n' "$1"; }

echo "Day 9 pre-flight — Python Basics"
echo "Demo machine: WSL (Ubuntu)"

# ---------------------------------------------------------------- 1. Platform
head_ "1. Platform"
if grep -qi microsoft /proc/version 2>/dev/null; then
  ok "Running inside WSL — correct for Day 9"
else
  warn "Not detected as WSL" "Fine if this is a native Linux box. Just confirm it is your demo machine."
fi

# ------------------------------------------------- 2. Identity (CRITICAL)
head_ "2. Identity — you must NOT be root"
me="$(whoami)"
if [ "$me" = "root" ]; then
  fail "You are running as ROOT ($me)" "The PermissionError demo (the spine of the session) will NOT fail as intended - root can read /etc/shadow. Switch to a normal user, or set a default user in /etc/wsl.conf. See Playbook B1."
else
  ok "Running as '$me' (not root) — PermissionError demo will fire correctly"
fi

# ------------------------------------------------------------- 3. Python
head_ "3. Python"
if command -v python3 >/dev/null 2>&1; then
  pv="$(python3 --version 2>&1)"
  ok "$pv available"
  maj=$(python3 -c 'import sys; print(sys.version_info[0])' 2>/dev/null)
  min=$(python3 -c 'import sys; print(sys.version_info[1])' 2>/dev/null)
  if [ "$maj" -eq 3 ] && [ "$min" -ge 6 ]; then
    ok "Python >= 3.6 — f-strings in permission_hunter.py will work"
  else
    warn "Python older than 3.6" "f-strings will SyntaxError. Use the plain print() fallback in Playbook D2."
  fi
else
  fail "python3 not found" "Run: sudo apt update && sudo apt install -y python3   (do this NOW, not during class)"
fi

for m in os stat getpass; do
  if python3 -c "import $m" >/dev/null 2>&1; then ok "module '$m' importable"
  else fail "module '$m' missing" "Standard library is incomplete: sudo apt install --reinstall python3"; fi
done

# ------------------------------------------------------------- 4. Editor
head_ "4. Editor"
if command -v nano >/dev/null 2>&1; then ok "nano available (beginner-friendly, as the guide assumes)"
else warn "nano not found" "sudo apt install -y nano, or use 'cat > file.py <<EOF' heredocs (Playbook A4)"; fi

# --------------------------------------------- 5. Working dir must be Linux-side
head_ "5. Working directory (must NOT be /mnt/c)"
case "$HOME" in
  /mnt/*) fail "HOME is on the Windows drive ($HOME)" "WSL fakes permissions under /mnt/c - chmod 777 will not stick and permission_hunter.py will find nothing. Use a Linux-side home." ;;
  *)      ok "HOME is Linux-side ($HOME) — chmod will behave correctly" ;;
esac

# ----------------------------------------- 6. Scheduled failure: /etc/shadow
head_ "6. Scheduled failure — /etc/shadow must DENY"
shadow_result=$(python3 - <<'PY' 2>/dev/null
try:
    open('/etc/shadow').read()
    print("READABLE")
except PermissionError:
    print("DENIED")
except FileNotFoundError:
    print("MISSING")
except Exception as e:
    print("OTHER:" + type(e).__name__)
PY
)
case "$shadow_result" in
  DENIED)   ok "/etc/shadow denied — your key demo moment will work" ;;
  READABLE) fail "/etc/shadow is READABLE by you" "You are effectively root. The demo will not fail as scripted. See Playbook B1." ;;
  MISSING)  warn "/etc/shadow not present" "Substitute another root-owned file, e.g. /etc/sudoers, and update the guide." ;;
  *)        warn "Unexpected result: $shadow_result" "Test manually before class" ;;
esac

# --------------------------------- 7. Full dry-run of the payoff script
head_ "7. Dry run — permission_hunter.py logic"
scratch="$(mktemp -d /tmp/day09check.XXXXXX)"
mkdir -p "$scratch/scan_demo"
echo "secret" > "$scratch/scan_demo/config.txt"; chmod 600 "$scratch/scan_demo/config.txt"
echo "notes"  > "$scratch/scan_demo/public.txt"; chmod 644 "$scratch/scan_demo/public.txt"
echo "oops"   > "$scratch/scan_demo/leaky.txt";  chmod 777 "$scratch/scan_demo/leaky.txt"

actual_mode=$(stat -c '%a' "$scratch/scan_demo/leaky.txt" 2>/dev/null)
if [ "$actual_mode" = "777" ]; then
  ok "chmod 777 sticks here — the planted vulnerability will be real"
else
  fail "chmod 777 became '$actual_mode'" "Filesystem is not honouring permissions (are you under /mnt/c?). The demo cannot work here."
fi

hunter_out=$(cd "$scratch" && python3 - <<'PY' 2>&1
import os, stat
TARGET = "scan_demo"; findings = 0
for name in sorted(os.listdir(TARGET)):
    path = os.path.join(TARGET, name)
    mode = os.stat(path).st_mode
    if mode & stat.S_IWOTH:
        findings += 1
print(f"FINDINGS={findings}")
PY
)
if echo "$hunter_out" | grep -q "FINDINGS=1"; then
  ok "permission_hunter.py logic verified — finds exactly 1 risk (leaky.txt)"
else
  fail "Hunter dry run returned: $hunter_out" "Expected FINDINGS=1. Test the script manually before class."
fi

rm -rf "$scratch"
[ -d "$scratch" ] && warn "scratch dir not removed" "rm -rf $scratch" || ok "Scratch cleaned — demo is repeatable"

# --------------------------------------------- 8. Leftover state from rehearsal
head_ "8. Leftover state"
if [ -d "$HOME/day9demo" ]; then
  warn "~/day9demo already exists from a previous rehearsal" "rm -rf ~/day9demo  (Playbook C1) - otherwise your live demo starts dirty"
else
  ok "No leftover ~/day9demo — clean start"
fi

# ------------------------------------------------------------------ Verdict
head_ "Verdict"
if [ "$fails" -eq 0 ] && [ "$warns" -eq 0 ]; then
  printf '\033[32mREADY TO TEACH — all checks green.\033[0m\n'; exit 0
elif [ "$fails" -eq 0 ]; then
  printf '\033[33mREADY, WITH %s WARNING(S).\033[0m\n' "$warns"
  echo "Each has a scripted fallback in the Failure Playbook. You can teach."; exit 0
else
  printf '\033[31m%s FAILURE(S), %s warning(s). Fix before class.\033[0m\n' "$fails" "$warns"; exit 1
fi
