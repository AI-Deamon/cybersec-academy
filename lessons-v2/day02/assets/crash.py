#!/usr/bin/env python3
"""
Day 2 demo: a process that misbehaves, so the class can watch the OS kill it.

    python3 crash.py

It tries to read memory at address 0 — an address no process is allowed to touch.
The OS stops it immediately (SIGSEGV / "segmentation fault" on Linux/mac,
an access-violation crash on Windows).

The point for students: the misbehaving process did NOT take the machine down.
The OS (the referee) caught it and contained it to that one process.

Nothing here is dangerous — it only crashes itself.
"""
import ctypes
import sys

print("This process:  PID", __import__("os").getpid())
print("About to read from address 0 (forbidden)...")
sys.stdout.flush()

# Read one byte from address 0. The OS does not map address 0 into any process,
# so the CPU raises a fault and the OS terminates just this process.
ctypes.string_at(0)

print("you will never see this line")
