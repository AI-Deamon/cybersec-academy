# 3 AI attacks + the mitigation for each

*Day 18 artifact. Pick 3 from: your Gandalf run + the LLM Top 10. For each — what it is, a
concrete example, and one mitigation.*

---

## Attack 1: _______________________________

- **What it is (1–2 sentences):**
- **Concrete example:** (a prompt you used on Gandalf, or a realistic scenario)
- **Why it works:** (link it to "no boundary between instructions and data" if it's injection)
- **One mitigation:**

## Attack 2: _______________________________

- **What it is:**
- **Concrete example:**
- **Why it works:**
- **One mitigation:**

## Attack 3: _______________________________

- **What it is:**
- **Concrete example:**
- **Why it works:**
- **One mitigation:**

---

## Gandalf technique log

| Level | Technique that worked | The prompt (short) |
|-------|-----------------------|--------------------|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| ... | | |

## The one idea

Prompt injection works because an LLM processes its instructions and its data **in the same
channel**. Every mitigation is a layer that assumes an attacker controls some of that text —
none of them is a complete fix.
