# Skills self-assessment

*Rate yourself 1 (couldn't) – 5 (confident, could teach it). Be honest — this is a compass, not a grade.*

## Foundations
| Skill | 1–5 |
|---|---|
| Explain the CIA triad with a real example for each | |
| Draw what happens when a web page loads (DNS → TCP → TLS → HTTP) | |
| Explain how a bug can become code execution | |
| Explain hashing vs encryption, and how passwords should be stored | |

## Systems & scripting
| Skill | 1–5 |
|---|---|
| Read a Linux permission string (`rwxr-xr--`) and fix perms with `chmod` | |
| Navigate a Linux system and chain commands with pipes | |
| Give the Windows equivalent of `sudo` / `/etc/*` / `cron` | |
| Write a ~20-line Python tool from scratch | |
| Read code someone (or an LLM) else wrote and spot a bug | |

## Offense
| Skill | 1–5 |
|---|---|
| Write a Rules of Engagement document | |
| Run recon + `nmap -sV -sC` and turn output into a service inventory | |
| Take a version → CVE → CVSS → "is there an exploit" → a priority | |
| Get proof of a finding (a shell / extracted data / a bypass) | |
| Find + prove + fix SQLi, XSS, and IDOR | |
| Describe privilege escalation and one Linux + one Windows example | |
| Write a clear finding: evidence + steps to reproduce + impact + fix | |

## Defense
| Skill | 1–5 |
|---|---|
| Name the log sources and what each reveals | |
| Explain IOC vs TTP and why TTPs matter more | |
| Build an incident timeline from raw logs | |
| List the IR lifecycle phases and why "pull the plug" is usually wrong | |

## AI & governance
| Skill | 1–5 |
|---|---|
| Explain why prompt injection is hard to fix | |
| Name direct vs indirect injection and 3 mitigations | |
| Write an AI acceptable-use rule for a company | |

## Communication
| Skill | 1–5 |
|---|---|
| Explain a technical risk to a non-technical manager | |
| Write a one-paragraph executive summary of findings | |

---

## Read your scores

- **High on offense rows (recon / exploit / web / RoE):** Red-leaning — pentest, AppSec, bug bounty.
- **High on defense rows (logs / timeline / IR):** Blue-leaning — SOC, DFIR, detection engineering.
- **High on "explain the risk" / "exec summary" / low patience for the terminal:** consider **GRC**.
- **High on scripting + "build a tool" + enjoyed Day 17 cloud:** cloud security / security engineering.
- **Enjoyed Day 18 most:** AI/ML security is new and hiring.

*Highest cluster = a signal about your first door. You can change doors later — most people do.*
