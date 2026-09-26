#!/usr/bin/env python3
"""
Generate hashes.txt for the Day 5 crack exercise. Run this in your pre-flight so the
hashes are always correct for the wordlist you ship.

    python3 make_targets.py

Writes hashes.txt:
  * 3 unsalted MD5 hashes of passwords that ARE in wordlist.txt  -> crack in seconds
  * 1 unsalted MD5 of a password that is NOT in the list          -> a clean "miss"
  * 1 pbkdf2 (salted + 600k iterations) of a password NOT in the list
      -> crack.py runs the WHOLE wordlist (~1s per guess) and still finds nothing
"""
import hashlib
import os

HERE = os.path.dirname(os.path.abspath(__file__))

IN_LIST = ["password", "iloveyou", "qwerty123"]   # must exist in wordlist.txt
NOT_IN_LIST = "Xq7!vature_9"                       # deliberately absent
SLOW_PLAINTEXT = "Sunshine!23"                     # also absent - the run finishes with a MISS
SALT = bytes.fromhex("9f8e7d6c5b4a39281706f5e4d3c2b1a0")
ITERS = 600_000

lines = []
for pw in IN_LIST:
    lines.append(f"{hashlib.md5(pw.encode()).hexdigest()}   # md5, in the wordlist")
lines.append(f"{hashlib.md5(NOT_IN_LIST.encode()).hexdigest()}   # md5, NOT in the wordlist")
slow = hashlib.pbkdf2_hmac("sha256", SLOW_PLAINTEXT.encode(), SALT, ITERS).hex()
lines.append(f"pbkdf2${ITERS}${SALT.hex()}${slow}   # salted + slow; same kind of password, hopeless in class")

with open(os.path.join(HERE, "hashes.txt"), "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")

print("wrote hashes.txt:")
print("\n".join(lines))
