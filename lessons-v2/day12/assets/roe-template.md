# Rules of Engagement — <engagement name>

*A real deliverable. Fill every field. This is what keeps testing legal.*

## Parties
- **Client / system owner:** Northwind Traders (the class lab)
- **Testing team:** <your name(s)>
- **Authorized by:** <instructor name> — *signature + date required before testing*

## Authorization statement
> The testing team named above is authorized by the system owner to perform the security
> testing described below, against **only** the in-scope targets, during the stated window.
> This document is the testing team's authorization to carry out otherwise-restricted actions
> against those systems.

Signed: ____________________   Date: __________

## Scope

**In scope (test these — and only these):**
| Target | Address | Notes |
|--------|---------|-------|
| Web app 1 (DVWA) | `http://<LAB_HOST>:8080` | |
| Web app 2 (Juice Shop) | `http://<LAB_HOST>:3000` | |
| Server (Metasploitable2) | `<LAB_HOST>` (or its own IP) | all TCP ports |

**Out of scope (do NOT touch):**
- the campus / college network and any device on it
- the public internet — no scanning or attacking external hosts
- other students' laptops and the shared Kali of others
- the lab host's management interface / hypervisor

## Rules

| Allowed | Forbidden |
|---------|-----------|
| port & service scanning of in-scope targets | denial-of-service / resource exhaustion |
| vulnerability scanning of in-scope targets | destroying or corrupting data |
| exploitation of in-scope findings, in the lab | pivoting to out-of-scope systems |
| capturing evidence (screenshots, output) | testing outside the stated hours |
| — | social engineering of real people |

## Timing
- **Window:** class sessions only (Days 12–15). No testing outside class.
- **Start / stop:** begins after this ROE is signed; ends at the end of Day 15.

## Handling
- **Evidence / data:** store findings and screenshots only in your course repo. Do not exfil
  or keep lab data beyond the engagement.
- **If you break something:** stop, note the time and what you did, tell the instructor.
- **If you find signs of a real intrusion:** stop and tell the instructor immediately.

## Contacts
- **Instructor / emergency:** <name> — <how to reach during class>
