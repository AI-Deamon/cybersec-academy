# Day 3 — Quiz (exit, 4 questions)
*Formative only — reinforces, doesn't punish.*

1. **A packet is best described as:**
   a) One giant file sent all at once
   b) A small, addressed chunk of data (like a letter)
   c) A type of cable
   d) A password
   **Answer: b**

2. **Which identifies the device on the local wire (factory ID)?**
   a) IP address
   b) MAC address
   c) Port number
   d) Domain name
   **Answer: b**

3. **A "port" in networking is:**
   a) A physical hole in the computer
   b) A logical number identifying a service (e.g., 80 = web)
   c) The same as an IP address
   d) A type of encryption
   **Answer: b**

4. **HTTPS primarily protects against which network failure?**
   a) Denial of Service (flooding)
   b) Eavesdropping (reading the contents in transit)
   c) The packet being routed
   d) The MAC address being changed
   **Answer: b**

---

## Optional extension (discussion)
5. In one sentence: why does HTTPS hide the *contents* of a letter but NOT the destination IP address written on the envelope?
   **Model answer:** TLS encrypts the payload, but the IP header (address) must stay readable by routers to deliver the packet — so the post office still sees where it's going.
