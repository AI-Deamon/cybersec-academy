# "Here's a quick port scanner!" - generated code to READ, not trust.
#
# Day 9 exercise: what does this do, and what is wrong with it?
# Write 2-3 sentences. (There is more than one problem.)

import socket

target = "8.8.8.8"          # <-- read this line carefully

def check(p):
    s = socket.socket()
    s.connect((target, p))
    print(str(p) + " is open")

for port in range(1, 1025):
    try:
        check(port)
    except:
        pass

print("scan complete")
