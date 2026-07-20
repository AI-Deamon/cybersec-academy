# Day 6 — Quiz (exit, 4 questions)
*Formative only — reinforces, doesn't punish.*

1. **The operating system is best described as:**
   a) A type of computer
   b) The referee between applications and hardware
   c) A web browser
   d) A programming language
   **Answer: b**

2. **In our analogy, the shell is:**
   a) The kitchen
   b) The staff roster
   c) The manager's walkie-talkie (command interface)
   d) The key cabinet
   **Answer: c**

3. **The main security-relevant difference between Linux and Windows is:**
   a) Windows has no users
   b) They use different commands, but share the same core concepts (users, permissions, processes, files)
   c) Linux cannot run programs
   d) Permissions only exist on Windows
   **Answer: b**

4. **Why does "privilege" matter so much in security?**
   a) It makes the computer faster
   b) Most attacks aim to gain more control than they should have
   c) It changes the IP address
   d) It encrypts the disk
   **Answer: b**

---

## Optional extension (discussion)
5. `whoami` shows your identity. Why is knowing "as which user a program runs" the first question in incident response?
   **Model answer:** because the OS enforces permissions per user; if a malicious program runs as admin, it can do anything — so identifying the running identity scopes the blast radius.
