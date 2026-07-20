# Day 16 — Assessment Rubric
*Formative — guides improvement, not punishment.*

| Criterion | Excellent (3) | Adequate (2) | Needs work (1) |
|-----------|---------------|--------------|----------------|
| **Untrusted input / SQLi** (quiz Q1, Task 2) | Explains root cause; states parameterized fix | Knows "use prepared stmt" | Confused |
| **XSS** (quiz Q2, Task 3) | Explains echoed-input; states encoding fix | Knows "encode" | Confused |
| **HTTPS vs injection** (quiz Q3) | Explains layer difference (transit vs app) | Knows "different" | Can't |
| **Burp concept** (quiz Q4, Task) | Explains proxy in range; used appropriately | Knows "proxy" | Misuses |
| **OWASP map** | Categorizes findings → CIA → defense | Names a few | Can't |
| **Lab (Tasks 1-4)** | Demoed SQLi+XSS in range; stated fixes; reset | Completed with help | Couldn't safely |

**Scoring:** 15–18 strong; 10–14 on track; ≤9 revisit before Day 17.
**Definition-of-Success check (ADD §13):** explain SQLi/XSS in own words, demonstrate (or clearly describe) each in range, and state the fix + the HTTPS distinction.
