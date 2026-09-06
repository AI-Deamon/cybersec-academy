#!/usr/bin/env python3
# usage: python3 scanner.py [host]        default host: 127.0.0.1
# Checks a short list of common ports on ONE host and prints open/closed.
#
# ETHICS: only run against your own machine, your own lab, or the class lab.
# Port-scanning hosts you don't own or have written permission for is illegal.
#
# This is the Week 3 starter scanner. On Day 13 you extend it (more ports, a
# host list, banner grabbing).

import socket
import sys

COMMON_PORTS = [22, 25, 53, 80, 110, 143, 443, 3000, 3306, 8080]


def is_open(host: str, port: int, timeout: float = 1.0) -> bool:
    """True if a TCP connection to host:port succeeds within `timeout` seconds."""
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(timeout)
    try:
        s.connect((host, port))
        return True
    except OSError:
        return False
    finally:
        s.close()


def scan(host: str) -> None:
    print(f"scanning {host} ...")
    for port in COMMON_PORTS:
        state = "OPEN" if is_open(host, port) else "closed"
        if state == "OPEN":
            print(f"  {host}:{port:<5} {state}")
    print("done")


if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "127.0.0.1"
    scan(target)
