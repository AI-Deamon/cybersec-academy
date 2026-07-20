# Day 11 — Reference Sheet
*Keep for the whole course — this is the skeleton of the profession.*

- **CIA:** Confidentiality (who sees) · Integrity (who changes, correctly) · Availability (who uses). Sealed envelope / signed paper / open door.
- **Risk:** Threat × Vulnerability × Impact. Responses: accept / mitigate / transfer / avoid.
- **Untrusted input:** treat all input as guilty until validated. The habit that prevents injection, XSS, path traversal, overflows.
- **Attack + defense:** for every control, know the attack it stops.
- **Map to prior weeks:** permissions enforce C/I; weak `777`/"Everyone: Full Control" = C/I broken.

## Further reading
- "CIA triad" and "risk management" intros (NIST, CIS).
- Days 15-16 make untrusted input concrete (SQLi/XSS + secure coding).
- Days 12-14 give safe systems to exercise this judgment.
