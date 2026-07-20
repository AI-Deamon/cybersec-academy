# Day 8 — Quiz (exit, 4 questions)
*Formative only — reinforces, doesn't punish.*

1. **A Windows ACL is best described as:**
   a) A type of virus
   b) A list of "who may do what" on a file/folder — the same concept as Linux permissions
   c) A programming language
   d) A hard drive
   **Answer: b**

2. **In Windows, `whoami` does what?**
   a) Lists files
   b) Shows your identity (same idea as Linux `whoami`)
   c) Deletes a user
   d) Encrypts a disk
   **Answer: b**

3. **Active Directory (AD) is:**
   a) A text editor
   b) A domain-wide identity/access roster shared across many machines
   c) A Linux shell
   d) A firewall
   **Answer: b**

4. **Why is it risky to use a Windows Administrator account daily?**
   a) It's slower
   b) Admin = master key; ransomware/mistakes have full control (violates least privilege)
   c) It blocks the internet
   d) It deletes files automatically
   **Answer: b**

---

## Optional extension (discussion)
5. Linux `777` and Windows "Everyone: Full Control" are called "the same mistake in two dialects." Why does least privilege fix both?
   **Model answer:** both grant excess "who may do what"; least privilege removes unneeded rights so an attacker (or accident) can't reach what it shouldn't — in any dialect.
