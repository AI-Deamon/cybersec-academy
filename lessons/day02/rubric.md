# Day 2 — Assessment Rubric
*Used by the instructor to assess the quiz + lab. Formative — guides improvement, not punishment.*

| Criterion | Excellent (3) | Adequate (2) | Needs work (1) |
|-----------|---------------|--------------|----------------|
| **Execution model** (quiz Q1–2) | Correctly states programs run from RAM; defines process as isolated memory | Knows one but fuzzy on the other | Confuses disk vs RAM |
| **Privilege** (quiz Q3) | Names kernel/user and that it's hardware-enforced | Names the modes but not the enforcement | Confused about privilege |
| **Buffer overflow** (quiz Q4) | Explains overflow → overwrite return address → RCE | States "spills into memory" but vague on consequence | No link to execution hijack |
| **Lab** (Tasks 1–2) | Found high-memory process (PID+mem); ended own app cleanly; wrote disk→RAM→CPU flow | Completed with minor help | Could not locate/end safely |
| **Connections** (worksheet Q7 / homework) | Explains crash→code-exec in own words with the analogy | Partial explanation | No connection made |

**Scoring guidance:** 12–15 = strong; 8–11 = on track; ≤7 = revisit concepts 1:1 before Day 3.
**Definition-of-Success check (ADD §13):** can the student explain CPU/memory/process in their own words, perform the lab without hand-holding, and state why a crash can become dangerous?
