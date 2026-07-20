# Day 2 — Quiz (exit, 4 questions)
*Formative only — reinforces, doesn't punish.*

1. **Where does the CPU actually execute a program's instructions from?**
   a) The hard disk
   b) RAM
   c) The CPU's permanent storage
   d) The network
   **Answer: b**

2. **A "process" is best described as:**
   a) A file on disk
   b) A running program with its own isolated memory
   c) The CPU itself
   d) A type of virus
   **Answer: b**

3. **Kernel mode vs user mode is enforced by:**
   a) A setting in the web browser
   b) The CPU hardware (protection rings)
   c) The user's password
   d) The network firewall
   **Answer: b**

4. **In a buffer overflow, the danger is that extra data can:**
   a) Make the program run faster
   b) Overwrite adjacent memory (e.g., a return address) and hijack execution
   c) Encrypt the hard drive
   d) Delete the operating system
   **Answer: b**

---

## Optional extension (discussion)
5. In one sentence: how does the "plates spilling onto the neighbor's counter" analogy explain why a crash can become attacker-controlled code execution?
   **Model answer:** The overflow writes past its allotted memory into a neighbor's space, and if that neighbor is the "where do I go next" address, the attacker can redirect execution to their own code.
