# Day 2 — Reference Sheet
*Keep this for the whole course.*

- **CPU:** executes instructions one at a time, billions/sec. **Registers:** tiny fast storage inside CPU (hands).
- **RAM:** live workspace (countertop). **Disk:** long-term storage (pantry). Programs run from RAM, not disk.
- **Process:** a running program with its own isolated memory space. One program can spawn many processes.
- **Kernel mode:** full hardware access ("god mode"). **User mode:** sandboxed; must ask kernel for risky ops. Boundary is **hardware-enforced** (CPU rings).
- **Privilege escalation:** gaining higher (kernel) privilege than intended.
- **Buffer overflow:** writing past a buffer's end; can overwrite a return address → arbitrary code execution (RCE). This is how a crash becomes an exploit.
- **Path of a program:** source code → compiler → binary (machine code) → OS loads into RAM → CPU executes.

## Further reading
- "How does a CPU work?" — introductory articles on instruction cycles.
- OWASP / CWE-120: classic buffer overflow explanations.
- "Smashing the Stack for Fun and Profit" (historical, advanced) — for later, not now.
