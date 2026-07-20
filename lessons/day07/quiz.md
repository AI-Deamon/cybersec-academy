# Day 7 — Quiz (exit, 4 questions)
*Formative only — reinforces, doesn't punish.*

1. **In `rwxr-xr--`, what can the "other" role do?**
   a) read, write, execute
   b) read only
   c) write only
   d) nothing
   **Answer: b**

2. **On Linux, the filesystem root is written as:**
   a) `C:\`
   b) `/`
   c) `HOME:`
   d) `\root`
   **Answer: b**

3. **`chmod +x script.sh` does what (if you own the file)?**
   a) Deletes it
   b) Makes it runnable (adds execute permission)
   c) Makes it world-writable
   d) Changes its owner
   **Answer: b**

4. **Why is `chmod 777 file` considered a security risk?**
   a) It renames the file
   b) It gives everyone read/write/execute — "a key left in the door"
   c) It makes the file smaller
   d) It only affects the owner
   **Answer: b**

---

## Optional extension (discussion)
5. `root` is the "master key." Why is it safer to work as a normal user and use `sudo` only when needed?
   **Model answer:** least privilege — a mistake or compromise as root can break or expose the whole system; `sudo` limits and logs admin actions.
