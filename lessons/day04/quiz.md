# Day 4 — Quiz (exit, 4 questions)
*Formative only — reinforces, doesn't punish.*

1. **TCP is best described as:**
   a) Connectionless, "fire and forget"
   b) Reliable, connection-oriented, with a handshake
   c) A type of IP address
   d) A form of encryption
   **Answer: b**

2. **Which protocol turns a name like `example.com` into an IP address?**
   a) TCP
   b) UDP
   c) DNS
   d) HTTP
   **Answer: c**

3. **The TCP three-way handshake consists of:**
   a) SYN, SYN-ACK, ACK
   b) GET, POST, PUT
   c) IP, MAC, port
   d) Request, Response, Render
   **Answer: a**

4. **What does HTTPS (port 443) add over HTTP (port 80)?**
   a) Nothing — they are the same
   b) Encryption of the connection (TLS)
   c) It is faster because it is encrypted
   d) It removes the need for a port
   **Answer: b**

---

## Optional extension (discussion)
5. Why might a video call use UDP instead of TCP?
   **Model answer:** Video tolerates small losses (a dropped frame isn't fatal) but is sensitive to delay; UDP's no-handshake, no-retransmit design keeps latency low. TCP's re-sending would cause lag.
