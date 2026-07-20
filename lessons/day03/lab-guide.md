# Day 3 — Lab Guide
**Goal:** Find your machine's network identity and send your first packets across a network.

**Prerequisites:** A computer on any normal network (home/coffee shop/lab). Command line access. No lab VM needed today.

---

## Task 1 — Find your address (8 min)
1. Open a terminal / command prompt:
   - **Windows:** `ipconfig`
   - **Linux/macOS:** `ip a` (or `ifconfig`)
2. Find your **IPv4 address** (e.g., `192.168.1.10`) and your **MAC / Physical Address** (e.g., `A4-5E-60-...`).
3. Write both down in your lab sheet.

## Task 2 — Send a packet (ping) (9 min)
1. Find your router's address (commonly `192.168.1.1` or `192.168.0.1`), or use a public DNS like `8.8.8.8`.
2. Run: `ping 8.8.8.8` (stop with Ctrl+C after a few replies).
3. Each line is a packet that left your machine and came back. Note the round-trip time (e.g., `23ms`).

> ⚠️ **Safety rule (Day 1):** only ping targets you're allowed to reach — your router, a known public DNS, or the lab. Don't ping random external hosts.

## Task 3 — Trace the path (8 min)
1. Run: `tracert 8.8.8.8` (Windows) or `traceroute 8.8.8.8` (Linux/macOS).
2. Each line is a "post office" (router) your packet passed through.
3. In your sheet, describe the first hop (usually your router) in one sentence.

---

## ✅ Checkpoint (show instructor before leaving)
- [ ] Reported own IP + MAC
- [ ] Successfully pinged a target and saw replies
- [ ] Described at least one traceroute hop as "a router the packet passed through"

## Troubleshooting
- *Command not found (Linux `ip`/`traceroute`):* install with your package manager (e.g., `sudo apt install iproute2 traceroute`), or use `tracepath`.
- *Ping blocked / no replies:* some networks block ICMP. Try your router's IP instead of a public one.
- *Can't find MAC:* on Windows it's "Physical Address" under your active adapter; on Linux/macOS it's the `ether` / `lladdr` line.
