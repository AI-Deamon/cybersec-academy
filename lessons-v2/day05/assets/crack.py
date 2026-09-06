#!/usr/bin/env python3
"""
Day 5 — a tiny dictionary-attack demo. Stdlib only, no installs.

    python3 crack.py <target> <wordlist.txt>

<target> is either:
  * a 32-hex-char MD5 hash                        (fast — falls in milliseconds)
  * pbkdf2$<iterations>$<salt_hex>$<hash_hex>     (a "slow hash" — deliberately painful)

The lesson: the SAME password is trivial to crack when stored as raw MD5 and
effectively impossible when stored salted + slow. Generate targets with make_targets.py.
"""
import hashlib
import sys
import time


def try_md5(target: str, words):
    target = target.lower()
    for w in words:
        if hashlib.md5(w.encode()).hexdigest() == target:
            return w
    return None


def try_pbkdf2(spec: str, words):
    _, iters, salt_hex, want = spec.split("$")
    iters = int(iters)
    salt = bytes.fromhex(salt_hex)
    for i, w in enumerate(words, 1):
        got = hashlib.pbkdf2_hmac("sha256", w.encode(), salt, iters).hex()
        if got == want:
            return w
        if i % 20 == 0:
            print(f"  ...{i} guesses, still going (this is what 'slow hash' buys you)")
    return None


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)

    target, wordlist = sys.argv[1], sys.argv[2]
    with open(wordlist, encoding="utf-8", errors="ignore") as f:
        words = [line.strip() for line in f if line.strip()]

    print(f"loaded {len(words)} candidate passwords")
    start = time.time()

    if target.startswith("pbkdf2$"):
        print("target is a SLOW (pbkdf2) hash - this will grind. Let it run while we talk.")
        found = try_pbkdf2(target, words)
    else:
        found = try_md5(target, words)

    dt = time.time() - start
    if found:
        print(f"\n  CRACKED in {dt:.3f}s  ->  {found!r}")
    else:
        print(f"\n  not found after {dt:.3f}s ({len(words)} words). "
              f"A bigger wordlist might get it, or it's a strong password.")


if __name__ == "__main__":
    main()
