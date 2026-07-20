# Week 2 Signature Diagram — "The OS Stack" (User → Shell → OS → Hardware)
**Status:** Canonical / reusable across Week 2 · **Introduced:** Day 6 · **Owner:** Curriculum

This is the **signature diagram of Module 2 (and Week 2)**. Introduce it on Day 6 and reuse the *same visual* on later days — only the **lens** changes. Students recognizing one familiar diagram from several angles is one of the strongest long-term-retention devices we have (same principle as the page-load diagram in Week 1).

```
        User   (identity on the staff roster)
          │    "who am I?"  →  whoami / id
          ▼
        Shell   (the walkie-talkie — text commands)
          │     Bash (Linux) | PowerShell (Windows)
          ▼
   Operating System   (the Manager — enforces the rules)
          │     checks the Key Cabinet (permissions) on every action
     ┌────┴────────┬──────────┐
     ▼             ▼          ▼
   CPU            RAM        Disk
  (Chef)     (Kitchen    (Pantry /
               counter)   Storage)
```

The Manager (OS) only lets an Employee (Process) into a room if the Key Cabinet (permissions) says yes.

## The unified Restaurant metaphor (one metaphor for the whole academy)
- **Restaurant = the Computer** · **Manager = the OS** · **Chef = the CPU**
- **Kitchen counter = RAM** · **Pantry = Storage/Disk** · **Employees = Processes**
- **Walkie-talkie = the Shell** · **Key cabinet = Permissions**
- A **User** is an identity on the staff roster; when that person is working, they are an **Employee = a Process**.

## Reuse across Week 2 (same picture, different lens)
| Day | Lens |
|-----|------|
| Day 6 | Introduction — name every layer; the metaphor |
| Day 7 (Linux) | Bash; permission bits (rwx); `/etc/passwd`; `chmod`/`chown` |
| Day 8 (Windows) | PowerShell; ACLs; Active Directory; users & groups |
| Day 9 (Python) | A program (Process) uses the OS to read/write files |
| Day 10 (Automation) | Scripts drive the Shell to manage the OS |

Keep the visual identical everywhere; change only the annotations.
