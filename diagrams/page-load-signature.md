# Signature Diagram — "How a Web Page Loads" (7 steps)
**Status:** Canonical / reusable across the course · **Introduced:** Day 4 · **Owner:** Curriculum

This is the **signature diagram of Module 1 (and the course)**. Introduce it on Day 4 and reuse the *same visual* on later days — only the **lens** changes. Students recognizing one familiar diagram from five angles is one of the strongest long-term-retention devices we have.

## The 7 steps (canonical — keep wording/layout/colors identical everywhere)
```
 [1] You type example.com + Enter        (ethics: you're authorized)
          │
 [2] DNS resolves name → IP               (directory lookup)
          │
 [3] TCP three-way handshake → :443       (SYN / SYN-ACK / ACK)
          │
 [4] HTTP GET sent INSIDE TLS (encrypted)
          │
 [5] Server returns HTML (encrypted in transit)
          │
 [6] Browser fetches assets (images/CSS/JS) — more requests
          │
 [7] Page rendered & usable
```

## Perspective overlays (same diagram, different lens)
| Day | Lens | What we emphasize |
|-----|------|-------------------|
| **Day 4** | Concept (happy path) | What each step *is*; TCP vs UDP; DNS; ports; TLS bridge. |
| **Week 1 Assignment** | Story + observe | Student writes the story; observes with **DevTools** (optional Wireshark bonus). |
| **Day 13** (Wireshark/Nmap) | Packets on the wire | The *same* steps as captured packets: SYN/SYN-ACK/ACK, DNS query/response, TLS ClientHello. |
| **Day 16** (Web Security) | Where it breaks | Attack each step: DNS spoofing, downgrade, XSS in step 6, open ports, etc. |
| **Day 19** (IR) | Where it's anomalous | Which step signals an incident: weird DNS answer, handshake to unknown IP, beaconing in step 6. |

## Rules for reuse
- Keep the **layout, colors, and step numbers identical** in every appearance so students recognize it instantly.
- Only the annotations/lens change per day.
- Reference this file from each day's guide so the diagram stays in sync (single source of truth).
