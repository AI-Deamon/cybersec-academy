# Day 4 — Lab Guide
**Goal:** Observe DNS resolution and a live web page's requests — using only built-in tools (no Wireshark yet).

**Prerequisites:** A computer with internet access and a browser (Chrome/Firefox/Edge). No extra installs. (Wireshark is introduced on Day 13.)

---

## Task 1 — Reach a target (ping) (5 min)
1. Open a terminal / command prompt.
2. Run: `ping 8.8.8.8` (or your router's IP). Stop with Ctrl+C after a few replies.
3. Each reply = a packet that left and returned. Note the round-trip time.

## Task 2 — Resolve a name (DNS) (8 min)
1. In the terminal:
   - **Windows:** `nslookup example.com`
   - **Linux/macOS:** `dig example.com` (or `nslookup example.com`)
2. Find the **ANSWER** section: the name and the IP it resolved to (e.g., `93.184.216.34`).
3. Write the IP in your lab sheet.

## Task 3 — Watch requests in the browser (DevTools) (12 min)
1. Open your browser. Press **F12** (or right-click → Inspect) to open **DevTools** → **Network** tab.
2. Load `example.com`. Watch the list fill with **requests** (the HTML document, then CSS, JS, images).
3. Click the **first request** (the HTML). Note:
   - **Status** (e.g., 200 OK)
   - **Protocol/Scheme** = **HTTPS** (the lock = the TLS bridge from class)
   - **Timing** (how long connection + request took)
4. Screenshot the Network tab with a few requests visible.

> Why this instead of Wireshark: Day 4 is concept-heavy. Per our pedagogy — *teach the concept first, then introduce the tool that makes it visible* — we use tools you already have. **Wireshark arrives on Day 13**, where you'll recognize the same DNS query and handshake you saw today.

---

## ✅ Checkpoint (show instructor before leaving)
- [ ] Used `ping` and saw replies
- [ ] Resolved a domain → wrote down its IP
- [ ] Opened DevTools → Network and listed ≥2 requests (noting HTTPS + status)

## Troubleshooting
- *No requests in DevTools:* make sure the Network tab was open **before** you loaded the page; reload if needed.
- *`dig` not found (Windows):* use `nslookup`, or install via WSL.
- *Status not 200:* 301/302 are normal redirects (e.g., http→https); click "Preserve log" to see the redirect chain.

> ⚠️ **Safety rule (Day 1):** only resolve/ping targets you're authorized to reach. example.com / your own lab are fine.
